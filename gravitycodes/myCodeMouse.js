var sketchProc=function(processingInstance){ with (processingInstance){




size(400,400);
var scw=window.innerWidth;
var sch=window.innerHeight;
var draww=600;
var drawh=600;
var centerx=scw/2;
var centery=sch/2;

frameRate(30);

 
/** Create a variable to easily handle the status of the mouse
0=not pressed
1=just pressed
2=mouse held
3=mouse just released
*/

var mouseIsPressed=false;
var mouseStatus=0;

var mousePressed=function(){
    mouseIsPressed=true;
};
var mouseReleased=function(){mouseIsPressed=false;};

var updateMouseStatus=function(){
    if(mouseStatus===0){
        if(mouseIsPressed){
            mouseStatus=1;
        }
    } else if(mouseStatus===1){
        mouseStatus=2;
    } else if(mouseStatus===2){
        if(!mouseIsPressed){
            mouseStatus=3;
        }
    } else if(mouseStatus===3){
        mouseStatus=0;
    }
};
var particle=function(x,y){
    this.x=x;
    this.y=y;
    this.m=1;
    this.toText=function(){
        println("("+this.x+","+this.y+")");
    };
    this.draw= function() {
        ellipse(x,y,3,3);
    };
};

var quadtreeNode=function(smallx,smally,largex,largey){
    var xs=smallx;
    var xl=largex;
    var ys=smally;
    var yl=largey;
    var cx=(smallx+largex)/2;
    var cy=(smally+largey)/2;
//middle s is whether the x value is small or large
//rightmost s is whether the y value is small or large.
    this.nss=undefined; //small quadrant
    this.nsl=undefined;
    this.nls=undefined;
    this.nll=undefined;
    this.p=undefined;
    
    var cmxsum=0;
    var cmysum=0;
    var msum=0;
    
    this.addParticle=function(p){
        if(this.nss===undefined){
            if(this.p===undefined){
                cmxsum=p.x*p.m;
                cmysum=p.y*p.m;
                msum=p.m;
                this.p=p;
                return;
            } else {
                var tmp=this.p;
                if(abs(tmp.x-p.x)<0.001 && abs(tmp.y-p.y)<0.001){
                    return;
                }
                this.nss=new quadtreeNode(xs,ys,cx,cy);
                this.nsl=new quadtreeNode(xs,cy,cx,yl);
                this.nls=new quadtreeNode(cx,ys,xl,cy);
                this.nll=new quadtreeNode(cx,cy,xl,yl);
                
                cmxsum=0;
                cmysum=0;
                msum=0;
                
                this.p=undefined;
                this.addParticle(tmp);
                this.addParticle(p);
            }
        } else {
            var a=(p.x>=cx)?1:0;
            var b=(p.y>=cy)?1:0;
            var c=a|(b<<1);
            
            cmxsum+=p.x*p.m;
            cmysum+=p.y*p.m;
            msum+=p.m;
            
            if(c===0){
                this.nss.addParticle(p);
            } else if(c===1){
                this.nls.addParticle(p);
            } else if(c===2){
                this.nsl.addParticle(p);
            } else if(c===3){
                this.nll.addParticle(p);
            }
            return;
        }
    };
    this.draw= function() {
        line(xs,cy,xl,cy);
        line(cx,ys,cx,yl);
        if(this.p!==undefined){
            this.p.draw();
        }
        if(this.nss!==undefined){
            this.nss.draw();
            this.nsl.draw();
            this.nls.draw();
            this.nll.draw();
        }
    };
    
    this.drawHut=function(p){
        if(cmxsum===undefined){
            return;
        }
        var x=cmxsum/msum;
        var y=cmysum/msum;
        var s=((xl-xs)+(yl-ys))/2;
        var d=sqrt((x-p.x)*(x-p.x)+(y-p.y)*(y-p.y));
        if(s/d<0.5){
            fill(255, 0, 0);
            ellipse(x,y,5,5);
            return;
        } else {
            if(this.nss===undefined){
                fill(255, 0, 0);
                ellipse(x,y,5,5);
            } else {
                line(xs,cy,xl,cy);
                line(cx,ys,cx,yl);
                this.nss.drawHut(p);
                this.nsl.drawHut(p);
                this.nls.drawHut(p);
                this.nll.drawHut(p);
            }
        }
    };
};


var quadtree=function(particles){
    var xs=10000;
    var xl=-10000;
    var ys=10000;
    var yl=-10000;
    var n;
    for(n=0;n<particles.length;n++){
        var p=particles[n];
        if(p.x<xs){
            xs=p.x;
        }
        if(p.x>xl){
            xl=p.x;
        }
        if(p.y<ys){
            ys=p.y;
        }
        if(p.y>yl){
            yl=p.y;
        }
    }
    xs-=0.5;
    ys-=0.5;
    xl+=0.5;
    yl+=0.5;
    var q=new quadtreeNode(xs,ys,xl,yl);
    
    for(n=0; n<particles.length;n++){
        q.addParticle(particles[n]);
    }
    this.draw= function() {
        noFill();
        rect(xs,ys,xl-xs,yl-ys);
        q.draw();
    };
    this.drawHut=function(p){
        noFill();
        rect(xs,ys,xl-xs,yl-ys);
        q.drawHut(p);
    };
};

var n=[];
for(var m=0;m<1000;m++){
    n[m]=(new particle(random(0,400),random(0,400)));
}
var q=new quadtree(n);
var draw= function() {
    background(255,255,255);
    fill(245, 245, 245);
    for(var m=0;m<1000;m++){
        n[m].draw();
    }
    q.drawHut(new particle(mouseX,mouseY));
};

}};

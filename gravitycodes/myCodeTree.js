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
    this.toText=function(){
        println("("+this.x+","+this.y+")");
    };
    this.draw= function() {
        ellipse(x,y,3,3);
    };
};

var quadtreeNode=function(smallx,smally,largex,largey){
    //variables described as "vars" are only accessible from local functions

    //the four bounds on the quadtree node rectangle
    var xs=smallx;
    var xl=largex;
    var ys=smally;
    var yl=largey;

    //the center, for later usage
    var cx=(smallx+largex)/2;
    var cy=(smally+largey)/2;

    //variables described as "this." are accessible from the outside
    //saying something equals undefined doesn't do any useful instantiation
    //AFAIK, but it's for readability.

    //middle s is whether the x value is small or large
    //rightmost s is whether the y value is small or large.
    this.nss=undefined; //small quadrant
    this.nsl=undefined;
    this.nls=undefined;
    this.nll=undefined;

    //variable for storing 
    this.p=undefined;


    this.addParticle=function(p){
        if(this.nss===undefined){
            if(this.p===undefined){
                //We're in state 1, and we send the node to state 3.
                this.p=p;
                return;
            } else { 
                //We're in state 3.
                //a failsafe: If the particles are on top of each other we'll recurse infinitely! 
                //I solve the problem by just excluding the particle.
                var tmp=this.p;
                if(abs(tmp.x-p.x)<0.001 && abs(tmp.y-p.y)<0.001){
                    return;
                }
                //Send the particle to state 2. 
                this.nss=new quadtreeNode(xs,ys,cx,cy);
                this.nsl=new quadtreeNode(xs,cy,cx,yl);
                this.nls=new quadtreeNode(cx,ys,xl,cy);
                this.nll=new quadtreeNode(cx,cy,xl,yl);
                this.p=undefined;
                //clever recursion. Since we're in state 2 now we know exactly what this does.
                this.addParticle(tmp);
                this.addParticle(p);
            }
        } else { //We're in state 2.
            /*We want to call addParticle(p) on the correct subcell! 
            This can be done in a few different ways. For brevity I like
            a little binary trick. I make a number "c" whose bits
            correspond to what cell we're in. If the leading bit is 
            zero we're in one of the two smaller x cells. If the leading bit
            is one we're in one of the two larger x cells. The second bit 
            corresponds to the y larger/smaller value.*/
            var a=(p.x>=cx)?1:0;
            var b=(p.y>=cy)?1:0;
            var c=a|(b<<1);
            if(c===0){
                this.nss.addParticle(p);
            } else if(c===1){
                this.nls.addParticle(p);
            } else if(c===2){
                this.nsl.addParticle(p);
            } else if(c===3){
                this.nll.addParticle(p);
            }
            return; //we stay in state 2.
        }
    };


    this.draw= function() {
        if(this.p!==undefined){ //State 3
            this.p.draw();
        }
        if(this.nss!==undefined){ //State 2
            //draw a "crosshair" running through the center of the node
            line(xs,cy,xl,cy);
            line(cx,ys,cx,yl);
            
            //Draw all the child nodes and the particles they contain.
            this.nss.draw();
            this.nsl.draw();
            this.nls.draw();
            this.nll.draw();
        }
    };

};

/* Take in a list of particles and add them, one by one, into a quadtree structure.
The benefit of this is that:
    1. we can wrap finding the min/max spatial bounds on all the particles (to ensure the top quadnode contains all the particles)
    2. we can wrap the draw function. The subnodes only have to draw "crosshair" shapes, but the topmost quadnode also has to draw a 
        box that wraps around the whole quadtree
*/
var quadtree=function(particles){
    var xs=10000;
    var xl=-10000;
    var ys=10000;
    var yl=-10000;
    var n;
    //find the minimum and maximum bounds, so that our quadtree includes all particles
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
    this.addParticle=function(p){
        q.addParticle(p);
    };
};

var n=[];
for(var m=0;m<100;m++){
    n[m]=(new particle(random(0,400),random(0,400)));
}
var q=new quadtree(n);
background(255, 255, 255);
q.draw();

//Add new particles whenever the mouse is pressed
mousePressed = function() {
    background(255, 255, 255);
    q.addParticle(new particle(mouseX,mouseY));
    q.draw();
};

}};

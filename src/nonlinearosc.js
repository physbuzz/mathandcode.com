var sketchProc=function(processingInstance){ with (processingInstance){




var scw=400;
var sch=400;
var draww=400;
var drawh=400;
var centerx=scw/2;
var centery=sch/2;
size(scw,sch);

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







var drawBox = function(x, y, w, h, heading,col) {
    noStroke();
    fill(50, 50, 50, 50);
    rect(x+2, y+2, w, h, 8);
    if(col!==undefined){
        fill(col);
    } else {
        fill(255, 255, 255, 230);
    }
    rect(x, y, w, h, 8);
    if(heading!==undefined){
        fill(10, 10, 10);
        text(heading, x+10, y+16);
    }
};


var mouseStatus=0;

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


var drawBox = function(x, y, w, h, heading,col) {
    noStroke();
    fill(50, 50, 50, 50);
    rect(x+2, y+2, w, h, 8);
    if(col!==undefined){
        fill(col);
    } else {
        fill(255, 255, 255, 230);
    }
    rect(x, y, w, h, 8);
    if(heading!==undefined){
        fill(10, 10, 10);
        text(heading, x+10, y+16);
    }
};


var mouseStatus=0;

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
/** Draggable Bar
 * An object representing a horizontal draggable bar.
 * 
 * Style used from peter collingridge because it's smoooooth. http://wwwkhanacademy.org/cs/simulation-of-an-ionic-solid/1122503811
 * 
 * Usage
 * ex:
***
var tp=new DraggableBar(53,38,100,20,11,50,0,color(179, 29, 179));
var draw= function() {
    background(255, 255, 255);
    fill(0, 0, 0);
    text(tmp.getVal(),0,20);
    updateMouseStatus();
    tmp.draw();
    tmp.handleMouseInput();
};
***
 * Arguments
 * x,y: positioned at (x,y)
 * width ,height: dimensions width,height
 * minval: when the bar is dragged to the left, getVal() 
 *      will read minval
 * maxval: to the right, getVal() will red maxval
 * initialval: The value getVal is to return before the bar 
 *      has been moved.
 * col: The color of the filled portion of the bar. 
 *      Should be passed as ex. color(255, 0, 0);
 * 
 * Functions
 * draw(): draws the bar on the screen.
 * getVal(): returns the current value, between minval and
 *      maxval
 * handleMouseInput(): handles updating the bar's value.
 *      Should be called each frame.
*/
var DraggableBar=function(x,y,width,height,minval,maxval,initialval,col){
    var curcoord=(initialval-minval)/(maxval-minval)*width;
    var clickheld=0;
    var wasmoved=0;
    this.getClickHeld=function(){
        return clickheld;
    };
    this.setVal=function(n){
        curcoord=(n-minval)*width/(maxval-minval);
    };
    this.draw=function() {
        noStroke();
        fill(col);
        //rect(x,y,curcoord,height);
        strokeWeight(1);
        stroke(0,0,0);
        noStroke();
        fill(194, 194, 194);
        rect(x,y+height/2-2,width,4,3);
        fill(132, 140, 148);
        stroke(0, 0, 0);
        ellipse(x+curcoord,y+height/2,10,10);
    };
    this.getVal=function(){
        return curcoord/width*(maxval-minval)+minval;
    };
    this.handleMouseInput=function(){
        wasmoved=0;
        if(mouseX>=x && mouseY>=y && mouseX<=x+width && mouseY<=y+height){
            if(clickheld===0){
                if(mouseStatus===1){
                    clickheld=1;
                }
            }
        }
        if(clickheld===1){
            if(mouseX<x){
                curcoord=0;
            }
            if(mouseX>x+width){
                curcoord=width;
            }
            if(mouseStatus===3 || mouseStatus===0){
                clickheld=0;
            } else if(mouseX>=x && mouseX<=x+width) {
                var curcoordnew=mouseX-x;
                if(curcoord!==curcoordnew){
                    wasmoved=1;
                    curcoord=curcoordnew;
                }
            }
        }
    };
    this.wasMoved=function(){
        return (wasmoved===1);
    };
    this.rescale=function(neww,newh){
        var v=this.getVal();
        width=neww;
        height=newh;
        curcoord=(v-minval)/(maxval-minval)*width;
    };
    this.reposition=function(x2,y2){
        x=x2;
        y=y2;
    };
};

var TextDraggableBar=function(txt,x,y,width,height,minval,maxval,initialval,col){
    var n=textWidth(txt);
    var barwidth=width-30-n;
    var bar=new DraggableBar(x+n+20,y,barwidth,height,minval,maxval,initialval,col);
    this.draw= function() {
        drawBox(x,y,width,height,txt);
        bar.draw();
    };
    this.update=function(){
        bar.handleMouseInput();
    };
    this.getVal=function(){
        return bar.getVal();
    };
    this.setVal=function(n){
        bar.setVal(n);
    };
    this.wasMoved=function(){
        return bar.wasMoved();
    };
    
    this.getClickHeld=function(){
        return bar.getClickHeld();
    };
    this.rescale=function(xs,ys){
        width=xs;
        height=ys;
        barwidth=width-30-n;
        bar.rescale(barwidth,ys);
    };
    this.reposition=function(xs,ys){
        x=xs;
        y=ys;
        bar.reposition(x+n+20,ys);
    };
};



var alphav,beta,lambda,w0,k;
lambda=0.0216;
alphav=0.0205;
beta=0.2;
w0=1;
k=3*beta/(8*w0)-5*alphav*alphav/(12*w0*w0);

var rooteq=function(b2,e,f){
    return b2*((e-k*b2)*(e-k*b2)+lambda*lambda)-f*f/(4*w0*w0);
};
var rooteqdiff=function(b2,e,f){
    return -2*b2*k*(e - b2*k) + (e-b2*k)*(e-b2*k) + lambda*lambda;
};

var findSolution=function(b20,e,f){
    var newb20=b20;
    for(var i=0;i<5;i++){
        b20=newb20;
        newb20=b20-rooteq(b20,e,f)/rooteqdiff(b20,e,f);
        if(abs(b20-newb20)<0.05){
            return sqrt(newb20);
        }
    }
    if(abs(b20-newb20)>0.05){
        return -0.1;
        
    }
    return sqrt(b20);
};

var f=0.05;

var redrawCurve=function(){
for(var x=0;x<400;x++){
        for(var j=0;j<1;j++){
            var pt=findSolution(random(0,1),(0.2-(-0.1))*x/400-0.1,f);
            if(pt>0){
                point(x,150-100*pt);
            }
        }
        
}
    
};


background(255, 255, 255);
redrawCurve();
var epsilon=0.08;
var gamma=w0+epsilon;
var ddx=function(x,dx,t){
    return f*cos(gamma*t)-alphav*x*x-beta*x*x*x-w0*w0*x-2*lambda*dx;
};

var xv=0;
var dxv=0;
var redrawcurve2=function(){
    var t=0;
    var dt=0.03;
    xv=0;
    dxv=0;
    for(var j=0;j<10000;j++){
        xv+=dxv*dt;
        dxv+=ddx(xv,dxv,t)*dt;
        t+=dt;
    }
    for(var i=0;i<400;i++){
        for(var j=0;j<20;j++){
            xv+=dxv*dt;
            dxv+=ddx(xv,dxv,t)*dt;
            t+=dt;
            point(i,xv*100+200);
            
            
        }
    }
};

redrawcurve2();
var draw= function() {

};








}};

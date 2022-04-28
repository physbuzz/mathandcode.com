var sketchProc=function(processingInstance){ with (processingInstance){




size(window.innerWidth,window.innerHeight);
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

/** Draggable Bar
 * An object representing a horizontal draggable bar.
 * 
 * Style used from peter collingridge because it's smoooooth. http://www.khanacademy.org/cs/simulation-of-an-ionic-solid/1122503811
 * 
 * Usage
 * ex:
***
var tmp=new DraggableBar(53,38,100,20,11,50,0,color(179, 29, 179));
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
                if(curcoord!=curcoordnew){
                    wasmoved=1;
                    curcoord=curcoordnew;
                }
            }
        }
    };
    this.wasMoved=function(){
        return (wasmoved==1);
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
    }
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

 
 
 
 
 
 
 
 
 
 
 
 


var myFont = createFont("Impact", 15);
var drawBox = function(x, y, w, h, heading) {
    noStroke();
    fill(50, 50, 50, 50);
    rect(x+2, y+2, w, h, 8);
    fill(255, 255, 255, 230);
    rect(x, y, w, h, 8);
    if(heading!==undefined){
        textFont(myFont, 15);
        fill(10, 10, 10);
        text(heading, x+10, y+16);
    }
};

var a=1.4;
var b=-2.3;
var c=2.4;
var d=-2.1;

var map=function(v){
    return {x:Math.sin(a*v.y)-Math.cos(b*v.x),
        y:Math.sin(c*v.x)-Math.cos(d*v.y)
    };
};




var barA=new TextDraggableBar("A:",100,sch-140,scw-200,24,-4,4,1.4,color(0,0,0));
var barB=new TextDraggableBar("B:",100,sch-110,scw-200,24,-4,4,-2.3,color(0,0,0));
var barC=new TextDraggableBar("C:",100,sch-80,scw-200,24,-4,4,2.4,color(0,0,0));
var barD=new TextDraggableBar("D:",100,sch-50,scw-200,24,-4,4,-2.1,color(0,0,0));
var vec={x:1,y:1};
    background(251, 250, 255);
var pointsdrawn=0;
var draw= function() {
    
    
    
    updateMouseStatus();
    if(width!=window.innerWidth || height!=window.innerHeight) {
        scw=window.innerWidth;
        sch=window.innerHeight;
        centerx=window.innerWidth/2;
        centery=window.innerHeight/2;
        size(window.innerWidth,window.innerHeight);
        smooth();
        barA.reposition(100,sch-140);
        barB.reposition(100,sch-110);
        barC.reposition(100,sch-80);
        barD.reposition(100,sch-50);
        barA.rescale(scw-200,24);
        barB.rescale(scw-200,24);
        barC.rescale(scw-200,24);
        barD.rescale(scw-200,24);
    }
    
    
    barA.update();
    barB.update();
    barC.update();
    barD.update();
    
    a=barA.getVal();
    b=barB.getVal();
    c=barC.getVal();
    d=barD.getVal();
    noStroke();
    if(barA.wasMoved() ||barB.wasMoved() ||barC.wasMoved() ||barD.wasMoved()){
        fill(251, 250, 255);
        rect(centerx-300,centery-300,600,600);
        pointsdrawn=0;
    }
    if(pointsdrawn<1000000){
        for(var n=0;n<10000;n++){
            vec=map(vec);
            stroke(0,0,0,10);
            point(centerx+vec.x*100,centery-vec.y*100);
        }
        pointsdrawn+=10000;
    }
    fill(251, 250, 255);
    rect(0,0,scw,70);
    rect(0,sch-150,scw,150);
    
    
    
    textFont(myFont, 19);
    drawBox(353,10,164,45);
    fill(0, 0, 0);
    text("A: "+(""+a).substr(0,5), 360,30);
    text("B: "+(""+b).substr(0,5), 360,50);
    text("C: "+(""+c).substr(0,5), 460,30);
    text("D: "+(""+d).substr(0,5), 460,50);
    
    
    barA.draw();
    barB.draw();
    barC.draw();
    barD.draw();
    


    
    
    
 
    /*
    var ypos1=0;
    drawBox(6,4+ypos1,388,45);
    fill(82, 82, 82);
    textSize(16);
    text("Wave Mechanics!",13,18+ypos1);
    textSize(12);
    text("Related (simpler!) programs in the code comments & in \"tips & \nfeedback\". LOOK AT 'EM.",13,30+ypos1);
    
    
    var ypos=337;
    textSize(12);
    drawBox(6,4+ypos,392,45);
    fill(82, 82, 82);
    text("Driving Frequency: "+drivefreq,13,18+ypos);
    text("Watch for resonance (large amplitudes). Note: at very high frequencies \nthe system undergoes exponential decay instead of oscillating.)",13,30+ypos);*/
    
};



}};
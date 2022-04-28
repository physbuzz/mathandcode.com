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
                curcoord=mouseX-x;
            }
        }
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



var omega=4;
var omega2=omega*omega;
var dt=1;
var damping=0.000;
var numMasses=18;
var drawoff=50;
var drawstep=300/(numMasses-1);
var pt;
var resetPoints=function(){
    pt=[];
    for(var n=0;n<numMasses;n++){
        pt[n]=[];
        for(var m=0;m<numMasses;m++){
            pt[n][m]={
                x:0,y:0,
                vx:0,vy:0,
                accx:0,accy:0
            };
        }
    }
};
var integratePoints=function(dt){
    for(var n=0;n<numMasses;n++){
        for(var m=0;m<numMasses;m++){pt[n][m].vx+=pt[n][m].accx*dt;
            pt[n][m].vy+=pt[n][m].accy*dt;
            pt[n][m].x+=(pt[n][m].vx+0.5*pt[n][m].accx*dt)*dt;
            pt[n][m].y+=(pt[n][m].vy+0.5*pt[n][m].accy*dt)*dt;
            
            pt[n][m].accx=0;
            pt[n][m].accy=0;
        }
    }
};
var getOffset=function(n,m){
    n=n%numMasses;
    m=m%numMasses;
    if(n<0){
        n+=numMasses;
    }
    if(m<0){
        m+=numMasses;
    }
    return {
        x: pt[n][m].x,
        y: pt[n][m].y
    };
};
var getBasis=function(n,m){
    
};
var calculateForces=function(dt){
    for(var n=0;n<numMasses;n++){
        for(var m=0;m<numMasses;m++){
            var left=getOffset(n-1,m);
            var right=getOffset(n+1,m);
            var up=getOffset(n,m-1);
            var down=getOffset(n,m+1);
            var diffx=pt[n][m].x-(left.x+right.x+up.x+down.x)/4;
            var diffy=pt[n][m].y-(left.y+right.y+up.y+down.y)/4;
            pt[n][m].accx=-4*omega2*diffx-pt[n][m].vx*damping;
            pt[n][m].accy=-4*omega2*diffy-pt[n][m].vy*damping;
        }
    }
    
};


var arrayWrap=function(index){
    var ret=index%numMasses;
    if(ret<0){ret+=numMasses;}
    return ret;
};
var arrayToPixel=function(vec){
    var x=vec.x*draww/numMasses-draww/2+centerx;
    var y=vec.y*drawh/numMasses-drawh/2+centery;
    return {x:x,y:y};
};
var pixelToArray=function(vec){
    var x=(vec.x-centerx+draww/2)*numMasses/draww;
    var y=(vec.y-centery+drawh/2)*numMasses/drawh;
    return {x:x,y:y};
};


var drawPoints=function(){
    var border=100;
    var a=pixelToArray({x:border,y:border});
    var b=pixelToArray({x:scw-border,y:sch-border});
    var left=floor(a.x);
    var right=ceil(b.x);
    var down=floor(a.y);
    var up=ceil(b.y);
    
    var u=arrayToPixel({x:left,y:down});
    var v=arrayToPixel({x:left+1,y:down+1});
    var xpos=u.x;
    var ypos=u.y;
    var xstep=v.x-xpos;
    var ystep=v.y-ypos;
   
    for(var n=left;n<right;n++){
        var nindx=arrayWrap(n);
        for(var m=down;m<up;m++){
            var mindx=arrayWrap(m);
            fill(0, pt[nindx][mindx].vx*100+100, pt[nindx][mindx].vy*100+100);
            ellipse(pt[nindx][mindx].x*3+xpos,
            pt[nindx][mindx].y*3+ypos, 15,15);
            ypos+=ystep;
        }
        ypos=u.y;
        xpos+=xstep;
    }
    
};
resetPoints();
var t=0;
dt=0.02;

var drivefreqstep=0.01;
var drivefreq=0.5;
var drivePhase=0;
var freqbar=new TextDraggableBar("Frequency Adjuster:   ",100,sch-80,scw-200,24,0,5,0.5,color(0,0,0));
var dampbar=new TextDraggableBar("Damping Adjuster:     ",100,sch-45,scw-200,24,0,10,0,color(0,0,0));
var draw= function() {
    background(251, 250, 255);
    
    updateMouseStatus();

    if(width!=window.innerWidth || height!=window.innerHeight) {
        scw=window.innerWidth;
        sch=window.innerHeight;
        centerx=window.innerWidth/2;
        centery=window.innerHeight/2;
        size(window.innerWidth,window.innerHeight);
        smooth();
        freqbar.reposition(100,sch-80);
        dampbar.reposition(100,sch-45);
        freqbar.rescale(scw-200,24);
        dampbar.rescale(scw-200,24);
    }
    for(var n=0;n<10;n++){
        drivePhase+=drivefreq*dt;
        t+=dt;
        
        pt[numMasses/2][numMasses/2].x=4*sin(drivePhase);
        pt[numMasses/2][numMasses/2].y=4*(cos(drivePhase)-1);
        integratePoints(dt);
    }
    calculateForces();
    drawPoints();
    
    textFont(myFont, 19);
    drawBox(353,10,164,45);
    fill(0, 0, 0);
    text("Frequency: "+(""+drivefreq).substring(0,4), 360,30);
    text("Damping: "+(""+damping).substring(0,4), 360,50);
    
    
    freqbar.update();
    freqbar.draw();
    if(freqbar.getClickHeld){
        drivefreq=freqbar.getVal();
    } else {
        drivefreq+=0.00005;
        freqbar.setVal(drivefreq);
    }
    
    dampbar.update();
    dampbar.draw();
    damping=dampbar.getVal();
    
    
    
 
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
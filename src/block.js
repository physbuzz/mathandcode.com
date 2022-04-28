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





//Made for http://www.youtube.com/watch?v=vWVZ6APXM4w


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

var GraphicsButton=function(x,y,width,height,onGraphic,offGraphic,pressedFunc){
    var state=0;
    this.mouseIsOverButton=function(){
        if(mouseX>x && mouseY>y && mouseX<x+width && mouseY<y+height){
            return true;
        } else {
            return false;
        }
    };
    this.reposition=function(a,b){
    	x=a;
	y=b;
    }; 
    this.setState=function(arg){
        state=arg;
    };
    
    this.drawButtonNormal=function(){
        drawBox(x,y,width,height);
        this.drawGraphic(x,y);
    };
    this.drawButtonHover=function(){
        drawBox(x,y,width,height,undefined,color(250,250,250,230));
        this.drawGraphic(x,y);
    };
    this.drawButtonPressed=function(){
        drawBox(x+1,y+1,width,height,undefined,color(250,250,250,230));
        this.drawGraphic(x+1,y+1);
    };
    this.drawGraphic=function(x,y){
        if(floor(state/2)===0){
            offGraphic(x,y);
        } else {
            onGraphic(x,y);
        }
    };
    this.draw= function() {
        if(state===0){
            if(this.mouseIsOverButton()&&mouseIsPressed){
                state=1;
            }
        } else if(state===1){
            if(!mouseIsPressed){
                state=2;
                if(pressedFunc!==undefined){
                    pressedFunc();
                }
            }
        } else if(state===2){
            if(this.mouseIsOverButton()&&mouseIsPressed){
                state=3;
            }
        } else if(state===3){
            if(!mouseIsPressed){
                state=0;
                if(pressedFunc!==undefined){
                    pressedFunc();
                }
            }
        }
        
        
        if(this.mouseIsOverButton()){
            if(mouseIsPressed){
                this.drawButtonPressed();
            } else {
                this.drawButtonHover();
            }
        } else {
            this.drawButtonNormal();
        }
    };
};

var pauseSign=function(x,y){
    var ybuffer=5;
    var xbuffer=9;
    fill(255, 0, 0);
    stroke(0, 0, 0);
    rect(x+xbuffer,y+ybuffer,7,30);
    rect(x+xbuffer+13,y+ybuffer,7,30);
};
var playSign=function(x,y){
    var ybuffer=5;
    var xbuffer=12;
    fill(21, 255, 0);
    stroke(0, 0, 0);
    triangle(x+xbuffer,y+ybuffer,x+xbuffer,y+ybuffer+30,x+xbuffer+20,y+ybuffer+15);
};









var mM=2,m=1,mu=15,w=2,h=1,g=1;

//mode 0,1
var x=0,y=0,q=0,a=0.5, b=3.1;
var dtx=0,dty=0,dtq=0,dta=0,dtb=-9;

//mode 2
var cx=0,cy=0,q1=0,q2=0,r1=0,r2=0;
var dtcx=0,dtcy=0,dtq1=0;

    var mode=0;

var resetVariables=function(){
    //mode 0,1
    x=0;y=0;q=0;a=0.51; b=3.1;
    dtx=0;dty=0;dtq=0;dta=0;dtb=-9;

    //mode 2
    cx=0;cy=0;q1=0;q2=0;r1=0;r2=0;
    dtcx=0;dtcy=0;dtq1=0;
    mode=0;
};


var step=function(dt){

    
    if(mode===0){
        var ddtx=0,ddty=0,ddtq=0,ddta=0,ddtb=0;
        ddtb=g;
        if(b<0.5){
            mode=1;
        }
        x+=dtx*dt+0.5*ddtx*dt*dt;
        y+=dty*dt+0.5*ddty*dt*dt;
        q+=dtq*dt+0.5*ddtq*dt*dt;
        a+=dta*dt+0.5*ddta*dt*dt;
        b+=dtb*dt+0.5*ddtb*dt*dt;
        dtx+=ddtx*dt;
        dty+=ddty*dt;
        dtq+=ddtq*dt;
        dta+=ddta*dt;
        dtb+=ddtb*dt;
    } else if(mode===1){
     var ddtx=0,ddty=0,ddtq=0,ddta=0,ddtb=0;
     //equations of motion lazily calculated with Mathematica
     ddtx=(mu*(dta + b*dtq - dtx - dtq*y))/mM;
     ddty=(g*mM + dtb*mu - a*dtq*mu - dty*mu + dtq*mu*x)/mM;
     ddtq=(-12*b*dta*mu + 12*a*dtb*mu - 12*a*a*dtq*mu - 
          12*b*b*dtq*mu + 12*b*dtx*mu - 12*a*dty*mu - 
          12*dtb*mu*x + 24*a*dtq*mu*x + 12*dty*mu*x - 
          12*dtq*mu*x*x + 12*dta*mu*y + 24*b*dtq*mu*y - 
          12*dtx*mu*y - 12*dtq*mu*y*y)/(mM*(h*h + w*w));
     ddta=(-(dta*mu) - b*dtq*mu + dtx*mu + dtq*mu*y)/m;
     ddtb=(g*m - dtb*mu + a*dtq*mu + dty*mu - dtq*mu*x)/m;
     
        x+=dtx*dt+0.5*ddtx*dt*dt;
        y+=dty*dt+0.5*ddty*dt*dt;
        q+=dtq*dt+0.5*ddtq*dt*dt;
        a+=dta*dt+0.5*ddta*dt*dt;
        b+=dtb*dt+0.5*ddtb*dt*dt;
        dtx+=ddtx*dt;
        dty+=ddty*dt;
        dtq+=ddtq*dt;
        dta+=ddta*dt;
        dtb+=ddtb*dt;
     
     if(m*sqrt(ddta*ddta+ddtb*ddtb)<mu/2){
         mode=2;
         //center of mass
         cx=(mM*x+m*a)/(mM+m); 
         cy=(mM*y+m*b)/(mM+m);
         
         //positions in polar coordinates (easier rotation)
         r1=sqrt((x-cx)*(x-cx)+(y-cy)*(y-cy));
         q1=atan2(y-cy,x-cx);
         r2=sqrt((a-cx)*(a-cx)+(b-cy)*(b-cy));
         q2=atan2(b-cy,a-cx)-q1;
         //conservation of linear momentum
         dtcx=(mM*dtx+m*dta)/(mM+m); 
         dtcy=(mM*dty+m*dtb)/(mM+m);
         //conservation of angular momentum
         var i=mM*(h*h + w*w)/12;
         dtq1=(i*dtq+((dtb-dtcy)*(a-x)-(dta-dtcx)*(b-y))*m)/(i+mM*r1*r1+m*r2*r2);
     }
    } else if(mode===2){
        var ddtq1=0,ddtcx=0,ddtcy=g;
        cx+=dtcx*dt+0.5*ddtcx*dt*dt;
        cy+=dtcy*dt+0.5*ddtcy*dt*dt;
        q1+=dtq1*dt+0.5*ddtq1*dt*dt;
        q+=dtq1*dt+0.5*ddtq1*dt*dt;
        dtq=dtq1;
        dtcx+=ddtcx*dt;
        dtcy+=ddtcy*dt;
        dtq1+=ddtq1*dt;
        x=cx+cos(q1)*r1;
        dtx=dtcx-sin(q1)*r1*dtq1;
        y=cy+sin(q1)*r1;
        dty=dtcy+cos(q1)*r1*dtq1;
        a=cx+cos((q2+q1))*r2;
        dta=dtcx-sin((q2+q1))*r2*dtq1;
        b=cy+sin((q2+q1))*r2;
        dtb=dtcy+cos((q2+q1))*r2*dtq1;
        
    }

    

};
var sc=61;
var drawBullet2=function(){
    stroke(0, 0, 0);
    fill(51, 51, 51);
    ellipse(centerx+a*sc,centery+b*sc,20,20);
};
var drawHolder2=function(){
    stroke(0, 0, 0);
    fill(0, 255, 234,20);
    rect(centerx-200,centery+4,399,100);
};
var drawBox2=function(){
    stroke(0, 0, 0);
    pushMatrix();
    translate(centerx+x*sc,y*sc+centery);
    rotate(q);
    fill(255, 0, 0);
    rect(-w*sc/2,-h*sc/2,sc*w,sc*h);
    fill(158, 158, 158);
    ellipse(0,0,10,10);
    line(-5,0,5,0);
    line(0,-5,0,5);
    popMatrix();
};
strokeWeight(1.5);

var pauseSign=function(x,y){
    var ybuffer=5;
    var xbuffer=9;
    fill(255, 0, 0);
    stroke(0, 0, 0);
    rect(x+xbuffer,y+ybuffer,7,30);
    rect(x+xbuffer+13,y+ybuffer,7,30);
};
var playSign=function(x,y){
    var ybuffer=5;
    var xbuffer=12;
    fill(21, 255, 0);
    stroke(0, 0, 0);
    triangle(x+xbuffer,y+ybuffer,x+xbuffer,y+ybuffer+30,x+xbuffer+20,y+ybuffer+15);
};
var resetSign=function(x,y){
    fill(51, 109, 255);
    textSize(30);
    text("Reset",x+7,y+32);
    textSize(12);
};

var timestepBar=new TextDraggableBar("Timestep: ",9,369,378,23,0.0002,0.0016,0.0016,1,color(255,255,255));
var offsetBar=new TextDraggableBar("Initial offset: ",9,341,378,23,-1,1,0.51,1,color(255,255,255));


var isPlaying=0;

var playpause=new GraphicsButton(10,9,40,40,pauseSign,playSign,(function(){isPlaying=1-isPlaying;}));
var resetbutton=new GraphicsButton(286,9,98,40,resetSign,resetSign,(function(){resetVariables();isPlaying=0;playpause.setState(0);a=offsetBar.getVal();}));

var getEnergy=function(){
    return -b+(dta*dta+dtb*dtb)/2+(5*dtq*dtq)/24+dtx*dtx+dty*dty-2*y;
};
var getMomentumX=function(){
    return dta*m+dtx*mM;
};
var getMomentumY=function(){
    return dtb*m+dty*mM;
};
var scalarcross=function(x,y,a,b){
    return x*b-y*a;
};

var getAngularMomentum=function(){
    var i=mM*(h*h + w*w)/12;
    var r1=sqrt(x*x+y*y);
    var r2=sqrt(a*a+b*b);
    return i*dtq+m*scalarcross(a,b,dta,dtb)+mM*scalarcross(x,y,dtx,dty)/*((dtb-dty)*(a-x)-(dta-dtx)*(b-y))*m*/;
};

var getPenDepth=function(){
    if(mode===0){
        return 0;
    } else {
        return (a-x)*cos(q-3.141592/2)+(b-y)*sin(q-3.141592/2)+h/2;
    }
};
width=1;
var draw= function() {
    if(width!=window.innerWidth || height!=window.innerHeight) {
        scw=window.innerWidth;
        sch=window.innerHeight;
        centerx=window.innerWidth/2;
        centery=window.innerHeight/2;
        size(window.innerWidth,window.innerHeight);
        smooth();
        offsetBar.reposition(100,sch-80);
	offsetBar.rescale(scw-200,24);
        timestepBar.reposition(100,sch-50);
        timestepBar.rescale(scw-200,24);
	playpause.reposition(100,50);
	resetbutton.reposition(scw-100-100,50);
    }
    updateMouseStatus();
    background(255, 255, 255);
    if(isPlaying){
        for(var i=0;i<10;i++){
            step(timestepBar.getVal());
        }
    }
    drawBox2();
    drawBullet2();
    drawHolder2();
    offsetBar.draw();
    offsetBar.update();
    timestepBar.draw();
    timestepBar.update();
    
    if(offsetBar.wasMoved()){
        resetVariables();
        playpause.setState(0);
        isPlaying=0;
        a=offsetBar.getVal();
    }
    
    playpause.draw();
    resetbutton.draw();
    fill(0, 0, 0);
    textSize(20);
    text("Energy: "+floor(100*getEnergy())/100,110,sch-100);
    text("Angular Momentum: "+floor(100*getAngularMomentum())/100,110,sch-130);
    text("Penetration Depth: "+floor(100*getPenDepth())/100,scw-290,sch-100);
    text("Y Momentum: "+floor(100*getMomentumY())/100,scw-290,sch-130);
textSize(12);
};













/*var draw= function() {
    
    
    
    if(width!=window.innerWidth || height!=window.innerHeight) {
        scw=window.innerWidth;
        sch=window.innerHeight;
        centerx=window.innerWidth/2;
        centery=window.innerHeight/2;
        size(window.innerWidth,window.innerHeight);
        smooth();
        barA.reposition(100,sch-50);
        barA.rescale(scw-200,24);
    }
    
};*/



}};

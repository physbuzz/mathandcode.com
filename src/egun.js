
var sketchProc=function(processingInstance){ with (processingInstance){




//size(window.innerWidth,window.innerHeight);
size(480,410);
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





var DrawerBox=function(x0,y0,w,h,cellsize){
    this.x0=x0;
    this.y0=y0;
    this.w=w;
    this.h=h;
    this.cellsize=cellsize;
    this.arr=[];
    for(var i=0;i<h;i++){
        this.arr[i]=[];
    }

    this.dragvar=false;
    this.dragnum=2;

    this.mouseIsInGrid=function(){
        return (mouseX>=this.x0 && mouseX<(this.x0+2*this.w*this.cellsize)
                && mouseY>=this.y0 && mouseY<(this.y0+this.h*this.cellsize));
    };
    this.handleMouse=function(){
         if(this.mouseIsInGrid()){
            var x;
            var xpixel;
            if(mouseX<(this.x0+this.w*this.cellsize)){
                x=floor( (mouseX-this.x0)/this.cellsize);
                xpixel=this.x0+x*this.cellsize;
            } else {
                x=floor( (this.x0+2*this.w*this.cellsize-mouseX)/this.cellsize);
                xpixel=this.x0+2*this.w*this.cellsize-(x+1)*this.cellsize;
            }
            var y=floor( (mouseY-this.y0)/this.cellsize);
            if(x>=this.w || x<0 || y>=this.h || y<0){
                return;
            }
            if(mouseStatus===0 || mouseStatus===3){
                this.dragvar=false;
                noStroke();
                fill(255,255,0,200);
                rect(xpixel,this.y0+y*this.cellsize,this.cellsize,this.cellsize);
            } else if(mouseStatus===1){
                this.dragvar=true;
            } else if(mouseStatus===2 && this.dragvar){
                if(x>=this.w || x<0 || y>=this.h || y<0){
                    return;
                }
                this.arr[y][x]=this.dragnum;
            }
        } 
    };
    this.drawMirror=function(){
        stroke(100,0,0);
        var d=this.w*this.cellsize;
        line(this.x0+d,this.y0,this.x0+2*d,this.y0);
        line(this.x0+d,this.y0+this.h*this.cellsize,this.x0+2*d,this.y0+this.h*this.cellsize);
        line(this.x0+2*d,this.y0,this.x0+2*d,this.y0+this.h*this.cellsize);
        noStroke();
        for(var y=0;y<this.h;y++){
            for(var x=1;x<=this.w;x++){
                var col=0;
                if(this.arr[y][this.w-x]===undefined){
                } else {
                    col=(2-this.arr[y][this.w-x])*127;
                    fill(col,col,col);
                    rect(this.x0+w*this.cellsize+(x-1)*this.cellsize,this.y0+y*this.cellsize,this.cellsize,this.cellsize);
                }
            }
        }
    };
    this.draw=function(){
        stroke(100,0,0);
        line(this.x0,this.y0,this.x0+this.w*this.cellsize,this.y0);
        line(this.x0,this.y0+this.h*this.cellsize,this.x0+this.w*this.cellsize,this.y0+this.h*this.cellsize);
        line(this.x0,this.y0,this.x0,this.y0+this.h*this.cellsize);
        noStroke();
        for(var y=0;y<this.h;y++){
            for(var x=0;x<this.w;x++){
                var col=0;
                if(this.arr[y][x]===undefined){
                } else {
                    col=(2-this.arr[y][x])*127;
                    fill(col,col,col);
                    rect(this.x0+x*this.cellsize,this.y0+y*this.cellsize,this.cellsize,this.cellsize);
                }
            }
        }
    };
    this.clear=function(){
        for(var i=0;i<h;i++){
            this.arr[i]=[];
        }
    };
};



var w=40;
var h=40;
var cell=10;
var arr=[];
for(var i=0;i<h;i++){
    arr[i]=[];
}

var drawCells=function(){
    noStroke();
    for(var y=0;y<h;y++){
        for(var x=0;x<w;x++){
            var col=0;
            if(arr[y][x]===undefined){
                col=255;
            }else{
                col=(1-arr[y][x])*255;
                fill(col,col,col);
                rect(x*cell,y*cell,cell,cell);
            }
        }
    }
};
var flipCell=function(x,y){
    if(x<w && y<h && x>=0 && y>=0){
    if(arr[y][x]===undefined){
        arr[y][x]=1;
    } else {
        arr[y][x]=1-arr[y][x];
        println(arr[y][x]);
    }}
        
};
var highlightCell=function(x, y){
    if(x<w && y<h && x>=0 && y>=0){
    noStroke();
    fill(255,255,0,200);
    rect(x*cell,y*cell,cell,cell);
        
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

var GraphicsButton=function(x,y,width,height,onGraphic,offGraphic,pressedFunc){
    var state=0;
    this.mouseIsOverButton=function(){
        if(mouseX>x && mouseY>y && mouseX<x+width && mouseY<y+height){
            return true;
        } else {
            return false;
        }
    };
    this.turnOff=function(){
        state=0;
    }
    
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

var littleCheck=function(x,y){
    fill(21, 255, 0);
    stroke(20, 107, 0);
    strokeWeight(2);
    
    line(x+7,y+11,x+10,y+15);
    line(x+15,y+4,x+10,y+15);
    strokeWeight(1);
    
};
var littleUnchecked=function(x,y){
    fill(21, 255, 0);
    stroke(112, 0, 0);
    strokeWeight(2);
    var l=5;
    line(x+l,y+l,x+20-l,y+20-l);
    line(x+l,y+20-l,x+20-l,y+l);
    strokeWeight(1);
    
};
var resetSign=function(x,y){
    fill(51, 109, 255);
    textSize(30);
    text("Reset",x+7,y+32);
    textSize(12);
};
var recomputeSign=function(x,y){
    fill(51, 109, 255);
    textSize(30);
    text("Recompute",x+7,y+32);
    textSize(12);
};

var DataObject=function(){
    this.arr=[];
//n2 is the length of the z axis of the solution
//n1 is the length of the rho (radial) axis of the solution
//f should be a list of boundary values, in the form [[i1,i2,i3,...],[j1,j2,j3,...],[v1,v2,v3,...]]
    this.fillSoln=function(n1,n2,f){
        this.arr=getSoln(n1,n2,f);
    };
    var lerp=function(t,a,b){return (b-a)*t+a;};
    this.getValAt=function(x,y){
        if(x<0)
            return this.getValAt(-x,y);
        if(this.arr===undefined)
            return 0;
        if(this.arr[0]===undefined)
            return 0;
        if(x<0 || y<0 || y>=this.arr[0].length || x>=this.arr.length) 
            return 0;
        if(this.arr[floor(x)]===undefined) {
            //alert(floor(x));
            return 0;
        }
        var phiss=this.arr[floor(x)][floor(y)];
        var phisl=0;
        var phils=0;
        var phill=0;
        if(ceil(x)<this.arr.length){
           phils=this.arr[ceil(x)][floor(y)]; 
        }
        if(ceil(y)<this.arr[0].length){
           phisl=this.arr[floor(x)][ceil(y)]; 
        }
        if(ceil(x)<this.arr.length && ceil(y)<this.arr[0].length){
           phill=this.arr[ceil(x)][ceil(y)]; 
        }
        var fracx=x%1.0;
        var fracy=y%1.0;
        return lerp(fracy,lerp(fracx,phiss,phils),lerp(fracx,phisl,phill));
    };
    //returns an incorrect value if the vector (dx,dy) isn't normalized.
    this.directionalDeriv=function(x,y,dx,dy){
        return (this.getValAt(x+dx,y+dy)-this.getValAt(x-dx,y-dy))/2;
    };
    
    this.draw=function(x0,y0,size){
        
        if(this.arr===undefined)
            return;
        for(var i=0;i<this.arr.length;i++){
            if(this.arr[i]===undefined)
                return;
            for(var j=0;j<this.arr[i].length;j++){
                var col=0;
                if(this.arr[i][j]===undefined){
                } else {
                    col=this.arr[i][j]*255;
                    //fill(col,col,col);
                    //fill(255,255,255-0.5*col);
                    fill(200-0.5*col,200-0.5*col,200);
                    rect(x0+(this.arr.length-1)*size-i*size,y0+j*size,size,size);
                }
            }
        }
    };  
    this.drawMirror=function(x0,y0,size){
        if(this.arr===undefined)
            return;
        for(var i=0;i<this.arr.length;i++){
            if(this.arr[i]===undefined)
                return;
            for(var j=0;j<this.arr[i].length;j++){
                var col=0;
                if(this.arr[i][j]===undefined){
                } else {
                    col=this.arr[i][j]*255;
                    fill(200-0.5*col,200-0.5*col,200);
                    rect(x0+this.arr.length*size+i*size,y0+j*size,size,size);
                }
            }
        }
    };  
};
/*
var v=0;
var q=0;
var toggle=0;
var hello=new GraphicsButton(100,175,40,40,pauseSign,playSign,(function(){toggle=1-toggle;})
);
var hello3=new GraphicsButton(156,175,20,20,littleCheck,littleUnchecked,(function(){})
);
var bar=new TextDraggableBar("Text! ",9,140,380,23,-5,6,1,color(255,255,255));
*/



var resetx=20;
var resety=330;
var checkboxesx=320;
var checkboxesy=100;
var recomputex=130;
var recomputey=330;
var checkboxdelta=25;
var dragx=10;
var dragy=380;
var dragw=300;
var gridvolt=new TextDraggableBar("Grid Voltage:",dragx,dragy,dragw,20,0,1,1,color(255,0,0));
/*
var trajx=200;
var trajy=700;*/

var resetbutton=new GraphicsButton(resetx,resety,98,40,resetSign,resetSign,(function(){drawbox.clear();}));

var erasecheckbox=new GraphicsButton(checkboxesx,checkboxesy,20,20,littleCheck,littleUnchecked,(function(){
whitecheckbox.turnOff();
greycheckbox.turnOff();
blackcheckbox.turnOff();
drawbox.dragnum=undefined;
}));
var whitecheckbox=new GraphicsButton(checkboxesx,checkboxesy+checkboxdelta,20,20,littleCheck,littleUnchecked,(function(){
erasecheckbox.turnOff();
greycheckbox.turnOff();
blackcheckbox.turnOff();
drawbox.dragnum=0;
}));
var greycheckbox=new GraphicsButton(checkboxesx,checkboxesy+2*checkboxdelta,20,20,littleCheck,littleUnchecked,(function(){
erasecheckbox.turnOff();
whitecheckbox.turnOff();
blackcheckbox.turnOff();
drawbox.dragnum=1;
}));
var blackcheckbox=new GraphicsButton(checkboxesx,checkboxesy+3*checkboxdelta,20,20,littleCheck,littleUnchecked,(function(){
erasecheckbox.turnOff();
whitecheckbox.turnOff();
greycheckbox.turnOff();
drawbox.dragnum=2;
}));

var recomputebutton=new GraphicsButton(recomputex,recomputey,170,40,recomputeSign,recomputeSign,(function(){recompute();}));


var potentialdata=new DataObject();

var recompute=function(){
    var n1=drawbox.w;
    var n2=drawbox.h;
    var f=[[],[],[]];
    for(var x=0;x<n1;x++){
        for(var y=0;y<n2;y++){
            if(drawbox.arr[y][x]!==undefined){
                f[0].push(n1-1-x);
                f[1].push(y);
                //var valpush=0.5*drawbox.arr[y][x];
                var valpush=0;
                if(drawbox.arr[y][x]===1){
                    valpush=gridvolt.getVal();
                }else if(drawbox.arr[y][x]===2){
                    valpush=1;
                }
                f[2].push(valpush);
            }
        }
    }
    potentialdata.fillSoln(n1,n2,f);
};

var drawCurve=function(x0,y0,q){
    var ds=0.5;
    var n=50;
    var lastx=x0;
    var lasty=y0;
    var x=lastx+0.5*cos(q);
    var y=lasty+0.5*sin(q);
    for(var i=0;i<n;i++){
        var denom=potentialdata.getValAt(x0,y0)-potentialdata.getValAt(x,y)+0.1;
        if(denom<0)
            break;
        var num=potentialdata.directionalDeriv(x,y,sin(q),-cos(q));
        if(abs(num)>1) {
            //var dx=sin(q);
            //var dy=-cos(q);
            //alert(potentialdata.getValAt(x+dx*0.01,y+dy*0.01));
            //alert(potentialdata.getValAt(x-dx*0.01,y-dy*0.01));
        }
        if(denom!==0)
            q+=0.5*num/denom*ds;
        //q+=potentialdata.getValAt(x0,y0)*0.1;
        stroke(0,0,0);
        var s=drawbox.cellsize;
        var w=drawbox.w;
        line(drawbox.x0+s*w-lastx*s,drawbox.y0+lasty*s,
                drawbox.x0+s*w-x*s,drawbox.y0+y*s);
        line(drawbox.x0+s*w+lastx*s,drawbox.y0+lasty*s,
                drawbox.x0+s*w+x*s,drawbox.y0+y*s);
        lastx=x;
        lasty=y;
        x+=ds*cos(q);
        y+=ds*sin(q);
    }
};


var toggle=0;
//var drawtraj=new GraphicsButton(trajx,trajy,40,40,pauseSign,playSign,(function(){toggle=1-toggle;}));

var drawGui=function(){
    resetbutton.draw();
    erasecheckbox.draw();
    whitecheckbox.draw();
    greycheckbox.draw();
    blackcheckbox.draw();
    gridvolt.draw();
    gridvolt.update();
    fill(0,0,0);
    var o=14
textSize(12); text("Erase",checkboxesx+30,checkboxesy+o);
text("Draw Ground Voltage",checkboxesx+30,checkboxesy+o+1*checkboxdelta);
text("Draw Grid Voltage",checkboxesx+30,checkboxesy+o+2*checkboxdelta);
text("Draw Gun Voltage",checkboxesx+30,checkboxesy+o+3*checkboxdelta);
    recomputebutton.draw();
    //drawtraj.draw();
};

var drawbox=new DrawerBox(10,10,15,30,10);


var draw=function(){
    background(200,200,200);
    updateMouseStatus();
    drawGui();
    //drawCells();
    //highlightCell(floor(mouseX/cell),floor(mouseY/cell));
    noStroke();
    potentialdata.draw(drawbox.x0,drawbox.y0,10);
    potentialdata.drawMirror(drawbox.x0,drawbox.y0,10);
    drawbox.handleMouse();
    drawbox.draw();
    drawbox.drawMirror();
    for(var i=0;i<10;i++){
        stroke(0,0,50);
    drawCurve(1-0.09*i,24,-1.3-0.1*i);
    //drawCurve(-1+0.03*i,28,3.141592+1.3+0.1*i);
    }
    /*for(var i=0;i<5;i++){
        stroke(0,0,50);
    drawCurve(1-0.2*i,24,-3.141592/2.0-0.1*i);
    //drawCurve(-1+0.03*i,28,3.141592+1.3+0.1*i);
    }*/
};
}};

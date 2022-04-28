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

//Constants:
var g=1;
var L=350;
var turnrad=10;
var dotrad=5;

var chainPos=function(h,l){
	if(l<0 || l>L)
		return {x:0,y:0};
	if(l<(L-h-3.141592*turnrad)/2.0)
		return {x:0,y:-l};
	if(l<(L-h+3.141592*turnrad)/2.0){
		var ang=(l-(L-h-3.141592*turnrad)/2.0)/turnrad;
		return {x:turnrad-turnrad*cos(ang),y:-(L-h-3.141592*turnrad)/2.0-turnrad*sin(ang)};
	} else
		return{x:2*turnrad,y:-L+h+l};
//		//return{x:2*turnrad,y:-(L-h-3.141592*turnrad)/2.0+l-(L-h+3.141592*turnrad)/2.0};
};

var drawChain=function(h){
	var x=100;
	var y=10;
	var lastx=x;
	var lasty=y;
	var links=ceil(L/(dotrad+4));
	for(var i=1;i<=links;i++){
		var n=chainPos(h,i*L/links);
		var newx=n.x+x;
		var newy=y-n.y;
		line(lastx,lasty,newx,newy);
		lastx=newx;
		lasty=newy;
	}
	fill(0,255,0);
	for(var i=1;i<=links;i++){
		var n=chainPos(h,i*L/links);
		var newx=n.x+x;
		var newy=y-n.y;
		ellipse(newx,newy,dotrad,dotrad);
	}

};

var h=0;
var dh=0;
var haccel=function(h,dh){
	//avoid division by zero
	if(abs(h)<L-5)
		return -g-dh*dh/(2*(L+h));
	else
		return 0;
};
var h2=0;
var dh2=0;

var draw= function() {
    background(255, 255, 255);
    stroke(0,0,0);
    for(var i=0;i<10;i++){
	    var dt=0.01;
	    dh+=dt*haccel(h,dh);
	    h+=dh*dt;
	    dh2-=dt*g;
	    h2+=dh2*dt;
    }
    fill(255,0,0);
    ellipse(130,10-h2,7,7);
    drawChain(h);


    if(h<-L-400){
	    h2=0;
	    dh2=0;
	    h=0;
	    dh=0;
    }
};



}};

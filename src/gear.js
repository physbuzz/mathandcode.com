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

//uses the equations from https://www.khanacademy.org/cs/big-differential-equation/1705707187 to calculate the motion of a 

var connector_L=62; //Length of the connector between the piston and the gear
var gear_r=10; //radius on the gear of where the piston connects to the gear
var piston_height=38;
var piston_width=28;
var gear_theta=90; //current angle of the piston


var r,l,g,m1,m2;
l=connector_L; r=gear_r;g=1;
m1=11; //mass of the rotating gear
m2=11; //mass of the piston


var h=function(q){
    var c=cos(q);
    var s=sin(q);
    var l2=l*l;
    var r2=r*r;
    var c2=c*c;
    return r*s+sqrt(l2-r2*c2);
};
var dh=function(q){
    var c=cos(q);
    var s=sin(q);
    var l2=l*l;
    var r2=r*r;
    var c2=c*c;
    return r*c+r2*c*s/sqrt(l2-r2*c2);
};
var ddh=function(q){
    var c=cos(q);
    var s=sin(q);
    var l2=l*l;
    var r2=r*r;
    var c2=c*c;
    var s2=s*s;
    var lrc=sqrt(l2-r2*c2);
    return -r*s+r2*(c2-s2-r2*c2*s2/(lrc*lrc))/lrc;
};
var acceleration=function(q,qdot){
    return -(g*m2*dh(q)+m2*dh(q)*qdot*qdot*ddh(q))/((m1*r*r)/2+m2*dh(q)*dh(q));
};

var col1=color(255, 0, 0);
var col2=color(156, 252, 156);
var col3=color(0, 0, 255);
var col4=color(101, 138, 0);


var drawgraphs=function(){
    
    fill(col1);
    text("Mass Height",0,20);
    fill(col2);
    text("Mass Velocity",0,40);
    fill(col3);
    text("Mass Acceleration",0,60);
    fill(col4);
    text("Angular acceleration",0,80);
    strokeWeight(2);
    for(var x=0;x<400;x++){
        stroke(col1);
        point(x,200-10*h(x*6.28/400));
        stroke(col2);
        point(x,200-10*dh(x*6.28/400));
        stroke(col3);
        point(x,200-10*ddh(x*6.28/400));
        stroke(col4);
        point(x,200-10*acceleration(x*6.28/400,2.3));
    }
    stroke(0,0,0);
    
    line(0,200,400,200);
};


var q=3.141592/4;
var qdot=0.01;




var drawGear=function(radius,toothnum,toothheight,theta){
    var n=0;
    var curRadius=radius-toothheight/2;
    var curTheta=theta+3.141592/toothnum;
    var x=curRadius*cos(curTheta);
    var y=curRadius*sin(curTheta);
    beginShape();
        for(n=0;n<toothnum*4;n++){
            if(n%4===0){
                curRadius+=toothheight;
            }
            if(n%4===2){
                curRadius-=toothheight;
            }
            curTheta=theta+(n-0.25)*3.141592*0.5/toothnum;
            x=curRadius*cos(curTheta);
            y=curRadius*sin(curTheta);
            vertex(x,y);
        }
    endShape(CLOSE);
};

var drawPiston=function(width,height){
    beginShape();
        vertex(-width/2,0);
        vertex(width/2,0);
        vertex(width/2,height*5/7);
        vertex(width*1/3,height*5/7);
        vertex(width*1/3,height*6/7);
        vertex(width/2,height*6/7);
        vertex(width/2,height*5/4);
        vertex(-width/2,height*5/4);
        vertex(-width/2,height*6/7);
        vertex(-width*1/3,height*6/7);
        vertex(-width*1/3,height*5/7);
        vertex(-width/2,height*5/7);
    endShape(CLOSE);
    fill(74, 74, 74);
    ellipse(0,height,height/4,height/4);
};

var drawConnector=function(xfrom,yfrom,xto,yto,radius){
    var dirx=xto-xfrom;
    var diry=yto-yfrom;
    var d=sqrt(dirx*dirx+diry*diry);
    dirx/=d;
    diry/=d;
    var tmp=dirx;
    dirx=-diry*radius;
    diry=tmp*radius;
    var circleResolution=20;
    var rotc=cos(3.141592/circleResolution);
    var rots=sin(3.141592/circleResolution);
    var n;
    var dirxtmp;
    var dirytmp;
    beginShape();
    for(n=0;n<circleResolution;n++){
        vertex(dirx+xfrom,diry+yfrom);
        dirxtmp=dirx*rotc-diry*rots;
        dirytmp=diry*rotc+dirx*rots;
        dirx=dirxtmp;
        diry=dirytmp;
    }
    vertex(dirx+xfrom,diry+yfrom);
    vertex(dirx+xto,diry+yto);
    for(n=0;n<circleResolution;n++){
        vertex(dirx+xto,diry+yto);
        dirxtmp=dirx*rotc-diry*rots;
        dirytmp=diry*rotc+dirx*rots;
        dirx=dirxtmp;
        diry=dirytmp;
    }
    vertex(dirx+xto,diry+yto);
    endShape(CLOSE);
};

var drawPistonAssembly=function(theta){
    
    
    strokeWeight(2);
    stroke(84, 84, 84);
    fill(158, 158, 158);
    drawGear(gear_r+10,12,3,theta);
    
    noStroke();
    fill(61, 61, 61);
    ellipse(cos(theta)*gear_r,sin(theta)*gear_r,14,14);

    var height=sin(theta)*gear_r-sqrt(connector_L*connector_L-cos(theta)*gear_r*gear_r*cos(theta));
    
    
   strokeWeight(2);
    stroke(84, 84, 84);
    fill(163, 163, 163);
    pushMatrix();
    translate(0,height-piston_height);
    drawPiston(piston_width,piston_height);
    popMatrix();
    
    stroke(107, 107, 107);
    fill(172, 207, 177);
    strokeWeight(2);
    drawConnector(cos(theta)*gear_r,sin(theta)*gear_r,0,height,3);
};
frameRate(30);


var draw= function() {
    background(255, 255, 255);
    
    for(var n=0;n<100;n++){
    	var dt=0.005;
        var qdotdot=acceleration(q,qdot);
        q+=qdot*dt;
        qdot+=qdotdot*dt;
    
    }
    
    gear_theta=-q;
    pushMatrix();
    translate(200,150);
    drawPistonAssembly(gear_theta);
    popMatrix();
};



}};

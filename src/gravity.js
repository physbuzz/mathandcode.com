 var sketchProc=function(processingInstance){
  with (processingInstance){

var centerx=window.innerWidth/2;
var centery=window.innerHeight/2;
var scalesize=window.innerWidth/5;
size(window.innerWidth,window.innerHeight);
smooth();
frameRate(30);
var drawposx1=-100;
var drawposx2=-100;
var drawposx3=-100;
var drawposy1=-100;
var drawposy2=-100;
var drawposy3=-100;
      

var sx1=200.0;
var sy1=200.0;
var m1=2.0;
var sx2=200.0;
var sy2=300.0;
var m2=2.0;
var sx3=300.0;
var sy3=300.0;
var m3=2.0;
var g=20;



var sxv2=-0.1;

var syv2=0.0;

var sxv3=0.3;

var syv3=0.2;



var dt=4.0;



var num_iterations=1000;



var n=1;

/*

note: usually you'd use objects for all this to simplify the code. I

just forget how to do this in javascript and it seems like most code

here focuses on readability for beginners, so I'm just dealing with

vars.

*/

var drawGrav = function(velx,vely,arg) {

    

    //object 1 position and velocity

    var x1=sx1;

    var y1=sy1;

    var xv1=velx;

    var yv1=vely;

    

    //object 2 position and velocity

    var x2=sx2;

    var y2=sy2;

    var xv2=sxv2;

    var yv2=syv2;

    

    //object 3 position and velocity

    var x3=sx3;

    var y3=sy3;

    var xv3=sxv3;

    var yv3=syv3;

    

    
    
    //zero momentum
    var summass=m1+m2+m3;
    var massposx=(x1*m1+x2*m2+x3*m3)/summass;
    var massposy=(y1*m1+y2*m2+y3*m3)/summass;
    var massvelx=(xv1*m1+xv2*m2+xv3*m3)/summass;
    var massvely=(yv1*m1+yv2*m2+yv3*m3)/summass;
    x1-=massposx-centerx;
    x2-=massposx-centerx;
    x3-=massposx-centerx;
    y1-=massposy-centery;
    y2-=massposy-centery;
    y3-=massposy-centery;
    xv1-=massvelx;
    xv2-=massvelx;
    xv3-=massvelx;
    yv1-=massvely;
    yv2-=massvely;
    yv3-=massvely;
    
    
    

    //for visual purposes, put it in a zero momentum frame of reference.

    

    var cmxv=(xv1*m1+xv2*m2+xv3*m3)/(m1+m2+m3);

    var cmyv=(yv1*m1+yv2*m2+yv3*m3)/(m1+m2+m3);

    xv1=xv1-cmxv;

    yv1=yv1-cmyv;

    xv2=xv2-cmxv;

    yv2=yv2-cmyv;

    xv3=xv3-cmxv;

    yv3=yv3-cmyv;

    

    for(var n=0;n<num_iterations;n++)

    {

        

        

        if(n===arg) {
            drawposx1=x1;
            drawposy1=y1;
            drawposx2=x2;
            drawposy2=y2;
            drawposx3=x3;
            drawposy3=y3;
        }
        smooth();
        noStroke();
        fill(230, 50, 50);
        ellipse(x1,y1,4,4);

        fill(11, 161, 141);
        ellipse(x2,y2,4,4);
        
        fill(11, 207, 56);
        ellipse(x3,y3,4,4);

        

        //distances between the three masses

        var dist12=sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));

        var dist23=sqrt((x2-x3)*(x2-x3)+(y2-y3)*(y2-y3));

        var dist31=sqrt((x3-x1)*(x3-x1)+(y3-y1)*(y3-y1));

        

        //force acting on 2 from 1.

        var fx12=(g*m1*m2*(x1-x2))/(dist12*dist12*dist12);

        var fy12=(g*m1*m2*(y1-y2))/(dist12*dist12*dist12);

        

        //force acting on 3 from 2

        var fx23=(g*m2*m3*(x2-x3))/(dist23*dist23*dist23);

        var fy23=(g*m2*m3*(y2-y3))/(dist23*dist23*dist23);

        

        //force acting on 1 from 3

        var fx31=(g*m3*m1*(x3-x1))/(dist31*dist31*dist31);

        var fy31=(g*m3*m1*(y3-y1))/(dist31*dist31*dist31);

        

        xv1=xv1+(fx31-fx12)*dt/m1; 

        yv1=yv1+(fy31-fy12)*dt/m1;

        xv2=xv2+(fx12-fx23)*dt/m2;

        yv2=yv2+(fy12-fy23)*dt/m2;

        xv3=xv3+(fx23-fx31)*dt/m3;

        yv3=yv3+(fy23-fy31)*dt/m3;

        

        x1=x1+xv1*dt;

        y1=y1+yv1*dt;

        x2=x2+xv2*dt;

        y2=y2+yv2*dt;

        x3=x3+xv3*dt;

        y3=y3+yv3*dt;

        

    }

    

};




var elapsed=0;
var draw = function() {
      
    centerx=window.innerWidth/2;
    centery=window.innerHeight/2;
    if(width!=window.innerWidth || height!=window.innerHeight) {
        size(window.innerWidth,window.innerHeight);
        smooth();
    }
    background(0);
    n=n+4;
    drawGrav((mouseX-centerx)/scalesize,(mouseY-centery)/scalesize,n);
    if(n>=num_iterations){
        n=0;
    }
    fill(255,255,255);
    noStroke();
    ellipse(drawposx1,drawposy1,10,10);
    ellipse(drawposx2,drawposy2,10,10);
    ellipse(drawposx3,drawposy3,10,10);
    elapsed++;
    textSize(30);
    fill(200,200,200);
    smooth();
    text("Gravity",centerx-textWidth("Gravity")/2,height-30);
    fill(120,120,120);
    textSize(15);
    text("Contact: dmoore101@gmx.com",centerx-textWidth("Contact: dmoore101@gmx.com")/2,height-11);
};

}};
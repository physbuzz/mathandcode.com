---
layout: post
title:  "Simulation of How to Build an Electron Gun"
date:   2015-09-04 12:00:00
tags: Physics Technical 
permalink: egun
---

The following post provides a basic electron gun simulation and
guides you through the various components. 
The simulation assumes 
*cylindrical symmetry* about the central vertical axis. That means that
if you draw a horizontal line, you've really drawn a solid disk, and if
you draw a vertical line, you've really drawn a hollow cylinder.

This program was made for fun in ~2013 after a lab course at Miramar college,
where we repeated JJ Thomson's experiment to find the charge-to-mass ratio of an electron.
My hope is that it illustrates the significance of the gun voltage, grid voltage, and ground voltage
in that classic experiment.

 <script src="{{ site.baseurl }}/src/numeric-1.2.6.min.js"></script>
 <script src="{{ site.baseurl }}/src/processing-1.3.6.min.js"></script> 

 <script src="{{ site.baseurl }}/src/eguncomputation.js"></script> 
 <canvas id="mycanvas" style="width:400px; height:400px; margin-left:auto;margin-right:auto;"></canvas>
 <script src="{{ site.baseurl }}/src/egun.js"></script> 
 <script type="application/javascript">
  
var canvas = document.getElementById("mycanvas");
var processingInstance = new Processing(canvas, sketchProc);
 </script>

<p>The black trajectories are electrons being 
"boiled" off from a hot filament. They don't have
much energy and they're randomly oriented. An
electron gun increases their energy and also serves
to focus them into a beam. We start with the blank applet:</p>


<div class="imageholder" style="margin-left:auto;margin-right:auto;margin-bottom:10px;width:475px; height:410px;background: url({{site.baseurl}}/img/egun1.png) no-repeat;"><img src="{{site.baseurl}}/img/egun1.png"></div>
<p>Start out by selecting "Draw Gun Voltage" and
drawing a shape as follows. This is called a 
Wehnelt cylinder, and it's held at a very negative
voltage. Electrons will try to get away from the 
Wehnelt cylinder and go back into a positive energy region.</p>
<div class="imageholder" style="margin-bottom:10px;margin-left:auto;margin-right:auto;width:475px; height:410px;background: url({{site.baseurl}}/img/egun2.png) no-repeat;"><img src="{{site.baseurl}}/img/egun2.png"></div>

<p>Next, select "draw grid voltage" and draw a little line right
below where electrons are being emitted.</p>
<div class="imageholder" style="margin-bottom:10px;margin-left:auto;margin-right:auto;width:475px; height:410px;background: url({{site.baseurl}}/img/egun3.png) no-repeat;"><img src="{{site.baseurl}}/img/egun3.png"></div>
<p>Next, drag the bar that says "grid voltage" slightly to the left. 
Don't drag it too far.</p>
<div class="imageholder" style="margin-bottom:10px;margin-left:auto;margin-right:auto;width:475px; height:410px;background: url({{site.baseurl}}/img/egun4.png) no-repeat;"><img src="{{site.baseurl}}/img/egun4.png"></div>
<p>Finally, hit "recompute". The program 
computes the voltages all over the region
and then calculates electron trajectories. </p>
<div class="imageholder" style="margin-bottom:10px;margin-left:auto;margin-right:auto;width:475px; height:410px;background: url({{site.baseurl}}/img/egun5.png) no-repeat;"><img src="{{site.baseurl}}/img/egun5.png"></div>
<p>You can add a region held at ground to change the beam profile. 
This would make a big difference in an experimental setup, but 
in this simulation the edges of the computational region
are held at ground anyways, so it doesn't make a big difference.</p>
<div class="imageholder" style="margin-bottom:10px;margin-left:auto;margin-right:auto;width:475px; height:410px;background: url({{site.baseurl}}/img/egun6.png) no-repeat;"><img src="{{site.baseurl}}/img/egun6.png"></div>
<p>As you lower the grid voltage, the electron profile changes, and
the beam gets more focused.</p>
<div class="imageholder" style="margin-bottom:10px;margin-left:auto;margin-right:auto;width:475px; height:410px;background: url({{site.baseurl}}/img/egun7.png) no-repeat;"><img src="{{site.baseurl}}/img/egun7.png"></div>
<div class="imageholder" style="margin-bottom:10px;margin-left:auto;margin-right:auto;width:475px; height:410px;background: url({{site.baseurl}}/img/egun8.png) no-repeat;"><img src="{{site.baseurl}}/img/egun8.png"></div>
<p>The electrons constantly try to get in a region of more-positive (less blue) 
potential. Once the grid voltage gets too positive, the edges of the 
Wehnelt cylinder push the electrons away to a greater degree than they can overcome. 
The electron gun has reached its cutoff voltage.</p>
<div class="imageholder" style="margin-bottom:10px;margin-left:auto;margin-right:auto;width:475px; height:410px;background: url({{site.baseurl}}/img/egun9.png) no-repeat;"><img src="{{site.baseurl}}/img/egun9.png"></div>
<br><br><br>









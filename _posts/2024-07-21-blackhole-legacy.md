---
layout: post
title:  "Black Hole Raytracer (2015)"
date:   2024-07-21 12:00:00
comments: true
---

> [Source code here.](https://github.com/physbuzz/blackhole-2015)

I took my first general relativity course in 2015, just before the first gravitational waves were detected. That summer I read through "Manifolds, Tensors, and Forms: An Introduction for Mathematicians and Physicists" by Paul Renteln, a book which I highly recommend to anyone.

Interstellar came out a year beforehand, along with [two papers](https://arxiv.org/abs/1502.03808) outlining how to create a fast renderer for black hole spacetimes. But I wasn't about to let some no-name like Kip Thorne tell me how to write my code, instead I opted to try it my own way first!

In a simple ray tracer, each pixel on the screen corresponds to exactly one ray. 
For example, in the following image the rays on the left side of the screen (the blue rays) are just about to start spiraling into the black hole, so it ends up corresponding to a black pixel. The green, yellow, and red rays all escape the black hole, and so they get mapped to some color from the sky sphere. 

![Ray trajectories in a Schwarzschild black hole metric](/img/rays.png)

Carry this out enough times, and we can animate the view from a spaceship orbiting a black hole! The black hole has zero angular momentum and the camera isn't pointed directly at the black hole.

![Animated gif of a rotating black hole](/img/blackhole-600.gif)

I just reuploaded the source code to github. It's quite ugly and slow but it works! [Source code here.](https://github.com/physbuzz/blackhole-2015) You can also find some of the mathematics in the Mathematica notebook [blackhole-math.nb](/media/blackhole-math.nb) or the pdf version of this notebook [blackhole-math.pdf](/media/blackhole-math.pdf)

The .gif hinges on the beautiful space background image, [jupiter.bmp](https://github.com/physbuzz/blackhole-2015/blob/master/jupiter.bmp). I was not able to find the correct citation for this, I think it's from the Interstellar authors, but please email me if you find out where this is from!




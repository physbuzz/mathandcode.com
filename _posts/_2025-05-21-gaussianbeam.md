---
layout: post
title:  "Gaussian Beams in 2D for Wave Tank Simulations"
date:   2025-05-21 01:00:01 -0800
---

## Why use Gaussian Beams
I've been making a lot of wave tank simulations lately, and oftentimes I want to think about a well-collimated beam. The thing with waves is that they really want to spread out. In every day life we know that a laser pointer seems to trace out a perfect line, but when we go to a wave tank simulation and try to make a beam, the simulation can look more like we chucked a rock into a pond--no beams or rays to speak of.

Now, we're physicists, right? So we can figure out the answer to the question: what is the absolutely best, most-collimated beam what we can make for a given wavelength $\lambda$? 

A Gaussian Beam initial condition can give us a handle on this problem. It gives us the formulas for how much a beam will spread over a distance $L$. It also lets us apply a second trick: start our beam focused slightly inwards. Then for the first $L$-length the beam will focus and get sharper before spreading out over the next $L$-length. The following image is a good somewhat exaggerated example of this. We start the beam on the left side of the screen with the wavefronts focused inwards. The beam focuses towards the center of the screen, and then it diverges again.

![Wave focusing and defocusing](/img/posts/gaussianwavesmsm.gif)

The above image is just an approximation which fails as the frequency gets lower, but here is an image of the same initial conditions plugged into a full simulation. 

![The same scenario as the previous situation, but simulated](/img/posts/gaussianwave-simulated.gif)

We can do a much better job by going to higher frequencies and not trying to focus the beam so sharply. Here is a better example of a (fully-simulated) beam. If we imagined continuing this image far to the right, we'd see that it spreads out in a cone or V shape. But for our simulation domain, it looks like a beam, and that's what counts.

![The same scenario as the previous situation, but with high wavenumber](/img/posts/gaussianbeam-highk.png)

## Statement + Code
Say we're in 2D and the world is described by some wave $\phi(x,y,t)$. The medium has wave speed $c$, and we want to send in a ray of light in the +x direction (a collimated wave) with some high frequency $\omega$. In general, we know the wave will spread out in a circular arc in the +x direction, but in the near-field we want it to be as beamlike as possible. What initial conditions, $\phi(0,y,t)$ should we choose?

We're given $\omega$ and $c$, and let's say that we want our beam to be most focused a position $L$ to the right and that at its most focused we have a Gaussian of width $\sigma$. (I also normalize the Gaussian for convenience). Let $b=y/\sigma$ and $a=c L/(\sigma^2 \omega)$. Then our boundary condition should be taken as:

$$\boxed{\phi(0,y,t)=\exp\left(-\frac{b^2/2}{1+a^2}\right) \cos\left(\omega t-\frac{a b^2/2}{1+a^2}\right)\frac{(1+a^2)^{-1/4}}{\sqrt{2\pi \sigma^2}}}$$

If you enforce those boundary conditions on the lefthand side of the simulation domain, you'll get a solution of the wave equation that looks like this, with less and less dispersion as $\omega\to\infty$. 

![Wave focusing and defocusing](/img/posts/gaussianwavesmsm.gif)

([Mathematica source code](https://pastebin.com/2P0LRSJt) Note that what's plotted is not an exact solution to the wave equation, but an approximate one with errors of order $1/\omega^4$. I guess to be precise, the errors are of order $(c/(\omega L))^4$.

## Derivation
So, we have to solve the equation $-\omega^2\phi=\nabla^2\phi$ subject to some initial conditions. Let's think of a beam moving in the +x direction, and let's say that $\phi(0,y)$ is the most focused part of the beam, which we take to be Gaussian.

$$\phi(0,y)=\frac{1}{\sqrt{2\pi \sigma^2}}\exp\left(-\frac{y^2}{2\sigma^2}\right)$$

Our job is to fill in the rest of this function, $\phi(x,y)$. Since phi is a beam moving to the right, it helps to assume $\phi(x,y)=u(x,y)e^{ikx}$. 

Next, take the Fourier transform in the y direction. $\tilde{\phi}(x,k_y)=\int e^{-i k_y y} \phi(x,y) dy$. In particular, this gives:

$$\tilde{\phi}(0,k_y)=\exp(-k_y^2 s^2/2)=\tilde{u}(0,k_y)$$

The next technique is to assume that $\tilde{\phi}(x,y)=u(x,y)e^{ikx}$. Plugging this into the wave equation we have:

$$-k_y^2 \tilde{u}+\partial_x^2 \tilde{u}+2 i k \partial_x \tilde{u}-k^2 \tilde{u}=-\omega^2 \tilde{u}$$

If we assume $k=\omega$ (the wave speed is $c=1$ with my units, so this equation makes sense), and that $\partial_x^2 u$ is small compared to the other terms (the slowly varying envelope approximation), we wind up with the equation:

$$\partial_x \tilde{u}=-\frac{i k_y^2}{2k} \tilde{u}$$

Solving this differential equations gives an exponential, $\tilde{u}(x,k_y)=\tilde{u}(0,k_y)\exp(-i\frac{k_y^2}{2k}x)$. Writing this out in full:

$$\tilde{\phi}(x,k_y)=e^{i\omega x}\exp\left(-\frac{\sigma^2 k_y^2}{2}-i\frac{k_y^2}{2\omega}x\right)$$

next, we Fourier transform back! At the end of the day, our approximate solution to the wave equation is...

$$\phi(x,y,t)=\frac{\exp\left(-i\omega (t-x)- \frac{y^2}{2 s^2+2 i x/\omega}\right)}{\sqrt{2 \pi (s^2+ix/\omega)}}$$

When we plug this into a simulation we want to just take the real part of this equation. We also might want to reintroduce units at this point, so let's add the speed of light $c$ back (so terms like $\omega x$ should have been $\omega x/c$ and terms like $x/\omega$ should have been $x c/\omega$):

$$\begin{align*}
\text{Re}(\phi(x,y,t))=& 
\exp\left(-\frac{y^2/2}{\sigma ^2+(xc/\omega)^2}\right)
\cos \Bigg(\omega t-\frac{\omega x}{c} \left(1+\frac{c^2y^2/2}{\sigma ^4 \omega ^2+c^2x^2}\right)\\
&+\frac{1}{2} \arg(\sigma ^2+\frac{i c x}{\omega })\Bigg)
\cdot \left(4\pi^2(\sigma ^4+\frac{(cx)^2}{\omega ^2})\right)^{-1/4}
\end{align*}
$$

In order to get the boxed formula in the previous section, we ignore the phase
term, plug in $x=-L,$ and simplify. 




## Reference

Equations taken directly from Mathematica:

$$\frac{e^{-\frac{\sigma ^2 y^2 \omega ^2}{2 c^2 x^2+2 \sigma ^4 \omega ^2}} \cos \left(\omega  \left(-\frac{c x y^2}{2 c^2 x^2+2 \sigma ^4 \omega ^2}-\frac{x}{c}+t\right)+\frac{1}{2} \arg \left(\sigma ^2+\frac{i c x}{\omega }\right)\right)}{\sqrt{2 \pi } \sqrt[4]{\frac{c^2 x^2}{\omega ^2}+\sigma ^4}}$$

Or, in input form:

`(E^(-((s^2 w^2 y^2)/(2 s^4 w^2+2 c^2 x^2))) Cos[w (t-x/c-(c x y^2)/(2 s^4 w^2+2 c^2 x^2))+1/2 Arg[s^2+(I c x)/w]])/(Sqrt[2 Pi] (s^4+(c^2 x^2)/w^2)^(1/4)) `

And the code used to derive everything. I'm too lazy to do it all by hand.
Or rather, I've done it by hand so many times I get an allergic reaction 
if I do Fourier transforms by hand.

``` Mathematica
u[0,y_]=1/Sqrt[2Pi s^2]Exp[-y^2/(2 s^2)];
assume={w>0,s>0,c>0,Element[t,Reals],Element[y,Reals],Element[x,Reals]};
utilde[x_,ky_]=Simplify[FourierTransform[u[0,y],y,ky,FourierParameters->{1,-1}],Assumptions->assume]Exp[-I ky^2/(2w/c)x];
phi[x_,y_,t_]=FullSimplify[E^(-I(w t-w x/c))InverseFourierTransform[utilde[x,ky],ky,y,FourierParameters->{1,-1}],Assumptions->assume];
FullSimplify[ComplexExpand[Re[phi[x,y,t]]],Assumptions->assume]
```

And the Mathematica source code to create the first .gif, in case pastebin ever dies.

``` Mathematica
(* Create images for a moving Gaussian beam in 2D. Note that the function being plotted is NOT an exact solution to the wave equation! But Lh = O[1/w^4], that is the error goes like the frequency to the negative fourth power. So it is a good approximation in the w->Infinity limit. 
For some reason the construction of floattbl is really fast, but the construction of the image is super slow. I did my best to speed it up with an interpolating function (instead of directly calling Blend[] for every pixel) which did help a lot, but it's still stupidly slow for something that could be generated faster than real time with a half decent shader. 
 *)
h=Compile[{x,y,t},FullSimplify[(E^(-((s^2 w^2 y^2)/(2 (s^4 w^2+x^2)))) Cos[w (t+x (-1-y^2/(2 (s^4 w^2+x^2))))+1/2 Arg[s^2+(I x)/w]])/(Sqrt[2 \[Pi]] (s^4+x^2/w^2)^(1/4))/.{w->5.,s->1.0}]];
col1=RGBColor[0,0,0];
colf=ColorData["HypsometricTints"];
max=0.3989;
interppoints=20;
fancyColorFunction=
Interpolation[Table[{scalar,List@@Blend[{col1,colf[scalar/(2max)+0.5]},Abs[scalar/max]]},{scalar,-max,max,2max/interppoints}]];
createImageFast=
Compile[{cx,cy,imgw,imgh,scale,t},
Module[{floattbl,colorf},
floattbl=ParallelTable[
h[cx+((i-imgw/2.0)/imgw)scale,cy+((j-imgh/2.0)/imgw)scale,t]
,{j,1,imgh},{i,1,imgw}];
Image[ParallelMap[fancyColorFunction,floattbl,{2}],ColorSpace->"RGB"]
]];
imgs=Table[createImageFast[0,0,400,300,18,t],{t,0,2 Pi/5-(2 Pi/5/60),2 Pi/5/60}];
Export["gaussianwavesm.gif",imgs,"DisplayDurations"->1/60,"AnimationRepetitions"->Infinity]
```

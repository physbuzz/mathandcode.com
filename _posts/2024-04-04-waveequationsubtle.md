---
layout: post
title:  "A Wave Equation Subtlety"
date:   2024-04-04 12:00:00
comments: true
---


The simple wave equation is a really simple equation that everyone studying physics and applied mathematics should be intimately familiar with. It's the quintessential equation used to describe waves. In fact what you learn about it remains useful and pretty much unchanged even if you're describing sound waves, water waves, electromagnetic waves, or gravitational waves. But I recently found out there was something I didn't know about this equation, which I otherwise knew like the back of my hand!

Let's consider the simple wave equation for a long spring pulled tight. The height of the spring at a point $x$ is denoted $h(x,t)$, the spring has mass density $\mu$, and the spring is under tension $T$. 

The simple wave equation states the following:

$$\mu\frac{\partial ^2 h}{\partial t^2}=T\frac{\partial^2 h}{\partial x^2}$$

We can let the mass density $\mu$ vary over position by gluing springs of different masses together, so we can replace it with a function $\mu(x)$. So now we can describe the evolution of a wave pulse on these connected springs. In the following picture, the green spring is higher density than the blue spring. On hitting the different spring, it's partially transmitted and partially reflected, and a series of still images looks as follows:

![](/img/posts/wavefact-01.excalidraw.svg)

Great. This is something that practically every physics student has learned, probably in a physics textbook section titled "transmission and reflection coefficients." I learned it in chapter 7 of A. P. French's book Vibrations and Waves, and even though it seems very basic ("yes dear, I'm a serious physicist. Those slinkies are for a serious experiment!") this same transmission-reflection calculation is widely applicable to acoustics, electromagnetic waves, seismic waves, and so on. 

But what happens if we allow the tension to vary over the length of the spring? Well, if a piece of the spring had a greater tension pulling it to the left than to the right, it will accelerate to the left or right instead of only in the vertical direction. Therefore we can't just glue two different springs together "of a different tension" or anything like that. Imagine, however, that we had a frictionless pole which prevented any horizontal acceleration but which joined the two springs of different tension, as in the following diagram:

![](/img/posts/wavefact-02.excalidraw.svg)

The grey pole in the middle makes sure that forces can still be transmitted through vertical displacement of the spring, but that horizontal forces can't be. Can we just replace the constant $T$  with a function $T(x)$? I haven't done the actual experiment yet, but my math says that the answer is **no**! The correct wave equation is...

$$\mu(x)\frac{\partial ^2 h}{\partial t^2}=\frac{\partial}{\partial x}\left( T(x)\frac{\partial h}{\partial x}\right) \tag{1}$$

This has a rather funny implication. In the first figure, when a wave pulse went from medium with a slower wave speed to the medium with the faster wave speed, the reflected pulse had the same sign as the incident pulse. It started as an upwards pointing lump, and it ended as an upwards pointing lump. But this second equation predicts a different scenario. If the mass density stays the same but the tension changes, the reflected pulse will actually point downwards!

![](/img/posts/wavefact-03.excalidraw.svg)

This was a bit of a shock to me, I thought that the phase of the reflected wave only depended on the change in wave speed, but in fact it depends on whether that change was due to density or due to other factors!

## How the Wave Equation Comes About

Why is equation 1 the correct equation? Or, phrased differently, why do we have a partial derivative that hits the function $T(x)$ but not the function $\mu(x)$? Well, I have to think of it from an energy perspective. The energy of our system is as follows:

$$E=\int dx\left( \frac{1}{2} \mu(x) \left(\frac{\partial h}{\partial t}\right)^2+\frac{1}{2} T(x)\left(\frac{\partial h}{\partial x}\right)^2\right)$$

We can use this energy density to get equations of motions by considering Hamilton's equations of motion for a field. If I weren't so lazy, I could come up with some good exposition where I derived the equations of motion without ever using the word "Hamiltonian", and indeed many good books on partial differential equations (PDEs) do this! Every PDE course I've seen has a section on deriving PDEs through different methods. Two good references here are Strauss's book "Partial Differential Equations: An Introduction". And Nonlinear Partial Differential Equations for Scientists and Engineers by Debnath, where chapter 2 discusses deriving nonlinear PDEs through the methods I describe here. 

The basic idea is to take our energy density and write it as  $\mathcal{H}(h_t,h_x,h,x)=\frac{1}{2}\mu(x) h_t^2+\frac{1}{2}T(x)h_x^2$. The equation of motion is then:

$$\mu(x) h_{tt}=-\frac{\partial \mathcal{H}}{\partial h}+\frac{\partial}{\partial x} \frac{\partial \mathcal{H}}{\partial h_x}$$

The first term is zero for our case, but I included it because it shows how this equation is just Newton's F=ma, $m\ddot{h}=-V'(h)$. This is also equation 13.62 of Goldstein's Classical Mechanics book, 3rd ed. It works for *any* $\mathcal{H}$ of the form $\mathcal{H}=\frac{1}{2}\mu(x) h_t^2+F(h_x,h,x)$ and gives us equations of motion that conserve total energy!

Granted, I pulled that equation out of a hat. But the point is that it gives us a framework where we can see that $\mu(x)$, being attached to the kinetic term, never gets differentiated with respect to $x$. The special thing about the tension $T(x)$ is that it's part of the potential term, and this *does* get differentiated with respect to $x$. 

Okay, so equation 1 is the right equation, let's repeat the problem of transmission-reflection.

## Transmission-Reflection for the wave equation

We look for solutions of our equation with...

$$\mu(x)=\begin{cases} \mu_1 & \text{if } x\lt 0\\
\mu_2 & \text{if }x\gt 0\\
\end{cases}$$

$$T(x)=\begin{cases} T_1 & \text{if } x\lt 0\\
T_2 & \text{if }x\gt 0\\
\end{cases}$$

$$h(x)=\begin{cases} e^{i(\omega t-k_1x)}+Ae^{i(\omega t+k_1 x)} & \text{if }x\lt 0\\
B e^{i(\omega t-k_2x)} & \text{if }x\gt 0\\
\end{cases}$$

where $A$ and $B$ are the reflection and transmission coefficients, respectively. Also, $k_1=\omega/v_1$ where $v_1=\sqrt{T_1/\mu_1}$ and similarly $k_2=\omega/v_2$ where $v_2=\sqrt{T_2/\mu_2}$. 

To solve this, I used Mathematica. I define mu and T in terms of the Heaviside theta function, e.g. $\mu(x)=\mu_1(1-\theta(x))+\mu_2\theta(x)$, and at the origin we have to substitute $\theta(0)=1/2$. At the end of the day, we get $B=1+A$ as usual, and...

$$A=\frac{\mu_1 v_1-\mu_2 v_2}{\mu_1 v_1+\mu_2 v_2}$$

If the mass density is the same throughout, then this equation easily simplifies to:

$$A'=\frac{v_1-v_2}{v_1+v_2}$$

If the tension is the same throughout, then with a little algebra this equation simplifies to:

$$A''=\frac{v_2-v_1}{v_1+v_2}$$

How confusing is that?!!

Interestingly, it implies that if we choose $T_2=T_1 (v_2/v_1)$ and $\mu_2=\mu_1 (v_1/v_2)$, we get total transmission of the signal.

I believe that if we did this whole procedure but for the case of electromagnetic waves, we would find that the electric permittivity $\varepsilon$ plays the role of the mass density, and the magnetic permeability $\mu$ plays the role of the tension. This makes me wonder if there are devices out there that make use of tuning $\mu$ and $\varepsilon$ together in order to get total transmission! But the permeability of most materials is very close to the permeability of the vacuum, so it might be impossible to tune, cf. section 9.3.2 of Griffiths Introduction to Electrodynamics, 3rd ed.


## Appendix 1, Mathematica source code
``` Mathematica
Clear[w,v1,v2,mu,T,u1,u2,u3,u,a,b];
mu[x_]=mu1(1-HeavisideTheta[x])+mu2 HeavisideTheta[x];
T[x_]=T1(1-HeavisideTheta[x])+T2 HeavisideTheta[x];
b=1+a;
u1[x_,t_]=E^(I (w/v1 x-w t));
u2[x_,t_]=a E^(I (-w/v1 x-w t));
u3[x_,t_]=b E^(I (w/v2 x-w t));
u[x_,t_]=(1-HeavisideTheta[x])(u1[x,t]+u2[x,t])+HeavisideTheta[x]u3[x,t];
assumptions={v1^2 mu1==T1,v2^2 mu2==T2};
expression = Simplify[Table[Coefficient[FullSimplify[mu[x]Derivative[0,2][u][x,t]-D[T[x]D[u[x,t],x],x],Assumptions->assumptions],DiracDelta[x],i],{i,0,2}],Assumptions->assumptions]
```
Here's my Mathematica code for finding the equations of motion. You can see the core PDE going into the problem is the formula `mu[x]Derivative[0,2][u][x,t]-D[T[x]D[u[x,t],x],x]`, which should be zero. If we plug our functions defined in terms of products of `HeavisideTheta` into this equation, we get a bunch of terms which I organize in a power series in $\delta(x)$. The term proportional to $\delta(x)^0$ is zero almost everywhere because of the way we've constructed our functions. There is a nonzero term proportional to $\theta(x)(1-\theta(x))$, but this is equal to zero (weakly). Next, there's a term $\delta(x)^2$ which is proportional to $1+a-b$, so we must choose b such that this vanishes. And finally there is the term proportional to $\delta(x)$, which we can evaluate by substituting `expr2=expression[[2]] //. {x->0,HeavisideTheta[0]->1/2}`, and finally solving for our `a` coefficient.

``` mathematica
In[]:= Solve[expr2==0,a]
Out[]:= {{a->(-T2 v1+T1 v2)/(T2 v1+T1 v2)}}
```




---
layout: post
title:  "A Generic and Versatile Wave Equation Integrator"
date:   2024-04-21 12:00:00
comments: true
---

Well, this is "as simple as possible, but no simpler"! I wanted to get this post up right away to explain how some code I wrote works, but I might try to rewrite this article to be more clear in the future.

---

The TLDR is that you can get a very generic integrator which works great for optics, water waves, or waves in a warped static spacetime, with the following core integration code. It may look like a lot, but it's really just eight forces proportional to $\phi_{i'}-\phi_i$. That is to say, it's just 8 springs connecting the lattice points which obey Hooke's law.

``` python
phinew=[[0 for i in range(rows)] for j in range(cols)]
for i in range(1,rows-1):
    for j in range(1,cols-1):
        phinew[i][j]=2*phi[i][j]-philast[i][j]+ \
        (dt**2)*(
             txx[i][j]  *(phi[i+1][j]-phi[i][j])
            +txx[i-1][j]*(phi[i-1][j]-phi[i][j])
            +tyy[i][j]  *(phi[i][j+1]-phi[i][j])
            +tyy[i][j-1]*(phi[i][j-1]-phi[i][j])
            +0.5*txy[i][j]    *(phi[i+1][j+1]-phi[i][j])
            +0.5*txy[i-1][j-1]*(phi[i-1][j-1]-phi[i][j])
            -0.5*txy[i-1][j]  *(phi[i-1][j+1]-phi[i][j])
            -0.5*txy[i][j-1]  *(phi[i+1][j-1]-phi[i][j])
            )/mass[i][j]
philast=phi
phi=phinew
```

## A simulator for the simplest wave equation
For optics, we often want to simulate the partial differential equation (PDE):

$$v(x)^2 \frac{\partial^2 \phi}{\partial t^2}=\nabla^2 \phi \tag{1}$$

with $v(x)=c/n(x)$ the speed of light in that medium. Let's think about the situation in two dimensions where we have a grid of field values $\phi_{ij}(t)$. Then we can figure out a discrete Laplacian, and long story short we get the equations:

$$v_{ij}^2 \ddot{\phi}_{ij}=\frac{(\phi_{i+1,j}+\phi_{i-1,j}+\phi_{i,j+1}+\phi_{i,j-1}-4\phi_{ij})}{\Delta x^2}$$

We can look at this equation a different way: we have a particle with mass $m_{ij}=v_{ij}^2\Delta x^2$ being affected by four Hookean springs with magnitudes $\phi_{i'}-\phi_i$. To numerically solve equation (1), we can write code to simulate:

$$\begin{align*}
m_{ij}\ddot{\phi}_{ij}&=(\phi_{i+1,j}-\phi_{ij}) +
(\phi_{i-1,j}-\phi_{ij}) \\&+ 
(\phi_{i,j+1}-\phi_{ij}) + 
(\phi_{i,j-1}-\phi_{ij})
\end{align*}$$

You might implement this in Python pseudocode by storing 2D arrays `phi` and `philast`, and expanding $\ddot{\phi}_{ij}$ as `(phinew[i][j]+philast[i][j]-2*phi[i][j])/(dt**2)`. So the update loop code would look as follows, where I leave out terms on the boundary. (i=0, i=rows-1, ...)

``` python
phinew=[[0 for i in range(rows)] for j in range(cols)]
for i in range(1,rows-1):
    for j in range(1,cols-1):
        phinew[i][j]=2*phi[i][j]-philast[i][j]+ \
        (dt**2)*((phi[i+1][j]-phi[i][j])
            +(phi[i-1][j]-phi[i][j])
            +(phi[i][j+1]-phi[i][j])
            +(phi[i][j-1]-phi[i][j]))/mass[i][j]
philast=phi
phi=phinew
```

We should keep in mind that the variables `mass[i][j]` and `phi[i][j]` live on the vertices of our grid:

![](/img/posts/waveintegrator-01.excalidraw.svg)

## A simulator for water waves
If we have waves on the surface of water, the equation we want to simulate is actually the PDE:

$$\frac{\partial^2 \phi}{\partial t^2}=\nabla \cdot( \frac{1}{v(x)^2} \nabla \phi )$$

with $v(x)=\sqrt{g h(x)}$ the speed of shallow water waves. Let's solve the problem with a slightly different notation, reminiscent of a stretched spring with mass density $\mu$ and tension $T$ (Footnote 1):

$$\mu(x) \frac{\partial^2 \phi}{\partial t^2}=\nabla \cdot( T(x)\nabla \phi )\tag{2}$$

Well, following the previous section we again take $m_{ij}=\mu(x) \Delta x^2$ (Footnote 2), but now we have to vary the spring constant that affects each term:

$$\begin{align*}
m_{ij}\ddot{\phi}_{ij}&=T^x_{i,j}(\phi_{i+1,j}-\phi_{ij}) +T^x_{i-1,j}
(\phi_{i-1,j}-\phi_{ij}) \\&+ 
T^y_{i,j}(\phi_{i,j+1}-\phi_{ij}) + 
T^y_{i,j-1}(\phi_{i,j-1}-\phi_{ij})
\end{align*}$$

$m_{ij}$ and $\phi_{ij}$ live on the lattice vertices, but the tensions connect the vertices and so are associated with the edges of the graph. So, we should evaluate $T^x_{ij}=T(x_{ij}+\Delta x/2,y_{ij})$ and  $T^y_{ij}=T(x_{ij},y_{ij}+\Delta x/2)$, where $(x_{ij},y_{ij})$ is the position of each vertex. Here is the picture I have in mind while looking at that equation:

![](/img/posts/waveintegrator-02.excalidraw.svg)

Now our integration pseudo-code looks like:

``` python
phinew=[[0 for i in range(rows)] for j in range(cols)]
for i in range(1,rows-1):
    for j in range(1,cols-1):
        phinew[i][j]=2*phi[i][j]-philast[i][j]+ \
        (dt**2)*(
             tx[i][j]  *(phi[i+1][j]-phi[i][j])
            +tx[i-1][j]*(phi[i-1][j]-phi[i][j])
            +ty[i][j]  *(phi[i][j+1]-phi[i][j])
            +ty[i][j-1]*(phi[i][j-1]-phi[i][j])
            )/mass[i][j]
philast=phi
phi=phinew
```

Well, it would be silly to not check that our work is correct. Here is some Mathematica code that shows we have a good approximation of $\nabla\cdot(T\nabla \phi)$ and that it's accurate to order $O(\Delta x^2)$:

``` mathematica
(* my approximation for Div[ T grad[phi]] *)
approximation=(T[x+dx/2,y](phi[x+dx,y]-phi[x,y])
+T[x-dx/2,y](phi[x-dx,y]-phi[x,y])
+T[x,y+dx/2](phi[x,y+dx]-phi[x,y])
+T[x,y-dx/2](phi[x,y-dx]-phi[x,y]))/dx^2;
(* Expand the approximation around dx=0 ignoring terms of O[dx^2].
Subtract Div T Grad phi, and we find the result is zero. So our approximation is correct to order dx^2.*)
Simplify[Normal[Series[approximation,{dx,0,1}]] - Div[T[x,y] Grad[phi[x,y],{x,y}],{x,y}]]

(* Out[] := 0 *)
```

---

Footnote 1: The reason why the quantity $T$ in equation (2) isn't usually thought of as a tension is because it's a bit of a weird operation to change the tension of slinky: you would have to hold part of it in place horizontally, while allowing it to move freely vertically. For varying the tension in 2D, you would have to pinch or stretch a rubber sheet while again holding sections in place horizontally while it's free to move vertically. But the equation arises for shallow water waves very naturally.

Footnote 2: Note that the units of my $m_{ij}$ are weird! Even if we're in $d$ dimensions, I still write $m_{ij}=\mu(x_{ij},y_{ij})\Delta x^2$. The two factors of $\Delta x$ come from the Laplacian, not from the dimension.

## A simulator for anisotropic waves.
In the previous section we started dealing with separate variables $T^x$ and $T^y$. We might get the idea that we can vary these tensions separately to get a situation where wave speed along the $x$ axis is different than wave speed along the $y$ axis. This is a good idea, but we'd find that we're not consistent upon rotating our coordinate system. In general, we can modify equation (2) to replace tension with a matrix ${\bf T}(x)$:

$$\mu(x)\frac{\partial^2 \phi}{\partial t^2}=\nabla \cdot( {\bf T} \nabla \phi )\tag{3}$$

with, in two-dimensions:

$${\bf T}(x)=\begin{bmatrix} T^{xx} & T^{xy} \\ T^{xy} & T^{yy} \end{bmatrix}$$

When we discretize this equation, we again evaluate $T^{xx}$ at the centers of the lattice edges in the $x$ direction. But there's a twist for $T^{xy}$: it describes springs connecting diagonals of the lattice. In the following equation, $T^{xy}$ is evaluated not at the vertices or the edges of the lattice, but in the center of the faces of the lattice: $T^{xy} _ {i,j}=T^{xy}(x _ {ij}+\Delta x/2,y _ {ij}+\Delta x/2)$. Let's pull the equation out of thin air, and then prove it. I show in the appendix how I got this expression from a variational approach.

$$\begin{align*}
m_{ij}\ddot{\phi}_{ij}&=T^{xx}_{i,j}(\phi_{i+1,j}-\phi_{ij}) +T^{xx}_{i-1,j}
(\phi_{i-1,j}-\phi_{ij}) \\&+ 
T^{yy}_{i,j}(\phi_{i,j+1}-\phi_{ij}) + 
T^{yy}_{i,j-1}(\phi_{i,j-1}-\phi_{ij}) \\
&+\frac{1}{2}\left(T^{xy}_{i,j}(\phi_{i+1,j+1}-\phi_{ij})+T^{xy}_{i-1,j-1}
(\phi_{i-1,j-1}-\phi_{ij}) \right)\\&-\frac{1}{2}\left( 
T^{xy}_{i-1,j}(\phi_{i-1,j+1}-\phi_{ij}) + 
T^{xy}_{i,j-1}(\phi_{i+1,j-1}-\phi_{ij})\right)
\end{align*}$$

The picture I have in mind now looks like this. The red lines going up and diagonally to the right get a factor of +1/2. The orange lines going down and to the right get a factor of -1/2.

![](/img/posts/waveintegrator-03.excalidraw.svg)

Our integration scheme is...

``` python
phinew=[[0 for i in range(rows)] for j in range(cols)]
for i in range(1,rows-1):
    for j in range(1,cols-1):
        phinew[i][j]=2*phi[i][j]-philast[i][j]+ \
        (dt**2)*(
             txx[i][j]  *(phi[i+1][j]-phi[i][j])
            +txx[i-1][j]*(phi[i-1][j]-phi[i][j])
            +tyy[i][j]  *(phi[i][j+1]-phi[i][j])
            +tyy[i][j-1]*(phi[i][j-1]-phi[i][j])
            +0.5*txy[i][j]    *(phi[i+1][j+1]-phi[i][j])
            +0.5*txy[i-1][j-1]*(phi[i-1][j-1]-phi[i][j])
            -0.5*txy[i-1][j]  *(phi[i-1][j+1]-phi[i][j])
            -0.5*txy[i][j-1]  *(phi[i+1][j-1]-phi[i][j])
            )/mass[i][j]
philast=phi
phi=phinew
```

To prove that this expression works, we show that it is equal to $\nabla\cdot({\bf T} \nabla \phi)+O(\Delta x^2)$.

``` mathematica
(*my approximation for Div[T . grad[phi]]*)
approximation=(txx[x+dx/2,y](phi[x+dx,y]-phi[x,y])
    +txx[x-dx/2,y](phi[x-dx,y]-phi[x,y])
    +tyy[x,y+dx/2](phi[x,y+dx]-phi[x,y])
    +tyy[x,y-dx/2](phi[x,y-dx]-phi[x,y])
    +(1/2)(txy[x+dx/2,y+dx/2](phi[x+dx,y+dx]-phi[x,y])
    +txy[x-dx/2,y-dx/2](phi[x-dx,y-dx]-phi[x,y])
    -txy[x-dx/2,y+dx/2](phi[x-dx,y+dx]-phi[x,y])
    -txy[x+dx/2,y-dx/2](phi[x+dx,y-dx]-phi[x,y])))/dx^2;

(*Expand the approximation around dx=0 ignoring terms of 
O[dx^2].Subtract Div T.Grad phi,and we find the result is 
zero. So our approximation is correct to order dx^2.*)
tmat={ { txx[x,y],txy[x,y]},{txy[x,y],tyy[x,y]}};
Simplify[Normal[Series[approximation,{dx,0,1}]]-
    Div[tmat.Grad[phi[x,y],{x,y}],{x,y}]]

(* Out[] := 0 *)
```


## A simulator for waves around a nonrotating black hole
To simulate the wave equation around a black hole... we don't need anything else! We're done! We just need to initialize the masses and tensions correctly. I'll need a good amount of relativistic jargon to define everything correctly.

The key here is the metric $g_{\mu\nu}$, which is a four by four matrix. For a static (=nonrotating) spacetime, we take $g_{\mu\nu}$ to be independent of time, and we require that $g_{00}$ is nonzero but $g_{0a}=0$ and $g_{a0}=0$ ($1\leq a \leq 3$):

$$[g_{\mu\nu}]=\begin{bmatrix} 
g_{00} & 0 & 0 & 0\\
0 & g_{11} & g_{12} & g_{13}\\
0 & g_{12} & g_{22} & g_{13}\\
0 & g_{13} & g_{13} & g_{33}
\end{bmatrix}$$

We then define $g$ to be the square root of the determinant of this matrix (the determinant is negative, so we'll see $\sqrt{-g}$ in the equations). We also define $g^{\mu\nu}$ to be the inverse of the matrix $g_{\mu\nu}$. In particular:

$$[g^{ab}] = \begin{bmatrix}g_{11} & g_{12} & g_{13}\\
g_{12} & g_{22} & g_{13}\\
g_{13} & g_{13} & g_{33}
\end{bmatrix}^{-1}$$

With all of these definitions, we can take...

$$\mu(x)=(\sqrt{-g} )g^{00}$$

$${\bf T}=-\sqrt{-g} [g^{ab}]$$

And then we just simulate equation 3, and that's our wave equation in arbitrary static spacetimes!

$$\mu(x)\frac{\partial^2 \phi}{\partial t^2}=\nabla \cdot( {\bf T} \nabla \phi )$$

For a Schwarzschild black hole in $(t,x,y,z)$ coordinates, $\sqrt{-g}=1$ so we don't have to worry about that term. Write $r=\sqrt{x^2+y^2+z^2}$, and let $r_s$ be the Schwarzschild radius. Then (+ - - - convention): 

$$\mu(x)=g^{00}=1/(1-r_s/r)$$

$${\bf T}=-[g^{ab}] = {\bf 1}-\frac{r_s}{r^3} \begin{bmatrix}x^2 &x y& x z \\
x y&y^2& y z \\
x z & y z& z^2 
\end{bmatrix}$$

That's it! Those are the ingredients which go into simulating waves around a black hole. We see that as we approach the event horizon, the "mass density" goes to infinity while the "tension" goes to zero, and this is how we interpret the weird behavior of the waves approaching the event horizon of a black hole.

I added absorbing boundary conditions at the black hole boundary to produce this image. It's tempting to say that absorbing boundary conditions are cheating a bit, but it's quite fair: waves become smushed together close to the horizon, and eventually their wavelength is much less than $\Delta x$. So we're forced to choose how to regulate those waves.

![](/img/posts/blackhole-preview.gif)

(High res video [on Youtube](https://www.youtube.com/watch?v=WpINvSje_10))

I also have my code [on Github](https://github.com/physbuzz/wave/commit/8b09db706fece08278c0f010503d1de3669316d0), so you can see my implementation of how I initialize all the variables. I linked to the specific commit used to generate the youtube video, but the project is in a hacked together not-very-configurable state at the time of writing.

I didn't find many references on the wave equation around a black hole, but here is an excellent one [Wave propagation on black hole spacetimes by David Dempsey, 2017](https://s3.cern.ch/inspire-prod-files-2/2b6b3415fb72732140514242f992c4b4). Figure 3.1 shows wave propagation stuff around a nonrotating black hole.

Rotating black holes can also be described with slight modifications. The relevant relativistic wave equation is $\partial_\mu(\sqrt{-g} g^{\mu\nu}\partial_{\nu}\phi)=0$.

# Appendix: How did I really derive these equations of motion?

Like always, it was using a Lagrangian / variational calculus and throwing everything against the wall until something stuck.

The action for a scalar field in a static spacetime background is 

$$S=\int d^D x\frac{1}{2}\sqrt{-g}\left( g^{00}\dot{\phi}^2+g^{ab}\partial_a\phi \partial_b \phi\right)=\int dx^0 L$$

with $D=d+1$ the number of spatial dimensions plus one for time. Let's find $L$ numerically by dividing space up into a grid but leaving time continuous. A good-enough approximation for the kinetic term is $\sum_{ij}\frac{1}{2}\Delta x^d \sqrt{-g} g^{00}\dot{\phi}_{ij}^2$. 

For the spatial derivatives term, let's just work it out for 2D. Consider the square consisting of four field values $\phi_{i,j}$, $\phi_{i+1,j}$, $\phi_{i+1,j+1}$, $\phi_{i,j+1}$. One approximation for the integral of the action over space is...

$$\sum_{ij}\Delta x^d\sqrt{-g}  \begin{bmatrix}\frac{\phi_{i+1,j}-\phi_{i,j}}{\Delta x} & \frac{\phi_{i,j+1}-\phi_{i,j}}{\Delta x}
\end{bmatrix} [g^{ab}] \begin{bmatrix}\frac{\phi_{i+1,j}-\phi_{i,j}}{\Delta x} \\ \frac{\phi_{i,j+1}-\phi_{i,j}}{\Delta x}
\end{bmatrix}$$

That is, across each square face on the lattice, we assume the gradient is constant and equal to $(\phi_{i+1,j}-\phi_{i,j},\phi_{i,j+1}-\phi_{i,j})/\Delta x$.

That's OK, but it biases the bottom left corner of each square face. We could equally well use the estimate $(\phi_{i+1,j}-\phi_{i,j},\phi_{i+1,j+1}-\phi_{i+1,j})/\Delta x$ for the field gradient (biasing the bottom right corner). If we don't want to bias any corner, we might as well average over all four possible biases!  

Okay, so the approach is to do all of that, sum over the four approximations and all lattice points to get a discrete approximation of $L$, and then plug it into the Euler-Lagrange equations:

$$\frac{d}{dt}\frac{\partial L}{\partial\dot{\phi}_{ij}}=\frac{\partial L}{\partial \phi_{ij}}$$

and then observe that the righthand side of this equation is just the eight Hooke's law spring forces as described above! 

Here is the mathematica code to do exactly that. Note that we don't *need* to do all of this if we've already seen the previous two Mathematica code snippets in this article, which prove that my approximations are good discrete approximations for the spatial derivative terms. This is just the way I thought about those approximations to derive them.

``` mathematica
nx=5;
ny=5;
(* The "tension" part of the wave equation. *)
G[i_,j_]={ { Gxx[i,j],Gxy[i,j]},{Gxy[i,j],Gyy[i,j]}};
(*kinetic[i_,j_]=G00[i,j] dx dy Derivative[0,0,1][phi][i,j,t]^2;*)
(* The four different equations for the gradient: *)
(* |_ *)
mygrad[1,i_,j_]={(phi[i+1,j]-phi[i,j])/dx,
    (phi[i,j+1]-phi[i,j])/dy};
(* |- *)
mygrad[2,i_,j_]={(phi[i+1,j+1]-phi[i,j+1])/dx,
    (phi[i,j+1]-phi[i,j])/dy};
(* -| *)
mygrad[3,i_,j_]={(phi[i+1,j+1]-phi[i,j+1])/dx,
    (phi[i+1,j+1]-phi[i+1,j])/dy};
(* _| *)
mygrad[4,i_,j_]={(phi[i+1,j]-phi[i,j])/dx,
    (phi[i+1,j+1]-phi[i+1,j])/dy};
(* Average over the four estimates *)
potential[i_,j_]=Sum[1/2mygrad[k,i,j].G[i,j].mygrad[k,i,j],
    {k,1,4}]dx dy/4;
(* Our estimate of the spatial part of the action is then
the following. If there are nx*ny vertices of the lattice,
then there are only (nx-1)*(ny-1) faces: *)
actionEstimate=Sum[potential[i,j],{i,1,nx-1},{j,1,ny-1}];
(* For the equations of motion, the force acting on phi[3,3]
is the negative of the derivative of the action with respect
to phi[3,3]. To simplify the equations, I write phi[4,4]
== phi[3,3]+dphi[1,1] and write the equations in terms of 
dphi. Also, the equations don't simplify quite as well if
dx!=dy, so I replace dy with dx.
 *)
FullSimplify[(FullSimplify[eom33=-D[actionEstimate,phi[3,3]]]/.
  ReleaseHold[Flatten[Table[
    If[a==0&&b==0,Hold[Sequence[]],
    phi[3+a,3+b]->phi[3,3]+dphi[a,b]],
    {a,-1,1},{b,-1,1}]]
  ])/.{dy->dx}]

(* Output: 1/2 (dphi[-1,0] (Gxx[2,2]+Gxx[2,3])
+dphi[1,0] (Gxx[3,2]+Gxx[3,3])
+dphi[0,-1] (Gyy[2,2]+Gyy[3,2])
+dphi[0,1] (Gyy[2,3]+Gyy[3,3])
+dphi[-1,-1] Gxy[2,2]
+dphi[1,1] Gxy[3,3]
-dphi[-1,1] Gxy[2,3]
-dphi[1,-1] Gxy[3,2]) *)
(* If we interpret G[i,j] as the metric tensor in the center of each square, 
then (Gxx[3,2]+Gxx[3,3])/2 is the best approximation for Gxx evaluated right 
at the link connecting phi[3,3] to phi[4,3].*)
```

So this is the method that I'm using for the "ground truth", which could be conveniently and flexibly adapted to integration on arbitrary lattices, arbitrary dimension, and to include other forces.

**Fun Idea:** I think that the equation describing Chladni pattern waves on a thin steel plate is $\mu\ddot{\phi}=D(\nabla^2)^2\phi$. So, what's the relativistically invariant version of that equation? Once you figure that out it begs the question, what do Chladni patterns around a black hole look like?


# Bonus: Rotating black hole EOM
*Warning:* I haven't implemented this in real code / a real simulation.

Note that Dempsey 2017 works through a rotating black hole, so there's probably some discussion of the numerical algorithms there. The essential form of the equations is identical to water waves near a vortex (eg a bathtub drain).

I wrote a bunch of ugly Mathematica code to generate the LaTeX output, and I got the following equation of motion:

$$
\begin{align*}
0&=\Delta x^2 G^{tt}_{i,j} \ddot{\phi}_{i,j}\\
& +G^{xx}_{i-1,j}(\phi_{i-1,j}-\phi_{i,j}) +G^{xx}_{i,j}(\phi_{i+1,j}-\phi_{i,j}) \\
&+G^{yy}_{i,j-1}(\phi_{i,j-1}-\phi_{i,j}) + G^{yy}_{i,j}(\phi_{i,j+1}-\phi_{i,j})\\
&+\frac{1}{2}G^{xy}_{i,j} (\phi_{i+1,j+1}-\phi_{i,j})+\frac{1}{2}G^{xy}_{i-1,j-1}(\phi_{i-1,j-1}-\phi_{i,j})  \\
& -\frac{1}{2}G^{xy}_{i,j-1} (\phi_{i+1,j-1}-\phi_{i,j})-\frac{1}{2}G^{xy}_{i-1,j} (\phi_{i-1,j+1}-\phi_{i,j})\\
& -\Delta x G^{tx}_{i-1,j}\dot{\phi}_{i-1,j} +\Delta x G^{tx}_{i,j}\dot{\phi}_{i+1,j} \\
&-\Delta x G^{ty}_{i,j-1}\dot{\phi}_{i,j-1} +\Delta x G^{ty}_{i,j}\dot{\phi}_{i,j+1} 
\end{align*}$$

In my convention, $G$ is a 3 by 3 matrix corresponding to $\sqrt{-g} g^{\mu\nu}$. It is not allowed to vary over time. $G^{tt}$ is evaluated at the vertices of the lattice, $G^{xx}$, $G^{yy}$, $G^{tx}$, and $G^{ty}$ are evaluated at the centers of the edges of the lattice, and $G^{xy}$ is evaluated at the centers of the faces. So, to get a Kerr black hole you would have to carefully copy the formulas for $g_{\mu\nu}$, find $\sqrt{-g}$, and invert $g_{\mu\nu}$ to get $g^{\mu\nu}$.

Note that in the (+ - -) metric convention, we expect $G^{xx}$ and $G^{yy}$ to be negative. So really these correspond to $-T^{xx}$ and $-T^{yy}$. 

To turn the equations of motion into a numerical algorithm, we have two options. In a scientific algorithm, we want a centered-time approach. This is time-reversible, so it tends to give us simple and reliable guarantees of stability. Then $\dot{\phi}_{i-1,j}$ would be written as `(phinew[i-1][j]-phiold[i-1][j])/(2*dt)`. But that's a problem because it gives us an *implicit* equation for phinew. So we'd have to add a linear solver or some relaxation scheme and the complexity of our solver goes way up.

A simple explicit way to do this would be to approximate $\dot{\phi}_{i-1,j}$ as `(phi[i-1][j]-phiold[i-1][j])/dt`. This looks OK, but it actually breaks the time reversibility of our integrator, so we won't have the simple ideas of stability like before! But okay, let's update our python pseudocode with this explicit hopefully-not-too-unstable equation:

``` python
phinew=[[0 for i in range(rows)] for j in range(cols)]
for i in range(1,rows-1):
    for j in range(1,cols-1):
        phinew[i][j]=2*phi[i][j]-philast[i][j]+ \
        (dt**2)*(
            -Gxx[i][j]  *(phi[i+1][j]-phi[i][j])
            -Gxx[i-1][j]*(phi[i-1][j]-phi[i][j])
            -Gyy[i][j]  *(phi[i][j+1]-phi[i][j])
            -Gyy[i][j-1]*(phi[i][j-1]-phi[i][j])
            -0.5*Gxy[i][j]    *(phi[i+1][j+1]-phi[i][j])
            -0.5*Gxy[i-1][j-1]*(phi[i-1][j-1]-phi[i][j])
            +0.5*Gxy[i-1][j]  *(phi[i-1][j+1]-phi[i][j])
            +0.5*Gxy[i][j-1]  *(phi[i+1][j-1]-phi[i][j])
            +(dx/dt)*(
               Gtx[i-1][j]*(phi[i-1][j]-philast[i-1][j])
              -Gtx[i][j]*(phi[i+1][j]-philast[i+1][j])
              +Gty[i][j-1]*(phi[i][j-1]-philast[i][j-1])
              -Gty[i][j]*(phi[i][j+1]-philast[i][j+1])
              )
            )/(Gtt[i][j]*(dx**2))
philast=phi
phi=phinew
```


Here's the action and equations of motion using Mathematica, but including the time components. (Remember: my Mathematica variable `Gab[i,j]` is a matrix equal to $\sqrt{-g} g^{\mu\nu}$ evaluated at the center of the ith,jth cell. That is, it's evaluated at the center of the square with corners (i,j), (i+1,j), (i,j+1), and (i+1,j+1).)

``` mathematica
nx=5;
ny=5;
G[i_,j_]={ {Gtt[i,j],Gtx[i,j],Gty[i,j]},{Gtx[i,j],Gxx[i,j],Gxy[i,j]},{Gty[i,j],Gxy[i,j],Gyy[i,j]}};
(*kinetic[i_,j_]=G00[i,j] dx dy Derivative[0,0,1][phi][i,j,t]^2;*)
(* |_ *)
mygrad[1,i_,j_]={phidot[i,j],(phi[i+1,j]-phi[i,j])/dx,(phi[i,j+1]-phi[i,j])/dy};
(* |- *)
mygrad[2,i_,j_]={phidot[i,j+1],(phi[i+1,j+1]-phi[i,j+1])/dx,(phi[i,j+1]-phi[i,j])/dy};
(* -| *)
mygrad[3,i_,j_]={phidot[i+1,j+1],(phi[i+1,j+1]-phi[i,j+1])/dx,(phi[i+1,j+1]-phi[i+1,j])/dy};
(* _| *)
mygrad[4,i_,j_]={phidot[i+1,j],(phi[i+1,j]-phi[i,j])/dx,(phi[i+1,j+1]-phi[i+1,j])/dy};
potential[i_,j_]=Sum[mygrad[k,i,j].G[i,j].mygrad[k,i,j],{k,1,4}]dx dy/4;

action=Sum[potential[i,j],{i,1,nx-1},{j,1,ny-1}];
(* Action in new variables phi[i,j,t] instead of phi[i,j]. This helps it play nicely with the symbolic differentiation that we do. *)
actionnew=action/.{phi[i_,j_]:>phi[i,j,t],phidot[i_,j_]:>Derivative[0,0,1][phi][i,j,t]};

(*  Okay, these are the correct equations of motion, but they are really hard to wrangle into the correct form. *)
weirdeqs=FullSimplify[(D[D[actionnew,Derivative[0,0,1][phi][3,3,t]],t]-D[actionnew,phi[3,3,t]]/.dy->dx)/.ReleaseHold[Flatten[Table[If[a==0&&b==0,Hold[Sequence[]],phi[3+a,3+b,t]->phi[3,3,t]+dphi[a,b,t]],{a,-1,1},{b,-1,1}]]]];

(* instead of using replacement rules, I found that allowing FullSimplify to do the replacements worked best! *)
simplification=FullSimplify[weirdeqs/2,Assumptions->{Gxx[2,2]+Gxx[2,3]==2Gxxedge[2,3],Gxx[3,2]+Gxx[3,3]==2Gxxedge[3,3],
Gyy[2,2]+Gyy[3,2]==2Gyyedge[3,2],Gyy[2,3]+Gyy[3,3]==2Gyyedge[3,3],
Gtx[2,2]+Gtx[2,3]==2 Gtxedge[2,3],Gtx[3,2]+Gtx[3,3]==2 Gtxedge[3,3],
Gty[2,2]+Gty[3,2]==2Gtyedge[3,2],Gty[2,3]+Gty[3,3]==2Gtyedge[3,3],
(Gtt[2,2]+Gtt[2,3]+Gtt[3,2]+Gtt[3,3]) ==4 Gttvertex[3,3]}]//Expand;

(* Okay, that's it, now let's convert it to TeX form. We need a bunch of string replacement rules to get a good expression. *)
texstring1=ToString[TeXForm[simplification/.{dphi[i_,j_,t]:>dphi[i,j],Derivative[0,0,1][phi][i_,j_,t]:>dtphi[i,j],Derivative[0,0,2][phi][i_,j_,t]:>ddtphi[i,j]}]];
(* turn "(3,3)" into "_{i,j}". *)
subscriptSub=Flatten[Table["("<>ToString[a]<>","<>ToString[b]<>")"->"_{"<>If[a==2,"i-1",If[a==3,"i","i+1"]]<>","<>If[b==2,"j-1",If[b==3,"j","j+1"]]<>"}",{a,2,4},{b,2,4}]];
namesSub={"\\text{Gttvertex}"->"G^{tt}","\\text{Gxxedge}"->"G^{xx}","\\text{Gyyedge}"->"G^{yy}","\\text{Gtxedge}"->"G^{tx}","\\text{Gtyedge}"->"G^{ty}","\\text{Gxy}"->"G^{xy}","\\text{dx}"->"\Delta x","\\text{dtphi}"->"\\dot{\\phi}","\\text{ddtphi}"->"\\ddot{\\phi}"};
dphiSub=Flatten[Table["\\text{dphi}("<>ToString[a]<>","<>ToString[b]<>")"->"(\\phi_{"<>If[a==-1,"i-1",If[a==0,"i","i+1"]]<>","<>If[b==-1,"j-1",If[b==0,"j","j+1"]]<>"}-\\phi_{i,j})",{a,-1,1},{b,-1,1}]];
texstring2=StringReplace[texstring1,Join[subscriptSub,namesSub,dphiSub]]

(*
Out[] := "\\Delta x^2 \\ddot{\\phi}_{i,j} G^{tt}_{i,j}+(\\phi_{i-1,j}-\\phi_{i,j}) G^{xx}_{i-1,j}+(\\phi_{i+1,j}-\\phi_{i,j}) 
G^{xx}_{i,j}+\\frac{1}{2} (\\phi_{i-1,j-1}-\\phi_{i,j}) G^{xy}_{i-1,j-1}-\\frac{1}{2} (\\phi_{i-1,j+1}-\\phi_{i,j}) 
G^{xy}_{i-1,j}-\\frac{1}{2} (\\phi_{i+1,j-1}-\\phi_{i,j}) G^{xy}_{i,j-1}+\\frac{1}{2} (\\phi_{i+1,j+1}-\\phi_{i,j}) 
G^{xy}_{i,j}+(\\phi_{i,j-1}-\\phi_{i,j}) G^{yy}_{i,j-1}+(\\phi_{i,j+1}-\\phi_{i,j}) G^{yy}_{i,j}-\\Delta x \\dot{\\phi}_{i-1,j} 
G^{tx}_{i-1,j}+\\Delta x \\dot{\\phi}_{i+1,j} G^{tx}_{i,j}-\\Delta x \\dot{\\phi}_{i,j-1} G^{ty}_{i,j-1}+\\Delta x 
\\dot{\\phi}_{i,j+1} G^{ty}_{i,j}"
 *)
```

# Bonus bonus: explicitly finding G for the Kerr metric
Note: this is NOT double and triple checked! This is just the work I plan on using when I revisit this in the future.

Mathematica code gets us almost all the way there:

``` mathematica
coordsSphere={t,r,theta,psi};
sigma=r^2+a^2 Cos[theta]^2;
delta=r^2-rs r + a^2;
(* Kerr metric copied from Wikipedia *)
metricLowerSphere=-{ {-(1-rs r/sigma),0,0,-rs r a Sin[theta]^2/sigma},
{0,sigma/delta,0,0},{0,0,sigma,0},{-rs r a Sin[theta]^2/sigma,0,0,
(r^2+a^2+rs r a^2/sigma Sin[theta]^2)Sin[theta]^2}};
(* Inverse transformation of spherical coordinates. Note that it would be much faster (CPU-time wise) to do this with the correct application of the Jacobian, this is really just a brute force way but it's correct. *)
coordinateSub={r->Sqrt[x^2+y^2+z^2],theta->ArcTan[z/Sqrt[x^2+y^2+z^2],Sqrt[x^2+y^2]/Sqrt[x^2+y^2+z^2]],psi->ArcTan[x/Sqrt[x^2+y^2],y/Sqrt[x^2+y^2]]};
assume={a>0,rs>0,Sqrt[x^2+y^2+z^2]>rs,Element[x,Reals],Element[y,Reals],Element[z,Reals]};
(* Write the metric in terms of Dx. This works because eg. Dt[sqrt[x^2+y^2+z^2]] gives the correct expansion in terms of Dt[x], Dt[y], Dt[z]. *)
metricBasicallyDt=FullSimplify[Sum[metricLowerSphere[[i,j]]Dt[coordsSphere[[i]]]Dt[coordsSphere[[j]]],{i,1,4},{j,1,4}]/.coordinateSub,Assumptions->assume];

(* Now we get the new metric in Matrix form. 
We collect the coefficients into an upper triangular matrix. CoefficientArrays will return an upper triangular matrix, so we symmetrize to get the actual metric. *)
coordsE={t,x,y,z};
gmatLower=Normal[CoefficientArrays[metricBasicallyDt,Dt[coordsE]][[3]]];
gmatLower=Simplify[(gmatLower+Transpose[gmatLower])/2];
(* Sqrt[-Det[g]] *)
sqrtmetricdet=FullSimplify[Sqrt[-Det[gmatLower]],Assumptions->assume];
(* Simplify to get the matrix relevant for a wave equation, "Big G" in my article *)
bigGupper=FullSimplify[sqrtmetricdet Inverse[gmatLower],Assumptions->assume];
(* Okay... now simplifying as far as Mathematica will take us. It really does not like to simplify some terms, but let's just do whatever it misses by hand. *)
gupperFinal=FullSimplify[FullSimplify[bigGupper,Assumptions->{x^2+y^2+z^2==r2,r>0,Element[x,Reals],Element[y,Reals],Element[z,Reals],Element[r,Reals]}]/.{r2->r^2},Assumptions->{r>0,r>rs,Element[x,Reals],Element[y,Reals],Element[z,Reals],Element[r,Reals]}]


(* Out[] := { {(r^3+a^2 (r+rs))/(r (a^2+r (r-rs)))+(a^2 z^2)/r^4,-((a rs y)/(a^2 r+r^3-r^2 rs)),(a rs x)/(a^2 r+r^3-r^2 rs),0},{-((a rs y)/(a^2 r+r^3-r^2 rs)),(a^4 (-r^2+y^2+z^2)+a^2 r (-2 (r-rs) (r-y) (r+y)+(r-2 rs) z^2)-r^2 (r-rs) (r^3-r^2 rs+rs (y^2+z^2)))/(r^4 (a^2+r (r-rs))),-(((a^4+2 a^2 r (r-rs)+r^2 rs (-r+rs)) x y)/(r^4 (a^2+r (r-rs)))),((-a^2+r rs) x z)/r^4},{(a rs x)/(a^2 r+r^3-r^2 rs),-(((a^4+2 a^2 r (r-rs)+r^2 rs (-r+rs)) x y)/(r^4 (a^2+r (r-rs)))),(-r^6+r^5 rs-a^4 y^2+2 a^2 r rs y^2+r^3 rs y^2-r^2 (rs^2 y^2+a^2 (2 y^2+z^2)))/(r^4 (a^2+r (r-rs))),((-a^2+r rs) y z)/r^4},{0,((-a^2+r rs) x z)/r^4,((-a^2+r rs) y z)/r^4,-1+((-a^2+r rs) z^2)/r^4}} *)

(* Let's make this into C code for a 2D simulation plane *)
gupper2D=FullSimplify[gupperFinal/.z->0];
cExpression[func_]:=StringReplace[ToString[CForm[func]],"Power"->"std::pow"];
cFunction[name_,i_,j_]:="float "<>name<>"(float x, float y, float rs, float a) {\n    float r=std::sqrt(x*x+y*y);\n    return ("<>cExpression[gupper2D[[i,j]]]<>");\n}\n";
StringRiffle[{cFunction["GttFunc",1,1],
cFunction["GtxFunc",1,2],
cFunction["GtyFunc",1,3],
cFunction["GxxFunc",2,2],
cFunction["GxyFunc",2,3],
cFunction["GyyFunc",3,3]},""]

```

Okay, the metric that we get is the following (for the xy plane, $z=0$, and the black hole is spinning about the $z$ axis). It's not fully simplified (for example, we can use properties like $r^2=x^2+y^2$ to get $G^{xx}$ in the same form as $G^{yy}$), but I'm going to leave this here for now.
$$\sqrt{-g}g^{\mu\nu}=
\begin{bmatrix}
 \frac{a^2 (r+\text{rs})+r^3}{r \left(a^2+r (r-\text{rs})\right)} &
   -\frac{a \text{rs} y}{a^2 r+r^3-r^2 \text{rs}} & \frac{a \text{rs}
   x}{a^2 r+r^3-r^2 \text{rs}} \\
 -\frac{a \text{rs} y}{a^2 r+r^3-r^2 \text{rs}} & \frac{r
   \text{rs}-a^2}{r^2}+\frac{y^2 \left(a^4+2 a^2 r (r-\text{rs})+r^2
   \text{rs} (\text{rs}-r)\right)}{r^4 \left(a^2+r
   (r-\text{rs})\right)}-1 & -\frac{x y \left(a^4+2 a^2 r
   (r-\text{rs})+r^2 \text{rs} (\text{rs}-r)\right)}{r^4 \left(a^2+r
   (r-\text{rs})\right)} \\
 \frac{a \text{rs} x}{a^2 r+r^3-r^2 \text{rs}} & -\frac{x y
   \left(a^4+2 a^2 r (r-\text{rs})+r^2 \text{rs}
   (\text{rs}-r)\right)}{r^4 \left(a^2+r (r-\text{rs})\right)} &
   -\frac{a^4 y^2+r (r-\text{rs}) \left(y^2 \left(2 a^2-r
   \text{rs}\right)+r^4\right)}{r^4 \left(a^2+r (r-\text{rs})\right)}
   \\
\end{bmatrix}
$$

If we want to plug it into some C code, here are the functions we'd use. 

``` cpp
float GttFunc(float x, float y, float rs, float a) {
    float r=std::sqrt(x*x+y*y);
    return ((std::pow(r,3) + std::pow(a,2)*(r + rs))/(r*(std::pow(a,2) + r*(r - rs))));
}
float GtxFunc(float x, float y, float rs, float a) {
    float r=std::sqrt(x*x+y*y);
    return (-((a*rs*y)/(std::pow(a,2)*r + std::pow(r,3) - std::pow(r,2)*rs)));
}
float GtyFunc(float x, float y, float rs, float a) {
    float r=std::sqrt(x*x+y*y);
    return ((a*rs*x)/(std::pow(a,2)*r + std::pow(r,3) - std::pow(r,2)*rs));
}
float GxxFunc(float x, float y, float rs, float a) {
    float r=std::sqrt(x*x+y*y);
    return (-1 + (-std::pow(a,2) + r*rs)/std::pow(r,2) + ((std::pow(a,4) + 2*std::pow(a,2)*r*(r - rs) + std::pow(r,2)*rs*(-r + rs))*std::pow(y,2))/(std::pow(r,4)*(std::pow(a,2) + r*(r - rs))));
}
float GxyFunc(float x, float y, float rs, float a) {
    float r=std::sqrt(x*x+y*y);
    return (-(((std::pow(a,4) + 2*std::pow(a,2)*r*(r - rs) + std::pow(r,2)*rs*(-r + rs))*x*y)/(std::pow(r,4)*(std::pow(a,2) + r*(r - rs)))));
}
float GyyFunc(float x, float y, float rs, float a) {
    float r=std::sqrt(x*x+y*y);
    return (-((std::pow(a,4)*std::pow(y,2) + r*(r - rs)*(std::pow(r,4) + (2*std::pow(a,2) - r*rs)*std::pow(y,2)))/(std::pow(r,4)*(std::pow(a,2) + r*(r - rs)))));
}
```


---
layout: post
title:  "Navier-Stokes equations from SPH"
date:   2024-02-17 12:00:00
comments: true
---


Directory
===

- [0. Introduction](#section0)
- [1. The SPH Lagrangian](#section1)
- [2. The Navier-Stokes Lagrangian](#section2)
- [3. Going from SPH to a Lagrangian density](#section3)
    - [3.1 The kinetic term](#section3-1)
    - [3.2 The interaction term](#section3-2)
- [4. Varying the action](#section4)
    - [4.1 A noninteracting Lagrangian](#section4-1)
    - [4.2 Varying the NS Lagrangian](#section4-2)
- [5. More general Lagrangians](#section5)
- [6. Where to go from here?](#section6)
- [Appendix](#appendix)
    - [A1. Vector calculus definitions and the material derivative ](#A1)
    - [A2. Determinant derivative identities](#A2)
    - [A3. Side comment about the integral in section 3.2](#A3)



# 0. Intro and Summary <a name="section0"></a>
In this article, I derive the Navier-Stokes equations from the equations of smoothed particle hydrodynamics (SPH). I phrase everything in terms of Lagrangian densities and I definitely don't pull any punches when it comes to the multivariable calculus involved. Many important identities are put in the appendix, but you might also want to refer to a vector calculus textbook. For a reference on the continuum physics, chapter 13 of Goldstein's Classical Mechanics textbook is quite good, but it doesn't go far enough for fluid and solid mechanics. 

I start with the SPH Lagrangian $L_{SPH}(\dot{r},r)$, use this to derive a Lagrangian for compressible fluid dynamics $\mathcal{L}_{NS}(\dot{r}^\kappa,\frac{\partial r^\kappa}{\partial a^\nu},a)$ where $\vec{r}(\vec{a})$ is the dynamical field, and then show that this gives the Navier-Stokes equations with zero viscosity (and mass per unit volume $\mu$):

$$\frac{\partial v}{\partial t}+(v\cdot \nabla)v=-\frac{1}{\rho}\nabla p$$

Doing this derivation has several benefits and cool features:
1. We see exactly where approximations are made. In a standard description of SPH we have a smoothing function $W(r,h)$, and in order to get to the final Navier-Stokes lagrangian we have to drop terms proportional to $h$, $h^2$, and so on. If we calculated these error terms, they could inspire us to find correction terms for our SPH scheme.
2. Seeing the details of this derivation may be useful for going the inverse route: starting with a Lagrangian density and then working backwards to the SPH-like formulation. 
3. Once we have the Lagrangian density that gives Navier-Stokes, we can ask if there is a more general form of the Lagrangian density that is allowed. In fact there is, and this gives us the theory of [hyperelasticity](https://en.wikipedia.org/wiki/Hyperelastic_material)! Since I didn't know anything about solid mechanics before writing this, it was quite nice to end up somewhere that the engineers already knew about! So we can now watch hyperelastic ducks melt and rest assured that we know all the continuum physics involved.

<iframe width="560" height="315" src="https://www.youtube.com/embed/GQ0K_FFV7hY?si=mTHExKxMSBAjuzl3" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

# 1. The SPH Lagrangian <a name="section1"></a>
SPH is often written out in terms of pressures and densities, which feels complicated when you're trying to think purely in terms of kinematics and conserved quantities. Instead, the key ingredients of SPH are the smoothing function $W(\vec{r})=W(\vec{r},h)$ and the potential function per unit mass $U(\rho)$. A clear account of the many choices for $W$ is given in chapter 3 of the book "Smoothed Particle Hydrodynamics: A Meshfree Method" by Liu and Liu. The potential function $U(\rho)$ is not usually discussed, but it gives rise to an equation of state $p=\rho^2 U'(\rho)$, and some of the considerations are discussed in section 4.4.7 of Liu and Liu. Regardless, once we've chosen $W$ and $U$ we can write down the SPH Lagrangian:

$$L_{SPH}(\dot{r}_i,r_i)=\sum_i m_i\left(\frac{1}{2}\dot{r}_i^2-U(\sum_j m_j W(r_i-r_j))\right) \tag{1.1}$$

Being able to write down a Lagrangian is great because—if you're a physicist—it immediately gives the equations of motion, and it also gives conservation of energy, momentum, angular momentum, and center of mass. (By conservation of the center of mass, I mean $\sum_i m_i \dot{r}_i=R+V t$ for some $R$, $V$ and for all $t$). 

As a reminder, the Euler-Lagrange equations of motion for the $\kappa$-th vector component of the $i$-th particle is as follows:

$$\frac{d}{dt}\frac{\partial L}{\partial \dot{r}_i^\kappa}-\frac{\partial L}{\partial r_i^\kappa}=0\tag{1.2}$$

If you plug (1.1) into the Euler-Lagrange equations (1.2), you get the equations of motion which you'll see in every good tutorial on SPH

$$
\frac{dr_i}{dt}=-\sum_j m_j\nabla_i W_{ij}\left(\frac{p_j}{\rho_j^2}+\frac{p_i}{\rho_i^2}\right)
$$

where we also have to introduce shorthand $\rho_i=\sum_j m_j W(r_i-r_j)$ and $p_i=\rho_i^2 U'(\rho_i)$. 

# 2. The Navier-Stokes Lagrangian <a name="section2"></a>
SPH is great, but what would be really great is to have a dictionary for going back and forth between the SPH formulation and the Navier-Stokes (NS) equations. Let's outline the end result before diving into all of the math.

I find that the correct Lagrangian density is, for dynamical field $\vec{r}(\vec{a},t)$:

$$\mathcal{L}_{NS}(\dot{r}^\kappa,\frac{\partial r^\kappa}{\partial a^\nu},a)=\frac{1}{2}\mu(a)\dot{r}^2-\mu(a)U\left(\mu(a)\Bigg| \frac{\partial r}{\partial a}\Bigg|^{-1}\right) \tag{2.1}$$

where $\big\| \frac{\partial r}{\partial a}\big\|$ is the Jacobian determinant of the coordinate transformation $\vec{r}(\vec{a},t)$. The tensor $\frac{\partial r^\kappa}{\partial a^\gamma}$ is known as the [deformation gradient tensor](https://en.wikipedia.org/wiki/Finite_strain_theory) denoted by the letter $F$. It's not familiar to me, but it might be very familiar to those with an engineering background!

The Euler-Lagrange equations for any continuous field are:

$$\frac{d}{dt}\frac{\partial \mathcal{L}}{\partial \dot{r}^\kappa}+\frac{\partial}{\partial a^\gamma}\frac{\partial \mathcal{L}}{\partial \frac{\partial r^\kappa}{\partial a^\gamma}}-\frac{\partial \mathcal{L}}{\partial r^\kappa}=0\tag{2.2}$$

Where I use the Einstein repeated index summation convention. If you plug (2.1) into the Euler-Lagrange equations (2.2), you get a kind-of-ghastly equation in terms of the field $r(a,t)$. It takes a bit of care, but you can hide the coordinates $a$ by writing things in terms of the velocity $v(r,t)$ and the pressure and density. Doing so gives the Navier-Stokes equations with zero viscosity:

$$\frac{\partial v}{\partial t}+(v\cdot \nabla)v=-\frac{1}{\rho}\nabla p$$

where the density is defined as $\rho=\mu(a)\big\| \frac{\partial r}{\partial a}\big\|^{-1}$ and the pressure is defined as $p=\rho^2 U'(\rho)$.

# 3. Going from SPH to a Lagrangian Density <a name="section3"></a>

The goal is to start at the equation for the SPH Lagrangian (equation 1.1), and wind up at the NS Lagrangian (equation 2.1). The basic prescription used here is to treat every chunk of mass $m_i$ as an infinitesimal chunk $\mu(a) d^da$. Essentially: $\sum_i m_i\mapsto \int d^d a \mu(a)$.

It's useful to note that $a$ can have different units than $r$, and so this gives us an extra sanity check in our calculations. Note that $\mu$ has units of $[\text{mass}]/[\text{a}]^d$, while density should have units of $[\text{mass}]/[\text{r}]^d$, so we would be able to argue based on units alone that density should be written as $\rho=\mu(a)\big\| \frac{\partial r}{\partial a}\big\|^{-1}$. We'll come up with a better argument for this in section 3.2, but it's a nice start.

## 3.1. The Kinetic Term <a name="section3-1"></a>
There's not too much to be said about this: 

$$\sum_i m_i \dot{r}_i^2 \mapsto \int d^d a \mu(a) \dot{r}(a,t)^2$$

If our Lagrangian had been noninteracting, $L=\sum_i (\frac{1}{2} m_i \dot{r}_i^2-m_iV_i(r_i))$, then we would be able to write the Lagrangian density as:

$$\mathcal{L}(\dot{r}^{\kappa},\frac{\partial r^{\kappa}}{\partial a^\nu},r^\kappa)=\mu\left(\frac{1}{2}\dot{r}^2-V(r(a))\right) \tag{3.1}$$

I show in section 4 that this gives the equations of motion

$$\frac{\partial \vec{v}}{\partial t}+(\vec{v}\cdot\nabla)\vec{v}=-\nabla V(r)$$

Which we should understand as Newton's law.

$$\frac{D\vec{v}}{Dt}=-\nabla V$$

This is a good exercise, because even if we get lost in the vector calculus, we know that what's going on behind the scene with equation 3.1 is just Newton's law with noninteracting particles!

## 3.2. The interaction term <a name="section3-2"></a>

The interaction term causes more problems. We do the same prescription $\sum_i m_i\mapsto \int d^d a \mu(a)$, but now we have to do this replacement with two sums:

$$\begin{align*}
\sum_i m_i U(\sum_j m_j W(r_j-r_i))&\mapsto\int d^d a \mu(a) U\left(\int d^d a' \mu(a')W(r(a')-r(a))\right)
\end{align*}$$

As we take the continuum limit, we should also take the size of our smoothing function $W$ to zero as well. The function $W(\vec{r})$ is some smoothing function which has a width parameter I'll call $h$. The specific form isn't important, but what is important is that it is spherically symmetric and that $\int d^d r W(r)=1$. These are the only essential properties you need for this derivation. If you really have to deal with a specific example, a Gaussian with size $h$ is the easiest choice:

$$W_{gauss}(r)=(2\pi h^2)^{-d/2} \exp\left(-\frac{r^2}{2h^2}\right)$$

Well, next, let's look at the integral inside $U$ and change variables to $b=a'-a$:

$$\begin{align*}
\int d^d b \mu(a+b)W(r(a+b)-r(a))
\end{align*}$$

Taylor expand $\mu$ and $r$ around $b=0$. $\mu(a+b)=\mu(a)+O(b)$, and $r^\kappa(a+b)-r^\kappa(a)=\frac{\partial r^\kappa}{\partial a^\nu} b^\nu +O(b^2)$. So we find:

$$\begin{align*}
\int d^d b \mu(a+b)W(r(a+b)-r(a))=\int d^d b \left( \mu(a)W(\frac{\partial r^\kappa}{\partial a^\nu} b^\nu)+O(b)\right)
\end{align*}$$

This integral is doable, it is just a change of coordinates in a multivariable calculus class:

$$\int d^d b \mu(a+b)W(r(a+b)-r(a))=\mu(a)\Bigg|\frac{\partial r}{\partial a}\Bigg|^{-1}+O(h^2)$$

So at the end of the day, the interaction term in our Lagrangian density is:

$$\begin{align*}
\sum_i m_i U(\sum_j m_j W(r_j-r_i))&\mapsto\int d^d a \mu(a) U\left(\mu(a)\Bigg|\frac{\partial r}{\partial a}\Bigg|^{-1}\right)\\
&=\int d^d a \mu(a) U\left(\rho\right)
\end{align*}$$

where I have finally introduced the shorthand notation $\rho=\mu(a)\big\|\frac{\partial r}{\partial a}\big\|^{-1}$, a term which naturally popped out of the integral.

So, that's all we need. We've found how to take the continuum limit of the kinetic and interaction terms. Combining them gives what I will call the Navier-Stokes Lagrangian (conservative, compressible, zero viscosity):

$$\mathcal{L}_{NS}(\dot{r}^\kappa,\frac{\partial r^\kappa}{\partial a^\nu},a)=\frac{1}{2}\mu(a)\dot{r}^2-\mu(a)U\left(\mu(a)\Bigg| \frac{\partial r}{\partial a}\Bigg|^{-1}\right) \tag{2.1}$$

# 4. Varying the Action <a name="section4"></a>

Getting to the equations of motion is a bit of a chore. I'll start with the example of a noninteracting Lagrangian density and then move on to the fluid version.

## 4.1 A Noninteracting Lagrangian <a name="section4-1"></a>

As a warmup, let's find the equations of motion for the Lagrangian found in 3.1. We can interpret it as a bunch of noninteracting parcels of fluid in an external potential.

$$\mathcal{L}(\dot{r}^\kappa,\frac{\partial r^\kappa}{\partial a^\nu},r^\kappa)=\frac{1}{2}\mu \dot{r}^2-\mu V(r)$$

Note that $\dot{r}^2$ is shorthand for $\dot{r}^\kappa \dot{r}_\kappa$. This doesn't depend at all on the Jacobian matrix, so the Euler-Lagrange equations are quite simple:

$$\begin{align*}0&=\frac{d}{dt}\frac{\partial\mathcal{L}}{\partial \dot{r}^\kappa}-\frac{\partial\mathcal{L}}{\partial r^\kappa}\\
&=\ddot{r}_\kappa +\frac{\partial}{\partial r^\kappa}V

\end{align*}$$

This still uses $a$ as the independent variable, but we can cast this into a different form using the material derivative. I show in the appendix A.1 that if we write this equation in terms of the velocity vector $v^\kappa(r,t)=\dot{r}^\kappa(a(r),t)$ with $r$ treated as the independent variable, then the above equation gives:

$$0=\dot{v}^\kappa+v^\gamma \frac{\partial v^{\kappa}}{\partial r^\gamma}+\frac{\partial V}{\partial r^\kappa}$$

Or in vector notation:

$$\frac{\partial v}{\partial t}+(v\cdot \nabla)v=-\nabla V(r)$$

So that's great, the lefthand side is the convective part of the Navier-Stokes equation, and the righthand side is the "body force" part. All that's left is to do the pressure part in the full Lagrangian.

## 4.2 Varying the NS Lagrangian <a name="section4-2"></a>
Starting with the following:

$$\mathcal{L}_{NS}(\dot{r}^\kappa,\frac{\partial r^\kappa}{\partial a^\nu},a)=\frac{1}{2}\mu(a)\dot{r}^2-\mu(a)U\left(\mu(a)\Bigg| \frac{\partial r}{\partial a}\Bigg|^{-1}\right)$$

We can proceed to plug this into the Euler-Lagrange equations. 

$$\frac{d}{dt}\frac{\partial \mathcal{L}}{\partial \dot{r}^\kappa}+\frac{\partial}{\partial a^\gamma}\frac{\partial \mathcal{L}}{\partial \frac{\partial r^\kappa}{\partial a^\gamma}}-\frac{\partial \mathcal{L}}{\partial r^\kappa}=0$$

Unlike in section 4.1, the middle term doesn't vanish. We get the equations of motion:

$$\begin{align*}
0&=\mu\ddot{r}_\kappa-\frac{\partial}{\partial a^\gamma}\frac{\partial }{\partial \frac{\partial r^\kappa}{\partial a^\gamma}}\mu(a)U\left(\mu(a)\Bigg| \frac{\partial r}{\partial a}\Bigg|^{-1}\right)\\
&=\mu\ddot{r}_\kappa+\frac{\partial}{\partial a^\gamma}\left( \mu(a)^2U'(\rho)\Bigg| \frac{\partial r}{\partial a}\Bigg|^{-2}\frac{\partial }{\partial \frac{\partial r^\kappa}{\partial a^\gamma}}\Bigg|\frac{\partial r}{\partial a}\Bigg|\right)\\
&=\mu\ddot{r}_\kappa+\frac{\partial}{\partial a^\gamma}\left( \rho^2U'(\rho)\frac{\partial }{\partial \frac{\partial r^\kappa}{\partial a^\gamma}}\Bigg|\frac{\partial r}{\partial a}\Bigg|\right)\\
&=\mu\ddot{r}_\kappa+\frac{\partial}{\partial a^\gamma}\left( p\frac{\partial }{\partial \frac{\partial r^\kappa}{\partial a^\gamma}}\Bigg|\frac{\partial r}{\partial a}\Bigg|\right)
\end{align*}$$

Where I have defined the quantity $p=\rho^2 U'(\rho)$ to be the pressure. This is a complicated expression, but one of the derivatives vanishes (which I show in the appendix): 

$$\frac{\partial}{\partial a^\gamma}\frac{\partial }{\partial \frac{\partial r^\kappa}{\partial a^\gamma}}\Bigg|\frac{\partial r}{\partial a}\Bigg|=0\tag{A.2}$$

And the derivative itself can be simplified as well, in a consequence of [Jacobi's Formula](https://en.wikipedia.org/wiki/Jacobi%27s_formula):

$$\frac{\partial }{\partial \frac{\partial r^\kappa}{\partial a^\gamma}}\Bigg|\frac{\partial r}{\partial a}\Bigg|=\frac{\partial a^\gamma}{\partial r^\kappa}\Bigg|\frac{\partial r}{\partial a}\Bigg|\tag{A.3}$$

So the Euler-Lagrange equations can be further manipulated to finally give us Navier-Stokes:

$$\begin{align*}0&=\ddot{r}_\kappa+\frac{1}{\mu}\Bigg|\frac{\partial r}{\partial a}\Bigg| \frac{\partial a^\gamma}{\partial r^\kappa}\frac{\partial}{\partial a^\gamma}p\\
&=\ddot{r}_\kappa+\frac{1}{\rho}\frac{\partial p}{\partial r^\kappa}\tag{4.2}
\end{align*}$$

where in the last line, I have used the definition of $\rho$ again, as well as the chain rule $\frac{\partial a^\gamma}{\partial r^\kappa}\frac{\partial}{\partial a^\gamma}p=\frac{\partial p}{\partial r^\kappa}$.

As a function in $a$, this is a complete description. We could imagine a numerical scheme where we define the function $r(a,0)$ on a grid of fixed points and evolve it over time, calculating the density from the Jacobian. But just the same as in section 4.1 and  the appendix A1, if we define the velocity as $\dot{r}(a,t)=v(r,t)$, then $\ddot{r}^\kappa=\dot{v}^\kappa+v^\nu \frac{\partial v^{\kappa}}{\partial r^\nu}$, and so our equation 4.2 can be rewritten:

$$0=\dot{v}^\kappa+v^\nu \frac{\partial v^{\kappa}}{\partial r^\nu}+\frac{1}{\rho}\frac{\partial p}{\partial r^\kappa}$$

which can then be rewritten into the more familiar form:

$$\dot{v}+(v\cdot\nabla)v=-\frac{1}{\rho}\nabla p$$

Even then, to turn this into a numerical scheme and totally do away with the coordinates $a$, we're missing a bit of information because we can no longer calculate the density using the Jacobian determinant $\Big\|\frac{\partial r}{\partial a}\Big\|$. Instead we would have to introduce $\rho(r,t)$ as another dynamical variable and you would have to derive the continuity equation by considering $\dot{\rho}(r,t)=\frac{\partial}{\partial t}(\mu(a(r))\Big\|\frac{\partial r}{\partial a}\Big\|^{-1})$.

# 5. More general Lagrangians <a name="section5"></a>
We can ask ourselves if equation 2.1 for $\mathcal{L}_{NS}$ was the most general continuum Lagrangian we could have written down. In fact it is not, we could have written:

$$\mathcal{L}_H(\dot{r}^\kappa,\frac{\partial r^\kappa}{\partial a^\nu},a)=\frac{1}{2}\mu(a)\dot{r}^2-\mu(a)A\left(F\right)$$

where $F^\kappa_\nu=\frac{\partial r^\kappa}{\partial a^\nu}$ is the Jacobian matrix or "deformation gradient tensor", and $A$ is allowed to depend on the components of $F$. I'll write the eigenvalues of $F$ as $\lambda_1,\ldots,\lambda_d$. 

Upon an active rotation of the coordinate system $r$, $F$ will change as 

$$R^{\kappa}_{\gamma} F^{\gamma}_{\nu} =[R F]^{\kappa}_{\nu}$$

 To ensure that $A(F)$ is invariant under rotations, we had better enforce that $A$ only depends on $F^T F$. If our material is isotropic, then we'd better be able to change our reference coordinate system $a$ at will, so $A$ should only depend on the eigenvalues of $F^TF$, which are $\lambda_1^2,\ldots,\lambda_d^2$. And finally, if we permute the axes of our reference coordinate system $a$ our Lagrangian should also be unchanged. For example, for $d=3$, we conclude that $A(F)$ can only depend on the three invariants $I_1=\lambda_1^2+\lambda_2^2+\lambda_3^2$, $I_2 = \lambda_1^2\lambda_2^2 +\lambda_2^2\lambda_3^2+\lambda_3^2\lambda_1^2$, and $I_3=\lambda_1^2\lambda_2^2\lambda_3^2$. The function $A$ is known as the strain energy density function, and in fact this argument derives the entire theory of [hyperelasticity](https://en.wikipedia.org/wiki/Hyperelastic_material)! If we only use $I_3$ then we get back our theory of compressible fluid dynamics, and we can expect $I_1$ and $I_2$ to give us terms relating to other elastic deformations.
# 6. Where to go from here? <a name="section6"></a>

- Find the equations of motion for hyperelastic systems, possibly for some special cases of $A$ found in engineering textbooks. In the case of fluids it was useful to define the intermediate variable $\rho=\mu(a)/\sqrt{I_3}$, are there analogous intermediate variables for $I_1$, $I_2$? 
- We have $I_1=\text{Tr}(F^T F)$, while other invariants could be computed from traces of powers of $F^T F$ by [Newton's identities](https://en.wikipedia.org/wiki/Newton%27s_identities). What implications does this have for the equations of motion? 
- What changes about the story if we add anisotropy?
- How can we add dissipative forces? Is [Rayleigh's dissipation function](https://en.wikipedia.org/wiki/Rayleigh_dissipation_function) sufficient to get a viscosity term? In the [Johnson-Cook model](https://en.wikipedia.org/wiki/Viscoplasticity#Johnson%E2%80%93Cook_flow_stress_model) the strain rate tensor plays an important role, is there a natural way that this arises from the Lagrangian density + dissipation?
- We saw how the radial smoothing function $W$ in the particle system gave rise to the Jacobian determinant $\sqrt{I_d}$ in the continuum system. So, what gives rise to $I_1$ through $I_{d-1}$? Or, the inverse problem, how can we go from the Lagrangian in section 5 back to an SPH-like scheme?
- Extend this to relativistic systems. What's the most general way to couple a fluid to the electromagnetic field? What about a scalar field?
- To my understanding, non-newtonian fluids exhibit time history (oobleck stays firm for a moment after it receives an impact). Is there a useful way to discuss this in a Lagrangian context? Of course we could just throw some really nasty convolution terms into $\mathcal{L}$, but the trick is to do something interesting or say something interesting about the results. 
- What does numerical integration in terms of the field $r(a,t)$ look like? Particle simulations tend to behave well with basic schemes like symplectic Euler ($\approx$ leapfrog $\approx$ Verlet) and I'd hazard a guess that simulations of a discretized $r(a,t)$ will behave well except that the evaluation of the Jacobian determinant will blow up numerically.


# Appendix <a name="appendix"></a>

## A1. Vector Calculus Definitions and the Material Derivative <a name="A1"></a>

To start with, I'm working in $d$ dimensions and in Euclidean space. I use greek letters out of habit and use the Einstein summation convention, where each upper index is contracted with a lower index. Everything in these notes is nonrelativistic. I write the vector dot product $\vec{r}\cdot\vec{v}$ as $r^\mu v_{\mu}$. The metric is the identity matrix, so upper and lower indices don't make a difference, and instead act as a consistency check! We should almost always be contracting an upper index with a lower index.

I always found the calculus of changing coordinate systems very complicated as a student, and so I'll try to be precise about my notation in this appendix! The vector $r^\kappa(a,t)$ will always refer to the coordinate $r^\kappa$ as a function of fixed $a$ and $t$.  So $\frac{\partial r^\kappa}{\partial a^\gamma}$ is always a well-defined thing, even if we evaluate it at some point $a(t),t$. Comma notation is less ambiguous so long as we are clear about what the independent and dependent variables are in a function: 

$$r^\kappa_{\ ,\gamma}\equiv \frac{\partial r^\kappa}{\partial a^\gamma}$$

Dot notation is used when convenient:

$$\dot{r}^\kappa\equiv r^\kappa_{\ ,t}= \frac{\partial r^\kappa}{\partial t}$$

For the inverse transformation, $r(r^{-1}(r_0,t),t)=r_0$, we can get the formulas for the Jacobian matrix and inverse Jacobian matrix, 

$$\frac{\partial r^\kappa}{\partial a^\gamma} \frac{\partial (r^{-1})^\gamma}{\partial r^\nu}=\delta^{\kappa}{_\nu}$$

Where $\delta$ is the Kronecker delta. This formula may be written as:

$$\frac{\partial r^\kappa}{\partial a^\gamma} \frac{\partial a^\gamma}{\partial r^\nu}=r^\kappa_{\ ,\gamma}a^\gamma_{\ ,\nu}=\delta^{\kappa}{_\nu}$$

so long as we are clear that in this notation, $a$ refers to the inverse function $r^{-1}$. In the function $r^\kappa(a,t)$ it is obvious that $a$ is independent, but it gets confusing when considering $\dot{r}$. I define $\tilde{v}^\kappa(a,t)=\dot{r}^\kappa(a,t)$ as "the co-moving velocity", since $a$ is the independent variable. On the other hand, the velocity field $v^\kappa(r,t)$ should be defined as $v^\kappa(r_0,t)=\tilde{v}(r^{-1}(r_0,t),t)$. This means that the time derivatives of $v$ and $\tilde{v}$ are related through the chain rule.

$$\tilde{v}^\kappa_{\ ,t}=v^\kappa_{\ ,t}+v^\gamma v^{\kappa}_{\ ,\gamma}\tag{A.1}$$

Or, in more standard notation:

$$\frac{Dv}{Dt}=\frac{\partial v}{\partial t}+(v\cdot\nabla) v$$

Oftentimes this is taken to be the definition of the material derivative, but note that in these notes A1 is a theorem instead of a definition.

## A2. Determinant derivative identities. <a name="A2"></a>
To get to Navier-Stokes, I had to make use of two identities involving the derivative of a determinant. I'm a big fan of expanding out formulas for the determinant in all their gory details. One way to write out those formulas is using the Levi-Civita symbol $$|A|=A^{i_1}_{1}\cdots A^{i_d}_{d}\varepsilon_{i_1\cdots i_d}$$, but an object called the generalized Kronecker delta symbol is a much better way to go:

$$\begin{align*}
|A|&=A^{1}_{i_1}A^{2}_{i_2}\cdots A^{d}_{i_d}\delta^{i_1\cdots i_d}_{1\cdots d}\\
&=\frac{1}{d!}A^{j_1}_{i_1}A^{j_2}_{i_2}\cdots A^{j_d}_{i_d}\delta^{i_1\cdots i_d}_{j_1\cdots j_d}
\end{align*}$$

I learned about this from the paper "Generalized Kronecker and permanent deltas, their spinor and tensor equivalents and applications" by Agacy, 1999. A similar concept is also used in chapter 6 of Feynman's "Statistical Mechanics: A Set of Lectures". The generalized Kronecker delta is defined from the usual Kronecker delta $\delta^a_{b}$ (which is only nonzero if $a=b$) as:

$$\delta^{\beta_1\cdots\beta_d}_{\alpha_1\cdots\alpha_d}=\begin{vmatrix}
\delta^{\beta_1}_{\alpha_1} & \delta^{\beta_1}_{\alpha_2} & \cdots\\
\delta^{\beta_2}_{\alpha_1} & \delta^{\beta_2}_{\alpha_2} & \\
\vdots & & \ddots
\end{vmatrix}$$

Or an alternate definition:

$$\delta^{\beta_1\cdots\beta_d}_{\alpha_1\cdots\alpha_d}=\begin{cases}
1\text{ if } (\alpha_1,\ldots) \text{ is an even permutation of } (\beta_1,\ldots)\\
-1\text{ if } (\alpha_1,\ldots) \text{ is an odd permutation of } (\beta_1,\ldots)\\
0\text{ otherwise.}
\end{cases}$$

This is enough to write out the first equation, A2.

$$\begin{align*}
&\frac{\partial}{\partial a^\gamma}\frac{\partial }{\partial \frac{\partial r^\kappa}{\partial a^\gamma}}\Bigg|\frac{\partial r}{\partial a}\Bigg|\tag{A.2}\\

&=\frac{1}{d!}\frac{\partial}{\partial a^\gamma}\frac{\partial }{\partial \frac{\partial r^\kappa}{\partial a^\gamma}}\frac{\partial r^{\alpha_1}}{\partial a^{\beta_1}}\cdots \frac{\partial r^{\alpha_d}}{\partial a^{\beta_d}}\delta^{\beta_1\cdots\beta_d}_{\alpha_1\cdots \alpha_d}\tag{definition}
\\

&=\frac{1}{d!}\frac{\partial}{\partial a^\gamma}\sum_{i=1}^d\delta^{\kappa}_{\alpha_i} \delta^{\beta_i}_{\gamma}\frac{\partial r^{\alpha_1}}{\partial a^{\beta_1}}\cdots\widehat{\frac{\partial r^{\alpha_i}}{\partial a^{\beta_i}}}\cdots  \frac{\partial r^{\alpha_d}}{\partial a^{\beta_d}}\delta^{\beta_1\cdots\beta_d}_{\alpha_1\cdots \alpha_d} \tag{product rule}
\\
&=\frac{1}{d!}\sum_{i=1}^d\delta^{\kappa}_{\alpha_i} \frac{\partial}{\partial a^{\beta_i}}\frac{\partial r^{\alpha_1}}{\partial a^{\beta_1}}\cdots\widehat{\frac{\partial r^{\alpha_i}}{\partial a^{\beta_i}}}\cdots  \frac{\partial r^{\alpha_d}}{\partial a^{\beta_d}}\delta^{\beta_1\cdots\beta_d}_{\alpha_1\cdots \alpha_d}\\
&=0\tag{antisymmetry}
\end{align*}$$

The hat over the i-th term means that we have deleted it from the product (it's an awkward notation, but it's the best we can do). The final line holds because each term vanishes individually. For example, 

$$\frac{\partial^2 r^{\alpha_1}}{\partial a^{\beta_i}\partial a^{\beta_1}}\delta^{\beta_1\cdots\beta_d}_{\alpha_1\cdots \alpha_d}=0$$

which vanishes because the partial derivative term is symmetric upon swapping $\beta_i$ and $\beta_1$, while $\delta$ is antisymmetric on swapping $\beta_i$ and $\beta_1$. 

---
On to the second identity:

$$\frac{\partial }{\partial \frac{\partial r^\kappa}{\partial a^\gamma}}\Bigg|\frac{\partial r}{\partial a}\Bigg|=\frac{\partial a^\gamma}{\partial r^\kappa}\Bigg|\frac{\partial r}{\partial a}\Bigg|\tag{A.3}$$

This is a consequence of [Jacobi's Formula](https://en.wikipedia.org/wiki/Jacobi%27s_formula), and the Wikipedia page discusses its derivation in detail. If we proceeded by expanding out using the generalized kronecker delta, we would end up reproducing the Wikipedia's proof via matrix computation. The matrix $\frac{\partial a^\gamma}{\partial r^\kappa}$ which is the inverse of $\frac{\partial r^\kappa}{\partial a^\gamma}$ comes about from recognizing the formula for the matrix of cofactors (where for a matrix $A$ with matrix of cofactors $C$, $A C^T=\|A\|I$ with $I$ the identity matrix). 

## A3. Side comment about the integral in section 3.2 <a name="A3"></a>
In section 3.2, we had to approximate the following integral:

$$\begin{align*}
\int d^d b \mu(a+b)W(r(a+b)-r(a))
\end{align*}$$

If we use a Gaussian kernel $W_{Gauss}$ then we can actually calculate a full asymptotic series for this integral while treating $\mu$ as a continuous field and treating $h$ as small but finite.

The Taylor expansion for mu looks like:  $\mu(a+b)=\mu(a)+\mu_{,\alpha} b^\alpha+\frac{1}{2}\mu_{,\alpha\beta}b^\alpha b^\beta+\ldots$
Similarly: $r^\kappa(a+b)-r^\kappa(a)=r^\kappa_{\ ,\alpha}b^\alpha+\frac{1}{2}r^\kappa_{\ ,\alpha\beta}b^\alpha b^\beta+\ldots$
Maybe you'll believe me that we could evaluate the whole series of integrals, and that it would look something like:

$$\sum_{n=0}^\infty \int d^d b b^{\alpha_1}\cdots b^{\alpha_n} T_{\alpha_1\cdots\alpha_n} W_{gauss}(r^\kappa_{,\nu}b^\nu)$$

which can be evaluated exactly using Wick's theorem / Isserlis' theorem. This isn't just writing horrible expressions for the sake of it, you do integrals like this all the time in quantum field theory! We evaluated the $O(1)$ integral. But other integrals would give us corrections which are of order $h^2$. This might be a fun side project: start with an SPH system and simulate it, and then carefully consider whether your system is reproducing the results of the Navier-Stokes equations, or if it's describing a different continuum theory which includes some term $O(h^2)$. 


# Corrections

Correction 02/26/2024: fixed some stray $\mu$'s where they shouldn't be.

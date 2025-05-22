---
layout: post
title:  "Wirtinger Derivative Approach to Complex Analysis"
date:   2025-05-21 00:00:01 -0800
---

**Note:** This post is a draft! I'm still tinkering with formatting :)

The idea of generalizing the definition of a derivative can take us pretty far in applied math, and there's a unified way to present the material that I don't often see. 

## Revisiting the definition of the real derivative
We usually take the derivative of a real-valued function $f:\mathbb{R}\to\mathbb{R}$ to be

$$f'(x)=\lim_{h\to 0} \frac{f(x+h)-f(x)}{h},$$

but let's change our point of view slightly and think about an equivalent definition:

> **Definition 1.** We say that the derivative of $f$ at $x$ is equal to $a$ if
> 
> $$\lim_{h\to 0} \frac{f(x+h)-f(x)- ah}{|h|}=0.$$

This style of definition is what I'll call the [Fréchet-style derivative](https://en.wikipedia.org/wiki/Fr%C3%A9chet_derivative), and it's the best way to generalize the notion of a derivative that it's the "linear part" of $f$ near $x.$ Another equivalent definition is..

> **Definition 2.** The derivative of $f$ at $x$ is equal to $a$ if
> 
> $$f(x+h)=f(x)+ah+o(h) \tag{as $h\to 0$}$$

This seems like a different definition, but in fact I'm just shuffling words around! [Little-o notation](https://en.wikipedia.org/wiki/Big_O_notation#Little-o_notation) and all its cousins are notoriously difficult to remember, but Edmund Landau's original definition of little-o notation is that $f(h)=o(g(h))$ as $h\to 0$ if 

$$\lim_{h\to 0} \frac{f(h)}{\|g(h)\|}=0.$$ 

So this definition does nothing new at all, and simply hides the division by the norm of $g(h).$ 

**Note on big-O notation:** 
There is a slight modification we could make. It's really tempting to throw away little-o notation and simply use big-O notation: we're tempted to define the derivative of $f$ at $x$ to be $a$ if 

$$f(x+h)=f(x)+ah+O(h^2).$$

In many cases this definition works fine, but the pathological case $f(x)=x^{3/2}\sin(1/x)$ (with the singularity at 0 removed, $f(0)=0$) demonstrates an issue. The limit definition of a derivative works fine:

$$\lim_{h\to 0}\frac{h^{3/2}\sin(1/h)}{h}=0$$

but our big-O notation definition would require $f(h)=O(h^2),$ giving

$$\textrm{lim sup}_{h\to 0}\frac{|h^{3/2}\sin(1/h)|}{|h^2|} \lt \infty,$$

which is false! 

So our big-O notation definition works most of the time and is a bit more intuitive for physicists, but it technically is slightly different.

## Revisiting the Jacobian
> "But David, get to the point already."

Nope! Time to talk about the Jacobian. In fact, the Jacobian matrix is a Fréchet derivative, but we avoid the full definition because the Fréchet derivative aims to work in infinite dimensions and more general settings, and we don't need that. Let's review the definition of a Jacobian matrix:

> **Definition (Jacobian).** Given multivariable function ${\mathbf f}:\mathbb{R}^n\to\mathbb{R}^m,$ the derivative of ${\mathbf f}$ at $\mathbf{x},$ also known as the Jacobian matrix $J,$ is a linear transformation $J:\mathbb{R}^n\to\mathbb{R}^m$ such that:
> 
> $$\lim_{ {\mathbf h} \to {\mathbf 0} } \frac{\| {\mathbf f}({\mathbf x}+{\mathbf h})-{\mathbf f}({\mathbf x})-J{\mathbf h}\|}{\|{\mathbf h}\|}=0$$

If such a $J$ exists, it has components given by 

$$J_{ij}=\frac{\partial f^i}{\partial x^j},$$

where $f^i$ refers to the $i$-th component of the multivariable function ${\mathbf f}$. For writing $J$ as a matrix, the convention is that the first index denotes the row and the second index denotes the column of the matrix. In this case, $i$ is the row and $j$ is the column, and the whole J matrix looks like

$$J=\begin{bmatrix} \frac{\partial f^1}{\partial x^1} & \frac{\partial f^1}{\partial x^2} & \ldots \\ 
 \frac{\partial f^2}{\partial x^1} & \frac{\partial f^2}{\partial x^2} &  \\ 
  \vdots &  & \ddots \\ \end{bmatrix}.$$

I want you to think of this definition the same way as before, keeping in mind that all we're doing is shuffling around definitions:

$${\mathbf f}({\mathbf x}+{\mathbf h})={\mathbf f}({\mathbf x})+J{\mathbf h}+o({\mathbf h})$$

Well anyways, it's a very boring exercise to prove things how the multivariable chain rule amounts to multiplying Jacobian matrices, and so we get all properties of the derivative that we know and love.


## Complex Functions

Well, all that work was just to make sure we're on the same page about Jacobians and the definition of the derivative! Now we can define complex derivatives $\frac{\partial f}{\partial z}$ by saying *absolutely nothing new*!

> **Definition (complex).** Given a multivariable function $f:\mathbb{C}\to\mathbb{C},$ the complex partial derivatives of $f$ at $z,$ are complex numbers $a$ and $b$ such that
> 
> $$\lim_{h\to 0} \frac{| f(z+h)-f(z)-ah -b\overline{h}|}{|h|}=0,$$
> where $\overline{h}$ is the complex conjugate of $h.$ $a$ and $b$ are known as the Wirtinger derivatives and are often written as
> 
> $$\frac{\partial f}{\partial z}=a, \qquad \frac{\partial f}{\partial \overline{z}}=b.$$
 
 Why does this say nothing new? Because this is just a rephrasing of our existing definition of the Jacobian.
 
> **Theorem.** Consider a function $f:\mathbb{C}\to\mathbb{C}$ which we can also view as a function $g:\mathbb{R}^2\to\mathbb{R}^2.$ Then $f$ is differentiable at $z$ with Wirtinger derivatives $a=a_x+a_yi$ and $b=b_x+b_yi$ if and only if $g$ is differentiable at $\mathbf z$ with Jacobian matrix $J,$ such that:
> 
> $$J=\begin{bmatrix} a_x+b_x & b_y-a_y \\ a_y+b_y & a_x-b_x \end{bmatrix}$$ 
> 
> Or by inverting the previous equation, 
> 
> $$a=\frac{J_{11}+J_{22}}{2}+\frac{i}{2}(J_{21}-J_{12}),$$
> 
> $$b=\frac{J_{11}-J_{22}}{2}+\frac{i}{2}(J_{21}+J_{12}).$$

This puts us in one-to-one correspondence with the Jacobian matrix. 

The last two equations for $a$ and $b$ can be made more clear if we simplify things down using the structure of the complex numbers. 

$$\begin{align*} \frac{\partial f}{\partial z}&=a\\
&=\frac{J_{11}+J_{22}}{2}+\frac{i}{2}(J_{21}-J_{12}) \\
&=\frac{1}{2}\left(\frac{\partial g^1}{\partial x^1}+\frac{\partial g^2}{\partial x^2}\right)+\frac{i}{2}\left(\frac{\partial g^2}{\partial x^1}-\frac{\partial g^1}{\partial x^2}\right)\\
&=\frac{1}{2}\left(\frac{\partial}{\partial x}-i\frac{\partial }{\partial y}\right)\left(g^1+g^2 i\right)\\
&=\frac{1}{2}\left(\frac{\partial}{\partial x}-i\frac{\partial }{\partial y}\right)f.
\end{align*}$$

A similar procedure can be carried out for $b.$ After doing this, we can remove the $f$ from both sides of the equation and get the formula for Wirtinger derivatives:

$$\begin{align*}\frac{\partial }{\partial z}&=\frac{1}{2}\left(\frac{\partial}{\partial x}-i\frac{\partial }{\partial y}\right) \\
\frac{\partial }{\partial \overline{z}}&=\frac{1}{2}\left(\frac{\partial}{\partial x}+i\frac{\partial }{\partial y}\right)
\end{align*}$$

This is usually taken to be the *definition* of a Wirtinger derivative, but I like my definition better! The complex derivative is defined such that $f(z+h)-f(z)$ has a part proportional to $h$, and a part proportional to $\overline{h}:$

$$f(z+h)=f(z)+ah+b\overline{h}+o(h)$$

I came up with this approach after reading Ahlfors' Complex Analysis book, which says early on, referring to Wirtinger derivatives: "these expressions have no convenient definition as limits" and "we present this procedure with an explicit warning to the reader that it is purely formal and does not possess any power of proof." Balderdash! I still can't get over how bad of an approach that is! It's just the Jacobian pulled apart into more convenient complex coordinates. 

To emphasize, we have introduced absolutely no new mathematics so far. We've rephrased the definition of the real derivative, we've revisited the definition of the Jacobian, and we've figured out this encoding of the pieces of the Jacobian in terms of complex numbers $a$ and $b.$ 

The next part of a complex analysis textbook is to ask what happens if we enforce the condition that $b=0$ everywhere, and *that's* where the meat of complex analysis starts. 

## Appendices

### A note on Differentiable Manifolds
There's a confusion that often arises when talking about the Jacobian. When defining the Jacobian, it might feel like we use the definition of a norm in a really essential way, because quantities like 

$$\|{\mathbf h}\|=\sqrt{\sum_{i=1}^d h_i^2}$$

keep showing up in our equations. 

However, an important lesson taught in real analysis books and point-set topology books is that essentially all norms that we can choose are equivalent. For example, if we define 

$$\|{\mathbf h}\|_p=\sqrt[p]{\sum_{i=1}^d h_i^p},$$

the definitions still go through and we can even take different norms in the numerator and denominator:

> **Definition (Jacobian).** Given multivariable function $f:\mathbb{R}^n\to\mathbb{R}^m,$ the derivative of $f$ at $\mathbf{x},$ also known as the Jacobian matrix $J,$ is a linear transformation $J:\mathbb{R}^n\to\mathbb{R}^m$ such that:
> 
> $$\lim_{ {\mathbf h} \to {\mathbf 0} } \frac{\| f({\mathbf x}+{\mathbf h})-f({\mathbf x})-J{\mathbf h}\|_A}{\|{\mathbf h}\|_B}=0$$

This can cause confusion when studying general relativity or Riemannian manifolds, because we have this *other* object for measuring inner products floating around, $g({\mathbf v}_1,{\mathbf v}_2).$ This inner product is totally unrelated to the norm that we use inside the definition of the Jacobian. It's certainly not related to the norm we use when defining limits (all we need there is a *topology*.)

This is what leads me to make somewhat cryptic comments like, "the Jacobian is defined using the topology of $\mathbb{R}^n,$ not the geometry of our manifold." We get equivalent definitions of the Jacobian for a very wide class of distance functions, and so anything about the geometry of the space we're working in, which involves the metric $g,$ is irrelevant. 

### Generalizing the Derivative to Complex Multivariable Calculus

First, if ${\mathbf f}:\mathbb{C}^n\to\mathbb{C}^m,$ note that when viewed as a real function $\mathbb{R}^{2n}\to\mathbb{R}^{2m},$ our Jacobian matrix has $4nm$ parameters. We'd like to approximate our function as:

$${\mathbf f}(\mathbf z+\mathbf h)={\mathbf f}(\mathbf z)+\sum_{i=1}^n({\mathbf a}_{i} h_i + {\mathbf b}_{i} \overline{h}_i)+o(\mathbf h)$$

where each vector $\mathbf a_i$ has $m$ complex parameters. The collection of all $\mathbf a_i$ for $i=1$ to $n$ gives $nm$ complex parameters. The collection of all $\mathbf a_i$ and $\mathbf b_i$ gives $2nm$ complex parameters, which means we have $4nm$ real parameters. Therefore we again have a one-to-one correspondence with the Jacobian matrix. 

This is nothing new so far, it's just a rephrasing of the Jacobian. If we wanted to start to do multivariable complex analysis, we could start by requiring $\mathbf b_i=\mathbf 0$ everywhere for all $i$. 

### Generalizing to the Functional Derivative

When studying classical mechanics, we have to study the functional derivative. I first encountered this particular definition in V. I. Arnold's Mathematical Methods of Classical Mechanics. The definition of a functional derivative in chapter 3, section 12, is particularly nice.

> **Definition.** A functional $\Phi$ is called *differentiable* if $\Phi(\gamma+h)-\Phi(\gamma)=F+R,$ where $F$ depends linearly on $h$ (i.e., for a fixed $\gamma,$ $F(h_1+h_2)=F(h_1)+F(h_2)$ and $F(ch)=cF(h)$), and $R(h,\gamma)=O(h^{2})$ in the sense that,
> for $|h|\lt \varepsilon$ and $|dh/dt|\lt \varepsilon,$ we have $|R|\lt C\varepsilon^{2}.$ The linear part of the increment, $F(h),$ is called the *differential*.

The definition is very dense, and nevermind that I haven't defined a functional, the point I want to get across in motivating the definition is:

 - We have a complicated object $\Phi.$
 - We want to define $\Phi(\gamma+h)\approx \Phi(\gamma)+F[h]+o(h)$ in some sense.
 - Arnold opts for defining $O(h^2),$ but we could have just as well tried to define $o(h).$ Once this is done the functional derivative definition is complete.
 
A modern pure mathematics approach would certainly use the Frechet derivative, but for physicists it's more than enough to continue doing classical mechanics. 

This topic confused me greatly as an undergraduate, but now it shapes my general philosophy about how to invent new derivatives: First write down that something is linear in something else, plus extra stuff which goes to zero quickly enough. Then the hard part is defining what "goes to zero quickly enough" means!

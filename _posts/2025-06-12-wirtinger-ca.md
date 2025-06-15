---
layout: post
title:  "Wirtinger Derivative Approach to Complex Analysis"
date:   2025-06-12 00:00:01 -0800
---

Directory
===
- [Revisiting the definition of the real derivative](#section1)
- [Revisiting the Jacobian](#section2)
- [Complex Functions](#section3)
- [Appendices](#section4)
	- [Note on big-O notation](#section5)
	- [A note on Norms (Topology vs. Geometry)](#section6)
	- [Generalizing the Derivative to Complex Multivariable Calculus](#section7)
	- [Generalizing to the Functional Derivative](#section8)

# Wirtinger Derivative Approach to Complex Analysis <a name="section0"></a>


In this article I take the point of view of introducing complex analysis by starting with the definitions of the derivative and the Jacobian, and rephrasing what we already know about these things in terms of complex numbers. This approach has two benefits:

1. It leverages what you already know about Jacobians and multivariable calculus. 
2. It says *absolutely nothing new.* So if you get confused with the complex number terminology at any point, you can always ask "what is this saying in multivariable calculus language?"

## Revisiting the definition of the real derivative <a name="section1"></a>

We usually take the derivative of a real-valued function $f:\mathbb{R}\to\mathbb{R}$ to be

$$f'(x)=\lim_{h\to 0} \frac{f(x+h)-f(x)}{h},$$

but it's easier to compare definitions if we rewrite the statement in the following form:

> **Definition 1.** We say that the derivative of $f$ at $x$ is equal to $a$ if
> 
> $$\lim_{h\to 0} \frac{f(x+h)-f(x)- ah}{|h|}=0.$$

This definition is in a form similar to the definition of a [Fréchet derivative](https://en.wikipedia.org/wiki/Fr%C3%A9chet_derivative), and you'll see it often when trying to generalize the notion of taking the "linear part" of $f$ near $x.$ Another equivalent definition is...

> **Definition 2.** The derivative of $f$ at $x$ is equal to $a$ if
> 
> $$f(x+h)=f(x)+ah+o(h) \tag{as $h\to 0$}$$

This seems like a different definition, but in fact I'm just shuffling words around. [Little-o notation](https://en.wikipedia.org/wiki/Big_O_notation#Little-o_notation) and all its cousins can be notoriously difficult to remember, but in this context the definition is simple. Edmund Landau's original definition of little-o notation is that $f(h)=o(g(h))$ as $h\to 0$ iff 

$$\lim_{h\to 0} \frac{f(h)}{|g(h)|}=0.$$ 

To get from definition 2 to definition 1, we look at the statement

$$f(x+h)-f(x)-ah=o(h) \tag{as $h\to 0$}$$

and see that this is exactly definition 1. Definitions 1 and 2 are trivially equivalent.

Note: it's important that we used little-o notation instead of big-O notation here. See appendix 1.

## Revisiting the Jacobian <a name="section2"></a>

We'll get to the definition of the complex derivative of a function $f:\mathbb{C}\to\mathbb{C}$ by leaning on the definition of the Jacobian of a function ${\mathbf f}:\mathbb{R}^2\to\mathbb{R}^2.$ Let's review the definition of a Jacobian matrix:

> **Definition (Jacobian).** Given multivariable function ${\mathbf f}:\mathbb{R}^n\to\mathbb{R}^m,$ the derivative of ${\mathbf f}$ at $\mathbf{x},$ also known as the Jacobian matrix $J,$ is a linear transformation $J:\mathbb{R}^n\to\mathbb{R}^m$ such that:
> 
> $$\lim_{ {\mathbf h} \to {\mathbf 0} } \frac{\| {\mathbf f}({\mathbf x}+{\mathbf h})-{\mathbf f}({\mathbf x})-J{\mathbf h}\|}{\|{\mathbf h}\|}=0$$

If such a $J$ exists, it has components given by 

$$J_{ij}=\frac{\partial f^i}{\partial x^j},$$

where $f^i$ refers to the $i$-th component of the multivariable function ${\mathbf f}$. For writing $J$ as a matrix, the convention is that the first index denotes the row and the second index denotes the column of the matrix. In this case, $i$ is the row and $j$ is the column, and the whole $J$ matrix looks like

$$J=\begin{bmatrix} \frac{\partial f^1}{\partial x^1} & \frac{\partial f^1}{\partial x^2} & \ldots \\ 
 \frac{\partial f^2}{\partial x^1} & \frac{\partial f^2}{\partial x^2} &  \\ 
  \vdots &  & \ddots  \end{bmatrix}.$$

We can do the same thing as before, writing this using little-o notation. The big takeaway is that to find the "linear part" of $\mathbf f$ near $\mathbf x,$ we need a matrix $J$ instead of just a scalar:

> **Equivalent definition of the Jacobian.** Given multivariable function ${\mathbf f}:\mathbb{R}^n\to\mathbb{R}^m,$ $J$ is the Jacobian of $\mathbf f$ at $\mathbf x$ iff
> 
> $${\mathbf f}({\mathbf x}+{\mathbf h})={\mathbf f}({\mathbf x})+J{\mathbf h}+o({\mathbf h})$$
> 

From this we can work out all the usual properties of the derivative. For example, the multivariable chain rule amounts to multiplying Jacobian matrices. It would be silly to do all that proof work for the Jacobian and then repeat it for the complex derivative! But in fact we can avoid duplicated work. 

## Complex Functions <a name="section3"></a>

Now that we've refreshed our memory on the single variable and multivariable derivatives, it's tempting to define the "linear part" of a complex function $f:\mathbb{C}\to\mathbb{C}$ as a complex number $a$ such that 

$$f(z+h)=f(z)+ah+o(h).$$

However this isn't as general as we can make things. It turns out we get a more useful definition if we also allow the linear part of $f$ to include terms like $b\overline{h}$ where $b$ is a complex number, and $\overline{h}$ is the complex conjugate of $h.$ If we stare closely at the following definition, we find it says absolutely nothing new from the previous section's definition of the Jacobian:

> **Definition (complex).** Given a multivariable function $f:\mathbb{C}\to\mathbb{C},$ the complex partial derivatives of $f$ at $z,$ are complex numbers $a$ and $b$ such that
> 
> $$\lim_{h\to 0} \frac{| f(z+h)-f(z)-ah -b\overline{h}|}{|h|}=0,$$
> where $\overline{h}$ is the complex conjugate of $h.$ $a$ and $b$ are known as the Wirtinger derivatives and are often written as
> 
> $$\frac{\partial f}{\partial z}=a, \qquad \frac{\partial f}{\partial \overline{z}}=b.$$
 
 Why does this say nothing new? Because this is just a rephrasing of our existing definition of the Jacobian.
 
> **Theorem 1.** Consider a function $f:\mathbb{C}\to\mathbb{C}$ which we can also view as a function ${\mathbf g}:\mathbb{R}^2\to\mathbb{R}^2.$ Then $f$ is differentiable at $z$ with Wirtinger derivatives $a=a_x+a_yi$ and $b=b_x+b_yi$ if and only if ${\mathbf g}$ is differentiable at $\mathbf z$ with Jacobian matrix $J,$ such that:
> 
> $$J=\begin{bmatrix} a_x+b_x & b_y-a_y \\ a_y+b_y & a_x-b_x \end{bmatrix}$$ 
> 
> Or by inverting the previous equation, 
> 
> $$a=\frac{1}{2}(J_{11}+J_{22})+\frac{i}{2}(J_{21}-J_{12}),$$
> 
> $$b=\frac{1}{2}(J_{11}-J_{22})+\frac{i}{2}(J_{21}+J_{12}).$$

This puts us in one-to-one correspondence with the Jacobian matrix. 

The last two equations for $a$ and $b$ can be made more clear if we simplify things down using the structure of the complex numbers. 

<div>$$\begin{align*} \frac{\partial f}{\partial z}&=a\\
&=\frac{1}{2}(J_{11}+J_{22})+\frac{i}{2}(J_{21}-J_{12}) \tag{Theorem 1}\\
&=\frac{1}{2}\left(\frac{\partial g^1}{\partial x^1}+\frac{\partial g^2}{\partial x^2}\right)+\frac{i}{2}\left(\frac{\partial g^2}{\partial x^1}-\frac{\partial g^1}{\partial x^2}\right)\tag{Defn. of J}\\
&=\frac{1}{2}\left(\frac{\partial}{\partial x}-i\frac{\partial }{\partial y}\right)\left(g^1+g^2 i\right) \tag{Properties of $\mathbb{C}$}\\
&=\frac{1}{2}\left(\frac{\partial}{\partial x}-i\frac{\partial }{\partial y}\right)f \tag{Defn. of $f$}.
\end{align*}$$</div>

Keep in mind that $g^1$ and $g^2$ refer to the components of $\mathbf g,$ we're not raising anything to an integer power.

A similar procedure can be carried out for $b$ to find:

<div>$$\begin{align*} \frac{\partial f}{\partial \overline{z}}&=b\\
&=\frac{1}{2}\left(\frac{\partial}{\partial x}+i\frac{\partial }{\partial y}\right) f
\end{align*}$$</div>


After doing this, we can remove the $f$ from both sides of the equation and get the formula for Wirtinger derivatives:

<div>$$\begin{align*}\frac{\partial }{\partial z}&=\frac{1}{2}\left(\frac{\partial}{\partial x}-i\frac{\partial }{\partial y}\right) \\
\frac{\partial }{\partial \overline{z}}&=\frac{1}{2}\left(\frac{\partial}{\partial x}+i\frac{\partial }{\partial y}\right)
\end{align*}$$</div>

This is usually taken to be the *definition* of a Wirtinger derivative, but I like my definition better! The complex derivative is defined such that $f(z+h)-f(z)$ has a part proportional to $h$, and a part proportional to $\overline{h}:$

$$f(z+h)=f(z)+ah+b\overline{h}+o(h)$$

I came up with this approach after reading Ahlfors' Complex Analysis book, which says early on, referring to Wirtinger derivatives: "these expressions have no convenient definition as limits" and "we present this procedure with an explicit warning to the reader that it is purely formal and does not possess any power of proof." Balderdash! It's just the Jacobian pulled apart into more convenient complex coordinates. 

To emphasize, we have introduced absolutely no new mathematics so far. We've rephrased the definition of the real derivative, we've revisited the definition of the Jacobian, and we've figured out what amounts to a way to write the Jacobian in terms of complex numbers $a$ and $b.$ 

The next part of a complex analysis textbook is to ask what happens if we enforce the condition that $b=0$ everywhere, and *that's* where the meat of complex analysis starts. 

## Appendices <a name="section4"></a>


### Note on big-O notation: <a name="section5"></a>

There is a slight modification we could make. It's really tempting to throw away little-o notation and simply use big-O notation: we're tempted to define the derivative of $f$ at $x$ to be $a$ if 

$$f(x+h)=f(x)+ah+O(h^2).$$

In many cases this definition works fine, but the pathological case 

$$f(x)=|x|^{3/2}\sin(1/x)$$

demonstrates an issue (I consider the singularity at zero removed, so $f(0)=0$). The limit definition of a derivative works fine:

$$\lim_{h\to 0}\frac{|h|^{3/2}\sin(1/h)}{h}=0$$

but our big-O notation definition would require $f(h)=O(h^2),$ which would mean that

$$\textrm{lim sup}_{h\to 0}\frac{|h^{3/2}\sin(1/h)|}{|h^2|} \lt \infty,$$

which is false! 

So our big-O notation definition works most of the time and is a bit more intuitive for physicists, but it is technically slightly different.

### A note on Norms (Topology vs. Geometry) <a name="section6"></a>

There's a confusion that often arises when talking about the Jacobian. When defining the Jacobian, it might feel like we use the definition of a norm in a really essential way, because quantities like 

$$\|{\mathbf h}\|=\sqrt{\sum_{i=1}^d h_i^2}$$

keep showing up in our equations. 

However, an important lesson taught in real analysis and point-set topology books is that for finite dimensional vector spaces, [it doesn't matter what norm we choose](https://math.mit.edu/~stevenj/18.335/norm-equivalence.pdf). For example, a common set of norms are the $L^P$ norms

<div>$$\|{\mathbf h}\|_p=\sqrt[p]{\sum_{i=1}^d h_i^p},$$</div>

and with a bit of work we can show that the following definition of a Jacobian is equivalent to our previous definition:

> **Definition (Jacobian).** Given a multivariable function ${\mathbf f}:\mathbb{R}^n\to\mathbb{R}^m,$ the Jacobian matrix $J$ at $\mathbf x$ is the linear transformation $J:\mathbb{R}^n\to\mathbb{R}^m$ such that:
> 
> $$\lim_{ {\mathbf h} \to {\mathbf 0} } \frac{\| {\mathbf f}({\mathbf x}+{\mathbf h})-{\mathbf f}({\mathbf x})-J{\mathbf h}\|_A}{\|{\mathbf h}\|_B}=0$$

This can cause confusion when studying general relativity or pseudo-Riemannian manifolds, because we have this *other* object for measuring inner products floating around, $g({\mathbf v}_1,{\mathbf v}_2).$ This inner product is totally unrelated to the norm that we use inside the definition of the Jacobian. It's certainly not related to the norm we use when defining limits. 

This is why you'll hear somewhat cryptic comments like, "the Jacobian is defined using the topology of $\mathbb{R}^n,$ not the geometry of our manifold." We get equivalent definitions of the Jacobian for a very wide class of distance functions (which all define the same ***topology***), and so we don't need to know anything about the ***geometry*** of the space we're working in.

I bring this up because a lot of people, when studying special or general relativity, start to worries about hyperbolas in their limit formulas; you absolutely do not have to do this!

### Generalizing the Derivative to Complex Multivariable Calculus <a name="section7"></a>


First, if ${\mathbf f}:\mathbb{C}^n\to\mathbb{C}^m,$ note that when viewed as a real function $\mathbb{R}^{2n}\to\mathbb{R}^{2m},$ our Jacobian matrix has $4nm$ parameters. We'd like to approximate our function as:

<div>$${\mathbf f}(\mathbf z+\mathbf h)={\mathbf f}(\mathbf z)+\sum_{i=1}^n({\mathbf a}_{i} h_i + {\mathbf b}_{i} \overline{h}_i)+o(\mathbf h)$$</div>

where each vector $\mathbf a_i$ has $m$ complex parameters. The collection of all $\mathbf a_i$ for $i=1$ to $n$ gives $nm$ complex parameters. The collection of all $\mathbf a_i$ and $\mathbf b_i$ gives $2nm$ complex parameters, which means we have $4nm$ real parameters. Therefore we again have a one-to-one correspondence with the Jacobian matrix. 

This is nothing new so far, it's just a rephrasing of the Jacobian. If we wanted to start to do multivariable complex analysis, we could start by requiring $\mathbf b_i=\mathbf 0$ everywhere for all $i$. 

### Generalizing to the Functional Derivative <a name="section8"></a>


When studying classical mechanics, we have to study the functional derivative. I first encountered this particular definition in V. I. Arnold's Mathematical Methods of Classical Mechanics. The definition of a functional derivative in chapter 3, section 12, is particularly nice; note that I have transcribed it directly, it's very dense!

> **Definition.** A functional $\Phi$ is called *differentiable* if $\Phi(\gamma+h)-\Phi(\gamma)=F+R,$ where $F$ depends linearly on $h$ (i.e., for a fixed $\gamma,$ $F(h_1+h_2)=F(h_1)+F(h_2)$ and $F(ch)=cF(h)$), and $R(h,\gamma)=O(h^{2})$ in the sense that,
> for $|h|\lt \varepsilon$ and $|dh/dt|\lt \varepsilon,$ we have $|R|\lt C\varepsilon^{2}.$ The linear part of the increment, $F(h),$ is called the *differential*.

Nevermind that I haven't defined a functional, the point I want to get across in motivating the definition is:

 - We have a complicated object $\Phi.$
 - We want to define $\Phi(\gamma+h)\approx \Phi(\gamma)+F[h]+o(h)$ in some sense.
 - The difficult part is finding an appropriate definition of $o(h).$
 - Arnold opts for defining $O(h^2),$ but we could have just as well tried to define $o(h).$ Once this is done the functional derivative definition is complete.
 
A modern pure mathematics approach would certainly use the Frechet derivative, but for physicists it's more than enough to continue doing classical mechanics. 

This topic confused me greatly as an undergraduate, but it underlies a general philosophy about how to invent new derivatives: First write down that something is linear in something else, plus extra stuff which goes to zero quickly enough. Then the hard part is defining what "goes to zero quickly enough" means!




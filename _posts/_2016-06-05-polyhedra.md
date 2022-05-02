---
layout: post
title:  "3D Sculpture with Group Theory"
date:   2016-06-05 12:00:00
tags: pop-math YouTube
---

There exists a glut of mathematical sculpture with very similar visual attributes. What’s up with that and how can you make your own? Have no fear, my newest video explains just that! 

<iframe width="560" height="315" src="https://www.youtube.com/embed/bu57Sxpfsk0" frameborder="0" allowfullscreen></iframe>

The video was part of my attempt to explain why myself and many others find polyhedra so interesting. In my humble opinion, they are interesting intellectually, but not
visually. They don’t grab the eye, and it doesn’t seem like there is that much to them.
There are many other pieces of mathematics that capture the eye of a passerby more 
than polyhedra.

<img src="/img/posts/polyhedra.png">

There are a bunch of different solid shapes here. One is made only of triangles, one only of pentagons. One looks like someone made a mistake and filled in the empty spaces with triangles. Why care about these? Euclid’s Elements, the de facto geometry book of antiquity, proved that there are only five unique solids consisting of regular polygons for faces -- the Platonic solids.

<img src="/img/posts/platonic.png">

That’s a theorem, but believe it or not, some mathematicians don’t care much about theorems. A theorem is an endpoint. Where do you go after you prove “there are only five Platonic solids”? You can start aimlessly counting the number of faces and edges of a dodecahedron -- that’s twelve faces, thirty edges, and twenty vertices. But that’s another fact, another statement, without context or meaning. The things that really make mathematicians excited are the general, open frameworks that create hundreds of questions. One such framework is called [group theory](https://en.wikipedia.org/wiki/Group_theory).

What is Group Theory?
===

A group is defined as any list of “objects” or “actions” that satisfy three, special demands, called the “group axioms”. They are:

 1. You must be able to combine any two actions in the group to get a third action, and this third action must also belong to the group. In the video this is demsontrated by the fact that, after any rotation, the axes of rotation wind up back where they started.
 2. The group must also contain a “do nothing” element. In the video, you can see this by the fact that when I copy shapes,
I leave one copy untouched, right where it started.
 3. Finally, for the groups discussed here -- [finite groups](https://en.wikipedia.org/wiki/Finite_group) -- I demand that if I repeat a given action enough times, I get the “do nothing” action. For example, one action in the video is a rotation by 180 degrees. If I perform this action twice, I accomplish nothing.

If any list of objects or actions satisfy these three demands, it can be called a group. The video explains, using polyhedra as a guide, two fantastic theorems of group theory: the [Orbit-Stabilizer theorem](https://www.artofproblemsolving.com/wiki/index.php?title=Orbit-stabilizer_theorem) and [Lagrange’s theorem](https://en.wikipedia.org/wiki/Lagrange%27s_theorem_(group_theory)). You can look at the video for details.

How does this relate to polyhedra? Well, if you have a given shape, you can ask the question: What actions can I perform that leave the shape unchanged? Take all the actions that leave the shape unchanged, and turn it into a list. It turns out that such a list of actions satisfies all of the requirements above. The list can be called a group, and this is called the symmetry group of an object.

It turns out that there are [only three interesting finite rotation groups in 3D](http://groupprops.subwiki.org/wiki/Classification_of_finite_subgroups_of_SO(3,R)): The symmetry group of the tetrahedron, the symmetry group of the cube, and the symmetry group of the icosahedron.

The icosahedron rotation is the largest, at sixty elements. This explains why so many sculptures exist surrounding it: It's 
the largest and most intricate possible rotational symmetry that any three dimensional object can posess.

Why have I not heard of Group Theory before?
===

If this material is so interesting and intuitive, why is it not taught in high school? Well, group theory forms part of the foundations of one subject known as *abstract algebra*. If you were to go for a college degree in mathematics, two of the toughest subjects you studied would be abstract algebra and real analysis. This makes it quite easy to drop two books on someone’s desk and call it an undergraduate math degree. I’m not being facetious!

The tools used in this level of mathematics are full of formal, technical jargon. What would you do if you were asked to prove, mathematically, beyond a shadow of a doubt, that there is no largest number? A mathematician would write the following.

**Theorem.** There is no largest number.

**Proof.** Suppose to the contrary that $x$ is the largest possible number. Then $y\le x$ for all numbers $y$. But $x+1$ is also a number. These two statements imply that $x+1 \le x$, a contradiction. If assuming that there exists a largest possible number implies a contradiction, it must be that there is no largest number. $\square$

The square denotes the end of a proof. This is some really formal, stuffy writing, but it’s necessary to ensure that your proof covers all possibilities and proves the theorem beyond a shadow of a doubt. Group theory is almost always studied in such language, and this is the entry barrier makes it very difficult to present the concept of group theory.

Fortunately, polyhedra and rotations are an incredibly visual concept, and can be studied without introducing much mathematics at all. That’s why I find them to be a perfect way to introduce group theory. Rest assured, however, studying the concept of a “group” leads directly into an ocean of beautiful mathematics.

For directions on how to make these drawings with Mathematica, click here!


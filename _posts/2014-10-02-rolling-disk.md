---
layout: post
title:  "Rolling Disk Constraint"
date:   2014-10-02 00:00:01 -0800
permalink: /disk/
description: "The disk is described by lateral position $(x,y)$ and Euler angles $(\\theta,\\phi,\\psi)$ (the dynamic variables),\nand constants of radius $r$ and mass per unit area $\\lambda$. The Lagrangian (calculated through Mathematica) is:"
---

The disk is described by lateral position $(x,y)$ and Euler angles $(\theta,\phi,\psi)$ (the dynamic variables),
and constants of radius $r$ and mass per unit area $\lambda$. The Lagrangian (calculated through Mathematica) is:

$$
\begin{aligned}
L&=\frac{1}{16} \pi  \lambda  r^2 \Big(-16 g r \sin (\phi )+r^2
 \Big(8 \dot{\theta}  \dot{\psi}  \cos (\phi )\\
&+\dot{\theta} ^2 (\cos 
(2 \phi )+3)+4 \dot{\psi} ^2+\dot{\phi} ^2 (4 \cos (2 \phi )+6)\Big)\\
&+8 \dot{x}^2+8 \dot{y}^2\Big)
\end{aligned}
$$

With constraints:

$$
\begin{array}{l}
 r \sin (\theta ) d\psi +r d\theta  \sin (\theta ) \cos (\phi )+r \cos (\theta ) d\phi  \sin (\phi )+dx =0\\
 -r \cos (\theta ) d\psi +r \sin (\theta ) d\phi  \sin (\phi )-r d\theta  \cos (\theta ) \cos (\phi )+dy =0\\
\end{array}
$$

See [my stackexchange thread here](http://physics.stackexchange.com/questions/68676/how-to-combine-these-equations-of-constraint)
for more detail.

After we apply the method of undetermined multipliers to eliminate
dependence on x and y, we get the final differential equations:

$$
\begin{array}{l}
 \ddot{\theta}=2 \dot{\psi}  \dot{\phi}  \csc (\phi ) \\

 \ddot{\phi}=-\frac{4 g \cos (\phi )}{5 r}-\frac{1}{5} \dot{\theta}  \sin (\phi ) (5 \dot{\theta}  \cos (\phi )+6 \dot{\psi} ) \\
 \ddot{\psi}= \dot{\phi}  \left(\frac{5}{3} \dot{\theta}  \sin (\phi )-2 \dot{\psi}  \cot (\phi )\right) \\
\end{array}
$$

Here you can see the numerical solution animated:

<div id="drawdiv"></div>

<script src="{{ site.baseurl }}/src/three.min.js"></script>
<script src="{{ site.baseurl }}/src/TrackballControls.js"></script>
<script src="{{ site.baseurl }}/src/disk.js"></script>




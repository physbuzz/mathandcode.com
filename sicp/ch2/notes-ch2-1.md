---
layout: sicp
render_with_liquid: false
title: SICP Chapter 2.1
---

<div class="nav">
    <span class="activenav"><a href="../ch1/notes-ch1-3.html">← Previous</a></span>
    <span class="activenav"><a href="../index.html">↑ Up</a></span>
    <span class="activenav"><a href="notes-ch2-2.html">Next →</a></span>
</div>


[HTML Book Chapter 2.1 Link](https://sarabander.github.io/sicp/html/2_002e1.xhtml#g_t2_002e1)

## Directory
- [Section 2.1](#section-21)
  - [Introduction](#introduction)
  - [Meeting 03-30-2025](#meeting-03-30-2025)
  - [Exercises](#exercises)
    - *Exercises:* ([Exercise 2.1](#exercise-21), [Exercise 2.2](#exercise-22), [Exercise 2.3](#exercise-23), [Exercise 2.4](#exercise-24), [Exercise 2.5](#exercise-25), [Exercise 2.6](#exercise-26), [Exercise 2.7](#exercise-27), [Exercise 2.8](#exercise-28), [Exercise 2.9](#exercise-29), [Exercise 2.10](#exercise-210), [Exercise 2.11](#exercise-211), [Exercise 2.12](#exercise-212), [Exercise 2.13](#exercise-213), [Exercise 2.14](#exercise-214), [Exercise 2.15](#exercise-215), [Exercise 2.16](#exercise-216))

## Section 2.1


### Introduction

### Meeting 03-30-2025
- Hindley–Milner  style types.
- LISPs implement memory safety during runtime
- Type safety isn't just about  [...]?
- Runtime issue: generalized form of the halting problem; 
- Halting problem: https://en.wikipedia.org/wiki/Rice%27s_theorem and https://en.wikipedia.org/wiki/Rice%E2%80%93Shapiro_theorem -- relevant if we ask what static things we can say about a program (without running it)
- Rust is guaranteed to not have false negatives about memory safety [?]
- Type safety 
- https://nature-of-computation.org/ -- https://en.wikipedia.org/wiki/Christos_Papadimitriou has some interesting has some interesting, approachable books. 
- https://hbpms.blogspot.com/
- https://hackernewsbooks.com/
- https://people.eecs.berkeley.edu/~bh/sicp.html

### Exercises 

#### Exercise 2.1

Define a better version of
`make-rat` that handles both positive and negative arguments.
`Make-rat` should normalize the sign so that if the rational number is
positive, both the numerator and denominator are positive, and if the rational
number is negative, only the numerator is negative.

##### Solution

<div class="code-box" markdown="1">
<div class="code-header"><a href="code/ex2-1.rkt">code/ex2-1.rkt</a></div>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-rat</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="n">d</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">&lt;</span><span class="w"> </span><span class="n">d</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">make-rat</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">n</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">d</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">g</span><span class="w"> </span><span class="p">(</span><span class="nb">gcd</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="n">d</span><span class="p">)))</span>
<span class="w">      </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="p">(</span><span class="nb">/</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="n">g</span><span class="p">)</span><span class="w"> </span>
<span class="w">            </span><span class="p">(</span><span class="nb">/</span><span class="w"> </span><span class="n">d</span><span class="w"> </span><span class="n">g</span><span class="p">)))))</span>

<span class="p">(</span><span class="n">make-rat</span><span class="w"> </span><span class="mi">10</span><span class="w"> </span><span class="mi">15</span><span class="p">)</span>
<span class="p">(</span><span class="n">make-rat</span><span class="w"> </span><span class="mi">10</span><span class="w"> </span><span class="mi">-15</span><span class="p">)</span>
<span class="p">(</span><span class="n">make-rat</span><span class="w"> </span><span class="mi">-10</span><span class="w"> </span><span class="mi">15</span><span class="p">)</span>
<span class="p">(</span><span class="n">make-rat</span><span class="w"> </span><span class="mi">-10</span><span class="w"> </span><span class="mi">-15</span><span class="p">)</span>
</pre></div>
<div class="code-output">
<span>Output:</span>
<pre>(2 . 3)
(-2 . 3)
(-2 . 3)
(2 . 3)
</pre>
</div>
</div>


#### Exercise 2.2

Consider the problem of
representing line segments in a plane.  Each segment is represented as a pair
of points: a starting point and an ending point.  Define a constructor
`make-segment` and selectors `start-segment` and `end-segment`
that define the representation of segments in terms of points.  Furthermore, a
point can be represented as a pair of numbers: the $x$ coordinate and the
$y$ coordinate.  Accordingly, specify a constructor `make-point` and
selectors `x-point` and `y-point` that define this representation.
Finally, using your selectors and constructors, define a procedure
`midpoint-segment` that takes a line segment as argument and returns its
midpoint (the point whose coordinates are the average of the coordinates of the
endpoints).  To try your procedures, you'll need a way to print points:

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">print-point</span><span class="w"> </span><span class="n">p</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;(&quot;</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="p">(</span><span class="n">x-point</span><span class="w"> </span><span class="n">p</span><span class="p">))</span>
<span class="w">  </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;,&quot;</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="p">(</span><span class="n">y-point</span><span class="w"> </span><span class="n">p</span><span class="p">))</span>
<span class="w">  </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;)&quot;</span><span class="p">))</span>
</pre></div>

##### Solution

<div class="code-box" markdown="1">
<div class="code-header"><a href="code/ex2-2.rkt">code/ex2-2.rkt</a></div>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">print-point</span><span class="w"> </span><span class="n">p</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;(&quot;</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="p">(</span><span class="n">x-point</span><span class="w"> </span><span class="n">p</span><span class="p">))</span>
<span class="w">  </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;,&quot;</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="p">(</span><span class="n">y-point</span><span class="w"> </span><span class="n">p</span><span class="p">))</span>
<span class="w">  </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;)&quot;</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-segment</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">start-segment</span><span class="w"> </span><span class="n">seg</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">seg</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">end-segment</span><span class="w"> </span><span class="n">seg</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">seg</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-point</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">y</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">y</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">x-point</span><span class="w"> </span><span class="n">pt</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">pt</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">y-point</span><span class="w"> </span><span class="n">pt</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">pt</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">midpoint-segment</span><span class="w"> </span><span class="n">seg</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">x1</span><span class="w"> </span><span class="p">(</span><span class="n">x-point</span><span class="w"> </span><span class="p">(</span><span class="n">start-segment</span><span class="w"> </span><span class="n">seg</span><span class="p">)))</span>
<span class="w">        </span><span class="p">(</span><span class="n">y1</span><span class="w"> </span><span class="p">(</span><span class="n">y-point</span><span class="w"> </span><span class="p">(</span><span class="n">start-segment</span><span class="w"> </span><span class="n">seg</span><span class="p">)))</span>
<span class="w">        </span><span class="p">(</span><span class="n">x2</span><span class="w"> </span><span class="p">(</span><span class="n">x-point</span><span class="w"> </span><span class="p">(</span><span class="n">end-segment</span><span class="w"> </span><span class="n">seg</span><span class="p">)))</span>
<span class="w">        </span><span class="p">(</span><span class="n">y2</span><span class="w"> </span><span class="p">(</span><span class="n">y-point</span><span class="w"> </span><span class="p">(</span><span class="n">end-segment</span><span class="w"> </span><span class="n">seg</span><span class="p">))))</span>
<span class="w">        </span><span class="p">(</span><span class="n">make-point</span><span class="w"> </span><span class="p">(</span><span class="nb">/</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">x1</span><span class="w"> </span><span class="n">x2</span><span class="p">)</span><span class="w"> </span><span class="mi">2</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">/</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">y1</span><span class="w"> </span><span class="n">y2</span><span class="p">)</span><span class="w"> </span><span class="mi">2</span><span class="p">))))</span>

<span class="p">(</span><span class="n">print-point</span><span class="w"> </span><span class="p">(</span><span class="n">midpoint-segment</span><span class="w"> </span><span class="p">(</span><span class="n">make-segment</span><span class="w"> </span>
<span class="w">                                  </span><span class="p">(</span><span class="n">make-point</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span><span class="w"> </span>
<span class="w">                                  </span><span class="p">(</span><span class="n">make-point</span><span class="w"> </span><span class="mi">3</span><span class="w"> </span><span class="mi">3</span><span class="p">))))</span>
</pre></div>
<div class="code-output">
<span>Output:</span>
<pre>
(3/2,3/2)</pre>
</div>
</div>


#### Exercise 2.3

Implement a representation for
rectangles in a plane.  (Hint: You may want to make use of Exercise 2.2.)
In terms of your constructors and selectors, create procedures that compute the
perimeter and the area of a given rectangle.  Now implement a different
representation for rectangles.  Can you design your system with suitable
abstraction barriers, so that the same perimeter and area procedures will work
using either representation?

##### Solution

Super tedious! I guess this is the 1980's version of "implement these getter functions" -.-

I was tempted to implement a programmatic way to switch between rect1 or rect2 based on a flag passed in, but I think that's overengineering the problem.

<div class="code-box" markdown="1">
<div class="code-header"><a href="code/ex2-3.rkt">code/ex2-3.rkt</a></div>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-point</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">y</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">y</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">x-point</span><span class="w"> </span><span class="n">pt</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">pt</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">y-point</span><span class="w"> </span><span class="n">pt</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">pt</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">print-point</span><span class="w"> </span><span class="n">p</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;(&quot;</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="p">(</span><span class="n">x-point</span><span class="w"> </span><span class="n">p</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;,&quot;</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="p">(</span><span class="n">y-point</span><span class="w"> </span><span class="n">p</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;)&quot;</span><span class="p">))</span>

<span class="c1">;; One representation</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-rect1</span><span class="w"> </span><span class="n">pos</span><span class="w"> </span><span class="n">widthheight</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">pos</span><span class="w"> </span><span class="n">widthheight</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">rect-width1</span><span class="w"> </span><span class="n">rect</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">x-point</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">rect</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">rect-height1</span><span class="w"> </span><span class="n">rect</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">y-point</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">rect</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">rect-perimeter1</span><span class="w"> </span><span class="n">rect</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="p">(</span><span class="n">rect-width1</span><span class="w"> </span><span class="n">rect</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">rect-height1</span><span class="w"> </span><span class="n">rect</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">rect-area1</span><span class="w"> </span><span class="n">rect</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="p">(</span><span class="n">rect-width1</span><span class="w"> </span><span class="n">rect</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">rect-height1</span><span class="w"> </span><span class="n">rect</span><span class="p">)))</span>
<span class="w">    </span>
<span class="c1">;;Second representation using &quot;top-left&quot; and &quot;bottom-right&quot;</span>
<span class="c1">;;constraint: tl.x&lt;br.x, tl.y&lt;br.y</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-rect2</span><span class="w"> </span><span class="n">tl</span><span class="w"> </span><span class="n">br</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">tl</span><span class="w"> </span><span class="n">br</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">rect-width2</span><span class="w"> </span><span class="n">rect</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="p">(</span><span class="n">x-point</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">rect</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="n">x-point</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">rect</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">rect-height2</span><span class="w"> </span><span class="n">rect</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="p">(</span><span class="n">y-point</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">rect</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="n">y-point</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">rect</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">rect-perimeter2</span><span class="w"> </span><span class="n">rect</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="p">(</span><span class="n">rect-width2</span><span class="w"> </span><span class="n">rect</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">rect-height2</span><span class="w"> </span><span class="n">rect</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">rect-area2</span><span class="w"> </span><span class="n">rect</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="p">(</span><span class="n">rect-width2</span><span class="w"> </span><span class="n">rect</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">rect-height2</span><span class="w"> </span><span class="n">rect</span><span class="p">)))</span>

<span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;Representation 1 (perimeter, height):&quot;</span><span class="p">)</span>
<span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">r1</span><span class="w"> </span><span class="p">(</span><span class="n">make-rect1</span><span class="w"> </span><span class="p">(</span><span class="n">make-point</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">make-point</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="mi">2</span><span class="p">))))</span>
<span class="w">  </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="p">(</span><span class="n">rect-perimeter1</span><span class="w"> </span><span class="n">r1</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;, &quot;</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="p">(</span><span class="n">rect-area1</span><span class="w"> </span><span class="n">r1</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">))</span>

<span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;Representation 2 (perimeter, height):&quot;</span><span class="p">)</span>
<span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">r2</span><span class="w"> </span><span class="p">(</span><span class="n">make-rect2</span><span class="w"> </span><span class="p">(</span><span class="n">make-point</span><span class="w"> </span><span class="mi">-1</span><span class="w"> </span><span class="mi">-1</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">make-point</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">1</span><span class="p">))))</span>
<span class="w">  </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="p">(</span><span class="n">rect-perimeter2</span><span class="w"> </span><span class="n">r2</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;, &quot;</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="p">(</span><span class="n">rect-area2</span><span class="w"> </span><span class="n">r2</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">))</span>
</pre></div>
<div class="code-output">
<span>Output:</span>
<pre>Representation 1 (perimeter, height):
8, 4
Representation 2 (perimeter, height):
8, 4
</pre>
</div>
</div>


#### Exercise 2.4

Here is an alternative procedural
representation of pairs.  For this representation, verify that `(car (cons
x y))` yields `x` for any objects `x` and `y`.

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">y</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">m</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">m</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">y</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">z</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="n">z</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">p</span><span class="w"> </span><span class="n">q</span><span class="p">)</span><span class="w"> </span><span class="n">p</span><span class="p">)))</span>
</pre></div>

What is the corresponding definition of `cdr`? (Hint: To verify that this
works, make use of the substitution model of 1.1.5.)

##### Solution

First, let's check how car works:
<div class="codehilite"><pre><span></span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">y</span><span class="p">))</span>
<span class="p">((</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">m</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">m</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">y</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">p</span><span class="w"> </span><span class="n">q</span><span class="p">)</span><span class="w"> </span><span class="n">p</span><span class="p">))</span>
<span class="p">((</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">p</span><span class="w"> </span><span class="n">q</span><span class="p">)</span><span class="w"> </span><span class="n">p</span><span class="p">)</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">y</span><span class="p">)</span><span class="w"> </span>
<span class="n">x</span>
</pre></div>
So the corresponding definition of `cdr` will just have `(lambda (p q) q)` instead.

<div class="code-box" markdown="1">
<div class="code-header"><a href="code/ex2-4.rkt">code/ex2-4.rkt</a></div>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">y</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">m</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">m</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">y</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">z</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">z</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">p</span><span class="w"> </span><span class="n">q</span><span class="p">)</span><span class="w"> </span><span class="n">p</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">z</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">z</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">p</span><span class="w"> </span><span class="n">q</span><span class="p">)</span><span class="w"> </span><span class="n">q</span><span class="p">)))</span>
<span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">arg</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">2</span><span class="p">)))</span>
<span class="w">  </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">arg</span><span class="p">))</span>
<span class="w">  </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">arg</span><span class="p">)))</span>
</pre></div>
<div class="code-output">
<span>Output:</span>
<pre>1
2</pre>
</div>
</div>


#### Exercise 2.5

Show that we can represent pairs of
nonnegative integers using only numbers and arithmetic operations if we
represent the pair $a$ and $b$ as the integer that is the product ${2^a 3^b}$.
Give the corresponding definitions of the procedures `cons`,
`car`, and `cdr`.

##### Solution

<div class="code-box" markdown="1">
<div class="code-header"><a href="code/ex2-5.rkt">code/ex2-5.rkt</a></div>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">pow</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="n">m</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">&lt;</span><span class="w"> </span><span class="n">m</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="p">(</span><span class="n">pow</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">m</span><span class="w"> </span><span class="mi">1</span><span class="p">)))))</span>

<span class="c1">;; Find how many powers of two the number has</span>
<span class="c1">;; Might be fun to optimize once I know more scheme.</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">npowers</span><span class="w"> </span><span class="n">base</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">npowers-iter</span><span class="w"> </span><span class="n">product</span><span class="w"> </span><span class="n">k</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="p">(</span><span class="nb">gcd</span><span class="w"> </span><span class="n">product</span><span class="w"> </span><span class="n">n</span><span class="p">)</span><span class="w"> </span><span class="n">product</span><span class="p">)</span><span class="w"> </span>
<span class="w">      </span><span class="p">(</span><span class="n">npowers-iter</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">product</span><span class="w"> </span><span class="n">base</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">k</span><span class="w"> </span><span class="mi">1</span><span class="p">))</span>
<span class="w">      </span><span class="n">k</span><span class="p">))</span>
<span class="w">  </span><span class="p">(</span><span class="n">npowers-iter</span><span class="w"> </span><span class="n">base</span><span class="w"> </span><span class="mi">0</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="p">(</span><span class="n">pow</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="n">a</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">pow</span><span class="w"> </span><span class="mi">3</span><span class="w"> </span><span class="n">b</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">z</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">npowers</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="n">z</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">z</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">npowers</span><span class="w"> </span><span class="mi">3</span><span class="w"> </span><span class="n">z</span><span class="p">))</span>

<span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">arg</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="mi">10</span><span class="w"> </span><span class="mi">13</span><span class="p">)))</span>
<span class="w">  </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;2^a 3^b is: &quot;</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="n">arg</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;a is: &quot;</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">arg</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;b is: &quot;</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">arg</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">))</span>
</pre></div>
<div class="code-output">
<span>Output:</span>
<pre>2^a 3^b is: 1632586752
a is: 10
b is: 13
</pre>
</div>
</div>

#### Exercise 2.6

In case representing pairs as
procedures wasn't mind-boggling enough, consider that, in a language that can
manipulate procedures, we can get by without numbers (at least insofar as
nonnegative integers are concerned) by implementing 0 and the operation of
adding 1 as

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">zero</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">f</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="n">x</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">add-1</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">f</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">f</span><span class="w"> </span><span class="p">((</span><span class="n">n</span><span class="w"> </span><span class="n">f</span><span class="p">)</span><span class="w"> </span><span class="n">x</span><span class="p">)))))</span>
</pre></div>

This representation is known as Church numerals, after its inventor,
Alonzo Church, the logician who invented the λ-calculus.

Define `one` and `two` directly (not in terms of `zero` and
`add-1`).  (Hint: Use substitution to evaluate `(add-1 zero)`).  Give
a direct definition of the addition procedure `+` (not in terms of
repeated application of `add-1`).

##### Solution

How topical! The video ["What is PLUS times PLUS?"](https://www.youtube.com/watch?v=RcVA8Nj6HEo) just came out.

**1:**

<div class="codehilite"><pre><span></span><span class="c1">;; (define zero (lambda (f) (lambda (x) x)))</span>
<span class="c1">;; (define (add-1 n) (lambda (f) (lambda (x) (f ((n f) x)))))</span>
<span class="p">(</span><span class="n">add-1</span><span class="w"> </span><span class="n">zero</span><span class="p">)</span>
<span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">f</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">f</span><span class="w"> </span><span class="p">(((</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">g</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">y</span><span class="p">)</span><span class="w"> </span><span class="n">y</span><span class="p">))</span><span class="w"> </span><span class="n">f</span><span class="p">)</span><span class="w"> </span><span class="n">x</span><span class="p">))))</span>
<span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">f</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">f</span><span class="w"> </span><span class="p">((</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">y</span><span class="p">)</span><span class="w"> </span><span class="n">y</span><span class="p">)</span><span class="w"> </span><span class="n">x</span><span class="p">))))</span>
<span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">f</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">f</span><span class="w"> </span><span class="n">x</span><span class="p">)))</span>
</pre></div>

**2:**

<div class="codehilite"><pre><span></span><span class="c1">;; (define one (lambda (f) (lambda (x) (f x))))</span>
<span class="c1">;; (define (add-1 n) (lambda (f) (lambda (x) (f ((n f) x)))))</span>
<span class="p">(</span><span class="n">add-1</span><span class="w"> </span><span class="n">one</span><span class="p">)</span>
<span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">f</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">f</span><span class="w"> </span><span class="p">(((</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">g</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">y</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">g</span><span class="w"> </span><span class="n">y</span><span class="p">)))</span><span class="w"> </span><span class="n">f</span><span class="p">)</span><span class="w"> </span><span class="n">x</span><span class="p">))))</span>
<span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">f</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">f</span><span class="w"> </span><span class="p">((</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">y</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">f</span><span class="w"> </span><span class="n">y</span><span class="p">))</span><span class="w"> </span><span class="n">x</span><span class="p">))))</span>
<span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">f</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">f</span><span class="w"> </span><span class="p">(</span><span class="n">f</span><span class="w"> </span><span class="n">x</span><span class="p">))))</span>
</pre></div>

**addition:**
<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">church-add</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">f</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">((</span><span class="n">a</span><span class="w"> </span><span class="n">f</span><span class="p">)</span><span class="w"> </span><span class="p">((</span><span class="n">b</span><span class="w"> </span><span class="n">f</span><span class="p">)</span><span class="w"> </span><span class="n">x</span><span class="p">)))))</span>
</pre></div>

**Testing:** Yooo it works first try, nice.

To future-me/future-readers: the idea behind `church-add` is to first unwrap `a` and `b` so that they're simple functions that apply `f` some number of times, then apply both to `x`. 

<div class="code-box" markdown="1">
<div class="code-header"><a href="code/ex2-6.rkt">code/ex2-6.rkt</a></div>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">zero</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">f</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="n">x</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">add-1</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">f</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">f</span><span class="w"> </span><span class="p">((</span><span class="n">n</span><span class="w"> </span><span class="n">f</span><span class="p">)</span><span class="w"> </span><span class="n">x</span><span class="p">)))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">one</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">f</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">f</span><span class="w"> </span><span class="n">x</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">two</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">f</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">f</span><span class="w"> </span><span class="p">(</span><span class="n">f</span><span class="w"> </span><span class="n">x</span><span class="p">)))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">church-add</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">f</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">((</span><span class="n">a</span><span class="w"> </span><span class="n">f</span><span class="p">)</span><span class="w"> </span><span class="p">((</span><span class="n">b</span><span class="w"> </span><span class="n">f</span><span class="p">)</span><span class="w"> </span><span class="n">x</span><span class="p">)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">inc</span><span class="w"> </span><span class="n">a</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="mi">1</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">church-convert</span><span class="w"> </span><span class="n">a</span><span class="p">)</span><span class="w"> </span><span class="p">((</span><span class="n">a</span><span class="w"> </span><span class="n">inc</span><span class="p">)</span><span class="w"> </span><span class="mi">0</span><span class="p">))</span>
<span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;zero = &quot;</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="p">(</span><span class="n">church-convert</span><span class="w"> </span><span class="n">zero</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;one = &quot;</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="p">(</span><span class="n">church-convert</span><span class="w"> </span><span class="n">one</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;two = &quot;</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="p">(</span><span class="n">church-convert</span><span class="w"> </span><span class="n">two</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;one + zero = &quot;</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="p">(</span><span class="n">church-convert</span><span class="w"> </span><span class="p">(</span><span class="n">church-add</span><span class="w"> </span><span class="n">one</span><span class="w"> </span><span class="n">zero</span><span class="p">)))</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;one + one = &quot;</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="p">(</span><span class="n">church-convert</span><span class="w"> </span><span class="p">(</span><span class="n">church-add</span><span class="w"> </span><span class="n">one</span><span class="w"> </span><span class="n">one</span><span class="p">)))</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;one + two = &quot;</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="p">(</span><span class="n">church-convert</span><span class="w"> </span><span class="p">(</span><span class="n">church-add</span><span class="w"> </span><span class="n">one</span><span class="w"> </span><span class="n">two</span><span class="p">)))</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;two + two = &quot;</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="p">(</span><span class="n">church-convert</span><span class="w"> </span><span class="p">(</span><span class="n">church-add</span><span class="w"> </span><span class="n">two</span><span class="w"> </span><span class="n">two</span><span class="p">)))</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
</pre></div>
<div class="code-output">
<span>Output:</span>
<pre>zero = 0
one = 1
two = 2
one + zero = 1
one + one = 2
one + two = 3
two + two = 4
</pre>
</div>
</div>


#### Exercise 2.7

Alyssa's program is incomplete
because she has not specified the implementation of the interval abstraction.
Here is a definition of the interval constructor:

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-interval</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="p">))</span>
</pre></div>

Define selectors `upper-bound` and `lower-bound` to complete the
implementation.

##### Solution
<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-interval</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">lower-bound</span><span class="w"> </span><span class="n">int</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">int</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">upper-bound</span><span class="w"> </span><span class="n">int</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">int</span><span class="p">))</span>
</pre></div>

#### Exercise 2.8

Using reasoning analogous to
Alyssa's, describe how the difference of two intervals may be computed.  Define
a corresponding subtraction procedure, called `sub-interval`.

##### Solution

Write our two intervals as $A$ and $B$. The lower bound should be
<div>$$\mathrm{inf}_{x\in A, y\in B}(x-y)=A_{\textrm{min}}-B_{\textrm{max}}$$</div>
The upper bound should be
<div>$$\mathrm{sup}_{x\in A, y\in B}(x-y)=A_{\textrm{max}}-B_{\textrm{min}}$$</div>

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">sub-interval</span><span class="w"> </span><span class="n">A</span><span class="w"> </span><span class="n">B</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">make-interval</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="p">(</span><span class="n">lower-bound</span><span class="w"> </span><span class="n">A</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">upper-bound</span><span class="w"> </span><span class="n">B</span><span class="p">))</span><span class="w"> </span>
<span class="w">                 </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="p">(</span><span class="n">upper-bound</span><span class="w"> </span><span class="n">A</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">lower-bound</span><span class="w"> </span><span class="n">B</span><span class="p">))))</span>
</pre></div>

#### Exercise 2.9

The width of an interval
is half of the difference between its upper and lower bounds.  The width is a
measure of the uncertainty of the number specified by the interval.  For some
arithmetic operations the width of the result of combining two intervals is a
function only of the widths of the argument intervals, whereas for others the
width of the combination is not a function of the widths of the argument
intervals.  Show that the width of the sum (or difference) of two intervals is
a function only of the widths of the intervals being added (or subtracted).
Give examples to show that this is not true for multiplication or division.

##### Solution

**Addition:**
<div>$$\begin{align*}
\textrm{Width}_{A+B} &=
\mathrm{sup}_{x\in A, y\in B}(x+y)-\mathrm{inf}_{x\in A, y\in B}(x+y)\\
&=A_{\textrm{max}}+B_{\textrm{max}} - (A_{\textrm{min}}+B_{\textrm{min}})\\
&=\textrm{Width}_A+\textrm{Width}_B
\end{align*}$$</div>

**Subtraction:**
<div>$$\begin{align*}
\textrm{Width}_{A-B} &=
\mathrm{sup}_{x\in A, y\in B}(x-y)-\mathrm{inf}_{x\in A, y\in B}(x-y)\\
&=A_{\textrm{max}}-B_{\textrm{min}} - (A_{\textrm{min}}-B_{\textrm{max}})\\
&=\textrm{Width}_A+\textrm{Width}_B
\end{align*}$$</div>

**Counterexamples:**
<div class="code-box" markdown="1">
<div class="code-header"><a href="code/ex2-9.rkt">code/ex2-9.rkt</a></div>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-interval</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">lower-bound</span><span class="w"> </span><span class="n">int</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">int</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">upper-bound</span><span class="w"> </span><span class="n">int</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">int</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">add-interval</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">y</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">make-interval</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="p">(</span><span class="n">lower-bound</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">lower-bound</span><span class="w"> </span><span class="n">y</span><span class="p">))</span>
<span class="w">                 </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="p">(</span><span class="n">upper-bound</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">upper-bound</span><span class="w"> </span><span class="n">y</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">sub-interval</span><span class="w"> </span><span class="n">A</span><span class="w"> </span><span class="n">B</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">make-interval</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="p">(</span><span class="n">lower-bound</span><span class="w"> </span><span class="n">A</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">upper-bound</span><span class="w"> </span><span class="n">B</span><span class="p">))</span>
<span class="w">                 </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="p">(</span><span class="n">upper-bound</span><span class="w"> </span><span class="n">A</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">lower-bound</span><span class="w"> </span><span class="n">B</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">mul-interval</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">y</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">p1</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="p">(</span><span class="n">lower-bound</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">               </span><span class="p">(</span><span class="n">lower-bound</span><span class="w"> </span><span class="n">y</span><span class="p">)))</span>
<span class="w">        </span><span class="p">(</span><span class="n">p2</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="p">(</span><span class="n">lower-bound</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">               </span><span class="p">(</span><span class="n">upper-bound</span><span class="w"> </span><span class="n">y</span><span class="p">)))</span>
<span class="w">        </span><span class="p">(</span><span class="n">p3</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="p">(</span><span class="n">upper-bound</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">               </span><span class="p">(</span><span class="n">lower-bound</span><span class="w"> </span><span class="n">y</span><span class="p">)))</span>
<span class="w">        </span><span class="p">(</span><span class="n">p4</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="p">(</span><span class="n">upper-bound</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">               </span><span class="p">(</span><span class="n">upper-bound</span><span class="w"> </span><span class="n">y</span><span class="p">))))</span>
<span class="w">    </span><span class="p">(</span><span class="n">make-interval</span><span class="w"> </span><span class="p">(</span><span class="nb">min</span><span class="w"> </span><span class="n">p1</span><span class="w"> </span><span class="n">p2</span><span class="w"> </span><span class="n">p3</span><span class="w"> </span><span class="n">p4</span><span class="p">)</span>
<span class="w">                   </span><span class="p">(</span><span class="nb">max</span><span class="w"> </span><span class="n">p1</span><span class="w"> </span><span class="n">p2</span><span class="w"> </span><span class="n">p3</span><span class="w"> </span><span class="n">p4</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">div-interval</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">y</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">mul-interval</span><span class="w"> </span><span class="n">x</span><span class="w"> </span>
<span class="w">                </span><span class="p">(</span><span class="n">make-interval</span><span class="w"> </span>
<span class="w">                 </span><span class="p">(</span><span class="nb">/</span><span class="w"> </span><span class="mf">1.0</span><span class="w"> </span><span class="p">(</span><span class="n">upper-bound</span><span class="w"> </span><span class="n">y</span><span class="p">))</span><span class="w"> </span>
<span class="w">                 </span><span class="p">(</span><span class="nb">/</span><span class="w"> </span><span class="mf">1.0</span><span class="w"> </span><span class="p">(</span><span class="n">lower-bound</span><span class="w"> </span><span class="n">y</span><span class="p">)))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">width-interval</span><span class="w"> </span><span class="n">int</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="p">(</span><span class="n">upper-bound</span><span class="w"> </span><span class="n">int</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">lower-bound</span><span class="w"> </span><span class="n">int</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">disp-interval</span><span class="w"> </span><span class="n">int</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;[&quot;</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="p">(</span><span class="n">lower-bound</span><span class="w"> </span><span class="n">int</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;, &quot;</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="p">(</span><span class="n">upper-bound</span><span class="w"> </span><span class="n">int</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;]&quot;</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">disp-interval-op</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="w"> </span><span class="n">c</span><span class="w"> </span><span class="n">d</span><span class="w"> </span><span class="n">func</span><span class="w"> </span><span class="n">character</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">i1</span><span class="w"> </span><span class="p">(</span><span class="n">make-interval</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="n">i2</span><span class="w"> </span><span class="p">(</span><span class="n">make-interval</span><span class="w"> </span><span class="n">c</span><span class="w"> </span><span class="n">d</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">disp-interval</span><span class="w"> </span><span class="n">i1</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="n">character</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">disp-interval</span><span class="w"> </span><span class="n">i2</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot; = &quot;</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">disp-interval</span><span class="w"> </span><span class="p">(</span><span class="n">func</span><span class="w"> </span><span class="n">i1</span><span class="w"> </span><span class="n">i2</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">)))</span>

<span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;Multiplication of two width 2 intervals result in a width 3 interval:&quot;</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="p">(</span><span class="n">disp-interval-op</span><span class="w"> </span><span class="mf">-0.5</span><span class="w"> </span><span class="mf">1.5</span><span class="w"> </span><span class="mf">-1.5</span><span class="w"> </span><span class="mf">0.5</span><span class="w"> </span><span class="n">mul-interval</span><span class="w"> </span><span class="s2">&quot; * &quot;</span><span class="p">)</span>

<span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;Multiplication of two width 2 intervals result in a width 4 interval:&quot;</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="p">(</span><span class="n">disp-interval-op</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="n">mul-interval</span><span class="w"> </span><span class="s2">&quot; * &quot;</span><span class="p">)</span>

<span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;Division of two width 1 intervals creates a tiny interval:&quot;</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="p">(</span><span class="n">disp-interval-op</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="mi">3</span><span class="w"> </span><span class="mi">10</span><span class="w"> </span><span class="mi">11</span><span class="w"> </span><span class="n">div-interval</span><span class="w"> </span><span class="s2">&quot; / &quot;</span><span class="p">)</span>

<span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;Division of two width 1 intervals creates a huge interval:&quot;</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="p">(</span><span class="n">disp-interval-op</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="mi">3</span><span class="w"> </span><span class="mf">0.1</span><span class="w"> </span><span class="mf">1.1</span><span class="w"> </span><span class="n">div-interval</span><span class="w"> </span><span class="s2">&quot; / &quot;</span><span class="p">)</span>
</pre></div>
<div class="code-output">
<span>Output:</span>
<pre>Multiplication of two width 2 intervals result in a width 3 interval:
[-0.5, 1.5] * [-1.5, 0.5] = [-2.25, 0.75]
Multiplication of two width 2 intervals result in a width 4 interval:
[0, 2] * [0, 2] = [0, 4]
Division of two width 1 intervals creates a tiny interval:
[2, 3] / [10, 11] = [0.18181818181818182, 0.30000000000000004]
Division of two width 1 intervals creates a huge interval:
[2, 3] / [0.1, 1.1] = [1.8181818181818181, 30.0]
</pre>
</div>
</div>


#### Exercise 2.10

Ben Bitdiddle, an expert systems
programmer, looks over Alyssa's shoulder and comments that it is not clear what
it means to divide by an interval that spans zero.  Modify Alyssa's code to
check for this condition and to signal an error if it occurs.

##### Solution

<div class="code-box" markdown="1">
<div class="code-header"><a href="code/ex2-10.rkt">code/ex2-10.rkt</a></div>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-interval</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">lower-bound</span><span class="w"> </span><span class="n">int</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">int</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">upper-bound</span><span class="w"> </span><span class="n">int</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">int</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">mul-interval</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">y</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">p1</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="p">(</span><span class="n">lower-bound</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">lower-bound</span><span class="w"> </span><span class="n">y</span><span class="p">)))</span><span class="w"> </span>
<span class="w">        </span><span class="p">(</span><span class="n">p2</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="p">(</span><span class="n">lower-bound</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">upper-bound</span><span class="w"> </span><span class="n">y</span><span class="p">)))</span>
<span class="w">        </span><span class="p">(</span><span class="n">p3</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="p">(</span><span class="n">upper-bound</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">lower-bound</span><span class="w"> </span><span class="n">y</span><span class="p">)))</span><span class="w"> </span>
<span class="w">        </span><span class="p">(</span><span class="n">p4</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="p">(</span><span class="n">upper-bound</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">upper-bound</span><span class="w"> </span><span class="n">y</span><span class="p">))))</span>
<span class="w">    </span><span class="p">(</span><span class="n">make-interval</span><span class="w"> </span><span class="p">(</span><span class="nb">min</span><span class="w"> </span><span class="n">p1</span><span class="w"> </span><span class="n">p2</span><span class="w"> </span><span class="n">p3</span><span class="w"> </span><span class="n">p4</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">max</span><span class="w"> </span><span class="n">p1</span><span class="w"> </span><span class="n">p2</span><span class="w"> </span><span class="n">p3</span><span class="w"> </span><span class="n">p4</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">contains?</span><span class="w"> </span><span class="n">interval</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">&lt;=</span><span class="w"> </span><span class="p">(</span><span class="n">lower-bound</span><span class="w"> </span><span class="n">interval</span><span class="p">)</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">&lt;=</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="p">(</span><span class="n">upper-bound</span><span class="w"> </span><span class="n">interval</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">div-interval</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">y</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="n">contains?</span><span class="w"> </span><span class="n">y</span><span class="w"> </span><span class="mi">0</span><span class="p">))</span>
<span class="w">      </span><span class="p">(</span><span class="n">mul-interval</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="p">(</span><span class="n">make-interval</span><span class="w"> </span><span class="p">(</span><span class="nb">/</span><span class="w"> </span><span class="mf">1.0</span><span class="w"> </span><span class="p">(</span><span class="n">upper-bound</span><span class="w"> </span><span class="n">y</span><span class="p">))</span>
<span class="w">                                     </span><span class="p">(</span><span class="nb">/</span><span class="w"> </span><span class="mf">1.0</span><span class="w"> </span><span class="p">(</span><span class="n">lower-bound</span><span class="w"> </span><span class="n">y</span><span class="p">))))</span>
<span class="w">      </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;div-interval called with interval containing zero&quot;</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">disp-interval</span><span class="w"> </span><span class="n">int</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;[&quot;</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="p">(</span><span class="n">lower-bound</span><span class="w"> </span><span class="n">int</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;, &quot;</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="p">(</span><span class="n">upper-bound</span><span class="w"> </span><span class="n">int</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;]&quot;</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">disp-interval-op</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="w"> </span><span class="n">c</span><span class="w"> </span><span class="n">d</span><span class="w"> </span><span class="n">func</span><span class="w"> </span><span class="n">character</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">i1</span><span class="w"> </span><span class="p">(</span><span class="n">make-interval</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="n">i2</span><span class="w"> </span><span class="p">(</span><span class="n">make-interval</span><span class="w"> </span><span class="n">c</span><span class="w"> </span><span class="n">d</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">disp-interval</span><span class="w"> </span><span class="n">i1</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="n">character</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">disp-interval</span><span class="w"> </span><span class="n">i2</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot; = &quot;</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">disp-interval</span><span class="w"> </span><span class="p">(</span><span class="n">func</span><span class="w"> </span><span class="n">i1</span><span class="w"> </span><span class="n">i2</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">)))</span>

<span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;Division by an interval containing zero:&quot;</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="p">(</span><span class="n">disp-interval-op</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="mi">3</span><span class="w"> </span><span class="mi">-1</span><span class="w"> </span><span class="mf">1.1</span><span class="w"> </span><span class="n">div-interval</span><span class="w"> </span><span class="s2">&quot; / &quot;</span><span class="p">)</span>
</pre></div>
<div class="code-output">
<span>Output:</span>
<pre>Division by an interval containing zero:
[2, 3] / [-1, 1.1] = 
div-interval called with interval containing zero
  context...:
   /home/dkmoore/docker/codex-md2html/sicp/ch2/code/ex2-10.rkt:22:0: disp-interval-op
   body of &quot;/home/dkmoore/docker/codex-md2html/sicp/ch2/code/ex2-10.rkt&quot;
</pre>
</div>
</div>


#### Exercise 2.11

In passing, Ben also cryptically
comments: ``By testing the signs of the endpoints of the intervals, it is
possible to break `mul-interval` into nine cases, only one of which
requires more than two multiplications.''  Rewrite this procedure using Ben's
suggestion.

##### Solution
So, let's see. The goal here is to reduce the number of multiplications down from 4. We have four numbers $x_\ell,x_u,y_\ell,y_u.$ If we go case-by-case whether each number is greater than or equal to zero, we don't have sixteen cases because we also have to enforce $x_\ell\lt x_u$. I guess it's easier to list this out by cases.

- case `1111`: The positive case `1111` is easy:
<div>$$x*y=[x_\ell y_\ell,x_u y_u]$$</div>

- case `1101`: If all numbers are positive except $y_\ell$ (case `1101`) the lower bound is $x_u y_\ell:$ $x*y=[x_u y_\ell,x_u y_u]$

- case `0111`: By symmetry, if all numbers are positive except $x_\ell,$ then $x*y=[x_u y_\ell,x_u y_u]$

Anyways, proceeding in this way we get the list of sixteen cases:

<div class="codehilite"><pre><span></span>x_lower&gt;=0? x_upper&gt;=0? y_lower&gt;=0? y_upper&gt;=0? 
1111 - [x_lower*y_lower, x_upper*y_upper]
1110 - disallowed
1101 - [x_upper*y_lower, x_upper*y_upper]
1100 - [x_upper*y_lower, x_lower*y_upper]
1011 - disallowed
1010 - disallowed
1001 - disallowed
1000 - disallowed
0111 - [x_lower*y_upper, x_upper*y_upper]
0110 - disallowed
0101 - [min(x_lower*y_upper, x_upper*y_lower), max(x_lower*y_lower,x_upper*y_upper)]
0100 - [x_upper*y_lower, x_lower*y_lower]
0011 - [x_lower*y_upper, x_upper*y_lower]
0010 - disallowed
0001 - [x_lower*y_upper, x_lower*y_lower]
0000 - [x_upper*y_upper, x_lower*y_lower]
</pre></div>

<div class="code-box" markdown="1">
<div class="code-header"><a href="code/ex2-11.rkt">code/ex2-11.rkt</a></div>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-interval</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">lower-bound</span><span class="w"> </span><span class="n">int</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">int</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">upper-bound</span><span class="w"> </span><span class="n">int</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">int</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">mul-interval-new</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">y</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">bin</span><span class="w"> </span><span class="n">bool</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="n">bool</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">0</span><span class="p">))</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">xl</span><span class="w"> </span><span class="p">(</span><span class="n">lower-bound</span><span class="w"> </span><span class="n">x</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="n">xu</span><span class="w"> </span><span class="p">(</span><span class="n">upper-bound</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="n">yl</span><span class="w"> </span><span class="p">(</span><span class="n">lower-bound</span><span class="w"> </span><span class="n">y</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="n">yu</span><span class="w"> </span><span class="p">(</span><span class="n">upper-bound</span><span class="w"> </span><span class="n">y</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">switch</span><span class="w"> </span>
<span class="w">            </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="mi">8</span><span class="w"> </span><span class="p">(</span><span class="n">bin</span><span class="w"> </span><span class="p">(</span><span class="nb">&gt;=</span><span class="w"> </span><span class="n">xl</span><span class="w"> </span><span class="mi">0</span><span class="p">)))</span>
<span class="w">               </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="mi">4</span><span class="w"> </span><span class="p">(</span><span class="n">bin</span><span class="w"> </span><span class="p">(</span><span class="nb">&gt;=</span><span class="w"> </span><span class="n">xu</span><span class="w"> </span><span class="mi">0</span><span class="p">)))</span>
<span class="w">               </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="p">(</span><span class="n">bin</span><span class="w"> </span><span class="p">(</span><span class="nb">&gt;=</span><span class="w"> </span><span class="n">yl</span><span class="w"> </span><span class="mi">0</span><span class="p">)))</span>
<span class="w">               </span><span class="p">(</span><span class="n">bin</span><span class="w"> </span><span class="p">(</span><span class="nb">&gt;=</span><span class="w"> </span><span class="n">yu</span><span class="w"> </span><span class="mi">0</span><span class="p">)))))</span>
<span class="w">      </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">=</span><span class="w"> </span><span class="n">switch</span><span class="w"> </span><span class="mi">15</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">make-interval</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">xl</span><span class="w"> </span><span class="n">yl</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">xu</span><span class="w"> </span><span class="n">yu</span><span class="p">)))</span>
<span class="w">            </span><span class="p">((</span><span class="nb">=</span><span class="w"> </span><span class="n">switch</span><span class="w"> </span><span class="mi">13</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">make-interval</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">xu</span><span class="w"> </span><span class="n">yl</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">xu</span><span class="w"> </span><span class="n">yu</span><span class="p">)))</span>
<span class="w">            </span><span class="p">((</span><span class="nb">=</span><span class="w"> </span><span class="n">switch</span><span class="w"> </span><span class="mi">12</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">make-interval</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">xu</span><span class="w"> </span><span class="n">yl</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">xl</span><span class="w"> </span><span class="n">yu</span><span class="p">)))</span>
<span class="w">            </span><span class="p">((</span><span class="nb">=</span><span class="w"> </span><span class="n">switch</span><span class="w"> </span><span class="mi">7</span><span class="p">)</span><span class="w">  </span><span class="p">(</span><span class="n">make-interval</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">xl</span><span class="w"> </span><span class="n">yu</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">xu</span><span class="w"> </span><span class="n">yu</span><span class="p">)))</span>
<span class="w">            </span><span class="p">((</span><span class="nb">=</span><span class="w"> </span><span class="n">switch</span><span class="w"> </span><span class="mi">4</span><span class="p">)</span><span class="w">  </span><span class="p">(</span><span class="n">make-interval</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">xu</span><span class="w"> </span><span class="n">yl</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">xl</span><span class="w"> </span><span class="n">yl</span><span class="p">)))</span>
<span class="w">            </span><span class="p">((</span><span class="nb">=</span><span class="w"> </span><span class="n">switch</span><span class="w"> </span><span class="mi">3</span><span class="p">)</span><span class="w">  </span><span class="p">(</span><span class="n">make-interval</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">xl</span><span class="w"> </span><span class="n">yu</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">xu</span><span class="w"> </span><span class="n">yl</span><span class="p">)))</span>
<span class="w">            </span><span class="p">((</span><span class="nb">=</span><span class="w"> </span><span class="n">switch</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span><span class="w">  </span><span class="p">(</span><span class="n">make-interval</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">xl</span><span class="w"> </span><span class="n">yu</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">xl</span><span class="w"> </span><span class="n">yl</span><span class="p">)))</span>
<span class="w">            </span><span class="p">((</span><span class="nb">=</span><span class="w"> </span><span class="n">switch</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span><span class="w">  </span><span class="p">(</span><span class="n">make-interval</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">xu</span><span class="w"> </span><span class="n">yu</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">xl</span><span class="w"> </span><span class="n">yl</span><span class="p">)))</span>
<span class="w">        </span><span class="c1">;; special comparison case</span>
<span class="w">            </span><span class="p">((</span><span class="nb">=</span><span class="w"> </span><span class="n">switch</span><span class="w"> </span><span class="mi">5</span><span class="p">)</span><span class="w">  </span><span class="p">(</span><span class="n">make-interval</span><span class="w"> </span><span class="p">(</span><span class="nb">min</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">xl</span><span class="w"> </span><span class="n">yu</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">xu</span><span class="w"> </span><span class="n">yl</span><span class="p">))</span>
<span class="w">                                          </span><span class="p">(</span><span class="nb">max</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">xl</span><span class="w"> </span><span class="n">yl</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">xu</span><span class="w"> </span><span class="n">yu</span><span class="p">))))</span>
<span class="w">            </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;invalid interval&quot;</span><span class="p">))))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">mul-interval</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">y</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">p1</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="p">(</span><span class="n">lower-bound</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">lower-bound</span><span class="w"> </span><span class="n">y</span><span class="p">)))</span><span class="w"> </span>
<span class="w">        </span><span class="p">(</span><span class="n">p2</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="p">(</span><span class="n">lower-bound</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">upper-bound</span><span class="w"> </span><span class="n">y</span><span class="p">)))</span>
<span class="w">        </span><span class="p">(</span><span class="n">p3</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="p">(</span><span class="n">upper-bound</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">lower-bound</span><span class="w"> </span><span class="n">y</span><span class="p">)))</span><span class="w"> </span>
<span class="w">        </span><span class="p">(</span><span class="n">p4</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="p">(</span><span class="n">upper-bound</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">upper-bound</span><span class="w"> </span><span class="n">y</span><span class="p">))))</span>
<span class="w">    </span><span class="p">(</span><span class="n">make-interval</span><span class="w"> </span><span class="p">(</span><span class="nb">min</span><span class="w"> </span><span class="n">p1</span><span class="w"> </span><span class="n">p2</span><span class="w"> </span><span class="n">p3</span><span class="w"> </span><span class="n">p4</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">max</span><span class="w"> </span><span class="n">p1</span><span class="w"> </span><span class="n">p2</span><span class="w"> </span><span class="n">p3</span><span class="w"> </span><span class="n">p4</span><span class="p">))))</span>

<span class="c1">;;Testing code</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">myrandom</span><span class="w"> </span><span class="n">lower</span><span class="w"> </span><span class="n">upper</span><span class="w"> </span><span class="n">nsteps</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">lower</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">upper</span><span class="w"> </span><span class="n">lower</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">/</span><span class="w"> </span><span class="p">(</span><span class="nb">random</span><span class="w"> </span><span class="n">nsteps</span><span class="p">)</span><span class="w"> </span><span class="n">nsteps</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">random-interval</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">a</span><span class="w"> </span><span class="p">(</span><span class="n">myrandom</span><span class="w"> </span><span class="mi">-10</span><span class="w"> </span><span class="mi">10</span><span class="w"> </span><span class="mi">10000</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="n">b</span><span class="w"> </span><span class="p">(</span><span class="n">myrandom</span><span class="w"> </span><span class="mi">-10</span><span class="w"> </span><span class="mi">10</span><span class="w"> </span><span class="mi">10000</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">&lt;</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">make-interval</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">random-interval</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">interval-equal?</span><span class="w"> </span><span class="n">int1</span><span class="w"> </span><span class="n">int2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="p">(</span><span class="n">lower-bound</span><span class="w"> </span><span class="n">int1</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">lower-bound</span><span class="w"> </span><span class="n">int2</span><span class="p">))</span>
<span class="w">       </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="p">(</span><span class="n">upper-bound</span><span class="w"> </span><span class="n">int1</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">upper-bound</span><span class="w"> </span><span class="n">int2</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">test-mul-interval</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span><span class="w"> </span><span class="no">#t</span>
<span class="w">    </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">x</span><span class="w"> </span><span class="p">(</span><span class="n">random-interval</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="n">y</span><span class="w"> </span><span class="p">(</span><span class="n">random-interval</span><span class="p">)))</span>
<span class="w">      </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">interval-equal?</span><span class="w"> </span><span class="p">(</span><span class="n">mul-interval</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">y</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">mul-interval-new</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">y</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="n">test-mul-interval</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">))</span>
<span class="w">        </span><span class="no">#f</span><span class="p">))))</span>
<span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;Testing new code for 10000 cases. All intervals equal?&quot;</span><span class="p">)</span>
<span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">test-mul-interval</span><span class="w"> </span><span class="mi">10000</span><span class="p">)</span><span class="w"> </span><span class="s2">&quot;true&quot;</span><span class="w"> </span><span class="s2">&quot;false&quot;</span><span class="p">))</span>
</pre></div>
<div class="code-output">
<span>Output:</span>
<pre>Testing new code for 10000 cases. All intervals equal?
true</pre>
</div>
</div>


#### Exercise 2.12

Define a constructor
`make-center-percent` that takes a center and a percentage tolerance and
produces the desired interval.  You must also define a selector `percent`
that produces the percentage tolerance for a given interval.  The `center`
selector is the same as the one shown above.

##### Solution
I'm going to opt to keep my tolerances as pure fractions (no multiplication by 100 to get a pure percent). I find it easiest to first write the percent function:

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">center</span><span class="w"> </span><span class="n">i</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">/</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="p">(</span><span class="n">lower-bound</span><span class="w"> </span><span class="n">i</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">upper-bound</span><span class="w"> </span><span class="n">i</span><span class="p">))</span><span class="w"> </span><span class="mi">2</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">width</span><span class="w"> </span><span class="n">i</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">/</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="p">(</span><span class="n">upper-bound</span><span class="w"> </span><span class="n">i</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">lower-bound</span><span class="w"> </span><span class="n">i</span><span class="p">))</span><span class="w"> </span><span class="mi">2</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">percent</span><span class="w"> </span><span class="n">i</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">/</span><span class="w"> </span><span class="p">(</span><span class="n">width</span><span class="w"> </span><span class="n">i</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">center</span><span class="w"> </span><span class="n">i</span><span class="p">)))</span>
</pre></div>

Then, `(make-center-percent x p)` should be defined as the interval $i$ with
<div>$$\frac{i_\ell+i_u}{2}=x,\qquad \frac{i_u-i_\ell}{i_u+i_\ell}=p$$</div>
Which has the solution
<div>$$i_\ell=x-px,\qquad i_u=x+px$$</div>
which we should have known but it's nice to write it out in full!
<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-percent-center</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">p</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">make-interval</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">p</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">p</span><span class="p">))))</span>
</pre></div>
#### Exercise 2.13

Show that under the assumption of
small percentage tolerances there is a simple formula for the approximate
percentage tolerance of the product of two intervals in terms of the tolerances
of the factors.  You may simplify the problem by assuming that all numbers are
positive.

##### Solution
<div>$$\begin{align*}
(a+\Delta a)(b+\Delta b)&=ab+b\Delta a+a\Delta b+\Delta a\Delta b\\
&\approx ab+b\Delta a+a\Delta b\\
&=ab\left(1+\frac{\Delta a}{a}+\frac{\Delta b}{b}\right)
\end{align*}$$</div>
So the percent tolerances add.

#### Exercise 2.14

Demonstrate that Lem is right.
Investigate the behavior of the system on a variety of arithmetic
expressions. Make some intervals $A$ and $B$, and use them in computing the
expressions $A / A$ and $A / B$.  You will get the most insight by
using intervals whose width is a small percentage of the center value. Examine
the results of the computation in center-percent form (see Exercise 2.12).

##### Solution

<div class="code-box" markdown="1">
<div class="code-header"><a href="code/ex2-14.rkt">code/ex2-14.rkt</a></div>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-interval</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">lower-bound</span><span class="w"> </span><span class="n">int</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">int</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">upper-bound</span><span class="w"> </span><span class="n">int</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">int</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">center</span><span class="w"> </span><span class="n">i</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">/</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="p">(</span><span class="n">lower-bound</span><span class="w"> </span><span class="n">i</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">upper-bound</span><span class="w"> </span><span class="n">i</span><span class="p">))</span><span class="w"> </span><span class="mi">2</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">width</span><span class="w"> </span><span class="n">i</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">/</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="p">(</span><span class="n">upper-bound</span><span class="w"> </span><span class="n">i</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">lower-bound</span><span class="w"> </span><span class="n">i</span><span class="p">))</span><span class="w"> </span><span class="mi">2</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">percent</span><span class="w"> </span><span class="n">i</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">/</span><span class="w"> </span><span class="p">(</span><span class="n">width</span><span class="w"> </span><span class="n">i</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">center</span><span class="w"> </span><span class="n">i</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-percent-center</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">p</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">make-interval</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">p</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">p</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">mul-interval</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">y</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">p1</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="p">(</span><span class="n">lower-bound</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">lower-bound</span><span class="w"> </span><span class="n">y</span><span class="p">)))</span><span class="w"> </span>
<span class="w">        </span><span class="p">(</span><span class="n">p2</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="p">(</span><span class="n">lower-bound</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">upper-bound</span><span class="w"> </span><span class="n">y</span><span class="p">)))</span>
<span class="w">        </span><span class="p">(</span><span class="n">p3</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="p">(</span><span class="n">upper-bound</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">lower-bound</span><span class="w"> </span><span class="n">y</span><span class="p">)))</span><span class="w"> </span>
<span class="w">        </span><span class="p">(</span><span class="n">p4</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="p">(</span><span class="n">upper-bound</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">upper-bound</span><span class="w"> </span><span class="n">y</span><span class="p">))))</span>
<span class="w">    </span><span class="p">(</span><span class="n">make-interval</span><span class="w"> </span><span class="p">(</span><span class="nb">min</span><span class="w"> </span><span class="n">p1</span><span class="w"> </span><span class="n">p2</span><span class="w"> </span><span class="n">p3</span><span class="w"> </span><span class="n">p4</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">max</span><span class="w"> </span><span class="n">p1</span><span class="w"> </span><span class="n">p2</span><span class="w"> </span><span class="n">p3</span><span class="w"> </span><span class="n">p4</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">contains?</span><span class="w"> </span><span class="n">interval</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">&lt;=</span><span class="w"> </span><span class="p">(</span><span class="n">lower-bound</span><span class="w"> </span><span class="n">interval</span><span class="p">)</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">&lt;=</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="p">(</span><span class="n">upper-bound</span><span class="w"> </span><span class="n">interval</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">div-interval</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">y</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="n">contains?</span><span class="w"> </span><span class="n">y</span><span class="w"> </span><span class="mi">0</span><span class="p">))</span>
<span class="w">      </span><span class="p">(</span><span class="n">mul-interval</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="p">(</span><span class="n">make-interval</span><span class="w"> </span><span class="p">(</span><span class="nb">/</span><span class="w"> </span><span class="mf">1.0</span><span class="w"> </span><span class="p">(</span><span class="n">upper-bound</span><span class="w"> </span><span class="n">y</span><span class="p">))</span>
<span class="w">                                     </span><span class="p">(</span><span class="nb">/</span><span class="w"> </span><span class="mf">1.0</span><span class="w"> </span><span class="p">(</span><span class="n">lower-bound</span><span class="w"> </span><span class="n">y</span><span class="p">))))</span>
<span class="w">      </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;div-interval called with interval containing zero&quot;</span><span class="p">)))</span>
<span class="c1">;; (define (disp-interval int)</span>
<span class="c1">;;   (display &quot;[&quot;) (display (lower-bound int)) (display &quot;, &quot;) </span>
<span class="c1">;;   (display (upper-bound int)) (display &quot;]&quot;))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">disp-interval</span><span class="w"> </span><span class="n">int</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="p">(</span><span class="n">center</span><span class="w"> </span><span class="n">int</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;(1 ± &quot;</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="p">(</span><span class="n">percent</span><span class="w"> </span><span class="n">int</span><span class="p">))</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;)&quot;</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">disp-interval-op</span><span class="w"> </span><span class="n">i1</span><span class="w"> </span><span class="n">i2</span><span class="w"> </span><span class="n">func</span><span class="w"> </span><span class="n">character</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">disp-interval</span><span class="w"> </span><span class="n">i1</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="n">character</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">disp-interval</span><span class="w"> </span><span class="n">i2</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot; = &quot;</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">disp-interval</span><span class="w"> </span><span class="p">(</span><span class="n">func</span><span class="w"> </span><span class="n">i1</span><span class="w"> </span><span class="n">i2</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">))</span>

<span class="c1">;; (A+eps dA)/(B+eps dB) = ((A + eps dA)/B)/(1+eps dB/B)</span>
<span class="c1">;; =((A/B + eps dA/B) (1- eps dB/B)</span>
<span class="c1">;; =A/B + eps (dA/B - A/B dB/B)</span>
<span class="c1">;; =A/B(1+eps(dA/A - dB/B))</span>
<span class="c1">;; So the percent uncertainties add.</span>
<span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">A</span><span class="w"> </span><span class="p">(</span><span class="n">make-percent-center</span><span class="w"> </span><span class="mf">1.0</span><span class="w"> </span><span class="mf">0.05</span><span class="p">))</span>
<span class="w">      </span><span class="p">(</span><span class="n">B</span><span class="w"> </span><span class="p">(</span><span class="n">make-percent-center</span><span class="w"> </span><span class="mf">10.0</span><span class="w"> </span><span class="mf">0.1</span><span class="p">)))</span>
<span class="w">  </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;Division of A/A:&quot;</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">disp-interval-op</span><span class="w"> </span><span class="n">A</span><span class="w"> </span><span class="n">A</span><span class="w"> </span><span class="n">div-interval</span><span class="w"> </span><span class="s2">&quot; / &quot;</span><span class="p">)</span>

<span class="w">  </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;Division of A/B:&quot;</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">disp-interval-op</span><span class="w"> </span><span class="n">A</span><span class="w"> </span><span class="n">B</span><span class="w"> </span><span class="n">div-interval</span><span class="w"> </span><span class="s2">&quot; / &quot;</span><span class="p">))</span>
</pre></div>
<div class="code-output">
<span>Output:</span>
<pre>Division of A/A:
1.0(1 ± 0.050000000000000044) / 1.0(1 ± 0.050000000000000044) = 1.0050125313283207(1 ± 0.09975062344139651)
Division of A/B:
1.0(1 ± 0.050000000000000044) / 10.0(1 ± 0.1) = 0.10151515151515152(1 ± 0.1492537313432836)
</pre>
</div>
</div>


This makes sense, the percent errors add (under the small error approximation).

#### Exercise 2.15

Eva Lu Ator, another user, has
also noticed the different intervals computed by different but algebraically
equivalent expressions. She says that a formula to compute with intervals using
Alyssa's system will produce tighter error bounds if it can be written in such
a form that no variable that represents an uncertain number is repeated.  Thus,
she says, `par2` is a better program for parallel resistances than
`par1`.  Is she right?  Why?

##### Solution
**Alyssa's Conjecture:** Among algebraically equivalent expressions 
the one that minimizes the error of the result interval is the one in which 
no variable that represents an uncertain number is repeated, if such a form exists.

**My statement:** Every operation involving two intervals of width greater than zero adds to the error, so those are the things we want to minimize.

**Question:** is there a expression such that making a variable occur only once adds to the total number of interval operations?

- Polynomials are out. Let's count `(pow A 3)` as the symbol `A` occurring multiple times.
- The only expressions we can form are binary trees, the way to minimize the number of nontrivial interval operations **is** to ensure each symbol only occurs once, if that's possible. If we have 4 variables and 4 nontrivial leaf nodes, we'll have 3 nontrivial interval combinations. (Evaluating nodes of the tree: Every operation takes in two intervals and returns 1, so the number of nontrivial intervals can only decrease by one)
- The question now is, is minimizing the number of nontrivial interval combinations the way to go?!

- "Any operation between two intervals will increase errors" - I can prove this.
- "The binary tree with the smallest number of nontrivial intervals as leaf nodes minimizes the number of nontrivial interval operations." - I can also prove this
- The problem is + and * increase the errors by different amounts, so if I reduce the total number of operations, but introduce a * to the wrong spot, what if this blows up the error? So my concern is really about allowed transformations on the binary tree and the interplay between + and * (or -, or /). For example in this code snippet to evaluate $A/B + C/B,$ we reduce the number of divisions, but don't reduce the error.

<div class="code-box" markdown="1">
<div class="code-header"><a href="code/ex2-15.rkt">code/ex2-15.rkt</a></div>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-interval</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">lower-bound</span><span class="w"> </span><span class="n">int</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">int</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">upper-bound</span><span class="w"> </span><span class="n">int</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">int</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">center</span><span class="w"> </span><span class="n">i</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">/</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="p">(</span><span class="n">lower-bound</span><span class="w"> </span><span class="n">i</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">upper-bound</span><span class="w"> </span><span class="n">i</span><span class="p">))</span><span class="w"> </span><span class="mi">2</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">width</span><span class="w"> </span><span class="n">i</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">/</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="p">(</span><span class="n">upper-bound</span><span class="w"> </span><span class="n">i</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">lower-bound</span><span class="w"> </span><span class="n">i</span><span class="p">))</span><span class="w"> </span><span class="mi">2</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">percent</span><span class="w"> </span><span class="n">i</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">/</span><span class="w"> </span><span class="p">(</span><span class="n">width</span><span class="w"> </span><span class="n">i</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">center</span><span class="w"> </span><span class="n">i</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-percent-center</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">p</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">make-interval</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">p</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">p</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">add-interval</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">y</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">make-interval</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="p">(</span><span class="n">lower-bound</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">lower-bound</span><span class="w"> </span><span class="n">y</span><span class="p">))</span>
<span class="w">                 </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="p">(</span><span class="n">upper-bound</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">upper-bound</span><span class="w"> </span><span class="n">y</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">sub-interval</span><span class="w"> </span><span class="n">A</span><span class="w"> </span><span class="n">B</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">make-interval</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="p">(</span><span class="n">lower-bound</span><span class="w"> </span><span class="n">A</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">upper-bound</span><span class="w"> </span><span class="n">B</span><span class="p">))</span>
<span class="w">                 </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="p">(</span><span class="n">upper-bound</span><span class="w"> </span><span class="n">A</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">lower-bound</span><span class="w"> </span><span class="n">B</span><span class="p">))))</span>


<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">mul-interval</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">y</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">p1</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="p">(</span><span class="n">lower-bound</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">lower-bound</span><span class="w"> </span><span class="n">y</span><span class="p">)))</span><span class="w"> </span>
<span class="w">        </span><span class="p">(</span><span class="n">p2</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="p">(</span><span class="n">lower-bound</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">upper-bound</span><span class="w"> </span><span class="n">y</span><span class="p">)))</span>
<span class="w">        </span><span class="p">(</span><span class="n">p3</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="p">(</span><span class="n">upper-bound</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">lower-bound</span><span class="w"> </span><span class="n">y</span><span class="p">)))</span><span class="w"> </span>
<span class="w">        </span><span class="p">(</span><span class="n">p4</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="p">(</span><span class="n">upper-bound</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">upper-bound</span><span class="w"> </span><span class="n">y</span><span class="p">))))</span>
<span class="w">    </span><span class="p">(</span><span class="n">make-interval</span><span class="w"> </span><span class="p">(</span><span class="nb">min</span><span class="w"> </span><span class="n">p1</span><span class="w"> </span><span class="n">p2</span><span class="w"> </span><span class="n">p3</span><span class="w"> </span><span class="n">p4</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">max</span><span class="w"> </span><span class="n">p1</span><span class="w"> </span><span class="n">p2</span><span class="w"> </span><span class="n">p3</span><span class="w"> </span><span class="n">p4</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">contains?</span><span class="w"> </span><span class="n">interval</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">&lt;=</span><span class="w"> </span><span class="p">(</span><span class="n">lower-bound</span><span class="w"> </span><span class="n">interval</span><span class="p">)</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">&lt;=</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="p">(</span><span class="n">upper-bound</span><span class="w"> </span><span class="n">interval</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">div-interval</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">y</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="n">contains?</span><span class="w"> </span><span class="n">y</span><span class="w"> </span><span class="mi">0</span><span class="p">))</span>
<span class="w">      </span><span class="p">(</span><span class="n">mul-interval</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="p">(</span><span class="n">make-interval</span><span class="w"> </span><span class="p">(</span><span class="nb">/</span><span class="w"> </span><span class="mf">1.0</span><span class="w"> </span><span class="p">(</span><span class="n">upper-bound</span><span class="w"> </span><span class="n">y</span><span class="p">))</span>
<span class="w">                                     </span><span class="p">(</span><span class="nb">/</span><span class="w"> </span><span class="mf">1.0</span><span class="w"> </span><span class="p">(</span><span class="n">lower-bound</span><span class="w"> </span><span class="n">y</span><span class="p">))))</span>
<span class="w">      </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;div-interval called with interval containing zero&quot;</span><span class="p">)))</span>
<span class="c1">;; (define (disp-interval int)</span>
<span class="c1">;;   (display &quot;[&quot;) (display (lower-bound int)) (display &quot;, &quot;) </span>
<span class="c1">;;   (display (upper-bound int)) (display &quot;]&quot;))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">disp-interval</span><span class="w"> </span><span class="n">int</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="p">(</span><span class="n">center</span><span class="w"> </span><span class="n">int</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;(1 ± &quot;</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="p">(</span><span class="n">percent</span><span class="w"> </span><span class="n">int</span><span class="p">))</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;)&quot;</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">disp-interval-op</span><span class="w"> </span><span class="n">i1</span><span class="w"> </span><span class="n">i2</span><span class="w"> </span><span class="n">func</span><span class="w"> </span><span class="n">character</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">disp-interval</span><span class="w"> </span><span class="n">i1</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="n">character</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">disp-interval</span><span class="w"> </span><span class="n">i2</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot; = &quot;</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">disp-interval</span><span class="w"> </span><span class="p">(</span><span class="n">func</span><span class="w"> </span><span class="n">i1</span><span class="w"> </span><span class="n">i2</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">))</span>

<span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">A</span><span class="w"> </span><span class="p">(</span><span class="n">make-percent-center</span><span class="w"> </span><span class="mf">0.1</span><span class="w"> </span><span class="mf">0.8</span><span class="p">))</span>
<span class="w">      </span><span class="p">(</span><span class="n">B</span><span class="w"> </span><span class="p">(</span><span class="n">make-percent-center</span><span class="w"> </span><span class="mf">0.001</span><span class="w"> </span><span class="mf">0.8</span><span class="p">))</span>
<span class="w">      </span><span class="p">(</span><span class="n">C</span><span class="w"> </span><span class="p">(</span><span class="n">make-percent-center</span><span class="w"> </span><span class="mf">7.0</span><span class="w"> </span><span class="mf">0.1</span><span class="p">))</span>
<span class="w">      </span><span class="p">(</span><span class="n">one</span><span class="w"> </span><span class="p">(</span><span class="n">make-percent-center</span><span class="w"> </span><span class="mf">1.0</span><span class="w"> </span><span class="mi">0</span><span class="p">)))</span>
<span class="w">  </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;A = &quot;</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">disp-interval</span><span class="w"> </span><span class="n">A</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;B = &quot;</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">disp-interval</span><span class="w"> </span><span class="n">B</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;C = &quot;</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">disp-interval</span><span class="w"> </span><span class="n">C</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;Division of A/B+C/B:&quot;</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">disp-interval</span><span class="w"> </span><span class="p">(</span><span class="n">add-interval</span><span class="w"> </span><span class="p">(</span><span class="n">div-interval</span><span class="w"> </span><span class="n">A</span><span class="w"> </span><span class="n">B</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">div-interval</span><span class="w"> </span><span class="n">C</span><span class="w"> </span><span class="n">B</span><span class="p">)))</span>
<span class="w">  </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;Division of (A+C)/B:&quot;</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">disp-interval</span><span class="w"> </span><span class="p">(</span><span class="n">div-interval</span><span class="w"> </span><span class="p">(</span><span class="n">add-interval</span><span class="w"> </span><span class="n">A</span><span class="w"> </span><span class="n">C</span><span class="p">)</span><span class="w"> </span><span class="n">B</span><span class="p">))</span>
<span class="w">  </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;And, just to confirm the issue:&quot;</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;Division of (AB)/(A+B):&quot;</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">disp-interval</span><span class="w"> </span><span class="p">(</span><span class="n">div-interval</span><span class="w"> </span><span class="p">(</span><span class="n">mul-interval</span><span class="w"> </span><span class="n">A</span><span class="w"> </span><span class="n">B</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">add-interval</span><span class="w"> </span><span class="n">A</span><span class="w"> </span><span class="n">B</span><span class="p">)))</span>
<span class="w">  </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;Division of 1/(1/A+1/B):&quot;</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">disp-interval</span><span class="w"> </span><span class="p">(</span><span class="n">div-interval</span><span class="w"> </span><span class="n">one</span><span class="w"> </span><span class="p">(</span><span class="n">add-interval</span><span class="w"> </span><span class="p">(</span><span class="n">div-interval</span><span class="w"> </span><span class="n">one</span><span class="w"> </span><span class="n">A</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">div-interval</span><span class="w"> </span><span class="n">one</span><span class="w"> </span><span class="n">B</span><span class="p">)))))</span>
</pre></div>
<div class="code-output">
<span>Output:</span>
<pre>A = 0.1(1 ± 0.8000000000000002)
B = 0.001(1 ± 0.7999999999999999)
C = 7.0(1 ± 0.10000000000000002)
Division of A/B+C/B:
21455.555555555555(1 ± 0.8363542206110824)
Division of (A+C)/B:
21455.555555555555(1 ± 0.8363542206110824)

And, just to confirm the issue:
Division of (AB)/(A+B):
0.008030803080308036(1 ± 0.9972602739726029)
Division of 1/(1/A+1/B):
0.0009900990099009901(1 ± 0.8)</pre>
</div>
</div>


I'm going to leave this problem here. It's probably true, I'm just having trouble proving it.

#### Exercise 2.16

Explain, in general, why
equivalent algebraic expressions may lead to different answers.  Can you devise
an interval-arithmetic package that does not have this shortcoming, or is this
task impossible?  (Warning: This problem is very difficult.)

##### Solution
Consider the context of problem 2.15, where we care about the expression $ab/(a+b)$.

- The gold standard is to model each number as a random variable, possibly with a joint probability distribution $P(a,b)$. Then you ask what is the probability distribution 
$$P\left(\frac{ab}{a+b}\right)=P\left(\frac{1}{\frac{1}{a}+\frac{1}{b}}\right)$$
This can be done through monte carlo, or bootstrap and jackknife, or through linear error propagation, there's a ton of methods.

- Another simpler heuristic would be to treat our expression as a function:
<div class="codehilite"><pre><span></span><span class="c1">;; equivalent definitions</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">f</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">/</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">f</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">/</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="p">(</span><span class="nb">/</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="n">a</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">/</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="n">b</span><span class="p">))))</span>
</pre></div>
and then the new interval would have bounds
<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">al</span><span class="w"> </span><span class="p">(</span><span class="n">lower-bound</span><span class="w"> </span><span class="n">A</span><span class="p">))</span>
<span class="w">      </span><span class="p">(</span><span class="n">au</span><span class="w"> </span><span class="p">(</span><span class="n">upper-bound</span><span class="w"> </span><span class="n">A</span><span class="p">))</span>
<span class="w">      </span><span class="p">(</span><span class="n">bl</span><span class="w"> </span><span class="p">(</span><span class="n">lower-bound</span><span class="w"> </span><span class="n">B</span><span class="p">))</span>
<span class="w">      </span><span class="p">(</span><span class="n">bu</span><span class="w"> </span><span class="p">(</span><span class="n">upper-bound</span><span class="w"> </span><span class="n">B</span><span class="p">)))</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">x1</span><span class="w"> </span><span class="p">(</span><span class="n">f</span><span class="w"> </span><span class="n">al</span><span class="w"> </span><span class="n">bl</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="n">x2</span><span class="w"> </span><span class="p">(</span><span class="n">f</span><span class="w"> </span><span class="n">al</span><span class="w"> </span><span class="n">bu</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="n">x3</span><span class="w"> </span><span class="p">(</span><span class="n">f</span><span class="w"> </span><span class="n">au</span><span class="w"> </span><span class="n">bl</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="n">x4</span><span class="w"> </span><span class="p">(</span><span class="n">f</span><span class="w"> </span><span class="n">au</span><span class="w"> </span><span class="n">bu</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">make-interval</span><span class="w"> </span><span class="p">(</span><span class="nb">min</span><span class="w"> </span><span class="n">x1</span><span class="w"> </span><span class="n">x2</span><span class="w"> </span><span class="n">x3</span><span class="w"> </span><span class="n">x4</span><span class="p">)</span>
<span class="w">                   </span><span class="p">(</span><span class="nb">max</span><span class="w"> </span><span class="n">x1</span><span class="w"> </span><span class="n">x2</span><span class="w"> </span><span class="n">x3</span><span class="w"> </span><span class="n">x4</span><span class="p">))))</span>
</pre></div>
In many cases the result will be the smallest interval possible. But we could have pathological cases with non-monotonic functions (the extreme cases can lie in the middle of the interval instead of the endpoints; so maybe "convex" is the word I'm searching for). 

So anyways this is just a discussion of the possible approaches, we're not going to actually implement all this stuff.















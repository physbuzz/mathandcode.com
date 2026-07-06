---
layout: sicp
render_with_liquid: false
title: SICP Chapter 5.1
---

<div class="nav">
    <span class="activenav"><a href="../ch4/notes-ch4-4.html">← Previous</a></span>
    <span class="activenav"><a href="../index.html">↑ Up</a></span>
    <span class="activenav"><a href="notes-ch5-2.html">Next →</a></span>
</div>

[HTML Book Chapter 5.1 Link](https://sarabander.github.io/sicp/html/5_002e1.xhtml#g_t5_002e1)

## Directory
- [Section 5.1](#section-51)
  - [Notes](#notes)
  - [Exercises](#exercises)
    - *Exercises:* ([Exercise 5.1](#exercise-51), [Exercise 5.2](#exercise-52), [Exercise 5.3](#exercise-53), [Exercise 5.4](#exercise-54), [Exercise 5.5](#exercise-55), [Exercise 5.6](#exercise-56))

## Section 5.1

### Notes

### Exercises

#### Exercise 5.1

Design a register machine to
compute factorials using the iterative algorithm specified by the following
procedure.  Draw data-path and controller diagrams for this machine.

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">factorial</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">iter</span><span class="w"> </span><span class="n">product</span><span class="w"> </span><span class="n">counter</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">&gt;</span><span class="w"> </span><span class="n">counter</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">        </span><span class="n">product</span>
<span class="w">        </span><span class="p">(</span><span class="n">iter</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">counter</span><span class="w"> </span><span class="n">product</span><span class="p">)</span>
<span class="w">              </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">counter</span><span class="w"> </span><span class="mi">1</span><span class="p">))))</span>
<span class="w">  </span><span class="p">(</span><span class="n">iter</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">1</span><span class="p">))</span>
</pre></div>

#### Exercise 5.2

Use the register-machine language
to describe the iterative factorial machine of Exercise 5.1.

#### Exercise 5.3

Design a machine to compute square
roots using Newton's method, as described in Sec.1.1.7,,1.1.7:

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">sqrt</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">good-enough?</span><span class="w"> </span><span class="n">guess</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="nb">&lt;</span><span class="w"> </span><span class="p">(</span><span class="nb">abs</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="p">(</span><span class="n">square</span><span class="w"> </span><span class="n">guess</span><span class="p">)</span><span class="w"> </span><span class="n">x</span><span class="p">))</span><span class="w"> </span><span class="mf">0.001</span><span class="p">))</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">improve</span><span class="w"> </span><span class="n">guess</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">average</span><span class="w"> </span><span class="n">guess</span><span class="w"> </span><span class="p">(</span><span class="nb">/</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">guess</span><span class="p">)))</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">sqrt-iter</span><span class="w"> </span><span class="n">guess</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">good-enough?</span><span class="w"> </span><span class="n">guess</span><span class="p">)</span>
<span class="w">        </span><span class="n">guess</span>
<span class="w">        </span><span class="p">(</span><span class="n">sqrt-iter</span><span class="w"> </span><span class="p">(</span><span class="n">improve</span><span class="w"> </span><span class="n">guess</span><span class="p">))))</span>
<span class="w">  </span><span class="p">(</span><span class="n">sqrt-iter</span><span class="w"> </span><span class="mf">1.0</span><span class="p">))</span>
</pre></div>

Begin by assuming that `good-enough?` and `improve` operations are
available as primitives.  Then show how to expand these in terms of arithmetic
operations.  Describe each version of the `sqrt` machine design by drawing
a data-path diagram and writing a controller definition in the register-machine
language.

#### Exercise 5.4

Specify register machines that
implement each of the following procedures.  For each machine, write a
controller instruction sequence and draw a diagram showing the data paths.

**1.** Recursive exponentiation:

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">expt</span><span class="w"> </span><span class="n">b</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span>
<span class="w">      </span><span class="mi">1</span>
<span class="w">      </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">b</span><span class="w"> </span><span class="p">(</span><span class="nb">expt</span><span class="w"> </span><span class="n">b</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">)))))</span>
</pre></div>

**2.** Iterative exponentiation:

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">expt</span><span class="w"> </span><span class="n">b</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">expt-iter</span><span class="w"> </span><span class="n">counter</span><span class="w"> </span><span class="n">product</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="n">counter</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span>
<span class="w">        </span><span class="n">product</span>
<span class="w">        </span><span class="p">(</span><span class="n">expt-iter</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">counter</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span>
<span class="w">                   </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">b</span><span class="w"> </span><span class="n">product</span><span class="p">))))</span>
<span class="w">  </span><span class="p">(</span><span class="n">expt-iter</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">))</span>
</pre></div>



#### Exercise 5.5

Hand-simulate the factorial and
Fibonacci machines, using some nontrivial input (requiring execution of at
least one recursive call).  Show the contents of the stack at each significant
point in the execution.

#### Exercise 5.6

Ben Bitdiddle observes that the
Fibonacci machine's controller sequence has an extra `save` and an extra
`restore`, which can be removed to make a faster machine.  Where are these
instructions?


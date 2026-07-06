---
layout: sicp
render_with_liquid: false
title: SICP Chapter 5.3
---

<div class="nav">
    <span class="activenav"><a href="notes-ch5-2.html">← Previous</a></span>
    <span class="activenav"><a href="../index.html">↑ Up</a></span>
    <span class="activenav"><a href="notes-ch5-4.html">Next →</a></span>
</div>

[HTML Book Chapter 5.3 Link](https://sarabander.github.io/sicp/html/5_002e3.xhtml#g_t5_002e3)

## Directory
- [Section 5.3](#section-53)
  - [Notes](#notes)
  - [Exercises](#exercises)
    - *Exercises:* ([Exercise 5.20](#exercise-520), [Exercise 5.21](#exercise-521), [Exercise 5.22](#exercise-522))

## Section 5.3

### Notes

### Exercises

#### Exercise 5.20

Draw the box-and-pointer
representation and the memory-vector representation (as in Figure 5.14)
of the list structure produced by

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">2</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">y</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
</pre></div>


with the `free` pointer initially `p1`.  What is the final value of
`free`?  What pointers represent the values of `x` and `y`?

##### Solution

#### Exercise 5.21

Implement register machines for
the following procedures.  Assume that the list-structure memory operations are
available as machine primitives.

**1.** Recursive `count-leaves`:

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">count-leaves</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">null?</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="nb">pair?</span><span class="w"> </span><span class="n">tree</span><span class="p">))</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span>
<span class="w">         </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="p">(</span><span class="n">count-leaves</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">tree</span><span class="p">))</span>
<span class="w">            </span><span class="p">(</span><span class="n">count-leaves</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">tree</span><span class="p">))))))</span>
</pre></div>

**2.** Recursive `count-leaves` with explicit counter:

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">count-leaves</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">count-iter</span><span class="w"> </span><span class="n">tree</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">null?</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">          </span><span class="p">((</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="nb">pair?</span><span class="w"> </span><span class="n">tree</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">))</span>
<span class="w">          </span><span class="p">(</span><span class="k">else</span><span class="w"> </span>
<span class="w">           </span><span class="p">(</span><span class="n">count-iter</span><span class="w"> </span>
<span class="w">            </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span>
<span class="w">            </span><span class="p">(</span><span class="n">count-iter</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span><span class="w"> </span>
<span class="w">                        </span><span class="n">n</span><span class="p">)))))</span>
<span class="w">  </span><span class="p">(</span><span class="n">count-iter</span><span class="w"> </span><span class="n">tree</span><span class="w"> </span><span class="mi">0</span><span class="p">))</span>
</pre></div>



##### Solution

#### Exercise 5.22

Exercise 3.12 of 
3.3.1 presented an `append` procedure that appends two lists to form
a new list and an `append!` procedure that splices two lists together.
Design a register machine to implement each of these procedures.  Assume that
the list-structure memory operations are available as primitive operations.

##### Solution


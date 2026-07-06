---
layout: sicp
render_with_liquid: false
show_title: false
title: Building the Query System from the Ground Up
---


## Directory
- [Building the Query System from the Ground Up](#building-the-query-system-from-the-ground-up)
- [1. The Database System](#1-the-database-system)
  - [1.1 Frames](#11-frames)
  - [1.2. Simple Pattern Matching](#12-simple-pattern-matching)
  - [1.3. Building the database](#13-building-the-database)
  - [1.4. Input-output-driver for simple queries](#14-input-output-driver-for-simple-queries)
  - [1.5. Input-output-driver for compound queries](#15-input-output-driver-for-compound-queries)
- [2. Rules and Unification](#2-rules-and-unification)
  - [2.1 Unification (Extending Simple Pattern Matching)](#21-unification-extending-simple-pattern-matching)
- [My Misconceptions](#my-misconceptions)
- ["The output of a Query"](#the-output-of-a-query)

# Building the Query System from the Ground Up

I found section 4-4 incredibly difficult to read. This section is my supplement
to 4-4. Instead of taking the approach of describing the abstract ideas up-front
and leaving the concrete code to the end of the chapter, I instead try to 
make everything concrete from the get-go and build systems from scratch.

Still a WIP. But I imagine that what I'll have to do is that some pieces of 
the system will be fully-featured or are verbatim what is in the book. 
At other times it might make sense to build systems which are less general or
fail at certain edge cases. So hopefully I can make it clear which code blocks
are flawed or not fully featured.

I think it's natural to divide this into two sections: First, we cover the 
construction of a database system that handles simple and compound queries,
with `and` and `or`. After this, we deal with the topic of rules and
unification.

## 1. The Database System

### 1.1 Frames

A *frame* is an association list with keys `'(? variable)` and values 
representing the bound value of the variable. For example in the process
of matching the query `'(a b ?x)` to datum `'(a b c)`, 
we generate the frame `'(((? x) . c))`. Note that the symbol `?x` is expanded
into `'(? x)` by the procedures in `expand-question-mark` and `query-syntax-process` (4.4.4.7).

Running some examples (with the code in 4.4.4.8), we can get a feel for how things work. We define two frames by extending the empty frame `'()`.

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">frame1</span><span class="w"> </span><span class="p">(</span><span class="n">extend</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">?</span><span class="w"> </span><span class="ss">x</span><span class="p">)</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">a</span><span class="w"> </span><span class="o">&#39;</span><span class="p">()))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">frame2</span><span class="w"> </span><span class="p">(</span><span class="n">extend</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">?</span><span class="w"> </span><span class="ss">y</span><span class="p">)</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">b</span><span class="w"> </span><span class="n">frame1</span><span class="p">))</span>
</pre></div>

Looking up behaves as expected:

<div class="codehilite"><pre><span></span><span class="n">frame2</span>
<span class="c1">;; (((? y) . b) ((? x) . a))</span>

<span class="p">(</span><span class="n">binding-in-frame</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">?</span><span class="w"> </span><span class="ss">x</span><span class="p">)</span><span class="w"> </span><span class="n">frame2</span><span class="p">)</span>
<span class="c1">;; ((? x) . a)</span>

<span class="p">(</span><span class="n">binding-in-frame</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">?</span><span class="w"> </span><span class="ss">y</span><span class="p">)</span><span class="w"> </span><span class="n">frame2</span><span class="p">)</span>
<span class="c1">;; ((? y) . b)</span>
</pre></div>

and we note that we haven't done anything special to prevent inconsistent frame extensions! This has to be checked for elsewhere.
<div class="codehilite"><pre><span></span><span class="p">(</span><span class="n">extend</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">?</span><span class="w"> </span><span class="ss">x</span><span class="p">)</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">b</span><span class="w"> </span><span class="n">frame2</span><span class="p">)</span>
<span class="c1">;; (((? x) . b) ((? y) . b) ((? x) . a))</span>
</pre></div>

Note that extending a frame makes things *more* specific, because we specify
that the placeholder `'?x` has to be bound to a specific value. This means that
later on, the `and` operator will have a simple implementation because each
time we extend the frame in all possible ways we add more conditions on 
what matches we'll accept.

<div class="code-box" markdown="1">
<details class="collapsible-code">
<summary class="code-summary"><a href="code/4-4-simple-frame.rkt">code/4-4-simple-frame.rkt</a> <span class="expand-hint">(click to expand)</span></summary>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="c1">;ch2 assoc</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">assoc</span><span class="w"> </span><span class="n">key</span><span class="w"> </span><span class="n">records</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">null?</span><span class="w"> </span><span class="n">records</span><span class="p">)</span><span class="w"> </span><span class="no">#f</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="nb">equal?</span><span class="w"> </span><span class="n">key</span><span class="w"> </span><span class="p">(</span><span class="nb">caar</span><span class="w"> </span><span class="n">records</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">records</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">assoc</span><span class="w"> </span><span class="n">key</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">records</span><span class="p">)))))</span>

<span class="c1">;4.4.4.8 definitions</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-binding</span><span class="w"> </span><span class="n">variable</span><span class="w"> </span><span class="n">value</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">variable</span><span class="w"> </span><span class="n">value</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">binding-variable</span><span class="w"> </span><span class="n">binding</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">binding</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">binding-value</span><span class="w"> </span><span class="n">binding</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">binding</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">binding-in-frame</span><span class="w"> </span><span class="n">variable</span><span class="w"> </span><span class="n">frame</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">assoc</span><span class="w"> </span><span class="n">variable</span><span class="w"> </span><span class="n">frame</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">extend</span><span class="w"> </span><span class="n">variable</span><span class="w"> </span><span class="n">value</span><span class="w"> </span><span class="n">frame</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="p">(</span><span class="n">make-binding</span><span class="w"> </span><span class="n">variable</span><span class="w"> </span><span class="n">value</span><span class="p">)</span><span class="w"> </span><span class="n">frame</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">frame1</span><span class="w"> </span><span class="p">(</span><span class="n">extend</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">?</span><span class="w"> </span><span class="ss">x</span><span class="p">)</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">a</span><span class="w"> </span><span class="o">&#39;</span><span class="p">()))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">frame2</span><span class="w"> </span><span class="p">(</span><span class="n">extend</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">?</span><span class="w"> </span><span class="ss">y</span><span class="p">)</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">b</span><span class="w"> </span><span class="n">frame1</span><span class="p">))</span>

<span class="n">frame2</span>

<span class="p">(</span><span class="n">binding-in-frame</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">?</span><span class="w"> </span><span class="ss">x</span><span class="p">)</span><span class="w"> </span><span class="n">frame2</span><span class="p">)</span>

<span class="p">(</span><span class="n">binding-in-frame</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">?</span><span class="w"> </span><span class="ss">y</span><span class="p">)</span><span class="w"> </span><span class="n">frame2</span><span class="p">)</span>

<span class="p">(</span><span class="n">extend</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">?</span><span class="w"> </span><span class="ss">x</span><span class="p">)</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">b</span><span class="w"> </span><span class="n">frame2</span><span class="p">)</span>
</pre></div>

</details>
<div class="code-output">
<span>Output:</span>
<pre>(((? y) . b) ((? x) . a))
((? x) . a)
((? y) . b)
(((? x) . b) ((? y) . b) ((? x) . a))
</pre>
</div>
</div>


### 1.2. Simple Pattern Matching

Next we consider the simple pattern matching algorithm. 
"Simple" means that we don't handle
`and`, `or`, `not`, or `'lisp-value` yet.

Our function `pattern-match` is going to take three arguments:
`pat`, `dat` and `frame` and is going to traverse the whole datum `dat` recursively. If we can satisfy the given pattern, then we'll return the correct frame extension. For example:
<div class="codehilite"><pre><span></span><span class="p">(</span><span class="n">pattern-match</span><span class="w"> </span><span class="o">&#39;</span><span class="p">((</span><span class="ss">?</span><span class="w"> </span><span class="ss">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">?</span><span class="w"> </span><span class="ss">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">?</span><span class="w"> </span><span class="ss">y</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">?</span><span class="w"> </span><span class="ss">y</span><span class="p">))</span>
<span class="w">               </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">foo</span><span class="w"> </span><span class="ss">foo</span><span class="w"> </span><span class="ss">bar</span><span class="w"> </span><span class="ss">bar</span><span class="p">)</span>
<span class="w">               </span><span class="o">&#39;</span><span class="p">(((</span><span class="ss">?</span><span class="w"> </span><span class="ss">x</span><span class="p">)</span><span class="w"> </span><span class="o">.</span><span class="w"> </span><span class="ss">foo</span><span class="p">)))</span>
<span class="c1">;; (((? y) . bar) ((? x) . foo))</span>

<span class="p">(</span><span class="n">pattern-match</span><span class="w"> </span><span class="o">&#39;</span><span class="p">((</span><span class="ss">?</span><span class="w"> </span><span class="ss">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">?</span><span class="w"> </span><span class="ss">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">?</span><span class="w"> </span><span class="ss">y</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">?</span><span class="w"> </span><span class="ss">y</span><span class="p">))</span>
<span class="w">               </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">bar</span><span class="w"> </span><span class="ss">bar</span><span class="w"> </span><span class="ss">bar</span><span class="w"> </span><span class="ss">bar</span><span class="p">)</span>
<span class="w">               </span><span class="o">&#39;</span><span class="p">(((</span><span class="ss">?</span><span class="w"> </span><span class="ss">x</span><span class="p">)</span><span class="w"> </span><span class="o">.</span><span class="w"> </span><span class="ss">foo</span><span class="p">)))</span>
<span class="c1">;; &#39;failed</span>
</pre></div>

<div class="code-box" markdown="1">
<details class="collapsible-code">
<summary class="code-summary"><a href="code/4-4-simple-pattern-match.rkt">code/4-4-simple-pattern-match.rkt</a> <span class="expand-hint">(click to expand)</span></summary>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">tagged-list?</span><span class="w"> </span><span class="nb">exp</span><span class="w"> </span><span class="k">tag</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">pair?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">eq?</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="k">tag</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">var?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">tagged-list?</span><span class="w"> </span><span class="nb">exp</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">?</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">pattern-match</span><span class="w"> </span><span class="n">pat</span><span class="w"> </span><span class="n">dat</span><span class="w"> </span><span class="n">frame</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">frame</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">failed</span><span class="p">)</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">failed</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="nb">equal?</span><span class="w"> </span><span class="n">pat</span><span class="w"> </span><span class="n">dat</span><span class="p">)</span><span class="w"> </span><span class="n">frame</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="n">var?</span><span class="w"> </span><span class="n">pat</span><span class="p">)</span><span class="w"> </span>
<span class="w">         </span><span class="p">(</span><span class="n">extend-if-consistent</span><span class="w"> </span>
<span class="w">          </span><span class="n">pat</span><span class="w"> </span><span class="n">dat</span><span class="w"> </span><span class="n">frame</span><span class="p">))</span>
<span class="w">        </span><span class="p">((</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">pair?</span><span class="w"> </span><span class="n">pat</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">pair?</span><span class="w"> </span><span class="n">dat</span><span class="p">))</span>
<span class="w">         </span><span class="p">(</span><span class="n">pattern-match</span><span class="w"> </span>
<span class="w">          </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">pat</span><span class="p">)</span><span class="w"> </span>
<span class="w">          </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">dat</span><span class="p">)</span>
<span class="w">          </span><span class="p">(</span><span class="n">pattern-match</span>
<span class="w">           </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">pat</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">dat</span><span class="p">)</span><span class="w"> </span><span class="n">frame</span><span class="p">)))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">failed</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">extend-if-consistent</span><span class="w"> </span><span class="n">var</span><span class="w"> </span><span class="n">dat</span><span class="w"> </span><span class="n">frame</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">binding</span><span class="w"> </span><span class="p">(</span><span class="n">binding-in-frame</span><span class="w"> </span><span class="n">var</span><span class="w"> </span><span class="n">frame</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="n">binding</span>
<span class="w">        </span><span class="p">(</span><span class="n">pattern-match</span><span class="w"> </span>
<span class="w">         </span><span class="p">(</span><span class="n">binding-value</span><span class="w"> </span><span class="n">binding</span><span class="p">)</span><span class="w"> </span><span class="n">dat</span><span class="w"> </span><span class="n">frame</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="n">extend</span><span class="w"> </span><span class="n">var</span><span class="w"> </span><span class="n">dat</span><span class="w"> </span><span class="n">frame</span><span class="p">))))</span>
<span class="c1">;ch2 assoc</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">assoc</span><span class="w"> </span><span class="n">key</span><span class="w"> </span><span class="n">records</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">null?</span><span class="w"> </span><span class="n">records</span><span class="p">)</span><span class="w"> </span><span class="no">#f</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="nb">equal?</span><span class="w"> </span><span class="n">key</span><span class="w"> </span><span class="p">(</span><span class="nb">caar</span><span class="w"> </span><span class="n">records</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">records</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">assoc</span><span class="w"> </span><span class="n">key</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">records</span><span class="p">)))))</span>

<span class="c1">;4.4.4.8 definitions</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-binding</span><span class="w"> </span><span class="n">variable</span><span class="w"> </span><span class="n">value</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">variable</span><span class="w"> </span><span class="n">value</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">binding-variable</span><span class="w"> </span><span class="n">binding</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">binding</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">binding-value</span><span class="w"> </span><span class="n">binding</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">binding</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">binding-in-frame</span><span class="w"> </span><span class="n">variable</span><span class="w"> </span><span class="n">frame</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">assoc</span><span class="w"> </span><span class="n">variable</span><span class="w"> </span><span class="n">frame</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">extend</span><span class="w"> </span><span class="n">variable</span><span class="w"> </span><span class="n">value</span><span class="w"> </span><span class="n">frame</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="p">(</span><span class="n">make-binding</span><span class="w"> </span><span class="n">variable</span><span class="w"> </span><span class="n">value</span><span class="p">)</span><span class="w"> </span><span class="n">frame</span><span class="p">))</span>

<span class="p">(</span><span class="n">pattern-match</span><span class="w"> </span><span class="o">&#39;</span><span class="p">((</span><span class="ss">?</span><span class="w"> </span><span class="ss">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">?</span><span class="w"> </span><span class="ss">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">?</span><span class="w"> </span><span class="ss">y</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">?</span><span class="w"> </span><span class="ss">y</span><span class="p">))</span>
<span class="w">               </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">foo</span><span class="w"> </span><span class="ss">foo</span><span class="w"> </span><span class="ss">bar</span><span class="w"> </span><span class="ss">bar</span><span class="p">)</span>
<span class="w">               </span><span class="o">&#39;</span><span class="p">(((</span><span class="ss">?</span><span class="w"> </span><span class="ss">x</span><span class="p">)</span><span class="w"> </span><span class="o">.</span><span class="w"> </span><span class="ss">foo</span><span class="p">)))</span>
<span class="p">(</span><span class="n">pattern-match</span><span class="w"> </span><span class="o">&#39;</span><span class="p">((</span><span class="ss">?</span><span class="w"> </span><span class="ss">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">?</span><span class="w"> </span><span class="ss">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">?</span><span class="w"> </span><span class="ss">y</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">?</span><span class="w"> </span><span class="ss">y</span><span class="p">))</span>
<span class="w">               </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">bar</span><span class="w"> </span><span class="ss">bar</span><span class="w"> </span><span class="ss">bar</span><span class="w"> </span><span class="ss">bar</span><span class="p">)</span>
<span class="w">               </span><span class="o">&#39;</span><span class="p">(((</span><span class="ss">?</span><span class="w"> </span><span class="ss">x</span><span class="p">)</span><span class="w"> </span><span class="o">.</span><span class="w"> </span><span class="ss">foo</span><span class="p">)))</span>
</pre></div>

</details>
<div class="code-output">
<span>Output:</span>
<pre>(((? y) . bar) ((? x) . foo))
failed
</pre>
</div>
</div>


The implementation is fairly straightforward.
`pattern-match` and `extend-if-consistent` are functions which call each other. 
`extend-if-consistent` is a helper function which actually does the symbol lookup and the 
extension to the frame. In order to determine if the pattern matching has failed or not, it calls 
`extend-if-consistent` with the pattern found by substitution from the database. 

To test understanding, I recommend trying to remember what the missing pattern `<...>` should be in the following code
snippet.

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">tagged-list?</span><span class="w"> </span><span class="nb">exp</span><span class="w"> </span><span class="k">tag</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">pair?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">eq?</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="k">tag</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">var?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">tagged-list?</span><span class="w"> </span><span class="nb">exp</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">?</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">pattern-match</span><span class="w"> </span><span class="n">pat</span><span class="w"> </span><span class="n">dat</span><span class="w"> </span><span class="n">frame</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">frame</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">failed</span><span class="p">)</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">failed</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="nb">equal?</span><span class="w"> </span><span class="n">pat</span><span class="w"> </span><span class="n">dat</span><span class="p">)</span><span class="w"> </span><span class="n">frame</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="n">var?</span><span class="w"> </span><span class="n">pat</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">extend-if-consistent</span><span class="w"> </span><span class="n">pat</span><span class="w"> </span><span class="n">dat</span><span class="w"> </span><span class="n">frame</span><span class="p">))</span>
<span class="w">        </span><span class="p">((</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">pair?</span><span class="w"> </span><span class="n">pat</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">pair?</span><span class="w"> </span><span class="n">dat</span><span class="p">))</span>
<span class="w">         </span><span class="p">(</span><span class="n">pattern-match</span><span class="w"> </span><span class="n">&lt;...&gt;</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">failed</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">extend-if-consistent</span><span class="w"> </span><span class="n">var</span><span class="w"> </span><span class="n">dat</span><span class="w"> </span><span class="n">frame</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">binding</span><span class="w"> </span><span class="p">(</span><span class="n">binding-in-frame</span><span class="w"> </span><span class="n">var</span><span class="w"> </span><span class="n">frame</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="n">binding</span>
<span class="w">        </span><span class="p">(</span><span class="n">pattern-match</span><span class="w"> </span>
<span class="w">         </span><span class="p">(</span><span class="n">binding-value</span><span class="w"> </span><span class="n">binding</span><span class="p">)</span><span class="w"> </span><span class="n">dat</span><span class="w"> </span><span class="n">frame</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="n">extend</span><span class="w"> </span><span class="n">var</span><span class="w"> </span><span class="n">dat</span><span class="w"> </span><span class="n">frame</span><span class="p">))))</span>
</pre></div>

**One weird thing:** I notice that in `extend-if-consistent`, we call pattern-match using a pattern which is the 
result of substituting user data. This means if our database contains malicious patterns like `'(? new-rule)` 
then we would start running checks based on user-provided rules! This is super funky, but whatever.

### 1.3. Building the database

For this section, we need to mash together code from section 4.4.4.3, 4.4.4.5, and 4.4.4.8. 
However, it's really all just bookkeeping. 

The new stuff is in 4.4.4.5. The book discusses that the indexing trick
is just so that if we have a pattern `(job ?a ?b)` this is never even 
checked against queries of the form `(address ?a ?b)`. 
It takes a lot of helper functions to make this easy, and in the code example below
I included all of the bookkeeping for the `rule` code even though it is not used.

Section 4.4.4.4 is skipped because it is not needed for simple or compound queries, or for database
construction or traversal. 

Finally, we already discussed the meat of section 4.4.4.3, `extend-if-consistent` and `pattern-match`. 
Two more bookkeeping functions are added here: 
`check-an-assertion` just wraps `pattern-match` so that it returns a singleton stream or the empty stream;
`find-assertions` just maps this across the database.

So, we define all of this code, we add a whole bunch of assertions...

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">build-database</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">begin</span><span class="w"> </span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">address</span><span class="w"> </span><span class="p">(</span><span class="ss">Bitdiddle</span><span class="w"> </span><span class="ss">Ben</span><span class="p">)</span>
<span class="w">                              </span><span class="p">(</span><span class="ss">Slumerville</span><span class="w"> </span><span class="p">(</span><span class="ss">Ridge</span><span class="w"> </span><span class="ss">Road</span><span class="p">)</span><span class="w"> </span><span class="mi">10</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">job</span><span class="w"> </span><span class="p">(</span><span class="ss">Bitdiddle</span><span class="w"> </span><span class="ss">Ben</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">computer</span><span class="w"> </span><span class="ss">wizard</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">salary</span><span class="w"> </span><span class="p">(</span><span class="ss">Bitdiddle</span><span class="w"> </span><span class="ss">Ben</span><span class="p">)</span><span class="w"> </span><span class="mi">60000</span><span class="p">))</span>
<span class="w">    </span><span class="k">...</span><span class="w"> </span><span class="p">))</span>
</pre></div>

And finally, we run the code. Let's take the examples in exercise 4.55, and keep in mind that
the outputs are not going to be what is referred to as the "instantiated" query, we are just 
outputting the relevant list of frames. Also, keep in mind that we have to expand the symbols
`'?x` to the tagged list `'(? x)` by hand, since this is what our system expects.

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="n">build-database</span><span class="p">)</span>
<span class="c1">;; &#39;ok</span>

<span class="p">(</span><span class="n">display-stream</span>
<span class="w">  </span><span class="p">(</span><span class="n">find-assertions</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">supervisor</span><span class="w"> </span><span class="p">(</span><span class="ss">?</span><span class="w"> </span><span class="ss">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">Bitdiddle</span><span class="w"> </span><span class="ss">Ben</span><span class="p">))</span><span class="w"> </span><span class="o">&#39;</span><span class="p">()))</span>
<span class="c1">;; (((? x) Tweakit Lem E))</span>
<span class="c1">;; (((? x) Fect Cy D))</span>
<span class="c1">;; (((? x) Hacker Alyssa P))</span>

<span class="p">(</span><span class="n">display-stream</span>
<span class="w">  </span><span class="p">(</span><span class="n">find-assertions</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">job</span><span class="w"> </span><span class="p">(</span><span class="ss">?</span><span class="w"> </span><span class="ss">name</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">accounting</span><span class="w"> </span><span class="o">.</span><span class="w"> </span><span class="p">(</span><span class="ss">?</span><span class="w"> </span><span class="ss">type</span><span class="p">)))</span><span class="w"> </span><span class="o">&#39;</span><span class="p">()))</span>
<span class="c1">;; (((? type) scrivener) ((? name) Cratchet Robert))</span>
<span class="c1">;; (((? type) chief accountant) ((? name) Scrooge Eben))</span>

<span class="p">(</span><span class="n">display-stream</span>
<span class="w">  </span><span class="p">(</span><span class="n">find-assertions</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">address</span><span class="w"> </span><span class="p">(</span><span class="ss">?</span><span class="w"> </span><span class="ss">name</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">Slumerville</span><span class="w"> </span><span class="o">.</span><span class="w"> </span><span class="p">(</span><span class="ss">?</span><span class="w"> </span><span class="ss">address</span><span class="p">)))</span><span class="w"> </span><span class="o">&#39;</span><span class="p">()))</span>
<span class="c1">;; (((? address) (Onion Square) 5) ((? name) Aull DeWitt))</span>
<span class="c1">;; (((? address) (Pine Tree Road) 80) ((? name) Reasoner Louis))</span>
<span class="c1">;; (((? address) (Ridge Road) 10) ((? name) Bitdiddle Ben))</span>
</pre></div>

<div class="code-box" markdown="1">
<details class="collapsible-code">
<summary class="code-summary"><a href="code/4-4-simple-database.rkt">code/4-4-simple-database.rkt</a> <span class="expand-hint">(click to expand)</span></summary>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="c1">;; ===================================================================</span>
<span class="c1">;; =========================== ch2 Tools =============================</span>
<span class="c1">;; ===================================================================</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">operation-table</span><span class="w"> </span><span class="o">&#39;</span><span class="p">())</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">assoc</span><span class="w"> </span><span class="n">key</span><span class="w"> </span><span class="n">records</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">null?</span><span class="w"> </span><span class="n">records</span><span class="p">)</span><span class="w"> </span><span class="no">#f</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="nb">equal?</span><span class="w"> </span><span class="n">key</span><span class="w"> </span><span class="p">(</span><span class="nb">caar</span><span class="w"> </span><span class="n">records</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">records</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">assoc</span><span class="w"> </span><span class="n">key</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">records</span><span class="p">)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">assoc-op</span><span class="w"> </span><span class="n">key</span><span class="w"> </span><span class="n">records</span><span class="p">)</span>
<span class="w">   </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">null?</span><span class="w"> </span><span class="n">records</span><span class="p">)</span><span class="w"> </span><span class="no">#f</span><span class="p">)</span>
<span class="w">         </span><span class="p">((</span><span class="nb">equal?</span><span class="w"> </span><span class="n">key</span><span class="w"> </span><span class="p">(</span><span class="nb">caar</span><span class="w"> </span><span class="n">records</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">records</span><span class="p">))</span>
<span class="w">         </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="n">assoc-op</span><span class="w"> </span><span class="n">key</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">records</span><span class="p">)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">put</span><span class="w"> </span><span class="n">op</span><span class="w"> </span><span class="n">type-tags</span><span class="w"> </span><span class="n">proc</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">op-list-entry</span><span class="w"> </span><span class="p">(</span><span class="n">assoc-op</span><span class="w"> </span><span class="n">op</span><span class="w"> </span><span class="n">operation-table</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="n">op-list-entry</span>
<span class="w">        </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">proc-list</span><span class="w"> </span><span class="p">(</span><span class="nb">cadr</span><span class="w"> </span><span class="n">op-list-entry</span><span class="p">)))</span>
<span class="w">           </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">proc-pair-entry</span><span class="w"> </span><span class="p">(</span><span class="nb">assoc</span><span class="w"> </span><span class="n">type-tags</span><span class="w"> </span><span class="n">proc-list</span><span class="p">)))</span>
<span class="w">             </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="n">proc-pair-entry</span>
<span class="w">                 </span><span class="p">(</span><span class="n">set-cdr!</span><span class="w"> </span><span class="n">proc-pair-entry</span><span class="w"> </span><span class="n">proc</span><span class="p">)</span>
<span class="w">                 </span><span class="p">(</span><span class="n">set-car!</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">op-list-entry</span><span class="p">)</span>
<span class="w">                           </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">type-tags</span><span class="w"> </span><span class="n">proc</span><span class="p">)</span><span class="w"> </span><span class="n">proc-list</span><span class="p">)))))</span>
<span class="w">        </span><span class="p">(</span><span class="k">set!</span><span class="w"> </span><span class="n">operation-table</span>
<span class="w">              </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="n">op</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">type-tags</span><span class="w"> </span><span class="n">proc</span><span class="p">)))</span>
<span class="w">                    </span><span class="n">operation-table</span><span class="p">)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">get</span><span class="w"> </span><span class="n">op</span><span class="w"> </span><span class="n">type-tags</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">op-list-entry</span><span class="w"> </span><span class="p">(</span><span class="n">assoc-op</span><span class="w"> </span><span class="n">op</span><span class="w"> </span><span class="n">operation-table</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="n">op-list-entry</span>
<span class="w">        </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">proc-list</span><span class="w"> </span><span class="p">(</span><span class="nb">cadr</span><span class="w"> </span><span class="n">op-list-entry</span><span class="p">)))</span>
<span class="w">          </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">proc-pair-entry</span><span class="w"> </span><span class="p">(</span><span class="nb">assoc</span><span class="w"> </span><span class="n">type-tags</span><span class="w"> </span><span class="n">proc-list</span><span class="p">)))</span>
<span class="w">            </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="n">proc-pair-entry</span>
<span class="w">                </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">proc-pair-entry</span><span class="p">)</span>
<span class="w">                </span><span class="no">#f</span><span class="p">)))</span>
<span class="w">        </span><span class="no">#f</span><span class="p">)))</span>

<span class="c1">;; ===================================================================</span>
<span class="c1">;; =================== ch3 (stream) Tools ============================</span>
<span class="c1">;; ===================================================================</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="k">stream</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">force</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="o">.</span><span class="w"> </span><span class="n">argstreams</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))</span>
<span class="w">      </span><span class="n">the-empty-stream</span>
<span class="w">      </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">       </span><span class="p">(</span><span class="nb">apply</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="n">stream-car</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))</span>
<span class="w">       </span><span class="p">(</span><span class="nb">apply</span><span class="w"> </span><span class="nb">stream-map</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-append</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span>
<span class="w">      </span><span class="n">s2</span>
<span class="w">      </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">       </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span>
<span class="w">       </span><span class="p">(</span><span class="nb">stream-append</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span><span class="w"> </span><span class="n">s2</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-append-delayed</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">delayed-s2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="nb">force</span><span class="w"> </span><span class="n">delayed-s2</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">       </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span>
<span class="w">       </span><span class="p">(</span><span class="n">stream-append-delayed</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span>
<span class="w">                              </span><span class="n">delayed-s2</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">interleave-delayed</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">delayed-s2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="nb">force</span><span class="w"> </span><span class="n">delayed-s2</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">       </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span>
<span class="w">       </span><span class="p">(</span><span class="n">interleave-delayed</span>
<span class="w">        </span><span class="p">(</span><span class="nb">force</span><span class="w"> </span><span class="n">delayed-s2</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="k">delay</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s1</span><span class="p">))))))</span>

<span class="c1">; singleton-stream</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">singleton-stream</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">the-empty-stream</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-for-each</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="n">s</span><span class="p">))</span>
<span class="w">      </span><span class="p">(</span><span class="k">begin</span>
<span class="w">        </span><span class="p">(</span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="nb">stream-for-each</span><span class="w"> </span><span class="n">proc</span>
<span class="w">                         </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">display-stream</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-for-each</span><span class="w"> </span><span class="n">display-line</span><span class="w"> </span><span class="n">s</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>


<span class="c1">; stream-flatmap</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-flatmap</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">flatten-stream</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="n">s</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">flatten-stream</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span>
<span class="w">      </span><span class="n">the-empty-stream</span>
<span class="w">      </span><span class="p">(</span><span class="n">interleave-delayed</span>
<span class="w">       </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span>
<span class="w">       </span><span class="p">(</span><span class="k">delay</span><span class="w"> </span><span class="p">(</span><span class="n">flatten-stream</span>
<span class="w">               </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">))))))</span>
<span class="c1">;; ===================================================================</span>
<span class="c1">;; ========================= ch4 Stuff ===============================</span>
<span class="c1">;; ===================================================================</span>

<span class="c1">; =============== 4.4.4.8</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-binding</span><span class="w"> </span><span class="n">variable</span><span class="w"> </span><span class="n">value</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">variable</span><span class="w"> </span><span class="n">value</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">binding-variable</span><span class="w"> </span><span class="n">binding</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">binding</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">binding-value</span><span class="w"> </span><span class="n">binding</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">binding</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">binding-in-frame</span><span class="w"> </span><span class="n">variable</span><span class="w"> </span><span class="n">frame</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">assoc</span><span class="w"> </span><span class="n">variable</span><span class="w"> </span><span class="n">frame</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">extend</span><span class="w"> </span><span class="n">variable</span><span class="w"> </span><span class="n">value</span><span class="w"> </span><span class="n">frame</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="p">(</span><span class="n">make-binding</span><span class="w"> </span><span class="n">variable</span><span class="w"> </span><span class="n">value</span><span class="p">)</span><span class="w"> </span><span class="n">frame</span><span class="p">))</span>

<span class="c1">; =============== 4.4.4.5</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">THE-ASSERTIONS</span><span class="w"> </span><span class="n">the-empty-stream</span><span class="p">)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">fetch-assertions</span><span class="w"> </span><span class="n">pattern</span><span class="w"> </span><span class="n">frame</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">use-index?</span><span class="w"> </span><span class="n">pattern</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="n">get-indexed-assertions</span><span class="w"> </span><span class="n">pattern</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="n">get-all-assertions</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">get-all-assertions</span><span class="p">)</span><span class="w"> </span><span class="n">THE-ASSERTIONS</span><span class="p">)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">get-indexed-assertions</span><span class="w"> </span><span class="n">pattern</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">get-stream</span><span class="w"> </span><span class="p">(</span><span class="n">index-key-of</span><span class="w"> </span><span class="n">pattern</span><span class="p">)</span>
<span class="w">              </span><span class="o">&#39;</span><span class="ss">assertion-stream</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">get-stream</span><span class="w"> </span><span class="n">key1</span><span class="w"> </span><span class="n">key2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">s</span><span class="w"> </span><span class="p">(</span><span class="n">get</span><span class="w"> </span><span class="n">key1</span><span class="w"> </span><span class="n">key2</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">the-empty-stream</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">THE-RULES</span><span class="w"> </span><span class="n">the-empty-stream</span><span class="p">)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">fetch-rules</span><span class="w"> </span><span class="n">pattern</span><span class="w"> </span><span class="n">frame</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">use-index?</span><span class="w"> </span><span class="n">pattern</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="n">get-indexed-rules</span><span class="w"> </span><span class="n">pattern</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="n">get-all-rules</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">get-all-rules</span><span class="p">)</span><span class="w"> </span><span class="n">THE-RULES</span><span class="p">)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">get-indexed-rules</span><span class="w"> </span><span class="n">pattern</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-append</span>
<span class="w">   </span><span class="p">(</span><span class="n">get-stream</span><span class="w"> </span><span class="p">(</span><span class="n">index-key-of</span><span class="w"> </span><span class="n">pattern</span><span class="p">)</span>
<span class="w">               </span><span class="o">&#39;</span><span class="ss">rule-stream</span><span class="p">)</span>
<span class="w">   </span><span class="p">(</span><span class="n">get-stream</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">?</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">rule-stream</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">add-rule-or-assertion!</span><span class="w"> </span><span class="n">assertion</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">rule?</span><span class="w"> </span><span class="n">assertion</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="n">add-rule!</span><span class="w"> </span><span class="n">assertion</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="n">assertion</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="n">assertion</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">store-assertion-in-index</span><span class="w"> </span><span class="n">assertion</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">old-assertions</span><span class="w"> </span><span class="n">THE-ASSERTIONS</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="k">set!</span><span class="w"> </span><span class="n">THE-ASSERTIONS</span>
<span class="w">          </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="n">assertion</span><span class="w"> </span>
<span class="w">                       </span><span class="n">old-assertions</span><span class="p">))</span>
<span class="w">    </span><span class="o">&#39;</span><span class="ss">ok</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">add-rule!</span><span class="w"> </span><span class="n">rule</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">store-rule-in-index</span><span class="w"> </span><span class="n">rule</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">old-rules</span><span class="w"> </span><span class="n">THE-RULES</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="k">set!</span><span class="w"> </span><span class="n">THE-RULES</span>
<span class="w">          </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="n">rule</span><span class="w"> </span><span class="n">old-rules</span><span class="p">))</span>
<span class="w">    </span><span class="o">&#39;</span><span class="ss">ok</span><span class="p">))</span>


<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">store-assertion-in-index</span><span class="w"> </span><span class="n">assertion</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">indexable?</span><span class="w"> </span><span class="n">assertion</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">key</span><span class="w"> </span><span class="p">(</span><span class="n">index-key-of</span><span class="w"> </span><span class="n">assertion</span><span class="p">)))</span>
<span class="w">        </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">current-assertion-stream</span>
<span class="w">               </span><span class="p">(</span><span class="n">get-stream</span><span class="w"> </span>
<span class="w">                </span><span class="n">key</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">assertion-stream</span><span class="p">)))</span>
<span class="w">          </span><span class="p">(</span><span class="n">put</span><span class="w"> </span><span class="n">key</span>
<span class="w">               </span><span class="o">&#39;</span><span class="ss">assertion-stream</span>
<span class="w">               </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span>
<span class="w">                </span><span class="n">assertion</span>
<span class="w">                </span><span class="n">current-assertion-stream</span><span class="p">))))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">store-rule-in-index</span><span class="w"> </span><span class="n">rule</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">pattern</span><span class="w"> </span><span class="p">(</span><span class="n">conclusion</span><span class="w"> </span><span class="n">rule</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">indexable?</span><span class="w"> </span><span class="n">pattern</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">key</span><span class="w"> </span><span class="p">(</span><span class="n">index-key-of</span><span class="w"> </span><span class="n">pattern</span><span class="p">)))</span>
<span class="w">          </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">current-rule-stream</span>
<span class="w">                 </span><span class="p">(</span><span class="n">get-stream</span><span class="w"> </span>
<span class="w">                  </span><span class="n">key</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">rule-stream</span><span class="p">)))</span>
<span class="w">            </span><span class="p">(</span><span class="n">put</span><span class="w"> </span><span class="n">key</span>
<span class="w">                 </span><span class="o">&#39;</span><span class="ss">rule-stream</span>
<span class="w">                 </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span>
<span class="w">                  </span><span class="n">rule</span>
<span class="w">                  </span><span class="n">current-rule-stream</span><span class="p">)))))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">indexable?</span><span class="w"> </span><span class="n">pat</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">or</span><span class="w"> </span><span class="p">(</span><span class="n">constant-symbol?</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">pat</span><span class="p">))</span>
<span class="w">      </span><span class="p">(</span><span class="n">var?</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">pat</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">index-key-of</span><span class="w"> </span><span class="n">pat</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">key</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">pat</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">var?</span><span class="w"> </span><span class="n">key</span><span class="p">)</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">?</span><span class="w"> </span><span class="n">key</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">use-index?</span><span class="w"> </span><span class="n">pat</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">constant-symbol?</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">pat</span><span class="p">)))</span>

<span class="c1">; =============== 4.4.4.3 ================</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">find-assertions</span><span class="w"> </span><span class="n">pattern</span><span class="w"> </span><span class="n">frame</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">stream-flatmap</span>
<span class="w">    </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">datum</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="n">check-an-assertion</span><span class="w"> </span><span class="n">datum</span><span class="w"> </span><span class="n">pattern</span><span class="w"> </span><span class="n">frame</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="n">fetch-assertions</span><span class="w"> </span><span class="n">pattern</span><span class="w"> </span><span class="n">frame</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">check-an-assertion</span><span class="w"> </span>
<span class="w">         </span><span class="n">assertion</span><span class="w"> </span><span class="n">query-pat</span><span class="w"> </span><span class="n">query-frame</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">match-result</span>
<span class="w">         </span><span class="p">(</span><span class="n">pattern-match</span><span class="w"> </span>
<span class="w">          </span><span class="n">query-pat</span><span class="w"> </span><span class="n">assertion</span><span class="w"> </span><span class="n">query-frame</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">eq?</span><span class="w"> </span><span class="n">match-result</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">failed</span><span class="p">)</span>
<span class="w">        </span><span class="n">the-empty-stream</span>
<span class="w">        </span><span class="p">(</span><span class="n">singleton-stream</span><span class="w"> </span><span class="n">match-result</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">pattern-match</span><span class="w"> </span><span class="n">pat</span><span class="w"> </span><span class="n">dat</span><span class="w"> </span><span class="n">frame</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">frame</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">failed</span><span class="p">)</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">failed</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="nb">equal?</span><span class="w"> </span><span class="n">pat</span><span class="w"> </span><span class="n">dat</span><span class="p">)</span><span class="w"> </span><span class="n">frame</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="n">var?</span><span class="w"> </span><span class="n">pat</span><span class="p">)</span><span class="w"> </span>
<span class="w">         </span><span class="p">(</span><span class="n">extend-if-consistent</span><span class="w"> </span>
<span class="w">          </span><span class="n">pat</span><span class="w"> </span><span class="n">dat</span><span class="w"> </span><span class="n">frame</span><span class="p">))</span>
<span class="w">        </span><span class="p">((</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">pair?</span><span class="w"> </span><span class="n">pat</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">pair?</span><span class="w"> </span><span class="n">dat</span><span class="p">))</span>
<span class="w">         </span><span class="p">(</span><span class="n">pattern-match</span><span class="w"> </span>
<span class="w">          </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">pat</span><span class="p">)</span><span class="w"> </span>
<span class="w">          </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">dat</span><span class="p">)</span>
<span class="w">          </span><span class="p">(</span><span class="n">pattern-match</span>
<span class="w">           </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">pat</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">dat</span><span class="p">)</span><span class="w"> </span><span class="n">frame</span><span class="p">)))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">failed</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">extend-if-consistent</span><span class="w"> </span><span class="n">var</span><span class="w"> </span><span class="n">dat</span><span class="w"> </span><span class="n">frame</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">binding</span><span class="w"> </span><span class="p">(</span><span class="n">binding-in-frame</span><span class="w"> </span><span class="n">var</span><span class="w"> </span><span class="n">frame</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="n">binding</span>
<span class="w">        </span><span class="p">(</span><span class="n">pattern-match</span><span class="w"> </span>
<span class="w">         </span><span class="p">(</span><span class="n">binding-value</span><span class="w"> </span><span class="n">binding</span><span class="p">)</span><span class="w"> </span><span class="n">dat</span><span class="w"> </span><span class="n">frame</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="n">extend</span><span class="w"> </span><span class="n">var</span><span class="w"> </span><span class="n">dat</span><span class="w"> </span><span class="n">frame</span><span class="p">))))</span>

<span class="c1">;; Placeholders so the interpreter doesn&#39;t complain</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">rule?</span><span class="w"> </span><span class="n">statement</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">tagged-list?</span><span class="w"> </span><span class="n">statement</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">rule</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">conclusion</span><span class="w"> </span><span class="n">rule</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cadr</span><span class="w"> </span><span class="n">rule</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">var?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">tagged-list?</span><span class="w"> </span><span class="nb">exp</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">?</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">constant-symbol?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">symbol?</span><span class="w"> </span><span class="nb">exp</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">tagged-list?</span><span class="w"> </span><span class="nb">exp</span><span class="w"> </span><span class="k">tag</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">pair?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="nb">eq?</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="k">tag</span><span class="p">)</span>
<span class="w">      </span><span class="k">false</span><span class="p">))</span>

<span class="c1">;; Relevant Code</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">build-database</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">begin</span><span class="w"> </span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">address</span><span class="w"> </span><span class="p">(</span><span class="ss">Bitdiddle</span><span class="w"> </span><span class="ss">Ben</span><span class="p">)</span>
<span class="w">                              </span><span class="p">(</span><span class="ss">Slumerville</span><span class="w"> </span><span class="p">(</span><span class="ss">Ridge</span><span class="w"> </span><span class="ss">Road</span><span class="p">)</span><span class="w"> </span><span class="mi">10</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">job</span><span class="w"> </span><span class="p">(</span><span class="ss">Bitdiddle</span><span class="w"> </span><span class="ss">Ben</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">computer</span><span class="w"> </span><span class="ss">wizard</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">salary</span><span class="w"> </span><span class="p">(</span><span class="ss">Bitdiddle</span><span class="w"> </span><span class="ss">Ben</span><span class="p">)</span><span class="w"> </span><span class="mi">60000</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">address</span><span class="w"> </span><span class="p">(</span><span class="ss">Hacker</span><span class="w"> </span><span class="ss">Alyssa</span><span class="w"> </span><span class="ss">P</span><span class="p">)</span>
<span class="w">                              </span><span class="p">(</span><span class="ss">Cambridge</span><span class="w"> </span><span class="p">(</span><span class="ss">Mass</span><span class="w"> </span><span class="ss">Ave</span><span class="p">)</span><span class="w"> </span><span class="mi">78</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">job</span><span class="w"> </span><span class="p">(</span><span class="ss">Hacker</span><span class="w"> </span><span class="ss">Alyssa</span><span class="w"> </span><span class="ss">P</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">computer</span><span class="w"> </span><span class="ss">programmer</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">salary</span><span class="w"> </span><span class="p">(</span><span class="ss">Hacker</span><span class="w"> </span><span class="ss">Alyssa</span><span class="w"> </span><span class="ss">P</span><span class="p">)</span><span class="w"> </span><span class="mi">40000</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">supervisor</span><span class="w"> </span><span class="p">(</span><span class="ss">Hacker</span><span class="w"> </span><span class="ss">Alyssa</span><span class="w"> </span><span class="ss">P</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">Bitdiddle</span><span class="w"> </span><span class="ss">Ben</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">address</span><span class="w"> </span><span class="p">(</span><span class="ss">Fect</span><span class="w"> </span><span class="ss">Cy</span><span class="w"> </span><span class="ss">D</span><span class="p">)</span>
<span class="w">                              </span><span class="p">(</span><span class="ss">Cambridge</span><span class="w"> </span><span class="p">(</span><span class="ss">Ames</span><span class="w"> </span><span class="ss">Street</span><span class="p">)</span><span class="w"> </span><span class="mi">3</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">job</span><span class="w"> </span><span class="p">(</span><span class="ss">Fect</span><span class="w"> </span><span class="ss">Cy</span><span class="w"> </span><span class="ss">D</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">computer</span><span class="w"> </span><span class="ss">programmer</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">salary</span><span class="w"> </span><span class="p">(</span><span class="ss">Fect</span><span class="w"> </span><span class="ss">Cy</span><span class="w"> </span><span class="ss">D</span><span class="p">)</span><span class="w"> </span><span class="mi">35000</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">supervisor</span><span class="w"> </span><span class="p">(</span><span class="ss">Fect</span><span class="w"> </span><span class="ss">Cy</span><span class="w"> </span><span class="ss">D</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">Bitdiddle</span><span class="w"> </span><span class="ss">Ben</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">address</span><span class="w"> </span><span class="p">(</span><span class="ss">Tweakit</span><span class="w"> </span><span class="ss">Lem</span><span class="w"> </span><span class="ss">E</span><span class="p">)</span>
<span class="w">                              </span><span class="p">(</span><span class="ss">Boston</span><span class="w"> </span><span class="p">(</span><span class="ss">Bay</span><span class="w"> </span><span class="ss">State</span><span class="w"> </span><span class="ss">Road</span><span class="p">)</span><span class="w"> </span><span class="mi">22</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">job</span><span class="w"> </span><span class="p">(</span><span class="ss">Tweakit</span><span class="w"> </span><span class="ss">Lem</span><span class="w"> </span><span class="ss">E</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">computer</span><span class="w"> </span><span class="ss">technician</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">salary</span><span class="w"> </span><span class="p">(</span><span class="ss">Tweakit</span><span class="w"> </span><span class="ss">Lem</span><span class="w"> </span><span class="ss">E</span><span class="p">)</span><span class="w"> </span><span class="mi">25000</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">supervisor</span><span class="w"> </span><span class="p">(</span><span class="ss">Tweakit</span><span class="w"> </span><span class="ss">Lem</span><span class="w"> </span><span class="ss">E</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">Bitdiddle</span><span class="w"> </span><span class="ss">Ben</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">address</span><span class="w"> </span><span class="p">(</span><span class="ss">Reasoner</span><span class="w"> </span><span class="ss">Louis</span><span class="p">)</span>
<span class="w">                              </span><span class="p">(</span><span class="ss">Slumerville</span><span class="w"> </span><span class="p">(</span><span class="ss">Pine</span><span class="w"> </span><span class="ss">Tree</span><span class="w"> </span><span class="ss">Road</span><span class="p">)</span><span class="w"> </span><span class="mi">80</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">job</span><span class="w"> </span><span class="p">(</span><span class="ss">Reasoner</span><span class="w"> </span><span class="ss">Louis</span><span class="p">)</span>
<span class="w">                          </span><span class="p">(</span><span class="ss">computer</span><span class="w"> </span><span class="ss">programmer</span><span class="w"> </span><span class="ss">trainee</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">salary</span><span class="w"> </span><span class="p">(</span><span class="ss">Reasoner</span><span class="w"> </span><span class="ss">Louis</span><span class="p">)</span><span class="w"> </span><span class="mi">30000</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">supervisor</span><span class="w"> </span><span class="p">(</span><span class="ss">Reasoner</span><span class="w"> </span><span class="ss">Louis</span><span class="p">)</span>
<span class="w">                                 </span><span class="p">(</span><span class="ss">Hacker</span><span class="w"> </span><span class="ss">Alyssa</span><span class="w"> </span><span class="ss">P</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">supervisor</span><span class="w"> </span><span class="p">(</span><span class="ss">Bitdiddle</span><span class="w"> </span><span class="ss">Ben</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">Warbucks</span><span class="w"> </span><span class="ss">Oliver</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">address</span><span class="w"> </span><span class="p">(</span><span class="ss">Warbucks</span><span class="w"> </span><span class="ss">Oliver</span><span class="p">)</span>
<span class="w">                              </span><span class="p">(</span><span class="ss">Swellesley</span><span class="w"> </span><span class="p">(</span><span class="ss">Top</span><span class="w"> </span><span class="ss">Heap</span><span class="w"> </span><span class="ss">Road</span><span class="p">))))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">job</span><span class="w"> </span><span class="p">(</span><span class="ss">Warbucks</span><span class="w"> </span><span class="ss">Oliver</span><span class="p">)</span>
<span class="w">                          </span><span class="p">(</span><span class="ss">administration</span><span class="w"> </span><span class="ss">big</span><span class="w"> </span><span class="ss">wheel</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">salary</span><span class="w"> </span><span class="p">(</span><span class="ss">Warbucks</span><span class="w"> </span><span class="ss">Oliver</span><span class="p">)</span><span class="w"> </span><span class="mi">150000</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">address</span><span class="w"> </span><span class="p">(</span><span class="ss">Scrooge</span><span class="w"> </span><span class="ss">Eben</span><span class="p">)</span>
<span class="w">                              </span><span class="p">(</span><span class="ss">Weston</span><span class="w"> </span><span class="p">(</span><span class="ss">Shady</span><span class="w"> </span><span class="ss">Lane</span><span class="p">)</span><span class="w"> </span><span class="mi">10</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">job</span><span class="w"> </span><span class="p">(</span><span class="ss">Scrooge</span><span class="w"> </span><span class="ss">Eben</span><span class="p">)</span>
<span class="w">                          </span><span class="p">(</span><span class="ss">accounting</span><span class="w"> </span><span class="ss">chief</span><span class="w"> </span><span class="ss">accountant</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">salary</span><span class="w"> </span><span class="p">(</span><span class="ss">Scrooge</span><span class="w"> </span><span class="ss">Eben</span><span class="p">)</span><span class="w"> </span><span class="mi">75000</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">supervisor</span><span class="w"> </span><span class="p">(</span><span class="ss">Scrooge</span><span class="w"> </span><span class="ss">Eben</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">Warbucks</span><span class="w"> </span><span class="ss">Oliver</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">address</span><span class="w"> </span><span class="p">(</span><span class="ss">Cratchet</span><span class="w"> </span><span class="ss">Robert</span><span class="p">)</span>
<span class="w">                              </span><span class="p">(</span><span class="ss">Allston</span><span class="w"> </span><span class="p">(</span><span class="ss">N</span><span class="w"> </span><span class="ss">Harvard</span><span class="w"> </span><span class="ss">Street</span><span class="p">)</span><span class="w"> </span><span class="mi">16</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">job</span><span class="w"> </span><span class="p">(</span><span class="ss">Cratchet</span><span class="w"> </span><span class="ss">Robert</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">accounting</span><span class="w"> </span><span class="ss">scrivener</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">salary</span><span class="w"> </span><span class="p">(</span><span class="ss">Cratchet</span><span class="w"> </span><span class="ss">Robert</span><span class="p">)</span><span class="w"> </span><span class="mi">18000</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">supervisor</span><span class="w"> </span><span class="p">(</span><span class="ss">Cratchet</span><span class="w"> </span><span class="ss">Robert</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">Scrooge</span><span class="w"> </span><span class="ss">Eben</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">address</span><span class="w"> </span><span class="p">(</span><span class="ss">Aull</span><span class="w"> </span><span class="ss">DeWitt</span><span class="p">)</span>
<span class="w">                              </span><span class="p">(</span><span class="ss">Slumerville</span><span class="w"> </span><span class="p">(</span><span class="ss">Onion</span><span class="w"> </span><span class="ss">Square</span><span class="p">)</span><span class="w"> </span><span class="mi">5</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">job</span><span class="w"> </span><span class="p">(</span><span class="ss">Aull</span><span class="w"> </span><span class="ss">DeWitt</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">administration</span><span class="w"> </span><span class="ss">secretary</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">salary</span><span class="w"> </span><span class="p">(</span><span class="ss">Aull</span><span class="w"> </span><span class="ss">DeWitt</span><span class="p">)</span><span class="w"> </span><span class="mi">25000</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">supervisor</span><span class="w"> </span><span class="p">(</span><span class="ss">Aull</span><span class="w"> </span><span class="ss">DeWitt</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">Warbucks</span><span class="w"> </span><span class="ss">Oliver</span><span class="p">)))))</span>

<span class="p">(</span><span class="n">build-database</span><span class="p">)</span>

<span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="s2">&quot;Query (supervisor ?x (Bitdiddle Ben)):&quot;</span><span class="p">)</span>
<span class="p">(</span><span class="n">display-stream</span>
<span class="w">  </span><span class="p">(</span><span class="n">find-assertions</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">supervisor</span><span class="w"> </span><span class="p">(</span><span class="ss">?</span><span class="w"> </span><span class="ss">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">Bitdiddle</span><span class="w"> </span><span class="ss">Ben</span><span class="p">))</span><span class="w"> </span><span class="o">&#39;</span><span class="p">()))</span>
<span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="c1">;; (((? x) Tweakit Lem E))</span>
<span class="c1">;; (((? x) Fect Cy D))</span>
<span class="c1">;; (((? x) Hacker Alyssa P))</span>

<span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="s2">&quot;Query (job ?name (accounting . ?type)):&quot;</span><span class="p">)</span>
<span class="p">(</span><span class="n">display-stream</span>
<span class="w">  </span><span class="p">(</span><span class="n">find-assertions</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">job</span><span class="w"> </span><span class="p">(</span><span class="ss">?</span><span class="w"> </span><span class="ss">name</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">accounting</span><span class="w"> </span><span class="o">.</span><span class="w"> </span><span class="p">(</span><span class="ss">?</span><span class="w"> </span><span class="ss">type</span><span class="p">)))</span><span class="w"> </span><span class="o">&#39;</span><span class="p">()))</span>
<span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="c1">;; (((? type) scrivener) ((? name) Cratchet Robert))</span>
<span class="c1">;; (((? type) chief accountant) ((? name) Scrooge Eben))</span>

<span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="s2">&quot;Query (address ?name (Slumerville . ?address)):&quot;</span><span class="p">)</span>
<span class="p">(</span><span class="n">display-stream</span>
<span class="w">  </span><span class="p">(</span><span class="n">find-assertions</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">address</span><span class="w"> </span><span class="p">(</span><span class="ss">?</span><span class="w"> </span><span class="ss">name</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">Slumerville</span><span class="w"> </span><span class="o">.</span><span class="w"> </span><span class="p">(</span><span class="ss">?</span><span class="w"> </span><span class="ss">address</span><span class="p">)))</span><span class="w"> </span><span class="o">&#39;</span><span class="p">()))</span>
<span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="c1">;; (((? address) (Onion Square) 5) ((? name) Aull DeWitt))</span>
<span class="c1">;; (((? address) (Pine Tree Road) 80) ((? name) Reasoner Louis))</span>
<span class="c1">;; (((? address) (Ridge Road) 10) ((? name) Bitdiddle Ben))</span>
</pre></div>

</details>
<div class="code-output">
<span>Output:</span>
<pre>ok

Query (supervisor ?x (Bitdiddle Ben)):
(((? x) Tweakit Lem E))
(((? x) Fect Cy D))
(((? x) Hacker Alyssa P))

Query (job ?name (accounting . ?type)):
(((? type) scrivener) ((? name) Cratchet Robert))
(((? type) chief accountant) ((? name) Scrooge Eben))

Query (address ?name (Slumerville . ?address)):
(((? address) (Onion Square) 5) ((? name) Aull DeWitt))
(((? address) (Pine Tree Road) 80) ((? name) Reasoner Louis))
(((? address) (Ridge Road) 10) ((? name) Bitdiddle Ben))
</pre>
</div>
</div>



### 1.4. Input-output-driver for simple queries

Next, we include all of the functions from 4.4.4.7. This is all trivial stuff and helper functions.
The interesting stuff forming the driver loop is in 4.4.4.1, and most of it is not necessary.

`qeval` provides a layer of indirection, so that it looks up the proper function using `get`. This will
be used later for rules and for compound queries, but not right now.

`simple-query` makes sure to append all possibilities from applying both assertions and rules, but if 
we only have assertions, it does nothing. I make sure to define a placeholder `apply-rules` that does nothing:

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">apply-rules</span><span class="w"> </span><span class="n">query-pattern</span><span class="w"> </span><span class="n">frame</span><span class="p">)</span><span class="w"> </span><span class="n">the-empty-stream</span><span class="p">)</span>
</pre></div>

Next, `instantiate` is interesting. In the last section we noted that our output was in terms of frames, 
`instantiate` makes our output in terms of instantiated queries (with the variables replaced with the 
variable in each frame). 

Finally, the driver loop just dispatches things nicely, as well as expanding the question marks for us. 
Instead of a REPL, I define a `run-query` function that does basically the same thing as `query-driver-loop`.  

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">query-driver-loop</span><span class="p">)</span><span class="w"> </span><span class="k">...</span><span class="p">)</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="k">instantiate</span><span class="w"> </span><span class="nb">exp</span><span class="w"> </span><span class="n">frame</span><span class="w"> </span><span class="n">unbound-var-handler</span><span class="p">)</span><span class="w"> </span><span class="k">...</span><span class="p">)</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">qeval</span><span class="w"> </span><span class="n">query</span><span class="w"> </span><span class="n">frame-stream</span><span class="p">)</span><span class="w"> </span><span class="k">...</span><span class="p">)</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">simple-query</span><span class="w"> </span><span class="n">query-pattern</span><span class="w"> </span><span class="n">frame-stream</span><span class="p">)</span><span class="w"> </span><span class="k">...</span><span class="p">)</span>
</pre></div>

Our code can then be run more simply. The only features we use are expanding the question marks automatically
and instantiating our outputs instead of listing frames, however because we have `qeval` which can dispatch
to more functions, and the call to `apply-rules` which can later be filled in, we have all the flexibility
we need. 
<div class="codehilite"><pre><span></span><span class="p">(</span><span class="n">build-database</span><span class="p">)</span>

<span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="s2">&quot;Query (supervisor ?x (Bitdiddle Ben)):&quot;</span><span class="p">)</span>
<span class="p">(</span><span class="n">display-stream</span>
<span class="w"> </span><span class="p">(</span><span class="n">run-query</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">supervisor</span><span class="w"> </span><span class="ss">?x</span><span class="w"> </span><span class="p">(</span><span class="ss">Bitdiddle</span><span class="w"> </span><span class="ss">Ben</span><span class="p">))))</span>
<span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="c1">;; (supervisor (Tweakit Lem E) (Bitdiddle Ben))</span>
<span class="c1">;; (supervisor (Fect Cy D) (Bitdiddle Ben))</span>
<span class="c1">;; (supervisor (Hacker Alyssa P) (Bitdiddle Ben))</span>

<span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="s2">&quot;Query (job ?name (accounting . ?type)):&quot;</span><span class="p">)</span>
<span class="p">(</span><span class="n">display-stream</span>
<span class="w"> </span><span class="p">(</span><span class="n">run-query</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">job</span><span class="w"> </span><span class="ss">?name</span><span class="w"> </span><span class="p">(</span><span class="ss">accounting</span><span class="w"> </span><span class="o">.</span><span class="w"> </span><span class="ss">?type</span><span class="p">))))</span>
<span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="c1">;; (job (Cratchet Robert) (accounting scrivener))</span>
<span class="c1">;; (job (Scrooge Eben) (accounting chief accountant))</span>

<span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="s2">&quot;Query (address ?name (Slumerville . ?address)):&quot;</span><span class="p">)</span>
<span class="p">(</span><span class="n">display-stream</span>
<span class="w"> </span><span class="p">(</span><span class="n">run-query</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">address</span><span class="w"> </span><span class="ss">?name</span><span class="w"> </span><span class="p">(</span><span class="ss">Slumerville</span><span class="w"> </span><span class="o">.</span><span class="w"> </span><span class="ss">?address</span><span class="p">))))</span>
<span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="c1">;; (address (Aull DeWitt) (Slumerville (Onion Square) 5))</span>
<span class="c1">;; (address (Reasoner Louis) (Slumerville (Pine Tree Road) 80))</span>
<span class="c1">;; (address (Bitdiddle Ben) (Slumerville (Ridge Road) 10))</span>
</pre></div>

<div class="code-box" markdown="1">
<details class="collapsible-code">
<summary class="code-summary"><a href="code/4-4-simple-driver.rkt">code/4-4-simple-driver.rkt</a> <span class="expand-hint">(click to expand)</span></summary>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="c1">;; ===================================================================</span>
<span class="c1">;; =========================== ch2 Tools =============================</span>
<span class="c1">;; ===================================================================</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">operation-table</span><span class="w"> </span><span class="o">&#39;</span><span class="p">())</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">assoc</span><span class="w"> </span><span class="n">key</span><span class="w"> </span><span class="n">records</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">null?</span><span class="w"> </span><span class="n">records</span><span class="p">)</span><span class="w"> </span><span class="no">#f</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="nb">equal?</span><span class="w"> </span><span class="n">key</span><span class="w"> </span><span class="p">(</span><span class="nb">caar</span><span class="w"> </span><span class="n">records</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">records</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">assoc</span><span class="w"> </span><span class="n">key</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">records</span><span class="p">)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">assoc-op</span><span class="w"> </span><span class="n">key</span><span class="w"> </span><span class="n">records</span><span class="p">)</span>
<span class="w">   </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">null?</span><span class="w"> </span><span class="n">records</span><span class="p">)</span><span class="w"> </span><span class="no">#f</span><span class="p">)</span>
<span class="w">         </span><span class="p">((</span><span class="nb">equal?</span><span class="w"> </span><span class="n">key</span><span class="w"> </span><span class="p">(</span><span class="nb">caar</span><span class="w"> </span><span class="n">records</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">records</span><span class="p">))</span>
<span class="w">         </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="n">assoc-op</span><span class="w"> </span><span class="n">key</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">records</span><span class="p">)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">put</span><span class="w"> </span><span class="n">op</span><span class="w"> </span><span class="n">type-tags</span><span class="w"> </span><span class="n">proc</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">op-list-entry</span><span class="w"> </span><span class="p">(</span><span class="n">assoc-op</span><span class="w"> </span><span class="n">op</span><span class="w"> </span><span class="n">operation-table</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="n">op-list-entry</span>
<span class="w">        </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">proc-list</span><span class="w"> </span><span class="p">(</span><span class="nb">cadr</span><span class="w"> </span><span class="n">op-list-entry</span><span class="p">)))</span>
<span class="w">           </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">proc-pair-entry</span><span class="w"> </span><span class="p">(</span><span class="nb">assoc</span><span class="w"> </span><span class="n">type-tags</span><span class="w"> </span><span class="n">proc-list</span><span class="p">)))</span>
<span class="w">             </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="n">proc-pair-entry</span>
<span class="w">                 </span><span class="p">(</span><span class="n">set-cdr!</span><span class="w"> </span><span class="n">proc-pair-entry</span><span class="w"> </span><span class="n">proc</span><span class="p">)</span>
<span class="w">                 </span><span class="p">(</span><span class="n">set-car!</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">op-list-entry</span><span class="p">)</span>
<span class="w">                           </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">type-tags</span><span class="w"> </span><span class="n">proc</span><span class="p">)</span><span class="w"> </span><span class="n">proc-list</span><span class="p">)))))</span>
<span class="w">        </span><span class="p">(</span><span class="k">set!</span><span class="w"> </span><span class="n">operation-table</span>
<span class="w">              </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="n">op</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">type-tags</span><span class="w"> </span><span class="n">proc</span><span class="p">)))</span>
<span class="w">                    </span><span class="n">operation-table</span><span class="p">)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">get</span><span class="w"> </span><span class="n">op</span><span class="w"> </span><span class="n">type-tags</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">op-list-entry</span><span class="w"> </span><span class="p">(</span><span class="n">assoc-op</span><span class="w"> </span><span class="n">op</span><span class="w"> </span><span class="n">operation-table</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="n">op-list-entry</span>
<span class="w">        </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">proc-list</span><span class="w"> </span><span class="p">(</span><span class="nb">cadr</span><span class="w"> </span><span class="n">op-list-entry</span><span class="p">)))</span>
<span class="w">          </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">proc-pair-entry</span><span class="w"> </span><span class="p">(</span><span class="nb">assoc</span><span class="w"> </span><span class="n">type-tags</span><span class="w"> </span><span class="n">proc-list</span><span class="p">)))</span>
<span class="w">            </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="n">proc-pair-entry</span>
<span class="w">                </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">proc-pair-entry</span><span class="p">)</span>
<span class="w">                </span><span class="no">#f</span><span class="p">)))</span>
<span class="w">        </span><span class="no">#f</span><span class="p">)))</span>

<span class="c1">;; ===================================================================</span>
<span class="c1">;; =================== ch3 (stream) Tools ============================</span>
<span class="c1">;; ===================================================================</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="k">stream</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">force</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="o">.</span><span class="w"> </span><span class="n">argstreams</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))</span>
<span class="w">      </span><span class="n">the-empty-stream</span>
<span class="w">      </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">       </span><span class="p">(</span><span class="nb">apply</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="n">stream-car</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))</span>
<span class="w">       </span><span class="p">(</span><span class="nb">apply</span><span class="w"> </span><span class="nb">stream-map</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-append</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span>
<span class="w">      </span><span class="n">s2</span>
<span class="w">      </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">       </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span>
<span class="w">       </span><span class="p">(</span><span class="nb">stream-append</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span><span class="w"> </span><span class="n">s2</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-append-delayed</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">delayed-s2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="nb">force</span><span class="w"> </span><span class="n">delayed-s2</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">       </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span>
<span class="w">       </span><span class="p">(</span><span class="n">stream-append-delayed</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span>
<span class="w">                              </span><span class="n">delayed-s2</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">interleave-delayed</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">delayed-s2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="nb">force</span><span class="w"> </span><span class="n">delayed-s2</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">       </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span>
<span class="w">       </span><span class="p">(</span><span class="n">interleave-delayed</span>
<span class="w">        </span><span class="p">(</span><span class="nb">force</span><span class="w"> </span><span class="n">delayed-s2</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="k">delay</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s1</span><span class="p">))))))</span>

<span class="c1">; singleton-stream</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">singleton-stream</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">the-empty-stream</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-for-each</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="n">s</span><span class="p">))</span>
<span class="w">      </span><span class="p">(</span><span class="k">begin</span>
<span class="w">        </span><span class="p">(</span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="nb">stream-for-each</span><span class="w"> </span><span class="n">proc</span>
<span class="w">                         </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">display-stream</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-for-each</span><span class="w"> </span><span class="n">display-line</span><span class="w"> </span><span class="n">s</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>


<span class="c1">; stream-flatmap</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-flatmap</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">flatten-stream</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="n">s</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">flatten-stream</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span>
<span class="w">      </span><span class="n">the-empty-stream</span>
<span class="w">      </span><span class="p">(</span><span class="n">interleave-delayed</span>
<span class="w">       </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span>
<span class="w">       </span><span class="p">(</span><span class="k">delay</span><span class="w"> </span><span class="p">(</span><span class="n">flatten-stream</span>
<span class="w">               </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">))))))</span>
<span class="c1">;; ===================================================================</span>
<span class="c1">;; ========================= ch4 Stuff ===============================</span>
<span class="c1">;; ===================================================================</span>

<span class="c1">; =============== 4.4.4.8</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-binding</span><span class="w"> </span><span class="n">variable</span><span class="w"> </span><span class="n">value</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">variable</span><span class="w"> </span><span class="n">value</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">binding-variable</span><span class="w"> </span><span class="n">binding</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">binding</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">binding-value</span><span class="w"> </span><span class="n">binding</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">binding</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">binding-in-frame</span><span class="w"> </span><span class="n">variable</span><span class="w"> </span><span class="n">frame</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">assoc</span><span class="w"> </span><span class="n">variable</span><span class="w"> </span><span class="n">frame</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">extend</span><span class="w"> </span><span class="n">variable</span><span class="w"> </span><span class="n">value</span><span class="w"> </span><span class="n">frame</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="p">(</span><span class="n">make-binding</span><span class="w"> </span><span class="n">variable</span><span class="w"> </span><span class="n">value</span><span class="p">)</span><span class="w"> </span><span class="n">frame</span><span class="p">))</span>

<span class="c1">; =============== 4.4.4.5</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">THE-ASSERTIONS</span><span class="w"> </span><span class="n">the-empty-stream</span><span class="p">)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">fetch-assertions</span><span class="w"> </span><span class="n">pattern</span><span class="w"> </span><span class="n">frame</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">use-index?</span><span class="w"> </span><span class="n">pattern</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="n">get-indexed-assertions</span><span class="w"> </span><span class="n">pattern</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="n">get-all-assertions</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">get-all-assertions</span><span class="p">)</span><span class="w"> </span><span class="n">THE-ASSERTIONS</span><span class="p">)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">get-indexed-assertions</span><span class="w"> </span><span class="n">pattern</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">get-stream</span><span class="w"> </span><span class="p">(</span><span class="n">index-key-of</span><span class="w"> </span><span class="n">pattern</span><span class="p">)</span>
<span class="w">              </span><span class="o">&#39;</span><span class="ss">assertion-stream</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">get-stream</span><span class="w"> </span><span class="n">key1</span><span class="w"> </span><span class="n">key2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">s</span><span class="w"> </span><span class="p">(</span><span class="n">get</span><span class="w"> </span><span class="n">key1</span><span class="w"> </span><span class="n">key2</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">the-empty-stream</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">THE-RULES</span><span class="w"> </span><span class="n">the-empty-stream</span><span class="p">)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">fetch-rules</span><span class="w"> </span><span class="n">pattern</span><span class="w"> </span><span class="n">frame</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">use-index?</span><span class="w"> </span><span class="n">pattern</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="n">get-indexed-rules</span><span class="w"> </span><span class="n">pattern</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="n">get-all-rules</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">get-all-rules</span><span class="p">)</span><span class="w"> </span><span class="n">THE-RULES</span><span class="p">)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">get-indexed-rules</span><span class="w"> </span><span class="n">pattern</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-append</span>
<span class="w">   </span><span class="p">(</span><span class="n">get-stream</span><span class="w"> </span><span class="p">(</span><span class="n">index-key-of</span><span class="w"> </span><span class="n">pattern</span><span class="p">)</span>
<span class="w">               </span><span class="o">&#39;</span><span class="ss">rule-stream</span><span class="p">)</span>
<span class="w">   </span><span class="p">(</span><span class="n">get-stream</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">?</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">rule-stream</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">add-rule-or-assertion!</span><span class="w"> </span><span class="n">assertion</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">rule?</span><span class="w"> </span><span class="n">assertion</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="n">add-rule!</span><span class="w"> </span><span class="n">assertion</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="n">assertion</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="n">assertion</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">store-assertion-in-index</span><span class="w"> </span><span class="n">assertion</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">old-assertions</span><span class="w"> </span><span class="n">THE-ASSERTIONS</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="k">set!</span><span class="w"> </span><span class="n">THE-ASSERTIONS</span>
<span class="w">          </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="n">assertion</span><span class="w"> </span>
<span class="w">                       </span><span class="n">old-assertions</span><span class="p">))</span>
<span class="w">    </span><span class="o">&#39;</span><span class="ss">ok</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">add-rule!</span><span class="w"> </span><span class="n">rule</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">store-rule-in-index</span><span class="w"> </span><span class="n">rule</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">old-rules</span><span class="w"> </span><span class="n">THE-RULES</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="k">set!</span><span class="w"> </span><span class="n">THE-RULES</span>
<span class="w">          </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="n">rule</span><span class="w"> </span><span class="n">old-rules</span><span class="p">))</span>
<span class="w">    </span><span class="o">&#39;</span><span class="ss">ok</span><span class="p">))</span>


<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">store-assertion-in-index</span><span class="w"> </span><span class="n">assertion</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">indexable?</span><span class="w"> </span><span class="n">assertion</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">key</span><span class="w"> </span><span class="p">(</span><span class="n">index-key-of</span><span class="w"> </span><span class="n">assertion</span><span class="p">)))</span>
<span class="w">        </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">current-assertion-stream</span>
<span class="w">               </span><span class="p">(</span><span class="n">get-stream</span><span class="w"> </span>
<span class="w">                </span><span class="n">key</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">assertion-stream</span><span class="p">)))</span>
<span class="w">          </span><span class="p">(</span><span class="n">put</span><span class="w"> </span><span class="n">key</span>
<span class="w">               </span><span class="o">&#39;</span><span class="ss">assertion-stream</span>
<span class="w">               </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span>
<span class="w">                </span><span class="n">assertion</span>
<span class="w">                </span><span class="n">current-assertion-stream</span><span class="p">))))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">store-rule-in-index</span><span class="w"> </span><span class="n">rule</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">pattern</span><span class="w"> </span><span class="p">(</span><span class="n">conclusion</span><span class="w"> </span><span class="n">rule</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">indexable?</span><span class="w"> </span><span class="n">pattern</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">key</span><span class="w"> </span><span class="p">(</span><span class="n">index-key-of</span><span class="w"> </span><span class="n">pattern</span><span class="p">)))</span>
<span class="w">          </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">current-rule-stream</span>
<span class="w">                 </span><span class="p">(</span><span class="n">get-stream</span><span class="w"> </span>
<span class="w">                  </span><span class="n">key</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">rule-stream</span><span class="p">)))</span>
<span class="w">            </span><span class="p">(</span><span class="n">put</span><span class="w"> </span><span class="n">key</span>
<span class="w">                 </span><span class="o">&#39;</span><span class="ss">rule-stream</span>
<span class="w">                 </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span>
<span class="w">                  </span><span class="n">rule</span>
<span class="w">                  </span><span class="n">current-rule-stream</span><span class="p">)))))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">indexable?</span><span class="w"> </span><span class="n">pat</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">or</span><span class="w"> </span><span class="p">(</span><span class="n">constant-symbol?</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">pat</span><span class="p">))</span>
<span class="w">      </span><span class="p">(</span><span class="n">var?</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">pat</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">index-key-of</span><span class="w"> </span><span class="n">pat</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">key</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">pat</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">var?</span><span class="w"> </span><span class="n">key</span><span class="p">)</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">?</span><span class="w"> </span><span class="n">key</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">use-index?</span><span class="w"> </span><span class="n">pat</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">constant-symbol?</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">pat</span><span class="p">)))</span>

<span class="c1">; =============== 4.4.4.3 ================</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">find-assertions</span><span class="w"> </span><span class="n">pattern</span><span class="w"> </span><span class="n">frame</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">stream-flatmap</span>
<span class="w">    </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">datum</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="n">check-an-assertion</span><span class="w"> </span><span class="n">datum</span><span class="w"> </span><span class="n">pattern</span><span class="w"> </span><span class="n">frame</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="n">fetch-assertions</span><span class="w"> </span><span class="n">pattern</span><span class="w"> </span><span class="n">frame</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">check-an-assertion</span><span class="w"> </span>
<span class="w">         </span><span class="n">assertion</span><span class="w"> </span><span class="n">query-pat</span><span class="w"> </span><span class="n">query-frame</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">match-result</span>
<span class="w">         </span><span class="p">(</span><span class="n">pattern-match</span><span class="w"> </span>
<span class="w">          </span><span class="n">query-pat</span><span class="w"> </span><span class="n">assertion</span><span class="w"> </span><span class="n">query-frame</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">eq?</span><span class="w"> </span><span class="n">match-result</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">failed</span><span class="p">)</span>
<span class="w">        </span><span class="n">the-empty-stream</span>
<span class="w">        </span><span class="p">(</span><span class="n">singleton-stream</span><span class="w"> </span><span class="n">match-result</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">pattern-match</span><span class="w"> </span><span class="n">pat</span><span class="w"> </span><span class="n">dat</span><span class="w"> </span><span class="n">frame</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">frame</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">failed</span><span class="p">)</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">failed</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="nb">equal?</span><span class="w"> </span><span class="n">pat</span><span class="w"> </span><span class="n">dat</span><span class="p">)</span><span class="w"> </span><span class="n">frame</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="n">var?</span><span class="w"> </span><span class="n">pat</span><span class="p">)</span><span class="w"> </span>
<span class="w">         </span><span class="p">(</span><span class="n">extend-if-consistent</span><span class="w"> </span>
<span class="w">          </span><span class="n">pat</span><span class="w"> </span><span class="n">dat</span><span class="w"> </span><span class="n">frame</span><span class="p">))</span>
<span class="w">        </span><span class="p">((</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">pair?</span><span class="w"> </span><span class="n">pat</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">pair?</span><span class="w"> </span><span class="n">dat</span><span class="p">))</span>
<span class="w">         </span><span class="p">(</span><span class="n">pattern-match</span><span class="w"> </span>
<span class="w">          </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">pat</span><span class="p">)</span><span class="w"> </span>
<span class="w">          </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">dat</span><span class="p">)</span>
<span class="w">          </span><span class="p">(</span><span class="n">pattern-match</span>
<span class="w">           </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">pat</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">dat</span><span class="p">)</span><span class="w"> </span><span class="n">frame</span><span class="p">)))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">failed</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">extend-if-consistent</span><span class="w"> </span><span class="n">var</span><span class="w"> </span><span class="n">dat</span><span class="w"> </span><span class="n">frame</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">binding</span><span class="w"> </span><span class="p">(</span><span class="n">binding-in-frame</span><span class="w"> </span><span class="n">var</span><span class="w"> </span><span class="n">frame</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="n">binding</span>
<span class="w">        </span><span class="p">(</span><span class="n">pattern-match</span><span class="w"> </span>
<span class="w">         </span><span class="p">(</span><span class="n">binding-value</span><span class="w"> </span><span class="n">binding</span><span class="p">)</span><span class="w"> </span><span class="n">dat</span><span class="w"> </span><span class="n">frame</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="n">extend</span><span class="w"> </span><span class="n">var</span><span class="w"> </span><span class="n">dat</span><span class="w"> </span><span class="n">frame</span><span class="p">))))</span>


<span class="c1">;; ======================== 4.4.4.1</span>

<span class="c1">;; (define input-prompt  &quot;;;; Query input:&quot;)</span>
<span class="c1">;; (define output-prompt &quot;;;; Query results:&quot;)</span>
<span class="c1">;; </span>
<span class="c1">;; (define (query-driver-loop)</span>
<span class="c1">;;   (prompt-for-input input-prompt)</span>
<span class="c1">;;   (let ((q (query-syntax-process (read))))</span>
<span class="c1">;;     (cond ((assertion-to-be-added? q)</span>
<span class="c1">;;            (add-rule-or-assertion! </span>
<span class="c1">;;             (add-assertion-body q))</span>
<span class="c1">;;            (newline)</span>
<span class="c1">;;            (display </span>
<span class="c1">;;             &quot;Assertion added to data base.&quot;)</span>
<span class="c1">;;            (query-driver-loop))</span>
<span class="c1">;;           (else</span>
<span class="c1">;;            (newline)</span>
<span class="c1">;;            (display output-prompt)</span>
<span class="c1">;;            (display-stream</span>
<span class="c1">;;             (stream-map</span>
<span class="c1">;;              (lambda (frame)</span>
<span class="c1">;;                (instantiate</span>
<span class="c1">;;                 q</span>
<span class="c1">;;                 frame</span>
<span class="c1">;;                 (lambda (v f)</span>
<span class="c1">;;                   (contract-question-mark v))))</span>
<span class="c1">;;              (qeval q (singleton-stream &#39;()))))</span>
<span class="c1">;;            (query-driver-loop)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">run-query</span><span class="w"> </span><span class="n">input</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">q</span><span class="w"> </span><span class="p">(</span><span class="n">query-syntax-process</span><span class="w"> </span><span class="n">input</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="n">assertion-to-be-added?</span><span class="w"> </span><span class="n">q</span><span class="p">)</span>
<span class="w">           </span><span class="p">(</span><span class="n">add-rule-or-assertion!</span><span class="w"> </span>
<span class="w">            </span><span class="p">(</span><span class="n">add-assertion-body</span><span class="w"> </span><span class="n">q</span><span class="p">)))</span>
<span class="w">          </span><span class="p">(</span><span class="k">else</span>
<span class="w">           </span><span class="p">(</span><span class="nb">stream-map</span>
<span class="w">            </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">frame</span><span class="p">)</span>
<span class="w">              </span><span class="p">(</span><span class="k">instantiate</span>
<span class="w">               </span><span class="n">q</span>
<span class="w">               </span><span class="n">frame</span>
<span class="w">               </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">v</span><span class="w"> </span><span class="n">f</span><span class="p">)</span>
<span class="w">                 </span><span class="p">(</span><span class="n">contract-question-mark</span><span class="w"> </span><span class="n">v</span><span class="p">))))</span>
<span class="w">            </span><span class="p">(</span><span class="n">qeval</span><span class="w"> </span><span class="n">q</span><span class="w"> </span><span class="p">(</span><span class="n">singleton-stream</span><span class="w"> </span><span class="o">&#39;</span><span class="p">())))))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="k">instantiate</span>
<span class="w">         </span><span class="nb">exp</span><span class="w"> </span><span class="n">frame</span><span class="w"> </span><span class="n">unbound-var-handler</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">copy</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="n">var?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span>
<span class="w">           </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">binding</span>
<span class="w">                  </span><span class="p">(</span><span class="n">binding-in-frame</span>
<span class="w">                   </span><span class="nb">exp</span><span class="w"> </span><span class="n">frame</span><span class="p">)))</span>
<span class="w">             </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="n">binding</span>
<span class="w">                 </span><span class="p">(</span><span class="n">copy</span>
<span class="w">                  </span><span class="p">(</span><span class="n">binding-value</span><span class="w"> </span><span class="n">binding</span><span class="p">))</span>
<span class="w">                 </span><span class="p">(</span><span class="n">unbound-var-handler</span>
<span class="w">                  </span><span class="nb">exp</span><span class="w"> </span><span class="n">frame</span><span class="p">))))</span>
<span class="w">          </span><span class="p">((</span><span class="nb">pair?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span>
<span class="w">           </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="p">(</span><span class="n">copy</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="nb">exp</span><span class="p">))</span>
<span class="w">                 </span><span class="p">(</span><span class="n">copy</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="nb">exp</span><span class="p">))))</span>
<span class="w">          </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="nb">exp</span><span class="p">)))</span>
<span class="w">  </span><span class="p">(</span><span class="n">copy</span><span class="w"> </span><span class="nb">exp</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">qeval</span><span class="w"> </span><span class="n">query</span><span class="w"> </span><span class="n">frame-stream</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">qproc</span><span class="w"> </span><span class="p">(</span><span class="n">get</span><span class="w"> </span><span class="p">(</span><span class="n">type</span><span class="w"> </span><span class="n">query</span><span class="p">)</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">qeval</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="n">qproc</span>
<span class="w">        </span><span class="p">(</span><span class="n">qproc</span><span class="w"> </span><span class="p">(</span><span class="n">contents</span><span class="w"> </span><span class="n">query</span><span class="p">)</span><span class="w"> </span><span class="n">frame-stream</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="n">simple-query</span><span class="w"> </span><span class="n">query</span><span class="w"> </span><span class="n">frame-stream</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">simple-query</span><span class="w"> </span><span class="n">query-pattern</span><span class="w"> </span>
<span class="w">                      </span><span class="n">frame-stream</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">stream-flatmap</span>
<span class="w">   </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">frame</span><span class="p">)</span>
<span class="w">     </span><span class="p">(</span><span class="n">stream-append-delayed</span>
<span class="w">      </span><span class="p">(</span><span class="n">find-assertions</span><span class="w"> </span><span class="n">query-pattern</span><span class="w"> </span><span class="n">frame</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="k">delay</span><span class="w"> </span>
<span class="w">        </span><span class="p">(</span><span class="n">apply-rules</span><span class="w"> </span><span class="n">query-pattern</span><span class="w"> </span><span class="n">frame</span><span class="p">))))</span>
<span class="w">   </span><span class="n">frame-stream</span><span class="p">))</span>


<span class="c1">;; ======================= 4.4.4.7</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">type</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">pair?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;Unknown expression TYPE&quot;</span>
<span class="w">             </span><span class="nb">exp</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">tagged-list?</span><span class="w"> </span><span class="nb">exp</span><span class="w"> </span><span class="k">tag</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">pair?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="nb">eq?</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="k">tag</span><span class="p">)</span>
<span class="w">      </span><span class="k">false</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">contents</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">pair?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;Unknown expression CONTENTS&quot;</span>
<span class="w">             </span><span class="nb">exp</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">assertion-to-be-added?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">eq?</span><span class="w"> </span><span class="p">(</span><span class="n">type</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">assert!</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">add-assertion-body</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="p">(</span><span class="n">contents</span><span class="w"> </span><span class="nb">exp</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">empty-conjunction?</span><span class="w"> </span><span class="n">exps</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="n">exps</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">first-conjunct</span><span class="w"> </span><span class="n">exps</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">exps</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">rest-conjuncts</span><span class="w"> </span><span class="n">exps</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">exps</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">empty-disjunction?</span><span class="w"> </span><span class="n">exps</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="n">exps</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">first-disjunct</span><span class="w"> </span><span class="n">exps</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">exps</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">rest-disjuncts</span><span class="w"> </span><span class="n">exps</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">exps</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">negated-query</span><span class="w"> </span><span class="n">exps</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">exps</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">predicate</span><span class="w"> </span><span class="n">exps</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">exps</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">args</span><span class="w"> </span><span class="n">exps</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">exps</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">rule?</span><span class="w"> </span><span class="n">statement</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">tagged-list?</span><span class="w"> </span><span class="n">statement</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">rule</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">conclusion</span><span class="w"> </span><span class="n">rule</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cadr</span><span class="w"> </span><span class="n">rule</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">rule-body</span><span class="w"> </span><span class="n">rule</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="p">(</span><span class="nb">cddr</span><span class="w"> </span><span class="n">rule</span><span class="p">))</span>
<span class="w">      </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">always-true</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="nb">caddr</span><span class="w"> </span><span class="n">rule</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">query-syntax-process</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">map-over-symbols</span><span class="w"> </span><span class="n">expand-question-mark</span><span class="w"> </span><span class="nb">exp</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">map-over-symbols</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">pair?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span>
<span class="w">         </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="p">(</span><span class="n">map-over-symbols</span>
<span class="w">                </span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="nb">exp</span><span class="p">))</span>
<span class="w">               </span><span class="p">(</span><span class="n">map-over-symbols</span>
<span class="w">                </span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="nb">exp</span><span class="p">))))</span>
<span class="w">        </span><span class="p">((</span><span class="nb">symbol?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">proc</span><span class="w"> </span><span class="nb">exp</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="nb">exp</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">expand-question-mark</span><span class="w"> </span><span class="n">symbol</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">chars</span><span class="w"> </span><span class="p">(</span><span class="nb">symbol-&gt;string</span><span class="w"> </span><span class="n">symbol</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">string=?</span><span class="w"> </span><span class="p">(</span><span class="nb">substring</span><span class="w"> </span><span class="n">chars</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span><span class="w"> </span><span class="s2">&quot;?&quot;</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">?</span><span class="w"> </span><span class="p">(</span><span class="nb">string-&gt;symbol</span>
<span class="w">                  </span><span class="p">(</span><span class="nb">substring</span>
<span class="w">                   </span><span class="n">chars</span>
<span class="w">                   </span><span class="mi">1</span>
<span class="w">                   </span><span class="p">(</span><span class="nb">string-length</span><span class="w"> </span><span class="n">chars</span><span class="p">))))</span>
<span class="w">        </span><span class="n">symbol</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">var?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">tagged-list?</span><span class="w"> </span><span class="nb">exp</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">?</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">constant-symbol?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">symbol?</span><span class="w"> </span><span class="nb">exp</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">rule-counter</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">new-rule-application-id</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">set!</span><span class="w"> </span><span class="n">rule-counter</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="n">rule-counter</span><span class="p">))</span>
<span class="w">  </span><span class="n">rule-counter</span><span class="p">)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-new-variable</span>
<span class="w">         </span><span class="n">var</span><span class="w"> </span><span class="n">rule-application-id</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">?</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">rule-application-id</span>
<span class="w">                 </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">var</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">contract-question-mark</span><span class="w"> </span><span class="n">variable</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">string-&gt;symbol</span>
<span class="w">   </span><span class="p">(</span><span class="nb">string-append</span><span class="w"> </span><span class="s2">&quot;?&quot;</span>
<span class="w">     </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">number?</span><span class="w"> </span><span class="p">(</span><span class="nb">cadr</span><span class="w"> </span><span class="n">variable</span><span class="p">))</span>
<span class="w">         </span><span class="p">(</span><span class="nb">string-append</span>
<span class="w">          </span><span class="p">(</span><span class="nb">symbol-&gt;string</span><span class="w"> </span><span class="p">(</span><span class="nb">caddr</span><span class="w"> </span><span class="n">variable</span><span class="p">))</span>
<span class="w">          </span><span class="s2">&quot;-&quot;</span>
<span class="w">          </span><span class="p">(</span><span class="nb">number-&gt;string</span><span class="w"> </span><span class="p">(</span><span class="nb">cadr</span><span class="w"> </span><span class="n">variable</span><span class="p">)))</span>
<span class="w">         </span><span class="p">(</span><span class="nb">symbol-&gt;string</span><span class="w"> </span><span class="p">(</span><span class="nb">cadr</span><span class="w"> </span><span class="n">variable</span><span class="p">))))))</span>


<span class="c1">; placeholder for rules</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">apply-rules</span><span class="w"> </span><span class="n">query-pattern</span><span class="w"> </span><span class="n">frame</span><span class="p">)</span><span class="w"> </span><span class="n">the-empty-stream</span><span class="p">)</span>

<span class="c1">;; Relevant Code</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">build-database</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">begin</span><span class="w"> </span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">address</span><span class="w"> </span><span class="p">(</span><span class="ss">Bitdiddle</span><span class="w"> </span><span class="ss">Ben</span><span class="p">)</span>
<span class="w">                              </span><span class="p">(</span><span class="ss">Slumerville</span><span class="w"> </span><span class="p">(</span><span class="ss">Ridge</span><span class="w"> </span><span class="ss">Road</span><span class="p">)</span><span class="w"> </span><span class="mi">10</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">job</span><span class="w"> </span><span class="p">(</span><span class="ss">Bitdiddle</span><span class="w"> </span><span class="ss">Ben</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">computer</span><span class="w"> </span><span class="ss">wizard</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">salary</span><span class="w"> </span><span class="p">(</span><span class="ss">Bitdiddle</span><span class="w"> </span><span class="ss">Ben</span><span class="p">)</span><span class="w"> </span><span class="mi">60000</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">address</span><span class="w"> </span><span class="p">(</span><span class="ss">Hacker</span><span class="w"> </span><span class="ss">Alyssa</span><span class="w"> </span><span class="ss">P</span><span class="p">)</span>
<span class="w">                              </span><span class="p">(</span><span class="ss">Cambridge</span><span class="w"> </span><span class="p">(</span><span class="ss">Mass</span><span class="w"> </span><span class="ss">Ave</span><span class="p">)</span><span class="w"> </span><span class="mi">78</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">job</span><span class="w"> </span><span class="p">(</span><span class="ss">Hacker</span><span class="w"> </span><span class="ss">Alyssa</span><span class="w"> </span><span class="ss">P</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">computer</span><span class="w"> </span><span class="ss">programmer</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">salary</span><span class="w"> </span><span class="p">(</span><span class="ss">Hacker</span><span class="w"> </span><span class="ss">Alyssa</span><span class="w"> </span><span class="ss">P</span><span class="p">)</span><span class="w"> </span><span class="mi">40000</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">supervisor</span><span class="w"> </span><span class="p">(</span><span class="ss">Hacker</span><span class="w"> </span><span class="ss">Alyssa</span><span class="w"> </span><span class="ss">P</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">Bitdiddle</span><span class="w"> </span><span class="ss">Ben</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">address</span><span class="w"> </span><span class="p">(</span><span class="ss">Fect</span><span class="w"> </span><span class="ss">Cy</span><span class="w"> </span><span class="ss">D</span><span class="p">)</span>
<span class="w">                              </span><span class="p">(</span><span class="ss">Cambridge</span><span class="w"> </span><span class="p">(</span><span class="ss">Ames</span><span class="w"> </span><span class="ss">Street</span><span class="p">)</span><span class="w"> </span><span class="mi">3</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">job</span><span class="w"> </span><span class="p">(</span><span class="ss">Fect</span><span class="w"> </span><span class="ss">Cy</span><span class="w"> </span><span class="ss">D</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">computer</span><span class="w"> </span><span class="ss">programmer</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">salary</span><span class="w"> </span><span class="p">(</span><span class="ss">Fect</span><span class="w"> </span><span class="ss">Cy</span><span class="w"> </span><span class="ss">D</span><span class="p">)</span><span class="w"> </span><span class="mi">35000</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">supervisor</span><span class="w"> </span><span class="p">(</span><span class="ss">Fect</span><span class="w"> </span><span class="ss">Cy</span><span class="w"> </span><span class="ss">D</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">Bitdiddle</span><span class="w"> </span><span class="ss">Ben</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">address</span><span class="w"> </span><span class="p">(</span><span class="ss">Tweakit</span><span class="w"> </span><span class="ss">Lem</span><span class="w"> </span><span class="ss">E</span><span class="p">)</span>
<span class="w">                              </span><span class="p">(</span><span class="ss">Boston</span><span class="w"> </span><span class="p">(</span><span class="ss">Bay</span><span class="w"> </span><span class="ss">State</span><span class="w"> </span><span class="ss">Road</span><span class="p">)</span><span class="w"> </span><span class="mi">22</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">job</span><span class="w"> </span><span class="p">(</span><span class="ss">Tweakit</span><span class="w"> </span><span class="ss">Lem</span><span class="w"> </span><span class="ss">E</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">computer</span><span class="w"> </span><span class="ss">technician</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">salary</span><span class="w"> </span><span class="p">(</span><span class="ss">Tweakit</span><span class="w"> </span><span class="ss">Lem</span><span class="w"> </span><span class="ss">E</span><span class="p">)</span><span class="w"> </span><span class="mi">25000</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">supervisor</span><span class="w"> </span><span class="p">(</span><span class="ss">Tweakit</span><span class="w"> </span><span class="ss">Lem</span><span class="w"> </span><span class="ss">E</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">Bitdiddle</span><span class="w"> </span><span class="ss">Ben</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">address</span><span class="w"> </span><span class="p">(</span><span class="ss">Reasoner</span><span class="w"> </span><span class="ss">Louis</span><span class="p">)</span>
<span class="w">                              </span><span class="p">(</span><span class="ss">Slumerville</span><span class="w"> </span><span class="p">(</span><span class="ss">Pine</span><span class="w"> </span><span class="ss">Tree</span><span class="w"> </span><span class="ss">Road</span><span class="p">)</span><span class="w"> </span><span class="mi">80</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">job</span><span class="w"> </span><span class="p">(</span><span class="ss">Reasoner</span><span class="w"> </span><span class="ss">Louis</span><span class="p">)</span>
<span class="w">                          </span><span class="p">(</span><span class="ss">computer</span><span class="w"> </span><span class="ss">programmer</span><span class="w"> </span><span class="ss">trainee</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">salary</span><span class="w"> </span><span class="p">(</span><span class="ss">Reasoner</span><span class="w"> </span><span class="ss">Louis</span><span class="p">)</span><span class="w"> </span><span class="mi">30000</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">supervisor</span><span class="w"> </span><span class="p">(</span><span class="ss">Reasoner</span><span class="w"> </span><span class="ss">Louis</span><span class="p">)</span>
<span class="w">                                 </span><span class="p">(</span><span class="ss">Hacker</span><span class="w"> </span><span class="ss">Alyssa</span><span class="w"> </span><span class="ss">P</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">supervisor</span><span class="w"> </span><span class="p">(</span><span class="ss">Bitdiddle</span><span class="w"> </span><span class="ss">Ben</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">Warbucks</span><span class="w"> </span><span class="ss">Oliver</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">address</span><span class="w"> </span><span class="p">(</span><span class="ss">Warbucks</span><span class="w"> </span><span class="ss">Oliver</span><span class="p">)</span>
<span class="w">                              </span><span class="p">(</span><span class="ss">Swellesley</span><span class="w"> </span><span class="p">(</span><span class="ss">Top</span><span class="w"> </span><span class="ss">Heap</span><span class="w"> </span><span class="ss">Road</span><span class="p">))))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">job</span><span class="w"> </span><span class="p">(</span><span class="ss">Warbucks</span><span class="w"> </span><span class="ss">Oliver</span><span class="p">)</span>
<span class="w">                          </span><span class="p">(</span><span class="ss">administration</span><span class="w"> </span><span class="ss">big</span><span class="w"> </span><span class="ss">wheel</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">salary</span><span class="w"> </span><span class="p">(</span><span class="ss">Warbucks</span><span class="w"> </span><span class="ss">Oliver</span><span class="p">)</span><span class="w"> </span><span class="mi">150000</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">address</span><span class="w"> </span><span class="p">(</span><span class="ss">Scrooge</span><span class="w"> </span><span class="ss">Eben</span><span class="p">)</span>
<span class="w">                              </span><span class="p">(</span><span class="ss">Weston</span><span class="w"> </span><span class="p">(</span><span class="ss">Shady</span><span class="w"> </span><span class="ss">Lane</span><span class="p">)</span><span class="w"> </span><span class="mi">10</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">job</span><span class="w"> </span><span class="p">(</span><span class="ss">Scrooge</span><span class="w"> </span><span class="ss">Eben</span><span class="p">)</span>
<span class="w">                          </span><span class="p">(</span><span class="ss">accounting</span><span class="w"> </span><span class="ss">chief</span><span class="w"> </span><span class="ss">accountant</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">salary</span><span class="w"> </span><span class="p">(</span><span class="ss">Scrooge</span><span class="w"> </span><span class="ss">Eben</span><span class="p">)</span><span class="w"> </span><span class="mi">75000</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">supervisor</span><span class="w"> </span><span class="p">(</span><span class="ss">Scrooge</span><span class="w"> </span><span class="ss">Eben</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">Warbucks</span><span class="w"> </span><span class="ss">Oliver</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">address</span><span class="w"> </span><span class="p">(</span><span class="ss">Cratchet</span><span class="w"> </span><span class="ss">Robert</span><span class="p">)</span>
<span class="w">                              </span><span class="p">(</span><span class="ss">Allston</span><span class="w"> </span><span class="p">(</span><span class="ss">N</span><span class="w"> </span><span class="ss">Harvard</span><span class="w"> </span><span class="ss">Street</span><span class="p">)</span><span class="w"> </span><span class="mi">16</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">job</span><span class="w"> </span><span class="p">(</span><span class="ss">Cratchet</span><span class="w"> </span><span class="ss">Robert</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">accounting</span><span class="w"> </span><span class="ss">scrivener</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">salary</span><span class="w"> </span><span class="p">(</span><span class="ss">Cratchet</span><span class="w"> </span><span class="ss">Robert</span><span class="p">)</span><span class="w"> </span><span class="mi">18000</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">supervisor</span><span class="w"> </span><span class="p">(</span><span class="ss">Cratchet</span><span class="w"> </span><span class="ss">Robert</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">Scrooge</span><span class="w"> </span><span class="ss">Eben</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">address</span><span class="w"> </span><span class="p">(</span><span class="ss">Aull</span><span class="w"> </span><span class="ss">DeWitt</span><span class="p">)</span>
<span class="w">                              </span><span class="p">(</span><span class="ss">Slumerville</span><span class="w"> </span><span class="p">(</span><span class="ss">Onion</span><span class="w"> </span><span class="ss">Square</span><span class="p">)</span><span class="w"> </span><span class="mi">5</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">job</span><span class="w"> </span><span class="p">(</span><span class="ss">Aull</span><span class="w"> </span><span class="ss">DeWitt</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">administration</span><span class="w"> </span><span class="ss">secretary</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">salary</span><span class="w"> </span><span class="p">(</span><span class="ss">Aull</span><span class="w"> </span><span class="ss">DeWitt</span><span class="p">)</span><span class="w"> </span><span class="mi">25000</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">supervisor</span><span class="w"> </span><span class="p">(</span><span class="ss">Aull</span><span class="w"> </span><span class="ss">DeWitt</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">Warbucks</span><span class="w"> </span><span class="ss">Oliver</span><span class="p">)))))</span>

<span class="p">(</span><span class="n">build-database</span><span class="p">)</span>

<span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="s2">&quot;Query (supervisor ?x (Bitdiddle Ben)):&quot;</span><span class="p">)</span>
<span class="p">(</span><span class="n">display-stream</span>
<span class="w"> </span><span class="p">(</span><span class="n">run-query</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">supervisor</span><span class="w"> </span><span class="ss">?x</span><span class="w"> </span><span class="p">(</span><span class="ss">Bitdiddle</span><span class="w"> </span><span class="ss">Ben</span><span class="p">))))</span>
<span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="c1">;; (supervisor (Tweakit Lem E) (Bitdiddle Ben))</span>
<span class="c1">;; (supervisor (Fect Cy D) (Bitdiddle Ben))</span>
<span class="c1">;; (supervisor (Hacker Alyssa P) (Bitdiddle Ben))</span>

<span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="s2">&quot;Query (job ?name (accounting . ?type)):&quot;</span><span class="p">)</span>
<span class="p">(</span><span class="n">display-stream</span>
<span class="w"> </span><span class="p">(</span><span class="n">run-query</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">job</span><span class="w"> </span><span class="ss">?name</span><span class="w"> </span><span class="p">(</span><span class="ss">accounting</span><span class="w"> </span><span class="o">.</span><span class="w"> </span><span class="ss">?type</span><span class="p">))))</span>
<span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="c1">;; (job (Cratchet Robert) (accounting scrivener))</span>
<span class="c1">;; (job (Scrooge Eben) (accounting chief accountant))</span>

<span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="s2">&quot;Query (address ?name (Slumerville . ?address)):&quot;</span><span class="p">)</span>
<span class="p">(</span><span class="n">display-stream</span>
<span class="w"> </span><span class="p">(</span><span class="n">run-query</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">address</span><span class="w"> </span><span class="ss">?name</span><span class="w"> </span><span class="p">(</span><span class="ss">Slumerville</span><span class="w"> </span><span class="o">.</span><span class="w"> </span><span class="ss">?address</span><span class="p">))))</span>
<span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="c1">;; (address (Aull DeWitt) (Slumerville (Onion Square) 5))</span>
<span class="c1">;; (address (Reasoner Louis) (Slumerville (Pine Tree Road) 80))</span>
<span class="c1">;; (address (Bitdiddle Ben) (Slumerville (Ridge Road) 10))</span>
</pre></div>

</details>
<div class="code-output">
<span>Output:</span>
<pre>ok

Query (supervisor ?x (Bitdiddle Ben)):
(supervisor (Tweakit Lem E) (Bitdiddle Ben))
(supervisor (Fect Cy D) (Bitdiddle Ben))
(supervisor (Hacker Alyssa P) (Bitdiddle Ben))

Query (job ?name (accounting . ?type)):
(job (Cratchet Robert) (accounting scrivener))
(job (Scrooge Eben) (accounting chief accountant))

Query (address ?name (Slumerville . ?address)):
(address (Aull DeWitt) (Slumerville (Onion Square) 5))
(address (Reasoner Louis) (Slumerville (Pine Tree Road) 80))
(address (Bitdiddle Ben) (Slumerville (Ridge Road) 10))
</pre>
</div>
</div>



### 1.5. Input-output-driver for compound queries
<div class="code-box" markdown="1">
<details class="collapsible-code">
<summary class="code-summary"><a href="code/4-4-compound-queries.rkt">code/4-4-compound-queries.rkt</a> <span class="expand-hint">(click to expand)</span></summary>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="c1">;; ===================================================================</span>
<span class="c1">;; =========================== ch2 Tools =============================</span>
<span class="c1">;; ===================================================================</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">operation-table</span><span class="w"> </span><span class="o">&#39;</span><span class="p">())</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">assoc</span><span class="w"> </span><span class="n">key</span><span class="w"> </span><span class="n">records</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">null?</span><span class="w"> </span><span class="n">records</span><span class="p">)</span><span class="w"> </span><span class="no">#f</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="nb">equal?</span><span class="w"> </span><span class="n">key</span><span class="w"> </span><span class="p">(</span><span class="nb">caar</span><span class="w"> </span><span class="n">records</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">records</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">assoc</span><span class="w"> </span><span class="n">key</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">records</span><span class="p">)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">assoc-op</span><span class="w"> </span><span class="n">key</span><span class="w"> </span><span class="n">records</span><span class="p">)</span>
<span class="w">   </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">null?</span><span class="w"> </span><span class="n">records</span><span class="p">)</span><span class="w"> </span><span class="no">#f</span><span class="p">)</span>
<span class="w">         </span><span class="p">((</span><span class="nb">equal?</span><span class="w"> </span><span class="n">key</span><span class="w"> </span><span class="p">(</span><span class="nb">caar</span><span class="w"> </span><span class="n">records</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">records</span><span class="p">))</span>
<span class="w">         </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="n">assoc-op</span><span class="w"> </span><span class="n">key</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">records</span><span class="p">)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">put</span><span class="w"> </span><span class="n">op</span><span class="w"> </span><span class="n">type-tags</span><span class="w"> </span><span class="n">proc</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">op-list-entry</span><span class="w"> </span><span class="p">(</span><span class="n">assoc-op</span><span class="w"> </span><span class="n">op</span><span class="w"> </span><span class="n">operation-table</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="n">op-list-entry</span>
<span class="w">        </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">proc-list</span><span class="w"> </span><span class="p">(</span><span class="nb">cadr</span><span class="w"> </span><span class="n">op-list-entry</span><span class="p">)))</span>
<span class="w">           </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">proc-pair-entry</span><span class="w"> </span><span class="p">(</span><span class="nb">assoc</span><span class="w"> </span><span class="n">type-tags</span><span class="w"> </span><span class="n">proc-list</span><span class="p">)))</span>
<span class="w">             </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="n">proc-pair-entry</span>
<span class="w">                 </span><span class="p">(</span><span class="n">set-cdr!</span><span class="w"> </span><span class="n">proc-pair-entry</span><span class="w"> </span><span class="n">proc</span><span class="p">)</span>
<span class="w">                 </span><span class="p">(</span><span class="n">set-car!</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">op-list-entry</span><span class="p">)</span>
<span class="w">                           </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">type-tags</span><span class="w"> </span><span class="n">proc</span><span class="p">)</span><span class="w"> </span><span class="n">proc-list</span><span class="p">)))))</span>
<span class="w">        </span><span class="p">(</span><span class="k">set!</span><span class="w"> </span><span class="n">operation-table</span>
<span class="w">              </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="n">op</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">type-tags</span><span class="w"> </span><span class="n">proc</span><span class="p">)))</span>
<span class="w">                    </span><span class="n">operation-table</span><span class="p">)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">get</span><span class="w"> </span><span class="n">op</span><span class="w"> </span><span class="n">type-tags</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">op-list-entry</span><span class="w"> </span><span class="p">(</span><span class="n">assoc-op</span><span class="w"> </span><span class="n">op</span><span class="w"> </span><span class="n">operation-table</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="n">op-list-entry</span>
<span class="w">        </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">proc-list</span><span class="w"> </span><span class="p">(</span><span class="nb">cadr</span><span class="w"> </span><span class="n">op-list-entry</span><span class="p">)))</span>
<span class="w">          </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">proc-pair-entry</span><span class="w"> </span><span class="p">(</span><span class="nb">assoc</span><span class="w"> </span><span class="n">type-tags</span><span class="w"> </span><span class="n">proc-list</span><span class="p">)))</span>
<span class="w">            </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="n">proc-pair-entry</span>
<span class="w">                </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">proc-pair-entry</span><span class="p">)</span>
<span class="w">                </span><span class="no">#f</span><span class="p">)))</span>
<span class="w">        </span><span class="no">#f</span><span class="p">)))</span>

<span class="c1">;; ===================================================================</span>
<span class="c1">;; =================== ch3 (stream) Tools ============================</span>
<span class="c1">;; ===================================================================</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="k">stream</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">force</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="o">.</span><span class="w"> </span><span class="n">argstreams</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))</span>
<span class="w">      </span><span class="n">the-empty-stream</span>
<span class="w">      </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">       </span><span class="p">(</span><span class="nb">apply</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="n">stream-car</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))</span>
<span class="w">       </span><span class="p">(</span><span class="nb">apply</span><span class="w"> </span><span class="nb">stream-map</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-append</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span>
<span class="w">      </span><span class="n">s2</span>
<span class="w">      </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">       </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span>
<span class="w">       </span><span class="p">(</span><span class="nb">stream-append</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span><span class="w"> </span><span class="n">s2</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-append-delayed</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">delayed-s2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="nb">force</span><span class="w"> </span><span class="n">delayed-s2</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">       </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span>
<span class="w">       </span><span class="p">(</span><span class="n">stream-append-delayed</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span>
<span class="w">                              </span><span class="n">delayed-s2</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">interleave-delayed</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">delayed-s2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="nb">force</span><span class="w"> </span><span class="n">delayed-s2</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">       </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span>
<span class="w">       </span><span class="p">(</span><span class="n">interleave-delayed</span>
<span class="w">        </span><span class="p">(</span><span class="nb">force</span><span class="w"> </span><span class="n">delayed-s2</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="k">delay</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s1</span><span class="p">))))))</span>

<span class="c1">; singleton-stream</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">singleton-stream</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">the-empty-stream</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-for-each</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="n">s</span><span class="p">))</span>
<span class="w">      </span><span class="p">(</span><span class="k">begin</span>
<span class="w">        </span><span class="p">(</span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="nb">stream-for-each</span><span class="w"> </span><span class="n">proc</span>
<span class="w">                         </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">display-stream</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-for-each</span><span class="w"> </span><span class="n">display-line</span><span class="w"> </span><span class="n">s</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>


<span class="c1">; stream-flatmap</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-flatmap</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">flatten-stream</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="n">s</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">flatten-stream</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span>
<span class="w">      </span><span class="n">the-empty-stream</span>
<span class="w">      </span><span class="p">(</span><span class="n">interleave-delayed</span>
<span class="w">       </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span>
<span class="w">       </span><span class="p">(</span><span class="k">delay</span><span class="w"> </span><span class="p">(</span><span class="n">flatten-stream</span>
<span class="w">               </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">))))))</span>
<span class="c1">;; ===================================================================</span>
<span class="c1">;; ========================= ch4 Stuff ===============================</span>
<span class="c1">;; ===================================================================</span>

<span class="c1">; =============== 4.4.4.8</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-binding</span><span class="w"> </span><span class="n">variable</span><span class="w"> </span><span class="n">value</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">variable</span><span class="w"> </span><span class="n">value</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">binding-variable</span><span class="w"> </span><span class="n">binding</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">binding</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">binding-value</span><span class="w"> </span><span class="n">binding</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">binding</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">binding-in-frame</span><span class="w"> </span><span class="n">variable</span><span class="w"> </span><span class="n">frame</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">assoc</span><span class="w"> </span><span class="n">variable</span><span class="w"> </span><span class="n">frame</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">extend</span><span class="w"> </span><span class="n">variable</span><span class="w"> </span><span class="n">value</span><span class="w"> </span><span class="n">frame</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="p">(</span><span class="n">make-binding</span><span class="w"> </span><span class="n">variable</span><span class="w"> </span><span class="n">value</span><span class="p">)</span><span class="w"> </span><span class="n">frame</span><span class="p">))</span>

<span class="c1">; =============== 4.4.4.5</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">THE-ASSERTIONS</span><span class="w"> </span><span class="n">the-empty-stream</span><span class="p">)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">fetch-assertions</span><span class="w"> </span><span class="n">pattern</span><span class="w"> </span><span class="n">frame</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">use-index?</span><span class="w"> </span><span class="n">pattern</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="n">get-indexed-assertions</span><span class="w"> </span><span class="n">pattern</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="n">get-all-assertions</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">get-all-assertions</span><span class="p">)</span><span class="w"> </span><span class="n">THE-ASSERTIONS</span><span class="p">)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">get-indexed-assertions</span><span class="w"> </span><span class="n">pattern</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">get-stream</span><span class="w"> </span><span class="p">(</span><span class="n">index-key-of</span><span class="w"> </span><span class="n">pattern</span><span class="p">)</span>
<span class="w">              </span><span class="o">&#39;</span><span class="ss">assertion-stream</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">get-stream</span><span class="w"> </span><span class="n">key1</span><span class="w"> </span><span class="n">key2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">s</span><span class="w"> </span><span class="p">(</span><span class="n">get</span><span class="w"> </span><span class="n">key1</span><span class="w"> </span><span class="n">key2</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">the-empty-stream</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">THE-RULES</span><span class="w"> </span><span class="n">the-empty-stream</span><span class="p">)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">fetch-rules</span><span class="w"> </span><span class="n">pattern</span><span class="w"> </span><span class="n">frame</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">use-index?</span><span class="w"> </span><span class="n">pattern</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="n">get-indexed-rules</span><span class="w"> </span><span class="n">pattern</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="n">get-all-rules</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">get-all-rules</span><span class="p">)</span><span class="w"> </span><span class="n">THE-RULES</span><span class="p">)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">get-indexed-rules</span><span class="w"> </span><span class="n">pattern</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-append</span>
<span class="w">   </span><span class="p">(</span><span class="n">get-stream</span><span class="w"> </span><span class="p">(</span><span class="n">index-key-of</span><span class="w"> </span><span class="n">pattern</span><span class="p">)</span>
<span class="w">               </span><span class="o">&#39;</span><span class="ss">rule-stream</span><span class="p">)</span>
<span class="w">   </span><span class="p">(</span><span class="n">get-stream</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">?</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">rule-stream</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">add-rule-or-assertion!</span><span class="w"> </span><span class="n">assertion</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">rule?</span><span class="w"> </span><span class="n">assertion</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="n">add-rule!</span><span class="w"> </span><span class="n">assertion</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="n">assertion</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="n">assertion</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">store-assertion-in-index</span><span class="w"> </span><span class="n">assertion</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">old-assertions</span><span class="w"> </span><span class="n">THE-ASSERTIONS</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="k">set!</span><span class="w"> </span><span class="n">THE-ASSERTIONS</span>
<span class="w">          </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="n">assertion</span><span class="w"> </span>
<span class="w">                       </span><span class="n">old-assertions</span><span class="p">))</span>
<span class="w">    </span><span class="o">&#39;</span><span class="ss">ok</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">add-rule!</span><span class="w"> </span><span class="n">rule</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">store-rule-in-index</span><span class="w"> </span><span class="n">rule</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">old-rules</span><span class="w"> </span><span class="n">THE-RULES</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="k">set!</span><span class="w"> </span><span class="n">THE-RULES</span>
<span class="w">          </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="n">rule</span><span class="w"> </span><span class="n">old-rules</span><span class="p">))</span>
<span class="w">    </span><span class="o">&#39;</span><span class="ss">ok</span><span class="p">))</span>


<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">store-assertion-in-index</span><span class="w"> </span><span class="n">assertion</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">indexable?</span><span class="w"> </span><span class="n">assertion</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">key</span><span class="w"> </span><span class="p">(</span><span class="n">index-key-of</span><span class="w"> </span><span class="n">assertion</span><span class="p">)))</span>
<span class="w">        </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">current-assertion-stream</span>
<span class="w">               </span><span class="p">(</span><span class="n">get-stream</span><span class="w"> </span>
<span class="w">                </span><span class="n">key</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">assertion-stream</span><span class="p">)))</span>
<span class="w">          </span><span class="p">(</span><span class="n">put</span><span class="w"> </span><span class="n">key</span>
<span class="w">               </span><span class="o">&#39;</span><span class="ss">assertion-stream</span>
<span class="w">               </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span>
<span class="w">                </span><span class="n">assertion</span>
<span class="w">                </span><span class="n">current-assertion-stream</span><span class="p">))))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">store-rule-in-index</span><span class="w"> </span><span class="n">rule</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">pattern</span><span class="w"> </span><span class="p">(</span><span class="n">conclusion</span><span class="w"> </span><span class="n">rule</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">indexable?</span><span class="w"> </span><span class="n">pattern</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">key</span><span class="w"> </span><span class="p">(</span><span class="n">index-key-of</span><span class="w"> </span><span class="n">pattern</span><span class="p">)))</span>
<span class="w">          </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">current-rule-stream</span>
<span class="w">                 </span><span class="p">(</span><span class="n">get-stream</span><span class="w"> </span>
<span class="w">                  </span><span class="n">key</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">rule-stream</span><span class="p">)))</span>
<span class="w">            </span><span class="p">(</span><span class="n">put</span><span class="w"> </span><span class="n">key</span>
<span class="w">                 </span><span class="o">&#39;</span><span class="ss">rule-stream</span>
<span class="w">                 </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span>
<span class="w">                  </span><span class="n">rule</span>
<span class="w">                  </span><span class="n">current-rule-stream</span><span class="p">)))))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">indexable?</span><span class="w"> </span><span class="n">pat</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">or</span><span class="w"> </span><span class="p">(</span><span class="n">constant-symbol?</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">pat</span><span class="p">))</span>
<span class="w">      </span><span class="p">(</span><span class="n">var?</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">pat</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">index-key-of</span><span class="w"> </span><span class="n">pat</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">key</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">pat</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">var?</span><span class="w"> </span><span class="n">key</span><span class="p">)</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">?</span><span class="w"> </span><span class="n">key</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">use-index?</span><span class="w"> </span><span class="n">pat</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">constant-symbol?</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">pat</span><span class="p">)))</span>

<span class="c1">; =============== 4.4.4.3 ================</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">find-assertions</span><span class="w"> </span><span class="n">pattern</span><span class="w"> </span><span class="n">frame</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">stream-flatmap</span>
<span class="w">    </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">datum</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="n">check-an-assertion</span><span class="w"> </span><span class="n">datum</span><span class="w"> </span><span class="n">pattern</span><span class="w"> </span><span class="n">frame</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="n">fetch-assertions</span><span class="w"> </span><span class="n">pattern</span><span class="w"> </span><span class="n">frame</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">check-an-assertion</span><span class="w"> </span>
<span class="w">         </span><span class="n">assertion</span><span class="w"> </span><span class="n">query-pat</span><span class="w"> </span><span class="n">query-frame</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">match-result</span>
<span class="w">         </span><span class="p">(</span><span class="n">pattern-match</span><span class="w"> </span>
<span class="w">          </span><span class="n">query-pat</span><span class="w"> </span><span class="n">assertion</span><span class="w"> </span><span class="n">query-frame</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">eq?</span><span class="w"> </span><span class="n">match-result</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">failed</span><span class="p">)</span>
<span class="w">        </span><span class="n">the-empty-stream</span>
<span class="w">        </span><span class="p">(</span><span class="n">singleton-stream</span><span class="w"> </span><span class="n">match-result</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">pattern-match</span><span class="w"> </span><span class="n">pat</span><span class="w"> </span><span class="n">dat</span><span class="w"> </span><span class="n">frame</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">frame</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">failed</span><span class="p">)</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">failed</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="nb">equal?</span><span class="w"> </span><span class="n">pat</span><span class="w"> </span><span class="n">dat</span><span class="p">)</span><span class="w"> </span><span class="n">frame</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="n">var?</span><span class="w"> </span><span class="n">pat</span><span class="p">)</span><span class="w"> </span>
<span class="w">         </span><span class="p">(</span><span class="n">extend-if-consistent</span><span class="w"> </span>
<span class="w">          </span><span class="n">pat</span><span class="w"> </span><span class="n">dat</span><span class="w"> </span><span class="n">frame</span><span class="p">))</span>
<span class="w">        </span><span class="p">((</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">pair?</span><span class="w"> </span><span class="n">pat</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">pair?</span><span class="w"> </span><span class="n">dat</span><span class="p">))</span>
<span class="w">         </span><span class="p">(</span><span class="n">pattern-match</span><span class="w"> </span>
<span class="w">          </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">pat</span><span class="p">)</span><span class="w"> </span>
<span class="w">          </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">dat</span><span class="p">)</span>
<span class="w">          </span><span class="p">(</span><span class="n">pattern-match</span>
<span class="w">           </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">pat</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">dat</span><span class="p">)</span><span class="w"> </span><span class="n">frame</span><span class="p">)))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">failed</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">extend-if-consistent</span><span class="w"> </span><span class="n">var</span><span class="w"> </span><span class="n">dat</span><span class="w"> </span><span class="n">frame</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">binding</span><span class="w"> </span><span class="p">(</span><span class="n">binding-in-frame</span><span class="w"> </span><span class="n">var</span><span class="w"> </span><span class="n">frame</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="n">binding</span>
<span class="w">        </span><span class="p">(</span><span class="n">pattern-match</span><span class="w"> </span>
<span class="w">         </span><span class="p">(</span><span class="n">binding-value</span><span class="w"> </span><span class="n">binding</span><span class="p">)</span><span class="w"> </span><span class="n">dat</span><span class="w"> </span><span class="n">frame</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="n">extend</span><span class="w"> </span><span class="n">var</span><span class="w"> </span><span class="n">dat</span><span class="w"> </span><span class="n">frame</span><span class="p">))))</span>


<span class="c1">;; ======================== 4.4.4.1</span>

<span class="c1">;; (define input-prompt  &quot;;;; Query input:&quot;)</span>
<span class="c1">;; (define output-prompt &quot;;;; Query results:&quot;)</span>
<span class="c1">;; </span>
<span class="c1">;; (define (query-driver-loop)</span>
<span class="c1">;;   (prompt-for-input input-prompt)</span>
<span class="c1">;;   (let ((q (query-syntax-process (read))))</span>
<span class="c1">;;     (cond ((assertion-to-be-added? q)</span>
<span class="c1">;;            (add-rule-or-assertion! </span>
<span class="c1">;;             (add-assertion-body q))</span>
<span class="c1">;;            (newline)</span>
<span class="c1">;;            (display </span>
<span class="c1">;;             &quot;Assertion added to data base.&quot;)</span>
<span class="c1">;;            (query-driver-loop))</span>
<span class="c1">;;           (else</span>
<span class="c1">;;            (newline)</span>
<span class="c1">;;            (display output-prompt)</span>
<span class="c1">;;            (display-stream</span>
<span class="c1">;;             (stream-map</span>
<span class="c1">;;              (lambda (frame)</span>
<span class="c1">;;                (instantiate</span>
<span class="c1">;;                 q</span>
<span class="c1">;;                 frame</span>
<span class="c1">;;                 (lambda (v f)</span>
<span class="c1">;;                   (contract-question-mark v))))</span>
<span class="c1">;;              (qeval q (singleton-stream &#39;()))))</span>
<span class="c1">;;            (query-driver-loop)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">run-query</span><span class="w"> </span><span class="n">input</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">q</span><span class="w"> </span><span class="p">(</span><span class="n">query-syntax-process</span><span class="w"> </span><span class="n">input</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="n">assertion-to-be-added?</span><span class="w"> </span><span class="n">q</span><span class="p">)</span>
<span class="w">           </span><span class="p">(</span><span class="n">add-rule-or-assertion!</span><span class="w"> </span>
<span class="w">            </span><span class="p">(</span><span class="n">add-assertion-body</span><span class="w"> </span><span class="n">q</span><span class="p">)))</span>
<span class="w">          </span><span class="p">(</span><span class="k">else</span>
<span class="w">           </span><span class="p">(</span><span class="nb">stream-map</span>
<span class="w">            </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">frame</span><span class="p">)</span>
<span class="w">              </span><span class="p">(</span><span class="k">instantiate</span>
<span class="w">               </span><span class="n">q</span>
<span class="w">               </span><span class="n">frame</span>
<span class="w">               </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">v</span><span class="w"> </span><span class="n">f</span><span class="p">)</span>
<span class="w">                 </span><span class="p">(</span><span class="n">contract-question-mark</span><span class="w"> </span><span class="n">v</span><span class="p">))))</span>
<span class="w">            </span><span class="p">(</span><span class="n">qeval</span><span class="w"> </span><span class="n">q</span><span class="w"> </span><span class="p">(</span><span class="n">singleton-stream</span><span class="w"> </span><span class="o">&#39;</span><span class="p">())))))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="k">instantiate</span>
<span class="w">         </span><span class="nb">exp</span><span class="w"> </span><span class="n">frame</span><span class="w"> </span><span class="n">unbound-var-handler</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">copy</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="n">var?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span>
<span class="w">           </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">binding</span>
<span class="w">                  </span><span class="p">(</span><span class="n">binding-in-frame</span>
<span class="w">                   </span><span class="nb">exp</span><span class="w"> </span><span class="n">frame</span><span class="p">)))</span>
<span class="w">             </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="n">binding</span>
<span class="w">                 </span><span class="p">(</span><span class="n">copy</span>
<span class="w">                  </span><span class="p">(</span><span class="n">binding-value</span><span class="w"> </span><span class="n">binding</span><span class="p">))</span>
<span class="w">                 </span><span class="p">(</span><span class="n">unbound-var-handler</span>
<span class="w">                  </span><span class="nb">exp</span><span class="w"> </span><span class="n">frame</span><span class="p">))))</span>
<span class="w">          </span><span class="p">((</span><span class="nb">pair?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span>
<span class="w">           </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="p">(</span><span class="n">copy</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="nb">exp</span><span class="p">))</span>
<span class="w">                 </span><span class="p">(</span><span class="n">copy</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="nb">exp</span><span class="p">))))</span>
<span class="w">          </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="nb">exp</span><span class="p">)))</span>
<span class="w">  </span><span class="p">(</span><span class="n">copy</span><span class="w"> </span><span class="nb">exp</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">qeval</span><span class="w"> </span><span class="n">query</span><span class="w"> </span><span class="n">frame-stream</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">qproc</span><span class="w"> </span><span class="p">(</span><span class="n">get</span><span class="w"> </span><span class="p">(</span><span class="n">type</span><span class="w"> </span><span class="n">query</span><span class="p">)</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">qeval</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="n">qproc</span>
<span class="w">        </span><span class="p">(</span><span class="n">qproc</span><span class="w"> </span><span class="p">(</span><span class="n">contents</span><span class="w"> </span><span class="n">query</span><span class="p">)</span><span class="w"> </span><span class="n">frame-stream</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="n">simple-query</span><span class="w"> </span><span class="n">query</span><span class="w"> </span><span class="n">frame-stream</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">simple-query</span><span class="w"> </span><span class="n">query-pattern</span><span class="w"> </span>
<span class="w">                      </span><span class="n">frame-stream</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">stream-flatmap</span>
<span class="w">   </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">frame</span><span class="p">)</span>
<span class="w">     </span><span class="p">(</span><span class="n">stream-append-delayed</span>
<span class="w">      </span><span class="p">(</span><span class="n">find-assertions</span><span class="w"> </span><span class="n">query-pattern</span><span class="w"> </span><span class="n">frame</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="k">delay</span><span class="w"> </span>
<span class="w">        </span><span class="p">(</span><span class="n">apply-rules</span><span class="w"> </span><span class="n">query-pattern</span><span class="w"> </span><span class="n">frame</span><span class="p">))))</span>
<span class="w">   </span><span class="n">frame-stream</span><span class="p">))</span>


<span class="c1">;; ======================= 4.4.4.7</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">type</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">pair?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;Unknown expression TYPE&quot;</span>
<span class="w">             </span><span class="nb">exp</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">tagged-list?</span><span class="w"> </span><span class="nb">exp</span><span class="w"> </span><span class="k">tag</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">pair?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="nb">eq?</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="k">tag</span><span class="p">)</span>
<span class="w">      </span><span class="k">false</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">contents</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">pair?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;Unknown expression CONTENTS&quot;</span>
<span class="w">             </span><span class="nb">exp</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">assertion-to-be-added?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">eq?</span><span class="w"> </span><span class="p">(</span><span class="n">type</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">assert!</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">add-assertion-body</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="p">(</span><span class="n">contents</span><span class="w"> </span><span class="nb">exp</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">empty-conjunction?</span><span class="w"> </span><span class="n">exps</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="n">exps</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">first-conjunct</span><span class="w"> </span><span class="n">exps</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">exps</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">rest-conjuncts</span><span class="w"> </span><span class="n">exps</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">exps</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">empty-disjunction?</span><span class="w"> </span><span class="n">exps</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="n">exps</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">first-disjunct</span><span class="w"> </span><span class="n">exps</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">exps</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">rest-disjuncts</span><span class="w"> </span><span class="n">exps</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">exps</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">negated-query</span><span class="w"> </span><span class="n">exps</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">exps</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">predicate</span><span class="w"> </span><span class="n">exps</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">exps</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">args</span><span class="w"> </span><span class="n">exps</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">exps</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">rule?</span><span class="w"> </span><span class="n">statement</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">tagged-list?</span><span class="w"> </span><span class="n">statement</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">rule</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">conclusion</span><span class="w"> </span><span class="n">rule</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cadr</span><span class="w"> </span><span class="n">rule</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">rule-body</span><span class="w"> </span><span class="n">rule</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="p">(</span><span class="nb">cddr</span><span class="w"> </span><span class="n">rule</span><span class="p">))</span>
<span class="w">      </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">always-true</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="nb">caddr</span><span class="w"> </span><span class="n">rule</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">query-syntax-process</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">map-over-symbols</span><span class="w"> </span><span class="n">expand-question-mark</span><span class="w"> </span><span class="nb">exp</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">map-over-symbols</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">pair?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span>
<span class="w">         </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="p">(</span><span class="n">map-over-symbols</span>
<span class="w">                </span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="nb">exp</span><span class="p">))</span>
<span class="w">               </span><span class="p">(</span><span class="n">map-over-symbols</span>
<span class="w">                </span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="nb">exp</span><span class="p">))))</span>
<span class="w">        </span><span class="p">((</span><span class="nb">symbol?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">proc</span><span class="w"> </span><span class="nb">exp</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="nb">exp</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">expand-question-mark</span><span class="w"> </span><span class="n">symbol</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">chars</span><span class="w"> </span><span class="p">(</span><span class="nb">symbol-&gt;string</span><span class="w"> </span><span class="n">symbol</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">string=?</span><span class="w"> </span><span class="p">(</span><span class="nb">substring</span><span class="w"> </span><span class="n">chars</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span><span class="w"> </span><span class="s2">&quot;?&quot;</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">?</span><span class="w"> </span><span class="p">(</span><span class="nb">string-&gt;symbol</span>
<span class="w">                  </span><span class="p">(</span><span class="nb">substring</span>
<span class="w">                   </span><span class="n">chars</span>
<span class="w">                   </span><span class="mi">1</span>
<span class="w">                   </span><span class="p">(</span><span class="nb">string-length</span><span class="w"> </span><span class="n">chars</span><span class="p">))))</span>
<span class="w">        </span><span class="n">symbol</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">var?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">tagged-list?</span><span class="w"> </span><span class="nb">exp</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">?</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">constant-symbol?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">symbol?</span><span class="w"> </span><span class="nb">exp</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">rule-counter</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">new-rule-application-id</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">set!</span><span class="w"> </span><span class="n">rule-counter</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="n">rule-counter</span><span class="p">))</span>
<span class="w">  </span><span class="n">rule-counter</span><span class="p">)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-new-variable</span>
<span class="w">         </span><span class="n">var</span><span class="w"> </span><span class="n">rule-application-id</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">?</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">rule-application-id</span>
<span class="w">                 </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">var</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">contract-question-mark</span><span class="w"> </span><span class="n">variable</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">string-&gt;symbol</span>
<span class="w">   </span><span class="p">(</span><span class="nb">string-append</span><span class="w"> </span><span class="s2">&quot;?&quot;</span>
<span class="w">     </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">number?</span><span class="w"> </span><span class="p">(</span><span class="nb">cadr</span><span class="w"> </span><span class="n">variable</span><span class="p">))</span>
<span class="w">         </span><span class="p">(</span><span class="nb">string-append</span>
<span class="w">          </span><span class="p">(</span><span class="nb">symbol-&gt;string</span><span class="w"> </span><span class="p">(</span><span class="nb">caddr</span><span class="w"> </span><span class="n">variable</span><span class="p">))</span>
<span class="w">          </span><span class="s2">&quot;-&quot;</span>
<span class="w">          </span><span class="p">(</span><span class="nb">number-&gt;string</span><span class="w"> </span><span class="p">(</span><span class="nb">cadr</span><span class="w"> </span><span class="n">variable</span><span class="p">)))</span>
<span class="w">         </span><span class="p">(</span><span class="nb">symbol-&gt;string</span><span class="w"> </span><span class="p">(</span><span class="nb">cadr</span><span class="w"> </span><span class="n">variable</span><span class="p">))))))</span>


<span class="c1">;; ======================== 4.4.4.2 Compound Queries</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">user-initial-environment</span><span class="w"> </span><span class="p">(</span><span class="n">scheme-report-environment</span><span class="w"> </span><span class="mi">5</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">always-true</span><span class="w"> </span><span class="n">ignore</span><span class="w"> </span><span class="n">frame-stream</span><span class="p">)</span>
<span class="w">  </span><span class="n">frame-stream</span><span class="p">)</span>
<span class="p">(</span><span class="n">put</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">always-true</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">qeval</span><span class="w"> </span><span class="n">always-true</span><span class="p">)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">execute</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">apply</span><span class="w"> </span><span class="p">(</span><span class="nb">eval</span><span class="w"> </span><span class="p">(</span><span class="n">predicate</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span>
<span class="w">               </span><span class="n">user-initial-environment</span><span class="p">)</span>
<span class="w">         </span><span class="p">(</span><span class="n">args</span><span class="w"> </span><span class="nb">exp</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">lisp-value</span><span class="w"> </span><span class="n">call</span><span class="w"> </span><span class="n">frame-stream</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">stream-flatmap</span>
<span class="w">   </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">frame</span><span class="p">)</span>
<span class="w">     </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">execute</span>
<span class="w">          </span><span class="p">(</span><span class="k">instantiate</span>
<span class="w">           </span><span class="n">call</span>
<span class="w">           </span><span class="n">frame</span>
<span class="w">           </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">v</span><span class="w"> </span><span class="n">f</span><span class="p">)</span>
<span class="w">             </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span>
<span class="w">              </span><span class="s2">&quot;Unknown pat var: LISP-VALUE&quot;</span><span class="w"> </span>
<span class="w">              </span><span class="n">v</span><span class="p">))))</span>
<span class="w">         </span><span class="p">(</span><span class="n">singleton-stream</span><span class="w"> </span><span class="n">frame</span><span class="p">)</span>
<span class="w">         </span><span class="n">the-empty-stream</span><span class="p">))</span>
<span class="w">   </span><span class="n">frame-stream</span><span class="p">))</span>
<span class="p">(</span><span class="n">put</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">lisp-value</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">qeval</span><span class="w"> </span><span class="n">lisp-value</span><span class="p">)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">negate</span><span class="w"> </span><span class="n">operands</span><span class="w"> </span><span class="n">frame-stream</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">stream-flatmap</span>
<span class="w">   </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">frame</span><span class="p">)</span>
<span class="w">     </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span>
<span class="w">          </span><span class="p">(</span><span class="n">qeval</span><span class="w"> </span><span class="p">(</span><span class="n">negated-query</span><span class="w"> </span><span class="n">operands</span><span class="p">)</span>
<span class="w">                 </span><span class="p">(</span><span class="n">singleton-stream</span><span class="w"> </span><span class="n">frame</span><span class="p">)))</span>
<span class="w">         </span><span class="p">(</span><span class="n">singleton-stream</span><span class="w"> </span><span class="n">frame</span><span class="p">)</span>
<span class="w">         </span><span class="n">the-empty-stream</span><span class="p">))</span>
<span class="w">   </span><span class="n">frame-stream</span><span class="p">))</span>
<span class="p">(</span><span class="n">put</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">not</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">qeval</span><span class="w"> </span><span class="nb">negate</span><span class="p">)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">conjoin</span><span class="w"> </span><span class="n">conjuncts</span><span class="w"> </span><span class="n">frame-stream</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">empty-conjunction?</span><span class="w"> </span><span class="n">conjuncts</span><span class="p">)</span>
<span class="w">      </span><span class="n">frame-stream</span>
<span class="w">      </span><span class="p">(</span><span class="nb">conjoin</span><span class="w"> </span><span class="p">(</span><span class="n">rest-conjuncts</span><span class="w"> </span><span class="n">conjuncts</span><span class="p">)</span>
<span class="w">               </span><span class="p">(</span><span class="n">qeval</span>
<span class="w">                </span><span class="p">(</span><span class="n">first-conjunct</span><span class="w"> </span><span class="n">conjuncts</span><span class="p">)</span>
<span class="w">                </span><span class="n">frame-stream</span><span class="p">))))</span>
<span class="p">(</span><span class="n">put</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">and</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">qeval</span><span class="w"> </span><span class="nb">conjoin</span><span class="p">)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">disjoin</span><span class="w"> </span><span class="n">disjuncts</span><span class="w"> </span><span class="n">frame-stream</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">empty-disjunction?</span><span class="w"> </span><span class="n">disjuncts</span><span class="p">)</span>
<span class="w">      </span><span class="n">the-empty-stream</span>
<span class="w">      </span><span class="p">(</span><span class="n">interleave-delayed</span>
<span class="w">       </span><span class="p">(</span><span class="n">qeval</span><span class="w"> </span><span class="p">(</span><span class="n">first-disjunct</span><span class="w"> </span><span class="n">disjuncts</span><span class="p">)</span>
<span class="w">              </span><span class="n">frame-stream</span><span class="p">)</span>
<span class="w">       </span><span class="p">(</span><span class="k">delay</span><span class="w"> </span><span class="p">(</span><span class="nb">disjoin</span>
<span class="w">               </span><span class="p">(</span><span class="n">rest-disjuncts</span><span class="w"> </span><span class="n">disjuncts</span><span class="p">)</span>
<span class="w">               </span><span class="n">frame-stream</span><span class="p">)))))</span>
<span class="p">(</span><span class="n">put</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">or</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">qeval</span><span class="w"> </span><span class="nb">disjoin</span><span class="p">)</span>

<span class="c1">; placeholder for rules</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">apply-rules</span><span class="w"> </span><span class="n">query-pattern</span><span class="w"> </span><span class="n">frame</span><span class="p">)</span><span class="w"> </span><span class="n">the-empty-stream</span><span class="p">)</span>

<span class="c1">;; Relevant Code</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">build-database</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">begin</span><span class="w"> </span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">address</span><span class="w"> </span><span class="p">(</span><span class="ss">Bitdiddle</span><span class="w"> </span><span class="ss">Ben</span><span class="p">)</span>
<span class="w">                              </span><span class="p">(</span><span class="ss">Slumerville</span><span class="w"> </span><span class="p">(</span><span class="ss">Ridge</span><span class="w"> </span><span class="ss">Road</span><span class="p">)</span><span class="w"> </span><span class="mi">10</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">job</span><span class="w"> </span><span class="p">(</span><span class="ss">Bitdiddle</span><span class="w"> </span><span class="ss">Ben</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">computer</span><span class="w"> </span><span class="ss">wizard</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">salary</span><span class="w"> </span><span class="p">(</span><span class="ss">Bitdiddle</span><span class="w"> </span><span class="ss">Ben</span><span class="p">)</span><span class="w"> </span><span class="mi">60000</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">address</span><span class="w"> </span><span class="p">(</span><span class="ss">Hacker</span><span class="w"> </span><span class="ss">Alyssa</span><span class="w"> </span><span class="ss">P</span><span class="p">)</span>
<span class="w">                              </span><span class="p">(</span><span class="ss">Cambridge</span><span class="w"> </span><span class="p">(</span><span class="ss">Mass</span><span class="w"> </span><span class="ss">Ave</span><span class="p">)</span><span class="w"> </span><span class="mi">78</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">job</span><span class="w"> </span><span class="p">(</span><span class="ss">Hacker</span><span class="w"> </span><span class="ss">Alyssa</span><span class="w"> </span><span class="ss">P</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">computer</span><span class="w"> </span><span class="ss">programmer</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">salary</span><span class="w"> </span><span class="p">(</span><span class="ss">Hacker</span><span class="w"> </span><span class="ss">Alyssa</span><span class="w"> </span><span class="ss">P</span><span class="p">)</span><span class="w"> </span><span class="mi">40000</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">supervisor</span><span class="w"> </span><span class="p">(</span><span class="ss">Hacker</span><span class="w"> </span><span class="ss">Alyssa</span><span class="w"> </span><span class="ss">P</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">Bitdiddle</span><span class="w"> </span><span class="ss">Ben</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">address</span><span class="w"> </span><span class="p">(</span><span class="ss">Fect</span><span class="w"> </span><span class="ss">Cy</span><span class="w"> </span><span class="ss">D</span><span class="p">)</span>
<span class="w">                              </span><span class="p">(</span><span class="ss">Cambridge</span><span class="w"> </span><span class="p">(</span><span class="ss">Ames</span><span class="w"> </span><span class="ss">Street</span><span class="p">)</span><span class="w"> </span><span class="mi">3</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">job</span><span class="w"> </span><span class="p">(</span><span class="ss">Fect</span><span class="w"> </span><span class="ss">Cy</span><span class="w"> </span><span class="ss">D</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">computer</span><span class="w"> </span><span class="ss">programmer</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">salary</span><span class="w"> </span><span class="p">(</span><span class="ss">Fect</span><span class="w"> </span><span class="ss">Cy</span><span class="w"> </span><span class="ss">D</span><span class="p">)</span><span class="w"> </span><span class="mi">35000</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">supervisor</span><span class="w"> </span><span class="p">(</span><span class="ss">Fect</span><span class="w"> </span><span class="ss">Cy</span><span class="w"> </span><span class="ss">D</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">Bitdiddle</span><span class="w"> </span><span class="ss">Ben</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">address</span><span class="w"> </span><span class="p">(</span><span class="ss">Tweakit</span><span class="w"> </span><span class="ss">Lem</span><span class="w"> </span><span class="ss">E</span><span class="p">)</span>
<span class="w">                              </span><span class="p">(</span><span class="ss">Boston</span><span class="w"> </span><span class="p">(</span><span class="ss">Bay</span><span class="w"> </span><span class="ss">State</span><span class="w"> </span><span class="ss">Road</span><span class="p">)</span><span class="w"> </span><span class="mi">22</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">job</span><span class="w"> </span><span class="p">(</span><span class="ss">Tweakit</span><span class="w"> </span><span class="ss">Lem</span><span class="w"> </span><span class="ss">E</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">computer</span><span class="w"> </span><span class="ss">technician</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">salary</span><span class="w"> </span><span class="p">(</span><span class="ss">Tweakit</span><span class="w"> </span><span class="ss">Lem</span><span class="w"> </span><span class="ss">E</span><span class="p">)</span><span class="w"> </span><span class="mi">25000</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">supervisor</span><span class="w"> </span><span class="p">(</span><span class="ss">Tweakit</span><span class="w"> </span><span class="ss">Lem</span><span class="w"> </span><span class="ss">E</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">Bitdiddle</span><span class="w"> </span><span class="ss">Ben</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">address</span><span class="w"> </span><span class="p">(</span><span class="ss">Reasoner</span><span class="w"> </span><span class="ss">Louis</span><span class="p">)</span>
<span class="w">                              </span><span class="p">(</span><span class="ss">Slumerville</span><span class="w"> </span><span class="p">(</span><span class="ss">Pine</span><span class="w"> </span><span class="ss">Tree</span><span class="w"> </span><span class="ss">Road</span><span class="p">)</span><span class="w"> </span><span class="mi">80</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">job</span><span class="w"> </span><span class="p">(</span><span class="ss">Reasoner</span><span class="w"> </span><span class="ss">Louis</span><span class="p">)</span>
<span class="w">                          </span><span class="p">(</span><span class="ss">computer</span><span class="w"> </span><span class="ss">programmer</span><span class="w"> </span><span class="ss">trainee</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">salary</span><span class="w"> </span><span class="p">(</span><span class="ss">Reasoner</span><span class="w"> </span><span class="ss">Louis</span><span class="p">)</span><span class="w"> </span><span class="mi">30000</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">supervisor</span><span class="w"> </span><span class="p">(</span><span class="ss">Reasoner</span><span class="w"> </span><span class="ss">Louis</span><span class="p">)</span>
<span class="w">                                 </span><span class="p">(</span><span class="ss">Hacker</span><span class="w"> </span><span class="ss">Alyssa</span><span class="w"> </span><span class="ss">P</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">supervisor</span><span class="w"> </span><span class="p">(</span><span class="ss">Bitdiddle</span><span class="w"> </span><span class="ss">Ben</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">Warbucks</span><span class="w"> </span><span class="ss">Oliver</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">address</span><span class="w"> </span><span class="p">(</span><span class="ss">Warbucks</span><span class="w"> </span><span class="ss">Oliver</span><span class="p">)</span>
<span class="w">                              </span><span class="p">(</span><span class="ss">Swellesley</span><span class="w"> </span><span class="p">(</span><span class="ss">Top</span><span class="w"> </span><span class="ss">Heap</span><span class="w"> </span><span class="ss">Road</span><span class="p">))))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">job</span><span class="w"> </span><span class="p">(</span><span class="ss">Warbucks</span><span class="w"> </span><span class="ss">Oliver</span><span class="p">)</span>
<span class="w">                          </span><span class="p">(</span><span class="ss">administration</span><span class="w"> </span><span class="ss">big</span><span class="w"> </span><span class="ss">wheel</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">salary</span><span class="w"> </span><span class="p">(</span><span class="ss">Warbucks</span><span class="w"> </span><span class="ss">Oliver</span><span class="p">)</span><span class="w"> </span><span class="mi">150000</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">address</span><span class="w"> </span><span class="p">(</span><span class="ss">Scrooge</span><span class="w"> </span><span class="ss">Eben</span><span class="p">)</span>
<span class="w">                              </span><span class="p">(</span><span class="ss">Weston</span><span class="w"> </span><span class="p">(</span><span class="ss">Shady</span><span class="w"> </span><span class="ss">Lane</span><span class="p">)</span><span class="w"> </span><span class="mi">10</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">job</span><span class="w"> </span><span class="p">(</span><span class="ss">Scrooge</span><span class="w"> </span><span class="ss">Eben</span><span class="p">)</span>
<span class="w">                          </span><span class="p">(</span><span class="ss">accounting</span><span class="w"> </span><span class="ss">chief</span><span class="w"> </span><span class="ss">accountant</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">salary</span><span class="w"> </span><span class="p">(</span><span class="ss">Scrooge</span><span class="w"> </span><span class="ss">Eben</span><span class="p">)</span><span class="w"> </span><span class="mi">75000</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">supervisor</span><span class="w"> </span><span class="p">(</span><span class="ss">Scrooge</span><span class="w"> </span><span class="ss">Eben</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">Warbucks</span><span class="w"> </span><span class="ss">Oliver</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">address</span><span class="w"> </span><span class="p">(</span><span class="ss">Cratchet</span><span class="w"> </span><span class="ss">Robert</span><span class="p">)</span>
<span class="w">                              </span><span class="p">(</span><span class="ss">Allston</span><span class="w"> </span><span class="p">(</span><span class="ss">N</span><span class="w"> </span><span class="ss">Harvard</span><span class="w"> </span><span class="ss">Street</span><span class="p">)</span><span class="w"> </span><span class="mi">16</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">job</span><span class="w"> </span><span class="p">(</span><span class="ss">Cratchet</span><span class="w"> </span><span class="ss">Robert</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">accounting</span><span class="w"> </span><span class="ss">scrivener</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">salary</span><span class="w"> </span><span class="p">(</span><span class="ss">Cratchet</span><span class="w"> </span><span class="ss">Robert</span><span class="p">)</span><span class="w"> </span><span class="mi">18000</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">supervisor</span><span class="w"> </span><span class="p">(</span><span class="ss">Cratchet</span><span class="w"> </span><span class="ss">Robert</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">Scrooge</span><span class="w"> </span><span class="ss">Eben</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">address</span><span class="w"> </span><span class="p">(</span><span class="ss">Aull</span><span class="w"> </span><span class="ss">DeWitt</span><span class="p">)</span>
<span class="w">                              </span><span class="p">(</span><span class="ss">Slumerville</span><span class="w"> </span><span class="p">(</span><span class="ss">Onion</span><span class="w"> </span><span class="ss">Square</span><span class="p">)</span><span class="w"> </span><span class="mi">5</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">job</span><span class="w"> </span><span class="p">(</span><span class="ss">Aull</span><span class="w"> </span><span class="ss">DeWitt</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">administration</span><span class="w"> </span><span class="ss">secretary</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">salary</span><span class="w"> </span><span class="p">(</span><span class="ss">Aull</span><span class="w"> </span><span class="ss">DeWitt</span><span class="p">)</span><span class="w"> </span><span class="mi">25000</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-assertion!</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">supervisor</span><span class="w"> </span><span class="p">(</span><span class="ss">Aull</span><span class="w"> </span><span class="ss">DeWitt</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">Warbucks</span><span class="w"> </span><span class="ss">Oliver</span><span class="p">)))))</span>

<span class="p">(</span><span class="n">build-database</span><span class="p">)</span>

<span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="s2">&quot;Query (and (supervisor ?x (Bitdiddle Ben))</span>
<span class="s2">    (address ?x ?address)):&quot;</span><span class="p">)</span>
<span class="p">(</span><span class="n">display-stream</span>
<span class="w"> </span><span class="p">(</span><span class="n">run-query</span><span class="w"> </span>
<span class="w">  </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">and</span><span class="w"> </span><span class="p">(</span><span class="ss">supervisor</span><span class="w"> </span><span class="ss">?x</span><span class="w"> </span><span class="p">(</span><span class="ss">Bitdiddle</span><span class="w"> </span><span class="ss">Ben</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="ss">address</span><span class="w"> </span><span class="ss">?x</span><span class="w"> </span><span class="ss">?address</span><span class="p">))))</span>
<span class="p">(</span><span class="nb">newline</span><span class="p">)</span>

<span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="s2">&quot;Query (and (supervisor ?person ?super)</span>
<span class="s2">     (job ?super (?division . ?type))</span>
<span class="s2">     (not (job ?super (computer . ?type)))):&quot;</span><span class="p">)</span>
<span class="p">(</span><span class="n">display-stream</span>
<span class="w"> </span><span class="p">(</span><span class="n">run-query</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">and</span><span class="w"> </span><span class="p">(</span><span class="ss">supervisor</span><span class="w"> </span><span class="ss">?person</span><span class="w"> </span><span class="ss">?super</span><span class="p">)</span>
<span class="w">     </span><span class="p">(</span><span class="ss">job</span><span class="w"> </span><span class="ss">?super</span><span class="w"> </span><span class="p">(</span><span class="ss">?division</span><span class="w"> </span><span class="o">.</span><span class="w"> </span><span class="ss">?type</span><span class="p">))</span>
<span class="w">     </span><span class="p">(</span><span class="ss">not</span><span class="w"> </span><span class="p">(</span><span class="ss">job</span><span class="w"> </span><span class="ss">?super</span><span class="w"> </span><span class="p">(</span><span class="ss">computer</span><span class="w"> </span><span class="o">.</span><span class="w"> </span><span class="ss">?type</span><span class="p">))))))</span>
<span class="p">(</span><span class="nb">newline</span><span class="p">)</span>

<span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="s2">&quot;Query (and (salary (Bitdiddle Ben) ?benamount)</span>
<span class="s2">     (salary ?person ?personamount)</span>
<span class="s2">     (lisp-value &lt; ?personamount ?benamount)):&quot;</span><span class="p">)</span>
<span class="p">(</span><span class="n">display-stream</span>
<span class="w"> </span><span class="p">(</span><span class="n">run-query</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">and</span><span class="w"> </span><span class="p">(</span><span class="ss">salary</span><span class="w"> </span><span class="p">(</span><span class="ss">Bitdiddle</span><span class="w"> </span><span class="ss">Ben</span><span class="p">)</span><span class="w"> </span><span class="ss">?benamount</span><span class="p">)</span>
<span class="w">     </span><span class="p">(</span><span class="ss">salary</span><span class="w"> </span><span class="ss">?person</span><span class="w"> </span><span class="ss">?personamount</span><span class="p">)</span>
<span class="w">     </span><span class="p">(</span><span class="ss">lisp-value</span><span class="w"> </span><span class="ss">&lt;</span><span class="w"> </span><span class="ss">?personamount</span><span class="w"> </span><span class="ss">?benamount</span><span class="p">))))</span>
<span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
</pre></div>

</details>
<div class="code-output">
<span>Output:</span>
<pre>ok

Query (and (supervisor ?x (Bitdiddle Ben))
    (address ?x ?address)):
(and (supervisor (Tweakit Lem E) (Bitdiddle Ben)) (address (Tweakit Lem E) (Boston (Bay State Road) 22)))
(and (supervisor (Fect Cy D) (Bitdiddle Ben)) (address (Fect Cy D) (Cambridge (Ames Street) 3)))
(and (supervisor (Hacker Alyssa P) (Bitdiddle Ben)) (address (Hacker Alyssa P) (Cambridge (Mass Ave) 78)))

Query (and (supervisor ?person ?super)
     (job ?super (?division . ?type))
     (not (job ?super (computer . ?type)))):
(and (supervisor (Aull DeWitt) (Warbucks Oliver)) (job (Warbucks Oliver) (administration big wheel)) (not (job (Warbucks Oliver) (computer big wheel))))
(and (supervisor (Cratchet Robert) (Scrooge Eben)) (job (Scrooge Eben) (accounting chief accountant)) (not (job (Scrooge Eben) (computer chief accountant))))
(and (supervisor (Scrooge Eben) (Warbucks Oliver)) (job (Warbucks Oliver) (administration big wheel)) (not (job (Warbucks Oliver) (computer big wheel))))
(and (supervisor (Bitdiddle Ben) (Warbucks Oliver)) (job (Warbucks Oliver) (administration big wheel)) (not (job (Warbucks Oliver) (computer big wheel))))

Query (and (salary (Bitdiddle Ben) ?benamount)
     (salary ?person ?personamount)
     (lisp-value &lt; ?personamount ?benamount)):
(and (salary (Bitdiddle Ben) 60000) (salary (Aull DeWitt) 25000) (lisp-value &lt; 25000 60000))
(and (salary (Bitdiddle Ben) 60000) (salary (Cratchet Robert) 18000) (lisp-value &lt; 18000 60000))
(and (salary (Bitdiddle Ben) 60000) (salary (Reasoner Louis) 30000) (lisp-value &lt; 30000 60000))
(and (salary (Bitdiddle Ben) 60000) (salary (Tweakit Lem E) 25000) (lisp-value &lt; 25000 60000))
(and (salary (Bitdiddle Ben) 60000) (salary (Fect Cy D) 35000) (lisp-value &lt; 35000 60000))
(and (salary (Bitdiddle Ben) 60000) (salary (Hacker Alyssa P) 40000) (lisp-value &lt; 40000 60000))
</pre>
</div>
</div>


## 2. Rules and Unification

### 2.1 Unification (Extending Simple Pattern Matching)

We defined `(pattern-match pat dat frame)` in section 1.2 of this note.
Now, we allow `dat` to also be a pattern. So our new function will be
more complicated but a bit more symmetric, `(unify-match p1 p2 frame)`.



If we imagine performing a match where one of `p1` or `p2` contain no
pattern variables, then the behavior is exactly like `pattern-match`.
Therefore, we want the following behavior:

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="nb">display</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="n">unify-match</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">+</span><span class="w"> </span><span class="p">(</span><span class="ss">?</span><span class="w"> </span><span class="ss">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">*</span><span class="w"> </span><span class="mi">5</span><span class="w"> </span><span class="mi">4</span><span class="p">))</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">+</span><span class="w"> </span><span class="mi">3</span><span class="w"> </span><span class="p">(</span><span class="ss">*</span><span class="w"> </span><span class="mi">5</span><span class="w"> </span><span class="mi">4</span><span class="p">))</span><span class="w"> </span><span class="o">&#39;</span><span class="p">()))</span>
<span class="c1">;; (((? x) . 3))</span>
<span class="p">(</span><span class="nb">display</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="n">unify-match</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">+</span><span class="w"> </span><span class="mi">3</span><span class="w"> </span><span class="p">(</span><span class="ss">*</span><span class="w"> </span><span class="mi">5</span><span class="w"> </span><span class="mi">4</span><span class="p">))</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">+</span><span class="w"> </span><span class="mi">3</span><span class="w"> </span><span class="p">(</span><span class="ss">*</span><span class="w"> </span><span class="mi">5</span><span class="w"> </span><span class="p">(</span><span class="ss">?</span><span class="w"> </span><span class="ss">w</span><span class="p">)))</span><span class="w"> </span><span class="o">&#39;</span><span class="p">()))</span>
<span class="c1">;; (((? w) . 4))</span>
</pre></div>

It's very easy to write this in a way such that the generic case 
with non-conflicting patterns on both sides is handled correctly. Just like
`query-pattern`, we do a depth first search from left-to-right.

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="nb">display</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="n">unify-match</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">+</span><span class="w"> </span><span class="p">(</span><span class="ss">?</span><span class="w"> </span><span class="ss">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">*</span><span class="w"> </span><span class="p">(</span><span class="ss">?</span><span class="w"> </span><span class="ss">y</span><span class="p">)</span><span class="w"> </span><span class="mi">4</span><span class="p">))</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">+</span><span class="w"> </span><span class="mi">3</span><span class="w"> </span><span class="p">(</span><span class="ss">*</span><span class="w"> </span><span class="mi">5</span><span class="w"> </span><span class="p">(</span><span class="ss">?</span><span class="w"> </span><span class="ss">w</span><span class="p">)))</span><span class="w"> </span><span class="o">&#39;</span><span class="p">()))</span>
<span class="c1">;; (((? w) . 4) ((? y) . 5) ((? x) . 3))</span>
</pre></div>

Now, the slightly clever stuff, we also handle cases where 
the substitution values are themselves variables.

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="nb">display</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="n">unify-match</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">+</span><span class="w"> </span><span class="p">(</span><span class="ss">?</span><span class="w"> </span><span class="ss">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">*</span><span class="w"> </span><span class="p">(</span><span class="ss">?</span><span class="w"> </span><span class="ss">y</span><span class="p">)</span><span class="w"> </span><span class="mi">4</span><span class="p">))</span><span class="w"> </span>
<span class="w">               </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">+</span><span class="w"> </span><span class="mi">3</span><span class="w"> </span><span class="p">(</span><span class="ss">*</span><span class="w"> </span><span class="p">(</span><span class="ss">?</span><span class="w"> </span><span class="ss">z</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">?</span><span class="w"> </span><span class="ss">w</span><span class="p">)))</span><span class="w"> </span><span class="o">&#39;</span><span class="p">()))</span>
<span class="c1">;; (((? w) . 4) ((? y) ? z) ((? x) . 3))</span>

<span class="p">(</span><span class="nb">display</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="n">unify-match</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">+</span><span class="w"> </span><span class="p">(</span><span class="ss">?</span><span class="w"> </span><span class="ss">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">*</span><span class="w"> </span><span class="p">(</span><span class="ss">?</span><span class="w"> </span><span class="ss">y</span><span class="p">)</span><span class="w"> </span><span class="mi">4</span><span class="p">))</span><span class="w"> </span>
<span class="w">               </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">+</span><span class="w"> </span><span class="mi">3</span><span class="w"> </span><span class="p">(</span><span class="ss">*</span><span class="w"> </span><span class="p">(</span><span class="ss">?</span><span class="w"> </span><span class="ss">y</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">?</span><span class="w"> </span><span class="ss">w</span><span class="p">)))</span><span class="w"> </span><span class="o">&#39;</span><span class="p">()))</span>
<span class="c1">;; (((? w) . 4) ((? x) . 3))</span>

<span class="p">(</span><span class="nb">display</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="n">unify-match</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">+</span><span class="w"> </span><span class="p">(</span><span class="ss">?</span><span class="w"> </span><span class="ss">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">*</span><span class="w"> </span><span class="mi">5</span><span class="w"> </span><span class="p">(</span><span class="ss">?</span><span class="w"> </span><span class="ss">y</span><span class="p">)))</span><span class="w"> </span>
<span class="w">               </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">+</span><span class="w"> </span><span class="p">(</span><span class="ss">f</span><span class="w"> </span><span class="p">(</span><span class="ss">?</span><span class="w"> </span><span class="ss">y</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="ss">*</span><span class="w"> </span><span class="mi">5</span><span class="w"> </span><span class="mi">4</span><span class="p">))</span><span class="w"> </span><span class="o">&#39;</span><span class="p">()))</span>
<span class="c1">;; (((? y) . 4) ((? x) f (? y)))</span>
</pre></div>

In the third example, note that the `instantiate` function handles the rule
substitution properly.

There are cases where the left-to-right 

<div class="codehilite"><pre><span></span>(display 
  (unify-match &#39;(+ (f (? x)) (* 5 (? x))) 
               &#39;(+ (? y) (* 5 4)) &#39;()))
;; (((? x) . 4) ((? y) f (? x)))

(display 
  (unify-match &#39;(+ (? x) (* (? y) (? z))) 
               &#39;(+ (? z) (* (? x) (? y))) &#39;()))
;; (((? y) ? z) ((? x) ? z))
</pre></div>



The goal of `unify-match` is to find a frame
extension that makes both patterns equal to each other,  


`(define 


###

###

# My Misconceptions

## "The output of a Query"
In 4.4.1, we give the example of the query:
<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="n">job</span><span class="w"> </span><span class="n">?person</span><span class="w"> </span><span class="p">(</span><span class="n">computer</span><span class="w"> </span><span class="n">programmer</span><span class="p">))</span>
<span class="w">     </span><span class="p">(</span><span class="n">address</span><span class="w"> </span><span class="n">?person</span><span class="w"> </span><span class="n">?where</span><span class="p">))</span>
</pre></div>

giving the output 
<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="n">job</span><span class="w"> </span><span class="p">(</span><span class="n">Hacker</span><span class="w"> </span><span class="n">Alyssa</span><span class="w"> </span><span class="n">P</span><span class="p">)</span><span class="w"> </span>
<span class="w">          </span><span class="p">(</span><span class="n">computer</span><span class="w"> </span><span class="n">programmer</span><span class="p">))</span>
<span class="w">     </span><span class="p">(</span><span class="n">address</span><span class="w"> </span><span class="p">(</span><span class="n">Hacker</span><span class="w"> </span><span class="n">Alyssa</span><span class="w"> </span><span class="n">P</span><span class="p">)</span><span class="w"> </span>
<span class="w">              </span><span class="p">(</span><span class="n">Cambridge</span><span class="w"> </span><span class="p">(</span><span class="n">Mass</span><span class="w"> </span><span class="n">Ave</span><span class="p">)</span><span class="w"> </span><span class="mi">78</span><span class="p">)))</span>

<span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="n">job</span><span class="w"> </span><span class="p">(</span><span class="n">Fect</span><span class="w"> </span><span class="n">Cy</span><span class="w"> </span><span class="n">D</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">computer</span><span class="w"> </span><span class="n">programmer</span><span class="p">))</span>
<span class="w">     </span><span class="p">(</span><span class="n">address</span><span class="w"> </span><span class="p">(</span><span class="n">Fect</span><span class="w"> </span><span class="n">Cy</span><span class="w"> </span><span class="n">D</span><span class="p">)</span><span class="w"> </span>
<span class="w">              </span><span class="p">(</span><span class="n">Cambridge</span><span class="w"> </span><span class="p">(</span><span class="n">Ames</span><span class="w"> </span><span class="n">Street</span><span class="p">)</span><span class="w"> </span><span class="mi">3</span><span class="p">)))</span>
</pre></div>

The book also says "the output of the query is a stream of frames." 
You might think this means that our two `(and ...)` statements are the
two elements in the stream of frames, but this is incorrect! In my opinion
the book's phrasing is highly misleading here, the stream of frames which is
relevant to our query has two elements, which are:

<div class="codehilite"><pre><span></span><span class="o">&#39;</span><span class="p">(((</span><span class="ss">?</span><span class="w"> </span><span class="ss">person</span><span class="p">)</span><span class="w"> </span><span class="o">.</span><span class="w"> </span><span class="p">(</span><span class="ss">Hacker</span><span class="w"> </span><span class="ss">Alyssa</span><span class="w"> </span><span class="ss">P</span><span class="p">))</span><span class="w"> </span><span class="p">((</span><span class="ss">?</span><span class="w"> </span><span class="ss">where</span><span class="p">)</span><span class="w"> </span><span class="o">.</span><span class="w"> </span><span class="p">(</span><span class="ss">Cambridge</span><span class="w"> </span><span class="p">(</span><span class="ss">Mass</span><span class="w"> </span><span class="ss">Ave</span><span class="p">)</span><span class="w"> </span><span class="mi">78</span><span class="p">)))</span>
<span class="o">&#39;</span><span class="p">(((</span><span class="ss">?</span><span class="w"> </span><span class="ss">person</span><span class="p">)</span><span class="w"> </span><span class="o">.</span><span class="w"> </span><span class="p">(</span><span class="ss">Fect</span><span class="w"> </span><span class="ss">Cy</span><span class="w"> </span><span class="ss">D</span><span class="p">))</span><span class="w"> </span><span class="p">((</span><span class="ss">?</span><span class="w"> </span><span class="ss">where</span><span class="p">)</span><span class="w"> </span><span class="o">.</span><span class="w"> </span><span class="p">(</span><span class="ss">Cambridge</span><span class="w"> </span><span class="p">(</span><span class="ss">Ames</span><span class="w"> </span><span class="ss">Street</span><span class="p">)</span><span class="w"> </span><span class="mi">3</span><span class="p">)))</span>
</pre></div>

Later (in 4.4.4.1) we `instantiate` those frames using the input query expression, the 
frame, and a function to handle unbound variables:
<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="k">instantiate</span><span class="w"> </span>
<span class="w">         </span><span class="nb">exp</span><span class="w"> </span><span class="n">frame</span><span class="w"> </span><span class="n">unbound-var-handler</span><span class="p">)</span><span class="w"> </span><span class="k">...</span><span class="p">)</span>
</pre></div>






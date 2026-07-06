---
layout: sicp
render_with_liquid: false
title: SICP Chapter 2.3
---

<div class="nav">
    <span class="activenav"><a href="notes-ch2-2.html">← Previous</a></span>
    <span class="activenav"><a href="../index.html">↑ Up</a></span>
    <span class="activenav"><a href="notes-ch2-4.html">Next →</a></span>
</div>


[HTML Book Chapter 2.3 Link](https://sarabander.github.io/sicp/html/2_002e3.xhtml#g_t2_002e3)

## Directory
- [Section 2.3](#section-23)
  - [Meeting 04-20-2025](#meeting-04-20-2025)
  - [Note on my confusion with Wolfram Language](#note-on-my-confusion-with-wolfram-language)
  - [Experimenting w/ derivatives](#experimenting-w-derivatives)
  - [Exercises](#exercises)
    - *Exercises:* ([Exercise 2.53](#exercise-253), [Exercise 2.54](#exercise-254), [Exercise 2.55](#exercise-255), [Exercise 2.56](#exercise-256), [Exercise 2.57](#exercise-257), [Exercise 2.58](#exercise-258), [Exercise 2.59](#exercise-259), [Exercise 2.60](#exercise-260), [Exercise 2.61](#exercise-261), [Exercise 2.62](#exercise-262), [Exercise 2.63](#exercise-263), [Exercise 2.64](#exercise-264), [Exercise 2.65](#exercise-265), [Exercise 2.66](#exercise-266), [Exercise 2.67](#exercise-267), [Exercise 2.68](#exercise-268), [Exercise 2.69](#exercise-269), [Exercise 2.70](#exercise-270), [Exercise 2.71](#exercise-271), [Exercise 2.72](#exercise-272))

## Section 2.3

### Meeting 04-20-2025

<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>
<span class="c1">;; true</span>
<span class="p">(</span><span class="nb">equal?</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">a</span><span class="w"> </span><span class="ss">b</span><span class="w"> </span><span class="ss">c</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">a</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">b</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">c</span><span class="p">))</span>

<span class="c1">;; false</span>
<span class="p">(</span><span class="nb">eq?</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">a</span><span class="w"> </span><span class="ss">b</span><span class="w"> </span><span class="ss">c</span><span class="p">)</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">a</span><span class="w"> </span><span class="ss">b</span><span class="w"> </span><span class="ss">c</span><span class="p">))</span>

<span class="c1">;; These three are equivalent: </span>
<span class="n">nil</span>
<span class="o">&#39;</span><span class="p">()</span>
<span class="p">(</span><span class="nb">list</span><span class="p">)</span>

<span class="c1">;; These are ~equivalent ...?</span>
<span class="o">&#39;</span><span class="p">(</span><span class="ss">a</span><span class="w"> </span><span class="ss">b</span><span class="w"> </span><span class="ss">c</span><span class="p">)</span>
<span class="p">(</span><span class="k">quote</span><span class="w"> </span><span class="p">(</span><span class="ss">a</span><span class="w"> </span><span class="ss">b</span><span class="w"> </span><span class="ss">c</span><span class="p">))</span>
<span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">a</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">b</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">c</span><span class="p">)</span>
<span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="p">(</span><span class="k">quote</span><span class="w"> </span><span class="ss">a</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="k">quote</span><span class="w"> </span><span class="ss">b</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="k">quote</span><span class="w"> </span><span class="ss">c</span><span class="p">))</span>
</pre></div>

My solution to problem 2.54 was bad and had exceptions. Also, `symbol?` wasn't introduced until after this problem, so it really is probably not be the intended way.

<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">equal?</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">or</span><span class="w"> </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">symbol?</span><span class="w"> </span><span class="n">a</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">symbol?</span><span class="w"> </span><span class="n">b</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">eq?</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="p">))</span>
<span class="w">      </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="n">a</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="n">b</span><span class="p">))</span>
<span class="w">      </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">pair?</span><span class="w"> </span><span class="n">a</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">pair?</span><span class="w"> </span><span class="n">b</span><span class="p">)</span><span class="w"> </span>
<span class="w">           </span><span class="p">(</span><span class="nb">equal?</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">a</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">b</span><span class="p">))</span>
<span class="w">           </span><span class="p">(</span><span class="nb">equal?</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">a</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">b</span><span class="p">)))))</span>

<span class="c1">;;Some test cases:</span>
<span class="p">(</span><span class="nb">equal?</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">this</span><span class="w"> </span><span class="ss">is</span><span class="w"> </span><span class="ss">a</span><span class="w"> </span><span class="ss">list</span><span class="p">)</span><span class="w"> </span>
<span class="w">        </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">this</span><span class="w"> </span><span class="ss">is</span><span class="w"> </span><span class="ss">a</span><span class="w"> </span><span class="ss">list</span><span class="p">))</span>
<span class="p">(</span><span class="nb">equal?</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">this</span><span class="w"> </span><span class="ss">is</span><span class="w"> </span><span class="ss">a</span><span class="w"> </span><span class="ss">list</span><span class="p">)</span><span class="w"> </span>
<span class="w">        </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">this</span><span class="w"> </span><span class="p">(</span><span class="ss">is</span><span class="w"> </span><span class="ss">a</span><span class="p">)</span><span class="w"> </span><span class="ss">list</span><span class="p">))</span>
<span class="p">(</span><span class="nb">equal?</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">this</span><span class="w"> </span><span class="p">(</span><span class="ss">is</span><span class="w"> </span><span class="ss">a</span><span class="p">)</span><span class="w"> </span><span class="ss">list</span><span class="p">)</span><span class="w"> </span>
<span class="w">        </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">this</span><span class="w"> </span><span class="p">(</span><span class="ss">is</span><span class="w"> </span><span class="ss">a</span><span class="p">)</span><span class="w"> </span><span class="ss">list</span><span class="p">))</span>
<span class="p">(</span><span class="nb">equal?</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">a</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">a</span><span class="w"> </span><span class="ss">b</span><span class="w"> </span><span class="ss">c</span><span class="p">))</span>

<span class="c1">;; Failure case! </span>
<span class="p">(</span><span class="nb">equal?</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="mi">3</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="mi">3</span><span class="p">))</span>
</pre></div>

Here was Erik's solution which might be a bit better or be the intended way:
<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">myequal?</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="n">a</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="n">b</span><span class="p">))</span><span class="w"> </span><span class="no">#t</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="k">or</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="n">a</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="n">b</span><span class="p">))</span><span class="w"> </span><span class="no">#f</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="nb">pair?</span><span class="w"> </span><span class="n">a</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="nb">pair?</span><span class="w"> </span><span class="n">b</span><span class="p">)))</span><span class="w"> </span><span class="p">(</span><span class="nb">eq?</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="p">))</span>
<span class="w">        </span><span class="p">((</span><span class="k">or</span><span class="w"> </span><span class="p">(</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="nb">pair?</span><span class="w"> </span><span class="n">a</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="nb">pair?</span><span class="w"> </span><span class="n">b</span><span class="p">)))</span><span class="w"> </span><span class="no">#f</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span>
<span class="w">         </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="n">myequal?</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">a</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">b</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="n">myequal?</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">a</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">b</span><span class="p">))))))</span>
</pre></div>


More conversation about eq:

- "If obj1 and obj2 are both aggregate types, equal? compares its elements recursively."

- https://practical-scheme.net/gauche/man/gauche-refe/Equality-and-comparison.html

- https://www.gnu.org/software/guile/manual/html_node/Equality.html

- https://beautifulracket.com/explainer/equality.html


Back to the chapter:

 - Autodiff and problem 2.58. I found it interesting that the shunting yard algorithm wasn't used. Animation of the shunting yard algo: https://somethingorotherwhatever.com/shunting-yard-animation/

 - Guile is the GNU implementation of scheme. You could say scheme is a minimal lisp.

- https://github.com/zv/SICP-guile


 - For the proof of the optimality of huffman encoding, https://static.ias.edu/pitp/archive/2012files/Hamming_CHs1-3.pdf

 - https://norvig.com/ngrams/

 - https://news.ycombinator.com/item?id=13918465 - useful links in here! Some of the links are dead but can be accessed with internet archive.

 - https://www.youtube.com/watch?v=ZtTqRH1uwu4


### Note on my confusion with Wolfram Language

So far I have been able to identify WL expressions like `f[x,y]` 
with LISP expressions `(f x y)`. But this nice correspondence is slightly 
broken in this chapter. 

In Mathematica, `List[Quote[a],Quote[b],Quote[c]]` is different from `Quote[List[a,b,c]]` (you could compare them using `===`).

But in Scheme, it appears `(list 'a 'b 'c)` and `'(a b c)` are the same (compare with `equal?`).

If we had the perfect correspondence

`(f x y)` <=> `f[x,y]`

Then I would assume quoting might give something like this:

`'(f x y)` <=> `"f"["x","y"]` (because `"f[x,y]"` seems too boring)

But in fact it seems like the correspondence is more akin to:

`'(f x y)` <=> `List["f","x","y"]`.

This might be the first thing that is a strict difference in convention between WL and Lisp.

*Note to reader:* I'm not sure of this! Those are just my thoughts while learning.

<div class="code-box" markdown="1">
<div class="code-header"><a href="code/ex2-53b.rkt">code/ex2-53b.rkt</a></div>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">racket</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">quoted-list</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">a</span><span class="w"> </span><span class="ss">b</span><span class="w"> </span><span class="ss">c</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">list-of-quotes</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">a</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">b</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">c</span><span class="p">))</span>

<span class="p">(</span><span class="nb">displayln</span><span class="w"> </span><span class="s2">&quot;Are (list &#39;a &#39;b &#39;c) and &#39;(a b c) structurally equal?&quot;</span><span class="p">)</span>
<span class="p">(</span><span class="nb">displayln</span><span class="w"> </span><span class="p">(</span><span class="nb">equal?</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">a</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">b</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">c</span><span class="p">)</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">a</span><span class="w"> </span><span class="ss">b</span><span class="w"> </span><span class="ss">c</span><span class="p">)))</span><span class="w"> </span><span class="c1">; =&gt; #t</span>
<span class="p">(</span><span class="nb">displayln</span><span class="w"> </span><span class="p">(</span><span class="nb">equal?</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="p">(</span><span class="k">quote</span><span class="w"> </span><span class="ss">a</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="k">quote</span><span class="w"> </span><span class="ss">b</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="k">quote</span><span class="w"> </span><span class="ss">c</span><span class="p">))</span><span class="w"> </span>
<span class="w">                   </span><span class="p">(</span><span class="k">quote</span><span class="w"> </span><span class="p">(</span><span class="ss">a</span><span class="w"> </span><span class="ss">b</span><span class="w"> </span><span class="ss">c</span><span class="p">))))</span><span class="w"> </span><span class="c1">; =&gt; #t</span>
</pre></div>
<div class="code-output">
<span>Output:</span>
<pre>Are (list &#x27;a &#x27;b &#x27;c) and &#x27;(a b c) structurally equal?
#t
#t
</pre>
</div>
</div>


<div class="code-box" markdown="1">
<div class="code-header"><a href="code/ex2-53b.wl">code/ex2-53b.wl</a></div>
<div class="codehilite"><pre><span></span>expr1 = List[Quote[a],Quote[b],Quote[c]];
expr2 = Quote[List[a,b,c]];
expr1 === expr2
</pre></div>
</div>


Silly aside about @@:

<div class="code-box" markdown="1">
<div class="code-header"><a href="code/ex2-53c.rkt">code/ex2-53c.rkt</a></div>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">@@</span><span class="w"> </span><span class="n">f</span><span class="w"> </span><span class="n">lst</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">f</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">lst</span><span class="p">)))</span>

<span class="p">(</span><span class="n">@@</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">g</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">f</span><span class="w"> </span><span class="ss">x</span><span class="w"> </span><span class="ss">y</span><span class="p">))</span>
</pre></div>
<div class="code-output">
<span>Output:</span>
<pre>(g x y)
</pre>
</div>
</div>


Tamwile in twitch chat says this is the equivalent in prolog:

<div class="codehilite"><pre><span></span><span class="c1">% Request to prolog.</span>
<span class="s s-Atom">?-</span> <span class="nf">foo</span><span class="p">(</span><span class="nv">X</span><span class="p">,</span><span class="nv">Y</span><span class="p">)</span> <span class="s s-Atom">=..</span> <span class="p">[</span><span class="nv">Head</span><span class="p">|</span><span class="nv">Tail</span><span class="p">],</span> <span class="nv">New</span> <span class="s s-Atom">=..</span> <span class="p">[</span><span class="s s-Atom">bar</span><span class="p">|</span><span class="nv">Tail</span><span class="p">].</span>
<span class="c1">% Answer of prolog</span>
   <span class="nv">Head</span> <span class="o">=</span> <span class="s s-Atom">foo</span><span class="p">,</span> <span class="nv">Tail</span> <span class="o">=</span> <span class="p">[</span><span class="nv">X</span><span class="p">,</span><span class="nv">Y</span><span class="p">],</span> <span class="nv">New</span> <span class="o">=</span> <span class="nf">bar</span><span class="p">(</span><span class="nv">X</span><span class="p">,</span><span class="nv">Y</span><span class="p">).</span>
</pre></div>

### Experimenting w/ derivatives

<div class="code-box" markdown="1">
<div class="code-header"><a href="code/symbolic-deriv.rkt">code/symbolic-deriv.rkt</a></div>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">variable?</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">symbol?</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">same-variable?</span><span class="w"> </span><span class="n">v1</span><span class="w"> </span><span class="n">v2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="n">variable?</span><span class="w"> </span><span class="n">v1</span><span class="p">)</span>
<span class="w">       </span><span class="p">(</span><span class="n">variable?</span><span class="w"> </span><span class="n">v2</span><span class="p">)</span>
<span class="w">       </span><span class="p">(</span><span class="nb">eq?</span><span class="w"> </span><span class="n">v1</span><span class="w"> </span><span class="n">v2</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-sum</span><span class="w"> </span><span class="n">a1</span><span class="w"> </span><span class="n">a2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="n">=number?</span><span class="w"> </span><span class="n">a1</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span><span class="w"> </span><span class="n">a2</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="n">=number?</span><span class="w"> </span><span class="n">a2</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span><span class="w"> </span><span class="n">a1</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">number?</span><span class="w"> </span><span class="n">a1</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">number?</span><span class="w"> </span><span class="n">a2</span><span class="p">))</span>
<span class="w">         </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">a1</span><span class="w"> </span><span class="n">a2</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">+</span><span class="w"> </span><span class="n">a1</span><span class="w"> </span><span class="n">a2</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-product</span><span class="w"> </span><span class="n">m1</span><span class="w"> </span><span class="n">m2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="k">or</span><span class="w"> </span><span class="p">(</span><span class="n">=number?</span><span class="w"> </span><span class="n">m1</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span>
<span class="w">             </span><span class="p">(</span><span class="n">=number?</span><span class="w"> </span><span class="n">m2</span><span class="w"> </span><span class="mi">0</span><span class="p">))</span>
<span class="w">         </span><span class="mi">0</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="n">=number?</span><span class="w"> </span><span class="n">m1</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span><span class="w"> </span><span class="n">m2</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="n">=number?</span><span class="w"> </span><span class="n">m2</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span><span class="w"> </span><span class="n">m1</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">number?</span><span class="w"> </span><span class="n">m1</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">number?</span><span class="w"> </span><span class="n">m2</span><span class="p">))</span>
<span class="w">         </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">m1</span><span class="w"> </span><span class="n">m2</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">*</span><span class="w"> </span><span class="n">m1</span><span class="w"> </span><span class="n">m2</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">=number?</span><span class="w"> </span><span class="nb">exp</span><span class="w"> </span><span class="n">num</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">number?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="nb">exp</span><span class="w"> </span><span class="n">num</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">sum?</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">pair?</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">eq?</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">+</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">addend</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cadr</span><span class="w"> </span><span class="n">s</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">augend</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">caddr</span><span class="w"> </span><span class="n">s</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">product?</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">pair?</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">eq?</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">*</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">multiplier</span><span class="w"> </span><span class="n">p</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cadr</span><span class="w"> </span><span class="n">p</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">multiplicand</span><span class="w"> </span><span class="n">p</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">caddr</span><span class="w"> </span><span class="n">p</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">exponentiation?</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">pair?</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">eq?</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">**</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">base</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cadr</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">exponent</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">caddr</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-exponentiation</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="n">=number?</span><span class="w"> </span><span class="n">b</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="n">=number?</span><span class="w"> </span><span class="n">b</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span><span class="w"> </span><span class="n">a</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="n">=number?</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">**</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="p">))))</span>


<span class="w"> </span><span class="c1">;(list &#39;^ a b))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="nb">exp</span><span class="w"> </span><span class="n">var</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">number?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="n">variable?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span>
<span class="w">         </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">same-variable?</span><span class="w"> </span><span class="nb">exp</span><span class="w"> </span><span class="n">var</span><span class="p">)</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">0</span><span class="p">))</span>
<span class="w">        </span><span class="p">((</span><span class="n">sum?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span>
<span class="w">         </span><span class="p">(</span><span class="n">make-sum</span><span class="w"> </span><span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="p">(</span><span class="n">addend</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="n">var</span><span class="p">)</span>
<span class="w">                   </span><span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="p">(</span><span class="n">augend</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="n">var</span><span class="p">)))</span>
<span class="w">        </span><span class="p">((</span><span class="n">product?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span>
<span class="w">         </span><span class="p">(</span><span class="n">make-sum</span>
<span class="w">          </span><span class="p">(</span><span class="n">make-product</span>
<span class="w">           </span><span class="p">(</span><span class="n">multiplier</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span>
<span class="w">           </span><span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="p">(</span><span class="n">multiplicand</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="n">var</span><span class="p">))</span>
<span class="w">          </span><span class="p">(</span><span class="n">make-product</span>
<span class="w">           </span><span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="p">(</span><span class="n">multiplier</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="n">var</span><span class="p">)</span>
<span class="w">           </span><span class="p">(</span><span class="n">multiplicand</span><span class="w"> </span><span class="nb">exp</span><span class="p">))))</span>
<span class="w">        </span><span class="p">((</span><span class="n">exponentiation?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span>
<span class="w">         </span><span class="p">(</span><span class="n">make-product</span>
<span class="w">          </span><span class="p">(</span><span class="n">make-product</span>
<span class="w">           </span><span class="p">(</span><span class="n">exponent</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span>
<span class="w">           </span><span class="p">(</span><span class="n">make-exponentiation</span><span class="w"> </span><span class="p">(</span><span class="n">base</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">make-sum</span><span class="w"> </span><span class="p">(</span><span class="n">exponent</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="mi">-1</span><span class="p">)))</span>
<span class="w">          </span><span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="p">(</span><span class="n">base</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="n">var</span><span class="p">)))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;unknown expression</span>
<span class="s2">                      type: DERIV&quot;</span><span class="w"> </span><span class="nb">exp</span><span class="p">))))</span>
<span class="c1">;; (1+a)*b*b</span>
<span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="p">(</span><span class="n">make-product</span><span class="w"> </span><span class="p">(</span><span class="n">make-product</span><span class="w"> </span><span class="p">(</span><span class="n">make-sum</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">a</span><span class="p">)</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">b</span><span class="p">)</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">b</span><span class="p">)</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">b</span><span class="p">)</span>
<span class="c1">;; (+ (* (+ 1 a) b) (* (+ 1 a) b))</span>
<span class="c1">;; = 2(1+a)b. Correct!</span>

<span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="p">(</span><span class="n">make-exponentiation</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="w"> </span><span class="mi">3</span><span class="p">)</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="p">)</span>
<span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="p">(</span><span class="n">make-exponentiation</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="w"> </span><span class="mi">2</span><span class="p">)</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="p">)</span>
<span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="p">(</span><span class="n">make-exponentiation</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="p">)</span>

<span class="c1">;;d((y*(x+2))**2)/dx = 2y**2 * (x+2)</span>
<span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="p">(</span><span class="n">make-exponentiation</span><span class="w"> </span><span class="p">(</span><span class="n">make-product</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">y</span><span class="w"> </span><span class="p">(</span><span class="n">make-sum</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="w"> </span><span class="mi">2</span><span class="p">))</span><span class="w"> </span><span class="mi">2</span><span class="p">)</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="p">)</span>
</pre></div>
<div class="code-output">
<span>Output:</span>
<pre>(+ (* (+ 1 a) b) (* (+ 1 a) b))
(* 3 (** x 2))
(* 2 x)
1
(* (* 2 (* y (+ x 2))) y)
</pre>
</div>
</div>


### Exercises

#### Exercise 2.53

What would the interpreter print
in response to evaluating each of the following expressions?

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">a</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">b</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">c</span><span class="p">)</span>
<span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">george</span><span class="p">))</span>
<span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="o">&#39;</span><span class="p">((</span><span class="ss">x1</span><span class="w"> </span><span class="ss">x2</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">y1</span><span class="w"> </span><span class="ss">y2</span><span class="p">)))</span>
<span class="p">(</span><span class="nb">cadr</span><span class="w"> </span><span class="o">&#39;</span><span class="p">((</span><span class="ss">x1</span><span class="w"> </span><span class="ss">x2</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">y1</span><span class="w"> </span><span class="ss">y2</span><span class="p">)))</span>
<span class="p">(</span><span class="nb">pair?</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">a</span><span class="w"> </span><span class="ss">short</span><span class="w"> </span><span class="ss">list</span><span class="p">)))</span>
<span class="p">(</span><span class="nb">memq</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">red</span><span class="w"> </span><span class="o">&#39;</span><span class="p">((</span><span class="ss">red</span><span class="w"> </span><span class="ss">shoes</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">blue</span><span class="w"> </span><span class="ss">socks</span><span class="p">)))</span>
<span class="p">(</span><span class="nb">memq</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">red</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">red</span><span class="w"> </span><span class="ss">shoes</span><span class="w"> </span><span class="ss">blue</span><span class="w"> </span><span class="ss">socks</span><span class="p">))</span>
</pre></div>

##### Solution

<div class="code-box" markdown="1">
<div class="code-header"><a href="code/ex2-53.rkt">code/ex2-53.rkt</a></div>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">a</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">b</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">c</span><span class="p">)</span>
<span class="c1">;; (a b c)</span>

<span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">george</span><span class="p">))</span>
<span class="c1">;; ((george))</span>

<span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="o">&#39;</span><span class="p">((</span><span class="ss">x1</span><span class="w"> </span><span class="ss">x2</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">y1</span><span class="w"> </span><span class="ss">y2</span><span class="p">)))</span>
<span class="c1">;; ((y1 y2)), a list with one element &#39;(y1 y2)</span>

<span class="p">(</span><span class="nb">cadr</span><span class="w"> </span><span class="o">&#39;</span><span class="p">((</span><span class="ss">x1</span><span class="w"> </span><span class="ss">x2</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">y1</span><span class="w"> </span><span class="ss">y2</span><span class="p">)))</span>
<span class="c1">;; (y1 y2), the car of the previous result</span>

<span class="p">(</span><span class="nb">pair?</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">a</span><span class="w"> </span><span class="ss">short</span><span class="w"> </span><span class="ss">list</span><span class="p">)))</span>
<span class="c1">;; false, (car &#39;(a short list)) is just &#39;a</span>

<span class="p">(</span><span class="nb">memq</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">red</span><span class="w"> </span><span class="o">&#39;</span><span class="p">((</span><span class="ss">red</span><span class="w"> </span><span class="ss">shoes</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">blue</span><span class="w"> </span><span class="ss">socks</span><span class="p">)))</span>
<span class="c1">;; false, &#39;red is not a member of the list, &#39;(red shoes) is.</span>

<span class="p">(</span><span class="nb">memq</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">red</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">red</span><span class="w"> </span><span class="ss">shoes</span><span class="w"> </span><span class="ss">blue</span><span class="w"> </span><span class="ss">socks</span><span class="p">))</span>
<span class="c1">;; (red shoes blue socks), the element is found so memq returns the list </span>
<span class="c1">;; after and including &#39;red.</span>
</pre></div>
<div class="code-output">
<span>Output:</span>
<pre>(a b c)
((george))
((y1 y2))
(y1 y2)
#f
#f
(red shoes blue socks)
</pre>
</div>
</div>


#### Exercise 2.54

Two lists are said to be
`equal?` if they contain equal elements arranged in the same order.  For
example,

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="nb">equal?</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">this</span><span class="w"> </span><span class="ss">is</span><span class="w"> </span><span class="ss">a</span><span class="w"> </span><span class="ss">list</span><span class="p">)</span><span class="w"> </span>
<span class="w">        </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">this</span><span class="w"> </span><span class="ss">is</span><span class="w"> </span><span class="ss">a</span><span class="w"> </span><span class="ss">list</span><span class="p">))</span>
</pre></div>


is true, but

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="nb">equal?</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">this</span><span class="w"> </span><span class="ss">is</span><span class="w"> </span><span class="ss">a</span><span class="w"> </span><span class="ss">list</span><span class="p">)</span><span class="w"> </span>
<span class="w">        </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">this</span><span class="w"> </span><span class="p">(</span><span class="ss">is</span><span class="w"> </span><span class="ss">a</span><span class="p">)</span><span class="w"> </span><span class="ss">list</span><span class="p">))</span>
</pre></div>


is false.  To be more precise, we can define `equal?`  recursively in
terms of the basic `eq?` equality of symbols by saying that `a` and
`b` are `equal?` if they are both symbols and the symbols are
`eq?`, or if they are both lists such that `(car a)` is `equal?`
to `(car b)` and `(cdr a)` is `equal?` to `(cdr b)`.  Using
this idea, implement `equal?` as a procedure.

##### Solution

<div class="code-box" markdown="1">
<div class="code-header"><a href="code/ex2-54.rkt">code/ex2-54.rkt</a></div>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">equal?</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">or</span><span class="w"> </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">symbol?</span><span class="w"> </span><span class="n">a</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">symbol?</span><span class="w"> </span><span class="n">b</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">eq?</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="p">))</span>
<span class="w">      </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="n">a</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="n">b</span><span class="p">))</span>
<span class="w">      </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">pair?</span><span class="w"> </span><span class="n">a</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">pair?</span><span class="w"> </span><span class="n">b</span><span class="p">)</span><span class="w"> </span>
<span class="w">           </span><span class="p">(</span><span class="nb">equal?</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">a</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">b</span><span class="p">))</span>
<span class="w">           </span><span class="p">(</span><span class="nb">equal?</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">a</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">b</span><span class="p">)))))</span>

<span class="c1">;;Some test cases:</span>
<span class="p">(</span><span class="nb">equal?</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">this</span><span class="w"> </span><span class="ss">is</span><span class="w"> </span><span class="ss">a</span><span class="w"> </span><span class="ss">list</span><span class="p">)</span><span class="w"> </span>
<span class="w">        </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">this</span><span class="w"> </span><span class="ss">is</span><span class="w"> </span><span class="ss">a</span><span class="w"> </span><span class="ss">list</span><span class="p">))</span>
<span class="p">(</span><span class="nb">equal?</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">this</span><span class="w"> </span><span class="ss">is</span><span class="w"> </span><span class="ss">a</span><span class="w"> </span><span class="ss">list</span><span class="p">)</span><span class="w"> </span>
<span class="w">        </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">this</span><span class="w"> </span><span class="p">(</span><span class="ss">is</span><span class="w"> </span><span class="ss">a</span><span class="p">)</span><span class="w"> </span><span class="ss">list</span><span class="p">))</span>
<span class="p">(</span><span class="nb">equal?</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">this</span><span class="w"> </span><span class="p">(</span><span class="ss">is</span><span class="w"> </span><span class="ss">a</span><span class="p">)</span><span class="w"> </span><span class="ss">list</span><span class="p">)</span><span class="w"> </span>
<span class="w">        </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">this</span><span class="w"> </span><span class="p">(</span><span class="ss">is</span><span class="w"> </span><span class="ss">a</span><span class="p">)</span><span class="w"> </span><span class="ss">list</span><span class="p">))</span>
<span class="p">(</span><span class="nb">equal?</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">a</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">a</span><span class="w"> </span><span class="ss">b</span><span class="w"> </span><span class="ss">c</span><span class="p">))</span>

<span class="c1">;; Failure case! </span>
<span class="p">(</span><span class="nb">equal?</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="mi">3</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="mi">3</span><span class="p">))</span>
</pre></div>
<div class="code-output">
<span>Output:</span>
<pre>#t
#f
#t
#f
#f
</pre>
</div>
</div>


This bugs me, because it will fail when comparing non-symbol lists like
`(equal? (list 1 2 3) (list 1 2 3))`. But we're doing what the problems says
so let's just move on.

#### Exercise 2.55

Eva Lu Ator types to the interpreter the expression

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="o">&#39;&#39;</span><span class="ss">abracadabra</span><span class="p">)</span>
</pre></div>

To her surprise, the interpreter prints back `quote`.  Explain.

##### Solution
We have `(quote (quote abracadabra))` in the inner expression.
The first quote is evaluated leaving the inner expression
`(list 'quote 'abracadabra)`. Of course the car of this is `'quote`!

#### Exercise 2.56

Show how to extend the basic
differentiator to handle more kinds of expressions.  For instance, implement
the differentiation rule

$${d(u^{\kern0.1ex n}) \over dx} \,=\, {nu^{\kern0.1ex n-1} \, {du \over dx}}  $$


by adding a new clause to the `deriv` program and defining appropriate
procedures `exponentiation?`, `base`, `exponent`, and
`make-exponentiation`.  (You may use the symbol `**` to denote
exponentiation.)  Build in the rules that anything raised to the power 0 is 1
and anything raised to the power 1 is the thing itself.

##### Solution

Differentiation with respect to something in the exponent will be incorrect silently! (We'd need logs)

<div class="code-box" markdown="1">
<div class="code-header"><a href="code/ex2-56.rkt">code/ex2-56.rkt</a></div>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">variable?</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">symbol?</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">same-variable?</span><span class="w"> </span><span class="n">v1</span><span class="w"> </span><span class="n">v2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="n">variable?</span><span class="w"> </span><span class="n">v1</span><span class="p">)</span>
<span class="w">       </span><span class="p">(</span><span class="n">variable?</span><span class="w"> </span><span class="n">v2</span><span class="p">)</span>
<span class="w">       </span><span class="p">(</span><span class="nb">eq?</span><span class="w"> </span><span class="n">v1</span><span class="w"> </span><span class="n">v2</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-sum</span><span class="w"> </span><span class="n">a1</span><span class="w"> </span><span class="n">a2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="n">=number?</span><span class="w"> </span><span class="n">a1</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span><span class="w"> </span><span class="n">a2</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="n">=number?</span><span class="w"> </span><span class="n">a2</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span><span class="w"> </span><span class="n">a1</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">number?</span><span class="w"> </span><span class="n">a1</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">number?</span><span class="w"> </span><span class="n">a2</span><span class="p">))</span>
<span class="w">         </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">a1</span><span class="w"> </span><span class="n">a2</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">+</span><span class="w"> </span><span class="n">a1</span><span class="w"> </span><span class="n">a2</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-product</span><span class="w"> </span><span class="n">m1</span><span class="w"> </span><span class="n">m2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="k">or</span><span class="w"> </span><span class="p">(</span><span class="n">=number?</span><span class="w"> </span><span class="n">m1</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span>
<span class="w">             </span><span class="p">(</span><span class="n">=number?</span><span class="w"> </span><span class="n">m2</span><span class="w"> </span><span class="mi">0</span><span class="p">))</span>
<span class="w">         </span><span class="mi">0</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="n">=number?</span><span class="w"> </span><span class="n">m1</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span><span class="w"> </span><span class="n">m2</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="n">=number?</span><span class="w"> </span><span class="n">m2</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span><span class="w"> </span><span class="n">m1</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">number?</span><span class="w"> </span><span class="n">m1</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">number?</span><span class="w"> </span><span class="n">m2</span><span class="p">))</span>
<span class="w">         </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">m1</span><span class="w"> </span><span class="n">m2</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">*</span><span class="w"> </span><span class="n">m1</span><span class="w"> </span><span class="n">m2</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">=number?</span><span class="w"> </span><span class="nb">exp</span><span class="w"> </span><span class="n">num</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">number?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="nb">exp</span><span class="w"> </span><span class="n">num</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">sum?</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">pair?</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">eq?</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">+</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">addend</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cadr</span><span class="w"> </span><span class="n">s</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">augend</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">caddr</span><span class="w"> </span><span class="n">s</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">product?</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">pair?</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">eq?</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">*</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">multiplier</span><span class="w"> </span><span class="n">p</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cadr</span><span class="w"> </span><span class="n">p</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">multiplicand</span><span class="w"> </span><span class="n">p</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">caddr</span><span class="w"> </span><span class="n">p</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">exponentiation?</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">pair?</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">eq?</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">**</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">base</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cadr</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">exponent</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">caddr</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-exponentiation</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="n">=number?</span><span class="w"> </span><span class="n">b</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="n">=number?</span><span class="w"> </span><span class="n">b</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span><span class="w"> </span><span class="n">a</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="n">=number?</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">**</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="p">))))</span>


<span class="w"> </span><span class="c1">;(list &#39;^ a b))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="nb">exp</span><span class="w"> </span><span class="n">var</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">number?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="n">variable?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span>
<span class="w">         </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">same-variable?</span><span class="w"> </span><span class="nb">exp</span><span class="w"> </span><span class="n">var</span><span class="p">)</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">0</span><span class="p">))</span>
<span class="w">        </span><span class="p">((</span><span class="n">sum?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span>
<span class="w">         </span><span class="p">(</span><span class="n">make-sum</span><span class="w"> </span><span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="p">(</span><span class="n">addend</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="n">var</span><span class="p">)</span>
<span class="w">                   </span><span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="p">(</span><span class="n">augend</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="n">var</span><span class="p">)))</span>
<span class="w">        </span><span class="p">((</span><span class="n">product?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span>
<span class="w">         </span><span class="p">(</span><span class="n">make-sum</span>
<span class="w">          </span><span class="p">(</span><span class="n">make-product</span>
<span class="w">           </span><span class="p">(</span><span class="n">multiplier</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span>
<span class="w">           </span><span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="p">(</span><span class="n">multiplicand</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="n">var</span><span class="p">))</span>
<span class="w">          </span><span class="p">(</span><span class="n">make-product</span>
<span class="w">           </span><span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="p">(</span><span class="n">multiplier</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="n">var</span><span class="p">)</span>
<span class="w">           </span><span class="p">(</span><span class="n">multiplicand</span><span class="w"> </span><span class="nb">exp</span><span class="p">))))</span>
<span class="w">        </span><span class="p">((</span><span class="n">exponentiation?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span>
<span class="w">         </span><span class="p">(</span><span class="n">make-product</span>
<span class="w">          </span><span class="p">(</span><span class="n">make-product</span>
<span class="w">           </span><span class="p">(</span><span class="n">exponent</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span>
<span class="w">           </span><span class="p">(</span><span class="n">make-exponentiation</span><span class="w"> </span><span class="p">(</span><span class="n">base</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">make-sum</span><span class="w"> </span><span class="p">(</span><span class="n">exponent</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="mi">-1</span><span class="p">)))</span>
<span class="w">          </span><span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="p">(</span><span class="n">base</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="n">var</span><span class="p">)))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;unknown expression</span>
<span class="s2">                      type: DERIV&quot;</span><span class="w"> </span><span class="nb">exp</span><span class="p">))))</span>
<span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="p">(</span><span class="n">make-exponentiation</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="w"> </span><span class="mi">3</span><span class="p">)</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="p">)</span>
<span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="p">(</span><span class="n">make-exponentiation</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="w"> </span><span class="mi">2</span><span class="p">)</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="p">)</span>
<span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="p">(</span><span class="n">make-exponentiation</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="p">)</span>

<span class="c1">;;d((y*(x+2))**2)/dx = 2y**2 * (x+2)</span>
<span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="p">(</span><span class="n">make-exponentiation</span><span class="w"> </span><span class="p">(</span><span class="n">make-product</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">y</span><span class="w"> </span><span class="p">(</span><span class="n">make-sum</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="w"> </span><span class="mi">2</span><span class="p">))</span><span class="w"> </span><span class="mi">2</span><span class="p">)</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="p">)</span>
</pre></div>
<div class="code-output">
<span>Output:</span>
<pre>(* 3 (** x 2))
(* 2 x)
1
(* (* 2 (* y (+ x 2))) y)
</pre>
</div>
</div>


#### Exercise 2.57

Extend the differentiation
program to handle sums and products of arbitrary numbers of (two or more)
terms.  Then the last example above could be expressed as

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">*</span><span class="w"> </span><span class="ss">x</span><span class="w"> </span><span class="ss">y</span><span class="w"> </span><span class="p">(</span><span class="ss">+</span><span class="w"> </span><span class="ss">x</span><span class="w"> </span><span class="mi">3</span><span class="p">))</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="p">)</span>
</pre></div>

Try to do this by changing only the representation for sums and products,
without changing the `deriv` procedure at all.  For example, the
`addend` of a sum would be the first term, and the `augend` would be
the sum of the rest of the terms.

##### Solution

Some stuff we're not going to handle:

 - `make-sum` and `make-product` with multiple arguments and dotted tail notation,
 - Sorting expressions. ie without too much work we could automatically simplify
`(+ (* x 2) (* 2 y))` by sorting arguments and combining when equal.

<div class="code-box" markdown="1">
<div class="code-header"><a href="code/ex2-57.rkt">code/ex2-57.rkt</a></div>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">variable?</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">symbol?</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">same-variable?</span><span class="w"> </span><span class="n">v1</span><span class="w"> </span><span class="n">v2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="n">variable?</span><span class="w"> </span><span class="n">v1</span><span class="p">)</span>
<span class="w">       </span><span class="p">(</span><span class="n">variable?</span><span class="w"> </span><span class="n">v2</span><span class="p">)</span>
<span class="w">       </span><span class="p">(</span><span class="nb">eq?</span><span class="w"> </span><span class="n">v1</span><span class="w"> </span><span class="n">v2</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">numorvar?</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="k">or</span><span class="w"> </span><span class="p">(</span><span class="n">variable?</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">number?</span><span class="w"> </span><span class="n">x</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-sum</span><span class="w"> </span><span class="n">a1</span><span class="w"> </span><span class="n">a2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="n">=number?</span><span class="w"> </span><span class="n">a1</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span><span class="w"> </span><span class="n">a2</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="n">=number?</span><span class="w"> </span><span class="n">a2</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span><span class="w"> </span><span class="n">a1</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">number?</span><span class="w"> </span><span class="n">a1</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">number?</span><span class="w"> </span><span class="n">a2</span><span class="p">))</span>
<span class="w">         </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">a1</span><span class="w"> </span><span class="n">a2</span><span class="p">))</span>
<span class="w">        </span><span class="p">((</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="n">sum?</span><span class="w"> </span><span class="n">a1</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">numorvar?</span><span class="w"> </span><span class="n">a2</span><span class="p">))</span>
<span class="w">         </span><span class="p">(</span><span class="nb">append</span><span class="w"> </span><span class="n">a1</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="n">a2</span><span class="p">)))</span>
<span class="w">        </span><span class="p">((</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="n">sum?</span><span class="w"> </span><span class="n">a2</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">numorvar?</span><span class="w"> </span><span class="n">a1</span><span class="p">))</span>
<span class="w">         </span><span class="p">(</span><span class="nb">append</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">+</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">append</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="n">a1</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">a2</span><span class="p">))))</span>
<span class="w">        </span><span class="p">((</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="n">sum?</span><span class="w"> </span><span class="n">a1</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">sum?</span><span class="w"> </span><span class="n">a2</span><span class="p">))</span>
<span class="w">         </span><span class="p">(</span><span class="nb">append</span><span class="w"> </span><span class="n">a1</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">a2</span><span class="p">)))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">+</span><span class="w"> </span><span class="n">a1</span><span class="w"> </span><span class="n">a2</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-product</span><span class="w"> </span><span class="n">m1</span><span class="w"> </span><span class="n">m2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="k">or</span><span class="w"> </span><span class="p">(</span><span class="n">=number?</span><span class="w"> </span><span class="n">m1</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span>
<span class="w">             </span><span class="p">(</span><span class="n">=number?</span><span class="w"> </span><span class="n">m2</span><span class="w"> </span><span class="mi">0</span><span class="p">))</span>
<span class="w">         </span><span class="mi">0</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="n">=number?</span><span class="w"> </span><span class="n">m1</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span><span class="w"> </span><span class="n">m2</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="n">=number?</span><span class="w"> </span><span class="n">m2</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span><span class="w"> </span><span class="n">m1</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">number?</span><span class="w"> </span><span class="n">m1</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">number?</span><span class="w"> </span><span class="n">m2</span><span class="p">))</span>
<span class="w">         </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">m1</span><span class="w"> </span><span class="n">m2</span><span class="p">))</span>
<span class="w">        </span><span class="p">((</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="n">product?</span><span class="w"> </span><span class="n">m1</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">numorvar?</span><span class="w"> </span><span class="n">m2</span><span class="p">))</span>
<span class="w">         </span><span class="p">(</span><span class="nb">append</span><span class="w"> </span><span class="n">m1</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="n">m2</span><span class="p">)))</span>
<span class="w">        </span><span class="p">((</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="n">product?</span><span class="w"> </span><span class="n">m2</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">numorvar?</span><span class="w"> </span><span class="n">m1</span><span class="p">))</span>
<span class="w">         </span><span class="p">(</span><span class="nb">append</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">*</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">append</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="n">m1</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">m2</span><span class="p">))))</span>
<span class="w">        </span><span class="p">((</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="n">product?</span><span class="w"> </span><span class="n">m1</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">product?</span><span class="w"> </span><span class="n">m2</span><span class="p">))</span>
<span class="w">         </span><span class="p">(</span><span class="nb">append</span><span class="w"> </span><span class="n">m1</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">m2</span><span class="p">)))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">*</span><span class="w"> </span><span class="n">m1</span><span class="w"> </span><span class="n">m2</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">=number?</span><span class="w"> </span><span class="nb">exp</span><span class="w"> </span><span class="n">num</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">number?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="nb">exp</span><span class="w"> </span><span class="n">num</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">sum?</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">pair?</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">eq?</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">+</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">addend</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cadr</span><span class="w"> </span><span class="n">s</span><span class="p">))</span>
<span class="c1">;; (define (augend s) (caddr s))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">augend</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">r</span><span class="w"> </span><span class="p">(</span><span class="nb">cddr</span><span class="w"> </span><span class="n">s</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">&lt;</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="p">(</span><span class="nb">length</span><span class="w"> </span><span class="n">r</span><span class="p">))</span>
<span class="w">      </span><span class="p">(</span><span class="nb">append</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">+</span><span class="p">)</span><span class="w"> </span><span class="n">r</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">r</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">product?</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">pair?</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">eq?</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">*</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">multiplier</span><span class="w"> </span><span class="n">p</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cadr</span><span class="w"> </span><span class="n">p</span><span class="p">))</span>

<span class="c1">;; Now this is going to return...</span>
<span class="c1">;;   A number if it&#39;s a list of length 2</span>
<span class="c1">;;   A (&#39;* p) if it&#39;s a longer list</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">multiplicand</span><span class="w"> </span><span class="n">p</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">r</span><span class="w"> </span><span class="p">(</span><span class="nb">cddr</span><span class="w"> </span><span class="n">p</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">&lt;</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="p">(</span><span class="nb">length</span><span class="w"> </span><span class="n">r</span><span class="p">))</span>
<span class="w">      </span><span class="p">(</span><span class="nb">append</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">*</span><span class="p">)</span><span class="w"> </span><span class="n">r</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">r</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="nb">exp</span><span class="w"> </span><span class="n">var</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">number?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="n">variable?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span>
<span class="w">         </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">same-variable?</span><span class="w"> </span><span class="nb">exp</span><span class="w"> </span><span class="n">var</span><span class="p">)</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">0</span><span class="p">))</span>
<span class="w">        </span><span class="p">((</span><span class="n">sum?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span>
<span class="w">         </span><span class="p">(</span><span class="n">make-sum</span><span class="w"> </span><span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="p">(</span><span class="n">addend</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="n">var</span><span class="p">)</span>
<span class="w">                   </span><span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="p">(</span><span class="n">augend</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="n">var</span><span class="p">)))</span>
<span class="w">        </span><span class="p">((</span><span class="n">product?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span>
<span class="w">         </span><span class="p">(</span><span class="n">make-sum</span>
<span class="w">          </span><span class="p">(</span><span class="n">make-product</span>
<span class="w">           </span><span class="p">(</span><span class="n">multiplier</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span>
<span class="w">           </span><span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="p">(</span><span class="n">multiplicand</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="n">var</span><span class="p">))</span>
<span class="w">          </span><span class="p">(</span><span class="n">make-product</span>
<span class="w">           </span><span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="p">(</span><span class="n">multiplier</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="n">var</span><span class="p">)</span>
<span class="w">           </span><span class="p">(</span><span class="n">multiplicand</span><span class="w"> </span><span class="nb">exp</span><span class="p">))))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;unknown expression</span>
<span class="s2">                      type: DERIV&quot;</span><span class="w"> </span><span class="nb">exp</span><span class="p">))))</span>

<span class="p">(</span><span class="nb">newline</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;make-product tests&quot;</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="p">(</span><span class="n">make-product</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">y</span><span class="p">)</span>
<span class="p">(</span><span class="n">make-product</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="w"> </span><span class="p">(</span><span class="n">make-product</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">y</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">z</span><span class="p">))</span>
<span class="p">(</span><span class="n">make-product</span><span class="w"> </span><span class="mi">4</span><span class="w"> </span><span class="p">(</span><span class="n">make-product</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="p">))</span>
<span class="p">(</span><span class="n">make-product</span><span class="w"> </span><span class="p">(</span><span class="n">make-product</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">a</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">make-product</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="p">))</span>

<span class="p">(</span><span class="nb">newline</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;make-sum tests&quot;</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="p">(</span><span class="n">make-sum</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">y</span><span class="p">)</span>
<span class="p">(</span><span class="n">make-sum</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="w"> </span><span class="p">(</span><span class="n">make-sum</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">y</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">z</span><span class="p">))</span>
<span class="p">(</span><span class="n">make-sum</span><span class="w"> </span><span class="mi">4</span><span class="w"> </span><span class="p">(</span><span class="n">make-sum</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="p">))</span>
<span class="p">(</span><span class="n">make-sum</span><span class="w"> </span><span class="p">(</span><span class="n">make-sum</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">a</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">make-sum</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="p">))</span>

<span class="p">(</span><span class="nb">newline</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;deriv and make-product tests&quot;</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="p">(</span><span class="n">make-product</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">y</span><span class="p">)</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="p">)</span>
<span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="p">(</span><span class="n">make-product</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="w"> </span><span class="p">(</span><span class="n">make-product</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">y</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">z</span><span class="p">))</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="p">)</span>
<span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="p">(</span><span class="n">make-product</span><span class="w"> </span><span class="mi">4</span><span class="w"> </span><span class="p">(</span><span class="n">make-product</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="p">))</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="p">)</span>
<span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="p">(</span><span class="n">make-product</span><span class="w"> </span><span class="p">(</span><span class="n">make-product</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">a</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">make-product</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="p">))</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="p">)</span>

<span class="p">(</span><span class="nb">newline</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;sum and make-sum tests&quot;</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="p">(</span><span class="n">make-sum</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">y</span><span class="p">)</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="p">)</span>
<span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="p">(</span><span class="n">make-sum</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="w"> </span><span class="p">(</span><span class="n">make-sum</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">y</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">z</span><span class="p">))</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="p">)</span>
<span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="p">(</span><span class="n">make-sum</span><span class="w"> </span><span class="mi">4</span><span class="w"> </span><span class="p">(</span><span class="n">make-sum</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="p">))</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="p">)</span>
<span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="p">(</span><span class="n">make-sum</span><span class="w"> </span><span class="p">(</span><span class="n">make-sum</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">a</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">make-sum</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="p">))</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="p">)</span>
</pre></div>
<div class="code-output">
<span>Output:</span>
<pre>
make-product tests
(* x y)
(* x y z)
(* 4 2 x)
(* a x 2 x)

make-sum tests
(+ x y)
(+ x y z)
(+ 4 2 x)
(+ a x 2 x)

deriv and make-product tests
y
(* y z)
8
(* a (+ (* x 2) (* 2 x)))

sum and make-sum tests
1
1
1
2
</pre>
</div>
</div>


#### Exercise 2.58

Suppose we want to modify the
differentiation program so that it works with ordinary mathematical notation,
in which `+` and `*` are infix rather than prefix operators.  Since
the differentiation program is defined in terms of abstract data, we can modify
it to work with different representations of expressions solely by changing the
predicates, selectors, and constructors that define the representation of the
algebraic expressions on which the differentiator is to operate.

**1.** Show how to do this in order to differentiate algebraic expressions presented
in infix form, such as `(x + (3 * (x + (y + 2))))`.  To simplify the task,
assume that `+` and `*` always take two arguments and that
expressions are fully parenthesized.

**2.** The problem becomes substantially harder if we allow standard algebraic
notation, such as `(x + 3 * (x + y + 2))`, which drops unnecessary
parentheses and assumes that multiplication is done before addition.  Can you
design appropriate predicates, selectors, and constructors for this notation
such that our derivative program still works?

##### Solution

For part 1, it's easy, we just have to adjust `make-***` and `augend,addend,multiplier,multiplicand`. 

<div class="code-box" markdown="1">
<div class="code-header"><a href="code/ex2-58.rkt">code/ex2-58.rkt</a></div>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">variable?</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">symbol?</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">same-variable?</span><span class="w"> </span><span class="n">v1</span><span class="w"> </span><span class="n">v2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="n">variable?</span><span class="w"> </span><span class="n">v1</span><span class="p">)</span>
<span class="w">       </span><span class="p">(</span><span class="n">variable?</span><span class="w"> </span><span class="n">v2</span><span class="p">)</span>
<span class="w">       </span><span class="p">(</span><span class="nb">eq?</span><span class="w"> </span><span class="n">v1</span><span class="w"> </span><span class="n">v2</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">numorvar?</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="k">or</span><span class="w"> </span><span class="p">(</span><span class="n">variable?</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">number?</span><span class="w"> </span><span class="n">x</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-sum</span><span class="w"> </span><span class="n">a1</span><span class="w"> </span><span class="n">a2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="n">=number?</span><span class="w"> </span><span class="n">a1</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span><span class="w"> </span><span class="n">a2</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="n">=number?</span><span class="w"> </span><span class="n">a2</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span><span class="w"> </span><span class="n">a1</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">number?</span><span class="w"> </span><span class="n">a1</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">number?</span><span class="w"> </span><span class="n">a2</span><span class="p">))</span>
<span class="w">         </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">a1</span><span class="w"> </span><span class="n">a2</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="n">a1</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">+</span><span class="w"> </span><span class="n">a2</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-product</span><span class="w"> </span><span class="n">m1</span><span class="w"> </span><span class="n">m2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="k">or</span><span class="w"> </span><span class="p">(</span><span class="n">=number?</span><span class="w"> </span><span class="n">m1</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span>
<span class="w">             </span><span class="p">(</span><span class="n">=number?</span><span class="w"> </span><span class="n">m2</span><span class="w"> </span><span class="mi">0</span><span class="p">))</span>
<span class="w">         </span><span class="mi">0</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="n">=number?</span><span class="w"> </span><span class="n">m1</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span><span class="w"> </span><span class="n">m2</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="n">=number?</span><span class="w"> </span><span class="n">m2</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span><span class="w"> </span><span class="n">m1</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">number?</span><span class="w"> </span><span class="n">m1</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">number?</span><span class="w"> </span><span class="n">m2</span><span class="p">))</span>
<span class="w">         </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">m1</span><span class="w"> </span><span class="n">m2</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="n">m1</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">*</span><span class="w"> </span><span class="n">m2</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">=number?</span><span class="w"> </span><span class="nb">exp</span><span class="w"> </span><span class="n">num</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">number?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="nb">exp</span><span class="w"> </span><span class="n">num</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">sum?</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">pair?</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">eq?</span><span class="w"> </span><span class="p">(</span><span class="nb">cadr</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">+</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">addend</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">s</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">augend</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">caddr</span><span class="w"> </span><span class="n">s</span><span class="p">))</span><span class="w"> </span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">product?</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">pair?</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">eq?</span><span class="w"> </span><span class="p">(</span><span class="nb">cadr</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">*</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">multiplier</span><span class="w"> </span><span class="n">p</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">p</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">multiplicand</span><span class="w"> </span><span class="n">p</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">caddr</span><span class="w"> </span><span class="n">p</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="nb">exp</span><span class="w"> </span><span class="n">var</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">number?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="n">variable?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span>
<span class="w">         </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">same-variable?</span><span class="w"> </span><span class="nb">exp</span><span class="w"> </span><span class="n">var</span><span class="p">)</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">0</span><span class="p">))</span>
<span class="w">        </span><span class="p">((</span><span class="n">sum?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span>
<span class="w">         </span><span class="p">(</span><span class="n">make-sum</span><span class="w"> </span><span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="p">(</span><span class="n">addend</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="n">var</span><span class="p">)</span>
<span class="w">                   </span><span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="p">(</span><span class="n">augend</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="n">var</span><span class="p">)))</span>
<span class="w">        </span><span class="p">((</span><span class="n">product?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span>
<span class="w">         </span><span class="p">(</span><span class="n">make-sum</span>
<span class="w">          </span><span class="p">(</span><span class="n">make-product</span>
<span class="w">           </span><span class="p">(</span><span class="n">multiplier</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span>
<span class="w">           </span><span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="p">(</span><span class="n">multiplicand</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="n">var</span><span class="p">))</span>
<span class="w">          </span><span class="p">(</span><span class="n">make-product</span>
<span class="w">           </span><span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="p">(</span><span class="n">multiplier</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="n">var</span><span class="p">)</span>
<span class="w">           </span><span class="p">(</span><span class="n">multiplicand</span><span class="w"> </span><span class="nb">exp</span><span class="p">))))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;unknown expression</span>
<span class="s2">                      type: DERIV&quot;</span><span class="w"> </span><span class="nb">exp</span><span class="p">))))</span>

<span class="p">(</span><span class="nb">newline</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;make-product tests&quot;</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="p">(</span><span class="n">make-product</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">y</span><span class="p">)</span>
<span class="p">(</span><span class="n">make-product</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="w"> </span><span class="p">(</span><span class="n">make-product</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">y</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">z</span><span class="p">))</span>
<span class="p">(</span><span class="n">make-product</span><span class="w"> </span><span class="mi">4</span><span class="w"> </span><span class="p">(</span><span class="n">make-product</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="p">))</span>
<span class="p">(</span><span class="n">make-product</span><span class="w"> </span><span class="p">(</span><span class="n">make-product</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">a</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">make-product</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="p">))</span>

<span class="p">(</span><span class="nb">newline</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;make-sum tests&quot;</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="p">(</span><span class="n">make-sum</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">y</span><span class="p">)</span>
<span class="p">(</span><span class="n">make-sum</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="w"> </span><span class="p">(</span><span class="n">make-sum</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">y</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">z</span><span class="p">))</span>
<span class="p">(</span><span class="n">make-sum</span><span class="w"> </span><span class="mi">4</span><span class="w"> </span><span class="p">(</span><span class="n">make-sum</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="p">))</span>
<span class="p">(</span><span class="n">make-sum</span><span class="w"> </span><span class="p">(</span><span class="n">make-sum</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">a</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">make-sum</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="p">))</span>

<span class="p">(</span><span class="nb">newline</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;deriv and make-product tests&quot;</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="p">(</span><span class="n">make-product</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">y</span><span class="p">)</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="p">)</span>
<span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="p">(</span><span class="n">make-product</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="w"> </span><span class="p">(</span><span class="n">make-product</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">y</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">z</span><span class="p">))</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="p">)</span>
<span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="p">(</span><span class="n">make-product</span><span class="w"> </span><span class="mi">4</span><span class="w"> </span><span class="p">(</span><span class="n">make-product</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="p">))</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="p">)</span>
<span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="p">(</span><span class="n">make-product</span><span class="w"> </span><span class="p">(</span><span class="n">make-product</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">a</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">make-product</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="p">))</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="p">)</span>

<span class="p">(</span><span class="nb">newline</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;sum and make-sum tests&quot;</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="p">(</span><span class="n">make-sum</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">y</span><span class="p">)</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="p">)</span>
<span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="p">(</span><span class="n">make-sum</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="w"> </span><span class="p">(</span><span class="n">make-sum</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">y</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">z</span><span class="p">))</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="p">)</span>
<span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="p">(</span><span class="n">make-sum</span><span class="w"> </span><span class="mi">4</span><span class="w"> </span><span class="p">(</span><span class="n">make-sum</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="p">))</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="p">)</span>
<span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="p">(</span><span class="n">make-sum</span><span class="w"> </span><span class="p">(</span><span class="n">make-sum</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">a</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">make-sum</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="p">))</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="p">)</span>
</pre></div>
<div class="code-output">
<span>Output:</span>
<pre>
make-product tests
(x * y)
(x * (y * z))
(4 * (2 * x))
((a * x) * (2 * x))

make-sum tests
(x + y)
(x + (y + z))
(4 + (2 + x))
((a + x) + (2 + x))

deriv and make-product tests
y
(y * z)
8
(((a * x) * 2) + (a * (2 * x)))

sum and make-sum tests
1
1
1
2
</pre>
</div>
</div>


For part 2, we can definitely just modify the accessors to get the correct results.

<div class="code-box" markdown="1">
<div class="code-header"><a href="code/ex2-58b.rkt">code/ex2-58b.rkt</a></div>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">variable?</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">symbol?</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">same-variable?</span><span class="w"> </span><span class="n">v1</span><span class="w"> </span><span class="n">v2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="n">variable?</span><span class="w"> </span><span class="n">v1</span><span class="p">)</span>
<span class="w">       </span><span class="p">(</span><span class="n">variable?</span><span class="w"> </span><span class="n">v2</span><span class="p">)</span>
<span class="w">       </span><span class="p">(</span><span class="nb">eq?</span><span class="w"> </span><span class="n">v1</span><span class="w"> </span><span class="n">v2</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">numorvar?</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="k">or</span><span class="w"> </span><span class="p">(</span><span class="n">variable?</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">number?</span><span class="w"> </span><span class="n">x</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-sum</span><span class="w"> </span><span class="n">a1</span><span class="w"> </span><span class="n">a2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="n">=number?</span><span class="w"> </span><span class="n">a1</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span><span class="w"> </span><span class="n">a2</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="n">=number?</span><span class="w"> </span><span class="n">a2</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span><span class="w"> </span><span class="n">a1</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">number?</span><span class="w"> </span><span class="n">a1</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">number?</span><span class="w"> </span><span class="n">a2</span><span class="p">))</span>
<span class="w">         </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">a1</span><span class="w"> </span><span class="n">a2</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="n">a1</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">+</span><span class="w"> </span><span class="n">a2</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-product</span><span class="w"> </span><span class="n">m1</span><span class="w"> </span><span class="n">m2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="k">or</span><span class="w"> </span><span class="p">(</span><span class="n">=number?</span><span class="w"> </span><span class="n">m1</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span>
<span class="w">             </span><span class="p">(</span><span class="n">=number?</span><span class="w"> </span><span class="n">m2</span><span class="w"> </span><span class="mi">0</span><span class="p">))</span>
<span class="w">         </span><span class="mi">0</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="n">=number?</span><span class="w"> </span><span class="n">m1</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span><span class="w"> </span><span class="n">m2</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="n">=number?</span><span class="w"> </span><span class="n">m2</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span><span class="w"> </span><span class="n">m1</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">number?</span><span class="w"> </span><span class="n">m1</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">number?</span><span class="w"> </span><span class="n">m2</span><span class="p">))</span>
<span class="w">         </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">m1</span><span class="w"> </span><span class="n">m2</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="n">m1</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">*</span><span class="w"> </span><span class="n">m2</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">=number?</span><span class="w"> </span><span class="nb">exp</span><span class="w"> </span><span class="n">num</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">number?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="nb">exp</span><span class="w"> </span><span class="n">num</span><span class="p">)))</span>

<span class="c1">;; Return false if element doesn&#39;t exist</span>
<span class="c1">;; Return list otherwise.</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">take-after</span><span class="w"> </span><span class="n">elem</span><span class="w"> </span><span class="n">lst</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">rst</span><span class="w"> </span><span class="p">(</span><span class="nb">memq</span><span class="w"> </span><span class="n">elem</span><span class="w"> </span><span class="n">lst</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">eq?</span><span class="w"> </span><span class="n">rst</span><span class="w"> </span><span class="no">#f</span><span class="p">)</span><span class="w"> </span><span class="n">rst</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">rst</span><span class="p">))))</span>

<span class="c1">;; Return false if element doesn&#39;t exist</span>
<span class="c1">;; Return list otherwise.</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">take-before</span><span class="w"> </span><span class="n">elem</span><span class="w"> </span><span class="n">lst</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">null?</span><span class="w"> </span><span class="n">lst</span><span class="p">)</span><span class="w"> </span><span class="no">#f</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">lst</span><span class="p">)</span><span class="w"> </span><span class="n">elem</span><span class="p">)</span><span class="w"> </span><span class="n">nil</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">rst</span><span class="w"> </span><span class="p">(</span><span class="n">take-before</span><span class="w"> </span><span class="n">elem</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">lst</span><span class="p">))))</span>
<span class="w">                </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">not</span><span class="w"> </span><span class="n">rst</span><span class="p">)</span><span class="w"> </span>
<span class="w">                  </span><span class="n">rst</span><span class="w"> </span>
<span class="w">                  </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">lst</span><span class="p">)</span><span class="w"> </span><span class="n">rst</span><span class="p">))))))</span>

<span class="c1">;; True if a &#39;+ exists in our expression.</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">sum?</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">pair?</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="nb">eq?</span><span class="w"> </span><span class="p">(</span><span class="nb">memq</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">+</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="no">#f</span><span class="p">))))</span>
<span class="c1">;; Take from the first symbol, up to but excluding &#39;+</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">addend</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">rst</span><span class="w"> </span><span class="p">(</span><span class="n">take-before</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">+</span><span class="w"> </span><span class="n">s</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">&lt;</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="p">(</span><span class="nb">length</span><span class="w"> </span><span class="n">rst</span><span class="p">))</span><span class="w"> </span><span class="n">rst</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">rst</span><span class="p">))))</span>
<span class="c1">;; Exclude the first terms up to &#39;+ and return the rest (?)</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">augend</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">rst</span><span class="w"> </span><span class="p">(</span><span class="n">take-after</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">+</span><span class="w"> </span><span class="n">s</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">&lt;</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="p">(</span><span class="nb">length</span><span class="w"> </span><span class="n">rst</span><span class="p">))</span><span class="w"> </span><span class="n">rst</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">rst</span><span class="p">))))</span>
<span class="c1">;; True if no &#39;+ exists in our expression, but &#39;* does.</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">product?</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">pair?</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span>
<span class="w">       </span><span class="p">(</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="n">sum?</span><span class="w"> </span><span class="n">x</span><span class="p">))</span><span class="w"> </span>
<span class="w">       </span><span class="p">(</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="nb">eq?</span><span class="w"> </span><span class="p">(</span><span class="nb">memq</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">*</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="no">#f</span><span class="p">))))</span>
<span class="c1">;; take up to and excluding the first &#39;*</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">multiplier</span><span class="w"> </span><span class="n">p</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">rst</span><span class="w"> </span><span class="p">(</span><span class="n">take-before</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">*</span><span class="w"> </span><span class="n">p</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">&lt;</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="p">(</span><span class="nb">length</span><span class="w"> </span><span class="n">rst</span><span class="p">))</span><span class="w"> </span><span class="n">rst</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">rst</span><span class="p">))))</span>
<span class="c1">;; Get the rest after the first &#39;*</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">multiplicand</span><span class="w"> </span><span class="n">p</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">rst</span><span class="w"> </span><span class="p">(</span><span class="n">take-after</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">*</span><span class="w"> </span><span class="n">p</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">&lt;</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="p">(</span><span class="nb">length</span><span class="w"> </span><span class="n">rst</span><span class="p">))</span><span class="w"> </span><span class="n">rst</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">rst</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="nb">exp</span><span class="w"> </span><span class="n">var</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">number?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="n">variable?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span>
<span class="w">         </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">same-variable?</span><span class="w"> </span><span class="nb">exp</span><span class="w"> </span><span class="n">var</span><span class="p">)</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">0</span><span class="p">))</span>
<span class="w">        </span><span class="p">((</span><span class="n">sum?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span>
<span class="w">         </span><span class="p">(</span><span class="n">make-sum</span><span class="w"> </span><span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="p">(</span><span class="n">addend</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="n">var</span><span class="p">)</span>
<span class="w">                   </span><span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="p">(</span><span class="n">augend</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="n">var</span><span class="p">)))</span>
<span class="w">        </span><span class="p">((</span><span class="n">product?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span>
<span class="w">         </span><span class="p">(</span><span class="n">make-sum</span>
<span class="w">          </span><span class="p">(</span><span class="n">make-product</span>
<span class="w">           </span><span class="p">(</span><span class="n">multiplier</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span>
<span class="w">           </span><span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="p">(</span><span class="n">multiplicand</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="n">var</span><span class="p">))</span>
<span class="w">          </span><span class="p">(</span><span class="n">make-product</span>
<span class="w">           </span><span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="p">(</span><span class="n">multiplier</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="n">var</span><span class="p">)</span>
<span class="w">           </span><span class="p">(</span><span class="n">multiplicand</span><span class="w"> </span><span class="nb">exp</span><span class="p">))))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;unknown expression</span>
<span class="s2">                      type: DERIV&quot;</span><span class="w"> </span><span class="nb">exp</span><span class="p">))))</span>

<span class="p">(</span><span class="nb">newline</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;make-product tests&quot;</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="p">(</span><span class="n">make-product</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">y</span><span class="p">)</span>
<span class="p">(</span><span class="n">make-product</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="w"> </span><span class="p">(</span><span class="n">make-product</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">y</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">z</span><span class="p">))</span>
<span class="p">(</span><span class="n">make-product</span><span class="w"> </span><span class="mi">4</span><span class="w"> </span><span class="p">(</span><span class="n">make-product</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="p">))</span>
<span class="p">(</span><span class="n">make-product</span><span class="w"> </span><span class="p">(</span><span class="n">make-product</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">a</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">make-product</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="p">))</span>

<span class="p">(</span><span class="nb">newline</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;make-sum tests&quot;</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="p">(</span><span class="n">make-sum</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">y</span><span class="p">)</span>
<span class="p">(</span><span class="n">make-sum</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="w"> </span><span class="p">(</span><span class="n">make-sum</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">y</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">z</span><span class="p">))</span>
<span class="p">(</span><span class="n">make-sum</span><span class="w"> </span><span class="mi">4</span><span class="w"> </span><span class="p">(</span><span class="n">make-sum</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="p">))</span>
<span class="p">(</span><span class="n">make-sum</span><span class="w"> </span><span class="p">(</span><span class="n">make-sum</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">a</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">make-sum</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="p">))</span>

<span class="p">(</span><span class="nb">newline</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;deriv and make-product tests&quot;</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="p">(</span><span class="n">make-product</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">y</span><span class="p">)</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="p">)</span>
<span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="p">(</span><span class="n">make-product</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="w"> </span><span class="p">(</span><span class="n">make-product</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">y</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">z</span><span class="p">))</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="p">)</span>
<span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="p">(</span><span class="n">make-product</span><span class="w"> </span><span class="mi">4</span><span class="w"> </span><span class="p">(</span><span class="n">make-product</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="p">))</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="p">)</span>
<span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="p">(</span><span class="n">make-product</span><span class="w"> </span><span class="p">(</span><span class="n">make-product</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">a</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">make-product</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="p">))</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="p">)</span>

<span class="p">(</span><span class="nb">newline</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;sum and make-sum tests&quot;</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="p">(</span><span class="n">make-sum</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">y</span><span class="p">)</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="p">)</span>
<span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="p">(</span><span class="n">make-sum</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="w"> </span><span class="p">(</span><span class="n">make-sum</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">y</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">z</span><span class="p">))</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="p">)</span>
<span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="p">(</span><span class="n">make-sum</span><span class="w"> </span><span class="mi">4</span><span class="w"> </span><span class="p">(</span><span class="n">make-sum</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="p">))</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="p">)</span>
<span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="p">(</span><span class="n">make-sum</span><span class="w"> </span><span class="p">(</span><span class="n">make-sum</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">a</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">make-sum</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="p">))</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="p">)</span>


<span class="p">(</span><span class="nb">newline</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;Another example&quot;</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">x</span><span class="w"> </span><span class="ss">+</span><span class="w"> </span><span class="mi">3</span><span class="w"> </span><span class="ss">*</span><span class="w"> </span><span class="p">(</span><span class="ss">x</span><span class="w"> </span><span class="ss">*</span><span class="w"> </span><span class="ss">x</span><span class="w"> </span><span class="ss">+</span><span class="w"> </span><span class="ss">y</span><span class="w"> </span><span class="ss">+</span><span class="w"> </span><span class="mi">2</span><span class="p">))</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">x</span><span class="p">)</span>
<span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">x</span><span class="w"> </span><span class="ss">+</span><span class="w"> </span><span class="mi">3</span><span class="w"> </span><span class="ss">*</span><span class="w"> </span><span class="p">(</span><span class="ss">x</span><span class="w"> </span><span class="ss">*</span><span class="w"> </span><span class="ss">x</span><span class="w"> </span><span class="ss">+</span><span class="w"> </span><span class="ss">y</span><span class="w"> </span><span class="ss">+</span><span class="w"> </span><span class="mi">2</span><span class="p">))</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">y</span><span class="p">)</span>
</pre></div>
<div class="code-output">
<span>Output:</span>
<pre>
make-product tests
(x * y)
(x * (y * z))
(4 * (2 * x))
((a * x) * (2 * x))

make-sum tests
(x + y)
(x + (y + z))
(4 + (2 + x))
((a + x) + (2 + x))

deriv and make-product tests
y
(y * z)
8
(((a * x) * 2) + (a * (2 * x)))

sum and make-sum tests
1
1
1
2

Another example
(1 + (3 * (x + x)))
3
</pre>
</div>
</div>


<!-- For part 2, One way we can easily do this is: On the top level of a list, make a list of all summands and recurse `(deriv term sym)`. If there are no sums. make a list of all products and recurse in the more complicated product rule form. -->


#### Exercise 2.59

Implement the `union-set`
operation for the unordered-list representation of sets.

##### Solution

My impl reverses the order of elements, which is ugly, but whatever.

<div class="code-box" markdown="1">
<div class="code-header"><a href="code/ex2-59.rkt">code/ex2-59.rkt</a></div>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">element-of-set?</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="nb">set</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">null?</span><span class="w"> </span><span class="nb">set</span><span class="p">)</span><span class="w"> </span><span class="k">false</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="nb">equal?</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="nb">set</span><span class="p">))</span><span class="w"> </span><span class="nb">true</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="n">element-of-set?</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="nb">set</span><span class="p">)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">adjoin-set</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="nb">set</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">element-of-set?</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="nb">set</span><span class="p">)</span>
<span class="w">      </span><span class="nb">set</span>
<span class="w">      </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="nb">set</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">intersection-set</span><span class="w"> </span><span class="n">set1</span><span class="w"> </span><span class="n">set2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="k">or</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="n">set1</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="n">set2</span><span class="p">))</span><span class="w"> </span>
<span class="w">         </span><span class="o">&#39;</span><span class="p">())</span>
<span class="w">        </span><span class="p">((</span><span class="n">element-of-set?</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">set1</span><span class="p">)</span><span class="w"> </span><span class="n">set2</span><span class="p">)</span>
<span class="w">         </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">set1</span><span class="p">)</span>
<span class="w">               </span><span class="p">(</span><span class="n">intersection-set</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">set1</span><span class="p">)</span><span class="w"> </span>
<span class="w">                                 </span><span class="n">set2</span><span class="p">)))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="n">intersection-set</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">set1</span><span class="p">)</span><span class="w"> </span>
<span class="w">                                </span><span class="n">set2</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">union-set</span><span class="w"> </span><span class="n">gset1</span><span class="w"> </span><span class="n">gset2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">union-set-helper</span><span class="w"> </span><span class="n">set1</span><span class="w"> </span><span class="n">set2</span><span class="w"> </span><span class="n">ret</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="n">set1</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="n">set2</span><span class="p">))</span><span class="w"> </span><span class="n">ret</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="nb">null?</span><span class="w"> </span><span class="n">set1</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">union-set-helper</span><span class="w"> </span><span class="n">set2</span><span class="w"> </span><span class="n">set1</span><span class="w"> </span><span class="n">ret</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">element-of-set?</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">set1</span><span class="p">)</span><span class="w"> </span><span class="n">ret</span><span class="p">)</span>
<span class="w">                  </span><span class="p">(</span><span class="n">union-set-helper</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">set1</span><span class="p">)</span><span class="w"> </span><span class="n">set2</span><span class="w"> </span><span class="n">ret</span><span class="p">)</span>
<span class="w">                  </span><span class="p">(</span><span class="n">union-set-helper</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">set1</span><span class="p">)</span><span class="w"> </span><span class="n">set2</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">set1</span><span class="p">)</span><span class="w"> </span><span class="n">ret</span><span class="p">))))))</span>
<span class="w">  </span><span class="p">(</span><span class="n">union-set-helper</span><span class="w"> </span><span class="n">gset1</span><span class="w"> </span><span class="n">gset2</span><span class="w"> </span><span class="o">&#39;</span><span class="p">()))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">set1</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">a</span><span class="w"> </span><span class="ss">b</span><span class="w"> </span><span class="ss">c</span><span class="w"> </span><span class="ss">d</span><span class="w"> </span><span class="ss">e</span><span class="w"> </span><span class="ss">f</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">set2</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">c</span><span class="w"> </span><span class="ss">d</span><span class="w"> </span><span class="ss">e</span><span class="w"> </span><span class="ss">f</span><span class="w"> </span><span class="ss">g</span><span class="w"> </span><span class="ss">h</span><span class="w"> </span><span class="ss">i</span><span class="p">))</span>

<span class="p">(</span><span class="n">intersection-set</span><span class="w"> </span><span class="n">set1</span><span class="w"> </span><span class="n">set2</span><span class="p">)</span>
<span class="p">(</span><span class="n">union-set</span><span class="w"> </span><span class="n">set1</span><span class="w"> </span><span class="n">set2</span><span class="p">)</span>
</pre></div>
<div class="code-output">
<span>Output:</span>
<pre>(c d e f)
(i h g f e d c b a)
</pre>
</div>
</div>


#### Exercise 2.60

We specified that a set would be
represented as a list with no duplicates.  Now suppose we allow duplicates.
For instance, the set $\{1, 2, 3\}$ could be represented as the list `(2 3 2 1
3 2 2)`.  Design procedures `element-of-set?`, `adjoin-set`,
`union-set`, and `intersection-set` that operate on this
representation.  How does the efficiency of each compare with the corresponding
procedure for the non-duplicate representation?  Are there applications for
which you would use this representation in preference to the non-duplicate one?

##### Solution

<div class="code-box" markdown="1">
<div class="code-header"><a href="code/ex2-60.rkt">code/ex2-60.rkt</a></div>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">element-of-set?</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="nb">set</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">null?</span><span class="w"> </span><span class="nb">set</span><span class="p">)</span><span class="w"> </span><span class="k">false</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="nb">equal?</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="nb">set</span><span class="p">))</span><span class="w"> </span><span class="nb">true</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="n">element-of-set?</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="nb">set</span><span class="p">)))))</span>

<span class="c1">; Theta(1)</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">adjoin-set</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="nb">set</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="nb">set</span><span class="p">))</span>
<span class="w">  </span>
<span class="c1">;; Theta(n^2)</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">intersection-set</span><span class="w"> </span><span class="n">set1</span><span class="w"> </span><span class="n">set2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="k">or</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="n">set1</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="n">set2</span><span class="p">))</span><span class="w"> </span>
<span class="w">         </span><span class="o">&#39;</span><span class="p">())</span>
<span class="w">        </span><span class="p">((</span><span class="n">element-of-set?</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">set1</span><span class="p">)</span><span class="w"> </span><span class="n">set2</span><span class="p">)</span>
<span class="w">         </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">set1</span><span class="p">)</span>
<span class="w">               </span><span class="p">(</span><span class="n">intersection-set</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">set1</span><span class="p">)</span><span class="w"> </span>
<span class="w">                                 </span><span class="n">set2</span><span class="p">)))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="n">intersection-set</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">set1</span><span class="p">)</span><span class="w"> </span>
<span class="w">                                </span><span class="n">set2</span><span class="p">))))</span>

<span class="c1">;; Theta(1) (or, if append is implemented with (length gset1) calls to cons, it&#39;s Theta(n))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">union-set</span><span class="w"> </span><span class="n">gset1</span><span class="w"> </span><span class="n">gset2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">append</span><span class="w"> </span><span class="n">gset1</span><span class="w"> </span><span class="n">gset2</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">set1</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">a</span><span class="w"> </span><span class="ss">b</span><span class="w"> </span><span class="ss">c</span><span class="w"> </span><span class="ss">d</span><span class="w"> </span><span class="ss">e</span><span class="w"> </span><span class="ss">f</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">set2</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">c</span><span class="w"> </span><span class="ss">d</span><span class="w"> </span><span class="ss">e</span><span class="w"> </span><span class="ss">f</span><span class="w"> </span><span class="ss">g</span><span class="w"> </span><span class="ss">h</span><span class="w"> </span><span class="ss">i</span><span class="p">))</span>

<span class="p">(</span><span class="n">intersection-set</span><span class="w"> </span><span class="n">set1</span><span class="w"> </span><span class="n">set2</span><span class="p">)</span>
<span class="p">(</span><span class="n">union-set</span><span class="w"> </span><span class="n">set1</span><span class="w"> </span><span class="n">set2</span><span class="p">)</span>
</pre></div>
<div class="code-output">
<span>Output:</span>
<pre>(c d e f)
(a b c d e f c d e f g h i)
</pre>
</div>
</div>


#### Exercise 2.61

Give an implementation of
`adjoin-set` using the ordered representation.  By analogy with
`element-of-set?` show how to take advantage of the ordering to produce a
procedure that requires on the average about half as many steps as with the
unordered representation.

##### Solution

<div class="code-box" markdown="1">
<div class="code-header"><a href="code/ex2-61.rkt">code/ex2-61.rkt</a></div>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">adjoin-set</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="nb">set</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">null?</span><span class="w"> </span><span class="nb">set</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="w">        </span><span class="p">((</span><span class="nb">&gt;</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="nb">set</span><span class="p">))</span><span class="w"> </span>
<span class="w">         </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="nb">set</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">adjoin-set</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="nb">set</span><span class="p">))))</span>
<span class="w">        </span><span class="p">((</span><span class="nb">=</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="nb">set</span><span class="p">))</span><span class="w"> </span><span class="nb">set</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="nb">set</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">set0</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="mi">4</span><span class="w"> </span><span class="mi">8</span><span class="w"> </span><span class="mi">12</span><span class="p">))</span>

<span class="p">(</span><span class="n">adjoin-set</span><span class="w"> </span><span class="mi">4</span><span class="w"> </span><span class="n">set0</span><span class="p">)</span>
<span class="p">(</span><span class="n">adjoin-set</span><span class="w"> </span><span class="mi">5</span><span class="w"> </span><span class="n">set0</span><span class="p">)</span>
<span class="p">(</span><span class="n">adjoin-set</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="n">set0</span><span class="p">)</span>
<span class="p">(</span><span class="n">adjoin-set</span><span class="w"> </span><span class="mi">-1</span><span class="w"> </span><span class="n">set0</span><span class="p">)</span>
<span class="p">(</span><span class="n">adjoin-set</span><span class="w"> </span><span class="mi">16</span><span class="w"> </span><span class="n">set0</span><span class="p">)</span>
</pre></div>
<div class="code-output">
<span>Output:</span>
<pre>(0 4 8 12)
(0 4 5 8 12)
(0 1 4 8 12)
(-1 0 4 8 12)
(0 4 8 12 16)
</pre>
</div>
</div>


#### Exercise 2.62

Give a $\Theta(n)$
implementation of `union-set` for sets represented as ordered lists.

##### Solution

<div class="code-box" markdown="1">
<div class="code-header"><a href="code/ex2-62.rkt">code/ex2-62.rkt</a></div>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">element-of-set?</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="nb">set</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">null?</span><span class="w"> </span><span class="nb">set</span><span class="p">)</span><span class="w"> </span><span class="k">false</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="nb">=</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="nb">set</span><span class="p">))</span><span class="w"> </span><span class="nb">true</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="nb">&lt;</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="nb">set</span><span class="p">))</span><span class="w"> </span><span class="k">false</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="n">element-of-set?</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="nb">set</span><span class="p">)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">adjoin-set</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="nb">set</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">null?</span><span class="w"> </span><span class="nb">set</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="w">        </span><span class="p">((</span><span class="nb">&gt;</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="nb">set</span><span class="p">))</span><span class="w"> </span>
<span class="w">         </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="nb">set</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">adjoin-set</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="nb">set</span><span class="p">))))</span>
<span class="w">        </span><span class="p">((</span><span class="nb">=</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="nb">set</span><span class="p">))</span><span class="w"> </span><span class="nb">set</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="nb">set</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">intersection-set</span><span class="w"> </span><span class="n">set1</span><span class="w"> </span><span class="n">set2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="k">or</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="n">set1</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="n">set2</span><span class="p">))</span>
<span class="w">      </span><span class="o">&#39;</span><span class="p">()</span>
<span class="w">      </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">x1</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">set1</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="n">x2</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">set2</span><span class="p">)))</span>
<span class="w">        </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">=</span><span class="w"> </span><span class="n">x1</span><span class="w"> </span><span class="n">x2</span><span class="p">)</span>
<span class="w">               </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">x1</span><span class="w"> </span><span class="p">(</span><span class="n">intersection-set</span>
<span class="w">                         </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">set1</span><span class="p">)</span>
<span class="w">                         </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">set2</span><span class="p">))))</span>
<span class="w">              </span><span class="p">((</span><span class="nb">&lt;</span><span class="w"> </span><span class="n">x1</span><span class="w"> </span><span class="n">x2</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">intersection-set</span>
<span class="w">                          </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">set1</span><span class="p">)</span>
<span class="w">                          </span><span class="n">set2</span><span class="p">))</span>
<span class="w">              </span><span class="p">((</span><span class="nb">&lt;</span><span class="w"> </span><span class="n">x2</span><span class="w"> </span><span class="n">x1</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">intersection-set</span>
<span class="w">                          </span><span class="n">set1</span>
<span class="w">                          </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">set2</span><span class="p">)))))))</span>

<span class="c1">;; set1 is an ordered set, set2 is an ordered set,</span>
<span class="c1">;; both with no duplicates</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">union-set</span><span class="w"> </span><span class="n">set1</span><span class="w"> </span><span class="n">set2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">null?</span><span class="w"> </span><span class="n">set1</span><span class="p">)</span><span class="w"> </span><span class="n">set2</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="nb">null?</span><span class="w"> </span><span class="n">set2</span><span class="p">)</span><span class="w"> </span><span class="n">set1</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">x1</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">set1</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="n">x2</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">set2</span><span class="p">)))</span>
<span class="w">          </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">=</span><span class="w"> </span><span class="n">x1</span><span class="w"> </span><span class="n">x2</span><span class="p">)</span>
<span class="w">                 </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">x1</span><span class="w"> </span><span class="p">(</span><span class="n">union-set</span>
<span class="w">                           </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">set1</span><span class="p">)</span>
<span class="w">                           </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">set2</span><span class="p">))))</span>
<span class="w">                </span><span class="p">((</span><span class="nb">&lt;</span><span class="w"> </span><span class="n">x1</span><span class="w"> </span><span class="n">x2</span><span class="p">)</span><span class="w"> </span>
<span class="w">                 </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">x1</span><span class="w"> </span><span class="p">(</span><span class="n">union-set</span><span class="w"> </span>
<span class="w">                            </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">set1</span><span class="p">)</span>
<span class="w">                            </span><span class="n">set2</span><span class="p">)))</span>
<span class="w">                </span><span class="p">((</span><span class="nb">&lt;</span><span class="w"> </span><span class="n">x2</span><span class="w"> </span><span class="n">x1</span><span class="p">)</span><span class="w"> </span>
<span class="w">                 </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">x2</span><span class="w"> </span><span class="p">(</span><span class="n">union-set</span>
<span class="w">                            </span><span class="n">set1</span>
<span class="w">                            </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">set2</span><span class="p">)))))))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">set0</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="mi">4</span><span class="w"> </span><span class="mi">8</span><span class="w"> </span><span class="mi">12</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">set1</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">-4</span><span class="w"> </span><span class="mi">-3</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">4</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">set2</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">16</span><span class="w"> </span><span class="mi">18</span><span class="w"> </span><span class="mi">20</span><span class="p">))</span>

<span class="p">(</span><span class="n">intersection-set</span><span class="w"> </span><span class="n">set0</span><span class="w"> </span><span class="n">set1</span><span class="p">)</span>
<span class="p">(</span><span class="n">union-set</span><span class="w"> </span><span class="n">set0</span><span class="w"> </span><span class="n">set1</span><span class="p">)</span>
<span class="p">(</span><span class="n">union-set</span><span class="w"> </span><span class="n">set1</span><span class="w"> </span><span class="n">set0</span><span class="p">)</span>
<span class="p">(</span><span class="n">union-set</span><span class="w"> </span><span class="n">set1</span><span class="w"> </span><span class="n">set2</span><span class="p">)</span>
<span class="p">(</span><span class="n">union-set</span><span class="w"> </span><span class="n">set2</span><span class="w"> </span><span class="n">set1</span><span class="p">)</span>
</pre></div>
<div class="code-output">
<span>Output:</span>
<pre>(0 4)
(-4 -3 0 1 4 8 12)
(-4 -3 0 1 4 8 12)
(-4 -3 0 1 4 16 18 20)
(-4 -3 0 1 4 16 18 20)
</pre>
</div>
</div>


#### Exercise 2.63

Each of the following two
procedures converts a binary tree to a list.

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">tree-&gt;list-1</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span>
<span class="w">      </span><span class="o">&#39;</span><span class="p">()</span>
<span class="w">      </span><span class="p">(</span><span class="nb">append</span><span class="w"> </span>
<span class="w">       </span><span class="p">(</span><span class="n">tree-&gt;list-1</span><span class="w"> </span>
<span class="w">        </span><span class="p">(</span><span class="n">left-branch</span><span class="w"> </span><span class="n">tree</span><span class="p">))</span>
<span class="w">       </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="p">(</span><span class="n">entry</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span>
<span class="w">             </span><span class="p">(</span><span class="n">tree-&gt;list-1</span><span class="w"> </span>
<span class="w">              </span><span class="p">(</span><span class="n">right-branch</span><span class="w"> </span><span class="n">tree</span><span class="p">))))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">tree-&gt;list-2</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">copy-to-list</span><span class="w"> </span><span class="n">tree</span><span class="w"> </span><span class="n">result-list</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span>
<span class="w">        </span><span class="n">result-list</span>
<span class="w">        </span><span class="p">(</span><span class="n">copy-to-list</span><span class="w"> </span>
<span class="w">         </span><span class="p">(</span><span class="n">left-branch</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span>
<span class="w">         </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="p">(</span><span class="n">entry</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span>
<span class="w">               </span><span class="p">(</span><span class="n">copy-to-list</span><span class="w"> </span>
<span class="w">                </span><span class="p">(</span><span class="n">right-branch</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span>
<span class="w">                </span><span class="n">result-list</span><span class="p">)))))</span>
<span class="w">  </span><span class="p">(</span><span class="n">copy-to-list</span><span class="w"> </span><span class="n">tree</span><span class="w"> </span><span class="o">&#39;</span><span class="p">()))</span>
</pre></div>

**1.** Do the two procedures produce the same result for every tree?  If not, how do
the results differ?  What lists do the two procedures produce for the trees in
Figure 2.16?

**2.** Do the two procedures have the same order of growth in the number of steps
required to convert a balanced tree with $n$ elements to a list?  If not,
which one grows more slowly?

##### Solution

An animation of these algorithms would be nice!

1. They both produce the same result for every tree. The implementation below constructs
the different trees and demonstrates this.
2. The two procedures don't have the same order of growth. The second algorithm is $\Theta(n)$ where $n$ is the number of nodes. The issue with the first algorithm is the append operation,
which first has to traverse a linked list before appending the second list. This sets up a bit 
of a weird recursion. For a perfectly balanced tree, I first thought this is $\Theta(n^2)$ where
$n$ is the number of nodes, but in fact it's $\Theta(n\log(n))$. We can set up a recursion:

The time taken for a tree, $T(\text{tree})$ is the sum of...

 - the time taken to append the left tree, $\textrm{Length}(\textrm{left-tree})$
 - the time taken to construct the left tree, $T(\textrm{left-tree})$
 - the time taken to construct the right tree, $T(\textrm{right-tree})$

So 
$$T(\textrm{tree})=\textrm{Length}(\textrm{left-tree})+T(\textrm{left-tree})+T(\textrm{right-tree})$$

For a perfectly balanced tree of length n, this gives recursion
$$T(n)=\frac{n}{2}+2T(\frac{n}{2})$$
Whose solution is $T(n)=\Theta(n\log(n))$

<div class="code-box" markdown="1">
<div class="code-header"><a href="code/ex2-63.rkt">code/ex2-63.rkt</a></div>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">entry</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">tree</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">left-branch</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cadr</span><span class="w"> </span><span class="n">tree</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">right-branch</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">caddr</span><span class="w"> </span><span class="n">tree</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-tree</span><span class="w"> </span><span class="n">entry</span><span class="w"> </span><span class="n">left</span><span class="w"> </span><span class="n">right</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="n">entry</span><span class="w"> </span><span class="n">left</span><span class="w"> </span><span class="n">right</span><span class="p">))</span>
<span class="c1">;; trivial tree</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">tt</span><span class="w"> </span><span class="n">entry</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="n">entry</span><span class="w"> </span><span class="o">&#39;</span><span class="p">()</span><span class="w"> </span><span class="o">&#39;</span><span class="p">()))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">one</span><span class="w"> </span><span class="p">(</span><span class="n">tt</span><span class="w"> </span><span class="mi">1</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">three</span><span class="w"> </span><span class="p">(</span><span class="n">tt</span><span class="w"> </span><span class="mi">3</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">five</span><span class="w"> </span><span class="p">(</span><span class="n">tt</span><span class="w"> </span><span class="mi">5</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">seven</span><span class="w"> </span><span class="p">(</span><span class="n">tt</span><span class="w"> </span><span class="mi">7</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">nine</span><span class="w"> </span><span class="p">(</span><span class="n">tt</span><span class="w"> </span><span class="mi">9</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">eleven</span><span class="w"> </span><span class="p">(</span><span class="n">tt</span><span class="w"> </span><span class="mi">11</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">tree-one</span><span class="w"> </span><span class="p">(</span><span class="n">make-tree</span><span class="w"> </span><span class="mi">7</span><span class="w"> </span><span class="p">(</span><span class="n">make-tree</span><span class="w"> </span><span class="mi">3</span><span class="w"> </span><span class="n">one</span><span class="w"> </span><span class="n">five</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">make-tree</span><span class="w"> </span><span class="mi">9</span><span class="w"> </span><span class="o">&#39;</span><span class="p">()</span><span class="w"> </span><span class="n">eleven</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">tree-two</span><span class="w"> </span><span class="p">(</span><span class="n">make-tree</span><span class="w"> </span><span class="mi">3</span><span class="w"> </span><span class="n">one</span><span class="w"> </span><span class="p">(</span><span class="n">make-tree</span><span class="w"> </span><span class="mi">7</span><span class="w"> </span><span class="n">five</span><span class="w"> </span><span class="p">(</span><span class="n">make-tree</span><span class="w"> </span><span class="mi">9</span><span class="w"> </span><span class="o">&#39;</span><span class="p">()</span><span class="w"> </span><span class="n">eleven</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">tree-three</span><span class="w"> </span><span class="p">(</span><span class="n">make-tree</span><span class="w"> </span><span class="mi">5</span><span class="w"> </span><span class="p">(</span><span class="n">make-tree</span><span class="w"> </span><span class="mi">3</span><span class="w"> </span><span class="n">one</span><span class="w"> </span><span class="o">&#39;</span><span class="p">())</span><span class="w"> </span><span class="p">(</span><span class="n">make-tree</span><span class="w"> </span><span class="mi">9</span><span class="w"> </span><span class="n">seven</span><span class="w"> </span><span class="n">eleven</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">element-of-set?</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="nb">set</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">null?</span><span class="w"> </span><span class="nb">set</span><span class="p">)</span><span class="w"> </span><span class="k">false</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="nb">=</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="p">(</span><span class="n">entry</span><span class="w"> </span><span class="nb">set</span><span class="p">))</span><span class="w"> </span><span class="nb">true</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="nb">&lt;</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="p">(</span><span class="n">entry</span><span class="w"> </span><span class="nb">set</span><span class="p">))</span>
<span class="w">         </span><span class="p">(</span><span class="n">element-of-set?</span><span class="w"> </span>
<span class="w">          </span><span class="n">x</span><span class="w"> </span>
<span class="w">          </span><span class="p">(</span><span class="n">left-branch</span><span class="w"> </span><span class="nb">set</span><span class="p">)))</span>
<span class="w">        </span><span class="p">((</span><span class="nb">&gt;</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="p">(</span><span class="n">entry</span><span class="w"> </span><span class="nb">set</span><span class="p">))</span>
<span class="w">         </span><span class="p">(</span><span class="n">element-of-set?</span><span class="w"> </span>
<span class="w">          </span><span class="n">x</span><span class="w"> </span>
<span class="w">          </span><span class="p">(</span><span class="n">right-branch</span><span class="w"> </span><span class="nb">set</span><span class="p">)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">adjoin-set</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="nb">set</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">null?</span><span class="w"> </span><span class="nb">set</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">make-tree</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="o">&#39;</span><span class="p">()</span><span class="w"> </span><span class="o">&#39;</span><span class="p">()))</span>
<span class="w">        </span><span class="p">((</span><span class="nb">=</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="p">(</span><span class="n">entry</span><span class="w"> </span><span class="nb">set</span><span class="p">))</span><span class="w"> </span><span class="nb">set</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="nb">&lt;</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="p">(</span><span class="n">entry</span><span class="w"> </span><span class="nb">set</span><span class="p">))</span>
<span class="w">         </span><span class="p">(</span><span class="n">make-tree</span>
<span class="w">          </span><span class="p">(</span><span class="n">entry</span><span class="w"> </span><span class="nb">set</span><span class="p">)</span>
<span class="w">          </span><span class="p">(</span><span class="n">adjoin-set</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="p">(</span><span class="n">left-branch</span><span class="w"> </span><span class="nb">set</span><span class="p">))</span>
<span class="w">          </span><span class="p">(</span><span class="n">right-branch</span><span class="w"> </span><span class="nb">set</span><span class="p">)))</span>
<span class="w">        </span><span class="p">((</span><span class="nb">&gt;</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="p">(</span><span class="n">entry</span><span class="w"> </span><span class="nb">set</span><span class="p">))</span>
<span class="w">         </span><span class="p">(</span><span class="n">make-tree</span>
<span class="w">          </span><span class="p">(</span><span class="n">entry</span><span class="w"> </span><span class="nb">set</span><span class="p">)</span>
<span class="w">          </span><span class="p">(</span><span class="n">left-branch</span><span class="w"> </span><span class="nb">set</span><span class="p">)</span>
<span class="w">          </span><span class="p">(</span><span class="n">adjoin-set</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="p">(</span><span class="n">right-branch</span><span class="w"> </span><span class="nb">set</span><span class="p">))))))</span>

<span class="c1">;; Each time we do an append we have to traverse a linked list, </span>
<span class="c1">;; which is of length n, so I think</span>

<span class="c1">;; If it&#39;s a balanced tree, at step 1 we do (n/2) steps</span>
<span class="c1">;; T(tree) = Length(left-tree) + T(left-tree)+ 1 + T(right-tree)</span>
<span class="c1">;; T(N) = N/2 + 2 T(N/2) + 1</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">tree-&gt;list-1</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span>
<span class="w">      </span><span class="o">&#39;</span><span class="p">()</span>
<span class="w">      </span><span class="p">(</span><span class="nb">append</span><span class="w"> </span>
<span class="w">       </span><span class="p">(</span><span class="n">tree-&gt;list-1</span><span class="w"> </span>
<span class="w">        </span><span class="p">(</span><span class="n">left-branch</span><span class="w"> </span><span class="n">tree</span><span class="p">))</span>
<span class="w">       </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="p">(</span><span class="n">entry</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span>
<span class="w">             </span><span class="p">(</span><span class="n">tree-&gt;list-1</span><span class="w"> </span>
<span class="w">              </span><span class="p">(</span><span class="n">right-branch</span><span class="w"> </span><span class="n">tree</span><span class="p">))))))</span>

<span class="c1">;; Theta(# of nodes?)</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">tree-&gt;list-2</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span>
<span class="w">  </span><span class="c1">;; Invariant: tree &lt; result-list (for all elements)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">copy-to-list</span><span class="w"> </span><span class="n">tree</span><span class="w"> </span><span class="n">result-list</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span>
<span class="w">        </span><span class="n">result-list</span>
<span class="w">        </span><span class="p">(</span><span class="n">copy-to-list</span><span class="w"> </span>
<span class="w">         </span><span class="p">(</span><span class="n">left-branch</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span>
<span class="w">         </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="p">(</span><span class="n">entry</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span>
<span class="w">               </span><span class="p">(</span><span class="n">copy-to-list</span><span class="w"> </span>
<span class="w">                </span><span class="p">(</span><span class="n">right-branch</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span>
<span class="w">                </span><span class="n">result-list</span><span class="p">)))))</span>
<span class="w">  </span><span class="p">(</span><span class="n">copy-to-list</span><span class="w"> </span><span class="n">tree</span><span class="w"> </span><span class="o">&#39;</span><span class="p">()))</span>

<span class="p">(</span><span class="n">tree-&gt;list-1</span><span class="w"> </span><span class="n">tree-one</span><span class="p">)</span>
<span class="p">(</span><span class="n">tree-&gt;list-2</span><span class="w"> </span><span class="n">tree-one</span><span class="p">)</span>
<span class="p">(</span><span class="n">tree-&gt;list-1</span><span class="w"> </span><span class="n">tree-two</span><span class="p">)</span>
<span class="p">(</span><span class="n">tree-&gt;list-2</span><span class="w"> </span><span class="n">tree-two</span><span class="p">)</span>
<span class="p">(</span><span class="n">tree-&gt;list-1</span><span class="w"> </span><span class="n">tree-three</span><span class="p">)</span>
<span class="p">(</span><span class="n">tree-&gt;list-2</span><span class="w"> </span><span class="n">tree-three</span><span class="p">)</span>
</pre></div>
<div class="code-output">
<span>Output:</span>
<pre>(1 3 5 7 9 11)
(1 3 5 7 9 11)
(1 3 5 7 9 11)
(1 3 5 7 9 11)
(1 3 5 7 9 11)
(1 3 5 7 9 11)
</pre>
</div>
</div>


#### Exercise 2.64

The following procedure
`list->tree` converts an ordered list to a balanced binary tree.  The
helper procedure `partial-tree` takes as arguments an integer $n$ and
list of at least $n$ elements and constructs a balanced tree containing the
first $n$ elements of the list.  The result returned by `partial-tree`
is a pair (formed with `cons`) whose `car` is the constructed tree
and whose `cdr` is the list of elements not included in the tree.

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">list-&gt;tree</span><span class="w"> </span><span class="n">elements</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="p">(</span><span class="n">partial-tree</span><span class="w"> </span>
<span class="w">        </span><span class="n">elements</span><span class="w"> </span><span class="p">(</span><span class="nb">length</span><span class="w"> </span><span class="n">elements</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">partial-tree</span><span class="w"> </span><span class="n">elts</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="o">&#39;</span><span class="p">()</span><span class="w"> </span><span class="n">elts</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">left-size</span><span class="w"> </span>
<span class="w">             </span><span class="p">(</span><span class="nb">quotient</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span><span class="w"> </span><span class="mi">2</span><span class="p">)))</span>
<span class="w">        </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">left-result</span><span class="w"> </span>
<span class="w">               </span><span class="p">(</span><span class="n">partial-tree</span><span class="w"> </span>
<span class="w">                </span><span class="n">elts</span><span class="w"> </span><span class="n">left-size</span><span class="p">)))</span>
<span class="w">          </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">left-tree</span><span class="w"> </span>
<span class="w">                 </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">left-result</span><span class="p">))</span>
<span class="w">                </span><span class="p">(</span><span class="n">non-left-elts</span><span class="w"> </span>
<span class="w">                 </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">left-result</span><span class="p">))</span>
<span class="w">                </span><span class="p">(</span><span class="n">right-size</span><span class="w"> </span>
<span class="w">                 </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">left-size</span><span class="w"> </span><span class="mi">1</span><span class="p">))))</span>
<span class="w">            </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">this-entry</span><span class="w"> </span>
<span class="w">                   </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">non-left-elts</span><span class="p">))</span>
<span class="w">                  </span><span class="p">(</span><span class="n">right-result</span><span class="w"> </span>
<span class="w">                   </span><span class="p">(</span><span class="n">partial-tree</span><span class="w"> </span>
<span class="w">                    </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">non-left-elts</span><span class="p">)</span>
<span class="w">                    </span><span class="n">right-size</span><span class="p">)))</span>
<span class="w">              </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">right-tree</span><span class="w"> </span>
<span class="w">                     </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">right-result</span><span class="p">))</span>
<span class="w">                    </span><span class="p">(</span><span class="n">remaining-elts</span><span class="w"> </span>
<span class="w">                     </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">right-result</span><span class="p">)))</span>
<span class="w">                </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="p">(</span><span class="n">make-tree</span><span class="w"> </span><span class="n">this-entry</span><span class="w"> </span>
<span class="w">                                 </span><span class="n">left-tree</span><span class="w"> </span>
<span class="w">                                 </span><span class="n">right-tree</span><span class="p">)</span>
<span class="w">                      </span><span class="n">remaining-elts</span><span class="p">))))))))</span>
</pre></div>

**1.** Write a short paragraph explaining as clearly as you can how
`partial-tree` works.  Draw the tree produced by `list->tree` for
the list `(1 3 5 7 9 11)`.

**2.** What is the order of growth in the number of steps required by
`list->tree` to convert a list of $n$ elements?



##### Solution

The key is that we want to be able to write this line:
<div class="codehilite"><pre><span></span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="p">(</span><span class="n">make-tree</span><span class="w"> </span><span class="n">this-entry</span>
<span class="w">       </span><span class="n">left-tree</span>
<span class="w">       </span><span class="n">right-tree</span><span class="p">)</span>
<span class="w"> </span><span class="n">remaining-elts</span><span class="p">)</span>
</pre></div>
In Javascript we'd use something like `.slice()` to get the first ~n/2
elements, the middle element, and the last ~n/2 elements. The purpose of the 
remaining-elts list basically implements this slicing in a clever way.

For question 2, we don't have any calls to things like `length` or `append` 
in our recursion. So our growth should just be linear.

#### Exercise 2.65

Use the results of Exercise 2.63 
and Exercise 2.64 to give $\Theta(n)$ implementations of
`union-set` and `intersection-set` for sets implemented as (balanced)
binary trees.

##### Solution

We can just combine our previous algorithms:

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">union-set-tree</span><span class="w"> </span><span class="n">set1</span><span class="w"> </span><span class="n">set2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">list-&gt;tree</span><span class="w"> </span><span class="p">(</span><span class="n">union-set</span>
<span class="w">               </span><span class="p">(</span><span class="n">tree-&gt;list</span><span class="w"> </span><span class="n">set1</span><span class="p">)</span><span class="w"> </span>
<span class="w">               </span><span class="p">(</span><span class="n">tree-&gt;list</span><span class="w"> </span><span class="n">set2</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">intersection-set-tree</span><span class="w"> </span><span class="n">set1</span><span class="w"> </span><span class="n">set2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">list-&gt;tree</span><span class="w"> </span><span class="p">(</span><span class="n">intersection-set</span><span class="w"> </span>
<span class="w">               </span><span class="p">(</span><span class="n">tree-&gt;list</span><span class="w"> </span><span class="n">set1</span><span class="p">)</span>
<span class="w">               </span><span class="p">(</span><span class="n">tree-&gt;list</span><span class="w"> </span><span class="n">set2</span><span class="p">))))</span>
</pre></div>

#### Exercise 2.66

Implement the `lookup`
procedure for the case where the set of records is structured as a binary tree,
ordered by the numerical values of the keys.

##### Solution


We'll assume we have the same functions like `entry, left-branch, right-branch`.

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">lookup</span><span class="w"> </span><span class="n">given-key</span><span class="w"> </span><span class="n">records</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">null?</span><span class="w"> </span><span class="n">records</span><span class="p">)</span><span class="w"> </span><span class="k">false</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="nb">=</span><span class="w"> </span><span class="n">given-key</span><span class="w"> </span><span class="p">(</span><span class="n">key</span><span class="w"> </span><span class="p">(</span><span class="n">entry</span><span class="w"> </span><span class="n">records</span><span class="p">)))</span><span class="w"> </span><span class="p">(</span><span class="n">entry</span><span class="w"> </span><span class="n">record</span><span class="p">))</span>
<span class="w">        </span><span class="p">((</span><span class="nb">&lt;</span><span class="w"> </span><span class="n">given-key</span><span class="w"> </span><span class="p">(</span><span class="n">key</span><span class="w"> </span><span class="p">(</span><span class="n">entry</span><span class="w"> </span><span class="n">records</span><span class="p">)))</span>
<span class="w">         </span><span class="p">(</span><span class="n">lookup</span><span class="w"> </span><span class="n">given-key</span><span class="w"> </span><span class="p">(</span><span class="n">left-branch</span><span class="w"> </span><span class="n">records</span><span class="p">)))</span>
<span class="w">        </span><span class="p">((</span><span class="nb">&gt;</span><span class="w"> </span><span class="n">given-key</span><span class="w"> </span><span class="p">(</span><span class="n">key</span><span class="w"> </span><span class="p">(</span><span class="n">entry</span><span class="w"> </span><span class="n">records</span><span class="p">)))</span>
<span class="w">         </span><span class="p">(</span><span class="n">lookup</span><span class="w"> </span><span class="n">given-key</span><span class="w"> </span><span class="p">(</span><span class="n">key</span><span class="w"> </span><span class="p">(</span><span class="n">right-branch</span><span class="w"> </span><span class="n">records</span><span class="p">))))))</span>
</pre></div>

#### Exercise 2.67

Define an encoding tree and a
sample message:

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">sample-tree</span>
<span class="w">  </span><span class="p">(</span><span class="n">make-code-tree</span><span class="w"> </span>
<span class="w">   </span><span class="p">(</span><span class="n">make-leaf</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">A</span><span class="w"> </span><span class="mi">4</span><span class="p">)</span>
<span class="w">   </span><span class="p">(</span><span class="n">make-code-tree</span>
<span class="w">    </span><span class="p">(</span><span class="n">make-leaf</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">B</span><span class="w"> </span><span class="mi">2</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">make-code-tree</span><span class="w"> </span>
<span class="w">     </span><span class="p">(</span><span class="n">make-leaf</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">D</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span>
<span class="w">     </span><span class="p">(</span><span class="n">make-leaf</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">C</span><span class="w"> </span><span class="mi">1</span><span class="p">)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">sample-message</span><span class="w"> </span>
<span class="w">  </span><span class="o">&#39;</span><span class="p">(</span><span class="mi">0</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">0</span><span class="p">))</span>
</pre></div>

Use the `decode` procedure to decode the message, and give the result.

##### Solution

`(A D A B B C A)`

<div class="code-box" markdown="1">
<div class="code-header"><a href="code/ex2-67.rkt">code/ex2-67.rkt</a></div>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-leaf</span><span class="w"> </span><span class="n">symbol</span><span class="w"> </span><span class="n">weight</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">leaf</span><span class="w"> </span><span class="n">symbol</span><span class="w"> </span><span class="n">weight</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">leaf?</span><span class="w"> </span><span class="n">object</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">eq?</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">object</span><span class="p">)</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">leaf</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">symbol-leaf</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cadr</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">weight-leaf</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">caddr</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">left-branch</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">tree</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">right-branch</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cadr</span><span class="w"> </span><span class="n">tree</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">symbols</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">leaf?</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="p">(</span><span class="n">symbol-leaf</span><span class="w"> </span><span class="n">tree</span><span class="p">))</span>
<span class="w">      </span><span class="p">(</span><span class="nb">caddr</span><span class="w"> </span><span class="n">tree</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">weight</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">leaf?</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="n">weight-leaf</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="nb">cadddr</span><span class="w"> </span><span class="n">tree</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-code-tree</span><span class="w"> </span><span class="n">left</span><span class="w"> </span><span class="n">right</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="n">left</span>
<span class="w">        </span><span class="n">right</span>
<span class="w">        </span><span class="p">(</span><span class="nb">append</span><span class="w"> </span><span class="p">(</span><span class="nb">symbols</span><span class="w"> </span><span class="n">left</span><span class="p">)</span>
<span class="w">                </span><span class="p">(</span><span class="nb">symbols</span><span class="w"> </span><span class="n">right</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="p">(</span><span class="n">weight</span><span class="w"> </span><span class="n">left</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">weight</span><span class="w"> </span><span class="n">right</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">decode</span><span class="w"> </span><span class="n">bits</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">decode-1</span><span class="w"> </span><span class="n">bits</span><span class="w"> </span><span class="n">current-branch</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="n">bits</span><span class="p">)</span>
<span class="w">        </span><span class="o">&#39;</span><span class="p">()</span>
<span class="w">        </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">next-branch</span>
<span class="w">               </span><span class="p">(</span><span class="n">choose-branch</span>
<span class="w">                </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">bits</span><span class="p">)</span>
<span class="w">                </span><span class="n">current-branch</span><span class="p">)))</span>
<span class="w">          </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">leaf?</span><span class="w"> </span><span class="n">next-branch</span><span class="p">)</span>
<span class="w">              </span><span class="p">(</span><span class="nb">cons</span>
<span class="w">               </span><span class="p">(</span><span class="n">symbol-leaf</span><span class="w"> </span><span class="n">next-branch</span><span class="p">)</span>
<span class="w">               </span><span class="p">(</span><span class="n">decode-1</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">bits</span><span class="p">)</span><span class="w"> </span><span class="n">tree</span><span class="p">))</span>
<span class="w">              </span><span class="p">(</span><span class="n">decode-1</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">bits</span><span class="p">)</span>
<span class="w">                        </span><span class="n">next-branch</span><span class="p">)))))</span>
<span class="w">  </span><span class="p">(</span><span class="n">decode-1</span><span class="w"> </span><span class="n">bits</span><span class="w"> </span><span class="n">tree</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">choose-branch</span><span class="w"> </span><span class="n">bit</span><span class="w"> </span><span class="n">branch</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">=</span><span class="w"> </span><span class="n">bit</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">left-branch</span><span class="w"> </span><span class="n">branch</span><span class="p">))</span>
<span class="w">        </span><span class="p">((</span><span class="nb">=</span><span class="w"> </span><span class="n">bit</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">right-branch</span><span class="w"> </span><span class="n">branch</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;bad bit:</span>
<span class="s2">               CHOOSE-BRANCH&quot;</span><span class="w"> </span><span class="n">bit</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">adjoin-set</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="nb">set</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">null?</span><span class="w"> </span><span class="nb">set</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="w">        </span><span class="p">((</span><span class="nb">&lt;</span><span class="w"> </span><span class="p">(</span><span class="n">weight</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">weight</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="nb">set</span><span class="p">)))</span><span class="w"> </span>
<span class="w">         </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="nb">set</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span>
<span class="w">         </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="nb">set</span><span class="p">)</span>
<span class="w">               </span><span class="p">(</span><span class="n">adjoin-set</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="nb">set</span><span class="p">))))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-leaf-set</span><span class="w"> </span><span class="n">pairs</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="n">pairs</span><span class="p">)</span>
<span class="w">      </span><span class="o">&#39;</span><span class="p">()</span>
<span class="w">      </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">pair</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">pairs</span><span class="p">)))</span>
<span class="w">        </span><span class="p">(</span><span class="n">adjoin-set</span><span class="w"> </span>
<span class="w">         </span><span class="p">(</span><span class="n">make-leaf</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">pair</span><span class="p">)</span><span class="w">    </span><span class="c1">; symbol</span>
<span class="w">                    </span><span class="p">(</span><span class="nb">cadr</span><span class="w"> </span><span class="n">pair</span><span class="p">))</span><span class="w">  </span><span class="c1">; frequency</span>
<span class="w">         </span><span class="p">(</span><span class="n">make-leaf-set</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">pairs</span><span class="p">))))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">sample-tree</span>
<span class="w">  </span><span class="p">(</span><span class="n">make-code-tree</span><span class="w"> </span>
<span class="w">   </span><span class="p">(</span><span class="n">make-leaf</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">A</span><span class="w"> </span><span class="mi">4</span><span class="p">)</span>
<span class="w">   </span><span class="p">(</span><span class="n">make-code-tree</span>
<span class="w">    </span><span class="p">(</span><span class="n">make-leaf</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">B</span><span class="w"> </span><span class="mi">2</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">make-code-tree</span><span class="w"> </span>
<span class="w">     </span><span class="p">(</span><span class="n">make-leaf</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">D</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span>
<span class="w">     </span><span class="p">(</span><span class="n">make-leaf</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">C</span><span class="w"> </span><span class="mi">1</span><span class="p">)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">sample-message</span><span class="w"> </span>
<span class="w">  </span><span class="o">&#39;</span><span class="p">(</span><span class="mi">0</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">0</span><span class="p">))</span>

<span class="p">(</span><span class="n">decode</span><span class="w"> </span><span class="n">sample-message</span><span class="w"> </span><span class="n">sample-tree</span><span class="p">)</span>
</pre></div>
<div class="code-output">
<span>Output:</span>
<pre>(A D A B B C A)
</pre>
</div>
</div>




#### Exercise 2.68

The `encode` procedure takes
as arguments a message and a tree and produces the list of bits that gives the
encoded message.

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">encode</span><span class="w"> </span><span class="n">message</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="n">message</span><span class="p">)</span>
<span class="w">      </span><span class="o">&#39;</span><span class="p">()</span>
<span class="w">      </span><span class="p">(</span><span class="nb">append</span><span class="w"> </span>
<span class="w">       </span><span class="p">(</span><span class="n">encode-symbol</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">message</span><span class="p">)</span><span class="w"> </span>
<span class="w">                      </span><span class="n">tree</span><span class="p">)</span>
<span class="w">       </span><span class="p">(</span><span class="n">encode</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">message</span><span class="p">)</span><span class="w"> </span><span class="n">tree</span><span class="p">))))</span>
</pre></div>

`Encode-symbol` is a procedure, which you must write, that returns the
list of bits that encodes a given symbol according to a given tree.  You should
design `encode-symbol` so that it signals an error if the symbol is not in
the tree at all.  Test your procedure by encoding the result you obtained in
Exercise 2.67 with the sample tree and seeing whether it is the same as
the original sample message.

##### Solution

Encoding the decoded message returns the correct thing.

<div class="code-box" markdown="1">
<div class="code-header"><a href="code/ex2-68.rkt">code/ex2-68.rkt</a></div>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-leaf</span><span class="w"> </span><span class="n">symbol</span><span class="w"> </span><span class="n">weight</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">leaf</span><span class="w"> </span><span class="n">symbol</span><span class="w"> </span><span class="n">weight</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">leaf?</span><span class="w"> </span><span class="n">object</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">eq?</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">object</span><span class="p">)</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">leaf</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">symbol-leaf</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cadr</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">weight-leaf</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">caddr</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">left-branch</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">tree</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">right-branch</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cadr</span><span class="w"> </span><span class="n">tree</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">symbols</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">leaf?</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="p">(</span><span class="n">symbol-leaf</span><span class="w"> </span><span class="n">tree</span><span class="p">))</span>
<span class="w">      </span><span class="p">(</span><span class="nb">caddr</span><span class="w"> </span><span class="n">tree</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">weight</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">leaf?</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="n">weight-leaf</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="nb">cadddr</span><span class="w"> </span><span class="n">tree</span><span class="p">)))</span>


<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">element-of-list?</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">lst</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">null?</span><span class="w"> </span><span class="n">lst</span><span class="p">)</span><span class="w"> </span><span class="k">false</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="nb">equal?</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">lst</span><span class="p">))</span><span class="w"> </span><span class="nb">true</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="n">element-of-list?</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">lst</span><span class="p">)))))</span>


<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-code-tree</span><span class="w"> </span><span class="n">left</span><span class="w"> </span><span class="n">right</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="n">left</span>
<span class="w">        </span><span class="n">right</span>
<span class="w">        </span><span class="p">(</span><span class="nb">append</span><span class="w"> </span><span class="p">(</span><span class="nb">symbols</span><span class="w"> </span><span class="n">left</span><span class="p">)</span>
<span class="w">                </span><span class="p">(</span><span class="nb">symbols</span><span class="w"> </span><span class="n">right</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="p">(</span><span class="n">weight</span><span class="w"> </span><span class="n">left</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">weight</span><span class="w"> </span><span class="n">right</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">decode</span><span class="w"> </span><span class="n">bits</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">decode-1</span><span class="w"> </span><span class="n">bits</span><span class="w"> </span><span class="n">current-branch</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="n">bits</span><span class="p">)</span>
<span class="w">        </span><span class="o">&#39;</span><span class="p">()</span>
<span class="w">        </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">next-branch</span>
<span class="w">               </span><span class="p">(</span><span class="n">choose-branch</span>
<span class="w">                </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">bits</span><span class="p">)</span>
<span class="w">                </span><span class="n">current-branch</span><span class="p">)))</span>
<span class="w">          </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">leaf?</span><span class="w"> </span><span class="n">next-branch</span><span class="p">)</span>
<span class="w">              </span><span class="p">(</span><span class="nb">cons</span>
<span class="w">               </span><span class="p">(</span><span class="n">symbol-leaf</span><span class="w"> </span><span class="n">next-branch</span><span class="p">)</span>
<span class="w">               </span><span class="p">(</span><span class="n">decode-1</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">bits</span><span class="p">)</span><span class="w"> </span><span class="n">tree</span><span class="p">))</span>
<span class="w">              </span><span class="p">(</span><span class="n">decode-1</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">bits</span><span class="p">)</span>
<span class="w">                        </span><span class="n">next-branch</span><span class="p">)))))</span>
<span class="w">  </span><span class="p">(</span><span class="n">decode-1</span><span class="w"> </span><span class="n">bits</span><span class="w"> </span><span class="n">tree</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">choose-branch</span><span class="w"> </span><span class="n">bit</span><span class="w"> </span><span class="n">branch</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">=</span><span class="w"> </span><span class="n">bit</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">left-branch</span><span class="w"> </span><span class="n">branch</span><span class="p">))</span>
<span class="w">        </span><span class="p">((</span><span class="nb">=</span><span class="w"> </span><span class="n">bit</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">right-branch</span><span class="w"> </span><span class="n">branch</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;bad bit:</span>
<span class="s2">               CHOOSE-BRANCH&quot;</span><span class="w"> </span><span class="n">bit</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">adjoin-set</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="nb">set</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">null?</span><span class="w"> </span><span class="nb">set</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="w">        </span><span class="p">((</span><span class="nb">&lt;</span><span class="w"> </span><span class="p">(</span><span class="n">weight</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">weight</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="nb">set</span><span class="p">)))</span><span class="w"> </span>
<span class="w">         </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="nb">set</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span>
<span class="w">         </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="nb">set</span><span class="p">)</span>
<span class="w">               </span><span class="p">(</span><span class="n">adjoin-set</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="nb">set</span><span class="p">))))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-leaf-set</span><span class="w"> </span><span class="n">pairs</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="n">pairs</span><span class="p">)</span>
<span class="w">      </span><span class="o">&#39;</span><span class="p">()</span>
<span class="w">      </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">pair</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">pairs</span><span class="p">)))</span>
<span class="w">        </span><span class="p">(</span><span class="n">adjoin-set</span><span class="w"> </span>
<span class="w">         </span><span class="p">(</span><span class="n">make-leaf</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">pair</span><span class="p">)</span><span class="w">    </span><span class="c1">; symbol</span>
<span class="w">                    </span><span class="p">(</span><span class="nb">cadr</span><span class="w"> </span><span class="n">pair</span><span class="p">))</span><span class="w">  </span><span class="c1">; frequency</span>
<span class="w">         </span><span class="p">(</span><span class="n">make-leaf-set</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">pairs</span><span class="p">))))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">sample-tree</span>
<span class="w">  </span><span class="p">(</span><span class="n">make-code-tree</span><span class="w"> </span>
<span class="w">   </span><span class="p">(</span><span class="n">make-leaf</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">A</span><span class="w"> </span><span class="mi">4</span><span class="p">)</span>
<span class="w">   </span><span class="p">(</span><span class="n">make-code-tree</span>
<span class="w">    </span><span class="p">(</span><span class="n">make-leaf</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">B</span><span class="w"> </span><span class="mi">2</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">make-code-tree</span><span class="w"> </span>
<span class="w">     </span><span class="p">(</span><span class="n">make-leaf</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">D</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span>
<span class="w">     </span><span class="p">(</span><span class="n">make-leaf</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">C</span><span class="w"> </span><span class="mi">1</span><span class="p">)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">sample-message</span><span class="w"> </span>
<span class="w">  </span><span class="o">&#39;</span><span class="p">(</span><span class="mi">0</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">0</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">encode</span><span class="w"> </span><span class="n">message</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="n">message</span><span class="p">)</span>
<span class="w">      </span><span class="o">&#39;</span><span class="p">()</span>
<span class="w">      </span><span class="p">(</span><span class="nb">append</span><span class="w"> </span>
<span class="w">       </span><span class="p">(</span><span class="n">encode-symbol</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">message</span><span class="p">)</span><span class="w"> </span>
<span class="w">                      </span><span class="n">tree</span><span class="p">)</span>
<span class="w">       </span><span class="p">(</span><span class="n">encode</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">message</span><span class="p">)</span><span class="w"> </span><span class="n">tree</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">encode-symbol</span><span class="w"> </span><span class="n">symbol</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span>
<span class="w">    </span><span class="p">((</span><span class="n">leaf?</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span><span class="w"> </span>
<span class="w">                </span><span class="p">(</span><span class="k">if</span><span class="w"> </span>
<span class="w">                  </span><span class="p">(</span><span class="nb">equal?</span><span class="w"> </span><span class="p">(</span><span class="n">symbol-leaf</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span><span class="w"> </span><span class="n">symbol</span><span class="p">)</span><span class="w"> </span><span class="o">&#39;</span><span class="p">()</span><span class="w"> </span>
<span class="w">                  </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;symbol not in tree &quot;</span><span class="w"> </span><span class="n">symbol</span><span class="p">)))</span>
<span class="w">    </span><span class="p">((</span><span class="n">element-of-list?</span><span class="w"> </span><span class="n">symbol</span><span class="w"> </span><span class="p">(</span><span class="nb">symbols</span><span class="w"> </span><span class="p">(</span><span class="n">left-branch</span><span class="w"> </span><span class="n">tree</span><span class="p">)))</span><span class="w"> </span>
<span class="w">                    </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="o">&#39;</span><span class="mi">0</span><span class="w"> </span><span class="p">(</span><span class="n">encode-symbol</span><span class="w"> </span><span class="n">symbol</span><span class="w"> </span><span class="p">(</span><span class="n">left-branch</span><span class="w"> </span><span class="n">tree</span><span class="p">))))</span>
<span class="w">    </span><span class="p">((</span><span class="n">element-of-list?</span><span class="w"> </span><span class="n">symbol</span><span class="w"> </span><span class="p">(</span><span class="nb">symbols</span><span class="w"> </span><span class="p">(</span><span class="n">right-branch</span><span class="w"> </span><span class="n">tree</span><span class="p">)))</span><span class="w"> </span>
<span class="w">                    </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="o">&#39;</span><span class="mi">1</span><span class="w"> </span><span class="p">(</span><span class="n">encode-symbol</span><span class="w"> </span><span class="n">symbol</span><span class="w"> </span><span class="p">(</span><span class="n">right-branch</span><span class="w"> </span><span class="n">tree</span><span class="p">))))</span>
<span class="w">    </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;symbol not in tree&quot;</span><span class="w"> </span><span class="n">symbol</span><span class="p">))))</span>

<span class="n">sample-message</span>

<span class="p">(</span><span class="n">decode</span><span class="w"> </span><span class="n">sample-message</span><span class="w"> </span><span class="n">sample-tree</span><span class="p">)</span>

<span class="p">(</span><span class="n">encode</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">A</span><span class="w"> </span><span class="ss">D</span><span class="w"> </span><span class="ss">A</span><span class="w"> </span><span class="ss">B</span><span class="w"> </span><span class="ss">B</span><span class="w"> </span><span class="ss">C</span><span class="w"> </span><span class="ss">A</span><span class="p">)</span><span class="w"> </span><span class="n">sample-tree</span><span class="p">)</span>
</pre></div>
<div class="code-output">
<span>Output:</span>
<pre>(0 1 1 0 0 1 0 1 0 1 1 1 0)
(A D A B B C A)
(0 1 1 0 0 1 0 1 0 1 1 1 0)
</pre>
</div>
</div>


#### Exercise 2.69

The following procedure takes as
its argument a list of symbol-frequency pairs (where no symbol appears in more
than one pair) and generates a Huffman encoding tree according to the Huffman
algorithm.

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">generate-huffman-tree</span><span class="w"> </span><span class="n">pairs</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">successive-merge</span><span class="w"> </span>
<span class="w">   </span><span class="p">(</span><span class="n">make-leaf-set</span><span class="w"> </span><span class="n">pairs</span><span class="p">)))</span>
</pre></div>

`Make-leaf-set` is the procedure given above that transforms the list of
pairs into an ordered set of leaves.  `Successive-merge` is the procedure
you must write, using `make-code-tree` to successively merge the
smallest-weight elements of the set until there is only one element left, which
is the desired Huffman tree.  (This procedure is slightly tricky, but not
really complicated.  If you find yourself designing a complex procedure, then
you are almost certainly doing something wrong.  You can take significant
advantage of the fact that we are using an ordered set representation.)

##### Solution

<div class="code-box" markdown="1">
<div class="code-header"><a href="code/ex2-69.rkt">code/ex2-69.rkt</a></div>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-leaf</span><span class="w"> </span><span class="n">symbol</span><span class="w"> </span><span class="n">weight</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">leaf</span><span class="w"> </span><span class="n">symbol</span><span class="w"> </span><span class="n">weight</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">leaf?</span><span class="w"> </span><span class="n">object</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">eq?</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">object</span><span class="p">)</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">leaf</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">symbol-leaf</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cadr</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">weight-leaf</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">caddr</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">left-branch</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">tree</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">right-branch</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cadr</span><span class="w"> </span><span class="n">tree</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">symbols</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">leaf?</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="p">(</span><span class="n">symbol-leaf</span><span class="w"> </span><span class="n">tree</span><span class="p">))</span>
<span class="w">      </span><span class="p">(</span><span class="nb">caddr</span><span class="w"> </span><span class="n">tree</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">weight</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">leaf?</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="n">weight-leaf</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="nb">cadddr</span><span class="w"> </span><span class="n">tree</span><span class="p">)))</span>


<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">element-of-list?</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">lst</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">null?</span><span class="w"> </span><span class="n">lst</span><span class="p">)</span><span class="w"> </span><span class="k">false</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="nb">equal?</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">lst</span><span class="p">))</span><span class="w"> </span><span class="nb">true</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="n">element-of-list?</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">lst</span><span class="p">)))))</span>


<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-code-tree</span><span class="w"> </span><span class="n">left</span><span class="w"> </span><span class="n">right</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="n">left</span>
<span class="w">        </span><span class="n">right</span>
<span class="w">        </span><span class="p">(</span><span class="nb">append</span><span class="w"> </span><span class="p">(</span><span class="nb">symbols</span><span class="w"> </span><span class="n">left</span><span class="p">)</span>
<span class="w">                </span><span class="p">(</span><span class="nb">symbols</span><span class="w"> </span><span class="n">right</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="p">(</span><span class="n">weight</span><span class="w"> </span><span class="n">left</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">weight</span><span class="w"> </span><span class="n">right</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">decode</span><span class="w"> </span><span class="n">bits</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">decode-1</span><span class="w"> </span><span class="n">bits</span><span class="w"> </span><span class="n">current-branch</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="n">bits</span><span class="p">)</span>
<span class="w">        </span><span class="o">&#39;</span><span class="p">()</span>
<span class="w">        </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">next-branch</span>
<span class="w">               </span><span class="p">(</span><span class="n">choose-branch</span>
<span class="w">                </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">bits</span><span class="p">)</span>
<span class="w">                </span><span class="n">current-branch</span><span class="p">)))</span>
<span class="w">          </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">leaf?</span><span class="w"> </span><span class="n">next-branch</span><span class="p">)</span>
<span class="w">              </span><span class="p">(</span><span class="nb">cons</span>
<span class="w">               </span><span class="p">(</span><span class="n">symbol-leaf</span><span class="w"> </span><span class="n">next-branch</span><span class="p">)</span>
<span class="w">               </span><span class="p">(</span><span class="n">decode-1</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">bits</span><span class="p">)</span><span class="w"> </span><span class="n">tree</span><span class="p">))</span>
<span class="w">              </span><span class="p">(</span><span class="n">decode-1</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">bits</span><span class="p">)</span>
<span class="w">                        </span><span class="n">next-branch</span><span class="p">)))))</span>
<span class="w">  </span><span class="p">(</span><span class="n">decode-1</span><span class="w"> </span><span class="n">bits</span><span class="w"> </span><span class="n">tree</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">choose-branch</span><span class="w"> </span><span class="n">bit</span><span class="w"> </span><span class="n">branch</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">=</span><span class="w"> </span><span class="n">bit</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">left-branch</span><span class="w"> </span><span class="n">branch</span><span class="p">))</span>
<span class="w">        </span><span class="p">((</span><span class="nb">=</span><span class="w"> </span><span class="n">bit</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">right-branch</span><span class="w"> </span><span class="n">branch</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;bad bit:</span>
<span class="s2">               CHOOSE-BRANCH&quot;</span><span class="w"> </span><span class="n">bit</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">adjoin-set</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="nb">set</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">null?</span><span class="w"> </span><span class="nb">set</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="w">        </span><span class="p">((</span><span class="nb">&lt;</span><span class="w"> </span><span class="p">(</span><span class="n">weight</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">weight</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="nb">set</span><span class="p">)))</span><span class="w"> </span>
<span class="w">         </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="nb">set</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span>
<span class="w">         </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="nb">set</span><span class="p">)</span>
<span class="w">               </span><span class="p">(</span><span class="n">adjoin-set</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="nb">set</span><span class="p">))))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-leaf-set</span><span class="w"> </span><span class="n">pairs</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="n">pairs</span><span class="p">)</span>
<span class="w">      </span><span class="o">&#39;</span><span class="p">()</span>
<span class="w">      </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">pair</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">pairs</span><span class="p">)))</span>
<span class="w">        </span><span class="p">(</span><span class="n">adjoin-set</span><span class="w"> </span>
<span class="w">         </span><span class="p">(</span><span class="n">make-leaf</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">pair</span><span class="p">)</span><span class="w">    </span><span class="c1">; symbol</span>
<span class="w">                    </span><span class="p">(</span><span class="nb">cadr</span><span class="w"> </span><span class="n">pair</span><span class="p">))</span><span class="w">  </span><span class="c1">; frequency</span>
<span class="w">         </span><span class="p">(</span><span class="n">make-leaf-set</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">pairs</span><span class="p">))))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">sample-tree</span>
<span class="w">  </span><span class="p">(</span><span class="n">make-code-tree</span><span class="w"> </span>
<span class="w">   </span><span class="p">(</span><span class="n">make-leaf</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">A</span><span class="w"> </span><span class="mi">4</span><span class="p">)</span>
<span class="w">   </span><span class="p">(</span><span class="n">make-code-tree</span>
<span class="w">    </span><span class="p">(</span><span class="n">make-leaf</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">B</span><span class="w"> </span><span class="mi">2</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">make-code-tree</span><span class="w"> </span>
<span class="w">     </span><span class="p">(</span><span class="n">make-leaf</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">D</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span>
<span class="w">     </span><span class="p">(</span><span class="n">make-leaf</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">C</span><span class="w"> </span><span class="mi">1</span><span class="p">)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">sample-message</span><span class="w"> </span>
<span class="w">  </span><span class="o">&#39;</span><span class="p">(</span><span class="mi">0</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">0</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">encode</span><span class="w"> </span><span class="n">message</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="n">message</span><span class="p">)</span>
<span class="w">      </span><span class="o">&#39;</span><span class="p">()</span>
<span class="w">      </span><span class="p">(</span><span class="nb">append</span><span class="w"> </span>
<span class="w">       </span><span class="p">(</span><span class="n">encode-symbol</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">message</span><span class="p">)</span><span class="w"> </span>
<span class="w">                      </span><span class="n">tree</span><span class="p">)</span>
<span class="w">       </span><span class="p">(</span><span class="n">encode</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">message</span><span class="p">)</span><span class="w"> </span><span class="n">tree</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">encode-symbol</span><span class="w"> </span><span class="n">symbol</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span>
<span class="w">    </span><span class="p">((</span><span class="n">leaf?</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span><span class="w"> </span>
<span class="w">                </span><span class="p">(</span><span class="k">if</span><span class="w"> </span>
<span class="w">                  </span><span class="p">(</span><span class="nb">equal?</span><span class="w"> </span><span class="p">(</span><span class="n">symbol-leaf</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span><span class="w"> </span><span class="n">symbol</span><span class="p">)</span><span class="w"> </span><span class="o">&#39;</span><span class="p">()</span><span class="w"> </span>
<span class="w">                  </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;symbol not in tree &quot;</span><span class="w"> </span><span class="n">symbol</span><span class="p">)))</span>
<span class="w">    </span><span class="p">((</span><span class="n">element-of-list?</span><span class="w"> </span><span class="n">symbol</span><span class="w"> </span><span class="p">(</span><span class="nb">symbols</span><span class="w"> </span><span class="p">(</span><span class="n">left-branch</span><span class="w"> </span><span class="n">tree</span><span class="p">)))</span><span class="w"> </span>
<span class="w">                    </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="o">&#39;</span><span class="mi">0</span><span class="w"> </span><span class="p">(</span><span class="n">encode-symbol</span><span class="w"> </span><span class="n">symbol</span><span class="w"> </span><span class="p">(</span><span class="n">left-branch</span><span class="w"> </span><span class="n">tree</span><span class="p">))))</span>
<span class="w">    </span><span class="p">((</span><span class="n">element-of-list?</span><span class="w"> </span><span class="n">symbol</span><span class="w"> </span><span class="p">(</span><span class="nb">symbols</span><span class="w"> </span><span class="p">(</span><span class="n">right-branch</span><span class="w"> </span><span class="n">tree</span><span class="p">)))</span><span class="w"> </span>
<span class="w">                    </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="o">&#39;</span><span class="mi">1</span><span class="w"> </span><span class="p">(</span><span class="n">encode-symbol</span><span class="w"> </span><span class="n">symbol</span><span class="w"> </span><span class="p">(</span><span class="n">right-branch</span><span class="w"> </span><span class="n">tree</span><span class="p">))))</span>
<span class="w">    </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;symbol not in tree&quot;</span><span class="w"> </span><span class="n">symbol</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">generate-huffman-tree</span><span class="w"> </span><span class="n">pairs</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">successive-merge</span>
<span class="w">   </span><span class="p">(</span><span class="n">make-leaf-set</span><span class="w"> </span><span class="n">pairs</span><span class="p">)))</span>

<span class="w">    </span><span class="c1">;; merge the symbols of the first two elements of the list</span>
<span class="w">    </span><span class="c1">;; add the weights</span>
<span class="w">    </span><span class="c1">;; make the tree</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">successive-merge</span><span class="w"> </span><span class="n">tree-list</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="p">(</span><span class="nb">length</span><span class="w"> </span><span class="n">tree-list</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">tree-list</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">a</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">tree-list</span><span class="p">))</span><span class="w"> </span>
<span class="w">          </span><span class="p">(</span><span class="n">b</span><span class="w"> </span><span class="p">(</span><span class="nb">cadr</span><span class="w"> </span><span class="n">tree-list</span><span class="p">))</span><span class="w"> </span>
<span class="w">          </span><span class="p">(</span><span class="nb">rest</span><span class="w"> </span><span class="p">(</span><span class="nb">cddr</span><span class="w"> </span><span class="n">tree-list</span><span class="p">)))</span>
<span class="w">      </span><span class="p">(</span><span class="n">successive-merge</span><span class="w"> </span><span class="p">(</span><span class="n">adjoin-set</span><span class="w"> </span><span class="p">(</span><span class="n">make-code-tree</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="p">)</span><span class="w"> </span><span class="nb">rest</span><span class="p">)))))</span>

<span class="n">sample-message</span>

<span class="p">(</span><span class="n">decode</span><span class="w"> </span><span class="n">sample-message</span><span class="w"> </span><span class="n">sample-tree</span><span class="p">)</span>

<span class="p">(</span><span class="n">encode</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">A</span><span class="w"> </span><span class="ss">D</span><span class="w"> </span><span class="ss">A</span><span class="w"> </span><span class="ss">B</span><span class="w"> </span><span class="ss">B</span><span class="w"> </span><span class="ss">C</span><span class="w"> </span><span class="ss">A</span><span class="p">)</span><span class="w"> </span><span class="n">sample-tree</span><span class="p">)</span>


<span class="p">(</span><span class="n">generate-huffman-tree</span><span class="w"> </span><span class="o">&#39;</span><span class="p">((</span><span class="ss">a</span><span class="w"> </span><span class="mi">8</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">b</span><span class="w"> </span><span class="mi">3</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">c</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">d</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">e</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">f</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">g</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">h</span><span class="w"> </span><span class="mi">1</span><span class="p">)))</span>
</pre></div>
<div class="code-output">
<span>Output:</span>
<pre>(0 1 1 0 0 1 0 1 0 1 1 1 0)
(A D A B B C A)
(0 1 1 0 0 1 0 1 0 1 1 1 0)
((leaf a 8) ((((leaf h 1) (leaf g 1) (h g) 2) ((leaf f 1) (leaf e 1) (f e) 2) (h g f e) 4) (((leaf d 1) (leaf c 1) (d c) 2) (leaf b 3) (d c b) 5) (h g f e d c b) 9) (a h g f e d c b) 17)
</pre>
</div>
</div>


After staring long enough, this tree is not quite the same as the one given earlier in the chapter (for example `b` is encoded as `111` instead of `100`), but that's fine.
<div style="text-align: center; margin: 20px 0;">
  <img src="media/ex2-69-light.svg" style="width: 70%; max-width: 800px;" alt="It's the answer to the question. David gets an A+">
</div>

#### Exercise 2.70
The following eight-symbol
alphabet with associated relative frequencies was designed to efficiently
encode the lyrics of 1950s rock songs.  (Note that the ``symbols'' of an
``alphabet'' need not be individual letters.)

<table>
  <tr><td>A</td><td>2</td><td>NA</td><td>16</td></tr>
  <tr><td>BOOM</td><td>1</td><td>SHA</td><td>3</td></tr>
  <tr><td>GET</td><td>2</td><td>YIP</td><td>9</td></tr>
  <tr><td>JOB</td><td>2</td><td>WAH</td><td>1</td></tr>
</table>

Use `generate-huffman-tree` (Exercise 2.69) to generate a
corresponding Huffman tree, and use `encode` (Exercise 2.68) to
encode the following message:

<div class="codehilite"><pre><span></span>Get a job
Sha na na na na na na na na

Get a job
Sha na na na na na na na na

Wah yip yip yip yip 
yip yip yip yip yip
Sha boom
</pre></div>

How many bits are required for the encoding?  What is the smallest number of
bits that would be needed to encode this song if we used a fixed-length code
for the eight-symbol alphabet?

##### Solution

<div class="code-box" markdown="1">
<div class="code-header"><a href="code/ex2-70.rkt">code/ex2-70.rkt</a></div>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-leaf</span><span class="w"> </span><span class="n">symbol</span><span class="w"> </span><span class="n">weight</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">leaf</span><span class="w"> </span><span class="n">symbol</span><span class="w"> </span><span class="n">weight</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">leaf?</span><span class="w"> </span><span class="n">object</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">eq?</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">object</span><span class="p">)</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">leaf</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">symbol-leaf</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cadr</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">weight-leaf</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">caddr</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">left-branch</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">tree</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">right-branch</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cadr</span><span class="w"> </span><span class="n">tree</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">symbols</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">leaf?</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="p">(</span><span class="n">symbol-leaf</span><span class="w"> </span><span class="n">tree</span><span class="p">))</span>
<span class="w">      </span><span class="p">(</span><span class="nb">caddr</span><span class="w"> </span><span class="n">tree</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">weight</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">leaf?</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="n">weight-leaf</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="nb">cadddr</span><span class="w"> </span><span class="n">tree</span><span class="p">)))</span>


<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">element-of-list?</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">lst</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">null?</span><span class="w"> </span><span class="n">lst</span><span class="p">)</span><span class="w"> </span><span class="k">false</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="nb">equal?</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">lst</span><span class="p">))</span><span class="w"> </span><span class="nb">true</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="n">element-of-list?</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">lst</span><span class="p">)))))</span>


<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-code-tree</span><span class="w"> </span><span class="n">left</span><span class="w"> </span><span class="n">right</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="n">left</span>
<span class="w">        </span><span class="n">right</span>
<span class="w">        </span><span class="p">(</span><span class="nb">append</span><span class="w"> </span><span class="p">(</span><span class="nb">symbols</span><span class="w"> </span><span class="n">left</span><span class="p">)</span>
<span class="w">                </span><span class="p">(</span><span class="nb">symbols</span><span class="w"> </span><span class="n">right</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="p">(</span><span class="n">weight</span><span class="w"> </span><span class="n">left</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">weight</span><span class="w"> </span><span class="n">right</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">decode</span><span class="w"> </span><span class="n">bits</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">decode-1</span><span class="w"> </span><span class="n">bits</span><span class="w"> </span><span class="n">current-branch</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="n">bits</span><span class="p">)</span>
<span class="w">        </span><span class="o">&#39;</span><span class="p">()</span>
<span class="w">        </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">next-branch</span>
<span class="w">               </span><span class="p">(</span><span class="n">choose-branch</span>
<span class="w">                </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">bits</span><span class="p">)</span>
<span class="w">                </span><span class="n">current-branch</span><span class="p">)))</span>
<span class="w">          </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">leaf?</span><span class="w"> </span><span class="n">next-branch</span><span class="p">)</span>
<span class="w">              </span><span class="p">(</span><span class="nb">cons</span>
<span class="w">               </span><span class="p">(</span><span class="n">symbol-leaf</span><span class="w"> </span><span class="n">next-branch</span><span class="p">)</span>
<span class="w">               </span><span class="p">(</span><span class="n">decode-1</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">bits</span><span class="p">)</span><span class="w"> </span><span class="n">tree</span><span class="p">))</span>
<span class="w">              </span><span class="p">(</span><span class="n">decode-1</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">bits</span><span class="p">)</span>
<span class="w">                        </span><span class="n">next-branch</span><span class="p">)))))</span>
<span class="w">  </span><span class="p">(</span><span class="n">decode-1</span><span class="w"> </span><span class="n">bits</span><span class="w"> </span><span class="n">tree</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">choose-branch</span><span class="w"> </span><span class="n">bit</span><span class="w"> </span><span class="n">branch</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">=</span><span class="w"> </span><span class="n">bit</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">left-branch</span><span class="w"> </span><span class="n">branch</span><span class="p">))</span>
<span class="w">        </span><span class="p">((</span><span class="nb">=</span><span class="w"> </span><span class="n">bit</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">right-branch</span><span class="w"> </span><span class="n">branch</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;bad bit:</span>
<span class="s2">               CHOOSE-BRANCH&quot;</span><span class="w"> </span><span class="n">bit</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">adjoin-set</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="nb">set</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">null?</span><span class="w"> </span><span class="nb">set</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="w">        </span><span class="p">((</span><span class="nb">&lt;</span><span class="w"> </span><span class="p">(</span><span class="n">weight</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">weight</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="nb">set</span><span class="p">)))</span><span class="w"> </span>
<span class="w">         </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="nb">set</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span>
<span class="w">         </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="nb">set</span><span class="p">)</span>
<span class="w">               </span><span class="p">(</span><span class="n">adjoin-set</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="nb">set</span><span class="p">))))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-leaf-set</span><span class="w"> </span><span class="n">pairs</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="n">pairs</span><span class="p">)</span>
<span class="w">      </span><span class="o">&#39;</span><span class="p">()</span>
<span class="w">      </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">pair</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">pairs</span><span class="p">)))</span>
<span class="w">        </span><span class="p">(</span><span class="n">adjoin-set</span><span class="w"> </span>
<span class="w">         </span><span class="p">(</span><span class="n">make-leaf</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">pair</span><span class="p">)</span><span class="w">    </span><span class="c1">; symbol</span>
<span class="w">                    </span><span class="p">(</span><span class="nb">cadr</span><span class="w"> </span><span class="n">pair</span><span class="p">))</span><span class="w">  </span><span class="c1">; frequency</span>
<span class="w">         </span><span class="p">(</span><span class="n">make-leaf-set</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">pairs</span><span class="p">))))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">sample-tree</span>
<span class="w">  </span><span class="p">(</span><span class="n">make-code-tree</span><span class="w"> </span>
<span class="w">   </span><span class="p">(</span><span class="n">make-leaf</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">A</span><span class="w"> </span><span class="mi">4</span><span class="p">)</span>
<span class="w">   </span><span class="p">(</span><span class="n">make-code-tree</span>
<span class="w">    </span><span class="p">(</span><span class="n">make-leaf</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">B</span><span class="w"> </span><span class="mi">2</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">make-code-tree</span><span class="w"> </span>
<span class="w">     </span><span class="p">(</span><span class="n">make-leaf</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">D</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span>
<span class="w">     </span><span class="p">(</span><span class="n">make-leaf</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">C</span><span class="w"> </span><span class="mi">1</span><span class="p">)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">sample-message</span><span class="w"> </span>
<span class="w">  </span><span class="o">&#39;</span><span class="p">(</span><span class="mi">0</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">0</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">encode</span><span class="w"> </span><span class="n">message</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="n">message</span><span class="p">)</span>
<span class="w">      </span><span class="o">&#39;</span><span class="p">()</span>
<span class="w">      </span><span class="p">(</span><span class="nb">append</span><span class="w"> </span>
<span class="w">       </span><span class="p">(</span><span class="n">encode-symbol</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">message</span><span class="p">)</span><span class="w"> </span>
<span class="w">                      </span><span class="n">tree</span><span class="p">)</span>
<span class="w">       </span><span class="p">(</span><span class="n">encode</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">message</span><span class="p">)</span><span class="w"> </span><span class="n">tree</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">encode-symbol</span><span class="w"> </span><span class="n">symbol</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span>
<span class="w">    </span><span class="p">((</span><span class="n">leaf?</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span><span class="w"> </span>
<span class="w">                </span><span class="p">(</span><span class="k">if</span><span class="w"> </span>
<span class="w">                  </span><span class="p">(</span><span class="nb">equal?</span><span class="w"> </span><span class="p">(</span><span class="n">symbol-leaf</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span><span class="w"> </span><span class="n">symbol</span><span class="p">)</span><span class="w"> </span><span class="o">&#39;</span><span class="p">()</span><span class="w"> </span>
<span class="w">                  </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;symbol not in tree &quot;</span><span class="w"> </span><span class="n">symbol</span><span class="p">)))</span>
<span class="w">    </span><span class="p">((</span><span class="n">element-of-list?</span><span class="w"> </span><span class="n">symbol</span><span class="w"> </span><span class="p">(</span><span class="nb">symbols</span><span class="w"> </span><span class="p">(</span><span class="n">left-branch</span><span class="w"> </span><span class="n">tree</span><span class="p">)))</span><span class="w"> </span>
<span class="w">                    </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="o">&#39;</span><span class="mi">0</span><span class="w"> </span><span class="p">(</span><span class="n">encode-symbol</span><span class="w"> </span><span class="n">symbol</span><span class="w"> </span><span class="p">(</span><span class="n">left-branch</span><span class="w"> </span><span class="n">tree</span><span class="p">))))</span>
<span class="w">    </span><span class="p">((</span><span class="n">element-of-list?</span><span class="w"> </span><span class="n">symbol</span><span class="w"> </span><span class="p">(</span><span class="nb">symbols</span><span class="w"> </span><span class="p">(</span><span class="n">right-branch</span><span class="w"> </span><span class="n">tree</span><span class="p">)))</span><span class="w"> </span>
<span class="w">                    </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="o">&#39;</span><span class="mi">1</span><span class="w"> </span><span class="p">(</span><span class="n">encode-symbol</span><span class="w"> </span><span class="n">symbol</span><span class="w"> </span><span class="p">(</span><span class="n">right-branch</span><span class="w"> </span><span class="n">tree</span><span class="p">))))</span>
<span class="w">    </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;symbol not in tree&quot;</span><span class="w"> </span><span class="n">symbol</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">generate-huffman-tree</span><span class="w"> </span><span class="n">pairs</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">successive-merge</span>
<span class="w">   </span><span class="p">(</span><span class="n">make-leaf-set</span><span class="w"> </span><span class="n">pairs</span><span class="p">)))</span>

<span class="w">    </span><span class="c1">;; merge the symbols of the first two elements of the list</span>
<span class="w">    </span><span class="c1">;; add the weights</span>
<span class="w">    </span><span class="c1">;; make the tree</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">successive-merge</span><span class="w"> </span><span class="n">tree-list</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="p">(</span><span class="nb">length</span><span class="w"> </span><span class="n">tree-list</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">tree-list</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">a</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">tree-list</span><span class="p">))</span><span class="w"> </span>
<span class="w">          </span><span class="p">(</span><span class="n">b</span><span class="w"> </span><span class="p">(</span><span class="nb">cadr</span><span class="w"> </span><span class="n">tree-list</span><span class="p">))</span><span class="w"> </span>
<span class="w">          </span><span class="p">(</span><span class="nb">rest</span><span class="w"> </span><span class="p">(</span><span class="nb">cddr</span><span class="w"> </span><span class="n">tree-list</span><span class="p">)))</span>
<span class="w">      </span><span class="p">(</span><span class="n">successive-merge</span><span class="w"> </span><span class="p">(</span><span class="n">adjoin-set</span><span class="w"> </span><span class="p">(</span><span class="n">make-code-tree</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="p">)</span><span class="w"> </span><span class="nb">rest</span><span class="p">)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">my-tree</span><span class="w"> </span><span class="p">(</span><span class="n">generate-huffman-tree</span><span class="w"> </span><span class="o">&#39;</span><span class="p">((</span><span class="ss">a</span><span class="w"> </span><span class="mi">2</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">na</span><span class="w"> </span><span class="mi">16</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">boom</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">sha</span><span class="w"> </span><span class="mi">3</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">get</span><span class="w"> </span><span class="mi">2</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">yip</span><span class="w"> </span><span class="mi">9</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">job</span><span class="w"> </span><span class="mi">2</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">wah</span><span class="w"> </span><span class="mi">1</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">lyrics</span>
<span class="w">  </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">get</span><span class="w"> </span><span class="ss">a</span><span class="w"> </span><span class="ss">job</span><span class="w"> </span><span class="ss">sha</span><span class="w"> </span><span class="ss">na</span><span class="w"> </span><span class="ss">na</span><span class="w"> </span><span class="ss">na</span><span class="w"> </span><span class="ss">na</span><span class="w"> </span><span class="ss">na</span><span class="w"> </span><span class="ss">na</span><span class="w"> </span><span class="ss">na</span><span class="w"> </span><span class="ss">na</span><span class="w"> </span><span class="ss">get</span><span class="w"> </span><span class="ss">a</span><span class="w"> </span><span class="ss">job</span><span class="w"> </span>
<span class="w">    </span><span class="ss">sha</span><span class="w"> </span><span class="ss">na</span><span class="w"> </span><span class="ss">na</span><span class="w"> </span><span class="ss">na</span><span class="w"> </span><span class="ss">na</span><span class="w"> </span><span class="ss">na</span><span class="w"> </span><span class="ss">na</span><span class="w"> </span><span class="ss">na</span><span class="w"> </span><span class="ss">na</span><span class="w"> </span><span class="ss">wah</span><span class="w"> </span><span class="ss">yip</span><span class="w"> </span><span class="ss">yip</span><span class="w"> </span><span class="ss">yip</span><span class="w"> </span><span class="ss">yip</span><span class="w"> </span><span class="ss">yip</span><span class="w"> </span><span class="ss">yip</span><span class="w"> </span><span class="ss">yip</span><span class="w"> </span><span class="ss">yip</span><span class="w"> </span><span class="ss">yip</span>
<span class="w">    </span><span class="ss">sha</span><span class="w"> </span><span class="ss">boom</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">encoded-lyrics</span><span class="w"> </span><span class="p">(</span><span class="n">encode</span><span class="w"> </span><span class="n">lyrics</span><span class="w"> </span><span class="n">my-tree</span><span class="p">))</span>

<span class="p">(</span><span class="nb">newline</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;Encoded sequence:&quot;</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="n">encoded-lyrics</span>
<span class="p">(</span><span class="nb">newline</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;Encoded sequence length:&quot;</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="p">(</span><span class="nb">length</span><span class="w"> </span><span class="n">encoded-lyrics</span><span class="p">)</span>
<span class="p">(</span><span class="nb">newline</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;Decoding of the encoding:&quot;</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="p">(</span><span class="n">decode</span><span class="w"> </span><span class="n">encoded-lyrics</span><span class="w"> </span><span class="n">my-tree</span><span class="p">)</span>
</pre></div>
<div class="code-output">
<span>Output:</span>
<pre>
Encoded sequence:
(1 1 1 1 1 1 1 0 0 1 1 1 1 0 1 1 1 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 0 0 1 1 1 1 0 1 1 1 0 0 0 0 0 0 0 0 0 1 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 1 1 0 1 1 0 1 1)

Encoded sequence length:
84

Decoding of the encoding:
(get a job sha na na na na na na na na get a job sha na na na na na na na na wah yip yip yip yip yip yip yip yip yip sha boom)
</pre>
</div>
</div>


#### Exercise 2.71

Suppose we have a Huffman tree
for an alphabet of $n$ symbols, and that the relative frequencies of the
symbols are $1, 2, 4, \dots, 2^{n-1}$.  Sketch the tree for $n=5$; for
$n=10$.  In such a tree (for general $n$) how many bits are required to
encode the most frequent symbol?  The least frequent symbol?

##### Solution
In my implementation it's a left-heavy tree, $2^{n-1}$ is encoded as `1`, 
0 (with a frequency of $2^0=1$) is encoded as $0\ldots 0$. 

<div class="code-box" markdown="1">
<div class="code-header"><a href="code/ex2-71.rkt">code/ex2-71.rkt</a></div>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-leaf</span><span class="w"> </span><span class="n">symbol</span><span class="w"> </span><span class="n">weight</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">leaf</span><span class="w"> </span><span class="n">symbol</span><span class="w"> </span><span class="n">weight</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">leaf?</span><span class="w"> </span><span class="n">object</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">eq?</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">object</span><span class="p">)</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">leaf</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">symbol-leaf</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cadr</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">weight-leaf</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">caddr</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">left-branch</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">tree</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">right-branch</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cadr</span><span class="w"> </span><span class="n">tree</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">symbols</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">leaf?</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="p">(</span><span class="n">symbol-leaf</span><span class="w"> </span><span class="n">tree</span><span class="p">))</span>
<span class="w">      </span><span class="p">(</span><span class="nb">caddr</span><span class="w"> </span><span class="n">tree</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">weight</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">leaf?</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="n">weight-leaf</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="nb">cadddr</span><span class="w"> </span><span class="n">tree</span><span class="p">)))</span>


<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">element-of-list?</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">lst</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">null?</span><span class="w"> </span><span class="n">lst</span><span class="p">)</span><span class="w"> </span><span class="k">false</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="nb">equal?</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">lst</span><span class="p">))</span><span class="w"> </span><span class="nb">true</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="n">element-of-list?</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">lst</span><span class="p">)))))</span>


<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-code-tree</span><span class="w"> </span><span class="n">left</span><span class="w"> </span><span class="n">right</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="n">left</span>
<span class="w">        </span><span class="n">right</span>
<span class="w">        </span><span class="p">(</span><span class="nb">append</span><span class="w"> </span><span class="p">(</span><span class="nb">symbols</span><span class="w"> </span><span class="n">left</span><span class="p">)</span>
<span class="w">                </span><span class="p">(</span><span class="nb">symbols</span><span class="w"> </span><span class="n">right</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="p">(</span><span class="n">weight</span><span class="w"> </span><span class="n">left</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">weight</span><span class="w"> </span><span class="n">right</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">decode</span><span class="w"> </span><span class="n">bits</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">decode-1</span><span class="w"> </span><span class="n">bits</span><span class="w"> </span><span class="n">current-branch</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="n">bits</span><span class="p">)</span>
<span class="w">        </span><span class="o">&#39;</span><span class="p">()</span>
<span class="w">        </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">next-branch</span>
<span class="w">               </span><span class="p">(</span><span class="n">choose-branch</span>
<span class="w">                </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">bits</span><span class="p">)</span>
<span class="w">                </span><span class="n">current-branch</span><span class="p">)))</span>
<span class="w">          </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">leaf?</span><span class="w"> </span><span class="n">next-branch</span><span class="p">)</span>
<span class="w">              </span><span class="p">(</span><span class="nb">cons</span>
<span class="w">               </span><span class="p">(</span><span class="n">symbol-leaf</span><span class="w"> </span><span class="n">next-branch</span><span class="p">)</span>
<span class="w">               </span><span class="p">(</span><span class="n">decode-1</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">bits</span><span class="p">)</span><span class="w"> </span><span class="n">tree</span><span class="p">))</span>
<span class="w">              </span><span class="p">(</span><span class="n">decode-1</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">bits</span><span class="p">)</span>
<span class="w">                        </span><span class="n">next-branch</span><span class="p">)))))</span>
<span class="w">  </span><span class="p">(</span><span class="n">decode-1</span><span class="w"> </span><span class="n">bits</span><span class="w"> </span><span class="n">tree</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">choose-branch</span><span class="w"> </span><span class="n">bit</span><span class="w"> </span><span class="n">branch</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">=</span><span class="w"> </span><span class="n">bit</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">left-branch</span><span class="w"> </span><span class="n">branch</span><span class="p">))</span>
<span class="w">        </span><span class="p">((</span><span class="nb">=</span><span class="w"> </span><span class="n">bit</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">right-branch</span><span class="w"> </span><span class="n">branch</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;bad bit:</span>
<span class="s2">               CHOOSE-BRANCH&quot;</span><span class="w"> </span><span class="n">bit</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">adjoin-set</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="nb">set</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">null?</span><span class="w"> </span><span class="nb">set</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="w">        </span><span class="p">((</span><span class="nb">&lt;</span><span class="w"> </span><span class="p">(</span><span class="n">weight</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">weight</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="nb">set</span><span class="p">)))</span><span class="w"> </span>
<span class="w">         </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="nb">set</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span>
<span class="w">         </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="nb">set</span><span class="p">)</span>
<span class="w">               </span><span class="p">(</span><span class="n">adjoin-set</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="nb">set</span><span class="p">))))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-leaf-set</span><span class="w"> </span><span class="n">pairs</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="n">pairs</span><span class="p">)</span>
<span class="w">      </span><span class="o">&#39;</span><span class="p">()</span>
<span class="w">      </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">pair</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">pairs</span><span class="p">)))</span>
<span class="w">        </span><span class="p">(</span><span class="n">adjoin-set</span><span class="w"> </span>
<span class="w">         </span><span class="p">(</span><span class="n">make-leaf</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">pair</span><span class="p">)</span><span class="w">    </span><span class="c1">; symbol</span>
<span class="w">                    </span><span class="p">(</span><span class="nb">cadr</span><span class="w"> </span><span class="n">pair</span><span class="p">))</span><span class="w">  </span><span class="c1">; frequency</span>
<span class="w">         </span><span class="p">(</span><span class="n">make-leaf-set</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">pairs</span><span class="p">))))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">sample-tree</span>
<span class="w">  </span><span class="p">(</span><span class="n">make-code-tree</span><span class="w"> </span>
<span class="w">   </span><span class="p">(</span><span class="n">make-leaf</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">A</span><span class="w"> </span><span class="mi">4</span><span class="p">)</span>
<span class="w">   </span><span class="p">(</span><span class="n">make-code-tree</span>
<span class="w">    </span><span class="p">(</span><span class="n">make-leaf</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">B</span><span class="w"> </span><span class="mi">2</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">make-code-tree</span><span class="w"> </span>
<span class="w">     </span><span class="p">(</span><span class="n">make-leaf</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">D</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span>
<span class="w">     </span><span class="p">(</span><span class="n">make-leaf</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">C</span><span class="w"> </span><span class="mi">1</span><span class="p">)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">sample-message</span><span class="w"> </span>
<span class="w">  </span><span class="o">&#39;</span><span class="p">(</span><span class="mi">0</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">0</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">encode</span><span class="w"> </span><span class="n">message</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="n">message</span><span class="p">)</span>
<span class="w">      </span><span class="o">&#39;</span><span class="p">()</span>
<span class="w">      </span><span class="p">(</span><span class="nb">append</span><span class="w"> </span>
<span class="w">       </span><span class="p">(</span><span class="n">encode-symbol</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">message</span><span class="p">)</span><span class="w"> </span>
<span class="w">                      </span><span class="n">tree</span><span class="p">)</span>
<span class="w">       </span><span class="p">(</span><span class="n">encode</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">message</span><span class="p">)</span><span class="w"> </span><span class="n">tree</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">encode-symbol</span><span class="w"> </span><span class="n">symbol</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span>
<span class="w">    </span><span class="p">((</span><span class="n">leaf?</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span><span class="w"> </span>
<span class="w">                </span><span class="p">(</span><span class="k">if</span><span class="w"> </span>
<span class="w">                  </span><span class="p">(</span><span class="nb">equal?</span><span class="w"> </span><span class="p">(</span><span class="n">symbol-leaf</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span><span class="w"> </span><span class="n">symbol</span><span class="p">)</span><span class="w"> </span><span class="o">&#39;</span><span class="p">()</span><span class="w"> </span>
<span class="w">                  </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;symbol not in tree &quot;</span><span class="w"> </span><span class="n">symbol</span><span class="p">)))</span>
<span class="w">    </span><span class="p">((</span><span class="n">element-of-list?</span><span class="w"> </span><span class="n">symbol</span><span class="w"> </span><span class="p">(</span><span class="nb">symbols</span><span class="w"> </span><span class="p">(</span><span class="n">left-branch</span><span class="w"> </span><span class="n">tree</span><span class="p">)))</span><span class="w"> </span>
<span class="w">                    </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="o">&#39;</span><span class="mi">0</span><span class="w"> </span><span class="p">(</span><span class="n">encode-symbol</span><span class="w"> </span><span class="n">symbol</span><span class="w"> </span><span class="p">(</span><span class="n">left-branch</span><span class="w"> </span><span class="n">tree</span><span class="p">))))</span>
<span class="w">    </span><span class="p">((</span><span class="n">element-of-list?</span><span class="w"> </span><span class="n">symbol</span><span class="w"> </span><span class="p">(</span><span class="nb">symbols</span><span class="w"> </span><span class="p">(</span><span class="n">right-branch</span><span class="w"> </span><span class="n">tree</span><span class="p">)))</span><span class="w"> </span>
<span class="w">                    </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="o">&#39;</span><span class="mi">1</span><span class="w"> </span><span class="p">(</span><span class="n">encode-symbol</span><span class="w"> </span><span class="n">symbol</span><span class="w"> </span><span class="p">(</span><span class="n">right-branch</span><span class="w"> </span><span class="n">tree</span><span class="p">))))</span>
<span class="w">    </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;symbol not in tree&quot;</span><span class="w"> </span><span class="n">symbol</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">generate-huffman-tree</span><span class="w"> </span><span class="n">pairs</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">successive-merge</span>
<span class="w">   </span><span class="p">(</span><span class="n">make-leaf-set</span><span class="w"> </span><span class="n">pairs</span><span class="p">)))</span>

<span class="w">    </span><span class="c1">;; merge the symbols of the first two elements of the list</span>
<span class="w">    </span><span class="c1">;; add the weights</span>
<span class="w">    </span><span class="c1">;; make the tree</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">successive-merge</span><span class="w"> </span><span class="n">tree-list</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="p">(</span><span class="nb">length</span><span class="w"> </span><span class="n">tree-list</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">tree-list</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">a</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">tree-list</span><span class="p">))</span><span class="w"> </span>
<span class="w">          </span><span class="p">(</span><span class="n">b</span><span class="w"> </span><span class="p">(</span><span class="nb">cadr</span><span class="w"> </span><span class="n">tree-list</span><span class="p">))</span><span class="w"> </span>
<span class="w">          </span><span class="p">(</span><span class="nb">rest</span><span class="w"> </span><span class="p">(</span><span class="nb">cddr</span><span class="w"> </span><span class="n">tree-list</span><span class="p">)))</span>
<span class="w">      </span><span class="p">(</span><span class="n">successive-merge</span><span class="w"> </span><span class="p">(</span><span class="n">adjoin-set</span><span class="w"> </span><span class="p">(</span><span class="n">make-code-tree</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="p">)</span><span class="w"> </span><span class="nb">rest</span><span class="p">)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">my-tree</span><span class="w"> </span><span class="p">(</span><span class="n">generate-huffman-tree</span><span class="w"> </span><span class="o">&#39;</span><span class="p">((</span><span class="ss">a</span><span class="w"> </span><span class="mi">2</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">na</span><span class="w"> </span><span class="mi">16</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">boom</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">sha</span><span class="w"> </span><span class="mi">3</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">get</span><span class="w"> </span><span class="mi">2</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">yip</span><span class="w"> </span><span class="mi">9</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">job</span><span class="w"> </span><span class="mi">2</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">wah</span><span class="w"> </span><span class="mi">1</span><span class="p">))))</span>


<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">pow2-tree</span><span class="w"> </span><span class="n">n2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">pow2-list</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="n">arg</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span><span class="w"> </span><span class="n">nil</span>
<span class="w">      </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">n2</span><span class="w"> </span><span class="n">n</span><span class="p">)</span><span class="w"> </span><span class="n">arg</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">pow2-list</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="n">arg</span><span class="p">)))))</span>
<span class="w">  </span><span class="p">(</span><span class="n">generate-huffman-tree</span><span class="w"> </span><span class="p">(</span><span class="n">pow2-list</span><span class="w"> </span><span class="n">n2</span><span class="w"> </span><span class="mi">1</span><span class="p">)))</span>

<span class="p">(</span><span class="n">pow2-tree</span><span class="w"> </span><span class="mi">5</span><span class="p">)</span>
<span class="p">(</span><span class="n">pow2-tree</span><span class="w"> </span><span class="mi">10</span><span class="p">)</span>
<span class="w">    </span>
</pre></div>
<div class="code-output">
<span>Output:</span>
<pre>(((((leaf 0 1) (leaf 1 2) (0 1) 3) (leaf 2 4) (0 1 2) 7) (leaf 3 8) (0 1 2 3) 15) (leaf 4 16) (0 1 2 3 4) 31)
((((((((((leaf 0 1) (leaf 1 2) (0 1) 3) (leaf 2 4) (0 1 2) 7) (leaf 3 8) (0 1 2 3) 15) (leaf 4 16) (0 1 2 3 4) 31) (leaf 5 32) (0 1 2 3 4 5) 63) (leaf 6 64) (0 1 2 3 4 5 6) 127) (leaf 7 128) (0 1 2 3 4 5 6 7) 255) (leaf 8 256) (0 1 2 3 4 5 6 7 8) 511) (leaf 9 512) (0 1 2 3 4 5 6 7 8 9) 1023)
</pre>
</div>
</div>


#### Exercise 2.72

Consider the encoding procedure
that you designed in Exercise 2.68.  What is the order of growth in the
number of steps needed to encode a symbol?  Be sure to include the number of
steps needed to search the symbol list at each node encountered.  To answer
this question in general is difficult.  Consider the special case where the
relative frequencies of the $n$ symbols are as described in Exercise 2.71, 
and give the order of growth (as a function of $n$) of the number of
steps needed to encode the most frequent and least frequent symbols in the
alphabet.

##### Solution

For encoding the most common symbol, it's actually going to be $\Theta(n)$
specifically because of the element checking in the line:
<div class="codehilite"><pre><span></span><span class="p">(</span><span class="n">element-of-list?</span><span class="w"> </span><span class="n">symbol</span><span class="w"> </span><span class="p">(</span><span class="nb">symbols</span><span class="w"> </span><span class="p">(</span><span class="n">left-branch</span><span class="w"> </span><span class="n">tree</span><span class="p">)))</span>
</pre></div>

For encoding the least common symbol, I could have been fancy and sorted the symbols list during construction, so that each lookup would also be $\Theta(1)$ 
(it would be the first symbol tested). But if I assume the symbols are in a random order, each lookup will be $\Theta(n)$. We have to do $n$ of these, so 
in fact this is a worst case situation, and the encoding is $\Theta(n^2)$! 

If we're encoding symbol $k$, on the first step we search a list of size
$n-1$, then $n-2$, ... to $n-k$. This is 
$$\sum_{i=1}^k (n-i) = \frac{k (2n-1-k)}{2}$$

If each $k$ is weighted by $2^{n-k-1}$ (meaning, the symbol with $k=0$ 
has frequency $2^{n-1}$) then the expectation value is...

<div class="codehilite"><pre><span></span><span class="n">In</span><span class="p">[</span><span class="mi">29</span><span class="p">]</span><span class="o">:=</span><span class="w"> </span>
<span class="w">  </span><span class="n">weight</span><span class="p">[</span><span class="nv">k_</span><span class="p">]</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="mi">2</span><span class="o">^</span><span class="p">(</span><span class="n">n</span><span class="w"> </span><span class="o">-</span><span class="w"> </span><span class="n">k</span><span class="w"> </span><span class="o">-</span><span class="w"> </span><span class="mi">1</span><span class="p">);</span>
<span class="w">  </span><span class="n">P</span><span class="p">[</span><span class="nv">k_</span><span class="p">]</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="n">weight</span><span class="p">[</span><span class="n">k</span><span class="p">]</span><span class="o">/</span><span class="n">Sum</span><span class="p">[</span><span class="n">weight</span><span class="p">[</span><span class="n">k</span><span class="p">],</span><span class="w"> </span><span class="p">{</span><span class="n">k</span><span class="p">,</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="o">-</span><span class="w"> </span><span class="mi">1</span><span class="p">}];</span>
<span class="w">  </span><span class="n">Sum</span><span class="p">[</span><span class="o">-</span><span class="p">(</span><span class="mi">1</span><span class="o">/</span><span class="mi">2</span><span class="p">)</span><span class="w"> </span><span class="n">k</span><span class="w"> </span><span class="p">(</span><span class="mi">1</span><span class="w"> </span><span class="o">+</span><span class="w"> </span><span class="n">k</span><span class="w"> </span><span class="o">-</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="n">n</span><span class="p">)</span><span class="w"> </span><span class="n">P</span><span class="p">[</span><span class="n">k</span><span class="p">],</span><span class="w"> </span><span class="p">{</span><span class="n">k</span><span class="p">,</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="o">-</span><span class="w"> </span><span class="mi">1</span><span class="p">}]</span><span class="w"> </span><span class="o">//</span><span class="w"> </span><span class="n">FullSimplify</span>

<span class="n">Out</span><span class="p">[</span><span class="mi">31</span><span class="p">]</span><span class="o">=</span><span class="w"> </span><span class="mi">-2</span><span class="w"> </span><span class="o">+</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="o">-</span><span class="w"> </span><span class="p">((</span><span class="mi">-3</span><span class="w"> </span><span class="o">+</span><span class="w"> </span><span class="n">n</span><span class="p">)</span><span class="w"> </span><span class="n">n</span><span class="p">)</span><span class="o">/</span><span class="p">(</span><span class="mi">2</span><span class="w"> </span><span class="p">(</span><span class="mi">-1</span><span class="w"> </span><span class="o">+</span><span class="w"> </span><span class="mi">2</span><span class="o">^</span><span class="n">n</span><span class="p">))</span>
</pre></div>
Which means that we have an expected encoding time of order $\Theta(n)$, 
but the worst case encoding time is $\Theta(n^2)$.


<!--
$n$ is the number of symbols. 
Let's look at my impl of successive-merge. 
For the tree in exercise 2.71, `car tree-list` contains the rest of the tree
and `cadr tree-list` contains the current leaf.

<div class="codehilite"><pre><span></span>(define (successive-merge tree-list) 
  (if (= 1 (length tree-list)) (car tree-list)
    (let ((a (car tree-list)) 
          (b (cadr tree-list)) 
          (rest (cddr tree-list)))
      (successive-merge (adjoin-set (make-code-tree a b) rest)))))
</pre></div>

The time taken to execute successive-merge will depend on the number of 
symbols in the list. Each time we call adjoin, we decrease the number of 
symbols by one. In fact the very special form of the frequencies means we
never have to worry about re-sorting the list; we expect adjoin-set to always
append at the beginning. This is because when we adjoin frequencies (1+2), this 
is still less than 4. Frequencies (1+2+4) is less than 8, and so on. 
So adjoin-set is going to be O(1) in all cases.

So this is easy, it's just $\Theta(n)$ to build the tree, 
-->
















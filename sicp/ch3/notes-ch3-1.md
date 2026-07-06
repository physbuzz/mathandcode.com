---
layout: sicp
render_with_liquid: false
title: SICP Chapter 3.1
---

<div class="nav">
    <span class="activenav"><a href="../ch2/notes-ch2-5.html">← Previous</a></span>
    <span class="activenav"><a href="../index.html">↑ Up</a></span>
    <span class="activenav"><a href="notes-ch3-2.html">Next →</a></span>
</div>


[HTML Book Chapter 3.1 Link](https://sarabander.github.io/sicp/html/3_002e1.xhtml#g_t3_002e1)

## Directory
- [Section 3.1](#section-31)
  - [Notes](#notes)
  - [Meeting 05-11-2025](#meeting-05-11-2025)
  - [Exercises](#exercises)
    - *Exercises:* ([Exercise 3.1](#exercise-31), [Exercise 3.2](#exercise-32), [Exercise 3.3](#exercise-33), [Exercise 3.4](#exercise-34), [Exercise 3.5](#exercise-35), [Exercise 3.6](#exercise-36), [Exercise 3.7](#exercise-37), [Exercise 3.8](#exercise-38))

## Section 3.1

### Notes

- Worth reading: https://gwern.net/doc/math/1975-chaitin.pdf 
- Note on evaluation order: we can use `let*` to evaluate
the arguments of let in order.

Here's some useful code about the equality of different functions in the context of the end of 3.1

<div class="code-box" markdown="1">
<div class="code-header"><a href="code/test.rkt">code/test.rkt</a></div>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-decrementer</span><span class="w"> </span><span class="n">balance</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">amount</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">balance</span><span class="w"> </span><span class="n">amount</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">D1</span><span class="w"> </span><span class="p">(</span><span class="n">make-decrementer</span><span class="w"> </span><span class="mi">25</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">D2</span><span class="w"> </span><span class="p">(</span><span class="n">make-decrementer</span><span class="w"> </span><span class="mi">25</span><span class="p">))</span>
<span class="p">(</span><span class="nb">eq?</span><span class="w"> </span><span class="n">D1</span><span class="w"> </span><span class="n">D2</span><span class="p">)</span><span class="w"> </span><span class="c1">; =&gt; #f</span>
<span class="p">(</span><span class="nb">eqv?</span><span class="w"> </span><span class="n">D1</span><span class="w"> </span><span class="n">D2</span><span class="p">)</span><span class="w"> </span><span class="c1">; =&gt; #f</span>
<span class="p">(</span><span class="nb">equal?</span><span class="w"> </span><span class="n">D1</span><span class="w"> </span><span class="n">D2</span><span class="p">)</span><span class="w"> </span><span class="c1">; =&gt; #f</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">D3</span><span class="w"> </span><span class="n">D2</span><span class="p">)</span>
<span class="p">(</span><span class="nb">eq?</span><span class="w"> </span><span class="n">D2</span><span class="w"> </span><span class="n">D3</span><span class="p">)</span>
<span class="p">(</span><span class="nb">eqv?</span><span class="w"> </span><span class="n">D2</span><span class="w"> </span><span class="n">D3</span><span class="p">)</span>
<span class="p">(</span><span class="nb">equal?</span><span class="w"> </span><span class="n">D2</span><span class="w"> </span><span class="n">D3</span><span class="p">)</span>
</pre></div>
<div class="code-output">
<span>Output:</span>
<pre>#f
#f
#f
#t
#t
#t
</pre>
</div>
</div>


### Meeting 05-11-2025

- Relating to the "order of updates", I recently stumbled across an interesting post by Dan Piponi about changing the order of updates of an iterative
algorithm and looking at the result. [mathoverflow post](https://mathoverflow.net/questions/492197/what-is-this-modified-arithmetico-geometric-mean-function), [mathstodon.xyz post](https://mathstodon.xyz/@dpiponi/114468239096746615).

- [Referential transparency](https://en.wikipedia.org/wiki/Side_effect_%28computer_science%29#Referential_transparency) : "Absence of side effects is a necessary, but not sufficient, condition for referential transparency. Referential transparency means that an expression (such as a function call) can be replaced with its value. This requires that the expression is pure, that is to say the expression must be deterministic (always give the same value for the same input) and side-effect free."

Resources on writing a Lisp interpreter:

- [https://craftinginterpreters.com/](https://craftinginterpreters.com/)
- [https://norvig.com/lispy.html](https://norvig.com/lispy.html)
- [https://buildyourownlisp.com/](https://buildyourownlisp.com/)

Not related to this chapter, but I forgot about it until now:

 - [Functional composition w/ Chris Ford](https://www.youtube.com/watch?v=jyNqHsN3pEc)

### Exercises

#### Exercise 3.1

An accumulator is a
procedure that is called repeatedly with a single numeric argument and
accumulates its arguments into a sum.  Each time it is called, it returns the
currently accumulated sum.  Write a procedure `make-accumulator` that
generates accumulators, each maintaining an independent sum.  The input to
`make-accumulator` should specify the initial value of the sum; for
example

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">A</span><span class="w"> </span><span class="p">(</span><span class="n">make-accumulator</span><span class="w"> </span><span class="mi">5</span><span class="p">))</span>

<span class="p">(</span><span class="n">A</span><span class="w"> </span><span class="mi">10</span><span class="p">)</span>
<span class="mi">15</span>

<span class="p">(</span><span class="n">A</span><span class="w"> </span><span class="mi">10</span><span class="p">)</span>
<span class="mi">25</span>
</pre></div>

##### Solution

<div class="code-box" markdown="1">
<div class="code-header"><a href="code/ex3-1.rkt">code/ex3-1.rkt</a></div>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-accumulator</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">total</span><span class="w"> </span><span class="n">n</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">arg</span><span class="p">)</span><span class="w"> </span>
<span class="w">      </span><span class="p">(</span><span class="k">begin</span>
<span class="w">        </span><span class="p">(</span><span class="k">set!</span><span class="w"> </span><span class="n">total</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">total</span><span class="w"> </span><span class="n">arg</span><span class="p">))</span>
<span class="w">        </span><span class="n">total</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">A</span><span class="w"> </span><span class="p">(</span><span class="n">make-accumulator</span><span class="w"> </span><span class="mi">5</span><span class="p">))</span>

<span class="p">(</span><span class="n">A</span><span class="w"> </span><span class="mi">10</span><span class="p">)</span>

<span class="p">(</span><span class="n">A</span><span class="w"> </span><span class="mi">10</span><span class="p">)</span>
</pre></div>
<div class="code-output">
<span>Output:</span>
<pre>15
25
</pre>
</div>
</div>


#### Exercise 3.2

In software-testing applications,
it is useful to be able to count the number of times a given procedure is
called during the course of a computation.  Write a procedure
`make-monitored` that takes as input a procedure, `f`, that itself
takes one input.  The result returned by `make-monitored` is a third
procedure, say `mf`, that keeps track of the number of times it has been
called by maintaining an internal counter.  If the input to `mf` is the
special symbol `how-many-calls?`, then `mf` returns the value of the
counter.  If the input is the special symbol `reset-count`, then `mf`
resets the counter to zero.  For any other input, `mf` returns the result
of calling `f` on that input and increments the counter.  For instance, we
could make a monitored version of the `sqrt` procedure:

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="p">(</span><span class="n">make-monitored</span><span class="w"> </span><span class="nb">sqrt</span><span class="p">))</span>

<span class="p">(</span><span class="n">s</span><span class="w"> </span><span class="mi">100</span><span class="p">)</span>
<span class="mi">10</span>

<span class="p">(</span><span class="n">s</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">how-many-calls?</span><span class="p">)</span>
<span class="mi">1</span>
</pre></div>

##### Solution



<div class="code-box" markdown="1">
<div class="code-header"><a href="code/ex3-2.rkt">code/ex3-2.rkt</a></div>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-monitored</span><span class="w"> </span><span class="n">func</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">ncalls</span><span class="w"> </span><span class="mi">0</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">arg</span><span class="p">)</span><span class="w"> </span>
<span class="w">      </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">arg</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">how-many-calls?</span><span class="p">)</span><span class="w"> </span><span class="n">ncalls</span><span class="p">)</span>
<span class="w">            </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">arg</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">reset-count</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="k">set!</span><span class="w"> </span><span class="n">ncalls</span><span class="w"> </span><span class="mi">0</span><span class="p">))</span>
<span class="w">            </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="k">begin</span>
<span class="w">              </span><span class="p">(</span><span class="k">set!</span><span class="w"> </span><span class="n">ncalls</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">ncalls</span><span class="w"> </span><span class="mi">1</span><span class="p">))</span>
<span class="w">              </span><span class="p">(</span><span class="n">func</span><span class="w"> </span><span class="n">arg</span><span class="p">)))))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="p">(</span><span class="n">make-monitored</span><span class="w"> </span><span class="nb">sqrt</span><span class="p">))</span>

<span class="p">(</span><span class="n">s</span><span class="w"> </span><span class="mi">100</span><span class="p">)</span>
<span class="p">(</span><span class="n">s</span><span class="w"> </span><span class="mi">9</span><span class="p">)</span>

<span class="p">(</span><span class="n">s</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">how-many-calls?</span><span class="p">)</span>
<span class="p">(</span><span class="n">s</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">reset-count</span><span class="p">)</span>
<span class="p">(</span><span class="n">s</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">how-many-calls?</span><span class="p">)</span>
</pre></div>
<div class="code-output">
<span>Output:</span>
<pre>10
3
2
0
</pre>
</div>
</div>



#### Exercise 3.3

Modify the `make-account`
procedure so that it creates password-protected accounts.  That is,
`make-account` should take a symbol as an additional argument, as in

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">acc</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="n">make-account</span><span class="w"> </span><span class="mi">100</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">secret-password</span><span class="p">))</span>
</pre></div>

The resulting account object should process a request only if it is accompanied
by the password with which the account was created, and should otherwise return
a complaint:

<div class="codehilite"><pre><span></span><span class="p">((</span><span class="n">acc</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">secret-password</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">withdraw</span><span class="p">)</span><span class="w"> </span><span class="mi">40</span><span class="p">)</span>
<span class="mi">60</span>

<span class="p">((</span><span class="n">acc</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">some-other-password</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">deposit</span><span class="p">)</span><span class="w"> </span><span class="mi">50</span><span class="p">)</span>
<span class="s2">&quot;Incorrect password&quot;</span>
</pre></div>

##### Solution

<div class="code-box" markdown="1">
<div class="code-header"><a href="code/ex3-3.rkt">code/ex3-3.rkt</a></div>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-account</span><span class="w"> </span><span class="n">balance</span><span class="w"> </span><span class="n">pw</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">withdraw</span><span class="w"> </span><span class="n">amount</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">&gt;=</span><span class="w"> </span><span class="n">balance</span><span class="w"> </span><span class="n">amount</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="k">begin</span><span class="w"> </span><span class="p">(</span><span class="k">set!</span><span class="w"> </span><span class="n">balance</span>
<span class="w">                     </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">balance</span><span class="w"> </span><span class="n">amount</span><span class="p">))</span>
<span class="w">               </span><span class="n">balance</span><span class="p">)</span>
<span class="w">        </span><span class="s2">&quot;Insufficient funds&quot;</span><span class="p">))</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">deposit</span><span class="w"> </span><span class="n">amount</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">set!</span><span class="w"> </span><span class="n">balance</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">balance</span><span class="w"> </span><span class="n">amount</span><span class="p">))</span>
<span class="w">    </span><span class="n">balance</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">errorfunc</span><span class="w"> </span><span class="o">.</span><span class="w"> </span><span class="n">args</span><span class="p">)</span><span class="w"> </span>
<span class="w">    </span><span class="s2">&quot;Incorrect Password&quot;</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">dispatch</span><span class="w"> </span><span class="n">pw-arg</span><span class="w"> </span><span class="n">m</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="nb">eq?</span><span class="w"> </span><span class="n">pw</span><span class="w"> </span><span class="n">pw-arg</span><span class="p">))</span><span class="w"> </span><span class="n">errorfunc</span><span class="p">)</span>
<span class="w">          </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">m</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">withdraw</span><span class="p">)</span><span class="w"> </span><span class="n">withdraw</span><span class="p">)</span>
<span class="w">          </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">m</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">deposit</span><span class="p">)</span><span class="w"> </span><span class="n">deposit</span><span class="p">)</span>
<span class="w">          </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;Unknown request:</span>
<span class="s2">                 MAKE-ACCOUNT&quot;</span><span class="w"> </span><span class="n">m</span><span class="p">))))</span>
<span class="w">  </span><span class="n">dispatch</span><span class="p">)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">acc</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="n">make-account</span><span class="w"> </span><span class="mi">100</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">secret-password</span><span class="p">))</span>

<span class="p">((</span><span class="n">acc</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">secret-password</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">withdraw</span><span class="p">)</span><span class="w"> </span><span class="mi">40</span><span class="p">)</span>
<span class="c1">;60</span>

<span class="p">((</span><span class="n">acc</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">some-other-password</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">deposit</span><span class="p">)</span><span class="w"> </span><span class="mi">50</span><span class="p">)</span>
<span class="c1">;&quot;Incorrect password&quot;</span>
</pre></div>
<div class="code-output">
<span>Output:</span>
<pre>60
&quot;Incorrect Password&quot;
</pre>
</div>
</div>

#### Exercise 3.4

Modify the `make-account`
procedure of Exercise 3.3 by adding another local state variable so that,
if an account is accessed more than seven consecutive times with an incorrect
password, it invokes the procedure `call-the-cops`.

##### Solution

I structured this answer in a bit of a weird way, I want the 
"cops called" message to display when the function
is returned. Not when the returned function is called by the 
user.

<div class="code-box" markdown="1">
<div class="code-header"><a href="code/ex3-4.rkt">code/ex3-4.rkt</a></div>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-account</span><span class="w"> </span><span class="n">balance</span><span class="w"> </span><span class="n">pw</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">num-consec-fails</span><span class="w"> </span><span class="mi">0</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">withdraw</span><span class="w"> </span><span class="n">amount</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">&gt;=</span><span class="w"> </span><span class="n">balance</span><span class="w"> </span><span class="n">amount</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="k">begin</span><span class="w"> </span><span class="p">(</span><span class="k">set!</span><span class="w"> </span><span class="n">balance</span>
<span class="w">                 </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">balance</span><span class="w"> </span><span class="n">amount</span><span class="p">))</span>
<span class="w">          </span><span class="n">balance</span><span class="p">)</span>
<span class="w">        </span><span class="s2">&quot;Insufficient funds&quot;</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">deposit</span><span class="w"> </span><span class="n">amount</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="k">set!</span><span class="w"> </span><span class="n">balance</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">balance</span><span class="w"> </span><span class="n">amount</span><span class="p">))</span>
<span class="w">      </span><span class="n">balance</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">call-the-cops</span><span class="p">)</span><span class="w"> </span>
<span class="w">      </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;&gt;:( cops called&quot;</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">return-errorfunc</span><span class="p">)</span><span class="w"> </span>
<span class="w">      </span><span class="p">(</span><span class="k">begin</span><span class="w"> </span>
<span class="w">        </span><span class="p">(</span><span class="k">set!</span><span class="w"> </span><span class="n">num-consec-fails</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">num-consec-fails</span><span class="w"> </span><span class="mi">1</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">&gt;</span><span class="w"> </span><span class="n">num-consec-fails</span><span class="w"> </span><span class="mi">7</span><span class="p">)</span>
<span class="w">          </span><span class="p">(</span><span class="k">begin</span><span class="w"> </span><span class="p">(</span><span class="n">call-the-cops</span><span class="p">)</span>
<span class="w">                 </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="n">args</span><span class="w"> </span><span class="s2">&quot;N/A&quot;</span><span class="p">))</span>
<span class="w">          </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="n">args</span><span class="w"> </span><span class="s2">&quot;Incorrect Password&quot;</span><span class="p">))))</span>
<span class="w">    </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">dispatch</span><span class="w"> </span><span class="n">pw-arg</span><span class="w"> </span><span class="n">m</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="nb">eq?</span><span class="w"> </span><span class="n">pw</span><span class="w"> </span><span class="n">pw-arg</span><span class="p">))</span><span class="w"> </span>
<span class="w">        </span><span class="p">(</span><span class="n">return-errorfunc</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="k">begin</span><span class="w"> </span>
<span class="w">          </span><span class="p">(</span><span class="k">set!</span><span class="w"> </span><span class="n">num-consec-fails</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span>
<span class="w">          </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span>
<span class="w">            </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">m</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">withdraw</span><span class="p">)</span><span class="w"> </span><span class="n">withdraw</span><span class="p">)</span>
<span class="w">            </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">m</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">deposit</span><span class="p">)</span><span class="w"> </span><span class="n">deposit</span><span class="p">)</span>
<span class="w">            </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;Unknown request:</span>
<span class="s2">                         MAKE-ACCOUNT&quot;</span><span class="w"> </span><span class="n">m</span><span class="p">))))))</span>
<span class="w">    </span><span class="n">dispatch</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">acc</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="n">make-account</span><span class="w"> </span><span class="mi">100</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">secret-password</span><span class="p">))</span>

<span class="p">((</span><span class="n">acc</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">secret-password</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">withdraw</span><span class="p">)</span><span class="w"> </span><span class="mi">40</span><span class="p">)</span>
<span class="c1">;60</span>

<span class="p">((</span><span class="n">acc</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">some-other-password</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">deposit</span><span class="p">)</span><span class="w"> </span><span class="mi">50</span><span class="p">)</span>
<span class="p">((</span><span class="n">acc</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">some-other-password</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">deposit</span><span class="p">)</span><span class="w"> </span><span class="mi">50</span><span class="p">)</span>
<span class="p">((</span><span class="n">acc</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">some-other-password</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">deposit</span><span class="p">)</span><span class="w"> </span><span class="mi">50</span><span class="p">)</span>
<span class="p">((</span><span class="n">acc</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">some-other-password</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">deposit</span><span class="p">)</span><span class="w"> </span><span class="mi">50</span><span class="p">)</span>
<span class="p">((</span><span class="n">acc</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">some-other-password</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">deposit</span><span class="p">)</span><span class="w"> </span><span class="mi">50</span><span class="p">)</span>
<span class="p">((</span><span class="n">acc</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">some-other-password</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">deposit</span><span class="p">)</span><span class="w"> </span><span class="mi">50</span><span class="p">)</span>
<span class="p">((</span><span class="n">acc</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">some-other-password</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">deposit</span><span class="p">)</span><span class="w"> </span><span class="mi">50</span><span class="p">)</span>
<span class="p">((</span><span class="n">acc</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">some-other-password</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">deposit</span><span class="p">)</span><span class="w"> </span><span class="mi">50</span><span class="p">)</span>
<span class="c1">;&quot;Incorrect password&quot;</span>
</pre></div>
<div class="code-output">
<span>Output:</span>
<pre>60
&quot;Incorrect Password&quot;
&quot;Incorrect Password&quot;
&quot;Incorrect Password&quot;
&quot;Incorrect Password&quot;
&quot;Incorrect Password&quot;
&quot;Incorrect Password&quot;
&quot;Incorrect Password&quot;
&gt;:( cops called
&quot;N/A&quot;
</pre>
</div>
</div>


#### Exercise 3.5

Monte Carlo integration
is a method of estimating definite integrals by means of Monte Carlo
simulation.  Consider computing the area of a region of space described by a
predicate $P(x, y)$ that is true for points $(x, y)$ in the
region and false for points not in the region.  For example, the region
contained within a circle of radius 3 centered at (5, 7) is described by the
predicate that tests whether ${(x - 5)^2 + {(y - 7)^2 \le 3^2}}$.  To estimate
the area of the region described by such a predicate, begin by choosing a
rectangle that contains the region.  For example, a rectangle with diagonally
opposite corners at (2, 4) and (8, 10) contains the circle above.  The desired
integral is the area of that portion of the rectangle that lies in the region.
We can estimate the integral by picking, at random, points $(x, y)$ that
lie in the rectangle, and testing $P(x, y)$ for each point to
determine whether the point lies in the region.  If we try this with many
points, then the fraction of points that fall in the region should give an
estimate of the proportion of the rectangle that lies in the region.  Hence,
multiplying this fraction by the area of the entire rectangle should produce an
estimate of the integral.

Implement Monte Carlo integration as a procedure `estimate-integral` that
takes as arguments a predicate `P`, upper and lower bounds `x1`,
`x2`, `y1`, and `y2` for the rectangle, and the number of trials
to perform in order to produce the estimate.  Your procedure should use the
same `monte-carlo` procedure that was used above to estimate $\pi$.
Use your `estimate-integral` to produce an estimate of $\pi$ by
measuring the area of a unit circle.

You will find it useful to have a procedure that returns a number chosen at
random from a given range.  The following `random-in-range` procedure
implements this in terms of the `random` procedure used in 
1.2.6, which returns a nonnegative number less than its
input.

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">random-in-range</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="n">high</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="nb">range</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">high</span><span class="w"> </span><span class="n">low</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="p">(</span><span class="nb">random</span><span class="w"> </span><span class="nb">range</span><span class="p">))))</span>
</pre></div>

##### Solution

<div class="code-box" markdown="1">
<div class="code-header"><a href="code/ex3-5.rkt">code/ex3-5.rkt</a></div>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">RAND-MAX</span><span class="w"> </span><span class="mi">2147483647</span><span class="p">)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">random-float</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="n">high</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="nb">range</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">high</span><span class="w"> </span><span class="n">low</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="nb">range</span><span class="w"> </span><span class="p">(</span><span class="nb">/</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="mf">1.0</span><span class="w"> </span><span class="p">(</span><span class="nb">random</span><span class="w"> </span><span class="n">RAND-MAX</span><span class="p">)</span><span class="w"> </span><span class="p">)</span><span class="w"> </span><span class="n">RAND-MAX</span><span class="p">)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">estimate-integral</span><span class="w"> </span><span class="n">P</span><span class="w"> </span><span class="n">x1</span><span class="w"> </span><span class="n">x2</span><span class="w"> </span><span class="n">y1</span><span class="w"> </span><span class="n">y2</span><span class="w"> </span><span class="n">ntrials</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">e-inner</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="n">estimate</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">&lt;</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span><span class="w"> </span>
<span class="w">      </span><span class="n">estimate</span>
<span class="w">      </span><span class="p">(</span><span class="n">e-inner</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span><span class="w"> </span>
<span class="w">               </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">estimate</span><span class="w"> </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">P</span><span class="w"> </span><span class="p">(</span><span class="n">random-float</span><span class="w"> </span><span class="n">x1</span><span class="w"> </span><span class="n">x2</span><span class="p">)</span>
<span class="w">                      </span><span class="p">(</span><span class="n">random-float</span><span class="w"> </span><span class="n">y1</span><span class="w"> </span><span class="n">y2</span><span class="p">))</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">0</span><span class="p">)))))</span>
<span class="w">  </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="p">(</span><span class="nb">/</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="mf">1.0</span><span class="w"> </span><span class="p">(</span><span class="n">e-inner</span><span class="w"> </span><span class="n">ntrials</span><span class="w"> </span><span class="mi">0</span><span class="p">))</span><span class="w"> </span><span class="n">ntrials</span><span class="p">)</span>
<span class="w">     </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">x2</span><span class="w"> </span><span class="n">x1</span><span class="p">)</span>
<span class="w">     </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">y2</span><span class="w"> </span><span class="n">y1</span><span class="p">)))</span>


<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">square</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="p">(</span><span class="n">estimate-integral</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="w"> </span><span class="n">y</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">&lt;</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="p">(</span><span class="n">square</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">square</span><span class="w"> </span><span class="n">y</span><span class="p">))</span><span class="w"> </span><span class="mi">1</span><span class="p">))</span>
<span class="w">  </span><span class="mi">-1</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">-1</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">1000000</span><span class="p">)</span>
</pre></div>
<div class="code-output">
<span>Output:</span>
<pre>3.143016
</pre>
</div>
</div>


#### Exercise 3.6

It is useful to be able to reset a
random-number generator to produce a sequence starting from a given value.
Design a new `rand` procedure that is called with an argument that is
either the symbol `generate` or the symbol `reset` and behaves as
follows: `(rand 'generate)` produces a new random number; `((rand
'reset) ⟨new-value⟩)` resets the internal state variable to the
designated `⟨new-value⟩`.  Thus, by resetting the state, one can generate
repeatable sequences.  These are very handy to have when testing and debugging
programs that use random numbers.

##### Solution

<div class="code-box" markdown="1">
<div class="code-header"><a href="code/ex3-6.rkt">code/ex3-6.rkt</a></div>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">A</span><span class="w"> </span><span class="mi">1664525</span><span class="p">)</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">B</span><span class="w"> </span><span class="mi">1013904223</span><span class="p">)</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">C</span><span class="w"> </span><span class="mi">4294967296</span><span class="p">)</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">random-init</span><span class="w"> </span><span class="mi">1000000</span><span class="p">)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">rand-update</span><span class="w"> </span><span class="n">arg</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">remainder</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">A</span><span class="w"> </span><span class="n">arg</span><span class="p">)</span><span class="w"> </span><span class="n">B</span><span class="p">)</span><span class="w"> </span><span class="n">C</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">rand</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">x</span><span class="w"> </span><span class="n">random-init</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">m</span><span class="p">)</span><span class="w"> </span>
<span class="w">      </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">m</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">generate</span><span class="p">)</span>
<span class="w">             </span><span class="p">(</span><span class="k">set!</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="p">(</span><span class="n">rand-update</span><span class="w"> </span><span class="n">x</span><span class="p">))</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">            </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">m</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">reset</span><span class="p">)</span>
<span class="w">             </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">arg</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="k">set!</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">arg</span><span class="p">)))</span>
<span class="w">            </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;invalid message&quot;</span><span class="w"> </span><span class="n">m</span><span class="p">))))))</span>


<span class="p">(</span><span class="n">rand</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">generate</span><span class="p">)</span>
<span class="p">(</span><span class="n">rand</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">generate</span><span class="p">)</span>
<span class="p">(</span><span class="n">rand</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">generate</span><span class="p">)</span>
<span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;Resetting&quot;</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="p">((</span><span class="n">rand</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">reset</span><span class="p">)</span><span class="w"> </span><span class="mi">12345</span><span class="p">)</span>
<span class="p">(</span><span class="n">rand</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">generate</span><span class="p">)</span>
<span class="p">(</span><span class="n">rand</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">generate</span><span class="p">)</span>
<span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;Resetting&quot;</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="p">((</span><span class="n">rand</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">reset</span><span class="p">)</span><span class="w"> </span><span class="mi">12345</span><span class="p">)</span>
<span class="p">(</span><span class="n">rand</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">generate</span><span class="p">)</span>
<span class="p">(</span><span class="n">rand</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">generate</span><span class="p">)</span>
</pre></div>
<div class="code-output">
<span>Output:</span>
<pre>3386560671
187819378
394593833
Resetting
87628868
71072467
Resetting
87628868
71072467
</pre>
</div>
</div>


#### Exercise 3.7

Consider the bank account objects
created by `make-account`, with the password modification described in
Exercise 3.3.  Suppose that our banking system requires the ability to
make joint accounts.  Define a procedure `make-joint` that accomplishes
this.  `Make-joint` should take three arguments.  The first is a
password-protected account.  The second argument must match the password with
which the account was defined in order for the `make-joint` operation to
proceed.  The third argument is a new password.  `Make-joint` is to create
an additional access to the original account using the new password.  For
example, if `peter-acc` is a bank account with password
`open-sesame`, then

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">paul-acc</span>
<span class="w">  </span><span class="p">(</span><span class="n">make-joint</span><span class="w"> </span><span class="n">peter-acc</span><span class="w"> </span>
<span class="w">              </span><span class="o">&#39;</span><span class="ss">open-sesame</span><span class="w"> </span>
<span class="w">              </span><span class="o">&#39;</span><span class="ss">rosebud</span><span class="p">))</span>
</pre></div>


will allow one to make transactions on `peter-acc` using the name
`paul-acc` and the password `rosebud`.  You may wish to modify your
solution to Exercise 3.3 to accommodate this new feature.

##### Solution

<div class="code-box" markdown="1">
<div class="code-header"><a href="code/ex3-7.rkt">code/ex3-7.rkt</a></div>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-account</span><span class="w"> </span><span class="n">balance</span><span class="w"> </span><span class="n">pw</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">withdraw</span><span class="w"> </span><span class="n">amount</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">&gt;=</span><span class="w"> </span><span class="n">balance</span><span class="w"> </span><span class="n">amount</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="k">begin</span><span class="w"> </span><span class="p">(</span><span class="k">set!</span><span class="w"> </span><span class="n">balance</span>
<span class="w">                     </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">balance</span><span class="w"> </span><span class="n">amount</span><span class="p">))</span>
<span class="w">               </span><span class="n">balance</span><span class="p">)</span>
<span class="w">        </span><span class="s2">&quot;Insufficient funds&quot;</span><span class="p">))</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">deposit</span><span class="w"> </span><span class="n">amount</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">set!</span><span class="w"> </span><span class="n">balance</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">balance</span><span class="w"> </span><span class="n">amount</span><span class="p">))</span>
<span class="w">    </span><span class="n">balance</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">errorfunc</span><span class="w"> </span><span class="o">.</span><span class="w"> </span><span class="n">args</span><span class="p">)</span><span class="w"> </span>
<span class="w">    </span><span class="s2">&quot;Incorrect Password&quot;</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">dispatch</span><span class="w"> </span><span class="n">pw-arg</span><span class="w"> </span><span class="n">m</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="nb">eq?</span><span class="w"> </span><span class="n">pw</span><span class="w"> </span><span class="n">pw-arg</span><span class="p">))</span><span class="w"> </span><span class="n">errorfunc</span><span class="p">)</span>
<span class="w">          </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">m</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">withdraw</span><span class="p">)</span><span class="w"> </span><span class="n">withdraw</span><span class="p">)</span>
<span class="w">          </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">m</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">deposit</span><span class="p">)</span><span class="w"> </span><span class="n">deposit</span><span class="p">)</span>
<span class="w">          </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;Unknown request:</span>
<span class="s2">                 MAKE-ACCOUNT&quot;</span><span class="w"> </span><span class="n">m</span><span class="p">))))</span>
<span class="w">  </span><span class="n">dispatch</span><span class="p">)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-joint</span><span class="w"> </span><span class="n">orig-account</span><span class="w"> </span><span class="n">orig-password</span><span class="w"> </span><span class="n">new-password</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">pw-arg</span><span class="w"> </span><span class="n">m</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">eq?</span><span class="w"> </span><span class="n">pw-arg</span><span class="w"> </span><span class="n">new-password</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="n">orig-account</span><span class="w"> </span><span class="n">orig-password</span><span class="w"> </span><span class="n">m</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="n">args</span><span class="w"> </span><span class="s2">&quot;Incorrect password&quot;</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">peter-acc</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="n">make-account</span><span class="w"> </span><span class="mi">100</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">peter-password</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">paul-acc</span>
<span class="w">  </span><span class="p">(</span><span class="n">make-joint</span><span class="w"> </span><span class="n">peter-acc</span><span class="w"> </span>
<span class="w">              </span><span class="o">&#39;</span><span class="ss">peter-password</span><span class="w"> </span>
<span class="w">              </span><span class="o">&#39;</span><span class="ss">paul-password</span><span class="p">))</span>

<span class="p">((</span><span class="n">peter-acc</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">peter-password</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">withdraw</span><span class="p">)</span><span class="w"> </span><span class="mi">10</span><span class="p">)</span>
<span class="c1">;; 90</span>

<span class="p">((</span><span class="n">paul-acc</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">paul-password</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">withdraw</span><span class="p">)</span><span class="w"> </span><span class="mi">10</span><span class="p">)</span>
<span class="c1">;; 80</span>

<span class="p">((</span><span class="n">paul-acc</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">peter-password</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">withdraw</span><span class="p">)</span><span class="w"> </span><span class="mi">10</span><span class="p">)</span>
<span class="c1">;; &quot;Incorrect password&quot;</span>
</pre></div>
<div class="code-output">
<span>Output:</span>
<pre>90
80
&quot;Incorrect password&quot;
</pre>
</div>
</div>


#### Exercise 3.8

When we defined the evaluation
model in 1.1.3, we said that the first step in evaluating an
expression is to evaluate its subexpressions.  But we never specified the order
in which the subexpressions should be evaluated (e.g., left to right or right
to left).  When we introduce assignment, the order in which the arguments to a
procedure are evaluated can make a difference to the result.  Define a simple
procedure `f` such that evaluating 

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="p">(</span><span class="n">f</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">f</span><span class="w"> </span><span class="mi">1</span><span class="p">))</span>
</pre></div>


will return 0 if
the arguments to `+` are evaluated from left to right but will return 1 if
the arguments are evaluated from right to left.

##### Solution

<div class="code-box" markdown="1">
<div class="code-header"><a href="code/ex3-8.rkt">code/ex3-8.rkt</a></div>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">my-num</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">f</span><span class="w"> </span><span class="n">a</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">prev</span><span class="w"> </span><span class="n">my-num</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="k">begin</span><span class="w"> </span><span class="p">(</span><span class="k">set!</span><span class="w"> </span><span class="n">my-num</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">my-num</span><span class="w"> </span><span class="n">a</span><span class="p">))</span><span class="w"> </span>
<span class="w">      </span><span class="n">prev</span><span class="p">)))</span>
<span class="c1">;; Default evaluation</span>
<span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="p">(</span><span class="n">f</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">f</span><span class="w"> </span><span class="mi">1</span><span class="p">))</span>

<span class="c1">;; Forcing things to evaluate the opposite order</span>
<span class="p">(</span><span class="k">set!</span><span class="w"> </span><span class="n">my-num</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span>
<span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">sec</span><span class="w"> </span><span class="p">(</span><span class="n">f</span><span class="w"> </span><span class="mi">1</span><span class="p">))</span>
<span class="w">      </span><span class="p">(</span><span class="n">fir</span><span class="w"> </span><span class="p">(</span><span class="n">f</span><span class="w"> </span><span class="mi">0</span><span class="p">)))</span>
<span class="w">  </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">fir</span><span class="w"> </span><span class="n">sec</span><span class="p">))</span>
</pre></div>
<div class="code-output">
<span>Output:</span>
<pre>0
1
</pre>
</div>
</div>


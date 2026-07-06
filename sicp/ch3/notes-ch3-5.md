---
layout: sicp
render_with_liquid: false
title: SICP Chapter 3.5
---

<div class="nav">
    <span class="activenav"><a href="notes-ch3-4.html">← Previous</a></span>
    <span class="activenav"><a href="../index.html">↑ Up</a></span>
    <span class="activenav"><a href="../ch4/notes-ch4-1.html">Next →</a></span>
</div>

[HTML Book Chapter 3.5 Link](https://sarabander.github.io/sicp/html/3_002e5.xhtml#g_t3_002e5)

## Directory
- [Section 3.5](#section-35)
  - [Examples and Notes](#examples-and-notes)
  - [Exercises](#exercises)
    - *Exercises:* ([Exercise 3.50](#exercise-350), [Exercise 3.51](#exercise-351), [Exercise 3.52](#exercise-352), [Exercise 3.53](#exercise-353), [Exercise 3.54](#exercise-354), [Exercise 3.55](#exercise-355), [Exercise 3.56](#exercise-356), [Exercise 3.57](#exercise-357), [Exercise 3.58](#exercise-358), [Exercise 3.59](#exercise-359), [Exercise 3.60](#exercise-360), [Exercise 3.61](#exercise-361), [Exercise 3.62](#exercise-362), [Exercise 3.63](#exercise-363), [Exercise 3.64](#exercise-364), [Exercise 3.65](#exercise-365), [Exercise 3.66](#exercise-366), [Exercise 3.67](#exercise-367), [Exercise 3.68](#exercise-368), [Exercise 3.69](#exercise-369), [Exercise 3.70](#exercise-370), [Exercise 3.71](#exercise-371), [Exercise 3.72](#exercise-372), [Exercise 3.73](#exercise-373), [Exercise 3.74](#exercise-374), [Exercise 3.75](#exercise-375), [Exercise 3.76](#exercise-376), [Exercise 3.77](#exercise-377), [Exercise 3.78](#exercise-378), [Exercise 3.79](#exercise-379), [Exercise 3.80](#exercise-380), [Exercise 3.81](#exercise-381), [Exercise 3.82](#exercise-382))

## Section 3.5

### Examples and Notes

<div class="code-box" markdown="1">
<details class="collapsible-code">
<summary class="code-summary"><a href="code/example-3-5-1.rkt">code/example-3-5-1.rkt</a> <span class="expand-hint">(click to expand)</span></summary>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="c1">;; Library functions</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">accumulate</span><span class="w"> </span><span class="n">op</span><span class="w"> </span><span class="n">initial</span><span class="w"> </span><span class="n">sequence</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="n">sequence</span><span class="p">)</span>
<span class="w">      </span><span class="n">initial</span>
<span class="w">      </span><span class="p">(</span><span class="n">op</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">sequence</span><span class="p">)</span>
<span class="w">          </span><span class="p">(</span><span class="n">accumulate</span><span class="w"> </span><span class="n">op</span>
<span class="w">                      </span><span class="n">initial</span>
<span class="w">                      </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">sequence</span><span class="p">)))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">filter</span><span class="w"> </span><span class="n">predicate</span><span class="w"> </span><span class="n">sequence</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">null?</span><span class="w"> </span><span class="n">sequence</span><span class="p">)</span><span class="w"> </span><span class="n">nil</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="n">predicate</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">sequence</span><span class="p">))</span>
<span class="w">         </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">sequence</span><span class="p">)</span>
<span class="w">               </span><span class="p">(</span><span class="nb">filter</span><span class="w"> </span><span class="n">predicate</span>
<span class="w">                       </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">sequence</span><span class="p">))))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w">  </span><span class="p">(</span><span class="nb">filter</span><span class="w"> </span><span class="n">predicate</span>
<span class="w">                       </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">sequence</span><span class="p">)))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">smallest-divisor</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">find-divisor</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">2</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">square</span><span class="w"> </span><span class="n">n</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="n">n</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">find-divisor</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="n">test-divisor</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">&gt;</span><span class="w"> </span><span class="p">(</span><span class="n">square</span><span class="w"> </span><span class="n">test-divisor</span><span class="p">)</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">         </span><span class="n">n</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="n">divides?</span><span class="w"> </span><span class="n">test-divisor</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">         </span><span class="n">test-divisor</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="n">find-divisor</span>
<span class="w">               </span><span class="n">n</span>
<span class="w">               </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">test-divisor</span><span class="w"> </span><span class="mi">1</span><span class="p">)))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">divides?</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="p">(</span><span class="nb">remainder</span><span class="w"> </span><span class="n">b</span><span class="w"> </span><span class="n">a</span><span class="p">)</span><span class="w"> </span><span class="mi">0</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">prime?</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="p">(</span><span class="n">smallest-divisor</span><span class="w"> </span><span class="n">n</span><span class="p">)))</span>



<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">enumerate-interval</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="n">high</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">&gt;</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="n">high</span><span class="p">)</span>
<span class="w">      </span><span class="n">nil</span>
<span class="w">      </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">low</span><span class="w"> </span>
<span class="w">            </span><span class="p">(</span><span class="n">enumerate-interval</span><span class="w"> </span>
<span class="w">             </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span><span class="w"> </span>
<span class="w">             </span><span class="n">high</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">sum-primes-1</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">iter</span><span class="w"> </span><span class="nb">count</span><span class="w"> </span><span class="n">accum</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">&gt;</span><span class="w"> </span><span class="nb">count</span><span class="w"> </span><span class="n">b</span><span class="p">)</span><span class="w"> </span><span class="n">accum</span><span class="p">)</span>
<span class="w">          </span><span class="p">((</span><span class="n">prime?</span><span class="w"> </span><span class="nb">count</span><span class="p">)</span>
<span class="w">           </span><span class="p">(</span><span class="n">iter</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="nb">count</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span>
<span class="w">                 </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="nb">count</span><span class="w"> </span><span class="n">accum</span><span class="p">)))</span>
<span class="w">          </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="n">iter</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="nb">count</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span><span class="w"> </span><span class="n">accum</span><span class="p">))))</span>
<span class="w">  </span><span class="p">(</span><span class="n">iter</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="mi">0</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">sum-primes-2</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">accumulate</span>
<span class="w">   </span><span class="nb">+</span>
<span class="w">   </span><span class="mi">0</span>
<span class="w">   </span><span class="p">(</span><span class="nb">filter</span><span class="w"> </span><span class="n">prime?</span><span class="w"> </span><span class="p">(</span><span class="n">enumerate-interval</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="p">))))</span>


<span class="p">(</span><span class="n">sum-primes-1</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">1000</span><span class="p">)</span>
<span class="p">(</span><span class="n">sum-primes-2</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">1000</span><span class="p">)</span>
</pre></div>

</details>
<div class="code-output">
<span>Output:</span>
<pre>76128
76128
</pre>
</div>
</div>


<div class="code-box" markdown="1">
<div class="code-header"><a href="code/example-3-5-2.rkt">code/example-3-5-2.rkt</a></div>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">str</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="p">(</span><span class="k">delay</span><span class="w"> </span><span class="mi">2</span><span class="p">)))</span>

<span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">str</span><span class="p">)</span>

<span class="p">(</span><span class="nb">force</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">str</span><span class="p">))</span>

<span class="c1">;; This gives an error:</span>
<span class="c1">;; ((cdr str))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="k">stream</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">force</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)))</span>
<span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">2</span><span class="p">))</span>
<span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">2</span><span class="p">))</span>
</pre></div>
<div class="code-output">
<span>Output:</span>
<pre>1
2
1
2
</pre>
</div>
</div>


<div class="code-box" markdown="1">
<div class="code-header"><a href="code/example-3-5-3.rkt">code/example-3-5-3.rkt</a></div>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="k">stream</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">force</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-enumerate-interval</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="n">high</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">&gt;</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="n">high</span><span class="p">)</span>
<span class="w">      </span><span class="n">the-empty-stream</span>
<span class="w">      </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">       </span><span class="n">low</span>
<span class="w">       </span><span class="p">(</span><span class="n">stream-enumerate-interval</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span>
<span class="w">                                  </span><span class="n">high</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-enumerate-odds</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="n">high</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">&gt;</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="n">high</span><span class="p">)</span><span class="w"> </span><span class="n">the-empty-stream</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="nb">=</span><span class="w"> </span><span class="p">(</span><span class="nb">remainder</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="mi">2</span><span class="p">)</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span>
<span class="w">         </span><span class="p">(</span><span class="n">stream-enumerate-interval</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span><span class="w"> </span><span class="n">high</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span>
<span class="w">         </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">          </span><span class="n">low</span>
<span class="w">          </span><span class="p">(</span><span class="n">stream-enumerate-interval</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="mi">2</span><span class="p">)</span>
<span class="w">                                     </span><span class="n">high</span><span class="p">)))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-enumerate-evens</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="n">high</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">&gt;</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="n">high</span><span class="p">)</span><span class="w"> </span><span class="n">the-empty-stream</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="nb">=</span><span class="w"> </span><span class="p">(</span><span class="nb">remainder</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="mi">2</span><span class="p">)</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span>
<span class="w">         </span><span class="p">(</span><span class="n">stream-enumerate-interval</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span><span class="w"> </span><span class="n">high</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span>
<span class="w">         </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">          </span><span class="n">low</span>
<span class="w">          </span><span class="p">(</span><span class="n">stream-enumerate-interval</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="mi">2</span><span class="p">)</span>
<span class="w">                                     </span><span class="n">high</span><span class="p">)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-for-each</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">      </span><span class="o">&#39;</span><span class="ss">done</span>
<span class="w">      </span><span class="p">(</span><span class="k">begin</span>
<span class="w">        </span><span class="p">(</span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="nb">stream-for-each</span><span class="w"> </span><span class="n">proc</span>
<span class="w">                         </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">display-stream</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-for-each</span><span class="w"> </span><span class="n">display-line</span><span class="w"> </span><span class="n">s</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>

<span class="p">(</span><span class="n">display-stream</span><span class="w"> </span><span class="p">(</span><span class="n">stream-enumerate-interval</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">6</span><span class="p">))</span>


<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-ref</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="nb">stream-ref</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">      </span><span class="n">the-empty-stream</span>
<span class="w">      </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">       </span><span class="p">(</span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">))</span>
<span class="w">       </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)))))</span>


<span class="c1">;; (stream-car </span>
<span class="c1">;;  (stream-cdr</span>
<span class="c1">;;   (stream-filter </span>
<span class="c1">;;    prime? (stream-enumerate-interval </span>
<span class="c1">;;            10000 1000000))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-filter</span><span class="w"> </span><span class="n">pred</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="n">stream-null?</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span>
<span class="w">         </span><span class="n">the-empty-stream</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="n">pred</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="k">stream</span><span class="p">))</span>
<span class="w">         </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">          </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span>
<span class="w">          </span><span class="p">(</span><span class="nb">stream-filter</span>
<span class="w">           </span><span class="n">pred</span>
<span class="w">           </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">))))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-filter</span>
<span class="w">               </span><span class="n">pred</span>
<span class="w">               </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)))))</span>


<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="o">.</span><span class="w"> </span><span class="n">argstreams</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">⟨??⟩</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))</span>
<span class="w">      </span><span class="n">the-empty-stream</span>
<span class="w">      </span><span class="p">(</span><span class="n">⟨??⟩</span>
<span class="w">       </span><span class="p">(</span><span class="nb">apply</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="n">⟨??⟩</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))</span>
<span class="w">       </span><span class="p">(</span><span class="nb">apply</span><span class="w"> </span><span class="nb">stream-map</span>
<span class="w">              </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">proc</span>
<span class="w">                    </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="n">⟨??⟩</span>
<span class="w">                         </span><span class="n">argstreams</span><span class="p">))))))</span>
</pre></div>
<div class="code-output">
<span>Output:</span>
<pre>example-3-5-3.rkt:85:9: module: identifier already defined
  at: stream-map
  in: (define-values (stream-map) (r5rs:lambda (proc . argstreams) (if (⟨??⟩ (car argstreams)) the-empty-stream (⟨??⟩ (apply proc (map ⟨??⟩ argstreams)) (apply stream-map (cons proc (map ⟨??⟩ argstreams)))))))
  location...:
   example-3-5-3.rkt:85:9
</pre>
</div>
</div>


Note to self: I had a half-thought-out concern about the caching. In the solution
to 3.55:

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">partial-sums</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="mi">0</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-streams</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="p">(</span><span class="n">partial-sums</span><span class="w"> </span><span class="n">s</span><span class="p">))))</span>
</pre></div>

I'd be concerned that if `(partial-sums s)` created a new stream with new 
cached values at every step, that we wouldn't get the additive behavior we want?
Does this make any sense? Can I replicate and understand this with just lambdas?

### Exercises

#### Exercise 3.50

Complete the following
definition, which generalizes `stream-map` to allow procedures that take
multiple arguments, analogous to `map` in 2.2.1, 
Footnote 78.

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="o">.</span><span class="w"> </span><span class="n">argstreams</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">⟨??⟩</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))</span>
<span class="w">      </span><span class="n">the-empty-stream</span>
<span class="w">      </span><span class="p">(</span><span class="n">⟨??⟩</span>
<span class="w">       </span><span class="p">(</span><span class="nb">apply</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="n">⟨??⟩</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))</span>
<span class="w">       </span><span class="p">(</span><span class="nb">apply</span><span class="w"> </span><span class="nb">stream-map</span>
<span class="w">              </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span>
<span class="w">                    </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="n">⟨??⟩</span><span class="w"> </span>
<span class="w">                         </span><span class="n">argstreams</span><span class="p">))))))</span>
</pre></div>

##### Solution

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="o">.</span><span class="w"> </span><span class="n">argstreams</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))</span>
<span class="w">      </span><span class="n">the-empty-stream</span>
<span class="w">      </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">       </span><span class="p">(</span><span class="nb">apply</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="n">stream-car</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))</span>
<span class="w">       </span><span class="p">(</span><span class="nb">apply</span><span class="w"> </span><span class="nb">stream-map</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))))))</span>

<span class="c1">;; Enumerate every other triangular number</span>
<span class="c1">;; ie every other entry from the sequence  </span>
<span class="c1">;; 1, 3, 6, 10, 15, 21, 28, 36, 45, 55, ... n*(n+1)/2</span>
<span class="p">(</span><span class="n">display-stream</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span>
<span class="w">   </span><span class="nb">*</span><span class="w"> </span>
<span class="w">   </span><span class="p">(</span><span class="n">stream-enumerate-evens</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">10</span><span class="p">)</span>
<span class="w">   </span><span class="p">(</span><span class="n">stream-enumerate-odds</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">10</span><span class="p">)</span>
<span class="w">   </span><span class="p">(</span><span class="n">stream-enumerate-constant</span><span class="w"> </span><span class="m">1/2</span><span class="w"> </span><span class="mi">5</span><span class="p">)))</span>
</pre></div>

<div class="code-box" markdown="1">
<details class="collapsible-code">
<summary class="code-summary"><a href="code/ex3-50.rkt">code/ex3-50.rkt</a> <span class="expand-hint">(click to expand)</span></summary>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>


<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="k">stream</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">force</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-enumerate-interval</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="n">high</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">&gt;</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="n">high</span><span class="p">)</span>
<span class="w">      </span><span class="n">the-empty-stream</span>
<span class="w">      </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">       </span><span class="n">low</span>
<span class="w">       </span><span class="p">(</span><span class="n">stream-enumerate-interval</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span>
<span class="w">                                  </span><span class="n">high</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-enumerate-odds</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="n">high</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">&gt;</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="n">high</span><span class="p">)</span><span class="w"> </span><span class="n">the-empty-stream</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="nb">=</span><span class="w"> </span><span class="p">(</span><span class="nb">remainder</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="mi">2</span><span class="p">)</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span>
<span class="w">         </span><span class="p">(</span><span class="n">stream-enumerate-odds</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span><span class="w"> </span><span class="n">high</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span>
<span class="w">         </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">          </span><span class="n">low</span>
<span class="w">          </span><span class="p">(</span><span class="n">stream-enumerate-odds</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="mi">2</span><span class="p">)</span>
<span class="w">                                     </span><span class="n">high</span><span class="p">)))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-enumerate-evens</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="n">high</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">&gt;</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="n">high</span><span class="p">)</span><span class="w"> </span><span class="n">the-empty-stream</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="nb">=</span><span class="w"> </span><span class="p">(</span><span class="nb">remainder</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="mi">2</span><span class="p">)</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span>
<span class="w">         </span><span class="p">(</span><span class="n">stream-enumerate-evens</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span><span class="w"> </span><span class="n">high</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span>
<span class="w">         </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">          </span><span class="n">low</span>
<span class="w">          </span><span class="p">(</span><span class="n">stream-enumerate-evens</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="mi">2</span><span class="p">)</span>
<span class="w">                                     </span><span class="n">high</span><span class="p">)))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-enumerate-constant</span><span class="w"> </span><span class="n">c</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span><span class="w"> </span>
<span class="w">    </span><span class="n">the-empty-stream</span>
<span class="w">    </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">     </span><span class="n">c</span>
<span class="w">     </span><span class="p">(</span><span class="n">stream-enumerate-constant</span><span class="w"> </span><span class="n">c</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-for-each</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">      </span><span class="o">&#39;</span><span class="ss">done</span>
<span class="w">      </span><span class="p">(</span><span class="k">begin</span>
<span class="w">        </span><span class="p">(</span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="nb">stream-for-each</span><span class="w"> </span><span class="n">proc</span>
<span class="w">                         </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">display-stream</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-for-each</span><span class="w"> </span><span class="n">display-line</span><span class="w"> </span><span class="n">s</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="o">.</span><span class="w"> </span><span class="n">argstreams</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))</span>
<span class="w">      </span><span class="n">the-empty-stream</span>
<span class="w">      </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">       </span><span class="p">(</span><span class="nb">apply</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="n">stream-car</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))</span>
<span class="w">       </span><span class="p">(</span><span class="nb">apply</span><span class="w"> </span><span class="nb">stream-map</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))))))</span>

<span class="c1">; (display-stream (stream-enumerate-evens 1 6))</span>
<span class="c1">; (display-stream (stream-enumerate-odds 1 6))</span>
<span class="c1">; (display-stream (stream-enumerate-constant 1/2 6))</span>

<span class="p">(</span><span class="n">display-stream</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span>
<span class="w">   </span><span class="nb">*</span><span class="w"> </span>
<span class="w">   </span><span class="p">(</span><span class="n">stream-enumerate-evens</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">10</span><span class="p">)</span>
<span class="w">   </span><span class="p">(</span><span class="n">stream-enumerate-odds</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">10</span><span class="p">)</span>
<span class="w">   </span><span class="p">(</span><span class="n">stream-enumerate-constant</span><span class="w"> </span><span class="m">1/2</span><span class="w"> </span><span class="mi">5</span><span class="p">)))</span>
</pre></div>

</details>
<div class="code-output">
<span>Output:</span>
<pre>
1
6
15
28
45done
</pre>
</div>
</div>



***Note*** I wrote a really really bad definition of stream-map on a first pass!!!
The following definition has major issues because `rest` is evaluated immediately. 
In fact it *has* to be inside cons-stream (where the second argument is delayed)
to avoid infinite recursion in scenarios like in problem 3.53.

<div class="codehilite"><pre><span></span><span class="c1">;; bad awful definition of stream-map</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="o">.</span><span class="w"> </span><span class="n">argstreams</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))</span>
<span class="w">      </span><span class="n">the-empty-stream</span>
<span class="w">      </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">args</span><span class="w"> </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="n">stream-car</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))</span>
<span class="w">            </span><span class="p">(</span><span class="nb">rest</span><span class="w"> </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">argstreams</span><span class="p">)))</span>
<span class="w">        </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">         </span><span class="p">(</span><span class="nb">apply</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="n">args</span><span class="p">)</span>
<span class="w">         </span><span class="p">(</span><span class="nb">apply</span><span class="w"> </span><span class="nb">stream-map</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="nb">rest</span><span class="p">))))))</span>
</pre></div>

#### Exercise 3.51

In order to take a closer look at
delayed evaluation, we will use the following procedure, which simply returns
its argument after printing it:

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">show</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="n">x</span><span class="p">)</span>
</pre></div>

What does the interpreter print in response to evaluating each expression in
the following sequence?

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">x</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span>
<span class="w">   </span><span class="n">show</span><span class="w"> </span>
<span class="w">   </span><span class="p">(</span><span class="n">stream-enumerate-interval</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="mi">10</span><span class="p">)))</span>

<span class="p">(</span><span class="nb">stream-ref</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="mi">5</span><span class="p">)</span>
<span class="p">(</span><span class="nb">stream-ref</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="mi">7</span><span class="p">)</span>
</pre></div>

##### Solution

Zero is printed right when we define x, 
because with our definitions the first element of the 
stream is computed right away.

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">show</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="n">x</span><span class="p">)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">x</span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-map</span>
<span class="w">   </span><span class="n">show</span>
<span class="w">   </span><span class="p">(</span><span class="n">stream-enumerate-interval</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="mi">10</span><span class="p">)))</span>
<span class="c1">; 0</span>
</pre></div>

Next, we compute stream-ref, and we print the following,
no surprises yet:
<div class="codehilite"><pre><span></span><span class="p">(</span><span class="nb">stream-ref</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="mi">5</span><span class="p">)</span>
<span class="c1">; 1</span>
<span class="c1">; 2</span>
<span class="c1">; 3</span>
<span class="c1">; 4</span>
<span class="c1">; 5 &lt;- from (newline) (display 5)</span>
<span class="c1">; 5 &lt;- from the output of the function</span>
</pre></div>

When we print 7, we find that only the results for elements
6 and 7 are printed, because all other entries have been 
memoized.

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="nb">stream-ref</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="mi">7</span><span class="p">)</span>
<span class="c1">; 6</span>
<span class="c1">; 7 &lt;- from (newline) (display 5)</span>
<span class="c1">; 7 &lt;- from the output of the function</span>
</pre></div>

<div class="code-box" markdown="1">
<details class="collapsible-code">
<summary class="code-summary"><a href="code/ex3-51.rkt">code/ex3-51.rkt</a> <span class="expand-hint">(click to expand)</span></summary>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="k">stream</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">force</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-enumerate-interval</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="n">high</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">&gt;</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="n">high</span><span class="p">)</span>
<span class="w">      </span><span class="n">the-empty-stream</span>
<span class="w">      </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">       </span><span class="n">low</span>
<span class="w">       </span><span class="p">(</span><span class="n">stream-enumerate-interval</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span>
<span class="w">                                  </span><span class="n">high</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-enumerate-odds</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="n">high</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">&gt;</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="n">high</span><span class="p">)</span><span class="w"> </span><span class="n">the-empty-stream</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="nb">=</span><span class="w"> </span><span class="p">(</span><span class="nb">remainder</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="mi">2</span><span class="p">)</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span>
<span class="w">         </span><span class="p">(</span><span class="n">stream-enumerate-odds</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span><span class="w"> </span><span class="n">high</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span>
<span class="w">         </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">          </span><span class="n">low</span>
<span class="w">          </span><span class="p">(</span><span class="n">stream-enumerate-odds</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="mi">2</span><span class="p">)</span>
<span class="w">                                     </span><span class="n">high</span><span class="p">)))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-enumerate-evens</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="n">high</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">&gt;</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="n">high</span><span class="p">)</span><span class="w"> </span><span class="n">the-empty-stream</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="nb">=</span><span class="w"> </span><span class="p">(</span><span class="nb">remainder</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="mi">2</span><span class="p">)</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span>
<span class="w">         </span><span class="p">(</span><span class="n">stream-enumerate-evens</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span><span class="w"> </span><span class="n">high</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span>
<span class="w">         </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">          </span><span class="n">low</span>
<span class="w">          </span><span class="p">(</span><span class="n">stream-enumerate-evens</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="mi">2</span><span class="p">)</span>
<span class="w">                                     </span><span class="n">high</span><span class="p">)))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-enumerate-constant</span><span class="w"> </span><span class="n">c</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span><span class="w"> </span>
<span class="w">    </span><span class="n">the-empty-stream</span>
<span class="w">    </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">     </span><span class="n">c</span>
<span class="w">     </span><span class="p">(</span><span class="n">stream-enumerate-constant</span><span class="w"> </span><span class="n">c</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-for-each</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">      </span><span class="o">&#39;</span><span class="ss">done</span>
<span class="w">      </span><span class="p">(</span><span class="k">begin</span>
<span class="w">        </span><span class="p">(</span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="nb">stream-for-each</span><span class="w"> </span><span class="n">proc</span>
<span class="w">                         </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">display-stream</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-for-each</span><span class="w"> </span><span class="n">display-line</span><span class="w"> </span><span class="n">s</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-ref</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="nb">stream-ref</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="o">.</span><span class="w"> </span><span class="n">argstreams</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))</span>
<span class="w">      </span><span class="n">the-empty-stream</span>
<span class="w">      </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">       </span><span class="p">(</span><span class="nb">apply</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="n">stream-car</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))</span>
<span class="w">       </span><span class="p">(</span><span class="nb">apply</span><span class="w"> </span><span class="nb">stream-map</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))))))</span>

<span class="c1">; (display-stream (stream-enumerate-evens 1 6))</span>
<span class="c1">; (display-stream (stream-enumerate-odds 1 6))</span>
<span class="c1">; (display-stream (stream-enumerate-constant 1/2 6))</span>


<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">show</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="n">x</span><span class="p">)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">x</span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-map</span>
<span class="w">   </span><span class="n">show</span>
<span class="w">   </span><span class="p">(</span><span class="n">stream-enumerate-interval</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="mi">10</span><span class="p">)))</span>
<span class="c1">; 0</span>

<span class="p">(</span><span class="nb">stream-ref</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="mi">5</span><span class="p">)</span>
<span class="c1">; 1</span>
<span class="c1">; 2</span>
<span class="c1">; 3</span>
<span class="c1">; 4</span>
<span class="c1">; 5 &lt;- from (newline) (display 5)</span>
<span class="c1">; 5 &lt;- from the output of the function</span>
<span class="p">(</span><span class="nb">stream-ref</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="mi">7</span><span class="p">)</span>
<span class="c1">; 6</span>
<span class="c1">; 7 &lt;- from (newline) (display 5)</span>
<span class="c1">; 7 &lt;- from the output of the function</span>
</pre></div>

</details>
<div class="code-output">
<span>Output:</span>
<pre>
0
1
2
3
4
55

6
77
</pre>
</div>
</div>


#### Exercise 3.52

Consider the sequence of
expressions

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">sum</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">accum</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">set!</span><span class="w"> </span><span class="n">sum</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">sum</span><span class="p">))</span>
<span class="w">  </span><span class="n">sum</span><span class="p">)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">seq</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span>
<span class="w">   </span><span class="n">accum</span><span class="w"> </span>
<span class="w">   </span><span class="p">(</span><span class="n">stream-enumerate-interval</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">20</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">y</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-filter</span><span class="w"> </span><span class="nb">even?</span><span class="w"> </span><span class="n">seq</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">z</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-filter</span><span class="w"> </span>
<span class="w">   </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="p">)</span><span class="w"> </span>
<span class="w">     </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="p">(</span><span class="nb">remainder</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="mi">5</span><span class="p">)</span><span class="w"> </span><span class="mi">0</span><span class="p">))</span><span class="w"> </span><span class="n">seq</span><span class="p">))</span>

<span class="p">(</span><span class="nb">stream-ref</span><span class="w"> </span><span class="n">y</span><span class="w"> </span><span class="mi">7</span><span class="p">)</span>
<span class="p">(</span><span class="n">display-stream</span><span class="w"> </span><span class="n">z</span><span class="p">)</span>
</pre></div>

What is the value of `sum` after each of the above expressions is
evaluated?  What is the printed response to evaluating the `stream-ref`
and `display-stream` expressions?  Would these responses differ if we had
implemented `(delay ⟨exp⟩)` simply as `(lambda () ⟨exp⟩)`
without using the optimization provided by `memo-proc`?  Explain.

##### Solution

The evaluations would be very different if we didn't memoize. Each time we evaluate a term
using `stream-cdr`, we modify `sum`, and so if we wanted to regenerate the earlier portions of the list,
we'd have to reset `sum` to zero every time we did an operation.

With memoization we get the following:

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">sum</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">accum</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">set!</span><span class="w"> </span><span class="n">sum</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">sum</span><span class="p">))</span>
<span class="w">  </span><span class="n">sum</span><span class="p">)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">seq</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span>
<span class="w">   </span><span class="n">accum</span><span class="w"> </span>
<span class="w">   </span><span class="p">(</span><span class="n">stream-enumerate-interval</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">20</span><span class="p">)))</span>
<span class="c1">;; display stream would print:</span>
<span class="c1">;; 1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 66, 78, 91, 105, 120, 136, 153, 171, 190, 210</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">y</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-filter</span><span class="w"> </span><span class="nb">even?</span><span class="w"> </span><span class="n">seq</span><span class="p">))</span>
<span class="c1">;; Evens: 6, 10, 28, 36, 66, 78, 120, 136, 190, 210</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">z</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-filter</span><span class="w"> </span>
<span class="w">   </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="p">)</span><span class="w"> </span>
<span class="w">     </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="p">(</span><span class="nb">remainder</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="mi">5</span><span class="p">)</span><span class="w"> </span><span class="mi">0</span><span class="p">))</span><span class="w"> </span><span class="n">seq</span><span class="p">))</span>
<span class="c1">;; Divisible by 5: 10, 15, 45, 55, 105, 120, 190, 210</span>

<span class="p">(</span><span class="nb">stream-ref</span><span class="w"> </span><span class="n">y</span><span class="w"> </span><span class="mi">7</span><span class="p">)</span>
<span class="c1">;; 136, the seventh even triangular number</span>
<span class="p">(</span><span class="n">display-stream</span><span class="w"> </span><span class="n">z</span><span class="p">)</span>
<span class="c1">;; Prints 10, 15, 45, 55, 105, 120, 190, 210</span>
</pre></div>

<div class="code-box" markdown="1">
<details class="collapsible-code">
<summary class="code-summary"><a href="code/ex3-52.rkt">code/ex3-52.rkt</a> <span class="expand-hint">(click to expand)</span></summary>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="k">stream</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">force</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-enumerate-interval</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="n">high</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">&gt;</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="n">high</span><span class="p">)</span>
<span class="w">      </span><span class="n">the-empty-stream</span>
<span class="w">      </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">       </span><span class="n">low</span>
<span class="w">       </span><span class="p">(</span><span class="n">stream-enumerate-interval</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span>
<span class="w">                                  </span><span class="n">high</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-for-each</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">      </span><span class="o">&#39;</span><span class="ss">done</span>
<span class="w">      </span><span class="p">(</span><span class="k">begin</span>
<span class="w">        </span><span class="p">(</span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="nb">stream-for-each</span><span class="w"> </span><span class="n">proc</span>
<span class="w">                         </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">display-stream</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-for-each</span><span class="w"> </span><span class="n">display-line</span><span class="w"> </span><span class="n">s</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-ref</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="nb">stream-ref</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="o">.</span><span class="w"> </span><span class="n">argstreams</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))</span>
<span class="w">      </span><span class="n">the-empty-stream</span>
<span class="w">      </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">       </span><span class="p">(</span><span class="nb">apply</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="n">stream-car</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))</span>
<span class="w">       </span><span class="p">(</span><span class="nb">apply</span><span class="w"> </span><span class="nb">stream-map</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-filter</span><span class="w"> </span><span class="n">pred</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="n">stream-null?</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span>
<span class="w">         </span><span class="n">the-empty-stream</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="n">pred</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="k">stream</span><span class="p">))</span>
<span class="w">         </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">          </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span>
<span class="w">          </span><span class="p">(</span><span class="nb">stream-filter</span>
<span class="w">           </span><span class="n">pred</span>
<span class="w">           </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">))))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-filter</span>
<span class="w">               </span><span class="n">pred</span>
<span class="w">               </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">sum</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">accum</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">set!</span><span class="w"> </span><span class="n">sum</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">sum</span><span class="p">))</span>
<span class="w">  </span><span class="n">sum</span><span class="p">)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">seq</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span>
<span class="w">   </span><span class="n">accum</span><span class="w"> </span>
<span class="w">   </span><span class="p">(</span><span class="n">stream-enumerate-interval</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">20</span><span class="p">)))</span>
<span class="c1">;; 1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 66, 78, 91, 105, 120, 136, 153, 171, 190, 210</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">y</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-filter</span><span class="w"> </span><span class="nb">even?</span><span class="w"> </span><span class="n">seq</span><span class="p">))</span>
<span class="c1">;; Evens: 6, 10, 28, 36, 66, 78, 120, 136, 190, 210</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">z</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-filter</span><span class="w"> </span>
<span class="w">   </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="p">)</span><span class="w"> </span>
<span class="w">     </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="p">(</span><span class="nb">remainder</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="mi">5</span><span class="p">)</span><span class="w"> </span><span class="mi">0</span><span class="p">))</span><span class="w"> </span><span class="n">seq</span><span class="p">))</span>
<span class="c1">;; Divisible by 5: 10, 15, 45, 55, 105, 120, 190, 210</span>

<span class="p">(</span><span class="nb">stream-ref</span><span class="w"> </span><span class="n">y</span><span class="w"> </span><span class="mi">7</span><span class="p">)</span>
<span class="c1">;; 136, the seventh even triangular number</span>
<span class="p">(</span><span class="n">display-stream</span><span class="w"> </span><span class="n">z</span><span class="p">)</span>
<span class="c1">;; Prints 10, 15, 45, 55, 105, 120, 190, 210</span>
</pre></div>

</details>
<div class="code-output">
<span>Output:</span>
<pre>136

10
15
45
55
105
120
190
210done
</pre>
</div>
</div>


#### Exercise 3.53

Without running the program,
describe the elements of the stream defined by

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="p">(</span><span class="n">add-streams</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">s</span><span class="p">)))</span>
</pre></div>

##### Solution


`stream-car` of s trivially runs fine and returns 1. 

The interesting stuff is when we call 
`stream-cdr`. We do `force` to evaluate `add-streams`, this looks something like

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="n">add-streams</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="p">(</span><span class="n">add-streams</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">s</span><span class="p">))</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="p">(</span><span class="n">add-streams</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">s</span><span class="p">)))</span>
</pre></div>

We create a new stream which looks like this:

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">  </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">add-streams</span><span class="w"> </span>
<span class="w">    </span><span class="p">(</span><span class="n">add-streams</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-streams</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">s</span><span class="p">)))</span>
</pre></div>

We might expect this to give an infinite recursion, but in fact the second 
argument is delayed, and so doesn't evaluate. (if it evaluated, we'd be in trouble.)

Double checking by evaluating:

<div class="code-box" markdown="1">
<details class="collapsible-code">
<summary class="code-summary"><a href="code/ex3-53.rkt">code/ex3-53.rkt</a> <span class="expand-hint">(click to expand)</span></summary>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="k">stream</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">force</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-ref</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="nb">stream-ref</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="o">.</span><span class="w"> </span><span class="n">argstreams</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))</span>
<span class="w">      </span><span class="n">the-empty-stream</span>
<span class="w">      </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">       </span><span class="p">(</span><span class="nb">apply</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="n">stream-car</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))</span>
<span class="w">       </span><span class="p">(</span><span class="nb">apply</span><span class="w"> </span><span class="nb">stream-map</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">add-streams</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="nb">+</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="p">(</span><span class="n">add-streams</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">s</span><span class="p">)))</span>


<span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-ref</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="mi">0</span><span class="p">))</span>
<span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-ref</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="mi">1</span><span class="p">))</span>
<span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-ref</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="mi">2</span><span class="p">))</span>
<span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-ref</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="mi">3</span><span class="p">))</span>
<span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-ref</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="mi">4</span><span class="p">))</span>
<span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-ref</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="mi">5</span><span class="p">))</span>
</pre></div>

</details>
<div class="code-output">
<span>Output:</span>
<pre>
1
2
4
8
16
32</pre>
</div>
</div>


#### Exercise 3.54

Define a procedure
`mul-streams`, analogous to `add-streams`, that produces the
elementwise product of its two input streams.  Use this together with the
stream of `integers` to complete the following definition of the stream
whose $n^{\text{th}}$ element (counting from 0) is $n + 1$ factorial:

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">factorials</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="p">(</span><span class="n">mul-streams</span><span class="w"> </span><span class="n">⟨??⟩</span><span class="w"> </span><span class="n">⟨??⟩</span><span class="p">)))</span>
</pre></div>
##### Solution

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">mul-streams</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="nb">*</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">factorials</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="p">(</span><span class="n">mul-streams</span><span class="w"> </span><span class="n">integers</span><span class="w"> </span><span class="n">factorials</span><span class="p">)))</span>
</pre></div>

<div class="code-box" markdown="1">
<details class="collapsible-code">
<summary class="code-summary"><a href="code/ex3-54.rkt">code/ex3-54.rkt</a> <span class="expand-hint">(click to expand)</span></summary>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="k">stream</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">force</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-enumerate-interval</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="n">high</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">&gt;</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="n">high</span><span class="p">)</span>
<span class="w">      </span><span class="n">the-empty-stream</span>
<span class="w">      </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">       </span><span class="n">low</span>
<span class="w">       </span><span class="p">(</span><span class="n">stream-enumerate-interval</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span>
<span class="w">                                  </span><span class="n">high</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-enumerate-odds</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="n">high</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">&gt;</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="n">high</span><span class="p">)</span><span class="w"> </span><span class="n">the-empty-stream</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="nb">=</span><span class="w"> </span><span class="p">(</span><span class="nb">remainder</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="mi">2</span><span class="p">)</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span>
<span class="w">         </span><span class="p">(</span><span class="n">stream-enumerate-interval</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span><span class="w"> </span><span class="n">high</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span>
<span class="w">         </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">          </span><span class="n">low</span>
<span class="w">          </span><span class="p">(</span><span class="n">stream-enumerate-interval</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="mi">2</span><span class="p">)</span>
<span class="w">                                     </span><span class="n">high</span><span class="p">)))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-enumerate-evens</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="n">high</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">&gt;</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="n">high</span><span class="p">)</span><span class="w"> </span><span class="n">the-empty-stream</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="nb">=</span><span class="w"> </span><span class="p">(</span><span class="nb">remainder</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="mi">2</span><span class="p">)</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span>
<span class="w">         </span><span class="p">(</span><span class="n">stream-enumerate-interval</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span><span class="w"> </span><span class="n">high</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span>
<span class="w">         </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">          </span><span class="n">low</span>
<span class="w">          </span><span class="p">(</span><span class="n">stream-enumerate-interval</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="mi">2</span><span class="p">)</span>
<span class="w">                                     </span><span class="n">high</span><span class="p">)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-for-each</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">      </span><span class="o">&#39;</span><span class="ss">done</span>
<span class="w">      </span><span class="p">(</span><span class="k">begin</span>
<span class="w">        </span><span class="p">(</span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="nb">stream-for-each</span><span class="w"> </span><span class="n">proc</span>
<span class="w">                         </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">display-stream</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-for-each</span><span class="w"> </span><span class="n">display-line</span><span class="w"> </span><span class="n">s</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">display-stream-first-n</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="n">s</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">&gt;</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">0</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="k">begin</span><span class="w"> </span>
<span class="w">      </span><span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">))</span>
<span class="w">      </span><span class="p">(</span><span class="n">display-stream-first-n</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>


<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-ref</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="nb">stream-ref</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="o">.</span><span class="w"> </span><span class="n">argstreams</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))</span>
<span class="w">      </span><span class="n">the-empty-stream</span>
<span class="w">      </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">       </span><span class="p">(</span><span class="nb">apply</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="n">stream-car</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))</span>
<span class="w">       </span><span class="p">(</span><span class="nb">apply</span><span class="w"> </span><span class="nb">stream-map</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-filter</span><span class="w"> </span><span class="n">pred</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="n">stream-null?</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span>
<span class="w">         </span><span class="n">the-empty-stream</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="n">pred</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="k">stream</span><span class="p">))</span>
<span class="w">         </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">          </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span>
<span class="w">          </span><span class="p">(</span><span class="nb">stream-filter</span>
<span class="w">           </span><span class="n">pred</span>
<span class="w">           </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">))))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-filter</span>
<span class="w">               </span><span class="n">pred</span>
<span class="w">               </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">add-streams</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="nb">+</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">mul-streams</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="nb">*</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">integers-starting-from</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span>
<span class="w">   </span><span class="n">n</span><span class="w"> </span><span class="p">(</span><span class="n">integers-starting-from</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">integers</span><span class="w"> </span><span class="p">(</span><span class="n">integers-starting-from</span><span class="w"> </span><span class="mi">1</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">factorials</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="p">(</span><span class="n">mul-streams</span><span class="w"> </span><span class="n">integers</span><span class="w"> </span><span class="n">factorials</span><span class="p">)))</span>
<span class="p">(</span><span class="n">display-stream-first-n</span><span class="w"> </span><span class="n">factorials</span><span class="w"> </span><span class="mi">10</span><span class="p">)</span>
</pre></div>

</details>
<div class="code-output">
<span>Output:</span>
<pre>
1
1
2
6
24
120
720
5040
40320
362880</pre>
</div>
</div>





#### Exercise 3.55

Define a procedure
`partial-sums` that takes as argument a stream $S$ and returns the
stream whose elements are $S_0$, $S_0 + S_1$, $S_0 + S_1 + S_2, \dots $.  
For example, `(partial-sums integers)` should be the
stream 1, 3, 6, 10, 15, $\ldots$.

##### Solution

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">partial-sums</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="mi">0</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-streams</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="p">(</span><span class="n">partial-sums</span><span class="w"> </span><span class="n">s</span><span class="p">))))</span>
</pre></div>

<div class="code-box" markdown="1">
<details class="collapsible-code">
<summary class="code-summary"><a href="code/ex3-55.rkt">code/ex3-55.rkt</a> <span class="expand-hint">(click to expand)</span></summary>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="k">stream</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">force</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-enumerate-interval</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="n">high</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">&gt;</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="n">high</span><span class="p">)</span>
<span class="w">      </span><span class="n">the-empty-stream</span>
<span class="w">      </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">       </span><span class="n">low</span>
<span class="w">       </span><span class="p">(</span><span class="n">stream-enumerate-interval</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span>
<span class="w">                                  </span><span class="n">high</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-enumerate-odds</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="n">high</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">&gt;</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="n">high</span><span class="p">)</span><span class="w"> </span><span class="n">the-empty-stream</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="nb">=</span><span class="w"> </span><span class="p">(</span><span class="nb">remainder</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="mi">2</span><span class="p">)</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span>
<span class="w">         </span><span class="p">(</span><span class="n">stream-enumerate-interval</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span><span class="w"> </span><span class="n">high</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span>
<span class="w">         </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">          </span><span class="n">low</span>
<span class="w">          </span><span class="p">(</span><span class="n">stream-enumerate-interval</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="mi">2</span><span class="p">)</span>
<span class="w">                                     </span><span class="n">high</span><span class="p">)))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-enumerate-evens</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="n">high</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">&gt;</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="n">high</span><span class="p">)</span><span class="w"> </span><span class="n">the-empty-stream</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="nb">=</span><span class="w"> </span><span class="p">(</span><span class="nb">remainder</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="mi">2</span><span class="p">)</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span>
<span class="w">         </span><span class="p">(</span><span class="n">stream-enumerate-interval</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span><span class="w"> </span><span class="n">high</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span>
<span class="w">         </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">          </span><span class="n">low</span>
<span class="w">          </span><span class="p">(</span><span class="n">stream-enumerate-interval</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="mi">2</span><span class="p">)</span>
<span class="w">                                     </span><span class="n">high</span><span class="p">)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-for-each</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">      </span><span class="o">&#39;</span><span class="ss">done</span>
<span class="w">      </span><span class="p">(</span><span class="k">begin</span>
<span class="w">        </span><span class="p">(</span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="nb">stream-for-each</span><span class="w"> </span><span class="n">proc</span>
<span class="w">                         </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">display-stream</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-for-each</span><span class="w"> </span><span class="n">display-line</span><span class="w"> </span><span class="n">s</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">display-stream-first-n</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="n">s</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">&gt;</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">0</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="k">begin</span><span class="w"> </span>
<span class="w">      </span><span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">))</span>
<span class="w">      </span><span class="p">(</span><span class="n">display-stream-first-n</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>


<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-ref</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="nb">stream-ref</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="o">.</span><span class="w"> </span><span class="n">argstreams</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))</span>
<span class="w">      </span><span class="n">the-empty-stream</span>
<span class="w">      </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">       </span><span class="p">(</span><span class="nb">apply</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="n">stream-car</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))</span>
<span class="w">       </span><span class="p">(</span><span class="nb">apply</span><span class="w"> </span><span class="nb">stream-map</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-filter</span><span class="w"> </span><span class="n">pred</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="n">stream-null?</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span>
<span class="w">         </span><span class="n">the-empty-stream</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="n">pred</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="k">stream</span><span class="p">))</span>
<span class="w">         </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">          </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span>
<span class="w">          </span><span class="p">(</span><span class="nb">stream-filter</span>
<span class="w">           </span><span class="n">pred</span>
<span class="w">           </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">))))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-filter</span>
<span class="w">               </span><span class="n">pred</span>
<span class="w">               </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">add-streams</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="nb">+</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">mul-streams</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="nb">*</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">integers-starting-from</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span>
<span class="w">   </span><span class="n">n</span><span class="w"> </span><span class="p">(</span><span class="n">integers-starting-from</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">integers</span><span class="w"> </span><span class="p">(</span><span class="n">integers-starting-from</span><span class="w"> </span><span class="mi">1</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">partial-sums</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="mi">0</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-streams</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="p">(</span><span class="n">partial-sums</span><span class="w"> </span><span class="n">s</span><span class="p">))))</span>
<span class="p">(</span><span class="n">display-stream-first-n</span><span class="w"> </span><span class="p">(</span><span class="n">partial-sums</span><span class="w"> </span><span class="n">integers</span><span class="p">)</span><span class="w"> </span><span class="mi">10</span><span class="p">)</span>
</pre></div>

</details>
<div class="code-output">
<span>Output:</span>
<pre>
0
1
3
6
10
15
21
28
36
45</pre>
</div>
</div>


#### Exercise 3.56

A famous problem, first raised by
R. Hamming, is to enumerate, in ascending order with no repetitions, all
positive integers with no prime factors other than 2, 3, or 5.  One obvious way
to do this is to simply test each integer in turn to see whether it has any
factors other than 2, 3, and 5.  But this is very inefficient, since, as the
integers get larger, fewer and fewer of them fit the requirement.  As an
alternative, let us call the required stream of numbers `S` and notice the
following facts about it.

- `S` begins with 1.
- The elements of `(scale-stream S 2)` are also elements of `S`.
- The same is true for `(scale-stream S 3)`
and `(scale-stream S 5)`.
- These are all the elements of `S`.

Now all we have to do is combine elements from these sources.  For this we
define a procedure `merge` that combines two ordered streams into one
ordered result stream, eliminating repetitions:

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">merge</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="n">stream-null?</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="n">stream-null?</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span>
<span class="w">         </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">s1car</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s1</span><span class="p">))</span>
<span class="w">               </span><span class="p">(</span><span class="n">s2car</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s2</span><span class="p">)))</span>
<span class="w">           </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">&lt;</span><span class="w"> </span><span class="n">s1car</span><span class="w"> </span><span class="n">s2car</span><span class="p">)</span>
<span class="w">                  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span>
<span class="w">                   </span><span class="n">s1car</span><span class="w"> </span>
<span class="w">                   </span><span class="p">(</span><span class="n">merge</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span><span class="w"> </span>
<span class="w">                          </span><span class="n">s2</span><span class="p">)))</span>
<span class="w">                 </span><span class="p">((</span><span class="nb">&gt;</span><span class="w"> </span><span class="n">s1car</span><span class="w"> </span><span class="n">s2car</span><span class="p">)</span>
<span class="w">                  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span>
<span class="w">                   </span><span class="n">s2car</span><span class="w"> </span>
<span class="w">                   </span><span class="p">(</span><span class="n">merge</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span>
<span class="w">                          </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s2</span><span class="p">))))</span>
<span class="w">                 </span><span class="p">(</span><span class="k">else</span>
<span class="w">                  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span>
<span class="w">                   </span><span class="n">s1car</span>
<span class="w">                   </span><span class="p">(</span><span class="n">merge</span><span class="w"> </span>
<span class="w">                    </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span>
<span class="w">                    </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s2</span><span class="p">)))))))))</span>
</pre></div>

Then the required stream may be constructed with `merge`, as follows:

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">S</span><span class="w"> </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="p">(</span><span class="n">merge</span><span class="w"> </span><span class="n">⟨??⟩</span><span class="w"> </span><span class="n">⟨??⟩</span><span class="p">)))</span>
</pre></div>

Fill in the missing expressions in the places marked `⟨??⟩` above.

##### Solution

<div class="code-box" markdown="1">
<details class="collapsible-code">
<summary class="code-summary"><a href="code/ex3-56.rkt">code/ex3-56.rkt</a> <span class="expand-hint">(click to expand)</span></summary>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="k">stream</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">force</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-enumerate-interval</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="n">high</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">&gt;</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="n">high</span><span class="p">)</span>
<span class="w">      </span><span class="n">the-empty-stream</span>
<span class="w">      </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">       </span><span class="n">low</span>
<span class="w">       </span><span class="p">(</span><span class="n">stream-enumerate-interval</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span>
<span class="w">                                  </span><span class="n">high</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-for-each</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">      </span><span class="o">&#39;</span><span class="ss">done</span>
<span class="w">      </span><span class="p">(</span><span class="k">begin</span>
<span class="w">        </span><span class="p">(</span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="nb">stream-for-each</span><span class="w"> </span><span class="n">proc</span>
<span class="w">                         </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">display-stream</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-for-each</span><span class="w"> </span><span class="n">display-line</span><span class="w"> </span><span class="n">s</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">display-stream-first-n</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="n">s</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">&gt;</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">0</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="k">begin</span><span class="w"> </span>
<span class="w">      </span><span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">))</span>
<span class="w">      </span><span class="p">(</span><span class="n">display-stream-first-n</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-ref</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="nb">stream-ref</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="o">.</span><span class="w"> </span><span class="n">argstreams</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))</span>
<span class="w">      </span><span class="n">the-empty-stream</span>
<span class="w">      </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">       </span><span class="p">(</span><span class="nb">apply</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="n">stream-car</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))</span>
<span class="w">       </span><span class="p">(</span><span class="nb">apply</span><span class="w"> </span><span class="nb">stream-map</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-filter</span><span class="w"> </span><span class="n">pred</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="n">stream-null?</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span>
<span class="w">         </span><span class="n">the-empty-stream</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="n">pred</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="k">stream</span><span class="p">))</span>
<span class="w">         </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">          </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span>
<span class="w">          </span><span class="p">(</span><span class="nb">stream-filter</span>
<span class="w">           </span><span class="n">pred</span>
<span class="w">           </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">))))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-filter</span>
<span class="w">               </span><span class="n">pred</span>
<span class="w">               </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">add-streams</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="nb">+</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">mul-streams</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="nb">*</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">integers-starting-from</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span>
<span class="w">   </span><span class="n">n</span><span class="w"> </span><span class="p">(</span><span class="n">integers-starting-from</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">scale-stream</span><span class="w"> </span><span class="n">S</span><span class="w"> </span><span class="n">m</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">m</span><span class="p">))</span><span class="w"> </span><span class="n">S</span><span class="p">))</span>


<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">merge</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="n">stream-null?</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="n">stream-null?</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span>
<span class="w">         </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">s1car</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s1</span><span class="p">))</span>
<span class="w">               </span><span class="p">(</span><span class="n">s2car</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s2</span><span class="p">)))</span>
<span class="w">           </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">&lt;</span><span class="w"> </span><span class="n">s1car</span><span class="w"> </span><span class="n">s2car</span><span class="p">)</span>
<span class="w">                  </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">                   </span><span class="n">s1car</span>
<span class="w">                   </span><span class="p">(</span><span class="n">merge</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span>
<span class="w">                          </span><span class="n">s2</span><span class="p">)))</span>
<span class="w">                 </span><span class="p">((</span><span class="nb">&gt;</span><span class="w"> </span><span class="n">s1car</span><span class="w"> </span><span class="n">s2car</span><span class="p">)</span>
<span class="w">                  </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">                   </span><span class="n">s2car</span>
<span class="w">                   </span><span class="p">(</span><span class="n">merge</span><span class="w"> </span><span class="n">s1</span>
<span class="w">                          </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s2</span><span class="p">))))</span>
<span class="w">                 </span><span class="p">(</span><span class="k">else</span>
<span class="w">                  </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">                   </span><span class="n">s1car</span>
<span class="w">                   </span><span class="p">(</span><span class="n">merge</span>
<span class="w">                    </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span>
<span class="w">                    </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s2</span><span class="p">)))))))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">integers</span><span class="w"> </span><span class="p">(</span><span class="n">integers-starting-from</span><span class="w"> </span><span class="mi">1</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">S</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span>
<span class="w">    </span><span class="p">(</span><span class="n">merge</span><span class="w"> </span>
<span class="w">      </span><span class="p">(</span><span class="n">scale-stream</span><span class="w"> </span><span class="n">S</span><span class="w"> </span><span class="mi">2</span><span class="p">)</span><span class="w"> </span>
<span class="w">      </span><span class="p">(</span><span class="n">merge</span><span class="w"> </span><span class="p">(</span><span class="n">scale-stream</span><span class="w"> </span><span class="n">S</span><span class="w"> </span><span class="mi">3</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">scale-stream</span><span class="w"> </span><span class="n">S</span><span class="w"> </span><span class="mi">5</span><span class="p">)))))</span>

<span class="p">(</span><span class="n">display-stream-first-n</span><span class="w"> </span><span class="n">S</span><span class="w"> </span><span class="mi">20</span><span class="p">)</span>
</pre></div>

</details>
<div class="code-output">
<span>Output:</span>
<pre>
1
2
3
4
5
6
8
9
10
12
15
16
18
20
24
25
27
30
32
36</pre>
</div>
</div>


#### Exercise 3.57

How many additions are performed
when we compute the $n^{\text{th}}$ Fibonacci number using the definition of
`fibs` based on the `add-streams` procedure?  Show that the number of
additions would be exponentially greater if we had implemented `(delay ⟨exp⟩)` 
simply as `(lambda () ⟨exp⟩)`, without using the
optimization provided by the `memo-proc` procedure described in 
3.5.1.

##### Solution

With caching, we only call `+` once each time we iterate to
the next value. 

Without caching, we see that the only base cases are 0 and 1, so we call + at least `Fib(n)` times to calculate `Fib(n)`, probably more if many of them are adding `(+ n 0)`. 

<div class="code-box" markdown="1">
<div class="code-header"><a href="code/ex3-57.rkt">code/ex3-57.rkt</a></div>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="k">stream</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">force</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">display-stream-first-n</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="n">s</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">&gt;</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">0</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="k">begin</span><span class="w"> </span>
<span class="w">      </span><span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">))</span>
<span class="w">      </span><span class="p">(</span><span class="n">display-stream-first-n</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">)))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>


<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">pluscount</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">+new</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="k">begin</span><span class="w"> </span><span class="p">(</span><span class="k">set!</span><span class="w"> </span><span class="n">pluscount</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">pluscount</span><span class="w"> </span><span class="mi">1</span><span class="p">))</span>
<span class="w">         </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">fibgen</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="p">(</span><span class="n">fibgen</span><span class="w"> </span><span class="n">b</span><span class="w"> </span><span class="p">(</span><span class="n">+new</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">fibs</span><span class="w"> </span><span class="p">(</span><span class="n">fibgen</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="mi">1</span><span class="p">))</span>

<span class="p">(</span><span class="n">display-stream-first-n</span><span class="w"> </span><span class="n">fibs</span><span class="w"> </span><span class="mi">10</span><span class="p">)</span>
<span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="n">pluscount</span><span class="p">)</span>
</pre></div>
<div class="code-output">
<span>Output:</span>
<pre>
0
1
1
2
3
5
8
13
21
3410</pre>
</div>
</div>


#### Exercise 3.58

Give an interpretation of the
stream computed by the following procedure:

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">expand</span><span class="w"> </span><span class="n">num</span><span class="w"> </span><span class="n">den</span><span class="w"> </span><span class="n">radix</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">   </span><span class="p">(</span><span class="nb">quotient</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">num</span><span class="w"> </span><span class="n">radix</span><span class="p">)</span><span class="w"> </span><span class="n">den</span><span class="p">)</span>
<span class="w">   </span><span class="p">(</span><span class="nb">expand</span><span class="w"> </span><span class="p">(</span><span class="nb">remainder</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">num</span><span class="w"> </span><span class="n">radix</span><span class="p">)</span><span class="w"> </span><span class="n">den</span><span class="p">)</span><span class="w"> </span>
<span class="w">           </span><span class="n">den</span><span class="w"> </span>
<span class="w">           </span><span class="n">radix</span><span class="p">)))</span>
</pre></div>

(`Quotient` is a primitive that returns the integer quotient of two
integers.)  What are the successive elements produced by `(expand 1 7
10)`?  What is produced by `(expand 3 8 10)`?

##### Solution

This is a base-`radix` expansion of the rational number `(/ num den)`, where we expect 

$$\frac{\texttt{num}}{\texttt{den}}\lt 1.$$

The first digit in base-`radix` is $c_1=\lfloor \texttt{num}\cdot \texttt{rad}/\texttt{den}\rfloor.$

Next we compute the remainder, 
$$\frac{n}{d}=\frac{c_1}{r}+\frac{nr-c_1 d}{dr}.$$

We note that the numerator is exactly `(remainder (* num radix) den)`. 

For the next digit, we do the same thing. 

$$\frac{n}{d}=\frac{c_1}{r}+\frac{c_2}{r^2}+\frac{(nr -c_1 d)r-c_2 d}{dr^2}.$$

Where $c_2$ can be calculated as `(remainder (* num-new radix) den)`.

So we can see how this could be turned into an inductive proof
that our algorithm is correct.

For the first example, `(expand 1 7 10)` will give the repeating
decimal digits of 1/7. For `(expand 3 8 10)` we expect the 
sequence `'(3 7 5 0 0 0 ...)`.

<div class="code-box" markdown="1">
<details class="collapsible-code">
<summary class="code-summary"><a href="code/ex3-58.rkt">code/ex3-58.rkt</a> <span class="expand-hint">(click to expand)</span></summary>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="k">stream</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">force</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">display-stream-first-n</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="n">s</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">&gt;</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">0</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="k">begin</span><span class="w"> </span>
<span class="w">      </span><span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">))</span>
<span class="w">      </span><span class="p">(</span><span class="n">display-stream-first-n</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">)))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">expand</span><span class="w"> </span><span class="n">num</span><span class="w"> </span><span class="n">den</span><span class="w"> </span><span class="n">radix</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">   </span><span class="p">(</span><span class="nb">quotient</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">num</span><span class="w"> </span><span class="n">radix</span><span class="p">)</span><span class="w"> </span><span class="n">den</span><span class="p">)</span>
<span class="w">   </span><span class="p">(</span><span class="nb">expand</span><span class="w"> </span><span class="p">(</span><span class="nb">remainder</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">num</span><span class="w"> </span><span class="n">radix</span><span class="p">)</span><span class="w"> </span><span class="n">den</span><span class="p">)</span><span class="w"> </span>
<span class="w">           </span><span class="n">den</span><span class="w"> </span>
<span class="w">           </span><span class="n">radix</span><span class="p">)))</span>

<span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="s2">&quot;1/7:&quot;</span><span class="p">)</span>
<span class="p">(</span><span class="n">display-stream-first-n</span><span class="w"> </span><span class="p">(</span><span class="nb">expand</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">7</span><span class="w"> </span><span class="mi">10</span><span class="p">)</span><span class="w"> </span><span class="mi">7</span><span class="p">)</span>
<span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="s2">&quot;3/8:&quot;</span><span class="p">)</span>
<span class="p">(</span><span class="n">display-stream-first-n</span><span class="w"> </span><span class="p">(</span><span class="nb">expand</span><span class="w"> </span><span class="mi">3</span><span class="w"> </span><span class="mi">8</span><span class="w"> </span><span class="mi">10</span><span class="p">)</span><span class="w"> </span><span class="mi">7</span><span class="p">)</span>
</pre></div>

</details>
<div class="code-output">
<span>Output:</span>
<pre>
1/7:
1
4
2
8
5
7
1
3/8:
3
7
5
0
0
0
0</pre>
</div>
</div>


#### Exercise 3.59

In 2.5.3 we saw how
to implement a polynomial arithmetic system representing polynomials as lists
of terms.  In a similar way, we can work with power series, such as

<div>$$\begin{align*}
  e^x &= 1 + x + \frac{1}{2} x^2  + \frac{1}{3 \cdot 2} x^3  + \frac{1}{4 \cdot 3 \cdot 2} x^4  + \dots \\
  \cos x  &= 1 - \frac{1}{2} x^2  + \frac{1}{4 \cdot 3 \cdot 2} x^4  - \dots \\
  \sin x  &= x - \frac{1}{3 \cdot 2} x^3  + \frac{1}{5 \cdot 4 \cdot 3 \cdot 2} x^5  - \dots
\end{align*}
$$</div>

represented as infinite streams.  We will represent the series $a_0 +
a_1 x + a_2 x^2 + a_3 x^3 + \dots$ as the stream whose
elements are the coefficients $a_0$, $a_1$, $a_2$, $a_3$, $\cdots$.

**1.** The integral of the series $a_0 + a_1 x + a_2 x^2 + a_3 x^3 + \dots$ is the series

$$c + {a_0 x} + {\frac{1}{2} a_1 x^2} + {\frac{1}{3} a_2 x^3} + {\frac{1}{4} a_3 x^4 + \dots,}$$


where $c$ is any constant.  Define a procedure `integrate-series` that
takes as input a stream $a_0$, $a_1$, $a_2$, $\ldots$ representing a power
series and returns the stream $a_0$, ${{1\over2}a_1}$, ${{1\over3}a_2}$, $\ldots$ of
coefficients of the non-constant terms of the integral of the series.  (Since
the result has no constant term, it doesn't represent a power series; when we
use `integrate-series`, we will `cons` on the appropriate constant.)

**2.** The function ${x \mapsto e^x}$ is its own derivative.  This implies that
$e^x$ and the integral of $e^x$ are the same series, except for the
constant term, which is ${e^0 = 1}$.  Accordingly, we can generate the series
for $e^x$ as

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">exp-series</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span>
<span class="w">   </span><span class="mi">1</span><span class="w"> </span><span class="p">(</span><span class="n">integrate-series</span><span class="w"> </span><span class="n">exp-series</span><span class="p">)))</span>
</pre></div>

Show how to generate the series for sine and cosine, starting from the facts
that the derivative of sine is cosine and the derivative of cosine is the
negative of sine:

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">cosine-series</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="n">⟨??⟩</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">sine-series</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="n">⟨??⟩</span><span class="p">))</span>
</pre></div>

##### Solution

We just define the series as integrals as each other:

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">cosine-series</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span>
<span class="w">    </span><span class="p">(</span><span class="n">integrate-series</span><span class="w"> </span>
<span class="w">      </span><span class="p">(</span><span class="n">negate-series</span><span class="w"> </span><span class="n">sine-series</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">sine-series</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span>
<span class="w">    </span><span class="p">(</span><span class="n">integrate-series</span><span class="w"> </span><span class="n">cosine-series</span><span class="p">)))</span>
</pre></div>

<div class="code-box" markdown="1">
<details class="collapsible-code">
<summary class="code-summary"><a href="code/ex3-59.rkt">code/ex3-59.rkt</a> <span class="expand-hint">(click to expand)</span></summary>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="k">stream</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">force</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">display-stream-first-n</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="n">s</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">&gt;</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">0</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="k">begin</span><span class="w"> </span>
<span class="w">      </span><span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">))</span>
<span class="w">      </span><span class="p">(</span><span class="n">display-stream-first-n</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">)))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">integers-starting-from</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span>
<span class="w">   </span><span class="n">n</span><span class="w"> </span><span class="p">(</span><span class="n">integers-starting-from</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">integers</span><span class="w"> </span><span class="p">(</span><span class="n">integers-starting-from</span><span class="w"> </span><span class="mi">1</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="o">.</span><span class="w"> </span><span class="n">argstreams</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))</span>
<span class="w">      </span><span class="n">the-empty-stream</span>
<span class="w">      </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">       </span><span class="p">(</span><span class="nb">apply</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="n">stream-car</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))</span>
<span class="w">       </span><span class="p">(</span><span class="nb">apply</span><span class="w"> </span><span class="nb">stream-map</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">negate-series</span><span class="w"> </span><span class="n">S</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="nb">-</span><span class="w"> </span><span class="n">S</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">integrate-series</span><span class="w"> </span><span class="n">S</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="nb">/</span><span class="w"> </span><span class="n">S</span><span class="w"> </span><span class="n">integers</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">exp-series</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">   </span><span class="mi">1</span><span class="w"> </span><span class="p">(</span><span class="n">integrate-series</span><span class="w"> </span><span class="n">exp-series</span><span class="p">)))</span>
<span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="s2">&quot;Part 1, exp series:&quot;</span><span class="p">)</span>
<span class="p">(</span><span class="n">display-stream-first-n</span><span class="w"> </span><span class="n">exp-series</span><span class="w"> </span><span class="mi">6</span><span class="p">)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">cosine-series</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="p">(</span><span class="n">integrate-series</span><span class="w"> </span><span class="p">(</span><span class="n">negate-series</span><span class="w"> </span><span class="n">sine-series</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">sine-series</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="p">(</span><span class="n">integrate-series</span><span class="w"> </span><span class="n">cosine-series</span><span class="p">)))</span>

<span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="s2">&quot;Part 2, sine series:&quot;</span><span class="p">)</span>

<span class="p">(</span><span class="n">display-stream-first-n</span><span class="w"> </span><span class="n">sine-series</span><span class="w"> </span><span class="mi">6</span><span class="p">)</span>
<span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="s2">&quot;Part 2, cosine series:&quot;</span><span class="p">)</span>
<span class="p">(</span><span class="n">display-stream-first-n</span><span class="w"> </span><span class="n">cosine-series</span><span class="w"> </span><span class="mi">6</span><span class="p">)</span>
</pre></div>

</details>
<div class="code-output">
<span>Output:</span>
<pre>
Part 1, exp series:
1
1
1/2
1/6
1/24
1/120
Part 2, sine series:
0
1
0
-1/6
0
1/120
Part 2, cosine series:
1
0
-1/2
0
1/24
0</pre>
</div>
</div>



#### Exercise 3.60

With power series represented as
streams of coefficients as in Exercise 3.59, adding series is implemented
by `add-streams`.  Complete the definition of the following procedure for
multiplying series:

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">mul-series</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="n">⟨??⟩</span><span class="w"> </span><span class="p">(</span><span class="n">add-streams</span><span class="w"> </span><span class="n">⟨??⟩</span><span class="w"> </span><span class="n">⟨??⟩</span><span class="p">)))</span>
</pre></div>

You can test your procedure by verifying that ${\sin^2x + \cos^2x = 1,$}
using the series from Exercise 3.59.

##### Solution

Take two formal power series $P_1=\sum_{n=0}^\infty P^1_n x^n$ and $P_2=\sum_{n=0}^\infty P^2_n x^n.$ We'll call 
$\texttt{CAR}(P_1)=P^1_0$ and $\texttt{CDR}(P_1)=\sum_{n=1}^\infty P^1_0.$
Then we apply a recursive definition of polynomial multiplication:

$$P_1\times P_2 = \texttt{CAR}(P_1)\cdot P_2 + (0 + \texttt{CDR}(P_1)\times P_2)$$

This is realized in the following algorithm:
<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">mul-series</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">add-streams</span><span class="w"> </span>
<span class="w">    </span><span class="p">(</span><span class="n">scale-stream</span><span class="w"> </span><span class="n">s2</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s1</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="p">(</span><span class="n">mul-series</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span><span class="w"> </span><span class="n">s2</span><span class="p">))))</span>
</pre></div>

Using the sum of cosine and sine squared as a test case:

<div class="code-box" markdown="1">
<details class="collapsible-code">
<summary class="code-summary"><a href="code/ex3-60.rkt">code/ex3-60.rkt</a> <span class="expand-hint">(click to expand)</span></summary>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="k">stream</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">force</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">display-stream-first-n</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="n">s</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">&gt;</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">0</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="k">begin</span><span class="w"> </span>
<span class="w">      </span><span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">))</span>
<span class="w">      </span><span class="p">(</span><span class="n">display-stream-first-n</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">)))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">integers-starting-from</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span>
<span class="w">   </span><span class="n">n</span><span class="w"> </span><span class="p">(</span><span class="n">integers-starting-from</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">integers</span><span class="w"> </span><span class="p">(</span><span class="n">integers-starting-from</span><span class="w"> </span><span class="mi">1</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="o">.</span><span class="w"> </span><span class="n">argstreams</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))</span>
<span class="w">      </span><span class="n">the-empty-stream</span>
<span class="w">      </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">       </span><span class="p">(</span><span class="nb">apply</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="n">stream-car</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))</span>
<span class="w">       </span><span class="p">(</span><span class="nb">apply</span><span class="w"> </span><span class="nb">stream-map</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">negate-series</span><span class="w"> </span><span class="n">S</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="nb">-</span><span class="w"> </span><span class="n">S</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">integrate-series</span><span class="w"> </span><span class="n">S</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="nb">/</span><span class="w"> </span><span class="n">S</span><span class="w"> </span><span class="n">integers</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">exp-series</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">   </span><span class="mi">1</span><span class="w"> </span><span class="p">(</span><span class="n">integrate-series</span><span class="w"> </span><span class="n">exp-series</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">cosine-series</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="p">(</span><span class="n">integrate-series</span><span class="w"> </span><span class="p">(</span><span class="n">negate-series</span><span class="w"> </span><span class="n">sine-series</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">sine-series</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="p">(</span><span class="n">integrate-series</span><span class="w"> </span><span class="n">cosine-series</span><span class="p">)))</span>




<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">add-streams</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="nb">+</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">mul-streams</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="nb">*</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">scale-stream</span><span class="w"> </span><span class="n">S</span><span class="w"> </span><span class="n">m</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">m</span><span class="p">))</span><span class="w"> </span><span class="n">S</span><span class="p">))</span>
<span class="c1">;(define (mul-series s1 s2)</span>
<span class="c1">;  (cons-stream </span>
<span class="c1">;    (* (stream-car s1) (stream-car s2))</span>
<span class="c1">;    (add-streams </span>
<span class="c1">;      (scale-stream (stream-cdr s2) (stream-car s1))</span>
<span class="c1">;      (mul-series (stream-cdr s1) s2))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">mul-series</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">add-streams</span><span class="w"> </span>
<span class="w">    </span><span class="p">(</span><span class="n">scale-stream</span><span class="w"> </span><span class="n">s2</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s1</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="p">(</span><span class="n">mul-series</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span><span class="w"> </span><span class="n">s2</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">sum-squared-stream</span>
<span class="w">  </span><span class="p">(</span><span class="n">add-streams</span><span class="w"> </span><span class="p">(</span><span class="n">mul-series</span><span class="w"> </span><span class="n">sine-series</span><span class="w"> </span><span class="n">sine-series</span><span class="p">)</span>
<span class="w">               </span><span class="p">(</span><span class="n">mul-series</span><span class="w"> </span><span class="n">cosine-series</span><span class="w"> </span><span class="n">cosine-series</span><span class="p">)))</span>

<span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="s2">&quot;cos^2+sin^2 series:&quot;</span><span class="p">)</span>
<span class="p">(</span><span class="n">display-stream-first-n</span><span class="w"> </span><span class="n">sum-squared-stream</span><span class="w"> </span><span class="mi">8</span><span class="p">)</span>
</pre></div>

</details>
<div class="code-output">
<span>Output:</span>
<pre>
cos^2+sin^2 series:
1
0
0
0
0
0
0
0</pre>
</div>
</div>


#### Exercise 3.61

Let $S$ be a power series
(Exercise 3.59) whose constant term is 1.  Suppose we want to find the
power series $1 / S$, that is, the series $X$ such that $SX = 1$.
Write $S = 1 + S_R$ where $S_R$ is the part of $S$ after the
constant term.  Then we can solve for $X$ as follows:

<div>$$\begin{align*}
  S \cdot X           &=   1, \\
  (1 + S_R) \cdot X   &=   1, \\
  X + S_R \cdot X     &=   1, \\
  X                   &=   1 - S_R \cdot X.
\end{align*}$$</div>

In other words, $X$ is the power series whose constant term is 1 and whose
higher-order terms are given by the negative of $S_R$ times $X$.  Use
this idea to write a procedure `invert-unit-series` that computes $1 / S$
for a power series $S$ with constant term 1.  You will need to use
`mul-series` from Exercise 3.60.

##### Solution

It feels like it should be more complicated than this, but this works
perfectly well!

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="n">defie</span><span class="w"> </span><span class="p">(</span><span class="n">invert-unit-series</span><span class="w"> </span><span class="n">S</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">S</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;In invert-unit-series first element is not 1!&quot;</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">SR</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">S</span><span class="p">)))</span>
<span class="w">      </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">X</span><span class="w"> </span>
<span class="w">        </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="p">(</span><span class="n">negate-series</span><span class="w"> </span><span class="p">(</span><span class="n">mul-series</span><span class="w"> </span><span class="n">SR</span><span class="w"> </span><span class="n">X</span><span class="p">))))</span>
<span class="w">      </span><span class="n">X</span><span class="p">)))</span>
</pre></div>

<div class="code-box" markdown="1">
<details class="collapsible-code">
<summary class="code-summary"><a href="code/ex3-61.rkt">code/ex3-61.rkt</a> <span class="expand-hint">(click to expand)</span></summary>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="k">stream</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">force</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">display-stream-first-n</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="n">s</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">&gt;</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">0</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="k">begin</span><span class="w"> </span>
<span class="w">      </span><span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">))</span>
<span class="w">      </span><span class="p">(</span><span class="n">display-stream-first-n</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">)))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">integers-starting-from</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span>
<span class="w">   </span><span class="n">n</span><span class="w"> </span><span class="p">(</span><span class="n">integers-starting-from</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">integers</span><span class="w"> </span><span class="p">(</span><span class="n">integers-starting-from</span><span class="w"> </span><span class="mi">1</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="o">.</span><span class="w"> </span><span class="n">argstreams</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))</span>
<span class="w">      </span><span class="n">the-empty-stream</span>
<span class="w">      </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">       </span><span class="p">(</span><span class="nb">apply</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="n">stream-car</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))</span>
<span class="w">       </span><span class="p">(</span><span class="nb">apply</span><span class="w"> </span><span class="nb">stream-map</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">negate-series</span><span class="w"> </span><span class="n">S</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="nb">-</span><span class="w"> </span><span class="n">S</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">add-streams</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="nb">+</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">mul-streams</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="nb">*</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">scale-stream</span><span class="w"> </span><span class="n">S</span><span class="w"> </span><span class="n">m</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">m</span><span class="p">))</span><span class="w"> </span><span class="n">S</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">mul-series</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">add-streams</span><span class="w"> </span>
<span class="w">    </span><span class="p">(</span><span class="n">scale-stream</span><span class="w"> </span><span class="n">s2</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s1</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="p">(</span><span class="n">mul-series</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span><span class="w"> </span><span class="n">s2</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">invert-unit-series</span><span class="w"> </span><span class="n">S</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">S</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;In invert-unit-series first element is not 1!&quot;</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">SR</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">S</span><span class="p">)))</span>
<span class="w">      </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">X</span><span class="w"> </span>
<span class="w">        </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="p">(</span><span class="n">negate-series</span><span class="w"> </span><span class="p">(</span><span class="n">mul-series</span><span class="w"> </span><span class="n">SR</span><span class="w"> </span><span class="n">X</span><span class="p">))))</span>
<span class="w">      </span><span class="n">X</span><span class="p">)))</span>

<span class="c1">; 1+ x + x^2 + x^3 + ... == {1, 1, 1, 1, ...}</span>
<span class="c1">; == 1/(1-x), so inverting this should give us {1, -1, 0, 0, ...}</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">ones</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="n">ones</span><span class="p">))</span>

<span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="s2">&quot;1/(1-x)&quot;</span><span class="p">)</span>
<span class="p">(</span><span class="n">display-stream-first-n</span><span class="w"> </span><span class="n">ones</span><span class="w"> </span><span class="mi">8</span><span class="p">)</span>

<span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="s2">&quot;(invert-unit-series 1/(1-x))&quot;</span><span class="p">)</span>
<span class="p">(</span><span class="n">display-stream-first-n</span><span class="w"> </span><span class="p">(</span><span class="n">invert-unit-series</span><span class="w"> </span><span class="n">ones</span><span class="p">)</span><span class="w"> </span><span class="mi">8</span><span class="p">)</span>


<span class="c1">;; (define (integrate-series S)</span>
<span class="c1">;;   (stream-map / S integers))</span>
<span class="c1">;; </span>
<span class="c1">;; (define exp-series</span>
<span class="c1">;;   (cons-stream</span>
<span class="c1">;;    1 (integrate-series exp-series)))</span>
<span class="c1">;; (define cosine-series</span>
<span class="c1">;;   (cons-stream 1 (integrate-series (negate-series sine-series))))</span>
<span class="c1">;; (define sine-series</span>
<span class="c1">;;   (cons-stream 0 (integrate-series cosine-series)))</span>
<span class="c1">;; (define sum-squared-stream</span>
<span class="c1">;;   (add-streams (mul-series sine-series sine-series)</span>
<span class="c1">;;                (mul-series cosine-series cosine-series)))</span>
<span class="c1">;; </span>
<span class="c1">;; (display-line &quot;cos^2+sin^2 series:&quot;)</span>
<span class="c1">;; (display-stream-first-n sum-squared-stream 8)</span>
<span class="c1">;; </span>
</pre></div>

</details>
<div class="code-output">
<span>Output:</span>
<pre>
1/(1-x)
1
1
1
1
1
1
1
1
(invert-unit-series 1/(1-x))
1
-1
0
0
0
0
0
0</pre>
</div>
</div>


#### Exercise 3.62

Use the results of Exercise 3.60 
and Exercise 3.61 to define a procedure `div-series` that
divides two power series.  `Div-series` should work for any two series,
provided that the denominator series begins with a nonzero constant term.  (If
the denominator has a zero constant term, then `div-series` should signal
an error.)  Show how to use `div-series` together with the result of
Exercise 3.59 to generate the power series for tangent.

##### Solution

Pretty straightforward:

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">invert-series</span><span class="w"> </span><span class="n">S</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">S</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;In invert-series first element cannot be 0.&quot;</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">S0</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">S</span><span class="p">)))</span>
<span class="w">      </span><span class="p">(</span><span class="n">scale-stream</span><span class="w"> </span><span class="p">(</span><span class="n">invert-unit-series</span><span class="w"> </span><span class="p">(</span><span class="n">scale-stream</span><span class="w"> </span><span class="n">S</span><span class="w"> </span><span class="p">(</span><span class="nb">/</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="n">S0</span><span class="p">)))</span>
<span class="w">                    </span><span class="p">(</span><span class="nb">/</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="n">S0</span><span class="p">)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">div-series</span><span class="w"> </span><span class="n">S1</span><span class="w"> </span><span class="n">S2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">mul-series</span><span class="w"> </span><span class="n">S1</span><span class="w"> </span><span class="p">(</span><span class="n">invert-series</span><span class="w"> </span><span class="n">S2</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">tan-series</span>
<span class="w">  </span><span class="p">(</span><span class="n">div-series</span><span class="w"> </span><span class="n">sine-series</span><span class="w"> </span><span class="n">cosine-series</span><span class="p">))</span>
</pre></div>

<div class="code-box" markdown="1">
<details class="collapsible-code">
<summary class="code-summary"><a href="code/ex3-62.rkt">code/ex3-62.rkt</a> <span class="expand-hint">(click to expand)</span></summary>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="k">stream</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">force</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">display-stream-first-n</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="n">s</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">&gt;</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">0</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="k">begin</span><span class="w"> </span>
<span class="w">      </span><span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">))</span>
<span class="w">      </span><span class="p">(</span><span class="n">display-stream-first-n</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">)))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">integers-starting-from</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span>
<span class="w">   </span><span class="n">n</span><span class="w"> </span><span class="p">(</span><span class="n">integers-starting-from</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">integers</span><span class="w"> </span><span class="p">(</span><span class="n">integers-starting-from</span><span class="w"> </span><span class="mi">1</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="o">.</span><span class="w"> </span><span class="n">argstreams</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))</span>
<span class="w">      </span><span class="n">the-empty-stream</span>
<span class="w">      </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">       </span><span class="p">(</span><span class="nb">apply</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="n">stream-car</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))</span>
<span class="w">       </span><span class="p">(</span><span class="nb">apply</span><span class="w"> </span><span class="nb">stream-map</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">negate-series</span><span class="w"> </span><span class="n">S</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="nb">-</span><span class="w"> </span><span class="n">S</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">add-streams</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="nb">+</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">mul-streams</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="nb">*</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">scale-stream</span><span class="w"> </span><span class="n">S</span><span class="w"> </span><span class="n">m</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">m</span><span class="p">))</span><span class="w"> </span><span class="n">S</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">mul-series</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">add-streams</span><span class="w"> </span>
<span class="w">    </span><span class="p">(</span><span class="n">scale-stream</span><span class="w"> </span><span class="n">s2</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s1</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="p">(</span><span class="n">mul-series</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span><span class="w"> </span><span class="n">s2</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">invert-unit-series</span><span class="w"> </span><span class="n">S</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">S</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;In invert-unit-series first element is not 1!&quot;</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">SR</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">S</span><span class="p">)))</span>
<span class="w">      </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">X</span><span class="w"> </span>
<span class="w">        </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="p">(</span><span class="n">negate-series</span><span class="w"> </span><span class="p">(</span><span class="n">mul-series</span><span class="w"> </span><span class="n">SR</span><span class="w"> </span><span class="n">X</span><span class="p">))))</span>
<span class="w">      </span><span class="n">X</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">invert-series</span><span class="w"> </span><span class="n">S</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">S</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;In invert-series first element cannot be 0.&quot;</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">S0</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">S</span><span class="p">)))</span>
<span class="w">      </span><span class="p">(</span><span class="n">scale-stream</span><span class="w"> </span><span class="p">(</span><span class="n">invert-unit-series</span><span class="w"> </span><span class="p">(</span><span class="n">scale-stream</span><span class="w"> </span><span class="n">S</span><span class="w"> </span><span class="p">(</span><span class="nb">/</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="n">S0</span><span class="p">)))</span>
<span class="w">                    </span><span class="p">(</span><span class="nb">/</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="n">S0</span><span class="p">)))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">div-series</span><span class="w"> </span><span class="n">S1</span><span class="w"> </span><span class="n">S2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">mul-series</span><span class="w"> </span><span class="n">S1</span><span class="w"> </span><span class="p">(</span><span class="n">invert-series</span><span class="w"> </span><span class="n">S2</span><span class="p">)))</span>
<span class="w">      </span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">integrate-series</span><span class="w"> </span><span class="n">S</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="nb">/</span><span class="w"> </span><span class="n">S</span><span class="w"> </span><span class="n">integers</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">exp-series</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">   </span><span class="mi">1</span><span class="w"> </span><span class="p">(</span><span class="n">integrate-series</span><span class="w"> </span><span class="n">exp-series</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">cosine-series</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="p">(</span><span class="n">integrate-series</span><span class="w"> </span><span class="p">(</span><span class="n">negate-series</span><span class="w"> </span><span class="n">sine-series</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">sine-series</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="p">(</span><span class="n">integrate-series</span><span class="w"> </span><span class="n">cosine-series</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">tan-series</span>
<span class="w">  </span><span class="p">(</span><span class="n">div-series</span><span class="w"> </span><span class="n">sine-series</span><span class="w"> </span><span class="n">cosine-series</span><span class="p">))</span>

<span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="s2">&quot;Series for tan(x)&quot;</span><span class="p">)</span>
<span class="p">(</span><span class="n">display-stream-first-n</span><span class="w"> </span><span class="n">tan-series</span><span class="w"> </span><span class="mi">8</span><span class="p">)</span>
</pre></div>

</details>
<div class="code-output">
<span>Output:</span>
<pre>
Series for tan(x)
0
1
0
1/3
0
2/15
0
17/315</pre>
</div>
</div>


#### Exercise 3.63

Louis Reasoner asks why the
`sqrt-stream` procedure was not written in the following more
straightforward way, without the local variable `guesses`:

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">sqrt-stream</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span>
<span class="w">   </span><span class="mf">1.0</span>
<span class="w">   </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">guess</span><span class="p">)</span>
<span class="w">                 </span><span class="p">(</span><span class="n">sqrt-improve</span><span class="w"> </span><span class="n">guess</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="w">               </span><span class="p">(</span><span class="n">sqrt-stream</span><span class="w"> </span><span class="n">x</span><span class="p">))))</span>
</pre></div>

Alyssa P. Hacker replies that this version of the procedure is considerably
less efficient because it performs redundant computation.  Explain Alyssa's
answer.  Would the two versions still differ in efficiency if our
implementation of `delay` used only `(lambda () ⟨exp⟩)` without
using the optimization provided by `memo-proc` (3.5.1)?

##### Solution

This was quite confusing to me, but here is another way to "sabotage" the original code:
replace "guesses" with a function.

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">sqrt-stream</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">guesses</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span>
<span class="w">     </span><span class="mf">1.0</span>
<span class="w">     </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">guess</span><span class="p">)</span>
<span class="w">                   </span><span class="p">(</span><span class="n">sqrt-improve</span><span class="w"> </span><span class="n">guess</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="w">                 </span><span class="p">(</span><span class="n">guesses</span><span class="p">))))</span>
<span class="w">  </span><span class="p">(</span><span class="n">guesses</span><span class="p">))</span>
</pre></div>

Right, the point here is that every call to `(guesses)` has to build the stream
again from scratch. Since this is called recursively, that's a big problem! 



#### Exercise 3.64

Write a procedure
`stream-limit` that takes as arguments a stream and a number (the
tolerance).  It should examine the stream until it finds two successive
elements that differ in absolute value by less than the tolerance, and return
the second of the two elements.  Using this, we could compute square roots up
to a given tolerance by

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">sqrt</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">tolerance</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">stream-limit</span><span class="w"> </span><span class="p">(</span><span class="n">sqrt-stream</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="n">tolerance</span><span class="p">))</span>
</pre></div>

##### Solution

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-limit</span><span class="w"> </span><span class="k">stream</span><span class="w"> </span><span class="n">tol</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">iter</span><span class="w"> </span><span class="n">str</span><span class="w"> </span><span class="n">last-elem</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">this-elem</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">str</span><span class="p">)))</span>
<span class="w">      </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">&lt;</span><span class="w"> </span><span class="p">(</span><span class="nb">abs</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">this-elem</span><span class="w"> </span><span class="n">last-elem</span><span class="p">))</span><span class="w"> </span><span class="n">tol</span><span class="p">)</span><span class="w"> </span>
<span class="w">        </span><span class="n">this-elem</span>
<span class="w">        </span><span class="p">(</span><span class="n">iter</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">str</span><span class="p">)</span><span class="w"> </span><span class="n">this-elem</span><span class="p">))))</span>
<span class="w">  </span><span class="p">(</span><span class="n">iter</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="k">stream</span><span class="p">)))</span>
</pre></div>

<div class="code-box" markdown="1">
<details class="collapsible-code">
<summary class="code-summary"><a href="code/ex3-64.rkt">code/ex3-64.rkt</a> <span class="expand-hint">(click to expand)</span></summary>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="k">stream</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">force</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">display-stream-first-n</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="n">s</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">&gt;</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">0</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="k">begin</span><span class="w"> </span>
<span class="w">      </span><span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">))</span>
<span class="w">      </span><span class="p">(</span><span class="n">display-stream-first-n</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">)))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">integers-starting-from</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span>
<span class="w">   </span><span class="n">n</span><span class="w"> </span><span class="p">(</span><span class="n">integers-starting-from</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">integers</span><span class="w"> </span><span class="p">(</span><span class="n">integers-starting-from</span><span class="w"> </span><span class="mi">1</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="o">.</span><span class="w"> </span><span class="n">argstreams</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))</span>
<span class="w">      </span><span class="n">the-empty-stream</span>
<span class="w">      </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">       </span><span class="p">(</span><span class="nb">apply</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="n">stream-car</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))</span>
<span class="w">       </span><span class="p">(</span><span class="nb">apply</span><span class="w"> </span><span class="nb">stream-map</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))))))</span>


<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">average</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">/</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="p">)</span><span class="w"> </span><span class="mi">2</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">sqrt-improve</span><span class="w"> </span><span class="n">guess</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">average</span><span class="w"> </span><span class="n">guess</span><span class="w"> </span><span class="p">(</span><span class="nb">/</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">guess</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">sqrt-stream</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">guesses</span>
<span class="w">    </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span>
<span class="w">     </span><span class="mf">1.0</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-map</span>
<span class="w">          </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">guess</span><span class="p">)</span>
<span class="w">            </span><span class="p">(</span><span class="n">sqrt-improve</span><span class="w"> </span><span class="n">guess</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="w">          </span><span class="n">guesses</span><span class="p">)))</span>
<span class="w">  </span><span class="n">guesses</span><span class="p">)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-limit</span><span class="w"> </span><span class="k">stream</span><span class="w"> </span><span class="n">tol</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">iter</span><span class="w"> </span><span class="n">str</span><span class="w"> </span><span class="n">last-elem</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">this-elem</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">str</span><span class="p">)))</span>
<span class="w">      </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">&lt;</span><span class="w"> </span><span class="p">(</span><span class="nb">abs</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">this-elem</span><span class="w"> </span><span class="n">last-elem</span><span class="p">))</span><span class="w"> </span><span class="n">tol</span><span class="p">)</span><span class="w"> </span><span class="n">this-elem</span>
<span class="w">        </span><span class="p">(</span><span class="n">iter</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">str</span><span class="p">)</span><span class="w"> </span><span class="n">this-elem</span><span class="p">))))</span>
<span class="w">  </span><span class="p">(</span><span class="n">iter</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="k">stream</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">sqrt</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">tolerance</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">stream-limit</span><span class="w"> </span><span class="p">(</span><span class="n">sqrt-stream</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="n">tolerance</span><span class="p">))</span>

<span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="s2">&quot;Series for tan(x)&quot;</span><span class="p">)</span>
<span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="p">(</span><span class="nb">sqrt</span><span class="w"> </span><span class="mf">2.0</span><span class="w"> </span><span class="mf">0.1</span><span class="p">))</span>
<span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="p">(</span><span class="nb">sqrt</span><span class="w"> </span><span class="mf">2.0</span><span class="w"> </span><span class="mf">0.0001</span><span class="p">))</span>
<span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="p">(</span><span class="nb">sqrt</span><span class="w"> </span><span class="mf">2.0</span><span class="w"> </span><span class="mf">0.00000001</span><span class="p">))</span>
</pre></div>

</details>
<div class="code-output">
<span>Output:</span>
<pre>
Series for tan(x)
1.4166666666666665
1.4142135623746899
1.414213562373095</pre>
</div>
</div>


#### Exercise 3.65

Use the series

$$\ln 2 \,=\, 1 - {1\over2} + {1\over3} - {1\over4} + \dots  $$


to compute three sequences of approximations to the natural logarithm of 2, in
the same way we did above for $\pi$.  How rapidly do these sequences
converge?


##### Solution

Very trivial modifications of the pi code above. Note the exact value to 
sixteen places is

$$\ln(2)=0.6931471805599453\ldots$$

We get 12 digits of accuracy after 6 steps (excluding the first 0).

<div class="code-box" markdown="1">
<details class="collapsible-code">
<summary class="code-summary"><a href="code/ex3-65.rkt">code/ex3-65.rkt</a> <span class="expand-hint">(click to expand)</span></summary>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="k">stream</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">force</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">display-stream-first-n</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="n">s</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">&gt;</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">0</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="k">begin</span><span class="w"> </span>
<span class="w">      </span><span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">))</span>
<span class="w">      </span><span class="p">(</span><span class="n">display-stream-first-n</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">)))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">integers-starting-from</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span>
<span class="w">   </span><span class="n">n</span><span class="w"> </span><span class="p">(</span><span class="n">integers-starting-from</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">integers</span><span class="w"> </span><span class="p">(</span><span class="n">integers-starting-from</span><span class="w"> </span><span class="mi">1</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="o">.</span><span class="w"> </span><span class="n">argstreams</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))</span>
<span class="w">      </span><span class="n">the-empty-stream</span>
<span class="w">      </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">       </span><span class="p">(</span><span class="nb">apply</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="n">stream-car</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))</span>
<span class="w">       </span><span class="p">(</span><span class="nb">apply</span><span class="w"> </span><span class="nb">stream-map</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))))))</span>




<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">square</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">negate-series</span><span class="w"> </span><span class="n">S</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="nb">-</span><span class="w"> </span><span class="n">S</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">add-streams</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="nb">+</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">mul-streams</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="nb">*</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">scale-stream</span><span class="w"> </span><span class="n">S</span><span class="w"> </span><span class="n">m</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">m</span><span class="p">))</span><span class="w"> </span><span class="n">S</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">mul-series</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">add-streams</span><span class="w"> </span>
<span class="w">    </span><span class="p">(</span><span class="n">scale-stream</span><span class="w"> </span><span class="n">s2</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s1</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="p">(</span><span class="n">mul-series</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span><span class="w"> </span><span class="n">s2</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">partial-sums</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="mi">0</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-streams</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="p">(</span><span class="n">partial-sums</span><span class="w"> </span><span class="n">s</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-ref</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="nb">stream-ref</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">))))</span>


<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">euler-transform</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">s0</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-ref</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="mi">0</span><span class="p">))</span><span class="w">     </span><span class="c1">; Sₙ₋₁</span>
<span class="w">        </span><span class="p">(</span><span class="n">s1</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-ref</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="mi">1</span><span class="p">))</span><span class="w">     </span><span class="c1">; Sₙ</span>
<span class="w">        </span><span class="p">(</span><span class="n">s2</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-ref</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="mi">2</span><span class="p">)))</span><span class="w">    </span><span class="c1">; Sₙ₊₁</span>
<span class="w">    </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span>
<span class="w">     </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">s2</span><span class="w"> </span><span class="p">(</span><span class="nb">/</span><span class="w"> </span><span class="p">(</span><span class="n">square</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">s2</span><span class="w"> </span><span class="n">s1</span><span class="p">))</span>
<span class="w">              </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">s0</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="mi">-2</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span><span class="w"> </span><span class="n">s2</span><span class="p">)))</span>
<span class="w">     </span><span class="p">(</span><span class="n">euler-transform</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-tableau</span><span class="w"> </span><span class="n">transform</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">   </span><span class="n">s</span>
<span class="w">   </span><span class="p">(</span><span class="n">make-tableau</span>
<span class="w">    </span><span class="n">transform</span>
<span class="w">    </span><span class="p">(</span><span class="n">transform</span><span class="w"> </span><span class="n">s</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">accelerated-sequence</span><span class="w"> </span><span class="n">transform</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="n">stream-car</span>
<span class="w">              </span><span class="p">(</span><span class="n">make-tableau</span><span class="w"> </span><span class="n">transform</span><span class="w"> </span><span class="n">s</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">ln2-summands</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span>
<span class="w">   </span><span class="p">(</span><span class="nb">/</span><span class="w"> </span><span class="mf">1.0</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">   </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="nb">-</span><span class="w"> </span><span class="p">(</span><span class="n">ln2-summands</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">)))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">ln2-stream</span>
<span class="w">  </span><span class="p">(</span><span class="n">partial-sums</span><span class="w"> </span><span class="p">(</span><span class="n">ln2-summands</span><span class="w"> </span><span class="mi">1</span><span class="p">)))</span>
<span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="s2">&quot;Unaccelerated ln2-stream&quot;</span><span class="p">)</span>
<span class="p">(</span><span class="n">display-stream-first-n</span><span class="w"> </span><span class="n">ln2-stream</span><span class="w"> </span><span class="mi">7</span><span class="p">)</span>
<span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="s2">&quot;Euler transform ln2-stream&quot;</span><span class="p">)</span>
<span class="p">(</span><span class="n">display-stream-first-n</span><span class="w"> </span><span class="p">(</span><span class="n">euler-transform</span><span class="w"> </span><span class="n">ln2-stream</span><span class="p">)</span><span class="w"> </span><span class="mi">7</span><span class="p">)</span>
<span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="s2">&quot;Euler transform + tableau ln2-stream&quot;</span><span class="p">)</span>
<span class="p">(</span><span class="n">display-stream-first-n</span><span class="w"> </span><span class="p">(</span><span class="n">accelerated-sequence</span><span class="w"> </span><span class="n">euler-transform</span><span class="w"> </span><span class="n">ln2-stream</span><span class="p">)</span><span class="w"> </span><span class="mi">7</span><span class="p">)</span>
</pre></div>

</details>
<div class="code-output">
<span>Output:</span>
<pre>
Unaccelerated ln2-stream
0
1.0
0.5
0.8333333333333333
0.5833333333333333
0.7833333333333332
0.6166666666666666
Euler transform ln2-stream
0.6666666666666666
0.7
0.6904761904761905
0.6944444444444444
0.6924242424242424
0.6935897435897436
0.6928571428571428
Euler transform + tableau ln2-stream
0
0.6666666666666666
0.6925925925925925
0.6931401273742107
0.6931471197438599
0.693147180203895
0.693147180559321</pre>
</div>
</div>

#### Exercise 3.66

Examine the stream `(pairs
integers integers)`. Can you make any general comments about the order in which
the pairs are placed into the stream? For example, approximately how many pairs precede
the pair (1, 100)?  the pair (99, 100)? the pair (100, 100)? (If you can make
precise mathematical statements here, all the better. But feel free to give
more qualitative answers if you find yourself getting bogged down.)

##### Solution

It's easier to look at a grid. In the following grid, the value placed at row i and column j is the 
position in the sequence where the pair $(i,j)$ occurs. 

<div>$$\begin{array}{c|cccccc}
i\overset{\LARGE\setminus}{\phantom{.}}\overset{\Large j}{\phantom{l}} 
    & 1 & 2 & 3 & 4 & 5 & 6 \\ 
\hline
1 & 1 & 2 & 4 & 6 & 8 & 10\\
2 &   & 3 & 5 & 9 & 13 & 17\\
3 &   &   & 7 & 11 & 19 & 27\\
4 &   &   &   & 15 & 23 & 39\\
5 &   &   &   &    & 31 & 47\\
6 &   &   &   &    &    & 63\\
\end{array}$$</div>

<!-- 
bigger version:
\left(
\begin{array}{cccccccccc}
 1 & 2 & 4 & 6 & 8 & 10 & 12 & 14 & 16 & 18 \\
 0 & 3 & 5 & 9 & 13 & 17 & 21 & 25 & 29 & 33 \\
 0 & 0 & 7 & 11 & 19 & 27 & 35 & 43 & 51 & 59 \\
 0 & 0 & 0 & 15 & 23 & 39 & 55 & 71 & 87 & 103 \\
 0 & 0 & 0 & 0 & 31 & 47 & 79 & 111 & 143 & 175 \\
 0 & 0 & 0 & 0 & 0 & 63 & 95 & 159 & 223 & 287 \\
 0 & 0 & 0 & 0 & 0 & 0 & 127 & 191 & 319 & 447 \\
 0 & 0 & 0 & 0 & 0 & 0 & 0 & 255 & 383 & 639 \\
 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 511 & 767 \\
\end{array}
\right)
-->

We immediately see some patterns:

1. The main diagonal is of the form $2^i-1.$
2. Each row $i$ follows the pattern: Start at $2^i-1$, skip $2^{i-1}$ once, then skip $2^{i}$ each time afterwards.

For example row 4 starts at $2^4-1=15,$ then skips by $2^3=8$ to $23,$ then thereafter skips by $2^4=16$ to $39,$ then
$55,$ then $71$ and so on. So we can answer with general $N:$

1. The pair $(1,N)$ is preceded by $2N-3$ elements.
2. The pair $(N,N)$ is preceded by $2^N-2$ elements.
3. The pair $(N-1,N)$ is preceded by $2^{N-1}+2^{N-2}-2$ elements.

For $N=100$ these are $197,$ $1.27\times 10^{30},$ and $9.5\times 10^{29}$ respectively (of course this answer isn't a proof).

<div class="code-box" markdown="1">
<details class="collapsible-code">
<summary class="code-summary"><a href="code/ex3-66.rkt">code/ex3-66.rkt</a> <span class="expand-hint">(click to expand)</span></summary>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="k">stream</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">force</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">display-stream-first-n</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="n">s</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">&gt;</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">0</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="k">begin</span><span class="w"> </span>
<span class="w">      </span><span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">))</span>
<span class="w">      </span><span class="p">(</span><span class="n">display-stream-first-n</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">)))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">integers-starting-from</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span>
<span class="w">   </span><span class="n">n</span><span class="w"> </span><span class="p">(</span><span class="n">integers-starting-from</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">integers</span><span class="w"> </span><span class="p">(</span><span class="n">integers-starting-from</span><span class="w"> </span><span class="mi">1</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="o">.</span><span class="w"> </span><span class="n">argstreams</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))</span>
<span class="w">      </span><span class="n">the-empty-stream</span>
<span class="w">      </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">       </span><span class="p">(</span><span class="nb">apply</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="n">stream-car</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))</span>
<span class="w">       </span><span class="p">(</span><span class="nb">apply</span><span class="w"> </span><span class="nb">stream-map</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))))))</span>




<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">square</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">negate-series</span><span class="w"> </span><span class="n">S</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="nb">-</span><span class="w"> </span><span class="n">S</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">add-streams</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="nb">+</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">mul-streams</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="nb">*</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">scale-stream</span><span class="w"> </span><span class="n">S</span><span class="w"> </span><span class="n">m</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">m</span><span class="p">))</span><span class="w"> </span><span class="n">S</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">mul-series</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">add-streams</span><span class="w"> </span>
<span class="w">    </span><span class="p">(</span><span class="n">scale-stream</span><span class="w"> </span><span class="n">s2</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s1</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="p">(</span><span class="n">mul-series</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span><span class="w"> </span><span class="n">s2</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">partial-sums</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="mi">0</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-streams</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="p">(</span><span class="n">partial-sums</span><span class="w"> </span><span class="n">s</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-ref</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="nb">stream-ref</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">))))</span>



<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">interleave</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span>
<span class="w">      </span><span class="n">s2</span>
<span class="w">      </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">       </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span>
<span class="w">       </span><span class="p">(</span><span class="n">interleave</span><span class="w"> </span><span class="n">s2</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s1</span><span class="p">)))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">pairs</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">t</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">   </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">t</span><span class="p">))</span>
<span class="w">   </span><span class="p">(</span><span class="n">interleave</span>
<span class="w">    </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="p">)</span>
<span class="w">                  </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="w">                </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">t</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="n">pairs</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">t</span><span class="p">)))))</span>

<span class="p">(</span><span class="n">display-stream-first-n</span><span class="w"> </span><span class="p">(</span><span class="n">pairs</span><span class="w"> </span><span class="n">integers</span><span class="w"> </span><span class="n">integers</span><span class="p">)</span><span class="w"> </span><span class="mi">16</span><span class="p">)</span>
</pre></div>

</details>
<div class="code-output">
<span>Output:</span>
<pre>
(1 1)
(1 2)
(2 2)
(1 3)
(2 3)
(1 4)
(3 3)
(1 5)
(2 4)
(1 6)
(3 4)
(1 7)
(2 5)
(1 8)
(4 4)
(1 9)</pre>
</div>
</div>



#### Exercise 3.67

Modify the `pairs` procedure
so that `(pairs integers integers)` will produce the stream of *all*
pairs of integers $(i, j)$(without the condition $i \le j$).  Hint:
You will need to mix in an additional stream.

##### Solution


In my solution, we have the same chunks as in the table of 
`(s0 t0)` values. The top left is this:

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">t</span><span class="p">))</span>
</pre></div>

The top-right row of all `(s0 tn)` pairs is is

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="p">)</span>
<span class="w">              </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="w">            </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">t</span><span class="p">))</span>
</pre></div>


The recursive bottom-right part of all `(sn tn)` pairs with $n\ge 1$ is this:
<div class="codehilite"><pre><span></span><span class="p">(</span><span class="n">pairs</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">t</span><span class="p">))</span>
</pre></div>

But now we have to include a bottom-left column consisting of all
pairs `(sn, t0)`:
<div class="codehilite"><pre><span></span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">y</span><span class="p">)</span>
<span class="w">                    </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="n">y</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">t</span><span class="p">)))</span>
<span class="w">                  </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">))</span>
</pre></div>

We just interleave them together to get the result:

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">pairs-all</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">t</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">   </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">t</span><span class="p">))</span>
<span class="w">   </span><span class="p">(</span><span class="n">interleave</span><span class="w"> </span>
<span class="w">    </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">y</span><span class="p">)</span>
<span class="w">                        </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="n">y</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">t</span><span class="p">)))</span>
<span class="w">                      </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">))</span>
<span class="w">     </span><span class="p">(</span><span class="n">interleave</span>
<span class="w">      </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="p">)</span>
<span class="w">                    </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="w">                  </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">t</span><span class="p">))</span>
<span class="w">      </span><span class="p">(</span><span class="n">pairs</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">t</span><span class="p">))))))</span>

<span class="p">(</span><span class="n">display-stream-first-n</span><span class="w"> </span><span class="p">(</span><span class="n">pairs-all</span><span class="w"> </span><span class="n">integers</span><span class="w"> </span><span class="n">integers</span><span class="p">)</span><span class="w"> </span><span class="mi">16</span><span class="p">)</span>
</pre></div>
<div class="code-box" markdown="1">
<details class="collapsible-code">
<summary class="code-summary"><a href="code/ex3-67.rkt">code/ex3-67.rkt</a> <span class="expand-hint">(click to expand)</span></summary>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="k">stream</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">force</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">display-stream-first-n</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="n">s</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">&gt;</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">0</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="k">begin</span><span class="w"> </span>
<span class="w">      </span><span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">))</span>
<span class="w">      </span><span class="p">(</span><span class="n">display-stream-first-n</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">)))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">integers-starting-from</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span>
<span class="w">   </span><span class="n">n</span><span class="w"> </span><span class="p">(</span><span class="n">integers-starting-from</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">integers</span><span class="w"> </span><span class="p">(</span><span class="n">integers-starting-from</span><span class="w"> </span><span class="mi">1</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="o">.</span><span class="w"> </span><span class="n">argstreams</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))</span>
<span class="w">      </span><span class="n">the-empty-stream</span>
<span class="w">      </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">       </span><span class="p">(</span><span class="nb">apply</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="n">stream-car</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))</span>
<span class="w">       </span><span class="p">(</span><span class="nb">apply</span><span class="w"> </span><span class="nb">stream-map</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))))))</span>




<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">square</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">negate-series</span><span class="w"> </span><span class="n">S</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="nb">-</span><span class="w"> </span><span class="n">S</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">add-streams</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="nb">+</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">mul-streams</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="nb">*</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">scale-stream</span><span class="w"> </span><span class="n">S</span><span class="w"> </span><span class="n">m</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">m</span><span class="p">))</span><span class="w"> </span><span class="n">S</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">mul-series</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">add-streams</span><span class="w"> </span>
<span class="w">    </span><span class="p">(</span><span class="n">scale-stream</span><span class="w"> </span><span class="n">s2</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s1</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="p">(</span><span class="n">mul-series</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span><span class="w"> </span><span class="n">s2</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">partial-sums</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="mi">0</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-streams</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="p">(</span><span class="n">partial-sums</span><span class="w"> </span><span class="n">s</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-ref</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="nb">stream-ref</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">))))</span>



<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">interleave</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span>
<span class="w">      </span><span class="n">s2</span>
<span class="w">      </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">       </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span>
<span class="w">       </span><span class="p">(</span><span class="n">interleave</span><span class="w"> </span><span class="n">s2</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s1</span><span class="p">)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">pairs</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">t</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">   </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">t</span><span class="p">))</span>
<span class="w">   </span><span class="p">(</span><span class="n">interleave</span>
<span class="w">    </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="p">)</span>
<span class="w">                  </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="w">                </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">t</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="n">pairs</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">t</span><span class="p">)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">pairs-all</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">t</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">   </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">t</span><span class="p">))</span>
<span class="w">   </span><span class="p">(</span><span class="n">interleave</span><span class="w"> </span>
<span class="w">    </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">y</span><span class="p">)</span>
<span class="w">                        </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="n">y</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">t</span><span class="p">)))</span>
<span class="w">                      </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">))</span>
<span class="w">     </span><span class="p">(</span><span class="n">interleave</span>
<span class="w">      </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="p">)</span>
<span class="w">                    </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="w">                  </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">t</span><span class="p">))</span>
<span class="w">      </span><span class="p">(</span><span class="n">pairs</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">t</span><span class="p">))))))</span>

<span class="p">(</span><span class="n">display-stream-first-n</span><span class="w"> </span><span class="p">(</span><span class="n">pairs-all</span><span class="w"> </span><span class="n">integers</span><span class="w"> </span><span class="n">integers</span><span class="p">)</span><span class="w"> </span><span class="mi">16</span><span class="p">)</span>
</pre></div>

</details>
<div class="code-output">
<span>Output:</span>
<pre>
(1 1)
(2 1)
(1 2)
(3 1)
(2 2)
(4 1)
(1 3)
(5 1)
(2 3)
(6 1)
(1 4)
(7 1)
(3 3)
(8 1)
(1 5)
(9 1)</pre>
</div>
</div>


#### Exercise 3.68

Louis Reasoner thinks that
building a stream of pairs from three parts is unnecessarily complicated.
Instead of separating the pair $(S_0, T_0)$ from the rest of the pairs in
the first row, he proposes to work with the whole first row, as follows:

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">pairs</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">t</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">interleave</span>
<span class="w">   </span><span class="p">(</span><span class="nb">stream-map</span>
<span class="w">    </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="p">)</span><span class="w"> </span>
<span class="w">      </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="w">    </span><span class="n">t</span><span class="p">)</span>
<span class="w">   </span><span class="p">(</span><span class="n">pairs</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">          </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">t</span><span class="p">))))</span>
</pre></div>

Does this work?  Consider what happens if we evaluate `(pairs integers
integers)` using Louis's definition of `pairs`.

##### Solution

The difference is that if we have a recursive call to get the next 
elements of the stream, we need to make sure the next elements are `delay`ed. 
With Louis's version, the call to `pairs` is evaluated immediately.

One could imagine a version of `interleave` that uses a special form which
 delays its second argument, and if we did that Louis's approach would work.

#### Exercise 3.69

Write a procedure `triples`
that takes three infinite streams, $S$, $T$, and $U$, and produces the
stream of triples $(S_i, T_j, U_k)$ such that $i \le j \le k$.  
Use `triples` to generate the stream of all Pythagorean
triples of positive integers, i.e., the triples $(i, j, k)$ such that
$i \le j$ and $i^2 + j^2 = k^2$.

##### Solution

It's a bit harder to draw the 3D version of our table, but I did my best:

<div style="text-align: center; margin: 20px 0;">
  <img src="img/stu-optimized.gif" style="width: 70%; max-width: 800px;" alt="Visualization of the different pieces we're chopping our pairs into.">
</div>

<!-- 
test[s_, t_, u_] := 
  If[Not[s <= t <= u], 0, 
   If[s == t == u == 1, 1, If[s == 1 && t == 1, 2, If[s == 1, 3, 4]]]];
plt[interp_] := 
  ArrayPlot3D[Array[test, {5, 5, 5}], Axes -> True, 
   AxesLabel -> {"u", "t", "s"}, 
   ColorRules -> {1 -> Green, 2 -> Blue, 3 -> Red, 4 -> Purple}, 
   SphericalRegion -> True, 
   ViewPoint -> { 2 Cos[interp 2 Pi], 2 Sin[interp 2 Pi], 2}];
(* 
Manipulate[plt[interp],{interp,0,1}] *)
nframes = 360;
fps = 60;
resolution = 400;
frames = ParallelTable[
   Rasterize[plt[interp], ImageSize -> {resolution, resolution}],
   {interp, 0, 1 - 1/nframes, 1/nframes}];
Export["stu.gif", frames, "AnimationRepetitions" -> Infinity, 
 "DisplayDurations" -> 1/fps, ImageSize -> {resolution, resolution}]

-->

The idea is that we now interleave the pieces one-by-one. The green cube is 
just a single element, and the others (a line, a triangle, and a tetrahedron) 
have to be constructed specifically. This also should give us an idea of how 
to generalize if we wanted n-tuples.

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">triples</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">t</span><span class="w"> </span><span class="n">u</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">   </span><span class="c1">; Green single element</span>
<span class="w">   </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">t</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">u</span><span class="p">))</span>
<span class="w">   </span><span class="p">(</span><span class="n">interleave</span>
<span class="w">    </span><span class="c1">; Blue 1D list</span>
<span class="w">    </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="p">)</span>
<span class="w">                  </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">t</span><span class="p">)</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="w">                </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">u</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="n">interleave</span><span class="w"> </span>
<span class="w">      </span><span class="c1">; Red triangle</span>
<span class="w">      </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="p">)</span>
<span class="w">                    </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="w">                  </span><span class="p">(</span><span class="n">pairs</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">t</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">u</span><span class="p">)))</span>
<span class="w">      </span><span class="c1">; Purple simplex</span>
<span class="w">      </span><span class="p">(</span><span class="n">triples</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">t</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">u</span><span class="p">))))))</span>
</pre></div>


We might wonder where the tuple `(N N N)` occurs. After some investigation,
I find (empirically) it occurs at position $(4^N-1)/3$ in the list.

<div class="code-box" markdown="1">
<details class="collapsible-code">
<summary class="code-summary"><a href="code/ex3-69.rkt">code/ex3-69.rkt</a> <span class="expand-hint">(click to expand)</span></summary>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="k">stream</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">force</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">display-stream-first-n</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="n">s</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">&gt;</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">0</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="k">begin</span><span class="w"> </span>
<span class="w">      </span><span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">))</span>
<span class="w">      </span><span class="p">(</span><span class="n">display-stream-first-n</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">)))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">integers-starting-from</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span>
<span class="w">   </span><span class="n">n</span><span class="w"> </span><span class="p">(</span><span class="n">integers-starting-from</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">integers</span><span class="w"> </span><span class="p">(</span><span class="n">integers-starting-from</span><span class="w"> </span><span class="mi">1</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="o">.</span><span class="w"> </span><span class="n">argstreams</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))</span>
<span class="w">      </span><span class="n">the-empty-stream</span>
<span class="w">      </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">       </span><span class="p">(</span><span class="nb">apply</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="n">stream-car</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))</span>
<span class="w">       </span><span class="p">(</span><span class="nb">apply</span><span class="w"> </span><span class="nb">stream-map</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))))))</span>




<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">square</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">negate-series</span><span class="w"> </span><span class="n">S</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="nb">-</span><span class="w"> </span><span class="n">S</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">add-streams</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="nb">+</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">mul-streams</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="nb">*</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">scale-stream</span><span class="w"> </span><span class="n">S</span><span class="w"> </span><span class="n">m</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">m</span><span class="p">))</span><span class="w"> </span><span class="n">S</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">mul-series</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">add-streams</span><span class="w"> </span>
<span class="w">    </span><span class="p">(</span><span class="n">scale-stream</span><span class="w"> </span><span class="n">s2</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s1</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="p">(</span><span class="n">mul-series</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span><span class="w"> </span><span class="n">s2</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">partial-sums</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="mi">0</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-streams</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="p">(</span><span class="n">partial-sums</span><span class="w"> </span><span class="n">s</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-ref</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="nb">stream-ref</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">))))</span>



<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">interleave</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span>
<span class="w">      </span><span class="n">s2</span>
<span class="w">      </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">       </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span>
<span class="w">       </span><span class="p">(</span><span class="n">interleave</span><span class="w"> </span><span class="n">s2</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s1</span><span class="p">)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">pairs</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">t</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">   </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">t</span><span class="p">))</span>
<span class="w">   </span><span class="p">(</span><span class="n">interleave</span>
<span class="w">    </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="p">)</span>
<span class="w">                  </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="w">                </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">t</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="n">pairs</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">t</span><span class="p">)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">triples</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">t</span><span class="w"> </span><span class="n">u</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">   </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">t</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">u</span><span class="p">))</span>
<span class="w">   </span><span class="p">(</span><span class="n">interleave</span>
<span class="w">    </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="p">)</span>
<span class="w">                  </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">t</span><span class="p">)</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="w">                </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">u</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="n">interleave</span><span class="w"> </span>
<span class="w">      </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="p">)</span>
<span class="w">                    </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="w">                  </span><span class="p">(</span><span class="n">pairs</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">t</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">u</span><span class="p">)))</span>
<span class="w">      </span><span class="p">(</span><span class="n">triples</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">t</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">u</span><span class="p">))))))</span>


<span class="p">(</span><span class="n">display-stream-first-n</span><span class="w"> </span><span class="p">(</span><span class="n">triples</span><span class="w"> </span><span class="n">integers</span><span class="w"> </span><span class="n">integers</span><span class="w"> </span><span class="n">integers</span><span class="p">)</span><span class="w"> </span><span class="mi">21</span><span class="p">)</span>
</pre></div>

</details>
<div class="code-output">
<span>Output:</span>
<pre>
(1 1 1)
(1 1 2)
(1 2 2)
(1 1 3)
(2 2 2)
(1 1 4)
(1 2 3)
(1 1 5)
(2 2 3)
(1 1 6)
(1 3 3)
(1 1 7)
(2 3 3)
(1 1 8)
(1 2 4)
(1 1 9)
(2 2 4)
(1 1 10)
(1 3 4)
(1 1 11)
(3 3 3)</pre>
</div>
</div>



For enumerating pythagorean triples, this takes a super long time but 
we can enumerate the first three that we find:

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="n">display-stream-first-n</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-filter</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="p">)</span><span class="w"> </span>
<span class="w">    </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">a</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="w">          </span><span class="p">(</span><span class="n">b</span><span class="w"> </span><span class="p">(</span><span class="nb">cadr</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="w">          </span><span class="p">(</span><span class="n">c</span><span class="w"> </span><span class="p">(</span><span class="nb">caddr</span><span class="w"> </span><span class="n">x</span><span class="p">)))</span>
<span class="w">      </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="p">(</span><span class="n">square</span><span class="w"> </span><span class="n">a</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">square</span><span class="w"> </span><span class="n">b</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="n">square</span><span class="w"> </span><span class="n">c</span><span class="p">))))</span>
<span class="w">  </span><span class="p">(</span><span class="n">triples</span><span class="w"> </span><span class="n">integers</span><span class="w"> </span><span class="n">integers</span><span class="w"> </span><span class="n">integers</span><span class="p">))</span><span class="w"> </span><span class="mi">3</span><span class="p">)</span>
</pre></div>
<div class="code-box" markdown="1">
<details class="collapsible-code">
<summary class="code-summary"><a href="code/ex3-69-2.rkt">code/ex3-69-2.rkt</a> <span class="expand-hint">(click to expand)</span></summary>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="k">stream</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">force</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">display-stream-first-n</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="n">s</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">&gt;</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">0</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="k">begin</span><span class="w"> </span>
<span class="w">      </span><span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">))</span>
<span class="w">      </span><span class="p">(</span><span class="n">display-stream-first-n</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">)))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">integers-starting-from</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span>
<span class="w">   </span><span class="n">n</span><span class="w"> </span><span class="p">(</span><span class="n">integers-starting-from</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">integers</span><span class="w"> </span><span class="p">(</span><span class="n">integers-starting-from</span><span class="w"> </span><span class="mi">1</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="o">.</span><span class="w"> </span><span class="n">argstreams</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))</span>
<span class="w">      </span><span class="n">the-empty-stream</span>
<span class="w">      </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">       </span><span class="p">(</span><span class="nb">apply</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="n">stream-car</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))</span>
<span class="w">       </span><span class="p">(</span><span class="nb">apply</span><span class="w"> </span><span class="nb">stream-map</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-filter</span><span class="w"> </span><span class="n">pred</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="n">stream-null?</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span>
<span class="w">         </span><span class="n">the-empty-stream</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="n">pred</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="k">stream</span><span class="p">))</span>
<span class="w">         </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">          </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span>
<span class="w">          </span><span class="p">(</span><span class="nb">stream-filter</span>
<span class="w">           </span><span class="n">pred</span>
<span class="w">           </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">))))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-filter</span>
<span class="w">               </span><span class="n">pred</span>
<span class="w">               </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)))))</span>





<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">square</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">negate-series</span><span class="w"> </span><span class="n">S</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="nb">-</span><span class="w"> </span><span class="n">S</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">add-streams</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="nb">+</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">mul-streams</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="nb">*</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">scale-stream</span><span class="w"> </span><span class="n">S</span><span class="w"> </span><span class="n">m</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">m</span><span class="p">))</span><span class="w"> </span><span class="n">S</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">mul-series</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">add-streams</span><span class="w"> </span>
<span class="w">    </span><span class="p">(</span><span class="n">scale-stream</span><span class="w"> </span><span class="n">s2</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s1</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="p">(</span><span class="n">mul-series</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span><span class="w"> </span><span class="n">s2</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">partial-sums</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="mi">0</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-streams</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="p">(</span><span class="n">partial-sums</span><span class="w"> </span><span class="n">s</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-ref</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="nb">stream-ref</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">))))</span>



<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">interleave</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span>
<span class="w">      </span><span class="n">s2</span>
<span class="w">      </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">       </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span>
<span class="w">       </span><span class="p">(</span><span class="n">interleave</span><span class="w"> </span><span class="n">s2</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s1</span><span class="p">)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">pairs</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">t</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">   </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">t</span><span class="p">))</span>
<span class="w">   </span><span class="p">(</span><span class="n">interleave</span>
<span class="w">    </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="p">)</span>
<span class="w">                  </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="w">                </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">t</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="n">pairs</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">t</span><span class="p">)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">triples</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">t</span><span class="w"> </span><span class="n">u</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">   </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">t</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">u</span><span class="p">))</span>
<span class="w">   </span><span class="p">(</span><span class="n">interleave</span>
<span class="w">    </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="p">)</span>
<span class="w">                  </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">t</span><span class="p">)</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="w">                </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">u</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="n">interleave</span><span class="w"> </span>
<span class="w">      </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="p">)</span>
<span class="w">                    </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="w">                  </span><span class="p">(</span><span class="n">pairs</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">t</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">u</span><span class="p">)))</span>
<span class="w">      </span><span class="p">(</span><span class="n">triples</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">t</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">u</span><span class="p">))))))</span>



<span class="p">(</span><span class="n">display-stream-first-n</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-filter</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="p">)</span><span class="w"> </span>
<span class="w">    </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">a</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="w">          </span><span class="p">(</span><span class="n">b</span><span class="w"> </span><span class="p">(</span><span class="nb">cadr</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="w">          </span><span class="p">(</span><span class="n">c</span><span class="w"> </span><span class="p">(</span><span class="nb">caddr</span><span class="w"> </span><span class="n">x</span><span class="p">)))</span>
<span class="w">      </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="p">(</span><span class="n">square</span><span class="w"> </span><span class="n">a</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">square</span><span class="w"> </span><span class="n">b</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="n">square</span><span class="w"> </span><span class="n">c</span><span class="p">))))</span>
<span class="w">  </span><span class="p">(</span><span class="n">triples</span><span class="w"> </span><span class="n">integers</span><span class="w"> </span><span class="n">integers</span><span class="w"> </span><span class="n">integers</span><span class="p">))</span><span class="w"> </span><span class="mi">3</span><span class="p">)</span>
</pre></div>

</details>
<div class="code-output">
<span>Output:</span>
<pre>
(3 4 5)
(6 8 10)
(5 12 13)</pre>
</div>
</div>


#### Exercise 3.70

It would be nice to be able to
generate streams in which the pairs appear in some useful order, rather than in
the order that results from an *ad hoc* interleaving process.  We can use
a technique similar to the `merge` procedure of Exercise 3.56, if we
define a way to say that one pair of integers is "less than" another.  One
way to do this is to define a "weighting function" $W(i, j)$ and
stipulate that $(i_1, j_1)$ is less than $(i_2, j_2)$ if
$W(i_1, j_1) \lt W(i_2, j_2)$.  Write a procedure
`merge-weighted` that is like `merge`, except that
`merge-weighted` takes an additional argument `weight`, which is a
procedure that computes the weight of a pair, and is used to determine the
order in which elements should appear in the resulting merged
stream.  Using this, generalize `pairs` to a procedure
`weighted-pairs` that takes two streams, together with a procedure that
computes a weighting function, and generates the stream of pairs, ordered
according to weight.  Use your procedure to generate

**1.** the stream of all pairs of positive integers $(i, j)$ with $i \le j$
ordered according to the sum $i + j,$

**2.** the stream of all pairs of positive integers $(i, j)$ with $i \le j,$
where neither $i$ nor $j$ is divisible by 2, 3, or 5, and the pairs are
ordered according to the sum $2i + 3j + 5ij.$

##### Solution

The key code is this:
<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">merge-weighted</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="w"> </span><span class="n">W</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="n">stream-null?</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="n">stream-null?</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span>
<span class="w">         </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">s1car</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s1</span><span class="p">))</span>
<span class="w">               </span><span class="p">(</span><span class="n">s2car</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s2</span><span class="p">)))</span>
<span class="w">           </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">&lt;=</span><span class="w"> </span><span class="p">(</span><span class="n">W</span><span class="w"> </span><span class="n">s1car</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">W</span><span class="w"> </span><span class="n">s2car</span><span class="p">))</span>
<span class="w">                  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span>
<span class="w">                   </span><span class="n">s1car</span><span class="w"> </span>
<span class="w">                   </span><span class="p">(</span><span class="n">merge-weighted</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span><span class="w"> </span>
<span class="w">                                   </span><span class="n">s2</span><span class="w"> </span>
<span class="w">                                   </span><span class="n">W</span><span class="p">)))</span>
<span class="w">                 </span><span class="p">(</span><span class="k">else</span>
<span class="w">                  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span>
<span class="w">                   </span><span class="n">s2car</span><span class="w"> </span>
<span class="w">                   </span><span class="p">(</span><span class="n">merge-weighted</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span>
<span class="w">                                   </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span>
<span class="w">                                   </span><span class="n">W</span><span class="p">))))))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">weighted-pairs</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">t</span><span class="w"> </span><span class="n">W</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">   </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">t</span><span class="p">))</span>
<span class="w">   </span><span class="p">(</span><span class="n">merge-weighted</span>
<span class="w">    </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="p">)</span>
<span class="w">                  </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="w">                </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">t</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="n">weighted-pairs</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">t</span><span class="p">)</span><span class="w"> </span><span class="n">W</span><span class="p">)</span><span class="w"> </span>
<span class="w">    </span><span class="n">W</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">my-not-divisible</span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-filter</span><span class="w"> </span>
<span class="w">    </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">i</span><span class="p">)</span><span class="w"> </span>
<span class="w">      </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="p">(</span><span class="nb">remainder</span><span class="w"> </span><span class="n">i</span><span class="w"> </span><span class="mi">2</span><span class="p">)))</span>
<span class="w">           </span><span class="p">(</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="p">(</span><span class="nb">remainder</span><span class="w"> </span><span class="n">i</span><span class="w"> </span><span class="mi">3</span><span class="p">)))</span>
<span class="w">           </span><span class="p">(</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="p">(</span><span class="nb">remainder</span><span class="w"> </span><span class="n">i</span><span class="w"> </span><span class="mi">5</span><span class="p">)))))</span><span class="w"> </span><span class="n">integers</span><span class="p">))</span>

<span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="s2">&quot;Integers sorted by i+j&quot;</span><span class="p">)</span>
<span class="p">(</span><span class="n">display-stream-first-n</span><span class="w"> </span><span class="p">(</span><span class="n">weighted-pairs</span><span class="w"> </span><span class="n">integers</span><span class="w"> </span><span class="n">integers</span>
<span class="w">  </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">i</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">x</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="n">j</span><span class="w"> </span><span class="p">(</span><span class="nb">cadr</span><span class="w"> </span><span class="n">x</span><span class="p">)))</span><span class="w"> </span>
<span class="w">    </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">i</span><span class="w"> </span><span class="n">j</span><span class="p">))))</span><span class="w"> </span><span class="mi">10</span><span class="p">)</span>

<span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="s2">&quot;Integers with weird rules:&quot;</span><span class="p">)</span>

<span class="p">(</span><span class="n">display-stream-first-n</span><span class="w"> </span><span class="p">(</span><span class="n">weighted-pairs</span><span class="w"> </span><span class="n">my-not-divisible</span><span class="w"> </span><span class="n">my-not-divisible</span>
<span class="w">  </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">i</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">x</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="n">j</span><span class="w"> </span><span class="p">(</span><span class="nb">cadr</span><span class="w"> </span><span class="n">x</span><span class="p">)))</span><span class="w"> </span>
<span class="w">    </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="n">i</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="mi">3</span><span class="w"> </span><span class="n">j</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="mi">5</span><span class="w"> </span><span class="n">i</span><span class="w"> </span><span class="n">j</span><span class="p">)))))</span><span class="w"> </span><span class="mi">20</span><span class="p">)</span>
</pre></div>

<div class="code-box" markdown="1">
<details class="collapsible-code">
<summary class="code-summary"><a href="code/ex3-70.rkt">code/ex3-70.rkt</a> <span class="expand-hint">(click to expand)</span></summary>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="k">stream</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">force</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">display-stream-first-n</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="n">s</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">&gt;</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">0</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="k">begin</span><span class="w"> </span>
<span class="w">      </span><span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">))</span>
<span class="w">      </span><span class="p">(</span><span class="n">display-stream-first-n</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">)))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">integers-starting-from</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span>
<span class="w">   </span><span class="n">n</span><span class="w"> </span><span class="p">(</span><span class="n">integers-starting-from</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">integers</span><span class="w"> </span><span class="p">(</span><span class="n">integers-starting-from</span><span class="w"> </span><span class="mi">1</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="o">.</span><span class="w"> </span><span class="n">argstreams</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))</span>
<span class="w">      </span><span class="n">the-empty-stream</span>
<span class="w">      </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">       </span><span class="p">(</span><span class="nb">apply</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="n">stream-car</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))</span>
<span class="w">       </span><span class="p">(</span><span class="nb">apply</span><span class="w"> </span><span class="nb">stream-map</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))))))</span>




<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">square</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">negate-series</span><span class="w"> </span><span class="n">S</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="nb">-</span><span class="w"> </span><span class="n">S</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">add-streams</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="nb">+</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">mul-streams</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="nb">*</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">scale-stream</span><span class="w"> </span><span class="n">S</span><span class="w"> </span><span class="n">m</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">m</span><span class="p">))</span><span class="w"> </span><span class="n">S</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">mul-series</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">add-streams</span><span class="w"> </span>
<span class="w">    </span><span class="p">(</span><span class="n">scale-stream</span><span class="w"> </span><span class="n">s2</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s1</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="p">(</span><span class="n">mul-series</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span><span class="w"> </span><span class="n">s2</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">partial-sums</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="mi">0</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-streams</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="p">(</span><span class="n">partial-sums</span><span class="w"> </span><span class="n">s</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-ref</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="nb">stream-ref</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">))))</span>



<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">interleave</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span>
<span class="w">      </span><span class="n">s2</span>
<span class="w">      </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">       </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span>
<span class="w">       </span><span class="p">(</span><span class="n">interleave</span><span class="w"> </span><span class="n">s2</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s1</span><span class="p">)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">merge</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="n">stream-null?</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="n">stream-null?</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span>
<span class="w">         </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">s1car</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s1</span><span class="p">))</span>
<span class="w">               </span><span class="p">(</span><span class="n">s2car</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s2</span><span class="p">)))</span>
<span class="w">           </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">&lt;</span><span class="w"> </span><span class="n">s1car</span><span class="w"> </span><span class="n">s2car</span><span class="p">)</span>
<span class="w">                  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span>
<span class="w">                   </span><span class="n">s1car</span><span class="w"> </span>
<span class="w">                   </span><span class="p">(</span><span class="n">merge</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span><span class="w"> </span>
<span class="w">                          </span><span class="n">s2</span><span class="p">)))</span>
<span class="w">                 </span><span class="p">((</span><span class="nb">&gt;</span><span class="w"> </span><span class="n">s1car</span><span class="w"> </span><span class="n">s2car</span><span class="p">)</span>
<span class="w">                  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span>
<span class="w">                   </span><span class="n">s2car</span><span class="w"> </span>
<span class="w">                   </span><span class="p">(</span><span class="n">merge</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span>
<span class="w">                          </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s2</span><span class="p">))))</span>
<span class="w">                 </span><span class="p">(</span><span class="k">else</span>
<span class="w">                  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span>
<span class="w">                   </span><span class="n">s1car</span>
<span class="w">                   </span><span class="p">(</span><span class="n">merge</span><span class="w"> </span>
<span class="w">                    </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span>
<span class="w">                    </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s2</span><span class="p">)))))))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">merge-weighted</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="w"> </span><span class="n">W</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="n">stream-null?</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="n">stream-null?</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span>
<span class="w">         </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">s1car</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s1</span><span class="p">))</span>
<span class="w">               </span><span class="p">(</span><span class="n">s2car</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s2</span><span class="p">)))</span>
<span class="w">           </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">&lt;=</span><span class="w"> </span><span class="p">(</span><span class="n">W</span><span class="w"> </span><span class="n">s1car</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">W</span><span class="w"> </span><span class="n">s2car</span><span class="p">))</span>
<span class="w">                  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span>
<span class="w">                   </span><span class="n">s1car</span><span class="w"> </span>
<span class="w">                   </span><span class="p">(</span><span class="n">merge-weighted</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span><span class="w"> </span>
<span class="w">                                   </span><span class="n">s2</span><span class="w"> </span>
<span class="w">                                   </span><span class="n">W</span><span class="p">)))</span>
<span class="w">                 </span><span class="p">(</span><span class="k">else</span>
<span class="w">                  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span>
<span class="w">                   </span><span class="n">s2car</span><span class="w"> </span>
<span class="w">                   </span><span class="p">(</span><span class="n">merge-weighted</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span>
<span class="w">                                   </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span>
<span class="w">                                   </span><span class="n">W</span><span class="p">))))))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">weighted-pairs</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">t</span><span class="w"> </span><span class="n">W</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">   </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">t</span><span class="p">))</span>
<span class="w">   </span><span class="p">(</span><span class="n">merge-weighted</span>
<span class="w">    </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="p">)</span>
<span class="w">                  </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="w">                </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">t</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="n">weighted-pairs</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">t</span><span class="p">)</span><span class="w"> </span><span class="n">W</span><span class="p">)</span><span class="w"> </span>
<span class="w">    </span><span class="n">W</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">pairs</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">t</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">   </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">t</span><span class="p">))</span>
<span class="w">   </span><span class="p">(</span><span class="n">interleave</span>
<span class="w">    </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="p">)</span>
<span class="w">                  </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="w">                </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">t</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="n">pairs</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">t</span><span class="p">)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-filter</span><span class="w"> </span><span class="n">pred</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="n">stream-null?</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span>
<span class="w">         </span><span class="n">the-empty-stream</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="n">pred</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="k">stream</span><span class="p">))</span>
<span class="w">         </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">          </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span>
<span class="w">          </span><span class="p">(</span><span class="nb">stream-filter</span>
<span class="w">           </span><span class="n">pred</span>
<span class="w">           </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">))))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-filter</span>
<span class="w">               </span><span class="n">pred</span>
<span class="w">               </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">my-not-divisible</span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-filter</span><span class="w"> </span>
<span class="w">    </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">i</span><span class="p">)</span><span class="w"> </span>
<span class="w">      </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="p">(</span><span class="nb">remainder</span><span class="w"> </span><span class="n">i</span><span class="w"> </span><span class="mi">2</span><span class="p">)))</span>
<span class="w">           </span><span class="p">(</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="p">(</span><span class="nb">remainder</span><span class="w"> </span><span class="n">i</span><span class="w"> </span><span class="mi">3</span><span class="p">)))</span>
<span class="w">           </span><span class="p">(</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="p">(</span><span class="nb">remainder</span><span class="w"> </span><span class="n">i</span><span class="w"> </span><span class="mi">5</span><span class="p">)))))</span><span class="w"> </span><span class="n">integers</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">display-n-with-weight</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="n">W</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="n">s</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">&gt;</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">0</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="k">begin</span><span class="w"> </span>
<span class="w">      </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">))</span>
<span class="w">      </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot; : W = &quot;</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="p">(</span><span class="n">W</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">)))</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="n">display-n-with-weight</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span><span class="w"> </span><span class="n">W</span><span class="p">))))</span>



<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">W1</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">i</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">x</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="n">j</span><span class="w"> </span><span class="p">(</span><span class="nb">cadr</span><span class="w"> </span><span class="n">x</span><span class="p">)))</span><span class="w"> </span>
<span class="w">    </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">i</span><span class="w"> </span><span class="n">j</span><span class="p">))))</span>
<span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="s2">&quot;Integers sorted by i+j&quot;</span><span class="p">)</span>
<span class="p">(</span><span class="n">display-n-with-weight</span><span class="w"> </span><span class="p">(</span><span class="n">weighted-pairs</span><span class="w"> </span><span class="n">integers</span><span class="w"> </span><span class="n">integers</span><span class="w"> </span><span class="n">W1</span><span class="p">)</span><span class="w"> </span><span class="mi">20</span><span class="w"> </span><span class="n">W1</span><span class="p">)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">W2</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">i</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">x</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="n">j</span><span class="w"> </span><span class="p">(</span><span class="nb">cadr</span><span class="w"> </span><span class="n">x</span><span class="p">)))</span><span class="w"> </span>
<span class="w">    </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="n">i</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="mi">3</span><span class="w"> </span><span class="n">j</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="mi">5</span><span class="w"> </span><span class="n">i</span><span class="w"> </span><span class="n">j</span><span class="p">)))))</span>
<span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="s2">&quot;Integers with weird rules:&quot;</span><span class="p">)</span>
<span class="p">(</span><span class="n">display-n-with-weight</span><span class="w"> </span><span class="p">(</span><span class="n">weighted-pairs</span><span class="w"> </span><span class="n">my-not-divisible</span><span class="w"> </span><span class="n">my-not-divisible</span><span class="w"> </span><span class="n">W2</span><span class="p">)</span><span class="w"> </span><span class="mi">40</span><span class="w"> </span><span class="n">W2</span><span class="p">)</span>
</pre></div>

</details>
<div class="code-output">
<span>Output:</span>
<pre>
Integers sorted by i+j(1 1) : W = 2
(1 2) : W = 3
(1 3) : W = 4
(2 2) : W = 4
(1 4) : W = 5
(2 3) : W = 5
(1 5) : W = 6
(2 4) : W = 6
(3 3) : W = 6
(1 6) : W = 7
(2 5) : W = 7
(3 4) : W = 7
(1 7) : W = 8
(2 6) : W = 8
(3 5) : W = 8
(4 4) : W = 8
(1 8) : W = 9
(2 7) : W = 9
(3 6) : W = 9
(4 5) : W = 9

Integers with weird rules:(1 1) : W = 10
(1 7) : W = 58
(1 11) : W = 90
(1 13) : W = 106
(1 17) : W = 138
(1 19) : W = 154
(1 23) : W = 186
(1 29) : W = 234
(1 31) : W = 250
(7 7) : W = 280
(1 37) : W = 298
(1 41) : W = 330
(1 43) : W = 346
(1 47) : W = 378
(1 49) : W = 394
(1 53) : W = 426
(7 11) : W = 432
(1 59) : W = 474
(1 61) : W = 490
(7 13) : W = 508
(1 67) : W = 538
(1 71) : W = 570
(1 73) : W = 586
(1 77) : W = 618
(1 79) : W = 634
(7 17) : W = 660
(11 11) : W = 660
(1 83) : W = 666
(1 89) : W = 714
(1 91) : W = 730
(7 19) : W = 736
(11 13) : W = 776
(1 97) : W = 778
(1 101) : W = 810
(1 103) : W = 826
(1 107) : W = 858
(1 109) : W = 874
(7 23) : W = 888
(1 113) : W = 906
(13 13) : W = 910
</pre>
</div>
</div>


#### Exercise 3.71

Numbers that can be expressed as
the sum of two cubes in more than one way are sometimes called
Ramanujan numbers, in honor of the mathematician Srinivasa
Ramanujan. Ordered streams of pairs provide an elegant
solution to the problem of computing these numbers.  To find a number that can
be written as the sum of two cubes in two different ways, we need only generate
the stream of pairs of integers $(i, j)$ weighted according to the sum
$i^3 + j^3$ (see Exercise 3.70), then search the stream for two
consecutive pairs with the same weight.  Write a procedure to generate the
Ramanujan numbers.  The first such number is $1729.$  What are the next five?

##### Solution

First we generate a stream of consecutive pairs, then 
we filter the stream to check if any have equal weights.

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">cube</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">my-W</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">i</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">x</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="n">j</span><span class="w"> </span><span class="p">(</span><span class="nb">cadr</span><span class="w"> </span><span class="n">x</span><span class="p">)))</span><span class="w"> </span>
<span class="w">    </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="p">(</span><span class="n">cube</span><span class="w"> </span><span class="n">i</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">cube</span><span class="w"> </span><span class="n">j</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">cube-sorted-stream</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="n">weighted-pairs</span><span class="w"> </span><span class="n">integers</span><span class="w"> </span><span class="n">integers</span><span class="w"> </span><span class="n">my-W</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">walking-pairs</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let*</span><span class="w"> </span><span class="p">((</span><span class="n">s0</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">))</span>
<span class="w">         </span><span class="p">(</span><span class="n">s-rest</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">))</span>
<span class="w">         </span><span class="p">(</span><span class="n">s1</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s-rest</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="n">s0</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">walking-pairs</span><span class="w"> </span><span class="n">s-rest</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">ramanujan-stream</span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-filter</span><span class="w"> </span>
<span class="w">        </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="p">)</span>
<span class="w">          </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="p">(</span><span class="n">my-W</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">x</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="n">my-W</span><span class="w"> </span><span class="p">(</span><span class="nb">cadr</span><span class="w"> </span><span class="n">x</span><span class="p">))))</span>
<span class="w">        </span><span class="p">(</span><span class="n">walking-pairs</span><span class="w"> </span><span class="n">cube-sorted-stream</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">display-n-with-weight</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="n">W</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="n">s</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">&gt;</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">0</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="k">begin</span><span class="w"> </span>
<span class="w">      </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">))</span>
<span class="w">      </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot; : Weight = &quot;</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="p">(</span><span class="n">W</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">)))</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="n">display-n-with-weight</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span><span class="w"> </span><span class="n">W</span><span class="p">))))</span>

<span class="p">(</span><span class="n">display-n-with-weight</span><span class="w"> </span><span class="n">ramanujan-stream</span><span class="w"> </span><span class="mi">6</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">my-W</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">x</span><span class="p">))))</span>
</pre></div>

<div class="code-box" markdown="1">
<details class="collapsible-code">
<summary class="code-summary"><a href="code/ex3-71.rkt">code/ex3-71.rkt</a> <span class="expand-hint">(click to expand)</span></summary>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="k">stream</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">force</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">display-stream-first-n</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="n">s</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">&gt;</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">0</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="k">begin</span><span class="w"> </span>
<span class="w">      </span><span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">))</span>
<span class="w">      </span><span class="p">(</span><span class="n">display-stream-first-n</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">)))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">integers-starting-from</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span>
<span class="w">   </span><span class="n">n</span><span class="w"> </span><span class="p">(</span><span class="n">integers-starting-from</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">integers</span><span class="w"> </span><span class="p">(</span><span class="n">integers-starting-from</span><span class="w"> </span><span class="mi">1</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="o">.</span><span class="w"> </span><span class="n">argstreams</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))</span>
<span class="w">      </span><span class="n">the-empty-stream</span>
<span class="w">      </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">       </span><span class="p">(</span><span class="nb">apply</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="n">stream-car</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))</span>
<span class="w">       </span><span class="p">(</span><span class="nb">apply</span><span class="w"> </span><span class="nb">stream-map</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))))))</span>




<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">square</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">negate-series</span><span class="w"> </span><span class="n">S</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="nb">-</span><span class="w"> </span><span class="n">S</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">add-streams</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="nb">+</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">mul-streams</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="nb">*</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">scale-stream</span><span class="w"> </span><span class="n">S</span><span class="w"> </span><span class="n">m</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">m</span><span class="p">))</span><span class="w"> </span><span class="n">S</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">mul-series</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">add-streams</span><span class="w"> </span>
<span class="w">    </span><span class="p">(</span><span class="n">scale-stream</span><span class="w"> </span><span class="n">s2</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s1</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="p">(</span><span class="n">mul-series</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span><span class="w"> </span><span class="n">s2</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">partial-sums</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="mi">0</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-streams</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="p">(</span><span class="n">partial-sums</span><span class="w"> </span><span class="n">s</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-ref</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="nb">stream-ref</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">))))</span>



<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">interleave</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span>
<span class="w">      </span><span class="n">s2</span>
<span class="w">      </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">       </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span>
<span class="w">       </span><span class="p">(</span><span class="n">interleave</span><span class="w"> </span><span class="n">s2</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s1</span><span class="p">)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">merge</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="n">stream-null?</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="n">stream-null?</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span>
<span class="w">         </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">s1car</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s1</span><span class="p">))</span>
<span class="w">               </span><span class="p">(</span><span class="n">s2car</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s2</span><span class="p">)))</span>
<span class="w">           </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">&lt;</span><span class="w"> </span><span class="n">s1car</span><span class="w"> </span><span class="n">s2car</span><span class="p">)</span>
<span class="w">                  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span>
<span class="w">                   </span><span class="n">s1car</span><span class="w"> </span>
<span class="w">                   </span><span class="p">(</span><span class="n">merge</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span><span class="w"> </span>
<span class="w">                          </span><span class="n">s2</span><span class="p">)))</span>
<span class="w">                 </span><span class="p">((</span><span class="nb">&gt;</span><span class="w"> </span><span class="n">s1car</span><span class="w"> </span><span class="n">s2car</span><span class="p">)</span>
<span class="w">                  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span>
<span class="w">                   </span><span class="n">s2car</span><span class="w"> </span>
<span class="w">                   </span><span class="p">(</span><span class="n">merge</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span>
<span class="w">                          </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s2</span><span class="p">))))</span>
<span class="w">                 </span><span class="p">(</span><span class="k">else</span>
<span class="w">                  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span>
<span class="w">                   </span><span class="n">s1car</span>
<span class="w">                   </span><span class="p">(</span><span class="n">merge</span><span class="w"> </span>
<span class="w">                    </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span>
<span class="w">                    </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s2</span><span class="p">)))))))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">merge-weighted</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="w"> </span><span class="n">W</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="n">stream-null?</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="n">stream-null?</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span>
<span class="w">         </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">s1car</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s1</span><span class="p">))</span>
<span class="w">               </span><span class="p">(</span><span class="n">s2car</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s2</span><span class="p">)))</span>
<span class="w">           </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">&lt;=</span><span class="w"> </span><span class="p">(</span><span class="n">W</span><span class="w"> </span><span class="n">s1car</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">W</span><span class="w"> </span><span class="n">s2car</span><span class="p">))</span>
<span class="w">                  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span>
<span class="w">                   </span><span class="n">s1car</span><span class="w"> </span>
<span class="w">                   </span><span class="p">(</span><span class="n">merge-weighted</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span><span class="w"> </span>
<span class="w">                                   </span><span class="n">s2</span><span class="w"> </span>
<span class="w">                                   </span><span class="n">W</span><span class="p">)))</span>
<span class="w">                 </span><span class="p">(</span><span class="k">else</span>
<span class="w">                  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span>
<span class="w">                   </span><span class="n">s2car</span><span class="w"> </span>
<span class="w">                   </span><span class="p">(</span><span class="n">merge-weighted</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span>
<span class="w">                                   </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span>
<span class="w">                                   </span><span class="n">W</span><span class="p">))))))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">weighted-pairs</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">t</span><span class="w"> </span><span class="n">W</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">   </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">t</span><span class="p">))</span>
<span class="w">   </span><span class="p">(</span><span class="n">merge-weighted</span>
<span class="w">    </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="p">)</span>
<span class="w">                  </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="w">                </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">t</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="n">weighted-pairs</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">t</span><span class="p">)</span><span class="w"> </span><span class="n">W</span><span class="p">)</span><span class="w"> </span>
<span class="w">    </span><span class="n">W</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">pairs</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">t</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">   </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">t</span><span class="p">))</span>
<span class="w">   </span><span class="p">(</span><span class="n">interleave</span>
<span class="w">    </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="p">)</span>
<span class="w">                  </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="w">                </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">t</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="n">pairs</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">t</span><span class="p">)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-filter</span><span class="w"> </span><span class="n">pred</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="n">stream-null?</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span>
<span class="w">         </span><span class="n">the-empty-stream</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="n">pred</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="k">stream</span><span class="p">))</span>
<span class="w">         </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">          </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span>
<span class="w">          </span><span class="p">(</span><span class="nb">stream-filter</span>
<span class="w">           </span><span class="n">pred</span>
<span class="w">           </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">))))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-filter</span>
<span class="w">               </span><span class="n">pred</span>
<span class="w">               </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)))))</span>

<span class="c1">;; takes a stream (s0 s1 s2 ...) and returns a stream</span>
<span class="c1">;; ((s0 s1) (s1 s2) (s2 s3) ...)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">cube</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">my-W</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">i</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">x</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="n">j</span><span class="w"> </span><span class="p">(</span><span class="nb">cadr</span><span class="w"> </span><span class="n">x</span><span class="p">)))</span><span class="w"> </span>
<span class="w">    </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="p">(</span><span class="n">cube</span><span class="w"> </span><span class="n">i</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">cube</span><span class="w"> </span><span class="n">j</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">cube-sorted-stream</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="n">weighted-pairs</span><span class="w"> </span><span class="n">integers</span><span class="w"> </span><span class="n">integers</span><span class="w"> </span><span class="n">my-W</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">walking-pairs</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let*</span><span class="w"> </span><span class="p">((</span><span class="n">s0</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">))</span>
<span class="w">         </span><span class="p">(</span><span class="n">s-rest</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">))</span>
<span class="w">         </span><span class="p">(</span><span class="n">s1</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s-rest</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="n">s0</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">walking-pairs</span><span class="w"> </span><span class="n">s-rest</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">ramanujan-stream</span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-filter</span><span class="w"> </span>
<span class="w">        </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="p">)</span>
<span class="w">          </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="p">(</span><span class="n">my-W</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">x</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="n">my-W</span><span class="w"> </span><span class="p">(</span><span class="nb">cadr</span><span class="w"> </span><span class="n">x</span><span class="p">))))</span>
<span class="w">        </span><span class="p">(</span><span class="n">walking-pairs</span><span class="w"> </span><span class="n">cube-sorted-stream</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">display-n-with-weight</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="n">W</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="n">s</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">&gt;</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">0</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="k">begin</span><span class="w"> </span>
<span class="w">      </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">))</span>
<span class="w">      </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot; : Weight = &quot;</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="p">(</span><span class="n">W</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">)))</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="n">display-n-with-weight</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span><span class="w"> </span><span class="n">W</span><span class="p">))))</span>

<span class="p">(</span><span class="n">display-n-with-weight</span><span class="w"> </span><span class="n">ramanujan-stream</span><span class="w"> </span><span class="mi">6</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">my-W</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">x</span><span class="p">))))</span>

<span class="c1">;; (define (my-search s lv n)</span>
<span class="c1">;;   (if (&gt; n 0)</span>
<span class="c1">;;     (let ((nv (stream-car s)))</span>
<span class="c1">;;       (if (= (my-W nv) (my-W lv))</span>
<span class="c1">;;         (begin </span>
<span class="c1">;;           (display &quot;Two cubes found: &quot;)</span>
<span class="c1">;;           (display nv)</span>
<span class="c1">;;           (display &quot; and &quot;)</span>
<span class="c1">;;           (display lv)</span>
<span class="c1">;;           (display &quot; both have sum cube &quot;)</span>
<span class="c1">;;           (display (my-W lv)) (newline)</span>
<span class="c1">;;           (my-search (stream-cdr s) nv (- n 1)))</span>
<span class="c1">;;         (my-search (stream-cdr s) nv n)))))</span>
<span class="c1">;; </span>
<span class="c1">;; (my-search cube-sorted-stream (list 0 0) 6)</span>

<span class="c1">; (define echo (lambda (x) (begin </span>
<span class="c1">;    (display-line (my-W x)) x)))</span>
<span class="c1">; (display-stream-first-n </span>
<span class="c1">;  (stream-map echo cube-sorted-stream) 100)</span>
</pre></div>

</details>
<div class="code-output">
<span>Output:</span>
<pre>((1 12) (9 10)) : Weight = 1729
((2 16) (9 15)) : Weight = 4104
((2 24) (18 20)) : Weight = 13832
((10 27) (19 24)) : Weight = 20683
((4 32) (18 30)) : Weight = 32832
((2 34) (15 33)) : Weight = 39312
</pre>
</div>
</div>


#### Exercise 3.72

In a similar way to Exercise 3.71 
generate a stream of all numbers that can be written as the sum of two
squares in three different ways (showing how they can be so written).

##### Solution

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">my-W</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">i</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">x</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="n">j</span><span class="w"> </span><span class="p">(</span><span class="nb">cadr</span><span class="w"> </span><span class="n">x</span><span class="p">)))</span><span class="w"> </span>
<span class="w">    </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="p">(</span><span class="n">square</span><span class="w"> </span><span class="n">i</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">square</span><span class="w"> </span><span class="n">j</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">square-sorted-stream</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="n">weighted-pairs</span><span class="w"> </span><span class="n">integers</span><span class="w"> </span><span class="n">integers</span><span class="w"> </span><span class="n">my-W</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">walking-triples</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let*</span><span class="w"> </span><span class="p">((</span><span class="n">s0</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">))</span>
<span class="w">         </span><span class="p">(</span><span class="n">s-rest</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">))</span>
<span class="w">         </span><span class="p">(</span><span class="n">s1</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s-rest</span><span class="p">))</span>
<span class="w">         </span><span class="p">(</span><span class="n">s-rest-rest</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s-rest</span><span class="p">))</span>
<span class="w">         </span><span class="p">(</span><span class="n">s2</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s-rest-rest</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="n">s0</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">walking-triples</span><span class="w"> </span><span class="n">s-rest</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">problem-72-stream</span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-filter</span><span class="w"> </span>
<span class="w">        </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="p">)</span>
<span class="w">          </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="p">(</span><span class="n">my-W</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">x</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="n">my-W</span><span class="w"> </span><span class="p">(</span><span class="nb">cadr</span><span class="w"> </span><span class="n">x</span><span class="p">)))</span>
<span class="w">               </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="p">(</span><span class="n">my-W</span><span class="w"> </span><span class="p">(</span><span class="nb">cadr</span><span class="w"> </span><span class="n">x</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="n">my-W</span><span class="w"> </span><span class="p">(</span><span class="nb">caddr</span><span class="w"> </span><span class="n">x</span><span class="p">)))))</span>
<span class="w">        </span><span class="p">(</span><span class="n">walking-triples</span><span class="w"> </span><span class="n">square-sorted-stream</span><span class="p">)))</span>

<span class="p">(</span><span class="n">display-n-with-weight</span><span class="w"> </span><span class="n">problem-72-stream</span><span class="w"> </span><span class="mi">10</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">my-W</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">x</span><span class="p">))))</span>
</pre></div>
<div class="code-box" markdown="1">
<details class="collapsible-code">
<summary class="code-summary"><a href="code/ex3-72.rkt">code/ex3-72.rkt</a> <span class="expand-hint">(click to expand)</span></summary>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="k">stream</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">force</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">display-stream-first-n</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="n">s</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">&gt;</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">0</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="k">begin</span><span class="w"> </span>
<span class="w">      </span><span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">))</span>
<span class="w">      </span><span class="p">(</span><span class="n">display-stream-first-n</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">)))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">integers-starting-from</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span>
<span class="w">   </span><span class="n">n</span><span class="w"> </span><span class="p">(</span><span class="n">integers-starting-from</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">integers</span><span class="w"> </span><span class="p">(</span><span class="n">integers-starting-from</span><span class="w"> </span><span class="mi">1</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="o">.</span><span class="w"> </span><span class="n">argstreams</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))</span>
<span class="w">      </span><span class="n">the-empty-stream</span>
<span class="w">      </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">       </span><span class="p">(</span><span class="nb">apply</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="n">stream-car</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))</span>
<span class="w">       </span><span class="p">(</span><span class="nb">apply</span><span class="w"> </span><span class="nb">stream-map</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))))))</span>




<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">square</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">negate-series</span><span class="w"> </span><span class="n">S</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="nb">-</span><span class="w"> </span><span class="n">S</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">add-streams</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="nb">+</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">mul-streams</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="nb">*</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">scale-stream</span><span class="w"> </span><span class="n">S</span><span class="w"> </span><span class="n">m</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">m</span><span class="p">))</span><span class="w"> </span><span class="n">S</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">mul-series</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">add-streams</span><span class="w"> </span>
<span class="w">    </span><span class="p">(</span><span class="n">scale-stream</span><span class="w"> </span><span class="n">s2</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s1</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="p">(</span><span class="n">mul-series</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span><span class="w"> </span><span class="n">s2</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">partial-sums</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="mi">0</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-streams</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="p">(</span><span class="n">partial-sums</span><span class="w"> </span><span class="n">s</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-ref</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="nb">stream-ref</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">))))</span>



<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">interleave</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span>
<span class="w">      </span><span class="n">s2</span>
<span class="w">      </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">       </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span>
<span class="w">       </span><span class="p">(</span><span class="n">interleave</span><span class="w"> </span><span class="n">s2</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s1</span><span class="p">)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">merge</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="n">stream-null?</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="n">stream-null?</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span>
<span class="w">         </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">s1car</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s1</span><span class="p">))</span>
<span class="w">               </span><span class="p">(</span><span class="n">s2car</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s2</span><span class="p">)))</span>
<span class="w">           </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">&lt;</span><span class="w"> </span><span class="n">s1car</span><span class="w"> </span><span class="n">s2car</span><span class="p">)</span>
<span class="w">                  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span>
<span class="w">                   </span><span class="n">s1car</span><span class="w"> </span>
<span class="w">                   </span><span class="p">(</span><span class="n">merge</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span><span class="w"> </span>
<span class="w">                          </span><span class="n">s2</span><span class="p">)))</span>
<span class="w">                 </span><span class="p">((</span><span class="nb">&gt;</span><span class="w"> </span><span class="n">s1car</span><span class="w"> </span><span class="n">s2car</span><span class="p">)</span>
<span class="w">                  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span>
<span class="w">                   </span><span class="n">s2car</span><span class="w"> </span>
<span class="w">                   </span><span class="p">(</span><span class="n">merge</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span>
<span class="w">                          </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s2</span><span class="p">))))</span>
<span class="w">                 </span><span class="p">(</span><span class="k">else</span>
<span class="w">                  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span>
<span class="w">                   </span><span class="n">s1car</span>
<span class="w">                   </span><span class="p">(</span><span class="n">merge</span><span class="w"> </span>
<span class="w">                    </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span>
<span class="w">                    </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s2</span><span class="p">)))))))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">merge-weighted</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="w"> </span><span class="n">W</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="n">stream-null?</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="n">stream-null?</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span>
<span class="w">         </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">s1car</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s1</span><span class="p">))</span>
<span class="w">               </span><span class="p">(</span><span class="n">s2car</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s2</span><span class="p">)))</span>
<span class="w">           </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">&lt;=</span><span class="w"> </span><span class="p">(</span><span class="n">W</span><span class="w"> </span><span class="n">s1car</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">W</span><span class="w"> </span><span class="n">s2car</span><span class="p">))</span>
<span class="w">                  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span>
<span class="w">                   </span><span class="n">s1car</span><span class="w"> </span>
<span class="w">                   </span><span class="p">(</span><span class="n">merge-weighted</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span><span class="w"> </span>
<span class="w">                                   </span><span class="n">s2</span><span class="w"> </span>
<span class="w">                                   </span><span class="n">W</span><span class="p">)))</span>
<span class="w">                 </span><span class="p">(</span><span class="k">else</span>
<span class="w">                  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span>
<span class="w">                   </span><span class="n">s2car</span><span class="w"> </span>
<span class="w">                   </span><span class="p">(</span><span class="n">merge-weighted</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span>
<span class="w">                                   </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span>
<span class="w">                                   </span><span class="n">W</span><span class="p">))))))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">weighted-pairs</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">t</span><span class="w"> </span><span class="n">W</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">   </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">t</span><span class="p">))</span>
<span class="w">   </span><span class="p">(</span><span class="n">merge-weighted</span>
<span class="w">    </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="p">)</span>
<span class="w">                  </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="w">                </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">t</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="n">weighted-pairs</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">t</span><span class="p">)</span><span class="w"> </span><span class="n">W</span><span class="p">)</span><span class="w"> </span>
<span class="w">    </span><span class="n">W</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">pairs</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">t</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">   </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">t</span><span class="p">))</span>
<span class="w">   </span><span class="p">(</span><span class="n">interleave</span>
<span class="w">    </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="p">)</span>
<span class="w">                  </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="w">                </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">t</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="n">pairs</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">t</span><span class="p">)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-filter</span><span class="w"> </span><span class="n">pred</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="n">stream-null?</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span>
<span class="w">         </span><span class="n">the-empty-stream</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="n">pred</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="k">stream</span><span class="p">))</span>
<span class="w">         </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">          </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span>
<span class="w">          </span><span class="p">(</span><span class="nb">stream-filter</span>
<span class="w">           </span><span class="n">pred</span>
<span class="w">           </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">))))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-filter</span>
<span class="w">               </span><span class="n">pred</span>
<span class="w">               </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">display-n-with-weight</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="n">W</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="n">s</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">&gt;</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">0</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="k">begin</span><span class="w"> </span>
<span class="w">      </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">))</span>
<span class="w">      </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot; : Weight = &quot;</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="p">(</span><span class="n">W</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">)))</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="n">display-n-with-weight</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span><span class="w"> </span><span class="n">W</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">my-W</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">i</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">x</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="n">j</span><span class="w"> </span><span class="p">(</span><span class="nb">cadr</span><span class="w"> </span><span class="n">x</span><span class="p">)))</span><span class="w"> </span>
<span class="w">    </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="p">(</span><span class="n">square</span><span class="w"> </span><span class="n">i</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">square</span><span class="w"> </span><span class="n">j</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">square-sorted-stream</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="n">weighted-pairs</span><span class="w"> </span><span class="n">integers</span><span class="w"> </span><span class="n">integers</span><span class="w"> </span><span class="n">my-W</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">walking-triples</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let*</span><span class="w"> </span><span class="p">((</span><span class="n">s0</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">))</span>
<span class="w">         </span><span class="p">(</span><span class="n">s-rest</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">))</span>
<span class="w">         </span><span class="p">(</span><span class="n">s1</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s-rest</span><span class="p">))</span>
<span class="w">         </span><span class="p">(</span><span class="n">s-rest-rest</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s-rest</span><span class="p">))</span>
<span class="w">         </span><span class="p">(</span><span class="n">s2</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s-rest-rest</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="n">s0</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">walking-triples</span><span class="w"> </span><span class="n">s-rest</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">problem-72-stream</span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-filter</span><span class="w"> </span>
<span class="w">        </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="p">)</span>
<span class="w">          </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="p">(</span><span class="n">my-W</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">x</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="n">my-W</span><span class="w"> </span><span class="p">(</span><span class="nb">cadr</span><span class="w"> </span><span class="n">x</span><span class="p">)))</span>
<span class="w">               </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="p">(</span><span class="n">my-W</span><span class="w"> </span><span class="p">(</span><span class="nb">cadr</span><span class="w"> </span><span class="n">x</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="n">my-W</span><span class="w"> </span><span class="p">(</span><span class="nb">caddr</span><span class="w"> </span><span class="n">x</span><span class="p">)))))</span>
<span class="w">        </span><span class="p">(</span><span class="n">walking-triples</span><span class="w"> </span><span class="n">square-sorted-stream</span><span class="p">)))</span>


<span class="p">(</span><span class="n">display-n-with-weight</span><span class="w"> </span><span class="n">problem-72-stream</span><span class="w"> </span><span class="mi">10</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">my-W</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">x</span><span class="p">))))</span>

<span class="c1">;; Silly, non-stream code.</span>
<span class="c1">;; (define (my-search s lv llv n)</span>
<span class="c1">;;   (if (&gt; n 0)</span>
<span class="c1">;;     (let ((nv (stream-car s)))</span>
<span class="c1">;;       (if (and (= (my-W nv) (my-W lv))</span>
<span class="c1">;;                (= (my-W lv) (my-W llv)))</span>
<span class="c1">;;         (begin </span>
<span class="c1">;;           (display &quot;Found: &quot;)</span>
<span class="c1">;;           (display nv)</span>
<span class="c1">;;           (display &quot;, &quot;)</span>
<span class="c1">;;           (display lv)</span>
<span class="c1">;;           (display &quot;, &quot;)</span>
<span class="c1">;;           (display llv)</span>
<span class="c1">;;           (display &quot; with sum squares &quot;)</span>
<span class="c1">;;           (display (my-W lv)) (newline)</span>
<span class="c1">;;           (my-search (stream-cdr s) nv lv (- n 1)))</span>
<span class="c1">;;         (my-search (stream-cdr s) nv lv n)))))</span>
<span class="c1">;; </span>
<span class="c1">;; (my-search square-sorted-stream (list 0 0) (list 0 0) 6)</span>

<span class="c1">; (define echo (lambda (x) (begin </span>
<span class="c1">;    (display-line (my-W x)) x)))</span>
<span class="c1">; (display-stream-first-n </span>
<span class="c1">;  (stream-map echo cube-sorted-stream) 100)</span>
</pre></div>

</details>
<div class="code-output">
<span>Output:</span>
<pre>((1 18) (6 17) (10 15)) : Weight = 325
((5 20) (8 19) (13 16)) : Weight = 425
((5 25) (11 23) (17 19)) : Weight = 650
((7 26) (10 25) (14 23)) : Weight = 725
((2 29) (13 26) (19 22)) : Weight = 845
((3 29) (11 27) (15 25)) : Weight = 850
((5 30) (14 27) (21 22)) : Weight = 925
((1 32) (8 31) (20 25)) : Weight = 1025
((4 33) (9 32) (12 31)) : Weight = 1105
((9 32) (12 31) (23 24)) : Weight = 1105
</pre>
</div>
</div>



#### Exercise 3.73

We can model electrical circuits
using streams to represent the values of currents or voltages at a sequence of
times.  For instance, suppose we have an RC circuit consisting of a
resistor of resistance $R$ and a capacitor of capacitance $C$ in series.
The voltage response $v$ of the circuit to an injected current $i$ is
determined by the formula in Figure 3.33, whose structure is shown by the
accompanying signal-flow diagram.

<div style="text-align: center; margin: 20px 0;">
  <img src="img/fig3-33.png" style="width: 70%; max-width: 800px;" alt="Figure 3.33: An RC circuit and the associated signal-flow diagram.">
</div>

Write a procedure `RC` that models this circuit.  `RC` should take as
inputs the values of $R$, $C$, and $\text{d}t$ and should return a procedure
that takes as inputs a stream representing the current $i$ and an initial
value for the capacitor voltage $v_0$ and produces as output the stream of
voltages $v$.  For example, you should be able to use `RC` to model an
RC circuit with $R$ = 5 ohms, $C$ = 1 farad, and a 0.5-second time step by
evaluating `(define RC1 (RC 5 1 0.5))`.  This defines `RC1` as a
procedure that takes a stream representing the time sequence of currents and an
initial capacitor voltage and produces the output stream of voltages.

##### Solution

Not too bad, here it is with a constant current input $i=1.$
<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">RC</span><span class="w"> </span><span class="n">R</span><span class="w"> </span><span class="n">C</span><span class="w"> </span><span class="n">dt</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">i</span><span class="w"> </span><span class="n">v0</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">cap-voltage</span><span class="w"> </span>
<span class="w">        </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">v0</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="n">scale-stream</span><span class="w"> </span><span class="p">(</span><span class="n">integral</span><span class="w"> </span><span class="n">i</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="n">dt</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">/</span><span class="w"> </span><span class="mf">1.0</span><span class="w"> </span><span class="n">C</span><span class="p">))))</span>
<span class="w">          </span><span class="p">(</span><span class="n">resistor-voltage</span><span class="w"> </span><span class="p">(</span><span class="n">scale-stream</span><span class="w"> </span><span class="n">i</span><span class="w"> </span><span class="n">R</span><span class="p">)))</span>
<span class="w">      </span><span class="p">(</span><span class="n">add-streams</span><span class="w"> </span><span class="n">cap-voltage</span><span class="w"> </span><span class="n">resistor-voltage</span><span class="p">))))</span>


<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">RC1</span><span class="w"> </span><span class="p">(</span><span class="n">RC</span><span class="w"> </span><span class="mi">5</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mf">0.5</span><span class="p">))</span>
<span class="p">(</span><span class="n">display-stream-first-n</span><span class="w"> </span><span class="p">(</span><span class="n">RC1</span><span class="w"> </span><span class="p">(</span><span class="n">constant-stream</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span><span class="w"> </span><span class="mf">1.0</span><span class="p">)</span><span class="w"> </span><span class="mi">10</span><span class="p">)</span>
</pre></div>

<div class="code-box" markdown="1">
<details class="collapsible-code">
<summary class="code-summary"><a href="code/ex3-73.rkt">code/ex3-73.rkt</a> <span class="expand-hint">(click to expand)</span></summary>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="k">stream</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">force</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">display-stream-first-n</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="n">s</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">&gt;</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">0</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="k">begin</span><span class="w"> </span>
<span class="w">      </span><span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">))</span>
<span class="w">      </span><span class="p">(</span><span class="n">display-stream-first-n</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">)))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">display-line</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">integers-starting-from</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span>
<span class="w">   </span><span class="n">n</span><span class="w"> </span><span class="p">(</span><span class="n">integers-starting-from</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">integers</span><span class="w"> </span><span class="p">(</span><span class="n">integers-starting-from</span><span class="w"> </span><span class="mi">1</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="o">.</span><span class="w"> </span><span class="n">argstreams</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))</span>
<span class="w">      </span><span class="n">the-empty-stream</span>
<span class="w">      </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">       </span><span class="p">(</span><span class="nb">apply</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="n">stream-car</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))</span>
<span class="w">       </span><span class="p">(</span><span class="nb">apply</span><span class="w"> </span><span class="nb">stream-map</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">argstreams</span><span class="p">))))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">constant-stream</span><span class="w"> </span><span class="n">val</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="n">val</span><span class="w"> </span><span class="p">(</span><span class="n">constant-stream</span><span class="w"> </span><span class="n">val</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">square</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">negate-series</span><span class="w"> </span><span class="n">S</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="nb">-</span><span class="w"> </span><span class="n">S</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">add-streams</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="nb">+</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">mul-streams</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="nb">*</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">scale-stream</span><span class="w"> </span><span class="n">S</span><span class="w"> </span><span class="n">m</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">m</span><span class="p">))</span><span class="w"> </span><span class="n">S</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">mul-series</span><span class="w"> </span><span class="n">s1</span><span class="w"> </span><span class="n">s2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">add-streams</span><span class="w"> </span>
<span class="w">    </span><span class="p">(</span><span class="n">scale-stream</span><span class="w"> </span><span class="n">s2</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s1</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="p">(</span><span class="n">mul-series</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s1</span><span class="p">)</span><span class="w"> </span><span class="n">s2</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">partial-sums</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="mi">0</span>
<span class="w">    </span><span class="p">(</span><span class="n">add-streams</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="p">(</span><span class="n">partial-sums</span><span class="w"> </span><span class="n">s</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-ref</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="nb">stream-ref</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">integral</span><span class="w"> </span><span class="n">integrand</span><span class="w"> </span><span class="n">initial-value</span><span class="w"> </span><span class="n">dt</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">int</span>
<span class="w">    </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">     </span><span class="n">initial-value</span>
<span class="w">     </span><span class="p">(</span><span class="n">add-streams</span><span class="w"> </span><span class="p">(</span><span class="n">scale-stream</span><span class="w"> </span><span class="n">integrand</span><span class="w"> </span><span class="n">dt</span><span class="p">)</span>
<span class="w">                  </span><span class="n">int</span><span class="p">)))</span>
<span class="w">  </span><span class="n">int</span><span class="p">)</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">RC</span><span class="w"> </span><span class="n">R</span><span class="w"> </span><span class="n">C</span><span class="w"> </span><span class="n">dt</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">i</span><span class="w"> </span><span class="n">v0</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">cap-voltage</span><span class="w"> </span>
<span class="w">        </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">v0</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="n">scale-stream</span><span class="w"> </span><span class="p">(</span><span class="n">integral</span><span class="w"> </span><span class="n">i</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="n">dt</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">/</span><span class="w"> </span><span class="mf">1.0</span><span class="w"> </span><span class="n">C</span><span class="p">))))</span>
<span class="w">          </span><span class="p">(</span><span class="n">resistor-voltage</span><span class="w"> </span><span class="p">(</span><span class="n">scale-stream</span><span class="w"> </span><span class="n">i</span><span class="w"> </span><span class="n">R</span><span class="p">)))</span>
<span class="w">      </span><span class="p">(</span><span class="n">add-streams</span><span class="w"> </span><span class="n">cap-voltage</span><span class="w"> </span><span class="n">resistor-voltage</span><span class="p">))))</span>


<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">RC1</span><span class="w"> </span><span class="p">(</span><span class="n">RC</span><span class="w"> </span><span class="mi">5</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mf">0.5</span><span class="p">))</span>
<span class="p">(</span><span class="n">display-stream-first-n</span><span class="w"> </span><span class="p">(</span><span class="n">RC1</span><span class="w"> </span><span class="p">(</span><span class="n">constant-stream</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span><span class="w"> </span><span class="mf">1.0</span><span class="p">)</span><span class="w"> </span><span class="mi">10</span><span class="p">)</span>
</pre></div>

</details>
<div class="code-output">
<span>Output:</span>
<pre>
6.0
6.5
7.0
7.5
8.0
8.5
9.0
9.5
10.0
10.5</pre>
</div>
</div>


#### Exercise 3.74

Alyssa P. Hacker is designing a
system to process signals coming from physical sensors.  One important feature
she wishes to produce is a signal that describes the zero crossings
of the input signal.  That is, the resulting signal should be $+1$ whenever the
input signal changes from negative to positive, $-1$ whenever the input signal
changes from positive to negative, and $0$ otherwise.  (Assume that the sign of a
$0$ input is positive.)  For example, a typical input signal with its associated
zero-crossing signal would be

<div class="codehilite"><pre><span></span><span class="n">…</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="mf">1.5</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mf">0.5</span><span class="w"> </span><span class="mf">-0.1</span><span class="w"> </span><span class="mi">-2</span><span class="w"> </span><span class="mi">-3</span><span class="w"> </span><span class="mi">-2</span><span class="w"> </span><span class="mf">-0.5</span><span class="w"> </span><span class="mf">0.2</span><span class="w"> </span><span class="mi">3</span><span class="w"> </span><span class="mi">4</span><span class="w"> </span><span class="n">…</span>
<span class="n">…</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="mi">0</span><span class="w">  </span><span class="mi">0</span><span class="w">  </span><span class="mi">0</span><span class="w">  </span><span class="mi">0</span><span class="w">   </span><span class="mi">-1</span><span class="w">   </span><span class="mi">0</span><span class="w">  </span><span class="mi">0</span><span class="w">  </span><span class="mi">0</span><span class="w">   </span><span class="mi">0</span><span class="w">   </span><span class="mi">1</span><span class="w">  </span><span class="mi">0</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="n">…</span>
</pre></div>

In Alyssa's system, the signal from the sensor is represented as a stream
`sense-data` and the stream `zero-crossings` is the corresponding
stream of zero crossings.  Alyssa first writes a procedure
`sign-change-detector` that takes two values as arguments and compares the
signs of the values to produce an appropriate $0$, $1$, or $-1$.  She then
constructs her zero-crossing stream as follows:

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-zero-crossings</span>
<span class="w">         </span><span class="n">input-stream</span><span class="w"> </span><span class="n">last-value</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span>
<span class="w">   </span><span class="p">(</span><span class="n">sign-change-detector</span><span class="w"> </span>
<span class="w">    </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">input-stream</span><span class="p">)</span><span class="w"> </span>
<span class="w">    </span><span class="n">last-value</span><span class="p">)</span>
<span class="w">   </span><span class="p">(</span><span class="n">make-zero-crossings</span><span class="w"> </span>
<span class="w">    </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">input-stream</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">input-stream</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">zero-crossings</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="n">make-zero-crossings</span><span class="w"> </span><span class="n">sense-data</span><span class="w"> </span><span class="mi">0</span><span class="p">))</span>
</pre></div>

Alyssa's boss, Eva Lu Ator, walks by and suggests that this program is
approximately equivalent to the following one, which uses the generalized
version of `stream-map` from Exercise 3.50:

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">zero-crossings</span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="n">sign-change-detector</span><span class="w"> </span>
<span class="w">              </span><span class="n">sense-data</span><span class="w"> </span>
<span class="w">              </span><span class="n">⟨expression⟩</span><span class="p">))</span>
</pre></div>

Complete the program by supplying the indicated `⟨expression⟩`.

##### Solution

#### Exercise 3.75

Unfortunately, Alyssa's
zero-crossing detector in Exercise 3.74 proves to be insufficient,
because the noisy signal from the sensor leads to spurious zero crossings.  Lem
E.  Tweakit, a hardware specialist, suggests that Alyssa smooth the signal to
filter out the noise before extracting the zero crossings.  Alyssa takes his
advice and decides to extract the zero crossings from the signal constructed by
averaging each value of the sense data with the previous value.  She explains
the problem to her assistant, Louis Reasoner, who attempts to implement the
idea, altering Alyssa's program as follows:

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-zero-crossings</span><span class="w"> </span>
<span class="w">         </span><span class="n">input-stream</span><span class="w"> </span><span class="n">last-value</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">avpt</span><span class="w"> </span>
<span class="w">         </span><span class="p">(</span><span class="nb">/</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">input-stream</span><span class="p">)</span><span class="w"> </span>
<span class="w">               </span><span class="n">last-value</span><span class="p">)</span><span class="w"> </span>
<span class="w">            </span><span class="mi">2</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span>
<span class="w">     </span><span class="p">(</span><span class="n">sign-change-detector</span><span class="w"> </span><span class="n">avpt</span><span class="w"> </span><span class="n">last-value</span><span class="p">)</span>
<span class="w">     </span><span class="p">(</span><span class="n">make-zero-crossings</span><span class="w"> </span>
<span class="w">      </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">input-stream</span><span class="p">)</span><span class="w"> </span><span class="n">avpt</span><span class="p">))))</span>
</pre></div>

This does not correctly implement Alyssa's plan.  Find the bug that Louis has
installed and fix it without changing the structure of the program.  (Hint: You
will need to increase the number of arguments to `make-zero-crossings`.)

##### Solution

#### Exercise 3.76

Eva Lu Ator has a criticism of
Louis's approach in Exercise 3.75.  The program he wrote is not modular,
because it intermixes the operation of smoothing with the zero-crossing
extraction.  For example, the extractor should not have to be changed if Alyssa
finds a better way to condition her input signal.  Help Louis by writing a
procedure `smooth` that takes a stream as input and produces a stream in
which each element is the average of two successive input stream elements.
Then use `smooth` as a component to implement the zero-crossing detector
in a more modular style.

##### Solution

#### Exercise 3.77

The `integral` procedure
used above was analogous to the ``implicit'' definition of the infinite stream
of integers in 3.5.2.  Alternatively, we can give a definition of
`integral` that is more like `integers-starting-from` (also in
3.5.2):

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">integral</span>
<span class="w">         </span><span class="n">integrand</span><span class="w"> </span><span class="n">initial-value</span><span class="w"> </span><span class="n">dt</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span>
<span class="w">   </span><span class="n">initial-value</span>
<span class="w">   </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="n">integrand</span><span class="p">)</span>
<span class="w">       </span><span class="n">the-empty-stream</span>
<span class="w">       </span><span class="p">(</span><span class="n">integral</span><span class="w"> </span>
<span class="w">        </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">integrand</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">dt</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">integrand</span><span class="p">))</span>
<span class="w">           </span><span class="n">initial-value</span><span class="p">)</span>
<span class="w">        </span><span class="n">dt</span><span class="p">))))</span>
</pre></div>

When used in systems with loops, this procedure has the same problem as does
our original version of `integral`.  Modify the procedure so that it
expects the `integrand` as a delayed argument and hence can be used in the
`solve` procedure shown above.

##### Solution

#### Exercise 3.78

Consider the problem of designing
a signal-processing system to study the homogeneous second-order linear
differential equation

$$\frac{d^2 y}{dt^2} - {a \frac{dy}{dt}} - {by} \,=\, {0.}  $$

The output stream, modeling $y$, is generated by a network that contains a
loop. This is because the value of $d^2 y / dt^2$ depends upon the
values of $y$ and $dy / dt$ and both of these are determined by
integrating $d^2 y / dt^2$.  The diagram we would like to encode is
shown in Figure 3.35.  Write a procedure `solve-2nd` that takes as
arguments the constants $a$, $b$, and $dt$ and the initial values
$y_0$ and $dy_0$ for $y$ and $dy / dt$ and generates the
stream of successive values of $y$.

##### Solution

#### Exercise 3.79

Generalize the `solve-2nd`
procedure of Exercise 3.78 so that it can be used to solve general
second-order differential equations $d^2 y / dt^2 =
f(dy / dt, y)$.

##### Solution

#### Exercise 3.80

A series RLC circuit
consists of a resistor, a capacitor, and an inductor connected in series, as
shown in Figure 3.36.  If $R$, $L$, and $C$ are the resistance,
inductance, and capacitance, then the relations between voltage ${(v)$} and
current ${(i)$} for the three components are described by the equations

$$\begin{eqnarray}
  v_R 	&=&   i_R R, \\
  v_L 	&=&   L\,{di_L \over dt}, \\
  i_C 	&=&   C\,{dv_C \over dt},
\end{eqnarray}
$$

and the circuit connections dictate the relations

$$\begin{eqnarray}
  i_R 	&=&   i_L = -i_C, \\
  v_C 	&=&   v_L + v_R.
\end{eqnarray}
$$


Combining these equations shows that the state of the circuit (summarized by
$v_C$, the voltage across the capacitor, and $i_L$, the current in
the inductor) is described by the pair of differential equations

$$\begin{eqnarray}
  {dv_C \over dt}   &=&   -{i_L \over C}\,, \\
  {di_L \over dt}   &=&    {1 \over L}\, v_C - {R \over L}\, i_L.
\end{eqnarray}
$$


The signal-flow diagram representing this system of differential equations is
shown in Figure 3.37.

##### Solution

#### Exercise 3.81

Exercise 3.6 discussed
generalizing the random-number generator to allow one to reset the
random-number sequence so as to produce repeatable sequences of random
numbers.  Produce a stream formulation of this same generator that operates on
an input stream of requests to `generate` a new random number or to
`reset` the sequence to a specified value and that produces the desired
stream of random numbers.  Don't use assignment in your solution.

##### Solution

#### Exercise 3.82

Redo Exercise 3.5 on Monte
Carlo integration in terms of streams.  The stream version of
`estimate-integral` will not have an argument telling how many trials to
perform.  Instead, it will produce a stream of estimates based on successively
more trials.

##### Solution


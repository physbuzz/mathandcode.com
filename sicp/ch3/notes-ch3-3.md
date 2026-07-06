---
layout: sicp
render_with_liquid: false
title: SICP Chapter 3.3
---

<div class="nav">
    <span class="activenav"><a href="notes-ch3-2.html">← Previous</a></span>
    <span class="activenav"><a href="../index.html">↑ Up</a></span>
    <span class="activenav"><a href="notes-ch3-4.html">Next →</a></span>
</div>


[HTML Book Chapter 3.3 Link](https://sarabander.github.io/sicp/html/3_002e3.xhtml#g_t3_002e3)

## Directory
- [Section 3.3](#section-33)
  - [Notes](#notes)
  - [Circuit example](#circuit-example)
    - [Inserting in the middle of a list](#inserting-in-the-middle-of-a-list)
  - [Constraint solving example](#constraint-solving-example)
  - [Meeting 05-25-2025](#meeting-05-25-2025)
  - [Exercises](#exercises)
    - *Exercises:* ([Exercise 3.12](#exercise-312), [Exercise 3.13](#exercise-313), [Exercise 3.14](#exercise-314), [Exercise 3.15](#exercise-315), [Exercise 3.16](#exercise-316), [Exercise 3.17](#exercise-317), [Exercise 3.18](#exercise-318), [Exercise 3.19](#exercise-319), [Exercise 3.20](#exercise-320), [Exercise 3.21](#exercise-321), [Exercise 3.22](#exercise-322), [Exercise 3.23](#exercise-323), [Exercise 3.24](#exercise-324), [Exercise 3.25](#exercise-325), [Exercise 3.26](#exercise-326), [Exercise 3.27](#exercise-327), [Exercise 3.28](#exercise-328), [Exercise 3.29](#exercise-329), [Exercise 3.30](#exercise-330), [Exercise 3.31](#exercise-331), [Exercise 3.32](#exercise-332), [Exercise 3.33](#exercise-333), [Exercise 3.34](#exercise-334), [Exercise 3.35](#exercise-335), [Exercise 3.36](#exercise-336), [Exercise 3.37](#exercise-337))

## Section 3.3

### Notes

<div class="code-box" markdown="1">
<div class="code-header"><a href="code/examples-3-3.rkt">code/examples-3-3.rkt</a></div>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>



<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="o">&#39;</span><span class="p">((</span><span class="ss">a</span><span class="w"> </span><span class="ss">b</span><span class="p">)</span><span class="w"> </span><span class="ss">c</span><span class="w"> </span><span class="ss">d</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">y</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">e</span><span class="w"> </span><span class="ss">f</span><span class="p">))</span>

<span class="p">(</span><span class="n">set-car!</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">y</span><span class="p">)</span>

<span class="p">(</span><span class="n">set-car!</span><span class="w"> </span><span class="n">y</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">h</span><span class="p">)</span>
<span class="n">x</span>
<span class="n">y</span>
</pre></div>
<div class="code-output">
<span>Output:</span>
<pre>((h f) c d)
(h f)
</pre>
</div>
</div>


 - It would be nice to have a proof that we can't construct an (efficient) queue
without `set!`, or if that's true.
 - Impossibility of an efficient doubly linked list without mutability? 
(there was a conversation about doubly linked lists in Rust)


### Circuit example

Running the example in section 3.3.4.

<div class="code-box" markdown="1">
<details class="collapsible-code">
<summary class="code-summary"><a href="code/circuit.rkt">code/circuit.rkt</a> <span class="expand-hint">(click to expand)</span></summary>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">front-ptr</span><span class="w"> </span><span class="n">queue</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">queue</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">rear-ptr</span><span class="w"> </span><span class="n">queue</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">queue</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">set-front-ptr!</span><span class="w"> </span><span class="n">queue</span><span class="w"> </span><span class="n">item</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="n">set-car!</span><span class="w"> </span><span class="n">queue</span><span class="w"> </span><span class="n">item</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">set-rear-ptr!</span><span class="w"> </span><span class="n">queue</span><span class="w"> </span><span class="n">item</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="n">set-cdr!</span><span class="w"> </span><span class="n">queue</span><span class="w"> </span><span class="n">item</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">empty-queue?</span><span class="w"> </span><span class="n">queue</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="p">(</span><span class="n">front-ptr</span><span class="w"> </span><span class="n">queue</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-queue</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="o">&#39;</span><span class="p">()</span><span class="w"> </span><span class="o">&#39;</span><span class="p">()))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">front-queue</span><span class="w"> </span><span class="n">queue</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">empty-queue?</span><span class="w"> </span><span class="n">queue</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;FRONT called with an</span>
<span class="s2">              empty queue&quot;</span><span class="w"> </span><span class="n">queue</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="p">(</span><span class="n">front-ptr</span><span class="w"> </span><span class="n">queue</span><span class="p">))))</span>


<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">insert-queue!</span><span class="w"> </span><span class="n">queue</span><span class="w"> </span><span class="n">item</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">new-pair</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">item</span><span class="w"> </span><span class="o">&#39;</span><span class="p">())))</span>
<span class="w">    </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="n">empty-queue?</span><span class="w"> </span><span class="n">queue</span><span class="p">)</span>
<span class="w">           </span><span class="p">(</span><span class="n">set-front-ptr!</span><span class="w"> </span><span class="n">queue</span><span class="w"> </span><span class="n">new-pair</span><span class="p">)</span>
<span class="w">           </span><span class="p">(</span><span class="n">set-rear-ptr!</span><span class="w"> </span><span class="n">queue</span><span class="w"> </span><span class="n">new-pair</span><span class="p">)</span>
<span class="w">           </span><span class="n">queue</span><span class="p">)</span>
<span class="w">          </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="n">set-cdr!</span><span class="w"> </span><span class="p">(</span><span class="n">rear-ptr</span><span class="w"> </span><span class="n">queue</span><span class="p">)</span><span class="w"> </span>
<span class="w">                          </span><span class="n">new-pair</span><span class="p">)</span>
<span class="w">                </span><span class="p">(</span><span class="n">set-rear-ptr!</span><span class="w"> </span><span class="n">queue</span><span class="w"> </span><span class="n">new-pair</span><span class="p">)</span>
<span class="w">                </span><span class="n">queue</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">delete-queue!</span><span class="w"> </span><span class="n">queue</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="n">empty-queue?</span><span class="w"> </span><span class="n">queue</span><span class="p">)</span>
<span class="w">         </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;DELETE! called with </span>
<span class="s2">                 an empty queue&quot;</span><span class="w"> </span><span class="n">queue</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="n">set-front-ptr!</span><span class="w"> </span>
<span class="w">               </span><span class="n">queue</span><span class="w"> </span>
<span class="w">               </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="p">(</span><span class="n">front-ptr</span><span class="w"> </span><span class="n">queue</span><span class="p">)))</span>
<span class="w">              </span><span class="n">queue</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">print-queue</span><span class="w"> </span><span class="n">queue</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="p">(</span><span class="n">front-ptr</span><span class="w"> </span><span class="n">queue</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">half-adder</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">c</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">d</span><span class="w"> </span><span class="p">(</span><span class="n">make-wire</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="n">e</span><span class="w"> </span><span class="p">(</span><span class="n">make-wire</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">or-gate</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="w"> </span><span class="n">d</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">and-gate</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="w"> </span><span class="n">c</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">inverter</span><span class="w"> </span><span class="n">c</span><span class="w"> </span><span class="n">e</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">and-gate</span><span class="w"> </span><span class="n">d</span><span class="w"> </span><span class="n">e</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">    </span><span class="o">&#39;</span><span class="ss">ok</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">full-adder</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="w"> </span><span class="n">c-in</span><span class="w"> </span><span class="n">sum</span><span class="w"> </span><span class="n">c-out</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">c1</span><span class="w"> </span><span class="p">(</span><span class="n">make-wire</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="n">c2</span><span class="w"> </span><span class="p">(</span><span class="n">make-wire</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="n">s</span><span class="w">  </span><span class="p">(</span><span class="n">make-wire</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">half-adder</span><span class="w"> </span><span class="n">b</span><span class="w"> </span><span class="n">c-in</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">c1</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">half-adder</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">sum</span><span class="w"> </span><span class="n">c2</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">or-gate</span><span class="w"> </span><span class="n">c1</span><span class="w"> </span><span class="n">c2</span><span class="w"> </span><span class="n">c-out</span><span class="p">)</span>
<span class="w">    </span><span class="o">&#39;</span><span class="ss">ok</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">inverter</span><span class="w"> </span><span class="n">input</span><span class="w"> </span><span class="n">output</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">invert-input</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">new-value</span><span class="w"> </span>
<span class="w">           </span><span class="p">(</span><span class="n">logical-not</span><span class="w"> </span><span class="p">(</span><span class="n">get-signal</span><span class="w"> </span><span class="n">input</span><span class="p">))))</span>
<span class="w">      </span><span class="p">(</span><span class="n">after-delay</span><span class="w"> </span>
<span class="w">       </span><span class="n">inverter-delay</span>
<span class="w">       </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">()</span>
<span class="w">         </span><span class="p">(</span><span class="n">set-signal!</span><span class="w"> </span><span class="n">output</span><span class="w"> </span><span class="n">new-value</span><span class="p">)))))</span>
<span class="w">  </span><span class="p">(</span><span class="n">add-action!</span><span class="w"> </span><span class="n">input</span><span class="w"> </span><span class="n">invert-input</span><span class="p">)</span>
<span class="w">  </span><span class="o">&#39;</span><span class="ss">ok</span><span class="p">)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">binary?</span><span class="w"> </span><span class="n">a</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">or</span><span class="w"> </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="mi">0</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">logical-not</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">=</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="nb">=</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;Invalid signal&quot;</span><span class="w"> </span><span class="n">s</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">logical-and</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="n">b</span><span class="w"> </span><span class="mi">1</span><span class="p">))</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="n">binary?</span><span class="w"> </span><span class="n">a</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">binary?</span><span class="w"> </span><span class="n">b</span><span class="p">))</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;Invalid signal&quot;</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">logical-or</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="k">or</span><span class="w"> </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="n">b</span><span class="w"> </span><span class="mi">1</span><span class="p">))</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="n">binary?</span><span class="w"> </span><span class="n">a</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">binary?</span><span class="w"> </span><span class="n">b</span><span class="p">))</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;Invalid signal&quot;</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">and-gate</span><span class="w"> </span><span class="n">a1</span><span class="w"> </span><span class="n">a2</span><span class="w"> </span><span class="n">output</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">and-action-procedure</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">new-value</span>
<span class="w">           </span><span class="p">(</span><span class="n">logical-and</span><span class="w"> </span><span class="p">(</span><span class="n">get-signal</span><span class="w"> </span><span class="n">a1</span><span class="p">)</span>
<span class="w">                        </span><span class="p">(</span><span class="n">get-signal</span><span class="w"> </span><span class="n">a2</span><span class="p">))))</span>
<span class="w">      </span><span class="p">(</span><span class="n">after-delay</span>
<span class="w">       </span><span class="n">and-gate-delay</span>
<span class="w">       </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">()</span>
<span class="w">         </span><span class="p">(</span><span class="n">set-signal!</span><span class="w"> </span><span class="n">output</span><span class="w"> </span><span class="n">new-value</span><span class="p">)))))</span>
<span class="w">  </span><span class="p">(</span><span class="n">add-action!</span><span class="w"> </span><span class="n">a1</span><span class="w"> </span><span class="n">and-action-procedure</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">add-action!</span><span class="w"> </span><span class="n">a2</span><span class="w"> </span><span class="n">and-action-procedure</span><span class="p">)</span>
<span class="w">  </span><span class="o">&#39;</span><span class="ss">ok</span><span class="p">)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">or-gate</span><span class="w"> </span><span class="n">a1</span><span class="w"> </span><span class="n">a2</span><span class="w"> </span><span class="n">output</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">or-action-procedure</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">new-value</span>
<span class="w">           </span><span class="p">(</span><span class="n">logical-or</span><span class="w"> </span><span class="p">(</span><span class="n">get-signal</span><span class="w"> </span><span class="n">a1</span><span class="p">)</span>
<span class="w">                       </span><span class="p">(</span><span class="n">get-signal</span><span class="w"> </span><span class="n">a2</span><span class="p">))))</span>
<span class="w">      </span><span class="p">(</span><span class="n">after-delay</span>
<span class="w">       </span><span class="n">or-gate-delay</span>
<span class="w">       </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">()</span>
<span class="w">         </span><span class="p">(</span><span class="n">set-signal!</span><span class="w"> </span><span class="n">output</span><span class="w"> </span><span class="n">new-value</span><span class="p">)))))</span>
<span class="w">  </span><span class="p">(</span><span class="n">add-action!</span><span class="w"> </span><span class="n">a1</span><span class="w"> </span><span class="n">or-action-procedure</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">add-action!</span><span class="w"> </span><span class="n">a2</span><span class="w"> </span><span class="n">or-action-procedure</span><span class="p">)</span>
<span class="w">  </span><span class="o">&#39;</span><span class="ss">ok</span><span class="p">)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">or-gate2</span><span class="w"> </span><span class="n">a1</span><span class="w"> </span><span class="n">a2</span><span class="w"> </span><span class="n">output</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">a1inv</span><span class="w"> </span><span class="p">(</span><span class="n">make-wire</span><span class="p">))</span><span class="w"> </span>
<span class="w">        </span><span class="p">(</span><span class="n">a2inv</span><span class="w"> </span><span class="p">(</span><span class="n">make-wire</span><span class="p">))</span><span class="w"> </span>
<span class="w">        </span><span class="p">(</span><span class="n">outputinv</span><span class="w"> </span><span class="p">(</span><span class="n">make-wire</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">inverter</span><span class="w"> </span><span class="n">a1</span><span class="w"> </span><span class="n">a1inv</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">inverter</span><span class="w"> </span><span class="n">a2</span><span class="w"> </span><span class="n">a2inv</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">and-gate</span><span class="w"> </span><span class="n">a1inv</span><span class="w"> </span><span class="n">a2inv</span><span class="w"> </span><span class="n">outputinv</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">inverter</span><span class="w"> </span><span class="n">outputinv</span><span class="w"> </span><span class="n">output</span><span class="p">)</span>
<span class="w">    </span><span class="o">&#39;</span><span class="ss">ok</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">ripple-carry</span><span class="w"> </span><span class="n">A</span><span class="w"> </span><span class="n">B</span><span class="w"> </span><span class="n">S</span><span class="w"> </span><span class="n">c</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">ripple-carry-inner</span><span class="w"> </span><span class="n">A</span><span class="w"> </span><span class="n">B</span><span class="w"> </span><span class="n">S</span><span class="w"> </span><span class="n">c-out</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="n">A</span><span class="p">)</span><span class="w"> </span>
<span class="w">      </span><span class="o">&#39;</span><span class="ss">ok</span>
<span class="w">      </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">c-in</span><span class="w"> </span><span class="p">(</span><span class="n">make-wire</span><span class="p">)))</span>
<span class="w">        </span><span class="p">(</span><span class="n">full-adder</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">A</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">B</span><span class="p">)</span><span class="w"> </span><span class="n">c-in</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">S</span><span class="p">)</span><span class="w"> </span><span class="n">c-out</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="n">ripple-carry-inner</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">A</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">B</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">S</span><span class="p">)</span><span class="w"> </span><span class="n">c-in</span><span class="p">))))</span>
<span class="w">  </span><span class="p">(</span><span class="n">ripple-carry</span><span class="w"> </span><span class="n">A</span><span class="w"> </span><span class="n">B</span><span class="w"> </span><span class="n">S</span><span class="w"> </span><span class="n">c</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">call-each</span><span class="w"> </span><span class="n">procedures</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="n">procedures</span><span class="p">)</span>
<span class="w">      </span><span class="o">&#39;</span><span class="ss">done</span>
<span class="w">      </span><span class="p">(</span><span class="k">begin</span><span class="w"> </span><span class="p">((</span><span class="nb">car</span><span class="w"> </span><span class="n">procedures</span><span class="p">))</span>
<span class="w">             </span><span class="p">(</span><span class="n">call-each</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">procedures</span><span class="p">)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-wire</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">signal-value</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="n">action-procedures</span><span class="w"> </span><span class="o">&#39;</span><span class="p">()))</span>
<span class="w">    </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">set-my-signal!</span><span class="w"> </span><span class="n">new-value</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="n">signal-value</span><span class="w"> </span><span class="n">new-value</span><span class="p">))</span>
<span class="w">          </span><span class="p">(</span><span class="k">begin</span><span class="w"> </span><span class="p">(</span><span class="k">set!</span><span class="w"> </span><span class="n">signal-value</span><span class="w"> </span><span class="n">new-value</span><span class="p">)</span>
<span class="w">                 </span><span class="p">(</span><span class="n">call-each</span>
<span class="w">                  </span><span class="n">action-procedures</span><span class="p">))</span>
<span class="w">          </span><span class="o">&#39;</span><span class="ss">done</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">accept-action-procedure!</span><span class="w"> </span><span class="n">proc</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="k">set!</span><span class="w"> </span><span class="n">action-procedures</span>
<span class="w">            </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="n">action-procedures</span><span class="p">))</span>
<span class="w">      </span><span class="p">(</span><span class="n">proc</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">dispatch</span><span class="w"> </span><span class="n">m</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">m</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">get-signal</span><span class="p">)</span>
<span class="w">             </span><span class="n">signal-value</span><span class="p">)</span>
<span class="w">            </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">m</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">set-signal!</span><span class="p">)</span>
<span class="w">             </span><span class="n">set-my-signal!</span><span class="p">)</span>
<span class="w">            </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">m</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">add-action!</span><span class="p">)</span>
<span class="w">             </span><span class="n">accept-action-procedure!</span><span class="p">)</span>
<span class="w">            </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;Unknown operation:</span>
<span class="s2">                          WIRE&quot;</span><span class="w"> </span><span class="n">m</span><span class="p">))))</span>
<span class="w">    </span><span class="n">dispatch</span><span class="p">))</span>


<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">get-signal</span><span class="w"> </span><span class="n">wire</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">wire</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">get-signal</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">set-signal!</span><span class="w"> </span><span class="n">wire</span><span class="w"> </span><span class="n">new-value</span><span class="p">)</span>
<span class="w">  </span><span class="p">((</span><span class="n">wire</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">set-signal!</span><span class="p">)</span><span class="w"> </span><span class="n">new-value</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">add-action!</span><span class="w"> </span><span class="n">wire</span><span class="w"> </span><span class="n">action-procedure</span><span class="p">)</span>
<span class="w">  </span><span class="p">((</span><span class="n">wire</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">add-action!</span><span class="p">)</span><span class="w"> </span><span class="n">action-procedure</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-time-segment</span><span class="w"> </span><span class="k">time</span><span class="w"> </span><span class="n">queue</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="k">time</span><span class="w"> </span><span class="n">queue</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">segment-time</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">s</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">segment-queue</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">s</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-agenda</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">0</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">current-time</span><span class="w"> </span><span class="n">agenda</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">agenda</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">set-current-time!</span><span class="w"> </span><span class="n">agenda</span><span class="w"> </span><span class="k">time</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">set-car!</span><span class="w"> </span><span class="n">agenda</span><span class="w"> </span><span class="k">time</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">segments</span><span class="w"> </span><span class="n">agenda</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">agenda</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">set-segments!</span><span class="w"> </span><span class="n">agenda</span><span class="w"> </span><span class="n">segments</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">set-cdr!</span><span class="w"> </span><span class="n">agenda</span><span class="w"> </span><span class="n">segments</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">first-segment</span><span class="w"> </span><span class="n">agenda</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="p">(</span><span class="n">segments</span><span class="w"> </span><span class="n">agenda</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">rest-segments</span><span class="w"> </span><span class="n">agenda</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="p">(</span><span class="n">segments</span><span class="w"> </span><span class="n">agenda</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">empty-agenda?</span><span class="w"> </span><span class="n">agenda</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="p">(</span><span class="n">segments</span><span class="w"> </span><span class="n">agenda</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">add-to-agenda!</span><span class="w"> </span><span class="k">time</span><span class="w"> </span><span class="n">action</span><span class="w"> </span><span class="n">agenda</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">belongs-before?</span><span class="w"> </span><span class="n">segments</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">or</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="n">segments</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="nb">&lt;</span><span class="w"> </span><span class="k">time</span>
<span class="w">           </span><span class="p">(</span><span class="n">segment-time</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">segments</span><span class="p">)))))</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-new-time-segment</span><span class="w"> </span><span class="k">time</span><span class="w"> </span><span class="n">action</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">q</span><span class="w"> </span><span class="p">(</span><span class="n">make-queue</span><span class="p">)))</span>
<span class="w">      </span><span class="p">(</span><span class="n">insert-queue!</span><span class="w"> </span><span class="n">q</span><span class="w"> </span><span class="n">action</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="n">make-time-segment</span><span class="w"> </span><span class="k">time</span><span class="w"> </span><span class="n">q</span><span class="p">)))</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">add-to-segments!</span><span class="w"> </span><span class="n">segments</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="p">(</span><span class="n">segment-time</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">segments</span><span class="p">))</span><span class="w"> </span><span class="k">time</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="n">insert-queue!</span>
<span class="w">         </span><span class="p">(</span><span class="n">segment-queue</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">segments</span><span class="p">))</span>
<span class="w">         </span><span class="n">action</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="nb">rest</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">segments</span><span class="p">)))</span>
<span class="w">          </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">belongs-before?</span><span class="w"> </span><span class="nb">rest</span><span class="p">)</span>
<span class="w">              </span><span class="p">(</span><span class="n">set-cdr!</span>
<span class="w">               </span><span class="n">segments</span>
<span class="w">               </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="p">(</span><span class="n">make-new-time-segment</span>
<span class="w">                      </span><span class="k">time</span>
<span class="w">                      </span><span class="n">action</span><span class="p">)</span>
<span class="w">                     </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">segments</span><span class="p">)))</span>
<span class="w">              </span><span class="p">(</span><span class="n">add-to-segments!</span><span class="w"> </span><span class="nb">rest</span><span class="p">)))))</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">segments</span><span class="w"> </span><span class="p">(</span><span class="n">segments</span><span class="w"> </span><span class="n">agenda</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">belongs-before?</span><span class="w"> </span><span class="n">segments</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="n">set-segments!</span>
<span class="w">         </span><span class="n">agenda</span>
<span class="w">         </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="p">(</span><span class="n">make-new-time-segment</span>
<span class="w">                </span><span class="k">time</span>
<span class="w">                </span><span class="n">action</span><span class="p">)</span>
<span class="w">               </span><span class="n">segments</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="n">add-to-segments!</span><span class="w"> </span><span class="n">segments</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">remove-first-agenda-item!</span><span class="w"> </span><span class="n">agenda</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">q</span><span class="w"> </span><span class="p">(</span><span class="n">segment-queue</span>
<span class="w">            </span><span class="p">(</span><span class="n">first-segment</span><span class="w"> </span><span class="n">agenda</span><span class="p">))))</span>
<span class="w">    </span><span class="p">(</span><span class="n">delete-queue!</span><span class="w"> </span><span class="n">q</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">empty-queue?</span><span class="w"> </span><span class="n">q</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="n">set-segments!</span>
<span class="w">         </span><span class="n">agenda</span>
<span class="w">         </span><span class="p">(</span><span class="n">rest-segments</span><span class="w"> </span><span class="n">agenda</span><span class="p">)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">first-agenda-item</span><span class="w"> </span><span class="n">agenda</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">empty-agenda?</span><span class="w"> </span><span class="n">agenda</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;Agenda is empty: </span>
<span class="s2">              FIRST-AGENDA-ITEM&quot;</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">first-seg</span><span class="w"> </span>
<span class="w">             </span><span class="p">(</span><span class="n">first-segment</span><span class="w"> </span><span class="n">agenda</span><span class="p">)))</span>
<span class="w">        </span><span class="p">(</span><span class="n">set-current-time!</span><span class="w"> </span>
<span class="w">         </span><span class="n">agenda</span><span class="w"> </span>
<span class="w">         </span><span class="p">(</span><span class="n">segment-time</span><span class="w"> </span><span class="n">first-seg</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="n">front-queue</span><span class="w"> </span>
<span class="w">         </span><span class="p">(</span><span class="n">segment-queue</span><span class="w"> </span><span class="n">first-seg</span><span class="p">)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">after-delay</span><span class="w"> </span><span class="k">delay</span><span class="w"> </span><span class="n">action</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">add-to-agenda!</span>
<span class="w">   </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="k">delay</span><span class="w"> </span><span class="p">(</span><span class="n">current-time</span><span class="w"> </span><span class="n">the-agenda</span><span class="p">))</span>
<span class="w">   </span><span class="n">action</span>
<span class="w">   </span><span class="n">the-agenda</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">propagate</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">empty-agenda?</span><span class="w"> </span><span class="n">the-agenda</span><span class="p">)</span>
<span class="w">      </span><span class="o">&#39;</span><span class="ss">done</span>
<span class="w">      </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">first-item</span><span class="w"> </span>
<span class="w">             </span><span class="p">(</span><span class="n">first-agenda-item</span><span class="w"> </span><span class="n">the-agenda</span><span class="p">)))</span>
<span class="w">        </span><span class="p">(</span><span class="n">first-item</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="n">remove-first-agenda-item!</span><span class="w"> </span><span class="n">the-agenda</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="n">propagate</span><span class="p">))))</span>


<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">probe</span><span class="w"> </span><span class="n">name</span><span class="w"> </span><span class="n">wire</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">add-action!</span>
<span class="w">   </span><span class="n">wire</span>
<span class="w">   </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">()</span>
<span class="w">     </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="w">     </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="n">name</span><span class="p">)</span>
<span class="w">     </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot; &quot;</span><span class="p">)</span>
<span class="w">     </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="p">(</span><span class="n">current-time</span><span class="w"> </span><span class="n">the-agenda</span><span class="p">))</span>
<span class="w">     </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;  New-value = &quot;</span><span class="p">)</span>
<span class="w">     </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="p">(</span><span class="n">get-signal</span><span class="w"> </span><span class="n">wire</span><span class="p">)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">the-agenda</span><span class="w"> </span><span class="p">(</span><span class="n">make-agenda</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">inverter-delay</span><span class="w"> </span><span class="mi">2</span><span class="p">)</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">and-gate-delay</span><span class="w"> </span><span class="mi">3</span><span class="p">)</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">or-gate-delay</span><span class="w"> </span><span class="mi">5</span><span class="p">)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">input-1</span><span class="w"> </span><span class="p">(</span><span class="n">make-wire</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">input-2</span><span class="w"> </span><span class="p">(</span><span class="n">make-wire</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">sum</span><span class="w"> </span><span class="p">(</span><span class="n">make-wire</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">carry</span><span class="w"> </span><span class="p">(</span><span class="n">make-wire</span><span class="p">))</span>



<span class="p">(</span><span class="n">probe</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">sum</span><span class="w"> </span><span class="n">sum</span><span class="p">)</span>
<span class="c1">; sum 0  New-value = 0</span>

<span class="p">(</span><span class="n">probe</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">carry</span><span class="w"> </span><span class="n">carry</span><span class="p">)</span>
<span class="c1">; carry 0  New-value = 0</span>

<span class="p">(</span><span class="n">half-adder</span><span class="w"> </span><span class="n">input-1</span><span class="w"> </span><span class="n">input-2</span><span class="w"> </span><span class="n">sum</span><span class="w"> </span><span class="n">carry</span><span class="p">)</span>
<span class="c1">; ok</span>

<span class="p">(</span><span class="n">set-signal!</span><span class="w"> </span><span class="n">input-1</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span>
<span class="c1">; done</span>

<span class="p">(</span><span class="n">propagate</span><span class="p">)</span>
<span class="c1">; sum 8  New-value = 1</span>
<span class="c1">; done</span>
<span class="p">(</span><span class="n">set-signal!</span><span class="w"> </span><span class="n">input-2</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span>
<span class="c1">; done</span>

<span class="p">(</span><span class="n">propagate</span><span class="p">)</span>
<span class="c1">; carry 11  New-value = 1</span>
<span class="c1">; sum 16  New-value = 0</span>
<span class="c1">; done</span>
</pre></div>

</details>
<div class="code-output">
<span>Output:</span>
<pre>
sum 0  New-value = 0
carry 0  New-value = 0ok
done

sum 8  New-value = 1done
done

carry 11  New-value = 1
sum 16  New-value = 0done
</pre>
</div>
</div>


#### Inserting in the middle of a list

I saw this pattern inside `add-to-agenda!` which was kind of 
interesting. Inserting into the middle of a list (except the first element) is easy with this function, which is basically how `add-to-segments!` works, except it uses a predicate instead of a index `n`.

<div class="codehilite"><pre><span></span><span class="c1">;; insert element el at position n of the list.</span>
<span class="c1">;; except for position 0</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">insert!</span><span class="w"> </span><span class="n">lst</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="n">el</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">set-cdr!</span><span class="w"> </span><span class="n">lst</span><span class="w"> </span>
<span class="w">        </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">el</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">lst</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">insert!</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">lst</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span><span class="w"> </span><span class="n">el</span><span class="p">)))</span>
</pre></div>

### Constraint solving example

Running the example in section 3.3.5.

<div class="code-box" markdown="1">
<details class="collapsible-code">
<summary class="code-summary"><a href="code/constraint.rkt">code/constraint.rkt</a> <span class="expand-hint">(click to expand)</span></summary>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">connector</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">connector</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">has-value?</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">connector</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">connector</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">value</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">set-value!</span><span class="w"> </span><span class="n">connector</span><span class="w"> </span>
<span class="w">                    </span><span class="n">new-value</span><span class="w"> </span>
<span class="w">                    </span><span class="n">informant</span><span class="p">)</span>
<span class="w">  </span><span class="p">((</span><span class="n">connector</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">set-value!</span><span class="p">)</span><span class="w"> </span>
<span class="w">   </span><span class="n">new-value</span><span class="w"> </span>
<span class="w">   </span><span class="n">informant</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">forget-value!</span><span class="w"> </span><span class="n">connector</span><span class="w"> </span><span class="n">retractor</span><span class="p">)</span>
<span class="w">  </span><span class="p">((</span><span class="n">connector</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">forget</span><span class="p">)</span><span class="w"> </span><span class="n">retractor</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">connect</span><span class="w"> </span><span class="n">connector</span><span class="w"> </span><span class="n">new-constraint</span><span class="p">)</span>
<span class="w">  </span><span class="p">((</span><span class="n">connector</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">connect</span><span class="p">)</span><span class="w"> </span><span class="n">new-constraint</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">adder</span><span class="w"> </span><span class="n">a1</span><span class="w"> </span><span class="n">a2</span><span class="w"> </span><span class="n">sum</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">process-new-value</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">a1</span><span class="p">)</span><span class="w"> </span>
<span class="w">                </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">a2</span><span class="p">))</span>
<span class="w">           </span><span class="p">(</span><span class="n">set-value!</span><span class="w"> </span><span class="n">sum</span>
<span class="w">                       </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">a1</span><span class="p">)</span><span class="w"> </span>
<span class="w">                          </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">a2</span><span class="p">))</span>
<span class="w">                       </span><span class="n">me</span><span class="p">))</span>
<span class="w">          </span><span class="p">((</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">a1</span><span class="p">)</span><span class="w"> </span>
<span class="w">                </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">sum</span><span class="p">))</span>
<span class="w">           </span><span class="p">(</span><span class="n">set-value!</span><span class="w"> </span><span class="n">a2</span>
<span class="w">                       </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">sum</span><span class="p">)</span><span class="w"> </span>
<span class="w">                          </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">a1</span><span class="p">))</span>
<span class="w">                       </span><span class="n">me</span><span class="p">))</span>
<span class="w">          </span><span class="p">((</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">a2</span><span class="p">)</span><span class="w"> </span>
<span class="w">                </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">sum</span><span class="p">))</span>
<span class="w">           </span><span class="p">(</span><span class="n">set-value!</span><span class="w"> </span><span class="n">a1</span>
<span class="w">                       </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">sum</span><span class="p">)</span><span class="w"> </span>
<span class="w">                          </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">a2</span><span class="p">))</span>
<span class="w">                       </span><span class="n">me</span><span class="p">))))</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">process-forget-value</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">forget-value!</span><span class="w"> </span><span class="n">sum</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">forget-value!</span><span class="w"> </span><span class="n">a1</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">forget-value!</span><span class="w"> </span><span class="n">a2</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">process-new-value</span><span class="p">))</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">me</span><span class="w"> </span><span class="n">request</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">request</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">I-have-a-value</span><span class="p">)</span>
<span class="w">           </span><span class="p">(</span><span class="n">process-new-value</span><span class="p">))</span>
<span class="w">          </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">request</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">I-lost-my-value</span><span class="p">)</span>
<span class="w">           </span><span class="p">(</span><span class="n">process-forget-value</span><span class="p">))</span>
<span class="w">          </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;Unknown request: </span>
<span class="s2">                        ADDER&quot;</span><span class="w"> </span><span class="n">request</span><span class="p">))))</span>
<span class="w">  </span><span class="p">(</span><span class="n">connect</span><span class="w"> </span><span class="n">a1</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">connect</span><span class="w"> </span><span class="n">a2</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">connect</span><span class="w"> </span><span class="n">sum</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">  </span><span class="n">me</span><span class="p">)</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">multiplier</span><span class="w"> </span><span class="n">m1</span><span class="w"> </span><span class="n">m2</span><span class="w"> </span><span class="n">product</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">process-new-value</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="k">or</span><span class="w"> </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">m1</span><span class="p">)</span>
<span class="w">                    </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">m1</span><span class="p">)</span><span class="w"> </span><span class="mi">0</span><span class="p">))</span>
<span class="w">               </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">m2</span><span class="p">)</span>
<span class="w">                    </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">m2</span><span class="p">)</span><span class="w"> </span><span class="mi">0</span><span class="p">)))</span>
<span class="w">           </span><span class="p">(</span><span class="n">set-value!</span><span class="w"> </span><span class="n">product</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="n">me</span><span class="p">))</span>
<span class="w">          </span><span class="p">((</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">m1</span><span class="p">)</span>
<span class="w">                </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">m2</span><span class="p">))</span>
<span class="w">           </span><span class="p">(</span><span class="n">set-value!</span><span class="w"> </span><span class="n">product</span>
<span class="w">                       </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">m1</span><span class="p">)</span>
<span class="w">                          </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">m2</span><span class="p">))</span>
<span class="w">                       </span><span class="n">me</span><span class="p">))</span>
<span class="w">          </span><span class="p">((</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">product</span><span class="p">)</span>
<span class="w">                </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">m1</span><span class="p">))</span>
<span class="w">           </span><span class="p">(</span><span class="n">set-value!</span><span class="w"> </span><span class="n">m2</span>
<span class="w">                       </span><span class="p">(</span><span class="nb">/</span><span class="w"> </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">product</span><span class="p">)</span>
<span class="w">                          </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">m1</span><span class="p">))</span>
<span class="w">                       </span><span class="n">me</span><span class="p">))</span>
<span class="w">          </span><span class="p">((</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">product</span><span class="p">)</span>
<span class="w">                </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">m2</span><span class="p">))</span>
<span class="w">           </span><span class="p">(</span><span class="n">set-value!</span><span class="w"> </span><span class="n">m1</span>
<span class="w">                       </span><span class="p">(</span><span class="nb">/</span><span class="w"> </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">product</span><span class="p">)</span>
<span class="w">                          </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">m2</span><span class="p">))</span>
<span class="w">                       </span><span class="n">me</span><span class="p">))))</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">process-forget-value</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">forget-value!</span><span class="w"> </span><span class="n">product</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">forget-value!</span><span class="w"> </span><span class="n">m1</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">forget-value!</span><span class="w"> </span><span class="n">m2</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">process-new-value</span><span class="p">))</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">me</span><span class="w"> </span><span class="n">request</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">request</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">I-have-a-value</span><span class="p">)</span>
<span class="w">           </span><span class="p">(</span><span class="n">process-new-value</span><span class="p">))</span>
<span class="w">          </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">request</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">I-lost-my-value</span><span class="p">)</span>
<span class="w">           </span><span class="p">(</span><span class="n">process-forget-value</span><span class="p">))</span>
<span class="w">          </span><span class="p">(</span><span class="k">else</span>
<span class="w">           </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;Unknown request:</span>
<span class="s2">                   MULTIPLIER&quot;</span>
<span class="w">                  </span><span class="n">request</span><span class="p">))))</span>
<span class="w">  </span><span class="p">(</span><span class="n">connect</span><span class="w"> </span><span class="n">m1</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">connect</span><span class="w"> </span><span class="n">m2</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">connect</span><span class="w"> </span><span class="n">product</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">  </span><span class="n">me</span><span class="p">)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">inform-about-value</span><span class="w"> </span><span class="n">constraint</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">constraint</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">I-have-a-value</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">inform-about-no-value</span><span class="w"> </span><span class="n">constraint</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">constraint</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">I-lost-my-value</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">constant</span><span class="w"> </span><span class="n">value</span><span class="w"> </span><span class="n">connector</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">me</span><span class="w"> </span><span class="n">request</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;Unknown request: CONSTANT&quot;</span>
<span class="w">           </span><span class="n">request</span><span class="p">))</span>
<span class="w">  </span><span class="p">(</span><span class="n">connect</span><span class="w"> </span><span class="n">connector</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">set-value!</span><span class="w"> </span><span class="n">connector</span><span class="w"> </span><span class="n">value</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">  </span><span class="n">me</span><span class="p">)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">probe</span><span class="w"> </span><span class="n">name</span><span class="w"> </span><span class="n">connector</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">print-probe</span><span class="w"> </span><span class="n">value</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;Probe: &quot;</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="n">name</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot; = &quot;</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="n">value</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span><span class="w"> </span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">process-new-value</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">print-probe</span><span class="w"> </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">connector</span><span class="p">)))</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">process-forget-value</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">print-probe</span><span class="w"> </span><span class="s2">&quot;?&quot;</span><span class="p">))</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">me</span><span class="w"> </span><span class="n">request</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">request</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">I-have-a-value</span><span class="p">)</span>
<span class="w">           </span><span class="p">(</span><span class="n">process-new-value</span><span class="p">))</span>
<span class="w">          </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">request</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">I-lost-my-value</span><span class="p">)</span>
<span class="w">           </span><span class="p">(</span><span class="n">process-forget-value</span><span class="p">))</span>
<span class="w">          </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;Unknown request: </span>
<span class="s2">                        PROBE&quot;</span><span class="w"> </span><span class="n">request</span><span class="p">))))</span>
<span class="w">  </span><span class="p">(</span><span class="n">connect</span><span class="w"> </span><span class="n">connector</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">  </span><span class="n">me</span><span class="p">)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-connector</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">value</span><span class="w"> </span><span class="k">false</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="n">informant</span><span class="w"> </span><span class="k">false</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="n">constraints</span><span class="w"> </span><span class="o">&#39;</span><span class="p">()))</span>
<span class="w">    </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">set-my-value</span><span class="w"> </span><span class="n">newval</span><span class="w"> </span><span class="n">setter</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">me</span><span class="p">))</span>
<span class="w">             </span><span class="p">(</span><span class="k">set!</span><span class="w"> </span><span class="n">value</span><span class="w"> </span><span class="n">newval</span><span class="p">)</span>
<span class="w">             </span><span class="p">(</span><span class="k">set!</span><span class="w"> </span><span class="n">informant</span><span class="w"> </span><span class="n">setter</span><span class="p">)</span>
<span class="w">             </span><span class="p">(</span><span class="n">for-each-except</span>
<span class="w">              </span><span class="n">setter</span>
<span class="w">              </span><span class="n">inform-about-value</span>
<span class="w">              </span><span class="n">constraints</span><span class="p">))</span>
<span class="w">            </span><span class="p">((</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="n">value</span><span class="w"> </span><span class="n">newval</span><span class="p">))</span>
<span class="w">             </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;Contradiction&quot;</span>
<span class="w">                    </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="n">value</span><span class="w"> </span><span class="n">newval</span><span class="p">)))</span>
<span class="w">            </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">ignored</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">forget-my-value</span><span class="w"> </span><span class="n">retractor</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">eq?</span><span class="w"> </span><span class="n">retractor</span><span class="w"> </span><span class="n">informant</span><span class="p">)</span>
<span class="w">          </span><span class="p">(</span><span class="k">begin</span><span class="w"> </span><span class="p">(</span><span class="k">set!</span><span class="w"> </span><span class="n">informant</span><span class="w"> </span><span class="k">false</span><span class="p">)</span>
<span class="w">                 </span><span class="p">(</span><span class="n">for-each-except</span>
<span class="w">                  </span><span class="n">retractor</span>
<span class="w">                  </span><span class="n">inform-about-no-value</span>
<span class="w">                  </span><span class="n">constraints</span><span class="p">))</span>
<span class="w">          </span><span class="o">&#39;</span><span class="ss">ignored</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">connect</span><span class="w"> </span><span class="n">new-constraint</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="nb">memq</span><span class="w"> </span><span class="n">new-constraint</span>
<span class="w">                     </span><span class="n">constraints</span><span class="p">))</span>
<span class="w">          </span><span class="p">(</span><span class="k">set!</span><span class="w"> </span><span class="n">constraints</span>
<span class="w">                </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">new-constraint</span>
<span class="w">                      </span><span class="n">constraints</span><span class="p">)))</span>
<span class="w">      </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">          </span><span class="p">(</span><span class="n">inform-about-value</span><span class="w"> </span><span class="n">new-constraint</span><span class="p">))</span>
<span class="w">      </span><span class="o">&#39;</span><span class="ss">done</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">me</span><span class="w"> </span><span class="n">request</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">request</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">has-value?</span><span class="p">)</span>
<span class="w">             </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="n">informant</span><span class="w"> </span><span class="nb">true</span><span class="w"> </span><span class="k">false</span><span class="p">))</span>
<span class="w">            </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">request</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">value</span><span class="p">)</span><span class="w"> </span><span class="n">value</span><span class="p">)</span>
<span class="w">            </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">request</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">set-value!</span><span class="p">)</span>
<span class="w">             </span><span class="n">set-my-value</span><span class="p">)</span>
<span class="w">            </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">request</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">forget</span><span class="p">)</span>
<span class="w">             </span><span class="n">forget-my-value</span><span class="p">)</span>
<span class="w">            </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">request</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">connect</span><span class="p">)</span><span class="w"> </span><span class="n">connect</span><span class="p">)</span>
<span class="w">            </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;Unknown operation:</span>
<span class="s2">                          CONNECTOR&quot;</span>
<span class="w">                         </span><span class="n">request</span><span class="p">))))</span>
<span class="w">    </span><span class="n">me</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">for-each-except</span><span class="w"> </span><span class="n">exception</span><span class="w"> </span>
<span class="w">                         </span><span class="n">procedure</span><span class="w"> </span>
<span class="w">                         </span><span class="nb">list</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">loop</span><span class="w"> </span><span class="n">items</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">null?</span><span class="w"> </span><span class="n">items</span><span class="p">)</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">done</span><span class="p">)</span>
<span class="w">          </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">items</span><span class="p">)</span><span class="w"> </span><span class="n">exception</span><span class="p">)</span><span class="w"> </span>
<span class="w">           </span><span class="p">(</span><span class="n">loop</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">items</span><span class="p">)))</span>
<span class="w">          </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="n">procedure</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">items</span><span class="p">))</span>
<span class="w">                </span><span class="p">(</span><span class="n">loop</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">items</span><span class="p">)))))</span>
<span class="w">  </span><span class="p">(</span><span class="n">loop</span><span class="w"> </span><span class="nb">list</span><span class="p">))</span>


<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">C</span><span class="w"> </span><span class="p">(</span><span class="n">make-connector</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">F</span><span class="w"> </span><span class="p">(</span><span class="n">make-connector</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">celsius-fahrenheit-converter</span><span class="w"> </span><span class="n">c</span><span class="w"> </span><span class="n">f</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">u</span><span class="w"> </span><span class="p">(</span><span class="n">make-connector</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="n">v</span><span class="w"> </span><span class="p">(</span><span class="n">make-connector</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="n">w</span><span class="w"> </span><span class="p">(</span><span class="n">make-connector</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="n">x</span><span class="w"> </span><span class="p">(</span><span class="n">make-connector</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="n">y</span><span class="w"> </span><span class="p">(</span><span class="n">make-connector</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">multiplier</span><span class="w"> </span><span class="n">c</span><span class="w"> </span><span class="n">w</span><span class="w"> </span><span class="n">u</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">multiplier</span><span class="w"> </span><span class="n">v</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">u</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">adder</span><span class="w"> </span><span class="n">v</span><span class="w"> </span><span class="n">y</span><span class="w"> </span><span class="n">f</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">constant</span><span class="w"> </span><span class="mi">9</span><span class="w"> </span><span class="n">w</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">constant</span><span class="w"> </span><span class="mi">5</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">constant</span><span class="w"> </span><span class="mi">32</span><span class="w"> </span><span class="n">y</span><span class="p">)</span>
<span class="w">    </span><span class="o">&#39;</span><span class="ss">ok</span><span class="p">))</span>
<span class="p">(</span><span class="n">celsius-fahrenheit-converter</span><span class="w"> </span><span class="n">C</span><span class="w"> </span><span class="n">F</span><span class="p">)</span>

<span class="p">(</span><span class="n">probe</span><span class="w"> </span><span class="s2">&quot;Celsius temp&quot;</span><span class="w"> </span><span class="n">C</span><span class="p">)</span>
<span class="p">(</span><span class="n">probe</span><span class="w"> </span><span class="s2">&quot;Fahrenheit temp&quot;</span><span class="w"> </span><span class="n">F</span><span class="p">)</span>
<span class="p">(</span><span class="n">set-value!</span><span class="w"> </span><span class="n">C</span><span class="w"> </span><span class="mi">25</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">user</span><span class="p">)</span>
<span class="c1">;; Probe: Celsius temp = 25</span>
<span class="c1">;; Probe: Fahrenheit temp = 77</span>
<span class="c1">;; done</span>

<span class="c1">; (set-value! F 212 &#39;user)</span>
<span class="c1">;; Error! Contradiction (77 212)</span>

<span class="p">(</span><span class="n">forget-value!</span><span class="w"> </span><span class="n">C</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">user</span><span class="p">)</span>
<span class="c1">;; Probe: Celsius temp = ?</span>
<span class="c1">;; Probe: Fahrenheit temp = ?</span>
<span class="c1">;; done</span>


<span class="p">(</span><span class="n">set-value!</span><span class="w"> </span><span class="n">F</span><span class="w"> </span><span class="mi">212</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">user</span><span class="p">)</span>
<span class="c1">;; Probe: Fahrenheit temp = 212</span>
<span class="c1">;; Probe: Celsius temp = 100</span>
<span class="c1">;; done</span>
</pre></div>

</details>
<div class="code-output">
<span>Output:</span>
<pre>ok
#&lt;procedure:...code/constraint.rkt:120:2&gt;
#&lt;procedure:...code/constraint.rkt:120:2&gt;
Probe: Celsius temp = 25
Probe: Fahrenheit temp = 77
done
Probe: Celsius temp = ?
Probe: Fahrenheit temp = ?
done
Probe: Fahrenheit temp = 212
Probe: Celsius temp = 100
done
</pre>
</div>
</div>


### Meeting 05-25-2025

- Eric Grimson 2004 MIT lectures on SICP [13. Environment Model](https://www.youtube.com/watch?v=SDsxFreEYsc&list=PL7BcsI5ueSNFPCEisbaoQ0kXIDX9rR5FF&t=1962s).
 - [From here to lambda and back again - Douglas Crockford at RacketCon](https://www.youtube.com/watch?v=vMDHpPN_p08)
 - p-list vs a-list
 - In the context of the end of chapter 3-3, constraint solvers: First order predicate and expert systems.

 - Note on one of the problems: Given the implementation of `append!`, I had to intialize a supposedly empty list to a dummy pair `(list dummy '())`. Specifically I was referring to the line `(define tracker (list 'first-element))` in my solution to [exercise 17](https://physbuzz.github.io/sicp/ch3/notes-ch3-3.html#exercise-317)
 - [Common lisp quick reference](http://clqr.boundp.org/)

### Exercises

#### Exercise 3.12

The following procedure for
appending lists was introduced in 2.2.1:

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">append</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">y</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">      </span><span class="n">y</span>
<span class="w">      </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">append</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="n">y</span><span class="p">))))</span>
</pre></div>

`Append` forms a new list by successively `cons`ing the elements of
`x` onto `y`.  The procedure `append!` is similar to
`append`, but it is a mutator rather than a constructor.  It appends the
lists by splicing them together, modifying the final pair of `x` so that
its `cdr` is now `y`.  (It is an error to call `append!` with an
empty `x`.)

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">append!</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">y</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">set-cdr!</span><span class="w"> </span><span class="p">(</span><span class="nb">last-pair</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="n">y</span><span class="p">)</span>
<span class="w">  </span><span class="n">x</span><span class="p">)</span>
</pre></div>

Here `last-pair` is a procedure that returns the last pair in its
argument:

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">last-pair</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="w">      </span><span class="n">x</span>
<span class="w">      </span><span class="p">(</span><span class="nb">last-pair</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">x</span><span class="p">))))</span>
</pre></div>

Consider the interaction

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">a</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">b</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">y</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">c</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">d</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">z</span><span class="w"> </span><span class="p">(</span><span class="nb">append</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">y</span><span class="p">))</span>

<span class="n">z</span>
<span class="p">(</span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="w"> </span><span class="n">c</span><span class="w"> </span><span class="n">d</span><span class="p">)</span>

<span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="n">⟨response⟩</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">w</span><span class="w"> </span><span class="p">(</span><span class="n">append!</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">y</span><span class="p">))</span>

<span class="n">w</span>
<span class="p">(</span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="w"> </span><span class="n">c</span><span class="w"> </span><span class="n">d</span><span class="p">)</span>

<span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="n">⟨response⟩</span>
</pre></div>

What are the missing `⟨response⟩`s?  Draw box-and-pointer diagrams to
explain your answer.

##### Solution

<div class="code-box" markdown="1">
<div class="code-header"><a href="code/ex3-12.rkt">code/ex3-12.rkt</a></div>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">append!</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">y</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">set-cdr!</span><span class="w"> </span><span class="p">(</span><span class="nb">last-pair</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="n">y</span><span class="p">)</span>
<span class="w">  </span><span class="n">x</span><span class="p">)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">last-pair</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="w">      </span><span class="n">x</span>
<span class="w">      </span><span class="p">(</span><span class="nb">last-pair</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">x</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">a</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">b</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">y</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">c</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">d</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">z</span><span class="w"> </span><span class="p">(</span><span class="nb">append</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">y</span><span class="p">))</span>

<span class="n">z</span>
<span class="c1">; (a b c d)</span>

<span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="c1">; (b)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">w</span><span class="w"> </span><span class="p">(</span><span class="n">append!</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">y</span><span class="p">))</span>
<span class="c1">; (last-pair x) gives (cons &#39;b nil)</span>
<span class="c1">; We set this pair&#39;s 2nd element to y, which is (cons &#39;c (cons &#39;d nil))</span>
<span class="c1">; So x is now &#39;(a b c d)</span>

<span class="n">w</span>
<span class="c1">; (a b c d)</span>

<span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="c1">; (b c d)</span>
</pre></div>
<div class="code-output">
<span>Output:</span>
<pre>(a b c d)
(b)
(a b c d)
(b c d)
</pre>
</div>
</div>


<div style="text-align: center; margin: 20px 0;">
  <img src="img/ex3-12.svg" style="width: 70%; max-width: 800px;" alt="A box-and-pointer diagram, what do you want?">
</div>

#### Exercise 3.13

Consider the following
`make-cycle` procedure, which uses the `last-pair` procedure defined
in Exercise 3.12:

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-cycle</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">set-cdr!</span><span class="w"> </span><span class="p">(</span><span class="nb">last-pair</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="n">x</span><span class="p">)</span>
</pre></div>

Draw a box-and-pointer diagram that shows the structure `z` created by

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">z</span><span class="w"> </span><span class="p">(</span><span class="n">make-cycle</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">a</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">b</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">c</span><span class="p">)))</span>
</pre></div>

What happens if we try to compute `(last-pair z)`?

##### Solution

If we try to compute `(last-pair z)`, the algorithm will run
until it finds a pair which has a cdr equal to nil. Unfortunately this will never happen!

<div style="text-align: center; margin: 20px 0;">
  <img src="img/ex3-13.svg" style="width: 70%; max-width: 800px;" alt="A box-and-pointer diagram, what do you want?">
</div>


#### Exercise 3.14

The following procedure is quite
useful, although obscure:

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">mystery</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">loop</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">y</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">        </span><span class="n">y</span>
<span class="w">        </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">temp</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">x</span><span class="p">)))</span>
<span class="w">          </span><span class="p">(</span><span class="n">set-cdr!</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">y</span><span class="p">)</span>
<span class="w">          </span><span class="p">(</span><span class="n">loop</span><span class="w"> </span><span class="n">temp</span><span class="w"> </span><span class="n">x</span><span class="p">))))</span>
<span class="w">  </span><span class="p">(</span><span class="n">loop</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="o">&#39;</span><span class="p">()))</span>
</pre></div>

`Loop` uses the "temporary" variable `temp` to hold the old value
of the `cdr` of `x`, since the `set-cdr!`  on the next line
destroys the `cdr`.  Explain what `mystery` does in general.  Suppose
`v` is defined by `(define v (list 'a 'b 'c 'd))`. Draw the
box-and-pointer diagram that represents the list to which `v` is bound.
Suppose that we now evaluate `(define w (mystery v))`. Draw
box-and-pointer diagrams that show the structures `v` and `w` after
evaluating this expression.  What would be printed as the values of `v`
and `w`?

##### Solution

<div class="code-box" markdown="1">
<div class="code-header"><a href="code/ex3-14.rkt">code/ex3-14.rkt</a></div>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="c1">; invariants: </span>
<span class="c1">;   x and y together contain all original elements of x</span>
<span class="c1">;   y contains elements of the original x in reversed order</span>
<span class="c1">;   </span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">mystery</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">loop</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">y</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">        </span><span class="n">y</span>
<span class="w">        </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">temp</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">x</span><span class="p">)))</span>
<span class="w">          </span><span class="p">(</span><span class="n">set-cdr!</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">y</span><span class="p">)</span>
<span class="w">          </span><span class="p">(</span><span class="n">loop</span><span class="w"> </span><span class="n">temp</span><span class="w"> </span><span class="n">x</span><span class="p">))))</span>
<span class="w">  </span><span class="p">(</span><span class="n">loop</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="o">&#39;</span><span class="p">()))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">v</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">a</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">b</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">c</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">d</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">w</span><span class="w"> </span><span class="p">(</span><span class="n">mystery</span><span class="w"> </span><span class="n">v</span><span class="p">))</span>

<span class="n">w</span>
<span class="n">v</span>
</pre></div>
<div class="code-output">
<span>Output:</span>
<pre>(d c b a)
(a)
</pre>
</div>
</div>


This is a recursive algorithm for reversing a linked list. One way to see this is
to look at the invariant `(append (reverse y) x)`, which will always be equal to
the original list. Certainly it's true for `y='()` and `x=list`. On subsequent steps,
we can look at the function call `(loop temp x-modified)` and work backwards 
(where I use `x-modified` to refer to x after being mutated with `set-cdr!`
<div class="codehilite"><pre><span></span><span class="p">(</span><span class="nb">append</span><span class="w"> </span><span class="p">(</span><span class="nb">reverse</span><span class="w"> </span><span class="n">x-modified</span><span class="p">)</span><span class="w"> </span><span class="n">temp</span><span class="p">)</span>
<span class="nb">=</span><span class="p">(</span><span class="nb">append</span><span class="w"> </span><span class="p">(</span><span class="nb">reverse</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="n">y</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="nb">=</span><span class="p">(</span><span class="nb">append</span><span class="w"> </span><span class="p">(</span><span class="nb">reverse</span><span class="w"> </span><span class="n">y</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">x</span><span class="p">)))</span>
<span class="nb">=</span><span class="p">(</span><span class="nb">append</span><span class="w"> </span><span class="p">(</span><span class="nb">reverse</span><span class="w"> </span><span class="n">y</span><span class="p">)</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
</pre></div>
So the loop invariant is preserved, the length of the first argument decreases by one
each step, and at the end when `x='()` we have `list = (reverse y)` so the list is reversed.

Less proof-ey, more intuitively, recall that every pair in the linked list has a pointer to the element stored
and a pointer to the next element stored. We want to change this second pointer 
to point towards the previous element in the list. We do this by storing 
the previous pair in the list as `y` and the rest of the not-updated list as `x`.

<div style="text-align: center; margin: 20px 0;">
  <img src="img/ex3-14.svg" style="width: 70%; max-width: 800px;" alt="A box-and-pointer diagram, what do you want?">
</div>

#### Exercise 3.15

Draw box-and-pointer diagrams to
explain the effect of `set-to-wow!` on the structures `z1` and
`z2` above.

##### Solution
<div style="text-align: center; margin: 20px 0;">
  <img src="img/ex3-15.svg" style="width: 70%; max-width: 800px;" alt="A box-and-pointer diagram, what do you want?">
</div>

So this explains why in the first case when we call `set-to-wow!` it seems like
"both pairs" are changed. In fact we are changing the first pair, x, and it is pointed to
twice.

In the case of `z2`, these point to two separate lists.

#### Exercise 3.16

Ben Bitdiddle decides to write a
procedure to count the number of pairs in any list structure.  ``It's easy,''
he reasons.  ``The number of pairs in any structure is the number in the
`car` plus the number in the `cdr` plus one more to count the current
pair.''  So Ben writes the following procedure:

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">count-pairs</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="nb">pair?</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="w">      </span><span class="mi">0</span>
<span class="w">      </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="p">(</span><span class="n">count-pairs</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="w">         </span><span class="p">(</span><span class="n">count-pairs</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="w">         </span><span class="mi">1</span><span class="p">)))</span>
</pre></div>

Show that this procedure is not correct.  In particular, draw box-and-pointer
diagrams representing list structures made up of exactly three pairs for which
Ben's procedure would return 3; return 4; return 7; never return at all.

##### Solution

<div class="code-box" markdown="1">
<div class="code-header"><a href="code/ex3-16.rkt">code/ex3-16.rkt</a></div>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">count-pairs</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="nb">pair?</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="w">      </span><span class="mi">0</span>
<span class="w">      </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="p">(</span><span class="n">count-pairs</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="w">         </span><span class="p">(</span><span class="n">count-pairs</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="w">         </span><span class="mi">1</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">list1</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">a</span><span class="w"> </span><span class="ss">b</span><span class="w"> </span><span class="ss">c</span><span class="p">))</span>
<span class="p">(</span><span class="n">count-pairs</span><span class="w"> </span><span class="n">list1</span><span class="p">)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">list2</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">a</span><span class="w"> </span><span class="ss">b</span><span class="w"> </span><span class="ss">c</span><span class="p">))</span>
<span class="p">(</span><span class="n">set-car!</span><span class="w"> </span><span class="n">list2</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">list2</span><span class="p">))</span>
<span class="p">(</span><span class="n">set-cdr!</span><span class="w"> </span><span class="n">list2</span><span class="w"> </span><span class="p">(</span><span class="nb">cddr</span><span class="w"> </span><span class="n">list2</span><span class="p">))</span>
<span class="p">(</span><span class="n">count-pairs</span><span class="w"> </span><span class="n">list2</span><span class="p">)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">list3</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">a</span><span class="w"> </span><span class="ss">b</span><span class="w"> </span><span class="ss">c</span><span class="p">))</span>
<span class="p">(</span><span class="n">set-car!</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">list3</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cddr</span><span class="w"> </span><span class="n">list3</span><span class="p">))</span>
<span class="p">(</span><span class="n">set-car!</span><span class="w"> </span><span class="n">list3</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">list3</span><span class="p">))</span>
<span class="p">(</span><span class="n">count-pairs</span><span class="w"> </span><span class="n">list3</span><span class="p">)</span>

<span class="c1">;; We could do the following, but it would never halt so I&#39;m not doing it</span>
<span class="c1">;; (define list4 &#39;(a c))</span>
<span class="c1">;; (set-cdr! (cdr list4) list4)</span>
<span class="c1">;; (count-pairs list4)</span>
</pre></div>
<div class="code-output">
<span>Output:</span>
<pre>3
4
7
</pre>
</div>
</div>


The explanation of the construction of the four different lists is explained
in this image:

<div style="text-align: center; margin: 20px 0;">
  <img src="img/ex3-16.svg" style="width: 70%; max-width: 800px;" alt="A box-and-pointer diagram, what do you want?">
</div>

#### Exercise 3.17

Devise a correct version of the
`count-pairs` procedure of Exercise 3.16 that returns the number of
distinct pairs in any structure.  (Hint: Traverse the structure, maintaining an
auxiliary data structure that is used to keep track of which pairs have already
been counted.)

##### Solution

<div class="code-box" markdown="1">
<div class="code-header"><a href="code/ex3-17.rkt">code/ex3-17.rkt</a></div>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">last-pair</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="w">      </span><span class="n">x</span>
<span class="w">      </span><span class="p">(</span><span class="nb">last-pair</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">x</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">append!</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">y</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">set-cdr!</span><span class="w"> </span><span class="p">(</span><span class="nb">last-pair</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="n">y</span><span class="p">)</span>
<span class="w">  </span><span class="n">x</span><span class="p">)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">member?</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">lst</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">null?</span><span class="w"> </span><span class="n">lst</span><span class="p">)</span><span class="w"> </span><span class="no">#f</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">lst</span><span class="p">))</span><span class="w"> </span><span class="no">#t</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="n">member?</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">lst</span><span class="p">)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">count-pairs</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">tracker</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">first-element</span><span class="p">))</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">count-pairs-inner</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">tracker</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="nb">pair?</span><span class="w"> </span><span class="n">x</span><span class="p">))</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span>
<span class="w">          </span><span class="p">((</span><span class="n">member?</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">tracker</span><span class="p">)</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span>
<span class="w">          </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="k">begin</span><span class="w"> </span>
<span class="w">            </span><span class="p">(</span><span class="n">append!</span><span class="w"> </span><span class="n">tracker</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="w">            </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="mi">1</span>
<span class="w">               </span><span class="p">(</span><span class="n">count-pairs-inner</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="n">tracker</span><span class="p">)</span>
<span class="w">               </span><span class="p">(</span><span class="n">count-pairs-inner</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="n">tracker</span><span class="p">))))))</span>
<span class="w">  </span><span class="p">(</span><span class="n">count-pairs-inner</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">tracker</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">list1</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">a</span><span class="w"> </span><span class="ss">b</span><span class="w"> </span><span class="ss">c</span><span class="p">))</span>
<span class="p">(</span><span class="n">count-pairs</span><span class="w"> </span><span class="n">list1</span><span class="p">)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">list2</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">a</span><span class="w"> </span><span class="ss">b</span><span class="w"> </span><span class="ss">c</span><span class="p">))</span>
<span class="p">(</span><span class="n">set-car!</span><span class="w"> </span><span class="n">list2</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">list2</span><span class="p">))</span>
<span class="p">(</span><span class="n">set-cdr!</span><span class="w"> </span><span class="n">list2</span><span class="w"> </span><span class="p">(</span><span class="nb">cddr</span><span class="w"> </span><span class="n">list2</span><span class="p">))</span>
<span class="p">(</span><span class="n">count-pairs</span><span class="w"> </span><span class="n">list2</span><span class="p">)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">list3</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">a</span><span class="w"> </span><span class="ss">b</span><span class="w"> </span><span class="ss">c</span><span class="p">))</span>
<span class="p">(</span><span class="n">set-car!</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">list3</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cddr</span><span class="w"> </span><span class="n">list3</span><span class="p">))</span>
<span class="p">(</span><span class="n">set-car!</span><span class="w"> </span><span class="n">list3</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">list3</span><span class="p">))</span>
<span class="p">(</span><span class="n">count-pairs</span><span class="w"> </span><span class="n">list3</span><span class="p">)</span>

<span class="c1">;; No more infinite looping!</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">list4</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">a</span><span class="w"> </span><span class="ss">b</span><span class="w"> </span><span class="ss">c</span><span class="p">))</span>
<span class="p">(</span><span class="n">set-cdr!</span><span class="w"> </span><span class="p">(</span><span class="nb">cddr</span><span class="w"> </span><span class="n">list4</span><span class="p">)</span><span class="w"> </span><span class="n">list4</span><span class="p">)</span>
<span class="p">(</span><span class="n">count-pairs</span><span class="w"> </span><span class="n">list4</span><span class="p">)</span>
</pre></div>
<div class="code-output">
<span>Output:</span>
<pre>3
3
3
3
</pre>
</div>
</div>


#### Exercise 3.18

Write a procedure that examines a
list and determines whether it contains a cycle, that is, whether a program
that tried to find the end of the list by taking successive `cdr`s would
go into an infinite loop.  Exercise 3.13 constructed such lists.

##### Solution

<div class="code-box" markdown="1">
<div class="code-header"><a href="code/ex3-18.rkt">code/ex3-18.rkt</a></div>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">last-pair</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="w">      </span><span class="n">x</span>
<span class="w">      </span><span class="p">(</span><span class="nb">last-pair</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">x</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">append!</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">y</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">set-cdr!</span><span class="w"> </span><span class="p">(</span><span class="nb">last-pair</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="n">y</span><span class="p">)</span>
<span class="w">  </span><span class="n">x</span><span class="p">)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">member?</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">lst</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">null?</span><span class="w"> </span><span class="n">lst</span><span class="p">)</span><span class="w"> </span><span class="no">#f</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">lst</span><span class="p">))</span><span class="w"> </span><span class="no">#t</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="n">member?</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">lst</span><span class="p">)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">contains-loop?</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">loop-inner</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">tracker</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">null?</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="no">#f</span><span class="p">)</span>
<span class="w">          </span><span class="p">((</span><span class="n">member?</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">tracker</span><span class="p">)</span><span class="w"> </span><span class="no">#t</span><span class="p">)</span>
<span class="w">          </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="n">loop-inner</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">append</span><span class="w"> </span><span class="n">tracker</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="n">x</span><span class="p">))))))</span>
<span class="w">  </span><span class="p">(</span><span class="n">loop-inner</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="o">&#39;</span><span class="p">()))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">list1</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">a</span><span class="w"> </span><span class="ss">b</span><span class="w"> </span><span class="ss">c</span><span class="p">))</span>
<span class="p">(</span><span class="n">contains-loop?</span><span class="w"> </span><span class="n">list1</span><span class="p">)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">list2</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">a</span><span class="w"> </span><span class="ss">b</span><span class="w"> </span><span class="ss">c</span><span class="p">))</span>
<span class="p">(</span><span class="n">set-car!</span><span class="w"> </span><span class="n">list2</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">list2</span><span class="p">))</span>
<span class="p">(</span><span class="n">set-cdr!</span><span class="w"> </span><span class="n">list2</span><span class="w"> </span><span class="p">(</span><span class="nb">cddr</span><span class="w"> </span><span class="n">list2</span><span class="p">))</span>
<span class="p">(</span><span class="n">contains-loop?</span><span class="w"> </span><span class="n">list2</span><span class="p">)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">list3</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">a</span><span class="w"> </span><span class="ss">b</span><span class="w"> </span><span class="ss">c</span><span class="p">))</span>
<span class="p">(</span><span class="n">set-car!</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">list3</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cddr</span><span class="w"> </span><span class="n">list3</span><span class="p">))</span>
<span class="p">(</span><span class="n">set-car!</span><span class="w"> </span><span class="n">list3</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">list3</span><span class="p">))</span>
<span class="p">(</span><span class="n">contains-loop?</span><span class="w"> </span><span class="n">list3</span><span class="p">)</span>

<span class="c1">;; No more infinite looping!</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">list4</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">a</span><span class="w"> </span><span class="ss">b</span><span class="w"> </span><span class="ss">c</span><span class="p">))</span>
<span class="p">(</span><span class="n">set-cdr!</span><span class="w"> </span><span class="p">(</span><span class="nb">cddr</span><span class="w"> </span><span class="n">list4</span><span class="p">)</span><span class="w"> </span><span class="n">list4</span><span class="p">)</span>
<span class="p">(</span><span class="n">contains-loop?</span><span class="w"> </span><span class="n">list4</span><span class="p">)</span>
</pre></div>
<div class="code-output">
<span>Output:</span>
<pre>#f
#f
#f
#t
</pre>
</div>
</div>


#### Exercise 3.19

Redo Exercise 3.18 using an
algorithm that takes only a constant amount of space.  (This requires a very
clever idea.)

##### Solution

<div class="code-box" markdown="1">
<div class="code-header"><a href="code/ex3-19.rkt">code/ex3-19.rkt</a></div>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">last-pair</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="w">      </span><span class="n">x</span>
<span class="w">      </span><span class="p">(</span><span class="nb">last-pair</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">x</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">append!</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">y</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">set-cdr!</span><span class="w"> </span><span class="p">(</span><span class="nb">last-pair</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="n">y</span><span class="p">)</span>
<span class="w">  </span><span class="n">x</span><span class="p">)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">member?</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">lst</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">null?</span><span class="w"> </span><span class="n">lst</span><span class="p">)</span><span class="w"> </span><span class="no">#f</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">lst</span><span class="p">))</span><span class="w"> </span><span class="no">#t</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="n">member?</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">lst</span><span class="p">)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">contains-loop?</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="c1">;; Checks if we can cdr x n times</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">try-step</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">=</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">          </span><span class="p">((</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="nb">pair?</span><span class="w"> </span><span class="n">x</span><span class="p">))</span><span class="w"> </span><span class="no">#f</span><span class="p">)</span>
<span class="w">          </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="n">try-step</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">)))))</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">loop-inner</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">y</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">xnew</span><span class="w"> </span><span class="p">(</span><span class="n">try-step</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="mi">1</span><span class="p">))</span>
<span class="w">          </span><span class="p">(</span><span class="n">ynew</span><span class="w"> </span><span class="p">(</span><span class="n">try-step</span><span class="w"> </span><span class="n">y</span><span class="w"> </span><span class="mi">2</span><span class="p">)))</span>
<span class="w">      </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="k">or</span><span class="w"> </span><span class="p">(</span><span class="nb">not</span><span class="w"> </span><span class="n">ynew</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">not</span><span class="w"> </span><span class="n">xnew</span><span class="p">))</span><span class="w"> </span><span class="no">#f</span><span class="p">)</span>
<span class="w">            </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">xnew</span><span class="w"> </span><span class="n">ynew</span><span class="p">)</span><span class="w"> </span><span class="no">#t</span><span class="p">)</span>
<span class="w">            </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="n">loop-inner</span><span class="w"> </span><span class="n">xnew</span><span class="w"> </span><span class="n">ynew</span><span class="p">)))))</span>
<span class="w">  </span><span class="p">(</span><span class="n">loop-inner</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">list1</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">a</span><span class="w"> </span><span class="ss">b</span><span class="w"> </span><span class="ss">c</span><span class="p">))</span>
<span class="p">(</span><span class="n">contains-loop?</span><span class="w"> </span><span class="n">list1</span><span class="p">)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">list2</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">a</span><span class="w"> </span><span class="ss">b</span><span class="w"> </span><span class="ss">c</span><span class="p">))</span>
<span class="p">(</span><span class="n">set-car!</span><span class="w"> </span><span class="n">list2</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">list2</span><span class="p">))</span>
<span class="p">(</span><span class="n">set-cdr!</span><span class="w"> </span><span class="n">list2</span><span class="w"> </span><span class="p">(</span><span class="nb">cddr</span><span class="w"> </span><span class="n">list2</span><span class="p">))</span>
<span class="p">(</span><span class="n">contains-loop?</span><span class="w"> </span><span class="n">list2</span><span class="p">)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">list3</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">a</span><span class="w"> </span><span class="ss">b</span><span class="w"> </span><span class="ss">c</span><span class="p">))</span>
<span class="p">(</span><span class="n">set-car!</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">list3</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cddr</span><span class="w"> </span><span class="n">list3</span><span class="p">))</span>
<span class="p">(</span><span class="n">set-car!</span><span class="w"> </span><span class="n">list3</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">list3</span><span class="p">))</span>
<span class="p">(</span><span class="n">contains-loop?</span><span class="w"> </span><span class="n">list3</span><span class="p">)</span>

<span class="c1">;; No more infinite looping!</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">list4</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">a</span><span class="w"> </span><span class="ss">b</span><span class="w"> </span><span class="ss">c</span><span class="p">))</span>
<span class="p">(</span><span class="n">set-cdr!</span><span class="w"> </span><span class="p">(</span><span class="nb">cddr</span><span class="w"> </span><span class="n">list4</span><span class="p">)</span><span class="w"> </span><span class="n">list4</span><span class="p">)</span>
<span class="p">(</span><span class="n">contains-loop?</span><span class="w"> </span><span class="n">list4</span><span class="p">)</span>
</pre></div>
<div class="code-output">
<span>Output:</span>
<pre>#f
#f
#f
#t
</pre>
</div>
</div>


The idea here is to use two "racers", racer x takes one step every turn, 
racer y takes two steps. If racer y ever passes racer x, there's a loop. 

#### Exercise 3.20

Draw environment diagrams to
illustrate the evaluation of the sequence of expressions

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">2</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">z</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>

<span class="p">(</span><span class="n">set-car!</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">z</span><span class="p">)</span><span class="w"> </span><span class="mi">17</span><span class="p">)</span>

<span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="mi">17</span>
</pre></div>


using the procedural implementation of pairs given above.  (Compare
Exercise 3.11.)

##### Solution

<div style="text-align: center; margin: 20px 0;">
  <img src="img/ex3-20.svg" style="width: 70%; max-width: 800px;" alt="A box-and-pointer diagram, what do you want?">
</div>

Here's an incomplete answer to the question based on just some of the diagrams that I could have written.

The blue E1 and E2 are created by the calls to cons. 

The red environments are created by `set-car!`, `dispatch` and cons's version of 
`set-x!`. I ignore the small environments created by calling `(car z)`, which would involve another call to `dispatch`. 

#### Exercise 3.21

Ben Bitdiddle decides to test the
queue implementation described above.  He types in the procedures to the Lisp
interpreter and proceeds to try them out:

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">q1</span><span class="w"> </span><span class="p">(</span><span class="n">make-queue</span><span class="p">))</span>

<span class="p">(</span><span class="n">insert-queue!</span><span class="w"> </span><span class="n">q1</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">a</span><span class="p">)</span>
<span class="p">((</span><span class="n">a</span><span class="p">)</span><span class="w"> </span><span class="n">a</span><span class="p">)</span>

<span class="p">(</span><span class="n">insert-queue!</span><span class="w"> </span><span class="n">q1</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">b</span><span class="p">)</span>
<span class="p">((</span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="p">)</span><span class="w"> </span><span class="n">b</span><span class="p">)</span>

<span class="p">(</span><span class="n">delete-queue!</span><span class="w"> </span><span class="n">q1</span><span class="p">)</span>
<span class="p">((</span><span class="n">b</span><span class="p">)</span><span class="w"> </span><span class="n">b</span><span class="p">)</span>

<span class="p">(</span><span class="n">delete-queue!</span><span class="w"> </span><span class="n">q1</span><span class="p">)</span>
<span class="p">(()</span><span class="w"> </span><span class="n">b</span><span class="p">)</span>
</pre></div>

"It's all wrong!" he complains.  "The interpreter's response shows that the
last item is inserted into the queue twice.  And when I delete both items, the
second `b` is still there, so the queue isn't empty, even though it's
supposed to be."  Eva Lu Ator suggests that Ben has misunderstood what is
happening. "It's not that the items are going into the queue twice," she
explains.  "It's just that the standard Lisp printer doesn't know how to make
sense of the queue representation. If you want to see the queue printed
correctly, you'll have to define your own print procedure for queues." Explain
what Eva Lu is talking about.  In particular, show why Ben's examples produce
the printed results that they do.  Define a procedure `print-queue` that
takes a queue as input and prints the sequence of items in the queue.

##### Solution

<div class="code-box" markdown="1">
<div class="code-header"><a href="code/ex3-21.rkt">code/ex3-21.rkt</a></div>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">front-ptr</span><span class="w"> </span><span class="n">queue</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">queue</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">rear-ptr</span><span class="w"> </span><span class="n">queue</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">queue</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">set-front-ptr!</span><span class="w"> </span><span class="n">queue</span><span class="w"> </span><span class="n">item</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="n">set-car!</span><span class="w"> </span><span class="n">queue</span><span class="w"> </span><span class="n">item</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">set-rear-ptr!</span><span class="w"> </span><span class="n">queue</span><span class="w"> </span><span class="n">item</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="n">set-cdr!</span><span class="w"> </span><span class="n">queue</span><span class="w"> </span><span class="n">item</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">empty-queue?</span><span class="w"> </span><span class="n">queue</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="p">(</span><span class="n">front-ptr</span><span class="w"> </span><span class="n">queue</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-queue</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="o">&#39;</span><span class="p">()</span><span class="w"> </span><span class="o">&#39;</span><span class="p">()))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">front-queue</span><span class="w"> </span><span class="n">queue</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">empty-queue?</span><span class="w"> </span><span class="n">queue</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;FRONT called with an</span>
<span class="s2">              empty queue&quot;</span><span class="w"> </span><span class="n">queue</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="p">(</span><span class="n">front-ptr</span><span class="w"> </span><span class="n">queue</span><span class="p">))))</span>


<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">insert-queue!</span><span class="w"> </span><span class="n">queue</span><span class="w"> </span><span class="n">item</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">new-pair</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">item</span><span class="w"> </span><span class="o">&#39;</span><span class="p">())))</span>
<span class="w">    </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="n">empty-queue?</span><span class="w"> </span><span class="n">queue</span><span class="p">)</span>
<span class="w">           </span><span class="p">(</span><span class="n">set-front-ptr!</span><span class="w"> </span><span class="n">queue</span><span class="w"> </span><span class="n">new-pair</span><span class="p">)</span>
<span class="w">           </span><span class="p">(</span><span class="n">set-rear-ptr!</span><span class="w"> </span><span class="n">queue</span><span class="w"> </span><span class="n">new-pair</span><span class="p">)</span>
<span class="w">           </span><span class="n">queue</span><span class="p">)</span>
<span class="w">          </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="n">set-cdr!</span><span class="w"> </span><span class="p">(</span><span class="n">rear-ptr</span><span class="w"> </span><span class="n">queue</span><span class="p">)</span><span class="w"> </span>
<span class="w">                          </span><span class="n">new-pair</span><span class="p">)</span>
<span class="w">                </span><span class="p">(</span><span class="n">set-rear-ptr!</span><span class="w"> </span><span class="n">queue</span><span class="w"> </span><span class="n">new-pair</span><span class="p">)</span>
<span class="w">                </span><span class="n">queue</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">delete-queue!</span><span class="w"> </span><span class="n">queue</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="n">empty-queue?</span><span class="w"> </span><span class="n">queue</span><span class="p">)</span>
<span class="w">         </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;DELETE! called with </span>
<span class="s2">                 an empty queue&quot;</span><span class="w"> </span><span class="n">queue</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="n">set-front-ptr!</span><span class="w"> </span>
<span class="w">               </span><span class="n">queue</span><span class="w"> </span>
<span class="w">               </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="p">(</span><span class="n">front-ptr</span><span class="w"> </span><span class="n">queue</span><span class="p">)))</span>
<span class="w">              </span><span class="n">queue</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">print-queue</span><span class="w"> </span><span class="n">queue</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="p">(</span><span class="n">front-ptr</span><span class="w"> </span><span class="n">queue</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">q1</span><span class="w"> </span><span class="p">(</span><span class="n">make-queue</span><span class="p">))</span>

<span class="p">(</span><span class="n">insert-queue!</span><span class="w"> </span><span class="n">q1</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">a</span><span class="p">)</span>
<span class="c1">;; ((a) a)</span>
<span class="p">(</span><span class="n">print-queue</span><span class="w"> </span><span class="n">q1</span><span class="p">)(</span><span class="nb">newline</span><span class="p">)</span>
<span class="c1">;; (a)</span>

<span class="p">(</span><span class="n">insert-queue!</span><span class="w"> </span><span class="n">q1</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">b</span><span class="p">)</span>
<span class="c1">;; ((a b) b)</span>
<span class="p">(</span><span class="n">print-queue</span><span class="w"> </span><span class="n">q1</span><span class="p">)(</span><span class="nb">newline</span><span class="p">)</span>
<span class="c1">;; (a )</span>

<span class="p">(</span><span class="n">delete-queue!</span><span class="w"> </span><span class="n">q1</span><span class="p">)</span>
<span class="c1">;; ((b) b)</span>
<span class="p">(</span><span class="n">print-queue</span><span class="w"> </span><span class="n">q1</span><span class="p">)(</span><span class="nb">newline</span><span class="p">)</span>
<span class="c1">;; (b)</span>

<span class="p">(</span><span class="n">delete-queue!</span><span class="w"> </span><span class="n">q1</span><span class="p">)</span>
<span class="c1">;; (() b)</span>
<span class="p">(</span><span class="n">print-queue</span><span class="w"> </span><span class="n">q1</span><span class="p">)(</span><span class="nb">newline</span><span class="p">)</span>
<span class="c1">;; ()</span>
</pre></div>
<div class="code-output">
<span>Output:</span>
<pre>((a) a)
(a)

((a b) b)
(a b)

((b) b)
(b)

(() b)
()

</pre>
</div>
</div>


#### Exercise 3.22

Instead of representing a queue
as a pair of pointers, we can build a queue as a procedure with local state.
The local state will consist of pointers to the beginning and the end of an
ordinary list.  Thus, the `make-queue` procedure will have the form

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-queue</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">front-ptr</span><span class="w"> </span><span class="n">…</span><span class="w"> </span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="n">rear-ptr</span><span class="w"> </span><span class="n">…</span><span class="w"> </span><span class="p">))</span>
<span class="w">    </span><span class="n">⟨@var</span><span class="p">{</span><span class="n">definitions</span><span class="w"> </span><span class="n">of</span><span class="w"> </span><span class="n">internal</span><span class="w"> </span><span class="n">procedures</span><span class="p">}</span><span class="n">⟩</span>
<span class="w">    </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">dispatch</span><span class="w"> </span><span class="n">m</span><span class="p">)</span><span class="w"> </span><span class="n">…</span><span class="p">)</span>
<span class="w">    </span><span class="n">dispatch</span><span class="p">))</span>
</pre></div>

Complete the definition of `make-queue` and provide implementations of the
queue operations using this representation.

##### Solution

<div class="code-box" markdown="1">
<div class="code-header"><a href="code/ex3-22.rkt">code/ex3-22.rkt</a></div>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-queue</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">front-ptr</span><span class="w"> </span><span class="o">&#39;</span><span class="p">())</span>
<span class="w">        </span><span class="p">(</span><span class="n">rear-ptr</span><span class="w"> </span><span class="o">&#39;</span><span class="p">()))</span>

<span class="w">    </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">set-front-ptr!</span><span class="w"> </span><span class="n">item</span><span class="p">)</span><span class="w"> </span>
<span class="w">      </span><span class="p">(</span><span class="k">set!</span><span class="w"> </span><span class="n">front-ptr</span><span class="w"> </span><span class="n">item</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">set-rear-ptr!</span><span class="w"> </span><span class="n">item</span><span class="p">)</span><span class="w"> </span>
<span class="w">      </span><span class="p">(</span><span class="k">set!</span><span class="w"> </span><span class="n">rear-ptr</span><span class="w"> </span><span class="n">item</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">empty-queue?</span><span class="p">)</span><span class="w"> </span>
<span class="w">      </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="n">front-ptr</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">front-queue</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">empty-queue?</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;FRONT called with an</span>
<span class="s2">               empty queue&quot;</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">front-ptr</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">insert-queue!</span><span class="w"> </span><span class="n">item</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">new-pair</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">item</span><span class="w"> </span><span class="o">&#39;</span><span class="p">())))</span>
<span class="w">        </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="n">empty-queue?</span><span class="p">)</span>
<span class="w">               </span><span class="p">(</span><span class="n">set-front-ptr!</span><span class="w"> </span><span class="n">new-pair</span><span class="p">)</span>
<span class="w">               </span><span class="p">(</span><span class="n">set-rear-ptr!</span><span class="w"> </span><span class="n">new-pair</span><span class="p">)</span>
<span class="w">               </span><span class="n">dispatch</span><span class="p">)</span><span class="w"> </span><span class="c1">;; Instead of queue, we return dispatch</span>
<span class="w">                         </span><span class="c1">;; I&#39;m using this analogous to C++ &quot;this&quot; </span>
<span class="w">          </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="n">set-cdr!</span><span class="w"> </span><span class="n">rear-ptr</span><span class="w"> </span>
<span class="w">                          </span><span class="n">new-pair</span><span class="p">)</span>
<span class="w">                </span><span class="p">(</span><span class="n">set-rear-ptr!</span><span class="w"> </span><span class="n">new-pair</span><span class="p">)</span>
<span class="w">                </span><span class="n">dispatch</span><span class="p">))))</span>
<span class="w">    </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">delete-queue!</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="n">empty-queue?</span><span class="p">)</span>
<span class="w">             </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;DELETE! called with </span>
<span class="s2">                    an empty queue&quot;</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="n">set-front-ptr!</span><span class="w"> </span>
<span class="w">                            </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">front-ptr</span><span class="p">))))</span>
<span class="w">      </span><span class="n">dispatch</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">print-queue</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="n">front-ptr</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">dispatch</span><span class="w"> </span><span class="n">m</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">m</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">set-front-ptr!</span><span class="p">)</span><span class="w"> </span><span class="n">set-front-ptr!</span><span class="p">)</span>
<span class="w">            </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">m</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">set-rear-ptr!</span><span class="p">)</span><span class="w"> </span><span class="n">set-rear-ptr!</span><span class="p">)</span>
<span class="w">            </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">m</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">empty-queue?</span><span class="p">)</span><span class="w"> </span><span class="n">empty-queue?</span><span class="p">)</span>
<span class="w">            </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">m</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">front-queue</span><span class="p">)</span><span class="w"> </span><span class="n">front-queue</span><span class="p">)</span>
<span class="w">            </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">m</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">insert-queue!</span><span class="p">)</span><span class="w"> </span><span class="n">insert-queue!</span><span class="p">)</span>
<span class="w">            </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">m</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">delete-queue!</span><span class="p">)</span><span class="w"> </span><span class="n">delete-queue!</span><span class="p">)</span>
<span class="w">            </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">m</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">print-queue</span><span class="p">)</span><span class="w"> </span><span class="n">print-queue</span><span class="p">)</span>
<span class="w">            </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;DELETE! called with </span>
<span class="s2">                    an empty queue&quot;</span><span class="p">))))</span>
<span class="w">    </span><span class="n">dispatch</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">set-front-ptr!</span><span class="w"> </span><span class="n">q</span><span class="w"> </span><span class="n">item</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">((</span><span class="n">q</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">set-front-ptr!</span><span class="p">)</span><span class="w"> </span><span class="n">item</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">set-rear-ptr!</span><span class="w"> </span><span class="n">q</span><span class="w"> </span><span class="n">item</span><span class="p">)</span>
<span class="w">  </span><span class="p">((</span><span class="n">q</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">set-rear-ptr!</span><span class="p">)</span><span class="w"> </span><span class="n">item</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">empty-queue?</span><span class="w"> </span><span class="n">q</span><span class="p">)</span>
<span class="w">  </span><span class="p">((</span><span class="n">q</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">empty-queue?</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">front-queue</span><span class="w"> </span><span class="n">q</span><span class="p">)</span>
<span class="w">  </span><span class="p">((</span><span class="n">q</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">front-queue</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">insert-queue!</span><span class="w"> </span><span class="n">q</span><span class="w"> </span><span class="n">item</span><span class="p">)</span>
<span class="w">  </span><span class="p">((</span><span class="n">q</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">insert-queue!</span><span class="p">)</span><span class="w"> </span><span class="n">item</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">delete-queue!</span><span class="w"> </span><span class="n">q</span><span class="p">)</span>
<span class="w">  </span><span class="p">((</span><span class="n">q</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">delete-queue!</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">print-queue</span><span class="w"> </span><span class="n">q</span><span class="p">)</span>
<span class="w">  </span><span class="p">((</span><span class="n">q</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">print-queue</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">q1</span><span class="w"> </span><span class="p">(</span><span class="n">make-queue</span><span class="p">))</span>
<span class="p">(</span><span class="n">print-queue</span><span class="w"> </span><span class="p">(</span><span class="n">insert-queue!</span><span class="w"> </span><span class="n">q1</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">a</span><span class="p">))</span>
<span class="p">(</span><span class="n">print-queue</span><span class="w"> </span><span class="p">(</span><span class="n">insert-queue!</span><span class="w"> </span><span class="n">q1</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">b</span><span class="p">))</span>
<span class="p">(</span><span class="n">print-queue</span><span class="w"> </span><span class="p">(</span><span class="n">delete-queue!</span><span class="w"> </span><span class="n">q1</span><span class="p">))</span>
<span class="p">(</span><span class="n">print-queue</span><span class="w"> </span><span class="p">(</span><span class="n">delete-queue!</span><span class="w"> </span><span class="n">q1</span><span class="p">))</span>
</pre></div>
<div class="code-output">
<span>Output:</span>
<pre>(a)
(a b)
(b)
()
</pre>
</div>
</div>


#### Exercise 3.23

A deque (`double-ended queue`) is a sequence in which items can be inserted and deleted at either the
front or the rear.  Operations on deques are the constructor `make-deque`,
the predicate `empty-deque?`, selectors `front-deque` and
`rear-deque`, and mutators `front-insert-deque!`,
`rear-insert-deque!`, `front-delete-deque!`, 
`rear-delete-deque!`.  Show how to represent deques using pairs, and give
implementations of the operations.  
All operations should be accomplished in $\Theta(1)$ steps.

##### Solution

We have to roll our own doubly linked list, I'll have the list of the form:

<div class="codehilite"><pre><span></span><span class="o">&#39;</span><span class="p">((</span><span class="ss">el1</span><span class="w"> </span><span class="o">&#39;</span><span class="p">())</span><span class="w"> </span><span class="p">(</span><span class="ss">el2</span><span class="w"> </span><span class="ss">prevptr2</span><span class="p">)</span><span class="w"> </span><span class="ss">...</span><span class="w"> </span><span class="p">(</span><span class="ss">elN</span><span class="w"> </span><span class="ss">prevptrN</span><span class="p">))</span>
</pre></div>

We have to make sure that when we add an element on the end, prev-ptr
is updated appropriately, and when we delete an element from the beginning
the appropriate prev-ptr is set to `nil`.

<div class="code-box" markdown="1">
<div class="code-header"><a href="code/ex3-23.rkt">code/ex3-23.rkt</a></div>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">front-ptr</span><span class="w"> </span><span class="n">deque</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">deque</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">rear-ptr</span><span class="w"> </span><span class="n">deque</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">deque</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">set-front-ptr!</span><span class="w"> </span><span class="n">deque</span><span class="w"> </span><span class="n">item</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">set-car!</span><span class="w"> </span><span class="n">deque</span><span class="w"> </span><span class="n">item</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">set-rear-ptr!</span><span class="w"> </span><span class="n">deque</span><span class="w"> </span><span class="n">item</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">set-cdr!</span><span class="w"> </span><span class="n">deque</span><span class="w"> </span><span class="n">item</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">empty-deque?</span><span class="w"> </span><span class="n">deque</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="p">(</span><span class="n">front-ptr</span><span class="w"> </span><span class="n">deque</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-deque</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="o">&#39;</span><span class="p">()</span><span class="w"> </span><span class="o">&#39;</span><span class="p">()))</span>

<span class="c1">;; Gets the first value in the deque</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">front-deque</span><span class="w"> </span><span class="n">deque</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">empty-deque?</span><span class="w"> </span><span class="n">deque</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;FRONT called with an</span>
<span class="s2">              empty deque&quot;</span><span class="w"> </span><span class="n">deque</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="p">(</span><span class="n">front-ptr</span><span class="w"> </span><span class="n">deque</span><span class="p">))))</span>

<span class="c1">;; Gets the last value in the deque</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">rear-deque</span><span class="w"> </span><span class="n">deque</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">empty-deque?</span><span class="w"> </span><span class="n">deque</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;REAR called with an</span>
<span class="s2">              empty deque&quot;</span><span class="w"> </span><span class="n">deque</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="p">(</span><span class="n">rear-ptr</span><span class="w"> </span><span class="n">deque</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">rear-insert-deque!</span><span class="w"> </span><span class="n">deque</span><span class="w"> </span><span class="n">item</span><span class="p">)</span>
<span class="w">  </span><span class="c1">;;cf ((new-pair (cons item &#39;())))</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">new-pair</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="n">item</span><span class="w"> </span><span class="o">&#39;</span><span class="p">())</span><span class="w"> </span><span class="o">&#39;</span><span class="p">())))</span>
<span class="w">    </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="n">empty-deque?</span><span class="w"> </span><span class="n">deque</span><span class="p">)</span>
<span class="w">           </span><span class="p">(</span><span class="n">set-front-ptr!</span><span class="w"> </span><span class="n">deque</span><span class="w"> </span><span class="n">new-pair</span><span class="p">)</span>
<span class="w">           </span><span class="p">(</span><span class="n">set-rear-ptr!</span><span class="w"> </span><span class="n">deque</span><span class="w"> </span><span class="n">new-pair</span><span class="p">)</span>
<span class="w">           </span><span class="n">deque</span><span class="p">)</span>
<span class="w">          </span><span class="p">(</span><span class="k">else</span><span class="w"> </span>
<span class="w">              </span><span class="c1">;; 1. Update the new-pair&#39;s prev-ptr</span>
<span class="w">              </span><span class="p">(</span><span class="n">set-car!</span><span class="w"> </span><span class="p">(</span><span class="nb">cdar</span><span class="w"> </span><span class="n">new-pair</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">rear-ptr</span><span class="w"> </span><span class="n">deque</span><span class="p">))</span>
<span class="w">              </span><span class="c1">;; 2. Add it to the end of the list</span>
<span class="w">              </span><span class="p">(</span><span class="n">set-cdr!</span><span class="w"> </span><span class="p">(</span><span class="n">rear-ptr</span><span class="w"> </span><span class="n">deque</span><span class="p">)</span><span class="w"> </span><span class="n">new-pair</span><span class="p">)</span>
<span class="w">              </span><span class="c1">;; 3. Update rear-ptr.</span>
<span class="w">              </span><span class="p">(</span><span class="n">set-rear-ptr!</span><span class="w"> </span><span class="n">deque</span><span class="w"> </span><span class="n">new-pair</span><span class="p">)</span>
<span class="w">              </span><span class="n">deque</span><span class="p">))))</span>


<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">rear-delete-deque!</span><span class="w"> </span><span class="n">deque</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="n">empty-deque?</span><span class="w"> </span><span class="n">deque</span><span class="p">)</span>
<span class="w">         </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;REAR-DELETE! called with </span>
<span class="s2">                 an empty deque&quot;</span><span class="w"> </span><span class="n">deque</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span>
<span class="w">          </span><span class="c1">;; 1. Save the value of the prev-ptr</span>
<span class="w">          </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">prev-ptr</span><span class="w"> </span><span class="p">(</span><span class="nb">cadr</span><span class="w"> </span><span class="p">(</span><span class="n">rear-deque</span><span class="w"> </span><span class="n">deque</span><span class="p">))))</span>
<span class="w">            </span><span class="c1">;; 2. If the prev ptr is null, set the queue to null</span>
<span class="w">            </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="n">prev-ptr</span><span class="p">)</span><span class="w"> </span>
<span class="w">              </span><span class="p">(</span><span class="k">begin</span><span class="w"> </span>
<span class="w">                </span><span class="p">(</span><span class="n">set-front-ptr!</span><span class="w"> </span><span class="n">deque</span><span class="w"> </span><span class="o">&#39;</span><span class="p">())</span>
<span class="w">                </span><span class="p">(</span><span class="n">set-rear-ptr!</span><span class="w"> </span><span class="n">deque</span><span class="w"> </span><span class="o">&#39;</span><span class="p">()))</span>
<span class="w">              </span><span class="c1">;; 3. Else, chop the list off and move</span>
<span class="w">              </span><span class="c1">;; rear-ptr back one.</span>
<span class="w">              </span><span class="p">(</span><span class="k">begin</span>
<span class="w">                </span><span class="p">(</span><span class="n">set-cdr!</span><span class="w"> </span><span class="n">prev-ptr</span><span class="w"> </span><span class="o">&#39;</span><span class="p">())</span>
<span class="w">                </span><span class="p">(</span><span class="n">set-rear-ptr!</span><span class="w"> </span><span class="n">deque</span><span class="w"> </span><span class="n">prev-ptr</span><span class="p">)))</span>
<span class="w">            </span><span class="n">deque</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">front-insert-deque!</span><span class="w"> </span><span class="n">deque</span><span class="w"> </span><span class="n">item</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">new-pair</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="n">item</span><span class="w"> </span><span class="o">&#39;</span><span class="p">())</span><span class="w"> </span><span class="p">(</span><span class="n">front-ptr</span><span class="w"> </span><span class="n">deque</span><span class="p">))))</span>
<span class="w">    </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="n">empty-deque?</span><span class="w"> </span><span class="n">deque</span><span class="p">)</span>
<span class="w">           </span><span class="p">(</span><span class="n">set-front-ptr!</span><span class="w"> </span><span class="n">deque</span><span class="w"> </span><span class="n">new-pair</span><span class="p">)</span>
<span class="w">           </span><span class="p">(</span><span class="n">set-rear-ptr!</span><span class="w"> </span><span class="n">deque</span><span class="w"> </span><span class="n">new-pair</span><span class="p">)</span>
<span class="w">           </span><span class="n">deque</span><span class="p">)</span>
<span class="w">          </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="n">set-front-ptr!</span><span class="w"> </span><span class="n">deque</span><span class="w"> </span><span class="n">new-pair</span><span class="p">)</span>
<span class="w">                </span><span class="n">deque</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">front-delete-deque!</span><span class="w"> </span><span class="n">deque</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="n">empty-deque?</span><span class="w"> </span><span class="n">deque</span><span class="p">)</span>
<span class="w">         </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;DELETE! called with </span>
<span class="s2">                 an empty deque&quot;</span><span class="w"> </span><span class="n">deque</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="n">set-front-ptr!</span><span class="w"> </span><span class="n">deque</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="p">(</span><span class="n">front-ptr</span><span class="w"> </span><span class="n">deque</span><span class="p">)))</span>
<span class="w">              </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="p">(</span><span class="n">front-ptr</span><span class="w"> </span><span class="n">deque</span><span class="p">)))</span>
<span class="w">                </span><span class="c1">;; Update the first element&#39;s prev-ptr to null</span>
<span class="w">                </span><span class="p">(</span><span class="n">set-car!</span><span class="w"> </span><span class="p">(</span><span class="nb">cdar</span><span class="w"> </span><span class="p">(</span><span class="n">front-ptr</span><span class="w"> </span><span class="n">deque</span><span class="p">))</span><span class="w"> </span><span class="o">&#39;</span><span class="p">()))</span>
<span class="w">              </span><span class="n">deque</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">print-deque</span><span class="w"> </span><span class="n">deque</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">print-deque-inner</span><span class="w"> </span><span class="n">lst</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">null?</span><span class="w"> </span><span class="n">lst</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;)&quot;</span><span class="p">))</span>
<span class="w">          </span><span class="p">((</span><span class="nb">null?</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">lst</span><span class="p">))</span>
<span class="w">            </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="p">(</span><span class="nb">caar</span><span class="w"> </span><span class="n">lst</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;)&quot;</span><span class="p">))</span>
<span class="w">          </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="p">(</span><span class="nb">caar</span><span class="w"> </span><span class="n">lst</span><span class="p">))</span><span class="w"> </span>
<span class="w">             </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot; &quot;</span><span class="p">)</span>
<span class="w">             </span><span class="p">(</span><span class="n">print-deque-inner</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">lst</span><span class="p">)))))</span>
<span class="w">  </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;(&quot;</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">print-deque-inner</span><span class="w"> </span><span class="p">(</span><span class="n">front-ptr</span><span class="w"> </span><span class="n">deque</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">q1</span><span class="w"> </span><span class="p">(</span><span class="n">make-deque</span><span class="p">))</span>

<span class="p">(</span><span class="n">print-deque</span><span class="w"> </span><span class="p">(</span><span class="n">rear-insert-deque!</span><span class="w"> </span><span class="n">q1</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">c</span><span class="p">))</span>
<span class="p">(</span><span class="n">print-deque</span><span class="w"> </span><span class="p">(</span><span class="n">rear-insert-deque!</span><span class="w"> </span><span class="n">q1</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">d</span><span class="p">))</span>
<span class="p">(</span><span class="n">print-deque</span><span class="w"> </span><span class="p">(</span><span class="n">rear-insert-deque!</span><span class="w"> </span><span class="n">q1</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">e</span><span class="p">))</span>
<span class="p">(</span><span class="n">print-deque</span><span class="w"> </span><span class="p">(</span><span class="n">front-delete-deque!</span><span class="w"> </span><span class="n">q1</span><span class="p">))</span>
<span class="p">(</span><span class="n">print-deque</span><span class="w"> </span><span class="p">(</span><span class="n">front-insert-deque!</span><span class="w"> </span><span class="n">q1</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">b</span><span class="p">))</span>
<span class="p">(</span><span class="n">print-deque</span><span class="w"> </span><span class="p">(</span><span class="n">front-insert-deque!</span><span class="w"> </span><span class="n">q1</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">a</span><span class="p">))</span>
<span class="p">(</span><span class="n">print-deque</span><span class="w"> </span><span class="p">(</span><span class="n">rear-delete-deque!</span><span class="w"> </span><span class="n">q1</span><span class="p">))</span>
<span class="p">(</span><span class="n">print-deque</span><span class="w"> </span><span class="p">(</span><span class="n">rear-insert-deque!</span><span class="w"> </span><span class="n">q1</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">f</span><span class="p">))</span>
<span class="p">(</span><span class="n">print-deque</span><span class="w"> </span><span class="p">(</span><span class="n">rear-delete-deque!</span><span class="w"> </span><span class="n">q1</span><span class="p">))</span>
<span class="p">(</span><span class="n">print-deque</span><span class="w"> </span><span class="p">(</span><span class="n">front-delete-deque!</span><span class="w"> </span><span class="n">q1</span><span class="p">))</span>
<span class="p">(</span><span class="n">print-deque</span><span class="w"> </span><span class="p">(</span><span class="n">front-delete-deque!</span><span class="w"> </span><span class="n">q1</span><span class="p">))</span>
<span class="p">(</span><span class="n">print-deque</span><span class="w"> </span><span class="p">(</span><span class="n">rear-delete-deque!</span><span class="w"> </span><span class="n">q1</span><span class="p">))</span>
</pre></div>
<div class="code-output">
<span>Output:</span>
<pre>(c)
(c d)
(c d e)
(d e)
(b d e)
(a b d e)
(a b d)
(a b d f)
(a b d)
(b d)
(d)
()
</pre>
</div>
</div>


#### Exercise 3.24

In the table implementations
above, the keys are tested for equality using `equal?` (called by
`assoc`).  This is not always the appropriate test.  For instance, we
might have a table with numeric keys in which we don't need an exact match to
the number we're looking up, but only a number within some tolerance of it.
Design a table constructor `make-table` that takes as an argument a
`same-key?` procedure that will be used to test "equality" of keys.
`Make-table` should return a `dispatch` procedure that can be used to
access appropriate `lookup` and `insert!` procedures for a local
table.

##### Solution

<div class="code-box" markdown="1">
<div class="code-header"><a href="code/ex3-24.rkt">code/ex3-24.rkt</a></div>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">lookup</span><span class="w"> </span><span class="n">key</span><span class="w"> </span><span class="n">table</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">record</span><span class="w"> </span><span class="p">(</span><span class="nb">assoc</span><span class="w"> </span><span class="n">key</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">table</span><span class="p">))))</span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="n">record</span>
<span class="w">        </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">record</span><span class="p">)</span>
<span class="w">        </span><span class="k">false</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">assoc</span><span class="w"> </span><span class="n">key</span><span class="w"> </span><span class="n">records</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">null?</span><span class="w"> </span><span class="n">records</span><span class="p">)</span><span class="w"> </span><span class="k">false</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="nb">equal?</span><span class="w"> </span><span class="n">key</span><span class="w"> </span><span class="p">(</span><span class="nb">caar</span><span class="w"> </span><span class="n">records</span><span class="p">))</span>
<span class="w">         </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">records</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">assoc</span><span class="w"> </span><span class="n">key</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">records</span><span class="p">)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">assoc-custom</span><span class="w"> </span><span class="n">same-key?</span><span class="w"> </span><span class="n">key</span><span class="w"> </span><span class="n">records</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">null?</span><span class="w"> </span><span class="n">records</span><span class="p">)</span><span class="w"> </span><span class="k">false</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="n">same-key?</span><span class="w"> </span><span class="n">key</span><span class="w"> </span><span class="p">(</span><span class="nb">caar</span><span class="w"> </span><span class="n">records</span><span class="p">))</span>
<span class="w">         </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">records</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="n">assoc-custom</span><span class="w"> </span><span class="n">same-key?</span><span class="w"> </span><span class="n">key</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">records</span><span class="p">)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-table</span><span class="w"> </span><span class="n">same-key?</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">local-table</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">*table*</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">lookup</span><span class="w"> </span><span class="n">key-1</span><span class="w"> </span><span class="n">key-2</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">subtable</span>
<span class="w">             </span><span class="p">(</span><span class="n">assoc-custom</span><span class="w"> </span><span class="n">same-key?</span><span class="w"> </span><span class="n">key-1</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">local-table</span><span class="p">))))</span>
<span class="w">        </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="n">subtable</span>
<span class="w">            </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">record</span>
<span class="w">                   </span><span class="p">(</span><span class="n">assoc-custom</span><span class="w"> </span><span class="n">same-key?</span><span class="w"> </span><span class="n">key-2</span>
<span class="w">                          </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">subtable</span><span class="p">))))</span>
<span class="w">              </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="n">record</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">record</span><span class="p">)</span><span class="w"> </span><span class="k">false</span><span class="p">))</span>
<span class="w">            </span><span class="k">false</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">insert!</span><span class="w"> </span><span class="n">key-1</span><span class="w"> </span><span class="n">key-2</span><span class="w"> </span><span class="n">value</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">subtable</span>
<span class="w">             </span><span class="p">(</span><span class="n">assoc-custom</span><span class="w"> </span><span class="n">same-key?</span><span class="w"> </span><span class="n">key-1</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">local-table</span><span class="p">))))</span>
<span class="w">        </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="n">subtable</span>
<span class="w">            </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">record</span>
<span class="w">                   </span><span class="p">(</span><span class="n">assoc-custom</span><span class="w"> </span><span class="n">same-key?</span><span class="w"> </span><span class="n">key-2</span>
<span class="w">                          </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">subtable</span><span class="p">))))</span>
<span class="w">              </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="n">record</span>
<span class="w">                  </span><span class="p">(</span><span class="n">set-cdr!</span><span class="w"> </span><span class="n">record</span><span class="w"> </span><span class="n">value</span><span class="p">)</span>
<span class="w">                  </span><span class="p">(</span><span class="n">set-cdr!</span>
<span class="w">                   </span><span class="n">subtable</span>
<span class="w">                   </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">key-2</span><span class="w"> </span><span class="n">value</span><span class="p">)</span>
<span class="w">                         </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">subtable</span><span class="p">)))))</span>
<span class="w">            </span><span class="p">(</span><span class="n">set-cdr!</span>
<span class="w">             </span><span class="n">local-table</span>
<span class="w">             </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="n">key-1</span>
<span class="w">                         </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">key-2</span><span class="w"> </span><span class="n">value</span><span class="p">))</span>
<span class="w">                   </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">local-table</span><span class="p">)))))</span>
<span class="w">      </span><span class="o">&#39;</span><span class="ss">ok</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">dispatch</span><span class="w"> </span><span class="n">m</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">m</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">lookup-proc</span><span class="p">)</span><span class="w"> </span><span class="n">lookup</span><span class="p">)</span>
<span class="w">            </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">m</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">insert-proc!</span><span class="p">)</span><span class="w"> </span><span class="n">insert!</span><span class="p">)</span>
<span class="w">            </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;Unknown operation:</span>
<span class="s2">                          TABLE&quot;</span><span class="w"> </span><span class="n">m</span><span class="p">))))</span>
<span class="w">    </span><span class="n">dispatch</span><span class="p">))</span>


<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">fuzzy-equals?</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">&lt;</span><span class="w"> </span><span class="p">(</span><span class="nb">abs</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">b</span><span class="w"> </span><span class="n">a</span><span class="p">))</span><span class="w"> </span><span class="mf">0.05</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">operation-table</span><span class="w"> </span><span class="p">(</span><span class="n">make-table</span><span class="w"> </span><span class="n">fuzzy-equals?</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">get</span><span class="w"> </span><span class="p">(</span><span class="n">operation-table</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">lookup-proc</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">put</span><span class="w"> </span><span class="p">(</span><span class="n">operation-table</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">insert-proc!</span><span class="p">))</span>

<span class="p">(</span><span class="n">put</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mf">0.1</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">a</span><span class="p">)</span>
<span class="p">(</span><span class="n">put</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mf">0.3</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">b</span><span class="p">)</span>
<span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="p">(</span><span class="n">get</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mf">0.13</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="p">(</span><span class="n">get</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mf">0.2</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="p">(</span><span class="n">get</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mf">0.26</span><span class="p">))</span>
</pre></div>
<div class="code-output">
<span>Output:</span>
<pre>ok
ok
a
#f
b</pre>
</div>
</div>


#### Exercise 3.25

Generalizing one- and
two-dimensional tables, show how to implement a table in which values are
stored under an arbitrary number of keys and different values may be stored
under different numbers of keys.  The `lookup` and `insert!`
procedures should take as input a list of keys used to access the table.

##### Solution

I took the easy way out, and just used lists as keys instead of nested tables.
This could have some performance implications if we don't apply the 
binary search from exercise 3-26.

<div class="code-box" markdown="1">
<div class="code-header"><a href="code/ex3-25.rkt">code/ex3-25.rkt</a></div>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">assoc</span><span class="w"> </span><span class="n">key</span><span class="w"> </span><span class="n">records</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">null?</span><span class="w"> </span><span class="n">records</span><span class="p">)</span><span class="w"> </span><span class="k">false</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="nb">equal?</span><span class="w"> </span><span class="n">key</span><span class="w"> </span><span class="p">(</span><span class="nb">caar</span><span class="w"> </span><span class="n">records</span><span class="p">))</span>
<span class="w">         </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">records</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">assoc</span><span class="w"> </span><span class="n">key</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">records</span><span class="p">)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-table</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">local-table</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">*table*</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">lookup</span><span class="w"> </span><span class="o">.</span><span class="w"> </span><span class="n">keys</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">record</span>
<span class="w">             </span><span class="p">(</span><span class="nb">assoc</span><span class="w"> </span><span class="n">keys</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">local-table</span><span class="p">))))</span>
<span class="w">        </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="n">record</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">record</span><span class="p">)</span><span class="w"> </span><span class="k">false</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">insert!</span><span class="w"> </span><span class="n">value</span><span class="w"> </span><span class="o">.</span><span class="w"> </span><span class="n">keys</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">record</span>
<span class="w">             </span><span class="p">(</span><span class="nb">assoc</span><span class="w"> </span><span class="n">keys</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">local-table</span><span class="p">))))</span>
<span class="w">        </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="n">record</span>
<span class="w">            </span><span class="p">(</span><span class="n">set-cdr!</span><span class="w"> </span><span class="n">record</span><span class="w"> </span><span class="n">value</span><span class="p">)</span>
<span class="w">            </span><span class="p">(</span><span class="n">set-cdr!</span>
<span class="w">             </span><span class="n">local-table</span>
<span class="w">             </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">keys</span><span class="w"> </span><span class="n">value</span><span class="p">)</span>
<span class="w">                   </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">local-table</span><span class="p">)))))</span>
<span class="w">      </span><span class="o">&#39;</span><span class="ss">ok</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">dispatch</span><span class="w"> </span><span class="n">m</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">m</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">lookup-proc</span><span class="p">)</span><span class="w"> </span><span class="n">lookup</span><span class="p">)</span>
<span class="w">            </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">m</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">insert-proc!</span><span class="p">)</span><span class="w"> </span><span class="n">insert!</span><span class="p">)</span>
<span class="w">            </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;Unknown operation:</span>
<span class="s2">                          TABLE&quot;</span><span class="w"> </span><span class="n">m</span><span class="p">))))</span>
<span class="w">    </span><span class="n">dispatch</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">operation-table</span><span class="w"> </span><span class="p">(</span><span class="n">make-table</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">get</span><span class="w"> </span><span class="p">(</span><span class="n">operation-table</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">lookup-proc</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">put</span><span class="w"> </span><span class="p">(</span><span class="n">operation-table</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">insert-proc!</span><span class="p">))</span>

<span class="p">(</span><span class="n">put</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">a</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">b</span><span class="p">)</span>
<span class="p">(</span><span class="n">put</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">c</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">b</span><span class="p">)</span>
<span class="p">(</span><span class="n">put</span><span class="w"> </span><span class="mi">3</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">c</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">b</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">d</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">e</span><span class="p">)</span>
<span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="p">(</span><span class="n">get</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">a</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">b</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="p">(</span><span class="n">get</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">c</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">b</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="p">(</span><span class="n">get</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">c</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">b</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">d</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">e</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
</pre></div>
<div class="code-output">
<span>Output:</span>
<pre>ok
ok
ok
1
2
3
</pre>
</div>
</div>


#### Exercise 3.26

To search a table as implemented
above, one needs to scan through the list of records.  This is basically the
unordered list representation of 2.3.3.  For large tables, it may
be more efficient to structure the table in a different manner.  Describe a
table implementation where the (key, value) records are organized using a
binary tree, assuming that keys can be ordered in some way (e.g., numerically
or alphabetically).  (Compare Exercise 2.66 of Chapter 2.)

##### Solution

This is a straightforward application of the binary trees we developed in chapter 2. There, the lookup pseudocode for [problem 2.66](../ch2/notes-ch2-3.html#exercise-266) was...

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">lookup</span><span class="w"> </span><span class="n">given-key</span><span class="w"> </span><span class="n">records</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">null?</span><span class="w"> </span><span class="n">records</span><span class="p">)</span><span class="w"> </span><span class="k">false</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="nb">=</span><span class="w"> </span><span class="n">given-key</span><span class="w"> </span><span class="p">(</span><span class="n">key</span><span class="w"> </span><span class="p">(</span><span class="n">entry</span><span class="w"> </span><span class="n">records</span><span class="p">)))</span><span class="w"> </span><span class="p">(</span><span class="n">entry</span><span class="w"> </span><span class="n">record</span><span class="p">))</span>
<span class="w">        </span><span class="p">((</span><span class="nb">&lt;</span><span class="w"> </span><span class="n">given-key</span><span class="w"> </span><span class="p">(</span><span class="n">key</span><span class="w"> </span><span class="p">(</span><span class="n">entry</span><span class="w"> </span><span class="n">records</span><span class="p">)))</span>
<span class="w">         </span><span class="p">(</span><span class="n">lookup</span><span class="w"> </span><span class="n">given-key</span><span class="w"> </span><span class="p">(</span><span class="n">left-branch</span><span class="w"> </span><span class="n">records</span><span class="p">)))</span>
<span class="w">        </span><span class="p">((</span><span class="nb">&gt;</span><span class="w"> </span><span class="n">given-key</span><span class="w"> </span><span class="p">(</span><span class="n">key</span><span class="w"> </span><span class="p">(</span><span class="n">entry</span><span class="w"> </span><span class="n">records</span><span class="p">)))</span>
<span class="w">         </span><span class="p">(</span><span class="n">lookup</span><span class="w"> </span><span class="n">given-key</span><span class="w"> </span><span class="p">(</span><span class="n">key</span><span class="w"> </span><span class="p">(</span><span class="n">right-branch</span><span class="w"> </span><span class="n">records</span><span class="p">))))))</span>
</pre></div>

To get this to actually work we need an ordering on keys.
In Racket this can be done using `string<?` and `symbol->string`, 
I'm not sure if there's a better way. However, for example,
we used this to define a lexicographic ordering on 
monomials in [problem 2.92](../ch2/notes-ch2-5.html#exercise-292)


#### Exercise 3.27

Memoization (also
called tabulation) is a technique that enables a procedure to record,
in a local table, values that have previously been computed.  This technique
can make a vast difference in the performance of a program.  A memoized
procedure maintains a table in which values of previous calls are stored using
as keys the arguments that produced the values.  When the memoized procedure is
asked to compute a value, it first checks the table to see if the value is
already there and, if so, just returns that value.  Otherwise, it computes the
new value in the ordinary way and stores this in the table.  As an example of
memoization, recall from 1.2.2 the exponential process for
computing Fibonacci numbers:

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">fib</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">=</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="nb">=</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="p">(</span><span class="n">fib</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">))</span>
<span class="w">                 </span><span class="p">(</span><span class="n">fib</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">2</span><span class="p">))))))</span>
</pre></div>

The memoized version of the same procedure is

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">memo-fib</span>
<span class="w">  </span><span class="p">(</span><span class="n">memoize</span><span class="w"> </span>
<span class="w">   </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">n</span><span class="p">)</span>
<span class="w">     </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">=</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span>
<span class="w">           </span><span class="p">((</span><span class="nb">=</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span>
<span class="w">           </span><span class="p">(</span><span class="k">else</span><span class="w"> </span>
<span class="w">            </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="p">(</span><span class="n">memo-fib</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">))</span>
<span class="w">               </span><span class="p">(</span><span class="n">memo-fib</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">2</span><span class="p">))))))))</span>
</pre></div>


where the memoizer is defined as

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">memoize</span><span class="w"> </span><span class="n">f</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">table</span><span class="w"> </span><span class="p">(</span><span class="n">make-table</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">previously-computed-result</span><span class="w"> </span>
<span class="w">             </span><span class="p">(</span><span class="n">lookup</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">table</span><span class="p">)))</span>
<span class="w">        </span><span class="p">(</span><span class="k">or</span><span class="w"> </span><span class="n">previously-computed-result</span>
<span class="w">            </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">result</span><span class="w"> </span><span class="p">(</span><span class="n">f</span><span class="w"> </span><span class="n">x</span><span class="p">)))</span>
<span class="w">              </span><span class="p">(</span><span class="n">insert!</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">result</span><span class="w"> </span><span class="n">table</span><span class="p">)</span>
<span class="w">              </span><span class="n">result</span><span class="p">))))))</span>
</pre></div>

Draw an environment diagram to analyze the computation of `(memo-fib 3)`.
Explain why `memo-fib` computes the $n^{\text{th}}$ Fibonacci number in a number
of steps proportional to $n$.  Would the scheme still work if we had simply
defined `memo-fib` to be `(memoize fib)`?

##### Solution

<div class="code-box" markdown="1">
<div class="code-header"><a href="code/ex3-27.rkt">code/ex3-27.rkt</a></div>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">lookup</span><span class="w"> </span><span class="n">key</span><span class="w"> </span><span class="n">table</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">record</span><span class="w"> </span><span class="p">(</span><span class="nb">assoc</span><span class="w"> </span><span class="n">key</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">table</span><span class="p">))))</span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="n">record</span>
<span class="w">        </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">record</span><span class="p">)</span>
<span class="w">        </span><span class="k">false</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">assoc</span><span class="w"> </span><span class="n">key</span><span class="w"> </span><span class="n">records</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">null?</span><span class="w"> </span><span class="n">records</span><span class="p">)</span><span class="w"> </span><span class="k">false</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="nb">equal?</span><span class="w"> </span><span class="n">key</span><span class="w"> </span><span class="p">(</span><span class="nb">caar</span><span class="w"> </span><span class="n">records</span><span class="p">))</span><span class="w"> </span>
<span class="w">         </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">records</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">assoc</span><span class="w"> </span><span class="n">key</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">records</span><span class="p">)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">insert!</span><span class="w"> </span><span class="n">key</span><span class="w"> </span><span class="n">value</span><span class="w"> </span><span class="n">table</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">record</span><span class="w"> </span><span class="p">(</span><span class="nb">assoc</span><span class="w"> </span><span class="n">key</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">table</span><span class="p">))))</span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="n">record</span>
<span class="w">        </span><span class="p">(</span><span class="n">set-cdr!</span><span class="w"> </span><span class="n">record</span><span class="w"> </span><span class="n">value</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="n">set-cdr!</span><span class="w"> </span><span class="n">table</span>
<span class="w">                  </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">key</span><span class="w"> </span><span class="n">value</span><span class="p">)</span>
<span class="w">                        </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">table</span><span class="p">)))))</span>
<span class="w">  </span><span class="o">&#39;</span><span class="ss">ok</span><span class="p">)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-table</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">*table*</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">memoize</span><span class="w"> </span><span class="n">f</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">table</span><span class="w"> </span><span class="p">(</span><span class="n">make-table</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">previously-computed-result</span>
<span class="w">             </span><span class="p">(</span><span class="n">lookup</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">table</span><span class="p">)))</span>
<span class="w">        </span><span class="p">(</span><span class="k">or</span><span class="w"> </span><span class="n">previously-computed-result</span>
<span class="w">            </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">result</span><span class="w"> </span><span class="p">(</span><span class="n">f</span><span class="w"> </span><span class="n">x</span><span class="p">)))</span>
<span class="w">              </span><span class="p">(</span><span class="n">insert!</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">result</span><span class="w"> </span><span class="n">table</span><span class="p">)</span>
<span class="w">              </span><span class="n">result</span><span class="p">))))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">memo-fib</span>
<span class="w">  </span><span class="p">(</span><span class="n">memoize</span><span class="w"> </span>
<span class="w">   </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">n</span><span class="p">)</span>
<span class="w">     </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">=</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span>
<span class="w">           </span><span class="p">((</span><span class="nb">=</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span>
<span class="w">           </span><span class="p">(</span><span class="k">else</span><span class="w"> </span>
<span class="w">            </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="p">(</span><span class="n">memo-fib</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">))</span>
<span class="w">               </span><span class="p">(</span><span class="n">memo-fib</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">2</span><span class="p">))))))))</span>

<span class="p">(</span><span class="n">memo-fib</span><span class="w"> </span><span class="mi">10</span><span class="p">)</span>
</pre></div>
<div class="code-output">
<span>Output:</span>
<pre>55
</pre>
</div>
</div>


<div style="text-align: center; margin: 20px 0;">
  <img src="img/ex3-27.svg" style="width: 70%; max-width: 800px;" alt="A box-and-pointer diagram, what do you want?">
</div>

`memo-fib` computes each value at most once, and after this value is cached
it will simply be looked up the next time. 

I don't go into detail about all of the little environments created after
evaluating fib n, but you can find a good diagram here:

[https://github.com/kana/sicp/blob/master/ex-3.27.md](https://github.com/kana/sicp/blob/master/ex-3.27.md)

#### Exercise 3.28

Define an or-gate as a primitive
function box.  Your `or-gate` constructor should be similar to
`and-gate`.

##### Solution


<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">binary?</span><span class="w"> </span><span class="n">a</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">or</span><span class="w"> </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="mi">0</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">logical-or</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="k">or</span><span class="w"> </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="n">b</span><span class="w"> </span><span class="mi">1</span><span class="p">))</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="n">binary?</span><span class="w"> </span><span class="n">a</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">binary?</span><span class="w"> </span><span class="n">b</span><span class="p">))</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;Invalid signal&quot;</span><span class="w"> </span><span class="n">s</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">or-gate</span><span class="w"> </span><span class="n">a1</span><span class="w"> </span><span class="n">a2</span><span class="w"> </span><span class="n">output</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">or-action-procedure</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">new-value</span>
<span class="w">           </span><span class="p">(</span><span class="n">logical-or</span><span class="w"> </span><span class="p">(</span><span class="n">get-signal</span><span class="w"> </span><span class="n">a1</span><span class="p">)</span>
<span class="w">                       </span><span class="p">(</span><span class="n">get-signal</span><span class="w"> </span><span class="n">a2</span><span class="p">))))</span>
<span class="w">      </span><span class="p">(</span><span class="n">after-delay</span>
<span class="w">       </span><span class="n">or-gate-delay</span>
<span class="w">       </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">()</span>
<span class="w">         </span><span class="p">(</span><span class="n">set-signal!</span><span class="w"> </span><span class="n">output</span><span class="w"> </span><span class="n">new-value</span><span class="p">)))))</span>
<span class="w">  </span><span class="p">(</span><span class="n">add-action!</span><span class="w"> </span><span class="n">a1</span><span class="w"> </span><span class="n">or-action-procedure</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">add-action!</span><span class="w"> </span><span class="n">a2</span><span class="w"> </span><span class="n">or-action-procedure</span><span class="p">)</span>
<span class="w">  </span><span class="o">&#39;</span><span class="ss">ok</span><span class="p">)</span>
</pre></div>

#### Exercise 3.29

Another way to construct an
or-gate is as a compound digital logic device, built from and-gates and
inverters.  Define a procedure `or-gate` that accomplishes this.  What is
the delay time of the or-gate in terms of `and-gate-delay` and
`inverter-delay`?

##### Solution

We use De Morgan's law that `(or a b)` is equivalent to 
`(not (and (not a) (not b)))`.

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">or-gate2</span><span class="w"> </span><span class="n">a1</span><span class="w"> </span><span class="n">a2</span><span class="w"> </span><span class="n">output</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">a1inv</span><span class="w"> </span><span class="p">(</span><span class="n">make-wire</span><span class="p">))</span><span class="w"> </span>
<span class="w">        </span><span class="p">(</span><span class="n">a2inv</span><span class="w"> </span><span class="p">(</span><span class="n">make-wire</span><span class="p">))</span><span class="w"> </span>
<span class="w">        </span><span class="p">(</span><span class="n">outputinv</span><span class="w"> </span><span class="p">(</span><span class="n">make-wire</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">inverter</span><span class="w"> </span><span class="n">a1</span><span class="w"> </span><span class="n">a1inv</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">inverter</span><span class="w"> </span><span class="n">a2</span><span class="w"> </span><span class="n">a2inv</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">and-gate</span><span class="w"> </span><span class="n">a1inv</span><span class="w"> </span><span class="n">a2inv</span><span class="w"> </span><span class="n">outputinv</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">inverter</span><span class="w"> </span><span class="n">outputinv</span><span class="w"> </span><span class="n">output</span><span class="p">)</span>
<span class="w">    </span><span class="o">&#39;</span><span class="ss">ok</span><span class="p">))</span>
</pre></div>

The total delay is 

$$2\times\textrm{inverter-delay} + \textrm{and-gate-delay}$$

#### Exercise 3.30

Figure 3.27 shows a
ripple-carry adder formed by stringing together $n$ full-adders.
This is the simplest form of parallel adder for adding two $n$-bit binary
numbers.  The inputs $A_1, A_2, A_3, \ldots, A_n$ and 
$B_1, B_2, B_3, \ldots, B_n$
are the two binary numbers to be added (each $A_k$ and
$B_k$ is `a 0` or `a 1`). The circuit generates $S_1, S_2, 
S_3, \ldots, S_n$,
the $n$ bits of the sum, and $C$, the carry from the addition.  Write a
procedure `ripple-carry-adder` that generates this circuit.  The procedure
should take as arguments three lists of $n$ wires each---the $A_k$, the
$B_k$, and the $S_k$---and also another wire $C$.  The major drawback of the
ripple-carry adder is the need to wait for the carry signals to propagate.
What is the delay needed to obtain the complete output from an $n$-bit
ripple-carry adder, expressed in terms of the delays for and-gates, or-gates,
and inverters?

##### Solution

My solution is:
<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">ripple-carry</span><span class="w"> </span><span class="n">A</span><span class="w"> </span><span class="n">B</span><span class="w"> </span><span class="n">S</span><span class="w"> </span><span class="n">c</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">ripple-carry-inner</span><span class="w"> </span><span class="n">A</span><span class="w"> </span><span class="n">B</span><span class="w"> </span><span class="n">S</span><span class="w"> </span><span class="n">c-out</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="n">A</span><span class="p">)</span><span class="w"> </span>
<span class="w">      </span><span class="o">&#39;</span><span class="ss">ok</span>
<span class="w">      </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">c-in</span><span class="w"> </span><span class="p">(</span><span class="n">make-wire</span><span class="p">)))</span>
<span class="w">        </span><span class="p">(</span><span class="n">full-adder</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">A</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">B</span><span class="p">)</span><span class="w"> </span><span class="n">c-in</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">S</span><span class="p">)</span><span class="w"> </span><span class="n">c-out</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="n">ripple-carry-inner</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">A</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">B</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">S</span><span class="p">)</span><span class="w"> </span><span class="n">c-in</span><span class="p">))))</span>
<span class="w">  </span><span class="p">(</span><span class="n">ripple-carry</span><span class="w"> </span><span class="n">A</span><span class="w"> </span><span class="n">B</span><span class="w"> </span><span class="n">S</span><span class="w"> </span><span class="n">c</span><span class="p">))</span>
</pre></div>

As for delays, in the half-adder `S` has the correct value after delay

$$
\texttt{half-s}=\max(\texttt{and-delay}+\texttt{or-delay},2\cdot\texttt{and-delay}+\texttt{inv-delay}).
$$

`C` has the correct value after delay equal to `and-delay`,

$$
\texttt{half-c}=\texttt{and-delay}.
$$

For a full-adder, `SUM` has the correct value after $2\texttt{half-s}$. 
`Cout` has the correct value after 

<div>$$\begin{align*}\texttt{full-c}&=\texttt{or-delay}+\max(\texttt{half-s}+\texttt{and-delay},\texttt{and-delay})\\
&=\texttt{half-s}+\texttt{or-delay}+\texttt{and-delay}.
\end{align*}$$</div>

So the first carry bit will be updated after time `full-c`. In general we need $n\texttt{C-delay}$ to get the correct output on the $C$ bit, and to get the correct output on $S_1$ we'll need $(n-1)\texttt{full-c}+\texttt{half-s}.$ 
So the total time needed is the max of these two quantities.

<div>$$\begin{align*}\texttt{ripple-delay}&=
(n-1)\texttt{full-c}+\max(\texttt{full-c},2\cdot\texttt{half-s}) \\
&=(n-1)(\texttt{and-delay}+\texttt{or-delay}) \\
&\quad +(n+1)\max(2\cdot\texttt{and-delay}+\texttt{inv-delay},\\
&\qquad \texttt{and-delay}+\texttt{or-delay})
\end{align*}$$</div>

We can also check this with Mathematica:

<div class="codehilite"><pre><span></span><span class="n">In</span><span class="p">[]</span><span class="o">:=</span><span class="w"> </span><span class="n">halfS</span><span class="w"> </span><span class="o">=</span><span class="w">  </span><span class="n">Max</span><span class="p">[</span><span class="n">a</span><span class="w"> </span><span class="o">+</span><span class="w"> </span><span class="n">o</span><span class="p">,</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="o">+</span><span class="w"> </span><span class="n">i</span><span class="p">];</span>
<span class="n">halfC</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="n">a</span><span class="p">;</span>
<span class="n">fullC</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="n">halfS</span><span class="w"> </span><span class="o">+</span><span class="w">  </span><span class="n">o</span><span class="w"> </span><span class="o">+</span><span class="w"> </span><span class="n">a</span><span class="p">;</span>
<span class="n">FullSimplify</span><span class="p">[(</span><span class="n">n</span><span class="w"> </span><span class="o">-</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span><span class="w"> </span><span class="n">fullC</span><span class="w"> </span><span class="o">+</span><span class="w"> </span><span class="n">Max</span><span class="p">[</span><span class="n">fullC</span><span class="p">,</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="n">halfS</span><span class="p">],</span><span class="w"> </span><span class="n">Assumptions</span><span class="w"> </span><span class="o">-&gt;</span><span class="w"> </span><span class="p">{</span><span class="n">a</span><span class="w"> </span><span class="o">&gt;</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w"> </span><span class="n">o</span><span class="w"> </span><span class="o">&gt;</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w"> </span><span class="n">i</span><span class="w"> </span><span class="o">&gt;</span><span class="w"> </span><span class="mi">0</span><span class="p">,</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="o">&gt;</span><span class="w"> </span><span class="mi">0</span><span class="p">}]</span>

<span class="n">Out</span><span class="p">[]</span><span class="o">=</span><span class="w"> </span><span class="p">(</span><span class="mi">-1</span><span class="w"> </span><span class="o">+</span><span class="w"> </span><span class="n">n</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">a</span><span class="w"> </span><span class="o">+</span><span class="w"> </span><span class="n">o</span><span class="p">)</span><span class="w"> </span><span class="o">+</span><span class="w"> </span><span class="p">(</span><span class="mi">1</span><span class="w"> </span><span class="o">+</span><span class="w"> </span><span class="n">n</span><span class="p">)</span><span class="w"> </span><span class="n">Max</span><span class="p">[</span><span class="mi">2</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="o">+</span><span class="w"> </span><span class="n">i</span><span class="p">,</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="o">+</span><span class="w"> </span><span class="n">o</span><span class="p">]</span>
</pre></div>

To check against other answers found online, I found [this solution](https://github.com/kana/sicp/blob/master/ex-3.30.scm):

<div class="codehilite"><pre><span></span><span class="c1">; Drs1 = max((3n+1)Da + (n+1)Di + (n-1)Do, 2n(Do + Da))</span>
<span class="c1">; Drs0 = max(3nDa + n(Di + Do), 2n(Do + Da))</span>
</pre></div>

I took the max of these two quantities (I think there might be a typo, referring to `Drc0` and `Drs0`). If $2a+i\lt a+o$ we get the 
second argument of `Drs0` and so the answer agrees. If $2a+i\gt a+o,$
then we get the first argument of `Drs1`, so the answer agrees.

#### Exercise 3.31

The internal procedure
`accept-action-procedure!` defined in `make-wire` specifies that when
a new action procedure is added to a wire, the procedure is immediately run.
Explain why this initialization is necessary.  In particular, trace through the
half-adder example in the paragraphs above and say how the system's response
would differ if we had defined `accept-action-procedure!` as

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">accept-action-procedure!</span><span class="w"> </span><span class="n">proc</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">set!</span><span class="w"> </span><span class="n">action-procedures</span><span class="w"> </span>
<span class="w">        </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="n">action-procedures</span><span class="p">)))</span>
</pre></div>

##### Solution

Initially all wires have value zero. This is a problem because in the half-adder
there's a not gate, which should have default value 1. Running commands as they're passed in ensures that any circuit elements downstream of our element will be 
updated / intialized correctly. 

In the half-adder, if we didn't call this, we'd find the following weird behavior:

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="n">set-signal!</span><span class="w"> </span><span class="n">input-1</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span>
<span class="p">(</span><span class="n">propagate</span><span class="p">)</span>
<span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="p">(</span><span class="n">get-signal</span><span class="w"> </span><span class="n">sum</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="c1">; 0 -- incorrect!</span>

<span class="p">(</span><span class="n">set-signal!</span><span class="w"> </span><span class="n">input-2</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span>
<span class="p">(</span><span class="n">propagate</span><span class="p">)</span>
<span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="p">(</span><span class="n">get-signal</span><span class="w"> </span><span class="n">sum</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="c1">; 0 -- correct</span>
</pre></div>

#### Exercise 3.32

The procedures to be run during
each time segment of the agenda are kept in a queue.  Thus, the procedures for
each segment are called in the order in which they were added to the agenda
(first in, first out).  Explain why this order must be used.  In particular,
trace the behavior of an and-gate whose inputs change from 0, 1 to 1, 0 in the
same segment and say how the behavior would differ if we stored a segment's
procedures in an ordinary list, adding and removing procedures only at the
front (last in, first out).

##### Solution

We're going to imagine that `a` and `b` are the wire inputs to the `and` gate,
that they have initial values 0 and 1 respectively, and that
we call the following commands:

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="n">set-signal!</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span>
<span class="p">(</span><span class="n">set-signal!</span><span class="w"> </span><span class="n">b</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span>
<span class="p">(</span><span class="n">propagate</span><span class="p">)</span>
</pre></div>

Each call to `set-signal!` runs the wires action procedures. The and gate's action
procedure runs this function:

<div class="codehilite"><pre><span></span><span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">and-action-procedure</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">new-value</span>
<span class="w">           </span><span class="p">(</span><span class="n">logical-and</span><span class="w"> </span><span class="p">(</span><span class="n">get-signal</span><span class="w"> </span><span class="n">a1</span><span class="p">)</span>
<span class="w">                        </span><span class="p">(</span><span class="n">get-signal</span><span class="w"> </span><span class="n">a2</span><span class="p">))))</span>
<span class="w">      </span><span class="p">(</span><span class="n">after-delay</span>
<span class="w">       </span><span class="n">and-gate-delay</span>
<span class="w">       </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">()</span>
<span class="w">         </span><span class="p">(</span><span class="n">set-signal!</span><span class="w"> </span><span class="n">output</span><span class="w"> </span><span class="n">new-value</span><span class="p">)))))</span>
</pre></div>

So we see we set the signal to the output value calculated **when the function is called.** This is different behavior than if our lambda was defined to calculate the logical and at the time that the output is updated. 
The issue with the current setup is that `(set-signal! a 1)` would add a
lambda `(set-signal! output 1)` to be ran later. 
Then `(set-signal! b 0)` would add a
lambda `(set-signal! output 0)` to be ran later. 

If we run these commands in the order last-in, first-out, the output ends up being 1!


#### Exercise 3.33

Using primitive multiplier,
adder, and constant constraints, define a procedure `averager` that takes
three connectors `a`, `b`, and `c` as inputs and establishes the
constraint that the value of `c` is the average of the values of `a`
and `b`.

##### Solution

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">averager</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="w"> </span><span class="n">c</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">u</span><span class="w"> </span><span class="p">(</span><span class="n">make-connector</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="n">v</span><span class="w"> </span><span class="p">(</span><span class="n">make-connector</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">adder</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="w"> </span><span class="n">u</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">constant</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="n">v</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">multiplier</span><span class="w"> </span><span class="n">c</span><span class="w"> </span><span class="n">v</span><span class="w"> </span><span class="n">u</span><span class="p">)</span>
<span class="w">    </span><span class="o">&#39;</span><span class="ss">ok</span><span class="p">))</span>
</pre></div>

<div class="code-box" markdown="1">
<details class="collapsible-code">
<summary class="code-summary"><a href="code/ex3-33.rkt">code/ex3-33.rkt</a> <span class="expand-hint">(click to expand)</span></summary>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">connector</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">connector</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">has-value?</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">connector</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">connector</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">value</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">set-value!</span><span class="w"> </span><span class="n">connector</span><span class="w"> </span>
<span class="w">                    </span><span class="n">new-value</span><span class="w"> </span>
<span class="w">                    </span><span class="n">informant</span><span class="p">)</span>
<span class="w">  </span><span class="p">((</span><span class="n">connector</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">set-value!</span><span class="p">)</span><span class="w"> </span>
<span class="w">   </span><span class="n">new-value</span><span class="w"> </span>
<span class="w">   </span><span class="n">informant</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">forget-value!</span><span class="w"> </span><span class="n">connector</span><span class="w"> </span><span class="n">retractor</span><span class="p">)</span>
<span class="w">  </span><span class="p">((</span><span class="n">connector</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">forget</span><span class="p">)</span><span class="w"> </span><span class="n">retractor</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">connect</span><span class="w"> </span><span class="n">connector</span><span class="w"> </span><span class="n">new-constraint</span><span class="p">)</span>
<span class="w">  </span><span class="p">((</span><span class="n">connector</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">connect</span><span class="p">)</span><span class="w"> </span><span class="n">new-constraint</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">adder</span><span class="w"> </span><span class="n">a1</span><span class="w"> </span><span class="n">a2</span><span class="w"> </span><span class="n">sum</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">process-new-value</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">a1</span><span class="p">)</span><span class="w"> </span>
<span class="w">                </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">a2</span><span class="p">))</span>
<span class="w">           </span><span class="p">(</span><span class="n">set-value!</span><span class="w"> </span><span class="n">sum</span>
<span class="w">                       </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">a1</span><span class="p">)</span><span class="w"> </span>
<span class="w">                          </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">a2</span><span class="p">))</span>
<span class="w">                       </span><span class="n">me</span><span class="p">))</span>
<span class="w">          </span><span class="p">((</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">a1</span><span class="p">)</span><span class="w"> </span>
<span class="w">                </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">sum</span><span class="p">))</span>
<span class="w">           </span><span class="p">(</span><span class="n">set-value!</span><span class="w"> </span><span class="n">a2</span>
<span class="w">                       </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">sum</span><span class="p">)</span><span class="w"> </span>
<span class="w">                          </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">a1</span><span class="p">))</span>
<span class="w">                       </span><span class="n">me</span><span class="p">))</span>
<span class="w">          </span><span class="p">((</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">a2</span><span class="p">)</span><span class="w"> </span>
<span class="w">                </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">sum</span><span class="p">))</span>
<span class="w">           </span><span class="p">(</span><span class="n">set-value!</span><span class="w"> </span><span class="n">a1</span>
<span class="w">                       </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">sum</span><span class="p">)</span><span class="w"> </span>
<span class="w">                          </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">a2</span><span class="p">))</span>
<span class="w">                       </span><span class="n">me</span><span class="p">))))</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">process-forget-value</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">forget-value!</span><span class="w"> </span><span class="n">sum</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">forget-value!</span><span class="w"> </span><span class="n">a1</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">forget-value!</span><span class="w"> </span><span class="n">a2</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">process-new-value</span><span class="p">))</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">me</span><span class="w"> </span><span class="n">request</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">request</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">I-have-a-value</span><span class="p">)</span>
<span class="w">           </span><span class="p">(</span><span class="n">process-new-value</span><span class="p">))</span>
<span class="w">          </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">request</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">I-lost-my-value</span><span class="p">)</span>
<span class="w">           </span><span class="p">(</span><span class="n">process-forget-value</span><span class="p">))</span>
<span class="w">          </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;Unknown request: </span>
<span class="s2">                        ADDER&quot;</span><span class="w"> </span><span class="n">request</span><span class="p">))))</span>
<span class="w">  </span><span class="p">(</span><span class="n">connect</span><span class="w"> </span><span class="n">a1</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">connect</span><span class="w"> </span><span class="n">a2</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">connect</span><span class="w"> </span><span class="n">sum</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">  </span><span class="n">me</span><span class="p">)</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">multiplier</span><span class="w"> </span><span class="n">m1</span><span class="w"> </span><span class="n">m2</span><span class="w"> </span><span class="n">product</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">process-new-value</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="k">or</span><span class="w"> </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">m1</span><span class="p">)</span>
<span class="w">                    </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">m1</span><span class="p">)</span><span class="w"> </span><span class="mi">0</span><span class="p">))</span>
<span class="w">               </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">m2</span><span class="p">)</span>
<span class="w">                    </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">m2</span><span class="p">)</span><span class="w"> </span><span class="mi">0</span><span class="p">)))</span>
<span class="w">           </span><span class="p">(</span><span class="n">set-value!</span><span class="w"> </span><span class="n">product</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="n">me</span><span class="p">))</span>
<span class="w">          </span><span class="p">((</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">m1</span><span class="p">)</span>
<span class="w">                </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">m2</span><span class="p">))</span>
<span class="w">           </span><span class="p">(</span><span class="n">set-value!</span><span class="w"> </span><span class="n">product</span>
<span class="w">                       </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">m1</span><span class="p">)</span>
<span class="w">                          </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">m2</span><span class="p">))</span>
<span class="w">                       </span><span class="n">me</span><span class="p">))</span>
<span class="w">          </span><span class="p">((</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">product</span><span class="p">)</span>
<span class="w">                </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">m1</span><span class="p">))</span>
<span class="w">           </span><span class="p">(</span><span class="n">set-value!</span><span class="w"> </span><span class="n">m2</span>
<span class="w">                       </span><span class="p">(</span><span class="nb">/</span><span class="w"> </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">product</span><span class="p">)</span>
<span class="w">                          </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">m1</span><span class="p">))</span>
<span class="w">                       </span><span class="n">me</span><span class="p">))</span>
<span class="w">          </span><span class="p">((</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">product</span><span class="p">)</span>
<span class="w">                </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">m2</span><span class="p">))</span>
<span class="w">           </span><span class="p">(</span><span class="n">set-value!</span><span class="w"> </span><span class="n">m1</span>
<span class="w">                       </span><span class="p">(</span><span class="nb">/</span><span class="w"> </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">product</span><span class="p">)</span>
<span class="w">                          </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">m2</span><span class="p">))</span>
<span class="w">                       </span><span class="n">me</span><span class="p">))))</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">process-forget-value</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">forget-value!</span><span class="w"> </span><span class="n">product</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">forget-value!</span><span class="w"> </span><span class="n">m1</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">forget-value!</span><span class="w"> </span><span class="n">m2</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">process-new-value</span><span class="p">))</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">me</span><span class="w"> </span><span class="n">request</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">request</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">I-have-a-value</span><span class="p">)</span>
<span class="w">           </span><span class="p">(</span><span class="n">process-new-value</span><span class="p">))</span>
<span class="w">          </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">request</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">I-lost-my-value</span><span class="p">)</span>
<span class="w">           </span><span class="p">(</span><span class="n">process-forget-value</span><span class="p">))</span>
<span class="w">          </span><span class="p">(</span><span class="k">else</span>
<span class="w">           </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;Unknown request:</span>
<span class="s2">                   MULTIPLIER&quot;</span>
<span class="w">                  </span><span class="n">request</span><span class="p">))))</span>
<span class="w">  </span><span class="p">(</span><span class="n">connect</span><span class="w"> </span><span class="n">m1</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">connect</span><span class="w"> </span><span class="n">m2</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">connect</span><span class="w"> </span><span class="n">product</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">  </span><span class="n">me</span><span class="p">)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">inform-about-value</span><span class="w"> </span><span class="n">constraint</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">constraint</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">I-have-a-value</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">inform-about-no-value</span><span class="w"> </span><span class="n">constraint</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">constraint</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">I-lost-my-value</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">constant</span><span class="w"> </span><span class="n">value</span><span class="w"> </span><span class="n">connector</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">me</span><span class="w"> </span><span class="n">request</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;Unknown request: CONSTANT&quot;</span>
<span class="w">           </span><span class="n">request</span><span class="p">))</span>
<span class="w">  </span><span class="p">(</span><span class="n">connect</span><span class="w"> </span><span class="n">connector</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">set-value!</span><span class="w"> </span><span class="n">connector</span><span class="w"> </span><span class="n">value</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">  </span><span class="n">me</span><span class="p">)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">probe</span><span class="w"> </span><span class="n">name</span><span class="w"> </span><span class="n">connector</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">print-probe</span><span class="w"> </span><span class="n">value</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;Probe: &quot;</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="n">name</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot; = &quot;</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="n">value</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span><span class="w"> </span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">process-new-value</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">print-probe</span><span class="w"> </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">connector</span><span class="p">)))</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">process-forget-value</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">print-probe</span><span class="w"> </span><span class="s2">&quot;?&quot;</span><span class="p">))</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">me</span><span class="w"> </span><span class="n">request</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">request</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">I-have-a-value</span><span class="p">)</span>
<span class="w">           </span><span class="p">(</span><span class="n">process-new-value</span><span class="p">))</span>
<span class="w">          </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">request</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">I-lost-my-value</span><span class="p">)</span>
<span class="w">           </span><span class="p">(</span><span class="n">process-forget-value</span><span class="p">))</span>
<span class="w">          </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;Unknown request: </span>
<span class="s2">                        PROBE&quot;</span><span class="w"> </span><span class="n">request</span><span class="p">))))</span>
<span class="w">  </span><span class="p">(</span><span class="n">connect</span><span class="w"> </span><span class="n">connector</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">  </span><span class="n">me</span><span class="p">)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-connector</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">value</span><span class="w"> </span><span class="k">false</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="n">informant</span><span class="w"> </span><span class="k">false</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="n">constraints</span><span class="w"> </span><span class="o">&#39;</span><span class="p">()))</span>
<span class="w">    </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">set-my-value</span><span class="w"> </span><span class="n">newval</span><span class="w"> </span><span class="n">setter</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">me</span><span class="p">))</span>
<span class="w">             </span><span class="p">(</span><span class="k">set!</span><span class="w"> </span><span class="n">value</span><span class="w"> </span><span class="n">newval</span><span class="p">)</span>
<span class="w">             </span><span class="p">(</span><span class="k">set!</span><span class="w"> </span><span class="n">informant</span><span class="w"> </span><span class="n">setter</span><span class="p">)</span>
<span class="w">             </span><span class="p">(</span><span class="n">for-each-except</span>
<span class="w">              </span><span class="n">setter</span>
<span class="w">              </span><span class="n">inform-about-value</span>
<span class="w">              </span><span class="n">constraints</span><span class="p">))</span>
<span class="w">            </span><span class="p">((</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="n">value</span><span class="w"> </span><span class="n">newval</span><span class="p">))</span>
<span class="w">             </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;Contradiction&quot;</span>
<span class="w">                    </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="n">value</span><span class="w"> </span><span class="n">newval</span><span class="p">)))</span>
<span class="w">            </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">ignored</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">forget-my-value</span><span class="w"> </span><span class="n">retractor</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">eq?</span><span class="w"> </span><span class="n">retractor</span><span class="w"> </span><span class="n">informant</span><span class="p">)</span>
<span class="w">          </span><span class="p">(</span><span class="k">begin</span><span class="w"> </span><span class="p">(</span><span class="k">set!</span><span class="w"> </span><span class="n">informant</span><span class="w"> </span><span class="k">false</span><span class="p">)</span>
<span class="w">                 </span><span class="p">(</span><span class="n">for-each-except</span>
<span class="w">                  </span><span class="n">retractor</span>
<span class="w">                  </span><span class="n">inform-about-no-value</span>
<span class="w">                  </span><span class="n">constraints</span><span class="p">))</span>
<span class="w">          </span><span class="o">&#39;</span><span class="ss">ignored</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">connect</span><span class="w"> </span><span class="n">new-constraint</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="nb">memq</span><span class="w"> </span><span class="n">new-constraint</span>
<span class="w">                     </span><span class="n">constraints</span><span class="p">))</span>
<span class="w">          </span><span class="p">(</span><span class="k">set!</span><span class="w"> </span><span class="n">constraints</span>
<span class="w">                </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">new-constraint</span>
<span class="w">                      </span><span class="n">constraints</span><span class="p">)))</span>
<span class="w">      </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">          </span><span class="p">(</span><span class="n">inform-about-value</span><span class="w"> </span><span class="n">new-constraint</span><span class="p">))</span>
<span class="w">      </span><span class="o">&#39;</span><span class="ss">done</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">me</span><span class="w"> </span><span class="n">request</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">request</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">has-value?</span><span class="p">)</span>
<span class="w">             </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="n">informant</span><span class="w"> </span><span class="nb">true</span><span class="w"> </span><span class="k">false</span><span class="p">))</span>
<span class="w">            </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">request</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">value</span><span class="p">)</span><span class="w"> </span><span class="n">value</span><span class="p">)</span>
<span class="w">            </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">request</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">set-value!</span><span class="p">)</span>
<span class="w">             </span><span class="n">set-my-value</span><span class="p">)</span>
<span class="w">            </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">request</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">forget</span><span class="p">)</span>
<span class="w">             </span><span class="n">forget-my-value</span><span class="p">)</span>
<span class="w">            </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">request</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">connect</span><span class="p">)</span><span class="w"> </span><span class="n">connect</span><span class="p">)</span>
<span class="w">            </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;Unknown operation:</span>
<span class="s2">                          CONNECTOR&quot;</span>
<span class="w">                         </span><span class="n">request</span><span class="p">))))</span>
<span class="w">    </span><span class="n">me</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">for-each-except</span><span class="w"> </span><span class="n">exception</span><span class="w"> </span>
<span class="w">                         </span><span class="n">procedure</span><span class="w"> </span>
<span class="w">                         </span><span class="nb">list</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">loop</span><span class="w"> </span><span class="n">items</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">null?</span><span class="w"> </span><span class="n">items</span><span class="p">)</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">done</span><span class="p">)</span>
<span class="w">          </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">items</span><span class="p">)</span><span class="w"> </span><span class="n">exception</span><span class="p">)</span><span class="w"> </span>
<span class="w">           </span><span class="p">(</span><span class="n">loop</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">items</span><span class="p">)))</span>
<span class="w">          </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="n">procedure</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">items</span><span class="p">))</span>
<span class="w">                </span><span class="p">(</span><span class="n">loop</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">items</span><span class="p">)))))</span>
<span class="w">  </span><span class="p">(</span><span class="n">loop</span><span class="w"> </span><span class="nb">list</span><span class="p">))</span>



<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="p">(</span><span class="n">make-connector</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">b</span><span class="w"> </span><span class="p">(</span><span class="n">make-connector</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">c</span><span class="w"> </span><span class="p">(</span><span class="n">make-connector</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">averager</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="w"> </span><span class="n">c</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">u</span><span class="w"> </span><span class="p">(</span><span class="n">make-connector</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="n">v</span><span class="w"> </span><span class="p">(</span><span class="n">make-connector</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">adder</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="w"> </span><span class="n">u</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">constant</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="n">v</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">multiplier</span><span class="w"> </span><span class="n">c</span><span class="w"> </span><span class="n">v</span><span class="w"> </span><span class="n">u</span><span class="p">)</span>
<span class="w">    </span><span class="o">&#39;</span><span class="ss">ok</span><span class="p">))</span>

<span class="p">(</span><span class="n">averager</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="w"> </span><span class="n">c</span><span class="p">)</span>

<span class="p">(</span><span class="n">probe</span><span class="w"> </span><span class="s2">&quot;a&quot;</span><span class="w"> </span><span class="n">a</span><span class="p">)</span>
<span class="p">(</span><span class="n">probe</span><span class="w"> </span><span class="s2">&quot;b&quot;</span><span class="w"> </span><span class="n">b</span><span class="p">)</span>
<span class="p">(</span><span class="n">probe</span><span class="w"> </span><span class="s2">&quot;c&quot;</span><span class="w"> </span><span class="n">c</span><span class="p">)</span>
<span class="p">(</span><span class="n">set-value!</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="mi">15</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">user</span><span class="p">)</span>
<span class="p">(</span><span class="n">set-value!</span><span class="w"> </span><span class="n">b</span><span class="w"> </span><span class="mi">5</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">user</span><span class="p">)</span>
<span class="p">(</span><span class="n">forget-value!</span><span class="w"> </span><span class="n">b</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">user</span><span class="p">)</span>
<span class="p">(</span><span class="n">set-value!</span><span class="w"> </span><span class="n">c</span><span class="w"> </span><span class="mi">20</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">user</span><span class="p">)</span>
</pre></div>

</details>
<div class="code-output">
<span>Output:</span>
<pre>ok
#&lt;procedure:...ch3/code/ex3-33.rkt:120:2&gt;
#&lt;procedure:...ch3/code/ex3-33.rkt:120:2&gt;
#&lt;procedure:...ch3/code/ex3-33.rkt:120:2&gt;
Probe: a = 15
done
Probe: b = 5
Probe: c = 10
done
Probe: b = ?
Probe: c = ?
done
Probe: c = 20
Probe: b = 25
done
</pre>
</div>
</div>


#### Exercise 3.34

Louis Reasoner wants to build a
squarer, a constraint device with two terminals such that the value of
connector `b` on the second terminal will always be the square of the
value `a` on the first terminal.  He proposes the following simple device
made from a multiplier:

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">squarer</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">multiplier</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="p">))</span>
</pre></div>

There is a serious flaw in this idea.  Explain.

##### Solution

We should be tipped off that there's no `sqrt` in the definition of `multiplier`.

I think that things will work fine when modifying `a`. `for-each-except` should 
ensure that we don't get stuck in an infinite loop here. 

However as soon as we modify b with no value set for `a`, then we won't get the 
expected behavior of `a` updating; we'll simply notice that the two inputs (which 
are both `a`) have not been assigned a value yet, and do nothing! 

Okay, let's test if my guesses are correct:

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="p">(</span><span class="n">make-connector</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">b</span><span class="w"> </span><span class="p">(</span><span class="n">make-connector</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">squarer</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">multiplier</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="p">))</span>

<span class="p">(</span><span class="n">probe</span><span class="w"> </span><span class="s2">&quot;a&quot;</span><span class="w"> </span><span class="n">a</span><span class="p">)</span>
<span class="p">(</span><span class="n">probe</span><span class="w"> </span><span class="s2">&quot;b&quot;</span><span class="w"> </span><span class="n">b</span><span class="p">)</span>
<span class="p">(</span><span class="n">squarer</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="p">)</span>

<span class="p">(</span><span class="n">set-value!</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="mi">10</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">user</span><span class="p">)</span>

<span class="p">(</span><span class="n">forget-value!</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">user</span><span class="p">)</span>

<span class="p">(</span><span class="n">set-value!</span><span class="w"> </span><span class="n">b</span><span class="w"> </span><span class="mi">100</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">user</span><span class="p">)</span>
</pre></div>

<div class="code-box" markdown="1">
<details class="collapsible-code">
<summary class="code-summary"><a href="code/ex3-34.rkt">code/ex3-34.rkt</a> <span class="expand-hint">(click to expand)</span></summary>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">connector</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">connector</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">has-value?</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">connector</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">connector</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">value</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">set-value!</span><span class="w"> </span><span class="n">connector</span><span class="w"> </span>
<span class="w">                    </span><span class="n">new-value</span><span class="w"> </span>
<span class="w">                    </span><span class="n">informant</span><span class="p">)</span>
<span class="w">  </span><span class="p">((</span><span class="n">connector</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">set-value!</span><span class="p">)</span><span class="w"> </span>
<span class="w">   </span><span class="n">new-value</span><span class="w"> </span>
<span class="w">   </span><span class="n">informant</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">forget-value!</span><span class="w"> </span><span class="n">connector</span><span class="w"> </span><span class="n">retractor</span><span class="p">)</span>
<span class="w">  </span><span class="p">((</span><span class="n">connector</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">forget</span><span class="p">)</span><span class="w"> </span><span class="n">retractor</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">connect</span><span class="w"> </span><span class="n">connector</span><span class="w"> </span><span class="n">new-constraint</span><span class="p">)</span>
<span class="w">  </span><span class="p">((</span><span class="n">connector</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">connect</span><span class="p">)</span><span class="w"> </span><span class="n">new-constraint</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">adder</span><span class="w"> </span><span class="n">a1</span><span class="w"> </span><span class="n">a2</span><span class="w"> </span><span class="n">sum</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">process-new-value</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">a1</span><span class="p">)</span><span class="w"> </span>
<span class="w">                </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">a2</span><span class="p">))</span>
<span class="w">           </span><span class="p">(</span><span class="n">set-value!</span><span class="w"> </span><span class="n">sum</span>
<span class="w">                       </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">a1</span><span class="p">)</span><span class="w"> </span>
<span class="w">                          </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">a2</span><span class="p">))</span>
<span class="w">                       </span><span class="n">me</span><span class="p">))</span>
<span class="w">          </span><span class="p">((</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">a1</span><span class="p">)</span><span class="w"> </span>
<span class="w">                </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">sum</span><span class="p">))</span>
<span class="w">           </span><span class="p">(</span><span class="n">set-value!</span><span class="w"> </span><span class="n">a2</span>
<span class="w">                       </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">sum</span><span class="p">)</span><span class="w"> </span>
<span class="w">                          </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">a1</span><span class="p">))</span>
<span class="w">                       </span><span class="n">me</span><span class="p">))</span>
<span class="w">          </span><span class="p">((</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">a2</span><span class="p">)</span><span class="w"> </span>
<span class="w">                </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">sum</span><span class="p">))</span>
<span class="w">           </span><span class="p">(</span><span class="n">set-value!</span><span class="w"> </span><span class="n">a1</span>
<span class="w">                       </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">sum</span><span class="p">)</span><span class="w"> </span>
<span class="w">                          </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">a2</span><span class="p">))</span>
<span class="w">                       </span><span class="n">me</span><span class="p">))))</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">process-forget-value</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">forget-value!</span><span class="w"> </span><span class="n">sum</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">forget-value!</span><span class="w"> </span><span class="n">a1</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">forget-value!</span><span class="w"> </span><span class="n">a2</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">process-new-value</span><span class="p">))</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">me</span><span class="w"> </span><span class="n">request</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">request</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">I-have-a-value</span><span class="p">)</span>
<span class="w">           </span><span class="p">(</span><span class="n">process-new-value</span><span class="p">))</span>
<span class="w">          </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">request</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">I-lost-my-value</span><span class="p">)</span>
<span class="w">           </span><span class="p">(</span><span class="n">process-forget-value</span><span class="p">))</span>
<span class="w">          </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;Unknown request: </span>
<span class="s2">                        ADDER&quot;</span><span class="w"> </span><span class="n">request</span><span class="p">))))</span>
<span class="w">  </span><span class="p">(</span><span class="n">connect</span><span class="w"> </span><span class="n">a1</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">connect</span><span class="w"> </span><span class="n">a2</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">connect</span><span class="w"> </span><span class="n">sum</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">  </span><span class="n">me</span><span class="p">)</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">multiplier</span><span class="w"> </span><span class="n">m1</span><span class="w"> </span><span class="n">m2</span><span class="w"> </span><span class="n">product</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">process-new-value</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="k">or</span><span class="w"> </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">m1</span><span class="p">)</span>
<span class="w">                    </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">m1</span><span class="p">)</span><span class="w"> </span><span class="mi">0</span><span class="p">))</span>
<span class="w">               </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">m2</span><span class="p">)</span>
<span class="w">                    </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">m2</span><span class="p">)</span><span class="w"> </span><span class="mi">0</span><span class="p">)))</span>
<span class="w">           </span><span class="p">(</span><span class="n">set-value!</span><span class="w"> </span><span class="n">product</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="n">me</span><span class="p">))</span>
<span class="w">          </span><span class="p">((</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">m1</span><span class="p">)</span>
<span class="w">                </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">m2</span><span class="p">))</span>
<span class="w">           </span><span class="p">(</span><span class="n">set-value!</span><span class="w"> </span><span class="n">product</span>
<span class="w">                       </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">m1</span><span class="p">)</span>
<span class="w">                          </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">m2</span><span class="p">))</span>
<span class="w">                       </span><span class="n">me</span><span class="p">))</span>
<span class="w">          </span><span class="p">((</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">product</span><span class="p">)</span>
<span class="w">                </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">m1</span><span class="p">))</span>
<span class="w">           </span><span class="p">(</span><span class="n">set-value!</span><span class="w"> </span><span class="n">m2</span>
<span class="w">                       </span><span class="p">(</span><span class="nb">/</span><span class="w"> </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">product</span><span class="p">)</span>
<span class="w">                          </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">m1</span><span class="p">))</span>
<span class="w">                       </span><span class="n">me</span><span class="p">))</span>
<span class="w">          </span><span class="p">((</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">product</span><span class="p">)</span>
<span class="w">                </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">m2</span><span class="p">))</span>
<span class="w">           </span><span class="p">(</span><span class="n">set-value!</span><span class="w"> </span><span class="n">m1</span>
<span class="w">                       </span><span class="p">(</span><span class="nb">/</span><span class="w"> </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">product</span><span class="p">)</span>
<span class="w">                          </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">m2</span><span class="p">))</span>
<span class="w">                       </span><span class="n">me</span><span class="p">))))</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">process-forget-value</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">forget-value!</span><span class="w"> </span><span class="n">product</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">forget-value!</span><span class="w"> </span><span class="n">m1</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">forget-value!</span><span class="w"> </span><span class="n">m2</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">process-new-value</span><span class="p">))</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">me</span><span class="w"> </span><span class="n">request</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">request</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">I-have-a-value</span><span class="p">)</span>
<span class="w">           </span><span class="p">(</span><span class="n">process-new-value</span><span class="p">))</span>
<span class="w">          </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">request</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">I-lost-my-value</span><span class="p">)</span>
<span class="w">           </span><span class="p">(</span><span class="n">process-forget-value</span><span class="p">))</span>
<span class="w">          </span><span class="p">(</span><span class="k">else</span>
<span class="w">           </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;Unknown request:</span>
<span class="s2">                   MULTIPLIER&quot;</span>
<span class="w">                  </span><span class="n">request</span><span class="p">))))</span>
<span class="w">  </span><span class="p">(</span><span class="n">connect</span><span class="w"> </span><span class="n">m1</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">connect</span><span class="w"> </span><span class="n">m2</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">connect</span><span class="w"> </span><span class="n">product</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">  </span><span class="n">me</span><span class="p">)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">inform-about-value</span><span class="w"> </span><span class="n">constraint</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">constraint</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">I-have-a-value</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">inform-about-no-value</span><span class="w"> </span><span class="n">constraint</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">constraint</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">I-lost-my-value</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">constant</span><span class="w"> </span><span class="n">value</span><span class="w"> </span><span class="n">connector</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">me</span><span class="w"> </span><span class="n">request</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;Unknown request: CONSTANT&quot;</span>
<span class="w">           </span><span class="n">request</span><span class="p">))</span>
<span class="w">  </span><span class="p">(</span><span class="n">connect</span><span class="w"> </span><span class="n">connector</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">set-value!</span><span class="w"> </span><span class="n">connector</span><span class="w"> </span><span class="n">value</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">  </span><span class="n">me</span><span class="p">)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">probe</span><span class="w"> </span><span class="n">name</span><span class="w"> </span><span class="n">connector</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">print-probe</span><span class="w"> </span><span class="n">value</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;Probe: &quot;</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="n">name</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot; = &quot;</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="n">value</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span><span class="w"> </span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">process-new-value</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">print-probe</span><span class="w"> </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">connector</span><span class="p">)))</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">process-forget-value</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">print-probe</span><span class="w"> </span><span class="s2">&quot;?&quot;</span><span class="p">))</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">me</span><span class="w"> </span><span class="n">request</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">request</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">I-have-a-value</span><span class="p">)</span>
<span class="w">           </span><span class="p">(</span><span class="n">process-new-value</span><span class="p">))</span>
<span class="w">          </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">request</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">I-lost-my-value</span><span class="p">)</span>
<span class="w">           </span><span class="p">(</span><span class="n">process-forget-value</span><span class="p">))</span>
<span class="w">          </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;Unknown request: </span>
<span class="s2">                        PROBE&quot;</span><span class="w"> </span><span class="n">request</span><span class="p">))))</span>
<span class="w">  </span><span class="p">(</span><span class="n">connect</span><span class="w"> </span><span class="n">connector</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">  </span><span class="n">me</span><span class="p">)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-connector</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">value</span><span class="w"> </span><span class="k">false</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="n">informant</span><span class="w"> </span><span class="k">false</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="n">constraints</span><span class="w"> </span><span class="o">&#39;</span><span class="p">()))</span>
<span class="w">    </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">set-my-value</span><span class="w"> </span><span class="n">newval</span><span class="w"> </span><span class="n">setter</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">me</span><span class="p">))</span>
<span class="w">             </span><span class="p">(</span><span class="k">set!</span><span class="w"> </span><span class="n">value</span><span class="w"> </span><span class="n">newval</span><span class="p">)</span>
<span class="w">             </span><span class="p">(</span><span class="k">set!</span><span class="w"> </span><span class="n">informant</span><span class="w"> </span><span class="n">setter</span><span class="p">)</span>
<span class="w">             </span><span class="p">(</span><span class="n">for-each-except</span>
<span class="w">              </span><span class="n">setter</span>
<span class="w">              </span><span class="n">inform-about-value</span>
<span class="w">              </span><span class="n">constraints</span><span class="p">))</span>
<span class="w">            </span><span class="p">((</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="n">value</span><span class="w"> </span><span class="n">newval</span><span class="p">))</span>
<span class="w">             </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;Contradiction&quot;</span>
<span class="w">                    </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="n">value</span><span class="w"> </span><span class="n">newval</span><span class="p">)))</span>
<span class="w">            </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">ignored</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">forget-my-value</span><span class="w"> </span><span class="n">retractor</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">eq?</span><span class="w"> </span><span class="n">retractor</span><span class="w"> </span><span class="n">informant</span><span class="p">)</span>
<span class="w">          </span><span class="p">(</span><span class="k">begin</span><span class="w"> </span><span class="p">(</span><span class="k">set!</span><span class="w"> </span><span class="n">informant</span><span class="w"> </span><span class="k">false</span><span class="p">)</span>
<span class="w">                 </span><span class="p">(</span><span class="n">for-each-except</span>
<span class="w">                  </span><span class="n">retractor</span>
<span class="w">                  </span><span class="n">inform-about-no-value</span>
<span class="w">                  </span><span class="n">constraints</span><span class="p">))</span>
<span class="w">          </span><span class="o">&#39;</span><span class="ss">ignored</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">connect</span><span class="w"> </span><span class="n">new-constraint</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="nb">memq</span><span class="w"> </span><span class="n">new-constraint</span>
<span class="w">                     </span><span class="n">constraints</span><span class="p">))</span>
<span class="w">          </span><span class="p">(</span><span class="k">set!</span><span class="w"> </span><span class="n">constraints</span>
<span class="w">                </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">new-constraint</span>
<span class="w">                      </span><span class="n">constraints</span><span class="p">)))</span>
<span class="w">      </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">          </span><span class="p">(</span><span class="n">inform-about-value</span><span class="w"> </span><span class="n">new-constraint</span><span class="p">))</span>
<span class="w">      </span><span class="o">&#39;</span><span class="ss">done</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">me</span><span class="w"> </span><span class="n">request</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">request</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">has-value?</span><span class="p">)</span>
<span class="w">             </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="n">informant</span><span class="w"> </span><span class="nb">true</span><span class="w"> </span><span class="k">false</span><span class="p">))</span>
<span class="w">            </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">request</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">value</span><span class="p">)</span><span class="w"> </span><span class="n">value</span><span class="p">)</span>
<span class="w">            </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">request</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">set-value!</span><span class="p">)</span>
<span class="w">             </span><span class="n">set-my-value</span><span class="p">)</span>
<span class="w">            </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">request</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">forget</span><span class="p">)</span>
<span class="w">             </span><span class="n">forget-my-value</span><span class="p">)</span>
<span class="w">            </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">request</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">connect</span><span class="p">)</span><span class="w"> </span><span class="n">connect</span><span class="p">)</span>
<span class="w">            </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;Unknown operation:</span>
<span class="s2">                          CONNECTOR&quot;</span>
<span class="w">                         </span><span class="n">request</span><span class="p">))))</span>
<span class="w">    </span><span class="n">me</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">for-each-except</span><span class="w"> </span><span class="n">exception</span><span class="w"> </span>
<span class="w">                         </span><span class="n">procedure</span><span class="w"> </span>
<span class="w">                         </span><span class="nb">list</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">loop</span><span class="w"> </span><span class="n">items</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">null?</span><span class="w"> </span><span class="n">items</span><span class="p">)</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">done</span><span class="p">)</span>
<span class="w">          </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">items</span><span class="p">)</span><span class="w"> </span><span class="n">exception</span><span class="p">)</span><span class="w"> </span>
<span class="w">           </span><span class="p">(</span><span class="n">loop</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">items</span><span class="p">)))</span>
<span class="w">          </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="n">procedure</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">items</span><span class="p">))</span>
<span class="w">                </span><span class="p">(</span><span class="n">loop</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">items</span><span class="p">)))))</span>
<span class="w">  </span><span class="p">(</span><span class="n">loop</span><span class="w"> </span><span class="nb">list</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="p">(</span><span class="n">make-connector</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">b</span><span class="w"> </span><span class="p">(</span><span class="n">make-connector</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">squarer</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">multiplier</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="p">))</span>

<span class="p">(</span><span class="n">probe</span><span class="w"> </span><span class="s2">&quot;a&quot;</span><span class="w"> </span><span class="n">a</span><span class="p">)</span>
<span class="p">(</span><span class="n">probe</span><span class="w"> </span><span class="s2">&quot;b&quot;</span><span class="w"> </span><span class="n">b</span><span class="p">)</span>
<span class="p">(</span><span class="n">squarer</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="p">)</span>

<span class="p">(</span><span class="n">set-value!</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="mi">10</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">user</span><span class="p">)</span>

<span class="p">(</span><span class="n">forget-value!</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">user</span><span class="p">)</span>

<span class="p">(</span><span class="n">set-value!</span><span class="w"> </span><span class="n">b</span><span class="w"> </span><span class="mi">100</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">user</span><span class="p">)</span>
<span class="c1">;; (set-value! b 5 &#39;user)</span>
<span class="c1">;; (set-value! c 20 &#39;user)</span>
</pre></div>

</details>
<div class="code-output">
<span>Output:</span>
<pre>#&lt;procedure:...ch3/code/ex3-34.rkt:120:2&gt;
#&lt;procedure:...ch3/code/ex3-34.rkt:120:2&gt;
#&lt;procedure:...ch3/code/ex3-34.rkt:84:2&gt;
Probe: b = 100
Probe: a = 10
done
Probe: b = ?
Probe: a = ?
done
Probe: b = 100
done
</pre>
</div>
</div>



So we don't get infinite recursion or anything, but `a` isn't updated from `?` like we'd want.

#### Exercise 3.35

Ben Bitdiddle tells Louis that
one way to avoid the trouble in Exercise 3.34 is to define a squarer as a
new primitive constraint.  Fill in the missing portions in Ben's outline for a
procedure to implement such a constraint:

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">squarer</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">process-new-value</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">b</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">&lt;</span><span class="w"> </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">b</span><span class="p">)</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span>
<span class="w">            </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;square less than 0: </span>
<span class="s2">                    SQUARER&quot;</span><span class="w"> </span>
<span class="w">                   </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">b</span><span class="p">))</span>
<span class="w">            </span><span class="n">⟨alternative1⟩</span><span class="p">)</span>
<span class="w">        </span><span class="n">⟨alternative2⟩</span><span class="p">))</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">process-forget-value</span><span class="p">)</span><span class="w"> </span><span class="n">⟨body1⟩</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">me</span><span class="w"> </span><span class="n">request</span><span class="p">)</span><span class="w"> </span><span class="n">⟨body2⟩</span><span class="p">)</span>
<span class="w">  </span><span class="n">⟨rest</span><span class="w"> </span><span class="n">of</span><span class="w"> </span><span class="n">definition⟩</span>
<span class="w">  </span><span class="n">me</span><span class="p">)</span>
</pre></div>

##### Solution

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">square</span><span class="w"> </span><span class="n">a</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">a</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">squarer</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">process-new-value</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">b</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">&lt;</span><span class="w"> </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">b</span><span class="p">)</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span>
<span class="w">            </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;square less than 0: </span>
<span class="s2">                    SQUARER&quot;</span><span class="w"> </span>
<span class="w">                   </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">b</span><span class="p">))</span>
<span class="w">            </span><span class="p">(</span><span class="n">set-value!</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="p">(</span><span class="nb">sqrt</span><span class="w"> </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">b</span><span class="p">))</span><span class="w"> </span><span class="n">me</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">a</span><span class="p">)</span><span class="w"> </span>
<span class="w">          </span><span class="p">(</span><span class="n">set-value!</span><span class="w"> </span><span class="n">b</span><span class="w"> </span><span class="p">(</span><span class="n">square</span><span class="w"> </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">a</span><span class="p">))</span><span class="w"> </span><span class="n">me</span><span class="p">))))</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">process-forget-value</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">forget-value!</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">forget-value!</span><span class="w"> </span><span class="n">b</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">process-new-value</span><span class="p">))</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">me</span><span class="w"> </span><span class="n">request</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">request</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">I-have-a-value</span><span class="p">)</span>
<span class="w">           </span><span class="p">(</span><span class="n">process-new-value</span><span class="p">))</span>
<span class="w">          </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">request</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">I-lost-my-value</span><span class="p">)</span>
<span class="w">           </span><span class="p">(</span><span class="n">process-forget-value</span><span class="p">))</span>
<span class="w">          </span><span class="p">(</span><span class="k">else</span>
<span class="w">           </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;Unknown request:</span>
<span class="s2">                   SQUARER&quot;</span>
<span class="w">                  </span><span class="n">request</span><span class="p">))))</span>
<span class="w">  </span><span class="p">(</span><span class="n">connect</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">connect</span><span class="w"> </span><span class="n">b</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">  </span><span class="n">me</span><span class="p">)</span>
</pre></div>

<div class="code-box" markdown="1">
<details class="collapsible-code">
<summary class="code-summary"><a href="code/ex3-35.rkt">code/ex3-35.rkt</a> <span class="expand-hint">(click to expand)</span></summary>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">connector</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">connector</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">has-value?</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">connector</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">connector</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">value</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">set-value!</span><span class="w"> </span><span class="n">connector</span><span class="w"> </span>
<span class="w">                    </span><span class="n">new-value</span><span class="w"> </span>
<span class="w">                    </span><span class="n">informant</span><span class="p">)</span>
<span class="w">  </span><span class="p">((</span><span class="n">connector</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">set-value!</span><span class="p">)</span><span class="w"> </span>
<span class="w">   </span><span class="n">new-value</span><span class="w"> </span>
<span class="w">   </span><span class="n">informant</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">forget-value!</span><span class="w"> </span><span class="n">connector</span><span class="w"> </span><span class="n">retractor</span><span class="p">)</span>
<span class="w">  </span><span class="p">((</span><span class="n">connector</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">forget</span><span class="p">)</span><span class="w"> </span><span class="n">retractor</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">connect</span><span class="w"> </span><span class="n">connector</span><span class="w"> </span><span class="n">new-constraint</span><span class="p">)</span>
<span class="w">  </span><span class="p">((</span><span class="n">connector</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">connect</span><span class="p">)</span><span class="w"> </span><span class="n">new-constraint</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">adder</span><span class="w"> </span><span class="n">a1</span><span class="w"> </span><span class="n">a2</span><span class="w"> </span><span class="n">sum</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">process-new-value</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">a1</span><span class="p">)</span><span class="w"> </span>
<span class="w">                </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">a2</span><span class="p">))</span>
<span class="w">           </span><span class="p">(</span><span class="n">set-value!</span><span class="w"> </span><span class="n">sum</span>
<span class="w">                       </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">a1</span><span class="p">)</span><span class="w"> </span>
<span class="w">                          </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">a2</span><span class="p">))</span>
<span class="w">                       </span><span class="n">me</span><span class="p">))</span>
<span class="w">          </span><span class="p">((</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">a1</span><span class="p">)</span><span class="w"> </span>
<span class="w">                </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">sum</span><span class="p">))</span>
<span class="w">           </span><span class="p">(</span><span class="n">set-value!</span><span class="w"> </span><span class="n">a2</span>
<span class="w">                       </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">sum</span><span class="p">)</span><span class="w"> </span>
<span class="w">                          </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">a1</span><span class="p">))</span>
<span class="w">                       </span><span class="n">me</span><span class="p">))</span>
<span class="w">          </span><span class="p">((</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">a2</span><span class="p">)</span><span class="w"> </span>
<span class="w">                </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">sum</span><span class="p">))</span>
<span class="w">           </span><span class="p">(</span><span class="n">set-value!</span><span class="w"> </span><span class="n">a1</span>
<span class="w">                       </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">sum</span><span class="p">)</span><span class="w"> </span>
<span class="w">                          </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">a2</span><span class="p">))</span>
<span class="w">                       </span><span class="n">me</span><span class="p">))))</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">process-forget-value</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">forget-value!</span><span class="w"> </span><span class="n">sum</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">forget-value!</span><span class="w"> </span><span class="n">a1</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">forget-value!</span><span class="w"> </span><span class="n">a2</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">process-new-value</span><span class="p">))</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">me</span><span class="w"> </span><span class="n">request</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">request</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">I-have-a-value</span><span class="p">)</span>
<span class="w">           </span><span class="p">(</span><span class="n">process-new-value</span><span class="p">))</span>
<span class="w">          </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">request</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">I-lost-my-value</span><span class="p">)</span>
<span class="w">           </span><span class="p">(</span><span class="n">process-forget-value</span><span class="p">))</span>
<span class="w">          </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;Unknown request: </span>
<span class="s2">                        ADDER&quot;</span><span class="w"> </span><span class="n">request</span><span class="p">))))</span>
<span class="w">  </span><span class="p">(</span><span class="n">connect</span><span class="w"> </span><span class="n">a1</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">connect</span><span class="w"> </span><span class="n">a2</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">connect</span><span class="w"> </span><span class="n">sum</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">  </span><span class="n">me</span><span class="p">)</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">multiplier</span><span class="w"> </span><span class="n">m1</span><span class="w"> </span><span class="n">m2</span><span class="w"> </span><span class="n">product</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">process-new-value</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="k">or</span><span class="w"> </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">m1</span><span class="p">)</span>
<span class="w">                    </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">m1</span><span class="p">)</span><span class="w"> </span><span class="mi">0</span><span class="p">))</span>
<span class="w">               </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">m2</span><span class="p">)</span>
<span class="w">                    </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">m2</span><span class="p">)</span><span class="w"> </span><span class="mi">0</span><span class="p">)))</span>
<span class="w">           </span><span class="p">(</span><span class="n">set-value!</span><span class="w"> </span><span class="n">product</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="n">me</span><span class="p">))</span>
<span class="w">          </span><span class="p">((</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">m1</span><span class="p">)</span>
<span class="w">                </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">m2</span><span class="p">))</span>
<span class="w">           </span><span class="p">(</span><span class="n">set-value!</span><span class="w"> </span><span class="n">product</span>
<span class="w">                       </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">m1</span><span class="p">)</span>
<span class="w">                          </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">m2</span><span class="p">))</span>
<span class="w">                       </span><span class="n">me</span><span class="p">))</span>
<span class="w">          </span><span class="p">((</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">product</span><span class="p">)</span>
<span class="w">                </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">m1</span><span class="p">))</span>
<span class="w">           </span><span class="p">(</span><span class="n">set-value!</span><span class="w"> </span><span class="n">m2</span>
<span class="w">                       </span><span class="p">(</span><span class="nb">/</span><span class="w"> </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">product</span><span class="p">)</span>
<span class="w">                          </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">m1</span><span class="p">))</span>
<span class="w">                       </span><span class="n">me</span><span class="p">))</span>
<span class="w">          </span><span class="p">((</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">product</span><span class="p">)</span>
<span class="w">                </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">m2</span><span class="p">))</span>
<span class="w">           </span><span class="p">(</span><span class="n">set-value!</span><span class="w"> </span><span class="n">m1</span>
<span class="w">                       </span><span class="p">(</span><span class="nb">/</span><span class="w"> </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">product</span><span class="p">)</span>
<span class="w">                          </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">m2</span><span class="p">))</span>
<span class="w">                       </span><span class="n">me</span><span class="p">))))</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">process-forget-value</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">forget-value!</span><span class="w"> </span><span class="n">product</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">forget-value!</span><span class="w"> </span><span class="n">m1</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">forget-value!</span><span class="w"> </span><span class="n">m2</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">process-new-value</span><span class="p">))</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">me</span><span class="w"> </span><span class="n">request</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">request</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">I-have-a-value</span><span class="p">)</span>
<span class="w">           </span><span class="p">(</span><span class="n">process-new-value</span><span class="p">))</span>
<span class="w">          </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">request</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">I-lost-my-value</span><span class="p">)</span>
<span class="w">           </span><span class="p">(</span><span class="n">process-forget-value</span><span class="p">))</span>
<span class="w">          </span><span class="p">(</span><span class="k">else</span>
<span class="w">           </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;Unknown request:</span>
<span class="s2">                   MULTIPLIER&quot;</span>
<span class="w">                  </span><span class="n">request</span><span class="p">))))</span>
<span class="w">  </span><span class="p">(</span><span class="n">connect</span><span class="w"> </span><span class="n">m1</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">connect</span><span class="w"> </span><span class="n">m2</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">connect</span><span class="w"> </span><span class="n">product</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">  </span><span class="n">me</span><span class="p">)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">inform-about-value</span><span class="w"> </span><span class="n">constraint</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">constraint</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">I-have-a-value</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">inform-about-no-value</span><span class="w"> </span><span class="n">constraint</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">constraint</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">I-lost-my-value</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">constant</span><span class="w"> </span><span class="n">value</span><span class="w"> </span><span class="n">connector</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">me</span><span class="w"> </span><span class="n">request</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;Unknown request: CONSTANT&quot;</span>
<span class="w">           </span><span class="n">request</span><span class="p">))</span>
<span class="w">  </span><span class="p">(</span><span class="n">connect</span><span class="w"> </span><span class="n">connector</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">set-value!</span><span class="w"> </span><span class="n">connector</span><span class="w"> </span><span class="n">value</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">  </span><span class="n">me</span><span class="p">)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">probe</span><span class="w"> </span><span class="n">name</span><span class="w"> </span><span class="n">connector</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">print-probe</span><span class="w"> </span><span class="n">value</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;Probe: &quot;</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="n">name</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot; = &quot;</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="n">value</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span><span class="w"> </span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">process-new-value</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">print-probe</span><span class="w"> </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">connector</span><span class="p">)))</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">process-forget-value</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">print-probe</span><span class="w"> </span><span class="s2">&quot;?&quot;</span><span class="p">))</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">me</span><span class="w"> </span><span class="n">request</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">request</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">I-have-a-value</span><span class="p">)</span>
<span class="w">           </span><span class="p">(</span><span class="n">process-new-value</span><span class="p">))</span>
<span class="w">          </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">request</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">I-lost-my-value</span><span class="p">)</span>
<span class="w">           </span><span class="p">(</span><span class="n">process-forget-value</span><span class="p">))</span>
<span class="w">          </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;Unknown request: </span>
<span class="s2">                        PROBE&quot;</span><span class="w"> </span><span class="n">request</span><span class="p">))))</span>
<span class="w">  </span><span class="p">(</span><span class="n">connect</span><span class="w"> </span><span class="n">connector</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">  </span><span class="n">me</span><span class="p">)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-connector</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">value</span><span class="w"> </span><span class="k">false</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="n">informant</span><span class="w"> </span><span class="k">false</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="n">constraints</span><span class="w"> </span><span class="o">&#39;</span><span class="p">()))</span>
<span class="w">    </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">set-my-value</span><span class="w"> </span><span class="n">newval</span><span class="w"> </span><span class="n">setter</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">me</span><span class="p">))</span>
<span class="w">             </span><span class="p">(</span><span class="k">set!</span><span class="w"> </span><span class="n">value</span><span class="w"> </span><span class="n">newval</span><span class="p">)</span>
<span class="w">             </span><span class="p">(</span><span class="k">set!</span><span class="w"> </span><span class="n">informant</span><span class="w"> </span><span class="n">setter</span><span class="p">)</span>
<span class="w">             </span><span class="p">(</span><span class="n">for-each-except</span>
<span class="w">              </span><span class="n">setter</span>
<span class="w">              </span><span class="n">inform-about-value</span>
<span class="w">              </span><span class="n">constraints</span><span class="p">))</span>
<span class="w">            </span><span class="p">((</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="n">value</span><span class="w"> </span><span class="n">newval</span><span class="p">))</span>
<span class="w">             </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;Contradiction&quot;</span>
<span class="w">                    </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="n">value</span><span class="w"> </span><span class="n">newval</span><span class="p">)))</span>
<span class="w">            </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">ignored</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">forget-my-value</span><span class="w"> </span><span class="n">retractor</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">eq?</span><span class="w"> </span><span class="n">retractor</span><span class="w"> </span><span class="n">informant</span><span class="p">)</span>
<span class="w">          </span><span class="p">(</span><span class="k">begin</span><span class="w"> </span><span class="p">(</span><span class="k">set!</span><span class="w"> </span><span class="n">informant</span><span class="w"> </span><span class="k">false</span><span class="p">)</span>
<span class="w">                 </span><span class="p">(</span><span class="n">for-each-except</span>
<span class="w">                  </span><span class="n">retractor</span>
<span class="w">                  </span><span class="n">inform-about-no-value</span>
<span class="w">                  </span><span class="n">constraints</span><span class="p">))</span>
<span class="w">          </span><span class="o">&#39;</span><span class="ss">ignored</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">connect</span><span class="w"> </span><span class="n">new-constraint</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="nb">memq</span><span class="w"> </span><span class="n">new-constraint</span>
<span class="w">                     </span><span class="n">constraints</span><span class="p">))</span>
<span class="w">          </span><span class="p">(</span><span class="k">set!</span><span class="w"> </span><span class="n">constraints</span>
<span class="w">                </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">new-constraint</span>
<span class="w">                      </span><span class="n">constraints</span><span class="p">)))</span>
<span class="w">      </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">          </span><span class="p">(</span><span class="n">inform-about-value</span><span class="w"> </span><span class="n">new-constraint</span><span class="p">))</span>
<span class="w">      </span><span class="o">&#39;</span><span class="ss">done</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">me</span><span class="w"> </span><span class="n">request</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">request</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">has-value?</span><span class="p">)</span>
<span class="w">             </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="n">informant</span><span class="w"> </span><span class="nb">true</span><span class="w"> </span><span class="k">false</span><span class="p">))</span>
<span class="w">            </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">request</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">value</span><span class="p">)</span><span class="w"> </span><span class="n">value</span><span class="p">)</span>
<span class="w">            </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">request</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">set-value!</span><span class="p">)</span>
<span class="w">             </span><span class="n">set-my-value</span><span class="p">)</span>
<span class="w">            </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">request</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">forget</span><span class="p">)</span>
<span class="w">             </span><span class="n">forget-my-value</span><span class="p">)</span>
<span class="w">            </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">request</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">connect</span><span class="p">)</span><span class="w"> </span><span class="n">connect</span><span class="p">)</span>
<span class="w">            </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;Unknown operation:</span>
<span class="s2">                          CONNECTOR&quot;</span>
<span class="w">                         </span><span class="n">request</span><span class="p">))))</span>
<span class="w">    </span><span class="n">me</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">for-each-except</span><span class="w"> </span><span class="n">exception</span><span class="w"> </span>
<span class="w">                         </span><span class="n">procedure</span><span class="w"> </span>
<span class="w">                         </span><span class="nb">list</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">loop</span><span class="w"> </span><span class="n">items</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">null?</span><span class="w"> </span><span class="n">items</span><span class="p">)</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">done</span><span class="p">)</span>
<span class="w">          </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">items</span><span class="p">)</span><span class="w"> </span><span class="n">exception</span><span class="p">)</span><span class="w"> </span>
<span class="w">           </span><span class="p">(</span><span class="n">loop</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">items</span><span class="p">)))</span>
<span class="w">          </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="n">procedure</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">items</span><span class="p">))</span>
<span class="w">                </span><span class="p">(</span><span class="n">loop</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">items</span><span class="p">)))))</span>
<span class="w">  </span><span class="p">(</span><span class="n">loop</span><span class="w"> </span><span class="nb">list</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">square</span><span class="w"> </span><span class="n">a</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">a</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">squarer</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">process-new-value</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">b</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">&lt;</span><span class="w"> </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">b</span><span class="p">)</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span>
<span class="w">            </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;square less than 0: </span>
<span class="s2">                    SQUARER&quot;</span><span class="w"> </span>
<span class="w">                   </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">b</span><span class="p">))</span>
<span class="w">            </span><span class="p">(</span><span class="n">set-value!</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="p">(</span><span class="nb">sqrt</span><span class="w"> </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">b</span><span class="p">))</span><span class="w"> </span><span class="n">me</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">a</span><span class="p">)</span><span class="w"> </span>
<span class="w">          </span><span class="p">(</span><span class="n">set-value!</span><span class="w"> </span><span class="n">b</span><span class="w"> </span><span class="p">(</span><span class="n">square</span><span class="w"> </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">a</span><span class="p">))</span><span class="w"> </span><span class="n">me</span><span class="p">))))</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">process-forget-value</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">forget-value!</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">forget-value!</span><span class="w"> </span><span class="n">b</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">process-new-value</span><span class="p">))</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">me</span><span class="w"> </span><span class="n">request</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">request</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">I-have-a-value</span><span class="p">)</span>
<span class="w">           </span><span class="p">(</span><span class="n">process-new-value</span><span class="p">))</span>
<span class="w">          </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">request</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">I-lost-my-value</span><span class="p">)</span>
<span class="w">           </span><span class="p">(</span><span class="n">process-forget-value</span><span class="p">))</span>
<span class="w">          </span><span class="p">(</span><span class="k">else</span>
<span class="w">           </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;Unknown request:</span>
<span class="s2">                   SQUARER&quot;</span>
<span class="w">                  </span><span class="n">request</span><span class="p">))))</span>
<span class="w">  </span><span class="p">(</span><span class="n">connect</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">connect</span><span class="w"> </span><span class="n">b</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">  </span><span class="n">me</span><span class="p">)</span>



<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="p">(</span><span class="n">make-connector</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">b</span><span class="w"> </span><span class="p">(</span><span class="n">make-connector</span><span class="p">))</span>

<span class="p">(</span><span class="n">probe</span><span class="w"> </span><span class="s2">&quot;a&quot;</span><span class="w"> </span><span class="n">a</span><span class="p">)</span>
<span class="p">(</span><span class="n">probe</span><span class="w"> </span><span class="s2">&quot;b&quot;</span><span class="w"> </span><span class="n">b</span><span class="p">)</span>
<span class="p">(</span><span class="n">squarer</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="p">)</span>

<span class="p">(</span><span class="n">set-value!</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="mi">10</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">user</span><span class="p">)</span>

<span class="p">(</span><span class="n">forget-value!</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">user</span><span class="p">)</span>

<span class="p">(</span><span class="n">set-value!</span><span class="w"> </span><span class="n">b</span><span class="w"> </span><span class="mi">100</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">user</span><span class="p">)</span>
<span class="c1">;; (set-value! b 5 &#39;user)</span>
<span class="c1">;; (set-value! c 20 &#39;user)</span>
</pre></div>

</details>
<div class="code-output">
<span>Output:</span>
<pre>#&lt;procedure:...ch3/code/ex3-35.rkt:120:2&gt;
#&lt;procedure:...ch3/code/ex3-35.rkt:120:2&gt;
#&lt;procedure:...ch3/code/ex3-35.rkt:203:2&gt;
Probe: b = 100
Probe: a = 10
done
Probe: b = ?
Probe: a = ?
done
Probe: a = 10
Probe: b = 100
done
</pre>
</div>
</div>


#### Exercise 3.36

Suppose we evaluate the following
sequence of expressions in the global environment:

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="p">(</span><span class="n">make-connector</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">b</span><span class="w"> </span><span class="p">(</span><span class="n">make-connector</span><span class="p">))</span>
<span class="p">(</span><span class="n">set-value!</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="mi">10</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">user</span><span class="p">)</span>
</pre></div>

At some time during evaluation of the `set-value!`, the following
expression from the connector's local procedure is evaluated:

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="n">for-each-except</span><span class="w"> </span>
<span class="w">  </span><span class="n">setter</span><span class="w"> </span><span class="n">inform-about-value</span><span class="w"> </span><span class="n">constraints</span><span class="p">)</span>
</pre></div>

Draw an environment diagram showing the environment in which the above
expression is evaluated.

##### Solution

<div style="text-align: center; margin: 20px 0;">
  <img src="img/ex3-36.svg" style="width: 70%; max-width: 800px;" alt="A box-and-pointer diagram, what do you want?">
</div>

#### Exercise 3.37

The
`celsius-fahrenheit-converter` procedure is cumbersome when compared with
a more expression-oriented style of definition, such as

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">celsius-fahrenheit-converter</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">c+</span><span class="w"> </span><span class="p">(</span><span class="n">c*</span><span class="w"> </span><span class="p">(</span><span class="n">c/</span><span class="w"> </span><span class="p">(</span><span class="n">cv</span><span class="w"> </span><span class="mi">9</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">cv</span><span class="w"> </span><span class="mi">5</span><span class="p">))</span>
<span class="w">          </span><span class="n">x</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="n">cv</span><span class="w"> </span><span class="mi">32</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">C</span><span class="w"> </span><span class="p">(</span><span class="n">make-connector</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">F</span><span class="w"> </span><span class="p">(</span><span class="n">celsius-fahrenheit-converter</span><span class="w"> </span><span class="n">C</span><span class="p">))</span>
</pre></div>

Here `c+`, `c*`, etc. are the ``constraint'' versions of the
arithmetic operations.  For example, `c+` takes two connectors as
arguments and returns a connector that is related to these by an adder
constraint:

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">c+</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">y</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">z</span><span class="w"> </span><span class="p">(</span><span class="n">make-connector</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">adder</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">y</span><span class="w"> </span><span class="n">z</span><span class="p">)</span>
<span class="w">    </span><span class="n">z</span><span class="p">))</span>
</pre></div>

Define analogous procedures `c-`, `c*`, `c/`, and `cv`
(constant value) that enable us to define compound constraints as in the
converter example above.

##### Solution

<div class="code-box" markdown="1">
<details class="collapsible-code">
<summary class="code-summary"><a href="code/ex3-37.rkt">code/ex3-37.rkt</a> <span class="expand-hint">(click to expand)</span></summary>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">connector</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">connector</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">has-value?</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">connector</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">connector</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">value</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">set-value!</span><span class="w"> </span><span class="n">connector</span><span class="w"> </span>
<span class="w">                    </span><span class="n">new-value</span><span class="w"> </span>
<span class="w">                    </span><span class="n">informant</span><span class="p">)</span>
<span class="w">  </span><span class="p">((</span><span class="n">connector</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">set-value!</span><span class="p">)</span><span class="w"> </span>
<span class="w">   </span><span class="n">new-value</span><span class="w"> </span>
<span class="w">   </span><span class="n">informant</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">forget-value!</span><span class="w"> </span><span class="n">connector</span><span class="w"> </span><span class="n">retractor</span><span class="p">)</span>
<span class="w">  </span><span class="p">((</span><span class="n">connector</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">forget</span><span class="p">)</span><span class="w"> </span><span class="n">retractor</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">connect</span><span class="w"> </span><span class="n">connector</span><span class="w"> </span><span class="n">new-constraint</span><span class="p">)</span>
<span class="w">  </span><span class="p">((</span><span class="n">connector</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">connect</span><span class="p">)</span><span class="w"> </span><span class="n">new-constraint</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">adder</span><span class="w"> </span><span class="n">a1</span><span class="w"> </span><span class="n">a2</span><span class="w"> </span><span class="n">sum</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">process-new-value</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">a1</span><span class="p">)</span><span class="w"> </span>
<span class="w">                </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">a2</span><span class="p">))</span>
<span class="w">           </span><span class="p">(</span><span class="n">set-value!</span><span class="w"> </span><span class="n">sum</span>
<span class="w">                       </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">a1</span><span class="p">)</span><span class="w"> </span>
<span class="w">                          </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">a2</span><span class="p">))</span>
<span class="w">                       </span><span class="n">me</span><span class="p">))</span>
<span class="w">          </span><span class="p">((</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">a1</span><span class="p">)</span><span class="w"> </span>
<span class="w">                </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">sum</span><span class="p">))</span>
<span class="w">           </span><span class="p">(</span><span class="n">set-value!</span><span class="w"> </span><span class="n">a2</span>
<span class="w">                       </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">sum</span><span class="p">)</span><span class="w"> </span>
<span class="w">                          </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">a1</span><span class="p">))</span>
<span class="w">                       </span><span class="n">me</span><span class="p">))</span>
<span class="w">          </span><span class="p">((</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">a2</span><span class="p">)</span><span class="w"> </span>
<span class="w">                </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">sum</span><span class="p">))</span>
<span class="w">           </span><span class="p">(</span><span class="n">set-value!</span><span class="w"> </span><span class="n">a1</span>
<span class="w">                       </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">sum</span><span class="p">)</span><span class="w"> </span>
<span class="w">                          </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">a2</span><span class="p">))</span>
<span class="w">                       </span><span class="n">me</span><span class="p">))))</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">process-forget-value</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">forget-value!</span><span class="w"> </span><span class="n">sum</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">forget-value!</span><span class="w"> </span><span class="n">a1</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">forget-value!</span><span class="w"> </span><span class="n">a2</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">process-new-value</span><span class="p">))</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">me</span><span class="w"> </span><span class="n">request</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">request</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">I-have-a-value</span><span class="p">)</span>
<span class="w">           </span><span class="p">(</span><span class="n">process-new-value</span><span class="p">))</span>
<span class="w">          </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">request</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">I-lost-my-value</span><span class="p">)</span>
<span class="w">           </span><span class="p">(</span><span class="n">process-forget-value</span><span class="p">))</span>
<span class="w">          </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;Unknown request: </span>
<span class="s2">                        ADDER&quot;</span><span class="w"> </span><span class="n">request</span><span class="p">))))</span>
<span class="w">  </span><span class="p">(</span><span class="n">connect</span><span class="w"> </span><span class="n">a1</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">connect</span><span class="w"> </span><span class="n">a2</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">connect</span><span class="w"> </span><span class="n">sum</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">  </span><span class="n">me</span><span class="p">)</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">multiplier</span><span class="w"> </span><span class="n">m1</span><span class="w"> </span><span class="n">m2</span><span class="w"> </span><span class="n">product</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">process-new-value</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="k">or</span><span class="w"> </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">m1</span><span class="p">)</span>
<span class="w">                    </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">m1</span><span class="p">)</span><span class="w"> </span><span class="mi">0</span><span class="p">))</span>
<span class="w">               </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">m2</span><span class="p">)</span>
<span class="w">                    </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">m2</span><span class="p">)</span><span class="w"> </span><span class="mi">0</span><span class="p">)))</span>
<span class="w">           </span><span class="p">(</span><span class="n">set-value!</span><span class="w"> </span><span class="n">product</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="n">me</span><span class="p">))</span>
<span class="w">          </span><span class="p">((</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">m1</span><span class="p">)</span>
<span class="w">                </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">m2</span><span class="p">))</span>
<span class="w">           </span><span class="p">(</span><span class="n">set-value!</span><span class="w"> </span><span class="n">product</span>
<span class="w">                       </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">m1</span><span class="p">)</span>
<span class="w">                          </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">m2</span><span class="p">))</span>
<span class="w">                       </span><span class="n">me</span><span class="p">))</span>
<span class="w">          </span><span class="p">((</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">product</span><span class="p">)</span>
<span class="w">                </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">m1</span><span class="p">))</span>
<span class="w">           </span><span class="p">(</span><span class="n">set-value!</span><span class="w"> </span><span class="n">m2</span>
<span class="w">                       </span><span class="p">(</span><span class="nb">/</span><span class="w"> </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">product</span><span class="p">)</span>
<span class="w">                          </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">m1</span><span class="p">))</span>
<span class="w">                       </span><span class="n">me</span><span class="p">))</span>
<span class="w">          </span><span class="p">((</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">product</span><span class="p">)</span>
<span class="w">                </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">m2</span><span class="p">))</span>
<span class="w">           </span><span class="p">(</span><span class="n">set-value!</span><span class="w"> </span><span class="n">m1</span>
<span class="w">                       </span><span class="p">(</span><span class="nb">/</span><span class="w"> </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">product</span><span class="p">)</span>
<span class="w">                          </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">m2</span><span class="p">))</span>
<span class="w">                       </span><span class="n">me</span><span class="p">))))</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">process-forget-value</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">forget-value!</span><span class="w"> </span><span class="n">product</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">forget-value!</span><span class="w"> </span><span class="n">m1</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">forget-value!</span><span class="w"> </span><span class="n">m2</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">process-new-value</span><span class="p">))</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">me</span><span class="w"> </span><span class="n">request</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">request</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">I-have-a-value</span><span class="p">)</span>
<span class="w">           </span><span class="p">(</span><span class="n">process-new-value</span><span class="p">))</span>
<span class="w">          </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">request</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">I-lost-my-value</span><span class="p">)</span>
<span class="w">           </span><span class="p">(</span><span class="n">process-forget-value</span><span class="p">))</span>
<span class="w">          </span><span class="p">(</span><span class="k">else</span>
<span class="w">           </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;Unknown request:</span>
<span class="s2">                   MULTIPLIER&quot;</span>
<span class="w">                  </span><span class="n">request</span><span class="p">))))</span>
<span class="w">  </span><span class="p">(</span><span class="n">connect</span><span class="w"> </span><span class="n">m1</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">connect</span><span class="w"> </span><span class="n">m2</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">connect</span><span class="w"> </span><span class="n">product</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">  </span><span class="n">me</span><span class="p">)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">inform-about-value</span><span class="w"> </span><span class="n">constraint</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">constraint</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">I-have-a-value</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">inform-about-no-value</span><span class="w"> </span><span class="n">constraint</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">constraint</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">I-lost-my-value</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">constant</span><span class="w"> </span><span class="n">value</span><span class="w"> </span><span class="n">connector</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">me</span><span class="w"> </span><span class="n">request</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;Unknown request: CONSTANT&quot;</span>
<span class="w">           </span><span class="n">request</span><span class="p">))</span>
<span class="w">  </span><span class="p">(</span><span class="n">connect</span><span class="w"> </span><span class="n">connector</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">set-value!</span><span class="w"> </span><span class="n">connector</span><span class="w"> </span><span class="n">value</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">  </span><span class="n">me</span><span class="p">)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">probe</span><span class="w"> </span><span class="n">name</span><span class="w"> </span><span class="n">connector</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">print-probe</span><span class="w"> </span><span class="n">value</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot;Probe: &quot;</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="n">name</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">&quot; = &quot;</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="n">value</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span><span class="w"> </span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">process-new-value</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">print-probe</span><span class="w"> </span><span class="p">(</span><span class="n">get-value</span><span class="w"> </span><span class="n">connector</span><span class="p">)))</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">process-forget-value</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">print-probe</span><span class="w"> </span><span class="s2">&quot;?&quot;</span><span class="p">))</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">me</span><span class="w"> </span><span class="n">request</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">request</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">I-have-a-value</span><span class="p">)</span>
<span class="w">           </span><span class="p">(</span><span class="n">process-new-value</span><span class="p">))</span>
<span class="w">          </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">request</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">I-lost-my-value</span><span class="p">)</span>
<span class="w">           </span><span class="p">(</span><span class="n">process-forget-value</span><span class="p">))</span>
<span class="w">          </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;Unknown request: </span>
<span class="s2">                        PROBE&quot;</span><span class="w"> </span><span class="n">request</span><span class="p">))))</span>
<span class="w">  </span><span class="p">(</span><span class="n">connect</span><span class="w"> </span><span class="n">connector</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">  </span><span class="n">me</span><span class="p">)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-connector</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">value</span><span class="w"> </span><span class="k">false</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="n">informant</span><span class="w"> </span><span class="k">false</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="n">constraints</span><span class="w"> </span><span class="o">&#39;</span><span class="p">()))</span>
<span class="w">    </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">set-my-value</span><span class="w"> </span><span class="n">newval</span><span class="w"> </span><span class="n">setter</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">me</span><span class="p">))</span>
<span class="w">             </span><span class="p">(</span><span class="k">set!</span><span class="w"> </span><span class="n">value</span><span class="w"> </span><span class="n">newval</span><span class="p">)</span>
<span class="w">             </span><span class="p">(</span><span class="k">set!</span><span class="w"> </span><span class="n">informant</span><span class="w"> </span><span class="n">setter</span><span class="p">)</span>
<span class="w">             </span><span class="p">(</span><span class="n">for-each-except</span>
<span class="w">              </span><span class="n">setter</span>
<span class="w">              </span><span class="n">inform-about-value</span>
<span class="w">              </span><span class="n">constraints</span><span class="p">))</span>
<span class="w">            </span><span class="p">((</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="n">value</span><span class="w"> </span><span class="n">newval</span><span class="p">))</span>
<span class="w">             </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;Contradiction&quot;</span>
<span class="w">                    </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="n">value</span><span class="w"> </span><span class="n">newval</span><span class="p">)))</span>
<span class="w">            </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">ignored</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">forget-my-value</span><span class="w"> </span><span class="n">retractor</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">eq?</span><span class="w"> </span><span class="n">retractor</span><span class="w"> </span><span class="n">informant</span><span class="p">)</span>
<span class="w">          </span><span class="p">(</span><span class="k">begin</span><span class="w"> </span><span class="p">(</span><span class="k">set!</span><span class="w"> </span><span class="n">informant</span><span class="w"> </span><span class="k">false</span><span class="p">)</span>
<span class="w">                 </span><span class="p">(</span><span class="n">for-each-except</span>
<span class="w">                  </span><span class="n">retractor</span>
<span class="w">                  </span><span class="n">inform-about-no-value</span>
<span class="w">                  </span><span class="n">constraints</span><span class="p">))</span>
<span class="w">          </span><span class="o">&#39;</span><span class="ss">ignored</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">connect</span><span class="w"> </span><span class="n">new-constraint</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="nb">memq</span><span class="w"> </span><span class="n">new-constraint</span>
<span class="w">                     </span><span class="n">constraints</span><span class="p">))</span>
<span class="w">          </span><span class="p">(</span><span class="k">set!</span><span class="w"> </span><span class="n">constraints</span>
<span class="w">                </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">new-constraint</span>
<span class="w">                      </span><span class="n">constraints</span><span class="p">)))</span>
<span class="w">      </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">has-value?</span><span class="w"> </span><span class="n">me</span><span class="p">)</span>
<span class="w">          </span><span class="p">(</span><span class="n">inform-about-value</span><span class="w"> </span><span class="n">new-constraint</span><span class="p">))</span>
<span class="w">      </span><span class="o">&#39;</span><span class="ss">done</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">me</span><span class="w"> </span><span class="n">request</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">request</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">has-value?</span><span class="p">)</span>
<span class="w">             </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="n">informant</span><span class="w"> </span><span class="nb">true</span><span class="w"> </span><span class="k">false</span><span class="p">))</span>
<span class="w">            </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">request</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">value</span><span class="p">)</span><span class="w"> </span><span class="n">value</span><span class="p">)</span>
<span class="w">            </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">request</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">set-value!</span><span class="p">)</span>
<span class="w">             </span><span class="n">set-my-value</span><span class="p">)</span>
<span class="w">            </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">request</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">forget</span><span class="p">)</span>
<span class="w">             </span><span class="n">forget-my-value</span><span class="p">)</span>
<span class="w">            </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">request</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">connect</span><span class="p">)</span><span class="w"> </span><span class="n">connect</span><span class="p">)</span>
<span class="w">            </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;Unknown operation:</span>
<span class="s2">                          CONNECTOR&quot;</span>
<span class="w">                         </span><span class="n">request</span><span class="p">))))</span>
<span class="w">    </span><span class="n">me</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">for-each-except</span><span class="w"> </span><span class="n">exception</span><span class="w"> </span>
<span class="w">                         </span><span class="n">procedure</span><span class="w"> </span>
<span class="w">                         </span><span class="nb">list</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">loop</span><span class="w"> </span><span class="n">items</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">null?</span><span class="w"> </span><span class="n">items</span><span class="p">)</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">done</span><span class="p">)</span>
<span class="w">          </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">items</span><span class="p">)</span><span class="w"> </span><span class="n">exception</span><span class="p">)</span><span class="w"> </span>
<span class="w">           </span><span class="p">(</span><span class="n">loop</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">items</span><span class="p">)))</span>
<span class="w">          </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="n">procedure</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">items</span><span class="p">))</span>
<span class="w">                </span><span class="p">(</span><span class="n">loop</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">items</span><span class="p">)))))</span>
<span class="w">  </span><span class="p">(</span><span class="n">loop</span><span class="w"> </span><span class="nb">list</span><span class="p">))</span>


<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">c+</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">y</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">z</span><span class="w"> </span><span class="p">(</span><span class="n">make-connector</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">adder</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">y</span><span class="w"> </span><span class="n">z</span><span class="p">)</span>
<span class="w">    </span><span class="n">z</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">c*</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">y</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">z</span><span class="w"> </span><span class="p">(</span><span class="n">make-connector</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">multiplier</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">y</span><span class="w"> </span><span class="n">z</span><span class="p">)</span>
<span class="w">    </span><span class="n">z</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">cv</span><span class="w"> </span><span class="n">value</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">x</span><span class="w"> </span><span class="p">(</span><span class="n">make-connector</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">constant</span><span class="w"> </span><span class="n">value</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">    </span><span class="n">x</span><span class="p">))</span>

<span class="c1">; returned connector z should have z == x/y, so y*z==x</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">c/</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">y</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">z</span><span class="w"> </span><span class="p">(</span><span class="n">make-connector</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="n">multiplier</span><span class="w"> </span><span class="n">y</span><span class="w"> </span><span class="n">z</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">    </span><span class="n">z</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">celsius-fahrenheit-converter</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">c+</span><span class="w"> </span><span class="p">(</span><span class="n">c*</span><span class="w"> </span><span class="p">(</span><span class="n">c/</span><span class="w"> </span><span class="p">(</span><span class="n">cv</span><span class="w"> </span><span class="mi">9</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">cv</span><span class="w"> </span><span class="mi">5</span><span class="p">))</span>
<span class="w">          </span><span class="n">x</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="n">cv</span><span class="w"> </span><span class="mi">32</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">C</span><span class="w"> </span><span class="p">(</span><span class="n">make-connector</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">F</span><span class="w"> </span><span class="p">(</span><span class="n">celsius-fahrenheit-converter</span><span class="w"> </span><span class="n">C</span><span class="p">))</span>

<span class="p">(</span><span class="n">probe</span><span class="w"> </span><span class="s2">&quot;Celsius temp&quot;</span><span class="w"> </span><span class="n">C</span><span class="p">)</span>
<span class="p">(</span><span class="n">probe</span><span class="w"> </span><span class="s2">&quot;Fahrenheit temp&quot;</span><span class="w"> </span><span class="n">F</span><span class="p">)</span>
<span class="p">(</span><span class="n">set-value!</span><span class="w"> </span><span class="n">C</span><span class="w"> </span><span class="mi">25</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">user</span><span class="p">)</span>
<span class="c1">;; Probe: Celsius temp = 25</span>
<span class="c1">;; Probe: Fahrenheit temp = 77</span>
<span class="c1">;; done</span>

<span class="c1">; (set-value! F 212 &#39;user)</span>
<span class="c1">;; Error! Contradiction (77 212)</span>

<span class="p">(</span><span class="n">forget-value!</span><span class="w"> </span><span class="n">C</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">user</span><span class="p">)</span>
<span class="c1">;; Probe: Celsius temp = ?</span>
<span class="c1">;; Probe: Fahrenheit temp = ?</span>
<span class="c1">;; done</span>


<span class="p">(</span><span class="n">set-value!</span><span class="w"> </span><span class="n">F</span><span class="w"> </span><span class="mi">212</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">user</span><span class="p">)</span>
<span class="c1">;; Probe: Fahrenheit temp = 212</span>
<span class="c1">;; Probe: Celsius temp = 100</span>
<span class="c1">;; done</span>
</pre></div>

</details>
<div class="code-output">
<span>Output:</span>
<pre>#&lt;procedure:...ch3/code/ex3-37.rkt:120:2&gt;
#&lt;procedure:...ch3/code/ex3-37.rkt:120:2&gt;
Probe: Celsius temp = 25
Probe: Fahrenheit temp = 77
done
Probe: Celsius temp = ?
Probe: Fahrenheit temp = ?
done
Probe: Fahrenheit temp = 212
Probe: Celsius temp = 100
done
</pre>
</div>
</div>


---
layout: book
render_with_liquid: false
show_title: false
title: 02 Connection with Logic Programming (cf. SICP 4.4)
---

<h1 id="02-sicp-logic" style="border-bottom: none;">02 Connection with Logic Programming (cf. SICP 4.4)</h1>

<nav class="nav">
    <span class="activenav"><a href="01-megillch2.html">← Previous</a></span>
    <span class="activenav"><a href="index.html">↑ Up</a></span>
    <span class="activenav"><a href="03-interpreter.html">Next →</a></span>
</nav>


Note: This is a bonus section! If you don't understand Lisp and don't care about SICP ch4-4 it might be greek.

In this notes section, my goal is to understand automatic proof discovery
and certificate generation using the logic programming of SICP ch4-4.

This is not as exciting as it sounds,
SICP ch4-4 is really about expanding your consciousness to think about what 
you can do with computer languages and architectures. It's not about making some
super sophisticated superpowered algorithm that churns out proofs. But there
are some analogies and correspondences that I want to understand, namely (using Metamath ch2 as an example problem)...

- In the query system, without changing the code, how do we encode the axioms so we can simply do a query for `'(|- t = t)`?
- As statements grow larger, what's the algorithmic complexity for searching for such a statement?
- In parsing a Metamath proof, I'm told that the unification algorithm used is much simpler than that in SICP 4-4. In doing our "automated proof discovery", do we use the full power of the SICP 4-4 unification algorithm? 
- Is there a way to write our query such that the SICP ch4-4 code basically just does the straightforward parsing of a metamath proof?

Next, modifying the code...

- Once the query system has found `(|- t = t)`, how can we get it to print out the Metamath proof?
- How do we turn the algorithm on its head, and enumerate valid axioms? Do we just add in a maximum stack size of something and search for `(|- . ?x)`? 

And finally...
- How do we implement a metamath kernel in Lean?

## Reviewing SICP 4-4

Remembering how streams work


<div class="code-box"><details class="collapsible-code"><summary class="code-summary"><span><a href="code/sicp44-1.rkt">sicp44-1.rkt</a></span><span class="expand-hint">(click to expand)</span></summary><div class="codehilite" data-language="racket"><pre><code><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="k">stream</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">force</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">singleton-stream</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">the-empty-stream</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">integers-starting-from</span><span class="w"> </span><span class="n">n</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="p">(</span><span class="n">integers-starting-from</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-ref</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">n</span><span class="p">)</span><span class="w"> </span>
<span class="w">        </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">&lt;=</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span>
<span class="w">            </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">            </span><span class="p">(</span><span class="nb">stream-ref</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">))))</span>


<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">      </span><span class="n">the-empty-stream</span>
<span class="w">      </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="p">(</span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">))</span>
<span class="w">                   </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-filter</span><span class="w"> </span><span class="n">pred</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="n">stream-null?</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="n">the-empty-stream</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="n">pred</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">))</span>
<span class="w">         </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">                      </span><span class="p">(</span><span class="nb">stream-filter</span><span class="w"> </span><span class="n">pred</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">))))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span>
<span class="w">         </span><span class="p">(</span><span class="nb">stream-filter</span><span class="w"> </span><span class="n">pred</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">integers</span><span class="w"> </span><span class="p">(</span><span class="n">integers-starting-from</span><span class="w"> </span><span class="mi">1</span><span class="p">))</span>

<span class="p">(</span><span class="nb">stream-ref</span><span class="w"> </span><span class="n">integers</span><span class="w"> </span><span class="mi">9</span><span class="p">)</span>
<span class="c1">;; 10</span>

<span class="p">(</span><span class="nb">stream-ref</span>
<span class="w"> </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">x</span><span class="p">))</span><span class="w"> </span><span class="n">integers</span><span class="p">)</span>
<span class="w"> </span><span class="mi">4</span><span class="p">)</span>
<span class="c1">;; 25</span>

<span class="p">(</span><span class="nb">stream-ref</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-filter</span><span class="w"> </span><span class="nb">even?</span><span class="w"> </span><span class="n">integers</span><span class="p">)</span><span class="w"> </span><span class="mi">4</span><span class="p">)</span>
<span class="c1">;; 10</span>

<span class="p">(</span><span class="n">stream-null?</span>
<span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="w">              </span><span class="p">(</span><span class="n">singleton-stream</span><span class="w"> </span><span class="mi">3</span><span class="p">))))</span>
<span class="c1">;; #t</span>

<span class="p">(</span><span class="n">stream-null?</span>
<span class="w"> </span><span class="p">(</span><span class="nb">stream-filter</span><span class="w"> </span><span class="nb">even?</span><span class="w"> </span><span class="p">(</span><span class="n">singleton-stream</span><span class="w"> </span><span class="mi">3</span><span class="p">)))</span>
<span class="c1">;; #t</span>
</code></pre></div>
</details><div class="code-output"><span>Output:</span><pre>10
25
10
#t
#t
</pre></div></div>


Remembering how frames work


<div class="code-box"><details class="collapsible-code"><summary class="code-summary"><span><a href="code/sicp44-2.rkt">sicp44-2.rkt</a></span><span class="expand-hint">(click to expand)</span></summary><div class="codehilite" data-language="racket"><pre><code><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="k">stream</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">force</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">singleton-stream</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">the-empty-stream</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">      </span><span class="n">the-empty-stream</span>
<span class="w">      </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="p">(</span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">))</span>
<span class="w">                   </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-ref</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">n</span><span class="p">)</span><span class="w"> </span>
<span class="w">        </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">&lt;=</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span>
<span class="w">            </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">            </span><span class="p">(</span><span class="nb">stream-ref</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-binding</span><span class="w"> </span><span class="n">variable</span><span class="w"> </span><span class="n">value</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">variable</span><span class="w"> </span><span class="n">value</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">binding-variable</span><span class="w"> </span><span class="n">binding</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">binding</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">binding-value</span><span class="w"> </span><span class="n">binding</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">binding</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">binding-in-frame</span><span class="w"> </span><span class="n">variable</span><span class="w"> </span><span class="n">frame</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">assoc</span><span class="w"> </span><span class="n">variable</span><span class="w"> </span><span class="n">frame</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">extend</span><span class="w"> </span><span class="n">variable</span><span class="w"> </span><span class="n">value</span><span class="w"> </span><span class="n">frame</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="p">(</span><span class="n">make-binding</span><span class="w"> </span><span class="n">variable</span><span class="w"> </span><span class="n">value</span><span class="p">)</span><span class="w"> </span><span class="n">frame</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">tagged-list?</span><span class="w"> </span><span class="nb">exp</span><span class="w"> </span><span class="k">tag</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">pair?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">eq?</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="k">tag</span><span class="p">)</span><span class="w"> </span><span class="k">false</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">var?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">tagged-list?</span><span class="w"> </span><span class="nb">exp</span><span class="w"> </span><span class="o">'</span><span class="ss">?</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">err-on-unbound</span><span class="w"> </span><span class="n">variable</span><span class="w"> </span><span class="n">frame</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">"Variable "</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="n">variable</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">" is unbound in frame "</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="n">frame</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">"</span><span class="se">\n</span><span class="s2">"</span><span class="p">)</span>
<span class="w">  </span><span class="k">false</span><span class="p">)</span>


<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">frame</span>
<span class="w">  </span><span class="p">(</span><span class="n">extend</span><span class="w"> </span><span class="o">'</span><span class="p">(</span><span class="ss">?</span><span class="w"> </span><span class="ss">x</span><span class="p">)</span><span class="w"> </span><span class="o">'</span><span class="p">(</span><span class="ss">?</span><span class="w"> </span><span class="ss">y</span><span class="p">)</span>
<span class="w">          </span><span class="p">(</span><span class="n">extend</span><span class="w"> </span><span class="o">'</span><span class="p">(</span><span class="ss">?</span><span class="w"> </span><span class="ss">y</span><span class="p">)</span><span class="w"> </span><span class="o">'</span><span class="p">(</span><span class="ss">a</span><span class="w"> </span><span class="ss">b</span><span class="p">)</span><span class="w"> </span><span class="o">'</span><span class="p">())))</span>

<span class="p">(</span><span class="n">binding-in-frame</span><span class="w"> </span><span class="o">'</span><span class="p">(</span><span class="ss">?</span><span class="w"> </span><span class="ss">y</span><span class="p">)</span><span class="w"> </span><span class="n">frame</span><span class="p">)</span>
<span class="c1">;; ((? y) a b)</span>

<span class="c1">; Apply the substitutions in "frame" to "expression". This is a bit like</span>
<span class="c1">; the Mathematica "ReplaceRepeated" or "//." operation.</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="k">instantiate</span><span class="w"> </span><span class="nb">exp</span><span class="w"> </span><span class="n">frame</span><span class="w"> </span><span class="n">unbound-var-handler</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="n">var?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span>
<span class="w">         </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">res</span><span class="w"> </span><span class="p">(</span><span class="nb">assoc</span><span class="w"> </span><span class="nb">exp</span><span class="w"> </span><span class="n">frame</span><span class="p">)))</span>
<span class="w">              </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="n">res</span><span class="w"> </span>
<span class="w">                </span><span class="p">(</span><span class="k">instantiate</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">res</span><span class="p">)</span><span class="w"> </span><span class="n">frame</span><span class="w"> </span><span class="n">unbound-var-handler</span><span class="p">)</span>
<span class="w">                </span><span class="p">(</span><span class="n">unbound-var-handler</span><span class="w"> </span><span class="nb">exp</span><span class="w"> </span><span class="n">frame</span><span class="p">))))</span>
<span class="w">        </span><span class="p">((</span><span class="nb">pair?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span>
<span class="w">         </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span>
<span class="w">           </span><span class="p">(</span><span class="k">instantiate</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="n">frame</span><span class="w"> </span><span class="n">unbound-var-handler</span><span class="p">)</span>
<span class="w">           </span><span class="p">(</span><span class="k">instantiate</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="n">frame</span><span class="w"> </span><span class="n">unbound-var-handler</span><span class="p">)))</span>
<span class="w">         </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="nb">exp</span><span class="p">)))</span>

<span class="p">(</span><span class="k">instantiate</span><span class="w"> </span><span class="o">'</span><span class="p">(</span><span class="ss">p</span><span class="w"> </span><span class="p">(</span><span class="ss">?</span><span class="w"> </span><span class="ss">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">?</span><span class="w"> </span><span class="ss">missing</span><span class="p">))</span>
<span class="w">             </span><span class="n">frame</span>
<span class="w">             </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">v</span><span class="w"> </span><span class="n">f</span><span class="p">)</span><span class="w"> </span><span class="n">v</span><span class="p">))</span>
<span class="c1">;; (p (a b) (? missing))</span>


<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">frames</span>
<span class="w">  </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="n">frame</span>
<span class="w">               </span><span class="p">(</span><span class="n">singleton-stream</span>
<span class="w">                </span><span class="p">(</span><span class="n">extend</span><span class="w"> </span><span class="o">'</span><span class="p">(</span><span class="ss">?</span><span class="w"> </span><span class="ss">x</span><span class="p">)</span><span class="w"> </span><span class="o">'</span><span class="ss">c</span><span class="w"> </span><span class="o">'</span><span class="p">()))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">answers</span>
<span class="w">  </span><span class="p">(</span><span class="nb">stream-map</span>
<span class="w">   </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">f</span><span class="p">)</span>
<span class="w">     </span><span class="p">(</span><span class="k">instantiate</span><span class="w"> </span><span class="o">'</span><span class="p">(</span><span class="ss">p</span><span class="w"> </span><span class="p">(</span><span class="ss">?</span><span class="w"> </span><span class="ss">x</span><span class="p">))</span><span class="w"> </span><span class="n">f</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">v</span><span class="w"> </span><span class="n">f</span><span class="p">)</span><span class="w"> </span><span class="n">v</span><span class="p">)))</span>
<span class="w">   </span><span class="n">frames</span><span class="p">))</span>

<span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-ref</span><span class="w"> </span><span class="n">answers</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="nb">stream-ref</span><span class="w"> </span><span class="n">answers</span><span class="w"> </span><span class="mi">1</span><span class="p">))</span>
<span class="c1">;; ((p (a b)) (p c))</span>
</code></pre></div>
</details><div class="code-output"><span>Output:</span><pre>((? y) a b)
(p (a b) (? missing))
((p (a b)) (p c))
</pre></div></div>


Remembering the pattern match algo


<div class="code-box"><details class="collapsible-code"><summary class="code-summary"><span><a href="code/sicp44-3.rkt">sicp44-3.rkt</a></span><span class="expand-hint">(click to expand)</span></summary><div class="codehilite" data-language="racket"><pre><code><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="k">stream</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">force</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">singleton-stream</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">the-empty-stream</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">      </span><span class="n">the-empty-stream</span>
<span class="w">      </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="p">(</span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">))</span>
<span class="w">                   </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-ref</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">n</span><span class="p">)</span><span class="w"> </span>
<span class="w">        </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">&lt;=</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span>
<span class="w">            </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">            </span><span class="p">(</span><span class="nb">stream-ref</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-binding</span><span class="w"> </span><span class="n">variable</span><span class="w"> </span><span class="n">value</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">variable</span><span class="w"> </span><span class="n">value</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">binding-variable</span><span class="w"> </span><span class="n">binding</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">binding</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">binding-value</span><span class="w"> </span><span class="n">binding</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">binding</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">binding-in-frame</span><span class="w"> </span><span class="n">variable</span><span class="w"> </span><span class="n">frame</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">assoc</span><span class="w"> </span><span class="n">variable</span><span class="w"> </span><span class="n">frame</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">extend</span><span class="w"> </span><span class="n">variable</span><span class="w"> </span><span class="n">value</span><span class="w"> </span><span class="n">frame</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="p">(</span><span class="n">make-binding</span><span class="w"> </span><span class="n">variable</span><span class="w"> </span><span class="n">value</span><span class="p">)</span><span class="w"> </span><span class="n">frame</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">tagged-list?</span><span class="w"> </span><span class="nb">exp</span><span class="w"> </span><span class="k">tag</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">pair?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">eq?</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="k">tag</span><span class="p">)</span><span class="w"> </span><span class="k">false</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">var?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">tagged-list?</span><span class="w"> </span><span class="nb">exp</span><span class="w"> </span><span class="o">'</span><span class="ss">?</span><span class="p">))</span>

<span class="c1">; Apply the substitutions in "frame" to "expression". This is a bit like</span>
<span class="c1">; the Mathematica "ReplaceRepeated" or "//." operation.</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="k">instantiate</span><span class="w"> </span><span class="nb">exp</span><span class="w"> </span><span class="n">frame</span><span class="w"> </span><span class="n">unbound-var-handler</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="n">var?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span>
<span class="w">         </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">res</span><span class="w"> </span><span class="p">(</span><span class="nb">assoc</span><span class="w"> </span><span class="nb">exp</span><span class="w"> </span><span class="n">frame</span><span class="p">)))</span>
<span class="w">              </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="n">res</span><span class="w"> </span>
<span class="w">                </span><span class="p">(</span><span class="k">instantiate</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">res</span><span class="p">)</span><span class="w"> </span><span class="n">frame</span><span class="w"> </span><span class="n">unbound-var-handler</span><span class="p">)</span>
<span class="w">                </span><span class="p">(</span><span class="n">unbound-var-handler</span><span class="w"> </span><span class="nb">exp</span><span class="w"> </span><span class="n">frame</span><span class="p">))))</span>
<span class="w">        </span><span class="p">((</span><span class="nb">pair?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span>
<span class="w">         </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span>
<span class="w">           </span><span class="p">(</span><span class="k">instantiate</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="n">frame</span><span class="w"> </span><span class="n">unbound-var-handler</span><span class="p">)</span>
<span class="w">           </span><span class="p">(</span><span class="k">instantiate</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="n">frame</span><span class="w"> </span><span class="n">unbound-var-handler</span><span class="p">)))</span>
<span class="w">         </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="nb">exp</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">extend-if-consistent</span><span class="w"> </span><span class="n">var</span><span class="w"> </span><span class="n">dat</span><span class="w"> </span><span class="n">frame</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">l</span><span class="w"> </span><span class="p">(</span><span class="nb">assoc</span><span class="w"> </span><span class="n">var</span><span class="w"> </span><span class="n">frame</span><span class="p">)))</span>
<span class="w">       </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="n">l</span><span class="w"> </span>
<span class="w">         </span><span class="c1">; If it's defined, the data has to be consistent with the matched variable</span>
<span class="w">         </span><span class="p">(</span><span class="n">pattern-match</span><span class="w"> </span><span class="n">dat</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">l</span><span class="p">)</span><span class="w"> </span><span class="n">frame</span><span class="p">)</span>
<span class="w">         </span><span class="c1">; Else, var is free for us to define.</span>
<span class="w">         </span><span class="p">(</span><span class="n">extend</span><span class="w"> </span><span class="n">var</span><span class="w"> </span><span class="n">dat</span><span class="w"> </span><span class="n">frame</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">pattern-match</span><span class="w"> </span><span class="n">pat</span><span class="w"> </span><span class="n">dat</span><span class="w"> </span><span class="n">frame</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="n">var?</span><span class="w"> </span><span class="n">pat</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">extend-if-consistent</span><span class="w"> </span><span class="n">pat</span><span class="w"> </span><span class="n">dat</span><span class="w"> </span><span class="n">frame</span><span class="p">))</span>
<span class="w">        </span><span class="p">((</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">pair?</span><span class="w"> </span><span class="n">pat</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">pair?</span><span class="w"> </span><span class="n">dat</span><span class="p">))</span><span class="w"> </span>
<span class="w">          </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">nf</span><span class="w"> </span><span class="p">(</span><span class="n">pattern-match</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">pat</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">dat</span><span class="p">)</span><span class="w"> </span><span class="n">frame</span><span class="p">)))</span>
<span class="w">               </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">eq?</span><span class="w"> </span><span class="n">nf</span><span class="w"> </span><span class="o">'</span><span class="ss">failed</span><span class="p">)</span><span class="w"> </span>
<span class="w">                   </span><span class="o">'</span><span class="ss">failed</span>
<span class="w">                   </span><span class="p">(</span><span class="n">pattern-match</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">pat</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">dat</span><span class="p">)</span><span class="w"> </span><span class="n">nf</span><span class="p">))))</span>
<span class="w">        </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">pat</span><span class="w"> </span><span class="n">dat</span><span class="p">)</span><span class="w"> </span><span class="n">frame</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="o">'</span><span class="ss">failed</span><span class="p">)))</span>



<span class="p">(</span><span class="n">pattern-match</span><span class="w"> </span><span class="o">'</span><span class="p">(</span><span class="ss">p</span><span class="w"> </span><span class="p">(</span><span class="ss">?</span><span class="w"> </span><span class="ss">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">?</span><span class="w"> </span><span class="ss">x</span><span class="p">))</span>
<span class="w">               </span><span class="o">'</span><span class="p">(</span><span class="ss">p</span><span class="w"> </span><span class="ss">a</span><span class="w"> </span><span class="ss">a</span><span class="p">)</span>
<span class="w">               </span><span class="o">'</span><span class="p">())</span>
<span class="c1">;; (((? x) . a))</span>

<span class="p">(</span><span class="n">pattern-match</span><span class="w"> </span><span class="o">'</span><span class="p">(</span><span class="ss">p</span><span class="w"> </span><span class="p">(</span><span class="ss">?</span><span class="w"> </span><span class="ss">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">?</span><span class="w"> </span><span class="ss">x</span><span class="p">))</span>
<span class="w">               </span><span class="o">'</span><span class="p">(</span><span class="ss">p</span><span class="w"> </span><span class="ss">a</span><span class="w"> </span><span class="ss">b</span><span class="p">)</span>
<span class="w">               </span><span class="o">'</span><span class="p">())</span>
<span class="c1">;; failed</span>

<span class="p">(</span><span class="n">pattern-match</span><span class="w"> </span><span class="o">'</span><span class="p">(</span><span class="ss">a</span><span class="w"> </span><span class="o">.</span><span class="w"> </span><span class="p">(</span><span class="ss">?</span><span class="w"> </span><span class="ss">rest</span><span class="p">))</span>
<span class="w">               </span><span class="o">'</span><span class="p">(</span><span class="ss">a</span><span class="w"> </span><span class="ss">b</span><span class="w"> </span><span class="ss">c</span><span class="p">)</span>
<span class="w">               </span><span class="o">'</span><span class="p">())</span>
<span class="c1">;; (((? rest) b c))</span>
</code></pre></div>
</details><div class="code-output"><span>Output:</span><pre>(((? x) . a))
failed
(((? rest) b c))
</pre></div></div>


Remembering the unification algo


<div class="code-box"><details class="collapsible-code"><summary class="code-summary"><span><a href="code/sicp44-4.rkt">sicp44-4.rkt</a></span><span class="expand-hint">(click to expand)</span></summary><div class="codehilite" data-language="racket"><pre><code><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="k">stream</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">force</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="k">stream</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">singleton-stream</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">the-empty-stream</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">stream-null?</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">      </span><span class="n">the-empty-stream</span>
<span class="w">      </span><span class="p">(</span><span class="n">cons-stream</span><span class="w"> </span><span class="p">(</span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">))</span>
<span class="w">                   </span><span class="p">(</span><span class="nb">stream-map</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">stream-ref</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">n</span><span class="p">)</span><span class="w"> </span>
<span class="w">        </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">&lt;=</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span>
<span class="w">            </span><span class="p">(</span><span class="n">stream-car</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">            </span><span class="p">(</span><span class="nb">stream-ref</span><span class="w"> </span><span class="p">(</span><span class="n">stream-cdr</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-binding</span><span class="w"> </span><span class="n">variable</span><span class="w"> </span><span class="n">value</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">variable</span><span class="w"> </span><span class="n">value</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">binding-variable</span><span class="w"> </span><span class="n">binding</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">binding</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">binding-value</span><span class="w"> </span><span class="n">binding</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">binding</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">binding-in-frame</span><span class="w"> </span><span class="n">variable</span><span class="w"> </span><span class="n">frame</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">assoc</span><span class="w"> </span><span class="n">variable</span><span class="w"> </span><span class="n">frame</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">extend</span><span class="w"> </span><span class="n">variable</span><span class="w"> </span><span class="n">value</span><span class="w"> </span><span class="n">frame</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="p">(</span><span class="n">make-binding</span><span class="w"> </span><span class="n">variable</span><span class="w"> </span><span class="n">value</span><span class="p">)</span><span class="w"> </span><span class="n">frame</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">tagged-list?</span><span class="w"> </span><span class="nb">exp</span><span class="w"> </span><span class="k">tag</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">pair?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">eq?</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="k">tag</span><span class="p">)</span><span class="w"> </span><span class="k">false</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">var?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">tagged-list?</span><span class="w"> </span><span class="nb">exp</span><span class="w"> </span><span class="o">'</span><span class="ss">?</span><span class="p">))</span>

<span class="c1">; Apply the substitutions in "frame" to "expression". This is a bit like</span>
<span class="c1">; the Mathematica "ReplaceRepeated" or "//." operation.</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="k">instantiate</span><span class="w"> </span><span class="nb">exp</span><span class="w"> </span><span class="n">frame</span><span class="w"> </span><span class="n">unbound-var-handler</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="n">var?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span>
<span class="w">         </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">res</span><span class="w"> </span><span class="p">(</span><span class="nb">assoc</span><span class="w"> </span><span class="nb">exp</span><span class="w"> </span><span class="n">frame</span><span class="p">)))</span>
<span class="w">              </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="n">res</span><span class="w"> </span>
<span class="w">                </span><span class="p">(</span><span class="k">instantiate</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">res</span><span class="p">)</span><span class="w"> </span><span class="n">frame</span><span class="w"> </span><span class="n">unbound-var-handler</span><span class="p">)</span>
<span class="w">                </span><span class="p">(</span><span class="n">unbound-var-handler</span><span class="w"> </span><span class="nb">exp</span><span class="w"> </span><span class="n">frame</span><span class="p">))))</span>
<span class="w">        </span><span class="p">((</span><span class="nb">pair?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span>
<span class="w">         </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span>
<span class="w">           </span><span class="p">(</span><span class="k">instantiate</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="n">frame</span><span class="w"> </span><span class="n">unbound-var-handler</span><span class="p">)</span>
<span class="w">           </span><span class="p">(</span><span class="k">instantiate</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="n">frame</span><span class="w"> </span><span class="n">unbound-var-handler</span><span class="p">)))</span>
<span class="w">         </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="nb">exp</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">extend-if-consistent</span><span class="w"> </span><span class="n">var</span><span class="w"> </span><span class="n">dat</span><span class="w"> </span><span class="n">frame</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">l</span><span class="w"> </span><span class="p">(</span><span class="nb">assoc</span><span class="w"> </span><span class="n">var</span><span class="w"> </span><span class="n">frame</span><span class="p">)))</span>
<span class="w">       </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="n">l</span><span class="w"> </span>
<span class="w">         </span><span class="c1">; If it's defined, the data has to be consistent with the matched variable</span>
<span class="w">         </span><span class="p">(</span><span class="n">pattern-match</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">l</span><span class="p">)</span><span class="w"> </span><span class="n">dat</span><span class="w"> </span><span class="n">frame</span><span class="p">)</span>
<span class="w">         </span><span class="c1">; Else, var is free for us to define.</span>
<span class="w">         </span><span class="p">(</span><span class="n">extend</span><span class="w"> </span><span class="n">var</span><span class="w"> </span><span class="n">dat</span><span class="w"> </span><span class="n">frame</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">pattern-match</span><span class="w"> </span><span class="n">pat</span><span class="w"> </span><span class="n">dat</span><span class="w"> </span><span class="n">frame</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">frame</span><span class="w"> </span><span class="o">'</span><span class="ss">failed</span><span class="p">)</span><span class="w"> </span><span class="o">'</span><span class="ss">failed</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="n">var?</span><span class="w"> </span><span class="n">pat</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">extend-if-consistent</span><span class="w"> </span><span class="n">pat</span><span class="w"> </span><span class="n">dat</span><span class="w"> </span><span class="n">frame</span><span class="p">))</span>
<span class="w">        </span><span class="p">((</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">pair?</span><span class="w"> </span><span class="n">pat</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">pair?</span><span class="w"> </span><span class="n">dat</span><span class="p">))</span><span class="w"> </span>
<span class="w">          </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">nf</span><span class="w"> </span><span class="p">(</span><span class="n">pattern-match</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">pat</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">dat</span><span class="p">)</span><span class="w"> </span><span class="n">frame</span><span class="p">)))</span>
<span class="w">               </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">eq?</span><span class="w"> </span><span class="n">nf</span><span class="w"> </span><span class="o">'</span><span class="ss">failed</span><span class="p">)</span><span class="w"> </span>
<span class="w">                   </span><span class="o">'</span><span class="ss">failed</span>
<span class="w">                   </span><span class="p">(</span><span class="n">pattern-match</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">pat</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">dat</span><span class="p">)</span><span class="w"> </span><span class="n">nf</span><span class="p">))))</span>
<span class="w">        </span><span class="p">((</span><span class="nb">equal?</span><span class="w"> </span><span class="n">pat</span><span class="w"> </span><span class="n">dat</span><span class="p">)</span><span class="w"> </span><span class="n">frame</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="o">'</span><span class="ss">failed</span><span class="p">)))</span>


<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">extend-if-possible</span><span class="w"> </span><span class="n">var</span><span class="w"> </span><span class="n">val</span><span class="w"> </span><span class="n">frame</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">existing</span><span class="w"> </span><span class="p">(</span><span class="n">binding-in-frame</span><span class="w"> </span><span class="n">var</span><span class="w"> </span><span class="n">frame</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="k">cond</span>
<span class="w">      </span><span class="p">(</span><span class="n">existing</span>
<span class="w">       </span><span class="p">(</span><span class="n">unify-match</span><span class="w"> </span><span class="p">(</span><span class="n">binding-value</span><span class="w"> </span><span class="n">existing</span><span class="p">)</span><span class="w"> </span><span class="n">val</span><span class="w"> </span><span class="n">frame</span><span class="p">))</span>

<span class="w">      </span><span class="p">((</span><span class="n">var?</span><span class="w"> </span><span class="n">val</span><span class="p">)</span>
<span class="w">       </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">other</span><span class="w"> </span><span class="p">(</span><span class="n">binding-in-frame</span><span class="w"> </span><span class="n">val</span><span class="w"> </span><span class="n">frame</span><span class="p">)))</span>
<span class="w">         </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="n">other</span>
<span class="w">             </span><span class="p">(</span><span class="n">unify-match</span><span class="w"> </span><span class="n">var</span><span class="w"> </span><span class="p">(</span><span class="n">binding-value</span><span class="w"> </span><span class="n">other</span><span class="p">)</span><span class="w"> </span><span class="n">frame</span><span class="p">)</span>
<span class="w">             </span><span class="p">(</span><span class="n">extend</span><span class="w"> </span><span class="n">var</span><span class="w"> </span><span class="n">val</span><span class="w"> </span><span class="n">frame</span><span class="p">))))</span>

<span class="w">      </span><span class="p">((</span><span class="n">depends-on?</span><span class="w"> </span><span class="n">val</span><span class="w"> </span><span class="n">var</span><span class="w"> </span><span class="n">frame</span><span class="p">)</span>
<span class="w">       </span><span class="o">'</span><span class="ss">failed</span><span class="p">)</span>

<span class="w">      </span><span class="p">(</span><span class="k">else</span>
<span class="w">       </span><span class="p">(</span><span class="n">extend</span><span class="w"> </span><span class="n">var</span><span class="w"> </span><span class="n">val</span><span class="w"> </span><span class="n">frame</span><span class="p">)))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">unify-match</span><span class="w"> </span><span class="n">p1</span><span class="w"> </span><span class="n">p2</span><span class="w"> </span><span class="n">frame</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">frame</span><span class="w"> </span><span class="o">'</span><span class="ss">failed</span><span class="p">)</span><span class="w"> </span><span class="o">'</span><span class="ss">failed</span><span class="p">)</span>
<span class="w">    </span><span class="p">((</span><span class="nb">equal?</span><span class="w"> </span><span class="n">p1</span><span class="w"> </span><span class="n">p2</span><span class="p">)</span><span class="w"> </span><span class="n">frame</span><span class="p">)</span>
<span class="w">    </span><span class="p">((</span><span class="n">var?</span><span class="w"> </span><span class="n">p1</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">extend-if-possible</span><span class="w"> </span><span class="n">p1</span><span class="w"> </span><span class="n">p2</span><span class="w"> </span><span class="n">frame</span><span class="p">))</span>
<span class="w">    </span><span class="p">((</span><span class="n">var?</span><span class="w"> </span><span class="n">p2</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">extend-if-possible</span><span class="w"> </span><span class="n">p2</span><span class="w"> </span><span class="n">p1</span><span class="w"> </span><span class="n">frame</span><span class="p">))</span>
<span class="w">    </span><span class="p">((</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">pair?</span><span class="w"> </span><span class="n">p1</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">pair?</span><span class="w"> </span><span class="n">p2</span><span class="p">))</span>
<span class="w">     </span><span class="p">(</span><span class="n">unify-match</span>
<span class="w">       </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">p1</span><span class="p">)</span>
<span class="w">       </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">p2</span><span class="p">)</span>
<span class="w">       </span><span class="p">(</span><span class="n">unify-match</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">p1</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">p2</span><span class="p">)</span><span class="w"> </span><span class="n">frame</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="o">'</span><span class="ss">failed</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">depends-on?</span><span class="w"> </span><span class="nb">exp</span><span class="w"> </span><span class="n">var</span><span class="w"> </span><span class="n">frame</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span>
<span class="w">    </span><span class="p">((</span><span class="n">var?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span>
<span class="w">     </span><span class="p">(</span><span class="k">or</span><span class="w"> </span><span class="p">(</span><span class="nb">equal?</span><span class="w"> </span><span class="nb">exp</span><span class="w"> </span><span class="n">var</span><span class="p">)</span>
<span class="w">         </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">binding</span><span class="w"> </span><span class="p">(</span><span class="n">binding-in-frame</span><span class="w"> </span><span class="nb">exp</span><span class="w"> </span><span class="n">frame</span><span class="p">)))</span>
<span class="w">           </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="n">binding</span>
<span class="w">                </span><span class="p">(</span><span class="n">depends-on?</span>
<span class="w">                  </span><span class="p">(</span><span class="n">binding-value</span><span class="w"> </span><span class="n">binding</span><span class="p">)</span>
<span class="w">                  </span><span class="n">var</span>
<span class="w">                  </span><span class="n">frame</span><span class="p">)))))</span>
<span class="w">    </span><span class="p">((</span><span class="nb">pair?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span>
<span class="w">     </span><span class="p">(</span><span class="k">or</span><span class="w"> </span><span class="p">(</span><span class="n">depends-on?</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="n">var</span><span class="w"> </span><span class="n">frame</span><span class="p">)</span>
<span class="w">         </span><span class="p">(</span><span class="n">depends-on?</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="n">var</span><span class="w"> </span><span class="n">frame</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="k">false</span><span class="p">)))</span>

<span class="p">(</span><span class="n">unify-match</span><span class="w"> </span><span class="o">'</span><span class="p">(</span><span class="ss">p</span><span class="w"> </span><span class="p">(</span><span class="ss">?</span><span class="w"> </span><span class="ss">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">?</span><span class="w"> </span><span class="ss">y</span><span class="p">))</span>
<span class="w">             </span><span class="o">'</span><span class="p">(</span><span class="ss">p</span><span class="w"> </span><span class="p">(</span><span class="ss">?</span><span class="w"> </span><span class="ss">y</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">?</span><span class="w"> </span><span class="ss">x</span><span class="p">))</span>
<span class="w">             </span><span class="o">'</span><span class="p">())</span>
<span class="c1">;; (((? x) ? y))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">unified</span>
<span class="w">  </span><span class="p">(</span><span class="n">unify-match</span><span class="w"> </span><span class="o">'</span><span class="p">(</span><span class="ss">p</span><span class="w"> </span><span class="p">(</span><span class="ss">?</span><span class="w"> </span><span class="ss">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="ss">?</span><span class="w"> </span><span class="ss">y</span><span class="p">))</span>
<span class="w">               </span><span class="o">'</span><span class="p">(</span><span class="ss">p</span><span class="w"> </span><span class="p">(</span><span class="ss">f</span><span class="w"> </span><span class="p">(</span><span class="ss">?</span><span class="w"> </span><span class="ss">y</span><span class="p">))</span><span class="w"> </span><span class="mi">3</span><span class="p">)</span>
<span class="w">               </span><span class="o">'</span><span class="p">()))</span>

<span class="p">(</span><span class="k">instantiate</span><span class="w"> </span><span class="o">'</span><span class="p">(</span><span class="ss">?</span><span class="w"> </span><span class="ss">x</span><span class="p">)</span><span class="w"> </span><span class="n">unified</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">v</span><span class="w"> </span><span class="n">f</span><span class="p">)</span><span class="w"> </span><span class="n">v</span><span class="p">))</span>
<span class="c1">;; (f 3)</span>
<span class="p">(</span><span class="n">unify-match</span><span class="w"> </span><span class="o">'</span><span class="p">(</span><span class="ss">?</span><span class="w"> </span><span class="ss">y</span><span class="p">)</span>
<span class="w">             </span><span class="o">'</span><span class="p">(</span><span class="ss">f</span><span class="w"> </span><span class="p">(</span><span class="ss">?</span><span class="w"> </span><span class="ss">x</span><span class="p">))</span>
<span class="w">             </span><span class="p">(</span><span class="n">extend</span><span class="w"> </span><span class="o">'</span><span class="p">(</span><span class="ss">?</span><span class="w"> </span><span class="ss">x</span><span class="p">)</span><span class="w"> </span><span class="o">'</span><span class="p">(</span><span class="ss">?</span><span class="w"> </span><span class="ss">y</span><span class="p">)</span><span class="w"> </span><span class="o">'</span><span class="p">()))</span>
<span class="c1">;; failed</span>
</code></pre></div>
</details><div class="code-output"><span>Output:</span><pre>(((? x) ? y))
(f 3)
failed
</pre></div></div>







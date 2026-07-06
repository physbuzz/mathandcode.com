---
layout: sicp
render_with_liquid: false
title: SICP Chapter 2.4
---

<div class="nav">
    <span class="activenav"><a href="notes-ch2-3.html">← Previous</a></span>
    <span class="activenav"><a href="../index.html">↑ Up</a></span>
    <span class="activenav"><a href="notes-ch2-5.html">Next →</a></span>
</div>


[HTML Book Chapter 2.4 Link](https://sarabander.github.io/sicp/html/2_002e4.xhtml#g_t2_002e4)

## Directory
- [Section 2.4](#section-24)
  - [Meeting 04-27-2025](#meeting-04-27-2025)
  - [Other](#other)
  - [Weird concern about these two packages:](#weird-concern-about-these-two-packages)
  - [Introduction](#introduction)
  - [Exercises](#exercises)
    - *Exercises:* ([Exercise 2.73](#exercise-273), [Exercise 2.74](#exercise-274), [Exercise 2.75](#exercise-275), [Exercise 2.76](#exercise-276))

## Section 2.4

### Meeting 04-27-2025

- https://www.gnu.org/software/emacs/manual/html_node/elisp/Association-Lists.html
- https://www.cs.cmu.edu/Groups/AI/util/html/cltl/clm/node108.html
- https://en.wikipedia.org/wiki/Object-oriented_programming#History

### Other
For this section, we have to use code that we don't know how to write yet, fun times.

- SICP Guile handles it here: [https://github.com/zv/SICP-guile/blob/master/sicp2.rkt#L1982](https://github.com/zv/SICP-guile/blob/master/sicp2.rkt#L1982)
- This github repo handles it a different way: [https://mk12.github.io/sicp/exercise/2/4.html](https://mk12.github.io/sicp/exercise/2/4.html)
- I handle `get` and `put` this way:

<div class="code-box" markdown="1">
<div class="code-header"><a href="code/package-example.rkt">code/package-example.rkt</a></div>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

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

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">attach-tag</span><span class="w"> </span><span class="n">type-tag</span><span class="w"> </span><span class="n">contents</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">type-tag</span><span class="w"> </span><span class="n">contents</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">type-tag</span><span class="w"> </span><span class="n">datum</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">pair?</span><span class="w"> </span><span class="n">datum</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">datum</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;Bad tagged datum: TYPE-TAG&quot;</span><span class="w"> </span><span class="n">datum</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">contents</span><span class="w"> </span><span class="n">datum</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">pair?</span><span class="w"> </span><span class="n">datum</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">datum</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;Bad tagged datum: CONTENTS&quot;</span><span class="w"> </span><span class="n">datum</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">apply-generic</span><span class="w"> </span><span class="n">op</span><span class="w"> </span><span class="o">.</span><span class="w"> </span><span class="n">args</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">type-tags</span><span class="w"> </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="n">type-tag</span><span class="w"> </span><span class="n">args</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="n">get</span><span class="w"> </span><span class="n">op</span><span class="w"> </span><span class="n">type-tags</span><span class="p">)))</span>
<span class="w">      </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="n">proc</span>
<span class="w">          </span><span class="p">(</span><span class="nb">apply</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="n">contents</span><span class="w"> </span><span class="n">args</span><span class="p">))</span>
<span class="w">          </span><span class="p">(</span><span class="nb">error</span>
<span class="w">            </span><span class="s2">&quot;No method for these types: APPLY-GENERIC&quot;</span>
<span class="w">            </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="n">op</span><span class="w"> </span><span class="n">type-tags</span><span class="p">))))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">my-add-one</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="mi">1</span><span class="p">))</span>

<span class="p">(</span><span class="n">put</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">inc</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">my</span><span class="p">)</span><span class="w"> </span><span class="n">my-add-one</span><span class="p">)</span>

<span class="p">(</span><span class="n">apply-generic</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">inc</span><span class="w"> </span><span class="p">(</span><span class="n">attach-tag</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">my</span><span class="w"> </span><span class="mi">10</span><span class="p">))</span>
</pre></div>
<div class="code-output">
<span>Output:</span>
<pre>11
</pre>
</div>
</div>


<div class="code-box" markdown="1">
<div class="code-header"><a href="code/package-example2.rkt">code/package-example2.rkt</a></div>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

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

<span class="c1">;; Code from book:</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">attach-tag</span><span class="w"> </span><span class="n">type-tag</span><span class="w"> </span><span class="n">contents</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">type-tag</span><span class="w"> </span><span class="n">contents</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">type-tag</span><span class="w"> </span><span class="n">datum</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">pair?</span><span class="w"> </span><span class="n">datum</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">datum</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;Bad tagged datum: TYPE-TAG&quot;</span><span class="w"> </span><span class="n">datum</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">contents</span><span class="w"> </span><span class="n">datum</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">pair?</span><span class="w"> </span><span class="n">datum</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">datum</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;Bad tagged datum: CONTENTS&quot;</span><span class="w"> </span><span class="n">datum</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">apply-generic</span><span class="w"> </span><span class="n">op</span><span class="w"> </span><span class="o">.</span><span class="w"> </span><span class="n">args</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">type-tags</span><span class="w"> </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="n">type-tag</span><span class="w"> </span><span class="n">args</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="n">get</span><span class="w"> </span><span class="n">op</span><span class="w"> </span><span class="n">type-tags</span><span class="p">)))</span>
<span class="w">      </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="n">proc</span>
<span class="w">          </span><span class="p">(</span><span class="nb">apply</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="n">contents</span><span class="w"> </span><span class="n">args</span><span class="p">))</span>
<span class="w">          </span><span class="p">(</span><span class="nb">error</span>
<span class="w">            </span><span class="s2">&quot;No method for these types: APPLY-GENERIC&quot;</span>
<span class="w">            </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="n">op</span><span class="w"> </span><span class="n">type-tags</span><span class="p">))))))</span>


<span class="c1">;; polar-package stuff:</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">square</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">install-polar-package</span><span class="p">)</span>
<span class="w">  </span><span class="c1">;; internal procedures</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">magnitude</span><span class="w"> </span><span class="n">z</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">z</span><span class="p">))</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">angle</span><span class="w"> </span><span class="n">z</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">z</span><span class="p">))</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-from-mag-ang</span><span class="w"> </span><span class="n">r</span><span class="w"> </span><span class="n">a</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">r</span><span class="w"> </span><span class="n">a</span><span class="p">))</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">real-part</span><span class="w"> </span><span class="n">z</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="p">(</span><span class="nb">magnitude</span><span class="w"> </span><span class="n">z</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cos</span><span class="w"> </span><span class="p">(</span><span class="nb">angle</span><span class="w"> </span><span class="n">z</span><span class="p">))))</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">imag-part</span><span class="w"> </span><span class="n">z</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="p">(</span><span class="nb">magnitude</span><span class="w"> </span><span class="n">z</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">sin</span><span class="w"> </span><span class="p">(</span><span class="nb">angle</span><span class="w"> </span><span class="n">z</span><span class="p">))))</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-from-real-imag</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">y</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="p">(</span><span class="nb">sqrt</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="p">(</span><span class="n">square</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">square</span><span class="w"> </span><span class="n">y</span><span class="p">)))</span>
<span class="w">          </span><span class="p">(</span><span class="nb">atan</span><span class="w"> </span><span class="n">y</span><span class="w"> </span><span class="n">x</span><span class="p">)))</span>
<span class="w">  </span><span class="c1">;; interface to the rest of the system</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="k">tag</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">attach-tag</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">polar</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="w">  </span><span class="p">(</span><span class="n">put</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">real-part</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">polar</span><span class="p">)</span><span class="w"> </span><span class="nb">real-part</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">put</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">imag-part</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">polar</span><span class="p">)</span><span class="w"> </span><span class="nb">imag-part</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">put</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">magnitude</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">polar</span><span class="p">)</span><span class="w"> </span><span class="nb">magnitude</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">put</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">angle</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">polar</span><span class="p">)</span><span class="w"> </span><span class="nb">angle</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">put</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">make-from-real-imag</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">polar</span>
<span class="w">       </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="w"> </span><span class="n">y</span><span class="p">)</span>
<span class="w">         </span><span class="p">(</span><span class="k">tag</span><span class="w"> </span><span class="p">(</span><span class="n">make-from-real-imag</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">y</span><span class="p">))))</span>
<span class="w">  </span><span class="p">(</span><span class="n">put</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">make-from-mag-ang</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">polar</span>
<span class="w">       </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">r</span><span class="w"> </span><span class="n">a</span><span class="p">)</span>
<span class="w">         </span><span class="p">(</span><span class="k">tag</span><span class="w"> </span><span class="p">(</span><span class="n">make-from-mag-ang</span><span class="w"> </span><span class="n">r</span><span class="w"> </span><span class="n">a</span><span class="p">))))</span>
<span class="w">  </span><span class="o">&#39;</span><span class="ss">done</span><span class="p">)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-from-mag-ang</span><span class="w"> </span><span class="n">r</span><span class="w"> </span><span class="n">a</span><span class="p">)</span>
<span class="w">  </span><span class="p">((</span><span class="n">get</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">make-from-mag-ang</span>
<span class="w">        </span><span class="o">&#39;</span><span class="ss">polar</span><span class="p">)</span>
<span class="w">   </span><span class="n">r</span><span class="w"> </span><span class="n">a</span><span class="p">))</span>

<span class="p">(</span><span class="n">install-polar-package</span><span class="p">)</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">polar-num</span><span class="w"> </span><span class="p">(</span><span class="n">make-from-mag-ang</span><span class="w"> </span><span class="p">(</span><span class="nb">sqrt</span><span class="w"> </span><span class="mf">2.0</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">/</span><span class="w"> </span><span class="mf">3.14159</span><span class="w"> </span><span class="mf">4.0</span><span class="p">)))</span>
<span class="n">polar-num</span>
<span class="p">(</span><span class="n">type-tag</span><span class="w"> </span><span class="n">polar-num</span><span class="p">)</span>
<span class="p">(</span><span class="n">contents</span><span class="w"> </span><span class="n">polar-num</span><span class="p">)</span>
</pre></div>
<div class="code-output">
<span>Output:</span>
<pre>done
(polar 1.4142135623730951 . 0.7853975)
polar
(1.4142135623730951 . 0.7853975)
</pre>
</div>
</div>



### Weird concern about these two packages:

For `install-rectangular-package` and `install-polar-package`
It's kind of weird that some methods are tagged with a list, 
and other methods are tagged without a list (like `'make-from-real-imag`).
I notice that things tagged with a list seem to be called through
`apply-generic`, while things tagged without a list seem to be called
through `get`. eg:

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">install-rectangular-package</span><span class="p">)</span>
<span class="w">  </span><span class="c1">;; internal procedures</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">real-part</span><span class="w"> </span><span class="n">z</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">z</span><span class="p">))</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">imag-part</span><span class="w"> </span><span class="n">z</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">z</span><span class="p">))</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-from-real-imag</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">y</span><span class="p">)</span><span class="w"> </span>
<span class="w">    </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">y</span><span class="p">))</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">magnitude</span><span class="w"> </span><span class="n">z</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="nb">sqrt</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="p">(</span><span class="n">square</span><span class="w"> </span><span class="p">(</span><span class="nb">real-part</span><span class="w"> </span><span class="n">z</span><span class="p">))</span>
<span class="w">             </span><span class="p">(</span><span class="n">square</span><span class="w"> </span><span class="p">(</span><span class="nb">imag-part</span><span class="w"> </span><span class="n">z</span><span class="p">)))))</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">angle</span><span class="w"> </span><span class="n">z</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="nb">atan</span><span class="w"> </span><span class="p">(</span><span class="nb">imag-part</span><span class="w"> </span><span class="n">z</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">real-part</span><span class="w"> </span><span class="n">z</span><span class="p">)))</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-from-mag-ang</span><span class="w"> </span><span class="n">r</span><span class="w"> </span><span class="n">a</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">r</span><span class="w"> </span><span class="p">(</span><span class="nb">cos</span><span class="w"> </span><span class="n">a</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">r</span><span class="w"> </span><span class="p">(</span><span class="nb">sin</span><span class="w"> </span><span class="n">a</span><span class="p">))))</span>
<span class="w">  </span><span class="c1">;; interface to the rest of the system</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="k">tag</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span>
<span class="w">    </span><span class="p">(</span><span class="n">attach-tag</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">rectangular</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="w">  </span><span class="p">(</span><span class="n">put</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">real-part</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">rectangular</span><span class="p">)</span><span class="w"> </span><span class="nb">real-part</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">put</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">imag-part</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">rectangular</span><span class="p">)</span><span class="w"> </span><span class="nb">imag-part</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">put</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">magnitude</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">rectangular</span><span class="p">)</span><span class="w"> </span><span class="nb">magnitude</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">put</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">angle</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">rectangular</span><span class="p">)</span><span class="w"> </span><span class="nb">angle</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">put</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">make-from-real-imag</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">rectangular</span>
<span class="w">       </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="w"> </span><span class="n">y</span><span class="p">)</span><span class="w"> </span>
<span class="w">         </span><span class="p">(</span><span class="k">tag</span><span class="w"> </span><span class="p">(</span><span class="n">make-from-real-imag</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">y</span><span class="p">))))</span>
<span class="w">  </span><span class="p">(</span><span class="n">put</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">make-from-mag-ang</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">rectangular</span>
<span class="w">       </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">r</span><span class="w"> </span><span class="n">a</span><span class="p">)</span><span class="w"> </span>
<span class="w">         </span><span class="p">(</span><span class="k">tag</span><span class="w"> </span><span class="p">(</span><span class="n">make-from-mag-ang</span><span class="w"> </span><span class="n">r</span><span class="w"> </span><span class="n">a</span><span class="p">))))</span>
<span class="w">  </span><span class="o">&#39;</span><span class="ss">done</span><span class="p">)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">install-polar-package</span><span class="p">)</span>
<span class="w">  </span><span class="c1">;; internal procedures</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">magnitude</span><span class="w"> </span><span class="n">z</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">z</span><span class="p">))</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">angle</span><span class="w"> </span><span class="n">z</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">z</span><span class="p">))</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-from-mag-ang</span><span class="w"> </span><span class="n">r</span><span class="w"> </span><span class="n">a</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">r</span><span class="w"> </span><span class="n">a</span><span class="p">))</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">real-part</span><span class="w"> </span><span class="n">z</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="p">(</span><span class="nb">magnitude</span><span class="w"> </span><span class="n">z</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cos</span><span class="w"> </span><span class="p">(</span><span class="nb">angle</span><span class="w"> </span><span class="n">z</span><span class="p">))))</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">imag-part</span><span class="w"> </span><span class="n">z</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="p">(</span><span class="nb">magnitude</span><span class="w"> </span><span class="n">z</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">sin</span><span class="w"> </span><span class="p">(</span><span class="nb">angle</span><span class="w"> </span><span class="n">z</span><span class="p">))))</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-from-real-imag</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">y</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="p">(</span><span class="nb">sqrt</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="p">(</span><span class="n">square</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">square</span><span class="w"> </span><span class="n">y</span><span class="p">)))</span>
<span class="w">          </span><span class="p">(</span><span class="nb">atan</span><span class="w"> </span><span class="n">y</span><span class="w"> </span><span class="n">x</span><span class="p">)))</span>
<span class="w">  </span><span class="c1">;; interface to the rest of the system</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="k">tag</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">attach-tag</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">polar</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="w">  </span><span class="p">(</span><span class="n">put</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">real-part</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">polar</span><span class="p">)</span><span class="w"> </span><span class="nb">real-part</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">put</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">imag-part</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">polar</span><span class="p">)</span><span class="w"> </span><span class="nb">imag-part</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">put</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">magnitude</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">polar</span><span class="p">)</span><span class="w"> </span><span class="nb">magnitude</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">put</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">angle</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">polar</span><span class="p">)</span><span class="w"> </span><span class="nb">angle</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">put</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">make-from-real-imag</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">polar</span>
<span class="w">       </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="w"> </span><span class="n">y</span><span class="p">)</span><span class="w"> </span>
<span class="w">         </span><span class="p">(</span><span class="k">tag</span><span class="w"> </span><span class="p">(</span><span class="n">make-from-real-imag</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">y</span><span class="p">))))</span>
<span class="w">  </span><span class="p">(</span><span class="n">put</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">make-from-mag-ang</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">polar</span>
<span class="w">       </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">r</span><span class="w"> </span><span class="n">a</span><span class="p">)</span><span class="w"> </span>
<span class="w">         </span><span class="p">(</span><span class="k">tag</span><span class="w"> </span><span class="p">(</span><span class="n">make-from-mag-ang</span><span class="w"> </span><span class="n">r</span><span class="w"> </span><span class="n">a</span><span class="p">))))</span>
<span class="w">  </span><span class="o">&#39;</span><span class="ss">done</span><span class="p">)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">real-part</span><span class="w"> </span><span class="n">z</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="n">apply-generic</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">real-part</span><span class="w"> </span><span class="n">z</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">imag-part</span><span class="w"> </span><span class="n">z</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="n">apply-generic</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">imag-part</span><span class="w"> </span><span class="n">z</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">magnitude</span><span class="w"> </span><span class="n">z</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="n">apply-generic</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">magnitude</span><span class="w"> </span><span class="n">z</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">angle</span><span class="w"> </span><span class="n">z</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="n">apply-generic</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">angle</span><span class="w"> </span><span class="n">z</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-from-real-imag</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">y</span><span class="p">)</span>
<span class="w">  </span><span class="p">((</span><span class="n">get</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">make-from-real-imag</span><span class="w"> </span>
<span class="w">        </span><span class="o">&#39;</span><span class="ss">rectangular</span><span class="p">)</span><span class="w"> </span>
<span class="w">   </span><span class="n">x</span><span class="w"> </span><span class="n">y</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-from-mag-ang</span><span class="w"> </span><span class="n">r</span><span class="w"> </span><span class="n">a</span><span class="p">)</span>
<span class="w">  </span><span class="p">((</span><span class="n">get</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">make-from-mag-ang</span><span class="w"> </span>
<span class="w">        </span><span class="o">&#39;</span><span class="ss">polar</span><span class="p">)</span><span class="w"> </span>
<span class="w">   </span><span class="n">r</span><span class="w"> </span><span class="n">a</span><span class="p">))</span>
</pre></div>



### Introduction

Important functions: `put, get, apply-generic`.

Mutability hasn't been covered yet, so we can't really implement `put`.



### Exercises

##### Solution

#### Exercise 2.73

2.3.2 described a
program that performs symbolic differentiation:

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="nb">exp</span><span class="w"> </span><span class="n">var</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">number?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="n">variable?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span>
<span class="w">         </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">same-variable?</span><span class="w"> </span><span class="nb">exp</span><span class="w"> </span><span class="n">var</span><span class="p">)</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">0</span><span class="p">))</span>
<span class="w">        </span><span class="p">((</span><span class="n">sum?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span>
<span class="w">         </span><span class="p">(</span><span class="n">make-sum</span><span class="w"> </span><span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="p">(</span><span class="n">addend</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="n">var</span><span class="p">)</span>
<span class="w">                   </span><span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="p">(</span><span class="n">augend</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="n">var</span><span class="p">)))</span>
<span class="w">        </span><span class="p">((</span><span class="n">product?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span>
<span class="w">         </span><span class="p">(</span><span class="n">make-sum</span>
<span class="w">           </span><span class="p">(</span><span class="n">make-product</span><span class="w"> </span>
<span class="w">            </span><span class="p">(</span><span class="n">multiplier</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span>
<span class="w">            </span><span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="p">(</span><span class="n">multiplicand</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="n">var</span><span class="p">))</span>
<span class="w">           </span><span class="p">(</span><span class="n">make-product</span><span class="w"> </span>
<span class="w">            </span><span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="p">(</span><span class="n">multiplier</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="n">var</span><span class="p">)</span>
<span class="w">            </span><span class="p">(</span><span class="n">multiplicand</span><span class="w"> </span><span class="nb">exp</span><span class="p">))))</span>
<span class="w">        </span><span class="n">⟨@var</span><span class="p">{</span><span class="n">more</span><span class="w"> </span><span class="n">rules</span><span class="w"> </span><span class="n">can</span><span class="w"> </span><span class="n">be</span><span class="w"> </span><span class="n">added</span><span class="w"> </span><span class="n">here</span><span class="p">}</span><span class="n">⟩</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;unknown expression type:</span>
<span class="s2">                      DERIV&quot;</span><span class="w"> </span><span class="nb">exp</span><span class="p">))))</span>
</pre></div>

We can regard this program as performing a dispatch on the type of the
expression to be differentiated.  In this situation the ``type tag'' of the
datum is the algebraic operator symbol (such as `+`) and the operation
being performed is `deriv`.  We can transform this program into
data-directed style by rewriting the basic derivative procedure as

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="nb">exp</span><span class="w"> </span><span class="n">var</span><span class="p">)</span>
<span class="w">   </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">number?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span>
<span class="w">         </span><span class="p">((</span><span class="n">variable?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span>
<span class="w">           </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">same-variable?</span><span class="w"> </span><span class="nb">exp</span><span class="w"> </span><span class="n">var</span><span class="p">)</span><span class="w"> </span>
<span class="w">               </span><span class="mi">1</span><span class="w"> </span>
<span class="w">               </span><span class="mi">0</span><span class="p">))</span>
<span class="w">         </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">((</span><span class="n">get</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">deriv</span><span class="w"> </span><span class="p">(</span><span class="n">operator</span><span class="w"> </span><span class="nb">exp</span><span class="p">))</span><span class="w"> </span>
<span class="w">                </span><span class="p">(</span><span class="n">operands</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span>
<span class="w">                </span><span class="n">var</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">operator</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="nb">exp</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">operands</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="nb">exp</span><span class="p">))</span>
</pre></div>

**1.** Explain what was done above.  Why can't we assimilate the predicates
`number?` and `variable?` into the data-directed dispatch?

**2.** Write the procedures for derivatives of sums and products, and the auxiliary
code required to install them in the table used by the program above.

**3.** Choose any additional differentiation rule that you like, such as the one for
exponents (Exercise 2.56), and install it in this data-directed
system.

**4.** In this simple algebraic manipulator the type of an expression is the algebraic
operator that binds it together.  Suppose, however, we indexed the procedures
in the opposite way, so that the dispatch line in `deriv` looked like

<div class="codehilite"><pre><span></span><span class="p">((</span><span class="n">get</span><span class="w"> </span><span class="p">(</span><span class="n">operator</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">deriv</span><span class="p">)</span><span class="w"> </span>
<span class="w"> </span><span class="p">(</span><span class="n">operands</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="n">var</span><span class="p">)</span>
</pre></div>


What corresponding changes to the derivative system are required?

##### Solution

**Part 1:** We can't assimilate the cases where it's a number or variable, because these aren't tagged data.

**Part 2 and part 3:** Note: I removed the keyword `operands` from
the function `deriv`, as this is more consistent with the code. 
I could have added the tag back everywhere `(let ((exp-tagged (cons '+ exp))) ...)`, but it's easier to just remove `operands`.

<div class="code-box" markdown="1">
<div class="code-header"><a href="code/ex2-73.rkt">code/ex2-73.rkt</a></div>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

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
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-exponentiation</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="n">=number?</span><span class="w"> </span><span class="n">b</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="n">=number?</span><span class="w"> </span><span class="n">b</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span><span class="w"> </span><span class="n">a</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="n">=number?</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">**</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="p">))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">operator</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="nb">exp</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">operands</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="nb">exp</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="nb">exp</span><span class="w"> </span><span class="n">var</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">number?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="n">variable?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span>
<span class="w">          </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">same-variable?</span><span class="w"> </span><span class="nb">exp</span><span class="w"> </span><span class="n">var</span><span class="p">)</span>
<span class="w">              </span><span class="mi">1</span>
<span class="w">              </span><span class="mi">0</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">((</span><span class="n">get</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">deriv</span><span class="w"> </span><span class="p">(</span><span class="n">operator</span><span class="w"> </span><span class="nb">exp</span><span class="p">))</span>
<span class="w">               </span><span class="nb">exp</span>
<span class="w">               </span><span class="n">var</span><span class="p">))))</span>

<span class="p">(</span><span class="n">put</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">deriv</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">+</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="nb">exp</span><span class="w"> </span><span class="n">var</span><span class="p">)</span><span class="w"> </span>
<span class="w">    </span><span class="p">(</span><span class="n">make-sum</span><span class="w"> </span><span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="p">(</span><span class="n">addend</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="n">var</span><span class="p">)</span>
<span class="w">              </span><span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="p">(</span><span class="n">augend</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="n">var</span><span class="p">))))</span>

<span class="p">(</span><span class="n">put</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">deriv</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">*</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="nb">exp</span><span class="w"> </span><span class="n">var</span><span class="p">)</span><span class="w"> </span>
<span class="w">    </span><span class="p">(</span><span class="n">make-sum</span>
<span class="w">     </span><span class="p">(</span><span class="n">make-product</span>
<span class="w">      </span><span class="p">(</span><span class="n">multiplier</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="p">(</span><span class="n">multiplicand</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="n">var</span><span class="p">))</span>
<span class="w">     </span><span class="p">(</span><span class="n">make-product</span>
<span class="w">      </span><span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="p">(</span><span class="n">multiplier</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="n">var</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="n">multiplicand</span><span class="w"> </span><span class="nb">exp</span><span class="p">)))))</span>
<span class="p">(</span><span class="n">put</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">deriv</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">**</span>
<span class="w">  </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="nb">exp</span><span class="w"> </span><span class="n">var</span><span class="p">)</span><span class="w"> </span>
<span class="w">    </span><span class="p">(</span><span class="n">make-product</span>
<span class="w">     </span><span class="p">(</span><span class="n">make-product</span>
<span class="w">      </span><span class="p">(</span><span class="n">exponent</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="n">make-exponentiation</span><span class="w"> </span><span class="p">(</span><span class="n">base</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">make-sum</span><span class="w"> </span><span class="p">(</span><span class="n">exponent</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="mi">-1</span><span class="p">)))</span>
<span class="w">     </span><span class="p">(</span><span class="n">deriv</span><span class="w"> </span><span class="p">(</span><span class="n">base</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="n">var</span><span class="p">))))</span>

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


**Part 4:** We just have to switch the order of the tags,
it's trivial, here's the diff:
<div class="codehilite"><pre><span></span>0a1
&gt; 
91c92
&lt;         (else ((get &#39;deriv (operator exp))
---
&gt;         (else ((get (operator exp) &#39;deriv)
95c96
&lt; (put &#39;deriv &#39;+ 
---
&gt; (put &#39;+ &#39;deriv 
100c101
&lt; (put &#39;deriv &#39;* 
---
&gt; (put &#39;* &#39;deriv 
109c110
&lt; (put &#39;deriv &#39;**
---
&gt; (put &#39;** &#39;deriv 
</pre></div>

#### Exercise 2.74

Insatiable Enterprises, Inc., is
a highly decentralized conglomerate company consisting of a large number of
independent divisions located all over the world.  The company's computer
facilities have just been interconnected by means of a clever
network-interfacing scheme that makes the entire network appear to any user to
be a single computer.  Insatiable's president, in her first attempt to exploit
the ability of the network to extract administrative information from division
files, is dismayed to discover that, although all the division files have been
implemented as data structures in Scheme, the particular data structure used
varies from division to division.  A meeting of division managers is hastily
called to search for a strategy to integrate the files that will satisfy
headquarters' needs while preserving the existing autonomy of the divisions.

Show how such a strategy can be implemented with data-directed programming.  As
an example, suppose that each division's personnel records consist of a single
file, which contains a set of records keyed on employees' names.  The structure
of the set varies from division to division.  Furthermore, each employee's
record is itself a set (structured differently from division to division) that
contains information keyed under identifiers such as `address` and
`salary`.  In particular:

**1.** Implement for headquarters a `get-record` procedure that retrieves a
specified employee's record from a specified personnel file.  The procedure
should be applicable to any division's file.  Explain how the individual
divisions' files should be structured.  In particular, what type information
must be supplied?

**2.** Implement for headquarters a `get-salary` procedure that returns the
salary information from a given employee's record from any division's personnel
file.  How should the record be structured in order to make this operation
work?

**3.** Implement for headquarters a `find-employee-record` procedure.  This
should search all the divisions' files for the record of a given employee and
return the record.  Assume that this procedure takes as arguments an employee's
name and a list of all the divisions' files.

**4.** When Insatiable takes over a new company, what changes must be made in order to
incorporate the new personnel information into the central system?

##### Solution

Kind of a weird problem, let's use 
`(define (lookup given-key records) ...)` from exercise 2.66.

1. The individual divisions' files need to have a tag to let us know what filetype we're dealing with. Then, inspired by the `lookup` function of question ch 2.66, we can use `((get 'get-record filetype) employee-name file-contents)`. This requires each division to implement and install a `get-record` function that accepts an employee name. Let's say it returns a record tagged with the division name. Let's be more precise to prepare for part 3:

<div class="codehilite"><pre><span></span><span class="c1">;;Assume this returns false if no record exists.</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">lookup-employee</span><span class="w"> </span><span class="n">employee-name</span><span class="w"> </span><span class="k">file</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">filetype</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="k">file</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="n">file-contents</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="k">file</span><span class="p">)))</span>
<span class="w">    </span><span class="p">((</span><span class="n">get</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">get-record</span><span class="w"> </span><span class="n">filetype</span><span class="p">)</span><span class="w"> </span><span class="n">employee-name</span><span class="w"> </span><span class="n">file-contents</span><span class="p">)))</span>
</pre></div>

2. For get-salary, we require each department implement a `get-salary` dispatchable function. Then we call `(apply-generic 'get-salary tagged-record)`.
3. Let's include a list of file contents. Each file is a list `(list filetype filecontents)`. 

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">find-employee-record</span><span class="w"> </span><span class="n">employee-name</span><span class="w"> </span><span class="n">tagged-files</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="n">tagged-files</span><span class="p">)</span><span class="w"> </span><span class="no">#f</span>
<span class="w">    </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">employee-record</span><span class="w"> </span><span class="p">(</span><span class="n">lookup-employee</span><span class="w"> </span><span class="n">employee-name</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">tagged-files</span><span class="p">))))</span>
<span class="w">      </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="n">employee-record</span><span class="w"> </span>
<span class="w">        </span><span class="n">employee-record</span>
<span class="w">        </span><span class="p">(</span><span class="n">find-employee-record</span><span class="w"> </span><span class="n">employee-name</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">tagged-files</span><span class="p">))))))</span>
</pre></div>
4. To incorporate changes, we need to have people implement the `'get-record` 
and `get-salary` functions as defined earlier in the chapter.

#### Exercise 2.75

Implement the constructor
`make-from-mag-ang` in message-passing style.  This procedure should be
analogous to the `make-from-real-imag` procedure given above.

##### Solution

<div class="code-box" markdown="1">
<div class="code-header"><a href="code/ex2-75.rkt">code/ex2-75.rkt</a></div>
<div class="codehilite"><pre><span></span><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-from-mag-ang</span><span class="w"> </span><span class="n">r</span><span class="w"> </span><span class="n">a</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">dispatch</span><span class="w"> </span><span class="n">op</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">op</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">real-part</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">r</span><span class="w"> </span><span class="p">(</span><span class="nb">cos</span><span class="w"> </span><span class="n">a</span><span class="p">)))</span>
<span class="w">          </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">op</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">imag-part</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">r</span><span class="w"> </span><span class="p">(</span><span class="nb">sin</span><span class="w"> </span><span class="n">a</span><span class="p">)))</span>
<span class="w">          </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">op</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">magnitude</span><span class="p">)</span><span class="w"> </span><span class="n">r</span><span class="p">)</span>
<span class="w">          </span><span class="p">((</span><span class="nb">eq?</span><span class="w"> </span><span class="n">op</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">angle</span><span class="p">)</span><span class="w"> </span><span class="n">a</span><span class="p">)</span>
<span class="w">          </span><span class="p">(</span><span class="k">else</span>
<span class="w">           </span><span class="p">(</span><span class="nb">error</span><span class="w"> </span><span class="s2">&quot;Unknown op: </span>
<span class="s2">            MAKE-FROM-MAG-ANGLE&quot;</span><span class="w"> </span><span class="n">op</span><span class="p">))))</span>
<span class="w">  </span><span class="n">dispatch</span><span class="p">)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">apply-generic</span><span class="w"> </span><span class="n">op</span><span class="w"> </span><span class="n">arg</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">arg</span><span class="w"> </span><span class="n">op</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">my-c</span><span class="w"> </span><span class="p">(</span><span class="n">make-from-mag-ang</span><span class="w"> </span><span class="p">(</span><span class="nb">sqrt</span><span class="w"> </span><span class="mi">2</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">/</span><span class="w"> </span><span class="mf">3.14159</span><span class="w"> </span><span class="mi">4</span><span class="p">)))</span>

<span class="p">(</span><span class="n">apply-generic</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">real-part</span><span class="w"> </span><span class="n">my-c</span><span class="p">)</span>
<span class="p">(</span><span class="n">apply-generic</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">imag-part</span><span class="w"> </span><span class="n">my-c</span><span class="p">)</span>
</pre></div>
<div class="code-output">
<span>Output:</span>
<pre>1.0000006633972283
0.9999993366023316
</pre>
</div>
</div>


#### Exercise 2.76

As a large system with generic
operations evolves, new types of data objects or new operations may be needed.
For each of the three strategies---generic operations with explicit dispatch,
data-directed style, and message-passing-style---describe the changes that
must be made to a system in order to add new types or new operations.  Which
organization would be most appropriate for a system in which new types must
often be added?  Which would be most appropriate for a system in which new
operations must often be added?

##### Solution

**Generic operations with explicit dispatch:** This works well when 
we can be certain we don't have to add new types and operations.

**Data-directed:** Works extremely well when we have lot of different types, or have
functions that deal with arguments of many different types. So this would work best
when we have to add a bunch of different types. 

**Message-passing:** Makes adding new functions very easy. We still have the 
flexibility to add new types quite easily, but it might not be as explicit as the 
data directed approach. So message-passing would be preferable when 
new operations must often be added.


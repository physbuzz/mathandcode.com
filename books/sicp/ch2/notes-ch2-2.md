---
layout: sicp
render_with_liquid: false
title: SICP Chapter 2.2
---
<div class="nav">
    <span class="activenav"><a href="notes-ch2-1.html">← Previous</a></span>
    <span class="activenav"><a href="../index.html">↑ Up</a></span>
    <span class="activenav"><a href="notes-ch2-3.html">Next →</a></span>
</div>

[HTML Book Chapter 2.2 Link](https://sarabander.github.io/sicp/html/2_002e2.xhtml#g_t2_002e2)



<div class="table-of-contents"><h2>Directory</h2><ul class="toc-list"><li><a href="#section-22">Section 2.2</a><ul class="toc-list"><li><a href="#experiments-with-lists-and-nil">Experiments with lists and nil</a></li><li><a href="#other-stuff-i-should-know">Other stuff I should know:</a></li><li><a href="#experiments-with-binary-trees">Experiments with binary trees</a></li><li><a href="#meeting-04-06-2025">Meeting 04-06-2025</a></li><li><a href="#exercises">Exercises</a> <div class="exercise-container">(<span class="exercise-list"><span><a href="#exercise-217">Exercise 2.17</a></span><span><a href="#exercise-218">Exercise 2.18</a></span><span><a href="#exercise-219">Exercise 2.19</a></span><span><a href="#exercise-220">Exercise 2.20</a></span><span><a href="#exercise-221">Exercise 2.21</a></span><span><a href="#exercise-222">Exercise 2.22</a></span><span><a href="#exercise-223">Exercise 2.23</a></span><span><a href="#exercise-224">Exercise 2.24</a></span><span><a href="#exercise-225">Exercise 2.25</a></span><span><a href="#exercise-226">Exercise 2.26</a></span><span><a href="#exercise-227">Exercise 2.27</a></span><span><a href="#exercise-228">Exercise 2.28</a></span><span><a href="#exercise-229">Exercise 2.29</a></span><span><a href="#exercise-230">Exercise 2.30</a></span><span><a href="#exercise-231">Exercise 2.31</a></span><span><a href="#exercise-232">Exercise 2.32</a></span><span><a href="#exercise-233">Exercise 2.33</a></span><span><a href="#exercise-234">Exercise 2.34</a></span><span><a href="#exercise-235">Exercise 2.35</a></span><span><a href="#exercise-236">Exercise 2.36</a></span><span><a href="#exercise-237">Exercise 2.37</a></span><span><a href="#exercise-238">Exercise 2.38</a></span><span><a href="#exercise-239">Exercise 2.39</a></span><span><a href="#exercise-240">Exercise 2.40</a></span><span><a href="#exercise-241">Exercise 2.41</a></span><span><a href="#exercise-242">Exercise 2.42</a></span><span><a href="#exercise-243">Exercise 2.43</a></span><span><a href="#exercise-244">Exercise 2.44</a></span><span><a href="#exercise-245">Exercise 2.45</a></span><span><a href="#exercise-246">Exercise 2.46</a></span><span><a href="#exercise-247">Exercise 2.47</a></span><span><a href="#exercise-248">Exercise 2.48</a></span><span><a href="#exercise-249">Exercise 2.49</a></span><span><a href="#exercise-250">Exercise 2.50</a></span><span><a href="#exercise-251">Exercise 2.51</a></span><span><a href="#exercise-252">Exercise 2.52</a></span></span>)</div></li></ul></li></ul></div>


## Section 2.2

### Experiments with lists and nil



<div class="code-box"><div class="code-header"><a href="code/ch2-2-experiments.rkt">ch2-2-experiments.rkt</a></div><div class="codehilite" data-language="racket"><pre><code><span class="kn">#lang </span><span class="nn">sicp</span>
<span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">2</span><span class="p">))))</span>
<span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="c1">; This gives an error (can't compare equality with nil):</span>
<span class="c1">; (display (= nil (cdr (cdr (list 1 2)))))</span>
<span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="n">nil</span><span class="p">)</span>
<span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">34</span><span class="p">))</span>
<span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">2</span><span class="p">)))))</span>
<span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="mi">3</span><span class="w"> </span><span class="mi">4</span><span class="p">))</span>
<span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="mi">3</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="mi">4</span><span class="w"> </span><span class="n">nil</span><span class="p">)))))</span>
<span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="c1">; not defined in sicp scheme</span>
<span class="c1">;(display (last-pair (list 1 2 3 4)))</span>
<span class="c1">;(display (last (list 1 2 3 4)))</span>
</code></pre></div>
<div class="code-output"><span>Output:</span><pre>
()
()
(34)
#t


(1 2 3 4)
(1 2 3 4)

</pre></div></div>


### Other stuff I should know:

atom?

number?



```

; 'symb
; ; (list symb)
; '(symb)
; (map (lambda (x) (list x)) (list 1 2 3 4))

;; Some discussion leading into symbolics/undefined symbol f.
(define lst (list 1 2 3 4))
(map (lambda (x) ('f x)) lst)
(list (quote (f 1)) (quote (f 2)) (quote (f 3)) (quote (f 4)))
(map (lambda (x) `(f ,x)) lst)
```



### Experiments with binary trees
- Note to self: do some enumeration of binary trees here! It'll be fun!

### Meeting 04-06-2025

Note:

 - wanna do problems 2.44-2.52 when I have more Racket experience
 - What does the n-queens generating function look like? Can we resum it?
 - Other drawing ideas: L-systems
 - 

### Exercises

##### Solution

#### Exercise 2.17

Define a procedure
`last-pair` that returns the list that contains only the last element of a
given (nonempty) list:



```rkt
(last-pair (list 23 72 149 34))
(34)
```



##### Solution



<div class="code-box"><div class="code-header"><a href="code/ex2-17.rkt">ex2-17.rkt</a></div><div class="codehilite" data-language="racket"><pre><code><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">last-pair</span><span class="w"> </span><span class="n">lst</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">lst</span><span class="p">))</span><span class="w"> </span><span class="n">lst</span><span class="w"> </span><span class="p">(</span><span class="nb">last-pair</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">lst</span><span class="p">))))</span>
<span class="p">(</span><span class="nb">last-pair</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">23</span><span class="w"> </span><span class="mi">72</span><span class="w"> </span><span class="mi">149</span><span class="w"> </span><span class="mi">34</span><span class="p">))</span>
</code></pre></div>
<div class="code-output"><span>Output:</span><pre>(34)
</pre></div></div>


#### Exercise 2.18

Define a procedure `reverse`
that takes a list as argument and returns a list of the same elements in
reverse order:



```rkt
(reverse (list 1 4 9 16 25))
(25 16 9 4 1)
```



##### Solution



<div class="code-box"><div class="code-header"><a href="code/ex2-18.rkt">ex2-18.rkt</a></div><div class="codehilite" data-language="racket"><pre><code><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="c1">; reverse(a b c ... z) = (reverse(b c ... z) a) = (z reverse(a b ... y))</span>
<span class="c1">;; This works, but it's going to be god-awful slow!!! :(</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">last-elem</span><span class="w"> </span><span class="n">lst</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">lst</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">lst</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">last-elem</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">lst</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">most</span><span class="w"> </span><span class="n">lst</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">lst</span><span class="p">))</span><span class="w"> </span><span class="n">nil</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">lst</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">most</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">lst</span><span class="p">)))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">reverse-n2</span><span class="w"> </span><span class="n">lst</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="n">lst</span><span class="p">)</span><span class="w"> </span><span class="n">nil</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="p">(</span><span class="n">last-elem</span><span class="w"> </span><span class="n">lst</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">reverse-n2</span><span class="w"> </span><span class="p">(</span><span class="n">most</span><span class="w"> </span><span class="n">lst</span><span class="p">)))))</span>

<span class="c1">;; This works and is much faster. Reversing a linked list naturally </span>
<span class="c1">;; wants to use tail recursion!</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">reverse</span><span class="w"> </span><span class="n">lst</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">reverse-help</span><span class="w"> </span><span class="n">lst</span><span class="w"> </span><span class="n">ret</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="n">lst</span><span class="p">)</span><span class="w"> </span>
<span class="w">      </span><span class="n">ret</span><span class="w"> </span>
<span class="w">     </span><span class="p">(</span><span class="n">reverse-help</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">lst</span><span class="p">)</span><span class="w"> </span>
<span class="w">		   </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">lst</span><span class="p">)</span><span class="w"> </span><span class="n">ret</span><span class="p">))))</span>
<span class="w">  </span><span class="p">(</span><span class="n">reverse-help</span><span class="w"> </span><span class="n">lst</span><span class="w"> </span><span class="n">nil</span><span class="p">))</span>

<span class="c1">;; Let's test both versions</span>
<span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="p">(</span><span class="nb">reverse</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="mi">3</span><span class="w"> </span><span class="mi">4</span><span class="w"> </span><span class="mi">5</span><span class="w"> </span><span class="mi">6</span><span class="p">)))</span>
<span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="p">(</span><span class="nb">reverse</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">2</span><span class="p">)))</span>
<span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="p">(</span><span class="nb">reverse</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="p">)))</span>
<span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="p">(</span><span class="nb">reverse</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="p">)))</span>
<span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="p">(</span><span class="n">reverse-n2</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="mi">3</span><span class="w"> </span><span class="mi">4</span><span class="w"> </span><span class="mi">5</span><span class="w"> </span><span class="mi">6</span><span class="p">)))</span>
<span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="p">(</span><span class="n">reverse-n2</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">2</span><span class="p">)))</span>
<span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="p">(</span><span class="n">reverse-n2</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="p">)))</span>
<span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="p">(</span><span class="n">reverse-n2</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="p">)))</span>
<span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
</code></pre></div>
<div class="code-output"><span>Output:</span><pre>(6 5 4 3 2 1)
(2 1)
(1)
()
(6 5 4 3 2 1)
(2 1)
(1)
()
</pre></div></div>


> “What else are lists,” you reply, your eyes flashing, “But alternatives?”

https://aphyr.com/posts/340-reversing-the-technical-interview

#### Exercise 2.19

Consider the change-counting
program of 1.2.2.  It would be nice to be able to easily change
the currency used by the program, so that we could compute the number of ways
to change a British pound, for example.  As the program is written, the
knowledge of the currency is distributed partly into the procedure
`first-denomination` and partly into the procedure `count-change`
(which knows that there are five kinds of U.S. coins).  It would be nicer to be
able to supply a list of coins to be used for making change.

We want to rewrite the procedure `cc` so that its second argument is a
list of the values of the coins to use rather than an integer specifying which
coins to use.  We could then have lists that defined each kind of currency:



```rkt
(define us-coins 
  (list 50 25 10 5 1))

(define uk-coins 
  (list 100 50 20 10 5 2 1 0.5))
```



We could then call `cc` as follows:



```rkt
(cc 100 us-coins)
292
```



To do this will require changing the program `cc` somewhat.  It will still
have the same form, but it will access its second argument differently, as
follows:



```rkt
(define (cc amount coin-values)
  (cond ((= amount 0) 
         1)
        ((or (< amount 0) 
             (no-more? coin-values)) 
         0)
        (else
         (+ (cc 
             amount
             (except-first-denomination 
              coin-values))
            (cc 
             (- amount
                (first-denomination 
                 coin-values))
             coin-values)))))
```



Define the procedures `first-denomination`,
`except-first-denomination` and `no-more?` in terms of primitive
operations on list structures.  Does the order of the list `coin-values`
affect the answer produced by `cc`?  Why or why not?

##### Solution


<div class="code-box"><div class="code-header"><a href="code/ex2-19.rkt">ex2-19.rkt</a></div><div class="codehilite" data-language="racket"><pre><code><span class="kn">#lang </span><span class="nn">sicp</span>


<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">cc</span><span class="w"> </span><span class="n">amount</span><span class="w"> </span><span class="n">coin-values</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">no-more?</span><span class="w"> </span><span class="nb">null?</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">except-first-denomination</span><span class="w"> </span><span class="nb">cdr</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">first-denomination</span><span class="w"> </span><span class="nb">car</span><span class="p">)</span>
<span class="w">  </span><span class="c1">;;(define (except-first-denomination lst) (cdr lst))</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">=</span><span class="w"> </span><span class="n">amount</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span><span class="w"> </span>
<span class="w">         </span><span class="mi">1</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="k">or</span><span class="w"> </span><span class="p">(</span><span class="nb">&lt;</span><span class="w"> </span><span class="n">amount</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span><span class="w"> </span>
<span class="w">             </span><span class="p">(</span><span class="n">no-more?</span><span class="w"> </span><span class="n">coin-values</span><span class="p">))</span><span class="w"> </span>
<span class="w">         </span><span class="mi">0</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span>
<span class="w">         </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="p">(</span><span class="n">cc</span><span class="w"> </span>
<span class="w">             </span><span class="n">amount</span>
<span class="w">             </span><span class="p">(</span><span class="n">except-first-denomination</span><span class="w"> </span>
<span class="w">              </span><span class="n">coin-values</span><span class="p">))</span>
<span class="w">            </span><span class="p">(</span><span class="n">cc</span><span class="w"> </span>
<span class="w">             </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">amount</span>
<span class="w">                </span><span class="p">(</span><span class="n">first-denomination</span><span class="w"> </span>
<span class="w">                 </span><span class="n">coin-values</span><span class="p">))</span>
<span class="w">             </span><span class="n">coin-values</span><span class="p">)))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">us-coins</span>
<span class="w">  </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">50</span><span class="w"> </span><span class="mi">25</span><span class="w"> </span><span class="mi">10</span><span class="w"> </span><span class="mi">5</span><span class="w"> </span><span class="mi">1</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">uk-coins</span>
<span class="w">  </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">100</span><span class="w"> </span><span class="mi">50</span><span class="w"> </span><span class="mi">20</span><span class="w"> </span><span class="mi">10</span><span class="w"> </span><span class="mi">5</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mf">0.5</span><span class="p">))</span>
<span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="p">(</span><span class="n">cc</span><span class="w"> </span><span class="mi">100</span><span class="w"> </span><span class="n">us-coins</span><span class="p">))</span>
<span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="p">(</span><span class="n">cc</span><span class="w"> </span><span class="mi">100</span><span class="w"> </span><span class="n">uk-coins</span><span class="p">))</span>
<span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="p">(</span><span class="n">cc</span><span class="w"> </span><span class="mi">100</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">100</span><span class="w"> </span><span class="mi">50</span><span class="w"> </span><span class="mi">20</span><span class="w"> </span><span class="mi">10</span><span class="w"> </span><span class="mi">5</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mf">0.5</span><span class="p">)))</span>
<span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="p">(</span><span class="n">cc</span><span class="w"> </span><span class="mi">100</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">100</span><span class="w"> </span><span class="mf">0.5</span><span class="w"> </span><span class="mi">50</span><span class="w"> </span><span class="mi">5</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="mi">20</span><span class="w"> </span><span class="mi">10</span><span class="p">)))</span>
<span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="p">(</span><span class="n">cc</span><span class="w"> </span><span class="mi">100</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">20</span><span class="w"> </span><span class="mi">100</span><span class="w"> </span><span class="mi">10</span><span class="w"> </span><span class="mi">5</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mf">0.5</span><span class="w"> </span><span class="mi">50</span><span class="p">)))</span>
<span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="p">(</span><span class="n">cc</span><span class="w"> </span><span class="mi">100</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">20</span><span class="w"> </span><span class="mi">50</span><span class="w"> </span><span class="mi">10</span><span class="w"> </span><span class="mi">5</span><span class="w"> </span><span class="mf">0.5</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">100</span><span class="p">)))</span>
<span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
</code></pre></div>
<div class="code-output"><span>Output:</span><pre>292
104561
104561
104561
104561
104561
</pre></div></div>

Pretty simple definitions, and we've demonstrated that the order doesn't matter.

#### Exercise 2.20

The procedures `+`,
`*`, and `list` take arbitrary numbers of arguments. One way to
define such procedures is to use `define` with dotted-tail notation.  
In a procedure definition, a parameter list that has a dot before
the last parameter name indicates that, when the procedure is called, the
initial parameters (if any) will have as values the initial arguments, as
usual, but the final parameter's value will be a list of any
remaining arguments.  For instance, given the definition



```rkt
(define (f x y . z) ⟨body⟩)
```




the procedure `f` can be called with two or more arguments.  If we
evaluate



```rkt
(f 1 2 3 4 5 6)
```




then in the body of `f`, `x` will be 1, `y` will be 2, and
`z` will be the list `(3 4 5 6)`.  Given the definition



```rkt
(define (g . w) ⟨body⟩)
```




the procedure `g` can be called with zero or more arguments.  If we
evaluate



```rkt
(g 1 2 3 4 5 6)
```




then in the body of `g`, `w` will be the list `(1 2 3 4 5
6)`.

Use this notation to write a procedure `same-parity` that takes one or
more integers and returns a list of all the arguments that have the same
even-odd parity as the first argument.  For example,



```rkt
(same-parity 1 2 3 4 5 6 7)
(1 3 5 7)

(same-parity 2 3 4 5 6 7)
(2 4 6)
```



##### Solution



<div class="code-box"><div class="code-header"><a href="code/ex2-20.rkt">ex2-20.rkt</a></div><div class="codehilite" data-language="racket"><pre><code><span class="kn">#lang </span><span class="nn">sicp</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">same-parity</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="o">.</span><span class="w"> </span><span class="n">b</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">same-parity-inner</span><span class="w"> </span><span class="n">lst2</span><span class="w"> </span><span class="n">rem</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">null?</span><span class="w"> </span><span class="n">lst2</span><span class="p">)</span><span class="w"> </span><span class="n">nil</span><span class="p">)</span>
<span class="w">      	  </span><span class="p">((</span><span class="nb">=</span><span class="w"> </span><span class="n">rem</span><span class="w"> </span><span class="p">(</span><span class="nb">remainder</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">lst2</span><span class="p">)</span><span class="w"> </span><span class="mi">2</span><span class="p">))</span><span class="w"> </span>
<span class="w">	      </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">lst2</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">same-parity-inner</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">lst2</span><span class="p">)</span><span class="w"> </span><span class="n">rem</span><span class="p">)))</span>
<span class="w">	  </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="n">same-parity-inner</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">lst2</span><span class="p">)</span><span class="w"> </span><span class="n">rem</span><span class="p">))))</span>
<span class="w">  </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="p">(</span><span class="n">same-parity-inner</span><span class="w"> </span><span class="n">b</span><span class="w"> </span><span class="p">(</span><span class="nb">remainder</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="mi">2</span><span class="p">))))</span>
<span class="p">(</span><span class="n">same-parity</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="mi">3</span><span class="w"> </span><span class="mi">4</span><span class="w"> </span><span class="mi">5</span><span class="w"> </span><span class="mi">6</span><span class="w"> </span><span class="mi">7</span><span class="p">)</span>
<span class="c1">;(1 3 5 7)</span>
<span class="p">(</span><span class="n">same-parity</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="mi">3</span><span class="w"> </span><span class="mi">4</span><span class="w"> </span><span class="mi">5</span><span class="w"> </span><span class="mi">6</span><span class="w"> </span><span class="mi">7</span><span class="p">)</span>
<span class="c1">;(2 4 6)</span>
</code></pre></div>
<div class="code-output"><span>Output:</span><pre>(1 3 5 7)
(2 4 6)
</pre></div></div>


#### Exercise 2.21

The procedure `square-list`
takes a list of numbers as argument and returns a list of the squares of those
numbers.



```rkt
(square-list (list 1 2 3 4))
(1 4 9 16)
```



Here are two different definitions of `square-list`.  Complete both of
them by filling in the missing expressions:



```rkt
(define (square-list items)
  (if (null? items)
      nil
      (cons ⟨??⟩ ⟨??⟩)))

(define (square-list items)
  (map ⟨??⟩ ⟨??⟩))
```



##### Solution



<div class="code-box"><div class="code-header"><a href="code/ex2-21.rkt">ex2-21.rkt</a></div><div class="codehilite" data-language="racket"><pre><code><span class="kn">#lang </span><span class="nn">sicp</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">square</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>

<span class="c1">;; Stubbornly trying to use tail recursion. This is a stupid idea, </span>
<span class="c1">;; but there you go.</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">square-list1</span><span class="w"> </span><span class="n">lst</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">squar-list</span><span class="w"> </span><span class="n">lst</span><span class="w"> </span><span class="n">ret</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="n">lst</span><span class="p">)</span><span class="w"> </span>
<span class="w">     </span><span class="p">(</span><span class="nb">reverse</span><span class="w"> </span><span class="n">ret</span><span class="p">)</span>
<span class="w">     </span><span class="p">(</span><span class="n">squar-list</span><span class="w"> </span>
<span class="w">	       </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">lst</span><span class="p">)</span><span class="w"> </span>
<span class="w">	       </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="p">(</span><span class="n">square</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">lst</span><span class="p">))</span><span class="w"> </span><span class="n">ret</span><span class="p">))))</span>
<span class="w">  </span><span class="p">(</span><span class="n">squar-list</span><span class="w"> </span><span class="n">lst</span><span class="w"> </span><span class="n">nil</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">square-list2</span><span class="w"> </span><span class="n">items</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="n">items</span><span class="p">)</span>
<span class="w">      </span><span class="n">nil</span>
<span class="w">      </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="p">(</span><span class="n">square</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">items</span><span class="p">))</span><span class="w"> </span>
<span class="w">	    </span><span class="p">(</span><span class="n">square-list2</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">items</span><span class="p">)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">square-list3</span><span class="w"> </span><span class="n">items</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="n">square</span><span class="w"> </span><span class="n">items</span><span class="p">))</span>
<span class="p">(</span><span class="n">square-list1</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="mi">3</span><span class="w"> </span><span class="mi">4</span><span class="w"> </span><span class="mi">5</span><span class="w"> </span><span class="mi">6</span><span class="w"> </span><span class="mi">7</span><span class="p">))</span>
<span class="p">(</span><span class="n">square-list2</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="mi">3</span><span class="w"> </span><span class="mi">4</span><span class="w"> </span><span class="mi">5</span><span class="w"> </span><span class="mi">6</span><span class="w"> </span><span class="mi">7</span><span class="p">))</span>
<span class="p">(</span><span class="n">square-list3</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="mi">3</span><span class="w"> </span><span class="mi">4</span><span class="w"> </span><span class="mi">5</span><span class="w"> </span><span class="mi">6</span><span class="w"> </span><span class="mi">7</span><span class="p">))</span>
</code></pre></div>
<div class="code-output"><span>Output:</span><pre>(1 4 9 16 25 36 49)
(1 4 9 16 25 36 49)
(1 4 9 16 25 36 49)
</pre></div></div>


#### Exercise 2.22

Louis Reasoner tries to rewrite
the first `square-list` procedure of Exercise 2.21 so that it
evolves an iterative process:



```rkt
(define (square-list items)
  (define (iter things answer)
    (if (null? things)
        answer
        (iter (cdr things)
              (cons (square (car things))
                    answer))))
  (iter items nil))
```



Unfortunately, defining `square-list` this way produces the answer list in
the reverse order of the one desired.  Why?

Louis then tries to fix his bug by interchanging the arguments to `cons`:



```rkt
(define (square-list items)
  (define (iter things answer)
    (if (null? things)
        answer
        (iter (cdr things)
              (cons answer
                    (square 
                     (car things))))))
  (iter items nil))
```



This doesn't work either.  Explain.

##### Solution

This doesn't work, because it's a depth-first list! 


```rkt
;; We want this:
(cons 1 (cons 4 (cons 9 (cons 16 nil))))
;; We get this:
(cons (cons (cons (cons nil 1) 4) 9) 16)
```



I solved this in 2.22 by doing the first method and adding a reverse, which is another O(n) operation but it's only called once, so the entire method is still only O(n).

Checking:


<div class="code-box"><div class="code-header"><a href="code/ex2-22.rkt">ex2-22.rkt</a></div><div class="codehilite" data-language="racket"><pre><code><span class="kn">#lang </span><span class="nn">sicp</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">square</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">square-list</span><span class="w"> </span><span class="n">items</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="n">square</span><span class="w"> </span><span class="n">items</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">square-list-louis</span><span class="w"> </span><span class="n">items</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">iter</span><span class="w"> </span><span class="n">things</span><span class="w"> </span><span class="n">answer</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="n">things</span><span class="p">)</span>
<span class="w">        </span><span class="n">answer</span>
<span class="w">        </span><span class="p">(</span><span class="n">iter</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">things</span><span class="p">)</span>
<span class="w">              </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">answer</span>
<span class="w">                    </span><span class="p">(</span><span class="n">square</span><span class="w"> </span>
<span class="w">                     </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">things</span><span class="p">))))))</span>
<span class="w">  </span><span class="p">(</span><span class="n">iter</span><span class="w"> </span><span class="n">items</span><span class="w"> </span><span class="n">nil</span><span class="p">))</span>
<span class="p">(</span><span class="n">square-list</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="mi">3</span><span class="w"> </span><span class="mi">4</span><span class="p">))</span>
<span class="p">(</span><span class="n">square-list-louis</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="mi">3</span><span class="w"> </span><span class="mi">4</span><span class="p">))</span>
</code></pre></div>
<div class="code-output"><span>Output:</span><pre>(1 4 9 16)
((((() . 1) . 4) . 9) . 16)
</pre></div></div>


#### Exercise 2.23

The procedure `for-each` is
similar to `map`.  It takes as arguments a procedure and a list of
elements.  However, rather than forming a list of the results, `for-each`
just applies the procedure to each of the elements in turn, from left to right.
The values returned by applying the procedure to the elements are not used at
all---`for-each` is used with procedures that perform an action, such as
printing.  For example,



```rkt
(for-each 
 (lambda (x) (newline) (display x))
 (list 57 321 88))

57
321
88
```



The value returned by the call to `for-each` (not illustrated above) can
be something arbitrary, such as true.  Give an implementation of
`for-each`.

##### Solution



<div class="code-box"><div class="code-header"><a href="code/ex2-23.rkt">ex2-23.rkt</a></div><div class="codehilite" data-language="racket"><pre><code><span class="kn">#lang </span><span class="nn">sicp</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">for-each</span><span class="w"> </span><span class="n">lamb</span><span class="w"> </span><span class="n">lst</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="n">lamb</span><span class="w"> </span><span class="n">lst</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="no">#f</span><span class="w"> </span><span class="n">nil</span><span class="p">))</span>
<span class="p">(</span><span class="nb">for-each</span>
<span class="w">  </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="w">  </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">57</span><span class="w"> </span><span class="mi">321</span><span class="w"> </span><span class="mi">88</span><span class="p">))</span>
</code></pre></div>
<div class="code-output"><span>Output:</span><pre>
57
321
88</pre></div></div>


#### Exercise 2.24

Suppose we evaluate the
expression `(list 1 (list 2 (list 3 4)))`.  Give the result printed by the
interpreter, the corresponding box-and-pointer structure, and the
interpretation of this as a tree (as in Figure 2.6).

##### Solution

<div style="text-align: center; margin: 20px 0;">
  <img src="media/ex2-24.svg" style="width: 70%; max-width: 800px;" alt="It's the answer to the question. David gets an A+">
</div>
To view this as a tree, tilt your head 45 degrees.

This should print out `(1 (2 (3 4)))`?



<div class="code-box"><div class="code-header"><a href="code/ex2-24.rkt">ex2-24.rkt</a></div><div class="codehilite" data-language="racket"><pre><code><span class="kn">#lang </span><span class="nn">sicp</span>
<span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">3</span><span class="w"> </span><span class="mi">4</span><span class="p">)))</span>
</code></pre></div>
<div class="code-output"><span>Output:</span><pre>(1 (2 (3 4)))
</pre></div></div>


#### Exercise 2.25

Give combinations of `car`s
and `cdr`s that will pick 7 from each of the following lists:



```rkt
(1 3 (5 7) 9)
((7))
(1 (2 (3 (4 (5 (6 7))))))
```



##### Solution

Got it right in one try btw, B)



<div class="code-box"><div class="code-header"><a href="code/ex2-25.rkt">ex2-25.rkt</a></div><div class="codehilite" data-language="racket"><pre><code><span class="kn">#lang </span><span class="nn">sicp</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">list1</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">3</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">5</span><span class="w"> </span><span class="mi">7</span><span class="p">)</span><span class="w"> </span><span class="mi">9</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">list2</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">7</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">list3</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">3</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">4</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">5</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">6</span><span class="w"> </span><span class="mi">7</span><span class="p">)))))))</span>

<span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">list1</span><span class="p">)))))</span>
<span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">list2</span><span class="p">))</span>
<span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">list3</span><span class="p">))))))))))))</span>
</code></pre></div>
<div class="code-output"><span>Output:</span><pre>7
7
7
</pre></div></div>


#### Exercise 2.26

Suppose we define `x` and
`y` to be two lists:



```rkt
(define x (list 1 2 3))
(define y (list 4 5 6))
```



What result is printed by the interpreter in response to evaluating each of the
following expressions:



```rkt
(append x y)
(cons x y)
(list x y)
```



##### Solution

Expected answer:


```rkt
(1 2 3 4 5 6)
((1 2 3) . (4 5 6))
((1 2 3) (4 5 6))
```





<div class="code-box"><div class="code-header"><a href="code/ex2-26.rkt">ex2-26.rkt</a></div><div class="codehilite" data-language="racket"><pre><code><span class="kn">#lang </span><span class="nn">sicp</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="mi">3</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">y</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">4</span><span class="w"> </span><span class="mi">5</span><span class="w"> </span><span class="mi">6</span><span class="p">))</span>
<span class="p">(</span><span class="nb">append</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">y</span><span class="p">)</span>
<span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">y</span><span class="p">)</span>
<span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">y</span><span class="p">)</span>
</code></pre></div>
<div class="code-output"><span>Output:</span><pre>(1 2 3 4 5 6)
((1 2 3) 4 5 6)
((1 2 3) (4 5 6))
</pre></div></div>


Ok, dang I got the middle list wrong! That does make sense though, the structure is

`(c (c 1 (c 2 (c 3 nil))) (c 4 (c 5 (c 6 nil))))`

which is a list with a list as its first element, and the elements 4,5,6 as the rest of it.

#### Exercise 2.27

Modify your `reverse`
procedure of Exercise 2.18 to produce a `deep-reverse` procedure
that takes a list as argument and returns as its value the list with its
elements reversed and with all sublists deep-reversed as well.  For example,



```rkt
(define x 
  (list (list 1 2) (list 3 4)))

x
((1 2) (3 4))

(reverse x)
((3 4) (1 2))

(deep-reverse x)
((4 3) (2 1))
```



##### Solution



<div class="code-box"><div class="code-header"><a href="code/ex2-27.rkt">ex2-27.rkt</a></div><div class="codehilite" data-language="racket"><pre><code><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">deep-reverse</span><span class="w"> </span><span class="n">lst</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">reverse-help</span><span class="w"> </span><span class="n">lst</span><span class="w"> </span><span class="n">ret</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="n">lst</span><span class="p">)</span><span class="w"> </span>
<span class="w">      </span><span class="n">ret</span><span class="w"> </span>
<span class="w">     </span><span class="p">(</span><span class="n">reverse-help</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">lst</span><span class="p">)</span><span class="w"> </span>
<span class="w">		   </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="p">(</span><span class="n">deep-reverse</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">lst</span><span class="p">))</span><span class="w"> </span><span class="n">ret</span><span class="p">))))</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="nb">pair?</span><span class="w"> </span><span class="n">lst</span><span class="p">))</span><span class="w"> </span>
<span class="w">    </span><span class="n">lst</span>
<span class="w">    </span><span class="p">(</span><span class="n">reverse-help</span><span class="w"> </span><span class="n">lst</span><span class="w"> </span><span class="n">nil</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">x</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">2</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">3</span><span class="w"> </span><span class="mi">4</span><span class="p">)))</span>

<span class="p">(</span><span class="n">deep-reverse</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
</code></pre></div>
<div class="code-output"><span>Output:</span><pre>((4 3) (2 1))
</pre></div></div>


#### Exercise 2.28

Write a procedure `fringe`
that takes as argument a tree (represented as a list) and returns a list whose
elements are all the leaves of the tree arranged in left-to-right order.  For
example,



```rkt
(define x 
  (list (list 1 2) (list 3 4)))

(fringe x)
(1 2 3 4)

(fringe (list x x))
(1 2 3 4 1 2 3 4)
```



##### Solution
Very straightforward as a recursive procedure using append.
The fringe of a list is the fringe of the elements of the list appended in order.


<div class="code-box"><div class="code-header"><a href="code/ex2-28.rkt">ex2-28.rkt</a></div><div class="codehilite" data-language="racket"><pre><code><span class="kn">#lang </span><span class="nn">sicp</span>


<span class="c1">;;Way too complicated!</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">append-at</span><span class="w"> </span><span class="n">lst</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">listify</span><span class="w"> </span><span class="n">arg</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">pair?</span><span class="w"> </span><span class="n">arg</span><span class="p">)</span><span class="w"> </span><span class="n">arg</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="n">arg</span><span class="p">)))</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="k">or</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="n">lst</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="nb">pair?</span><span class="w"> </span><span class="n">lst</span><span class="p">)))</span><span class="w"> </span><span class="n">lst</span>
<span class="w">    </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">a</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">lst</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="n">b</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">lst</span><span class="p">)))</span>
<span class="w">      </span><span class="p">(</span><span class="nb">append</span><span class="w"> </span><span class="p">(</span><span class="n">listify</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">lst</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="n">append-at</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">lst</span><span class="p">))))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">fringe</span><span class="w"> </span><span class="n">lst</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">pair?</span><span class="w"> </span><span class="n">lst</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="n">append-at</span><span class="w"> </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="n">fringe</span><span class="w"> </span><span class="n">lst</span><span class="p">))</span>
<span class="w">    </span><span class="n">lst</span><span class="p">))</span>

<span class="c1">;;Solution from Solving SICP</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">fringe2</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">fringe-iter</span><span class="w"> </span><span class="n">tree</span><span class="w"> </span><span class="n">accumulator</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">null?</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span>
<span class="w">          </span><span class="p">((</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="nb">pair?</span><span class="w"> </span><span class="n">tree</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="n">tree</span><span class="p">))</span>
<span class="w">	  </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">append</span><span class="w"> </span><span class="n">accumulator</span>
<span class="w">		  </span><span class="p">(</span><span class="n">fringe-iter</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span><span class="w"> </span><span class="n">nil</span><span class="p">)</span>
<span class="w">		  </span><span class="p">(</span><span class="n">fringe-iter</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span><span class="w"> </span><span class="n">nil</span><span class="p">)))))</span>
<span class="w">  </span><span class="p">(</span><span class="n">fringe-iter</span><span class="w"> </span><span class="n">tree</span><span class="w"> </span><span class="n">nil</span><span class="p">))</span>

<span class="c1">;;Yet simpler solution from https://billthelizard.blogspot.com/2011/02/sicp-228-flattening-nested-lists.html</span>
<span class="c1">;; The way I was trying to use map for fringe-v1 made things more complicated.</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">fringe3</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">null?</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span><span class="w"> </span><span class="n">nil</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="nb">pair?</span><span class="w"> </span><span class="n">tree</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="n">tree</span><span class="p">))</span>
<span class="w">	</span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">append</span><span class="w"> </span><span class="p">(</span><span class="n">fringe</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">tree</span><span class="p">))</span>
<span class="w">	              </span><span class="p">(</span><span class="n">fringe</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">tree</span><span class="p">))))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">x</span>
<span class="w">  </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">2</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">3</span><span class="w"> </span><span class="mi">4</span><span class="p">)))</span>

<span class="p">(</span><span class="n">fringe</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="p">(</span><span class="n">fringe2</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="p">(</span><span class="n">fringe3</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="p">(</span><span class="n">fringe</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="p">(</span><span class="n">fringe2</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="p">(</span><span class="n">fringe3</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
</code></pre></div>
<div class="code-output"><span>Output:</span><pre>(1 2 3 4)
(1 2 3 4)
(1 2 3 4)
(1 2 3 4 1 2 3 4)
(1 2 3 4 1 2 3 4)
(1 2 3 4 1 2 3 4)
</pre></div></div>


#### Exercise 2.29

A binary mobile consists of two
branches, a left branch and a right branch.  Each branch is a rod of a certain
length, from which hangs either a weight or another binary mobile.  We can
represent a binary mobile using compound data by constructing it from two
branches (for example, using `list`):



```rkt
(define (make-mobile left right)
  (list left right))
```



A branch is constructed from a `length` (which must be a number) together
with a `structure`, which may be either a number (representing a simple
weight) or another mobile:



```rkt
(define (make-branch length structure)
  (list length structure))
```



**1.** Write the corresponding selectors `left-branch` and `right-branch`,
which return the branches of a mobile, and `branch-length` and
`branch-structure`, which return the components of a branch.

**2.** Using your selectors, define a procedure `total-weight` that returns the
total weight of a mobile.

**3.** A mobile is said to be balanced if the torque applied by its top-left
branch is equal to that applied by its top-right branch (that is, if the length
of the left rod multiplied by the weight hanging from that rod is equal to the
corresponding product for the right side) and if each of the submobiles hanging
off its branches is balanced. Design a predicate that tests whether a binary
mobile is balanced.

**4.** Suppose we change the representation of mobiles so that the constructors are



```rkt
(define (make-mobile left right)
  (cons left right))

(define (make-branch length structure)
  (cons length structure))
```



How much do you need to change your programs to convert to the new
representation?

##### Solution



<div class="code-box"><div class="code-header"><a href="code/ex2-29.rkt">ex2-29.rkt</a></div><div class="codehilite" data-language="racket"><pre><code><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="c1">;; part 1</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-mobile</span><span class="w"> </span><span class="n">left</span><span class="w"> </span><span class="n">right</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="n">left</span><span class="w"> </span><span class="n">right</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">left-branch</span><span class="w"> </span><span class="n">mobile</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">mobile</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">right-branch</span><span class="w"> </span><span class="n">mobile</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">mobile</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">make-branch</span><span class="w"> </span><span class="nb">length</span><span class="w"> </span><span class="n">mobile</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="nb">length</span><span class="w"> </span><span class="n">mobile</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">branch-length</span><span class="w"> </span><span class="n">branch</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">branch</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">branch-mobile</span><span class="w"> </span><span class="n">branch</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">branch</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">branch-leaf?</span><span class="w"> </span><span class="n">branch</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="nb">pair?</span><span class="w"> </span><span class="p">(</span><span class="n">branch-mobile</span><span class="w"> </span><span class="n">branch</span><span class="p">))))</span>

<span class="c1">;; part 2</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">total-weight</span><span class="w"> </span><span class="n">mobile</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">pair?</span><span class="w"> </span><span class="n">mobile</span><span class="p">)</span><span class="w"> </span>
<span class="w">    </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="p">(</span><span class="n">total-weight</span><span class="w"> </span><span class="p">(</span><span class="n">branch-mobile</span><span class="w"> </span><span class="p">(</span><span class="n">left-branch</span><span class="w"> </span><span class="n">mobile</span><span class="p">)))</span><span class="w"> </span>
<span class="w">       </span><span class="p">(</span><span class="n">total-weight</span><span class="w"> </span><span class="p">(</span><span class="n">branch-mobile</span><span class="w"> </span><span class="p">(</span><span class="n">right-branch</span><span class="w"> </span><span class="n">mobile</span><span class="p">))))</span>
<span class="w">    </span><span class="n">mobile</span><span class="p">))</span>


<span class="c1">;; part 3</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">torque</span><span class="w"> </span><span class="n">mobile</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">left</span><span class="w">  </span><span class="p">(</span><span class="n">left-branch</span><span class="w"> </span><span class="n">mobile</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="n">right</span><span class="w"> </span><span class="p">(</span><span class="n">right-branch</span><span class="w"> </span><span class="n">mobile</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="p">(</span><span class="n">branch-length</span><span class="w"> </span><span class="n">left</span><span class="p">)</span><span class="w"> </span>
<span class="w">          </span><span class="p">(</span><span class="n">total-weight</span><span class="w"> </span><span class="p">(</span><span class="n">branch-mobile</span><span class="w"> </span><span class="n">left</span><span class="p">)))</span>
<span class="w">       </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="p">(</span><span class="n">branch-length</span><span class="w"> </span><span class="n">right</span><span class="p">)</span><span class="w"> </span>
<span class="w">          </span><span class="p">(</span><span class="n">total-weight</span><span class="w"> </span><span class="p">(</span><span class="n">branch-mobile</span><span class="w"> </span><span class="n">right</span><span class="p">))))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">echo</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">balanced?</span><span class="w"> </span><span class="n">mobile</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">pair?</span><span class="w"> </span><span class="n">mobile</span><span class="p">)</span><span class="w"> </span>
<span class="w">    </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="p">(</span><span class="n">torque</span><span class="w"> </span><span class="n">mobile</span><span class="p">)</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="n">balanced?</span><span class="w"> </span><span class="p">(</span><span class="n">branch-mobile</span><span class="w"> </span><span class="p">(</span><span class="n">left-branch</span><span class="w"> </span><span class="n">mobile</span><span class="p">)))</span>
<span class="w">      </span><span class="p">(</span><span class="n">balanced?</span><span class="w"> </span><span class="p">(</span><span class="n">branch-mobile</span><span class="w"> </span><span class="p">(</span><span class="n">right-branch</span><span class="w"> </span><span class="n">mobile</span><span class="p">))))</span>
<span class="w">    </span><span class="no">#t</span><span class="p">))</span>
<span class="w">  </span>
<span class="c1">;; total weight 5</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">x1</span><span class="w"> </span><span class="p">(</span><span class="n">make-mobile</span><span class="w"> </span><span class="p">(</span><span class="n">make-branch</span><span class="w"> </span><span class="mi">4</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">make-branch</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">4</span><span class="p">)))</span>
<span class="c1">;; total weight 4</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">x2</span><span class="w"> </span><span class="p">(</span><span class="n">make-mobile</span><span class="w"> </span><span class="p">(</span><span class="n">make-branch</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="mi">3</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">make-branch</span><span class="w"> </span><span class="mi">6</span><span class="w"> </span><span class="mi">1</span><span class="p">)))</span>
<span class="c1">;; total weight 8</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">x3</span><span class="w"> </span><span class="p">(</span><span class="n">make-mobile</span><span class="w"> </span><span class="p">(</span><span class="n">make-branch</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="n">x2</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">make-branch</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="n">x2</span><span class="p">)))</span>
<span class="c1">;; total weight 20</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">x4</span><span class="w"> </span><span class="p">(</span><span class="n">make-mobile</span><span class="w"> </span><span class="p">(</span><span class="n">make-branch</span><span class="w"> </span><span class="mi">8</span><span class="w"> </span><span class="mi">4</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">make-branch</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="mi">16</span><span class="p">)))</span>
<span class="c1">;; Total weight 13</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">x5</span><span class="w"> </span><span class="p">(</span><span class="n">make-mobile</span><span class="w"> </span><span class="p">(</span><span class="n">make-branch</span><span class="w"> </span><span class="mi">4</span><span class="w"> </span><span class="n">x1</span><span class="p">)</span><span class="w"> </span><span class="c1">;; torque 20</span>
<span class="w">             </span><span class="p">(</span><span class="n">make-branch</span><span class="w"> </span><span class="m">20/8</span><span class="w"> </span><span class="n">x3</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">x6</span><span class="w"> </span><span class="p">(</span><span class="n">make-mobile</span>
<span class="w">            </span><span class="p">(</span><span class="n">make-branch</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="n">x4</span><span class="p">)</span><span class="w"> </span><span class="c1">;; torque of 40</span>
<span class="w">            </span><span class="p">(</span><span class="n">make-branch</span><span class="w"> </span><span class="m">40/13</span><span class="w"> </span><span class="n">x5</span><span class="p">)))</span><span class="w"> </span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">y1</span><span class="w"> </span><span class="p">(</span><span class="n">make-mobile</span><span class="w"> </span><span class="p">(</span><span class="n">make-branch</span><span class="w"> </span><span class="mi">5</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">make-branch</span><span class="w"> </span><span class="mi">3</span><span class="w"> </span><span class="mi">10</span><span class="p">)))</span>

<span class="c1">;; All the x's should be balanced</span>
<span class="p">(</span><span class="n">balanced?</span><span class="w"> </span><span class="n">x1</span><span class="p">)</span>
<span class="p">(</span><span class="n">balanced?</span><span class="w"> </span><span class="n">x2</span><span class="p">)</span>
<span class="p">(</span><span class="n">balanced?</span><span class="w"> </span><span class="n">x3</span><span class="p">)</span>
<span class="p">(</span><span class="n">balanced?</span><span class="w"> </span><span class="n">x4</span><span class="p">)</span>
<span class="p">(</span><span class="n">balanced?</span><span class="w"> </span><span class="n">x5</span><span class="p">)</span>
<span class="p">(</span><span class="n">balanced?</span><span class="w"> </span><span class="n">x6</span><span class="p">)</span>
<span class="c1">;; And y isn't.</span>
<span class="p">(</span><span class="n">balanced?</span><span class="w"> </span><span class="n">y1</span><span class="p">)</span>
</code></pre></div>
<div class="code-output"><span>Output:</span><pre>#t
#t
#t
#t
#t
#t
#f
</pre></div></div>


For part 4, we just need to change the functions with car and cdr in them. Pretty trivial.


```rkt
(define (left-branch mobile) (car mobile))
(define (right-branch mobile) (cdr mobile))
(define (branch-length branch) (car branch))
(define (branch-mobile branch) (cdr branch))
```



#### Exercise 2.30

Define a procedure
`square-tree` analogous to the `square-list` procedure of
Exercise 2.21.  That is, `square-tree` should behave as follows:



```rkt
(square-tree
 (list 1
       (list 2 (list 3 4) 5)
       (list 6 7)))
(1 (4 (9 16) 25) (36 49))
```



Define `square-tree` both directly (i.e., without using any higher-order
procedures) and also by using `map` and recursion.

##### Solution



<div class="code-box"><div class="code-header"><a href="code/ex2-30.rkt">ex2-30.rkt</a></div><div class="codehilite" data-language="racket"><pre><code><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">square</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">square-tree</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">null?</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="nb">pair?</span><span class="w"> </span><span class="n">tree</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="n">square</span><span class="w"> </span><span class="n">tree</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="p">(</span><span class="n">square-tree</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">tree</span><span class="p">))</span><span class="w"> </span>
<span class="w">                    </span><span class="p">(</span><span class="n">square-tree</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">tree</span><span class="p">))))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">square-tree-map</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="nb">pair?</span><span class="w"> </span><span class="n">tree</span><span class="p">))</span><span class="w"> </span>
<span class="w">    </span><span class="p">(</span><span class="n">square</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="n">square-tree-map</span><span class="w"> </span><span class="n">tree</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">examp</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span>
<span class="w">                </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">3</span><span class="w"> </span><span class="mi">4</span><span class="w"> </span><span class="mi">5</span><span class="p">)</span><span class="w"> </span>
<span class="w">                      </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">7</span><span class="w"> </span><span class="mi">8</span><span class="w"> </span><span class="mi">9</span><span class="p">)</span><span class="w"> </span>
<span class="w">                      </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">10</span><span class="w"> </span><span class="mi">11</span><span class="p">)))</span><span class="w"> </span>
<span class="w">                </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">12</span><span class="w"> </span><span class="mi">13</span><span class="p">)))</span>
<span class="p">(</span><span class="n">square-tree</span><span class="w"> </span><span class="n">examp</span><span class="p">)</span>
<span class="p">(</span><span class="n">square-tree-map</span><span class="w"> </span><span class="n">examp</span><span class="p">)</span>
</code></pre></div>
<div class="code-output"><span>Output:</span><pre>(1 4 ((9 16 25) (49 64 81) ((100 121))) (144 169))
(1 4 ((9 16 25) (49 64 81) ((100 121))) (144 169))
</pre></div></div>


#### Exercise 2.31

Abstract your answer to
Exercise 2.30 to produce a procedure `tree-map` with the property
that `square-tree` could be defined as



```rkt
(define (square-tree tree) 
  (tree-map square tree))
```



##### Solution



<div class="code-box"><div class="code-header"><a href="code/ex2-31.rkt">ex2-31.rkt</a></div><div class="codehilite" data-language="racket"><pre><code><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">square</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">tree-map</span><span class="w"> </span><span class="n">f</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w">  </span><span class="p">(</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="nb">pair?</span><span class="w"> </span><span class="n">tree</span><span class="p">))</span><span class="w"> </span>
<span class="w">    </span><span class="p">(</span><span class="n">f</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">tree2</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">tree-map</span><span class="w"> </span><span class="n">f</span><span class="w"> </span><span class="n">tree2</span><span class="p">))</span><span class="w"> </span>
<span class="w">         </span><span class="n">tree</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">square-tree</span><span class="w"> </span><span class="n">tree</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="n">tree-map</span><span class="w"> </span><span class="n">square</span><span class="w"> </span><span class="n">tree</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">examp</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span>
<span class="w">                </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">3</span><span class="w"> </span><span class="mi">4</span><span class="w"> </span><span class="mi">5</span><span class="p">)</span><span class="w"> </span>
<span class="w">                      </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">7</span><span class="w"> </span><span class="mi">8</span><span class="w"> </span><span class="mi">9</span><span class="p">)</span><span class="w"> </span>
<span class="w">                      </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">10</span><span class="w"> </span><span class="mi">11</span><span class="p">)))</span><span class="w"> </span>
<span class="w">                </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">12</span><span class="w"> </span><span class="mi">13</span><span class="p">)))</span>
<span class="p">(</span><span class="n">square-tree</span><span class="w"> </span><span class="n">examp</span><span class="p">)</span>
<span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">"More advanced thingy: "</span><span class="p">)</span>
<span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="c1">;; Cool example showing more advanced stuff (symbol literal!)</span>
<span class="p">(</span><span class="n">tree-map</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="o">`</span><span class="p">(</span><span class="ss">f</span><span class="w"> </span><span class="o">,</span><span class="n">x</span><span class="p">))</span><span class="w"> </span><span class="n">examp</span><span class="p">)</span>
</code></pre></div>
<div class="code-output"><span>Output:</span><pre>(1 4 ((9 16 25) (49 64 81) ((100 121))) (144 169))
More advanced thingy: 
((f 1) (f 2) (((f 3) (f 4) (f 5)) ((f 7) (f 8) (f 9)) (((f 10) (f 11)))) ((f 12) (f 13)))
</pre></div></div>


#### Exercise 2.32

We can represent a set as a list
of distinct elements, and we can represent the set of all subsets of the set as
a list of lists.  For example, if the set is `(1 2 3)`, then the set of
all subsets is `(() (3) (2) (2 3) (1) (1 3) (1 2) (1 2 3))`.  Complete the
following definition of a procedure that generates the set of subsets of a set
and give a clear explanation of why it works:



```rkt
(define (subsets s)
  (if (null? s)
      (list nil)
      (let ((rest (subsets (cdr s))))
        (append rest (map ⟨??⟩ rest)))))
```



##### Solution

When we call `append rest (...)`, `rest` is the list of sets where we don't 
take the current element (`car s`), and we want to fill in (...) with the list of sets where we do take the current element. We achieve this with a lambda.



<div class="code-box"><div class="code-header"><a href="code/ex2-32.rkt">ex2-32.rkt</a></div><div class="codehilite" data-language="racket"><pre><code><span class="kn">#lang </span><span class="nn">sicp</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">subsets</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="n">nil</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="nb">rest</span><span class="w"> </span><span class="p">(</span><span class="n">subsets</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">s</span><span class="p">))))</span>
<span class="w">        </span><span class="p">(</span><span class="nb">append</span><span class="w"> </span><span class="nb">rest</span><span class="w"> </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span>
<span class="w">                        </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">lst</span><span class="p">)</span><span class="w"> </span>
<span class="w">                          </span><span class="p">(</span><span class="nb">append</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">s</span><span class="p">))</span><span class="w"> </span><span class="n">lst</span><span class="p">))</span>
<span class="w">                        </span><span class="nb">rest</span><span class="p">)))))</span>
<span class="p">(</span><span class="n">subsets</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="mi">3</span><span class="p">))</span>
</code></pre></div>
<div class="code-output"><span>Output:</span><pre>(() (3) (2) (2 3) (1) (1 3) (1 2) (1 2 3))
</pre></div></div>


#### Exercise 2.33

Fill in the missing expressions
to complete the following definitions of some basic list-manipulation
operations as accumulations:



```rkt
(define (map p sequence)
  (accumulate (lambda (x y) ⟨??⟩) 
              nil sequence))

(define (append seq1 seq2)
  (accumulate cons ⟨??⟩ ⟨??⟩))

(define (length sequence)
  (accumulate ⟨??⟩ 0 sequence))
```



##### Solution



<div class="code-box"><div class="code-header"><a href="code/ex2-33.rkt">ex2-33.rkt</a></div><div class="codehilite" data-language="racket"><pre><code><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="c1">;; Copied/useful defns</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">square</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">echo</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">accumulate</span><span class="w"> </span><span class="n">op</span><span class="w"> </span><span class="n">initial</span><span class="w"> </span><span class="n">sequence</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="n">sequence</span><span class="p">)</span>
<span class="w">      </span><span class="n">initial</span>
<span class="w">      </span><span class="p">(</span><span class="n">op</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">sequence</span><span class="p">)</span>
<span class="w">          </span><span class="p">(</span><span class="n">accumulate</span><span class="w"> </span><span class="n">op</span>
<span class="w">                      </span><span class="n">initial</span>
<span class="w">                      </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">sequence</span><span class="p">)))))</span>

<span class="c1">;; Problem</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="n">p</span><span class="w"> </span><span class="n">sequence</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">accumulate</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="w"> </span><span class="n">y</span><span class="p">)</span>
<span class="w">                </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="p">(</span><span class="n">p</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="n">y</span><span class="p">))</span>
<span class="w">              </span><span class="n">nil</span><span class="w"> </span><span class="n">sequence</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">append</span><span class="w"> </span><span class="n">seq1</span><span class="w"> </span><span class="n">seq2</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">accumulate</span><span class="w"> </span><span class="nb">cons</span><span class="w"> </span><span class="n">seq2</span><span class="w"> </span><span class="n">seq1</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">length</span><span class="w"> </span><span class="n">sequence</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">accumulate</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="w"> </span><span class="n">y</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">y</span><span class="w"> </span><span class="mi">1</span><span class="p">))</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="n">sequence</span><span class="p">))</span>

<span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="n">square</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="mi">3</span><span class="w"> </span><span class="mi">4</span><span class="p">))</span>
<span class="p">(</span><span class="nb">append</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="mi">3</span><span class="w"> </span><span class="mi">4</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">5</span><span class="w"> </span><span class="mi">6</span><span class="w"> </span><span class="mi">7</span><span class="w"> </span><span class="mi">8</span><span class="p">))</span>
<span class="p">(</span><span class="nb">length</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="mi">3</span><span class="w"> </span><span class="mi">4</span><span class="w"> </span><span class="mi">5</span><span class="w"> </span><span class="mi">6</span><span class="w"> </span><span class="mi">7</span><span class="w"> </span><span class="mi">8</span><span class="p">))</span>
</code></pre></div>
<div class="code-output"><span>Output:</span><pre>(1 4 9 16)
(1 2 3 4 5 6 7 8)
8
</pre></div></div>


#### Exercise 2.34

Evaluating a polynomial in $x$
at a given value of $x$ can be formulated as an accumulation.  We evaluate
the polynomial

$${a_n x^n} + {a_{n-1} x^{n-1}} + \dots + {a_1 x} + a_0  $$


using a well-known algorithm called Horner's rule, which structures
the computation as

$${(\dots (a_n x} + {a_{n-1}) x} + \dots + {a_1) x} + {a_0.}  $$


In other words, we start with $a_n$, multiply by $x$, add
$a_{n-1}$, multiply by $x$, and so on, until we reach
$a_0$.

Fill in the following template to produce a procedure that evaluates a
polynomial using Horner's rule.  Assume that the coefficients of the polynomial
are arranged in a sequence, from $a_0$ through $a_n$.



```rkt
(define 
  (horner-eval x coefficient-sequence)
  (accumulate 
   (lambda (this-coeff higher-terms)
     ⟨??⟩)
   0
   coefficient-sequence))
```



For example, to compute ${1 + 3x + {5x^3 + x^5}}$ at ${x = 2}$ you
would evaluate



```rkt
(horner-eval 2 (list 1 3 0 5 0 1))
```



##### Solution


<div class="code-box"><div class="code-header"><a href="code/ex2-34.rkt">ex2-34.rkt</a></div><div class="codehilite" data-language="racket"><pre><code><span class="kn">#lang </span><span class="nn">sicp</span><span class="w"> </span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">accumulate</span><span class="w"> </span><span class="n">op</span><span class="w"> </span><span class="n">initial</span><span class="w"> </span><span class="n">sequence</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="n">sequence</span><span class="p">)</span>
<span class="w">      </span><span class="n">initial</span>
<span class="w">      </span><span class="p">(</span><span class="n">op</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">sequence</span><span class="p">)</span>
<span class="w">          </span><span class="p">(</span><span class="n">accumulate</span><span class="w"> </span><span class="n">op</span>
<span class="w">                      </span><span class="n">initial</span>
<span class="w">                      </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">sequence</span><span class="p">)))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">horner-eval</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">coefficient-sequence</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">accumulate</span><span class="w"> </span>
<span class="w">   </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">this-coeff</span><span class="w"> </span><span class="n">higher-terms</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">this-coeff</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">higher-terms</span><span class="w"> </span><span class="n">x</span><span class="p">)))</span>
<span class="w">   </span><span class="mi">0</span>
<span class="w">   </span><span class="n">coefficient-sequence</span><span class="p">))</span>

<span class="c1">; For example, to compute ${1 + 3x$ + {5x^3 + x^5}} at ${x = 2$} you</span>

<span class="p">(</span><span class="n">horner-eval</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">3</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="mi">5</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="mi">1</span><span class="p">))</span>
</code></pre></div>
<div class="code-output"><span>Output:</span><pre>79
</pre></div></div>


#### Exercise 2.35

Redefine `count-leaves` from
2.2.2 as an accumulation:



```rkt
(define (count-leaves t)
  (accumulate ⟨??⟩ ⟨??⟩ (map ⟨??⟩ ⟨??⟩)))
```



##### Solution



<div class="code-box"><div class="code-header"><a href="code/ex2-35.rkt">ex2-35.rkt</a></div><div class="codehilite" data-language="racket"><pre><code><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">accumulate</span><span class="w"> </span><span class="n">op</span><span class="w"> </span><span class="n">initial</span><span class="w"> </span><span class="n">sequence</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="n">sequence</span><span class="p">)</span>
<span class="w">      </span><span class="n">initial</span>
<span class="w">      </span><span class="p">(</span><span class="n">op</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">sequence</span><span class="p">)</span>
<span class="w">          </span><span class="p">(</span><span class="n">accumulate</span><span class="w"> </span><span class="n">op</span>
<span class="w">                      </span><span class="n">initial</span>
<span class="w">                      </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">sequence</span><span class="p">)))))</span>

<span class="c1">;; The first two empty slots just implement a summation</span>
<span class="c1">;; The last empty slot is just the tree</span>
<span class="c1">;; The third slot is the complicated thing.</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">count-leaves</span><span class="w"> </span><span class="n">t</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">accumulate</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="w"> </span><span class="n">y</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">y</span><span class="p">))</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span>
<span class="w">    </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span>
<span class="w">      </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">s</span><span class="p">)</span><span class="w"> </span>
<span class="w">        </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">pair?</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">count-leaves</span><span class="w"> </span><span class="n">s</span><span class="p">)</span><span class="w"> </span><span class="mi">1</span><span class="p">))</span><span class="w"> </span><span class="n">t</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">2</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">3</span><span class="w"> </span><span class="mi">4</span><span class="p">)))</span>
<span class="p">(</span><span class="n">count-leaves</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">x</span><span class="p">)))</span>
</code></pre></div>
<div class="code-output"><span>Output:</span><pre>16
</pre></div></div>


#### Exercise 2.36

The procedure `accumulate-n`
is similar to `accumulate` except that it takes as its third argument a
sequence of sequences, which are all assumed to have the same number of
elements.  It applies the designated accumulation procedure to combine all the
first elements of the sequences, all the second elements of the sequences, and
so on, and returns a sequence of the results.  For instance, if `s` is a
sequence containing four sequences, `((1 2 3) (4 5 6) (7 8 9) (10 11
12)),` then the value of `(accumulate-n + 0 s)` should be the sequence
`(22 26 30)`.  Fill in the missing expressions in the following definition
of `accumulate-n`:



```rkt
(define (accumulate-n op init seqs)
  (if (null? (car seqs))
      nil
      (cons (accumulate op init ⟨??⟩)
            (accumulate-n op init ⟨??⟩))))
```



##### Solution


<div class="code-box"><div class="code-header"><a href="code/ex2-36.rkt">ex2-36.rkt</a></div><div class="codehilite" data-language="racket"><pre><code><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">accumulate</span><span class="w"> </span><span class="n">op</span><span class="w"> </span><span class="n">initial</span><span class="w"> </span><span class="n">sequence</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="n">sequence</span><span class="p">)</span>
<span class="w">      </span><span class="n">initial</span>
<span class="w">      </span><span class="p">(</span><span class="n">op</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">sequence</span><span class="p">)</span>
<span class="w">          </span><span class="p">(</span><span class="n">accumulate</span><span class="w"> </span><span class="n">op</span>
<span class="w">                      </span><span class="n">initial</span>
<span class="w">                      </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">sequence</span><span class="p">)))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">accumulate-n</span><span class="w"> </span><span class="n">op</span><span class="w"> </span><span class="k">init</span><span class="w"> </span><span class="n">seqs</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">seqs</span><span class="p">))</span>
<span class="w">      </span><span class="n">nil</span>
<span class="w">      </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="p">(</span><span class="n">accumulate</span><span class="w"> </span><span class="n">op</span><span class="w"> </span><span class="k">init</span><span class="w"> </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="nb">car</span><span class="w"> </span><span class="n">seqs</span><span class="p">))</span>
<span class="w">            </span><span class="p">(</span><span class="n">accumulate-n</span><span class="w"> </span><span class="n">op</span><span class="w"> </span><span class="k">init</span><span class="w"> </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="nb">cdr</span><span class="w"> </span><span class="n">seqs</span><span class="p">)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="mi">3</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">4</span><span class="w"> </span><span class="mi">5</span><span class="w"> </span><span class="mi">6</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">7</span><span class="w"> </span><span class="mi">8</span><span class="w"> </span><span class="mi">9</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">10</span><span class="w"> </span><span class="mi">11</span><span class="w"> </span><span class="mi">12</span><span class="p">)))</span>
<span class="p">(</span><span class="n">accumulate-n</span><span class="w"> </span><span class="nb">+</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="n">s</span><span class="p">)</span>
</code></pre></div>
<div class="code-output"><span>Output:</span><pre>(22 26 30)
</pre></div></div>

#### Exercise 2.37

Suppose we represent vectors $\mathbf v = (v_i)$ as sequences of numbers, and
matrices $\mathbf m=(m_{ij})$ as sequences of vectors (the rows of the
matrix).  For example, the matrix

$$\left(\matrix{	1 & 2 & 3 & 4 \cr
		4 & 5 & 6 & 6 \cr
		6 & 7 & 8 & 9 \cr }\right)  $$


is represented as the sequence `((1 2 3 4) (4 5 6 6) (6 7 8 9))`.  With
this representation, we can use sequence operations to concisely express the
basic matrix and vector operations.  These operations (which are described in
any book on matrix algebra) are the following:

<div>$$\begin{align*}
	\text{(dot-product v w)} 	&\quad \text{returns the sum}\;\Sigma_i v_i w_i; \cr
	\text{(matrix-*-vector m v)} 	&\quad \text{returns the vector}\;{\bf t}, \cr
		&\quad \text{where}\; t_i = \Sigma_j m_{ij} v_j; \cr
	\text{(matrix-*-matrix m n)} 	&\quad \text{returns the matrix}\;{\bf p}, \cr
		&\quad \text{where}\; p_{ij} = \Sigma_k m_{ik} n_{kj}; \cr
	\text{(transpose m)} 		&\quad \text{returns the matrix}\;{\bf n}, \cr
		&\quad \text{where}\; n_{ij} = m_{ji}. \cr
\end{align*}$$</div>

We can define the dot product as



```rkt
(define (dot-product v w)
  (accumulate + 0 (map * v w)))
```



Fill in the missing expressions in the following procedures for computing the
other matrix operations.  (The procedure `accumulate-n` is defined in
Exercise 2.36.)



```rkt
(define (matrix-*-vector m v)
  (map ⟨??⟩ m))

(define (transpose mat)
  (accumulate-n ⟨??⟩ ⟨??⟩ mat))

(define (matrix-*-matrix m n)
  (let ((cols (transpose n)))
    (map ⟨??⟩ m)))
```



##### Solution



<div class="code-box"><div class="code-header"><a href="code/ex2-37.rkt">ex2-37.rkt</a></div><div class="codehilite" data-language="racket"><pre><code><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">accumulate</span><span class="w"> </span><span class="n">op</span><span class="w"> </span><span class="n">initial</span><span class="w"> </span><span class="n">sequence</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="n">sequence</span><span class="p">)</span>
<span class="w">      </span><span class="n">initial</span>
<span class="w">      </span><span class="p">(</span><span class="n">op</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">sequence</span><span class="p">)</span>
<span class="w">          </span><span class="p">(</span><span class="n">accumulate</span><span class="w"> </span><span class="n">op</span>
<span class="w">                      </span><span class="n">initial</span>
<span class="w">                      </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">sequence</span><span class="p">)))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">accumulate-n</span><span class="w"> </span><span class="n">op</span><span class="w"> </span><span class="k">init</span><span class="w"> </span><span class="n">seqs</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">seqs</span><span class="p">))</span>
<span class="w">      </span><span class="n">nil</span>
<span class="w">      </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="p">(</span><span class="n">accumulate</span><span class="w"> </span><span class="n">op</span><span class="w"> </span><span class="k">init</span><span class="w"> </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="nb">car</span><span class="w"> </span><span class="n">seqs</span><span class="p">))</span>
<span class="w">            </span><span class="p">(</span><span class="n">accumulate-n</span><span class="w"> </span><span class="n">op</span><span class="w"> </span><span class="k">init</span><span class="w"> </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="nb">cdr</span><span class="w"> </span><span class="n">seqs</span><span class="p">)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">dot-product</span><span class="w"> </span><span class="n">v</span><span class="w"> </span><span class="n">w</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">accumulate</span><span class="w"> </span><span class="nb">+</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="nb">*</span><span class="w"> </span><span class="n">v</span><span class="w"> </span><span class="n">w</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">matrix-*-vector</span><span class="w"> </span><span class="n">m</span><span class="w"> </span><span class="n">v</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">row</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">dot-product</span><span class="w"> </span><span class="n">row</span><span class="w"> </span><span class="n">v</span><span class="p">))</span><span class="w"> </span><span class="n">m</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">transpose</span><span class="w"> </span><span class="n">mat</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">accumulate-n</span><span class="w"> </span><span class="nb">cons</span><span class="w"> </span><span class="n">nil</span><span class="w"> </span><span class="n">mat</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">matrix-*-matrix</span><span class="w"> </span><span class="n">m</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">cols</span><span class="w"> </span><span class="p">(</span><span class="n">transpose</span><span class="w"> </span><span class="n">n</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">row</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">matrix-*-vector</span><span class="w"> </span><span class="n">cols</span><span class="w"> </span><span class="n">row</span><span class="p">))</span><span class="w"> </span><span class="n">m</span><span class="p">)))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">disp-vec</span><span class="w"> </span><span class="n">vec</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="n">vec</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">disp-mat</span><span class="w"> </span><span class="n">mat</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="n">disp-vec</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">mat</span><span class="p">))</span>
<span class="w">  </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">mat</span><span class="p">)))</span><span class="w"> </span><span class="p">(</span><span class="n">disp-mat</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">mat</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">mymat</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="mi">3</span><span class="w"> </span><span class="mi">4</span><span class="p">)</span>
<span class="w">                    </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">4</span><span class="w"> </span><span class="mi">5</span><span class="w"> </span><span class="mi">6</span><span class="w"> </span><span class="mi">6</span><span class="p">)</span>
<span class="w">                    </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">6</span><span class="w"> </span><span class="mi">7</span><span class="w"> </span><span class="mi">8</span><span class="w"> </span><span class="mi">9</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">mymat2</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="mi">-1</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span>
<span class="w">                     </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">3</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="mi">-1</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">-1</span><span class="p">)</span>
<span class="w">                     </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span>
<span class="w">                     </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="mi">-1</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="mi">1</span><span class="p">)))</span>
<span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">"Matrix A"</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="p">(</span><span class="n">disp-mat</span><span class="w"> </span><span class="n">mymat</span><span class="p">)</span>
<span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">"After transpose:"</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="p">(</span><span class="n">disp-mat</span><span class="w"> </span><span class="p">(</span><span class="n">transpose</span><span class="w"> </span><span class="n">mymat</span><span class="p">))</span>
<span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">"Matrix B"</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="p">(</span><span class="n">disp-mat</span><span class="w"> </span><span class="n">mymat2</span><span class="p">)</span>
<span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="s2">"Matrix A*B:"</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span>
<span class="p">(</span><span class="n">disp-mat</span><span class="w"> </span><span class="p">(</span><span class="n">matrix-*-matrix</span><span class="w"> </span><span class="n">mymat</span><span class="w"> </span><span class="n">mymat2</span><span class="p">))</span>
</code></pre></div>
<div class="code-output"><span>Output:</span><pre>Matrix A
(1 2 3 4)
(4 5 6 6)
(6 7 8 9)
After transpose:
(1 4 6)
(2 5 7)
(3 6 8)
(4 6 9)
Matrix B
(1 0 -1 1 1)
(3 0 -1 1 -1)
(0 0 1 0 1)
(1 0 -1 0 1)
Matrix A*B:
(11 0 -4 3 6)
(25 0 -9 9 11)
(36 0 -14 13 16)
</pre></div></div>


#### Exercise 2.38

The `accumulate` procedure
is also known as `fold-right`, because it combines the first element of
the sequence with the result of combining all the elements to the right.  There
is also a `fold-left`, which is similar to `fold-right`, except that
it combines elements working in the opposite direction:



```rkt
(define (fold-left op initial sequence)
  (define (iter result rest)
    (if (null? rest)
        result
        (iter (op result (car rest))
              (cdr rest))))
  (iter initial sequence))
```



What are the values of



```rkt
(fold-right / 1 (list 1 2 3))
(fold-left  / 1 (list 1 2 3))
(fold-right list nil (list 1 2 3))
(fold-left  list nil (list 1 2 3))
```



Give a property that `op` should satisfy to guarantee that
`fold-right` and `fold-left` will produce the same values for any
sequence.

##### Solution


```rkt
(fold-right / 1 (list 1 2 3))
  (/ 3 1)
  (/ 2 3)
  (/ 1 2/3)
  =3/2
(fold-left  / 1 (list 1 2 3))
  (/ 1 1)
  (/ 1 2)
  (/ 1/2 3)
  =1/6
(fold-right list nil (list 1 2 3))
  (list 3 nil)
  (list 2 (list 3 nil))
  = (list 1 (list 2 (list 3 nil)))
(fold-left  list nil (list 1 2 3))
  (list nil 1 )
  (list (list nil 1) 2)
  =(list (list (list nil 1) 2) 3)
```




<div class="code-box"><div class="code-header"><a href="code/ex2-38.rkt">ex2-38.rkt</a></div><div class="codehilite" data-language="racket"><pre><code><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">accumulate</span><span class="w"> </span><span class="n">op</span><span class="w"> </span><span class="n">initial</span><span class="w"> </span><span class="n">sequence</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="n">sequence</span><span class="p">)</span>
<span class="w">      </span><span class="n">initial</span>
<span class="w">      </span><span class="p">(</span><span class="n">op</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">sequence</span><span class="p">)</span>
<span class="w">          </span><span class="p">(</span><span class="n">accumulate</span><span class="w"> </span><span class="n">op</span>
<span class="w">                      </span><span class="n">initial</span>
<span class="w">                      </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">sequence</span><span class="p">)))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">fold-right</span><span class="w"> </span><span class="n">accumulate</span><span class="p">)</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">fold-left</span><span class="w"> </span><span class="n">op</span><span class="w"> </span><span class="n">initial</span><span class="w"> </span><span class="n">sequence</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">iter</span><span class="w"> </span><span class="n">result</span><span class="w"> </span><span class="nb">rest</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="nb">rest</span><span class="p">)</span>
<span class="w">        </span><span class="n">result</span>
<span class="w">        </span><span class="p">(</span><span class="n">iter</span><span class="w"> </span><span class="p">(</span><span class="n">op</span><span class="w"> </span><span class="n">result</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="nb">rest</span><span class="p">))</span>
<span class="w">              </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="nb">rest</span><span class="p">))))</span>
<span class="w">  </span><span class="p">(</span><span class="n">iter</span><span class="w"> </span><span class="n">initial</span><span class="w"> </span><span class="n">sequence</span><span class="p">))</span>

<span class="p">(</span><span class="n">fold-right</span><span class="w"> </span><span class="nb">/</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="mi">3</span><span class="p">))</span>
<span class="p">(</span><span class="n">fold-left</span><span class="w">  </span><span class="nb">/</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="mi">3</span><span class="p">))</span>
<span class="p">(</span><span class="n">fold-right</span><span class="w"> </span><span class="nb">list</span><span class="w"> </span><span class="n">nil</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="mi">3</span><span class="p">))</span>
<span class="p">(</span><span class="n">fold-left</span><span class="w">  </span><span class="nb">list</span><span class="w"> </span><span class="n">nil</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="mi">3</span><span class="p">))</span>
</code></pre></div>
<div class="code-output"><span>Output:</span><pre>3/2
1/6
(1 (2 (3 ())))
(((() 1) 2) 3)
</pre></div></div>


We want associativity. In lispy form:
`(op (op a b) c) == (op a (op b c))`

I'm not going to write up a totally formal proof, but we can consider the following two statements and do induction on n.


```
(fold-right op i (list a1 a2 ... an))
=(op a1 (fold-right op i (list a2 ... an))

(fold-left op i (list a1 a2 ... an))
=(iter i (list a1 a2 ... an))
=(iter (op i a1) (list a2 ... an))
```



#### Exercise 2.39

Complete the following
definitions of `reverse` (Exercise 2.18) in terms of
`fold-right` and `fold-left` from Exercise 2.38:



```rkt
(define (reverse sequence)
  (fold-right 
   (lambda (x y) ⟨??⟩) nil sequence))

(define (reverse sequence)
  (fold-left 
   (lambda (x y) ⟨??⟩) nil sequence))
```



##### Solution

This one always gets me. In the book's definition of fold-left, we already
swap the order of result and `car rest`. ie, in the definition of fold-left the first op that is evaluated is `(op nil (first-elem))` whereas in fold-right 
it's `(op (last-elem) nil)`. I always end up double-swapping. 



<div class="code-box"><div class="code-header"><a href="code/ex2-39.rkt">ex2-39.rkt</a></div><div class="codehilite" data-language="racket"><pre><code><span class="kn">#lang </span><span class="nn">sicp</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">accumulate</span><span class="w"> </span><span class="n">op</span><span class="w"> </span><span class="n">initial</span><span class="w"> </span><span class="n">sequence</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="n">sequence</span><span class="p">)</span>
<span class="w">      </span><span class="n">initial</span>
<span class="w">      </span><span class="p">(</span><span class="n">op</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">sequence</span><span class="p">)</span>
<span class="w">          </span><span class="p">(</span><span class="n">accumulate</span><span class="w"> </span><span class="n">op</span>
<span class="w">                      </span><span class="n">initial</span>
<span class="w">                      </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">sequence</span><span class="p">)))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">fold-right</span><span class="w"> </span><span class="n">accumulate</span><span class="p">)</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">fold-left</span><span class="w"> </span><span class="n">op</span><span class="w"> </span><span class="n">initial</span><span class="w"> </span><span class="n">sequence</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">iter</span><span class="w"> </span><span class="n">result</span><span class="w"> </span><span class="nb">rest</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="nb">rest</span><span class="p">)</span>
<span class="w">        </span><span class="n">result</span>
<span class="w">        </span><span class="p">(</span><span class="n">iter</span><span class="w"> </span><span class="p">(</span><span class="n">op</span><span class="w"> </span><span class="n">result</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="nb">rest</span><span class="p">))</span>
<span class="w">              </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="nb">rest</span><span class="p">))))</span>
<span class="w">  </span><span class="p">(</span><span class="n">iter</span><span class="w"> </span><span class="n">initial</span><span class="w"> </span><span class="n">sequence</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">reverse1</span><span class="w"> </span><span class="n">sequence</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">fold-right</span><span class="w"> </span>
<span class="w">   </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="w"> </span><span class="n">y</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">append</span><span class="w"> </span><span class="n">y</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="n">x</span><span class="p">)))</span><span class="w"> </span><span class="n">nil</span><span class="w"> </span><span class="n">sequence</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">reverse2</span><span class="w"> </span><span class="n">sequence</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">fold-left</span><span class="w"> </span>
<span class="w">   </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="w"> </span><span class="n">y</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">y</span><span class="w"> </span><span class="n">x</span><span class="p">))</span><span class="w"> </span><span class="n">nil</span><span class="w"> </span><span class="n">sequence</span><span class="p">))</span>

<span class="p">(</span><span class="n">reverse1</span><span class="w"> </span><span class="o">'</span><span class="p">(</span><span class="mi">1</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="mi">3</span><span class="w"> </span><span class="mi">4</span><span class="w"> </span><span class="mi">5</span><span class="p">))</span>
<span class="p">(</span><span class="n">reverse2</span><span class="w"> </span><span class="o">'</span><span class="p">(</span><span class="mi">1</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="mi">3</span><span class="w"> </span><span class="mi">4</span><span class="w"> </span><span class="mi">5</span><span class="p">))</span>
</code></pre></div>
<div class="code-output"><span>Output:</span><pre>(5 4 3 2 1)
(5 4 3 2 1)
</pre></div></div>


#### Exercise 2.40

Define a procedure
`unique-pairs` that, given an integer $n$, generates the sequence of
pairs ${(i, j)}$ with ${1 \le j \lt {i \le n}}$.  Use `unique-pairs`
to simplify the definition of `prime-sum-pairs` given above.

##### Solution
The scaffolding code is a bit much, we might have to start actually including a library file! Regardless...



<div class="code-box"><div class="code-header"><a href="code/ex2-40.rkt">ex2-40.rkt</a></div><div class="codehilite" data-language="racket"><pre><code><span class="kn">#lang </span><span class="nn">sicp</span>
<span class="c1">;; Solution</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">unique-pairs</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">num-list</span><span class="w"> </span><span class="n">i</span><span class="w"> </span><span class="n">m</span><span class="w"> </span><span class="n">ret</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="n">i</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span><span class="w"> </span>
<span class="w">      </span><span class="n">ret</span>
<span class="w">      </span><span class="p">(</span><span class="n">num-list</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">i</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span><span class="w"> </span><span class="n">m</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="n">m</span><span class="w"> </span><span class="n">i</span><span class="p">)</span><span class="w"> </span><span class="n">ret</span><span class="p">))))</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">num-list-list</span><span class="w"> </span><span class="n">m</span><span class="w"> </span><span class="n">ret</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">&gt;</span><span class="w"> </span><span class="n">m</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">      </span><span class="n">ret</span>
<span class="w">      </span><span class="p">(</span><span class="n">num-list-list</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">m</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">append</span><span class="w"> </span><span class="n">ret</span><span class="w"> </span><span class="p">(</span><span class="n">num-list</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">m</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span><span class="w"> </span><span class="n">m</span><span class="w"> </span><span class="n">nil</span><span class="p">)))))</span>
<span class="w">  </span><span class="p">(</span><span class="n">num-list-list</span><span class="w"> </span><span class="mi">2</span><span class="w"> </span><span class="n">nil</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">prime-sum-pairs</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">filter</span><span class="w"> </span><span class="n">prime-sum?</span><span class="w"> </span><span class="p">(</span><span class="n">unique-pairs</span><span class="w"> </span><span class="n">n</span><span class="p">)))</span>

<span class="c1">;; Library functions</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">smallest-divisor</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">find-divisor</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">2</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">square</span><span class="w"> </span><span class="n">n</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="n">n</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">find-divisor</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="n">test-divisor</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">&gt;</span><span class="w"> </span><span class="p">(</span><span class="n">square</span><span class="w"> </span><span class="n">test-divisor</span><span class="p">)</span><span class="w"> </span><span class="n">n</span><span class="p">)</span><span class="w"> </span>
<span class="w">         </span><span class="n">n</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="n">divides?</span><span class="w"> </span><span class="n">test-divisor</span><span class="w"> </span><span class="n">n</span><span class="p">)</span><span class="w"> </span>
<span class="w">         </span><span class="n">test-divisor</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span><span class="p">(</span><span class="n">find-divisor</span><span class="w"> </span>
<span class="w">               </span><span class="n">n</span><span class="w"> </span>
<span class="w">               </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">test-divisor</span><span class="w"> </span><span class="mi">1</span><span class="p">)))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">divides?</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="p">(</span><span class="nb">remainder</span><span class="w"> </span><span class="n">b</span><span class="w"> </span><span class="n">a</span><span class="p">)</span><span class="w"> </span><span class="mi">0</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">prime?</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="p">(</span><span class="n">smallest-divisor</span><span class="w"> </span><span class="n">n</span><span class="p">)))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">prime-sum?</span><span class="w"> </span><span class="n">pair</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">prime?</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">pair</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cadr</span><span class="w"> </span><span class="n">pair</span><span class="p">))))</span>

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

<span class="p">(</span><span class="n">unique-pairs</span><span class="w"> </span><span class="mi">5</span><span class="p">)</span>
<span class="p">(</span><span class="n">prime-sum-pairs</span><span class="w"> </span><span class="mi">5</span><span class="p">)</span>
</code></pre></div>
<div class="code-output"><span>Output:</span><pre>((2 1) (3 1) (3 2) (4 1) (4 2) (4 3) (5 1) (5 2) (5 3) (5 4))
((2 1) (3 2) (4 1) (4 3) (5 2))
</pre></div></div>


#### Exercise 2.41

Write a procedure to find all
ordered triples of distinct positive integers $i$, $j$, and $k$ less than
or equal to a given integer $n$ that sum to a given integer $s$.

##### Solution
Should we write this a clever way?


<div class="code-box"><div class="code-header"><a href="code/ex2-41.rkt">ex2-41.rkt</a></div><div class="codehilite" data-language="racket"><pre><code><span class="kn">#lang </span><span class="nn">sicp</span>
<span class="c1">;; Library functions</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">accumulate</span><span class="w"> </span><span class="n">op</span><span class="w"> </span><span class="n">initial</span><span class="w"> </span><span class="n">sequence</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="n">sequence</span><span class="p">)</span>
<span class="w">      </span><span class="n">initial</span>
<span class="w">      </span><span class="p">(</span><span class="n">op</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">sequence</span><span class="p">)</span>
<span class="w">          </span><span class="p">(</span><span class="n">accumulate</span><span class="w"> </span><span class="n">op</span>
<span class="w">                      </span><span class="n">initial</span>
<span class="w">                      </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">sequence</span><span class="p">)))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">enumerate-interval</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="n">high</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">&gt;</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="n">high</span><span class="p">)</span>
<span class="w">      </span><span class="n">nil</span>
<span class="w">      </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">low</span>
<span class="w">            </span><span class="p">(</span><span class="n">enumerate-interval</span>
<span class="w">             </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span>
<span class="w">             </span><span class="n">high</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">filter</span><span class="w"> </span><span class="n">predicate</span><span class="w"> </span><span class="n">sequence</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">null?</span><span class="w"> </span><span class="n">sequence</span><span class="p">)</span><span class="w"> </span><span class="n">nil</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="n">predicate</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">sequence</span><span class="p">))</span>
<span class="w">         </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">sequence</span><span class="p">)</span>
<span class="w">               </span><span class="p">(</span><span class="nb">filter</span><span class="w"> </span><span class="n">predicate</span>
<span class="w">                       </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">sequence</span><span class="p">))))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w">  </span><span class="p">(</span><span class="nb">filter</span><span class="w"> </span><span class="n">predicate</span>
<span class="w">                       </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">sequence</span><span class="p">)))))</span>

<span class="c1">;; Solution</span>
<span class="c1">;; My solution uses brute force when it doesn't need to (we don't need to</span>
<span class="c1">;; generate pairs and then filter) but it's fun to use listy stuff. We've done</span>
<span class="c1">;; enough iteration and cons silliness.</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">tuples</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="n">depth</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">&lt;</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="n">depth</span><span class="p">)</span><span class="w"> </span><span class="n">nil</span><span class="p">)</span>
<span class="w">    </span><span class="p">((</span><span class="nb">=</span><span class="w"> </span><span class="n">depth</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="nb">list</span><span class="w"> </span><span class="p">(</span><span class="n">enumerate-interval</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="n">n</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="k">else</span><span class="w"> </span>
<span class="w">     </span><span class="p">(</span><span class="nb">append</span><span class="w"> </span><span class="p">(</span><span class="n">tuples</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span><span class="w"> </span><span class="n">depth</span><span class="p">)</span><span class="w"> </span>
<span class="w">             </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">arg</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">append</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="n">n</span><span class="p">)</span><span class="w"> </span><span class="n">arg</span><span class="p">))</span><span class="w"> </span>
<span class="w">                  </span><span class="p">(</span><span class="n">tuples</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">depth</span><span class="w"> </span><span class="mi">1</span><span class="p">)))))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">sum</span><span class="w"> </span><span class="n">lst</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">accumulate</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="w"> </span><span class="n">y</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">y</span><span class="p">))</span><span class="w"> </span><span class="mi">0</span><span class="w"> </span><span class="n">lst</span><span class="p">))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">tuples-sum</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="n">depth</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">t-sum?</span><span class="w"> </span><span class="n">tuple</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="n">s</span><span class="w"> </span><span class="p">(</span><span class="n">sum</span><span class="w"> </span><span class="n">tuple</span><span class="p">)))</span>
<span class="w">  </span><span class="p">(</span><span class="nb">filter</span><span class="w"> </span><span class="n">t-sum?</span><span class="w"> </span><span class="p">(</span><span class="n">tuples</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="n">depth</span><span class="p">)))</span>

<span class="p">(</span><span class="n">tuples</span><span class="w"> </span><span class="mi">6</span><span class="w"> </span><span class="mi">3</span><span class="p">)</span>
<span class="p">(</span><span class="n">tuples-sum</span><span class="w"> </span><span class="mi">6</span><span class="w"> </span><span class="mi">8</span><span class="w"> </span><span class="mi">3</span><span class="p">)</span>
</code></pre></div>
<div class="code-output"><span>Output:</span><pre>((3 2 1) (4 2 1) (4 3 1) (4 3 2) (5 2 1) (5 3 1) (5 3 2) (5 4 1) (5 4 2) (5 4 3) (6 2 1) (6 3 1) (6 3 2) (6 4 1) (6 4 2) (6 4 3) (6 5 1) (6 5 2) (6 5 3) (6 5 4))
((4 3 1) (5 2 1))
</pre></div></div>


#### Exercise 2.42

The eight-queens puzzle asks
how to place eight queens on a chessboard so that no queen is in check from any
other (i.e., no two queens are in the same row, column, or diagonal).  One
possible solution is shown in Figure 2.8.  One way to solve the puzzle is
to work across the board, placing a queen in each column.  Once we have placed
${k - 1}$ queens, we must place the $k^{\text{th}}$ queen in a position where it does
not check any of the queens already on the board.  We can formulate this
approach recursively: Assume that we have already generated the sequence of all
possible ways to place ${k - 1}$ queens in the first ${k - 1}$ columns of the
board.  For each of these ways, generate an extended set of positions by
placing a queen in each row of the $k^{\text{th}}$ column.  Now filter these, keeping
only the positions for which the queen in the $k^{\text{th}}$ column is safe with
respect to the other queens.  This produces the sequence of all ways to place
$k$ queens in the first $k$ columns.  By continuing this process, we will
produce not only one solution, but all solutions to the puzzle.

We implement this solution as a procedure `queens`, which returns a
sequence of all solutions to the problem of placing $n$ queens on an
${n \times n}$ chessboard.  `Queens` has an internal procedure
`queen-cols` that returns the sequence of all ways to place queens in the
first $k$ columns of the board.



```rkt
(define (queens board-size)
  (define (queen-cols k)
    (if (= k 0)
        (list empty-board)
        (filter
         (lambda (positions) 
           (safe? k positions))
         (flatmap
          (lambda (rest-of-queens)
            (map (lambda (new-row)
                   (adjoin-position 
                    new-row 
                    k 
                    rest-of-queens))
                 (enumerate-interval 
                  1 
                  board-size)))
          (queen-cols (- k 1))))))
  (queen-cols board-size))
```



In this procedure `rest-of-queens` is a way to place ${k - 1}$ queens in
the first ${k - 1}$ columns, and `new-row` is a proposed row in which to
place the queen for the $k^{\text{th}}$ column.  Complete the program by implementing
the representation for sets of board positions, including the procedure
`adjoin-position`, which adjoins a new row-column position to a set of
positions, and `empty-board`, which represents an empty set of positions.
You must also write the procedure `safe?`, which determines for a set of
positions, whether the queen in the $k^{\text{th}}$ column is safe with respect to the
others.  (Note that we need only check whether the new queen is safe---the
other queens are already guaranteed safe with respect to each other.)

##### Solution
Queen is an integer from 1 to board-size. The queen `k` is safe if:

 - `queen[i]!=queen[k]` for all `i\lt k` (horiz check)
 - `abs(queen[k]-queen[i])!=abs(k-i)` (diagonal check)



<div class="code-box"><div class="code-header"><a href="code/ex2-42.rkt">ex2-42.rkt</a></div><div class="codehilite" data-language="racket"><pre><code><span class="kn">#lang </span><span class="nn">sicp</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">flatmap</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="n">seq</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">accumulate</span><span class="w"> </span><span class="nb">append</span><span class="w"> </span><span class="n">nil</span><span class="w"> </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="n">seq</span><span class="p">)))</span><span class="w"> </span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">accumulate</span><span class="w"> </span><span class="n">op</span><span class="w"> </span><span class="n">initial</span><span class="w"> </span><span class="n">sequence</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="n">sequence</span><span class="p">)</span>
<span class="w">      </span><span class="n">initial</span>
<span class="w">      </span><span class="p">(</span><span class="n">op</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">sequence</span><span class="p">)</span>
<span class="w">          </span><span class="p">(</span><span class="n">accumulate</span><span class="w"> </span><span class="n">op</span>
<span class="w">                      </span><span class="n">initial</span>
<span class="w">                      </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">sequence</span><span class="p">)))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">enumerate-interval</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="n">high</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">&gt;</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="n">high</span><span class="p">)</span>
<span class="w">      </span><span class="n">nil</span>
<span class="w">      </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">low</span>
<span class="w">            </span><span class="p">(</span><span class="n">enumerate-interval</span>
<span class="w">             </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span>
<span class="w">             </span><span class="n">high</span><span class="p">))))</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">filter</span><span class="w"> </span><span class="n">predicate</span><span class="w"> </span><span class="n">sequence</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="nb">null?</span><span class="w"> </span><span class="n">sequence</span><span class="p">)</span><span class="w"> </span><span class="n">nil</span><span class="p">)</span>
<span class="w">        </span><span class="p">((</span><span class="n">predicate</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">sequence</span><span class="p">))</span>
<span class="w">         </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">sequence</span><span class="p">)</span>
<span class="w">               </span><span class="p">(</span><span class="nb">filter</span><span class="w"> </span><span class="n">predicate</span>
<span class="w">                       </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">sequence</span><span class="p">))))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w">  </span><span class="p">(</span><span class="nb">filter</span><span class="w"> </span><span class="n">predicate</span>
<span class="w">                       </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">sequence</span><span class="p">)))))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">queens</span><span class="w"> </span><span class="n">board-size</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">empty-board</span><span class="w"> </span><span class="n">nil</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">last</span><span class="w"> </span><span class="n">lst</span><span class="p">)</span><span class="w"> </span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">lst</span><span class="p">))</span><span class="w"> </span>
<span class="w">      </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">lst</span><span class="p">)</span><span class="w"> </span>
<span class="w">      </span><span class="p">(</span><span class="nb">last</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">lst</span><span class="p">))))</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">echo</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">safe?</span><span class="w"> </span><span class="n">k</span><span class="w"> </span><span class="n">positions</span><span class="p">)</span>
<span class="w">    </span><span class="c1">;(echo positions)</span>
<span class="w">    </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">y</span><span class="w"> </span><span class="p">(</span><span class="nb">last</span><span class="w"> </span><span class="n">positions</span><span class="p">))</span>
<span class="w">    </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">safe-loop</span><span class="w"> </span><span class="n">i</span><span class="w"> </span><span class="nb">rest</span><span class="p">)</span><span class="w"> </span>
<span class="w">      </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">yprime</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="nb">rest</span><span class="p">))</span>
<span class="w">      </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="n">i</span><span class="w"> </span><span class="n">k</span><span class="p">)</span>
<span class="w">        </span><span class="no">#t</span>
<span class="w">        </span><span class="p">(</span><span class="k">and</span><span class="w"> </span><span class="p">(</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="n">yprime</span><span class="w"> </span><span class="n">y</span><span class="p">))</span>
<span class="w">             </span><span class="p">(</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="p">(</span><span class="nb">abs</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">y</span><span class="w"> </span><span class="n">yprime</span><span class="p">))</span><span class="w"> </span><span class="p">(</span><span class="nb">abs</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">k</span><span class="w"> </span><span class="n">i</span><span class="p">))))</span>
<span class="w">             </span><span class="p">(</span><span class="n">safe-loop</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="n">i</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="nb">rest</span><span class="p">)))))</span>
<span class="w">    </span><span class="p">(</span><span class="n">safe-loop</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="n">positions</span><span class="p">))</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">adjoin-position</span><span class="w"> </span><span class="n">new-row</span><span class="w"> </span><span class="n">k</span><span class="w"> </span><span class="n">rest-of-queens</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="nb">append</span><span class="w"> </span><span class="n">rest-of-queens</span><span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="n">new-row</span><span class="p">)))</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">queen-cols</span><span class="w"> </span><span class="n">k</span><span class="p">)</span>
<span class="w">    </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="n">k</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="n">empty-board</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="nb">filter</span>
<span class="w">         </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">positions</span><span class="p">)</span><span class="w"> </span>
<span class="w">           </span><span class="p">(</span><span class="n">safe?</span><span class="w"> </span><span class="n">k</span><span class="w"> </span><span class="n">positions</span><span class="p">))</span>
<span class="w">         </span><span class="p">(</span><span class="n">flatmap</span>
<span class="w">          </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">rest-of-queens</span><span class="p">)</span>
<span class="w">            </span><span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">new-row</span><span class="p">)</span>
<span class="w">                   </span><span class="p">(</span><span class="n">adjoin-position</span><span class="w"> </span>
<span class="w">                    </span><span class="n">new-row</span><span class="w"> </span>
<span class="w">                    </span><span class="n">k</span><span class="w"> </span>
<span class="w">                    </span><span class="n">rest-of-queens</span><span class="p">))</span>
<span class="w">                 </span><span class="p">(</span><span class="n">enumerate-interval</span><span class="w"> </span>
<span class="w">                  </span><span class="mi">1</span><span class="w"> </span>
<span class="w">                  </span><span class="n">board-size</span><span class="p">)))</span>
<span class="w">          </span><span class="p">(</span><span class="n">queen-cols</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">k</span><span class="w"> </span><span class="mi">1</span><span class="p">))))))</span>
<span class="w">  </span><span class="p">(</span><span class="n">queen-cols</span><span class="w"> </span><span class="n">board-size</span><span class="p">))</span>

<span class="p">(</span><span class="nb">map</span><span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">n</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">length</span><span class="w"> </span><span class="p">(</span><span class="n">queens</span><span class="w"> </span><span class="n">n</span><span class="p">)))</span><span class="w"> </span><span class="p">(</span><span class="n">enumerate-interval</span><span class="w"> </span><span class="mi">1</span><span class="w"> </span><span class="mi">10</span><span class="p">))</span>
</code></pre></div>
<div class="code-output"><span>Output:</span><pre>(1 0 0 2 10 4 40 92 352 724)
</pre></div></div>


We can see we reproduce [OEIS A000170](https://oeis.org/A000170):
$$1, 1, 0, 0, 2, 10, 4, 40, 92, 352, 724 $$


#### Exercise 2.43

Louis Reasoner is having a
terrible time doing Exercise 2.42.  His `queens` procedure seems to
work, but it runs extremely slowly.  (Louis never does manage to wait long
enough for it to solve even the $6\times6$ case.)  When Louis asks Eva Lu Ator for
help, she points out that he has interchanged the order of the nested mappings
in the `flatmap`, writing it as



```rkt
(flatmap
 (lambda (new-row)
   (map (lambda (rest-of-queens)
          (adjoin-position 
           new-row k rest-of-queens))
        (queen-cols (- k 1))))
 (enumerate-interval 1 board-size))
```



Explain why this interchange makes the program run slowly.  Estimate how long
it will take Louis's program to solve the eight-queens puzzle, assuming that
the program in Exercise 2.42 solves the puzzle in time $T$.

##### Solution

In our substitution model, 
when we evaluate `(flatmap f interval)`, we end up with one evaluation of `f` for each 
element. But each time we evaluate the lambda, 
we begin a new evaluation of `(queen-cols (- k 1))`. So this is a branching recursive
call, with a branch factor equal to the board size! 

If the original method has complexity $O(n!)$, then we can estimate Louis's version to take $8^8/8!\approx 416$ times as long as the fast method.

I wrote some timing and plotting code in [code/nqueens.rkt](code/nqueens.txt), outputs at [code/nqueens-timing.csv](code/nqueens-timing.csv) and plotting code at [code/nqueens-plot.wl](code/nqueens-plot.wl), but the [resulting plot](media/nqueens-plot.svg) isn't convincing. The timings $T_n^{fast}/n!$ for n=1 through n=9 are:

`Tfast[n]/n!={1.,0.5,0.166667,0.0833333,0.0666667,0.0444444,0.0246032,0.0143601,0.00846836}`

suggesting that the algorithm isn't well-described by an $n!$ curve for small n.

The timings $T_n^{slow}/n^n$ hint that they're leveling off to a constant around $0.06 \mu s,$ which is promising that I got it right. So, using Louis's method it would take 2hrs 40 minutes to do $n=10$ and about 80 hours to do $n=11.$ I think I'll pass on verifying that, but I'm pretty convinced that those are good estimates :)

`Tslow[n]/n^n={1., 0.25, 0.0740741, 0.0546875, 0.04992, 0.137731, 0.0567997, \
0.0575211, 0.0614966}`

#### Exercise 2.44

Define the procedure
`up-split` used by `corner-split`.  It is similar to
`right-split`, except that it switches the roles of `below` and
`beside`.

##### Solution

#### Exercise 2.45

`Right-split` and
`up-split` can be expressed as instances of a general splitting operation.
Define a procedure `split` with the property that evaluating



```rkt
(define right-split (split beside below))
(define up-split (split below beside))
```




produces procedures `right-split` and `up-split` with the same
behaviors as the ones already defined.

##### Solution

#### Exercise 2.46

A two-dimensional vector $\bf v$
running from the origin to a point can be represented as a pair consisting of
an $x$-coordinate and a $y$-coordinate.  Implement a data abstraction for
vectors by giving a constructor `make-vect` and corresponding selectors
`xcor-vect` and `ycor-vect`.  In terms of your selectors and
constructor, implement procedures `add-vect`, `sub-vect`, and
`scale-vect` that perform the operations vector addition, vector
subtraction, and multiplying a vector by a scalar:

$$\begin{eqnarray}
	(x_1, y_1) + (x_2, y_2)  &=&  (x_1 + x_2, y_1 + y_2), \\
	(x_1, y_1) - (x_2, y_2)  &=&  (x_1 - x_2, y_1 - y_2), \\
	s \cdot (x, y) 		 &=&  (sx, sy).
\end{eqnarray}
$$


##### Solution

#### Exercise 2.47

Here are two possible
constructors for frames:



```rkt
(define (make-frame origin edge1 edge2)
  (list origin edge1 edge2))

(define (make-frame origin edge1 edge2)
  (cons origin (cons edge1 edge2)))
```



For each constructor supply the appropriate selectors to produce an
implementation for frames.

##### Solution

#### Exercise 2.48

A directed line segment in the
plane can be represented as a pair of vectors---the vector running from the
origin to the start-point of the segment, and the vector running from the
origin to the end-point of the segment.  Use your vector representation from
Exercise 2.46 to define a representation for segments with a constructor
`make-segment` and selectors `start-segment` and `end-segment`.

##### Solution

#### Exercise 2.49

Use `segments->painter`
to define the following primitive painters:

**1.** The painter that draws the outline of the designated frame.

**2.** The painter that draws an ``X'' by connecting opposite corners of the frame.

**3.** The painter that draws a diamond shape by connecting the midpoints of the sides
of the frame.

**4.** The `wave` painter.



##### Solution

#### Exercise 2.50

Define the transformation
`flip-horiz`, which flips painters horizontally, and transformations that
rotate painters counterclockwise by 180 degrees and 270 degrees.

##### Solution

#### Exercise 2.51

Define the `below` operation
for painters.  `Below` takes two painters as arguments.  The resulting
painter, given a frame, draws with the first painter in the bottom of the frame
and with the second painter in the top.  Define `below` in two different
ways---first by writing a procedure that is analogous to the `beside`
procedure given above, and again in terms of `beside` and suitable
rotation operations (from Exercise 2.50).

##### Solution

#### Exercise 2.52

Make changes to the square limit
of `wave` shown in Figure 2.9 by working at each of the levels
described above.  In particular:

**1.** Add some segments to the primitive `wave` painter of Exercise 2.49
(to add a smile, for example).

**2.** Change the pattern constructed by `corner-split` (for example, by using
only one copy of the `up-split` and `right-split` images instead of
two).

**3.** Modify the version of `square-limit` that uses `square-of-four` so as
to assemble the corners in a different pattern.  (For example, you might make
the big Mr. Rogers look outward from each corner of the square.)

##### Solution






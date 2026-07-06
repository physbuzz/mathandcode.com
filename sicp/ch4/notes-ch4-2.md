---
layout: sicp
render_with_liquid: false
title: SICP Chapter 4.2
---

<div class="nav">
    <span class="activenav"><a href="notes-ch4-1.html">← Previous</a></span>
    <span class="activenav"><a href="../index.html">↑ Up</a></span>
    <span class="activenav"><a href="notes-ch4-3.html">Next →</a></span>
</div>

[HTML Book Chapter 4.2 Link](https://sarabander.github.io/sicp/html/4_002e2.xhtml#g_t4_002e2)

## Directory
- [Section 4.2](#section-42)
  - [Notes](#notes)
  - [Exercises](#exercises)
    - *Exercises:* ([Exercise 4.25](#exercise-425), [Exercise 4.26](#exercise-426), [Exercise 4.27](#exercise-427), [Exercise 4.28](#exercise-428), [Exercise 4.29](#exercise-429), [Exercise 4.30](#exercise-430), [Exercise 4.31](#exercise-431), [Exercise 4.32](#exercise-432), [Exercise 4.33](#exercise-433), [Exercise 4.34](#exercise-434))

## Section 4.2

### Notes

### Exercises

#### Exercise 4.25

Suppose that (in ordinary
applicative-order Scheme) we define `unless` as shown above and then
define `factorial` in terms of `unless` as

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">factorial</span><span class="w"> </span><span class="n">n</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">unless</span><span class="w"> </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">)</span>
<span class="w">          </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="p">(</span><span class="n">factorial</span><span class="w"> </span><span class="p">(</span><span class="nb">-</span><span class="w"> </span><span class="n">n</span><span class="w"> </span><span class="mi">1</span><span class="p">)))</span>
<span class="w">          </span><span class="mi">1</span><span class="p">))</span>
</pre></div>

What happens if we attempt to evaluate `(factorial 5)`?  Will our
definitions work in a normal-order language?

##### Solution

#### Exercise 4.26

Ben Bitdiddle and Alyssa
P. Hacker disagree over the importance of lazy evaluation for implementing
things such as `unless`.  Ben points out that it's possible to implement
`unless` in applicative order as a special form.  Alyssa counters that, if
one did that, `unless` would be merely syntax, not a procedure that could
be used in conjunction with higher-order procedures.  Fill in the details on
both sides of the argument.  Show how to implement `unless` as a derived
expression (like `cond` or `let`), and give an example of a situation
where it might be useful to have `unless` available as a procedure, rather
than as a special form.

##### Solution

#### Exercise 4.27

Suppose we type in the following
definitions to the lazy evaluator:

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="nb">count</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span>
<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">id</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="k">set!</span><span class="w"> </span><span class="nb">count</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="nb">count</span><span class="w"> </span><span class="mi">1</span><span class="p">))</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
</pre></div>

Give the missing values in the following sequence of interactions, and explain
your answers.

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="n">w</span><span class="w"> </span><span class="p">(</span><span class="n">id</span><span class="w"> </span><span class="p">(</span><span class="n">id</span><span class="w"> </span><span class="mi">10</span><span class="p">)))</span>

<span class="c1">;;; L-Eval input:</span>
<span class="nb">count</span>

<span class="c1">;;; L-Eval value:</span>
<span class="n">⟨@var</span><span class="p">{</span><span class="n">response</span><span class="p">}</span><span class="n">⟩</span>

<span class="c1">;;; L-Eval input:</span>
<span class="n">w</span>

<span class="c1">;;; L-Eval value:</span>
<span class="n">⟨@var</span><span class="p">{</span><span class="n">response</span><span class="p">}</span><span class="n">⟩</span>

<span class="c1">;;; L-Eval input:</span>
<span class="nb">count</span>

<span class="c1">;;; L-Eval value:</span>
<span class="n">⟨@var</span><span class="p">{</span><span class="n">response</span><span class="p">}</span><span class="n">⟩</span>
</pre></div>

##### Solution

#### Exercise 4.28

`Eval` uses
`actual-value` rather than `eval` to evaluate the operator before
passing it to `apply`, in order to force the value of the operator.  Give
an example that demonstrates the need for this forcing.

##### Solution

#### Exercise 4.29
Exhibit a program that you would
expect to run much more slowly without memoization than with memoization.
Also, consider the following interaction, where the `id` procedure is
defined as in Exercise 4.27 and `count` starts at 0:

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">square</span><span class="w"> </span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>

<span class="c1">;;; L-Eval input:</span>
<span class="p">(</span><span class="n">square</span><span class="w"> </span><span class="p">(</span><span class="n">id</span><span class="w"> </span><span class="mi">10</span><span class="p">))</span>

<span class="c1">;;; L-Eval value:</span>
<span class="n">⟨@var</span><span class="p">{</span><span class="n">response</span><span class="p">}</span><span class="n">⟩</span>

<span class="c1">;;; L-Eval input:</span>
<span class="nb">count</span>

<span class="c1">;;; L-Eval value:</span>
<span class="n">⟨@var</span><span class="p">{</span><span class="n">response</span><span class="p">}</span><span class="n">⟩</span>
</pre></div>

Give the responses both when the evaluator memoizes and when it does not.

##### Solution

#### Exercise 4.30

Cy D. Fect, a reformed C
programmer, is worried that some side effects may never take place, because the
lazy evaluator doesn't force the expressions in a sequence.  Since the value of
an expression in a sequence other than the last one is not used (the expression
is there only for its effect, such as assigning to a variable or printing),
there can be no subsequent use of this value (e.g., as an argument to a
primitive procedure) that will cause it to be forced.  Cy thus thinks that when
evaluating sequences, we must force all expressions in the sequence except the
final one.  He proposes to modify `eval-sequence` from 4.1.1
to use `actual-value` rather than `eval`:

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">eval-sequence</span><span class="w"> </span><span class="n">exps</span><span class="w"> </span><span class="n">env</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">cond</span><span class="w"> </span><span class="p">((</span><span class="n">last-exp?</span><span class="w"> </span><span class="n">exps</span><span class="p">)</span><span class="w"> </span>
<span class="w">         </span><span class="p">(</span><span class="nb">eval</span><span class="w"> </span><span class="p">(</span><span class="n">first-exp</span><span class="w"> </span><span class="n">exps</span><span class="p">)</span><span class="w"> </span><span class="n">env</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="k">else</span><span class="w"> </span>
<span class="w">         </span><span class="p">(</span><span class="n">actual-value</span><span class="w"> </span><span class="p">(</span><span class="n">first-exp</span><span class="w"> </span><span class="n">exps</span><span class="p">)</span><span class="w"> </span>
<span class="w">                       </span><span class="n">env</span><span class="p">)</span>
<span class="w">         </span><span class="p">(</span><span class="n">eval-sequence</span><span class="w"> </span><span class="p">(</span><span class="n">rest-exps</span><span class="w"> </span><span class="n">exps</span><span class="p">)</span><span class="w"> </span>
<span class="w">                        </span><span class="n">env</span><span class="p">))))</span>
</pre></div>

**1.** Ben Bitdiddle thinks Cy is wrong.  He shows Cy the `for-each` procedure
described in Exercise 2.23, which gives an important example of a
sequence with side effects:

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="nb">for-each</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span><span class="n">items</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="nb">null?</span><span class="w"> </span><span class="n">items</span><span class="p">)</span>
<span class="w">      </span><span class="o">&#39;</span><span class="ss">done</span>
<span class="w">      </span><span class="p">(</span><span class="k">begin</span><span class="w"> </span><span class="p">(</span><span class="n">proc</span><span class="w"> </span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="n">items</span><span class="p">))</span>
<span class="w">             </span><span class="p">(</span><span class="nb">for-each</span><span class="w"> </span><span class="n">proc</span><span class="w"> </span>
<span class="w">                       </span><span class="p">(</span><span class="nb">cdr</span><span class="w"> </span><span class="n">items</span><span class="p">)))))</span>
</pre></div>

He claims that the evaluator in the text (with the original
`eval-sequence`) handles this correctly:

<div class="codehilite"><pre><span></span><span class="c1">;;; L-Eval input:</span>
<span class="p">(</span><span class="nb">for-each</span>
<span class="w"> </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">newline</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">display</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="w"> </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="mi">57</span><span class="w"> </span><span class="mi">321</span><span class="w"> </span><span class="mi">88</span><span class="p">))</span>
<span class="mi">57</span>
<span class="mi">321</span>
<span class="mi">88</span>

<span class="c1">;;; L-Eval value:</span>
<span class="n">done</span>
</pre></div>

Explain why Ben is right about the behavior of `for-each`.

**2.** Cy agrees that Ben is right about the `for-each` example, but says that
that's not the kind of program he was thinking about when he proposed his
change to `eval-sequence`.  He defines the following two procedures in the
lazy evaluator:

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">p1</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">set!</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="mi">2</span><span class="p">)))</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">p2</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">p</span><span class="w"> </span><span class="n">e</span><span class="p">)</span><span class="w"> </span><span class="n">e</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">p</span><span class="w"> </span><span class="p">(</span><span class="k">set!</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="mi">2</span><span class="p">)))))</span>
</pre></div>

What are the values of `(p1 1)` and `(p2 1)` with the original
`eval-sequence`?  What would the values be with Cy's proposed change to
`eval-sequence`?

**3.** Cy also points out that changing `eval-sequence` as he proposes does not
affect the behavior of the example in part a.  Explain why this is true.

**4.** How do you think sequences ought to be treated in the lazy evaluator?  Do you
like Cy's approach, the approach in the text, or some other approach?



##### Solution

#### Exercise 4.31

The approach taken in this
section is somewhat unpleasant, because it makes an incompatible change to
Scheme.  It might be nicer to implement lazy evaluation as an
upward-compatible extension, that is, so that ordinary Scheme
programs will work as before.  We can do this by extending the syntax of
procedure declarations to let the user control whether or not arguments are to
be delayed.  While we're at it, we may as well also give the user the choice
between delaying with and without memoization.  For example, the definition

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">f</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="p">(</span><span class="n">b</span><span class="w"> </span><span class="k">lazy</span><span class="p">)</span><span class="w"> </span><span class="n">c</span><span class="w"> </span><span class="p">(</span><span class="n">d</span><span class="w"> </span><span class="n">lazy-memo</span><span class="p">))</span>
<span class="w">  </span><span class="n">@r</span><span class="p">{</span><span class="n">…</span><span class="p">})</span>
</pre></div>


would define `f` to be a procedure of four arguments, where the first and
third arguments are evaluated when the procedure is called, the second argument
is delayed, and the fourth argument is both delayed and memoized.  Thus,
ordinary procedure definitions will produce the same behavior as ordinary
Scheme, while adding the `lazy-memo` declaration to each parameter of
every compound procedure will produce the behavior of the lazy evaluator
defined in this section. Design and implement the changes required to produce
such an extension to Scheme.  You will have to implement new syntax procedures
to handle the new syntax for `define`.  You must also arrange for
`eval` or `apply` to determine when arguments are to be delayed, and
to force or delay arguments accordingly, and you must arrange for forcing to
memoize or not, as appropriate.

##### Solution

#### Exercise 4.32

Give some examples that
illustrate the difference between the streams of Chapter 3 and the
``lazier'' lazy lists described in this section.  How can you take advantage of
this extra laziness?

##### Solution

#### Exercise 4.33

Ben Bitdiddle tests the lazy list
implementation given above by evaluating the expression

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="nb">car</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">a</span><span class="w"> </span><span class="ss">b</span><span class="w"> </span><span class="ss">c</span><span class="p">))</span>
</pre></div>

To his surprise, this produces an error.  After some thought, he realizes that
the ``lists'' obtained by reading in quoted expressions are different from the
lists manipulated by the new definitions of `cons`, `car`, and
`cdr`.  Modify the evaluator's treatment of quoted expressions so that
quoted lists typed at the driver loop will produce true lazy lists.

##### Solution

#### Exercise 4.34

Modify the driver loop for the
evaluator so that lazy pairs and lists will print in some reasonable way.
(What are you going to do about infinite lists?)  You may also need to modify
the representation of lazy pairs so that the evaluator can identify them in
order to print them.

##### Solution


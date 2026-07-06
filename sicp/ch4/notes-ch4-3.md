---
layout: sicp
render_with_liquid: false
title: SICP Chapter 4.3
---

<div class="nav">
    <span class="activenav"><a href="notes-ch4-2.html">← Previous</a></span>
    <span class="activenav"><a href="../index.html">↑ Up</a></span>
    <span class="activenav"><a href="notes-ch4-4.html">Next →</a></span>
</div>

[HTML Book Chapter 4.3 Link](https://sarabander.github.io/sicp/html/4_002e3.xhtml#g_t4_002e3)

## Directory
- [Section 4.3](#section-43)
  - [Notes](#notes)
  - [Exercises](#exercises)
    - *Exercises:* ([Exercise 4.35](#exercise-435), [Exercise 4.36](#exercise-436), [Exercise 4.37](#exercise-437), [Exercise 4.38](#exercise-438), [Exercise 4.39](#exercise-439), [Exercise 4.40](#exercise-440), [Exercise 4.41](#exercise-441), [Exercise 4.42](#exercise-442), [Exercise 4.43](#exercise-443), [Exercise 4.44](#exercise-444), [Exercise 4.45](#exercise-445), [Exercise 4.46](#exercise-446), [Exercise 4.47](#exercise-447), [Exercise 4.48](#exercise-448), [Exercise 4.49](#exercise-449), [Exercise 4.50](#exercise-450), [Exercise 4.51](#exercise-451), [Exercise 4.52](#exercise-452), [Exercise 4.53](#exercise-453), [Exercise 4.54](#exercise-454))

## Section 4.3

### Notes

### Exercises

#### Exercise 4.35

Write a procedure
`an-integer-between` that returns an integer between two given bounds.
This can be used to implement a procedure that finds Pythagorean triples, i.e.,
triples of integers ${(i, j, k)$} between the given bounds such that
${i \le j$} and ${i^2 + j^2 = k^2$}, as follows:

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">a-pythagorean-triple-between</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="n">high</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">i</span><span class="w"> </span><span class="p">(</span><span class="n">an-integer-between</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="n">high</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">j</span><span class="w"> </span><span class="p">(</span><span class="n">an-integer-between</span><span class="w"> </span><span class="n">i</span><span class="w"> </span><span class="n">high</span><span class="p">)))</span>
<span class="w">      </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">k</span><span class="w"> </span><span class="p">(</span><span class="n">an-integer-between</span><span class="w"> </span><span class="n">j</span><span class="w"> </span><span class="n">high</span><span class="p">)))</span>
<span class="w">        </span><span class="p">(</span><span class="k">require</span><span class="w"> </span><span class="p">(</span><span class="nb">=</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">i</span><span class="w"> </span><span class="n">i</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">j</span><span class="w"> </span><span class="n">j</span><span class="p">))</span><span class="w"> </span>
<span class="w">                    </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">k</span><span class="w"> </span><span class="n">k</span><span class="p">)))</span>
<span class="w">        </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="n">i</span><span class="w"> </span><span class="n">j</span><span class="w"> </span><span class="n">k</span><span class="p">)))))</span>
</pre></div>

##### Solution

#### Exercise 4.36

Exercise 3.69 discussed how
to generate the stream of *all* Pythagorean triples, with no upper bound
on the size of the integers to be searched.  Explain why simply replacing
`an-integer-between` by `an-integer-starting-from` in the procedure
in Exercise 4.35 is not an adequate way to generate arbit@-rary Py@-tha@-go@-rean
triples.  Write a procedure that actually will accomplish this.  (That is,
write a procedure for which repeatedly typing `try-again` would in
principle eventually generate all Py@-tha@-go@-rean triples.)

##### Solution

#### Exercise 4.37

Ben Bitdiddle claims that the
following method for generating Pythagorean triples is more efficient than the
one in Exercise 4.35.  Is he correct?  (Hint: Consider the number of
possibilities that must be explored.)

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">a-pythagorean-triple-between</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="n">high</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">i</span><span class="w"> </span><span class="p">(</span><span class="n">an-integer-between</span><span class="w"> </span><span class="n">low</span><span class="w"> </span><span class="n">high</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="n">hsq</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">high</span><span class="w"> </span><span class="n">high</span><span class="p">)))</span>
<span class="w">    </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">j</span><span class="w"> </span><span class="p">(</span><span class="n">an-integer-between</span><span class="w"> </span><span class="n">i</span><span class="w"> </span><span class="n">high</span><span class="p">)))</span>
<span class="w">      </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">ksq</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">i</span><span class="w"> </span><span class="n">i</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="nb">*</span><span class="w"> </span><span class="n">j</span><span class="w"> </span><span class="n">j</span><span class="p">))))</span>
<span class="w">        </span><span class="p">(</span><span class="k">require</span><span class="w"> </span><span class="p">(</span><span class="nb">&gt;=</span><span class="w"> </span><span class="n">hsq</span><span class="w"> </span><span class="n">ksq</span><span class="p">))</span>
<span class="w">        </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">k</span><span class="w"> </span><span class="p">(</span><span class="nb">sqrt</span><span class="w"> </span><span class="n">ksq</span><span class="p">)))</span>
<span class="w">          </span><span class="p">(</span><span class="k">require</span><span class="w"> </span><span class="p">(</span><span class="nb">integer?</span><span class="w"> </span><span class="n">k</span><span class="p">))</span>
<span class="w">          </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="n">i</span><span class="w"> </span><span class="n">j</span><span class="w"> </span><span class="n">k</span><span class="p">))))))</span>
</pre></div>

##### Solution

#### Exercise 4.38

Modify the multiple-dwelling
procedure to omit the requirement that Smith and Fletcher do not live on
adjacent floors.  How many solutions are there to this modified puzzle?

##### Solution

#### Exercise 4.39

Does the order of the
restrictions in the multiple-dwelling procedure affect the answer? Does it
affect the time to find an answer?  If you think it matters, demonstrate a
faster program obtained from the given one by reordering the restrictions.  If
you think it does not matter, argue your case.

##### Solution

#### Exercise 4.40

In the multiple dwelling problem,
how many sets of assignments are there of people to floors, both before and
after the requirement that floor assignments be distinct?  It is very
inefficient to generate all possible assignments of people to floors and then
leave it to backtracking to eliminate them.  For example, most of the
restrictions depend on only one or two of the person-floor variables, and can
thus be imposed before floors have been selected for all the people.  Write and
demonstrate a much more efficient nondeterministic procedure that solves this
problem based upon generating only those possibilities that are not already
ruled out by previous restrictions.  (Hint: This will require a nest of
`let` expressions.)

##### Solution

#### Exercise 4.41

Write an ordinary Scheme program
to solve the multiple dwelling puzzle.

##### Solution

#### Exercise 4.42

Solve the following ``Liars''
puzzle (from Phillips 1934):

Five schoolgirls sat for an examination.  Their parents---so they
thought---showed an undue degree of interest in the result.  They therefore
agreed that, in writing home about the examination, each girl should make one
true statement and one untrue one.  The following are the relevant passages
from their letters:

@itemize @bullet

@item
Betty: ``Kitty was second in the examination.  I was only third.''

@item
Ethel: ``You'll be glad to hear that I was on top.  Joan was second.''

@item
Joan: ``I was third, and poor old Ethel was bottom.''

@item
Kitty: ``I came out second.  Mary was only fourth.''

@item
Mary: ``I was fourth.  Top place was taken by Betty.''



What in fact was the order in which the five girls were placed?

##### Solution

#### Exercise 4.43

Use the `amb` evaluator to
solve the following puzzle:

@quotation
Mary Ann Moore's father has a yacht and so has each of his four friends:
Colonel Downing, Mr. Hall, Sir Barnacle Hood, and Dr.  Parker.  Each of the
five also has one daughter and each has named his yacht after a daughter of one
of the others.  Sir Barnacle's yacht is the Gabrielle, Mr. Moore owns the
Lorna; Mr. Hall the Rosalind.  The Melissa, owned by Colonel Downing, is named
after Sir Barnacle's daughter.  Gabrielle's father owns the yacht that is named
after Dr.  Parker's daughter.  Who is Lorna's father?

##### Solution

#### Exercise 4.44

Exercise 2.42 described the
``eight-queens puzzle'' of placing queens on a chessboard so that no two attack
each other.  Write a nondeterministic program to solve this puzzle.

##### Solution

#### Exercise 4.45

With the grammar given above, the
following sentence can be parsed in five different ways: ``The professor
lectures to the student in the class with the cat.''  Give the five parses and
explain the differences in shades of meaning among them.

##### Solution

#### Exercise 4.46

The evaluators in 
4.1 and 4.2 do not determine what order operands are evaluated in.
We will see that the `amb` evaluator evaluates them from left to right.
Explain why our parsing program wouldn't work if the operands were evaluated in
some other order.

##### Solution

#### Exercise 4.47

Louis Reasoner suggests that,
since a verb phrase is either a verb or a verb phrase followed by a
prepositional phrase, it would be much more straightforward to define the
procedure `parse-verb-phrase` as follows (and similarly for noun phrases):

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">parse-verb-phrase</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="n">amb</span><span class="w"> </span><span class="p">(</span><span class="n">parse-word</span><span class="w"> </span><span class="n">verbs</span><span class="p">)</span>
<span class="w">       </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span>
<span class="w">        </span><span class="o">&#39;</span><span class="ss">verb-phrase</span>
<span class="w">        </span><span class="p">(</span><span class="n">parse-verb-phrase</span><span class="p">)</span>
<span class="w">        </span><span class="p">(</span><span class="n">parse-prepositional-phrase</span><span class="p">))))</span>
</pre></div>

Does this work?  Does the program's behavior change if we interchange the order
of expressions in the `amb`?

##### Solution

#### Exercise 4.48

Extend the grammar given above to
handle more complex sentences.  For example, you could extend noun phrases and
verb phrases to include adjectives and adverbs, or you could handle compound
sentences.

##### Solution

#### Exercise 4.49

Alyssa P. Hacker is more
interested in generating interesting sentences than in parsing them.  She
reasons that by simply changing the procedure `parse-word` so that it
ignores the ``input sentence'' and instead always succeeds and generates an
appropriate word, we can use the programs we had built for parsing to do
generation instead.  Implement Alyssa's idea, and show the first half-dozen or
so sentences generated.

##### Solution

#### Exercise 4.50

Implement a new special form
`ramb` that is like `amb` except that it searches alternatives in a
random order, rather than from left to right.  Show how this can help with
Alyssa's problem in Exercise 4.49.

##### Solution

#### Exercise 4.51

Implement a new kind of
assignment called `permanent-set!` that is not undone upon failure.  For
example, we can choose two distinct elements from a list and count the number
of trials required to make a successful choice as follows:

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="nb">count</span><span class="w"> </span><span class="mi">0</span><span class="p">)</span>
<span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">x</span><span class="w"> </span><span class="p">(</span><span class="n">an-element-of</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">a</span><span class="w"> </span><span class="ss">b</span><span class="w"> </span><span class="ss">c</span><span class="p">)))</span>
<span class="w">      </span><span class="p">(</span><span class="n">y</span><span class="w"> </span><span class="p">(</span><span class="n">an-element-of</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="ss">a</span><span class="w"> </span><span class="ss">b</span><span class="w"> </span><span class="ss">c</span><span class="p">))))</span>
<span class="w">  </span><span class="p">(</span><span class="n">permanent-set!</span><span class="w"> </span><span class="nb">count</span><span class="w"> </span><span class="p">(</span><span class="nb">+</span><span class="w"> </span><span class="nb">count</span><span class="w"> </span><span class="mi">1</span><span class="p">))</span>
<span class="w">  </span><span class="p">(</span><span class="k">require</span><span class="w"> </span><span class="p">(</span><span class="nb">not</span><span class="w"> </span><span class="p">(</span><span class="nb">eq?</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">y</span><span class="p">)))</span>
<span class="w">  </span><span class="p">(</span><span class="nb">list</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="n">y</span><span class="w"> </span><span class="nb">count</span><span class="p">))</span>

<span class="c1">;;; Starting a new problem</span>
<span class="c1">;;; Amb-Eval value:</span>
<span class="p">(</span><span class="n">a</span><span class="w"> </span><span class="n">b</span><span class="w"> </span><span class="mi">2</span><span class="p">)</span>

<span class="c1">;;; Amb-Eval input:</span>
<span class="n">try-again</span>

<span class="c1">;;; Amb-Eval value:</span>
<span class="p">(</span><span class="n">a</span><span class="w"> </span><span class="n">c</span><span class="w"> </span><span class="mi">3</span><span class="p">)</span>
</pre></div>

What values would have been displayed if we had used `set!` here
rather than `permanent-set!`?

##### Solution

#### Exercise 4.52

Implement a new construct called
`if-fail` that permits the user to catch the failure of an expression.
`If-fail` takes two expressions.  It evaluates the first expression as
usual and returns as usual if the evaluation succeeds.  If the evaluation
fails, however, the value of the second expression is returned, as in the
following example:

<div class="codehilite"><pre><span></span><span class="c1">;;; Amb-Eval input:</span>
<span class="p">(</span><span class="n">if-fail</span><span class="w"> </span>
<span class="w"> </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">x</span><span class="w"> </span><span class="p">(</span><span class="n">an-element-of</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="mi">1</span><span class="w"> </span><span class="mi">3</span><span class="w"> </span><span class="mi">5</span><span class="p">))))</span>
<span class="w">   </span><span class="p">(</span><span class="k">require</span><span class="w"> </span><span class="p">(</span><span class="nb">even?</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="w">   </span><span class="n">x</span><span class="p">)</span>
<span class="w"> </span><span class="o">&#39;</span><span class="ss">all-odd</span><span class="p">)</span>

<span class="c1">;;; Starting a new problem</span>
<span class="c1">;;; Amb-Eval value:</span>
<span class="n">all-odd</span>

<span class="c1">;;; Amb-Eval input:</span>
<span class="p">(</span><span class="n">if-fail</span>
<span class="w"> </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">x</span><span class="w"> </span><span class="p">(</span><span class="n">an-element-of</span><span class="w"> </span><span class="o">&#39;</span><span class="p">(</span><span class="mi">1</span><span class="w"> </span><span class="mi">3</span><span class="w"> </span><span class="mi">5</span><span class="w"> </span><span class="mi">8</span><span class="p">))))</span>
<span class="w">   </span><span class="p">(</span><span class="k">require</span><span class="w"> </span><span class="p">(</span><span class="nb">even?</span><span class="w"> </span><span class="n">x</span><span class="p">))</span>
<span class="w">   </span><span class="n">x</span><span class="p">)</span>
<span class="w"> </span><span class="o">&#39;</span><span class="ss">all-odd</span><span class="p">)</span>

<span class="c1">;;; Starting a new problem</span>
<span class="c1">;;; Amb-Eval value:</span>
<span class="mi">8</span>
</pre></div>

##### Solution

#### Exercise 4.53

With `permanent-set!` as
described in Exercise 4.51 and `if-fail` as in Exercise 4.52,
what will be the result of evaluating

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">pairs</span><span class="w"> </span><span class="o">&#39;</span><span class="p">()))</span>
<span class="w">  </span><span class="p">(</span><span class="n">if-fail</span><span class="w"> </span>
<span class="w">   </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">p</span><span class="w"> </span><span class="p">(</span><span class="n">prime-sum-pair</span><span class="w"> </span>
<span class="w">             </span><span class="o">&#39;</span><span class="p">(</span><span class="mi">1</span><span class="w"> </span><span class="mi">3</span><span class="w"> </span><span class="mi">5</span><span class="w"> </span><span class="mi">8</span><span class="p">)</span><span class="w"> </span>
<span class="w">             </span><span class="o">&#39;</span><span class="p">(</span><span class="mi">20</span><span class="w"> </span><span class="mi">35</span><span class="w"> </span><span class="mi">110</span><span class="p">))))</span>
<span class="w">     </span><span class="p">(</span><span class="n">permanent-set!</span><span class="w"> </span><span class="n">pairs</span><span class="w"> </span>
<span class="w">                     </span><span class="p">(</span><span class="nb">cons</span><span class="w"> </span><span class="n">p</span><span class="w"> </span><span class="n">pairs</span><span class="p">))</span>
<span class="w">     </span><span class="p">(</span><span class="n">amb</span><span class="p">))</span>
<span class="w">   </span><span class="n">pairs</span><span class="p">))</span>
</pre></div>

##### Solution

#### Exercise 4.54

If we had not realized that
`require` could be implemented as an ordinary procedure that uses
`amb`, to be defined by the user as part of a nondeterministic program, we
would have had to implement it as a special form.  This would require syntax
procedures

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">require?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="n">tagged-list?</span><span class="w"> </span><span class="nb">exp</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">require</span><span class="p">))</span>

<span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">require-predicate</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span>
<span class="w">  </span><span class="p">(</span><span class="nb">cadr</span><span class="w"> </span><span class="nb">exp</span><span class="p">))</span>
</pre></div>


and a new clause in the dispatch in `analyze`

<div class="codehilite"><pre><span></span><span class="p">((</span><span class="n">require?</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span><span class="w"> </span><span class="p">(</span><span class="n">analyze-require</span><span class="w"> </span><span class="nb">exp</span><span class="p">))</span>
</pre></div>


as well the procedure `analyze-require` that handles `require`
expressions.  Complete the following definition of `analyze-require`.

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="k">define</span><span class="w"> </span><span class="p">(</span><span class="n">analyze-require</span><span class="w"> </span><span class="nb">exp</span><span class="p">)</span>
<span class="w">  </span><span class="p">(</span><span class="k">let</span><span class="w"> </span><span class="p">((</span><span class="n">pproc</span><span class="w"> </span><span class="p">(</span><span class="n">analyze</span><span class="w"> </span>
<span class="w">                </span><span class="p">(</span><span class="n">require-predicate</span><span class="w"> </span><span class="nb">exp</span><span class="p">))))</span>
<span class="w">    </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">env</span><span class="w"> </span><span class="n">succeed</span><span class="w"> </span><span class="n">fail</span><span class="p">)</span>
<span class="w">      </span><span class="p">(</span><span class="n">pproc</span><span class="w"> </span><span class="n">env</span>
<span class="w">             </span><span class="p">(</span><span class="k">lambda</span><span class="w"> </span><span class="p">(</span><span class="n">pred-value</span><span class="w"> </span><span class="n">fail2</span><span class="p">)</span>
<span class="w">               </span><span class="p">(</span><span class="k">if</span><span class="w"> </span><span class="n">⟨??⟩</span>
<span class="w">                   </span><span class="n">⟨??⟩</span>
<span class="w">                   </span><span class="p">(</span><span class="n">succeed</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">ok</span><span class="w"> </span><span class="n">fail2</span><span class="p">)))</span>
<span class="w">             </span><span class="n">fail</span><span class="p">))))</span>
</pre></div>

##### Solution


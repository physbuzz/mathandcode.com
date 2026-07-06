---
layout: sicp
render_with_liquid: false
title: SICP Chapter 5.2
---

<div class="nav">
    <span class="activenav"><a href="notes-ch5-1.html">← Previous</a></span>
    <span class="activenav"><a href="../index.html">↑ Up</a></span>
    <span class="activenav"><a href="notes-ch5-3.html">Next →</a></span>
</div>

[HTML Book Chapter 5.2 Link](https://sarabander.github.io/sicp/html/5_002e2.xhtml#g_t5_002e2)

## Directory
- [Section 5.2](#section-52)
  - [Notes](#notes)
  - [Exercises](#exercises)
    - *Exercises:* ([Exercise 5.7](#exercise-57), [Exercise 5.8](#exercise-58), [Exercise 5.9](#exercise-59), [Exercise 5.10](#exercise-510), [Exercise 5.11](#exercise-511), [Exercise 5.12](#exercise-512), [Exercise 5.13](#exercise-513), [Exercise 5.14](#exercise-514), [Exercise 5.15](#exercise-515), [Exercise 5.16](#exercise-516), [Exercise 5.17](#exercise-517), [Exercise 5.18](#exercise-518), [Exercise 5.19](#exercise-519))

## Section 5.2

### Notes

### Exercises

#### Exercise 5.7

Use the simulator to test the
machines you designed in Exercise 5.4.

##### Solution

#### Exercise 5.8

The following register-machine code
is ambiguous, because the label `here` is defined more than once:

<div class="codehilite"><pre><span></span><span class="n">start</span>
<span class="w">  </span><span class="p">(</span><span class="n">goto</span><span class="w"> </span><span class="p">(</span><span class="n">label</span><span class="w"> </span><span class="n">here</span><span class="p">))</span>
<span class="n">here</span>
<span class="w">  </span><span class="p">(</span><span class="n">assign</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="p">(</span><span class="nb">const</span><span class="w"> </span><span class="mi">3</span><span class="p">))</span>
<span class="w">  </span><span class="p">(</span><span class="n">goto</span><span class="w"> </span><span class="p">(</span><span class="n">label</span><span class="w"> </span><span class="n">there</span><span class="p">))</span>
<span class="n">here</span>
<span class="w">  </span><span class="p">(</span><span class="n">assign</span><span class="w"> </span><span class="n">a</span><span class="w"> </span><span class="p">(</span><span class="nb">const</span><span class="w"> </span><span class="mi">4</span><span class="p">))</span>
<span class="w">  </span><span class="p">(</span><span class="n">goto</span><span class="w"> </span><span class="p">(</span><span class="n">label</span><span class="w"> </span><span class="n">there</span><span class="p">))</span>
<span class="n">there</span>
</pre></div>

With the simulator as written, what will the contents of register `a` be
when control reaches `there`?  Modify the `extract-labels` procedure
so that the assembler will signal an error if the same label name is used to
indicate two different locations.

##### Solution

#### Exercise 5.9

The treatment of machine operations
above permits them to operate on labels as well as on constants and the
contents of registers.  Modify the expression-processing procedures to enforce
the condition that operations can be used only with registers and constants.

##### Solution

#### Exercise 5.10

Design a new syntax for
register-machine instructions and modify the simulator to use your new syntax.
Can you implement your new syntax without changing any part of the simulator
except the syntax procedures in this section?

##### Solution

#### Exercise 5.11

When we introduced `save`
and `restore` in 5.1.4, we didn't specify what would happen
if you tried to restore a register that was not the last one saved, as in the
sequence

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="n">save</span><span class="w"> </span><span class="n">y</span><span class="p">)</span>
<span class="p">(</span><span class="n">save</span><span class="w"> </span><span class="n">x</span><span class="p">)</span>
<span class="p">(</span><span class="n">restore</span><span class="w"> </span><span class="n">y</span><span class="p">)</span>
</pre></div>

There are several reasonable possibilities for the meaning of `restore`:

**1.** `(restore y)` puts into `y` the last value saved on the stack,
regardless of what register that value came from.  This is the way our
simulator behaves.  Show how to take advantage of this behavior to eliminate
one instruction from the Fibonacci machine of 5.1.4 (Figure 5.12).

**2.** `(restore y)` puts into `y` the last value saved on the stack, but
only if that value was saved from `y`; otherwise, it signals an error.
Modify the simulator to behave this way.  You will have to change `save`
to put the register name on the stack along with the value.

**3.** `(restore y)` puts into `y` the last value saved from `y`
regardless of what other registers were saved after `y` and not restored.
Modify the simulator to behave this way.  You will have to associate a separate
stack with each register.  You should make the `initialize-stack`
operation initialize all the register stacks.



##### Solution

#### Exercise 5.12

The simulator can be used to help
determine the data paths required for implementing a machine with a given
controller.  Extend the assembler to store the following information in the
machine model:

@itemize

@item
a list of all instructions, with duplicates removed, sorted by instruction type
(`assign`, `goto`, and so on);

@item
a list (without duplicates) of the registers used to hold entry points (these
are the registers referenced by `goto` instructions);

@item
a list (without duplicates) of the registers that are `save`d
or `restore`d;

@item
for each register, a list (without duplicates) of the sources from which it is
assigned (for example, the sources for register `val` in the factorial
machine of Figure 5.11 are `(const 1)` and `((op *) (reg n)
(reg val))`).



Extend the message-passing interface to the machine to provide access to this
new information.  To test your analyzer, define the Fibonacci machine from
Figure 5.12 and examine the lists you constructed.

##### Solution

#### Exercise 5.13

Modify the simulator so that it
uses the controller sequence to determine what registers the machine has rather
than requiring a list of registers as an argument to `make-machine`.
Instead of pre-allocating the registers in `make-machine`, you can
allocate them one at a time when they are first seen during assembly of the
instructions.

##### Solution

#### Exercise 5.14

Measure the number of pushes and
the maximum stack depth required to compute ${n!$} for various small values of
$n$ using the factorial machine shown in Figure 5.11.  From your data
determine formulas in terms of $n$ for the total number of push operations
and the maximum stack depth used in computing ${n!$} for any ${n \gt 1$}. Note
that each of these is a linear function of $n$ and is thus determined by two
constants.  In order to get the statistics printed, you will have to augment
the factorial machine with instructions to initialize the stack and print the
statistics.  You may want to also modify the machine so that it repeatedly
reads a value for $n$, computes the factorial, and prints the result (as we
did for the @abbr{GCD} machine in Figure 5.4), so that you will not
have to repeatedly invoke `get-register-contents`,
`set-register-contents!`, and `start`.

##### Solution

#### Exercise 5.15

Add instruction counting 
to the register machine simulation.  That is, have the machine model
keep track of the number of instructions executed.  Extend the machine model's
interface to accept a new message that prints the value of the instruction
count and resets the count to zero.

##### Solution

#### Exercise 5.16

Augment the simulator to provide
for instruction tracing.  That is, before each instruction is
executed, the simulator should print the text of the instruction.  Make the
machine model accept `trace-on` and `trace-off` messages to turn
tracing on and off.

##### Solution

#### Exercise 5.17

Extend the instruction tracing of
Exercise 5.16 so that before printing an instruction, the simulator
prints any labels that immediately precede that instruction in the controller
sequence.  Be careful to do this in a way that does not interfere with
instruction counting (Exercise 5.15).  You will have to make the
simulator retain the necessary label information.

##### Solution

#### Exercise 5.18

Modify the `make-register`
procedure of 5.2.1 so that registers can be traced.  Registers
should accept messages that turn tracing on and off.  When a register is
traced, assigning a value to the register should print the name of the
register, the old contents of the register, and the new contents being
assigned.  Extend the interface to the machine model to permit you to turn
tracing on and off for designated machine registers.

##### Solution

#### Exercise 5.19

Alyssa P. Hacker wants a
breakpoint feature in the simulator to help her debug her machine
designs.  You have been hired to install this feature for her.  She wants to be
able to specify a place in the controller sequence where the simulator will
stop and allow her to examine the state of the machine.  You are to implement a
procedure

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="n">set-breakpoint</span><span class="w"> </span><span class="n">⟨@var</span><span class="p">{</span><span class="n">machine</span><span class="p">}</span><span class="n">⟩</span><span class="w"> </span><span class="n">⟨@var</span><span class="p">{</span><span class="n">label</span><span class="p">}</span><span class="n">⟩</span><span class="w"> </span><span class="n">⟨@var</span><span class="p">{</span><span class="n">n</span><span class="p">}</span><span class="n">⟩</span><span class="p">)</span>
</pre></div>


that sets a breakpoint just before the $n^{\text{th}}$ instruction after the given
label.  For example,

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="n">set-breakpoint</span><span class="w"> </span><span class="n">gcd-machine</span><span class="w"> </span><span class="o">&#39;</span><span class="ss">test-b</span><span class="w"> </span><span class="mi">4</span><span class="p">)</span>
</pre></div>


installs a breakpoint in `gcd-machine` just before the assignment to
register `a`.  When the simulator reaches the breakpoint it should print
the label and the offset of the breakpoint and stop executing instructions.
Alyssa can then use `get-register-contents` and
`set-register-contents!` to manipulate the state of the simulated machine.
She should then be able to continue execution by saying

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="n">proceed-machine</span><span class="w"> </span><span class="n">⟨@var</span><span class="p">{</span><span class="n">machine</span><span class="p">}</span><span class="n">⟩</span><span class="p">)</span>
</pre></div>

She should also be able to remove a specific breakpoint by means of

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="n">cancel-breakpoint</span><span class="w"> </span><span class="n">⟨@var</span><span class="p">{</span><span class="n">machine</span><span class="p">}</span><span class="n">⟩</span><span class="w"> </span><span class="n">⟨@var</span><span class="p">{</span><span class="n">label</span><span class="p">}</span><span class="n">⟩</span><span class="w"> </span><span class="n">⟨@var</span><span class="p">{</span><span class="n">n</span><span class="p">}</span><span class="n">⟩</span><span class="p">)</span>
</pre></div>


or to remove all breakpoints by means of

<div class="codehilite"><pre><span></span><span class="p">(</span><span class="n">cancel-all-breakpoints</span><span class="w"> </span><span class="n">⟨@var</span><span class="p">{</span><span class="n">machine</span><span class="p">}</span><span class="n">⟩</span><span class="p">)</span>
</pre></div>

##### Solution


---
layout: post
title:  "Finding the pressure by counting the magnitude of impacts on a wall"
date:   2025-06-14 00:00:01 -0800
---

Directory
===
- [Finding the pressure by counting the magnitude of impacts on a wall](#section0)
- [Impulse of a single particle](#section1)
- [Impulse of many particles](#section2)
- [Sampling Algorith](#section3)
- [Plotting the pressure in MD simulation](#section4)
- [Appendix: the PDF of an observable](#section5)

---

Suppose you have a container full of a classical ideal gas. To measure the pressure of the gas, you look at the total impulse applied to the wall during a time period $\delta t$ and divide the total impulse by $\delta t\times A$ to get the average force per unit area, ie the pressure. 

This is a common exercise in computational physics classrooms, but the results are often quite noisy. For example, here is a 
graph of the measured pressure averaged over $5,$ $25,$ and $50$ units of time, given that the average rate of collision is $1$ particle per second.

![](/img/posts/pressureMeasurement.svg)


I wanted to find the continuous time statistics of plots like this exactly, so this article goes over my derivation. I consider a monoatomic ideal gas in $D$ dimensions and solve for the total impulse,

$$I(t)=\int_0^t F(t')\mathrm{d}t'$$

as a random process.

### Impulse of a single particle <a name="section1"></a>


To solve this problem we start by noting the partition function for a single particle in a box of volume $V$ is 

$$Z=\iint \mathrm{d}^{D}x\mathrm{d}^{D}p \exp\left(-\frac{p^2}{2mT}\right)=V(2\pi m T)^{D/2}$$

Still considering a single particle in a box and a small interval of time $\Delta t$, we'll collide with a patch of wall of area $A$ (whose normal is in the $-\hat{x}$ direction) only if we have $v_x\gt 0$ and if we're in a small region of volume $A\cdot v_x \Delta t.$ If we collide with the wall, we'll apply a total impulse of magnitude $2 p_x.$ We can get a formula for the probability distribution of $P(I_x).$

As a general rule, if we have some quantity $B(x,p),$ the PDF of $B$ will be given by 

$$P(B')=\iint \mathrm{d}^{D}x\mathrm{d}^{D}p\cdot  \delta(B'-B(x,p))\cdot \rho(x,p)$$

See the appendix for the derivation. 

For us, this means that the probability of receiving a nonzero impulse $I_x=2 p_x$ is (I assume $I_x\gt 0$ for ease of writing)...

$$\begin{align*}
P^{\gt 0}(I_x)&= \int \mathrm{d}^D x \mathrm{d}^D p 
\Theta(x\in \textrm{box}, p_x\gt 0)\frac{\exp\left(-\frac{p^2}{2mT}\right)}{Z}\cdot\delta(I_x-2 p_x) \\
&=\int d p_x \frac{1}{V}\left(A\cdot \frac{p_x \Delta t}{m}\right)\cdot \frac{\exp\left(-\frac{p_x^2}{2mT}\right)}{\sqrt{2\pi m T}}\cdot\delta(I_x-2 p_x)\\
&=\frac{A  \Delta t}{4m V\sqrt{2\pi m T}}\cdot I_x\exp\left(-\frac{I_x^2}{8mT}\right)
\end{align*}$$

This expression has brutally lopped off the possibility that $I_x=0,$ so we need to add a delta function at zero with the remaining probability mass. Note that the normalized distribution conditioned on a particle hitting the wall is:

$$\rho(I_x)=\frac{I_x}{4m T}\exp\left(-\frac{I_x^2}{8mT}\right)$$

Let's also introduce the unitless quantity:

$$\mu=\frac{A\Delta t}{V}\sqrt{\frac{T}{2\pi m}}$$

This gives the total impulse PDF:

$$P(I_x)=\mu \rho(I_x)+(1-\mu)\delta(I_x)$$

So for our single particle case, we could sample the impulse on the wall during a timestep $\Delta t$ as follows: First sample a random number $0\leq \xi\leq 1.$  If $\xi\leq \mu,$ then we can sample $I_x$ from the distribution $\rho.$ Else, we choose $I_x=0.$ 

### Impulse of many particles <a name="section2"></a>


If we were clever, we could see immediately that the limit where we take $N$ to infinity while keeping $N/V$ constant gives rise to a compound Poisson process. But let's brute force it! 

We'll keep the number density $\overline{n}=N/V$ constant as we take the $N\to\infty$ limit, and so it's more convenient to write...

$$\begin{align*}\mu&=\frac{A\Delta t}{V}\sqrt{\frac{T}{2\pi m}}\\
&=\frac{\overline{n}A \Delta t }{N}\sqrt{\frac{T}{2\pi m}}\\
&=r/N\end{align*}$$

where $r$ is another unitless number, defined as

$$r=\overline{n}A\Delta t\sqrt{\frac{T}{2\pi m}}$$

Then...

$$\begin{align*}
\mathbb{P}(I_{\textrm{tot}})&=\int \mathrm{d}^N I_x \delta\left(I_{\textrm{tot}}-\sum_{i=1}^N I_x^{(i)}\right)\cdot\prod_{i=1}^N P(I_x^{(i)})\\
&=\int \frac{\mathrm{d}k}{2\pi} e^{ik I_{\textrm{tot}}} \tilde{P}(k)^N \\
&=\int \frac{\mathrm{d}k}{2\pi} e^{ik I_{\textrm{tot}}} \left(\mu \tilde{\rho}(k)+(1-\mu)\right)^N\\
&=\int \frac{\mathrm{d}k}{2\pi} e^{ik I_{\textrm{tot}}} \sum_{n=0}^\infty (1-\mu)^{N-n}\mu^n \tilde{\rho}(k)^n \binom{N}{n}\\
\end{align*}$$

We can take the $N\to\infty$ limit of the summand. First recall the Stirling expansion

$$\log N!=N\log(N)-N+\frac12 \log(2\pi N)+O\left(\frac{1}{N}\right)$$

From which we find

$$\log\left(\frac{N!}{(N-n)!}\right)=n\log(N)+O\left(\frac{1}{N}\right)$$

And therefore the difficult terms inside the sum have...

$$\begin{align*}
&\lim_{N\to\infty} \log\left((1-\frac{r}{N})^{N-n}\left(\frac{r}{N}\right)^n\frac{N!}{(N-n)!}\right)\\
&=\lim_{N\to\infty} \left[(N-n)\log\left(1-\frac{r}{N}\right)+n\log(r)\right]\\
&=n\log(r) +\lim_{N\to\infty} \Big[-(N-n)\frac{r}{N}\Big]\\
&=\log(r^n e^{-r})
\end{align*}$$

So

$$\begin{align*}
\mathbb{P}(I_{\textrm{tot}})&=\sum_{n=0}^\infty  \frac{e^{-r}r^n}{n!}
\int \frac{\mathrm{d}k}{2\pi} e^{ikI_{\textrm{tot}}} \tilde{\rho}(k)^n\\
&=\sum_{n=0}^\infty  \frac{e^{-r}r^n}{n!}\rho^{(*n)}(I_{\textrm{tot}})
\end{align*}$$

which is surely a statement that we could have arrived at if we thought more carefully instead of just plugging and chugging along. Either way, we have the expression now! It tells us the algorithm to sample $I_{\textrm{tot}}$: First, we choose $n$ from the Poisson distribution with mean $r.$ Then, we sample $n$ independent and identically distributed variables $I_x^{(i)}$ from $\rho.$ Their sum is the total impulse in the amount of time $\Delta t.$ 

Alternatively, if the expected number of particles in the timestep $\Delta t$ is very large, then $\rho^{(*n)}(I_{\textrm{tot}})$ is very nearly normally distributed with a mean and variance that we can calculate from our single variable collision function.

### Sampling Algorithm <a name="section3"></a>


Wow it works

```mathematica
rho[ix_] = ix/(sigma^2) Exp[- ix^2/(2 sigma^2)];
rhoPD = ProbabilityDistribution[rho[ix], {ix, 0, Infinity}];
(*constant = (a nbar )/(2 m Sqrt[2 \[Pi]])*)
constant = 1.0;
sigma = 1;
dt = 0.001;
totalT = 5;
nPD = PoissonDistribution[constant dt sigma];
samplePath := Accumulate[
   Table[
    Module[{n},
     n = RandomVariate[nPD];
     {dt, Sum[
       RandomVariate[rhoPD]
       , {i, 1, n}]}
     ]
    , {t, 0, totalT, dt}]
   ];
ListLinePlot[samplePath]
```

![](/img/posts/impulseOverTime.svg)

### Plotting the pressure in MD simulations <a name="section4"></a>


One way that you will get the graph of this is if you've ever measured the pressure in a molecular dynamics simulation. You count the total momentum transferred to a wall segment and average over the length of time. Your result may be noisier than you might expect, especially if the area of your patch of wall is small, or you average over too small of a time period. 

Maybe I should rephrase that: when *I* was an undergrad *my* results were way noisier than I expected! 

Using the above code we can generate plots statistically identical to that, but using direct sampling.

```mathematica
impulse = Interpolation[myPath];
measuredPressure[t_, m_] = (impulse[t + m] - impulse[t])/m;
Plot[Evaluate[Table[measuredPressure[t, m], {m, {5, 25, 50}}]], {t, 0,
   400}, Evaluated -> True, 
 PlotLegends -> {"Sample Time = 5", "Sample Time = 25", "Sample Time = 50"}]
```

![](/img/posts/pressureMeasurement.svg)


### Appendix: the PDF of an observable <a name="section5"></a>


Suppose that we have some configurations labeled by $\Gamma$ with PDF $\rho(\Gamma).$ Suppose we have an observable $A(\Gamma).$ We will show that the PDF of $A$ is 

$$\boxed{P(a)=\int \mathrm{d}\Gamma \delta(a-A(\Gamma))}.$$

First, note that 
$$P\big(a\lt A(\Gamma)\lt a+\Delta a\big)=\int_{A(\Gamma)\in[a,a+\Delta a)} \mathrm{d}\Gamma \cdot \rho(\Gamma).$$

We can enforce the condition $A(\Gamma)\in[a,a+\Delta a)$ using the Heaviside step function $\Theta{:}$

$$P\big(\textrm{...}\big) =\int \mathrm{d}\Gamma \rho(\Gamma)\big(\Theta(A(\Gamma)-a)-\Theta (A(\Gamma)-a-\Delta a)\big)$$

Then in the limit as $\Delta a\to 0,$ we can identify the difference of Heaviside thetas with a delta function. Being precise...

$$\begin{align*}
P(a)&=\lim_{\Delta a\to 0}\frac{P\big(a\lt A(\Gamma)\lt a+\Delta a\big)}{\Delta a}\\
&=\lim_{\Delta a\to 0}\int \mathrm{d}\Gamma \rho(\Gamma) \frac{1}{\Delta a}\big(\Theta(A(\Gamma)-a)-\Theta (A(\Gamma)-a-\Delta a)\big)\\
&=\int \mathrm{d}\Gamma \rho(\Gamma) \delta(A(\Gamma)-a)
\end{align*}$$




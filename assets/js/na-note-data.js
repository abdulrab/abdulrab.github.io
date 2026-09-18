window.NA_NOTE_DATA={
"section-1-3":{
  title:"Section 1.3 — Algorithms and Convergence",
  subtitle:"From mathematical method to stable, convergent computation",
  source:"MAT-315 detailed conceptual lecture notes · Fall 2026",
  intro:"Numerical analysis is not only about deriving formulas. A useful method must be converted into an unambiguous algorithm, executed in finite precision, and assessed for stability, error and convergence.",
  objectives:[
    "Distinguish a mathematical method from an executable numerical algorithm.",
    "Explain correctness, accuracy, stability, conditioning and convergence rate.",
    "Use absolute and relative error and interpret stopping criteria.",
    "Recognize Big-O error models and observed convergence behavior.",
    "Understand why round-off and truncation error can compete."
  ],
  sections:[
    ["1. Numerical-computation pipeline","Problem → approximation method → algorithm → finite-precision execution → computed approximation → error test. A trustworthy numerical answer requires control of the entire chain."],
    ["2. Error language","Absolute error is |p − p̂|. Relative error is |p − p̂|/|p| when p ≠ 0. Significant-digit claims should be tied to an explicit error criterion, not merely the number of printed decimals."],
    ["3. Stability and conditioning","Conditioning belongs to the problem: how sensitive is the exact answer to perturbed data? Stability belongs to the algorithm: how strongly are input and round-off perturbations amplified during the computation?"],
    ["4. Big-O rate","Writing E(h)=O(h^p) means that, for sufficiently small h, |E(h)| is bounded by C h^p for some constant C independent of h. The exponent p is an asymptotic rate, not an exact equality."],
    ["5. Truncation versus round-off","A common total-error model is C_T h^p + C_R u/h^q. Refinement reduces the truncation term but may magnify round-off/cancellation. Hence smaller h is not always better."]
  ],
  formulas:[
    ["Absolute error","e_abs = |p − p̂|"],
    ["Relative error","e_rel = |p − p̂| / |p|"],
    ["Algebraic error model","E(h) = O(h^p)"],
    ["Typical total-error model","E_total(h) ≲ C_T h^p + C_R u / h^q"]
  ],
  example:"If halving h changes the error from 2.4×10⁻⁴ to 3.0×10⁻⁵, the ratio is 8 = 2³, suggesting third-order behavior in the asymptotic regime.",
  mistakes:["Confusing the number of printed digits with accuracy.","Assuming a stable algorithm can fix an ill-conditioned problem.","Treating Big-O as an exact equality.","Refining h indefinitely without checking round-off effects."],
  lab:"Floating-point experiment: machine epsilon, chopping versus rounding, non-associativity, catastrophic cancellation, and a Taylor approximation with separate truncation/round-off diagnostics."
},
"section-2-4":{
  title:"Section 2.4 — Order of Convergence",
  subtitle:"Bisection, fixed-point, Newton, Secant and False Position",
  source:"Order of Convergence of Iterative Root-Finding Methods · Fall 2026",
  intro:"Convergence answers whether p_n approaches p. Order of convergence answers how quickly the error decreases once the iterates enter the asymptotic regime.",
  objectives:[
    "Apply the formal definition of order of convergence.",
    "Differentiate linear, superlinear, quadratic and cubic convergence.",
    "Estimate order from true errors or successive differences.",
    "Explain the standard orders of Bisection, Fixed-Point, Newton and Secant methods.",
    "Recognize when observed order is misleading."
  ],
  sections:[
    ["1. Formal definition","Let e_n=|p−p_n|. The sequence has order α with asymptotic constant λ when lim e_{n+1}/e_n^α = λ, where 0<λ<∞."],
    ["2. Linear versus quadratic","Linear convergence satisfies e_{n+1}≈λe_n. Quadratic convergence satisfies e_{n+1}≈λe_n², so once e_n is small the number of correct digits can grow very rapidly."],
    ["3. Practical estimation","With known exact root, estimate α from three errors. When the exact root is unknown, successive differences can be used as an experimental surrogate, but this does not prove theoretical order."],
    ["4. Standard methods","Bisection has first-order behavior in its interval-width guarantee. Fixed-point iteration is usually linear when |g′(p)|∈(0,1). Newton is locally quadratic for a simple root under standard smoothness assumptions. Secant is superlinear with order (1+√5)/2."],
    ["5. Multiple roots and early iterations","Ordinary Newton can lose quadratic convergence at multiple roots. Early iterations may not reflect asymptotic theory, so order should be estimated from sufficiently late iterates."]
  ],
  formulas:[
    ["Definition","lim(n→∞) e_{n+1}/e_n^α = λ, 0<λ<∞"],
    ["Observed order from three errors","α_n ≈ ln(e_{n+1}/e_n) / ln(e_n/e_{n−1})"],
    ["Unknown root surrogate","d_n=|p_n−p_{n−1}| and use the same log-ratio with d_n"],
    ["Secant order","α=(1+√5)/2≈1.618"]
  ],
  example:"If e_n=10⁻³ and Newton is already in a quadratic regime with λ≈1, the next error is approximately 10⁻⁶; one more iteration gives about 10⁻¹².",
  mistakes:["Calling every fast method quadratic.","Estimating order from only the first one or two iterations.","Using successive differences as though they were always the true error.","Saying Newton is always quadratic, including at multiple roots."],
  lab:"Comparative root-finding study: run Bisection, Fixed-Point, Newton, Secant and False Position with a common tolerance; tabulate errors, residuals, iterations and observed order."
},
"section-4-1":{
  title:"Section 4.1 — Numerical Differentiation",
  subtitle:"Finite-difference formulas derived from Taylor series",
  source:"MAT-315 Section 4.1 derivation notes · Summer 2026",
  intro:"Nearby function values contain derivative information. Taylor expansions let us combine those values so unwanted terms cancel and the desired derivative remains.",
  objectives:[
    "Derive forward, backward, midpoint, endpoint and five-point formulas.",
    "Identify the first surviving Taylor term and therefore the truncation order.",
    "Explain why symmetry improves centered formulas.",
    "Distinguish truncation error from round-off amplification.",
    "Select a formula appropriate to the available data stencil."
  ],
  sections:[
    ["1. Taylor decoding","Expand f(x₀±h), f(x₀±2h), … around x₀. Carefully chosen linear combinations cancel unwanted derivatives."],
    ["2. Forward/backward differences","One-sided differences are useful near boundaries but are typically first order unless additional points are used."],
    ["3. Three-point midpoint","Subtract the symmetric expansions f(x₀+h) and f(x₀−h). Even powers cancel, producing a second-order centered approximation for f′(x₀)."],
    ["4. Endpoint formulas","When centered data are unavailable, use x₀, x₀+h, x₀+2h and choose coefficients that cancel f and f″ terms."],
    ["5. Five-point formulas","Additional symmetric data allow cancellation of more low-order error terms, yielding fourth-order approximations."],
    ["6. Choosing h","Large h gives truncation error; extremely small h can amplify round-off and cancellation. The error curve is often U-shaped."]
  ],
  formulas:[
    ["Forward difference","f′(x₀) ≈ [f(x₀+h)−f(x₀)]/h, error O(h)"],
    ["Centered 3-point","f′(x₀) ≈ [f(x₀+h)−f(x₀−h)]/(2h), error O(h²)"],
    ["Endpoint 3-point","f′(x₀) ≈ [−3f(x₀)+4f(x₀+h)−f(x₀+2h)]/(2h), error O(h²)"],
    ["Centered 2nd derivative","f″(x₀) ≈ [f(x₀−h)−2f(x₀)+f(x₀+h)]/h², error O(h²)"]
  ],
  example:"For a centered derivative, the Taylor expansions at x₀+h and x₀−h have the same even-power terms and opposite odd-power terms. Subtracting eliminates f(x₀), f″(x₀), f⁽⁴⁾(x₀), … and isolates the first derivative.",
  mistakes:["Memorizing coefficients without understanding cancellation.","Using a centered formula at an endpoint where data are unavailable.","Assuming smaller h always improves the result.","Ignoring whether the requested derivative formula is first-, second- or fourth-order."],
  lab:"Implement 3-point and 5-point formulas over decreasing h, plot error on log-log axes, identify truncation- and round-off-dominated regions, then apply Richardson extrapolation."
},
"section-5-1":{
  title:"Section 5.1 — Elementary Theory of Initial-Value Problems",
  subtitle:"Existence, uniqueness, Lipschitz continuity and well-posedness",
  source:"MAT-315 Section 5.1 detailed lecture notes · Summer 2026",
  intro:"Before approximating an IVP numerically, we need to know whether a solution exists, whether it is unique, and whether small perturbations in the data produce only small changes in the solution.",
  objectives:[
    "Separate existence from uniqueness.",
    "Interpret the Lipschitz condition in the dependent variable.",
    "Use a partial-derivative test for Lipschitz continuity.",
    "Explain well-posedness and continuous dependence.",
    "Connect Picard iteration with the integral form of an IVP."
  ],
  sections:[
    ["1. IVP structure","A first-order IVP has y′=f(t,y), y(a)=α. Numerical methods approximate y at mesh points, but that is meaningful only if the underlying problem is mathematically well behaved."],
    ["2. Lipschitz condition","A function is Lipschitz in y if |f(t,y₁)−f(t,y₂)|≤L|y₁−y₂|. This controls how strongly nearby solution values can separate."],
    ["3. Convex regions","Convexity ensures line segments between two points stay inside the region, allowing mean-value arguments used in derivative-based Lipschitz tests."],
    ["4. Existence and uniqueness","Continuity of f supports existence; a Lipschitz condition in y supports uniqueness. These are logically distinct conclusions."],
    ["5. Well-posedness","A well-posed IVP has a unique solution that depends continuously on initial data and perturbations—exactly the setting desired for reliable numerical approximation."],
    ["6. Picard iteration","Integrate the differential equation to obtain y(t)=α+∫_a^t f(s,y(s))ds, then iterate this integral operator to generate successive approximations."]
  ],
  formulas:[
    ["IVP","y′=f(t,y), y(a)=α"],
    ["Lipschitz condition","|f(t,y₁)−f(t,y₂)| ≤ L|y₁−y₂|"],
    ["Integral form","y(t)=α+∫_a^t f(s,y(s)) ds"]
  ],
  example:"For f(t,y)=t+y, ∂f/∂y=1, so the function is globally Lipschitz in y with L=1. This supports a unique solution on any interval where the hypotheses are otherwise satisfied.",
  mistakes:["Treating continuity alone as a uniqueness theorem.","Checking a derivative bound only along one curve instead of over the relevant region.","Confusing convexity with continuity.","Applying a numerical method without considering whether the IVP is well posed."],
  lab:"Use symbolic or numerical checks of f and ∂f/∂y on a prescribed rectangle; classify example IVPs by existence/uniqueness and compare Picard iterates with the exact solution when known."
},
"section-5-2":{
  title:"Section 5.2 — Euler’s Method",
  subtitle:"Derivation, error, convergence and stability",
  source:"MAT-315 Section 5.2 complete detailed lecture notes · Summer 2026",
  intro:"Euler’s method is the fundamental one-step method. Its value is not only practical; it exposes the central ideas of discretization, local truncation error, global error, convergence and stability.",
  objectives:[
    "Derive Euler’s method from Taylor’s theorem and the tangent-line interpretation.",
    "Implement the recurrence on a uniform mesh.",
    "Distinguish local truncation error from accumulated global error.",
    "Explain why Euler is globally first order.",
    "Connect step size to stability on the test equation."
  ],
  sections:[
    ["1. Mesh and recurrence","Choose t_i=a+ih with h=(b−a)/N. Starting from w₀=α, Euler advances using the slope at the left endpoint of each step."],
    ["2. Taylor derivation","Taylor gives y(t_{i+1})=y(t_i)+h y′(t_i)+O(h²). Replacing y′ by f(t_i,y(t_i)) and the exact value by w_i yields the algorithm."],
    ["3. Local versus global error","The one-step defect is O(h²), but roughly 1/h steps are taken over a fixed interval, so the accumulated global error is O(h)."],
    ["4. Error bounds","Under a Lipschitz condition and a bound on y″, the global error is bounded by a constant times h(e^{L(t−a)}−1)."],
    ["5. Stability","For y′=λy, Euler gives w_{n+1}=(1+hλ)w_n. Absolute stability requires |1+hλ|<1 for decaying modes."]
  ],
  formulas:[
    ["Euler update","w_{i+1}=w_i+h f(t_i,w_i)"],
    ["Local defect","ℓ_{i+1}=O(h²)"],
    ["Global order","max_i |y(t_i)−w_i| = O(h)"],
    ["Euler stability factor","R(z)=1+z, z=hλ"]
  ],
  example:"For y′=y−t²+1, y(0)=0.5, the exact solution is y(t)=(t+1)²−0.5e^t. Euler values can therefore be compared directly with the exact solution to observe first-order global convergence.",
  mistakes:["Calling the method second order because the one-step Taylor remainder is O(h²).","Using the exact solution inside the recurrence when evaluating numerical performance.","Forgetting that global error accumulates across steps.","Ignoring the stability restriction for stiff/decaying test problems."],
  lab:"Implement Euler with reusable functions, print step tables, compare against an exact solution, refine h, estimate the global order, and plot the error growth."
},
"section-5-4":{
  title:"Section 5.4 — Runge–Kutta Methods",
  subtitle:"Higher accuracy without explicit higher derivatives",
  source:"MAT-315 Section 5.4 complete detailed lecture notes · Summer 2026",
  intro:"Runge–Kutta methods combine several carefully chosen slope evaluations inside each step. The coefficients are selected so the resulting expansion matches the Taylor expansion to a prescribed order.",
  objectives:[
    "Derive two-stage second-order Runge–Kutta families.",
    "Apply Midpoint and Modified Euler methods.",
    "Use Heun-type third-order and classical fourth-order formulas.",
    "Compare accuracy per step and per function evaluation.",
    "Interpret stage values geometrically and computationally."
  ],
  sections:[
    ["1. Why multiple stages?","Euler samples one slope. Runge–Kutta methods sample additional slopes inside the interval so curvature information is captured without explicitly evaluating y″, y‴, …."],
    ["2. Second-order methods","A general two-stage formula is expanded and matched with the two-variable Taylor expansion. Different coefficient choices produce Midpoint and Modified Euler methods."],
    ["3. Classical RK4","Four slopes—at the start, two midpoints and the end—are combined with weights 1,2,2,1. The method has global order four for sufficiently smooth problems."],
    ["4. Accuracy and cost","Higher order usually means fewer steps for a target accuracy, but each step requires more function evaluations. Fair comparisons should count both error and computational work."],
    ["5. Stability","Order and stability are different properties. A high-order explicit RK method can still require small steps on stiff problems."]
  ],
  formulas:[
    ["Midpoint","k₁=f(t_n,w_n), k₂=f(t_n+h/2,w_n+hk₁/2), w_{n+1}=w_n+h k₂"],
    ["Modified Euler","k₁=f(t_n,w_n), k₂=f(t_n+h,w_n+hk₁), w_{n+1}=w_n+h(k₁+k₂)/2"],
    ["Classical RK4","w_{n+1}=w_n+h(k₁+2k₂+2k₃+k₄)/6"],
    ["RK4 global order","O(h⁴)"]
  ],
  example:"For a smooth IVP, halving h in RK4 should reduce the asymptotic global error by roughly 2⁴=16, whereas a second-order method should improve by roughly a factor of 4.",
  mistakes:["Mixing the definitions of k_i when some texts include h inside the stages and others do not.","Comparing methods only by iteration count rather than function evaluations.","Assuming fourth order implies unconditional stability.","Rounding intermediate stage values too aggressively."],
  lab:"Implement Modified Euler, Midpoint and RK4 for the same IVP; compare exact error, observed order, function-evaluation count and runtime."
},
"section-5-9":{
  title:"Section 5.9 — Higher-Order Equations and Systems",
  subtitle:"First-order system formulation and RK4 for coupled IVPs",
  source:"MAT-315 Section 5.9 complete detailed lecture notes · Summer 2026",
  intro:"Higher-order differential equations can be rewritten as systems of first-order equations. Once in vector form, the same one-step numerical ideas extend naturally to all components simultaneously.",
  objectives:[
    "Convert an m-th order ODE into an equivalent first-order system.",
    "Write coupled IVPs in vector form.",
    "Apply RK4 consistently to every component.",
    "Interpret Lipschitz and existence/uniqueness conditions for systems.",
    "Check numerical solutions using invariants, exact solutions or refinement."
  ],
  sections:[
    ["1. System form","Write u′=F(t,u), where u=(u₁,…,u_m)^T. Each component derivative can depend on all components."],
    ["2. Higher-order reduction","For y″=G(t,y,y′), define u₁=y and u₂=y′. Then u₁′=u₂ and u₂′=G(t,u₁,u₂). Continue similarly for higher order."],
    ["3. RK4 for systems","Each RK stage is now a vector. All component stage values must be computed from the same intermediate vector state."],
    ["4. Existence and uniqueness","Vector Lipschitz conditions play the same role as in scalar IVPs, controlling uniqueness and dependence on data."],
    ["5. Verification","Refinement studies, known invariants and exact benchmark solutions are especially important because coupled systems can hide component-wise errors."]
  ],
  formulas:[
    ["Vector IVP","u′=F(t,u), u(a)=α"],
    ["Second-order reduction","u₁=y, u₂=y′ ⇒ u₁′=u₂, u₂′=G(t,u₁,u₂)"],
    ["RK4 vector update","u_{n+1}=u_n+(K₁+2K₂+2K₃+K₄)/6"]
  ],
  example:"For y″=−4y with y(0)=1, y′(0)=0, set u₁=y and u₂=y′. Then u₁′=u₂ and u₂′=−4u₁. RK4 is applied to the two-component vector at every stage.",
  mistakes:["Updating one component to the next time level before computing the other component stages.","Forgetting to include all initial conditions when reducing order.","Using inconsistent intermediate states across components.","Reporting only one component when verification requires the full system."],
  lab:"Implement RK4 for a reusable vector-valued F(t,u), solve a harmonic-oscillator benchmark, compare with the exact solution, and verify convergence by halving h."
}
};
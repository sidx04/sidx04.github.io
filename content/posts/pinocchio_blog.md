+++
title = "Understanding the Pinocchio Protocol"
date = 2024-12-20
description = "Pinnochio"
slug = "pinocchio"
# [taxonomies]
# tags = ["tag1", "tag2"]
+++

### Commitments and Hidings

- **Commitments**: In cryptographic terms, $E(x)$ represents a "hiding" or a commitment to $x$. It's a way of locking a value $x$ such that:

  1. $x$ remains hidden (privacy), and
  2. $x$ can later be verified by proving properties about it (binding).

- **Setup**: There’s a trusted setup that generates randomness $s$ and scalars $\alpha_v$, $\alpha_w$, $\alpha_y$ and publishes commitments (or hidings) that allow the prover and verifier to interact without revealing $s$ or the exact details of $\alpha$-related values.

- **Prover's Goal**: Convince the verifier that $v(s),w(s),y(s)$ are computed correctly based on some linear combinations $v_i(s)$, $w_i(s)$, $y_i(s)$.

---

### The Issue

The problem arises because the prover has more information than the verifier initially assumes, specifically:

1. The prover knows the verification key $E(\alpha)$, in addition to $E(\alpha_v), E(\alpha_w), E(\alpha_y)$ and all $E(v_i(s)), E(w_i(s)), E(y_i(s))$.
2. This allows the prover to **inject invalid values** into their commitments, bypassing the intended checks.

![](/posts/circuit.png)

#### Step 1: Verification Check Mechanism

The verifier checks that:

1.  $V=E(v(s))$, $W=E(w(s))$, $Y=E(y(s))$ are indeed linear combinations of their respective components:
    $$v(s) = a v_1(s) + b v_2(s) + c v_3(s) + d v_4(s)$$
    $$w(s) = a'w_1(s) + b'w_2(s) + c'w_3(s) + d'w_4(s)$$
    $$y(s) = a''y_1(s) + b''y_2(s) + c''y_3(s) + d''y_4(s)$$

    using some coefficients $a,b,c,d$, $a',b',c',d'$, and $a'', b'', c'' ,d''$.

2.  The commitments are consistent and satisfy certain cryptographic checks.

#### Step 2: Problem with Independence of $V,W,Y$

The verifier has **no guarantee** that:

$$a = a', \quad b = b', \quad c = c', \quad d = d'.$$

This is critical because the relationship between $v(s)$, $w(s)$, $y(s)$ relies on **consistent coefficients** $a$, $b$, $c$ across all components. If these coefficients differ, the prover might pass the verifier's checks but construct invalid commitments.

#### Step 3: Exploiting the Independence

The prover knows $E(\alpha)$, which allows them to craft commitments $V$ and $V'$ as follows:

$$V = E(z)\quad V' = E(\alpha)^z = E(\alpha z).$$

This construction satisfies the verifier’s checks because it aligns with the structure of the evaluation key and verification key. However, $z$ might **not correspond to any valid $v(s)$** or the intended linear combination of $v_i(s)$.

> “And that would pass the verifier's check without being $z=v(s)$ for any linear combination $v$ of the polynomials $v_i$.”

By exploiting this flexibility, the prover could fake valid-looking proofs that aren’t tied to $v(s)$, $w(s)$, $y(s)$ constructed in the intended way.

---

### The Solution

To send all $E(v(s))$, $E(w(s))$ and $E(y(s))$, we need a trusted setup that samples random $s$, $\alpha_v$, $\alpha_w$, $\alpha_y$ and publishes:

1. **Evaluation key for all $i$**:
   $$E(v_i(s)), \space E(\alpha_vv_i(s))$$
   $$E(w_i(s)),\space E(\alpha_ww_i(s))$$
   $$E(y_i(s)),\space E(\alpha_yy_i(s))$$

2. **Verification Key**:  
   $$E(\alpha_v),\space E(\alpha_w),\space E(\alpha_y)$$

From this, the verifier can verify that indeed $E(v(s))$, $E(w(s))$, and $E(y(s))$ are linear combinations of $v_i$, $w_i$, $y_i$.

However, it may be _any_ linear combination. (That is, we still do not know: $a = a', \space b = b', \space c = c', \space d = d'$.)

To solve this problem, we send:

$$ E(\beta(v_i(s)+w_i(s)+y_i(s))) $$

and generate another verification key $E(\beta)$.

As before, the prover obtains $c_1$, $c_2$, $c_3$, $c_4$ and uses the evaluation key to compute:

$$E(v(s)), \quad E(\alpha_vv(s))$$
$$E(w(s)),\quad E(\alpha_ww(s))$$
$$E(y(s)),\quad E(\alpha_yy(s))$$

But now, they can also check $E(\beta(v(s)+w(s)+y(s)))$.

Therefore, the verifier does the checks:

1. Check that $B(V,E(\alpha_v),V')$, $B(W,E(\alpha_w),W')$, and $B(Y,E(\alpha_y),Y')$ all equal $1$.
2. Check $VWY$ using the group operation and checks that $B(VWY,E(\beta),Z)$ equals $1$.

---

### **Public Parameters**

These are shared between the prover and the verifier and are accessible to both:

1. **Verification Key (VK)**:

   - $E(\alpha_v),\space E(\alpha_w),\space E(\alpha_y)$: Commitments to the coefficients $\alpha_v,\space\alpha_w,\space ,\alpha_y$.
   - $E(\alpha)$: A commitment to the global coefficient $\alpha$.

2. **Evaluation Key (EK)**:

   - Commitments to the evaluations $$v_i(s),\space w_i(s),\space y_i(s)$$ and their scaled versions:
     - $E(v_i(s))$, $E(\alpha_v v_i(s))$
     - $E(w_i(s))$, $E(\alpha_w w_i(s))$
     - $E(y_i(s))$, $E(\alpha_y y_i(s))$

3. **Commitments Sent by the Prover**:

   - $V=E(v(s))$: Commitment to the linear combination $v(s)$.
   - $W=E(w(s)$: Commitment to the linear combination $w(s)$.
   - $Y=E(y(s))$: Commitment to the linear combination $y(s)$.

4. **Cryptographic Setup**:
   - The encryption/commitment scheme (e.g., $E(x)$) and its properties are public knowledge.
   - Any cryptographic assumptions (e.g., hardness of discrete log) are public.

---

### **Private Parameters**

These are either known only to the **trusted setup**:

1. **Trusted Setup**:

   - $s$: A random secret chosen during the setup phase.
   - $\alpha_v$, $\alpha_w$, $\alpha_y$: Secret scalars used to derive the commitments in the evaluation and verification keys.

   The values $s$, $\alpha_v$, $\alpha_w$, $\alpha_y$ are **never revealed** to either the prover or the verifier. They are used only to generate the commitments (e.g., $E(\alpha_v), E(v_i(s))$).

2. **Prover's Private Parameters**:
   - Coefficients $a,b,c,d$: These define how $v(s),w(s),y(s)$ are constructed as linear combinations of $v_i(s)$, $w_i(s),$ $y_i(s)$.
   - For example: $v(s) = a v_1(s) + b v_2(s) + c v_3(s) + d v_4$.
   - $v(s),w(s),y(s)$: Actual values of the linear combinations.

---

### Inputs and Outputs

Prover has to use inputs $c_1$, $c_2$ as provided by the verifier.

How to check so?

Recall that the verifier expects a proof of execution of the circuit on inputs $c_1$, $c_2$. Prover executes the circuit, obtains output $c_3$, and sends it to the verifier.

That's all!

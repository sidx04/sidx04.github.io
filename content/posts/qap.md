+++
title = "QAP"
date = 2024-12-25
slug = "qap"
description = "qap r1cs"
+++

Equation in use: $x^3 + x + 5 = 35$, satisfied at $x=3$

### 1. Flattening:

$x^3+x+5=35$ reduced to sequence of simpler equations ("arithmetic gates") that each has at most one multiplication operation:
$$sym_1​=x∗x$$ $$y=sym_1​∗x$$$$sym_2​=y+x$$$$out=sym_2​+5$$

### 2. Gates → R1CS:

Each expression is of the form $a+b$ or $a∗b$.

Variable set: $[one, x, out,sym_1,​y,sym_2]$

For the witness $x=3$, we have:
$$9=3∗3$$$$27=9∗3$$$$30=27+3$$$$35=30+5$$
Witness vector:
$$s =\begin{vmatrix}1  \newline  3  \newline  35   \newline 9  \newline 27  \newline  30 \newline \end{vmatrix}$$

Vector triplet:

$$a=\begin{vmatrix}5 \\ 0 \\ 0 \\ 0 \\ 0 \\ 1 \end{vmatrix}$$
$$b=\begin{vmatrix}1  \\  0  \\  0  \\  0  \\  0  \\  0 \end{vmatrix}$$
$$c=\begin{vmatrix}0 \\ 0 \\ 1 \\ 0 \\ 0 \\ 0\end{vmatrix}$$

Satisfies: $(s⋅a)∗(s⋅b)−(s⋅c)=0$. “$\cdot$” denotes the dot product.

All of $a,b,c,s$ are $n\times 1$ vectors.

#### How to construct the triplets?

Construct $(s⋅a)∗(s⋅b)−(s⋅c)=0$ for each constraint:

1. $sym_1​=x∗x$ :

   Then for $x=3$, $sym_1 = 9$:

   $a=[0,1,0,0,0,0],\newline b=[0,1,0,0,0,0],\newline c=[0,0,0,1,0,0]$

2. $y=sym_1​∗x$ :
   Then for $x=3$, $sym_1=9$, $y=27$:
   $a = [0, 0, 0, 1, 0, 0],\quad b = [0, 1, 0, 0, 0, 0],\quad c = [0, 0, 0, 0, 1, 0]$
3. $sym_2​=y+x$ :
   Then for $x=3$, $y=27$, $y=30$:
   $a = [0, 1, 0, 0, 1, 0],\quad b = [1, 0, 0, 0, 0, 0],\quad c = [0, 0, 0, 0, 0, 1]$
4. $out=sym_2​+5$ :
   Then for $sym_2 = 27$, $b' = 5$, $out=35$
   $a = [5, 0, 0, 0, 0, 1],\quad b = [1, 0, 0, 0, 0, 0],\quad c = [0, 0, 1, 0, 0, 0]$

Complete R1CS:

$$A = \begin{vmatrix} 0 & 1 & 0 & 0 & 0 & 0  \newline 0 & 0 & 0 & 1 & 0 & 0  \newline 0 & 1 & 0 & 0 & 1 & 0  \newline 5 & 0 & 0 & 0 & 0 & 1 \end{vmatrix}$$

$$B = \begin{vmatrix}0 & 1 & 0 & 0 & 0 & 0  \newline 0 & 1 & 0 & 0 & 0 & 0 \newline 1 & 0 & 0 & 0 & 0 & 0 \newline 1 & 0 & 0 & 0 & 0 & 0\end{vmatrix}$$

$$C = \begin{vmatrix}0 & 0 & 0 & 1 & 0 & 0  \newline 0 & 0 & 0 & 0 & 1 & 0  \newline 0 & 0 & 0 & 0 & 0 & 1  \newline 0 & 0 & 1 & 0 & 0 & 0 \end{vmatrix}$$

### R1CS to QAP

- Construct $A^T$, $B^T$, $C^T$.
- Take arbitary points; let’s say $x=\{1,2,3,4,\dots,m\}$ where $m$ is the row length $A^T$(or $B^T$, or $C^T$).
- For instance:
  $$A^T = \begin{vmatrix}0 & 0 & 0 & 5 \newline 1 & 0 & 1 & 0 \newline 0 & 0 & 0 & 0 \newline 0 & 1 & 0 & 0 \newline 0 & 0 & 1 & 0 \newline 0 & 0 & 0 & 1\end{vmatrix}$$

  First position of $A$ (or $A^T$ here), we get the points: $(1,0),\space (2,0),\space (3,0), \space (4,5)$.
  We interpolate using _Langrange Interpolation_:

  $$p({x_{A_1})}=\frac{(x-2)(x-3)(x-4)}{(1-2)(1-3)(1-4)} \times 0 \newline + \frac{(x-1)(x-3)(x-4)}{(2-1)(2-3)(2-4)} \times 0 + \frac{(x-1)(x-2)(x-4)}{(3-1)(3-2)(3-4)} \times 0 + \frac{(x-1)(x-2)(x-3)}{(4-1)(4-2)(4-3)} \times 5$$
  \
   $$p({x_{A_1})}=0+0+0+\frac{x^3-6x^2+11x-6}{6}\times 5$$
  \
   $$p({x_{A_1})}=0.833x^3-5x^2+9.1667x-5$$

  We get the polynomial: $A=[-5.0, 9.166, -5.0, 0.833]$

If we perform interpolation over all $A_2,\dots ,A_6$, $B_1, \dots ,B_6$, $C_1, \dots , C_6$, we end up with:

$$

A =
\begin{vmatrix}
-5.0 & 9.166 & -5.0 & 0.833 \\
8.0 & -11.333 & 5.0 & -0.666 \\
0.0 & 0.0 & 0.0 & 0.0 \\
-6.0 & 9.5 & -4.0 & 0.5 \\
4.0 & -7.0 & 3.5 & -0.5 \\
-1.0 & 1.833 & -1.0 & 0.166
\end{vmatrix}


$$

$$

B =
\begin{vmatrix}
3.0 & -5.166 & 2.5 & -0.333 \\
-2.0 & 5.166 & -2.5 & 0.333 \\
0.0 & 0.0 & 0.0 & 0.0 \\
0.0 & 0.0 & 0.0 & 0.0 \\
0.0 & 0.0 & 0.0 & 0.0 \\
0.0 & 0.0 & 0.0 & 0.0
\end{vmatrix}


$$

$$

C =
\begin{vmatrix}
0.0 & 0.0 & 0.0 & 0.0 \\
0.0 & 0.0 & 0.0 & 0.0 \\
-1.0 & 1.833 & -1.0 & 0.166 \\
4.0 & -4.333 & 1.5 & -0.166 \\
-6.0 & 9.5 & -4.0 & 0.5 \\
4.0 & -7.0 & 3.5 & -0.5
\end{vmatrix}


$$

> Note that the resulting polynomial does not itself have to be zero, and in fact in most cases won’t be; it could have any behavior at the points that don’t correspond to any logic gates, as long as the result is zero at all the points that _do_ correspond to some gate. To check correctness, we don’t actually evaluate the polynomial $t = (A \cdot s) \times (B \cdot s) - (C \cdot s)$ at every point corresponding to a gate; instead, we divide $t$ by another polynomial, $Z$, and check that $Z$ evenly divides $t$ - that is, the division $t / Z$ leaves no remainder.

> Z is defined as $(x - 1) \times (x - 2) \times (x - 3) ...$ - the simplest polynomial that is equal to zero at all points that correspond to logic gates. It is an elementary fact of algebra that _any_ polynomial that is equal to zero at all of these points has to be a multiple of this minimal polynomial, and if a polynomial is a multiple of Z then its evaluation at any of those points will be zero; this equivalence makes our job much easier.

We have,
$$A . s = [43.0, -73.333, 38.5, -5.166]$$
$$B . s = [-3.0, 10.333, -5.0, 0.666]$$
$$C . s = [-41.0, 71.666, -24.5, 2.833]$$
Now,
$$t = (A \cdot s) \times (B \cdot s) - (C \cdot s)$$
$$t=[-88.0,\space 592.666,\space -1063.777,\space 805.833,\space -294.777,\space 51.5,\space -3.444]$$

Define $Z$:
$$Z = (x - 1) \times (x - 2) \times (x - 3) \times (x - 4)=[24,\space -50,\space 35,\space -10,\space 1]$$

And if we divide the result above by Z, we get:

$h = \frac{t}{Z} = [-3.666, 17.055, -3.444]$, with no remainder.

$$
$$

+++
title = "My First Post"
date = 2024-03-20
description = "Description of your post"
slug = "first"
# [taxonomies]
# tags = ["tag1", "tag2"]
+++

This is the content of my first post.

Here is some code:

```rust
// Unlike C/C++, there's no restriction on the order of function definitions
fn main() {
    // We can use this function here, and define it somewhere later
    fizzbuzz_to(100);
}

// Function that returns a boolean value
fn is_divisible_by(lhs: u32, rhs: u32) -> bool {
    // Corner case, early return
    if rhs == 0 {
        return false;
    }

    // This is an expression, the `return` keyword is not necessary here
    lhs % rhs == 0
}

// Functions that "don't" return a value, actually return the unit type `()`
fn fizzbuzz(n: u32) -> () {
    if is_divisible_by(n, 15) {
        println!("fizzbuzz");
    } else if is_divisible_by(n, 3) {
        println!("fizz");
    } else if is_divisible_by(n, 5) {
        println!("buzz");
    } else {
        println!("{}", n);
    }
}

// When a function returns `()`, the return type can be omitted from the
// signature
fn fizzbuzz_to(n: u32) {
    for n in 1..=n {
        fizzbuzz(n);
    }
}
```

Here is a [link](https://sidx04.github.io).

## Here is a long paragraph:

Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia architecto tempore voluptatem deserunt recusandae obcaecati dolorem, sed dolorum quasi perspiciatis rem assumenda quidem vel eius debitis pariatur. Dolorum, fuga harum.

Here is an image:

![placeholder](https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp)

Can it render math?
$E = mc^2$. Yes!

Can it render inline math?
$$ f(x) = \alpha_v \times x $$

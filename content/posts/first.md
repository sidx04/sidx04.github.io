+++
title = "Placeholder Post"
date = 2025-10-19
description = "Placeholder to test features!"
slug = "placeholder"

[taxonomies]
tags = ["first","tutorial"]
+++

This is the content of my first post.

Here is some code:

```rust
use tokio::net::TcpListener;
use tokio::io::{AsyncReadExt, AsyncWriteExt};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let listener = TcpListener::bind("127.0.0.1:8080").await?;

    loop {
        let (mut socket, _) = listener.accept().await?;

        tokio::spawn(async move {
            let mut buf = [0; 1024];

            // In a loop, read data from the socket and write the data back.
            loop {
                let n = match socket.read(&mut buf).await {
                    // socket closed
                    Ok(0) => return,
                    Ok(n) => n,
                    Err(e) => {
                        eprintln!("failed to read from socket; err = {:?}", e);
                        return;
                    }
                };

                // Write the data back
                if let Err(e) = socket.write_all(&buf[0..n]).await {
                    eprintln!("failed to write to socket; err = {:?}", e);
                    return;
                }
            }
        });
    }
}
```

Here is a [link](https://sidx04.github.io).

## Here is a long paragraph

Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia architecto tempore voluptatem deserunt recusandae obcaecati dolorem, sed dolorum quasi perspiciatis rem assumenda quidem vel eius debitis pariatur. Dolorum, fuga harum.

Here is an image:

![placeholder](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRhrFFyI_ZsQxhtPPloslzBSIvQVTknnWnxg&s)

Can it render math?
$E = mc^2$. Yes! 🎉

Can it render inline math?
$$ f(x) = \alpha_v \times x $$

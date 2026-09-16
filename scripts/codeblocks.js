// Wrap Zola/syntect code blocks with a header bar: language label + copy button.
document.querySelectorAll("pre > code[data-lang]").forEach((code) => {
  const pre = code.parentElement;
  const lang = code.getAttribute("data-lang");

  const wrapper = document.createElement("div");
  wrapper.className = "code-block";

  const header = document.createElement("div");
  header.className = "code-block-header";

  const langLabel = document.createElement("span");
  langLabel.className = "code-block-lang";
  langLabel.textContent = lang;

  const copyButton = document.createElement("button");
  copyButton.type = "button";
  copyButton.className = "code-block-copy";
  copyButton.setAttribute("aria-label", "Copy code");
  copyButton.innerHTML = '<i data-lucide="copy"></i>';

  copyButton.addEventListener("click", () => {
    navigator.clipboard.writeText(code.textContent).then(() => {
      copyButton.classList.add("copied");
      copyButton.innerHTML = '<i data-lucide="check"></i>';
      lucide.createIcons();
      setTimeout(() => {
        copyButton.classList.remove("copied");
        copyButton.innerHTML = '<i data-lucide="copy"></i>';
        lucide.createIcons();
      }, 1500);
    });
  });

  header.appendChild(langLabel);
  header.appendChild(copyButton);

  pre.replaceWith(wrapper);
  wrapper.appendChild(header);
  wrapper.appendChild(pre);
});

lucide.createIcons();

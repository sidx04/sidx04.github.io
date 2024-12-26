// Initialize Lucide icons
lucide.createIcons();

// Theme management
const themeToggle = document.getElementById("theme-toggle");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

// Get saved theme or default to system preference
const getTheme = () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    return savedTheme;
  }
  return prefersDark.matches ? "dark" : "light";
};

// Apply theme
const applyTheme = (theme) => {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
};

// Initialize theme before page load
const theme = getTheme();
document.documentElement.setAttribute("data-theme", theme);

// Add theme-loaded class once the initial theme is set
document.addEventListener("DOMContentLoaded", () => {
  document.documentElement.classList.add("theme-loaded");
});

// Toggle theme
themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  applyTheme(newTheme);
});

// Listen for system theme changes
prefersDark.addEventListener("change", (e) => {
  if (!localStorage.getItem("theme")) {
    applyTheme(e.matches ? "dark" : "light");
  }
});

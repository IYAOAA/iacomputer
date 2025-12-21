const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const windowHeight = window.innerHeight;

  // Active navigation highlight
const currentPage = window.location.pathname.split("/").pop().replace(".html", "") || "index";

document.querySelectorAll(".nav-links a").forEach(link => {
  if (link.dataset.page === currentPage) {
    link.classList.add("active");
  }
});

  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < windowHeight - 80) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

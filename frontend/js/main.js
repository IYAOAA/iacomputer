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

const watermark = document.querySelector(".hero-watermark");

window.addEventListener("scroll", () => {
  if (!watermark) return;

  const scrollY = window.scrollY;
  watermark.style.transform = `translateY(${scrollY * 0.2}px)`;
});


document.querySelectorAll('.mockup-wrapper').forEach(wrapper => {
  const mockups = wrapper.querySelectorAll('.mockup');
  let index = 0;
  let interval;

  const showMockup = i => {
    mockups.forEach(m => m.classList.remove('active'));
    mockups[i].classList.add('active');
  };

  const startCycle = () => {
    interval = setInterval(() => {
      index = (index + 1) % mockups.length;
      showMockup(index);
    }, 3000);
  };

  const stopCycle = () => clearInterval(interval);

  wrapper.addEventListener('mouseenter', stopCycle);
  wrapper.addEventListener('mouseleave', startCycle);

  startCycle();
});

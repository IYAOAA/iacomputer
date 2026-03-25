// ===============================
// COURSE + PRICE CONFIG (TOP)
// ===============================
const courseData = {
  "website-design": {
    name: "Website Design Training",
    price: 500000 // ₦5,000
  },
  "graphics": {
    name: "Graphics Design",
    price: 400000
  },
  "data-analysis": {
    name: "Data Analysis",
    price: 600000
  }
};

let amount = 500000; // default fallback

// ===============================
// RUN AFTER PAGE LOAD
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (toggle && navLinks) {

  // Toggle menu
  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    navLinks.classList.toggle("active");
  });

  // Prevent clicks inside menu from closing it
  navLinks.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  // Click anywhere else → close
  document.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });

  // Close on scroll
  window.addEventListener("scroll", () => {
    navLinks.classList.remove("active");
  });

}

  // ===============================
  // COURSE DETECTION FROM URL
  // ===============================
  const params = new URLSearchParams(window.location.search);
  const selectedCourseKey = params.get('course');
  const selectedCourse = courseData[selectedCourseKey];

  if (selectedCourse) {
    const courseSelect = document.getElementById('course');

    if (courseSelect) {
      courseSelect.value = selectedCourse.name;
    }

    amount = selectedCourse.price;
  }

  // ===============================
  // NAV ACTIVE LINK
  // ===============================
  const currentPage = window.location.pathname
    .split("/")
    .pop()
    .replace(".html", "") || "index";

  document.querySelectorAll(".nav-links a").forEach(link => {
    if (link.dataset.page === currentPage) {
      link.classList.add("active");
    }
  });

});


// ===============================
// SCROLL REVEAL
// ===============================
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const windowHeight = window.innerHeight;

  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < windowHeight - 80) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();


// ===============================
// WATERMARK SCROLL EFFECT
// ===============================
const watermark = document.querySelector(".hero-watermark");

window.addEventListener("scroll", () => {
  if (!watermark) return;

  const scrollY = window.scrollY;
  watermark.style.transform = `translateY(${scrollY * 0.2}px)`;
});


// ===============================
// MOCKUP SLIDER
// ===============================
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


// ===============================
// REGISTRATION FORM + PAYSTACK
// ===============================
const form = document.getElementById('registrationForm');

if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;

    let handler = PaystackPop.setup({
      key: 'YOUR_PUBLIC_KEY_HERE',
      email: email,
      amount: amount, // ✅ dynamic pricing
      currency: "NGN",

      metadata: {
        custom_fields: [
          { display_name: "Full Name", value: name },
          { display_name: "Phone", value: phone }
        ]
      },

      callback: function(response) {
        alert('Payment successful! Ref: ' + response.reference);
      },

      onClose: function() {
        alert('Transaction cancelled');
      }
    });

    handler.openIframe();
  });
}

  

 
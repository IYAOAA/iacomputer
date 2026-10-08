// ===============================
// COURSE + PRICE CONFIG
// ===============================
const courseData = {
  "website-design": {
    name: "Website Design Training",
    price: 500000 // ₦5,000 in kobo
  },

  "graphics": {
    name: "Graphics Design",
    price: 400000 // ₦4,000 in kobo
  },

  "data-analysis": {
    name: "Data Analysis",
    price: 600000 // ₦6,000 in kobo
  }
};

let amount = 500000; // Default: ₦5,000


// ===============================
// RUN AFTER PAGE LOAD
// ===============================
document.addEventListener("DOMContentLoaded", () => {

  // ===============================
  // CONTACT FORM
  // ===============================
  const contactForm = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  if (contactForm && status) {

    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(contactForm);

      fetch("/", {
        method: "POST",
        body: formData
      })
        .then(() => {
          status.style.display = "block";
          status.innerHTML =
            "🎉 Thanks! Your message has been sent. I'll get back to you soon.";

          contactForm.reset();
        })
        .catch(() => {
          status.style.display = "block";
          status.innerText =
            "❌ Something went wrong. Please try again.";
        });
    });

  }


  // ===============================
  // MOBILE HAMBURGER MENU
  // ===============================
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  if (menuToggle && navLinks) {

    // Open / close menu
    menuToggle.addEventListener("click", function (e) {

      e.stopPropagation();

      const isOpen = navLinks.classList.toggle("active");

      menuToggle.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );

      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close menu" : "Open menu"
      );

      menuToggle.innerHTML = isOpen ? "✕" : "☰";
    });


    // Close menu when a navigation link is clicked
    navLinks.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", function () {

        navLinks.classList.remove("active");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

        menuToggle.setAttribute(
          "aria-label",
          "Open menu"
        );

        menuToggle.innerHTML = "☰";
      });

    });


    // Close menu when clicking outside
    document.addEventListener("click", function (e) {

      if (
        !navLinks.contains(e.target) &&
        !menuToggle.contains(e.target)
      ) {

        navLinks.classList.remove("active");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

        menuToggle.setAttribute(
          "aria-label",
          "Open menu"
        );

        menuToggle.innerHTML = "☰";
      }

    });


    // Close menu when scrolling
    window.addEventListener("scroll", function () {

      navLinks.classList.remove("active");

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

      menuToggle.setAttribute(
        "aria-label",
        "Open menu"
      );

      menuToggle.innerHTML = "☰";
    });

  }


  // ===============================
  // COURSE DETECTION FROM URL
  // ===============================
  const params = new URLSearchParams(window.location.search);

  const selectedCourseKey = params.get("course");

  const selectedCourse = courseData[selectedCourseKey];

  if (selectedCourse) {

    const courseSelect = document.getElementById("course");

    if (courseSelect) {
      courseSelect.value = selectedCourse.name;
    }

    amount = selectedCourse.price;
  }


  // ===============================
  // NAV ACTIVE LINK
  // ===============================
  const currentPage =
    window.location.pathname
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

  reveals.forEach(element => {

    const top = element.getBoundingClientRect().top;

    if (top < windowHeight - 80) {
      element.classList.add("active");
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

  watermark.style.transform =
    `translateY(${scrollY * 0.2}px)`;

});


// ===============================
// MOCKUP SLIDER
// ===============================
document.querySelectorAll(".mockup-wrapper").forEach(wrapper => {

  const mockups = wrapper.querySelectorAll(".mockup");

  if (mockups.length === 0) return;

  let index = 0;
  let interval;


  // Show selected mockup
  const showMockup = (i) => {

    mockups.forEach(mockup => {
      mockup.classList.remove("active");
    });

    mockups[i].classList.add("active");
  };


  // Start slider
  const startCycle = () => {

    // Prevent multiple intervals
    clearInterval(interval);

    interval = setInterval(() => {

      index = (index + 1) % mockups.length;

      showMockup(index);

    }, 3000);

  };


  // Stop slider
  const stopCycle = () => {

    clearInterval(interval);

  };


  wrapper.addEventListener("mouseenter", stopCycle);

  wrapper.addEventListener("mouseleave", startCycle);

  startCycle();

});


// ===============================
// REGISTRATION FORM + PAYSTACK
// ===============================
const registrationForm =
  document.getElementById("registrationForm");

if (registrationForm) {

  registrationForm.addEventListener("submit", function (e) {

    e.preventDefault();


    // Get form values
    const email =
      document.getElementById("email")?.value.trim();

    const name =
      document.getElementById("name")?.value.trim();

    const phone =
      document.getElementById("phone")?.value.trim();


    // Basic validation
    if (!email || !name || !phone) {

      alert("Please fill in all required fields.");

      return;
    }


    // Make sure Paystack is available
    if (typeof PaystackPop === "undefined") {

      alert(
        "Payment system is currently unavailable. Please try again later."
      );

      return;
    }


    // Paystack payment
    const handler = PaystackPop.setup({

      // Replace with your real Paystack public key
      key: "YOUR_PUBLIC_KEY_HERE",

      email: email,

      amount: amount,

      currency: "NGN",

      metadata: {

        custom_fields: [

          {
            display_name: "Full Name",
            value: name
          },

          {
            display_name: "Phone",
            value: phone
          }

        ]

      },


      // Payment successful
      callback: function (response) {

        alert(
          "Payment successful! Ref: " +
          response.reference
        );

      },


      // Payment closed
      onClose: function () {

        alert("Transaction cancelled.");

      }

    });


    handler.openIframe();

  });

}
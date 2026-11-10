'use strict';

/**
 * PRELOAD
 */
const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load", function () {
  if (preloader) {
    preloader.classList.add("loaded");
  }
  document.body.classList.add("loaded");
});

/**
 * Helper to attach event listeners
 */
const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
};

/**
 * NAVBAR
 */
const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navLinks = document.querySelectorAll(".navbar-link");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
};

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
  document.body.classList.remove("nav-active");
};

addEventOnElements(navTogglers, "click", toggleNavbar);
addEventOnElements(navLinks, "click", closeNavbar);

/**
 * HEADER & BACK TOP BTN
 */
const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

let lastScrollPos = 0;

const hideHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;
  if (isScrollBottom) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }
  lastScrollPos = window.scrollY;
};

window.addEventListener("scroll", function () {
  if (window.scrollY >= 50) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
    hideHeader();
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});

/**
 * HERO SLIDER
 */
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () {
  if (!lastActiveSliderItem || !heroSliderItems.length) return;
  lastActiveSliderItem.classList.remove("active");
  heroSliderItems[currentSlidePos].classList.add("active");
  lastActiveSliderItem = heroSliderItems[currentSlidePos];
};

const slideNext = function () {
  if (currentSlidePos >= heroSliderItems.length - 1) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }
  updateSliderPos();
};

const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = heroSliderItems.length - 1;
  } else {
    currentSlidePos--;
  }
  updateSliderPos();
};

if (heroSliderNextBtn) heroSliderNextBtn.addEventListener("click", slideNext);
if (heroSliderPrevBtn) heroSliderPrevBtn.addEventListener("click", slidePrev);

let autoSlideInterval;
const autoSlide = function () {
  autoSlideInterval = setInterval(slideNext, 7000);
};

if (heroSliderNextBtn && heroSliderPrevBtn) {
  addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function () {
    clearInterval(autoSlideInterval);
  });
  addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);
}

window.addEventListener("load", autoSlide);

/**
 * PARALLAX EFFECT
 */
const parallaxItems = document.querySelectorAll("[data-parallax-item]");

window.addEventListener("mousemove", function (event) {
  let x = (event.clientX / window.innerWidth) * 10 - 5;
  let y = (event.clientY / window.innerHeight) * 10 - 5;
  x = x - x * 2;
  y = y - y * 2;

  for (let i = 0, len = parallaxItems.length; i < len; i++) {
    const speed = Number(parallaxItems[i].dataset.parallaxSpeed || 1);
    const tx = x * speed;
    const ty = y * speed;
    parallaxItems[i].style.transform = `translate3d(${tx}px, ${ty}px, 0px)`;
  }
});

/**
 * MENU CATEGORY TABS
 */
const menuTabBtns = document.querySelectorAll("[data-menu-tab]");
const menuItems = document.querySelectorAll("[data-menu-category]");

const filterMenu = function (category) {
  menuItems.forEach((item) => {
    const itemCat = item.dataset.menuCategory;
    if (category === "all" && item.dataset.featured === "true") {
      item.classList.remove("is-hidden");
    } else if (category === "all" && !item.dataset.featured) {
      item.classList.add("is-hidden");
    } else if (itemCat === category) {
      item.classList.remove("is-hidden");
    } else {
      item.classList.add("is-hidden");
    }
  });
};

menuTabBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    menuTabBtns.forEach((b) => b.classList.remove("active"));
    this.classList.add("active");
    filterMenu(this.dataset.menuTab);
  });
});

// Initialize default featured signatures view
if (menuTabBtns.length) {
  filterMenu("all");
}

/**
 * GOOGLE REVIEWS CAROUSEL (Verified Reviews from Google Maps)
 */
const googleReviews = [
  {
    quote:
      "“Exceptional everything. All the food and drinks are made with precision clearly. Honestly didn’t expect the food to be this good. Service is fantastic, very welcoming.”",
    name: "Sindhu Pisati",
    meta: "Local Guide · Google Maps ★★★★★"
  },
  {
    quote:
      "“Must visit place for its delicious food and ambience… Don’t miss Coffee And Pizza. Truly an amazing vibe right here in Uppal Bhagayath.”",
    name: "Poreddy Chaithanya",
    meta: "Verified Guest · Google Maps ★★★★★"
  },
  {
    quote:
      "“Amazing ambience, delicious food, and excellent service! The staff were very friendly and the overall experience was wonderful. Definitely coming back again!”",
    name: "Thanush B",
    meta: "Verified Guest · Google Maps ★★★★★"
  },
  {
    quote:
      "“Great place for coffee and quick bites! The ambience is pleasant, the cappuccino and cold brews are really good, and the staff are super warm.”",
    name: "Nikhila Kancharla",
    meta: "Verified Guest · Google Maps ★★★★★"
  },
  {
    quote:
      "“Had a wonderful experience — loved the taste of the food, white sauce pasta, and specialty coffee. The service was great!”",
    name: "Keerthana",
    meta: "Verified Guest · Google Maps ★★★★★"
  }
];

const testiSectionEl = document.querySelector(".testi");
const testiQuoteEl = document.querySelector("[data-testi-quote]");
const testiNameEl = document.querySelector("[data-testi-name]");
const testiMetaEl = document.querySelector("[data-testi-meta]");
const testiPrevBtn = document.querySelector("[data-testi-prev]");
const testiNextBtn = document.querySelector("[data-testi-next]");
const testiDots = document.querySelectorAll("[data-testi-dot]");
const testiCounterEl = document.querySelector("[data-testi-counter]");

let currentReviewIdx = 0;
let reviewAutoTimer = null;

const renderReview = function (idx) {
  if (!testiQuoteEl || !testiNameEl || !testiMetaEl) return;
  const r = googleReviews[idx];
  testiQuoteEl.textContent = r.quote;
  testiNameEl.textContent = r.name;
  testiMetaEl.textContent = r.meta;
  if (testiCounterEl) {
    testiCounterEl.textContent = `${idx + 1} / ${googleReviews.length}`;
  }
  testiDots.forEach((dot, i) => {
    dot.classList.toggle("active", i === idx);
  });
};

const startReviewAutoSlide = function () {
  clearInterval(reviewAutoTimer);
  reviewAutoTimer = setInterval(() => {
    currentReviewIdx = (currentReviewIdx + 1) % googleReviews.length;
    renderReview(currentReviewIdx);
  }, 7000);
};

const goToReview = function (idx) {
  currentReviewIdx = (idx + googleReviews.length) % googleReviews.length;
  renderReview(currentReviewIdx);
  startReviewAutoSlide();
};

if (testiPrevBtn && testiNextBtn) {
  testiPrevBtn.addEventListener("click", () => {
    goToReview(currentReviewIdx - 1);
  });

  testiNextBtn.addEventListener("click", () => {
    goToReview(currentReviewIdx + 1);
  });

  testiDots.forEach((dot, idx) => {
    dot.addEventListener("click", () => {
      goToReview(idx);
    });
  });

  if (testiSectionEl) {
    testiSectionEl.addEventListener("mouseenter", () => clearInterval(reviewAutoTimer));
    testiSectionEl.addEventListener("mouseleave", startReviewAutoSlide);

    let touchStartX = 0;
    testiSectionEl.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });
    testiSectionEl.addEventListener("touchend", (e) => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) >= 45) {
        goToReview(dx < 0 ? currentReviewIdx + 1 : currentReviewIdx - 1);
      }
    }, { passive: true });
  }

  startReviewAutoSlide();
}

/**
 * TOAST NOTIFICATION
 */
const toastEl = document.querySelector("[data-toast]");
const toastTitleEl = document.querySelector("[data-toast-title]");
const toastMsgEl = document.querySelector("[data-toast-msg]");
const toastLinkEl = document.querySelector("[data-toast-link]");
let toastTimeout;

const showToast = function (title, msg, actionLink) {
  if (!toastEl) return;
  toastTitleEl.textContent = title;
  toastMsgEl.textContent = msg;

  if (toastLinkEl) {
    if (actionLink && actionLink.href && actionLink.label) {
      toastLinkEl.href = actionLink.href;
      toastLinkEl.textContent = actionLink.label;
      toastLinkEl.hidden = false;
    } else {
      toastLinkEl.href = "#";
      toastLinkEl.textContent = "";
      toastLinkEl.hidden = true;
    }
  }

  toastEl.classList.add("active");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toastEl.classList.remove("active");
  }, actionLink ? 9000 : 5000);
};

/**
 * ONLINE RESERVATION FORM -> DIRECT WHATSAPP REDIRECT
 */
const reservationForm = document.querySelector("[data-reservation-form]");
const resDateInput = document.querySelector('input[name="reservation-date"]');

if (resDateInput) {
  const todayLocal = new Date();
  const yyyy = todayLocal.getFullYear();
  const mm = String(todayLocal.getMonth() + 1).padStart(2, "0");
  const dd = String(todayLocal.getDate()).padStart(2, "0");
  const todayStr = `${yyyy}-${mm}-${dd}`;
  resDateInput.value = todayStr;
  resDateInput.min = todayStr;

  resDateInput.addEventListener("click", function () {
    try {
      if (typeof this.showPicker === "function") {
        this.showPicker();
      }
    } catch (_) {}
  });
}

if (reservationForm) {
  reservationForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = this.querySelector('input[name="name"]').value.trim();
    const phone = this.querySelector('input[name="phone"]').value.trim();
    const guestsSelect = this.querySelector('select[name="person"]');
    const guests = guestsSelect.options[guestsSelect.selectedIndex]?.text || guestsSelect.value;
    const rawDate = this.querySelector('input[name="reservation-date"]').value;
    const time = this.querySelector('select[name="time"]').value;
    const note = this.querySelector('textarea[name="message"]').value.trim();

    if (!name) {
      showToast("Name Required", "Please enter your name so our host knows who is arriving.");
      this.querySelector('input[name="name"]').focus();
      return;
    }

    if (!phone) {
      showToast("Mobile Number Required", "Please enter your WhatsApp or phone number for booking confirmation.");
      this.querySelector('input[name="phone"]').focus();
      return;
    }

    let formattedDate = rawDate;
    if (rawDate && /^\d{4}-\d{2}-\d{2}$/.test(rawDate)) {
      const [y, m, d] = rawDate.split("-").map(Number);
      const parsed = new Date(y, m - 1, d);
      formattedDate = parsed.toLocaleDateString("en-IN", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric"
      });
    }

    const lines = [
      "Hello Creamazzo Speciality Coffee! I'd like to book a table:",
      "",
      `- Name: ${name}`,
      `- Phone: ${phone}`,
      `- Guests: ${guests}`,
      `- Date: ${formattedDate}`,
      `- Time: ${time}`
    ];

    if (note) {
      lines.push(`- Preference: ${note}`);
    }

    const waUrl = `https://wa.me/919704030636?text=${encodeURIComponent(lines.join("\n"))}`;
    window.lastReservationWhatsAppUrl = waUrl;

    const popup = window.open(waUrl, "_blank", "noopener");
    if (!popup) {
      window.location.href = waUrl;
    }

    showToast(
      "Opening WhatsApp Booking…",
      `Sending your table request for ${guests} on ${formattedDate} at ${time} to Creamazzo (+91 97040 30636).`,
      { href: waUrl, label: "Tap here if WhatsApp didn't open →" }
    );
  });
}

/**
 * NEWSLETTER SUBSCRIPTION FORM
 */
const newsletterForm = document.querySelector("[data-newsletter-form]");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const emailInput = this.querySelector('input[name="email_address"]');
    const email = emailInput.value.trim();
    if (!email || !email.includes("@")) {
      showToast("Enter Valid Email", "Please enter a valid email address to join the Creamazzo Coffee Club.");
      return;
    }
    showToast(
      "Welcome to the Creamazzo Club",
      `Thank you for subscribing (${email})! Enjoy 15% off your next specialty pour-over or espresso at Uppal Bhagayath.`
    );
    emailInput.value = "";
  });
}

/**
 * GALLERY LIGHTBOX MODAL
 */
const lightboxModal = document.querySelector("[data-lightbox]");
const lightboxImg = document.querySelector("[data-lightbox-img]");
const lightboxCaption = document.querySelector("[data-lightbox-caption]");
const lightboxCloseBtn = document.querySelector("[data-lightbox-close]");
const galleryItems = document.querySelectorAll("[data-gallery-img]");

galleryItems.forEach((item) => {
  item.addEventListener("click", function () {
    if (!lightboxModal) return;
    lightboxImg.src = this.dataset.galleryImg;
    lightboxImg.alt = this.dataset.galleryCaption || "Creamazzo Speciality Coffee";
    lightboxCaption.textContent = this.dataset.galleryCaption || "";
    lightboxModal.classList.add("active");
  });
});

if (lightboxCloseBtn && lightboxModal) {
  lightboxCloseBtn.addEventListener("click", () => lightboxModal.classList.remove("active"));
  lightboxModal.addEventListener("click", (e) => {
    if (e.target === lightboxModal) lightboxModal.classList.remove("active");
  });
}

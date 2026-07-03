/* PeptiSyn — site interactions */
(function () {
  "use strict";

  // Tawk.to live chat widget (loaded on every page via this shared script)
  (function () {
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();
    var s1 = document.createElement("script");
    var s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = "https://embed.tawk.to/6a4719f3539b7e1d4b7d3450/1jsirqoia";
    s1.charset = "UTF-8";
    s1.setAttribute("crossorigin", "*");
    s0.parentNode.insertBefore(s1, s0);
  })();

  // WhatsApp / phone number rotation.
  // Two contact numbers are available; a visitor is randomly assigned one of
  // them on first visit, and that choice is persisted in localStorage so the
  // same number keeps showing on every subsequent page view/refresh until
  // the browser cache/site data is cleared.
  var WA_NUMBERS = ["85247163178", "85247159906"];
  var WA_STORAGE_KEY = "ps_wa_number";
  var DEFAULT_WA_NUMBER = WA_NUMBERS[0]; // number hard-coded in the HTML markup

  function pickWaNumber() {
    var saved = null;
    try {
      saved = localStorage.getItem(WA_STORAGE_KEY);
    } catch (e) {}
    if (saved && WA_NUMBERS.indexOf(saved) !== -1) return saved;
    var chosen = WA_NUMBERS[Math.floor(Math.random() * WA_NUMBERS.length)];
    try {
      localStorage.setItem(WA_STORAGE_KEY, chosen);
    } catch (e) {}
    return chosen;
  }

  function formatWaDisplay(num) {
    return "+852 " + num.slice(3);
  }

  var ACTIVE_WA_NUMBER = pickWaNumber();

  function applyWaNumber() {
    if (ACTIVE_WA_NUMBER === DEFAULT_WA_NUMBER) return;
    var defaultDisplay = formatWaDisplay(DEFAULT_WA_NUMBER);
    var activeDisplay = formatWaDisplay(ACTIVE_WA_NUMBER);
    document.querySelectorAll('a[href*="' + DEFAULT_WA_NUMBER + '"]').forEach(function (a) {
      var href = a.getAttribute("href");
      if (href) a.setAttribute("href", href.split(DEFAULT_WA_NUMBER).join(ACTIVE_WA_NUMBER));
      if (a.textContent.indexOf(defaultDisplay) !== -1) {
        a.textContent = a.textContent.split(defaultDisplay).join(activeDisplay);
      }
    });
  }
  applyWaNumber();

  // Mobile nav toggle
  var nav = document.querySelector(".nav");
  var toggle = document.querySelector(".nav__toggle");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("open");
    });
    nav.querySelectorAll(".nav__links a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("open");
      });
    });
  }

  // Header shadow on scroll
  var header = document.querySelector(".header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // Reveal on scroll
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach(function (el) {
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) {
      el.classList.add("in");
    });
  }

  // Animated counters
  var counters = document.querySelectorAll("[data-count]");
  if ("IntersectionObserver" in window && counters.length) {
    var cio = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          var el = e.target;
          var target = parseFloat(el.getAttribute("data-count"));
          var suffix = el.getAttribute("data-suffix") || "";
          var dur = 1400;
          var start = performance.now();
          var step = function (now) {
            var p = Math.min((now - start) / dur, 1);
            var eased = 1 - Math.pow(1 - p, 3);
            var val = Math.round(target * eased);
            el.textContent = val.toLocaleString() + suffix;
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          cio.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach(function (el) {
      cio.observe(el);
    });
  }

  // Contact form (front-end only, opens WhatsApp / mailto)
  var form = document.querySelector("[data-contact-form]");
  if (form) {
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var data = new FormData(form);
      var name = (data.get("name") || "").toString().trim();
      var email = (data.get("email") || "").toString().trim();
      var product = (data.get("product") || "").toString().trim();
      var message = (data.get("message") || "").toString().trim();
      var text =
        "Hello PeptiSyn, I'd like to enquire.%0A%0A" +
        "Name: " + encodeURIComponent(name) + "%0A" +
        "Email: " + encodeURIComponent(email) + "%0A" +
        "Product of interest: " + encodeURIComponent(product) + "%0A" +
        "Message: " + encodeURIComponent(message);
      var wa = "https://wa.me/" + ACTIVE_WA_NUMBER + "?text=" + text;
      window.open(wa, "_blank");
      var ok = form.querySelector("[data-form-status]");
      if (ok) {
        ok.style.display = "block";
        form.reset();
      }
    });
  }

  // Footer year
  var yr = document.querySelector("[data-year]");
  if (yr) yr.textContent = new Date().getFullYear();
})();

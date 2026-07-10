/* BangHui — product catalog (filename = product name) */
window.PEPTISYN_PRODUCTS = [
  { name: "Tirzepatide 10mg", file: "Tirzepatide 10mg.jpg", featured: true },
  { name: "Retatrutide 10mg", file: "Retatrutide 10mg.jpg", featured: true },
  { name: "5-amino-1mq 5mg", file: "5-amino-1mq 5mg.jpg" },
  { name: "BPC 5mg and TB 5mg", file: "BPC 5mg and TB 5mg.jpg" },
  { name: "BPC157 10mg", file: "BPC157 10mg.jpg" },
  { name: "Cagrilintide 10mg", file: "Cagrilintide 10mg.jpg" },
  { name: "cp10 10mg", file: "cp10 10mg.jpg" },
  { name: "Epithalon 50mg", file: "Epithalon 50mg.jpg" },
  { name: "ghk-cu 50mg", file: "ghk-cu 50mg.jpg" },
  { name: "KissPeptin-10", file: "KissPeptin-10.jpg" },
  { name: "KLOW 80mg", file: "KLOW 80mg.jpg" },
  { name: "MOTS-c 10mg", file: "MOTS-c 10mg.jpg" },
  { name: "NAD500mg", file: "NAD500mg.jpg" },
  { name: "Samaglutide 10mg", file: "Samaglutide 10mg.jpg" },
];

window.peptisynProductSrc = function (file) {
  return "assets/img/products/" + encodeURIComponent(file);
};

window.renderProductCard = function (product, index) {
  var delay = index % 3 === 1 ? " d1" : index % 3 === 2 ? " d2" : "";
  var src = window.peptisynProductSrc(product.file);
  var featured = product.featured ? " pcard--featured" : "";
  var badge = product.featured
    ? '<span class="pcard__badge">Featured</span>'
    : "";
  return (
    '<article class="pcard reveal' +
    delay +
    featured +
    '">' +
    '<div class="pcard__img">' +
    badge +
    '<img src="' +
    src +
    '" alt="' +
    product.name +
    '" loading="lazy" />' +
    '<span class="pcard__label">' +
    product.name +
    "</span>" +
    "</div>" +
    '<div class="pcard__body">' +
    '<span class="pcard__tag">Lyophilized Peptide</span>' +
    "<h3>" +
    product.name +
    "</h3>" +
    "<p>Research-grade lyophilized peptide powder. Every batch tested by COA — full certificate of analysis included for verified quality and purity.</p>" +
    '<a href="contact.html" class="pcard__link">Request quote &rarr;</a>' +
    "</div>" +
    "</article>"
  );
};

window.renderFeaturedSpotlight = function (container) {
  var products = window.PEPTISYN_PRODUCTS.filter(function (p) {
    return p.featured;
  });
  container.innerHTML = products
    .map(function (p, i) {
      var src = window.peptisynProductSrc(p.file);
      return (
        '<a class="spotlight reveal' +
        (i ? " d1" : "") +
        '" href="contact.html">' +
        '<div class="spotlight__img">' +
        '<img src="' +
        src +
        '" alt="' +
        p.name +
        '" />' +
        "</div>" +
        '<div class="spotlight__copy">' +
        '<span class="spotlight__tag">Featured Product</span>' +
        "<h3>" +
        p.name +
        "</h3>" +
        "<p>Research-grade lyophilized peptide powder with COA-verified purity.</p>" +
        '<span class="spotlight__cta">Request quote &rarr;</span>' +
        "</div>" +
        "</a>"
      );
    })
    .join("");
};

window.renderProductGrid = function (container) {
  var limit = container.getAttribute("data-limit");
  var products = window.PEPTISYN_PRODUCTS.slice();
  if (limit) products = products.slice(0, parseInt(limit, 10));
  container.innerHTML = products
    .map(function (p, i) {
      return window.renderProductCard(p, i);
    })
    .join("");
};

window.renderProductSelect = function (select) {
  window.PEPTISYN_PRODUCTS.forEach(function (product) {
    var opt = document.createElement("option");
    opt.value = product.name;
    opt.textContent = product.name;
    select.appendChild(opt);
  });
};

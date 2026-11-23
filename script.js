const grid = document.querySelector("#product-grid");
const filters = document.querySelectorAll(".filter");
const dialog = document.querySelector("#message-dialog");
const messagePreview = document.querySelector("#message-preview");
const whatsappLink = document.querySelector("#whatsapp-link");
const messageDialogClose = document.querySelector(".message-dialog-close");
const imageDialog = document.querySelector("#image-dialog");
const imageDialogPhoto = document.querySelector("#image-dialog-photo");
const imageDialogCaption = document.querySelector("#image-dialog-caption");
const imageDialogCounter = document.querySelector("#image-dialog-counter");
const imageDialogClose = document.querySelector(".image-dialog-close");
const previousImageButton = document.querySelector(".image-nav--previous");
const nextImageButton = document.querySelector(".image-nav--next");
const heroCarousel = document.querySelector("#hero-carousel");
const heroCarouselViewport = document.querySelector("#hero-carousel-viewport");
const heroCarouselTrack = document.querySelector("#hero-carousel-track");
const heroCarouselDots = document.querySelector("#hero-carousel-dots");
const heroCarouselStatus = document.querySelector("#hero-carousel-status");
const desktopCarousel = document.querySelector("#desktop-carousel");
const desktopCarouselSlides = document.querySelector("#desktop-carousel-slides");
const desktopCarouselDots = document.querySelector("#desktop-carousel-dots");
const desktopCarouselStatus = document.querySelector("#desktop-carousel-status");

const featuredProducts = CATALOGO.destaques
  .map((id) => CATALOGO.produtos.find((product) => product.id === id))
  .filter(Boolean);
const HERO_CAROUSEL_INTERVAL = 5000;

let activeImageProduct = null;
let activeImageIndex = 0;
let lastImageTrigger = null;
let activeHeroSlide = 0;
let heroCarouselTimer = null;
let heroScrollTimer = null;

function optionsMarkup(type, values, productId) {
  const label = type === "size" ? "Tamanho" : "Cor";
  const name = `${productId}-${type}`;
  const colorClass = type === "color" ? " option-label--color" : "";

  return `
    <fieldset class="option-group" data-option-group="${type}" aria-describedby="${productId}-error">
      <legend>${label}</legend>
      <div class="option-list">
        ${values.map((value, index) => {
          const inputId = `${name}-${index}`;
          const colorSample = type === "color" ? `<span class="color-sample" style="--sample-color: ${colorValue(value)}" aria-hidden="true"></span>` : "";
          return `<input class="option-input" type="checkbox" id="${inputId}" name="${name}" value="${value}" data-option="${type}"><label class="option-label${colorClass}" for="${inputId}">${colorSample}<span>${value}</span></label>`;
        }).join("")}
      </div>
    </fieldset>`;
}

function colorValue(colorName) {
  const colors = {
    "Preto": "#24201e",
    "Areia": "#c9ad8a",
    "Off-white": "#f3eee4",
    "Rosa": "#e6a9b0",
    "Verde sálvia": "#aebd9e",
    "Vermelho": "#b62f2f",
    "Cobre": "#a85f42",
    "Dourado": "#c09a4a",
    "Azul": "#2d65b1",
    "Verde-oliva": "#68724a"
  };
  return colors[colorName] || "#b8aaa3";
}

function productImages(product) {
  return Array.isArray(product.imagens) && product.imagens.length ? product.imagens : [product.imagem];
}

function productMarkup(product) {
  const images = productImages(product);
  return `
    <article class="product-card" data-category="${product.categoria}" data-product-id="${product.id}">
      <div class="product-card__image">
        <button class="product-card__image-button" type="button" data-image-product="${product.id}" aria-label="Ampliar foto de ${product.nome}">
          <img src="${images[0]}" alt="${product.imagemAlt}" loading="lazy" style="object-position: ${product.cardPosition || "center top"}">
          <span class="zoom-icon" aria-hidden="true">⌕</span>
        </button>
        <span class="product-tag">${product.categoriaLabel}</span>
        ${images.length > 1 ? `<span class="product-photo-count">${images.length} fotos</span>` : ""}
      </div>
      <div class="product-card__body">
        <div class="product-card__heading"><h3>${product.nome}</h3><p>${product.preco}<small>valor de exemplo</small></p></div>
        <div class="product-options">${optionsMarkup("size", product.tamanhos, product.id)}${optionsMarkup("color", product.cores, product.id)}</div>
        <p class="selection-error" id="${product.id}-error" role="alert" aria-live="polite"></p>
        <button class="button button--outline consult-button" type="button" data-product="${product.id}">Consultar pelo WhatsApp</button>
      </div>
    </article>`;
}

function renderProducts(filter = "todas") {
  const products = filter === "todas" ? CATALOGO.produtos : CATALOGO.produtos.filter((product) => product.categoria === filter);
  grid.innerHTML = products.map(productMarkup).join("");
}

function applyFilter(filterButton) {
  filters.forEach((button) => {
    const active = button === filterButton;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  renderProducts(filterButton.dataset.filter);
}

function heroDotsMarkup() {
  return featuredProducts.map((product, index) => `
    <button class="hero-carousel__dot" type="button" data-hero-slide="${index}" aria-label="Ver ${product.nome}" aria-current="${index === 0 ? "true" : "false"}"></button>
  `).join("");
}

function heroSlidesMarkup() {
  return featuredProducts.map((product, index) => `
    <button class="mobile-carousel__slide" type="button" data-product-target="${product.id}" data-slide-index="${index}" aria-label="Ver ${product.nome} na vitrine">
      <img src="${productImages(product)[0]}" alt="${product.imagemAlt}" ${index === 0 ? 'fetchpriority="high"' : 'loading="lazy"'}>
      <span>${product.nome}</span>
    </button>
  `).join("");
}

function desktopSlidesMarkup() {
  return featuredProducts.map((product, index) => `
    <button class="desktop-carousel__slide${index === 0 ? " is-active" : ""}" type="button" data-product-target="${product.id}" data-desktop-slide="${index}" aria-label="Ver ${product.nome} na vitrine" aria-hidden="${index === 0 ? "false" : "true"}" tabindex="${index === 0 ? "0" : "-1"}">
      <img src="${productImages(product)[0]}" alt="${product.imagemAlt}" ${index === 0 ? 'fetchpriority="high"' : 'loading="lazy"'}>
      <span>${product.nome}</span>
    </button>
  `).join("");
}

function updateHeroCarouselStatus() {
  const product = featuredProducts[activeHeroSlide];
  if (!product) return;
  heroCarouselStatus.textContent = `${activeHeroSlide + 1} de ${featuredProducts.length}: ${product.nome}`;
  heroCarouselDots.querySelectorAll(".hero-carousel__dot").forEach((dot, index) => {
    const active = index === activeHeroSlide;
    dot.classList.toggle("is-active", active);
    dot.setAttribute("aria-current", String(active));
  });
  desktopCarouselStatus.textContent = `${activeHeroSlide + 1} de ${featuredProducts.length}: ${product.nome}`;
  desktopCarouselSlides.querySelectorAll(".desktop-carousel__slide").forEach((slide, index) => {
    const active = index === activeHeroSlide;
    slide.classList.toggle("is-active", active);
    slide.setAttribute("aria-hidden", String(!active));
    slide.tabIndex = active ? 0 : -1;
  });
  desktopCarouselDots.querySelectorAll(".desktop-carousel__dot").forEach((dot, index) => {
    const active = index === activeHeroSlide;
    dot.classList.toggle("is-active", active);
    dot.setAttribute("aria-current", String(active));
  });
}

function renderDesktopOpening() {
  desktopCarouselSlides.innerHTML = desktopSlidesMarkup();
  desktopCarouselDots.innerHTML = featuredProducts.map((product, index) => `
    <button class="desktop-carousel__dot${index === 0 ? " is-active" : ""}" type="button" data-desktop-dot="${index}" aria-label="Ver ${product.nome}" aria-current="${index === 0 ? "true" : "false"}"></button>
  `).join("");
  updateHeroCarouselStatus();
}

function startHeroAutoplay() {
  window.clearInterval(heroCarouselTimer);
  if (featuredProducts.length < 2 || document.hidden) return;
  heroCarouselTimer = window.setInterval(() => {
    changeHeroSlide(1, false);
  }, HERO_CAROUSEL_INTERVAL);
}

function changeHeroSlide(step, restartAutoplay = true) {
  activeHeroSlide = (activeHeroSlide + step + featuredProducts.length) % featuredProducts.length;
  scrollToHeroSlide("smooth");
  if (restartAutoplay) startHeroAutoplay();
}

function goToHeroSlide(index) {
  activeHeroSlide = index;
  scrollToHeroSlide("smooth");
  startHeroAutoplay();
}

function scrollToHeroSlide(behavior) {
  updateHeroCarouselStatus();
  if (!window.matchMedia("(max-width: 767px)").matches) return;
  const slide = heroCarouselTrack.children[activeHeroSlide];
  if (!slide) return;
  const trackPadding = Number.parseFloat(window.getComputedStyle(heroCarouselTrack).paddingLeft) || 0;
  heroCarouselViewport.scrollTo({ left: slide.offsetLeft - trackPadding, behavior });
}

function syncSlideFromScroll() {
  window.clearTimeout(heroScrollTimer);
  heroScrollTimer = window.setTimeout(() => {
    const viewportCenter = heroCarouselViewport.scrollLeft + heroCarouselViewport.clientWidth / 2;
    const slides = [...heroCarouselTrack.children];
    activeHeroSlide = slides.reduce((closestIndex, slide, index) => {
      const currentDistance = Math.abs(slide.offsetLeft + slide.offsetWidth / 2 - viewportCenter);
      const closest = slides[closestIndex];
      const closestDistance = Math.abs(closest.offsetLeft + closest.offsetWidth / 2 - viewportCenter);
      return currentDistance < closestDistance ? index : closestIndex;
    }, 0);
    updateHeroCarouselStatus();
    startHeroAutoplay();
  }, 100);
}

function showProductCard(productId) {
  let card = grid.querySelector(`[data-product-id="${productId}"]`);
  if (!card) {
    applyFilter(document.querySelector('[data-filter="todas"]'));
    card = grid.querySelector(`[data-product-id="${productId}"]`);
  }
  if (!card) return;
  card.scrollIntoView({ behavior: "smooth", block: "start" });
  card.classList.add("is-highlighted");
  window.setTimeout(() => card.classList.remove("is-highlighted"), 1400);
}

function renderHeroCarousel() {
  if (!featuredProducts.length) return;
  heroCarouselTrack.innerHTML = heroSlidesMarkup();
  heroCarouselDots.innerHTML = heroDotsMarkup();
  updateHeroCarouselStatus();
}

function makeMessage(product, size, color) {
  return `Oi! Vi o ${product.nome} no catálogo da ${CATALOGO.loja.nome}. Tem no tamanho ${size} e na cor ${color}?`;
}

function openPreview(button) {
  const product = CATALOGO.produtos.find((item) => item.id === button.dataset.product);
  const card = button.closest(".product-card");
  const sizeInput = card.querySelector('[data-option="size"]:checked');
  const colorInput = card.querySelector('[data-option="color"]:checked');
  const size = sizeInput?.value;
  const color = colorInput?.value;
  const error = card.querySelector(".selection-error");
  const missing = [];
  if (!size) missing.push("o tamanho");
  if (!color) missing.push("a cor");
  if (missing.length) {
    error.textContent = `Escolha ${missing.join(" e ")} antes de continuar.`;
    card.querySelector(!size ? '[data-option="size"]' : '[data-option="color"]').focus();
    return;
  }
  error.textContent = "";
  const message = makeMessage(product, size, color);
  messagePreview.textContent = message;
  whatsappLink.href = `https://wa.me/${CATALOGO.loja.whatsapp}?text=${encodeURIComponent(message)}`;
  dialog.showModal();
}

function updateImageDialog() {
  const images = productImages(activeImageProduct);
  imageDialogPhoto.src = images[activeImageIndex];
  imageDialogPhoto.alt = activeImageProduct.imagemAlt;
  imageDialogCaption.textContent = activeImageProduct.nome;
  imageDialogCounter.textContent = images.length > 1 ? `${activeImageIndex + 1} de ${images.length}` : "";
  previousImageButton.hidden = images.length < 2;
  nextImageButton.hidden = images.length < 2;
}

function openImagePreview(button) {
  activeImageProduct = CATALOGO.produtos.find((item) => item.id === button.dataset.imageProduct);
  activeImageIndex = 0;
  lastImageTrigger = button;
  updateImageDialog();
  imageDialog.showModal();
}

function changeImage(step) {
  const images = productImages(activeImageProduct);
  activeImageIndex = (activeImageIndex + step + images.length) % images.length;
  updateImageDialog();
}

filters.forEach((filterButton) => {
  filterButton.addEventListener("click", () => {
    applyFilter(filterButton);
  });
});

heroCarousel.querySelector(".hero-carousel__arrow--previous").addEventListener("click", () => changeHeroSlide(-1));
heroCarousel.querySelector(".hero-carousel__arrow--next").addEventListener("click", () => changeHeroSlide(1));
desktopCarousel.querySelector(".desktop-carousel__arrow--previous").addEventListener("click", () => changeHeroSlide(-1));
desktopCarousel.querySelector(".desktop-carousel__arrow--next").addEventListener("click", () => changeHeroSlide(1));
desktopCarouselDots.addEventListener("click", (event) => {
  const dot = event.target.closest(".desktop-carousel__dot");
  if (dot) goToHeroSlide(Number(dot.dataset.desktopDot));
});
desktopCarouselSlides.addEventListener("click", (event) => {
  const slide = event.target.closest("[data-product-target]");
  if (slide) showProductCard(slide.dataset.productTarget);
});
desktopCarousel.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    changeHeroSlide(-1);
  }
  if (event.key === "ArrowRight") {
    event.preventDefault();
    changeHeroSlide(1);
  }
});
heroCarouselDots.addEventListener("click", (event) => {
  const dot = event.target.closest(".hero-carousel__dot");
  if (dot) goToHeroSlide(Number(dot.dataset.heroSlide));
});
heroCarousel.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    changeHeroSlide(-1);
  }
  if (event.key === "ArrowRight") {
    event.preventDefault();
    changeHeroSlide(1);
  }
});
heroCarouselViewport.addEventListener("scroll", syncSlideFromScroll, { passive: true });
heroCarouselTrack.addEventListener("click", (event) => {
  const slide = event.target.closest(".mobile-carousel__slide");
  if (slide) showProductCard(slide.dataset.productTarget);
});
grid.addEventListener("click", (event) => {
  const button = event.target.closest(".consult-button");
  if (button) openPreview(button);
  const imageButton = event.target.closest(".product-card__image-button");
  if (imageButton) openImagePreview(imageButton);
});

grid.addEventListener("change", (event) => {
  if (!event.target.matches(".option-input")) return;

  const input = event.target;
  const optionGroup = input.closest(".option-group");

  if (input.checked) {
    optionGroup.querySelectorAll(".option-input").forEach((option) => {
      if (option !== input) option.checked = false;
    });
  }

  input.closest(".product-card").querySelector(".selection-error").textContent = "";
});

messageDialogClose.addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

imageDialogClose.addEventListener("click", () => imageDialog.close());
previousImageButton.addEventListener("click", () => changeImage(-1));
nextImageButton.addEventListener("click", () => changeImage(1));
imageDialog.addEventListener("click", (event) => {
  if (event.target === imageDialog) imageDialog.close();
});
imageDialog.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft" && !previousImageButton.hidden) changeImage(-1);
  if (event.key === "ArrowRight" && !nextImageButton.hidden) changeImage(1);
});
imageDialog.addEventListener("close", () => {
  lastImageTrigger?.focus({ preventScroll: true });
});
document.addEventListener("visibilitychange", startHeroAutoplay);
window.addEventListener("resize", startHeroAutoplay);

renderProducts();
renderDesktopOpening();
renderHeroCarousel();
startHeroAutoplay();

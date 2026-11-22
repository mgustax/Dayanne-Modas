const grid = document.querySelector("#product-grid");
const filters = document.querySelectorAll(".filter");
const dialog = document.querySelector("#message-dialog");
const messagePreview = document.querySelector("#message-preview");
const whatsappLink = document.querySelector("#whatsapp-link");
const dialogClose = document.querySelector(".dialog-close");

function optionsMarkup(type, values, productId) {
  const label = type === "size" ? "Tamanho" : "Cor";
  const optionText = type === "size" ? "Selecione o tamanho" : "Selecione a cor";
  return `<label class="field"><span>${label}</span><select data-option="${type}" data-product="${productId}" aria-label="${label}"><option value="">${optionText}</option>${values.map((value) => `<option value="${value}">${value}</option>`).join("")}</select></label>`;
}

function productMarkup(product) {
  return `
    <article class="product-card" data-category="${product.categoria}" data-product-id="${product.id}">
      <div class="product-card__image"><img src="${product.imagem}" alt="${product.imagemAlt}" loading="lazy"><span class="product-tag">${product.categoriaLabel}</span></div>
      <div class="product-card__body">
        <div class="product-card__heading"><h3>${product.nome}</h3><p>${product.preco}<small>valor de exemplo</small></p></div>
        <div class="product-options">${optionsMarkup("size", product.tamanhos, product.id)}${optionsMarkup("color", product.cores, product.id)}</div>
        <p class="selection-error" role="alert" aria-live="polite"></p>
        <button class="button button--outline consult-button" type="button" data-product="${product.id}">Consultar pelo WhatsApp</button>
      </div>
    </article>`;
}

function renderProducts(filter = "todas") {
  const products = filter === "todas" ? CATALOGO.produtos : CATALOGO.produtos.filter((product) => product.categoria === filter);
  grid.innerHTML = products.map(productMarkup).join("");
}

function makeMessage(product, size, color) {
  return `Oi! Vi o ${product.nome} no catálogo da ${CATALOGO.loja.nome}. Tem no tamanho ${size} e na cor ${color}?`;
}

function openPreview(button) {
  const product = CATALOGO.produtos.find((item) => item.id === button.dataset.product);
  const card = button.closest(".product-card");
  const size = card.querySelector('[data-option="size"]').value;
  const color = card.querySelector('[data-option="color"]').value;
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

filters.forEach((filterButton) => {
  filterButton.addEventListener("click", () => {
    filters.forEach((button) => {
      const active = button === filterButton;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    renderProducts(filterButton.dataset.filter);
  });
});

grid.addEventListener("click", (event) => {
  const button = event.target.closest(".consult-button");
  if (button) openPreview(button);
});

grid.addEventListener("change", (event) => {
  if (event.target.matches("select")) event.target.closest(".product-card").querySelector(".selection-error").textContent = "";
});

dialogClose.addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

renderProducts();

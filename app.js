import {
  brandCards,
  brandNames,
  blogEntries,
  categories,
  coupons,
  faqs,
  featureCards,
  heroSlides,
  money,
  navItems,
  products,
  recommendationIds,
  siteName,
  supportPhone,
  whatsappNumber,
} from "./catalog.js";

const { useEffect, useMemo, useState } = React;
const { createRoot } = ReactDOM;
const html = htm.bind(React.createElement);
const STORAGE_KEY = "fuellab-cart-v1";
const CONTACT_URL = `https://wa.me/${whatsappNumber}`;

function readStoredCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function clamp(num, min, max) {
  return Math.max(min, Math.min(max, num));
}

function buildOrderId() {
  return `FL-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
}

function scrollToId(id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function formatDiscountLabel(appliedCoupon) {
  if (!appliedCoupon) return "No hay cupón activo";
  return `${appliedCoupon.code} · ${appliedCoupon.label}`;
}

function productMatches(product, filters) {
  const { collection, category, brand, query } = filters;
  const normalized = query.trim().toLowerCase();
  const haystack = [
    product.name,
    product.brand,
    product.category,
    ...(product.tags ?? []),
    ...(product.bullets ?? []),
    product.description,
  ]
    .join(" ")
    .toLowerCase();

  const collectionMatch = collection === "Todos" || product.collection === collection;
  const categoryMatch = category === "Todos" || product.tags?.includes(category) || product.category === category;
  const brandMatch = brand === "Todas" || product.brand === brand;
  const queryMatch = !normalized || haystack.includes(normalized);

  return collectionMatch && categoryMatch && brandMatch && queryMatch;
}

function App() {
  const [collection, setCollection] = useState("Destacados");
  const [category, setCategory] = useState("Todos");
  const [brand, setBrand] = useState("Todas");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");
  const [heroIndex, setHeroIndex] = useState(0);
  const [cart, setCart] = useState(() => readStoredCart());
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quickViewId, setQuickViewId] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState("");
  const [selectedQty, setSelectedQty] = useState(1);
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [toast, setToast] = useState(null);
  const [order, setOrder] = useState(null);
  const [checkout, setCheckout] = useState({
    name: "",
    phone: "",
    email: "",
    city: "Medellín",
    address: "",
    delivery: "Express",
    payment: "Contra entrega",
    notes: "",
  });

  const quickViewProduct = products.find((item) => item.id === quickViewId) || null;

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setHeroIndex((value) => (value + 1) % heroSlides.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const body = document.body;
    if (cartOpen || quickViewProduct || mobileMenuOpen) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "";
    }
    return () => {
      body.style.overflow = "";
    };
  }, [cartOpen, quickViewProduct, mobileMenuOpen]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setCartOpen(false);
        setQuickViewId(null);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    const variants = quickViewProduct?.variants || [];
    if (!selectedVariant && variants.length) {
      setSelectedVariant(variants[0]);
    }
    if (quickViewProduct && !variants.includes(selectedVariant) && variants.length) {
      setSelectedVariant(variants[0]);
    }
    if (!quickViewProduct) {
      setSelectedQty(1);
    }
  }, [quickViewProduct, selectedVariant]);

  const filteredProducts = useMemo(() => {
    const items = products.filter((product) =>
      productMatches(product, { collection, category, brand, query }),
    );

    const sorted = [...items];
    if (sort === "price-asc") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sort === "rating") {
      sorted.sort((a, b) => b.rating - a.rating);
    }
    return sorted;
  }, [brand, category, collection, query, sort]);

  const recommendationCards = useMemo(
    () => recommendationIds.map((id) => products.find((item) => item.id === id)).filter(Boolean),
    [],
  );

  const cartItems = useMemo(() => {
    return cart
      .map((entry) => {
        const product = products.find((item) => item.id === entry.productId);
        return product ? { ...entry, product } : null;
      })
      .filter(Boolean);
  }, [cart]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const cartSubtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.qty, 0);

  const couponResult = useMemo(() => {
    if (!appliedCoupon) return { discount: 0, message: "Ingresa un cupón para validar el descuento." };

    const rule = coupons[appliedCoupon.code];
    if (!rule) {
      return { discount: 0, message: "El cupón ingresado no existe." };
    }

    if (cartSubtotal < rule.minSubtotal) {
      return {
        discount: 0,
        message: `El cupón ${appliedCoupon.code} requiere compras desde ${money(rule.minSubtotal)}.`,
      };
    }

    if (rule.type === "percent") {
      const discount = Math.round((cartSubtotal * rule.value) / 100);
      return { discount, message: `Cupón aplicado: ${rule.label}.` };
    }

    return { discount: 0, message: "Cupón inválido." };
  }, [appliedCoupon, cartSubtotal]);

  const deliveryFee = cartSubtotal >= 260000 ? 0 : checkout.delivery === "Express" ? 18000 : 12000;
  const total = Math.max(0, cartSubtotal - couponResult.discount + deliveryFee);

  const openProduct = (productId) => {
    setQuickViewId(productId);
    setSelectedQty(1);
    const product = products.find((item) => item.id === productId);
    setSelectedVariant(product?.variants?.[0] || "");
  };

  const addToCart = (product, variant = "") => {
    setCart((current) => {
      const matchKey = `${product.id}::${variant || "default"}`;
      const existing = current.find((item) => item.key === matchKey);
      if (existing) {
        return current.map((item) =>
          item.key === matchKey ? { ...item, qty: clamp(item.qty + 1, 1, 99) } : item,
        );
      }
      return [
        ...current,
        {
          key: matchKey,
          productId: product.id,
          variant,
          qty: 1,
        },
      ];
    });
    setCartOpen(true);
    setToast(`${product.name} agregado a la cesta.`);
  };

  const addQuickView = () => {
    if (!quickViewProduct) return;
    setCart((current) => {
      const matchKey = `${quickViewProduct.id}::${selectedVariant || "default"}`;
      const existing = current.find((item) => item.key === matchKey);
      if (existing) {
        return current.map((item) =>
          item.key === matchKey ? { ...item, qty: clamp(item.qty + selectedQty, 1, 99) } : item,
        );
      }
      return [
        ...current,
        {
          key: matchKey,
          productId: quickViewProduct.id,
          variant: selectedVariant,
          qty: selectedQty,
        },
      ];
    });
    setToast(`${quickViewProduct.name} agregado con éxito.`);
    setQuickViewId(null);
    setCartOpen(true);
  };

  const updateQty = (key, nextQty) => {
    setCart((current) =>
      current
        .map((item) => (item.key === key ? { ...item, qty: nextQty } : item))
        .filter((item) => item.qty > 0),
    );
  };

  const removeItem = (key) => {
    setCart((current) => current.filter((item) => item.key !== key));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
    setCouponInput("");
    setToast("Carrito vaciado.");
  };

  const applyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (!code) {
      setToast("Escribe un cupón antes de aplicar.");
      return;
    }
    const rule = coupons[code];
    if (!rule) {
      setAppliedCoupon(null);
      setToast("Cupón no válido.");
      return;
    }
    if (cartSubtotal < rule.minSubtotal) {
      setAppliedCoupon(null);
      setToast(`El cupón ${code} requiere un subtotal mayor.`);
      return;
    }
    setAppliedCoupon({ code, ...rule });
    setToast(`Cupón ${code} aplicado.`);
  };

  const checkoutLink = useMemo(() => {
    const lines = [
      `Hola, soy ${checkout.name || "un cliente"} y quiero revisar este pedido de ${siteName}.`,
      `Ciudad: ${checkout.city || "N/D"}.`,
      `Entrega: ${checkout.delivery}.`,
      `Pago: ${checkout.payment}.`,
      `Subtotal: ${money(cartSubtotal)}.`,
      `Descuento: ${money(couponResult.discount)}.`,
      `Envío: ${money(deliveryFee)}.`,
      `Total: ${money(total)}.`,
      "",
      "Productos:",
      ...cartItems.map(
        (item) =>
          `- ${item.product.name}${item.variant ? ` (${item.variant})` : ""} x${item.qty} = ${money(
            item.product.price * item.qty,
          )}`,
      ),
    ];
    return `${CONTACT_URL}?text=${encodeURIComponent(lines.join("\n"))}`;
  }, [cartItems, cartSubtotal, checkout.city, checkout.delivery, checkout.name, checkout.payment, couponResult.discount, deliveryFee, total]);

  const submitOrder = (event) => {
    event.preventDefault();
    if (!cartItems.length) {
      setToast("Agrega productos antes de enviar el pedido.");
      return;
    }
    if (!checkout.name || !checkout.phone || !checkout.address) {
      setToast("Completa nombre, teléfono y dirección.");
      return;
    }

    const orderNumber = buildOrderId();
    const snapshot = {
      id: orderNumber,
      ...checkout,
      items: cartItems,
      subtotal: cartSubtotal,
      discount: couponResult.discount,
      shipping: deliveryFee,
      total,
      createdAt: new Date().toLocaleString("es-CO"),
    };
    setOrder(snapshot);
    setCart([]);
    setCouponInput("");
    setAppliedCoupon(null);
    setToast(`Pedido ${orderNumber} listo.`);
    scrollToId("checkout");
  };

  const currentSlide = heroSlides[heroIndex];

  return html`
    <div className="page-shell">
      <div className="announcement">
        <strong>Envío gratis a toda Colombia</strong>
        <span> Entregas rápidas, combos exclusivos y soporte por WhatsApp.</span>
      </div>

      <header className="topbar">
        <div className="topbar__inner">
          <a className="brand" href="#inicio" onClick=${() => setMobileMenuOpen(false)}>
            <div className="brand__mark">${siteName.slice(0, 2)}</div>
            <div className="brand__copy">
              <div className="brand__name">${siteName}</div>
              <div className="brand__tag">Tienda online de suplementos deportivos</div>
            </div>
          </a>

          <div className="search-box">
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              placeholder="Busca más de 18 productos..."
              value=${query}
              onChange=${(event) => {
                setCollection("Todos");
                setQuery(event.target.value);
              }}
            />
          </div>

          <nav className="topnav ${mobileMenuOpen ? "is-open" : ""}">
            ${navItems.map(
              (item) => html`
                <button
                  key=${item}
                  type="button"
                  className="topnav__item"
                  onClick=${() => {
                    setMobileMenuOpen(false);
                    if (item === "Inicio") scrollToId("inicio");
                    if (item === "Productos") scrollToId("catalogo");
                    if (item === "Marcas") scrollToId("marcas");
                    if (item === "Combos") {
                      setCollection("Combos");
                      scrollToId("catalogo");
                    }
                    if (item === "Ofertas") {
                      setCategory("Oferta Semanal");
                      setCollection("Todos");
                      scrollToId("catalogo");
                    }
                    if (item === "Blog") scrollToId("blog");
                  }}
                >
                  ${item}
                </button>
              `,
            )}
          </nav>

          <div className="topbar__actions">
            <button
              type="button"
              className="icon-button hide-desktop"
              onClick=${() => setMobileMenuOpen((value) => !value)}
              aria-label="Abrir navegación"
            >
              ≡
            </button>
            <button type="button" className="ghost-button" onClick=${() => setCartOpen(true)}>
              <span>Carro</span>
              <strong>${cartCount}</strong>
            </button>
          </div>
        </div>
      </header>

      <main id="inicio">
        <section className="hero">
          <div className="hero__content">
            <div className="eyebrow">${currentSlide.eyebrow}</div>
            <h1>${currentSlide.title}</h1>
            <p className="hero__text">${currentSlide.description}</p>
            <div className="hero__actions">
              <button className="primary-button" type="button" onClick=${() => scrollToId("catalogo")}>
                ${currentSlide.cta}
              </button>
              <a className="secondary-button" href=${CONTACT_URL} target="_blank" rel="noreferrer">
                ${currentSlide.secondary}
              </a>
            </div>
            <div className="hero__stats">
              <div className="stat">
                <strong>${currentSlide.metric}</strong>
                <span>Catálogo curado con foco en conversión y lectura rápida.</span>
              </div>
              <div className="stat">
                <strong>Checkout interactivo</strong>
                <span>Carrito persistente, cupones y resumen de pedido completo.</span>
              </div>
              <div className="stat">
                <strong>React + JavaScript</strong>
                <span>Arquitectura simple para seguir creciendo sin rehacer todo.</span>
              </div>
            </div>
          </div>

          <div className="hero__visual">
            ${heroSlides.map((slide, index) => html`
              <div key=${slide.title} className="hero-slide ${index === heroIndex ? "is-active" : ""}">
                <div className="hero-card">
                  <div className="hero-card__top">
                    <div className="hero-card__tag">${slide.tag}</div>
                    <div className="hero-card__chip">${index + 1}/${heroSlides.length}</div>
                  </div>
                  <div className="hero-card__art">
                    <img
                      src=${products[index * 2]?.image || products[0].image}
                      alt=${slide.title}
                    />
                  </div>
                  <div className="hero-card__body">
                    <h2>${slide.title}</h2>
                    <p>${slide.description}</p>
                    <div className="hero-card__foot">
                      <span className="pill">${slide.metric}</span>
                      <span className="pill">${products[index * 2]?.name || "Destacados"}</span>
                      <span className="pill">Compra rápida</span>
                    </div>
                  </div>
                </div>
              </div>
            `)}

            <div className="hero__controls">
              <div className="hero__dots" aria-label="Cambiar slide">
                ${heroSlides.map((slide, index) => html`
                  <button
                    key=${slide.title}
                    type="button"
                    className="hero__dot ${index === heroIndex ? "is-active" : ""}"
                    aria-label=${`Ver slide ${index + 1}`}
                    onClick=${() => setHeroIndex(index)}
                  ></button>
                `)}
              </div>
              <div className="hero__arrows">
                <button
                  type="button"
                  className="icon-button"
                  aria-label="Slide anterior"
                  onClick=${() => setHeroIndex((value) => (value - 1 + heroSlides.length) % heroSlides.length)}
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="icon-button"
                  aria-label="Slide siguiente"
                  onClick=${() => setHeroIndex((value) => (value + 1) % heroSlides.length)}
                >
                  ›
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="feature-strip">
          ${featureCards.map(
            (item) => html`
              <article className="feature-card" key=${item.title}>
                <div className="eyebrow" style=${{ marginBottom: "12px" }}>FuelLab</div>
                <strong>${item.title}</strong>
                <p>${item.text}</p>
              </article>
            `,
          )}
        </section>

        <section id="catalogo" className="section">
          <div className="section__head">
            <div>
              <div className="eyebrow">Productos</div>
              <h2 className="section-title">Catálogo y carrito</h2>
            </div>
            <div className="section__meta">
              Filtra por categoría, marca o texto. El carrito se guarda localmente para que puedas seguir editando.
            </div>
          </div>

          <div className="chip-rail">
            <button
              type="button"
              className="pill-button ${collection === "Destacados" ? "is-active" : ""}"
              onClick=${() => setCollection("Destacados")}
            >
              Destacados
            </button>
            <button
              type="button"
              className="pill-button ${collection === "Combos" ? "is-active" : ""}"
              onClick=${() => setCollection("Combos")}
            >
              Combos
            </button>
            <button
              type="button"
              className="pill-button ${collection === "Todos" ? "is-active" : ""}"
              onClick=${() => setCollection("Todos")}
            >
              Ver todo
            </button>
          </div>

          <div className="catalog-layout">
            <div className="catalog-panel">
              <div className="toolbar">
                <div className="toolbar__group">
                  <span className="toolbar__label">Categoría</span>
                  <select
                    className="select"
                    value=${category}
                    onChange=${(event) => setCategory(event.target.value)}
                  >
                    ${categories.map(
                      (item) => html`
                        <option key=${item} value=${item}>${item}</option>
                      `,
                    )}
                  </select>
                  <span className="toolbar__label">Marca</span>
                  <select
                    className="select"
                    value=${brand}
                    onChange=${(event) => setBrand(event.target.value)}
                  >
                    <option value="Todas">Todas</option>
                    ${brandNames.map(
                      (item) => html`
                        <option key=${item} value=${item}>${item}</option>
                      `,
                    )}
                  </select>
                </div>

                <div className="toolbar__group">
                  <span className="toolbar__label">${filteredProducts.length} resultados</span>
                  <select className="select" value=${sort} onChange=${(event) => setSort(event.target.value)}>
                    <option value="featured">Más relevantes</option>
                    <option value="rating">Mejor valorados</option>
                    <option value="price-asc">Precio: menor a mayor</option>
                    <option value="price-desc">Precio: mayor a menor</option>
                  </select>
                </div>
              </div>

              <div className="product-grid">
                ${filteredProducts.length
                  ? filteredProducts.map(
                      (product) => html`
                        <article className="product-card" key=${product.id}>
                          <div className="product-card__media">
                            <img src=${product.image} alt=${product.name} />
                            <div className="product-card__badge">${product.badge}</div>
                            <button
                              type="button"
                              className="product-card__action"
                              onClick=${() => openProduct(product.id)}
                              aria-label=${`Ver ${product.name}`}
                            >
                              +
                            </button>
                          </div>

                          <div className="product-card__body">
                            <div className="product-card__brand">${product.brand}</div>
                            <h3 className="product-card__name">${product.name}</h3>
                            <p className="product-card__desc">${product.description}</p>
                            <div className="product-card__tags">
                              ${product.tags.slice(0, 3).map(
                                (tag) => html`<span key=${tag} className="mini-tag">${tag}</span>`,
                              )}
                            </div>
                            <div className="price-row">
                              <div className="price">
                                <strong>${money(product.price)}</strong>
                                <del>${money(product.compareAt)}</del>
                              </div>
                              <div className="rating">★ ${product.rating} · ${product.reviews}</div>
                            </div>
                            <div className="product-card__buttons">
                              <button type="button" className="primary-button" onClick=${() => addToCart(product, product.variants?.[0] || "")}>
                                Añadir a la cesta
                              </button>
                              <button type="button" className="secondary-button" onClick=${() => openProduct(product.id)}>
                                Ver
                              </button>
                            </div>
                          </div>
                        </article>
                      `,
                    )
                  : html`
                      <div className="summary-panel" style=${{ gridColumn: "1 / -1" }}>
                        <h3 className="panel-title">Sin resultados</h3>
                        <p className="muted">
                          Prueba otra categoría, cambia la marca o borra la búsqueda para ver más productos.
                        </p>
                      </div>
                    `}
              </div>

              <div id="marcas" className="section" style=${{ marginTop: "6px" }}>
                <div className="section__head">
                  <div>
                    <div className="eyebrow">Marcas</div>
                    <h2 className="section-title">Marcas en suplementación deportiva</h2>
                  </div>
                  <div className="section__meta">Haz clic en una marca para filtrar al instante el catálogo.</div>
                </div>

                <div className="brands-grid">
                  ${brandCards.map(
                    (item) => html`
                      <article
                        className="brand-card"
                        key=${item.name}
                        onClick=${() => {
                          setBrand(item.name);
                          scrollToId("catalogo");
                        }}
                      >
                        <div
                          className="brand-card__logo"
                          style=${{
                            background: `linear-gradient(135deg, ${item.accent}, #d6fff0)`,
                          }}
                        >
                          ${item.initials}
                        </div>
                        <h3 className="brand-card__name">${item.name}</h3>
                        <p className="brand-card__text">${item.text}</p>
                      </article>
                    `,
                  )}
                </div>
              </div>

              <div className="section">
                <div className="section__head">
                  <div>
                    <div className="eyebrow">Recomendaciones</div>
                    <h2 className="section-title">Productos populares</h2>
                  </div>
                  <div className="section__meta">Seleccionados para vender rápido y dar claridad visual en la home.</div>
                </div>

                <div className="reco-grid">
                  ${recommendationCards.map(
                    (product) => html`
                      <article className="reco-card" key=${product.id}>
                        <img src=${product.image} alt=${product.name} />
                        <strong>${product.name}</strong>
                        <span>${product.brand}</span>
                        <span>${money(product.price)}</span>
                        <button type="button" className="secondary-button" onClick=${() => addToCart(product, product.variants?.[0] || "")}>
                          Añadir
                        </button>
                      </article>
                    `,
                  )}
                </div>
              </div>
            </div>

            <aside className="sidebar">
              <section className="cart-panel" aria-label="Carro">
                <div className="section__head" style=${{ marginBottom: "10px" }}>
                  <div>
                    <div className="eyebrow">Carro</div>
                    <h2 className="panel-title">Cesta</h2>
                  </div>
                  <button type="button" className="ghost-button" onClick=${clearCart}>
                    Vaciar
                  </button>
                </div>

                <div className="coupon-box">
                  <div className="search-box">
                    <span aria-hidden="true">%</span>
                    <input
                      type="text"
                      placeholder="Ingresa el cupón"
                      value=${couponInput}
                      onChange=${(event) => setCouponInput(event.target.value)}
                    />
                  </div>
                  <button type="button" className="secondary-button" onClick=${applyCoupon}>
                    Aplicar cupón
                  </button>
                  <div className="helper">
                    Activos: <strong>SCO10</strong>, <strong>RUTA15</strong>, <strong>MUSCLE20</strong>.
                    <br />
                    ${formatDiscountLabel(appliedCoupon)}
                    <br />
                    ${couponResult.message}
                  </div>
                </div>

                <div className="cart-list">
                  ${cartItems.length
                    ? cartItems.map(
                        (item) => html`
                          <article className="cart-item" key=${item.key}>
                            <img className="cart-item__image" src=${item.product.image} alt=${item.product.name} />
                            <div className="cart-item__body">
                              <h3 className="cart-item__name">${item.product.name}</h3>
                              <div className="cart-item__meta">
                                ${item.variant || "Sin variante"} · ${money(item.product.price)}
                              </div>
                              <div className="cart-item__meta">${money(item.product.price * item.qty)}</div>
                            </div>
                            <div className="cart-item__controls">
                              <div className="qty">
                                <button type="button" onClick=${() => updateQty(item.key, item.qty - 1)}>
                                  -
                                </button>
                                <strong>${item.qty}</strong>
                                <button type="button" onClick=${() => updateQty(item.key, item.qty + 1)}>
                                  +
                                </button>
                              </div>
                              <button type="button" className="ghost-button" onClick=${() => removeItem(item.key)}>
                                Quitar
                              </button>
                            </div>
                          </article>
                        `,
                      )
                    : html`
                        <div className="helper">
                          Tu carrito está vacío. Agrega productos para revisar subtotal y checkout.
                        </div>
                      `}
                </div>

                <div className="summary-grid">
                  <div className="summary-line">
                    <span>Subtotal</span>
                    <span>${money(cartSubtotal)}</span>
                  </div>
                  <div className="summary-line summary-line--muted">
                    <span>Descuento</span>
                    <span>-${money(couponResult.discount)}</span>
                  </div>
                  <div className="summary-line summary-line--muted">
                    <span>Envío</span>
                    <span>${money(deliveryFee)}</span>
                  </div>
                  <div className="divider"></div>
                  <div className="summary-line">
                    <span>Total</span>
                    <span>${money(total)}</span>
                  </div>
                </div>

                <div className="cart-actions">
                  <button type="button" className="primary-button" onClick=${() => scrollToId("checkout")}>
                    Pagar
                  </button>
                  <button type="button" className="secondary-button" onClick=${() => setCartOpen(true)}>
                    Ver carro completo
                  </button>
                  <a className="ghost-button" href=${checkoutLink} target="_blank" rel="noreferrer">
                    Enviar por WhatsApp
                  </a>
                </div>
              </section>

              <section className="newsletter-panel">
                <div className="eyebrow">Newsletter</div>
                <h3 className="panel-title">Recibe ofertas y novedades</h3>
                <p className="helper">
                  Descuentos exclusivos, lanzamientos y consejos para mantener tu tienda viva.
                </p>
                <div className="search-box" style=${{ marginTop: "12px" }}>
                  <span aria-hidden="true">@</span>
                  <input type="email" placeholder="Tu correo" />
                </div>
                <button
                  type="button"
                  className="primary-button"
                  style=${{ width: "100%", marginTop: "12px" }}
                  onClick=${() => setToast("Suscripción guardada en interfaz de demo.")}
                >
                  Suscribirme
                </button>
              </section>
            </aside>
          </div>
        </section>

        <section className="section">
          <div className="section__head">
            <div>
              <div className="eyebrow">Blog</div>
              <h2 className="section-title">Guía rápida de compra</h2>
            </div>
            <div className="section__meta">
              Un espacio para educar, mejorar SEO y conectar la tienda con contenido útil.
            </div>
          </div>

          <div id="blog" className="blog-grid">
            ${blogEntries.map(
              (entry) => html`
                <article className="blog-card" key=${entry.title}>
                  <h3>${entry.title}</h3>
                  <p>${entry.text}</p>
                </article>
              `,
            )}
          </div>
        </section>

        <section id="checkout" className="section">
          <div className="section__head">
            <div>
              <div className="eyebrow">Checkout</div>
              <h2 className="section-title">Completar pedido</h2>
            </div>
            <div className="section__meta">
              Flujo listo para pasarela real, inventario y notificaciones. Hoy funciona como checkout guiado.
            </div>
          </div>

          <div className="checkout-grid">
            <form className="checkout-form" onSubmit=${submitOrder}>
              <div className="field-grid">
                <div className="field">
                  <label htmlFor="name">Nombre completo</label>
                  <input
                    id="name"
                    type="text"
                    value=${checkout.name}
                    onChange=${(event) => setCheckout((current) => ({ ...current, name: event.target.value }))}
                  />
                </div>
                <div className="field">
                  <label htmlFor="phone">Teléfono</label>
                  <input
                    id="phone"
                    type="tel"
                    value=${checkout.phone}
                    onChange=${(event) => setCheckout((current) => ({ ...current, phone: event.target.value }))}
                  />
                </div>
              </div>

              <div className="field-grid">
                <div className="field">
                  <label htmlFor="email">Correo</label>
                  <input
                    id="email"
                    type="email"
                    value=${checkout.email}
                    onChange=${(event) => setCheckout((current) => ({ ...current, email: event.target.value }))}
                  />
                </div>
                <div className="field">
                  <label htmlFor="city">Ciudad</label>
                  <input
                    id="city"
                    type="text"
                    value=${checkout.city}
                    onChange=${(event) => setCheckout((current) => ({ ...current, city: event.target.value }))}
                  />
                </div>
              </div>

              <div className="field">
                <label htmlFor="address">Dirección</label>
                <input
                  id="address"
                  type="text"
                  value=${checkout.address}
                  onChange=${(event) => setCheckout((current) => ({ ...current, address: event.target.value }))}
                />
              </div>

              <div className="field-grid">
                <div className="field">
                  <label htmlFor="delivery">Método de entrega</label>
                  <select
                    id="delivery"
                    value=${checkout.delivery}
                    onChange=${(event) => setCheckout((current) => ({ ...current, delivery: event.target.value }))}
                  >
                    <option value="Express">Express</option>
                    <option value="Estándar">Estándar</option>
                    <option value="Recogida">Recogida en punto</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="payment">Método de pago</label>
                  <select
                    id="payment"
                    value=${checkout.payment}
                    onChange=${(event) => setCheckout((current) => ({ ...current, payment: event.target.value }))}
                  >
                    <option>Contra entrega</option>
                    <option>Transferencia</option>
                    <option>Tarjeta</option>
                  </select>
                </div>
              </div>

              <div className="field">
                <label htmlFor="notes">Notas del pedido</label>
                <textarea
                  id="notes"
                  value=${checkout.notes}
                  onChange=${(event) => setCheckout((current) => ({ ...current, notes: event.target.value }))}
                  placeholder="Horarios, instrucciones o requerimientos especiales"
                ></textarea>
              </div>

              <div className="helper">
                Usa esta sección para conectar luego tu backend, pasarela de pagos y confirmación por email o WhatsApp.
              </div>

              <div className="hero__actions">
                <button type="submit" className="primary-button">Confirmar pedido</button>
                <button type="button" className="secondary-button" onClick=${() => scrollToId("catalogo")}>
                  Seguir comprando
                </button>
              </div>
            </form>

            <aside className="order-card">
              <h3 className="panel-title">Resumen</h3>
              <div className="summary-grid">
                <div className="summary-line">
                  <span>Pedidos en carrito</span>
                  <span>${cartCount}</span>
                </div>
                <div className="summary-line">
                  <span>Subtotal</span>
                  <span>${money(cartSubtotal)}</span>
                </div>
                <div className="summary-line">
                  <span>Descuento</span>
                  <span>-${money(couponResult.discount)}</span>
                </div>
                <div className="summary-line">
                  <span>Envío</span>
                  <span>${money(deliveryFee)}</span>
                </div>
                <div className="divider"></div>
                <div className="summary-line">
                  <span>Total</span>
                  <span>${money(total)}</span>
                </div>
              </div>

              <div className="helper">
                ${cartItems.length
                  ? `${cartItems.length} producto(s) listos para finalizar.`
                  : "Aún no has agregado productos al carrito."}
              </div>

              ${order
                ? html`
                    <div className="success">
                      <strong>Pedido creado: ${order.id}</strong>
                      <div style=${{ marginTop: "8px" }}>
                        Recibido el ${order.createdAt}. Puedes enviar este pedido por WhatsApp o conectar tu backend.
                      </div>
                    </div>
                  `
                : null}
            </aside>
          </div>
        </section>

        <section className="section">
          <div className="section__head">
            <div>
              <div className="eyebrow">Preguntas</div>
              <h2 className="section-title">Soporte y dudas frecuentes</h2>
            </div>
            <div className="section__meta">Bloque útil para soporte, confianza y ventas asistidas.</div>
          </div>

          <div className="blog-grid">
            ${faqs.map(
              (item) => html`
                <article className="faq-card" key=${item.question}>
                  <h3>${item.question}</h3>
                  <p>${item.answer}</p>
                </article>
              `,
            )}
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer__grid">
          <div className="footer__brand">
            <div className="brand" style=${{ minWidth: "0" }}>
              <div className="brand__mark">${siteName.slice(0, 2)}</div>
              <div className="brand__copy">
                <div className="brand__name">${siteName}</div>
                <div className="brand__tag">Compra online de suplementos deportivos</div>
              </div>
            </div>
            <p>
              Catálogo funcional inspirado en tiendas de suplementos reales, con estructura editable para
              crecer a backend, pagos y logística.
            </p>
            <p>
              Soporte: <strong>${supportPhone}</strong>
            </p>
          </div>

          <div className="footer__column">
            <h4>Categorías</h4>
            <div className="footer__links">
              ${["Proteínas", "Creatinas", "Combos", "Oferta Semanal", "Obsequios"].map(
                (item) => html`<a href="#catalogo" onClick=${() => setCategory(item)} key=${item}>${item}</a>`,
              )}
            </div>
          </div>

          <div className="footer__column">
            <h4>Productos populares</h4>
            <div className="footer__links">
              ${recommendationCards.slice(0, 4).map(
                (item) => html`<a href="#catalogo" onClick=${() => openProduct(item.id)} key=${item.id}>${item.name}</a>`,
              )}
            </div>
          </div>

          <div className="footer__legal">
            <h4>Información</h4>
            <p>Política de privacidad, términos, PQRS y atención al cliente listos para conectar.</p>
            <div className="footer__links" style=${{ marginTop: "12px" }}>
              <a href="#inicio">Inicio</a>
              <a href="#catalogo">Productos</a>
              <a href="#marcas">Marcas</a>
              <a href="#blog">Blog</a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© 2026 ${siteName}. Todos los derechos reservados.</span>
          <span>Diseño original inspirado en una tienda de suplementos colombiana.</span>
        </div>
      </footer>
    </div>

    <a className="floating-whatsapp" href=${CONTACT_URL} target="_blank" rel="noreferrer">
      <span>WhatsApp</span>
      <strong>${supportPhone}</strong>
    </a>

    ${cartOpen
      ? html`
          <div className="backdrop" onClick=${() => setCartOpen(false)}></div>
          <aside className="drawer">
            <div className="drawer__head">
              <div>
                <div className="eyebrow">Carro</div>
                <h3 className="panel-title" style=${{ marginBottom: 0 }}>Resumen de compra</h3>
              </div>
              <button type="button" className="icon-button" onClick=${() => setCartOpen(false)}>
                ×
              </button>
            </div>
            <div className="drawer__body">
              <section className="cart-panel">
                <div className="cart-list">
                  ${cartItems.length
                    ? cartItems.map(
                        (item) => html`
                          <article className="cart-item" key=${item.key}>
                            <img className="cart-item__image" src=${item.product.image} alt=${item.product.name} />
                            <div className="cart-item__body">
                              <h3 className="cart-item__name">${item.product.name}</h3>
                              <div className="cart-item__meta">${item.variant || "Sin variante"}</div>
                              <div className="cart-item__meta">${money(item.product.price * item.qty)}</div>
                            </div>
                            <div className="cart-item__controls">
                              <div className="qty">
                                <button type="button" onClick=${() => updateQty(item.key, item.qty - 1)}>
                                  -
                                </button>
                                <strong>${item.qty}</strong>
                                <button type="button" onClick=${() => updateQty(item.key, item.qty + 1)}>
                                  +
                                </button>
                              </div>
                              <button type="button" className="ghost-button" onClick=${() => removeItem(item.key)}>
                                Quitar
                              </button>
                            </div>
                          </article>
                        `,
                      )
                    : html`<div className="helper">El carrito está vacío.</div>`}
                </div>
                <div className="summary-grid">
                  <div className="summary-line">
                    <span>Subtotal</span>
                    <span>${money(cartSubtotal)}</span>
                  </div>
                  <div className="summary-line">
                    <span>Descuento</span>
                    <span>-${money(couponResult.discount)}</span>
                  </div>
                  <div className="summary-line">
                    <span>Envío</span>
                    <span>${money(deliveryFee)}</span>
                  </div>
                  <div className="divider"></div>
                  <div className="summary-line">
                    <span>Total</span>
                    <span>${money(total)}</span>
                  </div>
                </div>
                <div className="cart-actions">
                  <button type="button" className="primary-button" onClick=${() => {
                    setCartOpen(false);
                    scrollToId("checkout");
                  }}>
                    Ir al checkout
                  </button>
                  <a className="secondary-button" href=${checkoutLink} target="_blank" rel="noreferrer">
                    Enviar por WhatsApp
                  </a>
                  <button type="button" className="ghost-button" onClick=${clearCart}>
                    Vaciar carrito
                  </button>
                </div>
              </section>
            </div>
          </aside>
        `
      : null}

    ${quickViewProduct
      ? html`
          <div className="quickview">
            <div className="backdrop" onClick=${() => setQuickViewId(null)}></div>
            <section className="quickview__card">
              <div className="quickview__inner">
                <div className="quickview__media">
                  <img src=${quickViewProduct.image} alt=${quickViewProduct.name} />
                </div>
                <div className="quickview__content">
                  <div className="eyebrow">${quickViewProduct.badge}</div>
                  <h2>${quickViewProduct.name}</h2>
                  <div className="muted">${quickViewProduct.brand} · ${quickViewProduct.category}</div>
                  <div className="price-row">
                    <div className="price">
                      <strong>${money(quickViewProduct.price)}</strong>
                      <del>${money(quickViewProduct.compareAt)}</del>
                    </div>
                    <div className="rating">★ ${quickViewProduct.rating} · ${quickViewProduct.reviews} reseñas</div>
                  </div>
                  <p>${quickViewProduct.description}</p>
                  <div className="quickview__options">
                    ${quickViewProduct.variants.map(
                      (variant) => html`
                        <button
                          key=${variant}
                          type="button"
                          className="variant ${selectedVariant === variant ? "is-active" : ""}"
                          onClick=${() => setSelectedVariant(variant)}
                        >
                          ${variant}
                        </button>
                      `,
                    )}
                  </div>
                  <div className="product-card__tags">
                    ${quickViewProduct.bullets.map((bullet) => html`<span key=${bullet} className="mini-tag">${bullet}</span>`)}
                  </div>
                  <div className="quickview__footer">
                    <div className="qty">
                      <button type="button" onClick=${() => setSelectedQty((value) => clamp(value - 1, 1, 9))}>
                        -
                      </button>
                      <strong>${selectedQty}</strong>
                      <button type="button" onClick=${() => setSelectedQty((value) => clamp(value + 1, 1, 9))}>
                        +
                      </button>
                    </div>
                    <div style=${{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                      <button type="button" className="primary-button" onClick=${addQuickView}>
                        Añadir a la cesta
                      </button>
                      <button type="button" className="secondary-button" onClick=${() => setQuickViewId(null)}>
                        Cerrar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        `
      : null}

    ${mobileMenuOpen
      ? html`
          <div className="backdrop" onClick=${() => setMobileMenuOpen(false)}></div>
          <aside className="drawer">
            <div className="drawer__head">
              <div>
                <div className="eyebrow">Menú</div>
                <h3 className="panel-title" style=${{ marginBottom: 0 }}>Navegación rápida</h3>
              </div>
              <button type="button" className="icon-button" onClick=${() => setMobileMenuOpen(false)}>
                ×
              </button>
            </div>
            <div className="drawer__body">
              ${navItems.map(
                (item) => html`
                  <button
                    type="button"
                    className="secondary-button"
                    key=${item}
                    onClick=${() => {
                      setMobileMenuOpen(false);
                      if (item === "Inicio") scrollToId("inicio");
                      if (item === "Productos") scrollToId("catalogo");
                      if (item === "Marcas") scrollToId("marcas");
                      if (item === "Combos") {
                        setCollection("Combos");
                        scrollToId("catalogo");
                      }
                      if (item === "Ofertas") {
                        setCollection("Todos");
                        setCategory("Oferta Semanal");
                        scrollToId("catalogo");
                      }
                      if (item === "Blog") scrollToId("blog");
                    }}
                  >
                    ${item}
                  </button>
                `,
              )}
            </div>
          </aside>
        `
      : null}

    ${toast ? html`<div className="toast">${toast}</div>` : null}
  `;
}

createRoot(document.getElementById("app")).render(html`<${App} />`);

/* ================================================================
   OLYMPIC PAINTS — Shopping Cart System
   Cart drawer, quantity controls, checkout flow
   ================================================================ */

const OP_CART = {
  items: [],

  init() {
    this.items = JSON.parse(localStorage.getItem('op_cart') || '[]');
    this.enhanceProductCards();
    this.bindProductModal();
    this.bindCommerceTools();
    this.bindPaymentOptions();
    this.bindEvents();
    this.updateBadge();
    this.renderDrawer();
    this.renderCheckout();
  },

  save() {
    localStorage.setItem('op_cart', JSON.stringify(this.items));
    this.updateBadge();
    this.renderCheckout();
  },

  getTotal() {
    return this.items.reduce((sum, item) => sum + item.price * item.qty, 0);
  },

  getCount() {
    return this.items.reduce((sum, item) => sum + item.qty, 0);
  },

  addItem(product) {
    const key = product.id + '-' + product.size;
    const existing = this.items.find(i => (i.id + '-' + i.size) === key);
    if (existing) {
      existing.qty += 1;
    } else {
      this.items.push({ ...product, qty: 1 });
    }
    this.save();
    this.renderDrawer();
    this.openDrawer();
  },

  updateQty(index, delta) {
    if (!this.items[index]) return;
    this.items[index].qty += delta;
    if (this.items[index].qty <= 0) this.items.splice(index, 1);
    this.save();
    this.renderDrawer();
  },

  removeItem(index) {
    this.items.splice(index, 1);
    this.save();
    this.renderDrawer();
  },

  clear() {
    this.items = [];
    this.save();
    this.renderDrawer();
  },

  money(value) {
    return 'R ' + Number(value || 0).toLocaleString();
  },

  getProductFromCard(card) {
    const sizeSelect = card?.querySelector('.size-select');
    const selectedOption = sizeSelect ? sizeSelect.options[sizeSelect.selectedIndex] : null;
    const button = card?.querySelector('.add-to-bag');
    return {
      id: card?.dataset.productId || card?.querySelector('h3')?.textContent || 'product',
      name: card?.querySelector('h3')?.textContent || 'Product',
      image: card?.querySelector('.product-card-image img')?.src || '',
      category: card?.querySelector('.product-category')?.textContent || '',
      size: selectedOption ? selectedOption.textContent : '5L',
      price: selectedOption ? parseInt(selectedOption.dataset.price, 10) : parseInt(button?.dataset.price || '0', 10)
    };
  },

  getProductStory(category = '', name = '') {
    if (category.includes('Equipment') || name.includes('Kit') || name.includes('Set')) {
      return 'Prepared for the practical side of a beautiful finish: cleaner lines, smoother application and fewer surprises on site.';
    }
    if (category.includes('Exterior') || category.includes('Roof')) {
      return 'Built for exterior light, weather and daily exposure, with colour direction that keeps the outside of the space feeling intentional.';
    }
    if (category.includes('Sample')) {
      return 'Made for testing colour in real light before committing, so every final tin starts with confidence.';
    }
    if (category.includes('Wood') || category.includes('Metal')) {
      return 'A finishing layer for the details that frame a room: trims, doors, furniture accents and hard-working surfaces.';
    }
    return 'Designed for the rooms people live in every day, balancing mood, colour depth and durable performance.';
  },

  enhanceProductCards() {
    document.querySelectorAll('.product-card').forEach((card) => {
      if (card.dataset.enhanced === 'true') return;
      card.dataset.enhanced = 'true';

      const category = card.querySelector('.product-category');
      const rating = card.querySelector('.product-rating');
      const sizeSelect = card.querySelector('.size-select');
      const addButton = card.querySelector('.add-to-bag');
      const categoryText = category?.textContent || '';
      const tags = categoryText.includes('Equipment')
        ? ['Prep ready', 'Trade feel']
        : categoryText.includes('Exterior') || categoryText.includes('Roof')
          ? ['Weather aware', 'Made for SA']
          : ['Colour-led', 'Designer guided'];

      if (category && !card.querySelector('.product-micro-copy')) {
        category.insertAdjacentHTML('afterend', `<div class="product-micro-copy">${tags.map(tag => `<span>${tag}</span>`).join('')}</div>`);
      }

      if (category && !card.querySelector('.product-story')) {
        const name = card.querySelector('h3')?.textContent || '';
        category.insertAdjacentHTML('afterend', `<p class="product-story">${this.getProductStory(categoryText, name)}</p>`);
      }

      if (rating && !card.querySelector('.product-live-price')) {
        rating.insertAdjacentHTML('afterend', '<div class="product-live-price"><span>Selected size</span><strong data-live-price></strong></div>');
      }

      if (addButton && !card.querySelector('.product-card-actions')) {
        const actions = document.createElement('div');
        actions.className = 'product-card-actions';
        addButton.parentNode.insertBefore(actions, addButton);
        actions.appendChild(addButton);
        const quick = document.createElement('button');
        quick.className = 'quick-view-btn';
        quick.type = 'button';
        quick.textContent = 'Details';
        quick.setAttribute('data-open-product-modal', '');
        actions.appendChild(quick);
      }

      const syncPrice = () => {
        const product = this.getProductFromCard(card);
        const price = card.querySelector('[data-live-price]');
        if (price) price.textContent = this.money(product.price);
        if (addButton) addButton.dataset.price = product.price;
      };

      sizeSelect?.addEventListener('change', syncPrice);
      syncPrice();
    });
  },

  bindProductModal() {
    const modal = document.querySelector('[data-product-modal]');
    if (!modal) return;

    const close = () => {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      modal._activeCard = null;
    };

    document.addEventListener('click', (event) => {
      const button = event.target.closest('[data-open-product-modal]');
      if (!button) return;
      const card = button.closest('.product-card');
      if (!card) return;
      const product = this.getProductFromCard(card);
      modal._activeCard = card;
      modal.querySelector('[data-quick-title]').textContent = product.name;
      modal.querySelector('[data-quick-category]').textContent = `${product.category} | ${product.size} | ${this.money(product.price)}`;
      const story = modal.querySelector('[data-quick-story]');
      if (story) story.textContent = this.getProductStory(product.category, product.name);
      const image = modal.querySelector('[data-quick-image]');
      if (image) {
        image.src = product.image;
        image.alt = product.name;
      }
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });

    modal.querySelector('[data-close-product-modal]')?.addEventListener('click', close);
    modal.addEventListener('click', (event) => {
      if (event.target === modal) close();
    });
    modal.querySelector('[data-quick-add]')?.addEventListener('click', () => {
      if (!modal._activeCard) return;
      this.addItem(this.getProductFromCard(modal._activeCard));
      close();
    });
  },

  bindCommerceTools() {
    const estimator = document.querySelector('[data-room-estimator]');
    const output = document.querySelector('[data-shop-estimate]');
    if (!estimator || !output) return;

    const copy = {
      small: 'Small room estimate: start with sample pots, 5L paint and a brush/prep set.',
      medium: 'Medium room estimate: start with 5L paint plus prep tools.',
      large: 'Large room estimate: compare 20L value options and add the roller kit.',
      exterior: 'Exterior project estimate: choose exterior coating, surface prep and weather-ready tools.'
    };

    estimator.addEventListener('change', () => {
      output.textContent = copy[estimator.value] || copy.medium;
    });
  },

  bindPaymentOptions() {
    const value = document.querySelector('[data-payment-value]');
    const options = document.querySelectorAll('[data-payment-choice]');
    const panels = document.querySelectorAll('[data-payment-panel]');
    if (!value || !options.length) return;

    function choose(method) {
      value.value = method;
      options.forEach((option) => {
        const selected = option.dataset.paymentChoice === method;
        option.classList.toggle('is-selected', selected);
        option.setAttribute('aria-pressed', String(selected));
      });
      panels.forEach((panel) => panel.classList.toggle('is-active', panel.dataset.paymentPanel === method));
      document.querySelectorAll('.checkout-progress span').forEach((step) => {
        step.classList.toggle('is-active', ['Bag', 'Details', 'Payment'].includes(step.textContent.trim()));
      });
      const submit = document.querySelector('[data-checkout-submit]');
      if (submit) {
        submit.textContent = method === 'Card payment'
          ? 'Place Order'
          : method === 'EFT request'
            ? 'Request EFT Invoice'
            : 'Reserve for Collection';
      }
    }

    document.addEventListener('click', (event) => {
      const option = event.target.closest('[data-payment-choice]');
      if (!option) return;
      choose(option.dataset.paymentChoice);
    });
  },

  /* --- Badge --------------------------------------------------- */
  updateBadge() {
    document.querySelectorAll('.cart-badge').forEach(badge => {
      const count = this.getCount();
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    });
  },

  /* --- Drawer -------------------------------------------------- */
  openDrawer() {
    const drawer = document.getElementById('cart-drawer');
    if (!drawer) return;
    drawer.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  },

  closeDrawer() {
    const drawer = document.getElementById('cart-drawer');
    if (!drawer) return;
    drawer.classList.remove('is-open');
    document.body.style.overflow = '';
  },

  renderDrawer() {
    const list = document.getElementById('cart-items');
    const subtotal = document.getElementById('cart-subtotal');
    const emptyMsg = document.getElementById('cart-empty');
    const footer = document.getElementById('cart-footer');
    if (!list) return;

    if (this.items.length === 0) {
      list.innerHTML = '';
      if (emptyMsg) emptyMsg.style.display = 'block';
      if (footer) footer.style.display = 'none';
      return;
    }

    if (emptyMsg) emptyMsg.style.display = 'none';
    if (footer) footer.style.display = 'block';

    list.innerHTML = this.items.map((item, i) => `
      <div class="cart-item">
        <div class="cart-item-image">
          <img src="${item.image}" alt="${item.name}" />
        </div>
        <div class="cart-item-details">
          <h4>${item.name}</h4>
          <p class="cart-item-variant">${item.size}</p>
          <div class="cart-item-controls">
            <div class="qty-control">
              <button type="button" onclick="OP_CART.updateQty(${i}, -1)" aria-label="Decrease quantity">&minus;</button>
              <span>${item.qty}</span>
              <button type="button" onclick="OP_CART.updateQty(${i}, 1)" aria-label="Increase quantity">&plus;</button>
            </div>
            <span class="cart-item-price">R ${(item.price * item.qty).toLocaleString()}</span>
            <button type="button" class="cart-item-remove" onclick="OP_CART.removeItem(${i})" aria-label="Remove item">&times;</button>
          </div>
        </div>
      </div>
    `).join('');

    const total = this.getTotal();
    if (subtotal) subtotal.textContent = this.money(total);
    const freeMessage = footer?.querySelector('.cart-free-shipping');
    if (freeMessage) {
      const remaining = Math.max(0, 1500 - total);
      freeMessage.innerHTML = `
        <span>${remaining === 0 ? 'Free shipping unlocked' : `${this.money(remaining)} away from free shipping`}</span>
        <i style="--cart-progress:${Math.min(100, Math.round((total / 1500) * 100))}%"></i>
      `;
    }
  },

  /* --- Checkout Page Rendering --------------------------------- */
  renderCheckout() {
    const list = document.getElementById('checkout-items');
    const subtotal = document.getElementById('checkout-subtotal');
    const shipping = document.getElementById('checkout-shipping');
    const total = document.getElementById('checkout-total');
    if (!list) return;

    if (this.items.length === 0) {
      list.innerHTML = '<p style="color:var(--muted);padding:20px 0">Your cart is empty. <a href="products.html" style="color:var(--ink);font-weight:800;text-decoration:underline;text-decoration-color:var(--olympic-yellow)">Continue shopping</a></p>';
      return;
    }

    list.innerHTML = this.items.map(item => `
      <div class="checkout-item">
        <img src="${item.image}" alt="${item.name}" />
        <div>
          <h4>${item.name}</h4>
          <p>${item.size} &times; ${item.qty}</p>
        </div>
        <span>${this.money(item.price * item.qty)}</span>
      </div>
    `).join('');

    const sub = this.getTotal();
    const ship = sub >= 1500 ? 0 : 150;
    if (subtotal) subtotal.textContent = this.money(sub);
    if (shipping) shipping.textContent = ship === 0 ? 'FREE' : this.money(ship);
    if (total) total.textContent = this.money(sub + ship);
  },

  /* --- Events -------------------------------------------------- */
  bindEvents() {
    // Cart toggle buttons
    document.querySelectorAll('[data-open-cart]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.openDrawer();
      });
    });

    document.querySelectorAll('[data-close-cart]').forEach(btn => {
      btn.addEventListener('click', () => this.closeDrawer());
    });

    // Close on backdrop click
    const drawer = document.getElementById('cart-drawer');
    if (drawer) {
      drawer.addEventListener('click', (e) => {
        if (e.target === drawer) this.closeDrawer();
      });
    }

    // Add-to-cart buttons on product cards
    document.querySelectorAll('.add-to-bag').forEach(btn => {
      btn.addEventListener('click', () => {
        const card = btn.closest('.product-card');
        if (!card) return;

        const product = this.getProductFromCard(card);

        this.addItem(product);

        // Visual feedback
        btn.textContent = 'Added!';
        btn.classList.add('is-added');
        setTimeout(() => {
          btn.textContent = 'Add to Bag';
          btn.classList.remove('is-added');
        }, 1200);
      });
    });

    // Checkout form submission
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
      checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleCheckout(checkoutForm);
      });
    }
  },

  handleCheckout(form) {
    const data = new FormData(form);
    const method = data.get('paymentMethod') || 'Card payment';
    const btn = form.querySelector('.checkout-submit');
    if (btn) {
      btn.textContent = method === 'Card payment' ? 'Authorising payment...' : 'Creating order...';
      btn.disabled = true;
    }

    // Simulate order processing
    setTimeout(() => {
      this.clear();
      const main = document.getElementById('main');
      if (main) {
        main.innerHTML = `
          <div class="page-shell" style="padding-top:80px">
            <div style="max-width:600px;margin:0 auto;padding:120px 24px;text-align:center">
              <div style="width:80px;height:80px;border-radius:50%;background:var(--sage);color:#fff;display:flex;align-items:center;justify-content:center;font-size:2.4rem;margin:0 auto 24px">&#10003;</div>
              <h1 style="font-family:var(--font-serif);font-size:2.8rem;margin-bottom:16px;color:var(--ink)">Order Confirmed</h1>
              <p style="color:var(--muted);font-size:1.05rem;line-height:1.7;margin-bottom:32px">Thank you for your order. A confirmation has been sent to <strong>${data.get('email')}</strong>. Payment method: <strong>${method}</strong>. Our team will prepare your Olympic Paints order and share the next update shortly.</p>
              <a href="products.html" class="button primary" style="display:inline-flex">Continue Shopping</a>
            </div>
          </div>
        `;
      }
    }, 1500);
  }
};

document.addEventListener('DOMContentLoaded', () => OP_CART.init());

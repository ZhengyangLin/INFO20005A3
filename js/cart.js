document.addEventListener('DOMContentLoaded', () => {
    // get product info on product detail page
    const productNameEl = document.querySelector('.name');
    const productPriceEl = document.querySelector('.price span:nth-child(2)');
    const productImageEl = document.querySelector('.goods-detail img');
    const quantityDisplays = document.querySelectorAll('.num');
    const addBtns = document.querySelectorAll('.add');
    const subtractBtns = document.querySelectorAll('.subtract');
    const addCartBtns = document.querySelectorAll('.add-cart');
    const params = new URLSearchParams(window.location.search);
    const productName = params.get('name');


    if (!productNameEl || !productPriceEl) return;

    // get extra product details
    const name = productNameEl.textContent.trim();
    const priceText = productPriceEl.textContent.replace('$', '').trim();
    const image = productImageEl?.src || '';
    const quantity = { value: 0 };

    // product prices
    const productCatalog = {
        'Digivice-25th': 259.99,
        'Nintendo alarmo': 159.99,
        'Nintendo Switch': 539.99,
        'Witch on the Holy Night': 99.99
    };

    // Determine final price
    const price = productCatalog[name] || parseFloat(priceText);

    // Update quantity
    const updateDisplay = () => {
        quantityDisplays.forEach(el => el.textContent = quantity.value);
    };

    // add button 
    addBtns.forEach(btn => btn.addEventListener('click', () => {
        quantity.value++;
        updateDisplay();
    }));

    // subtract button
    subtractBtns.forEach(btn => btn.addEventListener('click', () => {
        if (quantity.value > 0) {
            quantity.value--;
            updateDisplay();
        }
    }));

    // Add to Cart button
    addCartBtns.forEach(btn => btn.addEventListener('click', () => {
        if (quantity.value === 0) return alert('Select at least 1!');
        addToCart({ name, price, quantity: quantity.value, image, stock: 'In stock' });
        quantity.value = 0;
        updateDisplay();
    }));
});

// Add product to localStorage cart
function addToCart({ name, price, quantity, image = '', stock = 'In stock' }) {
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    if (cart[name]) {
        cart[name].quantity += quantity;
    } else {
        cart[name] = { price, quantity, image, stock };
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${name} added to cart!`);
}

// Update the cart icon with the total number of items
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    const totalItems = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('#cart-count').forEach(el => el.textContent = totalItems);
}

// Render the cart contents for both PC and mobile version
function renderCart() {
    const containerPC = document.getElementById('cart-items-pc');
    const containerMobile = document.getElementById('cart-items');
    if (!containerPC || !containerMobile) return;

    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    let total = 0;

    containerPC.innerHTML = '';
    containerMobile.innerHTML = '';

    for (const [name, item] of Object.entries(cart)) {
        total += item.price * item.quantity;
        const stockText = item.stock === 'In stock' ? '🟢 In stock' : '🔴 Out of stock';

        // PC version
        const pcHTML = `
            <div class="cart-item">
                <div class="left">
                    <img src="${item.image}" alt="">
                    <div class="goods-info">
                        <div class="name">${name}</div>
                        <div class="price">Price: $${item.price}</div>
                        <div class="stock">${stockText}</div>
                    </div>
                </div>
                <div class="center">
                    <div class="computed">
                        <div class="subtract" onclick="updateQuantity('${name}', -1)">—</div>
                        <div class="num">${item.quantity}</div>
                        <div class="add" onclick="updateQuantity('${name}', 1)">+</div>
                    </div>
                    <div class="remove" onclick="removeItem('${name}')">Remove</div>
                </div>
                <div class="right">$${(item.price * item.quantity).toFixed(2)}</div>
            </div>
            <hr/>
        `;

        // Mobile version
        const mobileHTML = `
            <div class="cart-item">
                <div class="left">
                    <img src="${item.image}" alt="">
                    <div class="goods-info">
                        <div class="name">${name}</div>
                        <div class="price">Price: $${item.price}</div>
                        <div class="stock">${stockText}</div>
                        <div class="center">
                            <div class="computed">
                                <div class="subtract" onclick="updateQuantity('${name}', -1)">—</div>
                                <div class="num">${item.quantity}</div>
                                <div class="add" onclick="updateQuantity('${name}', 1)">+</div>
                            </div>
                            <div class="remove" onclick="removeItem('${name}')">Remove</div>
                        </div>
                    </div>
                </div>
            </div>
            <hr/>
        `;

        containerPC.insertAdjacentHTML('beforeend', pcHTML);
        containerMobile.insertAdjacentHTML('beforeend', mobileHTML);
    }

    // Update total price
    document.getElementById('cart-pc-total').textContent = total.toFixed(2);
    document.getElementById('cart-total').textContent = total.toFixed(2);
    updateCartCount();
}

// Adjust the quantity of a specific item in the cart
function updateQuantity(name, delta) {
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    if (cart[name]) {
        cart[name].quantity += delta;
        if (cart[name].quantity <= 0) {
            delete cart[name];
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }
}

// Remove a product entirely from the cart
function removeItem(name) {
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    delete cart[name];
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

// Initialize cart view and count when the window is fully loaded
window.addEventListener('load', () => {
    renderCart();
    updateCartCount();
});







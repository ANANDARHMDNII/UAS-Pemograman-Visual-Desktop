// ========== CAPPUNABARA ORDERING SYSTEM ==========

// Menu Data - 25+ Items
const menuItems = [
    // Makanan (8 items)
    {
        id: 1,
        name: 'Nasi Goreng Spesial',
        category: 'makanan',
        price: 25000,
        image: '🍛',
        description: 'Nasi goreng dengan telur, ayam, dan sayuran segar',
        popular: true
    },
    {
        id: 2,
        name: 'Mie Goreng Seafood',
        category: 'makanan',
        price: 28000,
        image: '🍜',
        description: 'Mie goreng dengan udang, cumi, dan sayuran',
        popular: false
    },
    {
        id: 3,
        name: 'Ayam Bakar Madu',
        category: 'makanan',
        price: 32000,
        image: '🍗',
        description: 'Ayam bakar dengan saus madu spesial',
        popular: true
    },
    {
        id: 4,
        name: 'Soto Ayam',
        category: 'makanan',
        price: 22000,
        image: '🍲',
        description: 'Soto ayam kuning dengan soun dan telur',
        popular: false
    },
    {
        id: 5,
        name: 'Nasi Pecel',
        category: 'makanan',
        price: 18000,
        image: '🥗',
        description: 'Nasi dengan sayur rebus dan sambal pecel',
        popular: false
    },
    {
        id: 6,
        name: 'Bakso Sapi',
        category: 'makanan',
        price: 20000,
        image: '🍜',
        description: 'Bakso sapi jumbo dengan mie dan kuah gurih',
        popular: true
    },
    {
        id: 7,
        name: 'Nasi Rendang',
        category: 'makanan',
        price: 30000,
        image: '🍛',
        description: 'Nasi putih dengan rendang sapi empuk',
        popular: false
    },
    {
        id: 8,
        name: 'Gado-Gado',
        category: 'makanan',
        price: 19000,
        image: '🥗',
        description: 'Sayuran segar dengan bumbu kacang kental',
        popular: false
    },

    // Minuman (8 items)
    {
        id: 9,
        name: 'Es Teh Manis',
        category: 'minuman',
        price: 5000,
        image: '🧊',
        description: 'Teh manis dingin yang menyegarkan',
        popular: false
    },
    {
        id: 10,
        name: 'Es Jeruk Peras',
        category: 'minuman',
        price: 10000,
        image: '🍊',
        description: 'Jeruk peras segar dengan es batu',
        popular: false
    },
    {
        id: 11,
        name: 'Cappuccino Signature',
        category: 'minuman',
        price: 18000,
        image: '☕',
        description: 'Kopi cappuccino dengan foam lembut premium',
        popular: true
    },
    {
        id: 12,
        name: 'Bubble Tea',
        category: 'minuman',
        price: 22000,
        image: '🧋',
        description: 'Minuman boba dengan berbagai pilihan rasa',
        popular: true
    },
    {
        id: 13,
        name: 'Jus Alpukat',
        category: 'minuman',
        price: 15000,
        image: '🥑',
        description: 'Jus alpukat segar dengan cokelat',
        popular: false
    },
    {
        id: 14,
        name: 'Es Kelapa Muda',
        category: 'minuman',
        price: 12000,
        image: '🥥',
        description: 'Kelapa muda segar dengan air asli',
        popular: false
    },
    {
        id: 15,
        name: 'Latte Macchiato',
        category: 'minuman',
        price: 20000,
        image: '☕',
        description: 'Espresso dengan susu steamed berlapis',
        popular: false
    },
    {
        id: 16,
        name: 'Smoothie Bowl',
        category: 'minuman',
        price: 25000,
        image: '🍹',
        description: 'Smoothie buah dengan topping granola',
        popular: true
    },

    // Snacks (6 items)
    {
        id: 17,
        name: 'Kentang Goreng',
        category: 'snacks',
        price: 15000,
        image: '🍟',
        description: 'Kentang goreng crispy dengan saus special',
        popular: true
    },
    {
        id: 18,
        name: 'Pisang Goreng',
        category: 'snacks',
        price: 10000,
        image: '🍌',
        description: 'Pisang goreng crispy dengan madu',
        popular: false
    },
    {
        id: 19,
        name: 'Tahu Isi',
        category: 'snacks',
        price: 12000,
        image: '🥟',
        description: 'Tahu goreng isi sayur dan bumbu kacang',
        popular: false
    },
    {
        id: 20,
        name: 'Risol Mayo',
        category: 'snacks',
        price: 8000,
        image: '🥙',
        description: 'Risol isi sayur dengan mayonese',
        popular: false
    },
    {
        id: 21,
        name: 'Popcorn Caramel',
        category: 'snacks',
        price: 13000,
        image: '🍿',
        description: 'Popcorn caramel dan cheese blend',
        popular: true
    },
    {
        id: 22,
        name: 'Onion Rings',
        category: 'snacks',
        price: 16000,
        image: '🧅',
        description: 'Bawang bombay goreng tepung crispy',
        popular: false
    },

    // Desserts (7 items)
    {
        id: 23,
        name: 'Brownies Cokelat',
        category: 'desserts',
        price: 18000,
        image: '🍫',
        description: 'Brownies cokelat lembut premium',
        popular: true
    },
    {
        id: 24,
        name: 'Pancake Stack',
        category: 'desserts',
        price: 22000,
        image: '🥞',
        description: 'Pancake berlapis dengan sirup maple dan buah',
        popular: false
    },
    {
        id: 25,
        name: 'Ice Cream Sundae',
        category: 'desserts',
        price: 16000,
        image: '🍦',
        description: 'Es krim dengan topping cokelat dan cherry',
        popular: true
    },
    {
        id: 26,
        name: 'Tiramisu Slice',
        category: 'desserts',
        price: 25000,
        image: '🍰',
        description: 'Slice tiramisu dengan kopi dan mascarpone',
        popular: false
    },
    {
        id: 27,
        name: 'Donut Glaze',
        category: 'desserts',
        price: 12000,
        image: '🍩',
        description: 'Donut dengan berbagai topping manis',
        popular: false
    },
    {
        id: 28,
        name: 'Pudding Caramel',
        category: 'desserts',
        price: 10000,
        image: '🍮',
        description: 'Pudding lembut rasa karamel',
        popular: false
    },
    {
        id: 29,
        name: 'Cheesecake',
        category: 'desserts',
        price: 28000,
        image: '🧀',
        description: 'Cheesecake lembut dengan blueberry sauce',
        popular: true
    }
];

// Cart State
let cart = JSON.parse(localStorage.getItem('cappunabaraCart')) || [];
let currentCategory = 'all';
let searchQuery = '';

// ========== UTILITY FUNCTIONS ==========

// Format currency
function formatCurrency(amount) {
    return 'Rp ' + amount.toLocaleString('id-ID');
}

// Generate unique order number
function generateOrderNumber() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `CPB-${year}${month}${day}-${random}`;
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cappunabaraCart', JSON.stringify(cart));
}

// ========== CART FUNCTIONS ==========

// Add to cart
function addToCart(itemId) {
    const item = menuItems.find(i => i.id === itemId);
    const existingItem = cart.find(i => i.id === itemId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...item, quantity: 1 });
    }

    saveCart();
    updateCartUI();
    showNotification(`✅ ${item.name} ditambahkan ke keranjang!`);
}

// Remove from cart
function removeFromCart(itemId) {
    const item = cart.find(i => i.id === itemId);
    cart = cart.filter(i => i.id !== itemId);
    saveCart();
    updateCartUI();
    showNotification(`🗑️ ${item.name} dihapus dari keranjang`);
}

// Update quantity
function updateQuantity(itemId, change) {
    const item = cart.find(i => i.id === itemId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(itemId);
        } else {
            saveCart();
            updateCartUI();
        }
    }
}

// Clear cart
function clearCart() {
    if (confirm('Yakin ingin mengosongkan keranjang?')) {
        cart = [];
        saveCart();
        updateCartUI();
        showNotification('🧹 Keranjang dikosongkan');
    }
}

// Calculate totals
function calculateTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = Math.round(subtotal * 0.1);
    const total = subtotal + tax;
    return { subtotal, tax, total };
}

// ========== UI FUNCTIONS ==========

// Render menu
function renderMenu() {
    const menuGrid = document.getElementById('menuGrid');
    let filteredItems = menuItems;

    // Filter by category
    if (currentCategory !== 'all') {
        filteredItems = filteredItems.filter(item => item.category === currentCategory);
    }

    // Filter by search
    if (searchQuery) {
        filteredItems = filteredItems.filter(item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    if (filteredItems.length === 0) {
        menuGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">😔</div>
                <p style="font-size: 1.2rem; color: var(--text-medium);">Menu tidak ditemukan</p>
                <small style="color: var(--text-light);">Coba kata kunci lain atau pilih kategori berbeda</small>
            </div>
        `;
        return;
    }

    menuGrid.innerHTML = filteredItems.map((item, index) => `
        <div class="menu-card" style="animation-delay: ${index * 0.05}s">
            ${item.popular ? '<div class="menu-card-badge">🔥 Popular</div>' : ''}
            <div class="menu-card-image">${item.image}</div>
            <div class="menu-card-content">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
            </div>
            <div class="menu-card-footer">
                <div class="menu-price">${formatCurrency(item.price)}</div>
                <button class="btn-add" onclick="addToCart(${item.id})">
                    Tambah
                </button>
            </div>
        </div>
    `).join('');
}

// Update cart UI
function updateCartUI() {
    const cartBadge = document.getElementById('cartBadge');
    const cartItems = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    const cartFooter = document.getElementById('cartFooter');

    // Update badge
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.textContent = totalItems;

    if (cart.length === 0) {
        emptyCart.style.display = 'block';
        cartItems.style.display = 'none';
        cartFooter.style.display = 'none';
    } else {
        emptyCart.style.display = 'none';
        cartItems.style.display = 'flex';
        cartFooter.style.display = 'block';

        // Render cart items
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">${item.image}</div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${formatCurrency(item.price)}</div>
                    <div class="cart-item-actions">
                        <div class="quantity-controls">
                            <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">−</button>
                            <span class="qty-display">${item.quantity}</span>
                            <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        </div>
                        <button class="btn-remove" onclick="removeFromCart(${item.id})">Hapus</button>
                    </div>
                </div>
            </div>
        `).join('');

        // Update totals
        const { subtotal, tax, total } = calculateTotals();
        document.getElementById('subtotal').textContent = formatCurrency(subtotal);
        document.getElementById('tax').textContent = formatCurrency(tax);
        document.getElementById('total').textContent = formatCurrency(total);
    }
}

// Show notification (simple console log for now)
function showNotification(message) {
    console.log(message);
    // You can implement a toast notification here
}

// ========== CHECKOUT FUNCTIONS ==========

// Open checkout modal
function openCheckoutModal() {
    if (cart.length === 0) {
        alert('Keranjang masih kosong!');
        return;
    }

    const modal = document.getElementById('checkoutModal');
    const checkoutItems = document.getElementById('checkoutItems');

    // Render checkout items
    checkoutItems.innerHTML = cart.map(item => `
        <div class="checkout-item">
            <div>
                <div class="checkout-item-name">${item.image} ${item.name}</div>
                <div class="checkout-item-qty">${item.quantity}x ${formatCurrency(item.price)}</div>
            </div>
            <div>${formatCurrency(item.price * item.quantity)}</div>
        </div>
    `).join('');

    // Update totals
    const { subtotal, tax, total } = calculateTotals();
    document.getElementById('checkoutSubtotal').textContent = formatCurrency(subtotal);
    document.getElementById('checkoutTax').textContent = formatCurrency(tax);
    document.getElementById('checkoutTotal').textContent = formatCurrency(total);

    modal.classList.add('active');
    closeCart();
}

// Generate receipt
function generateReceipt(orderData) {
    const receiptModal = document.getElementById('receiptModal');
    const orderNo = generateOrderNumber();
    const now = new Date();

    // Set order info
    document.getElementById('receiptOrderNo').textContent = orderNo;
    document.getElementById('receiptDate').textContent = now.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });
    document.getElementById('receiptTime').textContent = now.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit'
    });
    document.getElementById('receiptName').textContent = orderData.name;
    document.getElementById('receiptTable').textContent = orderData.table;
    document.getElementById('receiptPayment').textContent = getPaymentMethodName(orderData.payment);

    // Render items
    const receiptItems = document.getElementById('receiptItems');
    receiptItems.innerHTML = cart.map(item => `
        <div class="receipt-item">
            <div>
                <div class="receipt-item-name">${item.image} ${item.name}</div>
                <div class="receipt-item-qty">${item.quantity} x ${formatCurrency(item.price)}</div>
            </div>
            <div class="receipt-item-price">${formatCurrency(item.price * item.quantity)}</div>
        </div>
    `).join('');

    // Update totals
    const { subtotal, tax, total } = calculateTotals();
    document.getElementById('receiptSubtotal').textContent = formatCurrency(subtotal);
    document.getElementById('receiptTax').textContent = formatCurrency(tax);
    document.getElementById('receiptGrandTotal').textContent = formatCurrency(total);

    // Show receipt
    receiptModal.classList.add('active');
}

// Get payment method name
function getPaymentMethodName(method) {
    const methods = {
        'cash': 'Tunai',
        'transfer': 'Transfer Bank',
        'ewallet': 'E-Wallet'
    };
    return methods[method] || method;
}

// Print receipt
function printReceipt() {
    window.print();
}

// Download PDF
function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const orderNo = document.getElementById('receiptOrderNo').textContent;
    const date = document.getElementById('receiptDate').textContent;
    const time = document.getElementById('receiptTime').textContent;
    const name = document.getElementById('receiptName').textContent;
    const table = document.getElementById('receiptTable').textContent;
    const payment = document.getElementById('receiptPayment').textContent;
    const { subtotal, tax, total } = calculateTotals();

    // Header
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('Cappunabara', 105, 20, { align: 'center' });

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Your Cozy Corner', 105, 27, { align: 'center' });

    // Order Info
    doc.setFontSize(10);
    let y = 40;
    doc.text(`No. Order: ${orderNo}`, 20, y);
    y += 6;
    doc.text(`Tanggal: ${date}`, 20, y);
    y += 6;
    doc.text(`Waktu: ${time}`, 20, y);
    y += 6;
    doc.text(`Nama: ${name}`, 20, y);
    y += 6;
    doc.text(`Meja: ${table}`, 20, y);
    y += 6;
    doc.text(`Pembayaran: ${payment}`, 20, y);

    // Line
    y += 8;
    doc.setLineWidth(0.5);
    doc.line(20, y, 190, y);

    // Items header
    y += 8;
    doc.setFont('helvetica', 'bold');
    doc.text('Item', 20, y);
    doc.text('Qty', 130, y);
    doc.text('Harga', 160, y, { align: 'right' });
    doc.text('Total', 190, y, { align: 'right' });

    y += 6;
    doc.setFont('helvetica', 'normal');

    // Items
    cart.forEach(item => {
        if (y > 270) {
            doc.addPage();
            y = 20;
        }

        doc.text(item.name, 20, y);
        doc.text(item.quantity.toString(), 130, y);
        doc.text(formatCurrency(item.price), 160, y, { align: 'right' });
        doc.text(formatCurrency(item.price * item.quantity), 190, y, { align: 'right' });
        y += 6;
    });

    // Line
    y += 4;
    doc.line(20, y, 190, y);
    y += 8;

    // Totals
    doc.text('Subtotal:', 130, y);
    doc.text(formatCurrency(subtotal), 190, y, { align: 'right' });
    y += 6;

    doc.text('Pajak (10%):', 130, y);
    doc.text(formatCurrency(tax), 190, y, { align: 'right' });
    y += 6;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('Total:', 130, y);
    doc.text(formatCurrency(total), 190, y, { align: 'right' });

    // Footer
    y += 15;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Terima kasih sudah memesan di Cappunabara!', 105, y, { align: 'center' });
    y += 6;
    doc.text('📞 0812-3456-7890 | 📧 hello@cappunabara.com', 105, y, { align: 'center' });
    y += 6;
    doc.text('Selamat menikmati!', 105, y, { align: 'center' });

    // Save
    doc.save(`Cappunabara_${orderNo}.pdf`);
}

// New order
function newOrder() {
    if (confirm('Mulai pesanan baru? Keranjang akan dikosongkan.')) {
        cart = [];
        saveCart();
        updateCartUI();
        closeReceipt();
        showNotification('✨ Siap untuk pesanan baru!');
    }
}

// ========== MODAL FUNCTIONS ==========

function openCart() {
    document.getElementById('cartSidebar').classList.add('active');
    document.getElementById('overlay').classList.add('active');
}

function closeCart() {
    document.getElementById('cartSidebar').classList.remove('active');
    document.getElementById('overlay').classList.remove('active');
}

function closeCheckout() {
    document.getElementById('checkoutModal').classList.remove('active');
}

function closeReceipt() {
    document.getElementById('receiptModal').classList.remove('active');
}

// ========== EVENT LISTENERS ==========

document.addEventListener('DOMContentLoaded', () => {
    // Initial render
    renderMenu();
    updateCartUI();

    // Category tabs
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentCategory = tab.getAttribute('data-category');
            renderMenu();
        });
    });

    // Search
    document.getElementById('searchInput').addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderMenu();
    });

    // Cart button
    document.getElementById('cartButton').addEventListener('click', openCart);
    document.getElementById('cartClose').addEventListener('click', closeCart);
    document.getElementById('overlay').addEventListener('click', closeCart);

    // Cart actions
    document.getElementById('btnClear').addEventListener('click', clearCart);
    document.getElementById('btnCheckout').addEventListener('click', openCheckoutModal);

    // Checkout form
    document.getElementById('checkoutForm').addEventListener('submit', (e) => {
        e.preventDefault();

        const orderData = {
            name: document.getElementById('customerName').value,
            table: document.getElementById('tableNumber').value,
            phone: document.getElementById('phoneNumber').value,
            payment: document.getElementById('paymentMethod').value,
            notes: document.getElementById('notes').value
        };

        closeCheckout();
        generateReceipt(orderData);

        // Reset form
        e.target.reset();
    });

    document.getElementById('checkoutClose').addEventListener('click', closeCheckout);

    // Receipt actions
    document.getElementById('receiptClose').addEventListener('click', closeReceipt);
    document.getElementById('btnPrint').addEventListener('click', printReceipt);
    document.getElementById('btnPDF').addEventListener('click', downloadPDF);
    document.getElementById('btnNewOrder').addEventListener('click', newOrder);
});

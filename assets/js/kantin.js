// ========== Cappunabara - Menu Data ==========
const menuItems = [
    // Makanan
    {
        id: 1,
        name: 'Nasi Goreng Spesial',
        category: 'makanan',
        price: 25000,
        image: '🍛',
        description: 'Nasi goreng dengan telur, ayam, dan sayuran segar'
    },
    {
        id: 2,
        name: 'Mie Goreng',
        category: 'makanan',
        price: 20000,
        image: '🍜',
        description: 'Mie goreng dengan bumbu rahasia kantin'
    },
    {
        id: 3,
        name: 'Ayam Bakar',
        category: 'makanan',
        price: 30000,
        image: '🍗',
        description: 'Ayam bakar bumbu kecap manis pedas'
    },
    {
        id: 4,
        name: 'Soto Ayam',
        category: 'makanan',
        price: 22000,
        image: '🍲',
        description: 'Soto ayam kuning dengan soun dan telur'
    },
    {
        id: 5,
        name: 'Nasi Pecel',
        category: 'makanan',
        price: 18000,
        image: '🥗',
        description: 'Nasi dengan sayur rebus dan sambal pecel'
    },
    {
        id: 6,
        name: 'Bakso',
        category: 'makanan',
        price: 15000,
        image: '🍜',
        description: 'Bakso sapi dengan mie dan kuah gurih'
    },

    // Minuman
    {
        id: 7,
        name: 'Es Teh Manis',
        category: 'minuman',
        price: 5000,
        image: '🧊',
        description: 'Teh manis dingin yang menyegarkan'
    },
    {
        id: 8,
        name: 'Es Jeruk',
        category: 'minuman',
        price: 8000,
        image: '🍊',
        description: 'Jeruk peras segar dengan es'
    },
    {
        id: 9,
        name: 'Cappuccino',
        category: 'minuman',
        price: 15000,
        image: '☕',
        description: 'Kopi cappuccino dengan foam lembut'
    },
    {
        id: 10,
        name: 'Bubble Tea',
        category: 'minuman',
        price: 20000,
        image: '🧋',
        description: 'Minuman boba dengan berbagai rasa'
    },
    {
        id: 11,
        name: 'Jus Alpukat',
        category: 'minuman',
        price: 12000,
        image: '🥑',
        description: 'Jus alpukat segar dengan cokelat'
    },
    {
        id: 12,
        name: 'Es Kelapa Muda',
        category: 'minuman',
        price: 10000,
        image: '🥥',
        description: 'Kelapa muda segar dengan es'
    },

    // Snacks
    {
        id: 13,
        name: 'Kentang Goreng',
        category: 'snacks',
        price: 12000,
        image: '🍟',
        description: 'Kentang goreng crispy dengan saus'
    },
    {
        id: 14,
        name: 'Pisang Goreng',
        category: 'snacks',
        price: 8000,
        image: '🍌',
        description: 'Pisang goreng crispy dengan madu'
    },
    {
        id: 15,
        name: 'Tahu Isi',
        category: 'snacks',
        price: 10000,
        image: '🥟',
        description: 'Tahu goreng isi sayur dan bumbu'
    },
    {
        id: 16,
        name: 'Risol Mayo',
        category: 'snacks',
        price: 7000,
        image: '🥙',
        description: 'Risol isi sayur dengan mayones'
    },
    {
        id: 17,
        name: 'Popcorn',
        category: 'snacks',
        price: 10000,
        image: '🍿',
        description: 'Popcorn caramel dan cheese'
    },

    // Desserts
    {
        id: 18,
        name: 'Brownies',
        category: 'desserts',
        price: 15000,
        image: '🍫',
        description: 'Brownies cokelat lembut premium'
    },
    {
        id: 19,
        name: 'Pancake',
        category: 'desserts',
        price: 18000,
        image: '🥞',
        description: 'Pancake dengan sirup maple dan buah'
    },
    {
        id: 20,
        name: 'Ice Cream',
        category: 'desserts',
        price: 12000,
        image: '🍦',
        description: 'Es krim vanilla, cokelat, dan strawberry'
    },
    {
        id: 21,
        name: 'Cake Slice',
        category: 'desserts',
        price: 20000,
        image: '🍰',
        description: 'Slice cake dengan berbagai rasa'
    },
    {
        id: 22,
        name: 'Donut',
        category: 'desserts',
        price: 10000,
        image: '🍩',
        description: 'Donut dengan topping beragam'
    },
    {
        id: 23,
        name: 'Pudding',
        category: 'desserts',
        price: 8000,
        image: '🍮',
        description: 'Pudding lembut rasa karamel'
    }
];

// ========== Cappunabara - Cart Management ==========
let cart = JSON.parse(localStorage.getItem('cappunabaraCart')) || [];

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cappunabaraCart', JSON.stringify(cart));
}

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
    showNotification('Item ditambahkan ke keranjang! 🎉');
}

// Remove from cart
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    saveCart();
    updateCartUI();
    showNotification('Item dihapus dari keranjang', 'warning');
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
        showNotification('Keranjang dikosongkan', 'warning');
    }
}

// Calculate totals
function calculateTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;
    return { subtotal, tax, total };
}

// Format currency
function formatCurrency(amount) {
    return 'Rp ' + amount.toLocaleString('id-ID');
}

// ========== UI Updates ==========

// Update cart UI
function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    const cartFooter = document.getElementById('cartFooter');

    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Show/hide empty cart message
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
                            <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
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

// Render menu items
function renderMenu(category = 'all') {
    const menuGrid = document.getElementById('menuGrid');
    const filteredItems = category === 'all'
        ? menuItems
        : menuItems.filter(item => item.category === category);

    menuGrid.innerHTML = filteredItems.map((item, index) => `
        <div class="menu-card" style="animation-delay: ${index * 0.05}s">
            <div class="menu-card-image">${item.image}</div>
            <div class="menu-card-content">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
            </div>
            <div class="menu-card-footer">
                <div class="menu-price">${formatCurrency(item.price)}</div>
                <button class="btn-add-cart" onclick="addToCart(${item.id})">
                    Tambah
                </button>
            </div>
        </div>
    `).join('');
}

// Show notification
function showNotification(message, type = 'success') {
    // Simple alert for now, can be enhanced with toast notification
    const emoji = type === 'success' ? '✅' : '⚠️';
    console.log(`${emoji} ${message}`);
}

// ========== Category Tabs ==========
function initCategoryTabs() {
    const tabs = document.querySelectorAll('.tab-button');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');
            // Render menu for selected category
            const category = tab.getAttribute('data-category');
            renderMenu(category);
        });
    });
}

// ========== Cart Sidebar ==========
function initCartSidebar() {
    const cartToggle = document.getElementById('cartToggle');
    const cartClose = document.getElementById('cartClose');
    const cartSidebar = document.getElementById('cartSidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    function openCart() {
        cartSidebar.classList.add('active');
        sidebarOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeCart() {
        cartSidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    cartToggle.addEventListener('click', openCart);
    cartClose.addEventListener('click', closeCart);
    sidebarOverlay.addEventListener('click', closeCart);
}

// ========== Checkout & Receipt ==========
function initCheckout() {
    const checkoutBtn = document.getElementById('checkoutBtn');
    const clearCartBtn = document.getElementById('clearCart');

    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Keranjang masih kosong!');
            return;
        }
        generateReceipt();
    });

    clearCartBtn.addEventListener('click', clearCart);
}

// Generate receipt
function generateReceipt() {
    const receiptModal = document.getElementById('receiptModal');
    const receiptItems = document.getElementById('receiptItems');

    // Generate order number
    const orderNumber = 'CPB' + Date.now().toString().slice(-8);
    const now = new Date();
    const date = now.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });
    const time = now.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit'
    });

    // Update receipt header
    document.getElementById('orderNumber').textContent = orderNumber;
    document.getElementById('orderDate').textContent = date;
    document.getElementById('orderTime').textContent = time;

    // Render receipt items
    receiptItems.innerHTML = cart.map(item => `
        <div class="receipt-item">
            <div class="receipt-item-details">
                <div class="receipt-item-name">${item.image} ${item.name}</div>
                <div class="receipt-item-qty">${item.quantity}x ${formatCurrency(item.price)}</div>
            </div>
            <div class="receipt-item-price">${formatCurrency(item.price * item.quantity)}</div>
        </div>
    `).join('');

    // Update totals
    const { subtotal, tax, total } = calculateTotals();
    document.getElementById('receiptSubtotal').textContent = formatCurrency(subtotal);
    document.getElementById('receiptTax').textContent = formatCurrency(tax);
    document.getElementById('receiptTotal').textContent = formatCurrency(total);

    // Show modal
    receiptModal.classList.add('active');

    // Close cart sidebar
    document.getElementById('cartSidebar').classList.remove('active');
    document.getElementById('sidebarOverlay').classList.remove('active');
}

// ========== Receipt Modal ==========
function initReceiptModal() {
    const receiptModal = document.getElementById('receiptModal');
    const closeReceipt = document.getElementById('closeReceipt');
    const printReceipt = document.getElementById('printReceipt');
    const downloadPDF = document.getElementById('downloadPDF');

    closeReceipt.addEventListener('click', () => {
        receiptModal.classList.remove('active');
        document.body.style.overflow = '';
    });

    receiptModal.addEventListener('click', (e) => {
        if (e.target === receiptModal) {
            receiptModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    printReceipt.addEventListener('click', () => {
        window.print();
    });

    downloadPDF.addEventListener('click', generatePDF);
}

// Generate PDF
function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Get receipt data
    const orderNumber = document.getElementById('orderNumber').textContent;
    const orderDate = document.getElementById('orderDate').textContent;
    const orderTime = document.getElementById('orderTime').textContent;
    const { subtotal, tax, total } = calculateTotals();

    // Set font
    doc.setFont('helvetica');

    // Header
    doc.setFontSize(20);
    doc.setFont(undefined, 'bold');
    doc.text('Cappunabara', 105, 20, { align: 'center' });

    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');
    doc.text('Struk Pembelian', 105, 28, { align: 'center' });

    // Order info
    doc.setFontSize(10);
    doc.text`No. Order: ${orderNumber}`, 20, 40);
    doc.text(`Tanggal: ${orderDate}`, 20, 46);
    doc.text(`Waktu: ${orderTime}`, 20, 52);

    // Line
    doc.setLineWidth(0.5);
    doc.line(20, 58, 190, 58);

    // Items
    let yPos = 68;
    doc.setFont(undefined, 'bold');
    doc.text('Item', 20, yPos);
    doc.text('Qty', 130, yPos);
    doc.text('Harga', 160, yPos, { align: 'right' });
    doc.text('Total', 190, yPos, { align: 'right' });

    yPos += 6;
    doc.setFont(undefined, 'normal');

    cart.forEach(item => {
        if (yPos > 270) {
            doc.addPage();
            yPos = 20;
        }

        doc.text(item.name, 20, yPos);
        doc.text(item.quantity.toString(), 130, yPos);
        doc.text(formatCurrency(item.price), 160, yPos, { align: 'right' });
        doc.text(formatCurrency(item.price * item.quantity), 190, yPos, { align: 'right' });
        yPos += 6;
    });

    // Line
    yPos += 4;
    doc.line(20, yPos, 190, yPos);
    yPos += 8;

    // Totals
    doc.text('Subtotal:', 130, yPos);
    doc.text(formatCurrency(subtotal), 190, yPos, { align: 'right' });
    yPos += 6;

    doc.text('Pajak (10%):', 130, yPos);
    doc.text(formatCurrency(tax), 190, yPos, { align: 'right' });
    yPos += 6;

    doc.setFont(undefined, 'bold');
    doc.setFontSize(12);
    doc.text('Total:', 130, yPos);
    doc.text(formatCurrency(total), 190, yPos, { align: 'right' });

    // Footer
    yPos += 15;
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text('Terima kasih atas kunjungan Anda!', 105, yPos, { align: 'center' });
    doc.text('Selamat menikmati!', 105, yPos + 6, { align: 'center' });

    // Save PDF
    doc.save(`Receipt_Cappunabara_${orderNumber}.pdf`);
}

// ========== Initialization ==========
document.addEventListener('DOMContentLoaded', () => {
    // Render initial menu (all items)
    renderMenu('all');

    // Initialize components
    initCategoryTabs();
    initCartSidebar();
    initCheckout();
    initReceiptModal();

    // Update cart UI on load
    updateCartUI();
});

// ========== CAPPUNABARA ORDERING SYSTEM - CLEAN VERSION ==========

// Menu Data - 29 Items
const menu = {
    coffee: [
        { id: 1, name: "Cappuccino Signature", price: 35000, image: "☕", description: "Espresso premium dengan susu lembut dan foam sempurna", category: "coffee" },
        { id: 2, name: "Caffe Latte", price: 32000, image: "☕", description: "Espresso dengan steamed milk yang creamy", category: "coffee" },
        { id: 3, name: "Americano", price: 28000, image: "☕", description: "Espresso shot dengan air panas, bold dan rich", category: "coffee" },
        { id: 4, name: "Mocha Delight", price: 38000, image: "☕", description: "Perpaduan espresso, coklat, dan whipped cream", category: "coffee" },
        { id: 5, name: "Macchiato", price: 36000, image: "☕", description: "Espresso dengan sedikit steamed milk foam", category: "coffee" },
        { id: 6, name: "Flat White", price: 34000, image: "☕", description: "Double shot espresso dengan microfoam halus", category: "coffee" },
        { id: 7, name: "Affogato", price: 42000, image: "☕", description: "Vanilla ice cream dengan espresso shot", category: "coffee" },
        { id: 8, name: "Cold Brew", price: 30000, image: "🧊", description: "Kopi dingin dengan ekstraksi 12 jam", category: "coffee" }
    ],
    tea: [
        { id: 9, name: "Earl Grey Premium", price: 25000, image: "🍵", description: "Teh hitam dengan aroma bergamot", category: "tea" },
        { id: 10, name: "Jasmine Green Tea", price: 23000, image: "🍵", description: "Teh hijau dengan bunga melati", category: "tea" },
        { id: 11, name: "Chamomile Honey", price: 27000, image: "🍵", description: "Teh chamomile dengan madu alami", category: "tea" },
        { id: 12, name: "Oolong Traditional", price: 26000, image: "🍵", description: "Teh oolong dengan rasa yang kompleks", category: "tea" },
        { id: 13, name: "Mint Fresh Tea", price: 24000, image: "🍵", description: "Teh herbal dengan daun mint segar", category: "tea" }
    ],
    bubble: [
        { id: 14, name: "Brown Sugar Bubble", price: 32000, image: "🧋", description: "Bubble tea dengan brown sugar dan pearl", category: "bubble" },
        { id: 15, name: "Taro Milk Tea", price: 30000, image: "🧋", description: "Milk tea rasa taro dengan topping pilihan", category: "bubble" },
        { id: 16, name: "Matcha Bubble", price: 34000, image: "🧋", description: "Matcha premium dengan bubble dan cream", category: "bubble" },
        { id: 17, name: "Thai Tea Bubble", price: 31000, image: "🧋", description: "Thai tea dengan condensed milk dan pearl", category: "bubble" },
        { id: 18, name: "Strawberry Bubble", price: 29000, image: "🧋", description: "Fresh strawberry dengan popping boba", category: "bubble" }
    ],
    dessert: [
        { id: 19, name: "Tiramisu Slice", price: 45000, image: "🍰", description: "Tiramisu klasik dengan mascarpone", category: "dessert" },
        { id: 20, name: "Cheesecake Blueberry", price: 42000, image: "🍰", description: "New York cheesecake dengan blueberry", category: "dessert" },
        { id: 21, name: "Chocolate Lava Cake", price: 48000, image: "🍰", description: "Warm chocolate cake dengan molten center", category: "dessert" },
        { id: 22, name: "Red Velvet Cupcake", price: 35000, image: "🧁", description: "Cupcake red velvet dengan cream cheese", category: "dessert" },
        { id: 23, name: "Macarons Set", price: 55000, image: "🍪", description: "Set 6 macaron dengan berbagai rasa", category: "dessert" },
        { id: 24, name: "Croissant Almond", price: 28000, image: "🥐", description: "Croissant butter dengan almond filling", category: "dessert" }
    ],
    food: [
        { id: 25, name: "Caesar Salad", price: 38000, image: "🥗", description: "Salad segar dengan dressing caesar", category: "food" },
        { id: 26, name: "Club Sandwich", price: 45000, image: "🥪", description: "Triple layer sandwich dengan chicken", category: "food" },
        { id: 27, name: "Pasta Carbonara", price: 52000, image: "🍝", description: "Pasta dengan creamy carbonara sauce", category: "food" },
        { id: 28, name: "Chicken Wrap", price: 40000, image: "🌯", description: "Grilled chicken dengan fresh vegetables", category: "food" },
        { id: 29, name: "Avocado Toast", price: 35000, image: "🥑", description: "Sourdough dengan avocado dan poached egg", category: "food" }
    ]
};

// Cart Management
let cart = [];
let currentCategory = 'all';

// Order History and Customer Data
let orderHistory = JSON.parse(localStorage.getItem('cappunabara_order_history')) || [];
let customerData = JSON.parse(localStorage.getItem('cappunabara_customer_data')) || {};

// Save data to localStorage
function saveToLocalStorage() {
    localStorage.setItem('cappunabara_order_history', JSON.stringify(orderHistory));
    localStorage.setItem('cappunabara_customer_data', JSON.stringify(customerData));
}

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    console.log('Cappunabara Order System Loading...');
    displayMenu('all');
    updateCartDisplay();
    setupEventListeners();
    
    // Handle reorder from history page
    handleReorderFromHistory();
    
    console.log('Cappunabara Order System Loaded Successfully!');
});

// Setup Event Listeners - Updated with PDF support
// (Function moved to end of file with PDF functionality)

// Display Menu Items
function displayMenu(category) {
    console.log('Displaying menu for category:', category);
    const menuGrid = document.getElementById('menuGrid');
    if (!menuGrid) {
        console.error('Menu grid not found!');
        return;
    }

    let itemsToShow = [];
    
    if (category === 'all') {
        Object.values(menu).forEach(categoryItems => {
            itemsToShow = itemsToShow.concat(categoryItems);
        });
    } else {
        itemsToShow = menu[category] || [];
    }

    console.log('Items to show:', itemsToShow.length);

    menuGrid.innerHTML = itemsToShow.map(item => {
        // Get aesthetic SVG image for the item
        const aestheticImage = typeof getMenuImage === 'function' 
            ? getMenuImage(item.name, item.category) 
            : item.image;
        
        return `
            <div class="menu-card" data-id="${item.id}">
                <div class="menu-card-image">${aestheticImage}</div>
                <div class="menu-card-content">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                </div>
                <div class="menu-card-footer">
                    <span class="menu-price">Rp ${item.price.toLocaleString('id-ID')}</span>
                    <button class="btn-add" onclick="addToCart(${item.id})">
                        🛒 Tambah
                    </button>
                </div>
            </div>
        `;
    }).join('');
    
    console.log('Menu displayed successfully');
}

// Set Active Category
function setActiveCategory(category) {
    const categoryButtons = document.querySelectorAll('.category-tab');
    categoryButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        }
    });
    currentCategory = category;
}

// Add Item to Cart
function addToCart(itemId) {
    let item = null;
    Object.values(menu).forEach(categoryItems => {
        const foundItem = categoryItems.find(menuItem => menuItem.id === itemId);
        if (foundItem) item = foundItem;
    });

    if (!item) return;

    const existingItem = cart.find(cartItem => cartItem.id === itemId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...item,
            quantity: 1
        });
    }

    updateCartDisplay();
    showNotification('Item ditambahkan ke keranjang!');
}

// Update Cart Display
function updateCartDisplay() {
    const cartBadge = document.getElementById('cartBadge');
    const cartItems = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    const cartFooter = document.getElementById('cartFooter');

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Update badge
    if (cartBadge) {
        cartBadge.textContent = totalItems;
        cartBadge.style.display = totalItems > 0 ? 'flex' : 'none';
    }

    // Update cart content
    if (cart.length === 0) {
        if (emptyCart) emptyCart.style.display = 'block';
        if (cartItems) cartItems.style.display = 'none';
        if (cartFooter) cartFooter.style.display = 'none';
    } else {
        if (emptyCart) emptyCart.style.display = 'none';
        if (cartItems) cartItems.style.display = 'block';
        if (cartFooter) cartFooter.style.display = 'block';

        if (cartItems) {
            cartItems.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <div class="cart-item-image">${item.image}</div>
                    <div class="cart-item-details">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">Rp ${item.price.toLocaleString('id-ID')}</div>
                        <div class="cart-item-actions">
                            <div class="quantity-controls">
                                <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                                <span class="qty-display">${item.quantity}</span>
                                <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                            </div>
                            <button class="btn-remove" onclick="removeFromCart(${item.id})">🗑️</button>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        // Update totals
        const subtotal = document.getElementById('subtotal');
        const tax = document.getElementById('tax');
        const total = document.getElementById('total');
        
        const taxAmount = totalPrice * 0.1;
        const finalTotal = totalPrice + taxAmount;

        if (subtotal) subtotal.textContent = `Rp ${totalPrice.toLocaleString('id-ID')}`;
        if (tax) tax.textContent = `Rp ${taxAmount.toLocaleString('id-ID')}`;
        if (total) total.textContent = `Rp ${finalTotal.toLocaleString('id-ID')}`;
    }
}

// Update Quantity
function updateQuantity(itemId, change) {
    const item = cart.find(cartItem => cartItem.id === itemId);
    if (!item) return;

    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(itemId);
    } else {
        updateCartDisplay();
    }
}

// Remove from Cart
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartDisplay();
}

// Clear Cart
function clearCart() {
    cart = [];
    updateCartDisplay();
    showNotification('Keranjang dikosongkan');
}

// Toggle Cart
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('overlay');
    
    if (cartSidebar && overlay) {
        cartSidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    }
}

// Close Cart
function closeCart() {
    console.log('Closing cart...');
    const cartSidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('overlay');
    
    if (cartSidebar && overlay) {
        cartSidebar.classList.remove('active');
        overlay.classList.remove('active');
        console.log('Cart closed');
    }
}

// Open Checkout Modal
function openCheckoutModal() {
    if (cart.length === 0) return;
    
    closeCart();
    
    const checkoutModal = document.getElementById('checkoutModal');
    const overlay = document.getElementById('overlay');
    
    if (checkoutModal && overlay) {
        checkoutModal.classList.add('active');
        overlay.classList.add('active');
        
        updateCheckoutSummary();
        
        // Auto-fill customer data if available
        if (customerData.name) {
            const customerNameInput = document.getElementById('customerName');
            if (customerNameInput) customerNameInput.value = customerData.name;
        }
        
        if (customerData.phone) {
            const phoneNumberInput = document.getElementById('phoneNumber');
            if (phoneNumberInput) phoneNumberInput.value = customerData.phone;
        }
    }
}

// Update Checkout Summary
function updateCheckoutSummary() {
    const checkoutItems = document.getElementById('checkoutItems');
    const checkoutSubtotal = document.getElementById('checkoutSubtotal');
    const checkoutTax = document.getElementById('checkoutTax');
    const checkoutTotal = document.getElementById('checkoutTotal');

    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const taxAmount = totalPrice * 0.1;
    const finalTotal = totalPrice + taxAmount;

    if (checkoutItems) {
        checkoutItems.innerHTML = cart.map(item => `
            <div class="checkout-item">
                <div class="checkout-item-name">${item.name} x${item.quantity}</div>
                <div class="checkout-item-price">Rp ${(item.price * item.quantity).toLocaleString('id-ID')}</div>
            </div>
        `).join('');
    }

    if (checkoutSubtotal) checkoutSubtotal.textContent = `Rp ${totalPrice.toLocaleString('id-ID')}`;
    if (checkoutTax) checkoutTax.textContent = `Rp ${taxAmount.toLocaleString('id-ID')}`;
    if (checkoutTotal) checkoutTotal.textContent = `Rp ${finalTotal.toLocaleString('id-ID')}`;
}

// Handle Checkout
function handleCheckout(e) {
    e.preventDefault();
    
    console.log('Starting checkout process...');
    
    const formData = new FormData(e.target);
    const customerInfo = {
        name: formData.get('customerName') || document.getElementById('customerName').value,
        table: formData.get('tableNumber') || document.getElementById('tableNumber').value,
        phone: formData.get('phoneNumber') || document.getElementById('phoneNumber').value,
        payment: formData.get('paymentMethod') || document.getElementById('paymentMethod').value,
        notes: formData.get('notes') || document.getElementById('notes').value
    };

    console.log('Customer info:', customerInfo);
    console.log('Cart items:', cart);

    const orderData = {
        id: 'CAF' + Date.now().toString().slice(-6),
        customer: customerInfo,
        items: [...cart], // Create a copy of cart
        timestamp: new Date().toISOString(), // Use ISO string for better compatibility
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        status: 'completed'
    };

    console.log('Order data created:', orderData);

    // Update customer data
    customerData = {
        ...customerData,
        name: customerInfo.name,
        phone: customerInfo.phone,
        lastOrderDate: new Date().toISOString(),
        totalOrders: (customerData.totalOrders || 0) + 1,
        totalSpent: (customerData.totalSpent || 0) + orderData.total
    };

    console.log('Customer data updated:', customerData);

    // Add to order history
    orderHistory.unshift(orderData); // Add to beginning of array
    
    // Keep only last 50 orders
    if (orderHistory.length > 50) {
        orderHistory = orderHistory.slice(0, 50);
    }

    console.log('Order history updated:', orderHistory.length, 'orders');

    // Save to localStorage
    try {
        saveToLocalStorage();
        console.log('Data saved to localStorage successfully');
        
        // Verify data was saved
        const savedHistory = localStorage.getItem('cappunabara_order_history');
        const savedCustomer = localStorage.getItem('cappunabara_customer_data');
        console.log('Verification - History saved:', savedHistory ? JSON.parse(savedHistory).length : 0, 'orders');
        console.log('Verification - Customer saved:', savedCustomer ? 'Yes' : 'No');
        
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        showNotification('Error menyimpan data pesanan', 'error');
        return;
    }

    // Update history badge
    updateHistoryBadge();

    // Show success notification
    showNotification(`Pesanan ${orderData.id} berhasil dibuat! 🎉`);

    // Show receipt
    showReceipt(orderData);
    
    // Clear cart
    cart = [];
    updateCartDisplay();
    
    // Close checkout modal
    const checkoutModal = document.getElementById('checkoutModal');
    if (checkoutModal) checkoutModal.classList.remove('active');
    
    console.log('Checkout process completed');
}

// Save Order Data manually
function saveOrderData() {
    if (cart.length === 0) {
        showNotification('Keranjang kosong! Tambahkan item terlebih dahulu.', 'error');
        return;
    }
    
    // Get customer info from form
    const customerName = document.getElementById('customerName').value;
    const tableNumber = document.getElementById('tableNumber').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const paymentMethod = document.getElementById('paymentMethod').value;
    const notes = document.getElementById('notes').value;
    
    if (!customerName || !tableNumber || !paymentMethod) {
        showNotification('Mohon lengkapi data pelanggan terlebih dahulu!', 'error');
        return;
    }
    
    const customerInfo = {
        name: customerName,
        table: tableNumber,
        phone: phoneNumber,
        payment: paymentMethod,
        notes: notes
    };

    const orderData = {
        id: 'CAF' + Date.now().toString().slice(-6),
        customer: customerInfo,
        items: [...cart],
        timestamp: new Date().toISOString(),
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        status: 'completed'
    };

    // Update customer data
    customerData = {
        ...customerData,
        name: customerInfo.name,
        phone: customerInfo.phone,
        lastOrderDate: new Date().toISOString(),
        totalOrders: (customerData.totalOrders || 0) + 1,
        totalSpent: (customerData.totalSpent || 0) + orderData.total
    };

    // Add to order history
    orderHistory.unshift(orderData);
    
    // Keep only last 50 orders
    if (orderHistory.length > 50) {
        orderHistory = orderHistory.slice(0, 50);
    }

    // Save to localStorage
    try {
        saveToLocalStorage();
        console.log('Manual save completed successfully');
        
        // Force update all systems
        updateHistoryBadge();
        
        // Show success notification
        showNotification(`Data pesanan ${orderData.id} berhasil disimpan! 💾`, 'success');
        
        // Trigger storage event to update other tabs/pages
        window.dispatchEvent(new StorageEvent('storage', {
            key: 'cappunabara_order_history',
            newValue: JSON.stringify(orderHistory)
        }));
        
        window.dispatchEvent(new StorageEvent('storage', {
            key: 'cappunabara_customer_data',
            newValue: JSON.stringify(customerData)
        }));
        
    } catch (error) {
        console.error('Error saving order data:', error);
        showNotification('Error menyimpan data pesanan', 'error');
    }
}

// Show Receipt
function showReceipt(orderData) {
    const receiptModal = document.getElementById('receiptModal');
    const overlay = document.getElementById('overlay');
    
    if (!receiptModal || !overlay) return;
    
    // Update receipt content
    document.getElementById('receiptOrderNo').textContent = orderData.id;
    document.getElementById('receiptDate').textContent = orderData.timestamp.toLocaleDateString('id-ID');
    document.getElementById('receiptTime').textContent = orderData.timestamp.toLocaleTimeString('id-ID');
    document.getElementById('receiptName').textContent = orderData.customer.name;
    document.getElementById('receiptTable').textContent = orderData.customer.table;
    document.getElementById('receiptPayment').textContent = orderData.customer.payment;
    
    const receiptItems = document.getElementById('receiptItems');
    if (receiptItems) {
        receiptItems.innerHTML = orderData.items.map(item => `
            <div class="receipt-item">
                <div class="receipt-item-name">${item.name}</div>
                <div class="receipt-item-qty">x${item.quantity}</div>
                <div class="receipt-item-price">Rp ${(item.price * item.quantity).toLocaleString('id-ID')}</div>
            </div>
        `).join('');
    }
    
    const taxAmount = orderData.total * 0.1;
    const finalTotal = orderData.total + taxAmount;
    
    document.getElementById('receiptSubtotal').textContent = `Rp ${orderData.total.toLocaleString('id-ID')}`;
    document.getElementById('receiptTax').textContent = `Rp ${taxAmount.toLocaleString('id-ID')}`;
    document.getElementById('receiptGrandTotal').textContent = `Rp ${finalTotal.toLocaleString('id-ID')}`;
    
    receiptModal.classList.add('active');
    overlay.classList.add('active');
}

// Enhanced Print Function - Professional PDF-Ready Receipt
function printReceipt() {
    console.log('printReceipt called');
    
    // Try to use the new PDF generator first
    if (typeof window.downloadStrukPDF === 'function') {
        // Get order data from the receipt modal
        const orderData = getOrderDataFromReceipt();
        if (orderData) {
            window.downloadStrukPDF(orderData);
            return;
        }
    }
    
    // Fallback to original HTML print method
    printReceiptHTML();
}

// Get order data from receipt modal
function getOrderDataFromReceipt() {
    try {
        const orderNo = document.getElementById('receiptOrderNo')?.textContent || '';
        const name = document.getElementById('receiptName')?.textContent || '';
        const table = document.getElementById('receiptTable')?.textContent || '';
        const payment = document.getElementById('receiptPayment')?.textContent || '';
        
        if (!orderNo || !name) {
            console.log('Missing order data from receipt modal');
            return null;
        }
        
        // Get items from receipt modal
        const receiptItems = document.getElementById('receiptItems');
        const items = [];
        
        if (receiptItems) {
            const itemElements = receiptItems.querySelectorAll('.receipt-item');
            itemElements.forEach(item => {
                const itemName = item.querySelector('.receipt-item-name')?.textContent || '';
                const itemQtyText = item.querySelector('.receipt-item-qty')?.textContent || 'x1';
                const itemPriceText = item.querySelector('.receipt-item-price')?.textContent || 'Rp 0';
                
                // Extract quantity number
                const qtyMatch = itemQtyText.match(/x(\d+)/);
                const quantity = qtyMatch ? parseInt(qtyMatch[1]) : 1;
                
                // Extract price number
                const priceMatch = itemPriceText.match(/Rp\s*([\d,]+)/);
                const totalPrice = priceMatch ? parseInt(priceMatch[1].replace(/,/g, '')) : 0;
                const unitPrice = Math.round(totalPrice / quantity);
                
                if (itemName) {
                    items.push({
                        name: itemName,
                        price: unitPrice,
                        quantity: quantity
                    });
                }
            });
        }
        
        // Calculate total from items
        const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        const orderData = {
            id: orderNo,
            timestamp: new Date().toISOString(),
            customer: {
                name: name,
                table: table,
                payment: payment,
                phone: '',
                notes: ''
            },
            items: items,
            total: total
        };
        
        console.log('Order data extracted from receipt:', orderData);
        return orderData;
        
    } catch (error) {
        console.error('Error extracting order data from receipt:', error);
        return null;
    }
}

// Original HTML print function as fallback
function printReceiptHTML() {
    const receiptContent = document.getElementById('receiptContent');
    if (!receiptContent) {
        alert('Receipt tidak ditemukan');
        return;
    }

    // Get receipt data
    const orderNo = document.getElementById('receiptOrderNo').textContent || '-';
    const date = document.getElementById('receiptDate').textContent || '-';
    const time = document.getElementById('receiptTime').textContent || '-';
    const name = document.getElementById('receiptName').textContent || '-';
    const table = document.getElementById('receiptTable').textContent || '-';
    const payment = document.getElementById('receiptPayment').textContent || '-';
    const subtotal = document.getElementById('receiptSubtotal').textContent || 'Rp 0';
    const tax = document.getElementById('receiptTax').textContent || 'Rp 0';
    const grandTotal = document.getElementById('receiptGrandTotal').textContent || 'Rp 0';
    
    // Get items
    const receiptItems = document.getElementById('receiptItems');
    let itemsHTML = '';
    if (receiptItems) {
        const items = receiptItems.querySelectorAll('.receipt-item');
        items.forEach(item => {
            const itemName = item.querySelector('.receipt-item-name').textContent;
            const itemQty = item.querySelector('.receipt-item-qty').textContent;
            const itemPrice = item.querySelector('.receipt-item-price').textContent;
            itemsHTML += `
                <tr>
                    <td style="padding: 8px 0; border-bottom: 1px dashed #ddd; font-weight: 500;">${itemName}</td>
                    <td style="padding: 8px 0; border-bottom: 1px dashed #ddd; text-align: center; color: #666;">${itemQty}</td>
                    <td style="padding: 8px 0; border-bottom: 1px dashed #ddd; text-align: right; font-weight: 600; color: #8B6F47;">${itemPrice}</td>
                </tr>
            `;
        });
    }

    const printWindow = window.open('', '_blank', 'width=800,height=1000');
    
    const printHTML = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Cappunabara - Receipt ${orderNo}</title>
            <style>
                @page {
                    size: A4;
                    margin: 15mm;
                }
                
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    background: white;
                    font-size: 14px;
                }
                
                .receipt-container {
                    max-width: 600px;
                    margin: 0 auto;
                    background: white;
                    border: 2px solid #8B6F47;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                }
                
                .receipt-header {
                    background: linear-gradient(135deg, #8B6F47 0%, #A67B5B 100%);
                    color: white;
                    padding: 30px 20px;
                    text-align: center;
                    position: relative;
                }
                
                .receipt-header::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="2" fill="rgba(255,255,255,0.1)"/><circle cx="80" cy="40" r="1.5" fill="rgba(255,255,255,0.1)"/><circle cx="40" cy="70" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="70" cy="80" r="2.5" fill="rgba(255,255,255,0.1)"/></svg>');
                    opacity: 0.3;
                }
                
                .logo {
                    font-size: 48px;
                    margin-bottom: 10px;
                    position: relative;
                    z-index: 1;
                }
                
                .brand-name {
                    font-size: 32px;
                    font-weight: 800;
                    letter-spacing: 2px;
                    margin-bottom: 8px;
                    position: relative;
                    z-index: 1;
                }
                
                .tagline {
                    font-size: 16px;
                    opacity: 0.9;
                    font-style: italic;
                    position: relative;
                    z-index: 1;
                }
                
                .receipt-body {
                    padding: 30px;
                }
                
                .section {
                    margin-bottom: 25px;
                }
                
                .section-title {
                    font-size: 18px;
                    font-weight: 700;
                    color: #8B6F47;
                    margin-bottom: 15px;
                    padding-bottom: 8px;
                    border-bottom: 2px solid #F7E7CE;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
                
                .info-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 20px;
                }
                
                .info-table td {
                    padding: 10px 0;
                    border-bottom: 1px solid #f0f0f0;
                }
                
                .info-label {
                    font-weight: 600;
                    color: #666;
                    width: 40%;
                }
                
                .info-value {
                    font-weight: 700;
                    color: #333;
                    text-align: right;
                }
                
                .order-number {
                    background: #8B6F47;
                    color: white;
                    padding: 4px 12px;
                    border-radius: 20px;
                    font-size: 12px;
                    font-weight: 700;
                }
                
                .items-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 20px 0;
                    background: #fafafa;
                    border-radius: 8px;
                    overflow: hidden;
                }
                
                .items-table th {
                    background: #8B6F47;
                    color: white;
                    padding: 15px 10px;
                    font-weight: 700;
                    text-transform: uppercase;
                    font-size: 12px;
                    letter-spacing: 1px;
                }
                
                .items-table td {
                    padding: 12px 10px;
                    border-bottom: 1px dashed #ddd;
                }
                
                .items-table tr:last-child td {
                    border-bottom: none;
                }
                
                .items-table tr:nth-child(even) {
                    background: #f9f9f9;
                }
                
                .summary-section {
                    background: linear-gradient(135deg, #F7E7CE 0%, #FFF8E7 100%);
                    padding: 25px;
                    border-radius: 12px;
                    border: 2px solid #E8B86D;
                    margin-top: 30px;
                }
                
                .summary-table {
                    width: 100%;
                    border-collapse: collapse;
                }
                
                .summary-table td {
                    padding: 8px 0;
                    font-size: 16px;
                }
                
                .summary-label {
                    font-weight: 600;
                    color: #666;
                }
                
                .summary-value {
                    text-align: right;
                    font-weight: 700;
                    color: #8B6F47;
                }
                
                .total-row {
                    border-top: 3px solid #8B6F47;
                    padding-top: 15px !important;
                    margin-top: 10px;
                }
                
                .total-row .summary-label,
                .total-row .summary-value {
                    font-size: 20px;
                    font-weight: 800;
                    color: #8B6F47;
                }
                
                .receipt-footer {
                    background: #8B6F47;
                    color: white;
                    padding: 25px;
                    text-align: center;
                }
                
                .thank-you {
                    font-size: 18px;
                    font-weight: 700;
                    margin-bottom: 15px;
                }
                
                .contact-info {
                    font-size: 14px;
                    opacity: 0.9;
                    margin-bottom: 10px;
                }
                
                .final-message {
                    font-size: 16px;
                    font-style: italic;
                    opacity: 0.9;
                }
                
                .print-date {
                    text-align: center;
                    margin-top: 20px;
                    font-size: 12px;
                    color: #999;
                }
                
                @media print {
                    body {
                        margin: 0;
                        padding: 0;
                    }
                    
                    .receipt-container {
                        border: none;
                        box-shadow: none;
                        max-width: none;
                        margin: 0;
                    }
                    
                    .no-print {
                        display: none !important;
                    }
                }
                
                .watermark {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    opacity: 0.1;
                    font-size: 100px;
                    color: #8B6F47;
                    z-index: -1;
                    transform: rotate(-15deg);
                }
            </style>
        </head>
        <body>
            <div class="watermark">☕</div>
            
            <div class="receipt-container">
                <div class="receipt-header">
                    <div class="logo">☕</div>
                    <div class="brand-name">CAPPUNABARA</div>
                    <div class="tagline">Your Cozy Corner</div>
                </div>
                
                <div class="receipt-body">
                    <div class="section">
                        <div class="section-title">Informasi Pesanan</div>
                        <table class="info-table">
                            <tr>
                                <td class="info-label">No. Order:</td>
                                <td class="info-value"><span class="order-number">${orderNo}</span></td>
                            </tr>
                            <tr>
                                <td class="info-label">Tanggal:</td>
                                <td class="info-value">${date}</td>
                            </tr>
                            <tr>
                                <td class="info-label">Waktu:</td>
                                <td class="info-value">${time}</td>
                            </tr>
                            <tr>
                                <td class="info-label">Nama Pelanggan:</td>
                                <td class="info-value">${name}</td>
                            </tr>
                            <tr>
                                <td class="info-label">Nomor Meja:</td>
                                <td class="info-value">${table}</td>
                            </tr>
                            <tr>
                                <td class="info-label">Metode Pembayaran:</td>
                                <td class="info-value">${payment}</td>
                            </tr>
                        </table>
                    </div>
                    
                    <div class="section">
                        <div class="section-title">Detail Pesanan</div>
                        <table class="items-table">
                            <thead>
                                <tr>
                                    <th style="text-align: left;">Item</th>
                                    <th style="width: 80px;">Qty</th>
                                    <th style="width: 120px; text-align: right;">Harga</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${itemsHTML}
                            </tbody>
                        </table>
                    </div>
                    
                    <div class="summary-section">
                        <table class="summary-table">
                            <tr>
                                <td class="summary-label">Subtotal:</td>
                                <td class="summary-value">${subtotal}</td>
                            </tr>
                            <tr>
                                <td class="summary-label">Pajak (10%):</td>
                                <td class="summary-value">${tax}</td>
                            </tr>
                            <tr class="total-row">
                                <td class="summary-label">TOTAL PEMBAYARAN:</td>
                                <td class="summary-value">${grandTotal}</td>
                            </tr>
                        </table>
                    </div>
                </div>
                
                <div class="receipt-footer">
                    <div class="thank-you">Terima kasih sudah memesan di Cappunabara! 💖</div>
                    <div class="contact-info">📞 0812-3456-7890 | 📧 hello@cafeluna.com</div>
                    <div class="contact-info">📍 Jl. Kopi Hangat No. 123, Jakarta</div>
                    <div class="final-message">Selamat menikmati! ✨</div>
                </div>
            </div>
            
            <div class="print-date">
                Dicetak pada: ${new Date().toLocaleString('id-ID')}
            </div>
            
            <script>
                window.onload = function() {
                    // Auto print after 800ms delay
                    setTimeout(function() {
                        window.print();
                    }, 800);
                    
                    // Close window after print or after 8 seconds
                    window.onafterprint = function() {
                        setTimeout(function() {
                            window.close();
                        }, 1500);
                    };
                    
                    // Fallback close after 15 seconds
                    setTimeout(function() {
                        window.close();
                    }, 15000);
                };
                
                // Handle Ctrl+S to save as PDF
                document.addEventListener('keydown', function(e) {
                    if (e.ctrlKey && e.key === 's') {
                        e.preventDefault();
                        window.print();
                    }
                });
            </script>
        </body>
        </html>
    `;
    
    printWindow.document.write(printHTML);
    printWindow.document.close();
    
    // Show success notification
    showNotification('Struk siap untuk print/save as PDF!');
}

// Search Menu
function searchMenu(query) {
    if (!query.trim()) {
        displayMenu(currentCategory);
        return;
    }

    let allItems = [];
    Object.values(menu).forEach(categoryItems => {
        allItems = allItems.concat(categoryItems);
    });

    const filteredItems = allItems.filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
    );

    const menuGrid = document.getElementById('menuGrid');
    if (!menuGrid) return;

    if (filteredItems.length === 0) {
        menuGrid.innerHTML = `
            <div class="no-results">
                <div class="no-results-icon">🔍</div>
                <p>Tidak ada item yang ditemukan</p>
            </div>
        `;
    } else {
        menuGrid.innerHTML = filteredItems.map(item => `
            <div class="menu-card" data-id="${item.id}">
                <div class="menu-card-image">${item.image}</div>
                <div class="menu-card-content">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                </div>
                <div class="menu-card-footer">
                    <span class="menu-price">Rp ${item.price.toLocaleString('id-ID')}</span>
                    <button class="btn-add" onclick="addToCart(${item.id})">
                        🛒 Tambah
                    </button>
                </div>
            </div>
        `).join('');
    }
}

// Enhanced notification with better styling
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="font-size: 1.2rem;">${type === 'success' ? '✅' : '❌'}</span>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Auto remove
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Close Checkout Modal
function closeCheckoutModal() {
    console.log('Closing checkout modal...');
    const checkoutModal = document.getElementById('checkoutModal');
    const overlay = document.getElementById('overlay');
    
    if (checkoutModal && overlay) {
        checkoutModal.classList.remove('active');
        overlay.classList.remove('active');
        console.log('Checkout modal closed');
    }
}

// Close Receipt Modal
function closeReceiptModal() {
    console.log('Closing receipt modal...');
    const receiptModal = document.getElementById('receiptModal');
    const overlay = document.getElementById('overlay');
    
    if (receiptModal && overlay) {
        receiptModal.classList.remove('active');
        overlay.classList.remove('active');
        console.log('Receipt modal closed');
    }
}

// Close All Modals
function closeAllModals() {
    console.log('Closing all modals...');
    const modals = document.querySelectorAll('.modal');
    const cartSidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('overlay');
    
    modals.forEach(modal => modal.classList.remove('active'));
    if (cartSidebar) cartSidebar.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    console.log('All modals closed');
}

// Open History Modal
function openHistoryModal() {
    console.log('Opening history modal...');
    const historyModal = document.getElementById('historyModal');
    const overlay = document.getElementById('overlay');
    
    if (historyModal && overlay) {
        historyModal.classList.add('active');
        overlay.classList.add('active');
        displayOrderHistory();
        displayCustomerSummary();
        console.log('History modal opened');
    }
}

// Close History Modal
function closeHistoryModal() {
    console.log('Closing history modal...');
    const historyModal = document.getElementById('historyModal');
    const overlay = document.getElementById('overlay');
    
    if (historyModal && overlay) {
        historyModal.classList.remove('active');
        overlay.classList.remove('active');
        console.log('History modal closed');
    }
}

// Update History Badge
function updateHistoryBadge() {
    const historyBadge = document.getElementById('historyBadge');
    if (historyBadge) {
        const count = orderHistory.length;
        historyBadge.textContent = count;
        historyBadge.style.display = count > 0 ? 'flex' : 'none';
    }
}

// Display Customer Summary
function displayCustomerSummary() {
    const customerSummary = document.getElementById('customerSummary');
    if (!customerSummary) return;

    if (Object.keys(customerData).length === 0) {
        customerSummary.innerHTML = `
            <div style="text-align: center; padding: 1rem; color: var(--text-medium);">
                <p>Belum ada data pelanggan</p>
            </div>
        `;
        return;
    }

    customerSummary.innerHTML = `
        <h3 style="margin-bottom: 1rem; color: var(--mocha);">👤 Data Pelanggan</h3>
        <div class="customer-info">
            <div class="info-item">
                <span class="info-value">${customerData.name || 'N/A'}</span>
                <span class="info-label">Nama</span>
            </div>
            <div class="info-item">
                <span class="info-value">${customerData.totalOrders || 0}</span>
                <span class="info-label">Total Pesanan</span>
            </div>
            <div class="info-item">
                <span class="info-value">Rp ${(customerData.totalSpent || 0).toLocaleString('id-ID')}</span>
                <span class="info-label">Total Pengeluaran</span>
            </div>
            <div class="info-item">
                <span class="info-value">${customerData.lastOrderDate ? new Date(customerData.lastOrderDate).toLocaleDateString('id-ID') : 'N/A'}</span>
                <span class="info-label">Pesanan Terakhir</span>
            </div>
        </div>
    `;
}

// Display Order History
function displayOrderHistory(filter = 'all') {
    const historyList = document.getElementById('historyList');
    const emptyHistory = document.getElementById('emptyHistory');
    
    if (!historyList || !emptyHistory) return;

    let filteredOrders = [...orderHistory];

    // Apply filter
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    switch (filter) {
        case 'today':
            filteredOrders = orderHistory.filter(order => {
                const orderDate = new Date(order.timestamp);
                return orderDate >= today;
            });
            break;
        case 'week':
            filteredOrders = orderHistory.filter(order => {
                const orderDate = new Date(order.timestamp);
                return orderDate >= weekAgo;
            });
            break;
        case 'month':
            filteredOrders = orderHistory.filter(order => {
                const orderDate = new Date(order.timestamp);
                return orderDate >= monthAgo;
            });
            break;
    }

    if (filteredOrders.length === 0) {
        historyList.style.display = 'none';
        emptyHistory.style.display = 'block';
        return;
    }

    historyList.style.display = 'block';
    emptyHistory.style.display = 'none';

    historyList.innerHTML = filteredOrders.map(order => `
        <div class="history-item" onclick="showOrderDetails('${order.id}')">
            <div class="history-header">
                <div>
                    <div class="order-id">#${order.id}</div>
                    <div class="order-date">${new Date(order.timestamp).toLocaleString('id-ID')}</div>
                </div>
                <div class="order-total">Rp ${order.total.toLocaleString('id-ID')}</div>
            </div>
            
            <div class="history-items">
                ${order.items.map(item => `
                    <span class="history-item-tag">${item.name} x${item.quantity}</span>
                `).join('')}
            </div>
            
            <div class="history-footer">
                <span>Meja: ${order.customer.table}</span>
                <span>Pembayaran: ${order.customer.payment}</span>
            </div>
        </div>
    `).join('');
}

// Set History Filter
function setHistoryFilter(filter) {
    // Update active filter button
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === filter) {
            btn.classList.add('active');
        }
    });

    // Display filtered history
    displayOrderHistory(filter);
}

// Show Order Details
function showOrderDetails(orderId) {
    const order = orderHistory.find(o => o.id === orderId);
    if (order) {
        showReceipt(order);
        closeHistoryModal();
    }
}

// Close modals when clicking outside
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('overlay')) {
        closeAllModals();
    }
});
// ========== PDF DOWNLOAD FUNCTIONALITY ==========

// Generate PDF Receipt - Enhanced with Fallback
function downloadPDF() {
    // Check if jsPDF is available
    if (typeof window.jsPDF === 'undefined') {
        // Fallback: Use print function which can save as PDF
        if (confirm('PDF library tidak tersedia.\n\nKlik OK untuk membuka print preview, lalu pilih "Save as PDF" atau "Microsoft Print to PDF" sebagai printer.')) {
            printReceipt();
        }
        return;
    }

    const receiptContent = document.getElementById('receiptContent');
    if (!receiptContent) {
        alert('Receipt tidak ditemukan');
        return;
    }

    try {
        // Get receipt data
        const orderNo = document.getElementById('receiptOrderNo').textContent || '-';
        const date = document.getElementById('receiptDate').textContent || '-';
        const time = document.getElementById('receiptTime').textContent || '-';
        const name = document.getElementById('receiptName').textContent || '-';
        const table = document.getElementById('receiptTable').textContent || '-';
        const payment = document.getElementById('receiptPayment').textContent || '-';
        const subtotal = document.getElementById('receiptSubtotal').textContent || 'Rp 0';
        const tax = document.getElementById('receiptTax').textContent || 'Rp 0';
        const grandTotal = document.getElementById('receiptGrandTotal').textContent || 'Rp 0';

        // Create new PDF document
        const { jsPDF } = window.jsPDF;
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        // Set font
        doc.setFont('helvetica');

        // Header
        doc.setFontSize(20);
        doc.setFont('helvetica', 'bold');
        doc.text('☕ CAPPUNABARA', 105, 20, { align: 'center' });
        
        doc.setFontSize(12);
        doc.setFont('helvetica', 'italic');
        doc.text('Your Cozy Corner', 105, 28, { align: 'center' });

        // Line separator
        doc.setLineWidth(0.5);
        doc.line(20, 35, 190, 35);

        // Order Information
        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        
        let yPos = 45;
        const leftCol = 25;
        const rightCol = 120;

        doc.text('No. Order:', leftCol, yPos);
        doc.setFont('helvetica', 'bold');
        doc.text(orderNo, rightCol, yPos);
        
        yPos += 7;
        doc.setFont('helvetica', 'normal');
        doc.text('Tanggal:', leftCol, yPos);
        doc.text(date, rightCol, yPos);
        
        yPos += 7;
        doc.text('Waktu:', leftCol, yPos);
        doc.text(time, rightCol, yPos);
        
        yPos += 7;
        doc.text('Nama:', leftCol, yPos);
        doc.text(name, rightCol, yPos);
        
        yPos += 7;
        doc.text('Meja:', leftCol, yPos);
        doc.text(table, rightCol, yPos);
        
        yPos += 7;
        doc.text('Pembayaran:', leftCol, yPos);
        doc.text(payment, rightCol, yPos);

        // Line separator
        yPos += 10;
        doc.line(20, yPos, 190, yPos);

        // Items section
        yPos += 10;
        doc.setFont('helvetica', 'bold');
        doc.text('PESANAN:', leftCol, yPos);

        yPos += 8;
        doc.setFont('helvetica', 'normal');

        // Get items from receipt
        const receiptItems = document.getElementById('receiptItems');
        if (receiptItems) {
            const items = receiptItems.querySelectorAll('.receipt-item');
            items.forEach(item => {
                const itemName = item.querySelector('.receipt-item-name')?.textContent || '';
                const itemQty = item.querySelector('.receipt-item-qty')?.textContent || '';
                const itemPrice = item.querySelector('.receipt-item-price')?.textContent || '';
                
                // Item name and quantity
                doc.text(`${itemName} ${itemQty}`, leftCol, yPos);
                // Item price (right aligned)
                doc.text(itemPrice, 185, yPos, { align: 'right' });
                yPos += 6;
            });
        }

        // Line separator
        yPos += 5;
        doc.line(20, yPos, 190, yPos);

        // Summary section
        yPos += 10;
        doc.text('Subtotal:', leftCol, yPos);
        doc.text(subtotal, 185, yPos, { align: 'right' });
        
        yPos += 7;
        doc.text('Pajak (10%):', leftCol, yPos);
        doc.text(tax, 185, yPos, { align: 'right' });

        // Total line
        yPos += 10;
        doc.setLineWidth(1);
        doc.line(20, yPos, 190, yPos);
        
        yPos += 8;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.text('TOTAL:', leftCol, yPos);
        doc.text(grandTotal, 185, yPos, { align: 'right' });

        // Footer
        yPos += 20;
        doc.setLineWidth(0.5);
        doc.line(20, yPos, 190, yPos);
        
        yPos += 10;
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('Terima kasih sudah memesan di Cappunabara! 💖', 105, yPos, { align: 'center' });
        
        yPos += 8;
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text('📞 0812-3456-7890 | 📧 hello@cafeluna.com', 105, yPos, { align: 'center' });
        
        yPos += 6;
        doc.setFont('helvetica', 'italic');
        doc.text('Selamat menikmati! ✨', 105, yPos, { align: 'center' });

        // Save the PDF
        const fileName = `CafeLuna_Receipt_${orderNo}_${date.replace(/\//g, '-')}.pdf`;
        doc.save(fileName);
        
        // Show success notification
        showNotification('PDF berhasil diunduh!');

    } catch (error) {
        console.error('Error generating PDF:', error);
        // Fallback to print function
        if (confirm('Gagal membuat PDF dengan library.\n\nKlik OK untuk membuka print preview, lalu pilih "Save as PDF" sebagai printer.')) {
            printReceipt();
        }
    }
}

// Update setup event listeners to include PDF button
function setupEventListeners() {
    // Category buttons
    const categoryButtons = document.querySelectorAll('.category-tab');
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const category = e.target.closest('.category-tab').dataset.category;
            setActiveCategory(category);
            displayMenu(category);
        });
    });

    // Cart button
    const cartButton = document.getElementById('cartButton');
    if (cartButton) {
        cartButton.addEventListener('click', toggleCart);
    }

    // Cart close
    const cartClose = document.getElementById('cartClose');
    if (cartClose) {
        console.log('Cart close button found, adding event listener');
        cartClose.addEventListener('click', closeCart);
    } else {
        console.log('Cart close button NOT found');
    }

    // Checkout button
    const btnCheckout = document.getElementById('btnCheckout');
    if (btnCheckout) {
        btnCheckout.addEventListener('click', openCheckoutModal);
    }

    // Clear cart
    const btnClear = document.getElementById('btnClear');
    if (btnClear) {
        btnClear.addEventListener('click', clearCart);
    }

    // Checkout form
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handleCheckout);
    }

    // Print button
    const btnPrint = document.getElementById('btnPrint');
    if (btnPrint) {
        btnPrint.addEventListener('click', printReceipt);
    }

    // PDF button
    const btnPDF = document.getElementById('btnPDF');
    if (btnPDF) {
        btnPDF.addEventListener('click', downloadPDF);
    }

    // Search
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchMenu(e.target.value);
        });
    }

    // Checkout modal close button
    const checkoutClose = document.getElementById('checkoutClose');
    if (checkoutClose) {
        console.log('Checkout close button found, adding event listener');
        checkoutClose.addEventListener('click', closeCheckoutModal);
    } else {
        console.log('Checkout close button NOT found');
    }

    // Receipt modal close button
    const receiptClose = document.getElementById('receiptClose');
    if (receiptClose) {
        console.log('Receipt close button found, adding event listener');
        receiptClose.addEventListener('click', closeReceiptModal);
    } else {
        console.log('Receipt close button NOT found');
    }

    // Close modals when clicking overlay
    const overlay = document.getElementById('overlay');
    if (overlay) {
        console.log('Overlay found, adding event listener');
        overlay.addEventListener('click', closeAllModals);
    } else {
        console.log('Overlay NOT found');
    }

    // History filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const filter = e.target.dataset.filter;
            setHistoryFilter(filter);
        });
    });

    // Update history badge on load
    updateHistoryBadge();
}

// Handle reorder from history page
function handleReorderFromHistory() {
    const reorderItems = sessionStorage.getItem('cappunabara_reorder_items');
    const reorderCustomer = sessionStorage.getItem('cappunabara_reorder_customer');
    
    if (reorderItems && reorderCustomer) {
        try {
            const items = JSON.parse(reorderItems);
            const customer = JSON.parse(reorderCustomer);
            
            // Clear session storage
            sessionStorage.removeItem('cappunabara_reorder_items');
            sessionStorage.removeItem('cappunabara_reorder_customer');
            
            // Add items to cart
            items.forEach(item => {
                for (let i = 0; i < item.quantity; i++) {
                    addToCart(item.id);
                }
            });
            
            // Pre-fill customer data in checkout form when opened
            if (customer.name) {
                setTimeout(() => {
                    const customerNameInput = document.getElementById('customerName');
                    if (customerNameInput) customerNameInput.value = customer.name;
                }, 100);
            }
            
            if (customer.phone) {
                setTimeout(() => {
                    const phoneNumberInput = document.getElementById('phoneNumber');
                    if (phoneNumberInput) phoneNumberInput.value = customer.phone;
                }, 100);
            }
            
            // Show notification and open cart
            showNotification(`${items.length} item berhasil ditambahkan dari riwayat pesanan!`);
            setTimeout(() => {
                toggleCart();
            }, 1000);
            
        } catch (error) {
            console.error('Error handling reorder:', error);
            sessionStorage.removeItem('cappunabara_reorder_items');
            sessionStorage.removeItem('cappunabara_reorder_customer');
        }
    }
}
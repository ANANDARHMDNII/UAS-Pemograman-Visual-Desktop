// ========== CAPPUNABARA ORDER HISTORY PAGE - JAVASCRIPT ==========

// Global variables
let orderHistory = JSON.parse(localStorage.getItem('cappunabara_order_history')) || [];
let customerData = JSON.parse(localStorage.getItem('cappunabara_customer_data')) || {};
let currentFilter = 'all';
let currentPage = 1;
const itemsPerPage = 10;

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Cappunabara Order History Loading...');
    loadHistoryData();
    setupEventListeners();
    console.log('Cappunabara Order History Loaded Successfully!');
});

// Reload data when page becomes visible (user switches back to tab)
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        console.log('Page became visible, reloading data...');
        loadHistoryData();
    }
});

// Reload data when window gains focus
window.addEventListener('focus', function() {
    console.log('Window gained focus, reloading data...');
    loadHistoryData();
});

// Listen for storage events from other tabs/pages
window.addEventListener('storage', function(e) {
    if (e.key === 'cappunabara_order_history' || e.key === 'cappunabara_customer_data') {
        console.log('Storage event detected, reloading history data...');
        loadHistoryData();
    }
});

// Setup Event Listeners
function setupEventListeners() {
    // Filter tabs
    const filterTabs = document.querySelectorAll('.filter-tab');
    filterTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            const filter = e.target.closest('.filter-tab').dataset.filter;
            setHistoryFilter(filter);
        });
    });

    // Search functionality
    const searchInput = document.getElementById('historySearch');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(searchHistory, 300));
    }

    // Refresh button
    const refreshButton = document.querySelector('.btn-refresh');
    if (refreshButton) {
        refreshButton.addEventListener('click', function() {
            console.log('Refresh button clicked');
            loadHistoryData();
            showNotification('Data riwayat pesanan telah diperbarui!');
        });
    }

    // Clear history button
    const clearHistoryButton = document.querySelector('.btn-clear-history');
    if (clearHistoryButton) {
        clearHistoryButton.addEventListener('click', clearAllHistory);
    }

    // Close modal when clicking overlay
    const overlay = document.getElementById('overlay');
    if (overlay) {
        overlay.addEventListener('click', closeAllModals);
    }

    // Modal close buttons
    const modalCloses = document.querySelectorAll('.modal-close');
    modalCloses.forEach(btn => {
        btn.addEventListener('click', closeAllModals);
    });
}

// Load and display all history data
function loadHistoryData() {
    console.log('Loading history data...');
    
    // Reload from localStorage in case it was updated
    orderHistory = JSON.parse(localStorage.getItem('cappunabara_order_history')) || [];
    customerData = JSON.parse(localStorage.getItem('cappunabara_customer_data')) || {};
    
    console.log('Loaded from localStorage:', {
        orders: orderHistory.length,
        customer: Object.keys(customerData).length,
        orderHistory: orderHistory,
        customerData: customerData
    });
    
    displayCustomerProfile();
    displayQuickStats();
    displayHistoryTimeline();
    updateFilterCounts();
    
    console.log('History data loaded successfully');
}

// Display customer profile
function displayCustomerProfile() {
    const customerProfile = document.getElementById('customerProfile');
    if (!customerProfile) return;

    console.log('Displaying customer profile:', customerData);

    if (Object.keys(customerData).length === 0 || !customerData.name) {
        customerProfile.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: var(--text-medium);">
                <div style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;">👤</div>
                <h3>Belum Ada Data Pelanggan</h3>
                <p>Data pelanggan akan muncul setelah Anda melakukan pesanan pertama</p>
                <a href="/Order" style="display: inline-flex; align-items: center; gap: 0.5rem; margin-top: 1rem; padding: 0.75rem 1.5rem; background: var(--gradient-coffee); color: white; text-decoration: none; border-radius: var(--radius-full); font-weight: 600;">
                    <span>🛒</span> Mulai Pesan
                </a>
                <div style="margin-top: 1rem; padding: 1rem; background: #f0f0f0; border-radius: 8px; font-size: 0.9rem; color: #666;">
                    <strong>Debug Info:</strong><br>
                    localStorage orders: ${localStorage.getItem('cappunabara_order_history') ? JSON.parse(localStorage.getItem('cappunabara_order_history')).length : 0}<br>
                    localStorage customer: ${localStorage.getItem('cappunabara_customer_data') ? 'Ada' : 'Tidak ada'}
                </div>
            </div>
        `;
        return;
    }

    const lastOrderDate = customerData.lastOrderDate ? new Date(customerData.lastOrderDate).toLocaleDateString('id-ID') : 'Belum ada';
    const totalSpent = customerData.totalSpent || 0;
    const totalOrders = customerData.totalOrders || 0;
    const avgOrderValue = totalOrders > 0 ? totalSpent / totalOrders : 0;

    customerProfile.innerHTML = `
        <div class="profile-header">
            <div class="profile-avatar">👤</div>
            <div class="profile-info">
                <h2>${customerData.name}</h2>
                <p>Pelanggan Cappunabara ${customerData.phone ? '• ' + customerData.phone : ''}</p>
            </div>
        </div>
        <div class="profile-stats">
            <div class="profile-stat">
                <div class="profile-stat-number">${totalOrders}</div>
                <div class="profile-stat-label">Total Pesanan</div>
            </div>
            <div class="profile-stat">
                <div class="profile-stat-number">Rp ${totalSpent.toLocaleString('id-ID')}</div>
                <div class="profile-stat-label">Total Pengeluaran</div>
            </div>
            <div class="profile-stat">
                <div class="profile-stat-number">Rp ${Math.round(avgOrderValue).toLocaleString('id-ID')}</div>
                <div class="profile-stat-label">Rata-rata per Pesanan</div>
            </div>
            <div class="profile-stat">
                <div class="profile-stat-number">${lastOrderDate}</div>
                <div class="profile-stat-label">Pesanan Terakhir</div>
            </div>
        </div>
    `;
}

// Display quick stats
function displayQuickStats() {
    const totalOrdersCount = document.getElementById('totalOrdersCount');
    const totalSpentAmount = document.getElementById('totalSpentAmount');
    const favoriteItem = document.getElementById('favoriteItem');
    const lastOrderDate = document.getElementById('lastOrderDate');

    const totalOrders = orderHistory.length;
    const totalSpent = orderHistory.reduce((sum, order) => sum + order.total, 0);
    
    // Calculate favorite item
    const itemCounts = {};
    orderHistory.forEach(order => {
        order.items.forEach(item => {
            itemCounts[item.name] = (itemCounts[item.name] || 0) + item.quantity;
        });
    });
    
    const favoriteItemName = Object.keys(itemCounts).length > 0 
        ? Object.keys(itemCounts).reduce((a, b) => itemCounts[a] > itemCounts[b] ? a : b)
        : '-';
    
    // Get last order date properly
    let lastOrder = '-';
    if (orderHistory.length > 0) {
        const lastOrderTimestamp = orderHistory[0].timestamp;
        const lastOrderDateObj = new Date(lastOrderTimestamp);
        lastOrder = lastOrderDateObj.toLocaleDateString('id-ID');
    }

    if (totalOrdersCount) totalOrdersCount.textContent = totalOrders;
    if (totalSpentAmount) totalSpentAmount.textContent = `Rp ${totalSpent.toLocaleString('id-ID')}`;
    if (favoriteItem) favoriteItem.textContent = favoriteItemName;
    if (lastOrderDate) lastOrderDate.textContent = lastOrder;
    
    console.log('Quick stats updated:', {
        totalOrders,
        totalSpent,
        favoriteItemName,
        lastOrder
    });
}

// Display history timeline
function displayHistoryTimeline() {
    const historyTimeline = document.getElementById('historyTimeline');
    const emptyHistoryState = document.getElementById('emptyHistoryState');
    const loadMoreSection = document.getElementById('loadMoreSection');

    if (!historyTimeline || !emptyHistoryState) return;

    let filteredOrders = getFilteredOrders();

    if (filteredOrders.length === 0) {
        historyTimeline.style.display = 'none';
        emptyHistoryState.innerHTML = `
            <div class="empty-illustration">
                <div class="empty-icon">📋</div>
                <div class="empty-coffee">☕</div>
            </div>
            <h3>Belum Ada Riwayat Pesanan</h3>
            <p>Anda belum pernah melakukan pesanan di Cappunabara</p>
            <a href="/Order" class="btn-start-order">
                <span>🛒</span> Mulai Pesan Sekarang
            </a>
            <div style="margin-top: 2rem; padding: 1rem; background: #f0f0f0; border-radius: 8px; font-size: 0.9rem; color: #666; text-align: left;">
                <strong>Debug Info:</strong><br>
                Total orders in localStorage: ${orderHistory.length}<br>
                Current filter: ${currentFilter}<br>
                Filtered orders: ${filteredOrders.length}<br>
                localStorage key exists: ${localStorage.getItem('cappunabara_order_history') ? 'Yes' : 'No'}
            </div>
        `;
        emptyHistoryState.style.display = 'block';
        if (loadMoreSection) loadMoreSection.style.display = 'none';
        return;
    }

    historyTimeline.style.display = 'block';
    emptyHistoryState.style.display = 'none';

    // Pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedOrders = filteredOrders.slice(0, endIndex);

    historyTimeline.innerHTML = paginatedOrders.map((order, index) => {
        const orderDate = new Date(order.timestamp);
        const taxAmount = order.total * 0.1;
        const finalTotal = order.total + taxAmount;
        
        return `
            <div class="timeline-item" onclick="showOrderDetail('${order.id}')" style="animation-delay: ${index * 0.1}s">
                <div class="timeline-header">
                    <div class="timeline-order-info">
                        <div class="timeline-icon">📋</div>
                        <div class="timeline-details">
                            <h3>Pesanan #${order.id}</h3>
                            <p>${orderDate.toLocaleDateString('id-ID')} • ${orderDate.toLocaleTimeString('id-ID')}</p>
                        </div>
                    </div>
                    <div class="timeline-amount">
                        <div class="timeline-total">Rp ${finalTotal.toLocaleString('id-ID')}</div>
                        <div class="timeline-status">Selesai</div>
                    </div>
                </div>
                
                <div class="timeline-items">
                    ${order.items.map(item => `
                        <span class="timeline-item-tag">${item.name} x${item.quantity}</span>
                    `).join('')}
                </div>
                
                <div class="timeline-footer">
                    <div class="timeline-customer">
                        <span>👤 ${order.customer.name}</span>
                        <span>•</span>
                        <span>🪑 Meja ${order.customer.table}</span>
                        <span>•</span>
                        <span>💳 ${order.customer.payment}</span>
                    </div>
                    <div class="timeline-actions">
                        <button class="btn-view-receipt" onclick="event.stopPropagation(); showOrderDetail('${order.id}')">
                            <span>📄</span> Lihat Struk
                        </button>
                        <button class="btn-reorder" onclick="event.stopPropagation(); reorderFromHistory('${order.id}')">
                            <span>🔄</span> Pesan Lagi
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    // Show/hide load more button
    if (loadMoreSection) {
        loadMoreSection.style.display = filteredOrders.length > endIndex ? 'block' : 'none';
    }
}

// Get filtered orders based on current filter
function getFilteredOrders() {
    let filteredOrders = [...orderHistory];

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    switch (currentFilter) {
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

    return filteredOrders;
}

// Update filter counts
function updateFilterCounts() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    const allCount = orderHistory.length;
    const todayCount = orderHistory.filter(order => new Date(order.timestamp) >= today).length;
    const weekCount = orderHistory.filter(order => new Date(order.timestamp) >= weekAgo).length;
    const monthCount = orderHistory.filter(order => new Date(order.timestamp) >= monthAgo).length;

    const allCountEl = document.getElementById('allCount');
    const todayCountEl = document.getElementById('todayCount');
    const weekCountEl = document.getElementById('weekCount');
    const monthCountEl = document.getElementById('monthCount');

    if (allCountEl) allCountEl.textContent = allCount;
    if (todayCountEl) todayCountEl.textContent = todayCount;
    if (weekCountEl) weekCountEl.textContent = weekCount;
    if (monthCountEl) monthCountEl.textContent = monthCount;
}

// Set history filter
function setHistoryFilter(filter) {
    currentFilter = filter;
    currentPage = 1; // Reset pagination

    // Update active filter tab
    const filterTabs = document.querySelectorAll('.filter-tab');
    filterTabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.filter === filter) {
            tab.classList.add('active');
        }
    });

    // Display filtered history
    displayHistoryTimeline();
}

// Search history
function searchHistory() {
    const searchInput = document.getElementById('historySearch');
    if (!searchInput) return;

    const query = searchInput.value.toLowerCase().trim();
    
    if (!query) {
        displayHistoryTimeline();
        return;
    }

    const filteredOrders = getFilteredOrders().filter(order => {
        // Search in order ID
        if (order.id.toLowerCase().includes(query)) return true;
        
        // Search in customer name
        if (order.customer.name.toLowerCase().includes(query)) return true;
        
        // Search in items
        return order.items.some(item => 
            item.name.toLowerCase().includes(query)
        );
    });

    displaySearchResults(filteredOrders);
}

// Display search results
function displaySearchResults(filteredOrders) {
    const historyTimeline = document.getElementById('historyTimeline');
    const emptyHistoryState = document.getElementById('emptyHistoryState');
    const loadMoreSection = document.getElementById('loadMoreSection');

    if (!historyTimeline || !emptyHistoryState) return;

    if (filteredOrders.length === 0) {
        historyTimeline.innerHTML = `
            <div style="text-align: center; padding: 3rem; background: var(--white); border-radius: var(--radius-xl); box-shadow: var(--shadow-md);">
                <div style="font-size: 4rem; margin-bottom: 1rem; opacity: 0.3;">🔍</div>
                <h3>Tidak Ada Hasil Ditemukan</h3>
                <p style="color: var(--text-medium); margin-top: 0.5rem;">Coba gunakan kata kunci yang berbeda</p>
            </div>
        `;
        if (loadMoreSection) loadMoreSection.style.display = 'none';
        return;
    }

    historyTimeline.innerHTML = filteredOrders.map((order, index) => {
        const orderDate = new Date(order.timestamp);
        const taxAmount = order.total * 0.1;
        const finalTotal = order.total + taxAmount;
        
        return `
            <div class="timeline-item" onclick="showOrderDetail('${order.id}')" style="animation-delay: ${index * 0.1}s">
                <div class="timeline-header">
                    <div class="timeline-order-info">
                        <div class="timeline-icon">📋</div>
                        <div class="timeline-details">
                            <h3>Pesanan #${order.id}</h3>
                            <p>${orderDate.toLocaleDateString('id-ID')} • ${orderDate.toLocaleTimeString('id-ID')}</p>
                        </div>
                    </div>
                    <div class="timeline-amount">
                        <div class="timeline-total">Rp ${finalTotal.toLocaleString('id-ID')}</div>
                        <div class="timeline-status">Selesai</div>
                    </div>
                </div>
                
                <div class="timeline-items">
                    ${order.items.map(item => `
                        <span class="timeline-item-tag">${item.name} x${item.quantity}</span>
                    `).join('')}
                </div>
                
                <div class="timeline-footer">
                    <div class="timeline-customer">
                        <span>👤 ${order.customer.name}</span>
                        <span>•</span>
                        <span>🪑 Meja ${order.customer.table}</span>
                        <span>•</span>
                        <span>💳 ${order.customer.payment}</span>
                    </div>
                    <div class="timeline-actions">
                        <button class="btn-view-receipt" onclick="event.stopPropagation(); showOrderDetail('${order.id}')">
                            <span>📄</span> Lihat Struk
                        </button>
                        <button class="btn-reorder" onclick="event.stopPropagation(); reorderFromHistory('${order.id}')">
                            <span>🔄</span> Pesan Lagi
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    if (loadMoreSection) loadMoreSection.style.display = 'none';
}

// Load more history items
function loadMoreHistory() {
    currentPage++;
    displayHistoryTimeline();
}

// Show order detail modal
function showOrderDetail(orderId) {
    const order = orderHistory.find(o => o.id === orderId);
    if (!order) return;

    const modal = document.getElementById('orderDetailModal');
    const overlay = document.getElementById('overlay');
    const orderDetailContent = document.getElementById('orderDetailContent');

    if (!modal || !overlay || !orderDetailContent) return;

    const orderDate = new Date(order.timestamp);
    const taxAmount = order.total * 0.1;
    const finalTotal = order.total + taxAmount;

    orderDetailContent.innerHTML = `
        <div style="margin-bottom: 2rem;">
            <h3 style="color: var(--mocha); margin-bottom: 1rem;">📋 Informasi Pesanan</h3>
            <div style="background: var(--cream); padding: 1.5rem; border-radius: var(--radius-md); margin-bottom: 1.5rem;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <div>
                        <strong>No. Pesanan:</strong><br>
                        <span style="color: var(--mocha); font-weight: 600;">#${order.id}</span>
                    </div>
                    <div>
                        <strong>Tanggal & Waktu:</strong><br>
                        ${orderDate.toLocaleDateString('id-ID')} • ${orderDate.toLocaleTimeString('id-ID')}
                    </div>
                    <div>
                        <strong>Nama Pelanggan:</strong><br>
                        ${order.customer.name}
                    </div>
                    <div>
                        <strong>Nomor Meja:</strong><br>
                        ${order.customer.table}
                    </div>
                    <div>
                        <strong>Metode Pembayaran:</strong><br>
                        ${order.customer.payment}
                    </div>
                    <div>
                        <strong>Status:</strong><br>
                        <span style="background: var(--success-light); color: var(--success); padding: 0.25rem 0.75rem; border-radius: var(--radius-full); font-size: 0.85rem; font-weight: 600;">Selesai</span>
                    </div>
                </div>
                ${order.customer.notes ? `
                    <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--latte);">
                        <strong>Catatan:</strong><br>
                        <em>${order.customer.notes}</em>
                    </div>
                ` : ''}
            </div>
        </div>

        <div style="margin-bottom: 2rem;">
            <h3 style="color: var(--mocha); margin-bottom: 1rem;">🛒 Detail Pesanan</h3>
            <div style="background: var(--vanilla); border-radius: var(--radius-md); overflow: hidden;">
                ${order.items.map(item => `
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; border-bottom: 1px solid var(--cream);">
                        <div style="display: flex; align-items: center; gap: 1rem;">
                            <span style="font-size: 2rem;">${item.image}</span>
                            <div>
                                <div style="font-weight: 600; color: var(--text-dark);">${item.name}</div>
                                <div style="color: var(--text-medium); font-size: 0.9rem;">Rp ${item.price.toLocaleString('id-ID')} x ${item.quantity}</div>
                            </div>
                        </div>
                        <div style="font-weight: 700; color: var(--mocha);">
                            Rp ${(item.price * item.quantity).toLocaleString('id-ID')}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>

        <div style="background: var(--gradient-warm); padding: 1.5rem; border-radius: var(--radius-md);">
            <h3 style="color: var(--mocha); margin-bottom: 1rem;">💰 Ringkasan Pembayaran</h3>
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                <span>Subtotal:</span>
                <span>Rp ${order.total.toLocaleString('id-ID')}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                <span>Pajak (10%):</span>
                <span>Rp ${taxAmount.toLocaleString('id-ID')}</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 1.2rem; font-weight: 700; color: var(--mocha); padding-top: 1rem; border-top: 2px solid var(--caramel);">
                <span>Total Pembayaran:</span>
                <span>Rp ${finalTotal.toLocaleString('id-ID')}</span>
            </div>
        </div>
    `;

    // Set up reorder button
    const reorderBtn = document.getElementById('reorderBtn');
    if (reorderBtn) {
        reorderBtn.onclick = () => reorderFromHistory(orderId);
    }

    modal.classList.add('active');
    overlay.classList.add('active');
}

// Reorder items from history
function reorderFromHistory(orderId) {
    const order = orderHistory.find(o => o.id === orderId);
    if (!order) return;

    // Store order items in sessionStorage to be picked up by order page
    sessionStorage.setItem('cappunabara_reorder_items', JSON.stringify(order.items));
    sessionStorage.setItem('cappunabara_reorder_customer', JSON.stringify(order.customer));

    // Show notification and redirect
    showNotification('Pesanan ditambahkan ke keranjang! Mengarahkan ke halaman order...');
    
    setTimeout(() => {
        window.location.href = '/Order';
    }, 1500);
}

// Download specific order receipt - WORKING VERSION
function downloadOrderReceipt(orderId) {
    console.log('downloadOrderReceipt called for:', orderId);
    
    const orderHistory = JSON.parse(localStorage.getItem('cappunabara_order_history') || '[]');
    const order = orderHistory.find(o => o.id === orderId);
    
    if (!order) {
        alert('❌ Pesanan tidak ditemukan!');
        return;
    }
    
    // Use the working PDF function
    createWorkingPDF(order);
}

// Download receipt - WORKING VERSION
function downloadReceipt() {
    console.log('downloadReceipt called - WORKING IMPLEMENTATION');
    
    // Get order data directly
    const orderHistory = JSON.parse(localStorage.getItem('cappunabara_order_history') || '[]');
    
    if (orderHistory.length === 0) {
        alert('❌ TIDAK ADA PESANAN!\n\nSilakan buat pesanan terlebih dahulu di halaman Order.');
        return;
    }
    
    // Get latest order
    const order = orderHistory[0];
    
    // Create and download working PDF
    createWorkingPDF(order);
}

// Create simple PDF - BULLETPROOF VERSION
function createSimplePDF(order) {
    console.log('Creating simple PDF for order:', order.id);
    
    // Calculate totals
    const subtotal = order.total;
    const tax = subtotal * 0.1;
    const finalTotal = subtotal + tax;
    const orderDate = new Date(order.timestamp);
    
    // Create simple HTML content
    const htmlContent = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Struk Cappunabara - ${order.id}</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; margin: 0; }
        .struk { max-width: 400px; margin: 0 auto; border: 2px solid #8B6F47; padding: 20px; }
        .header { text-align: center; margin-bottom: 20px; }
        .brand { font-size: 24px; font-weight: bold; color: #8B6F47; }
        .info { margin: 15px 0; }
        .info-row { display: flex; justify-content: space-between; margin: 5px 0; }
        .items { margin: 20px 0; }
        .item { display: flex; justify-content: space-between; margin: 8px 0; }
        .totals { margin-top: 20px; border-top: 2px solid #8B6F47; padding-top: 15px; }
        .total-row { display: flex; justify-content: space-between; margin: 5px 0; }
        .final-total { font-weight: bold; font-size: 18px; color: #8B6F47; }
        .instructions { background: #e3f2fd; padding: 15px; margin-bottom: 20px; text-align: center; border-radius: 8px; }
        .btn { background: #4CAF50; color: white; border: none; padding: 12px 24px; border-radius: 5px; cursor: pointer; font-size: 16px; margin: 5px; }
        @media print { .instructions { display: none; } }
    </style>
</head>
<body>
    <div class="instructions">
        <h3>📥 CARA DOWNLOAD PDF:</h3>
        <p><strong>1. Klik tombol "PRINT/SAVE PDF" di bawah</strong></p>
        <p><strong>2. Pilih "Save as PDF" di dialog print</strong></p>
        <p><strong>3. Klik "Save" untuk menyimpan</strong></p>
        <button class="btn" onclick="window.print()">🖨️ PRINT / SAVE PDF</button>
        <button class="btn" style="background: #f44336;" onclick="window.close()">❌ TUTUP</button>
    </div>
    
    <div class="struk">
        <div class="header">
            <div style="font-size: 36px;">☕</div>
            <div class="brand">CAPPUNABARA</div>
            <div>Your Cozy Corner</div>
        </div>
        
        <div style="text-align: center; font-weight: bold; margin: 15px 0;">STRUK PEMBELIAN</div>
        
        <div class="info">
            <div class="info-row"><span>No. Pesanan:</span><span>${order.id}</span></div>
            <div class="info-row"><span>Tanggal:</span><span>${orderDate.toLocaleDateString('id-ID')}</span></div>
            <div class="info-row"><span>Waktu:</span><span>${orderDate.toLocaleTimeString('id-ID')}</span></div>
            <div class="info-row"><span>Pelanggan:</span><span>${order.customer.name}</span></div>
            <div class="info-row"><span>Meja:</span><span>${order.customer.table}</span></div>
            <div class="info-row"><span>Pembayaran:</span><span>${order.customer.payment}</span></div>
        </div>
        
        <div class="items">
            <div style="font-weight: bold; margin-bottom: 10px;">DETAIL PESANAN:</div>
            ${order.items.map(item => `
                <div class="item">
                    <span>${item.name} x${item.quantity}</span>
                    <span>Rp ${(item.price * item.quantity).toLocaleString('id-ID')}</span>
                </div>
            `).join('')}
        </div>
        
        <div class="totals">
            <div class="total-row"><span>Subtotal:</span><span>Rp ${subtotal.toLocaleString('id-ID')}</span></div>
            <div class="total-row"><span>Pajak (10%):</span><span>Rp ${tax.toLocaleString('id-ID')}</span></div>
            <div class="total-row final-total"><span>TOTAL:</span><span>Rp ${finalTotal.toLocaleString('id-ID')}</span></div>
        </div>
        
        <div style="text-align: center; margin-top: 20px; font-size: 14px;">
            <div style="font-weight: bold;">Terima kasih sudah berbelanja di Cappunabara! 💖</div>
            <div>📞 0812-3456-7890 | 📧 hello@cafeluna.com</div>
            <div>📍 Jl. Kopi Hangat No. 123, Jakarta</div>
        </div>
    </div>
    
    <script>
        window.focus();
        setTimeout(function() {
            alert('CARA DOWNLOAD PDF:\\n\\n1. Klik tombol "PRINT/SAVE PDF"\\n2. Pilih "Save as PDF"\\n3. Klik "Save"\\n\\nStruk akan tersimpan sebagai file PDF!');
        }, 1000);
    </script>
</body>
</html>`;
    
    // Open in new window
    const printWindow = window.open('', '_blank', 'width=800,height=1000');
    
    if (!printWindow) {
        alert('❌ POPUP DIBLOKIR!\\n\\nSilakan:\\n1. Allow popup untuk localhost:5140\\n2. Refresh halaman\\n3. Coba lagi');
        return;
    }
    
    // Write content and close
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    
    // Show success message
    alert('✅ STRUK BERHASIL DIBUKA!\\n\\nTab baru telah terbuka dengan struk.\\nKlik "PRINT/SAVE PDF" untuk download.');
    
    console.log('Simple PDF window opened successfully for order:', order.id);
}

// Generate Receipt PDF
function generateReceiptPDF(orderData) {
    // Calculate tax and totals
    const taxAmount = orderData.total * 0.1;
    const finalTotal = orderData.total + taxAmount;
    
    // Get items HTML
    let itemsHTML = '';
    orderData.items.forEach(item => {
        itemsHTML += `
            <tr>
                <td style="padding: 8px 0; border-bottom: 1px dashed #ddd; font-weight: 500;">${item.name}</td>
                <td style="padding: 8px 0; border-bottom: 1px dashed #ddd; text-align: center; color: #666;">x${item.quantity}</td>
                <td style="padding: 8px 0; border-bottom: 1px dashed #ddd; text-align: right; font-weight: 600; color: #8B6F47;">Rp ${(item.price * item.quantity).toLocaleString('id-ID')}</td>
            </tr>
        `;
    });

    const printWindow = window.open('', '_blank', 'width=800,height=1000');
    
    const printHTML = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Cappunabara - Receipt ${orderData.id}</title>
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
                
                .logo {
                    font-size: 48px;
                    margin-bottom: 10px;
                }
                
                .brand-name {
                    font-size: 32px;
                    font-weight: 800;
                    letter-spacing: 2px;
                    margin-bottom: 8px;
                }
                
                .tagline {
                    font-size: 16px;
                    opacity: 0.9;
                    font-style: italic;
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
                }
            </style>
        </head>
        <body>
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
                                <td class="info-value"><span class="order-number">${orderData.id}</span></td>
                            </tr>
                            <tr>
                                <td class="info-label">Tanggal:</td>
                                <td class="info-value">${orderData.timestamp.toLocaleDateString('id-ID')}</td>
                            </tr>
                            <tr>
                                <td class="info-label">Waktu:</td>
                                <td class="info-value">${orderData.timestamp.toLocaleTimeString('id-ID')}</td>
                            </tr>
                            <tr>
                                <td class="info-label">Nama Pelanggan:</td>
                                <td class="info-value">${orderData.customer.name}</td>
                            </tr>
                            <tr>
                                <td class="info-label">Nomor Meja:</td>
                                <td class="info-value">${orderData.customer.table}</td>
                            </tr>
                            <tr>
                                <td class="info-label">Metode Pembayaran:</td>
                                <td class="info-value">${orderData.customer.payment}</td>
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
                                <td class="summary-value">Rp ${orderData.total.toLocaleString('id-ID')}</td>
                            </tr>
                            <tr>
                                <td class="summary-label">Pajak (10%):</td>
                                <td class="summary-value">Rp ${taxAmount.toLocaleString('id-ID')}</td>
                            </tr>
                            <tr class="total-row">
                                <td class="summary-label">TOTAL PEMBAYARAN:</td>
                                <td class="summary-value">Rp ${finalTotal.toLocaleString('id-ID')}</td>
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
                    // Show print dialog immediately
                    setTimeout(function() {
                        window.print();
                    }, 500);
                    
                    // Close window after print or after delay
                    window.onafterprint = function() {
                        setTimeout(function() {
                            window.close();
                        }, 1000);
                    };
                    
                    // Fallback close after 10 seconds
                    setTimeout(function() {
                        window.close();
                    }, 10000);
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
    showNotification('Struk berhasil dibuka! Gunakan Ctrl+P untuk print atau Save as PDF', 'success');
}

// Clear all history
function clearAllHistory() {
    if (!confirm('Apakah Anda yakin ingin menghapus semua riwayat pesanan? Tindakan ini tidak dapat dibatalkan.')) {
        return;
    }

    orderHistory = [];
    customerData = {};
    
    localStorage.removeItem('cappunabara_order_history');
    localStorage.removeItem('cappunabara_customer_data');
    
    loadHistoryData();
    showNotification('Semua riwayat pesanan telah dihapus');
}

// Save history data
function saveHistoryData() {
    try {
        // Force save current data with updated timestamp
        const updatedOrderHistory = orderHistory.map(order => ({
            ...order,
            timestamp: order.timestamp || new Date().toISOString()
        }));
        
        const updatedCustomerData = {
            ...customerData,
            lastOrderDate: new Date().toISOString(),
            totalOrders: updatedOrderHistory.length,
            totalSpent: updatedOrderHistory.reduce((sum, order) => sum + (order.total || 0), 0)
        };
        
        localStorage.setItem('cappunabara_order_history', JSON.stringify(updatedOrderHistory));
        localStorage.setItem('cappunabara_customer_data', JSON.stringify(updatedCustomerData));
        
        // Update global variables
        orderHistory = updatedOrderHistory;
        customerData = updatedCustomerData;
        
        console.log('History data saved successfully');
        showNotification('Data riwayat pesanan berhasil disimpan!', 'success');
        
        // Trigger storage event to update other tabs/pages
        window.dispatchEvent(new StorageEvent('storage', {
            key: 'cappunabara_order_history',
            newValue: JSON.stringify(updatedOrderHistory)
        }));
        
        window.dispatchEvent(new StorageEvent('storage', {
            key: 'cappunabara_customer_data',
            newValue: JSON.stringify(updatedCustomerData)
        }));
        
        // Reload data to reflect changes
        loadHistoryData();
        
    } catch (error) {
        console.error('Error saving history data:', error);
        showNotification('Error menyimpan data riwayat!', 'error');
    }
}

// Close all modals
function closeAllModals() {
    const modals = document.querySelectorAll('.modal');
    const overlay = document.getElementById('overlay');
    
    modals.forEach(modal => modal.classList.remove('active'));
    if (overlay) overlay.classList.remove('active');
}

// Close order detail modal
function closeOrderDetailModal() {
    const modal = document.getElementById('orderDetailModal');
    const overlay = document.getElementById('overlay');
    
    if (modal) modal.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
}

// Show notification
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'var(--success)' : 'var(--danger)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-lg);
        z-index: 3000;
        transform: translateX(400px);
        transition: var(--transition-smooth);
        max-width: 350px;
        font-weight: 600;
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="font-size: 1.2rem;">${type === 'success' ? '✅' : '❌'}</span>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Debounce function for search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle reorder from session storage (called from order page)
function handleReorderFromSession() {
    const reorderItems = sessionStorage.getItem('cappunabara_reorder_items');
    const reorderCustomer = sessionStorage.getItem('cappunabara_reorder_customer');
    
    if (reorderItems && reorderCustomer) {
        const items = JSON.parse(reorderItems);
        const customer = JSON.parse(reorderCustomer);
        
        // Clear session storage
        sessionStorage.removeItem('cappunabara_reorder_items');
        sessionStorage.removeItem('cappunabara_reorder_customer');
        
        return { items, customer };
    }
    
    return null;
}

// Export functions for use in other pages
window.cappunabaraHistory = {
    handleReorderFromSession,
    showNotification,
    // Debug functions
    checkLocalStorage: function() {
        console.log('=== localStorage Debug Info ===');
        console.log('Order History:', localStorage.getItem('cappunabara_order_history'));
        console.log('Customer Data:', localStorage.getItem('cappunabara_customer_data'));
        console.log('Parsed Order History:', JSON.parse(localStorage.getItem('cappunabara_order_history') || '[]'));
        console.log('Parsed Customer Data:', JSON.parse(localStorage.getItem('cappunabara_customer_data') || '{}'));
        return {
            orderHistory: JSON.parse(localStorage.getItem('cappunabara_order_history') || '[]'),
            customerData: JSON.parse(localStorage.getItem('cappunabara_customer_data') || '{}')
        };
    },
    clearLocalStorage: function() {
        localStorage.removeItem('cappunabara_order_history');
        localStorage.removeItem('cappunabara_customer_data');
        console.log('localStorage cleared');
        loadHistoryData();
    },
    reloadData: function() {
        loadHistoryData();
    }
};
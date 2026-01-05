// ========== CAPPUNABARA ADMIN - DATA PESANAN ==========

// Global variables
let allOrders = [];
let filteredOrders = [];
let currentPage = 1;
let itemsPerPage = 10;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Cappunabara Admin Orders System Loading...');
    loadOrderData();
    setupEventListeners();
    console.log('Cappunabara Admin Orders System Loaded Successfully!');
});

// Reload data when page becomes visible (user switches back to tab)
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        console.log('Admin page became visible, reloading data...');
        loadOrderData();
    }
});

// Reload data when window gains focus
window.addEventListener('focus', function() {
    console.log('Admin window gained focus, reloading data...');
    loadOrderData();
});

// Auto-refresh data every 30 seconds
setInterval(function() {
    console.log('Auto-refreshing order data...');
    loadOrderData();
}, 30000);

// Listen for storage events from other tabs/pages
window.addEventListener('storage', function(e) {
    if (e.key === 'cappunabara_order_history' || e.key === 'cappunabara_customer_data') {
        console.log('Storage event detected, reloading data...');
        loadOrderData();
    }
});

// Load order data from localStorage
function loadOrderData() {
    console.log('Loading order data...');
    
    // Get data from localStorage (same as customer order history)
    const orderHistory = JSON.parse(localStorage.getItem('cappunabara_order_history')) || [];
    
    console.log('Raw order history from localStorage:', orderHistory);
    
    // Convert order history to admin format if needed
    const convertedOrders = orderHistory.map(order => {
        // Ensure timestamp is a Date object
        const timestamp = order.timestamp ? new Date(order.timestamp) : new Date();
        
        return {
            ...order,
            timestamp: timestamp,
            // Ensure all required fields exist
            status: order.status || 'completed',
            subtotal: order.total || 0,
            tax: (order.total || 0) * 0.1,
            totalWithTax: (order.total || 0) + ((order.total || 0) * 0.1)
        };
    });
    
    // Add sample data only if no real orders exist
    if (convertedOrders.length === 0) {
        console.log('No real orders found, generating sample data...');
        const sampleOrders = generateSampleOrders();
        allOrders = sampleOrders;
        showNotification('Menampilkan data contoh. Lakukan pesanan di halaman Order untuk melihat data real.', 'info');
    } else {
        console.log(`Found ${convertedOrders.length} real orders from localStorage`);
        allOrders = convertedOrders;
        showNotification(`Data berhasil dimuat: ${convertedOrders.length} pesanan ditemukan`, 'success');
    }
    
    filteredOrders = [...allOrders];
    updateStatistics();
    displayOrders();
    updatePagination();
    
    console.log(`Total orders loaded: ${allOrders.length}`);
}

// Save all data to localStorage
function saveAllData() {
    try {
        // Force save current data
        localStorage.setItem('cappunabara_order_history', JSON.stringify(allOrders));
        
        // Update customer data based on orders
        const customerData = {};
        if (allOrders.length > 0) {
            const latestOrder = allOrders[0];
            customerData.name = latestOrder.customer.name;
            customerData.phone = latestOrder.customer.phone;
            customerData.lastOrderDate = new Date().toISOString();
            customerData.totalOrders = allOrders.length;
            customerData.totalSpent = allOrders.reduce((sum, order) => {
                const subtotal = order.total || 0;
                const tax = subtotal * 0.1;
                return sum + subtotal + tax;
            }, 0);
        }
        
        localStorage.setItem('cappunabara_customer_data', JSON.stringify(customerData));
        
        console.log('All data saved successfully');
        showNotification('Semua data berhasil disimpan!', 'success');
        
        // Trigger storage event to update other tabs/pages
        window.dispatchEvent(new StorageEvent('storage', {
            key: 'cappunabara_order_history',
            newValue: JSON.stringify(allOrders)
        }));
        
        window.dispatchEvent(new StorageEvent('storage', {
            key: 'cappunabara_customer_data',
            newValue: JSON.stringify(customerData)
        }));
        
    } catch (error) {
        console.error('Error saving all data:', error);
        showNotification('Error menyimpan data!', 'error');
    }
}

// Generate sample orders for demonstration
function generateSampleOrders() {
    const sampleCustomers = [
        { name: 'Ahmad Rizki', phone: '081234567890' },
        { name: 'Siti Nurhaliza', phone: '081234567891' },
        { name: 'Budi Santoso', phone: '081234567892' },
        { name: 'Maya Sari', phone: '081234567893' },
        { name: 'Dedi Kurniawan', phone: '081234567894' }
    ];
    
    const sampleItems = [
        { name: 'Cappuccino Signature', price: 35000 },
        { name: 'Caffe Latte', price: 32000 },
        { name: 'Americano', price: 28000 },
        { name: 'Mocha Delight', price: 38000 },
        { name: 'Tiramisu Slice', price: 45000 },
        { name: 'Cheesecake Blueberry', price: 42000 }
    ];
    
    const paymentMethods = ['cash', 'transfer', 'ewallet'];
    const statuses = ['completed', 'pending'];
    
    const orders = [];
    
    for (let i = 1; i <= 25; i++) {
        const customer = sampleCustomers[Math.floor(Math.random() * sampleCustomers.length)];
        const itemCount = Math.floor(Math.random() * 3) + 1;
        const orderItems = [];
        
        for (let j = 0; j < itemCount; j++) {
            const item = sampleItems[Math.floor(Math.random() * sampleItems.length)];
            const quantity = Math.floor(Math.random() * 3) + 1;
            orderItems.push({
                ...item,
                quantity: quantity,
                id: j + 1
            });
        }
        
        const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const tax = subtotal * 0.1;
        const total = subtotal + tax;
        
        // Generate dates within last 30 days
        const daysAgo = Math.floor(Math.random() * 30);
        const orderDate = new Date();
        orderDate.setDate(orderDate.getDate() - daysAgo);
        
        orders.push({
            id: 'CPB' + String(Date.now() + i).slice(-6),
            customer: {
                name: customer.name,
                phone: customer.phone,
                table: 'A' + (Math.floor(Math.random() * 20) + 1),
                payment: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
                notes: ''
            },
            items: orderItems,
            timestamp: orderDate,
            total: subtotal,
            tax: tax,
            finalTotal: total,
            status: statuses[Math.floor(Math.random() * statuses.length)]
        });
    }
    
    return orders.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}

// Update statistics
function updateStatistics() {
    const totalOrders = allOrders.length;
    
    // Calculate total revenue properly
    const totalRevenue = allOrders.reduce((sum, order) => {
        const subtotal = order.total || 0;
        const tax = subtotal * 0.1;
        const finalTotal = subtotal + tax;
        return sum + finalTotal;
    }, 0);
    
    // Today's orders
    const today = new Date();
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const todayOrders = allOrders.filter(order => new Date(order.timestamp) >= todayStart).length;
    
    // Average order value
    const avgOrder = totalOrders > 0 ? totalRevenue / totalOrders : 0;
    
    // Update DOM
    document.getElementById('totalOrders').textContent = totalOrders;
    document.getElementById('totalRevenue').textContent = `Rp ${totalRevenue.toLocaleString('id-ID')}`;
    document.getElementById('todayOrders').textContent = todayOrders;
    document.getElementById('avgOrder').textContent = `Rp ${Math.round(avgOrder).toLocaleString('id-ID')}`;
    
    console.log('Statistics updated:', {
        totalOrders,
        totalRevenue,
        todayOrders,
        avgOrder
    });
}

// Display orders in table
function displayOrders() {
    const tableBody = document.getElementById('ordersTableBody');
    const emptyState = document.getElementById('emptyState');
    
    if (filteredOrders.length === 0) {
        tableBody.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }
    
    emptyState.style.display = 'none';
    
    // Calculate pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageOrders = filteredOrders.slice(startIndex, endIndex);
    
    tableBody.innerHTML = pageOrders.map((order, index) => {
        const rowNumber = startIndex + index + 1;
        const orderDate = new Date(order.timestamp).toLocaleDateString('id-ID');
        const orderTime = new Date(order.timestamp).toLocaleTimeString('id-ID', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        const itemsText = order.items.map(item => `${item.name} (${item.quantity}x)`).join(', ');
        const itemsDisplay = itemsText.length > 50 ? itemsText.substring(0, 50) + '...' : itemsText;
        
        // Calculate totals properly
        const subtotal = order.total || 0;
        const tax = subtotal * 0.1;
        const finalTotal = subtotal + tax;
        
        return `
            <tr>
                <td>${rowNumber}</td>
                <td><strong>${order.id}</strong></td>
                <td>${orderDate}<br><small>${orderTime}</small></td>
                <td>
                    <strong>${order.customer.name}</strong><br>
                    <small>${order.customer.phone || 'N/A'}</small>
                </td>
                <td><span class="table-badge">${order.customer.table}</span></td>
                <td title="${itemsText}">${itemsDisplay}</td>
                <td>Rp ${subtotal.toLocaleString('id-ID')}</td>
                <td>Rp ${tax.toLocaleString('id-ID')}</td>
                <td><strong>Rp ${finalTotal.toLocaleString('id-ID')}</strong></td>
                <td><span class="status-badge status-${order.status}">${getStatusText(order.status)}</span></td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-action btn-view" onclick="viewOrderDetail('${order.id}')" title="Lihat Detail">
                            👁️
                        </button>
                        <button class="btn-action btn-edit" onclick="editOrder('${order.id}')" title="Edit">
                            ✏️
                        </button>
                        <button class="btn-action btn-delete" onclick="deleteOrder('${order.id}')" title="Hapus">
                            🗑️
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

// Get status text in Indonesian
function getStatusText(status) {
    const statusMap = {
        'completed': 'Selesai',
        'pending': 'Pending',
        'cancelled': 'Dibatalkan'
    };
    return statusMap[status] || status;
}

// Filter orders
function filterOrders() {
    const dateFilter = document.getElementById('dateFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;
    const searchFilter = document.getElementById('searchFilter').value.toLowerCase();
    
    filteredOrders = allOrders.filter(order => {
        // Date filter
        let dateMatch = true;
        if (dateFilter !== 'all') {
            const orderDate = new Date(order.timestamp);
            const now = new Date();
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            
            switch (dateFilter) {
                case 'today':
                    dateMatch = orderDate >= today;
                    break;
                case 'week':
                    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
                    dateMatch = orderDate >= weekAgo;
                    break;
                case 'month':
                    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
                    dateMatch = orderDate >= monthAgo;
                    break;
            }
        }
        
        // Status filter
        const statusMatch = statusFilter === 'all' || order.status === statusFilter;
        
        // Search filter
        const searchMatch = searchFilter === '' || 
            order.id.toLowerCase().includes(searchFilter) ||
            order.customer.name.toLowerCase().includes(searchFilter) ||
            order.customer.phone.toLowerCase().includes(searchFilter);
        
        return dateMatch && statusMatch && searchMatch;
    });
    
    currentPage = 1;
    displayOrders();
    updatePagination();
}

// Update pagination
function updatePagination() {
    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredOrders.length);
    
    // Update pagination info
    document.getElementById('showingStart').textContent = filteredOrders.length > 0 ? startIndex + 1 : 0;
    document.getElementById('showingEnd').textContent = endIndex;
    document.getElementById('totalRecords').textContent = filteredOrders.length;
    
    // Generate pagination buttons
    const pagination = document.getElementById('pagination');
    let paginationHTML = '';
    
    // Previous button
    paginationHTML += `
        <button class="pagination-btn" onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>
            ‹ Prev
        </button>
    `;
    
    // Page numbers
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
        paginationHTML += `
            <button class="pagination-btn ${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">
                ${i}
            </button>
        `;
    }
    
    // Next button
    paginationHTML += `
        <button class="pagination-btn" onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>
            Next ›
        </button>
    `;
    
    pagination.innerHTML = paginationHTML;
}

// Change page
function changePage(page) {
    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
    if (page >= 1 && page <= totalPages) {
        currentPage = page;
        displayOrders();
        updatePagination();
    }
}

// View order detail
function viewOrderDetail(orderId) {
    const order = allOrders.find(o => o.id === orderId);
    if (!order) return;
    
    const modal = document.getElementById('orderDetailModal');
    const overlay = document.getElementById('overlay');
    const content = document.getElementById('orderDetailContent');
    
    const orderDate = new Date(order.timestamp).toLocaleString('id-ID');
    
    content.innerHTML = `
        <div class="order-detail">
            <div class="detail-section">
                <h3>📋 Informasi Pesanan</h3>
                <div class="detail-grid">
                    <div class="detail-item">
                        <label>No. Pesanan:</label>
                        <span><strong>${order.id}</strong></span>
                    </div>
                    <div class="detail-item">
                        <label>Tanggal:</label>
                        <span>${orderDate}</span>
                    </div>
                    <div class="detail-item">
                        <label>Status:</label>
                        <span class="status-badge status-${order.status}">${getStatusText(order.status)}</span>
                    </div>
                </div>
            </div>
            
            <div class="detail-section">
                <h3>👤 Informasi Pelanggan</h3>
                <div class="detail-grid">
                    <div class="detail-item">
                        <label>Nama:</label>
                        <span>${order.customer.name}</span>
                    </div>
                    <div class="detail-item">
                        <label>No. Telepon:</label>
                        <span>${order.customer.phone || 'N/A'}</span>
                    </div>
                    <div class="detail-item">
                        <label>No. Meja:</label>
                        <span>${order.customer.table}</span>
                    </div>
                    <div class="detail-item">
                        <label>Metode Pembayaran:</label>
                        <span>${getPaymentMethodText(order.customer.payment)}</span>
                    </div>
                </div>
            </div>
            
            <div class="detail-section">
                <h3>🛒 Detail Items</h3>
                <div class="items-list">
                    ${order.items.map(item => `
                        <div class="item-row">
                            <div class="item-info">
                                <strong>${item.name}</strong>
                                <span class="item-qty">x${item.quantity}</span>
                            </div>
                            <div class="item-price">
                                Rp ${(item.price * item.quantity).toLocaleString('id-ID')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="detail-section">
                <h3>💰 Ringkasan Pembayaran</h3>
                <div class="payment-summary">
                    <div class="summary-row">
                        <span>Subtotal:</span>
                        <span>Rp ${order.total.toLocaleString('id-ID')}</span>
                    </div>
                    <div class="summary-row">
                        <span>Pajak (10%):</span>
                        <span>Rp ${order.tax.toLocaleString('id-ID')}</span>
                    </div>
                    <div class="summary-row total-row">
                        <span><strong>Total:</strong></span>
                        <span><strong>Rp ${order.finalTotal.toLocaleString('id-ID')}</strong></span>
                    </div>
                </div>
            </div>
            
            ${order.customer.notes ? `
                <div class="detail-section">
                    <h3>📝 Catatan</h3>
                    <p>${order.customer.notes}</p>
                </div>
            ` : ''}
        </div>
    `;
    
    modal.classList.add('active');
    overlay.classList.add('active');
}

// Get payment method text
function getPaymentMethodText(method) {
    const methodMap = {
        'cash': 'Cash',
        'transfer': 'Transfer Bank',
        'ewallet': 'E-Wallet'
    };
    return methodMap[method] || method;
}

// Edit order
function editOrder(orderId) {
    const order = allOrders.find(o => o.id === orderId);
    if (!order) {
        showNotification('Pesanan tidak ditemukan!', 'error');
        return;
    }
    
    // Show edit modal
    showEditOrderModal(order);
}

// Show edit order modal
function showEditOrderModal(order) {
    let modal = document.getElementById('editOrderModal');
    const overlay = document.getElementById('overlay');
    
    if (!modal) {
        createEditOrderModal();
        modal = document.getElementById('editOrderModal');
    }
    
    // Populate form with order data
    document.getElementById('editOrderId').value = order.id;
    document.getElementById('editCustomerName').value = order.customer.name;
    document.getElementById('editCustomerPhone').value = order.customer.phone || '';
    document.getElementById('editTableNumber').value = order.customer.table;
    document.getElementById('editPaymentMethod').value = order.customer.payment;
    document.getElementById('editOrderNotes').value = order.customer.notes || '';
    document.getElementById('editOrderStatus').value = order.status;
    
    // Populate items
    const itemsContainer = document.getElementById('editOrderItems');
    itemsContainer.innerHTML = order.items.map((item, index) => `
        <div class="edit-item" data-index="${index}">
            <div class="edit-item-info">
                <span class="edit-item-name">${item.name}</span>
                <span class="edit-item-price">Rp ${item.price.toLocaleString('id-ID')}</span>
            </div>
            <div class="edit-item-controls">
                <button type="button" class="qty-btn" onclick="updateEditItemQty(${index}, -1)">-</button>
                <span class="qty-display" id="editQty${index}">${item.quantity}</span>
                <button type="button" class="qty-btn" onclick="updateEditItemQty(${index}, 1)">+</button>
                <button type="button" class="btn-remove-item" onclick="removeEditItem(${index})">🗑️</button>
            </div>
        </div>
    `).join('');
    
    // Store current order data for editing
    window.currentEditOrder = { ...order };
    
    // Update total
    updateEditOrderTotal();
    
    // Show modal
    modal.classList.add('active');
    overlay.classList.add('active');
}

// Create edit order modal
function createEditOrderModal() {
    const modalHTML = `
        <div class="modal" id="editOrderModal">
            <div class="modal-container">
                <div class="modal-header">
                    <h2 class="modal-title">✏️ Edit Pesanan</h2>
                    <button class="modal-close" onclick="closeEditOrderModal()">✕</button>
                </div>
                
                <div class="modal-body">
                    <form id="editOrderForm" onsubmit="saveEditOrder(event)">
                        <input type="hidden" id="editOrderId">
                        
                        <div class="form-section">
                            <h3>👤 Data Pelanggan</h3>
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="editCustomerName">Nama Pelanggan *</label>
                                    <input type="text" id="editCustomerName" required>
                                </div>
                                <div class="form-group">
                                    <label for="editCustomerPhone">Nomor Telepon</label>
                                    <input type="tel" id="editCustomerPhone">
                                </div>
                            </div>
                            
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="editTableNumber">Nomor Meja *</label>
                                    <input type="text" id="editTableNumber" required>
                                </div>
                                <div class="form-group">
                                    <label for="editPaymentMethod">Metode Pembayaran *</label>
                                    <select id="editPaymentMethod" required>
                                        <option value="cash">Cash</option>
                                        <option value="transfer">Transfer Bank</option>
                                        <option value="ewallet">E-Wallet</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label for="editOrderStatus">Status Pesanan</label>
                                <select id="editOrderStatus">
                                    <option value="pending">Pending</option>
                                    <option value="completed">Selesai</option>
                                    <option value="cancelled">Dibatalkan</option>
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <label for="editOrderNotes">Catatan</label>
                                <textarea id="editOrderNotes" rows="2"></textarea>
                            </div>
                        </div>
                        
                        <div class="form-section">
                            <h3>🛒 Item Pesanan</h3>
                            <div id="editOrderItems" class="edit-items-container">
                                <!-- Items will be populated here -->
                            </div>
                            
                            <div class="edit-total">
                                <div class="total-row">
                                    <span>Subtotal:</span>
                                    <span id="editSubtotal">Rp 0</span>
                                </div>
                                <div class="total-row">
                                    <span>Pajak (10%):</span>
                                    <span id="editTax">Rp 0</span>
                                </div>
                                <div class="total-row total-final">
                                    <span><strong>Total:</strong></span>
                                    <span><strong id="editGrandTotal">Rp 0</strong></span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="form-actions">
                            <button type="button" class="btn-cancel" onclick="closeEditOrderModal()">
                                ❌ Batal
                            </button>
                            <button type="submit" class="btn-save-edit">
                                💾 Simpan Perubahan
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Update item quantity in edit modal
function updateEditItemQty(index, change) {
    if (!window.currentEditOrder) return;
    
    const item = window.currentEditOrder.items[index];
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeEditItem(index);
        return;
    }
    
    // Update display
    document.getElementById(`editQty${index}`).textContent = item.quantity;
    updateEditOrderTotal();
}

// Remove item from edit modal
function removeEditItem(index) {
    if (!window.currentEditOrder) return;
    
    if (window.currentEditOrder.items.length <= 1) {
        showNotification('Pesanan harus memiliki minimal 1 item!', 'error');
        return;
    }
    
    // Remove item
    window.currentEditOrder.items.splice(index, 1);
    
    // Re-render items
    const itemsContainer = document.getElementById('editOrderItems');
    itemsContainer.innerHTML = window.currentEditOrder.items.map((item, newIndex) => `
        <div class="edit-item" data-index="${newIndex}">
            <div class="edit-item-info">
                <span class="edit-item-name">${item.name}</span>
                <span class="edit-item-price">Rp ${item.price.toLocaleString('id-ID')}</span>
            </div>
            <div class="edit-item-controls">
                <button type="button" class="qty-btn" onclick="updateEditItemQty(${newIndex}, -1)">-</button>
                <span class="qty-display" id="editQty${newIndex}">${item.quantity}</span>
                <button type="button" class="qty-btn" onclick="updateEditItemQty(${newIndex}, 1)">+</button>
                <button type="button" class="btn-remove-item" onclick="removeEditItem(${newIndex})">🗑️</button>
            </div>
        </div>
    `).join('');
    
    updateEditOrderTotal();
}

// Update edit order total
function updateEditOrderTotal() {
    if (!window.currentEditOrder) return;
    
    const subtotal = window.currentEditOrder.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.1;
    const grandTotal = subtotal + tax;
    
    document.getElementById('editSubtotal').textContent = `Rp ${subtotal.toLocaleString('id-ID')}`;
    document.getElementById('editTax').textContent = `Rp ${tax.toLocaleString('id-ID')}`;
    document.getElementById('editGrandTotal').textContent = `Rp ${grandTotal.toLocaleString('id-ID')}`;
}

// Save edited order
function saveEditOrder(event) {
    event.preventDefault();
    
    if (!window.currentEditOrder) return;
    
    try {
        // Get form data
        const orderId = document.getElementById('editOrderId').value;
        const customerName = document.getElementById('editCustomerName').value;
        const customerPhone = document.getElementById('editCustomerPhone').value;
        const tableNumber = document.getElementById('editTableNumber').value;
        const paymentMethod = document.getElementById('editPaymentMethod').value;
        const orderNotes = document.getElementById('editOrderNotes').value;
        const orderStatus = document.getElementById('editOrderStatus').value;
        
        // Validate required fields
        if (!customerName || !tableNumber || !paymentMethod) {
            showNotification('Mohon lengkapi semua field yang wajib diisi!', 'error');
            return;
        }
        
        // Find and update order in allOrders
        const orderIndex = allOrders.findIndex(o => o.id === orderId);
        if (orderIndex === -1) {
            showNotification('Pesanan tidak ditemukan!', 'error');
            return;
        }
        
        // Calculate new total
        const newSubtotal = window.currentEditOrder.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        // Update order
        allOrders[orderIndex] = {
            ...allOrders[orderIndex],
            customer: {
                name: customerName,
                phone: customerPhone,
                table: tableNumber,
                payment: paymentMethod,
                notes: orderNotes
            },
            items: [...window.currentEditOrder.items],
            total: newSubtotal,
            status: orderStatus,
            lastModified: new Date().toISOString()
        };
        
        // Update localStorage
        localStorage.setItem('cappunabara_order_history', JSON.stringify(allOrders));
        
        // Update customer data if this is the latest order
        if (orderIndex === 0) {
            let customerData = JSON.parse(localStorage.getItem('cappunabara_customer_data') || '{}');
            customerData = {
                ...customerData,
                name: customerName,
                phone: customerPhone,
                lastOrderDate: new Date().toISOString(),
                totalSpent: allOrders.reduce((sum, order) => {
                    const subtotal = order.total || 0;
                    const tax = subtotal * 0.1;
                    return sum + subtotal + tax;
                }, 0)
            };
            localStorage.setItem('cappunabara_customer_data', JSON.stringify(customerData));
        }
        
        // Trigger storage events
        window.dispatchEvent(new StorageEvent('storage', {
            key: 'cappunabara_order_history',
            newValue: JSON.stringify(allOrders)
        }));
        
        // Refresh display
        filteredOrders = [...allOrders];
        updateStatistics();
        displayOrders();
        
        // Close modal
        closeEditOrderModal();
        
        // Show success message
        showNotification(`Pesanan ${orderId} berhasil diperbarui!`, 'success');
        
        console.log('Order updated successfully:', orderId);
        
    } catch (error) {
        console.error('Error saving edited order:', error);
        showNotification('Error menyimpan perubahan pesanan!', 'error');
    }
}

// Close edit order modal
function closeEditOrderModal() {
    const modal = document.getElementById('editOrderModal');
    const overlay = document.getElementById('overlay');
    
    if (modal) modal.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    
    // Clear current edit data
    window.currentEditOrder = null;
}

// Delete order
function deleteOrder(orderId) {
    if (confirm('Apakah Anda yakin ingin menghapus pesanan ini?')) {
        allOrders = allOrders.filter(order => order.id !== orderId);
        localStorage.setItem('cappunabara_order_history', JSON.stringify(allOrders));
        
        filterOrders();
        updateStatistics();
        
        showNotification('Pesanan berhasil dihapus!', 'success');
    }
}

// Close order detail modal
function closeOrderDetail() {
    const modal = document.getElementById('orderDetailModal');
    const overlay = document.getElementById('overlay');
    
    modal.classList.remove('active');
    overlay.classList.remove('active');
}

// Close all modals
function closeAllModals() {
    const modals = document.querySelectorAll('.modal');
    const overlay = document.getElementById('overlay');
    
    modals.forEach(modal => modal.classList.remove('active'));
    overlay.classList.remove('active');
}

// Export to CSV
function exportToCSV() {
    const headers = [
        'No',
        'No Pesanan',
        'Tanggal Pesanan',
        'Pelanggan',
        'No Telepon',
        'Meja',
        'Items',
        'Subtotal',
        'Pajak',
        'Total Pembayaran',
        'Metode Pembayaran',
        'Status'
    ];
    
    const csvData = filteredOrders.map((order, index) => {
        const items = order.items.map(item => `${item.name} (${item.quantity}x)`).join('; ');
        
        return [
            index + 1,
            order.id,
            new Date(order.timestamp).toLocaleString('id-ID'),
            order.customer.name,
            order.customer.phone || 'N/A',
            order.customer.table,
            items,
            order.total,
            order.tax,
            order.finalTotal,
            getPaymentMethodText(order.customer.payment),
            getStatusText(order.status)
        ];
    });
    
    const csvContent = [headers, ...csvData]
        .map(row => row.map(field => `"${field}"`).join(','))
        .join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `cappunabara-data-pesanan-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showNotification('Data berhasil diekspor ke CSV!', 'success');
}

// Setup event listeners
function setupEventListeners() {
    // Auto-refresh every 30 seconds
    setInterval(loadOrderData, 30000);
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${type === 'success' ? '✅' : '❌'}</span>
        <span>${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 120px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#F44336'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 9999;
        font-weight: 600;
        box-shadow: 0 4px 16px rgba(0,0,0,0.2);
        animation: slideInRight 0.3s ease;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add CSS for animations and additional styles
const additionalCSS = `
<style>
@keyframes slideInRight {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}

.table-badge {
    background: var(--caramel);
    color: var(--white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius-sm);
    font-size: 0.8rem;
    font-weight: 600;
}

.detail-section {
    margin-bottom: 2rem;
}

.detail-section h3 {
    color: var(--mocha);
    margin-bottom: 1rem;
    font-size: 1.2rem;
}

.detail-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
}

.detail-item {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.detail-item label {
    font-weight: 600;
    color: var(--text-medium);
    font-size: 0.9rem;
}

.items-list {
    border: 2px solid var(--cream);
    border-radius: var(--radius-md);
    overflow: hidden;
}

.item-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid var(--cream);
}

.item-row:last-child {
    border-bottom: none;
}

.item-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.item-qty {
    background: var(--vanilla);
    color: var(--text-dark);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius-sm);
    font-size: 0.8rem;
    font-weight: 600;
}

.item-price {
    font-weight: 600;
    color: var(--mocha);
}

.payment-summary {
    background: var(--vanilla);
    padding: 1.5rem;
    border-radius: var(--radius-md);
    border: 2px solid var(--cream);
}

.summary-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0;
}

.total-row {
    border-top: 2px solid var(--caramel);
    margin-top: 0.5rem;
    padding-top: 1rem;
    font-size: 1.1rem;
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', additionalCSS);
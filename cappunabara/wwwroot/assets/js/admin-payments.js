// ========== CAPPUNABARA ADMIN - DATA PEMBAYARAN ==========

// Global variables
let allPayments = [];
let filteredPayments = [];
let currentPage = 1;
let itemsPerPage = 10;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Cappunabara Admin Payments System Loading...');
    loadPaymentData();
    setupEventListeners();
    console.log('Cappunabara Admin Payments System Loaded Successfully!');
});

// Reload data when page becomes visible (user switches back to tab)
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        console.log('Admin payments page became visible, reloading data...');
        loadPaymentData();
    }
});

// Reload data when window gains focus
window.addEventListener('focus', function() {
    console.log('Admin payments window gained focus, reloading data...');
    loadPaymentData();
});

// Auto-refresh data every 30 seconds
setInterval(function() {
    console.log('Auto-refreshing payment data...');
    loadPaymentData();
}, 30000);

// Listen for storage events from other tabs/pages
window.addEventListener('storage', function(e) {
    if (e.key === 'cappunabara_order_history' || e.key === 'cappunabara_customer_data') {
        console.log('Storage event detected, reloading payment data...');
        loadPaymentData();
    }
});

// Load payment data from localStorage
function loadPaymentData() {
    console.log('Loading payment data...');
    
    // Get data from localStorage (same as order history)
    const orderHistory = JSON.parse(localStorage.getItem('cappunabara_order_history')) || [];
    
    console.log('Raw order history for payments:', orderHistory);
    
    // Convert orders to payment records
    allPayments = orderHistory.map(order => {
        const subtotal = order.total || 0;
        const tax = subtotal * 0.1;
        const total = subtotal + tax;
        
        return {
            id: order.id,
            orderId: order.id,
            timestamp: order.timestamp ? new Date(order.timestamp) : new Date(),
            customer: order.customer,
            paymentMethod: order.customer.payment,
            subtotal: subtotal,
            tax: tax,
            total: total,
            status: order.status || 'completed',
            items: order.items
        };
    });
    
    if (allPayments.length === 0) {
        console.log('No real payments found, will show empty state...');
        showNotification('Belum ada data pembayaran. Lakukan pesanan di halaman Order untuk melihat data real.', 'info');
    } else {
        console.log(`Found ${allPayments.length} real payments from localStorage`);
        showNotification(`Data pembayaran berhasil dimuat: ${allPayments.length} transaksi ditemukan`, 'success');
    }
    
    filteredPayments = [...allPayments];
    updatePaymentStatistics();
    updatePaymentChart();
    displayPayments();
    updatePaymentPagination();
    
    console.log(`Total payments loaded: ${allPayments.length}`);
}

// Save all payment data to localStorage
function saveAllPaymentData() {
    try {
        // Convert payments back to order format and save
        const orderHistory = allPayments.map(payment => ({
            id: payment.id,
            customer: payment.customer,
            items: payment.items,
            timestamp: payment.timestamp,
            total: payment.subtotal,
            status: payment.status
        }));
        
        localStorage.setItem('cappunabara_order_history', JSON.stringify(orderHistory));
        
        // Update customer data
        const customerData = {};
        if (allPayments.length > 0) {
            const latestPayment = allPayments[0];
            customerData.name = latestPayment.customer.name;
            customerData.phone = latestPayment.customer.phone;
            customerData.lastOrderDate = new Date().toISOString();
            customerData.totalOrders = allPayments.length;
            customerData.totalSpent = allPayments.reduce((sum, payment) => sum + payment.total, 0);
        }
        
        localStorage.setItem('cappunabara_customer_data', JSON.stringify(customerData));
        
        console.log('All payment data saved successfully');
        showNotification('Semua data pembayaran berhasil disimpan!', 'success');
        
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
        console.error('Error saving all payment data:', error);
        showNotification('Error menyimpan data pembayaran!', 'error');
    }
}

// Update payment statistics
function updatePaymentStatistics() {
    const totalPayments = allPayments.reduce((sum, payment) => sum + payment.total, 0);
    
    // Group by payment method
    const paymentsByMethod = allPayments.reduce((acc, payment) => {
        const method = payment.paymentMethod;
        if (!acc[method]) acc[method] = 0;
        acc[method] += payment.total;
        return acc;
    }, {});
    
    const cashPayments = paymentsByMethod.cash || 0;
    const transferPayments = paymentsByMethod.transfer || 0;
    const ewalletPayments = paymentsByMethod.ewallet || 0;
    
    // Update DOM
    document.getElementById('totalPayments').textContent = `Rp ${totalPayments.toLocaleString('id-ID')}`;
    document.getElementById('cashPayments').textContent = `Rp ${cashPayments.toLocaleString('id-ID')}`;
    document.getElementById('transferPayments').textContent = `Rp ${transferPayments.toLocaleString('id-ID')}`;
    document.getElementById('ewalletPayments').textContent = `Rp ${ewalletPayments.toLocaleString('id-ID')}`;
}

// Update payment method chart
function updatePaymentChart() {
    const totalPayments = allPayments.reduce((sum, payment) => sum + payment.total, 0);
    
    if (totalPayments === 0) return;
    
    // Calculate percentages
    const paymentsByMethod = allPayments.reduce((acc, payment) => {
        const method = payment.paymentMethod;
        if (!acc[method]) acc[method] = 0;
        acc[method] += payment.total;
        return acc;
    }, {});
    
    const cashAmount = paymentsByMethod.cash || 0;
    const transferAmount = paymentsByMethod.transfer || 0;
    const ewalletAmount = paymentsByMethod.ewallet || 0;
    
    const cashPercentage = (cashAmount / totalPayments) * 100;
    const transferPercentage = (transferAmount / totalPayments) * 100;
    const ewalletPercentage = (ewalletAmount / totalPayments) * 100;
    
    // Update chart bars
    document.getElementById('cashBar').style.height = `${Math.max(cashPercentage * 2, 10)}px`;
    document.getElementById('transferBar').style.height = `${Math.max(transferPercentage * 2, 10)}px`;
    document.getElementById('ewalletBar').style.height = `${Math.max(ewalletPercentage * 2, 10)}px`;
    
    // Update percentages
    document.getElementById('cashPercentage').textContent = `${cashPercentage.toFixed(1)}%`;
    document.getElementById('transferPercentage').textContent = `${transferPercentage.toFixed(1)}%`;
    document.getElementById('ewalletPercentage').textContent = `${ewalletPercentage.toFixed(1)}%`;
}

// Display payments in table
function displayPayments() {
    const tableBody = document.getElementById('paymentsTableBody');
    const emptyState = document.getElementById('paymentEmptyState');
    
    if (filteredPayments.length === 0) {
        tableBody.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }
    
    emptyState.style.display = 'none';
    
    // Calculate pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pagePayments = filteredPayments.slice(startIndex, endIndex);
    
    tableBody.innerHTML = pagePayments.map((payment, index) => {
        const rowNumber = startIndex + index + 1;
        const paymentDate = new Date(payment.timestamp).toLocaleDateString('id-ID');
        const paymentTime = new Date(payment.timestamp).toLocaleTimeString('id-ID', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        return `
            <tr>
                <td>${rowNumber}</td>
                <td><strong>${payment.orderId}</strong></td>
                <td>${paymentDate}<br><small>${paymentTime}</small></td>
                <td>
                    <strong>${payment.customer.name}</strong><br>
                    <small>${payment.customer.phone || 'N/A'}</small>
                </td>
                <td>
                    <span class="payment-method-badge ${payment.paymentMethod}">
                        ${getPaymentMethodIcon(payment.paymentMethod)} ${getPaymentMethodText(payment.paymentMethod)}
                    </span>
                </td>
                <td>Rp ${payment.subtotal.toLocaleString('id-ID')}</td>
                <td>Rp ${payment.tax.toLocaleString('id-ID')}</td>
                <td><strong>Rp ${payment.total.toLocaleString('id-ID')}</strong></td>
                <td><span class="status-badge status-${payment.status}">${getStatusText(payment.status)}</span></td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-action btn-view" onclick="viewPaymentDetail('${payment.id}')" title="Lihat Detail">
                            👁️
                        </button>
                        <button class="btn-action btn-edit" onclick="editPayment('${payment.id}')" title="Edit">
                            ✏️
                        </button>
                        <button class="btn-action btn-delete" onclick="deletePayment('${payment.id}')" title="Hapus">
                            🗑️
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

// Get payment method icon
function getPaymentMethodIcon(method) {
    const iconMap = {
        'cash': '💵',
        'transfer': '🏦',
        'ewallet': '📱'
    };
    return iconMap[method] || '💳';
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

// Get status text in Indonesian
function getStatusText(status) {
    const statusMap = {
        'completed': 'Selesai',
        'pending': 'Pending',
        'cancelled': 'Dibatalkan'
    };
    return statusMap[status] || status;
}

// Filter payments
function filterPayments() {
    const dateFilter = document.getElementById('paymentDateFilter').value;
    const methodFilter = document.getElementById('paymentMethodFilter').value;
    const searchFilter = document.getElementById('paymentSearchFilter').value.toLowerCase();
    
    filteredPayments = allPayments.filter(payment => {
        // Date filter
        let dateMatch = true;
        if (dateFilter !== 'all') {
            const paymentDate = new Date(payment.timestamp);
            const now = new Date();
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            
            switch (dateFilter) {
                case 'today':
                    dateMatch = paymentDate >= today;
                    break;
                case 'week':
                    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
                    dateMatch = paymentDate >= weekAgo;
                    break;
                case 'month':
                    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
                    dateMatch = paymentDate >= monthAgo;
                    break;
            }
        }
        
        // Payment method filter
        const methodMatch = methodFilter === 'all' || payment.paymentMethod === methodFilter;
        
        // Search filter
        const searchMatch = searchFilter === '' || 
            payment.orderId.toLowerCase().includes(searchFilter) ||
            payment.customer.name.toLowerCase().includes(searchFilter) ||
            payment.customer.phone.toLowerCase().includes(searchFilter);
        
        return dateMatch && methodMatch && searchMatch;
    });
    
    currentPage = 1;
    displayPayments();
    updatePaymentPagination();
}

// Update pagination
function updatePaymentPagination() {
    const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredPayments.length);
    
    // Update pagination info
    document.getElementById('paymentShowingStart').textContent = filteredPayments.length > 0 ? startIndex + 1 : 0;
    document.getElementById('paymentShowingEnd').textContent = endIndex;
    document.getElementById('paymentTotalRecords').textContent = filteredPayments.length;
    
    // Generate pagination buttons
    const pagination = document.getElementById('paymentPagination');
    let paginationHTML = '';
    
    // Previous button
    paginationHTML += `
        <button class="pagination-btn" onclick="changePaymentPage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>
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
            <button class="pagination-btn ${i === currentPage ? 'active' : ''}" onclick="changePaymentPage(${i})">
                ${i}
            </button>
        `;
    }
    
    // Next button
    paginationHTML += `
        <button class="pagination-btn" onclick="changePaymentPage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>
            Next ›
        </button>
    `;
    
    pagination.innerHTML = paginationHTML;
}

// Change page
function changePaymentPage(page) {
    const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
    if (page >= 1 && page <= totalPages) {
        currentPage = page;
        displayPayments();
        updatePaymentPagination();
    }
}

// View payment detail
function viewPaymentDetail(paymentId) {
    const payment = allPayments.find(p => p.id === paymentId);
    if (!payment) return;
    
    const modal = document.getElementById('paymentDetailModal');
    const overlay = document.getElementById('overlay');
    const content = document.getElementById('paymentDetailContent');
    
    const paymentDate = new Date(payment.timestamp).toLocaleString('id-ID');
    
    content.innerHTML = `
        <div class="payment-detail">
            <div class="detail-section">
                <h3>💳 Informasi Pembayaran</h3>
                <div class="detail-grid">
                    <div class="detail-item">
                        <label>No. Pesanan:</label>
                        <span><strong>${payment.orderId}</strong></span>
                    </div>
                    <div class="detail-item">
                        <label>Tanggal Pembayaran:</label>
                        <span>${paymentDate}</span>
                    </div>
                    <div class="detail-item">
                        <label>Metode Pembayaran:</label>
                        <span class="payment-method-badge ${payment.paymentMethod}">
                            ${getPaymentMethodIcon(payment.paymentMethod)} ${getPaymentMethodText(payment.paymentMethod)}
                        </span>
                    </div>
                    <div class="detail-item">
                        <label>Status:</label>
                        <span class="status-badge status-${payment.status}">${getStatusText(payment.status)}</span>
                    </div>
                </div>
            </div>
            
            <div class="detail-section">
                <h3>👤 Informasi Pelanggan</h3>
                <div class="detail-grid">
                    <div class="detail-item">
                        <label>Nama:</label>
                        <span>${payment.customer.name}</span>
                    </div>
                    <div class="detail-item">
                        <label>No. Telepon:</label>
                        <span>${payment.customer.phone || 'N/A'}</span>
                    </div>
                    <div class="detail-item">
                        <label>No. Meja:</label>
                        <span>${payment.customer.table}</span>
                    </div>
                </div>
            </div>
            
            <div class="detail-section">
                <h3>🛒 Detail Items</h3>
                <div class="items-list">
                    ${payment.items.map(item => `
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
                <h3>💰 Rincian Pembayaran</h3>
                <div class="payment-summary">
                    <div class="summary-row">
                        <span>Subtotal:</span>
                        <span>Rp ${payment.subtotal.toLocaleString('id-ID')}</span>
                    </div>
                    <div class="summary-row">
                        <span>Pajak (10%):</span>
                        <span>Rp ${payment.tax.toLocaleString('id-ID')}</span>
                    </div>
                    <div class="summary-row total-row">
                        <span><strong>Total Pembayaran:</strong></span>
                        <span><strong>Rp ${payment.total.toLocaleString('id-ID')}</strong></span>
                    </div>
                </div>
            </div>
            
            ${payment.customer.notes ? `
                <div class="detail-section">
                    <h3>📝 Catatan</h3>
                    <p>${payment.customer.notes}</p>
                </div>
            ` : ''}
        </div>
    `;
    
    modal.classList.add('active');
    overlay.classList.add('active');
}

// Edit payment
function editPayment(paymentId) {
    const payment = allPayments.find(p => p.id === paymentId);
    if (!payment) {
        showNotification('Data pembayaran tidak ditemukan!', 'error');
        return;
    }
    
    // Show edit modal
    showEditPaymentModal(payment);
}

// Show edit payment modal
function showEditPaymentModal(payment) {
    let modal = document.getElementById('editPaymentModal');
    const overlay = document.getElementById('overlay');
    
    if (!modal) {
        createEditPaymentModal();
        modal = document.getElementById('editPaymentModal');
    }
    
    // Populate form with payment data
    document.getElementById('editPaymentId').value = payment.id;
    document.getElementById('editPaymentCustomerName').value = payment.customer.name;
    document.getElementById('editPaymentCustomerPhone').value = payment.customer.phone || '';
    document.getElementById('editPaymentTableNumber').value = payment.customer.table;
    document.getElementById('editPaymentMethod').value = payment.paymentMethod;
    document.getElementById('editPaymentStatus').value = payment.status;
    document.getElementById('editPaymentNotes').value = payment.customer.notes || '';
    
    // Update totals display
    document.getElementById('editPaymentSubtotal').textContent = `Rp ${payment.subtotal.toLocaleString('id-ID')}`;
    document.getElementById('editPaymentTax').textContent = `Rp ${payment.tax.toLocaleString('id-ID')}`;
    document.getElementById('editPaymentTotal').textContent = `Rp ${payment.total.toLocaleString('id-ID')}`;
    
    // Store current payment data for editing
    window.currentEditPayment = { ...payment };
    
    // Show modal
    modal.classList.add('active');
    overlay.classList.add('active');
}

// Create edit payment modal
function createEditPaymentModal() {
    const modalHTML = `
        <div class="modal" id="editPaymentModal">
            <div class="modal-container">
                <div class="modal-header">
                    <h2 class="modal-title">💳 Edit Data Pembayaran</h2>
                    <button class="modal-close" onclick="closeEditPaymentModal()">✕</button>
                </div>
                
                <div class="modal-body">
                    <form id="editPaymentForm" onsubmit="saveEditPayment(event)">
                        <input type="hidden" id="editPaymentId">
                        
                        <div class="form-section">
                            <h3>👤 Data Pelanggan</h3>
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="editPaymentCustomerName">Nama Pelanggan *</label>
                                    <input type="text" id="editPaymentCustomerName" required>
                                </div>
                                <div class="form-group">
                                    <label for="editPaymentCustomerPhone">Nomor Telepon</label>
                                    <input type="tel" id="editPaymentCustomerPhone">
                                </div>
                            </div>
                            
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="editPaymentTableNumber">Nomor Meja *</label>
                                    <input type="text" id="editPaymentTableNumber" required>
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
                            
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="editPaymentStatus">Status Pembayaran</label>
                                    <select id="editPaymentStatus">
                                        <option value="pending">Pending</option>
                                        <option value="completed">Selesai</option>
                                        <option value="cancelled">Dibatalkan</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="editPaymentNotes">Catatan</label>
                                    <textarea id="editPaymentNotes" rows="2"></textarea>
                                </div>
                            </div>
                        </div>
                        
                        <div class="form-section">
                            <h3>💰 Detail Pembayaran</h3>
                            <div class="payment-summary">
                                <div class="summary-row">
                                    <span>Subtotal:</span>
                                    <span id="editPaymentSubtotal">Rp 0</span>
                                </div>
                                <div class="summary-row">
                                    <span>Pajak (10%):</span>
                                    <span id="editPaymentTax">Rp 0</span>
                                </div>
                                <div class="summary-row summary-total">
                                    <span><strong>Total Pembayaran:</strong></span>
                                    <span><strong id="editPaymentTotal">Rp 0</strong></span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="form-actions">
                            <button type="button" class="btn-cancel" onclick="closeEditPaymentModal()">
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

// Save edited payment
function saveEditPayment(event) {
    event.preventDefault();
    
    if (!window.currentEditPayment) return;
    
    try {
        // Get form data
        const paymentId = document.getElementById('editPaymentId').value;
        const customerName = document.getElementById('editPaymentCustomerName').value;
        const customerPhone = document.getElementById('editPaymentCustomerPhone').value;
        const tableNumber = document.getElementById('editPaymentTableNumber').value;
        const paymentMethod = document.getElementById('editPaymentMethod').value;
        const paymentStatus = document.getElementById('editPaymentStatus').value;
        const paymentNotes = document.getElementById('editPaymentNotes').value;
        
        // Validate required fields
        if (!customerName || !tableNumber || !paymentMethod) {
            showNotification('Mohon lengkapi semua field yang wajib diisi!', 'error');
            return;
        }
        
        // Find and update payment in allPayments
        const paymentIndex = allPayments.findIndex(p => p.id === paymentId);
        if (paymentIndex === -1) {
            showNotification('Data pembayaran tidak ditemukan!', 'error');
            return;
        }
        
        // Update payment
        allPayments[paymentIndex] = {
            ...allPayments[paymentIndex],
            customer: {
                ...allPayments[paymentIndex].customer,
                name: customerName,
                phone: customerPhone,
                table: tableNumber,
                notes: paymentNotes
            },
            paymentMethod: paymentMethod,
            status: paymentStatus,
            lastModified: new Date().toISOString()
        };
        
        // Update corresponding order in localStorage
        let orderHistory = JSON.parse(localStorage.getItem('cappunabara_order_history') || '[]');
        const orderIndex = orderHistory.findIndex(o => o.id === paymentId);
        
        if (orderIndex !== -1) {
            orderHistory[orderIndex] = {
                ...orderHistory[orderIndex],
                customer: {
                    ...orderHistory[orderIndex].customer,
                    name: customerName,
                    phone: customerPhone,
                    table: tableNumber,
                    payment: paymentMethod,
                    notes: paymentNotes
                },
                status: paymentStatus,
                lastModified: new Date().toISOString()
            };
            
            localStorage.setItem('cappunabara_order_history', JSON.stringify(orderHistory));
        }
        
        // Update customer data if this is the latest payment
        if (paymentIndex === 0) {
            let customerData = JSON.parse(localStorage.getItem('cappunabara_customer_data') || '{}');
            customerData = {
                ...customerData,
                name: customerName,
                phone: customerPhone,
                lastOrderDate: new Date().toISOString()
            };
            localStorage.setItem('cappunabara_customer_data', JSON.stringify(customerData));
        }
        
        // Trigger storage events
        window.dispatchEvent(new StorageEvent('storage', {
            key: 'cappunabara_order_history',
            newValue: JSON.stringify(orderHistory)
        }));
        
        // Refresh display
        filteredPayments = [...allPayments];
        updatePaymentStatistics();
        displayPayments();
        
        // Close modal
        closeEditPaymentModal();
        
        // Show success message
        showNotification(`Data pembayaran ${paymentId} berhasil diperbarui!`, 'success');
        
        console.log('Payment updated successfully:', paymentId);
        
    } catch (error) {
        console.error('Error saving edited payment:', error);
        showNotification('Error menyimpan perubahan pembayaran!', 'error');
    }
}

// Close edit payment modal
function closeEditPaymentModal() {
    const modal = document.getElementById('editPaymentModal');
    const overlay = document.getElementById('overlay');
    
    if (modal) modal.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    
    // Clear current edit data
    window.currentEditPayment = null;
}

// Delete payment
function deletePayment(paymentId) {
    if (confirm('Apakah Anda yakin ingin menghapus data pembayaran ini?')) {
        // Remove from order history as well
        let orderHistory = JSON.parse(localStorage.getItem('cappunabara_order_history')) || [];
        orderHistory = orderHistory.filter(order => order.id !== paymentId);
        localStorage.setItem('cappunabara_order_history', JSON.stringify(orderHistory));
        
        // Reload data
        loadPaymentData();
        
        showNotification('Data pembayaran berhasil dihapus!', 'success');
    }
}

// Close payment detail modal
function closePaymentDetail() {
    const modal = document.getElementById('paymentDetailModal');
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
function exportPaymentToCSV() {
    const headers = [
        'No',
        'No Pesanan',
        'Tanggal Pembayaran',
        'Pelanggan',
        'No Telepon',
        'Metode Pembayaran',
        'Subtotal',
        'Pajak',
        'Total Pembayaran',
        'Status'
    ];
    
    const csvData = filteredPayments.map((payment, index) => {
        return [
            index + 1,
            payment.orderId,
            new Date(payment.timestamp).toLocaleString('id-ID'),
            payment.customer.name,
            payment.customer.phone || 'N/A',
            getPaymentMethodText(payment.paymentMethod),
            payment.subtotal,
            payment.tax,
            payment.total,
            getStatusText(payment.status)
        ];
    });
    
    const csvContent = [headers, ...csvData]
        .map(row => row.map(field => `"${field}"`).join(','))
        .join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `cappunabara-data-pembayaran-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showNotification('Data pembayaran berhasil diekspor ke CSV!', 'success');
}

// Setup event listeners
function setupEventListeners() {
    // Auto-refresh every 30 seconds
    setInterval(loadPaymentData, 30000);
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

// Add CSS for payment method badges and additional styles
const additionalCSS = `
<style>
@keyframes slideInRight {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}

.payment-method-badge {
    padding: 0.25rem 0.75rem;
    border-radius: var(--radius-full);
    font-size: 0.8rem;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
}

.payment-method-badge.cash {
    background: #4CAF50;
    color: white;
}

.payment-method-badge.transfer {
    background: #2196F3;
    color: white;
}

.payment-method-badge.ewallet {
    background: #FF9800;
    color: white;
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
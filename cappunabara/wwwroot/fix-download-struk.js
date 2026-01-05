// ========== FIX DOWNLOAD STRUK FUNCTIONALITY ==========
// Script untuk menambahkan tombol download struk ke setiap pesanan

console.log('🔧 Fixing Download Struk functionality...');

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    // Add download buttons to existing timeline items
    addDownloadButtonsToTimeline();
    
    // Override the original displayHistoryTimeline function to include download buttons
    if (typeof window.originalDisplayHistoryTimeline === 'undefined') {
        window.originalDisplayHistoryTimeline = window.displayHistoryTimeline;
        window.displayHistoryTimeline = enhancedDisplayHistoryTimeline;
    }
    
    // Override the original displaySearchResults function
    if (typeof window.originalDisplaySearchResults === 'undefined') {
        window.originalDisplaySearchResults = window.displaySearchResults;
        window.displaySearchResults = enhancedDisplaySearchResults;
    }
    
    console.log('✅ Download Struk functionality fixed!');
});

// Add download buttons to existing timeline items
function addDownloadButtonsToTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        const actions = item.querySelector('.timeline-actions');
        if (actions && !actions.querySelector('.btn-download-receipt')) {
            // Get order ID from the onclick attribute
            const viewButton = actions.querySelector('.btn-view-receipt');
            if (viewButton) {
                const onclick = viewButton.getAttribute('onclick');
                const orderIdMatch = onclick.match(/showOrderDetail\('([^']+)'\)/);
                if (orderIdMatch) {
                    const orderId = orderIdMatch[1];
                    
                    // Create download button
                    const downloadButton = document.createElement('button');
                    downloadButton.className = 'btn-download-receipt';
                    downloadButton.onclick = function(event) {
                        event.stopPropagation();
                        downloadOrderReceipt(orderId);
                    };
                    downloadButton.innerHTML = '<span>📥</span> Download Struk';
                    
                    // Insert after view button
                    viewButton.insertAdjacentElement('afterend', downloadButton);
                }
            }
        }
    });
}

// Enhanced displayHistoryTimeline function with download buttons
function enhancedDisplayHistoryTimeline() {
    const historyTimeline = document.getElementById('historyTimeline');
    const emptyHistoryState = document.getElementById('emptyHistoryState');
    const loadMoreSection = document.getElementById('loadMoreSection');
    
    if (!historyTimeline || !emptyHistoryState) return;
    
    const filteredOrders = getFilteredOrders();
    
    if (filteredOrders.length === 0) {
        historyTimeline.style.display = 'none';
        emptyHistoryState.innerHTML = `
            <div class="empty-illustration">
                <div class="empty-icon">📋</div>
                <h3>Belum Ada Riwayat Pesanan</h3>
                <p>Riwayat pesanan Anda akan muncul di sini setelah melakukan pemesanan</p>
                <a href="/Order" class="btn-primary" style="margin-top: 1rem; display: inline-block; padding: 0.75rem 1.5rem; background: var(--gradient-coffee); color: var(--white); text-decoration: none; border-radius: var(--radius-md); font-weight: 600;">
                    🛒 Mulai Pesan
                </a>
            </div>
        `;
        emptyHistoryState.style.display = 'block';
        if (loadMoreSection) loadMoreSection.style.display = 'none';
        return;
    }
    
    emptyHistoryState.style.display = 'none';
    historyTimeline.style.display = 'block';
    
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
                        <button class="btn-download-receipt" onclick="event.stopPropagation(); downloadOrderReceipt('${order.id}')">
                            <span>📥</span> Download Struk
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

// Enhanced displaySearchResults function with download buttons
function enhancedDisplaySearchResults(filteredOrders) {
    const historyTimeline = document.getElementById('historyTimeline');
    const emptyHistoryState = document.getElementById('emptyHistoryState');
    const loadMoreSection = document.getElementById('loadMoreSection');
    
    if (!historyTimeline || !emptyHistoryState) return;
    
    if (filteredOrders.length === 0) {
        historyTimeline.style.display = 'none';
        emptyHistoryState.innerHTML = `
            <div style="text-align: center; padding: 3rem; background: var(--white); border-radius: var(--radius-xl); box-shadow: var(--shadow-md);">
                <div style="font-size: 4rem; margin-bottom: 1rem; opacity: 0.3;">🔍</div>
                <h3 style="color: var(--text-dark); margin-bottom: 0.5rem;">Tidak Ada Hasil</h3>
                <p style="color: var(--text-medium);">Tidak ditemukan pesanan yang sesuai dengan pencarian Anda</p>
            </div>
        `;
        emptyHistoryState.style.display = 'block';
        if (loadMoreSection) loadMoreSection.style.display = 'none';
        return;
    }

    emptyHistoryState.style.display = 'none';
    historyTimeline.style.display = 'block';

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
                        <button class="btn-download-receipt" onclick="event.stopPropagation(); downloadOrderReceipt('${order.id}')">
                            <span>📥</span> Download Struk
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

// Make functions globally available
window.addDownloadButtonsToTimeline = addDownloadButtonsToTimeline;
window.enhancedDisplayHistoryTimeline = enhancedDisplayHistoryTimeline;
window.enhancedDisplaySearchResults = enhancedDisplaySearchResults;
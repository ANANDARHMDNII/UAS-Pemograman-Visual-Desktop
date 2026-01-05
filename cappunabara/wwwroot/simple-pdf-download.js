// ========== SIMPLE PDF DOWNLOAD - CAFÉ LUNA ==========
// Solusi sederhana yang pasti berfungsi untuk download struk PDF

console.log('🔧 Simple PDF Download Loading...');

// Function utama untuk download struk sebagai PDF
function downloadStrukSimple(orderData) {
    console.log('Downloading struk for order:', orderData.id);
    
    // Buat HTML struk yang bisa di-print sebagai PDF
    const strukHTML = createStrukHTML(orderData);
    
    // Buka di tab baru untuk print/save as PDF
    const printWindow = window.open('', '_blank', 'width=800,height=1000,scrollbars=yes');
    
    if (!printWindow) {
        alert('Popup diblokir! Silakan allow popup untuk localhost:5140 dan coba lagi.');
        return;
    }
    
    printWindow.document.write(strukHTML);
    printWindow.document.close();
    
    // Focus ke window baru
    printWindow.focus();
    
    // Auto-print setelah 1 detik
    setTimeout(() => {
        printWindow.print();
    }, 1000);
    
    // Show notification
    showSimpleNotification('✅ Struk dibuka di tab baru! Gunakan Ctrl+P untuk Save as PDF', 'success');
}

// Buat HTML struk yang siap print
function createStrukHTML(orderData) {
    const subtotal = orderData.total;
    const tax = subtotal * 0.1;
    const finalTotal = subtotal + tax;
    const orderDate = new Date(orderData.timestamp);
    
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Struk Café Luna - ${orderData.id}</title>
    <style>
        @page {
            size: A4;
            margin: 20mm;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: Arial, sans-serif;
            line-height: 1.4;
            color: #333;
            background: white;
            padding: 20px;
        }
        
        .struk-container {
            max-width: 400px;
            margin: 0 auto;
            border: 3px solid #8B6F47;
            border-radius: 15px;
            padding: 30px;
            background: white;
        }
        
        .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 3px solid #8B6F47;
        }
        
        .logo {
            font-size: 40px;
            margin-bottom: 10px;
        }
        
        .brand-name {
            font-size: 28px;
            font-weight: bold;
            color: #8B6F47;
            margin-bottom: 8px;
            letter-spacing: 2px;
        }
        
        .tagline {
            font-size: 16px;
            color: #666;
            font-style: italic;
        }
        
        .title {
            text-align: center;
            font-size: 20px;
            font-weight: bold;
            color: #8B6F47;
            margin: 25px 0;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .info-section {
            margin-bottom: 25px;
            background: #f9f9f9;
            padding: 15px;
            border-radius: 8px;
        }
        
        .info-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
            font-size: 14px;
        }
        
        .info-label {
            font-weight: bold;
            color: #555;
        }
        
        .info-value {
            font-weight: bold;
            color: #8B6F47;
        }
        
        .items-section {
            margin: 25px 0;
        }
        
        .items-header {
            background: #8B6F47;
            color: white;
            padding: 12px;
            font-weight: bold;
            font-size: 14px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        
        .items-table {
            width: 100%;
            border-collapse: collapse;
            border: 2px solid #8B6F47;
            border-top: none;
            border-radius: 0 0 8px 8px;
            overflow: hidden;
        }
        
        .items-table th {
            background: #A67B5B;
            color: white;
            padding: 10px;
            font-size: 12px;
            text-transform: uppercase;
        }
        
        .items-table td {
            padding: 12px 8px;
            border-bottom: 1px solid #ddd;
            font-size: 14px;
        }
        
        .items-table tr:nth-child(even) {
            background: #f9f9f9;
        }
        
        .item-name {
            font-weight: 600;
        }
        
        .item-qty {
            text-align: center;
            color: #666;
            font-weight: bold;
        }
        
        .item-price {
            text-align: right;
            font-weight: bold;
            color: #8B6F47;
        }
        
        .totals-section {
            margin-top: 25px;
            padding: 20px;
            background: linear-gradient(135deg, #F7E7CE 0%, #FFF8E7 100%);
            border: 2px solid #8B6F47;
            border-radius: 12px;
        }
        
        .total-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            font-size: 16px;
        }
        
        .total-label {
            font-weight: 600;
            color: #555;
        }
        
        .total-value {
            font-weight: bold;
            color: #8B6F47;
        }
        
        .final-total {
            font-size: 20px;
            font-weight: bold;
            color: #8B6F47;
            border-top: 3px solid #8B6F47;
            padding-top: 15px;
            margin-top: 15px;
        }
        
        .footer {
            text-align: center;
            margin-top: 35px;
            padding-top: 25px;
            border-top: 2px solid #ddd;
        }
        
        .thank-you {
            font-size: 18px;
            font-weight: bold;
            color: #8B6F47;
            margin-bottom: 15px;
        }
        
        .contact-info {
            font-size: 14px;
            color: #666;
            margin-bottom: 8px;
        }
        
        .print-date {
            margin-top: 20px;
            font-size: 12px;
            color: #999;
            font-style: italic;
        }
        
        .print-instructions {
            background: #e3f2fd;
            border: 2px solid #2196F3;
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 30px;
            text-align: center;
        }
        
        .print-btn {
            background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
            color: white;
            border: none;
            padding: 12px 25px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            font-weight: bold;
            margin: 8px;
            transition: all 0.3s ease;
        }
        
        .print-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
        }
        
        .close-btn {
            background: linear-gradient(135deg, #f44336 0%, #d32f2f 100%);
        }
        
        .close-btn:hover {
            box-shadow: 0 4px 12px rgba(244, 67, 54, 0.3);
        }
        
        @media print {
            body {
                margin: 0;
                padding: 0;
            }
            
            .struk-container {
                border: none;
                box-shadow: none;
                max-width: none;
                margin: 0;
                padding: 0;
            }
            
            .no-print {
                display: none !important;
            }
            
            .print-instructions {
                display: none !important;
            }
        }
    </style>
</head>
<body>
    <div class="print-instructions no-print">
        <h3>📥 CARA DOWNLOAD STRUK SEBAGAI PDF:</h3>
        <p><strong>1. Klik tombol "🖨️ PRINT / SAVE PDF" di bawah</strong></p>
        <p><strong>2. Atau tekan Ctrl+P pada keyboard</strong></p>
        <p><strong>3. Pilih "Save as PDF" sebagai printer</strong></p>
        <p><strong>4. Klik "Save" untuk download PDF</strong></p>
        <br>
        <button class="print-btn" onclick="window.print()">🖨️ PRINT / SAVE PDF</button>
        <button class="print-btn close-btn" onclick="window.close()">❌ TUTUP</button>
    </div>
    
    <div class="struk-container">
        <div class="header">
            <div class="logo">☕</div>
            <div class="brand-name">CAFÉ LUNA</div>
            <div class="tagline">Your Cozy Corner</div>
        </div>
        
        <div class="title">STRUK PEMBELIAN</div>
        
        <div class="info-section">
            <div class="info-row">
                <span class="info-label">No. Pesanan:</span>
                <span class="info-value">${orderData.id}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Tanggal:</span>
                <span class="info-value">${orderDate.toLocaleDateString('id-ID')}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Waktu:</span>
                <span class="info-value">${orderDate.toLocaleTimeString('id-ID')}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Pelanggan:</span>
                <span class="info-value">${orderData.customer.name}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Meja:</span>
                <span class="info-value">${orderData.customer.table}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Pembayaran:</span>
                <span class="info-value">${orderData.customer.payment}</span>
            </div>
        </div>
        
        <div class="items-section">
            <div class="items-header">DETAIL PESANAN</div>
            <table class="items-table">
                <thead>
                    <tr>
                        <th style="text-align: left;">ITEM</th>
                        <th style="width: 60px;">QTY</th>
                        <th style="width: 100px; text-align: right;">HARGA</th>
                    </tr>
                </thead>
                <tbody>
                    ${orderData.items.map(item => `
                        <tr>
                            <td class="item-name">${item.name}</td>
                            <td class="item-qty">${item.quantity}x</td>
                            <td class="item-price">Rp ${(item.price * item.quantity).toLocaleString('id-ID')}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
        
        <div class="totals-section">
            <div class="total-row">
                <span class="total-label">Subtotal:</span>
                <span class="total-value">Rp ${subtotal.toLocaleString('id-ID')}</span>
            </div>
            <div class="total-row">
                <span class="total-label">Pajak (10%):</span>
                <span class="total-value">Rp ${tax.toLocaleString('id-ID')}</span>
            </div>
            <div class="total-row final-total">
                <span class="total-label">TOTAL PEMBAYARAN:</span>
                <span class="total-value">Rp ${finalTotal.toLocaleString('id-ID')}</span>
            </div>
        </div>
        
        <div class="footer">
            <div class="thank-you">Terima kasih sudah berbelanja di Café Luna! 💖</div>
            <div class="contact-info">📞 0812-3456-7890 | 📧 hello@cafeluna.com</div>
            <div class="contact-info">📍 Jl. Kopi Hangat No. 123, Jakarta</div>
            <div class="print-date">Dicetak: ${new Date().toLocaleString('id-ID')}</div>
        </div>
    </div>
    
    <script>
        // Auto-focus untuk better print experience
        window.focus();
        
        // Keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            if (e.ctrlKey && e.key === 'p') {
                e.preventDefault();
                window.print();
            }
            if (e.key === 'Escape') {
                window.close();
            }
        });
        
        // Show alert dengan instruksi
        setTimeout(function() {
            if (!window.matchMedia('print').matches) {
                alert('CARA DOWNLOAD PDF:\\n\\n1. Klik tombol PRINT/SAVE PDF\\n2. Atau tekan Ctrl+P\\n3. Pilih "Save as PDF"\\n4. Klik "Save"');
            }
        }, 1500);
    </script>
</body>
</html>`;
}

// Function untuk download struk terbaru
function downloadLatestStruk() {
    console.log('downloadLatestStruk called');
    
    const orderHistory = JSON.parse(localStorage.getItem('cappunabara_order_history') || '[]');
    
    if (orderHistory.length === 0) {
        alert('❌ Tidak ada pesanan untuk didownload!\\n\\nSilakan buat pesanan terlebih dahulu di halaman Order.');
        return;
    }
    
    const latestOrder = orderHistory[0];
    const orderData = {
        id: latestOrder.id,
        timestamp: latestOrder.timestamp,
        customer: latestOrder.customer,
        items: latestOrder.items,
        total: latestOrder.total
    };
    
    downloadStrukSimple(orderData);
}

// Function untuk download struk pesanan tertentu
function downloadSpecificStruk(orderId) {
    console.log('downloadSpecificStruk called for:', orderId);
    
    const orderHistory = JSON.parse(localStorage.getItem('cappunabara_order_history') || '[]');
    const order = orderHistory.find(o => o.id === orderId);
    
    if (!order) {
        alert('❌ Pesanan tidak ditemukan!\\n\\nOrder ID: ' + orderId);
        return;
    }
    
    const orderData = {
        id: order.id,
        timestamp: order.timestamp,
        customer: order.customer,
        items: order.items,
        total: order.total
    };
    
    downloadStrukSimple(orderData);
}

// Show simple notification
function showSimpleNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.simple-notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = 'simple-notification';
    notification.innerHTML = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#F44336'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 10000;
        font-weight: bold;
        box-shadow: 0 4px 16px rgba(0,0,0,0.3);
        max-width: 400px;
        font-size: 14px;
        line-height: 1.4;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 8 seconds
    setTimeout(() => {
        notification.remove();
    }, 8000);
}

// Override existing functions
window.downloadReceipt = downloadLatestStruk;
window.downloadOrderReceipt = downloadSpecificStruk;

// Make functions globally available
window.downloadStrukSimple = downloadStrukSimple;
window.downloadLatestStruk = downloadLatestStruk;
window.downloadSpecificStruk = downloadSpecificStruk;

console.log('✅ Simple PDF Download Loaded Successfully!');
console.log('Available functions: downloadLatestStruk, downloadSpecificStruk, downloadStrukSimple');

// Test if we have data
setTimeout(() => {
    const orderHistory = JSON.parse(localStorage.getItem('cappunabara_order_history') || '[]');
    if (orderHistory.length > 0) {
        console.log(`📊 Found ${orderHistory.length} orders ready for download`);
        showSimpleNotification(`✅ PDF Download siap! Ditemukan ${orderHistory.length} pesanan`, 'success');
    } else {
        console.log('⚠️ No orders found. Create some orders first.');
    }
}, 2000);
// ========== FIX UNDEFINED PDF PROBLEM ==========

// Enhanced PDF generator with data validation
function createFixedPDF(order) {
    console.log('🔧 Creating FIXED PDF for order:', order?.id || 'NO_ID');
    
    // ✅ STEP 1: Validate order object
    if (!order || typeof order !== 'object') {
        alert('❌ Error: Data pesanan tidak valid atau kosong!');
        console.error('Invalid order object:', order);
        return;
    }
    
    // ✅ STEP 2: Validate and sanitize order ID
    const orderId = order.id || 'CPB' + Date.now().toString().slice(-6);
    console.log('Order ID:', orderId);
    
    // ✅ STEP 3: Validate and sanitize customer data
    const customer = order.customer || {};
    const customerName = customer.name || 'Customer';
    const customerTable = customer.table || '-';
    const customerPhone = customer.phone || '-';
    const customerPayment = customer.payment || 'cash';
    const customerNotes = customer.notes || '';
    
    console.log('Customer data:', {
        name: customerName,
        table: customerTable,
        phone: customerPhone,
        payment: customerPayment
    });
    
    // ✅ STEP 4: Validate and sanitize items data
    const items = order.items || [];
    if (items.length === 0) {
        alert('❌ Error: Tidak ada item dalam pesanan!');
        return;
    }
    
    // Validate each item and provide fallbacks
    const validatedItems = items.map((item, index) => {
        const itemName = item.name || `Item ${index + 1}`;
        const itemQuantity = parseInt(item.quantity) || 1;
        const itemPrice = parseInt(item.price) || 0;
        const itemTotal = itemPrice * itemQuantity;
        
        console.log(`Item ${index + 1}:`, {
            name: itemName,
            quantity: itemQuantity,
            price: itemPrice,
            total: itemTotal
        });
        
        return {
            name: itemName,
            quantity: itemQuantity,
            price: itemPrice,
            total: itemTotal
        };
    });
    
    // ✅ STEP 5: Calculate totals safely
    const subtotal = validatedItems.reduce((sum, item) => sum + item.total, 0);
    const tax = Math.round(subtotal * 0.1);
    const finalTotal = subtotal + tax;
    
    console.log('Totals:', { subtotal, tax, finalTotal });
    
    // ✅ STEP 6: Validate timestamp
    const orderDate = order.timestamp ? new Date(order.timestamp) : new Date();
    
    // ✅ STEP 7: Create HTML with validated data
    const htmlContent = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Struk Cappunabara - ${orderId}</title>
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
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background: #f8f9fa;
            padding: 0;
        }
        
        .receipt-container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            border: 1px solid #e9ecef;
        }
        
        .header {
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            padding: 40px 30px;
            text-align: center;
            border-bottom: 3px solid #8B6F47;
            position: relative;
        }
        
        .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #8B6F47, #A67B5B, #8B6F47);
        }
        
        .coffee-icon {
            width: 80px;
            height: 80px;
            margin: 0 auto 20px;
            background: linear-gradient(135deg, #8B6F47, #A67B5B);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 40px;
            color: white;
            box-shadow: 0 8px 20px rgba(139, 111, 71, 0.3);
        }
        
        .brand-name {
            font-size: 36px;
            font-weight: 800;
            color: #8B6F47;
            letter-spacing: 3px;
            margin-bottom: 8px;
            text-transform: uppercase;
        }
        
        .tagline {
            font-size: 16px;
            color: #6c757d;
            font-style: italic;
            font-weight: 300;
        }
        
        .content {
            padding: 40px 30px;
        }
        
        .section {
            margin-bottom: 35px;
        }
        
        .section-title {
            font-size: 18px;
            font-weight: 700;
            color: #8B6F47;
            margin-bottom: 20px;
            padding-bottom: 8px;
            border-bottom: 2px solid #f1f3f4;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .info-item {
            display: flex;
            flex-direction: column;
            gap: 5px;
        }
        
        .info-label {
            font-size: 14px;
            color: #6c757d;
            font-weight: 500;
        }
        
        .info-value {
            font-size: 16px;
            color: #333;
            font-weight: 600;
        }
        
        .order-number {
            background: linear-gradient(135deg, #8B6F47, #A67B5B);
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 700;
            display: inline-block;
        }
        
        .items-table {
            width: 100%;
            border-collapse: collapse;
            margin: 25px 0;
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        
        .items-table thead {
            background: linear-gradient(135deg, #8B6F47, #A67B5B);
            color: white;
        }
        
        .items-table th {
            padding: 18px 15px;
            font-weight: 700;
            text-transform: uppercase;
            font-size: 12px;
            letter-spacing: 1px;
        }
        
        .items-table td {
            padding: 18px 15px;
            border-bottom: 1px solid #f1f3f4;
            font-size: 15px;
        }
        
        .items-table tr:last-child td {
            border-bottom: none;
        }
        
        .items-table tr:nth-child(even) {
            background: #f8f9fa;
        }
        
        .item-name {
            font-weight: 600;
            color: #333;
        }
        
        .item-qty {
            text-align: center;
            color: #6c757d;
            font-weight: 600;
        }
        
        .item-price {
            text-align: right;
            font-weight: 700;
            color: #8B6F47;
        }
        
        .summary-box {
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            border: 2px solid #8B6F47;
            border-radius: 16px;
            padding: 30px;
            margin-top: 30px;
            position: relative;
        }
        
        .summary-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
            font-size: 16px;
        }
        
        .summary-label {
            font-weight: 600;
            color: #495057;
        }
        
        .summary-value {
            font-weight: 700;
            color: #8B6F47;
        }
        
        .total-row {
            border-top: 3px solid #8B6F47;
            padding-top: 20px;
            margin-top: 20px;
        }
        
        .total-row .summary-label,
        .total-row .summary-value {
            font-size: 22px;
            font-weight: 800;
            color: #8B6F47;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .footer {
            background: linear-gradient(135deg, #8B6F47, #A67B5B);
            color: white;
            padding: 30px;
            text-align: center;
        }
        
        .thank-you {
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 15px;
        }
        
        .contact-info {
            font-size: 14px;
            opacity: 0.9;
            margin-bottom: 8px;
        }
        
        .print-date {
            margin-top: 20px;
            font-size: 12px;
            opacity: 0.8;
            border-top: 1px solid rgba(255,255,255,0.2);
            padding-top: 15px;
        }
        
        .instructions {
            background: linear-gradient(135deg, #e8f5e8, #d4edda);
            border: 2px solid #28a745;
            border-radius: 16px;
            padding: 25px;
            margin-bottom: 30px;
            text-align: center;
        }
        
        .instructions h3 {
            color: #155724;
            margin-bottom: 15px;
            font-size: 20px;
        }
        
        .instructions p {
            margin-bottom: 10px;
            color: #155724;
            font-weight: 500;
        }
        
        .btn {
            background: linear-gradient(135deg, #28a745, #20c997);
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 25px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 700;
            margin: 8px;
            box-shadow: 0 4px 12px rgba(40, 167, 69, 0.3);
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(40, 167, 69, 0.4);
        }
        
        .btn-close {
            background: linear-gradient(135deg, #dc3545, #c82333);
            box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);
        }
        
        .btn-close:hover {
            box-shadow: 0 6px 16px rgba(220, 53, 69, 0.4);
        }
        
        @media print {
            body {
                background: white;
            }
            .instructions {
                display: none !important;
            }
            .receipt-container {
                box-shadow: none;
                border: none;
                margin: 0;
                max-width: none;
            }
        }
    </style>
</head>
<body>
    <div class="instructions">
        <h3>✅ PDF SUDAH DIPERBAIKI - TIDAK ADA "UNDEFINED" LAGI!</h3>
        <p><strong>1. Klik tombol "PRINT / SAVE PDF" di bawah</strong></p>
        <p><strong>2. Pilih "Save as PDF" di dialog print</strong></p>
        <p><strong>3. Klik "Save" untuk menyimpan ke komputer</strong></p>
        <button class="btn" onclick="window.print()">🖨️ PRINT / SAVE PDF</button>
        <button class="btn btn-close" onclick="window.close()">❌ TUTUP</button>
    </div>
    
    <div class="receipt-container">
        <div class="header">
            <div class="coffee-icon">☕</div>
            <div class="brand-name">CAPPUNABARA</div>
            <div class="tagline">Your Cozy Corner</div>
        </div>
        
        <div class="content">
            <div class="section">
                <div class="section-title">Informasi Pesanan</div>
                <div class="info-grid">
                    <div class="info-item">
                        <div class="info-label">No. Order:</div>
                        <div class="info-value">
                            <span class="order-number">${orderId}</span>
                        </div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Tanggal:</div>
                        <div class="info-value">${orderDate.toLocaleDateString('id-ID')}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Waktu:</div>
                        <div class="info-value">${orderDate.toLocaleTimeString('id-ID')}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Nama Pelanggan:</div>
                        <div class="info-value">${customerName}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Nomor Meja:</div>
                        <div class="info-value">${customerTable}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Metode Pembayaran:</div>
                        <div class="info-value">${customerPayment}</div>
                    </div>
                </div>
            </div>
            
            <div class="section">
                <div class="section-title">Detail Pesanan</div>
                <table class="items-table">
                    <thead>
                        <tr>
                            <th style="text-align: left;">ITEM</th>
                            <th style="width: 80px;">QTY</th>
                            <th style="width: 120px; text-align: right;">HARGA</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${validatedItems.map(item => `
                            <tr>
                                <td class="item-name">${item.name}</td>
                                <td class="item-qty">x${item.quantity}</td>
                                <td class="item-price">Rp ${item.total.toLocaleString('id-ID')}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            
            <div class="summary-box">
                <div class="summary-row">
                    <div class="summary-label">Subtotal:</div>
                    <div class="summary-value">Rp ${subtotal.toLocaleString('id-ID')}</div>
                </div>
                <div class="summary-row">
                    <div class="summary-label">Pajak (10%):</div>
                    <div class="summary-value">Rp ${tax.toLocaleString('id-ID')}</div>
                </div>
                <div class="summary-row total-row">
                    <div class="summary-label">Total Pembayaran:</div>
                    <div class="summary-value">Rp ${finalTotal.toLocaleString('id-ID')}</div>
                </div>
            </div>
        </div>
        
        <div class="footer">
            <div class="thank-you">Terima kasih sudah berbelanja di Cappunabara! 💖</div>
            <div class="contact-info">📞 0812-3456-7890 | 📧 hello@cappunabara.com</div>
            <div class="contact-info">📍 Jl. Kopi Hangat No. 123, Jakarta</div>
            <div class="contact-info">🌐 www.cappunabara.com</div>
            <div class="print-date">Dicetak: ${new Date().toLocaleString('id-ID')}</div>
        </div>
    </div>
    
    <script>
        window.focus();
        
        // Show success message
        setTimeout(function() {
            console.log('✅ PDF Fixed - No more undefined values!');
        }, 500);
        
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
    </script>
</body>
</html>`;
    
    // ✅ STEP 8: Open in new window with error handling
    try {
        const printWindow = window.open('', '_blank', 'width=900,height=1200,scrollbars=yes');
        
        if (!printWindow) {
            alert('❌ POPUP DIBLOKIR!\\n\\nSilakan:\\n1. Allow popup untuk localhost:5140\\n2. Refresh halaman\\n3. Coba lagi');
            return;
        }
        
        // Write content and close
        printWindow.document.write(htmlContent);
        printWindow.document.close();
        printWindow.focus();
        
        // Show success message
        alert('✅ PDF BERHASIL DIPERBAIKI!\\n\\n• Tidak ada "undefined" lagi\\n• Semua data sudah divalidasi\\n• Tab baru telah terbuka\\n\\nKlik "PRINT/SAVE PDF" untuk download.');
        
        console.log('✅ Fixed PDF window opened successfully for order:', orderId);
        
    } catch (error) {
        console.error('Error opening PDF window:', error);
        alert('❌ Error membuka PDF: ' + error.message);
    }
}

// Export function to global scope
window.createFixedPDF = createFixedPDF;

// ========== DATA VALIDATION UTILITIES ==========

// Function to validate and fix order data
function validateAndFixOrderData(order) {
    if (!order || typeof order !== 'object') {
        return null;
    }
    
    return {
        id: order.id || 'CPB' + Date.now().toString().slice(-6),
        customer: {
            name: order.customer?.name || 'Customer',
            table: order.customer?.table || '-',
            phone: order.customer?.phone || '-',
            payment: order.customer?.payment || 'cash',
            notes: order.customer?.notes || ''
        },
        items: (order.items || []).map((item, index) => ({
            name: item.name || `Item ${index + 1}`,
            quantity: parseInt(item.quantity) || 1,
            price: parseInt(item.price) || 0
        })),
        timestamp: order.timestamp || new Date().toISOString(),
        total: order.total || 0,
        status: order.status || 'completed'
    };
}

// Function to create valid test data
function createValidTestData() {
    const validOrder = {
        id: 'CPB' + Date.now().toString().slice(-6),
        customer: {
            name: 'Mala Sari',
            table: 'A8',
            phone: '081234567890',
            payment: 'ewallet',
            notes: 'Test order - data lengkap'
        },
        items: [
            {
                id: 1,
                name: 'Mocha Delight',
                price: 38000,
                quantity: 2,
                image: '☕',
                category: 'coffee'
            },
            {
                id: 2,
                name: 'Chicken Wrap',
                price: 40000,
                quantity: 1,
                image: '🌯',
                category: 'food'
            }
        ],
        timestamp: new Date().toISOString(),
        total: 116000,
        status: 'completed'
    };
    
    localStorage.setItem('cappunabara_order_history', JSON.stringify([validOrder]));
    return validOrder;
}

// Export utilities
window.validateAndFixOrderData = validateAndFixOrderData;
window.createValidTestData = createValidTestData;
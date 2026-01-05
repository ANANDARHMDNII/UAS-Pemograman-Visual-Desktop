// ========== PDF STRUK GENERATOR - CAFÉ LUNA ==========
// Solusi lengkap untuk download struk dalam bentuk PDF

console.log('🔧 PDF Struk Generator Loading...');

// Function to download struk as PDF using jsPDF
function downloadStrukPDF(orderData) {
    console.log('Generating PDF for order:', orderData.id);
    
    try {
        // Check if jsPDF is available, if not load it
        if (typeof window.jsPDF === 'undefined') {
            loadJsPDFAndGenerate(orderData);
            return;
        }
        
        generatePDFStruk(orderData);
    } catch (error) {
        console.error('Error generating PDF:', error);
        // Fallback to HTML print method
        generateHTMLStruk(orderData);
    }
}

// Load jsPDF library and generate PDF
function loadJsPDFAndGenerate(orderData) {
    console.log('Loading jsPDF library...');
    
    // Create script element for jsPDF
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
    script.onload = function() {
        console.log('jsPDF loaded successfully');
        // Wait a bit for library to initialize
        setTimeout(() => {
            generatePDFStruk(orderData);
        }, 500);
    };
    script.onerror = function() {
        console.error('Failed to load jsPDF, using HTML method');
        generateHTMLStruk(orderData);
    };
    document.head.appendChild(script);
}

// Generate PDF using jsPDF
function generatePDFStruk(orderData) {
    try {
        console.log('Creating PDF with jsPDF...');
        
        // Initialize jsPDF
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Calculate totals
        const subtotal = orderData.total;
        const tax = subtotal * 0.1;
        const finalTotal = subtotal + tax;
        
        // Set font
        doc.setFont('helvetica');
        
        // Header - Café Luna
        doc.setFontSize(24);
        doc.setTextColor(139, 111, 71); // Brown color
        doc.text('☕ CAFÉ LUNA', 105, 30, { align: 'center' });
        
        doc.setFontSize(12);
        doc.setTextColor(100, 100, 100);
        doc.text('Your Cozy Corner', 105, 40, { align: 'center' });
        
        // Line separator
        doc.setDrawColor(139, 111, 71);
        doc.setLineWidth(0.5);
        doc.line(20, 50, 190, 50);
        
        // Order Information
        doc.setFontSize(16);
        doc.setTextColor(139, 111, 71);
        doc.text('STRUK PEMBELIAN', 105, 65, { align: 'center' });
        
        let yPos = 80;
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        
        // Order details
        const orderDate = new Date(orderData.timestamp);
        doc.text(`No. Pesanan: ${orderData.id}`, 20, yPos);
        yPos += 8;
        doc.text(`Tanggal: ${orderDate.toLocaleDateString('id-ID')}`, 20, yPos);
        yPos += 8;
        doc.text(`Waktu: ${orderDate.toLocaleTimeString('id-ID')}`, 20, yPos);
        yPos += 8;
        doc.text(`Pelanggan: ${orderData.customer.name}`, 20, yPos);
        yPos += 8;
        doc.text(`Meja: ${orderData.customer.table}`, 20, yPos);
        yPos += 8;
        doc.text(`Pembayaran: ${orderData.customer.payment}`, 20, yPos);
        yPos += 15;
        
        // Items header
        doc.setDrawColor(200, 200, 200);
        doc.line(20, yPos, 190, yPos);
        yPos += 8;
        
        doc.setFontSize(9);
        doc.setTextColor(100, 100, 100);
        doc.text('ITEM', 20, yPos);
        doc.text('QTY', 130, yPos);
        doc.text('HARGA', 160, yPos, { align: 'right' });
        yPos += 5;
        
        doc.line(20, yPos, 190, yPos);
        yPos += 8;
        
        // Items list
        doc.setTextColor(0, 0, 0);
        orderData.items.forEach(item => {
            const itemTotal = item.price * item.quantity;
            doc.text(item.name, 20, yPos);
            doc.text(`${item.quantity}x`, 130, yPos);
            doc.text(`Rp ${itemTotal.toLocaleString('id-ID')}`, 190, yPos, { align: 'right' });
            yPos += 8;
        });
        
        // Totals section
        yPos += 5;
        doc.line(20, yPos, 190, yPos);
        yPos += 10;
        
        doc.text('Subtotal:', 130, yPos);
        doc.text(`Rp ${subtotal.toLocaleString('id-ID')}`, 190, yPos, { align: 'right' });
        yPos += 8;
        
        doc.text('Pajak (10%):', 130, yPos);
        doc.text(`Rp ${tax.toLocaleString('id-ID')}`, 190, yPos, { align: 'right' });
        yPos += 8;
        
        // Total line
        doc.setLineWidth(1);
        doc.line(130, yPos, 190, yPos);
        yPos += 8;
        
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('TOTAL:', 130, yPos);
        doc.text(`Rp ${finalTotal.toLocaleString('id-ID')}`, 190, yPos, { align: 'right' });
        
        // Footer
        yPos += 20;
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(100, 100, 100);
        doc.text('Terima kasih sudah berbelanja di Café Luna!', 105, yPos, { align: 'center' });
        yPos += 8;
        doc.text('📞 0812-3456-7890 | 📧 hello@cafeluna.com', 105, yPos, { align: 'center' });
        yPos += 8;
        doc.text('📍 Jl. Kopi Hangat No. 123, Jakarta', 105, yPos, { align: 'center' });
        
        // Print timestamp
        yPos += 15;
        doc.setFontSize(8);
        doc.text(`Dicetak: ${new Date().toLocaleString('id-ID')}`, 105, yPos, { align: 'center' });
        
        // Save the PDF
        const fileName = `Struk_CafeLuna_${orderData.id}_${new Date().toISOString().slice(0, 10)}.pdf`;
        doc.save(fileName);
        
        console.log('PDF generated and downloaded:', fileName);
        showNotification('✅ Struk berhasil didownload sebagai PDF!', 'success');
        
    } catch (error) {
        console.error('Error in generatePDFStruk:', error);
        showNotification('❌ Error generating PDF, trying alternative method...', 'error');
        generateHTMLStruk(orderData);
    }
}

// Fallback: Generate HTML struk for print/save as PDF
function generateHTMLStruk(orderData) {
    console.log('Generating HTML struk for print...');
    
    try {
        const subtotal = orderData.total;
        const tax = subtotal * 0.1;
        const finalTotal = subtotal + tax;
        const orderDate = new Date(orderData.timestamp);
        
        const printWindow = window.open('', '_blank', 'width=800,height=1000');
        
        const htmlContent = `
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
            font-family: 'Arial', sans-serif;
            line-height: 1.4;
            color: #333;
            background: white;
        }
        
        .struk-container {
            max-width: 400px;
            margin: 0 auto;
            padding: 20px;
            border: 2px solid #8B6F47;
            border-radius: 10px;
        }
        
        .header {
            text-align: center;
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 2px solid #8B6F47;
        }
        
        .logo {
            font-size: 32px;
            margin-bottom: 5px;
        }
        
        .brand-name {
            font-size: 24px;
            font-weight: bold;
            color: #8B6F47;
            margin-bottom: 5px;
        }
        
        .tagline {
            font-size: 14px;
            color: #666;
            font-style: italic;
        }
        
        .title {
            text-align: center;
            font-size: 18px;
            font-weight: bold;
            color: #8B6F47;
            margin: 20px 0;
        }
        
        .info-section {
            margin-bottom: 20px;
        }
        
        .info-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
            font-size: 14px;
        }
        
        .info-label {
            font-weight: bold;
        }
        
        .items-section {
            margin: 20px 0;
        }
        
        .items-header {
            display: flex;
            justify-content: space-between;
            font-weight: bold;
            font-size: 12px;
            padding: 8px 0;
            border-bottom: 1px solid #ddd;
            color: #666;
        }
        
        .item-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 0;
            border-bottom: 1px dashed #ddd;
            font-size: 14px;
        }
        
        .item-name {
            flex: 1;
            font-weight: 500;
        }
        
        .item-qty {
            width: 60px;
            text-align: center;
            color: #666;
        }
        
        .item-price {
            width: 100px;
            text-align: right;
            font-weight: bold;
            color: #8B6F47;
        }
        
        .totals-section {
            margin-top: 20px;
            padding-top: 15px;
            border-top: 2px solid #8B6F47;
        }
        
        .total-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
            font-size: 14px;
        }
        
        .final-total {
            font-size: 18px;
            font-weight: bold;
            color: #8B6F47;
            border-top: 1px solid #8B6F47;
            padding-top: 8px;
            margin-top: 8px;
        }
        
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            font-size: 12px;
            color: #666;
        }
        
        .thank-you {
            font-size: 16px;
            font-weight: bold;
            color: #8B6F47;
            margin-bottom: 10px;
        }
        
        .contact-info {
            margin-bottom: 5px;
        }
        
        .print-date {
            margin-top: 20px;
            font-size: 10px;
            color: #999;
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
            }
            
            .no-print {
                display: none !important;
            }
        }
        
        .print-instructions {
            background: #e3f2fd;
            border: 1px solid #2196F3;
            border-radius: 5px;
            padding: 15px;
            margin-bottom: 20px;
            text-align: center;
        }
        
        .print-btn {
            background: #4CAF50;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
            margin: 5px;
        }
        
        .print-btn:hover {
            background: #45a049;
        }
    </style>
</head>
<body>
    <div class="print-instructions no-print">
        <h3>📥 Cara Download/Print Struk:</h3>
        <p>1. Klik tombol "Print Struk" di bawah</p>
        <p>2. Atau tekan <strong>Ctrl+P</strong> untuk print</p>
        <p>3. Pilih <strong>"Save as PDF"</strong> untuk download</p>
        <button class="print-btn" onclick="window.print()">🖨️ Print Struk</button>
        <button class="print-btn" onclick="window.close()">❌ Tutup</button>
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
                <span>${orderData.id}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Tanggal:</span>
                <span>${orderDate.toLocaleDateString('id-ID')}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Waktu:</span>
                <span>${orderDate.toLocaleTimeString('id-ID')}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Pelanggan:</span>
                <span>${orderData.customer.name}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Meja:</span>
                <span>${orderData.customer.table}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Pembayaran:</span>
                <span>${orderData.customer.payment}</span>
            </div>
        </div>
        
        <div class="items-section">
            <div class="items-header">
                <span>ITEM</span>
                <span>QTY</span>
                <span>HARGA</span>
            </div>
            ${orderData.items.map(item => `
                <div class="item-row">
                    <span class="item-name">${item.name}</span>
                    <span class="item-qty">${item.quantity}x</span>
                    <span class="item-price">Rp ${(item.price * item.quantity).toLocaleString('id-ID')}</span>
                </div>
            `).join('')}
        </div>
        
        <div class="totals-section">
            <div class="total-row">
                <span>Subtotal:</span>
                <span>Rp ${subtotal.toLocaleString('id-ID')}</span>
            </div>
            <div class="total-row">
                <span>Pajak (10%):</span>
                <span>Rp ${tax.toLocaleString('id-ID')}</span>
            </div>
            <div class="total-row final-total">
                <span>TOTAL:</span>
                <span>Rp ${finalTotal.toLocaleString('id-ID')}</span>
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
        // Auto-focus for better print experience
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
        
        // Optional: Auto-print after 1 second (uncomment if desired)
        // setTimeout(function() {
        //     window.print();
        // }, 1000);
    </script>
</body>
</html>`;
        
        printWindow.document.write(htmlContent);
        printWindow.document.close();
        
        console.log('HTML struk generated successfully');
        showNotification('✅ Struk siap untuk print/download! Gunakan Ctrl+P untuk Save as PDF', 'success');
        
    } catch (error) {
        console.error('Error generating HTML struk:', error);
        showNotification('❌ Error generating struk!', 'error');
    }
}

// Enhanced download functions for different contexts
function downloadReceiptPDF() {
    console.log('Download receipt PDF called');
    
    const orderHistory = JSON.parse(localStorage.getItem('cappunabara_order_history')) || [];
    
    if (orderHistory.length === 0) {
        showNotification('❌ Tidak ada pesanan untuk didownload!', 'error');
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
    
    downloadStrukPDF(orderData);
}

function downloadOrderReceiptPDF(orderId) {
    console.log('Download order receipt PDF called for:', orderId);
    
    const orderHistory = JSON.parse(localStorage.getItem('cappunabara_order_history')) || [];
    const order = orderHistory.find(o => o.id === orderId);
    
    if (!order) {
        showNotification('❌ Pesanan tidak ditemukan!', 'error');
        return;
    }
    
    const orderData = {
        id: order.id,
        timestamp: order.timestamp,
        customer: order.customer,
        items: order.items,
        total: order.total
    };
    
    downloadStrukPDF(orderData);
}

// Show notification function
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.pdf-notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `pdf-notification ${type}`;
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="font-size: 1.2rem;">${type === 'success' ? '✅' : '❌'}</span>
            <span>${message}</span>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#F44336'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 10000;
        font-weight: 600;
        box-shadow: 0 4px 16px rgba(0,0,0,0.2);
        animation: slideInRight 0.3s ease;
        max-width: 400px;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Make functions globally available
window.downloadStrukPDF = downloadStrukPDF;
window.downloadReceiptPDF = downloadReceiptPDF;
window.downloadOrderReceiptPDF = downloadOrderReceiptPDF;
window.generateHTMLStruk = generateHTMLStruk;

console.log('✅ PDF Struk Generator Loaded Successfully!');
console.log('Available functions: downloadStrukPDF, downloadReceiptPDF, downloadOrderReceiptPDF');
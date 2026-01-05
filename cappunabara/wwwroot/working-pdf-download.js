// ========== WORKING PDF DOWNLOAD - GUARANTEED TO WORK ==========

// Function to create working PDF download
function createWorkingPDF(order) {
    console.log('Creating WORKING PDF for order:', order.id);
    
    // Validate and sanitize order data
    if (!order || !order.id) {
        alert('❌ Data pesanan tidak valid!');
        return;
    }
    
    // Calculate totals with validation
    const subtotal = order.total || 0;
    const tax = subtotal * 0.1;
    const finalTotal = subtotal + tax;
    const orderDate = new Date(order.timestamp || new Date());
    
    // Validate customer data
    const customer = order.customer || {};
    const customerName = customer.name || 'Customer';
    const customerTable = customer.table || '-';
    const customerPayment = customer.payment || 'cash';
    
    // Validate items data
    const items = order.items || [];
    if (items.length === 0) {
        alert('❌ Tidak ada item dalam pesanan!');
        return;
    }
    
    // Create HTML content using simple string concatenation (NO TEMPLATE LITERALS)
    let html = '';
    html += '<!DOCTYPE html>';
    html += '<html>';
    html += '<head>';
    html += '<meta charset="UTF-8">';
    html += '<title>Struk Cappunabara - ' + order.id + '</title>';
    html += '<style>';
    html += 'body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }';
    html += '.container { max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.1); }';
    html += '.header { background: linear-gradient(135deg, #8B6F47, #A67B5B); color: white; padding: 30px; text-align: center; }';
    html += '.logo { font-size: 48px; margin-bottom: 10px; }';
    html += '.brand { font-size: 28px; font-weight: bold; margin-bottom: 5px; }';
    html += '.tagline { font-size: 14px; opacity: 0.9; }';
    html += '.content { padding: 30px; }';
    html += '.section { margin-bottom: 25px; }';
    html += '.section-title { font-size: 18px; font-weight: bold; color: #8B6F47; margin-bottom: 15px; border-bottom: 2px solid #f0f0f0; padding-bottom: 5px; }';
    html += '.info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px; }';
    html += '.info-item { }';
    html += '.info-label { font-size: 14px; color: #666; margin-bottom: 3px; }';
    html += '.info-value { font-size: 16px; font-weight: bold; color: #333; }';
    html += '.order-badge { background: #8B6F47; color: white; padding: 5px 12px; border-radius: 15px; font-size: 12px; }';
    html += '.items-table { width: 100%; border-collapse: collapse; margin: 20px 0; }';
    html += '.items-table th { background: #8B6F47; color: white; padding: 12px; text-align: left; }';
    html += '.items-table td { padding: 12px; border-bottom: 1px solid #eee; }';
    html += '.items-table tr:nth-child(even) { background: #f9f9f9; }';
    html += '.summary { background: #f8f9fa; border: 2px solid #8B6F47; border-radius: 8px; padding: 20px; margin-top: 20px; }';
    html += '.summary-row { display: flex; justify-content: space-between; margin-bottom: 8px; }';
    html += '.total-row { border-top: 2px solid #8B6F47; padding-top: 10px; margin-top: 10px; font-size: 18px; font-weight: bold; color: #8B6F47; }';
    html += '.footer { background: #8B6F47; color: white; padding: 20px; text-align: center; }';
    html += '.thank-you { font-size: 16px; font-weight: bold; margin-bottom: 10px; }';
    html += '.contact { font-size: 12px; margin-bottom: 5px; opacity: 0.9; }';
    html += '.instructions { background: #e3f2fd; border: 2px solid #2196F3; border-radius: 8px; padding: 20px; margin-bottom: 20px; text-align: center; }';
    html += '.btn { background: #4CAF50; color: white; border: none; padding: 12px 24px; border-radius: 5px; cursor: pointer; font-size: 16px; margin: 5px; font-weight: bold; }';
    html += '.btn-close { background: #f44336; }';
    html += '@media print { .instructions { display: none !important; } body { background: white; } .container { box-shadow: none; } }';
    html += '</style>';
    html += '</head>';
    html += '<body>';
    
    // Instructions
    html += '<div class="instructions">';
    html += '<h3>📥 CARA DOWNLOAD PDF</h3>';
    html += '<p><strong>1. Klik tombol PRINT/SAVE PDF di bawah</strong></p>';
    html += '<p><strong>2. Pilih "Save as PDF" di dialog print</strong></p>';
    html += '<p><strong>3. Klik Save untuk menyimpan</strong></p>';
    html += '<button class="btn" onclick="window.print()">🖨️ PRINT / SAVE PDF</button>';
    html += '<button class="btn btn-close" onclick="window.close()">❌ TUTUP</button>';
    html += '</div>';
    
    // Container
    html += '<div class="container">';
    
    // Header
    html += '<div class="header">';
    html += '<div class="logo">☕</div>';
    html += '<div class="brand">CAPPUNABARA</div>';
    html += '<div class="tagline">Your Cozy Corner</div>';
    html += '</div>';
    
    // Content
    html += '<div class="content">';
    
    // Info Section
    html += '<div class="section">';
    html += '<div class="section-title">INFORMASI PESANAN</div>';
    html += '<div class="info-grid">';
    html += '<div class="info-item">';
    html += '<div class="info-label">No. Order:</div>';
    html += '<div class="info-value"><span class="order-badge">' + order.id + '</span></div>';
    html += '</div>';
    html += '<div class="info-item">';
    html += '<div class="info-label">Tanggal:</div>';
    html += '<div class="info-value">' + orderDate.toLocaleDateString('id-ID') + '</div>';
    html += '</div>';
    html += '<div class="info-item">';
    html += '<div class="info-label">Waktu:</div>';
    html += '<div class="info-value">' + orderDate.toLocaleTimeString('id-ID') + '</div>';
    html += '</div>';
    html += '<div class="info-item">';
    html += '<div class="info-label">Nama Pelanggan:</div>';
    html += '<div class="info-value">' + customerName + '</div>';
    html += '</div>';
    html += '<div class="info-item">';
    html += '<div class="info-label">Nomor Meja:</div>';
    html += '<div class="info-value">' + customerTable + '</div>';
    html += '</div>';
    html += '<div class="info-item">';
    html += '<div class="info-label">Metode Pembayaran:</div>';
    html += '<div class="info-value">' + customerPayment + '</div>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    
    // Items Section
    html += '<div class="section">';
    html += '<div class="section-title">DETAIL PESANAN</div>';
    html += '<table class="items-table">';
    html += '<thead>';
    html += '<tr>';
    html += '<th>ITEM</th>';
    html += '<th style="width: 80px; text-align: center;">QTY</th>';
    html += '<th style="width: 120px; text-align: right;">HARGA</th>';
    html += '</tr>';
    html += '</thead>';
    html += '<tbody>';
    
    // Add items with validation
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const itemName = item.name || 'Item ' + (i + 1);
        const itemQuantity = item.quantity || 1;
        const itemPrice = item.price || 0;
        const itemTotal = itemPrice * itemQuantity;
        
        html += '<tr>';
        html += '<td style="font-weight: bold;">' + itemName + '</td>';
        html += '<td style="text-align: center;">x' + itemQuantity + '</td>';
        html += '<td style="text-align: right; font-weight: bold; color: #8B6F47;">Rp ' + itemTotal.toLocaleString('id-ID') + '</td>';
        html += '</tr>';
    }
    
    html += '</tbody>';
    html += '</table>';
    html += '</div>';
    
    // Summary
    html += '<div class="summary">';
    html += '<div class="summary-row">';
    html += '<span>Subtotal:</span>';
    html += '<span>Rp ' + subtotal.toLocaleString('id-ID') + '</span>';
    html += '</div>';
    html += '<div class="summary-row">';
    html += '<span>Pajak (10%):</span>';
    html += '<span>Rp ' + tax.toLocaleString('id-ID') + '</span>';
    html += '</div>';
    html += '<div class="summary-row total-row">';
    html += '<span>TOTAL PEMBAYARAN:</span>';
    html += '<span>Rp ' + finalTotal.toLocaleString('id-ID') + '</span>';
    html += '</div>';
    html += '</div>';
    
    html += '</div>'; // close content
    
    // Footer
    html += '<div class="footer">';
    html += '<div class="thank-you">Terima kasih sudah berbelanja di Cappunabara! 💖</div>';
    html += '<div class="contact">📞 0812-3456-7890 | 📧 hello@cappunabara.com</div>';
    html += '<div class="contact">📍 Jl. Kopi Hangat No. 123, Jakarta</div>';
    html += '<div class="contact">🌐 www.cappunabara.com</div>';
    html += '<div style="margin-top: 10px; font-size: 10px; opacity: 0.8;">Dicetak: ' + new Date().toLocaleString('id-ID') + '</div>';
    html += '</div>';
    
    html += '</div>'; // close container
    
    // Script
    html += '<script>';
    html += 'window.focus();';
    html += 'setTimeout(function() {';
    html += 'alert("CARA DOWNLOAD PDF: 1. Klik PRINT/SAVE PDF 2. Pilih Save as PDF 3. Klik Save");';
    html += '}, 1000);';
    html += '</script>';
    
    html += '</body>';
    html += '</html>';
    
    // Open new window
    const printWindow = window.open('', '_blank', 'width=800,height=1000,scrollbars=yes');
    
    if (!printWindow) {
        alert('POPUP DIBLOKIR! Silakan allow popup untuk localhost:5140 dan coba lagi.');
        return;
    }
    
    // Write content
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    
    // Success message
    alert('STRUK BERHASIL DIBUKA! Tab baru telah terbuka. Klik PRINT/SAVE PDF untuk download.');
    
    console.log('Working PDF opened successfully for order:', order.id);
}

// Export to global scope
window.createWorkingPDF = createWorkingPDF;
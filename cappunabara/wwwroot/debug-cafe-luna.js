// ========== CAFÉ LUNA DEBUG UTILITIES ==========

// Debug utilities for Café Luna ordering system
window.CafeLunaDebug = {
    
    // Test localStorage functionality
    testLocalStorage: function() {
        console.log('=== CAFÉ LUNA LOCALSTORAGE TEST ===');
        
        try {
            // Test basic localStorage
            localStorage.setItem('test', 'working');
            const test = localStorage.getItem('test');
            localStorage.removeItem('test');
            console.log('✅ localStorage basic test:', test === 'working' ? 'PASSED' : 'FAILED');
            
            // Check existing data
            const orderHistory = localStorage.getItem('cappunabara_order_history');
            const customerData = localStorage.getItem('cappunabara_customer_data');
            
            console.log('📊 Current Data Status:');
            console.log('- Order history exists:', !!orderHistory);
            console.log('- Customer data exists:', !!customerData);
            
            if (orderHistory) {
                const orders = JSON.parse(orderHistory);
                console.log('- Total orders:', orders.length);
                console.log('- Latest order:', orders[0]?.id || 'None');
            }
            
            if (customerData) {
                const customer = JSON.parse(customerData);
                console.log('- Customer name:', customer.name || 'None');
                console.log('- Last order date:', customer.lastOrderDate || 'None');
            }
            
            return true;
        } catch (error) {
            console.error('❌ localStorage test failed:', error);
            return false;
        }
    },
    
    // Create and save test order
    createTestOrder: function() {
        console.log('=== CREATING TEST ORDER ===');
        
        const testOrder = {
            id: 'CAF' + Date.now().toString().slice(-6),
            customer: {
                name: 'Debug User',
                table: 'DEBUG1',
                phone: '081234567890',
                payment: 'cash',
                notes: 'Test order from debug'
            },
            items: [
                { id: 1, name: 'Cappuccino Signature', price: 35000, quantity: 1, image: '☕' },
                { id: 19, name: 'Tiramisu Slice', price: 45000, quantity: 1, image: '🍰' }
            ],
            timestamp: new Date().toISOString(),
            total: 80000,
            status: 'completed'
        };
        
        try {
            // Get existing data
            let orderHistory = JSON.parse(localStorage.getItem('cappunabara_order_history') || '[]');
            let customerData = JSON.parse(localStorage.getItem('cappunabara_customer_data') || '{}');
            
            // Add order to history
            orderHistory.unshift(testOrder);
            
            // Update customer data
            customerData = {
                ...customerData,
                name: testOrder.customer.name,
                phone: testOrder.customer.phone,
                lastOrderDate: new Date().toISOString(),
                totalOrders: (customerData.totalOrders || 0) + 1,
                totalSpent: (customerData.totalSpent || 0) + testOrder.total
            };
            
            // Save to localStorage
            localStorage.setItem('cappunabara_order_history', JSON.stringify(orderHistory));
            localStorage.setItem('cappunabara_customer_data', JSON.stringify(customerData));
            
            console.log('✅ Test order created and saved:', testOrder.id);
            console.log('📊 Updated stats:');
            console.log('- Total orders:', orderHistory.length);
            console.log('- Customer total spent:', customerData.totalSpent);
            console.log('- Last order date:', customerData.lastOrderDate);
            
            // Trigger storage events
            window.dispatchEvent(new StorageEvent('storage', {
                key: 'cappunabara_order_history',
                newValue: JSON.stringify(orderHistory)
            }));
            
            return testOrder;
        } catch (error) {
            console.error('❌ Failed to create test order:', error);
            return null;
        }
    },
    
    // Force update timestamps
    updateTimestamps: function() {
        console.log('=== UPDATING TIMESTAMPS ===');
        
        try {
            let orderHistory = JSON.parse(localStorage.getItem('cappunabara_order_history') || '[]');
            let customerData = JSON.parse(localStorage.getItem('cappunabara_customer_data') || '{}');
            
            // Update all order timestamps to recent dates
            const now = new Date();
            orderHistory = orderHistory.map((order, index) => {
                const orderDate = new Date(now.getTime() - (index * 24 * 60 * 60 * 1000)); // Each order 1 day apart
                return {
                    ...order,
                    timestamp: orderDate.toISOString()
                };
            });
            
            // Update customer last order date to today
            if (orderHistory.length > 0) {
                customerData.lastOrderDate = new Date().toISOString();
            }
            
            // Save updated data
            localStorage.setItem('cappunabara_order_history', JSON.stringify(orderHistory));
            localStorage.setItem('cappunabara_customer_data', JSON.stringify(customerData));
            
            console.log('✅ Timestamps updated successfully');
            console.log('- Orders updated:', orderHistory.length);
            console.log('- Latest order date:', orderHistory[0]?.timestamp);
            console.log('- Customer last order:', customerData.lastOrderDate);
            
            // Trigger storage events
            window.dispatchEvent(new StorageEvent('storage', {
                key: 'cappunabara_order_history',
                newValue: JSON.stringify(orderHistory)
            }));
            
            return true;
        } catch (error) {
            console.error('❌ Failed to update timestamps:', error);
            return false;
        }
    },
    
    // Clear all data
    clearAllData: function() {
        console.log('=== CLEARING ALL DATA ===');
        
        try {
            localStorage.removeItem('cappunabara_order_history');
            localStorage.removeItem('cappunabara_customer_data');
            
            console.log('✅ All data cleared successfully');
            
            // Trigger storage events
            window.dispatchEvent(new StorageEvent('storage', {
                key: 'cappunabara_order_history',
                newValue: null
            }));
            
            return true;
        } catch (error) {
            console.error('❌ Failed to clear data:', error);
            return false;
        }
    },
    
    // Generate sample data
    generateSampleData: function(count = 5) {
        console.log(`=== GENERATING ${count} SAMPLE ORDERS ===`);
        
        const sampleCustomers = [
            { name: 'Ahmad Rizki', phone: '081234567890' },
            { name: 'Siti Nurhaliza', phone: '081234567891' },
            { name: 'Budi Santoso', phone: '081234567892' },
            { name: 'Maya Sari', phone: '081234567893' },
            { name: 'Dedi Kurniawan', phone: '081234567894' }
        ];
        
        const sampleItems = [
            { id: 1, name: 'Cappuccino Signature', price: 35000, image: '☕' },
            { id: 2, name: 'Caffe Latte', price: 32000, image: '☕' },
            { id: 3, name: 'Americano', price: 28000, image: '☕' },
            { id: 19, name: 'Tiramisu Slice', price: 45000, image: '🍰' },
            { id: 20, name: 'Cheesecake Blueberry', price: 42000, image: '🍰' }
        ];
        
        const paymentMethods = ['cash', 'transfer', 'ewallet'];
        
        try {
            let orderHistory = [];
            let totalSpent = 0;
            
            for (let i = 0; i < count; i++) {
                const customer = sampleCustomers[Math.floor(Math.random() * sampleCustomers.length)];
                const itemCount = Math.floor(Math.random() * 3) + 1;
                const orderItems = [];
                let orderTotal = 0;
                
                for (let j = 0; j < itemCount; j++) {
                    const item = sampleItems[Math.floor(Math.random() * sampleItems.length)];
                    const quantity = Math.floor(Math.random() * 3) + 1;
                    orderItems.push({
                        ...item,
                        quantity: quantity
                    });
                    orderTotal += item.price * quantity;
                }
                
                const daysAgo = Math.floor(Math.random() * 30);
                const orderDate = new Date();
                orderDate.setDate(orderDate.getDate() - daysAgo);
                
                const order = {
                    id: 'CAF' + (Date.now() + i).toString().slice(-6),
                    customer: {
                        name: customer.name,
                        phone: customer.phone,
                        table: 'A' + (Math.floor(Math.random() * 20) + 1),
                        payment: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
                        notes: ''
                    },
                    items: orderItems,
                    timestamp: orderDate.toISOString(),
                    total: orderTotal,
                    status: 'completed'
                };
                
                orderHistory.push(order);
                totalSpent += orderTotal;
            }
            
            // Sort by timestamp (newest first)
            orderHistory.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            
            // Create customer data based on latest order
            const latestOrder = orderHistory[0];
            const customerData = {
                name: latestOrder.customer.name,
                phone: latestOrder.customer.phone,
                lastOrderDate: new Date().toISOString(),
                totalOrders: count,
                totalSpent: totalSpent
            };
            
            // Save to localStorage
            localStorage.setItem('cappunabara_order_history', JSON.stringify(orderHistory));
            localStorage.setItem('cappunabara_customer_data', JSON.stringify(customerData));
            
            console.log('✅ Sample data generated successfully');
            console.log('- Orders created:', count);
            console.log('- Total value:', totalSpent.toLocaleString('id-ID'));
            console.log('- Date range:', orderHistory[orderHistory.length - 1].timestamp, 'to', orderHistory[0].timestamp);
            
            // Trigger storage events
            window.dispatchEvent(new StorageEvent('storage', {
                key: 'cappunabara_order_history',
                newValue: JSON.stringify(orderHistory)
            }));
            
            return orderHistory;
        } catch (error) {
            console.error('❌ Failed to generate sample data:', error);
            return null;
        }
    },
    
    // Run all tests
    runAllTests: function() {
        console.log('🧪 RUNNING ALL CAFÉ LUNA TESTS...');
        
        const results = {
            localStorage: this.testLocalStorage(),
            testOrder: !!this.createTestOrder(),
            timestamps: this.updateTimestamps()
        };
        
        console.log('📊 TEST RESULTS:', results);
        
        const allPassed = Object.values(results).every(result => result === true);
        console.log(allPassed ? '✅ ALL TESTS PASSED!' : '❌ SOME TESTS FAILED!');
        
        return results;
    }
};

// Auto-run basic test when script loads
console.log('🚀 Café Luna Debug Utilities Loaded');
console.log('💡 Available commands:');
console.log('- CafeLunaDebug.testLocalStorage()');
console.log('- CafeLunaDebug.createTestOrder()');
console.log('- CafeLunaDebug.updateTimestamps()');
console.log('- CafeLunaDebug.generateSampleData(5)');
console.log('- CafeLunaDebug.clearAllData()');
console.log('- CafeLunaDebug.runAllTests()');

// Run basic test
CafeLunaDebug.testLocalStorage();
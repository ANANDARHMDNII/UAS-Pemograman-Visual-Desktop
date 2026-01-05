// ========== DEBUG SCRIPT FOR EDIT FUNCTIONALITY ==========
// This script helps debug edit functionality issues on localhost:5140

console.log('🔧 Debug Script Loaded - Edit Functionality Checker');

// Debug configuration
const DEBUG_CONFIG = {
    enableConsoleLogging: true,
    enableVisualIndicators: true,
    enableFunctionChecks: true,
    enableDataValidation: true
};

// Debug logger
function debugLog(message, type = 'info') {
    if (!DEBUG_CONFIG.enableConsoleLogging) return;
    
    const timestamp = new Date().toLocaleTimeString('id-ID');
    const prefix = {
        'info': '🔍',
        'success': '✅',
        'warning': '⚠️',
        'error': '❌'
    }[type] || '🔍';
    
    console.log(`${prefix} [${timestamp}] ${message}`);
}

// Check if edit functions exist
function checkEditFunctions() {
    debugLog('Checking edit functions availability...', 'info');
    
    const functions = {
        'editOrder': typeof window.editOrder === 'function',
        'editPayment': typeof window.editPayment === 'function',
        'showEditOrderModal': typeof window.showEditOrderModal === 'function',
        'showEditPaymentModal': typeof window.showEditPaymentModal === 'function',
        'saveEditOrder': typeof window.saveEditOrder === 'function',
        'saveEditPayment': typeof window.saveEditPayment === 'function',
        'closeEditOrderModal': typeof window.closeEditOrderModal === 'function',
        'closeEditPaymentModal': typeof window.closeEditPaymentModal === 'function'
    };
    
    Object.entries(functions).forEach(([name, exists]) => {
        debugLog(`Function ${name}: ${exists ? 'EXISTS' : 'MISSING'}`, exists ? 'success' : 'error');
    });
    
    return functions;
}

// Check data availability
function checkDataAvailability() {
    debugLog('Checking data availability...', 'info');
    
    try {
        const orderHistory = JSON.parse(localStorage.getItem('cappunabara_order_history') || '[]');
        const customerData = JSON.parse(localStorage.getItem('cappunabara_customer_data') || '{}');
        
        debugLog(`Orders in localStorage: ${orderHistory.length}`, orderHistory.length > 0 ? 'success' : 'warning');
        debugLog(`Customer data available: ${Object.keys(customerData).length > 0 ? 'YES' : 'NO'}`, Object.keys(customerData).length > 0 ? 'success' : 'warning');
        
        if (orderHistory.length > 0) {
            debugLog(`Latest order: ${orderHistory[0].id} by ${orderHistory[0].customer.name}`, 'info');
        }
        
        return { orderHistory, customerData };
    } catch (error) {
        debugLog(`Data check error: ${error.message}`, 'error');
        return { orderHistory: [], customerData: {} };
    }
}

// Check DOM elements
function checkDOMElements() {
    debugLog('Checking DOM elements...', 'info');
    
    const elements = {
        'ordersTableBody': document.getElementById('ordersTableBody'),
        'paymentsTableBody': document.getElementById('paymentsTableBody'),
        'overlay': document.getElementById('overlay'),
        'editOrderModal': document.getElementById('editOrderModal'),
        'editPaymentModal': document.getElementById('editPaymentModal')
    };
    
    Object.entries(elements).forEach(([name, element]) => {
        debugLog(`Element ${name}: ${element ? 'EXISTS' : 'MISSING'}`, element ? 'success' : 'warning');
    });
    
    return elements;
}

// Test edit button functionality
function testEditButtons() {
    debugLog('Testing edit buttons...', 'info');
    
    const editButtons = document.querySelectorAll('.btn-edit');
    debugLog(`Edit buttons found: ${editButtons.length}`, editButtons.length > 0 ? 'success' : 'warning');
    
    editButtons.forEach((button, index) => {
        const onclick = button.getAttribute('onclick');
        debugLog(`Edit button ${index + 1} onclick: ${onclick || 'MISSING'}`, onclick ? 'success' : 'error');
    });
    
    return editButtons;
}

// Simulate edit functionality
function simulateEdit(orderId = null) {
    debugLog('Simulating edit functionality...', 'info');
    
    try {
        const orderHistory = JSON.parse(localStorage.getItem('cappunabara_order_history') || '[]');
        
        if (orderHistory.length === 0) {
            debugLog('No orders available for edit simulation', 'warning');
            return false;
        }
        
        const targetOrder = orderId ? 
            orderHistory.find(o => o.id === orderId) : 
            orderHistory[0];
        
        if (!targetOrder) {
            debugLog(`Order ${orderId} not found`, 'error');
            return false;
        }
        
        // Simulate edit
        const originalName = targetOrder.customer.name;
        targetOrder.customer.name = 'DEBUG EDIT - ' + originalName;
        targetOrder.lastModified = new Date().toISOString();
        
        localStorage.setItem('cappunabara_order_history', JSON.stringify(orderHistory));
        
        debugLog(`Edit simulation successful for order ${targetOrder.id}`, 'success');
        debugLog(`Name changed from "${originalName}" to "${targetOrder.customer.name}"`, 'info');
        
        // Trigger storage event
        window.dispatchEvent(new StorageEvent('storage', {
            key: 'cappunabara_order_history',
            newValue: JSON.stringify(orderHistory)
        }));
        
        return true;
    } catch (error) {
        debugLog(`Edit simulation error: ${error.message}`, 'error');
        return false;
    }
}

// Add visual debug indicators
function addVisualIndicators() {
    if (!DEBUG_CONFIG.enableVisualIndicators) return;
    
    debugLog('Adding visual debug indicators...', 'info');
    
    // Add debug panel
    const debugPanel = document.createElement('div');
    debugPanel.id = 'debugPanel';
    debugPanel.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 1rem;
        border-radius: 8px;
        z-index: 10000;
        font-family: monospace;
        font-size: 12px;
        max-width: 300px;
        max-height: 400px;
        overflow-y: auto;
    `;
    
    debugPanel.innerHTML = `
        <div style="font-weight: bold; margin-bottom: 0.5rem;">🔧 Debug Panel</div>
        <div id="debugStatus">Initializing...</div>
        <button onclick="runFullDebugCheck()" style="margin-top: 0.5rem; padding: 0.25rem 0.5rem; background: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer;">
            Run Full Check
        </button>
        <button onclick="document.getElementById('debugPanel').remove()" style="margin-top: 0.25rem; margin-left: 0.5rem; padding: 0.25rem 0.5rem; background: #F44336; color: white; border: none; border-radius: 4px; cursor: pointer;">
            Close
        </button>
    `;
    
    document.body.appendChild(debugPanel);
    
    // Highlight edit buttons
    const editButtons = document.querySelectorAll('.btn-edit');
    editButtons.forEach(button => {
        button.style.border = '2px solid #FF9800';
        button.title = 'DEBUG: Edit button detected';
    });
    
    debugLog(`Visual indicators added: Debug panel and ${editButtons.length} edit buttons highlighted`, 'success');
}

// Run full debug check
function runFullDebugCheck() {
    debugLog('Running full debug check...', 'info');
    
    const results = {
        functions: checkEditFunctions(),
        data: checkDataAvailability(),
        dom: checkDOMElements(),
        buttons: testEditButtons()
    };
    
    // Update debug panel
    const debugStatus = document.getElementById('debugStatus');
    if (debugStatus) {
        const functionCount = Object.values(results.functions).filter(Boolean).length;
        const totalFunctions = Object.keys(results.functions).length;
        
        debugStatus.innerHTML = `
            <div>Functions: ${functionCount}/${totalFunctions}</div>
            <div>Orders: ${results.data.orderHistory.length}</div>
            <div>Edit Buttons: ${results.buttons.length}</div>
            <div>DOM Elements: ${Object.values(results.dom).filter(Boolean).length}/5</div>
            <div>Status: ${functionCount === totalFunctions ? '✅ READY' : '⚠️ ISSUES'}</div>
            <div style="font-size: 10px; margin-top: 0.5rem;">
                Last check: ${new Date().toLocaleTimeString('id-ID')}
            </div>
        `;
    }
    
    debugLog('Full debug check completed', 'success');
    return results;
}

// Monitor storage events
function monitorStorageEvents() {
    debugLog('Setting up storage event monitoring...', 'info');
    
    window.addEventListener('storage', function(e) {
        if (e.key === 'cappunabara_order_history' || e.key === 'cappunabara_customer_data') {
            debugLog(`Storage event detected: ${e.key}`, 'info');
            debugLog(`New value length: ${e.newValue ? e.newValue.length : 0} characters`, 'info');
        }
    });
}

// Initialize debug system
function initializeDebugSystem() {
    debugLog('Initializing debug system...', 'info');
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(initializeDebugSystem, 1000);
        });
        return;
    }
    
    // Run initial checks
    setTimeout(() => {
        if (DEBUG_CONFIG.enableFunctionChecks) checkEditFunctions();
        if (DEBUG_CONFIG.enableDataValidation) checkDataAvailability();
        if (DEBUG_CONFIG.enableVisualIndicators) addVisualIndicators();
        
        monitorStorageEvents();
        
        // Make debug functions globally available
        window.debugEditFunctions = {
            checkEditFunctions,
            checkDataAvailability,
            checkDOMElements,
            testEditButtons,
            simulateEdit,
            runFullDebugCheck
        };
        
        debugLog('Debug system initialized successfully', 'success');
        debugLog('Available debug functions: window.debugEditFunctions', 'info');
        
        // Run initial full check
        runFullDebugCheck();
    }, 500);
}

// Auto-initialize when script loads
initializeDebugSystem();

// Export for manual use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        checkEditFunctions,
        checkDataAvailability,
        checkDOMElements,
        testEditButtons,
        simulateEdit,
        runFullDebugCheck
    };
}
// Authentication System - Simple & Secure
// Sistem autentikasi yang sederhana dan aman

(function() {
    'use strict';

    // Configuration
    const AUTH_CONFIG = {
        sessionKey: 'cappunabara_session',
        userKey: 'cappunabara_user',
        sessionTimeout: 24 * 60 * 60 * 1000, // 24 hours
        rememberTimeout: 30 * 24 * 60 * 60 * 1000 // 30 days
    };

    // Demo users (in real app, this would be server-side)
    const DEMO_USERS = {
        'admin': {
            password: 'admin123',
            name: 'Administrator',
            role: 'Administrator',
            email: 'admin@cappunabara.com'
        },
        'manager': {
            password: 'manager123',
            name: 'Manager',
            role: 'Manager',
            email: 'manager@cappunabara.com'
        },
        'staff': {
            password: 'staff123',
            name: 'Staff',
            role: 'Staff',
            email: 'staff@cappunabara.com'
        }
    };

    // Utility functions
    function generateSessionId() {
        return 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    function hashPassword(password) {
        // Simple hash for demo (use proper hashing in production)
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return hash.toString();
    }

    function isSessionValid(session) {
        if (!session || !session.expires) return false;
        return new Date().getTime() < session.expires;
    }

    // Main authentication functions
    function login(username, password, remember = false) {
        try {
            // Validate input
            if (!username || !password) {
                console.error('Username and password are required');
                return false;
            }

            // Check credentials
            const user = DEMO_USERS[username.toLowerCase()];
            if (!user || user.password !== password) {
                console.error('Invalid credentials');
                return false;
            }

            // Create session
            const sessionId = generateSessionId();
            const timeout = remember ? AUTH_CONFIG.rememberTimeout : AUTH_CONFIG.sessionTimeout;
            const expires = new Date().getTime() + timeout;

            const sessionData = {
                sessionId: sessionId,
                username: username.toLowerCase(),
                expires: expires,
                remember: remember,
                loginTime: new Date().toISOString()
            };

            const userData = {
                username: username.toLowerCase(),
                name: user.name,
                role: user.role,
                email: user.email,
                loginTime: sessionData.loginTime
            };

            // Store session
            localStorage.setItem(AUTH_CONFIG.sessionKey, JSON.stringify(sessionData));
            localStorage.setItem(AUTH_CONFIG.userKey, JSON.stringify(userData));

            console.log('Login successful for user:', username);
            return true;

        } catch (error) {
            console.error('Login error:', error);
            return false;
        }
    }

    function logout() {
        try {
            // Clear session data
            localStorage.removeItem(AUTH_CONFIG.sessionKey);
            localStorage.removeItem(AUTH_CONFIG.userKey);
            
            // Clear any other app-specific data
            localStorage.removeItem('cart');
            localStorage.removeItem('orderHistory');
            
            console.log('Logout successful');
            return true;

        } catch (error) {
            console.error('Logout error:', error);
            return false;
        }
    }

    function isLoggedIn() {
        try {
            const sessionData = localStorage.getItem(AUTH_CONFIG.sessionKey);
            if (!sessionData) return false;

            const session = JSON.parse(sessionData);
            if (!isSessionValid(session)) {
                // Session expired, clean up
                logout();
                return false;
            }

            return true;

        } catch (error) {
            console.error('Session check error:', error);
            logout(); // Clean up corrupted session
            return false;
        }
    }

    function getCurrentUser() {
        try {
            if (!isLoggedIn()) return null;

            const userData = localStorage.getItem(AUTH_CONFIG.userKey);
            if (!userData) return null;

            return JSON.parse(userData);

        } catch (error) {
            console.error('Get user error:', error);
            return null;
        }
    }

    function getSessionInfo() {
        try {
            if (!isLoggedIn()) return null;

            const sessionData = localStorage.getItem(AUTH_CONFIG.sessionKey);
            if (!sessionData) return null;

            const session = JSON.parse(sessionData);
            const timeLeft = session.expires - new Date().getTime();
            
            return {
                sessionId: session.sessionId,
                username: session.username,
                loginTime: session.loginTime,
                expires: new Date(session.expires).toISOString(),
                timeLeft: timeLeft,
                remember: session.remember
            };

        } catch (error) {
            console.error('Get session info error:', error);
            return null;
        }
    }

    function extendSession() {
        try {
            const sessionData = localStorage.getItem(AUTH_CONFIG.sessionKey);
            if (!sessionData) return false;

            const session = JSON.parse(sessionData);
            if (!isSessionValid(session)) return false;

            // Extend session
            const timeout = session.remember ? AUTH_CONFIG.rememberTimeout : AUTH_CONFIG.sessionTimeout;
            session.expires = new Date().getTime() + timeout;

            localStorage.setItem(AUTH_CONFIG.sessionKey, JSON.stringify(session));
            console.log('Session extended');
            return true;

        } catch (error) {
            console.error('Extend session error:', error);
            return false;
        }
    }

    function changePassword(currentPassword, newPassword) {
        try {
            const user = getCurrentUser();
            if (!user) return false;

            const userData = DEMO_USERS[user.username];
            if (!userData || userData.password !== currentPassword) {
                console.error('Current password is incorrect');
                return false;
            }

            // In real app, this would update server-side
            userData.password = newPassword;
            console.log('Password changed successfully');
            return true;

        } catch (error) {
            console.error('Change password error:', error);
            return false;
        }
    }

    // Auto session management
    function initAutoSessionManagement() {
        // Extend session on user activity
        const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
        let lastActivity = Date.now();

        events.forEach(event => {
            document.addEventListener(event, () => {
                const now = Date.now();
                if (now - lastActivity > 5 * 60 * 1000) { // 5 minutes
                    extendSession();
                    lastActivity = now;
                }
            }, true);
        });

        // Check session periodically
        setInterval(() => {
            if (!isLoggedIn() && window.location.pathname !== '/login.html') {
                console.log('Session expired, redirecting to login');
                window.location.href = 'login.html';
            }
        }, 60000); // Check every minute
    }

    // Page protection
    function protectPage() {
        const publicPages = ['login.html', 'register.html', 'forgot-password.html'];
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        if (!publicPages.includes(currentPage) && !isLoggedIn()) {
            console.log('Access denied, redirecting to login');
            window.location.href = 'login.html';
            return false;
        }
        
        return true;
    }

    // Initialize when DOM is ready
    function init() {
        initAutoSessionManagement();
        
        // Add session info to console for debugging
        if (isLoggedIn()) {
            console.log('Current session:', getSessionInfo());
            console.log('Current user:', getCurrentUser());
        }
    }

    // Export functions to global scope
    window.login = login;
    window.logout = logout;
    window.isLoggedIn = isLoggedIn;
    window.getCurrentUser = getCurrentUser;
    window.getSessionInfo = getSessionInfo;
    window.extendSession = extendSession;
    window.changePassword = changePassword;
    window.protectPage = protectPage;

    // Auto-initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Export for module systems
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = {
            login,
            logout,
            isLoggedIn,
            getCurrentUser,
            getSessionInfo,
            extendSession,
            changePassword,
            protectPage
        };
    }

})();
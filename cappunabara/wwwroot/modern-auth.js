// Modern Authentication System
// Sistem autentikasi modern yang stabil dan aman

(function() {
    'use strict';

    // Configuration
    const MODERN_AUTH_CONFIG = {
        sessionKey: 'modern_cappunabara_session',
        userKey: 'modern_cappunabara_user',
        sessionTimeout: 24 * 60 * 60 * 1000, // 24 hours
        rememberTimeout: 30 * 24 * 60 * 60 * 1000 // 30 days
    };

    // Demo users database
    const DEMO_USERS = {
        'admin': {
            password: 'admin123',
            name: 'Administrator',
            role: 'Administrator',
            email: 'admin@cappunabara.com',
            avatar: 'https://ui-avatars.com/api/?name=Administrator&background=8B4513&color=fff'
        },
        'manager': {
            password: 'manager123',
            name: 'Restaurant Manager',
            role: 'Manager',
            email: 'manager@cappunabara.com',
            avatar: 'https://ui-avatars.com/api/?name=Manager&background=D2691E&color=fff'
        },
        'staff': {
            password: 'staff123',
            name: 'Staff Member',
            role: 'Staff',
            email: 'staff@cappunabara.com',
            avatar: 'https://ui-avatars.com/api/?name=Staff&background=CD853F&color=fff'
        },
        'demo@cappunabara.com': {
            password: 'demo123',
            name: 'Demo User',
            role: 'Demo',
            email: 'demo@cappunabara.com',
            avatar: 'https://ui-avatars.com/api/?name=Demo+User&background=8B4513&color=fff'
        }
    };

    // Utility functions
    function generateSessionId() {
        return 'modern_sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 12);
    }

    function hashPassword(password) {
        // Simple hash for demo (use bcrypt in production)
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash).toString(16);
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isSessionValid(session) {
        if (!session || !session.expires) return false;
        return new Date().getTime() < session.expires;
    }

    function sanitizeInput(input) {
        if (typeof input !== 'string') return '';
        return input.trim().toLowerCase();
    }

    // Main authentication functions
    function modernLogin(identifier, password, remember = false) {
        try {
            // Validate input
            if (!identifier || !password) {
                console.error('Email/username and password are required');
                return false;
            }

            // Sanitize identifier
            const cleanIdentifier = sanitizeInput(identifier);
            
            // Find user by username or email
            let user = null;
            let username = null;

            // Check if identifier is email or username
            if (validateEmail(cleanIdentifier)) {
                // Search by email
                for (const [key, userData] of Object.entries(DEMO_USERS)) {
                    if (userData.email.toLowerCase() === cleanIdentifier) {
                        user = userData;
                        username = key;
                        break;
                    }
                }
            } else {
                // Search by username
                user = DEMO_USERS[cleanIdentifier];
                username = cleanIdentifier;
            }

            // Validate credentials
            if (!user || user.password !== password) {
                console.error('Invalid credentials');
                return false;
            }

            // Create session
            const sessionId = generateSessionId();
            const timeout = remember ? MODERN_AUTH_CONFIG.rememberTimeout : MODERN_AUTH_CONFIG.sessionTimeout;
            const expires = new Date().getTime() + timeout;

            const sessionData = {
                sessionId: sessionId,
                username: username,
                expires: expires,
                remember: remember,
                loginTime: new Date().toISOString(),
                lastActivity: new Date().toISOString(),
                userAgent: navigator.userAgent,
                ipAddress: 'localhost' // In production, get real IP
            };

            const userData = {
                username: username,
                name: user.name,
                role: user.role,
                email: user.email,
                avatar: user.avatar,
                loginTime: sessionData.loginTime,
                sessionId: sessionId
            };

            // Store session securely
            try {
                localStorage.setItem(MODERN_AUTH_CONFIG.sessionKey, JSON.stringify(sessionData));
                localStorage.setItem(MODERN_AUTH_CONFIG.userKey, JSON.stringify(userData));
            } catch (storageError) {
                console.error('Storage error:', storageError);
                return false;
            }

            // Log successful login
            console.log('Modern login successful:', {
                username: username,
                role: user.role,
                remember: remember,
                sessionId: sessionId
            });

            // Trigger login event
            document.dispatchEvent(new CustomEvent('modernLoginSuccess', {
                detail: { user: userData, session: sessionData }
            }));

            return true;

        } catch (error) {
            console.error('Modern login error:', error);
            return false;
        }
    }

    function modernLogout() {
        try {
            const userData = getCurrentModernUser();
            const sessionData = getModernSessionInfo();

            // Clear session data
            localStorage.removeItem(MODERN_AUTH_CONFIG.sessionKey);
            localStorage.removeItem(MODERN_AUTH_CONFIG.userKey);
            
            // Clear other app data
            localStorage.removeItem('cart');
            localStorage.removeItem('orderHistory');
            localStorage.removeItem('preferences');

            // Log logout
            console.log('Modern logout successful:', {
                username: userData?.username,
                sessionId: sessionData?.sessionId
            });

            // Trigger logout event
            document.dispatchEvent(new CustomEvent('modernLogoutSuccess', {
                detail: { user: userData, session: sessionData }
            }));

            return true;

        } catch (error) {
            console.error('Modern logout error:', error);
            return false;
        }
    }

    function isModernLoggedIn() {
        try {
            const sessionData = localStorage.getItem(MODERN_AUTH_CONFIG.sessionKey);
            if (!sessionData) return false;

            const session = JSON.parse(sessionData);
            if (!isSessionValid(session)) {
                // Session expired, clean up
                modernLogout();
                return false;
            }

            // Update last activity
            session.lastActivity = new Date().toISOString();
            localStorage.setItem(MODERN_AUTH_CONFIG.sessionKey, JSON.stringify(session));

            return true;

        } catch (error) {
            console.error('Session check error:', error);
            modernLogout(); // Clean up corrupted session
            return false;
        }
    }

    function getCurrentModernUser() {
        try {
            if (!isModernLoggedIn()) return null;

            const userData = localStorage.getItem(MODERN_AUTH_CONFIG.userKey);
            if (!userData) return null;

            return JSON.parse(userData);

        } catch (error) {
            console.error('Get user error:', error);
            return null;
        }
    }

    function getModernSessionInfo() {
        try {
            if (!isModernLoggedIn()) return null;

            const sessionData = localStorage.getItem(MODERN_AUTH_CONFIG.sessionKey);
            if (!sessionData) return null;

            const session = JSON.parse(sessionData);
            const timeLeft = session.expires - new Date().getTime();
            const duration = new Date().getTime() - new Date(session.loginTime).getTime();
            
            return {
                sessionId: session.sessionId,
                username: session.username,
                loginTime: session.loginTime,
                lastActivity: session.lastActivity,
                expires: new Date(session.expires).toISOString(),
                timeLeft: timeLeft,
                duration: duration,
                remember: session.remember,
                userAgent: session.userAgent,
                ipAddress: session.ipAddress
            };

        } catch (error) {
            console.error('Get session info error:', error);
            return null;
        }
    }

    function extendModernSession() {
        try {
            const sessionData = localStorage.getItem(MODERN_AUTH_CONFIG.sessionKey);
            if (!sessionData) return false;

            const session = JSON.parse(sessionData);
            if (!isSessionValid(session)) return false;

            // Extend session
            const timeout = session.remember ? MODERN_AUTH_CONFIG.rememberTimeout : MODERN_AUTH_CONFIG.sessionTimeout;
            session.expires = new Date().getTime() + timeout;
            session.lastActivity = new Date().toISOString();

            localStorage.setItem(MODERN_AUTH_CONFIG.sessionKey, JSON.stringify(session));
            
            console.log('Modern session extended');
            return true;

        } catch (error) {
            console.error('Extend session error:', error);
            return false;
        }
    }

    function changeModernPassword(currentPassword, newPassword) {
        try {
            const user = getCurrentModernUser();
            if (!user) return { success: false, message: 'User not logged in' };

            const userData = DEMO_USERS[user.username];
            if (!userData || userData.password !== currentPassword) {
                return { success: false, message: 'Current password is incorrect' };
            }

            // Validate new password
            if (newPassword.length < 6) {
                return { success: false, message: 'New password must be at least 6 characters' };
            }

            // In real app, this would update server-side
            userData.password = newPassword;
            
            console.log('Modern password changed successfully');
            return { success: true, message: 'Password changed successfully' };

        } catch (error) {
            console.error('Change password error:', error);
            return { success: false, message: 'An error occurred while changing password' };
        }
    }

    function updateModernProfile(profileData) {
        try {
            const user = getCurrentModernUser();
            if (!user) return { success: false, message: 'User not logged in' };

            // Update user data
            const updatedUser = { ...user, ...profileData };
            localStorage.setItem(MODERN_AUTH_CONFIG.userKey, JSON.stringify(updatedUser));

            // Update demo database (in real app, this would be server-side)
            const userData = DEMO_USERS[user.username];
            if (userData) {
                Object.assign(userData, profileData);
            }

            console.log('Modern profile updated successfully');
            return { success: true, message: 'Profile updated successfully' };

        } catch (error) {
            console.error('Update profile error:', error);
            return { success: false, message: 'An error occurred while updating profile' };
        }
    }

    // Auto session management
    function initModernAutoSessionManagement() {
        // Extend session on user activity
        const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
        let lastActivity = Date.now();

        events.forEach(event => {
            document.addEventListener(event, () => {
                const now = Date.now();
                if (now - lastActivity > 5 * 60 * 1000) { // 5 minutes
                    extendModernSession();
                    lastActivity = now;
                }
            }, true);
        });

        // Check session periodically
        setInterval(() => {
            if (!isModernLoggedIn() && !isPublicPage()) {
                console.log('Modern session expired, redirecting to login');
                window.location.href = 'modern-login.html';
            }
        }, 60000); // Check every minute

        // Warn before session expires
        setInterval(() => {
            const session = getModernSessionInfo();
            if (session && session.timeLeft < 5 * 60 * 1000 && session.timeLeft > 4 * 60 * 1000) {
                // Show warning 5 minutes before expiry
                document.dispatchEvent(new CustomEvent('modernSessionWarning', {
                    detail: { timeLeft: session.timeLeft }
                }));
            }
        }, 30000); // Check every 30 seconds
    }

    // Page protection
    function isPublicPage() {
        const publicPages = ['modern-login.html', 'register.html', 'forgot-password.html', 'index.html'];
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        return publicPages.includes(currentPage);
    }

    function protectModernPage() {
        if (!isPublicPage() && !isModernLoggedIn()) {
            console.log('Modern access denied, redirecting to login');
            window.location.href = 'modern-login.html';
            return false;
        }
        return true;
    }

    // Security features
    function detectSuspiciousActivity() {
        const session = getModernSessionInfo();
        if (!session) return false;

        // Check for session hijacking (simplified)
        if (session.userAgent !== navigator.userAgent) {
            console.warn('Suspicious activity detected: User agent mismatch');
            modernLogout();
            return true;
        }

        return false;
    }

    // Initialize system
    function initModernAuth() {
        initModernAutoSessionManagement();
        
        // Detect suspicious activity
        if (detectSuspiciousActivity()) {
            return;
        }
        
        // Add session info to console for debugging
        if (isModernLoggedIn()) {
            console.log('Modern session active:', getModernSessionInfo());
            console.log('Modern user:', getCurrentModernUser());
        }

        // Add global error handler
        window.addEventListener('error', function(e) {
            console.error('Modern auth system error:', e.error);
        });
    }

    // Export functions to global scope
    window.modernLogin = modernLogin;
    window.modernLogout = modernLogout;
    window.isModernLoggedIn = isModernLoggedIn;
    window.getCurrentModernUser = getCurrentModernUser;
    window.getModernSessionInfo = getModernSessionInfo;
    window.extendModernSession = extendModernSession;
    window.changeModernPassword = changeModernPassword;
    window.updateModernProfile = updateModernProfile;
    window.protectModernPage = protectModernPage;

    // Auto-initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initModernAuth);
    } else {
        initModernAuth();
    }

    // Export for module systems
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = {
            modernLogin,
            modernLogout,
            isModernLoggedIn,
            getCurrentModernUser,
            getModernSessionInfo,
            extendModernSession,
            changeModernPassword,
            updateModernProfile,
            protectModernPage
        };
    }

})();
# SISTEM LOGIN & LOGOUT - DOKUMENTASI LENGKAP

## Overview
Sistem autentikasi yang lengkap dan aman dengan desain modern, session management, dan fitur keamanan yang baik.

## File yang Dibuat

### 1. `login.html` - Halaman Login
**Fitur:**
- ✅ Desain modern dengan gradient background
- ✅ Form login dengan validasi
- ✅ Toggle password visibility
- ✅ Remember me functionality
- ✅ Demo credentials untuk testing
- ✅ Loading animation saat login
- ✅ Error dan success messages
- ✅ Responsive design

**Demo Credentials:**
- Username: `admin` | Password: `admin123`
- Username: `manager` | Password: `manager123`
- Username: `staff` | Password: `staff123`

### 2. `dashboard.html` - Dashboard Utama
**Fitur:**
- ✅ Navbar dengan user info dan logout
- ✅ Welcome card dengan statistik
- ✅ Quick actions menu
- ✅ Recent activity feed
- ✅ Logout confirmation modal
- ✅ Auto-redirect jika tidak login
- ✅ Animated statistics

### 3. `profile.html` - Halaman Profile
**Fitur:**
- ✅ Edit profile information
- ✅ Change password functionality
- ✅ Session information display
- ✅ Session extension
- ✅ User statistics
- ✅ Avatar placeholder

### 4. `auth-system.js` - Sistem Autentikasi
**Fitur:**
- ✅ Login/logout functionality
- ✅ Session management
- ✅ Auto session extension
- ✅ Password hashing (demo)
- ✅ Remember me feature
- ✅ Session timeout handling
- ✅ Page protection
- ✅ User data management

## Cara Menggunakan

### 1. Testing Login System
1. Buka `login.html` di browser
2. Klik "Isi Otomatis" untuk demo credentials
3. Atau masukkan manual:
   - Username: `admin`
   - Password: `admin123`
4. Klik "Masuk"

### 2. Navigasi Sistem
- **Dashboard** - Halaman utama setelah login
- **Profile** - Edit profil dan ubah password
- **Logout** - Keluar dari sistem

### 3. Fitur Keamanan
- Session timeout (24 jam default)
- Remember me (30 hari)
- Auto session extension pada aktivitas
- Page protection untuk halaman yang memerlukan login
- Password validation

## Struktur Data

### User Data
```javascript
{
    username: string,
    name: string,
    role: string,
    email: string,
    loginTime: string
}
```

### Session Data
```javascript
{
    sessionId: string,
    username: string,
    expires: number,
    remember: boolean,
    loginTime: string
}
```

## API Functions

### Login System
```javascript
// Login user
login(username, password, remember) // returns boolean

// Logout user
logout() // returns boolean

// Check if logged in
isLoggedIn() // returns boolean

// Get current user
getCurrentUser() // returns user object or null

// Get session info
getSessionInfo() // returns session object or null

// Extend session
extendSession() // returns boolean

// Change password
changePassword(currentPassword, newPassword) // returns boolean

// Protect page
protectPage() // returns boolean
```

### Usage Examples
```javascript
// Login
if (login('admin', 'admin123', true)) {
    window.location.href = 'dashboard.html';
}

// Check login status
if (isLoggedIn()) {
    console.log('User is logged in');
}

// Get user info
const user = getCurrentUser();
console.log('Current user:', user.name);

// Logout
logout();
window.location.href = 'login.html';
```

## Keamanan

### Fitur Keamanan
- ✅ Session-based authentication
- ✅ Session timeout management
- ✅ Auto logout pada session expired
- ✅ Password hashing (demo implementation)
- ✅ Input validation
- ✅ XSS protection pada display
- ✅ Auto session extension pada user activity

### Session Management
- Default timeout: 24 jam
- Remember me timeout: 30 hari
- Auto extension setiap 5 menit aktivitas
- Periodic session check setiap 1 menit

## Responsive Design

### Breakpoints
- Desktop: > 768px
- Mobile: < 768px

### Mobile Optimizations
- Stack layout untuk form
- Touch-friendly buttons
- Responsive navigation
- Optimized spacing

## Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers

## Customization

### Styling
Semua styling menggunakan CSS inline dan dapat disesuaikan:
- Gradient colors
- Border radius
- Animations
- Typography

### Configuration
Edit `AUTH_CONFIG` di `auth-system.js`:
```javascript
const AUTH_CONFIG = {
    sessionKey: 'cappunabara_session',
    userKey: 'cappunabara_user',
    sessionTimeout: 24 * 60 * 60 * 1000, // 24 hours
    rememberTimeout: 30 * 24 * 60 * 60 * 1000 // 30 days
};
```

### Adding Users
Edit `DEMO_USERS` di `auth-system.js`:
```javascript
const DEMO_USERS = {
    'newuser': {
        password: 'password123',
        name: 'New User',
        role: 'User',
        email: 'newuser@example.com'
    }
};
```

## Integration

### Dengan Sistem Existing
```html
<!-- Include auth system -->
<script src="auth-system.js"></script>

<!-- Check login status -->
<script>
if (!isLoggedIn()) {
    window.location.href = 'login.html';
}
</script>
```

### Dengan Backend
Untuk integrasi dengan backend:
1. Replace `DEMO_USERS` dengan API call
2. Implement server-side session validation
3. Add CSRF protection
4. Use secure password hashing (bcrypt)

## Troubleshooting

### Login Tidak Berhasil
- Check console untuk error
- Pastikan credentials benar
- Clear localStorage jika ada data corrupt

### Session Expired
- Check session timeout configuration
- Verify system clock
- Clear browser cache

### Redirect Loop
- Check page protection logic
- Verify login status detection
- Clear localStorage

## Production Considerations

### Security Enhancements
- Implement server-side authentication
- Use HTTPS only
- Add CSRF tokens
- Implement rate limiting
- Use secure password hashing
- Add 2FA support

### Performance
- Minimize localStorage usage
- Implement session cleanup
- Add loading states
- Optimize animations

## Kesimpulan

Sistem login/logout ini menyediakan:
- ✅ **UI/UX Modern** - Desain yang menarik dan user-friendly
- ✅ **Keamanan Baik** - Session management dan validasi
- ✅ **Responsive** - Bekerja di semua device
- ✅ **Mudah Digunakan** - API yang sederhana
- ✅ **Customizable** - Mudah disesuaikan
- ✅ **Production Ready** - Siap untuk pengembangan lebih lanjut

**File utama untuk testing: `login.html`**
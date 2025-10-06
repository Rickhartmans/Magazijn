// Vista Magazijn Uitleen - JavaScript Application
// Modern warehouse management system with i18n support

// Configuration
const CONFIG = {
    API_BASE_URL: 'https://magazijn.rickhartmans.nl/magazijn-api',
    STORAGE_KEYS: {
        TOKEN: 'vista_token',
        USER: 'vista_user',
        THEME: 'vista_theme',
        LANGUAGE: 'vista_language'
    }
};

// Internationalization (i18n) Dictionary
const i18n = {
    nl: {
        // Login
        'login.subtitle': 'Magazijn Beheersysteem',
        'login.username': 'Gebruikersnaam',
        'login.password': 'Wachtwoord',
        'login.submit': 'Inloggen',
        'login.noAccount': 'Geen account?',
        'login.register': 'Registreren',
        'login.haveAccount': 'Al een account?',
        'login.loginHere': 'Hier inloggen',
        
        // Register
        'register.username': 'Gebruikersnaam',
        'register.password': 'Wachtwoord',
        'register.confirmPassword': 'Bevestig Wachtwoord',
        'register.role': 'Rol',
        'register.roleUser': 'Gebruiker',
        'register.roleAdmin': 'Beheerder',
        'register.submit': 'Registreren',
        
        // Dashboard
        'dashboard.welcome': 'Welkom',
        'dashboard.title': 'Dashboard',
        'dashboard.logout': 'Uitloggen',
        'dashboard.totalItems': 'Totaal Items',
        'dashboard.pendingOrders': 'Openstaande Bestellingen',
        'dashboard.recentReturns': 'Recente Retourzendingen',
        'dashboard.lowStock': 'Lage Voorraad Items',
        'dashboard.recentActivity': 'Recente Activiteit',
        
        // Menu
        'menu.dashboard': 'Dashboard',
        'menu.inventory': 'Voorraad',
        'menu.orders': 'Bestellingen',
        'menu.returns': 'Retourzendingen',
        'menu.users': 'Gebruikers',
        'menu.qrscan': 'QR Scan',
        
        // Inventory
        'inventory.addItem': 'Item Toevoegen',
        'inventory.name': 'Naam',
        'inventory.quantity': 'Aantal',
        'inventory.location': 'Locatie',
        'inventory.inspectionDate': 'Keuringsdatum',
        'inventory.description': 'Beschrijving',
        
        // Orders
        'orders.addOrder': 'Bestelling Toevoegen',
        'orders.studentNumber': 'Leerlingnummer',
        'orders.name': 'Naam',
        'orders.article': 'Artikel',
        'orders.status': 'Status',
        'orders.date': 'Datum',
        'orders.comments': 'Opmerkingen',
        'orders.statusPending': 'In Afwachting',
        'orders.statusApproved': 'Goedgekeurd',
        'orders.statusRejected': 'Afgewezen',
        'orders.statusCompleted': 'Voltooid',
        
        // Returns
        'returns.addReturn': 'Retourzending Toevoegen',
        'returns.article': 'Artikel',
        'returns.studentNumber': 'Leerlingnummer',
        'returns.name': 'Naam',
        'returns.returnDate': 'Inleverdatum',
        'returns.condition': 'Conditie',
        'returns.comments': 'Opmerkingen',
        'returns.conditionGood': 'Goed',
        'returns.conditionDamaged': 'Beschadigd',
        'returns.conditionLost': 'Verloren',
        
        // QR Scan
        'qrscan.title': 'QR Code Scanner',
        'qrscan.placeholder': 'QR Scanner wordt hier geïmplementeerd',
        'qrscan.description': 'Deze functie maakt het mogelijk om QR-codes te scannen voor snelle item opzoekingen',
        
        // Common
        'common.actions': 'Acties',
        'common.edit': 'Bewerken',
        'common.delete': 'Verwijderen',
        'common.save': 'Opslaan',
        'common.cancel': 'Annuleren',
        'common.refresh': 'Vernieuwen',
        'common.loading': 'Laden...',
        'common.error': 'Fout',
        'common.success': 'Succes',
        'common.confirm': 'Bevestigen',
        
        // Messages
        'messages.loginSuccess': 'Succesvol ingelogd',
        'messages.loginError': 'Ongeldige inloggegevens',
        'messages.itemAdded': 'Item succesvol toegevoegd',
        'messages.itemUpdated': 'Item succesvol bijgewerkt',
        'messages.itemDeleted': 'Item succesvol verwijderd',
        'messages.orderAdded': 'Bestelling succesvol toegevoegd',
        'messages.orderUpdated': 'Bestelling succesvol bijgewerkt',
        'messages.orderDeleted': 'Bestelling succesvol verwijderd',
        'messages.returnAdded': 'Retourzending succesvol toegevoegd',
        'messages.returnUpdated': 'Retourzending succesvol bijgewerkt',
        'messages.returnDeleted': 'Retourzending succesvol verwijderd',
        'messages.confirmDelete': 'Weet je zeker dat je dit item wilt verwijderen?',
        'messages.registerSuccess': 'Registratie succesvol',
        'messages.registerError': 'Registratie mislukt',
        'messages.passwordMismatch': 'Wachtwoorden komen niet overeen',
        'messages.usernameExists': 'Gebruikersnaam bestaat al'
    },
    en: {
        // Login
        'login.subtitle': 'Warehouse Management System',
        'login.username': 'Username',
        'login.password': 'Password',
        'login.submit': 'Login',
        'login.noAccount': 'Don\'t have an account?',
        'login.register': 'Register',
        'login.haveAccount': 'Already have an account?',
        'login.loginHere': 'Login here',
        
        // Register
        'register.username': 'Username',
        'register.password': 'Password',
        'register.confirmPassword': 'Confirm Password',
        'register.role': 'Role',
        'register.roleUser': 'User',
        'register.roleAdmin': 'Admin',
        'register.submit': 'Register',
        
        // Dashboard
        'dashboard.welcome': 'Welcome',
        'dashboard.title': 'Dashboard',
        'dashboard.logout': 'Logout',
        'dashboard.totalItems': 'Total Items',
        'dashboard.pendingOrders': 'Pending Orders',
        'dashboard.recentReturns': 'Recent Returns',
        'dashboard.lowStock': 'Low Stock Items',
        'dashboard.recentActivity': 'Recent Activity',
        
        // Menu
        'menu.dashboard': 'Dashboard',
        'menu.inventory': 'Inventory',
        'menu.orders': 'Orders',
        'menu.returns': 'Returns',
        'menu.users': 'Users',
        'menu.qrscan': 'QR Scan',
        
        // Inventory
        'inventory.addItem': 'Add Item',
        'inventory.name': 'Name',
        'inventory.quantity': 'Quantity',
        'inventory.location': 'Location',
        'inventory.inspectionDate': 'Inspection Date',
        'inventory.description': 'Description',
        
        // Orders
        'orders.addOrder': 'Add Order',
        'orders.studentNumber': 'Student Number',
        'orders.name': 'Name',
        'orders.article': 'Article',
        'orders.status': 'Status',
        'orders.date': 'Date',
        'orders.comments': 'Comments',
        'orders.statusPending': 'Pending',
        'orders.statusApproved': 'Approved',
        'orders.statusRejected': 'Rejected',
        'orders.statusCompleted': 'Completed',
        
        // Returns
        'returns.addReturn': 'Add Return',
        'returns.article': 'Article',
        'returns.studentNumber': 'Student Number',
        'returns.name': 'Name',
        'returns.returnDate': 'Return Date',
        'returns.condition': 'Condition',
        'returns.comments': 'Comments',
        'returns.conditionGood': 'Good',
        'returns.conditionDamaged': 'Damaged',
        'returns.conditionLost': 'Lost',
        
        // QR Scan
        'qrscan.title': 'QR Code Scanner',
        'qrscan.placeholder': 'QR Scanner will be implemented here',
        'qrscan.description': 'This feature will allow scanning QR codes for quick item lookup',
        
        // Common
        'common.actions': 'Actions',
        'common.edit': 'Edit',
        'common.delete': 'Delete',
        'common.save': 'Save',
        'common.cancel': 'Cancel',
        'common.refresh': 'Refresh',
        'common.loading': 'Loading...',
        'common.error': 'Error',
        'common.success': 'Success',
        'common.confirm': 'Confirm',
        
        // Messages
        'messages.loginSuccess': 'Login successful',
        'messages.loginError': 'Invalid credentials',
        'messages.itemAdded': 'Item added successfully',
        'messages.itemUpdated': 'Item updated successfully',
        'messages.itemDeleted': 'Item deleted successfully',
        'messages.orderAdded': 'Order added successfully',
        'messages.orderUpdated': 'Order updated successfully',
        'messages.orderDeleted': 'Order deleted successfully',
        'messages.returnAdded': 'Return added successfully',
        'messages.returnUpdated': 'Return updated successfully',
        'messages.returnDeleted': 'Return deleted successfully',
        'messages.confirmDelete': 'Are you sure you want to delete this item?',
        'messages.registerSuccess': 'Registration successful',
        'messages.registerError': 'Registration failed',
        'messages.passwordMismatch': 'Passwords do not match',
        'messages.usernameExists': 'Username already exists'
    }
};

// Global State
let currentUser = null;
let currentLanguage = 'nl';
let currentTheme = 'light';
let currentPage = 'dashboard';

// Utility Functions
function getStoredValue(key, defaultValue = null) {
    try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : defaultValue;
    } catch {
        return defaultValue;
    }
}

function setStoredValue(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error('Failed to store value:', error);
    }
}

function t(key) {
    return i18n[currentLanguage]?.[key] || key;
}

function isAdmin() {
    return currentUser && currentUser.role === 'admin';
}

function updateTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = t(key);
        
        if (element.tagName === 'INPUT' && element.type === 'submit') {
            element.value = translation;
        } else if (element.tagName === 'OPTION') {
            element.textContent = translation;
        } else {
            element.textContent = translation;
        }
    });
}

function showLoading() {
    document.getElementById('loadingSpinner').style.display = 'flex';
}

function hideLoading() {
    document.getElementById('loadingSpinner').style.display = 'none';
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 5000);
}

// API Functions
async function apiCall(endpoint, options = {}) {
    const token = getStoredValue(CONFIG.STORAGE_KEYS.TOKEN);
    
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
        }
    };
    
    const finalOptions = { ...defaultOptions, ...options };
    
    try {
        showLoading();
        const response = await fetch(`${CONFIG.API_BASE_URL}/${endpoint}`, finalOptions);
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'API request failed');
        }
        
        return data;
    } catch (error) {
        console.error('API Error:', error);
        showToast(error.message, 'error');
        throw error;
    } finally {
        hideLoading();
    }
}

// Authentication Functions
async function login(username, password) {
    try {
        const response = await apiCall('login.php', {
            method: 'POST',
            body: JSON.stringify({ username, password })
        });
        
        if (response.success) {
            setStoredValue(CONFIG.STORAGE_KEYS.TOKEN, response.data.token);
            setStoredValue(CONFIG.STORAGE_KEYS.USER, response.data.user);
            currentUser = response.data.user;
            
            showDashboard();
            showToast(t('messages.loginSuccess'), 'success');
        }
    } catch (error) {
        showToast(t('messages.loginError'), 'error');
        document.getElementById('loginError').textContent = error.message;
        document.getElementById('loginError').classList.add('show');
    }
}

async function register(username, password, confirmPassword) {
    try {
        // Client-side validation
        if (password !== confirmPassword) {
            showToast(t('messages.passwordMismatch'), 'error');
            document.getElementById('registerError').textContent = t('messages.passwordMismatch');
            document.getElementById('registerError').classList.add('show');
            return;
        }

        // Default role to 'user' for registration
        const role = 'user';

        const response = await apiCall('register.php', {
            method: 'POST',
            body: JSON.stringify({ username, password, confirmPassword, role })
        });

        if (response.success) {
            setStoredValue(CONFIG.STORAGE_KEYS.TOKEN, response.data.token);
            setStoredValue(CONFIG.STORAGE_KEYS.USER, response.data.user);
            currentUser = response.data.user;

            showDashboard();
            showToast(t('messages.registerSuccess'), 'success');
        }
    } catch (error) {
        let errorMessage = error.message;
        if (error.message.includes('already exists')) {
            errorMessage = t('messages.usernameExists');
        } else {
            errorMessage = t('messages.registerError');
        }

        showToast(errorMessage, 'error');
        document.getElementById('registerError').textContent = error.message;
        document.getElementById('registerError').classList.add('show');
    }
}

function logout() {
    localStorage.removeItem(CONFIG.STORAGE_KEYS.TOKEN);
    localStorage.removeItem(CONFIG.STORAGE_KEYS.USER);
    currentUser = null;
    
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('loginScreen').style.display = 'flex';
}

function checkAuth() {
    const token = getStoredValue(CONFIG.STORAGE_KEYS.TOKEN);
    const user = getStoredValue(CONFIG.STORAGE_KEYS.USER);
    
    if (token && user) {
        currentUser = user;
        showDashboard();
        return true;
    }
    
    return false;
}

// Dashboard Functions
function showDashboard() {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('dashboard').style.display = 'flex';
    document.getElementById('currentUser').textContent = currentUser.username;

    // Add users menu item for admins
    if (isAdmin()) {
        let usersMenuItem = document.querySelector('.menu-item[data-page="users"]');
        if (!usersMenuItem) {
            const menuContainer = document.querySelector('.sidebar-menu');
            if (menuContainer) {
                usersMenuItem = document.createElement('li');
                usersMenuItem.className = 'menu-item';
                usersMenuItem.setAttribute('data-page', 'users');

                const link = document.createElement('a');
                link.href = '#';
                link.onclick = () => showPage('users');
                link.innerHTML = `
                    <i class="fas fa-users"></i>
                    <span data-i18n="menu.users">Users</span>
                `;

                usersMenuItem.appendChild(link);
                menuContainer.appendChild(usersMenuItem);
            }
        }
    }

    loadDashboardData();
}

async function loadDashboardData() {
    try {
        const [statsResponse, ordersData, returnsData] = await Promise.all([
            apiCall('dashboard.php'),
            apiCall('orders.php'),
            apiCall('returns.php')
        ]);

        const stats = statsResponse.data;

        // Update dashboard stats based on user role
        if (isAdmin()) {
            const totalItemsEl = document.getElementById('totalItems');
            if (totalItemsEl) totalItemsEl.textContent = stats.total_inventory || 0;

            const pendingOrdersEl = document.getElementById('pendingOrders');
            if (pendingOrdersEl) pendingOrdersEl.textContent = stats.pending_orders || 0;

            const recentReturnsEl = document.getElementById('recentReturns');
            if (recentReturnsEl) recentReturnsEl.textContent = stats.total_returns || 0;

            const lowStockEl = document.getElementById('lowStock');
            if (lowStockEl) lowStockEl.textContent = stats.low_stock || 0;

            const totalUsersEl = document.getElementById('totalUsers');
            if (totalUsersEl) totalUsersEl.textContent = stats.total_users || 0;
        } else {
            const totalItemsEl = document.getElementById('totalItems');
            if (totalItemsEl) totalItemsEl.textContent = stats.my_orders || 0;

            const pendingOrdersEl = document.getElementById('pendingOrders');
            if (pendingOrdersEl) pendingOrdersEl.textContent = stats.my_pending_orders || 0;

            const recentReturnsEl = document.getElementById('recentReturns');
            if (recentReturnsEl) recentReturnsEl.textContent = stats.my_returns || 0;

            const lowStockEl = document.getElementById('lowStock');
            if (lowStockEl) lowStockEl.textContent = '-';

            const totalUsersEl = document.getElementById('totalUsers');
            if (totalUsersEl) totalUsersEl.textContent = '-';
        }

        // Load recent activity
        loadRecentActivity(ordersData.data, returnsData.data);
    } catch (error) {
        console.error('Failed to load dashboard data:', error);
    }
}

function loadRecentActivity(orders, returns) {
    const activityList = document.getElementById('recentActivityList');
    activityList.innerHTML = '';
    
    const recentOrders = orders?.slice(0, 3) || [];
    const recentReturns = returns?.slice(0, 3) || [];
    
    [...recentOrders, ...recentReturns]
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 5)
        .forEach(item => {
            const activityItem = document.createElement('div');
            activityItem.className = 'activity-item';
            
            const isOrder = item.leerlingnr && item.artikel;
            const icon = isOrder ? 'fa-shopping-cart' : 'fa-undo';
            const iconColor = isOrder ? '#2563eb' : '#10b981';
            const text = isOrder 
                ? `${item.naam} ordered ${item.artikel}`
                : `${item.naam} returned ${item.artikel}`;
            
            activityItem.innerHTML = `
                <div class="activity-icon" style="background: ${iconColor}; color: white;">
                    <i class="fas ${icon}"></i>
                </div>
                <div class="activity-content">
                    <p>${text}</p>
                    <span class="activity-time">${new Date(item.created_at).toLocaleDateString()}</span>
                </div>
            `;
            
            activityList.appendChild(activityItem);
        });
}

// Create users page dynamically
function createUsersPage() {
    let usersPage = document.createElement('div');
    usersPage.id = 'usersPage';
    usersPage.className = 'page';
    usersPage.innerHTML = `
        <div class="page-header">
            <h2 data-i18n="menu.users">Users</h2>
        </div>
        <div class="page-content">
            <table id="usersTable" class="data-table">
                <thead>
                    <tr>
                        <th data-i18n="register.username">Username</th>
                        <th data-i18n="register.role">Role</th>
                        <th data-i18n="common.actions">Actions</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    `;
    document.querySelector('.main-content').appendChild(usersPage);
}

// Page Navigation
function showPage(pageName) {
    // Update active menu item
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });

    // Find the menu item that was clicked
    let menuItem = event.target.closest('.menu-item');
    if (menuItem) {
        menuItem.classList.add('active');
    }

    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // Create page if it doesn't exist
    if (pageName === 'users' && !document.getElementById('usersPage')) {
        createUsersPage();
    }

    // Show selected page
    if (pageName === 'users') {
        const usersPage = document.getElementById('usersPage');
        if (usersPage) {
            usersPage.classList.add('active');
        }
    } else {
        const pageElement = document.getElementById(`${pageName}Page`);
        if (pageElement) {
            pageElement.classList.add('active');
        }
    }

    // Update page title
    const pageTitleElement = document.getElementById('pageTitle');
    if (pageTitleElement) {
        pageTitleElement.textContent = t(`menu.${pageName}`);
    }

    currentPage = pageName;

    // Load page data
    switch (pageName) {
        case 'inventory':
            loadInventory();
            if (!isAdmin()) {
                const addBtn = document.querySelector('#inventoryPage .btn-primary');
                if (addBtn) addBtn.style.display = 'none';
            }
            break;
        case 'orders':
            loadOrders();
            initOrderSearch();
            break;
        case 'returns':
            loadReturns();
            initReturnSearch();
            break;
        case 'users':
            if (isAdmin()) {
                loadUsers();
            } else {
                showPage('dashboard');
            }
            break;
        case 'dashboard':
            loadDashboardData();
            break;
    }
}

function refreshCurrentPage() {
    showPage(currentPage);
}

// Inventory Management
async function loadInventory() {
    try {
        const response = await apiCall('inventory.php');
        const tbody = document.querySelector('#inventoryTable tbody');
        tbody.innerHTML = '';
        
        response.data?.forEach(item => {
            const row = document.createElement('tr');
            let actions = '';
            if (isAdmin()) {
                actions = `
                    <button onclick="editInventoryItem(${item.id})" class="btn btn-sm btn-outline">
                        <i class="fas fa-edit"></i> ${t('common.edit')}
                    </button>
                    <button onclick="deleteInventoryItem(${item.id})" class="btn btn-sm btn-danger">
                        <i class="fas fa-trash"></i> ${t('common.delete')}
                    </button>
                `;
            }
            row.innerHTML = `
                <td>${item.naam}</td>
                <td>${item.aantal}</td>
                <td>${item.locatie || '-'}</td>
                <td>${item.keuringsdatum || '-'}</td>
                <td>${item.beschrijving || '-'}</td>
                <td>${actions}</td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Failed to load inventory:', error);
    }
}

function showAddInventoryModal() {
    document.getElementById('inventoryModalTitle').textContent = t('inventory.addItem');
    document.getElementById('inventoryForm').reset();
    document.getElementById('inventoryId').value = '';
    document.getElementById('inventoryModal').style.display = 'block';
}

async function editInventoryItem(id) {
    try {
        const response = await apiCall('inventory.php');
        const item = response.data?.find(i => i.id == id);
        
        if (item) {
            document.getElementById('inventoryModalTitle').textContent = t('common.edit') + ' ' + t('inventory.name');
            document.getElementById('inventoryId').value = item.id;
            document.getElementById('inventoryName').value = item.naam;
            document.getElementById('inventoryQuantity').value = item.aantal;
            document.getElementById('inventoryLocation').value = item.locatie || '';
            document.getElementById('inventoryInspectionDate').value = item.keuringsdatum || '';
            document.getElementById('inventoryDescription').value = item.beschrijving || '';
            document.getElementById('inventoryModal').style.display = 'block';
        }
    } catch (error) {
        console.error('Failed to load item for editing:', error);
    }
}

async function deleteInventoryItem(id) {
    if (confirm(t('messages.confirmDelete'))) {
        try {
            await apiCall('inventory.php', {
                method: 'DELETE',
                body: JSON.stringify({ id })
            });
            
            showToast(t('messages.itemDeleted'), 'success');
            loadInventory();
        } catch (error) {
            console.error('Failed to delete item:', error);
        }
    }
}

// Orders Management
async function loadOrders(searchQuery = '', statusFilter = '') {
    try {
        let url = 'orders.php';
        const params = [];
        if (searchQuery) params.push(`search=${encodeURIComponent(searchQuery)}`);
        if (statusFilter) params.push(`status=${encodeURIComponent(statusFilter)}`);
        if (params.length) url += '?' + params.join('&');

        const response = await apiCall(url);
        const tbody = document.querySelector('#ordersTable tbody');
        tbody.innerHTML = '';

        response.data?.forEach(order => {
            const row = document.createElement('tr');
            const statusClass = `status-${order.status}`;

            let actions = `
                <button onclick="editOrder(${order.id})" class="btn btn-sm btn-outline">
                    <i class="fas fa-edit"></i> ${t('common.edit')}
                </button>
            `;
            if (isAdmin()) {
                actions += `
                    <button onclick="deleteOrder(${order.id})" class="btn btn-sm btn-danger">
                        <i class="fas fa-trash"></i> ${t('common.delete')}
                    </button>
                `;
            }

            row.innerHTML = `
                <td>${order.leerlingnr}</td>
                <td>${order.naam}</td>
                <td>${order.artikel}</td>
                <td><span class="status-badge ${statusClass}">${t('orders.status' + order.status.charAt(0).toUpperCase() + order.status.slice(1))}</span></td>
                <td>${order.datum}</td>
                <td>${order.opmerkingen || '-'}</td>
                <td>${actions}</td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Failed to load orders:', error);
    }
}

function showAddOrderModal() {
    document.getElementById('orderModalTitle').textContent = t('orders.addOrder');
    document.getElementById('orderForm').reset();
    document.getElementById('orderId').value = '';
    document.getElementById('orderDate').value = new Date().toISOString().split('T')[0];
    document.getElementById('orderModal').style.display = 'block';
}

async function editOrder(id) {
    try {
        const response = await apiCall('orders.php');
        const order = response.data?.find(o => o.id == id);
        
        if (order) {
            document.getElementById('orderModalTitle').textContent = t('common.edit') + ' ' + t('orders.addOrder');
            document.getElementById('orderId').value = order.id;
            document.getElementById('orderStudentNumber').value = order.leerlingnr;
            document.getElementById('orderName').value = order.naam;
            document.getElementById('orderArticle').value = order.artikel;
            document.getElementById('orderStatus').value = order.status;
            document.getElementById('orderDate').value = order.datum;
            document.getElementById('orderComments').value = order.opmerkingen || '';
            document.getElementById('orderModal').style.display = 'block';
        }
    } catch (error) {
        console.error('Failed to load order for editing:', error);
    }
}

async function deleteOrder(id) {
    if (confirm(t('messages.confirmDelete'))) {
        try {
            await apiCall('orders.php', {
                method: 'DELETE',
                body: JSON.stringify({ id })
            });
            
            showToast(t('messages.orderDeleted'), 'success');
            loadOrders();
        } catch (error) {
            console.error('Failed to delete order:', error);
        }
    }
}

// Returns Management
async function loadReturns(searchQuery = '', conditionFilter = '') {
    try {
        let url = 'returns.php';
        const params = [];
        if (searchQuery) params.push(`search=${encodeURIComponent(searchQuery)}`);
        if (conditionFilter) params.push(`conditie=${encodeURIComponent(conditionFilter)}`);
        if (params.length) url += '?' + params.join('&');

        const response = await apiCall(url);
        const tbody = document.querySelector('#returnsTable tbody');
        tbody.innerHTML = '';

        response.data?.forEach(returnItem => {
            const row = document.createElement('tr');

            let actions = `
                <button onclick="editReturn(${returnItem.id})" class="btn btn-sm btn-outline">
                    <i class="fas fa-edit"></i> ${t('common.edit')}
                </button>
            `;
            if (isAdmin()) {
                actions += `
                    <button onclick="deleteReturn(${returnItem.id})" class="btn btn-sm btn-danger">
                        <i class="fas fa-trash"></i> ${t('common.delete')}
                    </button>
                `;
            }

            row.innerHTML = `
                <td>${returnItem.artikel}</td>
                <td>${returnItem.leerlingnr}</td>
                <td>${returnItem.naam}</td>
                <td>${returnItem.inleverdatum}</td>
                <td>${t('returns.condition' + returnItem.conditie.charAt(0).toUpperCase() + returnItem.conditie.slice(1))}</td>
                <td>${returnItem.opmerkingen || '-'}</td>
                <td>${actions}</td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Failed to load returns:', error);
    }
}

// Users Management (Admin Only)
let allUsers = [];

async function loadUsers() {
    try {
        console.log('Loading users...');
        const response = await apiCall('users.php');
        console.log('Users API response:', response);
        allUsers = response.data || [];
        console.log('All users:', allUsers);
        displayUsers(allUsers);

        // Add search input if not present
        let searchContainer = document.querySelector('#usersSearchContainer');
        if (!searchContainer) {
            searchContainer = document.createElement('div');
            searchContainer.id = 'usersSearchContainer';
            searchContainer.className = 'search-container';
            searchContainer.innerHTML = `
                <input type="text" id="usersSearch" placeholder="${t('common.search')}..." class="form-control">
            `;
            const table = document.querySelector('#usersTable');
            if (table) {
                table.parentNode.insertBefore(searchContainer, table);
                document.getElementById('usersSearch').addEventListener('input', filterUsers);
            }
        }
    } catch (error) {
        console.error('Failed to load users:', error);
        showToast('Failed to load users: ' + error.message, 'error');
    }
}

// Filter users based on search input
function filterUsers() {
    const searchTerm = document.getElementById('usersSearch').value.toLowerCase();
    const filteredUsers = allUsers.filter(user => {
        return user.username.toLowerCase().includes(searchTerm) || user.role.toLowerCase().includes(searchTerm);
    });
    displayUsers(filteredUsers);
}

function displayUsers(users) {
    console.log('Displaying users:', users.length);
    const tbody = document.querySelector('#usersTable tbody');
    console.log('Users table tbody:', tbody);

    if (!tbody) {
        console.error('Users table tbody not found!');
        return;
    }

    tbody.innerHTML = '';

    users.forEach(user => {
        console.log('Creating row for user:', user.username);
        const row = document.createElement('tr');
        const roleClass = user.role === 'admin' ? 'status-approved' : 'status-pending';

        row.innerHTML = `
            <td>${user.username}</td>
            <td><span class="status-badge ${roleClass}">${user.role}</span></td>
            <td>
                <select onchange="changeUserRole(${user.id}, this.value)">
                    <option value="user" ${user.role === 'user' ? 'selected' : ''}>User</option>
                    <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>Admin</option>
                </select>
                <button onclick="deleteUser(${user.id})" class="btn btn-sm btn-danger" style="margin-left: 10px;">
                    <i class="fas fa-trash"></i> ${t('common.delete')}
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });

    console.log('Users table rows created:', tbody.children.length);

    // Check if usersPage is visible
    const usersPage = document.getElementById('usersPage');
    console.log('Users page element:', usersPage);
    console.log('Users page classList:', usersPage ? usersPage.classList : 'null');
    console.log('Users page display style:', usersPage ? getComputedStyle(usersPage).display : 'null');

    // Check table visibility
    const usersTable = document.getElementById('usersTable');
    console.log('Users table element:', usersTable);
    console.log('Users table display style:', usersTable ? getComputedStyle(usersTable).display : 'null');
}

function filterUsers() {
    const searchTerm = document.getElementById('usersSearch').value.toLowerCase();
    const filteredUsers = allUsers.filter(user => user.username.toLowerCase().includes(searchTerm));
    displayUsers(filteredUsers);
}

async function changeUserRole(userId, newRole) {
    try {
        await apiCall('users.php', {
            method: 'PUT',
            body: JSON.stringify({ id: userId, role: newRole })
        });

        showToast('User role updated successfully', 'success');
        loadUsers();
    } catch (error) {
        console.error('Failed to update user role:', error);
        showToast('Failed to update user role', 'error');
    }
}

async function deleteUser(userId) {
    if (confirm(t('messages.confirmDelete'))) {
        try {
            await apiCall('users.php', {
                method: 'DELETE',
                body: JSON.stringify({ id: userId })
            });

            showToast('User deleted successfully', 'success');
            loadUsers();
        } catch (error) {
            console.error('Failed to delete user:', error);
            showToast('Failed to delete user', 'error');
        }
    }
}

function showAddReturnModal() {
    document.getElementById('returnModalTitle').textContent = t('returns.addReturn');
    document.getElementById('returnForm').reset();
    document.getElementById('returnId').value = '';
    document.getElementById('returnDate').value = new Date().toISOString().split('T')[0];
    document.getElementById('returnModal').style.display = 'block';
}

async function editReturn(id) {
    try {
        const response = await apiCall('returns.php');
        const returnItem = response.data?.find(r => r.id == id);
        
        if (returnItem) {
            document.getElementById('returnModalTitle').textContent = t('common.edit') + ' ' + t('returns.addReturn');
            document.getElementById('returnId').value = returnItem.id;
            document.getElementById('returnArticle').value = returnItem.artikel;
            document.getElementById('returnStudentNumber').value = returnItem.leerlingnr;
            document.getElementById('returnName').value = returnItem.naam;
            document.getElementById('returnDate').value = returnItem.inleverdatum;
            document.getElementById('returnCondition').value = returnItem.conditie;
            document.getElementById('returnComments').value = returnItem.opmerkingen || '';
            document.getElementById('returnModal').style.display = 'block';
        }
    } catch (error) {
        console.error('Failed to load return for editing:', error);
    }
}

async function deleteReturn(id) {
    if (confirm(t('messages.confirmDelete'))) {
        try {
            await apiCall('returns.php', {
                method: 'DELETE',
                body: JSON.stringify({ id })
            });
            
            showToast(t('messages.returnDeleted'), 'success');
            loadReturns();
        } catch (error) {
            console.error('Failed to delete return:', error);
        }
    }
}

// Modal Functions
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Theme Functions
function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    setStoredValue(CONFIG.STORAGE_KEYS.THEME, currentTheme);
    
    // Update theme toggle icons
    const icons = document.querySelectorAll('#themeToggle i, #dashboardThemeToggle i');
    icons.forEach(icon => {
        icon.className = currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    });
}

function initTheme() {
    currentTheme = getStoredValue(CONFIG.STORAGE_KEYS.THEME, 'light');
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    const icons = document.querySelectorAll('#themeToggle i, #dashboardThemeToggle i');
    icons.forEach(icon => {
        icon.className = currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    });
}

// Language Functions
function setLanguage(lang) {
    currentLanguage = lang;
    setStoredValue(CONFIG.STORAGE_KEYS.LANGUAGE, lang);
    updateTranslations();
    
    // Update active language button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase() === lang) {
            btn.classList.add('active');
        }
    });
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
}

function initLanguage() {
    currentLanguage = getStoredValue(CONFIG.STORAGE_KEYS.LANGUAGE, 'nl');
    setLanguage(currentLanguage);
}

// Auth Form Toggle
function toggleAuthForm() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const authToggleText = document.getElementById('authToggleText');
    const showRegisterBtn = document.getElementById('showRegisterBtn');
    
    if (loginForm.style.display === 'none') {
        // Show login form
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        authToggleText.innerHTML = `
            <span data-i18n="login.noAccount">${t('login.noAccount')}</span>
            <button type="button" id="showRegisterBtn" class="link-btn" onclick="toggleAuthForm()" data-i18n="login.register">${t('login.register')}</button>
        `;
        
        // Clear errors
        document.getElementById('loginError').classList.remove('show');
        document.getElementById('registerError').classList.remove('show');
    } else {
        // Show register form
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        authToggleText.innerHTML = `
            <span data-i18n="login.haveAccount">${t('login.haveAccount')}</span>
            <button type="button" id="showRegisterBtn" class="link-btn" onclick="toggleAuthForm()" data-i18n="login.loginHere">${t('login.loginHere')}</button>
        `;
        
        // Clear errors
        document.getElementById('loginError').classList.remove('show');
        document.getElementById('registerError').classList.remove('show');
    }
}

// Form Handlers
async function handleInventoryForm(event) {
    event.preventDefault();
    
    const formData = {
        naam: document.getElementById('inventoryName').value,
        aantal: parseInt(document.getElementById('inventoryQuantity').value),
        locatie: document.getElementById('inventoryLocation').value,
        keuringsdatum: document.getElementById('inventoryInspectionDate').value,
        beschrijving: document.getElementById('inventoryDescription').value
    };
    
    const id = document.getElementById('inventoryId').value;
    
    try {
        if (id) {
            // Update existing item
            formData.id = parseInt(id);
            await apiCall('inventory.php', {
                method: 'PUT',
                body: JSON.stringify(formData)
            });
            showToast(t('messages.itemUpdated'), 'success');
        } else {
            // Add new item
            await apiCall('inventory.php', {
                method: 'POST',
                body: JSON.stringify(formData)
            });
            showToast(t('messages.itemAdded'), 'success');
        }
        
        closeModal('inventoryModal');
        loadInventory();
    } catch (error) {
        console.error('Failed to save inventory item:', error);
    }
}

async function handleOrderForm(event) {
    event.preventDefault();
    
    const formData = {
        leerlingnr: document.getElementById('orderStudentNumber').value,
        naam: document.getElementById('orderName').value,
        artikel: document.getElementById('orderArticle').value,
        status: document.getElementById('orderStatus').value,
        datum: document.getElementById('orderDate').value,
        opmerkingen: document.getElementById('orderComments').value
    };
    
    const id = document.getElementById('orderId').value;
    
    try {
        if (id) {
            // Update existing order
            formData.id = parseInt(id);
            await apiCall('orders.php', {
                method: 'PUT',
                body: JSON.stringify(formData)
            });
            showToast(t('messages.orderUpdated'), 'success');
        } else {
            // Add new order
            await apiCall('orders.php', {
                method: 'POST',
                body: JSON.stringify(formData)
            });
            showToast(t('messages.orderAdded'), 'success');
        }
        
        closeModal('orderModal');
        loadOrders();
    } catch (error) {
        console.error('Failed to save order:', error);
    }
}

async function handleReturnForm(event) {
    event.preventDefault();
    
    const formData = {
        artikel: document.getElementById('returnArticle').value,
        leerlingnr: document.getElementById('returnStudentNumber').value,
        naam: document.getElementById('returnName').value,
        inleverdatum: document.getElementById('returnDate').value,
        conditie: document.getElementById('returnCondition').value,
        opmerkingen: document.getElementById('returnComments').value
    };
    
    const id = document.getElementById('returnId').value;
    
    try {
        if (id) {
            // Update existing return
            formData.id = parseInt(id);
            await apiCall('returns.php', {
                method: 'PUT',
                body: JSON.stringify(formData)
            });
            showToast(t('messages.returnUpdated'), 'success');
        } else {
            // Add new return
            await apiCall('returns.php', {
                method: 'POST',
                body: JSON.stringify(formData)
            });
            showToast(t('messages.returnAdded'), 'success');
        }
        
        closeModal('returnModal');
        loadReturns();
    } catch (error) {
        console.error('Failed to save return:', error);
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme and language
    initTheme();
    initLanguage();
    
    // Check authentication
    if (!checkAuth()) {
        document.getElementById('loginScreen').style.display = 'flex';
    }
    
    // Login form handler
    document.getElementById('loginForm').addEventListener('submit', async function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        await login(username, password);
    });
    
    // Register form handler
    document.getElementById('registerForm').addEventListener('submit', async function(event) {
        event.preventDefault();
        const username = document.getElementById('regUsername').value;
        const password = document.getElementById('regPassword').value;
        const confirmPassword = document.getElementById('regConfirmPassword').value;
        await register(username, password, confirmPassword);
    });
    
    // Form handlers
    document.getElementById('inventoryForm').addEventListener('submit', handleInventoryForm);
    document.getElementById('orderForm').addEventListener('submit', handleOrderForm);
    document.getElementById('returnForm').addEventListener('submit', handleReturnForm);
    
    // Modal close handlers
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.style.display = 'none';
            });
        }
    });
});

// Search Functions
function initOrderSearch() {
    const searchInput = document.getElementById('orderSearch');
    const statusFilter = document.getElementById('orderStatusFilter');

    if (searchInput) {
        searchInput.addEventListener('input', debounce(() => {
            const searchQuery = searchInput.value.trim();
            const statusFilterValue = statusFilter ? statusFilter.value : '';
            loadOrders(searchQuery, statusFilterValue);
        }, 300));
    }

    if (statusFilter) {
        statusFilter.addEventListener('change', () => {
            const searchQuery = searchInput ? searchInput.value.trim() : '';
            const statusFilterValue = statusFilter.value;
            loadOrders(searchQuery, statusFilterValue);
        });
    }
}

function initReturnSearch() {
    const searchInput = document.getElementById('returnSearch');
    const conditionFilter = document.getElementById('returnConditionFilter');

    if (searchInput) {
        searchInput.addEventListener('input', debounce(() => {
            const searchQuery = searchInput.value.trim();
            const conditionFilterValue = conditionFilter ? conditionFilter.value : '';
            loadReturns(searchQuery, conditionFilterValue);
        }, 300));
    }

    if (conditionFilter) {
        conditionFilter.addEventListener('change', () => {
            const searchQuery = searchInput ? searchInput.value.trim() : '';
            const conditionFilterValue = conditionFilter.value;
            loadReturns(searchQuery, conditionFilterValue);
        });
    }
}

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function showAddReturnModal() {
    document.getElementById('returnModalTitle').textContent = t('returns.addReturn');
    document.getElementById('returnForm').reset();
    document.getElementById('returnId').value = '';
    document.getElementById('returnDate').value = new Date().toISOString().split('T')[0];
    document.getElementById('returnModal').style.display = 'block';
}

// Make functions globally available
window.showPage = showPage;
window.refreshCurrentPage = refreshCurrentPage;
window.showAddInventoryModal = showAddInventoryModal;
window.showAddOrderModal = showAddOrderModal;
window.showAddReturnModal = showAddReturnModal;
window.editInventoryItem = editInventoryItem;
window.editOrder = editOrder;
window.editReturn = editReturn;
window.deleteInventoryItem = deleteInventoryItem;
window.deleteOrder = deleteOrder;
window.deleteReturn = deleteReturn;
window.closeModal = closeModal;
window.toggleTheme = toggleTheme;
window.setLanguage = setLanguage;
window.toggleAuthForm = toggleAuthForm;
window.logout = logout;
window.loadUsers = loadUsers;
window.changeUserRole = changeUserRole;
window.deleteUser = deleteUser;
window.displayUsers = displayUsers;
window.filterUsers = filterUsers;

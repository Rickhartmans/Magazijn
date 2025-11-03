// Vista Warehouse Lending - JavaScript Application
// Modern warehouse management system (simplified, no i18n, mock backend)

// Configuration
const CONFIG = {
    API_BASE_URL: 'http://localhost/api', // Adjust this to your PHP API folder path
    // ... rest of config

    STORAGE_KEYS: {
        TOKEN: 'vista_token',
        USER: 'vista_user',
        THEME: 'vista_theme'
        // Removed LANGUAGE key
    }
};

// Mock Data (for demonstration without a backend)
let mockInventory = [
    { id: 1, naam: 'Hammer', aantal: 15, locatie: 'A1', keuringsdatum: '2025-01-10', beschrijving: 'Standard claw hammer' },
    { id: 2, naam: 'Drill', aantal: 8, locatie: 'B2', keuringsdatum: '2024-11-05', beschrijving: 'Cordless power drill' },
    { id: 3, naam: 'Safety Goggles', aantal: 50, locatie: 'C3', keuringsdatum: '2025-03-20', beschrijving: 'Protective eyewear' }
];
let mockOrders = [
    { id: 101, leerlingnr: 'S123', naam: 'John Doe', artikel: 'Hammer', status: 'pending', datum: '2025-10-25', opmerkingen: '' },
    { id: 102, leerlingnr: 'S124', naam: 'Jane Smith', artikel: 'Drill', status: 'approved', datum: '2025-10-26', opmerkingen: 'Approved by admin' }
];
let mockReturns = [
    { id: 201, artikel: 'Safety Goggles', leerlingnr: 'S123', naam: 'John Doe', inleverdatum: '2025-10-27', conditie: 'good', opmerkingen: '' }
];
let mockUsers = [
    { id: 1, username: 'admin', role: 'admin' },
    { id: 2, username: 'rick', role: 'user' },
    { id: 3, username: 'student1', role: 'user' }
];

// Global State
let currentUser = null;
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

function isAdmin() {
    return currentUser && currentUser.role === 'admin';
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

// Mock API Call Function (replaces actual API interaction)
async function apiCall(endpoint, options = {}) {
    showLoading();
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    hideLoading();

    console.log(`MOCK API Call: ${endpoint}`, options);

    // Simulate different endpoints
    switch (endpoint) {
        case 'login.php':
            const { username, password } = JSON.parse(options.body);
            const user = mockUsers.find(u => u.username === username && password === 'password'); // Simplified password check
            if (user) {
                return { success: true, data: { token: 'mock-token', user: { username: user.username, role: user.role } } };
            }
            throw new Error('Invalid credentials');
        case 'register.php':
            const { username: regUsername, password: regPassword } = JSON.parse(options.body);
            if (mockUsers.some(u => u.username === regUsername)) {
                throw new Error('Username already exists');
            }
            const newUser = { id: mockUsers.length + 1, username: regUsername, role: 'user' };
            mockUsers.push(newUser);
            return { success: true, data: { token: 'mock-token', user: { username: newUser.username, role: newUser.role } } };
        case 'dashboard.php':
            return { success: true, data: {
                total_inventory: mockInventory.length,
                pending_orders: mockOrders.filter(o => o.status === 'pending').length,
                total_returns: mockReturns.length,
                low_stock: mockInventory.filter(i => i.aantal < 10).length, // Example low stock logic
                total_users: mockUsers.length,
                my_orders: mockOrders.filter(o => o.naam === currentUser?.username).length,
                my_pending_orders: mockOrders.filter(o => o.naam === currentUser?.username && o.status === 'pending').length,
                my_returns: mockReturns.filter(o => o.naam === currentUser?.username).length,
            }};
        case 'inventory.php':
            if (options.method === 'POST') {
                const newItem = { id: mockInventory.length ? Math.max(...mockInventory.map(i => i.id)) + 1 : 1, ...JSON.parse(options.body) };
                mockInventory.push(newItem);
                return { success: true, message: 'Item added successfully' };
            } else if (options.method === 'PUT') {
                const updatedItem = JSON.parse(options.body);
                mockInventory = mockInventory.map(item => item.id === updatedItem.id ? { ...item, ...updatedItem } : item);
                return { success: true, message: 'Item updated successfully' };
            } else if (options.method === 'DELETE') {
                const { id } = JSON.parse(options.body);
                mockInventory = mockInventory.filter(item => item.id !== id);
                return { success: true, message: 'Item deleted successfully' };
            }
            return { success: true, data: mockInventory };
        case 'orders.php':
            // Basic search/filter for mock data
            let filteredOrders = [...mockOrders];
            const urlParams = new URLSearchParams(endpoint.split('?')[1]); // This won't work well with mock endpoint string
            const searchQuery = options.url?.split('search=')[1]?.split('&')[0] || '';
            const statusFilter = options.url?.split('status=')[1]?.split('&')[0] || '';

            if (searchQuery) {
                const term = decodeURIComponent(searchQuery).toLowerCase();
                filteredOrders = filteredOrders.filter(order =>
                    order.naam.toLowerCase().includes(term) ||
                    order.artikel.toLowerCase().includes(term) ||
                    order.leerlingnr.toLowerCase().includes(term)
                );
            }
            if (statusFilter) {
                filteredOrders = filteredOrders.filter(order => order.status === decodeURIComponent(statusFilter));
            }

            if (options.method === 'POST') {
                const newOrder = { id: mockOrders.length ? Math.max(...mockOrders.map(o => o.id)) + 1 : 1, ...JSON.parse(options.body) };
                mockOrders.push(newOrder);
                return { success: true, message: 'Order added successfully' };
            } else if (options.method === 'PUT') {
                const updatedOrder = JSON.parse(options.body);
                mockOrders = mockOrders.map(order => order.id === updatedOrder.id ? { ...order, ...updatedOrder } : order);
                return { success: true, message: 'Order updated successfully' };
            } else if (options.method === 'DELETE') {
                const { id } = JSON.parse(options.body);
                mockOrders = mockOrders.filter(order => order.id !== id);
                return { success: true, message: 'Order deleted successfully' };
            }
            return { success: true, data: filteredOrders };
        case 'returns.php':
            // Basic search/filter for mock data
            let filteredReturns = [...mockReturns];
            const returnSearchQuery = options.url?.split('search=')[1]?.split('&')[0] || '';
            const conditionFilter = options.url?.split('conditie=')[1]?.split('&')[0] || '';

            if (returnSearchQuery) {
                const term = decodeURIComponent(returnSearchQuery).toLowerCase();
                filteredReturns = filteredReturns.filter(item =>
                    item.naam.toLowerCase().includes(term) ||
                    item.artikel.toLowerCase().includes(term) ||
                    item.leerlingnr.toLowerCase().includes(term)
                );
            }
            if (conditionFilter) {
                filteredReturns = filteredReturns.filter(item => item.conditie === decodeURIComponent(conditionFilter));
            }

            if (options.method === 'POST') {
                const newReturn = { id: mockReturns.length ? Math.max(...mockReturns.map(r => r.id)) + 1 : 1, ...JSON.parse(options.body) };
                mockReturns.push(newReturn);
                return { success: true, message: 'Return added successfully' };
            } else if (options.method === 'PUT') {
                const updatedReturn = JSON.parse(options.body);
                mockReturns = mockReturns.map(item => item.id === updatedReturn.id ? { ...item, ...updatedReturn } : item);
                return { success: true, message: 'Return updated successfully' };
            } else if (options.method === 'DELETE') {
                const { id } = JSON.parse(options.body);
                mockReturns = mockReturns.filter(item => item.id !== id);
                return { success: true, message: 'Return deleted successfully' };
            }
            return { success: true, data: filteredReturns };
        case 'users.php':
            if (options.method === 'PUT') {
                const { id, role } = JSON.parse(options.body);
                mockUsers = mockUsers.map(user => user.id === id ? { ...user, role } : user);
                return { success: true, message: 'User role updated successfully' };
            } else if (options.method === 'DELETE') {
                const { id } = JSON.parse(options.body);
                mockUsers = mockUsers.filter(user => user.id !== id);
                return { success: true, message: 'User deleted successfully' };
            }
            return { success: true, data: mockUsers.map(u => ({ id: u.id, username: u.username, role: u.role })) }; // Return a safe subset
        default:
            throw new Error(`Unknown API endpoint: ${endpoint}`);
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
            showToast('Login successful', 'success');
        }
    } catch (error) {
        showToast('Invalid credentials', 'error');
        document.getElementById('loginError').textContent = error.message;
        document.getElementById('loginError').classList.add('show');
    }
}

async function register(username, password, confirmPassword) {
    try {
        // Client-side validation
        if (password !== confirmPassword) {
            showToast('Passwords do not match', 'error');
            document.getElementById('registerError').textContent = 'Passwords do not match';
            document.getElementById('registerError').classList.add('show');
            return;
        }

        const response = await apiCall('register.php', {
            method: 'POST',
            body: JSON.stringify({ username, password, confirmPassword, role: 'user' }) // Default role
        });

        if (response.success) {
            setStoredValue(CONFIG.STORAGE_KEYS.TOKEN, response.data.token);
            setStoredValue(CONFIG.STORAGE_KEYS.USER, response.data.user);
            currentUser = response.data.user;

            showDashboard();
            showToast('Registration successful', 'success');
        }
    } catch (error) {
        let errorMessage = error.message;
        if (error.message.includes('already exists')) {
            errorMessage = 'Username already exists';
        } else {
            errorMessage = 'Registration failed';
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
    document.getElementById('loginForm').style.display = 'block'; // Ensure login form is visible
    document.getElementById('registerForm').style.display = 'none'; // Hide register form
    // Reset auth toggle text
    document.getElementById('authToggleText').innerHTML = `
        <span>Don't have an account?</span>
        <button type="button" id="showRegisterBtn" class="link-btn" onclick="toggleAuthForm()">Register</button>
    `;
    document.getElementById('loginError').classList.remove('show');
    document.getElementById('registerError').classList.remove('show');
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
        let usersMenuItem = document.querySelector('.sidebar-menu a.menu-item[data-page="users"]');
        if (!usersMenuItem) {
            const menuContainer = document.querySelector('.sidebar-menu ul'); // Target the ul element
            if (menuContainer) {
                const li = document.createElement('li');
                const link = document.createElement('a');
                link.className = 'menu-item';
                link.setAttribute('data-page', 'users');
                link.href = '#';
                link.onclick = () => showPage('users');
                link.innerHTML = `
                    <i class="fas fa-users"></i>
                    <span>Users</span>
                `;

                li.appendChild(link);
                menuContainer.appendChild(li);
            }
        }
    } else {
         // Remove users menu item if not admin (e.g., if role changed while logged in)
        const usersMenuItemLi = document.querySelector('.sidebar-menu a.menu-item[data-page="users"]')?.parentNode;
        if (usersMenuItemLi) {
            usersMenuItemLi.remove();
        }
    }

    loadDashboardData();
}

async function loadDashboardData() {
    try {
        const [statsResponse, ordersResponse, returnsResponse] = await Promise.all([
            apiCall('dashboard.php'),
            apiCall('orders.php'),
            apiCall('returns.php')
        ]);

        const stats = statsResponse.data;
        const ordersData = ordersResponse.data;
        const returnsData = returnsResponse.data;

        // Update dashboard stats based on user role
        if (isAdmin()) {
            document.getElementById('totalItems').textContent = stats.total_inventory || 0;
            document.getElementById('pendingOrders').textContent = stats.pending_orders || 0;
            document.getElementById('recentReturns').textContent = stats.total_returns || 0;
            document.getElementById('lowStock').textContent = stats.low_stock || 0;
            document.getElementById('totalUsers').textContent = stats.total_users || 0;
        } else {
            // For regular users, show their specific stats
            document.getElementById('totalItems').textContent = stats.my_orders || 0; // Displaying 'My Orders' in Total Items card
            document.getElementById('pendingOrders').textContent = stats.my_pending_orders || 0;
            document.getElementById('recentReturns').textContent = stats.my_returns || 0;
            document.getElementById('lowStock').textContent = '-'; // Not applicable for regular users
            document.getElementById('totalUsers').textContent = '-'; // Not applicable for regular users
        }

        // Load recent activity
        loadRecentActivity(ordersData, returnsData);
    } catch (error) {
        console.error('Failed to load dashboard data:', error);
        showToast('Failed to load dashboard data', 'error');
    }
}

function loadRecentActivity(orders, returns) {
    const activityList = document.getElementById('recentActivityList');
    activityList.innerHTML = '';
    
    const recentOrders = orders?.slice(0, 3) || [];
    const recentReturns = returns?.slice(0, 3) || [];
    
    // Combine and sort by a 'created_at' type field (mocking it for now)
    const combinedActivity = [...recentOrders.map(item => ({...item, created_at: item.datum, type: 'order'})),
                              ...recentReturns.map(item => ({...item, created_at: item.inleverdatum, type: 'return'}))]
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 5); // Show up to 5 recent activities

    combinedActivity.forEach(item => {
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        
        const isOrder = item.type === 'order';
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

// Create users page dynamically (simplified, no i18n attributes)
function createUsersPage() {
    let usersPage = document.createElement('div');
    usersPage.id = 'usersPage';
    usersPage.className = 'page';
    usersPage.innerHTML = `
        <div class="page-header">
            <h2>Users</h2>
        </div>
        <div class="page-content">
            <div id="usersSearchContainer" class="search-container">
                <input type="text" id="usersSearch" placeholder="Search users..." class="form-control">
            </div>
            <table id="usersTable" class="data-table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    `;
    document.querySelector('.main-content').appendChild(usersPage);

    // Attach event listener for search after element is created
    document.getElementById('usersSearch').addEventListener('input', debounce(filterUsers, 300));
}

// Page Navigation
function showPage(pageName) {
    // Update active menu item
    document.querySelectorAll('.menu-item').forEach(item => item.classList.remove('active'));
    let menuItem = document.querySelector(`.menu-item[data-page="${pageName}"]`);
    if (menuItem) menuItem.classList.add('active');

    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // Create page if it doesn't exist (e.g., 'users' page)
    if (pageName === 'users' && !document.getElementById('usersPage')) {
        createUsersPage();
    }

    // Show selected page
    const pageElement = document.getElementById(`${pageName}Page`);
    if (pageElement) {
        pageElement.classList.add('active');
    } else {
        console.warn(`Page element for "${pageName}" not found.`);
    }

    // Update page title
    const pageTitleElement = document.getElementById('pageTitle');
    if (pageTitleElement) {
        // Hardcode titles as i18n is removed
        const titles = {
            'dashboard': 'Dashboard',
            'inventory': 'Inventory',
            'orders': 'Orders',
            'returns': 'Returns',
            'users': 'Users',
            'qrscan': 'QR Code Scanner'
        };
        pageTitleElement.textContent = titles[pageName] || 'Dashboard';
    }

    currentPage = pageName;

    // Load page data
    switch (pageName) {
        case 'inventory':
            loadInventory();
            if (!isAdmin()) {
                const addBtn = document.querySelector('#inventoryPage .btn-primary');
                if (addBtn) addBtn.style.display = 'none';
            } else {
                 const addBtn = document.querySelector('#inventoryPage .btn-primary');
                if (addBtn) addBtn.style.display = 'inline-flex';
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
                showPage('dashboard'); // Redirect if not admin
                showToast('Access Denied: You must be an administrator to view users.', 'error');
            }
            break;
        case 'dashboard':
            loadDashboardData();
            break;
        case 'qrscan':
            // No specific data loading for QR scan in this simplified version
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
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button onclick="deleteInventoryItem(${item.id})" class="btn btn-sm btn-danger">
                        <i class="fas fa-trash"></i> Delete
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
        showToast('Failed to load inventory', 'error');
    }
}

function showAddInventoryModal() {
    document.getElementById('inventoryModalTitle').textContent = 'Add Item';
    document.getElementById('inventoryForm').reset();
    document.getElementById('inventoryId').value = '';
    document.getElementById('inventoryModal').style.display = 'block';
}

async function editInventoryItem(id) {
    try {
        const response = await apiCall('inventory.php');
        const item = response.data?.find(i => i.id === id);
        
        if (item) {
            document.getElementById('inventoryModalTitle').textContent = 'Edit Item';
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
        showToast('Failed to load item for editing', 'error');
    }
}

async function deleteInventoryItem(id) {
    if (confirm('Are you sure you want to delete this item?')) {
        try {
            await apiCall('inventory.php', {
                method: 'DELETE',
                body: JSON.stringify({ id })
            });
            
            showToast('Item deleted successfully', 'success');
            loadInventory();
        } catch (error) {
            console.error('Failed to delete item:', error);
            showToast('Failed to delete item', 'error');
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

        const response = await apiCall(url, { url: url }); // Pass url for mock api filtering
        const tbody = document.querySelector('#ordersTable tbody');
        tbody.innerHTML = '';

        response.data?.forEach(order => {
            const row = document.createElement('tr');
            const statusClass = `status-${order.status}`;
            const statusText = order.status.charAt(0).toUpperCase() + order.status.slice(1); // Capitalize first letter

            let actions = `
                <button onclick="editOrder(${order.id})" class="btn btn-sm btn-outline">
                    <i class="fas fa-edit"></i> Edit
                </button>
            `;
            if (isAdmin()) {
                actions += `
                    <button onclick="deleteOrder(${order.id})" class="btn btn-sm btn-danger">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                `;
            }

            row.innerHTML = `
                <td>${order.leerlingnr}</td>
                <td>${order.naam}</td>
                <td>${order.artikel}</td>
                <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                <td>${order.datum}</td>
                <td>${order.opmerkingen || '-'}</td>
                <td>${actions}</td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Failed to load orders:', error);
        showToast('Failed to load orders', 'error');
    }
}

function showAddOrderModal() {
    document.getElementById('orderModalTitle').textContent = 'Add Order';
    document.getElementById('orderForm').reset();
    document.getElementById('orderId').value = '';
    document.getElementById('orderDate').value = new Date().toISOString().split('T')[0];
    document.getElementById('orderModal').style.display = 'block';
}

async function editOrder(id) {
    try {
        const response = await apiCall('orders.php');
        const order = response.data?.find(o => o.id === id);
        
        if (order) {
            document.getElementById('orderModalTitle').textContent = 'Edit Order';
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
        showToast('Failed to load order for editing', 'error');
    }
}

async function deleteOrder(id) {
    if (confirm('Are you sure you want to delete this order?')) {
        try {
            await apiCall('orders.php', {
                method: 'DELETE',
                body: JSON.stringify({ id })
            });
            
            showToast('Order deleted successfully', 'success');
            loadOrders();
        } catch (error) {
            console.error('Failed to delete order:', error);
            showToast('Failed to delete order', 'error');
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

        const response = await apiCall(url, { url: url }); // Pass url for mock api filtering
        const tbody = document.querySelector('#returnsTable tbody');
        tbody.innerHTML = '';

        response.data?.forEach(returnItem => {
            const row = document.createElement('tr');
            const conditionText = returnItem.conditie.charAt(0).toUpperCase() + returnItem.conditie.slice(1); // Capitalize first letter

            let actions = `
                <button onclick="editReturn(${returnItem.id})" class="btn btn-sm btn-outline">
                    <i class="fas fa-edit"></i> Edit
                </button>
            `;
            if (isAdmin()) {
                actions += `
                    <button onclick="deleteReturn(${returnItem.id})" class="btn btn-sm btn-danger">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                `;
            }

            row.innerHTML = `
                <td>${returnItem.artikel}</td>
                <td>${returnItem.leerlingnr}</td>
                <td>${returnItem.naam}</td>
                <td>${returnItem.inleverdatum}</td>
                <td>${conditionText}</td>
                <td>${returnItem.opmerkingen || '-'}</td>
                <td>${actions}</td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Failed to load returns:', error);
        showToast('Failed to load returns', 'error');
    }
}

function showAddReturnModal() {
    document.getElementById('returnModalTitle').textContent = 'Add Return';
    document.getElementById('returnForm').reset();
    document.getElementById('returnId').value = '';
    document.getElementById('returnDate').value = new Date().toISOString().split('T')[0];
    document.getElementById('returnModal').style.display = 'block';
}

async function editReturn(id) {
    try {
        const response = await apiCall('returns.php');
        const returnItem = response.data?.find(r => r.id === id);
        
        if (returnItem) {
            document.getElementById('returnModalTitle').textContent = 'Edit Return';
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
        showToast('Failed to load return for editing', 'error');
    }
}

async function deleteReturn(id) {
    if (confirm('Are you sure you want to delete this return?')) {
        try {
            await apiCall('returns.php', {
                method: 'DELETE',
                body: JSON.stringify({ id })
            });
            
            showToast('Return deleted successfully', 'success');
            loadReturns();
        } catch (error) {
            console.error('Failed to delete return:', error);
            showToast('Failed to delete return', 'error');
        }
    }
}


// Users Management (Admin Only)
let allUsers = [];

async function loadUsers() {
    try {
        if (!isAdmin()) {
            showToast('Access Denied: You must be an administrator to view users.', 'error');
            showPage('dashboard'); // Redirect if not admin
            return;
        }

        const response = await apiCall('users.php');
        allUsers = response.data || [];
        displayUsers(allUsers);
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
    const tbody = document.querySelector('#usersTable tbody');
    if (!tbody) {
        console.error('Users table tbody not found!');
        return;
    }
    tbody.innerHTML = '';

    users.forEach(user => {
        const row = document.createElement('tr');
        const roleClass = user.role === 'admin' ? 'status-approved' : 'status-pending';

        row.innerHTML = `
            <td>${user.username}</td>
            <td><span class="status-badge ${roleClass}">${user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span></td>
            <td>
                <select onchange="changeUserRole(${user.id}, this.value)">
                    <option value="user" ${user.role === 'user' ? 'selected' : ''}>User</option>
                    <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>Admin</option>
                </select>
                <button onclick="deleteUser(${user.id})" class="btn btn-sm btn-danger" style="margin-left: 10px;">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
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
    if (confirm('Are you sure you want to delete this user?')) {
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
    const icons = document.querySelectorAll('#dashboardThemeToggle i');
    icons.forEach(icon => {
        icon.className = currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    });
}

function initTheme() {
    currentTheme = getStoredValue(CONFIG.STORAGE_KEYS.THEME, 'light');
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    const icons = document.querySelectorAll('#dashboardThemeToggle i');
    icons.forEach(icon => {
        icon.className = currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    });
}

// Auth Form Toggle
function toggleAuthForm() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const authToggleText = document.getElementById('authToggleText');
    
    if (loginForm.style.display === 'none') {
        // Show login form
        loginForm.style.display = 'flex'; // Use flex for consistency with CSS
        registerForm.style.display = 'none';
        authToggleText.innerHTML = `
            <span>Don't have an account?</span>
            <button type="button" id="showRegisterBtn" class="link-btn" onclick="toggleAuthForm()">Register</button>
        `;
        
        // Clear errors
        document.getElementById('loginError').classList.remove('show');
        document.getElementById('registerError').classList.remove('show');
    } else {
        // Show register form
        loginForm.style.display = 'none';
        registerForm.style.display = 'flex'; // Use flex for consistency with CSS
        authToggleText.innerHTML = `
            <span>Already have an account?</span>
            <button type="button" class="link-btn" onclick="toggleAuthForm()">Login here</button>
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
            showToast('Item updated successfully', 'success');
        } else {
            // Add new item
            await apiCall('inventory.php', {
                method: 'POST',
                body: JSON.stringify(formData)
            });
            showToast('Item added successfully', 'success');
        }
        
        closeModal('inventoryModal');
        loadInventory();
        loadDashboardData(); // Refresh dashboard stats after inventory change
    } catch (error) {
        console.error('Failed to save inventory item:', error);
        showToast('Failed to save inventory item', 'error');
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
            showToast('Order updated successfully', 'success');
        } else {
            // Add new order
            await apiCall('orders.php', {
                method: 'POST',
                body: JSON.stringify(formData)
            });
            showToast('Order added successfully', 'success');
        }
        
        closeModal('orderModal');
        loadOrders();
        loadDashboardData(); // Refresh dashboard stats after order change
    } catch (error) {
        console.error('Failed to save order:', error);
        showToast('Failed to save order', 'error');
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
            showToast('Return updated successfully', 'success');
        } else {
            // Add new return
            await apiCall('returns.php', {
                method: 'POST',
                body: JSON.stringify(formData)
            });
            showToast('Return added successfully', 'success');
        }
        
        closeModal('returnModal');
        loadReturns();
        loadDashboardData(); // Refresh dashboard stats after return change
    } catch (error) {
        console.error('Failed to save return:', error);
        showToast('Failed to save return', 'error');
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    initTheme();
    
    // Check authentication
    if (!checkAuth()) {
        document.getElementById('loginScreen').style.display = 'flex';
    } else {
        // If already authenticated, show dashboard by default
        showPage('dashboard');
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
    
    // Form handlers for modals
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

    // Initialize search for orders and returns if their pages are active
    if (currentPage === 'orders') initOrderSearch();
    if (currentPage === 'returns') initReturnSearch();
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
window.toggleAuthForm = toggleAuthForm;
window.logout = logout;
window.loadUsers = loadUsers;
window.changeUserRole = changeUserRole;
window.deleteUser = deleteUser;
window.displayUsers = displayUsers;
window.filterUsers = filterUsers;

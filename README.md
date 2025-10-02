# Vista Magazijn Uitleen - Warehouse Management System

A complete fullstack warehouse management web application built with PHP, MySQL, HTML, CSS, and JavaScript.

## 🚀 Features

### Backend (PHP + MySQL)
- **JWT Authentication System** - Secure login with token-based authentication
- **RESTful API Endpoints** - Complete CRUD operations for all entities
- **Database Management** - MySQL with proper relationships and constraints
- **CORS Support** - Cross-origin resource sharing for frontend integration

### Frontend (HTML/CSS/JS)
- **Modern Dashboard UI** - Clean, professional design with sidebar navigation
- **Dark Mode Toggle** - Switch between light and dark themes
- **Responsive Design** - Works on desktop, tablet, and mobile devices
- **Multilingual Support** - Dutch (NL) and English (EN) language switching
- **Real-time Data** - Dynamic loading and updating of all data

### Core Modules
1. **Inventory Management** - Track items, quantities, locations, and inspection dates
2. **Orders Management** - Handle student orders with status tracking
3. **Returns Management** - Process returned items with condition tracking
4. **Dashboard Analytics** - Overview statistics and recent activity
5. **QR Scanner** - Placeholder for future QR code scanning functionality

## 📁 Project Structure

```
vista-magazijn/
├── magazijn-api/           # Backend PHP API
│   ├── db.php             # Database connection and utilities
│   ├── login.php          # Authentication endpoint
│   ├── inventory.php      # Inventory CRUD operations
│   ├── orders.php         # Orders CRUD operations
│   └── returns.php        # Returns CRUD operations
├── index.html             # Main frontend application
├── style.css              # Modern CSS with dark mode
├── magazijn.js            # JavaScript application logic
├── database_schema.sql    # MySQL database schema
└── README.md              # This documentation
```

## 🛠️ Installation & Setup

### Prerequisites
- **Web Server** (Apache/Nginx) with PHP 7.4+
- **MySQL 5.7+** or **MariaDB 10.3+**
- **phpMyAdmin** (recommended for database management)

### Step 1: Database Setup
1. Open phpMyAdmin or MySQL command line
2. Import the database schema:
   ```sql
   source database_schema.sql
   ```
   Or copy and paste the contents of `database_schema.sql` into phpMyAdmin

### Step 2: Backend Configuration
1. Place the `magazijn-api/` folder in your web server directory
2. Update database credentials in `magazijn-api/db.php`:
   ```php
   private $host = 'localhost';
   private $db_name = 'vista_magazijn';
   private $username = 'your_username';
   private $password = 'your_password';
   ```

### Step 3: Frontend Setup
1. Place `index.html`, `style.css`, and `magazijn.js` in your web server directory
2. Update the API base URL in `magazijn.js`:
   ```javascript
   const CONFIG = {
       API_BASE_URL: 'http://your-domain.com/magazijn-api',
       // ... other config
   };
   ```

### Step 4: Test the Application
1. Navigate to your web server URL
2. Login with default credentials:
   - **Username:** `admin`
   - **Password:** `admin123`

## 🔐 Default Users

The system comes with two pre-configured users:

| Username | Password | Role  |
|----------|----------|-------|
| admin    | admin123 | admin |
| user1    | admin123 | user  |

**⚠️ Important:** Change these default passwords in production!

## 📊 Database Schema

### Users Table
- `id` - Primary key
- `username` - Unique username
- `password_hash` - Hashed password
- `role` - User role (admin/user)
- `created_at`, `updated_at` - Timestamps

### Inventory Table
- `id` - Primary key
- `naam` - Item name
- `aantal` - Quantity
- `locatie` - Storage location
- `keuringsdatum` - Inspection date
- `beschrijving` - Description
- `created_at`, `updated_at` - Timestamps

### Orders Table
- `id` - Primary key
- `leerlingnr` - Student number
- `naam` - Student name
- `artikel` - Requested article
- `status` - Order status (pending/approved/rejected/completed)
- `datum` - Order date
- `opmerkingen` - Comments
- `created_at`, `updated_at` - Timestamps

### Returns Table
- `id` - Primary key
- `artikel` - Returned article
- `leerlingnr` - Student number
- `naam` - Student name
- `inleverdatum` - Return date
- `conditie` - Item condition (goed/beschadigd/verloren)
- `opmerkingen` - Comments
- `created_at`, `updated_at` - Timestamps

## 🌐 API Endpoints

### Authentication
- `POST /login.php` - User login

### Inventory Management
- `GET /inventory.php` - Get all inventory items
- `POST /inventory.php` - Add new inventory item
- `PUT /inventory.php` - Update inventory item
- `DELETE /inventory.php` - Delete inventory item

### Orders Management
- `GET /orders.php` - Get all orders
- `POST /orders.php` - Create new order
- `PUT /orders.php` - Update order
- `DELETE /orders.php` - Delete order

### Returns Management
- `GET /returns.php` - Get all returns
- `POST /returns.php` - Create new return
- `PUT /returns.php` - Update return
- `DELETE /returns.php` - Delete return

## 🎨 Features Overview

### Dashboard
- **Statistics Cards** - Total items, pending orders, recent returns, low stock alerts
- **Recent Activity** - Timeline of recent orders and returns
- **Quick Navigation** - Easy access to all modules

### Inventory Management
- **Add/Edit Items** - Complete item information management
- **Stock Tracking** - Quantity and location tracking
- **Inspection Dates** - Equipment inspection scheduling
- **Search & Filter** - Easy item lookup

### Orders Management
- **Student Orders** - Track orders by student number and name
- **Status Workflow** - Pending → Approved → Completed workflow
- **Comments System** - Add notes to orders
- **Date Tracking** - Order date management

### Returns Management
- **Return Processing** - Handle returned items
- **Condition Tracking** - Good, Damaged, or Lost status
- **Student Tracking** - Link returns to students
- **Comments** - Notes about return condition

### User Experience
- **Responsive Design** - Works on all device sizes
- **Dark Mode** - Eye-friendly dark theme option
- **Multilingual** - Dutch and English language support
- **Toast Notifications** - User feedback for all actions
- **Loading States** - Visual feedback during API calls

## 🔧 Customization

### Adding New Languages
1. Add translations to the `i18n` object in `magazijn.js`
2. Update the language switcher buttons
3. Add the new language option to the UI

### Styling Customization
- Modify CSS variables in `:root` for color scheme changes
- Update the dark theme variables in `[data-theme="dark"]`
- Customize component styles in `style.css`

### API Extensions
- Add new endpoints by creating new PHP files in `magazijn-api/`
- Follow the existing pattern for authentication and response formatting
- Update the frontend JavaScript to consume new endpoints

## 🚀 Production Deployment

### Security Checklist
- [ ] Change default user passwords
- [ ] Update JWT secret key in `db.php`
- [ ] Enable HTTPS
- [ ] Configure proper CORS origins
- [ ] Set up database backups
- [ ] Configure error logging
- [ ] Implement rate limiting

### Performance Optimization
- [ ] Enable PHP OPcache
- [ ] Configure MySQL query caching
- [ ] Implement frontend caching headers
- [ ] Optimize images and assets
- [ ] Use a CDN for static assets

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code comments

---

**Vista Magazijn Uitleen** - Professional warehouse management made simple.

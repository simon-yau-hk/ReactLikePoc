# 🚀 Express Task Management API with Sequelize

A modern Express.js API with Sequelize ORM for task management, featuring a layered architecture with controllers, services, and repositories.

## 🏗️ Architecture

```
Express/
├── config/
│   └── database.js          # Sequelize database configuration
├── models/
│   ├── index.js             # Model associations
│   ├── Member.js            # Member model
│   ├── Task.js             # Task model
│   └── TaskItem.js         # TaskItem model
├── repositories/
│   ├── memberRepository.js  # Member data access layer
│   ├── taskRepository.js    # Task data access layer
│   └── taskItemRepository.js # TaskItem data access layer
├── services/
│   └── memberService.js     # Member business logic
├── controllers/
│   └── memberController.js   # Member HTTP handlers
├── routes/
│   └── memberRoutes.js      # Member API routes
├── scripts/
│   ├── initDatabase.js      # Database initialization
│   └── syncDatabase.js      # Database synchronization
├── server.js                # Main server file
├── package.json             # Dependencies and scripts
└── config.env              # Environment configuration
```

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Database
Copy `config.env` to `.env` and update your database credentials:
```bash
cp config.env .env
```

Edit `.env`:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=task_management
DB_PORT=3306
```

### 3. Initialize Database
```bash
# Create database tables
npm run init-db

# Or force recreate tables (WARNING: deletes all data)
npm run sync-db
```

### 4. Start Server
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## 📊 Database Models

### Member Model
```javascript
{
  id: INTEGER (Primary Key)
  username: STRING(150) (Unique)
  email: STRING(254) (Unique)
  first_name: STRING(30)
  last_name: STRING(30)
  password_hash: STRING(128)
  is_active: BOOLEAN (Default: true)
  created_at: DATETIME
  updated_at: DATETIME
}
```

### Task Model
```javascript
{
  id: INTEGER (Primary Key)
  title: STRING(200)
  description: TEXT
  priority: ENUM('urgent', 'high', 'medium', 'low')
  status: ENUM('pending', 'in_progress', 'completed', 'cancelled')
  due_date: DATETIME
  member_id: INTEGER (Foreign Key)
  created_at: DATETIME
  updated_at: DATETIME
}
```

### TaskItem Model
```javascript
{
  id: INTEGER (Primary Key
  title: STRING(200)
  description: TEXT
  is_completed: BOOLEAN (Default: false)
  order: INTEGER (Default: 0)
  completed_at: DATETIME
  task_id: INTEGER (Foreign Key)
  created_at: DATETIME
  updated_at: DATETIME
}
```

## 🔗 API Endpoints

### Members API
- `GET /api/members` - Get all members
- `GET /api/members/:id` - Get member by ID
- `GET /api/members/username/:username` - Get member by username
- `GET /api/members/email/:email` - Get member by email
- `GET /api/members/active` - Get active members
- `GET /api/members/search/:query` - Search members
- `GET /api/members/stats` - Get member statistics
- `POST /api/members` - Create new member
- `PUT /api/members/:id` - Update member
- `DELETE /api/members/:id` - Delete member
- `POST /api/members/:id/activate` - Activate member
- `POST /api/members/:id/deactivate` - Deactivate member

## 🎯 Key Features

### ✅ Sequelize ORM Benefits
- **Object-Oriented**: Work with JavaScript objects instead of raw SQL
- **Automatic Validation**: Built-in data validation and constraints
- **Relationships**: Easy model associations and joins
- **Migrations**: Database schema versioning
- **Query Builder**: Powerful query interface

### ✅ Layered Architecture
- **Controllers**: Handle HTTP requests/responses
- **Services**: Business logic and validation
- **Repositories**: Data access abstraction
- **Models**: Database schema definition

### ✅ Advanced Features
- **Data Validation**: Automatic field validation
- **Relationships**: Member → Tasks → TaskItems
- **Search**: Full-text search capabilities
- **Statistics**: Built-in aggregation queries
- **Error Handling**: Comprehensive error management

## 🔧 Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start production server
npm start

# Initialize database
npm run init-db

# Sync database (recreate tables)
npm run sync-db
```

## 🚀 Example Usage

### Create a Member
```bash
curl -X POST http://localhost:3000/api/members \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "password_hash": "hashed_password"
  }'
```

### Get All Members
```bash
curl http://localhost:3000/api/members
```

### Search Members
```bash
curl http://localhost:3000/api/members/search/john
```

## 🎯 Sequelize vs Raw SQL

### Raw SQL (Previous Approach)
```javascript
const [rows] = await connection.execute(
  'SELECT * FROM members WHERE id = ?',
  [id]
);
```

### Sequelize ORM (Current Approach)
```javascript
const member = await Member.findByPk(id);
```

## 🔍 Benefits of Sequelize

1. **Type Safety**: Better IDE support and error catching
2. **Validation**: Automatic data validation
3. **Relationships**: Easy joins and associations
4. **Migrations**: Database schema management
5. **Query Interface**: Intuitive query building
6. **Error Handling**: Better error messages and handling

## 🚀 Next Steps

1. **Add Task & TaskItem APIs**: Complete the full CRUD operations
2. **Authentication**: Add JWT authentication
3. **Validation**: Enhanced input validation
4. **Testing**: Add unit and integration tests
5. **Documentation**: API documentation with Swagger

## 🎯 Environment Variables

Create a `.env` file with:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=task_management
DB_PORT=3306
PORT=3000
NODE_ENV=development
```

## 🚀 Ready to Use!

Your Express API with Sequelize ORM is now ready! 🎉

**Key Benefits:**
- ✅ **Object-Oriented Database Access**
- ✅ **Automatic Data Validation**
- ✅ **Easy Relationships**
- ✅ **Type Safety**
- ✅ **Better Error Handling**

**Start the server and test the API endpoints!** 🚀

// services/userService.js
class TestService {
    constructor() {
      // In-memory data storage
      this.users = [
        { id: 1, name: 'John Doe', email: 'john@example.com', age: 25, role: 'user' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 30, role: 'admin' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 35, role: 'user' }
      ];
    }
  
    // Get all users
    getAllUsers() {
      return this.users;
    }
  
    // Get user by ID
    getUserById(id) {
      const user = this.users.find(u => u.id === parseInt(id));
      if (!user) {
        throw new Error(`User with ID ${id} not found`);
      }
      return user;
    }
  
    // Create new user
    createUser(userData) {
      const { name, email, age, role = 'user' } = userData;
      
      // Validation
      if (!name || !email) {
        throw new Error('Name and email are required');
      }
      
      // Check if email already exists
      const existingUser = this.users.find(u => u.email === email);
      if (existingUser) {
        throw new Error('Email already exists');
      }
      
      // Create new user
      const newUser = {
        id: this.users.length + 1,
        name,
        email,
        age: age || null,
        role,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      this.users.push(newUser);
      return newUser;
    }
  
    // Update user
    updateUser(id, userData) {
      const userIndex = this.users.findIndex(u => u.id === parseInt(id));
      
      if (userIndex === -1) {
        throw new Error(`User with ID ${id} not found`);
      }
      
      const { name, email, age, role } = userData;
      
      // Check if email already exists (excluding current user)
      if (email && email !== this.users[userIndex].email) {
        const existingUser = this.users.find(u => u.email === email && u.id !== parseInt(id));
        if (existingUser) {
          throw new Error('Email already exists');
        }
      }
      
      // Update user
      this.users[userIndex] = {
        ...this.users[userIndex],
        name: name || this.users[userIndex].name,
        email: email || this.users[userIndex].email,
        age: age !== undefined ? age : this.users[userIndex].age,
        role: role || this.users[userIndex].role,
        updatedAt: new Date()
      };
      
      return this.users[userIndex];
    }
  
    // Delete user
    deleteUser(id) {
      const userIndex = this.users.findIndex(u => u.id === parseInt(id));
      
      if (userIndex === -1) {
        throw new Error(`User with ID ${id} not found`);
      }
      
      const deletedUser = this.users.splice(userIndex, 1)[0];
      return deletedUser;
    }
  
    // Get users by role
    getUsersByRole(role) {
      return this.users.filter(u => u.role === role);
    }
  
    // Search users
    searchUsers(query) {
      const lowercaseQuery = query.toLowerCase();
      return this.users.filter(u => 
        u.name.toLowerCase().includes(lowercaseQuery) ||
        u.email.toLowerCase().includes(lowercaseQuery)
      );
    }
  
    // Get user statistics
    getUserStats() {
      const totalUsers = this.users.length;
      const adminUsers = this.users.filter(u => u.role === 'admin').length;
      const userCount = this.users.filter(u => u.role === 'user').length;
      const averageAge = this.users.reduce((sum, u) => sum + (u.age || 0), 0) / totalUsers;
      
      return {
        totalUsers,
        adminUsers,
        userCount,
        averageAge: Math.round(averageAge * 100) / 100
      };
    }
  }
  
  module.exports = new UserService();
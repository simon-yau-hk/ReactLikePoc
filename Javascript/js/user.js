// User.js - ES6+ class module
export class User {
    constructor(name, email, age) {
        this.name = name;
        this.email = email;
        this.age = age;
        this.createdAt = new Date();
    }

    greet() {
        return `Hello, I'm ${this.name}!`;
    }

    getInfo() {
        return {
            name: this.name,
            email: this.email,
            age: this.age,
            createdAt: this.createdAt
        };
    }

    isAdult() {
        return this.age >= 18;
    }

    // Static method
    static createAdmin(name, email) {
        const admin = new User(name, email, 0);
        admin.isAdmin = true;
        return admin;
    }
}
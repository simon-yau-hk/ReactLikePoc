// app.js - ES6+ main application
import { add, subtract, multiply, divide } from './math.js';
import { capitalize, reverse, countWords, isPalindrome } from './stringUtils.js';
import { User } from './User.js';
import { Calculator } from './Calculator.js';

// Modern ES6+ features
const displayResults = () => {
    const output = document.getElementById('output');
    
    // Math operations
    const mathResults = `
        <h2>Math Operations:</h2>
        <p>5 + 3 = ${add(5, 3)}</p>
        <p>10 - 4 = ${subtract(10, 4)}</p>
        <p>6 * 7 = ${multiply(6, 7)}</p>
        <p>15 / 3 = ${divide(15, 3)}</p>
    `;

    // String operations
    const text = 'hello world';
    const stringResults = `
        <h2>String Operations:</h2>
        <p>Original: ${text}</p>
        <p>Capitalized: ${capitalize(text)}</p>
        <p>Reversed: ${reverse(text)}</p>
        <p>Word count: ${countWords(text)}</p>
        <p>Is "racecar" palindrome? ${isPalindrome('racecar')}</p>
    `;

    // User operations
    const user1 = new User('John Doe', 'john@example.com', 25);
    const user2 = new User('Jane Smith', 'jane@example.com', 17);
    const admin = User.createAdmin('Admin', 'admin@example.com');

    const userResults = `
        <h2>User Operations:</h2>
        <p>${user1.greet()}</p>
        <p>${user2.greet()}</p>
        <p>User1 info: ${JSON.stringify(user1.getInfo(), null, 2)}</p>
        <p>Is user1 adult? ${user1.isAdult()}</p>
        <p>Is user2 adult? ${user2.isAdult()}</p>
        <p>Admin: ${admin.greet()}</p>
    `;

    // Calculator operations
    const calc = new Calculator();
    calc.calculate('add', 10, 5);
    calc.calculate('subtract', 20, 8);
    calc.calculate('multiply', 6, 7);
    calc.calculate('divide', 15, 3);

    const calcResults = `
        <h2>Calculator Operations:</h2>
        <p>History: ${JSON.stringify(calc.getHistory(), null, 2)}</p>
        <p>Last calculation: ${JSON.stringify(calc.getLastCalculation(), null, 2)}</p>
    `;

    output.innerHTML = mathResults + stringResults + userResults + calcResults;
};

// Modern event handling
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded - ES6+ JavaScript running!');
    displayResults();
});

// Modern async/await example
const fetchData = async () => {
    try {
        // Simulate API call
        const response = await new Promise(resolve => {
            setTimeout(() => resolve({ data: 'Async data loaded!' }), 1000);
        });
        console.log('Async data:', response.data);
    } catch (error) {
        console.error('Async error:', error);
    }
};

// Call async function
fetchData();
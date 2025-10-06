// Calculator.js - ES6+ class module
import { add, subtract, multiply, divide } from './math.js';

export class Calculator {
    constructor() {
        this.history = [];
    }

    calculate(operation, a, b) {
        let result;
        
        try {
            switch (operation) {
                case 'add':
                    result = add(a, b);
                    break;
                case 'subtract':
                    result = subtract(a, b);
                    break;
                case 'multiply':
                    result = multiply(a, b);
                    break;
                case 'divide':
                    result = divide(a, b);
                    break;
                default:
                    throw new Error('Invalid operation');
            }
            
            // Add to history
            this.history.push({
                operation,
                a,
                b,
                result,
                timestamp: new Date()
            });
            
            return result;
        } catch (error) {
            console.error('Calculation error:', error.message);
            return null;
        }
    }

    getHistory() {
        return [...this.history];
    }

    clearHistory() {
        this.history = [];
    }

    getLastCalculation() {
        return this.history[this.history.length - 1] || null;
    }
}
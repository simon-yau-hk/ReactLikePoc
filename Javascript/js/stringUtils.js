// stringUtils.js - ES6+ module
export const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const reverse = (str) => {
    return str.split('').reverse().join('');
};

export const countWords = (str) => {
    return str.trim().split(/\s+/).length;
};

export const isPalindrome = (str) => {
    const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleaned === cleaned.split('').reverse().join('');
};

// Default export
export default {
    capitalize,
    reverse,
    countWords,
    isPalindrome
};
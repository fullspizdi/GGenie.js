/**
 * utils.js
 * Utility functions for GGenie.js
 * These utilities provide helper functions to support the main functionality of GGenie.js.
 */

/**
 * Formats and logs error messages in a consistent format.
 * @param {string} message - The error message to log.
 */
function logError(message) {
    console.error(`GGenie Error: ${message}`);
}

/**
 * Checks if the provided object has all required keys.
 * @param {Object} obj - The object to check.
 * @param {string[]} requiredKeys - An array of strings representing the keys that must be present.
 * @returns {boolean} - Returns true if all required keys are present, false otherwise.
 */
function hasRequiredKeys(obj, requiredKeys) {
    return requiredKeys.every(key => obj.hasOwnProperty(key));
}

/**
 * Sleep function to delay operations, useful for handling rate limits or retries.
 * @param {number} ms - Milliseconds to sleep.
 * @returns {Promise} - A promise that resolves after the specified milliseconds.
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
    logError,
    hasRequiredKeys,
    sleep
};

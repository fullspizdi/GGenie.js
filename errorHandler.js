// errorHandler.js
// Handles error responses for GGenie.js

/**
 * Handles errors by sending a formatted response to the client.
 * @param {Error} error - The error object that was caught.
 * @param {Response} res - The Express response object.
 */
function handle(error, res) {
  console.error('Error:', error);

  // Check if the error is a known Google API error
  if (error.response && error.response.data) {
    // Google API error structure
    const { message, status } = error.response.data.error;
    res.status(status).json({
      success: false,
      message: `Google API Error: ${message}`
    });
  } else {
    // Generic error handling
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message || 'An unknown error occurred'
    });
  }
}

module.exports = {
  handle
};

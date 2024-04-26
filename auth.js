// auth.js
// Handles authentication processes for GGenie.js

const { google } = require('googleapis');
const config = require('./config');

// Create a Google OAuth2 client instance
const oauth2Client = new google.auth.OAuth2(
  config.CLIENT_ID,
  config.CLIENT_SECRET,
  config.REDIRECT_URI
);

/**
 * Generates a URL where users can log in via Google and return to the app.
 * This URL will request access to the user's Google account for the scopes specified.
 */
function getAuthUrl() {
  const scopes = [
    'https://www.googleapis.com/auth/gmail.send',
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/calendar'
  ];

  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    prompt: 'consent'
  });
}

/**
 * Exchanges a code returned from Google after user consent
 * for access tokens.
 * @param {string} code - The code returned from the Google OAuth flow.
 */
async function getTokens(code) {
  const { tokens } = await oauth2Client.getToken(code);
  return tokens;
}

module.exports = {
  getAuthUrl,
  getTokens
};

// Import necessary modules
const express = require('express');
const dotenv = require('dotenv');
const { google } = require('googleapis');

// Import custom modules
const config = require('./config');
const auth = require('./auth');
const googleServices = require('./googleServices');
const errorHandler = require('./errorHandler');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Initialize Google OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  config.CLIENT_ID,
  config.CLIENT_SECRET,
  config.REDIRECT_URI
);

// Set auth as a global default
google.options({ auth: oauth2Client });

// Routes
app.get('/auth/google', (req, res) => {
  const url = auth.getAuthUrl();
  res.redirect(url);
});

app.get('/auth/google/callback', async (req, res) => {
  try {
    const { code } = req.query;
    const { tokens } = await auth.getTokens(code);
    oauth2Client.setCredentials(tokens);
    res.send('Authentication successful! You can now make API calls.');
  } catch (error) {
    errorHandler.handle(error, res);
  }
});

app.post('/send-email', async (req, res) => {
  try {
    const { to, subject, text } = req.body;
    const result = await googleServices.sendEmail({ to, subject, text });
    res.json({ message: 'Email sent successfully', result });
  } catch (error) {
    errorHandler.handle(error, res);
  }
});

app.get('/sheets-data', async (req, res) => {
  try {
    const data = await googleServices.fetchSheetsData();
    res.json({ message: 'Data fetched successfully', data });
  } catch (error) {
    errorHandler.handle(error, res);
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


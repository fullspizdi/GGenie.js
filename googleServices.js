// googleServices.js
// Handles interactions with various Google APIs for GGenie.js

const { google } = require('googleapis');

/**
 * Sends an email using the Gmail API.
 * @param {Object} emailDetails - The details of the email to send.
 * @param {string} emailDetails.to - The recipient of the email.
 * @param {string} emailDetails.subject - The subject of the email.
 * @param {string} emailDetails.text - The plain text body of the email.
 */
async function sendEmail({ to, subject, text }) {
  const gmail = google.gmail({ version: 'v1' });
  const email = [
    `Content-Type: text/plain; charset="UTF-8"\n`,
    `MIME-Version: 1.0\n`,
    `Content-Transfer-Encoding: 7bit\n`,
    `to: ${to}\n`,
    `subject: ${subject}\n\n`,
    `${text}`
  ].join('');

  const encodedMessage = Buffer.from(email).toString('base64').replace(/\+/g, '-').replace(/\//g, '_');

  const response = await gmail.users.messages.send({
    userId: 'me',
    requestBody: {
      raw: encodedMessage
    }
  });

  return response.data;
}

/**
 * Fetches data from a Google Sheet.
 * @param {string} spreadsheetId - The ID of the spreadsheet to fetch data from.
 * @param {string} range - The A1 notation of the range to fetch.
 */
async function fetchSheetsData(spreadsheetId, range) {
  const sheets = google.sheets({ version: 'v4' });
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  return response.data.values;
}

/**
 * Creates an event in Google Calendar.
 * @param {Object} eventDetails - The details of the event to create.
 * @param {string} eventDetails.summary - The summary of the event.
 * @param {string} eventDetails.location - The location of the event.
 * @param {string} eventDetails.description - The description of the event.
 * @param {string} eventDetails.startDateTime - The start date/time of the event.
 * @param {string} eventDetails.endDateTime - The end date/time of the event.
 */
async function createCalendarEvent({ summary, location, description, startDateTime, endDateTime }) {
  const calendar = google.calendar({ version: 'v3' });
  const event = {
    summary,
    location,
    description,
    start: {
      dateTime: startDateTime,
      timeZone: 'America/Los_Angeles',
    },
    end: {
      dateTime: endDateTime,
      timeZone: 'America/Los_Angeles',
    },
  };

  const response = await calendar.events.insert({
    calendarId: 'primary',
    requestBody: event,
  });

  return response.data;
}

module.exports = {
  sendEmail,
  fetchSheetsData,
  createCalendarEvent
};

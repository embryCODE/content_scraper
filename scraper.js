/**
 * @file Portfolio Project 6 for Techdegree. Build a Content Scraper.
 * {@link https://teamtreehouse.com/projects/build-a-content-scraper}
 * @author Mason Embry <mason@embrycode.com>
 */

'use_strict';

// Modules
var fs = require('fs'),
  Xray = require('x-ray'),
  xray = new Xray(),
  json2csv = require('json2csv');

// Create directory 'data' if it doesn't already exist.
function createDir(dirName) {
  try {
    fs.statSync(dirName);
  } catch (e) {
    fs.mkdirSync(dirName);
  }
}
createDir('data');

/**
 * Log error. Take date and error message as argument.
 * Create scraper-error.log if it doesn't exist.
 * Append error message to scraper-error.log.
 * @param {object} date Date object.
 * @param {string} error Error message.
 */
function logError(date, error) {
  var errorText = 'Date: ';
  errorText += date + '\n';
  errorText += error + '\n';
  errorText += '\n';
  fs.appendFile('scraper-error.log', errorText, 'utf8', function(err) {
    if (err) {
      console.log('Unable to log error: \n' + err);
    }
    console.log(errorText);
  });
}

/* Use x-ray to dig down into appropriate links and pull
Title, Price, ImageURL, and URL from page. */
xray('http://www.shirts4mike.com/',
  xray('.shirts a@href',
    xray('.products li', [{
      Title: 'a img@alt',
      Price: xray('a@href', '.shirt-details h1 span'),
      ImageURL: xray('a@href', '.shirt-picture img@src'),
      URL: 'a@href',
    }])
  )
)(function(error, data) {
  var resultsJSON = data;

  // Create timestamp when scrape is completed.
  var date = new Date();

  /* Create resultsCSV from resultsJSON using json2csv then
  create and save CSV file in data directory.
  If error, call logError(). */
  if (!error) {
    var resultsCSV;

    try {
      resultsCSV = json2csv({
        data: resultsJSON,
        fields: [
          'Title',
          'Price',
          'ImageURL',
          'URL', {
            label: 'Time',
            default: date.toString()
          }
        ]
      });
    } catch (err) {
      logError(date, err);
    }

    // Set CSV file name with yyyy-mm-dd.
    var csvFileName = date.getFullYear() +
      '-' + date.getMonth() +
      '-' + date.getDate();

    // Write CSV file to data directory.
    fs.writeFile('data/' + csvFileName + '.csv', resultsCSV, function(err) {
      if (err) {
        logError(date, err);
      }
    });
  } else {
    logError(date, error);
  }
});

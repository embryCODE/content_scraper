'use strict';

/**
 * @file Portfolio Project 6 for Techdegree. Build a Content Scraper.
 * {@link https://teamtreehouse.com/projects/build-a-content-scraper}
 * @author Mason Embry <mason@embrycode.com>
 */

 /**
 * Scraper module for Treehouse Techdegree.
 * @module scraper
 */




/**
 * Requires fs module.
 * @requires fs
 */
var fs = require('fs'),

  /**
   * Requires x-ray module.
   * @requires x-ray
   */
  Xray = require('x-ray'),
  xray = new Xray(),

  /**
   * Requires json2csv module.
   * @requires json2csv
   */
  json2csv = require('json2csv');



/**
 * Create directory 'data' if it doesn't already exist.
 * @param {string} dirName Name of directory to create.
 */
function createDir(dirName) {
  try {
    fs.statSync(dirName);
  } catch (e) {
    fs.mkdirSync(dirName);
  }
}
createDir('data');

/**
 * Create scraper-error.log if it doesn't exist.
 * Append error message to scraper-error.log.
 * @param {object} timestamp Date object.
 * @param {string} error Error message.
 */
function logError(timestamp, error) {
  var errorText = 'Date: ';
  errorText += timestamp + '\n';
  errorText += error + '\n';
  errorText += '\n';
  fs.appendFile('scraper-error.log', errorText, 'utf8', function(err) {
    if (err) {
      console.log('Unable to log error: \n' + err);
    }
    console.log(errorText);
  });
}

/**
 * Use x-ray to dig down into appropriate links and pull
 * Title, Price, ImageURL, and URL from page.
 */
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
  var timestamp = new Date();

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
            default: timestamp.toString()
          }
        ]
      });
    } catch (err) {
      logError(timestamp, err);
    }

    // Set CSV file name with yyyy-mm-dd.
    var csvFileName = timestamp.getFullYear() +
      '-' + (timestamp.getMonth() + 1) +
      '-' + timestamp.getDate();

    // Write CSV file to data directory.
    fs.writeFile('data/' + csvFileName + '.csv', resultsCSV, function(err) {
      if (err) {
        logError(timestamp, err);
      }
    });
  } else {
    logError(timestamp, error);
  }
});

var fs = require('fs');

// Create directory 'data' if it doesn't already exist.
function createDir(dirName) {
  try {
    fs.statSync(dirName);
  } catch(e) {
    fs.mkdirSync(dirName);
  }
}
createDir('data');

// Create .csv file named after current date.
var currentDate = new Date();
var day = currentDate.getDate();
var month = currentDate.getMonth() + 1;
var year = currentDate.getFullYear();
dateToday = year + "-" + month + "-" + day;

fs.writeFile(dateToday + '.csv');

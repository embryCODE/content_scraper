(function() {

    'use_strict';

    // Modules
    var fs = require('fs');
    var Xray = require('x-ray');
    var xray = new Xray();

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



    xray('http://www.shirts4mike.com/', '.products', ['li'])
    .paginate('.shirts a@href')
    .limit(2)(function (error, result) {
        console.log(result);
    });



})();

(function() {

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
    fs.writeFileSync('data/' + dateToday + '.csv');



    var resultsJSON;

    xray('http://www.shirts4mike.com/', {
        shirt_catalog: xray('.shirts a@href', {
            shirts: xray('.products li', [{
                Title: 'a img@alt',
                Price: xray('a@href', '.shirt-details h1 span'),
                ImageURL: xray('a@href', '.shirt-picture img@src'),
                URL: 'a@href'
            }])
        })
    })(function(error, data) {
        resultsJSON = JSON.stringify(data);

        resultsCSV = json2csv({
            data: resultsJSON,
            fields: [
                'Title',
                'Price',
                'ImageURL',
                'URL',
                'Time'
            ]
        });
        console.log(resultsCSV);
    });

})();

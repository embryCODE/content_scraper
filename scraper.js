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
    fs.writeFileSync('data/' + dateToday + '.csv');



    //xray('http://www.shirts4mike.com/', [{
        //Title: '.repo-list-name',
        //Price: '.repo-list-name a[href]',
        //ImageURL: 'body'
        //URL: '',
        //Time: ''
    //}])
    //.paginate('.shirts a@href')
    //.limit(2)
    //.write('test.csv');

    xray('http://www.shirts4mike.com/', {
        shirt_catalog: xray('.shirts a@href', {
            shirts: xray('.products li', [{
                Title: 'a img@alt',
                details: xray('a@href', {
                    Price: '.shirt-details h1 span',
                    ImageURL: '.shirt-picture img@src'
                }),
                URL: 'a@href'
            }])
        })
    }).write('test.csv');



})();

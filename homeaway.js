var
  fs        = require('fs')
  , async     = require('async')
  , jsdom     = require('jsdom')
  , S         = require('string')
  , cron      = require('cron').CronJob
  , listings  = {};

var getListings = function(callback) {
  jsdom.env('http://www.homeaway.com/search', ['http://code.jquery.com/jquery-1.5.min.js'],
    function (err, window) { var $ = window.jQuery;
      var dt = new Date();
      listings.year = dt.getFullYear();
      listings.month = dt.getMonth() + 1;
      listings.day = dt.getDate();
      listings.total = $('span.totalCount').data('hitcount');
      listings.paid = $('#ols_more_filters').data('count');
      window.close(); // frees memory
      callback(null, listings);
    }
  );
};

var saveCSV = function(record) {
  fs.appendFile('results.csv', S(record).toCSV().s + '\n');
};

new cron('0 12 * * *', function() {
  async.series([
    getListings
  ], function(err, listings) {
    saveCSV(listings[0]);
    console.log('record inserted');
  });
}, null, true);
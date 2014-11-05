var
  fs        = require('fs')
  , async     = require('async')
  , jsdom     = require('jsdom')
  , S         = require('string')
  , cron      = require('cron').CronJob
  , dt        = new Date()
  , listings  = {};

var getListings = function(callback) {
  jsdom.env('http://www.homeaway.com/search', ['http://code.jquery.com/jquery-1.5.min.js'],
    function (err, window) { var $ = window.jQuery;
      listings.year = dt.getFullYear();
      listings.month = dt.getMonth() + 1;
      listings.day = dt.getDate();
      listings.total = $('span.totalCount').data('hitcount');
      listings.paid = $('#ols_more_filters').data('count');
      callback(null, listings);
    }
  );
};

var saveCSV = function(record) {
  fs.appendFile('results.csv', S(record).toCSV().s + '\n');
};

async.series([
  getListings
], function(err, listings) {
  saveCSV(listings[0]);
});


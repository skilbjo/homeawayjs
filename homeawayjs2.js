var
  fs        = require('fs')
  , async     = require('async')
  , jsdom     = require('jsdom')
  , S         = require('string')
  , db        = require('./config/database/index.js')
  , cron      = require('cron').CronJob
  , listings  = {};

var getListings = function(callback) {
  jsdom.env('http://www.homeaway.com/search', ['http://code.jquery.com/jquery-1.5.min.js'],
    function (err, window) { var $ = window.jQuery;
      var dt = new Date();
      listings.year   = dt.getFullYear();
      listings.month  = dt.getMonth() + 1;
      listings.day    = dt.getDate();
      listings.total  = $('span.totalCount').data('hitcount');
      listings.paid   = $('#ols_more_filters').data('count');
      window.close(); // frees memory
      callback(null, listings);
    }
  );
};

var saveCSV = function(record) {
  fs.appendFile('results.csv', S(record).toCSV().s + '\n');
};

var saveDB = function(record) {
  var Listing = db.Listing;

  Listing.create({
    Year: record.year,
    Month: record.month,
    Day: record.day,
    Total: record.total,
    Paid: record.paid
  })
  .then(function(err, record){
    if (err || !record) { console.log(err); } else {
      console.log('success !');
    }

  });
};

// new cron('0 1 * * *', function() {
  async.series([
    getListings
  ], function(err, listings) {
    console.log(listings);
    saveDB(listings[0]);
    console.log('record inserted');
  });
// }, null, true);
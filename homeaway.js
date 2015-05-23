var
  fs        = require('fs')
  , async     = require('async')
  , jsdom     = require('jsdom')
  , S         = require('string')
  , db        = require('./config/database/index.js')
  , cron      = require('cron').CronJob
  , saveToCSV = true, saveToDB = true, dbSync = false
  , listings  = {};

if (dbSync) db.sequelize.sync({force: true}).then(function(err){
  if (err) { throw err[0]; } else {
    console.log('Database refreshed!');
  }
});

var getListings = function(callback) {
  jsdom.env('http://www.homeaway.com/search', ['http://code.jquery.com/jquery-1.5.min.js'],
    function (err, window) { var $ = window.jQuery;
      var dt = new Date();
      listings.year   = dt.getFullYear();
      listings.month  = dt.getMonth() + 1;
      listings.day    = dt.getDate();
      listings.hour   = dt.getHours();
      listings.total  = $('span.totalCount').data('hitcount');
      listings.paid   = $('#ols_more_filters').data('count');
      window.close(); // frees memory
      callback(null, listings);
    }
  );
};

var saveCSV = function(record) {
  fs.appendFile('results/results.csv', S(record).toCSV().s + '\n');
};


var saveDB = function(record) {
  var Listing = db.Listing;
  Listing.create({
    Year: record.year,
    Month: record.month,
    Day: record.day,
    Hour: record.hour,
    Total: record.total,
    Paid: record.paid
  })
  .then(function(err, record){
    if (err || !record) { console.log(err); } else {
      console.log('success !');
    }

  });
};

new cron('0 * * * *', function() {
  async.series([
    getListings
  ], function(err, listings) {
    console.log(listings);
    if (saveToCSV)  saveCSV(listings[0]); 
    if (saveToDB)   saveDB(listings[0]);
    console.log('record inserted');
  });
}, null, true);
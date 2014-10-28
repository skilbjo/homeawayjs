var 
  $           = require('jquerygo')
  , async     = require('async')
  , _         = require('underscore')
  , fs        = require('fs')
  , S         = require('string')
  , dt        = new Date();

$.config = {
  site: 'http://www.homeaway.com/'
  , addJQuery: false };

async.series([
  $.go('visit', '/search')
  , function(done) {
    $('span.totalCount').data('hitcount', function(totalListings) {
      $('#ols_more_filters').data('count', function(totalPaidListings) {
        fs.appendFile('results.csv'
          , S({Year: dt.getFullYear()
            , Month: dt.getMonth() + 1
            , Day: dt.getDate()
            , TotalListings: totalListings
            , totalPaidListings: totalPaidListings
          }).toCSV().s + '\n'
          , function(err) { if (err) throw err; console.log(dt.getFullYear() + '\t' + 
            (dt.getMonth() + 1) + '\t' + 
            dt.getDate() + '\t' +
            totalListings + '\t' + 
            totalPaidListings + '\n'); }
        );
        done();
      });
    });
  }
], function() {
  $.close();
});
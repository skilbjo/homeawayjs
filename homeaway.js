var 
  $         = require('jquerygo')
  , async   = require('async')
  , _       = require('underscore')
  , dt      = new Date();

$.config = {
  site: 'http://www.homeaway.com/'
  , addJQuery: false };

async.series([
  $.go('visit', '/search')
  , function(done) {
    $('span.totalCount').data('hitcount', function(totalListings) {
      $('#ols_more_filters').data('count', function(totalPaidListings) {
        console.log(dt + '\t' + totalListings + '\t' + totalPaidListings);
        // console.log('Homeaway total listings: ' + totalListings);
        // console.log('Homeaway paid listings: ' + totalPaidListings);
        done();
      });
    });
  }
], function() {
  // console.log('Nice work!');
  $.close();
});
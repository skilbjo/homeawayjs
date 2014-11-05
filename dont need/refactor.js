// https://github.com/caolan/async#seriestasks-callback
// https://github.com/ncb000gt/node-cron

var 
  $           = require('jquerygo')
  , async     = require('async')
  , _         = require('underscore')
  , fs        = require('fs')
  , S         = require('string')
  , dt        = new Date()
  , totalListings
  , totalPaidListings;

$.config = {
  site: 'http://www.homeaway.com/'
  , addJQuery: false };


async.series([
  $.go('visit', '/search')
  , function(cb) {
    cb(null, 'one' );
    // $('span.totalCount').data('hitcount', cb);
  }
  , function(cb) {
    $('#ols_more_filters').data('count', cb);
  }
  , function(done) {
    console.log('hi');
    done();
  }
], function(err, results) {
  console.log(results);
  $.close();
});
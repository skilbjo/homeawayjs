var
  request = require('request')
  , async   = require('async')
  , jsdom = require('jsdom')
  , totalListings
  , totalPaidListings;


// request({ uri:'http://www.homeaway.com/search' }, function (error, response, body) {  
//   if (error && response.statusCode !== 200) {
//     console.log('Error when contacting google.com');
//   }

jsdom.env(
  'http://www.homeaway.com/search',
  [ 'http://code.jquery.com/jquery-1.5.min.js' ],
  function (err, window) {
    var $ = window.jQuery;
    async.parallel([
      function(cb) {
        var totalListings = $('span.totalCount').data('hitcount');
        cb(null, totalListings);
      },
      function(cb) {
        var totalPaidListings = $('#ols_more_filters').data('count');
        cb(null, totalPaidListings);
      }
    ],
    function(err, results) {
      return results;
    });
  }
);

// console.log(totalListings + ' hi');
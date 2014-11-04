var
  request = require('request')
  , async   = require('async')
  , jsdom = require('jsdom')
  , totalListings
  , totalPaidListings;

  var stuff = function() { 
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
          console.log(results);
          return results;
        });
      }
    );
  };

console.log(stuff());



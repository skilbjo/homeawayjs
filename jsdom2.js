var
  request     = require('request')
  , async     = require('async')
  , jsdom     = require('jsdom')
  , fs        = require('fs')
  , S         = require('string')
  , dt        = new Date()
  , listings  = {};

// var addDate = function(callback) {

//   callback(null, listings);
//   // if (callback && typeof(callback) === 'function') {
//   //   callback(null, null);
//   // }
// };

var getListings = function(callback) {
  jsdom.env('http://www.homeaway.com/search', ['http://code.jquery.com/jquery-1.5.min.js'],
    function (err, window) {
      var $ = window.jQuery;
      listings.year = dt.getFullYear();
      listings.month = dt.getMonth() + 1;
      listings.day = dt.getDate();
      listings.total = $('span.totalCount').data('hitcount');
      listings.paid = $('#ols_more_filters').data('count');
      // if (callback && typeof(callback) === 'function') {
      callback(null, listings);
      // }
      // return listings;
    }
  );
};

var saveCSV = function(record) {
  fs.appendFile('results.csv', S(record).toCSV().s + '\n'
  , console.log('all done') 
  );
};

async.series([
  getListings
], function(err, results) {
  console.log(results);
});

getListings(function() {
  saveCSV(listings);
});

// This works
// async.series([
//   getListings
// ], function(err, results) {
//   console.log(results);
// });

// This works
// getListings(function () {
//   console.log(listings);
// });


// addDate(function(){
//   getListings(function() {
//     console.log(listings);
//   });
// });


// var getListings = function() { 
//   async.series([
//     function(cb) { 
//       jsdom.env(
//         'http://www.homeaway.com/search',
//         [ 'http://code.jquery.com/jquery-1.5.min.js' ],
//         function (err, window) {
//           var $ = window.jQuery;
//           async.parallel([
//             function(cb) {
//               listings.total = $('span.totalCount').data('hitcount');
//               cb();
//             },
//             function(cb) {
//               listings.paid = $('#ols_more_filters').data('count');
//               cb();
//             }
//           ], cb);
//         }
//       );
//     }
//   ], function() {
//     console.log(listings);
//   });
// };


// var getListings = function(callback) {
//   jsdom.env('http://www.homeaway.com/search', ['http://code.jquery.com/jquery-1.5.min.js'],
//     function (err, window) {
//       var $ = window.jQuery;
//       listings.year = dt.getFullYear();
//       listings.month = dt.getMonth() + 1;
//       listings.day = dt.getDate() + 1;
//       listings.total = $('span.totalCount').data('hitcount');
//       listings.paid = $('#ols_more_filters').data('count');
//       // if (callback && typeof(callback) === 'function') {
//       callback(null, listings);
//       // }
//       // return listings;
//     }
//   );
// };

// var saveCSV = function() {
//   fs.appendFile(
//     )
// }
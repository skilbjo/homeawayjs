var $ = require('jquerygo');

// Add some default configs.
$.config.site = 'http://www.homeaway.com/';
$.config.addJQuery = false;

// Go to the presidents page.
$.visit('/search', function() {
  $.waitForPage(function() {

    // Iterate through each span.field-content.
    $('span.totalCount').each(function(index, element, done) {

      // Get the text of this element.
      element.text(function(name) {

        // Print the presidents name.
        console.log(name);
        done();
      });
    }, function() {

      // We are done.
      console.log('Presidents loaded!');
      $.close();
    });
  });
});

var 
  fs        	= require('fs')
  , S 				= require('string');

input = [ [ '1', '2', '3', '4' ] ];

// stringify(input, function(err, output){
//   console.log(output);
// });

fs.appendFile('stuff.csv'
	, S({first: 'a', second:'b', third: 'c'}).toCSV().s + '\n'
	, function(err) { if (err) throw err; console.log('file written'); }
);
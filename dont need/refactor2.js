var 
  $           = require('cheerio')
  , request 	= require('request')
  , url 			= 'http://www.homeaway.com/search'
  , async     = require('async')
  , _         = require('underscore')
  , fs        = require('fs')
  , S         = require('string')
  , dt        = new Date()
  , totalListings
  , totalPaidListings;
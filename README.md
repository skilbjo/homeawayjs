### Homeaway.js

## Intro

Screenscraping Homeaways website, repeating that process as a cron job, and storing that information for later analysis

## Installation

`$ git clone github.com/skilbjo/homeawayjs.git`

`$ npm install`

`$ node homeaway.js` || `$ crontab crontab.txt`

## Stop the cron job

`$ crontab -r`


## Configuration

Edit the `crontab.txt` file. Format is:

`[* * * * *]`, as the time period you want to run it (read more on cron for timing)

`/usr/local/bin/node`, as the executable

`/Users/skilbjo/Code/Node/homeawayjs/homeaway.js`, as the node script

`>>`, as where to append the result to

`/Users/skilbjo/Code/Node/homeawayjs/result.txt`, as the output file


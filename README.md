### Homeaway.js

## Intro

Screenscraping Homeaways website, repeating that process as a cron job, and storing that information for later analysis

## Installation

`$ git clone https://github.com/skilbjo/homeawayjs.git`

`$ npm install`

## Let's Begin!

Start a onetime pull, with the output in the console

`$ node homeaway.js`

or, begin a cron job:

`$ crontab crontab.txt`

## Stop the cron job

`$ crontab -r`


## Configuration

Edit the `crontab.txt` file. Default looks like this:

`* * * * * /usr/local/bin/node /Users/skilbjo/Code/Node/homeawayjs/homeaway.js >> /Users/skilbjo/Code/Node/homeawayjs/result.txt`

Here's what this stuff means (edit to your preference):

`[* * * * *]`, as the time period you want to run it (read more on cron for timing)

`/usr/local/bin/node`, as the executable

`/Users/skilbjo/Code/Node/homeawayjs/homeaway.js`, as the node script

`>>`, as where to append the result to

`/Users/skilbjo/Code/Node/homeawayjs/result.txt`, as the output file


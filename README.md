==============================================
Treehouse Full Stack JavaScript
Project 6 - Build a Content Scraper
==============================================

Instructions
=====
Imagine you work at a price comparison website. You’ve been given the task to create a Node.js command line application that goes to an ecommerce site to get the latest prices and save them to a spreadsheet (CSV format). This spreadsheet will be used by another application to populate a database. The application you build will be run once every day. To complete this project, you'll need to research and use npm packages that will help you scrape a website and create a CSV file.

x-ray
===========
https://www.npmjs.com/package/x-ray
When I began researching which modules to use for scraping in Node.js, I noticed that many tutorials use Cheerio, which enables jQuery-like selectors. I am comfortable with using jQuery so I knew I'd want to use Cheerio. Then I saw that the maker of Cheerio, Matt Mueller, also makes a scraper called X-ray.

Reasons:

1. I was going to use Cheerio anyway, which is built in to X-ray by the same developer.
2. X-ray has been around since Feb 4, 2015.
3. It has 175 commits and 15 releases.
4. It is currently being actively developed, with the last commit being only 8 days ago.
5. On npmjs.com, x-ray has been downloaded 4,351 times in the past month alone.
6. The documentation did not make things easy for me, but the software did seem to be powerful enough to do all of the scraping I needed.

json2csv
========
https://www.npmjs.com/package/json2csv

Reasons:

1. This plugin does exactly what I needed. It simply takes a JSON file and converts it to a CSV.
2. On npmjs.com, it has been downloaded 103,752 times in the last month.
3. The latest commit on github was 29 days ago, so it looks to be under active development.
4. It has 33 contributors on github, which is a good sign that bugs will be caught and fixed.
5. It was easy to use and well documented and it worked great for this project.

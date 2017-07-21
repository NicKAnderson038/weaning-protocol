# MEAN Stack

Code for the MEAN Soup to Bits

* MongoDB
* Express
* Angular
* Node

*Requires MongoDB server running*

## Developing - get up and going (just angular w/ gulp)
* yarn
* yarn add angular @uirouter/angularjs
* yarn run watch
* Minute 06:20 of first video.
* testing express end point---> curl -i localhost:8181/landing //cache controll meta tags for this. 


## Developing (npm starter)

* `npm install` to resolve dependencies
* `npm run watch` to start transpile watch. This command will read files under `client/src` and generate a single file under `client/dist/bundle.js` which should be included by index.html


## Developing (yarn starter)
* `C:\Program Files\MongoDB\Server\3.4\bin\mongod` openning mongod will activate your db
* `yarn` to resolve dependencies
* `yarn global add gulp` to install Gulp globally
* `yarn run watch` to start transpile watch. This command will read files under `client/src` and generate a single file under `client/dist/bundle.js` which should be included by index.html
* `node server/app.js` connects your server with your db
* Seed database: `mongoimport --db olympics-dev --collection sports --type json --file server/sports-seed.json --jsonArray --drop`
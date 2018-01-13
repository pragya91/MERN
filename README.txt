Splitting client code
---------------------
- We need to use webpack to merge all the js files into one. But webpack cannot handle
jsx transformations, so we also use babel-loader.

- npm install --save-dev webpack
- npm install --save-dev babel-loader
- configuration file for webpack - webpack.config.js
- add watch and compile commands in package.json:
  "compile": "webpack",
  "watch": "webpack --watch",


- the external libraries to be used in the app can also be handles by webpack.
  Instead of explicitly adding them in html file, install them.
  npm install --save-dev react react-dom babel-polyfill

- now, we modify webpack.config.js to include CommonsChunkPlugin so that we can create a separate
  js file, which is not frequently modified, thus saving re-processing effort in watch command.

Express to MongoDB
-----------------

- To establish the connection between our server and mongodb, we would require a driver for mongo.
  npm install mongodb --save

- This gives us a MongoClient object which an be used for connections.

MongoDB
-------
- Install mongodb and set the path variable for bin directory.

- Create a folder for your database.

- Start mongod daemon process in that folder. It handles data requests, manages data access,
  and performs background management operations.

- start a terminal on the same folder. Type 'mongo'. This will start the mongo shell.

- You can perform your db operations here.

- You can also create a js script file for your db operations. simply run mongo by
  giving path of the script file like so:
  mongo /Users/pragyagarg/Desktop/MERN/scripts/init.mongo.js

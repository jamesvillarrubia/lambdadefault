# Getting Started

Make sure you have the following installed:

- npm
- node
- nvm

For good practice you should be using node 6.10.3 as that's what AWS lambda is using.  Keeps your environment and their environment nice and tidy.

```bash
nvm install 6.10.3
nvm use 6.10.3
```

Run the following command to install baseline libraries

```bash
npm install -g mocha nodemon env-cmd babel-cli
```

Then run

```bash
npm install
```

Add your module name to the following:

- config.local.json (copy from config.example.json)
- congig.production.json (copy from config.example.json)
- package.json
- dockerize.sh

Make sure you have your AWS credentials in ~/.aws/credentials

Add your code into the service function of index.js

For local dev, you can run ```npm start``` and use the express api in server.js.

The api.js is the code that is actually run in lieu of server.js when deployed through claudia.

Add necessary modules to package.json

Alter the test.js as necessary

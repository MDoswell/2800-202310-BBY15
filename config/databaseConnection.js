// Set up of the MongoDB database connections for users and sessions.

// Requires below.
require('dotenv').config();
const { MongoDBSession } = require('./dependencies');

// Secret information below.
const mongodb_host = process.env.MONGODB_HOST;
const mongodb_user = process.env.MONGODB_USER;
const mongodb_password = process.env.MONGODB_PASSWORD;
const mongodb_database = process.env.MONGODB_DATABASE;
const mongodb_secret = process.env.MONGODB_SECRET;
const mongodb_session_database = process.env.MONGODB_SESSION_DATABASE;
const mongodb_session_secret = process.env.MONGODB_SESSION_SECRET;

// Configure users database.
const mongodbStore = new MongoDBSession({
    uri: `mongodb+srv://${mongodb_user}:${mongodb_password}@${mongodb_host}/${mongodb_database}?retryWrites=true&w=majority`,
    collection: 'users',
    secret: mongodb_secret
});

// Configure sessions database.
const sessionStore = new MongoDBSession({
    uri: `mongodb+srv://${mongodb_user}:${mongodb_password}@${mongodb_host}/${mongodb_session_database}?retryWrites=true&w=majority`,
    collection: 'sessions',
    secret: mongodb_session_secret
});

// Below, both connections are established before the server starts listening for requests by using the Promise.
// all() method to wait for both connections to be established before starting the server. 
const connectDB = Promise.all([
    new Promise(resolve => mongodbStore.on('connected', resolve)),
    new Promise(resolve => sessionStore.on('connected', resolve))
]).then(() => {
    console.log('MongoDB user store and session store connected');
    module.exports.userCollection = mongodbStore.client.db().collection('users');
    module.exports.sessionCollection = sessionStore.client.db().collection('sessions');
});

module.exports.mongodbStore = mongodbStore;
module.exports.sessionStore = sessionStore;
module.exports.connectDB = connectDB;
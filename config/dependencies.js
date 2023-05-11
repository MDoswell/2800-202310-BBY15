// Load modules below.
const express = require('express');
const session = require('express-session');
const MongoDBSession = require('connect-mongodb-session')(session);
const bcrypt = require('bcrypt');
const saltRounds = 12;
const Joi = require('joi');
const url = require('url');
const router = express.Router();

//Module used for updating availability
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const fullcalendar = require('fullcalendar');
const moment = require('moment');
const jquery = require('jquery');

// module.exports = { express, session, MongoDBSession, bcrypt, saltRounds, Joi, router, url };

module.exports = {
    express,
    session,
    MongoDBSession,
    bodyParser,
    MongoClient,
    fullcalendar,
    moment,
    jquery,
    router
  };
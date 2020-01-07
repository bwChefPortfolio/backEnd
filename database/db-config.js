require('dotenv').config();

const knex = require('knex');

const knexConfig = require('../knexfile.js');

const environment = process.env.DB_CONNECT || "development";

module.exports = knex(knexConfig[environment]);
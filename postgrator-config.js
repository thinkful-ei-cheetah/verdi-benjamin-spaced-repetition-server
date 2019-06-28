'use strict';

let envPath;
if (process.env.NODE_ENV === 'production') {
  envPath = '.env.prod';
} else {
  envPath = '.env';
}

require('dotenv').config({path: envPath});

module.exports = {
  'migrationDirectory': 'migrations',
  'driver': 'pg',
  'host': process.env.MIGRATION_DB_HOST,
  'port': process.env.MIGRATION_DB_PORT,
  'database': process.env.MIGRATION_DB_NAME,
  'username': process.env.MIGRATION_DB_USER,
  'password': process.env.MIGRATION_DB_PASS,
  'ssl': process.env.NODE_ENV === 'production' ? true : false
};

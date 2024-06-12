const { connect, connection } = require('mongoose');

connect('mongodb://localhost:27017/BestsocialNetworkDB');

module.exports = connection;
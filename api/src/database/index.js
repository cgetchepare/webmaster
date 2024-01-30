const Sequelize = require('sequelize');
const dbConfig = require('../config/db');

const Role = require('../models/Role');
const Usuario = require('../models/Usuario');

const connection = new Sequelize(dbConfig);

Role.init(connection);
Usuario.init(connection);

Role.associate(connection.models);
Usuario.associate(connection.models);

module.exports = connection;
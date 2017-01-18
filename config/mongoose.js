/**
 * Created by Vittorio on 30/05/2016.
 */
var mongoose = require('mongoose');
var config = require('./config');

module.exports = function() {
    var db = mongoose.connect(config.db);

    mongoose.connection.on('connected', function () {
        console.log(`Mongoose connected at ${config.db}`);
    });

    mongoose.connection.on('error', function () {
        console.log(`Mongoose connection error: ${err}`);
    });

    mongoose.connection.on('disconnected', function () {
        console.log('Mongoose disconnected');
    });

    process.on('SIGINT', function () {
        mongoose.connection.close(function () {
            console.log(`Mongoose disconnected througth app termination`);
            process.exit(0);
        });
    });

    require('../app/models/produtos.server.model.js');
    require('../app/models/despesas.server.model.js');
    require('../app/models/ncms.server.model');
    require('../app/models/fornecedores.server.model');
    require('../app/models/paises.server.model');
    require('../app/models/estados.server.model');
    require('../app/models/cidades.server.model');
    require('../app/models/estudos.server.model');
    require('../app/models/contatos.server.model');
    require('../app/models/categorias.server.model');

    return db;
};

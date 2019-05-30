const mongoose = require('mongoose');

module.exports = {
    connect(connectionUrl) {
        if(!connectionUrl) {
            throw new Error('Database connection URL not specified!');
        }

        mongoose.connect(connectionUrl, {useNewUrlParser: true});

        mongoose.connection.on('error', () => {
            throw new Error('Unable to connect to database!');
        });
    },
};
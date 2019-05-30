import express from 'express';
import config from './enviroment';
import expressConfig from './config';

var app = express();
expressConfig(app);
app.listen(config.port, function () {
    console.log(`Server on port ${config.port}!`);
});
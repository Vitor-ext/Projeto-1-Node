const express = require('express');
const config = require('config');

const http = require('http');
const reload = require('reload');

const app = express();

app.use(express.json());

app.use(require('./route'));

// app.listen(
//     config.get('api.porta'),
//     () =>{
//         console.log('Rodando em -> http://localhost:' + 
//                config.get('api.porta'));
//     }
// );
const server = http.createServer(app);
server.listen(
    config.get('api.porta'),
    () =>{
        console.log('Rodando em -> http://localhost:' + 
        config.get('api.porta'));
    }
);
reload(app);

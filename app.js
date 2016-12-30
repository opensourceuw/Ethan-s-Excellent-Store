import express from 'express';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import colors from 'colors';
import cors from 'cors';

import Index from './router/index';
import Account from './router/account';
import Admin from './router/admin';
import Products from './router/products';


let app = express ();
const SUCCESS = '[SUCCESS]'.green;

app.use(cors());
// app.use(function(req, res, next) {
//     res.header('Access-Control-Allow-Credentials', true);
//     res.header('Access-Control-Allow-Origin', "http://localhost:8888");
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Cookie, Set-Cookie');
//     next();
// });

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

let db_url = 'mongodb://127.0.0.1:27017/store';
mongoose.connect(db_url);
console.log(SUCCESS + " mongoDB ready ...");

console.log(SUCCESS + " applying router middleware ...");
app.use('/', Index);
app.use('/account', Account);
app.use('/products', Products);
app.use('/admin', Admin);
console.log(SUCCESS + " server started success! API serving ... ");

module.exports = app;

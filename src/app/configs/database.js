/* eslint-disable no-console */

import mongoose from 'mongoose';
import { mongoUrl } from '../helpers/config';
import models from '../models';

function mongoConnection() {
    function connect() {
        const timeout = 30 * 1000;
        const options = {
            connectTimeoutMS: timeout,
            keepAlive: timeout,
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        };

        return mongoose.connect(mongoUrl, options);
    }

    connect();
    mongoose.set('debug', process.env.NODE_ENV === 'test' ? false : true);

    // Passing mongoose to /models/index.js
    models(mongoose); 

    mongoose.connection.on('error', (err) => {
        console.error(`Mongoose connection: error - ${err}`);
    });

    mongoose.connection.on('connected', () => {
        console.info('Mongoose connection: connected');
    });

    mongoose.connection.on('open', () => {
        console.info('Mongoose connection: open');
    });

    mongoose.connection.on('reconnected', () => {
        console.info('Mongoose connection: reconnected');
    });

    mongoose.connection.on('disconnected', () => {
        console.warn('Mongoose connection: disconnected');
    });

    // Handle process kill signal (eg. <Ctrl>+C) and disconnect the mongoose
    process.on('SIGINT', () => {
        mongoose.disconnect(() => {
            process.exit(0);
        });
    });

    return mongoose;
}

export default mongoConnection();

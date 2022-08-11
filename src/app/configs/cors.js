const corsOptions = {
    development: {
        origin: '*',
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization'],
    },
    production: {
        origin: '*', // TODO add cors for production
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization'],
    },
};

export default corsOptions[process.env.NODE_ENV || 'development'];

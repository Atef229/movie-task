import {
    apiPort,
    apiUrl,
    appUrl,
    jwtSecret,
    jwtExpiry,
    emailFrom,
    gmailPassword,
    accountSid,
    authToken,
    facebookClientId,
    facebookClientSecret,
    facebookCallbackUrl,
    twilioNumber,
    accessKeyId, 
    secretAccessKey,
    stripeKey,
    publishableKey,
    stripeWebhookSecret,
    firebaseProjectId,
    firebasePrivateKeyId,
    firebasePrivateKey,
    firebaseClientEmail,
    firebaseDatabaseUrl
} from '../helpers/config';

/**
 * Define all .env variables coming from ..env file or predefined directly on production server
 * on local (development) environment these variables will come from ..env file which should be manually created
 * by following ...env.sample
 * For production environment those environment variables can be defined different ways, either creating dynamic ..env file or just exporting .env vars
 * {@link https://www.cyberciti.biz/faq/set-environment-variable-linux Example}
 */
const params = {
    development: {
        apiPort,
        apiUrl,
        appUrl,
        jwtSecret,
        jwtExpiry,
        emailFrom,
        gmailPassword,
        accountSid,
        authToken,
        facebookClientId,
        facebookClientSecret,
        facebookCallbackUrl,
        twilioNumber,
        accessKeyId, 
        secretAccessKey,
        stripeKey,
        publishableKey,
        stripeWebhookSecret,
        firebaseProjectId,
        firebasePrivateKeyId,
        firebasePrivateKey,
        firebaseClientEmail,
        firebaseDatabaseUrl
    },
    production: {
        apiPort,
        apiUrl,
        appUrl,
        jwtSecret,
        jwtExpiry,
        emailFrom,
        gmailPassword,
        accountSid,
        authToken,
        facebookClientId,
        facebookClientSecret,
        facebookCallbackUrl,
        twilioNumber,
        accessKeyId, 
        secretAccessKey,
        stripeKey,
        publishableKey,
        stripeWebhookSecret,
        firebaseProjectId,
        firebasePrivateKeyId,
        firebasePrivateKey,
        firebaseClientEmail,
        firebaseDatabaseUrl
    },
};

export default params[process.env.NODE_ENV || 'development'];

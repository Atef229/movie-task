// Initialize environment variables
import env from 'env-var';
import path from 'path';

switch (process.env.NODE_ENV) {
        case 'production':
            require('dotenv').config({ path: path.resolve(process.cwd(), '.env.production') });
            break;
        default:
            require('dotenv').config({ path: path.resolve(process.cwd(), '.env') });
            break;
}

export const apiPort = env.get('PORT').asString();

export const apiUrl = env.get('API_URL').asString();

export const appUrl = env.get('APP_URL').asString();

export const mongoUrl = env.get('MONGODB_URI').asString();

export const jwtSecret = env.get('JWT_SECRET').asString();

export const jwtExpiry = env.get('JWT_EXPIRY').asString();


import {config} from 'dotenv';
import path from 'path';

const env = process.env.NODE_ENV || 'development';

// Load `.env.development`, `.env.production`, etc.
config({
    path: path.resolve(process.cwd(), `.env.${env}`)
});

// Optional: fallback to `.env` if that file doesn't exist
config({
    path: path.resolve(process.cwd(), '.env')
});

export const {PORT, SERVER_URL, NODE_ENV, DB_URI, JWT_SECRET, JWT_EXPIRES_IN, ARCJET_ENV, ARCJET_KEY, QSTASH_TOKEN, QSTASH_URL} = process.env;
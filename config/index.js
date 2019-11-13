require('dotenv').config();

const config = {
  dev: process.env.NODE_ENV !== 'development',
  port: process.env.PORT || 3000,
  cors: process.env.CORS,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  defaultPasswortAdmin: process.env.DEFAULT_PASSWORT_ADMIN,
  defaultPasswortPublic: process.env.DEFAULT_PASSWORT_PUBLIC,
  publicApiKeyToken: process.env.PUBLIC_API_KEY_TOKEN,
  adminApiKeyToken: process.env.ADMIN_API_KEY_TOKEN,
  authJwtSecret: process.env.AUTH_JWT_SECRET,
};

module.exports = { config };
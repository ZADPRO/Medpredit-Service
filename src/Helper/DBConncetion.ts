const { Client } = require("pg");

const connectDB = async () => {
  const client = new Client({
    user: process.env.DB_USER, // Get user from .env
    host: process.env.DB_HOST, // Get host from .env
    database: process.env.DB_DATABASE, // Get database from .env
    password: process.env.DB_PASSWORD, // Get password from .env
    port: 5432, // Get port from .env
    ssl: {
      rejectUnauthorized: false,
    },
  });
  await client.connect();

  return client;
};

module.exports = connectDB;

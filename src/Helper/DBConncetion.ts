const { Client } = require("pg");

const connectDB = async () => {
  // const client = new Client({
  //   user: "testing_medpredit_user", // Update with your PostgreSQL user
  //   host: "dpg-cu1754bqf0us73d8cgcg-a.oregon-postgres.render.com",
  //   database: "testing_medpredit", // Your PostgreSQL database
  //   password: "XAZGA9DyFVHogMdkIeZBDHCR7hCRFxBu", // PostgreSQL password
  //   port: 5432,
  //   ssl: {
  //     rejectUnauthorized: false, // Allow self-signed certificates
  //   }, // Default port for PostgreSQL
  // });

  const client = new Client({
    user: "postgres", // Update with your PostgreSQL user
    host: "localhost",
    database: "testing_medpredit", // Your PostgreSQL database
    password: "1009", // PostgreSQL password
    port: 5432, // Default port for PostgreSQL
  });
  await client.connect();
  // console.log("PostgreSQL database connected successfully!");

  return client;
};

module.exports = connectDB;

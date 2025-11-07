import mysql from "mysql2";
import "dotenv/config";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
<<<<<<< HEAD
const promisePool = pool.promise();
=======

const promisePool = pool.promise();

>>>>>>> 1e1fd15811a52307dd840e141e9c511351891344
export default promisePool;

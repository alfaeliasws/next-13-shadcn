import { config } from "./config";
import mysqlPromise from "mysql2/promise.js";

const pool = mysqlPromise.createPool(config.dbPool)

export default async function query(sql: string, params?: any | undefined) {
  const connection = await pool.getConnection();
  
  try {
    const [results] = await connection.execute(sql, params);
    // data.push("query run");
    return results;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  } finally {
    connection.release();
  }

}
/* eslint-disable no-undef */
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new pg.Pool({
    database: process.env.DB_NAME,
    host: process.env.NODE_ENV === " production" ? process.env.DB_HOST : 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
})

pool.on('connect', ()=>{
    console.log('Connected to the Postgres database');
})
// pool.on('error', (err)=>{
//     console.error(err);
// })

export default pool;

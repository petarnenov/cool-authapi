/* eslint-disable no-undef */
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new pg.Pool({
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
})

pool.on('connect', ()=>{
    console.log('connected to the db');
})
pool.on('error', (err)=>{
    console.error(err);
})

export default pool;

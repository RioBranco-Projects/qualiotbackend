import mysql from 'mysql2/promise'; 
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root', 
    password: '2419',  
    database: 'qualiot', 
});

export { pool };

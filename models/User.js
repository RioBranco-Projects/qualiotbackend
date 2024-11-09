// models/User.js
import db from '../config/db.js';

class User {
    static createUser(name, email, password, callback) {
        const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
        db.execute(query, [email, password], (err, result) => {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, result);
        });
    }

    static findByEmail(email, callback) {
        const query = 'SELECT * FROM users WHERE email = ?';
        db.execute(query, [email], (err, result) => {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, result[0]);
        });
    }
}

export default User;

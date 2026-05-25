const db = require('../db/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = (req, res) => {
    const { name, phone, password, role } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);

    const sql = 'INSERT INTO users (name, phone, password, role) VALUES (?, ?, ?, ?)';
    db.run(sql, [name, phone, hashedPassword, role], function(err) {
        if (err) {
            return res.status(500).json({ message: 'Error registering user', error: err.message });
        }
        res.status(201).json({ message: 'User registered successfully', userId: this.lastID });
    });
};

exports.login = (req, res) => {
    const { phone, password } = req.body;

    const sql = 'SELECT * FROM users WHERE phone = ?';
    db.get(sql, [phone], (err, user) => {
        if (err) {
            return res.status(500).json({ message: 'Error logging in' });
        }
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: 86400 // 24 hours
        });

        res.status(200).json({
            id: user.id,
            name: user.name,
            phone: user.phone,
            role: user.role,
            accessToken: token
        });
    });
};

exports.getAllUsers = (req, res) => {
    const sql = 'SELECT id, name, phone, role FROM users';
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching users' });
        }
        res.status(200).json(rows);
    });
};

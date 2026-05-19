const db = require('../db/database');

exports.createTractor = (req, res) => {
    const { name, plate_number, hourly_rate } = req.body;
    const owner_id = req.userId;

    const sql = 'INSERT INTO tractors (owner_id, name, plate_number, hourly_rate) VALUES (?, ?, ?, ?)';
    db.run(sql, [owner_id, name, plate_number, hourly_rate], function(err) {
        if (err) {
            return res.status(500).json({ message: 'Error adding tractor', error: err.message });
        }
        res.status(201).json({ message: 'Tractor added successfully', tractorId: this.lastID });
    });
};

exports.getAllTractors = (req, res) => {
    const sql = 'SELECT * FROM tractors';
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching tractors' });
        }
        res.status(200).json(rows);
    });
};

exports.getOwnerTractors = (req, res) => {
    const owner_id = req.userId;
    const sql = 'SELECT * FROM tractors WHERE owner_id = ?';
    db.all(sql, [owner_id], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching owner tractors' });
        }
        res.status(200).json(rows);
    });
};

exports.updateTractor = (req, res) => {
    const { name, plate_number, status, hourly_rate } = req.body;
    const { id } = req.params;

    const sql = 'UPDATE tractors SET name = ?, plate_number = ?, status = ?, hourly_rate = ? WHERE id = ? AND (owner_id = ? OR ? = "admin")';
    db.run(sql, [name, plate_number, status, hourly_rate, id, req.userId, req.userRole], function(err) {
        if (err) {
            return res.status(500).json({ message: 'Error updating tractor' });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Tractor not found or unauthorized' });
        }
        res.status(200).json({ message: 'Tractor updated successfully' });
    });
};

exports.deleteTractor = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM tractors WHERE id = ? AND (owner_id = ? OR ? = "admin")';
    db.run(sql, [id, req.userId, req.userRole], function(err) {
        if (err) {
            return res.status(500).json({ message: 'Error deleting tractor' });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Tractor not found or unauthorized' });
        }
        res.status(200).json({ message: 'Tractor deleted successfully' });
    });
};

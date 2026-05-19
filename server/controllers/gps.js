const db = require('../db/database');

exports.logGps = (req, res) => {
    const { tractor_id, booking_id, latitude, longitude } = req.body;
    const sql = 'INSERT INTO gps_logs (tractor_id, booking_id, latitude, longitude) VALUES (?, ?, ?, ?)';
    db.run(sql, [tractor_id, booking_id, latitude, longitude], function(err) {
        if (err) {
            return res.status(500).json({ message: 'Error logging GPS data' });
        }
        res.status(201).json({ message: 'GPS data logged', logId: this.lastID });
    });
};

exports.getTractorGps = (req, res) => {
    const { tractor_id } = req.params;
    const sql = 'SELECT * FROM gps_logs WHERE tractor_id = ? ORDER BY timestamp DESC LIMIT 100';
    db.all(sql, [tractor_id], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching GPS logs' });
        }
        res.status(200).json(rows);
    });
};

exports.getBookingGps = (req, res) => {
    const { booking_id } = req.params;
    const sql = 'SELECT * FROM gps_logs WHERE booking_id = ? ORDER BY timestamp ASC';
    db.all(sql, [booking_id], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching GPS logs' });
        }
        res.status(200).json(rows);
    });
};

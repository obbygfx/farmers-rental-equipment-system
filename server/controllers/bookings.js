const db = require('../db/database');

exports.createBooking = (req, res) => {
    const { tractor_id, hectares, booking_date } = req.body;
    const farmer_id = req.userId;

    // Get tractor hourly rate to calculate total cost later if needed
    db.get('SELECT hourly_rate FROM tractors WHERE id = ?', [tractor_id], (err, tractor) => {
        if (err || !tractor) {
            return res.status(404).json({ message: 'Tractor not found' });
        }

        const sql = 'INSERT INTO bookings (farmer_id, tractor_id, hectares, booking_date, status) VALUES (?, ?, ?, ?, ?)';
        db.run(sql, [farmer_id, tractor_id, hectares, booking_date, 'pending'], function(err) {
            if (err) {
                return res.status(500).json({ message: 'Error creating booking', error: err.message });
            }
            res.status(201).json({ message: 'Booking created successfully', bookingId: this.lastID });
        });
    });
};

exports.getFarmerBookings = (req, res) => {
    const farmer_id = req.userId;
    const sql = `
        SELECT b.*, t.name as tractor_name, t.plate_number
        FROM bookings b
        JOIN tractors t ON b.tractor_id = t.id
        WHERE b.farmer_id = ?
    `;
    db.all(sql, [farmer_id], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching bookings' });
        }
        res.status(200).json(rows);
    });
};

exports.getOwnerBookings = (req, res) => {
    const owner_id = req.userId;
    const sql = `
        SELECT b.*, t.name as tractor_name, t.plate_number, u.name as farmer_name
        FROM bookings b
        JOIN tractors t ON b.tractor_id = t.id
        JOIN users u ON b.farmer_id = u.id
        WHERE t.owner_id = ?
    `;
    db.all(sql, [owner_id], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching bookings' });
        }
        res.status(200).json(rows);
    });
};

exports.updateBookingStatus = (req, res) => {
    const { status } = req.body;
    const { id } = req.params;

    const sql = 'UPDATE bookings SET status = ? WHERE id = ?';
    db.run(sql, [status, id], function(err) {
        if (err) {
            return res.status(500).json({ message: 'Error updating booking status' });
        }
        res.status(200).json({ message: 'Booking status updated successfully' });
    });
};

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const tractorRoutes = require('./routes/tractors');
const bookingRoutes = require('./routes/bookings');
const gpsRoutes = require('./routes/gps');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tractors', tractorRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/gps', gpsRoutes);

app.get('/', (req, res) => {
    res.send('Tractor Management System API');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

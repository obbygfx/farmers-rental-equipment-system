CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT CHECK(role IN ('farmer', 'owner', 'admin')) NOT NULL
);

CREATE TABLE IF NOT EXISTS tractors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    owner_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    plate_number TEXT UNIQUE NOT NULL,
    status TEXT CHECK(status IN ('available', 'busy', 'maintenance')) DEFAULT 'available',
    hourly_rate REAL DEFAULT 0,
    FOREIGN KEY (owner_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    farmer_id INTEGER NOT NULL,
    tractor_id INTEGER NOT NULL,
    hectares REAL NOT NULL,
    booking_date TEXT NOT NULL,
    status TEXT CHECK(status IN ('pending', 'confirmed', 'completed', 'cancelled')) DEFAULT 'pending',
    total_cost REAL,
    FOREIGN KEY (farmer_id) REFERENCES users(id),
    FOREIGN KEY (tractor_id) REFERENCES tractors(id)
);

CREATE TABLE IF NOT EXISTS gps_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tractor_id INTEGER NOT NULL,
    booking_id INTEGER,
    latitude REAL NOT NULL,
    longitude REAL NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tractor_id) REFERENCES tractors(id),
    FOREIGN KEY (booking_id) REFERENCES bookings(id)
);

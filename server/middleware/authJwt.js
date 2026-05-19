const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'No token provided!' });
    }

    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized!' });
        }
        req.userId = decoded.id;
        req.userRole = decoded.role;
        next();
    });
};

const isAdmin = (req, res, next) => {
    if (req.userRole === 'admin') {
        next();
        return;
    }
    res.status(403).json({ message: 'Require Admin Role!' });
};

const isOwner = (req, res, next) => {
    if (req.userRole === 'owner' || req.userRole === 'admin') {
        next();
        return;
    }
    res.status(403).json({ message: 'Require Owner Role!' });
};

module.exports = {
    verifyToken,
    isAdmin,
    isOwner
};

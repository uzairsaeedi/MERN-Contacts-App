const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401);
        throw new Error("Authorization header missing or malformed");
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            res.status(401);
            throw new Error("Invalid or expired token");
        }

        req.user = decoded.user;
        next();
    });
});

module.exports = validateToken;

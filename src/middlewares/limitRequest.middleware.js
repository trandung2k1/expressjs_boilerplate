const rateLimit = require('express-rate-limit');
const limitRequestDefault = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    handler: function (req, res) {
        return res.status(429).json({
            message: 'Too many requests!',
        });
    },
    skip: (req, res) => {
        if (req.ip === '::ffff:127.0.0.1' || req.ip === '::1') return true;
        return false;
    },
});

export const refreshTokenLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 2,
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = { limitRequestDefault, refreshTokenLimiter };

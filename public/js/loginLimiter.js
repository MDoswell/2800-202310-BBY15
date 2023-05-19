const { rateLimit } = require('../../config/dependencies');

// Rate limit configuration
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5, // Maximum number of requests within the window
    message: 'Too many login attempts, please try again later.'
});

module.exports = { loginLimiter };
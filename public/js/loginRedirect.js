// Enable session validation as middleware to use in route handlers.
const { isValidSession } = require('./sessionValidation');

function loginRedirect(req, res, next) {
    if (isValidSession(req)) {
        console.log('User already logged in. Redirecting to home.');
        res.redirect('/');
    }
    else {
        console.log('User not logged in.');
        next();
    }
};

module.exports = { loginRedirect };
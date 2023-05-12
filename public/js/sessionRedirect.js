// Enable session validation as middleware to use in route handlers.
const { isValidSession } = require('./sessionValidation');

// Redirect to home if logged out user is trying to access '/login' webpage.
function sessionRedirect(req, res, next) {
    if (isValidSession(req)) {
        console.log('User already logged in. Redirecting to home.');
        res.redirect('/');
    }
    else {
        console.log('User not logged in.');
        next();
    }
};

module.exports = { sessionRedirect };
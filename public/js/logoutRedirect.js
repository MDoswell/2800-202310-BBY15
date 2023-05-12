// Enable session validation as middleware to use in route handlers.
const { isValidSession } = require('./sessionValidation');

// Redirect to home if logged in user is trying to access '/logout' webpage.
function logoutRedirect(req, res, next) {
    if (!isValidSession(req)) {
        console.log('User already logged out. Redirecting to home.');
        res.redirect('/');
    }
    else {
        console.log('User logging out.');
        next();
    }
};

module.exports = { logoutRedirect };
// Enable session validation as middleware to use in route handlers. 
function isValidSession(req) {
    if (req.session.authenticated) {
        return true;
    }
    return false;
};

function sessionValidation(req, res, next) {
    if (isValidSession(req)) {
        next();
    }
    else {
        res.redirect('/');
    }
};

module.exports = { isValidSession, sessionValidation };
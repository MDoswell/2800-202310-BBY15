// Enable session validation as middleware to use in route handlers. 
function isValidSession(req) {
    if (req.session.authenticated) {
        console.log('Valid session.');
        return true;
    }
    console.log('Invalid session.');
    return false;
};

function sessionValidation(req, res, next) {
    if (isValidSession(req)) {
        console.log('Continuing valid session...');
        next();
    }
    else {
        console.log('Redirecting invalid session...')
        res.redirect('/');
    }
};

module.exports = { isValidSession, sessionValidation };
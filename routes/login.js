// Load modules below.
const { router } = require('../config/dependencies');
const { sessionRedirect } = require('../public/js/sessionRedirect');

// Route below.
router.get('/login', sessionRedirect, (req, res) => {
    res.render("login");
});

module.exports = router;
// Load modules below.
const { router } = require('../config/dependencies');
const { sessionRedirect } = require('../public/js/sessionRedirect');

// Route below.
router.get('/signup', sessionRedirect, (req, res) => {
    res.render("signup");
});

module.exports = router;
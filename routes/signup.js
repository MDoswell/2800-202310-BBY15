// Load modules below.
const { router } = require('../config/dependencies');
const { loginRedirect } = require('../public/js/loginRedirect');

// Route below.
router.get('/signup', loginRedirect, (req, res) => {
    res.render("signup");
});

module.exports = router;
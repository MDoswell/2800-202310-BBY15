// Load modules below.
const { router } = require('../config/dependencies');
const { loginRedirect } = require('../public/js/loginRedirect');

// Route below.
router.get('/login', loginRedirect, (req, res) => {
    res.render("login");
});

module.exports = router;
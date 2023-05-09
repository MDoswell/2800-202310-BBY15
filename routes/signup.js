// Load modules below.
const { router } = require('../config/dependencies');

// Route below.
router.get('/signup', (req, res) => {
    res.render("signup");
});

module.exports = router;
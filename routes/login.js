// Load modules below.
const { router } = require('../config/dependencies');

// Route below.
router.get('/login', (req, res) => {
    res.render("login");
});

module.exports = router;
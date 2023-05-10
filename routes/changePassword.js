// Load modules below.
const { router } = require('../config/dependencies');

// Route below.
router.get('/changePassword', (req, res) => {
    res.render("changePassword");
});

module.exports = router;
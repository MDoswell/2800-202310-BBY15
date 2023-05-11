// Load modules below.
const { router } = require('../config/dependencies');

// Route below.
router.get('/setup', (req, res) => {
    res.render("setup");
});

module.exports = router;
// Load modules below.
const { router } = require('../config/dependencies');

// Route below.
router.get('/changePassword/question', (req, res) => {
    res.render("changePasswordQuestion");
});

module.exports = router;
// Load modules below.
const { router } = require('../config/dependencies');
const { sessionValidation } = require('../public/js/sessionValidation');

// Route below.
router.get('/profile', sessionValidation, (req, res) => {
    const name = req.session.name;
    res.render("profile", { name: name })
});

module.exports = router;
// Load modules below.
const { router } = require('../config/dependencies');
const { sessionValidation } = require('../public/js/sessionValidation');

// Route below.
router.get('/calendar', sessionValidation, (req, res) => {
    const name = req.session.name;
    res.render("calendar", { name: name })
});

module.exports = router;
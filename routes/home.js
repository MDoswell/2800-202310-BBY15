// Load modules below.
const { router } = require('../config/dependencies');

// Route below.
router.get('/', (req, res) => {
    if (req.session.authenticated) {
        res.render("index_validSession", { name: req.session.name });
    } else {
        res.render("index_invalidSession");
    }
});

module.exports = router;
// Load modules below.
const { router } = require('../config/dependencies');

// Route below.
router.get("*", (req, res) => {
    res.status(404);
    res.render("404");
});

module.exports = router;
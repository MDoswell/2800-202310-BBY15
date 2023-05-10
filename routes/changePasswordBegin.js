// Load modules below.
const { router } = require('../config/dependencies');

// Route below.
router.get('/changePassword/begin', (req, res) => {
    res.render("changePasswordBegin");
});

module.exports = router;
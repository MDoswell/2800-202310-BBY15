// Load modules below.
const { router } = require('../config/dependencies');

// Route below.
router.post('/changePassword/submit', (req, res) => {
    // res.render("changePasswordQuestion");
    console.log('submitted password');
    res.redirect('/login');
});

module.exports = router;
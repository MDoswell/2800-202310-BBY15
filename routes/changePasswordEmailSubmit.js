// Load modules below.
const { router } = require('../config/dependencies');

// Route below.
router.post('/changePassword/begin/submit', (req, res) => {
    // res.render("changePasswordQuestion");
    console.log('submitted email');
    res.redirect('/changePassword/question');
});

module.exports = router;
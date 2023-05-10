// Load modules below.
const { router } = require('../config/dependencies');

// Route below.
router.post('/changePassword/question/submit', (req, res) => {
    // res.render("changePasswordQuestion");
    console.log('submitted question');
    res.redirect('/changePassword');
});

module.exports = router;
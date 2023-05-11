// Load modules below.
const { router } = require('../config/dependencies');

// Route below.
router.post('/changePassword/begin/submit', (req, res) => {
    // res.render("changePasswordQuestion");
    const email = req.body.email;
    console.log('submitted email');
    res.redirect('/changePassword/?email=' + email);
});

module.exports = router;
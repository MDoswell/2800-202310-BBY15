// // Load modules below.
// const { router } = require('../config/dependencies');

// // Route below.
// router.get('/signup', (req, res) => {
//     res.render("signup");
// });

// module.exports = router;

// Load modules below.
const { router } = require('../config/dependencies');

// Route below.
router.get('/signup', (req, res) => {
    const errorMessage = ''; // Set the initial error message to an empty string
    res.render("signup", { errorMessage: errorMessage }); // Pass the errorMessage variable to the template
});

module.exports = router;

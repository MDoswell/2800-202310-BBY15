// Load modules below.
require('dotenv').config();
const { router } = require('../config/dependencies');
const { sessionValidation } = require('../public/js/sessionValidation');

// Route below.
router.get('/timeForm', sessionValidation, (req, res) => {
    res.render("timeForm");
});

module.exports = router;
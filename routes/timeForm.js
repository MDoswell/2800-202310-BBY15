// Load modules below.
require('dotenv').config();
const { router } = require('../config/dependencies');
const { sessionValidation } = require('../public/js/sessionValidation');

// Route below.
router.get('/timeForm', sessionValidation, (req, res) => {
    const { success } = req.query; // Check if 'success' query parameter is present

    const showSuccessMessage = success === 'true';
    const showErrorMessage = success === 'false';

    res.render("timeForm", { showSuccessMessage, showErrorMessage }); // Pass showSuccessMessage and showErrorMessage parameters to the template
});

module.exports = router;


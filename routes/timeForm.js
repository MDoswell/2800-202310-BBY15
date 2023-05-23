// Load modules below.
require('dotenv').config();
const { router } = require('../config/dependencies');
const { sessionValidation } = require('../public/js/sessionValidation');
const getRoutine = require('../public/js/getRoutine');
// Route below.
router.get('/timeForm', sessionValidation, async (req, res) => {
    const username = req.session.name;
    const userRoutine = await getRoutine(username);

        if (userRoutine != null) {    
            var routine = true;
        } else {
            var routine = false
        }
    const { success } = req.query; // Check if 'success' query parameter is present

        const showSuccessMessage = success === 'true';
        const showErrorMessage = success === 'false';

    res.render("timeForm", { showSuccessMessage, showErrorMessage }); // Pass showSuccessMessage and showErrorMessage parameters to the template
});

module.exports = router;


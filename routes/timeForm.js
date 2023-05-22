// Load modules below.
require('dotenv').config();
const { router } = require('../config/dependencies');
const { sessionValidation } = require('../public/js/sessionValidation');

// Route below.
router.get('/timeForm', sessionValidation, async (req, res) => {
    const { userCollection } = await require('../config/databaseConnection');

    try {
        console.log('trying');
        // Fetch availability data for the user from the database
        const user = await userCollection.findOne({ name: req.session.name });

        const { success } = req.query; // Check if 'success' query parameter is present

        const showSuccessMessage = success === 'true';
        const showErrorMessage = success === 'false';

        const currentAvailabilities = user.availabilityData;

        // Pass showSuccessMessage and showErrorMessage parameters to the template
        res.render("timeForm", { showSuccessMessage, showErrorMessage, availabilities: currentAvailabilities });

    } catch (error) {
        console.error(error);
        res.render('error', { message: 'Error retrieving availability data.' });
    }

});

module.exports = router;


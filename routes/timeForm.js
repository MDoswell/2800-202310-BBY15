// Load modules below.
require('dotenv').config();
const { router } = require('../config/dependencies');
const { sessionValidation } = require('../public/js/sessionValidation');

// Route below.
router.get('/timeForm', sessionValidation, (req, res) => {
    const { success } = req.query; // Check if 'success' query parameter is present

    res.render("timeForm", { showAlert: success === 'true' }); // Pass showAlert parameter to the template
});

router.post('/timeForm/submit', sessionValidation, async (req, res) => {
    const { userCollection } = await require('../config/databaseConnection');

    try {
        const availabilityData = JSON.parse(req.body.availabilityData); // Parse the availabilityData from the request body

        await userCollection.findOneAndUpdate(
            { name: req.session.name },
            { $set: { availabilityData: availabilityData } }
        );

        // Redirect to the '/timeForm' route with success query parameter
        res.redirect('/timeForm?success=true');
    } catch (error) {
        res.status(500).json({ message: 'Error saving availability data.' });
    }
});

module.exports = router;

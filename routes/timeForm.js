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

// Server file
router.post('/timeForm/submit', sessionValidation, async (req, res) => {
    const { userCollection } = await require('../config/databaseConnection');
  
    try {
      const availabilityData = JSON.parse(req.body.availabilityData); // Parse the availabilityData from the request body
  
      await userCollection.findOneAndUpdate(
        { name: req.session.name },
        { $set: { availabilityData: availabilityData } }
      );
  
      // Redirect to the availability data page after successful submission with success=true query parameter
      res.redirect('/availabilityData?success=true');
    } catch (error) {
      console.error(error);
      res.render('timeForm', { showSuccessMessage: false, showErrorMessage: true, errorMessage: 'Error saving availability data.' });
    }
});

module.exports = router;


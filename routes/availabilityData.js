// Load modules below.
require('dotenv').config();
const { router } = require('../config/dependencies');
const { sessionValidation } = require('../public/js/sessionValidation');

// Route to display user's availability data
router.get('/availabilityData', sessionValidation, async (req, res) => {
  const { userCollection } = await require('../config/databaseConnection');

  try {
    // Fetch availability data for the user from the database
    const user = await userCollection.findOne({ name: req.session.name });

    if (user.availabilityData && !user.availabilityData.includes(null)) {
      res.render("availabilityData", { availabilityData: user.availabilityData });
    } else {
      // Redirect to '/timeform' if availabilityData doesn't exist
      res.redirect('/timeform');
    }
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Error retrieving availability data.' });
  }
});

module.exports = router;
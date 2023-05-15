const { router } = require('../config/dependencies');
const { sessionValidation } = require('../public/js/sessionValidation');

router.post('/timeForm/submit', sessionValidation, async (req, res) => {
  const { userCollection } = await require('../config/databaseConnection');

  try {
    const availabilityData = JSON.parse(req.body.availabilityData); // Parse the availabilityData from the request body

    await userCollection.findOneAndUpdate(
      { name: req.session.name },
      { $set: { availabilityData: availabilityData } }
    );

    // Render the page with a success message
    res.render('timeForm', { success: true, availabilityData, showAlert: true });
  } catch (error) {
    res.status(500).json({ message: 'Error saving availability data.' });
  }
});

module.exports = router;

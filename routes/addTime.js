const { router } = require('../config/dependencies');
const { sessionValidation } = require('../public/js/sessionValidation');

// Server file
router.get('/addTime', sessionValidation, async (req, res) => {
  const { userCollection } = await require('../config/databaseConnection');

  console.log('in add time')
  try {
    const availabilityData = {
      dayOfWeek: 'Wednesdayday',
      date: 'May 24, 2023',
      startTime: '13:00',
      endTime: '14:00'
    }

    await userCollection.findOneAndUpdate(
      { name: req.session.name },
      { $push: { availabilityData: availabilityData } }
    );

    // Redirect to the availability data page after successful submission with success=true query parameter
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.render('timeForm', { showSuccessMessage: false, showErrorMessage: true, errorMessage: 'Error saving availability data.' });
  }
});


module.exports = router;

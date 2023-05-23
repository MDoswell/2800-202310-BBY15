const { router } = require('../config/dependencies');
const { sessionValidation } = require('../public/js/sessionValidation');

// Server file
router.post('/timeForm/submit', sessionValidation, async (req, res) => {
  const { userCollection } = await require('../config/databaseConnection');
  if (req.body.new != null){
    // add new routine to new avialability
  } else if (req.body.old != null){
    //add old routine to new availability
  }

  try {
    const availabilityData = JSON.parse(req.body.availabilityData); // Parse the availabilityData from the request body

    await userCollection.findOneAndUpdate(
      { name: req.session.name },
      { $set: { availabilityData: availabilityData } }
    );

    // Redirect to the availability data page after successful submission with success=true query parameter
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.render('timeForm', { showSuccessMessage: false, showErrorMessage: true, errorMessage: 'Error saving availability data.' });
  }
});


module.exports = router;

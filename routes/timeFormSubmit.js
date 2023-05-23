const { router } = require('../config/dependencies');
const { sessionValidation } = require('../public/js/sessionValidation');
const axios = require('axios').default;
// Server file
router.post('/timeForm/submit', sessionValidation, async (req, res) => {
  const { userCollection } = await require('../config/databaseConnection');
 try {
    const availabilityData = JSON.parse(req.body.availabilityData); // Parse the availabilityData from the request body

    await userCollection.findOneAndUpdate(
      { name: req.session.name },
      { $set: { availabilityData: availabilityData } }
    );

  console.log(req.body.option);
 
 if (req.body.option == "new"){
    console.log("new routine requeseted in timeformsubmit.js")
    await axios.post('/newAvialabilityNewRoutine')
  } else if (req.body.option == "old"){
    console.log("old routine requested  to be in new availability")
    //add old routine to new availability
  }
    // Redirect to the availability data page after successful submission with success=true query parameter
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.render('timeForm', { showSuccessMessage: false, showErrorMessage: true, errorMessage: 'Error saving availability data.' });
  }
});


module.exports = router;

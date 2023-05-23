const { router } = require('../config/dependencies');
const { sessionValidation } = require('../public/js/sessionValidation');
const axios = require('axios').default;

const getRoutine = require('../public/js/getRoutine');
// Server file
router.post('/timeForm/submit', sessionValidation, async (req, res) => {
  const { userCollection } = await require('../config/databaseConnection');
  const user = await userCollection.findOneAndDelete({name:req.session.name});
  const username = req.session.name;
  const userRoutine = await getRoutine(username);

      if (userRoutine != null) {    
          var routine = true;
      } else {
          var routine = false
      }

      const currentAvailabilites = user.availabilityData;


 try {
    const availabilityData = JSON.parse(req.body.availabilityData); // Parse the availabilityData from the request body

    await userCollection.findOneAndUpdate(
      { name: req.session.name },
      { $set: { availabilityData: availabilityData } }
    );

  console.log(req.body.option);
 
 if (req.body.option == "new"){
    console.log("new routine requeseted in timeformsubmit.js")
    await axios.post('/newAvailabilityNewRoutine');
  } else if (req.body.option == "old"){
    console.log("old routine requested  to be in new availability")
    //add old routine to new availability
  }
    // Redirect to the availability data page after successful submission with success=true query parameter
    res.redirect('/');
  } catch (error) {
    const { userCollection } = await require('../config/databaseConnection');
  const user = await userCollection.findOneAndDelete({name:req.session.name});
  const username = req.session.name;
  const userRoutine = await getRoutine(username);

      if (userRoutine != null) {    
          var routine = true;
      } else {
          var routine = false
      }

      const currentAvailabilites = user.availabilityData;
    console.error(error);
    res.render('timeForm', { showSuccessMessage: false, showErrorMessage: true, errorMessage: 'Error saving availability data.', routine, availabilities:  currentAvailabilites });
  }
});


module.exports = router;

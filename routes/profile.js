// Load modules below.
require('dotenv').config();
const { router } = require('../config/dependencies');
const { sessionValidation } = require('../public/js/sessionValidation');


// Route below.
router.get('/profile', sessionValidation, async (req, res) => {
  const { userCollection } = await require('../config/databaseConnection');
  const loggedInUser = req.session.name; // Assuming the session stores the logged-in user's name

  const userInfo = await userCollection.findOne(
    { name: loggedInUser },
    {
      projection: {
        name: 1,
        user_type: 1,
        email: 1,
        experience: 1,
        weight: 1,
        exerciseTypes: 1,
      },
    }
  );

  if (userInfo) {
    const name = userInfo.name;
    const email = userInfo.email;
    const user_type = userInfo.user_type;
    const experience = userInfo.experience;
    const weight = userInfo.weight;
    const exerciseTypes = userInfo.exerciseTypes || []; // Use an empty array as default if exerciseTypes is null
    const errorMessage = '';

    // Render the profile page with the retrieved values
    res.render("profile", {
      name,
      email,
      user_type,
      experience,
      weight,
      exerciseTypes,
      errorMessage,
    });
  } else {
    // Handle case when user information is not found
    res.status(404).send("User information not found.");
  }

});
module.exports = router;
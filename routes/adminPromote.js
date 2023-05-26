// Load modules below.
require('dotenv').config();
const { router } = require('../config/dependencies');
const { sessionValidation } = require('../public/js/sessionValidation');
const { adminAuthorization } = require('../public/js/adminAuthorization');

router.get('/admin/promote', sessionValidation, adminAuthorization, async (req, res) => {
    const { userCollection } = await require('../config/databaseConnection');
    // Get the user email from the query parameter
    const userEmail = req.query.user;
  
    try {
      const updatedUser = await userCollection.findOneAndUpdate(
        // Find the user based on the email
        { email: userEmail },
        // Update the user_type field to 'admin'
        { $set: { user_type: 'admin' } },
        // Return the updated user document
        { returnOriginal: false }
      );
  
      if (updatedUser) {
        // Redirect to the admin page after successful promotion
        res.redirect('/admin');
      } else {
        // Render an "error" view if the user is not found
        res.render('error', { message: 'User not found.' });
      }
    } catch (error) {
      console.error(error);
      // Render an "error" view if there's an error promoting the user
      res.render('error', { message: 'Error promoting user to admin.' });
    }
  });

module.exports = router;


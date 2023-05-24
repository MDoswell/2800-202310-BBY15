// Load modules below.
require('dotenv').config();
const { router } = require('../config/dependencies');
const { sessionValidation } = require('../public/js/sessionValidation');
const { adminAuthorization } = require('../public/js/adminAuthorization');

router.get('/admin/demote', sessionValidation, adminAuthorization, async (req, res) => {
    const { userCollection } = await require('../config/databaseConnection');
    const userEmail = req.query.user;
  
    try {
      const updatedUser = await userCollection.findOneAndUpdate(
        { email: userEmail },
        { $set: { user_type: 'user' } },
        { returnOriginal: false }
      );
  
      if (updatedUser) {
        res.redirect('/admin');
      } else {
        res.render('error', { message: 'User not found.' });
      }
    } catch (error) {
      console.error(error);
      res.render('error', { message: 'Error demoting user to regular user.' });
    }
  });
  
module.exports = router;

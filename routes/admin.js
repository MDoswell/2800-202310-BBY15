// Load modules below.
require('dotenv').config();
const { router } = require('../config/dependencies');
const { sessionValidation } = require('../public/js/sessionValidation');

function isAdmin(req) {
  if (req.session.user_type === 'admin') {
    return true;
  }
  return false;
}

function adminAuthorization(req, res, next) {
  if (!isAdmin(req)) {
    res.status(403);
    res.render("403", { error: "Not Authorized" });
    return;
  }
  next();
}

// Route to admin page
router.get('/admin', sessionValidation, adminAuthorization, async (req, res) => {
  const { userCollection } = await require('../config/databaseConnection');

  try {
    const result = await userCollection.find({}, { projection: { username: 1, user_type: 1 } }).toArray();
    res.render("admin", { users: result });
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Error retrieving user data.' });
  }
});

router.get('/admin/demote', sessionValidation, adminAuthorization, async (req, res) => {
  const { userCollection } = await require('../config/databaseConnection');
  const { user } = req.query;

  try {
    await userCollection.updateOne({ username: user }, { $set: { user_type: "user" } });
    res.redirect("/admin");
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Error demoting user.' });
  }
});

router.get('/admin/promote', sessionValidation, adminAuthorization, async (req, res) => {
  const { userCollection } = await require('../config/databaseConnection');
  const { user } = req.query;

  try {
    await userCollection.updateOne({ username: user }, { $set: { user_type: "admin" } });
    res.redirect("/admin");
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Error promoting user.' });
  }
});

module.exports = router;

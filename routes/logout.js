// Load modules below.
const { router } = require('../config/dependencies');
const { logoutRedirect } = require('../public/js/logoutRedirect');

// Route below.
router.get('/logout', logoutRedirect, (req, res) => {
  req.session.destroy();
  res.render('logout');
});

module.exports = router;
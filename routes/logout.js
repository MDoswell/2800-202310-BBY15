// Load modules below.
const { router } = require('../config/dependencies');

// Route below.
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.render("logout");
});

module.exports = router;
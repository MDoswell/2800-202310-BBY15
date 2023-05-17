// Load modules below.
const { router } = require('../config/dependencies');

// Route below.
router.get('/liftingTime', async (req, res) => {
    res.render('easterEgg');
})

module.exports = router;
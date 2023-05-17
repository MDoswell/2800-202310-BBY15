// Load modules below.
const { router } = require('../config/dependencies');

// Route below.
router.get('/openai/get', (req, res) => {
    res.render("openaiTest");
});

module.exports = router;
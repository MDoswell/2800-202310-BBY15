// Load modules below.
const { router } = require('../config/dependencies');
const getRoutine = require('../public/js/getRoutine');

// Route below.
router.get('/', async (req, res) => {
    if (req.session.authenticated) {
        const username = req.session.name;
        await getRoutine(username);
        res.render("index_validSession", { name: req.session.name });



    } else {
        res.render("index_invalidSession");
    }
});

module.exports = router;
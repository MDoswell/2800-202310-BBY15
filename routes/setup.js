// Load modules below.
const { router } = require('../config/dependencies');
const getAvailability = require('../public/js/getAvailability.js');

// Route below.
router.get('/setup', async (req, res) => {
    const username = req.session.name;
    const userAvailability = await getAvailability(username);
    console.log(userAvailability);

    //setup can only be done if the user has availability data. Redirect them to time form if they don't
    if (userAvailability != null && userAvailability.length > 0) {
        res.render("setup");
    } else {
        res.redirect("/timeForm");
    }
});

module.exports = router;
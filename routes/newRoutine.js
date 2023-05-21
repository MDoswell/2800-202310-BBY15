// Load modules below.
const { router } = require('../config/dependencies');




// Route below.
router.get('/newRoutine', async(req, res) => {
    const { userCollection } = await require('../config/databaseConnection');
    const userInfo = await userCollection
    .findOne({ name: req.session.name }, { projection: { name: 1, routine: 1} });
    const name = userInfo.name;
    const routine = userInfo.routine;
    console.log(routine);
    res.render("newRoutine", {name:name, routine:routine});
});

module.exports = router;
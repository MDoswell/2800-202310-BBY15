const { router } = require('../config/dependencies');
const replaceExercise = require('../public/js/replaceExercise');


// Route below to replace the exercise.
router.post('/replaceExercise', async (req, res) => {
    const username = req.body.name;
    const exerciseToReplace = req.body.oldExercise;
    const newExercise = req.body.newExercise;

    console.log(`Replacing ${exerciseToReplace} for ${username}`);

    // Generate the array of suggested exercises.
    // const newExercise = await generateNewExercise(username, exerciseToReplace);
    await replaceExercise(username, exerciseToReplace, newExercise);

    console.log('What is the new exercise?', newExercise);

    res.sendStatus(200);
});

module.exports = router;
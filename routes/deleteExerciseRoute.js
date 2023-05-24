const { router } = require('../config/dependencies');
const deleteExercise = require('../public/js/deleteExercise');


// Route below to replace the exercise.
router.post('/deleteExercise', async (req, res) => {
    const username = req.body.name;
    const exerciseToDelete = req.body.oldExercise;

    console.log(`Deleting ${exerciseToDelete} for ${username}`);

    // Generate the array of suggested exercises.
    // const newExercise = await generateNewExercise(username, exerciseToReplace);
    await deleteExercise(username, exerciseToDelete);

    console.log('Deleted exercise', exerciseToDelete, 'for', username, 'in the database.');

    const successMessage = `Deleted ${exerciseToDelete} from your routine.`;
    const authentication = true;

    res.json({ successMessage, authentication });
});

module.exports = router;
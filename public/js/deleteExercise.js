const getRoutine = require('./getRoutine');

/**
 * Function to delete an exercise from the user's routine.
 * 
 * @param {String} username - The username of the user.
 * @param {String} exerciseToDelete - The name of the exercise to delete.
 */
const deleteExercise = async (username, exerciseToDelete) => {
    console.log('deleteExercise function', username, exerciseToDelete);
    // Load modules below.
    const { userCollection } = await require('../../config/databaseConnection');

    // Get the user's routine from the database.
    let userRoutine = await getRoutine(username);

    console.log('User routine in deleteExercise:', userRoutine);
    console.log('Exercise to delete in deleteExercise:', exerciseToDelete);
    console.log('Username in deleteExercise:', username);

    // Replace the exercise with the new exercise. Check if the name of the exercise matches the exerciseToReplace.
    const reducedRoutine = userRoutine.filter(exercise => exercise.exerciseName !== exerciseToDelete);

    console.log('reduced routine:', reducedRoutine);

    // Update the user's routine in the database
    return await userCollection.updateOne({ name: { $eq: username } }, { $set: { routine: reducedRoutine } });
}

module.exports = deleteExercise;
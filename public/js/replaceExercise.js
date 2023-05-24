// Ask AI to return a single JSON object.
// Feed AI the user routine array of JSON objects.
// AI returns a single JSON object.

// Ask AI to return 10 alternate exercises based on the user's routine.
// Feed AI the user routine array of JSON objects.
// AI returns 10 alternate exercises.
// Exercise includes name and intensity.

// Query DB to get user's routine.
// Replace the exercise with the new exercise.


const getRoutine = require('./getRoutine');

/**
 * Function to replace an exercise in the user's routine.
 * 
 * @param {String} username - The username of the user.
 * @param {Object} newExercise - The new exercise to replace the old exercise.
 * @param {String} exerciseToReplace - The name of the exercise to replace.
 */
const replaceExercise = async (username, exerciseToReplace, newExercise) => {
    console.log('replaceExercise function', username, exerciseToReplace, newExercise)
    // Load modules below.
    const { userCollection } = await require('../../config/databaseConnection');

    // Get the user's routine from the database.
    let userRoutine = await getRoutine(username);

    console.log('User routine in replaceExercise:', userRoutine);
    console.log('New exercise in replaceExercise:', newExercise);
    console.log('Exercise to replace in replaceExercise:', exerciseToReplace);
    console.log('Username in replaceExercise:', username);

    // Replace the exercise with the new exercise. Check if the name of the exercise matches the exerciseToReplace.
    const index = userRoutine.findIndex(exercise => exercise.exerciseName === exerciseToReplace);

    console.log('index', index);

    // Replace the exercise. Make sure to add the day and date properties of the old exercise to the new exercise.
    const newFormattedExercise = {
        exerciseName: newExercise.name,
        exerciseBodyPart: newExercise.bodyPart,
        exerciseTarget: newExercise.target,
        exerciseEquipment: newExercise.equipment,
        exerciseAnimation: newExercise.gifUrl,
        exerciseInstructions: newExercise.instructions,
        intensity: userRoutine[index].intensity,
        day: userRoutine[index].day,
        date: userRoutine[index].date,
        routineDay: userRoutine[index].routineDay
    };

    userRoutine[index] = newFormattedExercise;

    // Update the user's routine in the database
    return await userCollection.updateOne({ name: { $eq: username } }, { $set: { routine: userRoutine } });
}

module.exports = replaceExercise;
// This function gets the routine of the user from the database
// If no routine, redirect user to /setup (see home.js) 
const getRoutineTemplate = async (username) => {
    // Load modules below.
    const { userCollection } = await require('../../config/databaseConnection');

    // Get the user's routine from the database.
    const result = await userCollection.find({ name: { $eq: username } }).project({ routineTemplate: 1 }).toArray();

    // Check if the array is empty.
    if (result.length > 0 && result[0].routineTemplate) {
        // Get the user's routine.
        const userRoutineTemplate = result[0].routineTemplate;

        // What is the user's routine?
        // console.log(userRoutine);

        // Return the user's routine.
        return userRoutineTemplate;
        
    } else {
        console.log("user routine template not found");

        // Prompt user to set up a routine
        // PLACEHOLDER
        // PLACEHOLDER
        // PLACEHOLDER
        // PLACEHOLDER
        // PLACEHOLDER
        // PLACEHOLDER

        return;
    }
};

module.exports = getRoutineTemplate;
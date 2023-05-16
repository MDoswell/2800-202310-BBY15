// This function gets the routine of the user from the database
const getRoutine = async (username) => {
    // Load modules below.
    const { userCollection } = await require('../../config/databaseConnection');

    // Get the user's routine from the database.
    const result = await userCollection.find({ name: { $eq: username } }).project({ routine: 1 }).toArray();

    // Check if the array is empty.
    if (result.length > 0 && result[0].routine) {
        // What is the user's routine?
        console.log(userRoutine);

        // Return the user's routine.
        return userRoutine;
        
    } else {
        console.log("user routine not found");

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

module.exports = getRoutine;
// This function gets the routine of the user from the database
const getRoutine = async (username) => {
    // Load modules below.
    const { userCollection } = await require('../../config/databaseConnection');

    // Get the user's routine from the database.
    const result = await userCollection.find({ name: { $eq: username } }).project({ routine: 1 }).toArray();

    // Check the collection for a matching user.
    const userRoutine = result[0].routine;

    // Check if the array is empty.
    if (userRoutine == null) {
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

    // What is the user's routine?
    console.log(userRoutine);

    // Return the user's routine.
    return userRoutine;
};

module.exports = getRoutine;
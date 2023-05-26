// This function gets the availability of the user from the database
// If no availability, redirect user to /setup (see home.js) 
const getAvailability = async (username) => {
    // Load modules below.
    const { userCollection } = await require('../../config/databaseConnection');

    // Get the user's availability from the database.
    const result = await userCollection.find({ name: { $eq: username } }).project({ availabilityData: 1 }).toArray();

    // Check if the array is empty.
    if (result.length > 0 && result[0].availabilityData) {
        // Get the user's availability.
        const userAvailability = result[0].availabilityData;

        // Return the user's availability.
        return userAvailability;
        
    } else {
        console.log("user availability not found");
        return;
    }
};

module.exports = getAvailability;
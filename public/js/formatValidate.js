/**
 * Checks if the AI-generated JSON object is a valid exercise object. If so, then return the exercise object. Else, return to route (try/catch should apply error handling). 
 * 
 * @param {Object} exerciseObject 
 * @returns 
 */
const isValidExerciseObject = async (exerciseObject) => {
    // If the element is a JSON object, check the keys.
    if (typeof exerciseObject !== 'object' && exerciseObject === null) {
        console.log('Statement is not a JSON object.');

        // If the element is not a JSON object, return to route (try/catch should).
        throw new Error('Invalid value for ', exerciseObject);
    }

    // Is the statement a JSON object?
    // const jsonObject = JSON.parse(exerciseObject);
    const jsonObject = exerciseObject;
    // console.log('Statement is a JSON object.');

    // Get the keys of the JSON object as an array.
    const keys = Object.keys(jsonObject);

    // What are the keys?
    console.log('Keys:', keys);

    // Check if the keys include the standardized names for DB upload. Then iterate through the keys and check the values.
    if (keys.includes('exerciseName') && keys.includes('intensity') && keys.includes('dayOfWeek') && keys.includes('date')) {
        // If the keys include the standardized names for DB upload, check the values before querying the DB.
        for (const key in jsonObject) {

            // Is the value of the key a non-empty string?
            if (typeof jsonObject[key] !== 'string' || jsonObject[key] === '') {
                // Is the value of the key a non-empty string?
                console.log('Value of ', key, ' NOT a non-empty string.');

                // If the element is not a JSON object, return to route (try/catch should).
                throw new Error('Invalid value for ', key);

            } else {
                // Is the value of the key a non-empty string? Log the value in jsonObject[key]
                console.log('Value of ', key, ' is a non-empty string: ' + jsonObject[key]);
            }
        } // End of for loop.
        // Do all keys include the standardized names for DB upload? If so, return true.
        console.log('All keys match names of key-values for exercise objects in DB.');

        // The value of the key is a non-empty string that includes the standardized name for DB upload, return true.
        return true;

    } else { // Do all keys include the standardized names for DB upload? If not, return false.
        console.log('No keys with matching database names for exercise key-values.');

        // No keys with matching database names for exercise key-values, return false.
        return false;
    }
};


/**
 * Format a complete numeric date (e.g., 12/31/1999) into its written form, such as "December 31, 1999". Validate the date with the user's schedule. If the AI-generated date does not match the user's schedule, then return the user's schedule date.
 * 
 * @param {String} date - The numbered full AI-generated date (e.g., 12/31/1999) to format into written form. 
 * @param {String} username - The user's username to get the user's schedule.
 * @returns {String} validDate - The formatted date (e.g., December 31, 1999) validated with the user's schedule.
 */
const formatDate = async (date, username) => {
    // Format the date string.
    // Parse the string and convert it to a timestamp
    const timestamp = Date.parse(date);

    // Create a new Date object from the timestamp
    const dateObject = new Date(timestamp);

    // Get the formatted date string
    const formattedDate = dateObject.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

    // What is the formatted date string?
    console.log('Formatted date:', formattedDate);

    // Get the user's information.
    const { userCollection } = await require('../../config/databaseConnection');

    console.log('Username:', username);

    // Checks if the AI-generated date matches the user's saved schedule date. If no match, add stages to the pipeline to find the closest date and use that.
    const userSchedule = await userCollection.aggregate([
        {
            $match: {
                name: username,
                availabilityData: {
                    $exists: true,
                    $not: { $size: 0 }
                }
            }
        },
        {
            $unwind: "$availabilityData"
        },
        {
            $addFields: {
                dateDifference: {
                    $abs: {
                        $subtract: [
                            { $toDate: "$availabilityData.date" }, // Convert the string date to a Date object
                            dateObject
                        ]
                    }
                }
            }
        },
        {
            $sort: { dateDifference: 1 }
        },
        {
            $limit: 1
        },
        {
            $project: {
                dateDifference: 0
            }
        }
    ]).toArray();


    // What is the user's schedule?
    console.log('Schedule:', userSchedule);

    // If the user's schedule is empty, then throw an error.
    if (userSchedule.length === 0) {
        throw new Error('User schedule is empty.');
    }

    // If the user's schedule is not empty, then get the date.
    const validDate = await userSchedule[0].availabilityData.date;

    // What is the user's date?
    console.log('User date matched in DB:', validDate);

    // If the user's date does not match the AI-generated date, return the user's date that was the closest match.
    if (validDate !== formattedDate) {
        console.log('User date does not match AI-generated date.');
    };

    // Return the formatted date string.
    return validDate;
};


/**
 * Make sure the day of the week is written fully and correctly for the AI-generated JSON object.
 * 
 * @param {String} dayOfWeek - The day of the week to validate for the AI-generated day of week. 
 * @param {String} date - The AI's recall of the user's saved schedule date (e.g., May 19, 2023) to validate with the AI-generated day of week.
 * @returns {String} checkedDayOfWeek - The day of the week that was validated for the AI-generated JSON object.
 */
const validateDayOfWeek = async (dayOfWeek, date) => {
    // Check the day of the of the week.
    const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

    // If the statement contains a day of the week, then it is a date. Assign null if no day is found.
    checkedDayOfWeek = daysOfWeek.find(element => element.includes(dayOfWeek.toLowerCase().trim())) || null;

    // What is the checked day of the week?
    console.log('Checked day of week:', checkedDayOfWeek);

    // If null, return to route (try/catch should in route should apply error handling).
    if (checkedDayOfWeek === null) {
        throw new Error('Invalid value for ', checkedDayOfWeek);
    }

    // What is the date?
    console.log('Date:', date);

    // Check if the day of the week matches the date.
    const dateObject = new Date(date);

    // Get the weekday from the AI-generated date.
    const calculatedDayOfWeek = dateObject.toLocaleDateString('en-US', { weekday: 'long' });

    // What is the weekday?
    console.log('Weekday:', calculatedDayOfWeek);

    // If the AI-generated day of week does not match the day of week calculated from the AI-generated date, then return the day of week calculated from the AI-generated date.
    if (checkedDayOfWeek.toLowerCase().trim() !== calculatedDayOfWeek.toLowerCase()) {
        // AI did not match the day of week to the date. Resort to the user's saved date.
        console.log('Resort to the calculated day of week.');
        return calculatedDayOfWeek;
    } else {
        // Return the checked day of week.
        console.log('Return the checked day of week.');
        return calculatedDayOfWeek;
    }
};


/**
 * Checks if the AI-generated exercise name matches an exercise in the database. If so, then return the DB exercise name. Else, return call <PLACEHOLDER> to return AI-generated alternative exercises.
 * 
 * @param {String} exerciseName - The name of the AI-generated exercise to match to a DB exercise.
 * @returns Object matchedExerciseObject - The DB exercise object that was matched with all Kaggle dataset attributes.
 */
const matchExercise = async (exercise) => {
    let regexExerciseNameWithoutDash;

    // Convert the exercise name to lowercase and trim whitespace.
    exerciseName = exercise.toLowerCase().trim();

    // Load modules below.
    const { exerciseCollection } = await require('../../config/databaseConnection');
    let matchedExercise;

    // What is the exercise name?
    console.log('Exercise name:', exerciseName);

    // Create regex object to perform a case-insensitive search and match exercise names that can be plural, singular, or part of a larger string.
    const regexExerciseName = new RegExp(exerciseName.replace(/s$|es$|'s$/i, ""));
    
    // What is the regex exercise name?
    console.log('Regex exercise name:', regexExerciseName);

    // Use regex in the MongoDB query to perform a case-insensitive search and match exercise names that can be plural, singular, or part of a larger string.
    // @credit https://docs.mongodb.com/manual/reference/operator/query/regex/
    const exerciseNameWithoutDash = exerciseName.includes('-')
        ? exerciseName.replace('-', ' ')
        : null;

    if (exerciseNameWithoutDash) {
        // Create regex object for exercise name without dash
        regexExerciseNameWithoutDash = new RegExp(exerciseNameWithoutDash.replace(/s$|es$|'s$/i, ""));
        // What is the exercise name without a dash?
        console.log('Exercise name without dash:', exerciseNameWithoutDash);
    }

    // What is the regex exercise name without a dash?
    console.log('Regex exercise name without dash:', regexExerciseNameWithoutDash);

    // Find the exercise in the database.
    if (regexExerciseNameWithoutDash) {
        // If there was an exercise name formatted without a dash, then find the exercise in the database using the formatted exercise name with and without a dash.
        matchedExercise = await exerciseCollection.find({
            $or: [
                { name: regexExerciseName },
                { name: regexExerciseNameWithoutDash }
            ]
        }).project({ name: 1, id: 1, bodyPart: 1, target: 1, equipment: 1, gifUrl: 1, instructions: 1 }).limit(1).toArray();
    } else {
        // If there was no exercise name formatted without a dash, then just find the exercise in the database using the formatted exercise name.
        matchedExercise = await exerciseCollection.find({ name: regexExerciseName }).project({ name: 1, id: 1, bodyPart: 1, target: 1, equipment: 1, gifUrl: 1, instructions: 1 }).limit(1).toArray();
    }

    // If the exercise name is not in the database, then check the AI-generated suggestions that are formatted in formatAlternateRoutine.js
    if (matchedExercise.length === undefined) {
        // Call formatAlternateRoutine.js
        // MDs model here to return AI-generated alternative exercises.
        // PLACEHOLDER
        // PLACEHOLDER
        // PLACEHOLDER
        // PLACEHOLDER
        console.log('No match. Call formatAlternateRoutine.js');

        // Throw error to return to the route. Remove this line when the AI model is ready.
        // throw new Error('Invalid value for ', matchedExercise);

    } else {
        // What is the matched exercise?
        console.log('Match found in database.');

        // What is the length of the matched exercise array?
        console.log('Matched exercise array length:', matchedExercise.length);

        const matchedExerciseObject = matchedExercise[0];

        // Return the array of matched exercise object.
        return matchedExerciseObject;
    }
};


/**
 * MAIN Driver function. Dependent function formats the response from the OpenAI API call into a routine array containing individual exercise objects with attributes (e.g., exerciseName, intensity, date, etc.).
 * 
 * @param {Array} summary - The array summary returned from the OpenAI API call. 
 * @returns {Array} routine - The array of exercise objects with attributes (e.g., exerciseName, intensity, date, etc.).
 */
const formatValidate = (summary, username) => {
  return new Promise(async (resolve, reject) => {
    let jsonArray = [];
    let routine = [];

    try {
      if (typeof summary !== 'string') {
        throw new Error('Invalid value for summary');
      } else {
        jsonArray = JSON.parse(summary);
      }

      for (const statement of jsonArray) {
        let jsonObject = statement;

        if (!isValidExerciseObject(jsonObject)) {
          throw new Error('Invalid value for ' + JSON.stringify(jsonObject));
        }

        const date = jsonObject.date;
        const formattedDate = await formatDate(date, username);
        const dayOfWeek = await validateDayOfWeek(jsonObject.dayOfWeek, formattedDate);
        const matchedExercise = await matchExercise(jsonObject.exerciseName);
        const intensity = jsonObject.intensity;
        let exercise = {};

        // !matchedExercise.isArray()
        if (typeof matchedExercise === 'undefined') {
            console.log('No exercise found.');
            break;
        }

        exercise = {
            exerciseName: matchedExercise.name,
            exerciseId: matchedExercise.id,
            exerciseAnimation: matchedExercise.gifUrl,
            exerciseBodyPart: matchedExercise.bodyPart,
            exerciseTarget: matchedExercise.target,
            exerciseInstructions: matchedExercise.instructions,
            intensity: intensity,
            day: dayOfWeek,
            date: formattedDate,
          };
          
        routine.push(exercise);
        console.log('Exercise object added to routine array.', routine);
        if (routine.length === jsonArray.length) {
          resolve(routine);
        }            
      }
    } catch (error) {
      console.error('Invalid JSON:', error);
      reject(error);
    }
  });
};


module.exports = formatValidate;


const matchSuggestedExercise = async (exercise, prefix) => {
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
        }).project({ name: 1, id: 1, bodyPart: 1, target: 1, equipment: 1, gifUrl: 1, instructions: 1 }).toArray(); //.limit(1).toArray();
    } else {
        // If there was no exercise name formatted without a dash, then just find the exercise in the database using the formatted exercise name.
        matchedExercise = await exerciseCollection.find({ name: regexExerciseName }).project({ name: 1, id: 1, bodyPart: 1, target: 1, equipment: 1, gifUrl: 1, instructions: 1 }).toArray();
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

    } else if (matchedExercise.length === 0) {
        console.log('No match. Skipping exercise...');
    } else {
        // What is the matched exercise?
        console.log('Match found in database.');

        // What is the length of the matched exercise array?
        console.log('Matched exercise array length:', matchedExercise.length);

        const matchedExerciseObject = await chooseSuggestedExerciseFromDbMatches(matchedExercise, prefix); //matchedExercise[0];

        console.log('Mathced exercise (inside match): ' + matchedExerciseObject);

        if (matchedExerciseObject === null) {
            console.log('No match!!!');
            // if AI fails to match, get a random exercise from DB matches
            return matchedExercise[Math.floor(Math.random() * matchedExercise.length)];
        }
        // Return the array of matched exercise object.
        return matchedExerciseObject;
    }
};


const chooseSuggestedExerciseFromDbMatches = async (exerciseObjectArray, prefix) => {
    const openai = require('../../config/openaiConnection');

    console.log('First exercise match: ' + exerciseObjectArray[0].name);
    // for (let i = 0; i < exerciseArray[0].keys.length; i++) {
    //     console.log(exerciseArray[0].keys[i]);
    // }
    
    exerciseArray = exerciseObjectArray.map(exercise => exercise.name);

    console.log(exerciseArray);

    var singleExercisePrompt = prefix + `I need to include one
        exercise from this list in my fitness routine:\n${exerciseArray.join()}\nYour response should only be the name of one
        exercise in the list, spelled exactly as it appears in the list. The exercise I should include is:`

    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: singleExercisePrompt,
            temperature: 0.5,
        });
        var summary = response.data.choices[0].text;
        console.log('Matched exercise (inside DB): ' + summary);
        summary = summary.replace(/\.$/, '').toLowerCase().trim();
        console.log(summary);
        if (exerciseArray.includes(summary)) {
            console.log('in array!');
            let idx = exerciseArray.indexOf(summary);
            return exerciseObjectArray[idx];
        } else {
            return null;
        };

    } catch (error) {
        console.log(error);
        return undefined;
    };
}

module.exports = matchSuggestedExercise;

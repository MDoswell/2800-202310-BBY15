const { router } = require('../config/dependencies');
const matchSuggestedExercise = require('../public/js/matchSuggested');
const getRoutine = require('../public/js/getRoutine');
const openai = require('../config/openaiConnection');


// Route below to suggest exercises.
router.post('/suggestExercises', async (req, res) => {
    console.log('In suggestExercises route.');
    const username = req.body.name;
    const exerciseToReplace = req.body.exerciseName;

    // Generate the array of suggested exercises.
    // const newExercise = await generateNewExercise(username, exerciseToReplace);
    // Get the user's routine from the database.
    const userRoutine = await getRoutine(username);

    console.log('User routine in generateNewExercise:', userRoutine);

    // Get the user's routine.
    const exerciseNamesArray = userRoutine.map(exercise => exercise.exerciseName);
    console.log('Exercise names:', exerciseNamesArray);

    const newExercisePrompt = `Suggest at least 10 alternative exercises so that I can replace ${exerciseToReplace} in my fitness routine:\n${exerciseNamesArray.join('\n')}\nYour response should not repeat any of the exercises in my fitness routine and should only be the "name" of each exercise and "intensity" of each exercise such as reps and sets.`;

    const jsonPrompt = `Given the article below, create a JSON object which enumerates a set of at least 10 child objects.                       
    Each child object has 2 properties: "exerciseName" and "intensity". For "exerciseName", assign the name of the exercise. For "intensity", assign the intensity of the exercise such as number of reps and sets.
    The resulting JSON object should be in this format: [{"exerciseName":"String","intensity":"String"}].\n\n
    The article:\n
    ${newExercisePrompt}\n\n
    The JSON object:\n\n`;

    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: jsonPrompt,
            max_tokens: 2000,
            temperature: 0
        });

        console.log('What is the response?', response.data)

        const summary = response.data.choices[0].text.trim();

        console.log('What is the summary?', summary);

        const parsedSummary = JSON.parse(summary);

        console.log('What is the parsed summary?', parsedSummary);
        
        const filteredSummary = parsedSummary.filter(newExercise => !exerciseNamesArray.includes(newExercise.exerciseName));

        console.log('What is the filtered summary?', filteredSummary);

        const prefix = `I am a fitness beginner. `;

        let alternateExercises = [];

        // Create a for loop and call matchExercise for each exercise in the summaryNamesArray.
        // If matchExercise returns null, call chooseExerciseFromDbMatches.
        for (let i = 0; i < filteredSummary.length; i++) {
            // Create the exercise object 
            let matchedExercise = await matchSuggestedExercise(filteredSummary[i].exerciseName, prefix);

            if (matchedExercise !== null && matchedExercise !== undefined) {
                // Add the intensity to the exercise object.
                matchedExercise.intensity = filteredSummary[i].intensity;

                // Add the exercise object to the alternateExercises array.
                alternateExercises.push(matchedExercise);
            }
        };

        console.log('alternateExercises:', alternateExercises);

        // Return the summary.
        res.send(alternateExercises);

    } catch (error) {
        console.log(error);
        return undefined;
    };
});

// try {
//     const { exerciseName, name } = req.body;

//     // Call generateNewExercise function passing the necessary parameters
//     const newExercises = await generateNewExercise(name, exerciseName);

//     // Handle the newExercises response and send it back to the client
//     res.json(newExercises);
// } catch (error) {
//     // Handle any errors that occurred during the process
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
// }
// });

module.exports = router;
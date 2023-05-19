// // Formats the response from the OpenAI API call into a routine array containing individual exercise objects with attributes (e.g., date, intensity, etc.)
// const formatRoutine = async (summary) => {
//     // Load modules below.
//     const { exerciseCollection } = await require('../../config/databaseConnection');

//     console.log('What is the summary? ' + summary);

//     // Initialise variables below.
//     let foundDayofWeek;
//     let foundMonth;
//     let currentDate;
//     let currentYear;
//     let foundYear;
//     let foundDate;
//     let exerciseName;
//     let intensity;
//     let exerciseNameWithoutDash;
//     let regexExerciseName;
//     let regexExerciseNameWithoutDash;
//     let matchedExercise; // The database exercise object
//     let exercise; // The formatted exercise object to be added to the routine array
//     let routine = []; // Routine array to contain formatted exercise objects

//     summary = summary.replace(/\n/g, ' ');

//     // Formats the response from the OpenAI API call to remove numbered and hyphen bullet points from the start of each statement.
//     let statements = summary.split('\n'); // Split the summary by newline character

//     // Remove numbered and hyphen bullet points from start of each statement.
//     statements = statements.map(statement => {
//         // Matches numbered bullet points and hyphen bullet points at the start of each line.
//         const regex = /^\s*(?:\d+\.|-)\s*/g;
//         return statement.trim().replace(regex, '').trim();
//     })

//     // Filter out statements that are empty or contain the word 'summary:' or 'summary'.
//     statements = statements.filter(statement => statement.trim() !== '' && !statement.toLowerCase().trim().includes('summary:') && !statement.toLowerCase().trim().includes('summary'));

//     const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
//     const daysOfWeekAbbreviated = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
//     const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july',
//         'august', 'september', 'october', 'november', 'december'];
//     const monthsAbbreviated = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul',
//         'aug', 'sep', 'oct', 'nov', 'dec'];

//     // What does the response look like in the array?
//     console.log('How does the response look in the array?\n' + statements);

//     // For each statement, determine if it is a date or an exercise.
//     for (const statement of statements) {
//         const lowerCaseStatement = statement.toLowerCase().trim();

//         // If the statement contains a day of the week, then it is a date. Assign null if no day is found.
//         if (daysOfWeek.some(day => lowerCaseStatement.includes(day || day + ':')) || daysOfWeekAbbreviated.some(day => lowerCaseStatement.includes(day || day + ':'))) {
//             // Assign the day of the week to the foundDayofWeek variable.
//             foundDayofWeek = daysOfWeek.find(day => lowerCaseStatement.includes(day || day + ':')) || daysOfWeekAbbreviated.find(day => lowerCaseStatement.includes(day || day + ':')) || null;

//             foundDayofWeek = foundDayofWeek.trim();

//             // What is the day of the week?
//             console.log('Found day of week: ' + foundDayofWeek);
//         }

//         // If the statement contains a month, then it is a date. Assign null if no month is found.
//         if (months.find(month => lowerCaseStatement.includes(month)) || monthsAbbreviated.find(month => lowerCaseStatement.includes(month))) {
//             // Assign the month to the foundMonth variable.
//             foundMonth = months.find(month => lowerCaseStatement.includes(month)) || monthsAbbreviated.find(month => lowerCaseStatement.includes(month)) || null;
//             foundMonth = foundMonth.trim();

//             // What is the month?
//             console.log('Found month: ' + foundMonth);

//             // Days (1 - 31) are after the month, and usually separated by whitespace or dash so assume the statement contains a day, then it is a date. Assign null if no day is found.
//             // Replace all non-numeric characters with whitespace, trim whitespace, split by whitespace, filter out numbers that are not between 1 and 31.
//             // @credit https://www.tutorialspoint.com/extract-a-number-from-a-string-using-javascript 
//             let foundDayOfMonth = lowerCaseStatement.replace(/[^0-9]/g, " ").trim().split(' ').filter(day => day >= 1 && day <= 31); // No need to trim whitespace as the regex already does this.

//             // What is the day of the month?
//             console.log('Found day of month: ' + foundDayOfMonth);

//             // If the statement contains a year, then it is a date. Assign null if no year is found.
//             currentDate = new Date();
//             currentYear = currentDate.getFullYear().toString();
//             foundYear = lowerCaseStatement.includes(currentYear || currentYear + ':') ? currentYear : null;
//             foundYear = foundYear.trim();

//             // What is the year?
//             console.log('Found year: ' + foundYear);

//             // If the statement contains a day of the week and a month, then it is a complete date. Assign null if no day or month or year is found.
//             foundDate = foundDayofWeek && foundMonth && foundDayOfMonth && foundYear ? `${foundMonth} ${foundDayOfMonth}, ${foundYear}` : null;

//             foundDate = foundDate.trim();

//             // What is the date?
//             console.log('Found date: ' + foundDate);
//         }

//         // If the statement contains a colon and is not part of a day of week or date, then it is an exercise name.
//         if (lowerCaseStatement.includes(':') && (!lowerCaseStatement.includes(foundDayofWeek + ':') && (!lowerCaseStatement.includes(currentYear + ':')))) {
//             [exerciseName, intensity] = lowerCaseStatement.split(':');

//             exerciseName = exerciseName.trim();
//             intensity = intensity.trim();

//             // What is the exercise name?
//             console.log('\nExercise name: ' + exerciseName);

//             // What is the intensity?
//             console.log('Intensity: ' + intensity);

//             // if the exercise name contains a dash, create a variable with the name and another variable with the name but without a dash.
//             if (exerciseName.includes('-')) {
//                 exerciseNameWithoutDash = exerciseName.replace('-', ' ');

//                 // Create regex object to perform a case-insensitive search and match exercise names that can be plural, singular, or part of a larger string.
//                 regexExerciseNameWithoutDash = new RegExp(exerciseNameWithoutDash.replace(/s$|es$|'s$/i, ""));

//                 // What is the exercise name without a dash?
//                 console.log('Exercise name without dash: ' + exerciseNameWithoutDash);
//             }

//             // Use regex in the MongoDB query to perform a case-insensitive search and match exercise names that can be plural, singular, or part of a larger string.
//             // @credit https://docs.mongodb.com/manual/reference/operator/query/regex/
//             regexExerciseName = new RegExp(exerciseName.replace(/s$|es$|'s$/i, ""));

//             console.log('\nregexExerciseName name: ' + regexExerciseName);
//             console.log('regexExerciseNameWithoutDash name: ' + regexExerciseNameWithoutDash + '\n');

//             // If there was no exercise name formatted without a dash, then just find the exercise in the database using the without checking for either or.
//             if (regexExerciseNameWithoutDash === undefined) {
//                 // Find the exercise in the database.
//                 matchedExercise = await exerciseCollection.find({ name: { $regex: regexExerciseName } }).project({ name: 1, id: 1, bodyPart: 1, target: 1, equipment: 1, gifUrl: 1, instructions: 1 }).limit(1).toArray();

//             } else {
//                 // Find the exercise in the database.
//                 matchedExercise = await exerciseCollection.find({
//                     $or: [
//                         { name: { $regex: regexExerciseName } },
//                         { name: { $regex: regexExerciseNameWithoutDash } }
//                     ]
//                 }).project({ name: 1, id: 1, bodyPart: 1, target: 1, equipment: 1, gifUrl: 1, instructions: 1 }).limit(1).toArray();
//             }

//             // If the exercise name is not in the database, then check the AI-generated suggestions that are formatted in formatAlternateRoutine.js
//             if (matchedExercise.length === 0) {
//                 // Call formatAlternateRoutine.js
//                 // MDs model here to return AI-generated alternative exercises.
//                 // PLACEHOLDER
//                 // PLACEHOLDER
//                 // PLACEHOLDER
//                 // PLACEHOLDER
//                 console.log('No match. Call formatAlternateRoutine.js');
//             } else {
//                 console.log('Match found in database.');
//                 exercise = {};

//                 // Else, the exercise name is in the database, so add the exercise object to the routine array.
//                 console.log('Matched name: ' + matchedExercise[0].name);
//                 exercise.exerciseName = matchedExercise[0].name;

//                 console.log('Matched id: ' + matchedExercise[0].id)
//                 exercise.exerciseId = matchedExercise[0].id;

//                 console.log('Reps: ' + intensity);
//                 exercise.intensity = intensity;

//                 console.log('Day of week: ' + foundDayofWeek);
//                 exercise.day = foundDayofWeek;

//                 console.log('Scheduled date: ' + foundDate);
//                 exercise.date = foundDate;

//                 // Check if any of the exercise object properties are null.
//                 // Only break at the last case (exercise.date) to not execute 'default' case.
//                 switch (exercise) {
//                     case exercise.exerciseName.includes(null):
//                         console.log('No exercise name found.');

//                     case exercise.exerciseId.includes(null):
//                         console.log('No exercise id found.');

//                     case exercise.intensity.includes(null):
//                         console.log('No intensity found.');

//                     case exercise.day.includes(null):
//                         console.log('No day found.');

//                     case exercise.date.includes(null):
//                         console.log('No date found.');
//                         break;

//                     default:
//                         console.log('Exercise object created.');
                        
//                         // Add the newly created exercise object to the routine array.
//                         routine.push(exercise);

//                         // Reset the regexExerciseNameWithoutDash variable.
//                         regexExerciseNameWithoutDash = undefined;
//                 }
//             }
//         }
//     }

//     // What were the statements?
//     console.log('\nWhat were the statements?\n' + statements);

//     // Return the routine array containing exercise objects.
//     return routine;
// };

// module.exports = formatRoutine;
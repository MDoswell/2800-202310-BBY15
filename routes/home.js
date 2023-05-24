// Load modules below.
const { router } = require('../config/dependencies');
// const fillEmptyDays = require('../public/js/fillEmptyDays');
const getAvailability = require('../public/js/getAvailability');
const getRoutine = require('../public/js/getRoutine');
const getRoutineTemplate = require('../public/js/getRoutineTemplate');

// Route below.
router.get('/', async (req, res) => {
    const { userCollection, exerciseCollection } = await require('../config/databaseConnection');
    const username = req.session.name;
    // const thisUser = userCollection.findOne({ name: username });
    var userRoutine = await getRoutine(username);
    const userAvailability = await getAvailability(username);
    const routineTemplate = await getRoutineTemplate(username);
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    if (req.session.authenticated) {
        if (userRoutine != null) {
            const uniqueDates = Array.from(new Set(userAvailability.map(exercise => exercise.date))).sort((a, b) => {
                return new Date(a) - new Date(b);
            });
            console.log(uniqueDates);

            console.log('template null: ', routineTemplate == null);
            if (routineTemplate == null) {
                let newRoutineTemplate = [];
                uniqueDates.forEach((date, idx) => {
                    console.log(date);
                    userRoutine.forEach(exercise => {
                        if (exercise.date == date) {
                            console.log(exercise.exerciseName)
                            let templateExercise = { ...exercise };
                            templateExercise.routineDay = idx;
                            console.log(templateExercise.routineDay);
                            newRoutineTemplate.push(templateExercise);
                        }
                    });
                })

                await userCollection.findOneAndUpdate(
                    { name: username },
                    { $set: { routineTemplate: newRoutineTemplate } }
                )
            }

            // var routineDays = [];
            // var missingDays = [];
            // var lastRoutineDate;
            // var lastRoutineDay;
            // uniqueDates.forEach(date => {
            //     // console.log(date);
            //     let inRoutine = userRoutine.some(exercise => {
            //         return exercise.date === date;
            //     });
            //     if (inRoutine) {
            //         console.log('in routine');
            //         lastRoutineDate = date;
            //         routineDays.push(date);
            //     } else {
            //         missingDays.push(date);
            //     }
            // });

            // userRoutine.some(exercise => {
            //     if (exercise.date == lastRoutineDate) {
            //         lastRoutineDay = exercise.routineDay;
            //         return true;
            //     } else {
            //         return false;
            //     }
            // })

            // console.log('last date: ', lastRoutineDate);
            // console.log('last day: ', lastRoutineDay);

            // if (userRoutine.some(exercise => {
            //     return exercise.routineDay == null;
            // })) {
            //     console.log('adding routine days')
            //     for (let i = 0; i < routineDays.length; i++) {
            //         let exercises = userRoutine.filter(exercise => {
            //             return exercise.date == routineDays[i];
            //         })

            //         for (let j = 0; j < exercises.length; j++) {
            //             console.log(exercises[j].exerciseName);
            //             await userCollection.findOneAndUpdate(
            //                 { name: username, 'routine.exerciseName': exercises[j].exerciseName },
            //                 {
            //                     $set: {
            //                         'routine.$.routineDay': i
            //                     }
            //                 })
            //         }
            //     }
            // }

            // console.log(missingDays);

            // if (missingDays.length > 0) {
            //     console.log('missing length: ', missingDays.length);
            //     var fillInExercises = [];
            //     missingDays.forEach((day, idx) => {
            //         let fullDate = new Date(day);
            //         let uniqueRoutineDays = [];
            //         userRoutine.forEach(exercise => {
            //             if (!uniqueRoutineDays.includes(exercise.routineDay)) {
            //                 uniqueRoutineDays.push(exercise.routineDay)
            //             }
            //         }) 
            //         console.log('num routine days: ', uniqueRoutineDays.length)
            //         let routineDay = (lastRoutineDay + 1 + idx) % uniqueRoutineDays.length;
            //         console.log('next routine day: ', routineDay);
            //         let includedNames = [];
            //         let exercises = userRoutine.filter(exercise => {
            //             if (exercise.routineDay == routineDay && !includedNames.includes(exercise.exerciseName)) {
            //                 includedNames.push(exercise.exerciseName);
            //                 return true;
            //             } else {
            //                 return false;
            //             }
            //         })
            //         exercises.forEach(routineExercise => {
            //             let exercise = { ...routineExercise };
            //             console.log(exercise.exerciseName);
            //             exercise.date = day;
            //             exercise.day = daysOfWeek[fullDate.getDay()];
            //             fillInExercises.push(exercise);
            //         })
            //     });

            //     // console.log(fillInExercises);

            //     if (fillInExercises.length > 0) {
            //         console.log('days to fill');
            //         console.log('fillin length: ', fillInExercises.length);
            //         userRoutine = userRoutine.concat(fillInExercises);
            //         userCollection.findOneAndUpdate(
            //             { name: username },
            //             { $push: { routine: { $each: fillInExercises } } }
            //         )
            //     }
            // }



            // const today = new Date('May 24, 2023'); 
            var today = new Date(Date.now());
            // today.setHours(today.getHours() - today.getTimezoneOffset() / 60);
            let cardContent;
            let dayCards = '';

            // For each unique day, create a card of exercises for that day.
            uniqueDates.map(date => {
                var fullDate = new Date(date);
                if (fullDate < today && fullDate.getDate() < today.getDate()) {
                    return;
                }
                var day = '';
                // Filter the user's routine for the current day.
                const exercisesForDay = userRoutine.filter(exercise => exercise.date === date);

                // For each exercise in the user's routine for the current day, create a card.

                cardContent = exercisesForDay.map(exercise => {
                    // var exerciseDetails;
                    // exerciseDetails = await exerciseCollection.findOne(
                    //     { id: exercise.id },
                    //     { projection: { name: 1, bodyPart: 1, target: 1, gifUrl: 1, instructions: 1 } }).then(console.log(this));
                    // console.log('details: ' + exerciseDetails);
                    if (day === '') {
                        day = exercise.day;
                    }

                    const formatExerciseName = exercise.exerciseName.slice(0, 1).toUpperCase() + exercise.exerciseName.slice(1).toLowerCase();
                    const formatExerciseTarget = exercise.exerciseBodyPart.slice(0, 1).toUpperCase()
                        + exercise.exerciseBodyPart.slice(1).toLowerCase()
                        + ' - '
                        + exercise.exerciseTarget.slice(0, 1).toUpperCase()
                        + exercise.exerciseTarget.slice(1).toLowerCase();

                    // Create a card and modal for the current exercise.
                    return `<div class='exercise-card' exerciseName='${formatExerciseName}' exerciseTarget='${formatExerciseTarget}' 
                                exerciseIntensity='${exercise.intensity}' exerciseAnimation='${exercise.exerciseAnimation}' 
                                exerciseInstructions='${exercise.exerciseInstructions}'>
                                <div class='exercise-content'>
                                    <h4 class='exercise-title' id='${formatExerciseName}'>${formatExerciseName}</h3>
                                    <p class='exercise-intensity' id='${formatExerciseName}-intensity'>${exercise.intensity}</p>
                                    <a href="#" class="info-link" data-toggle="modal" data-target="#exerciseModal">
                                        More info
                                    </a>
                                </div>
                            </div>
                            `;
                });

                // Join the cards for the current day into a single card. Add each day card to the dayCards String.
                dayCards +=
                    `<div class='day-card' id='${day}-card'>
                        <h3 class='day-title' id='${day}-title'>${day}</h2>
                        <h5 class='date-title' id='${day}-date-title'>${date}</h5>
                        ${cardContent.join('')}
                    </div>`;
            });
            res.render("index_validSession", { dayCards: dayCards, name: username });

        } else {
            res.render("setup");
        }

    } else {
        res.render("index_invalidSession");
    };
});

module.exports = router;
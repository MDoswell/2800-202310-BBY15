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


            // Check that first time setup complete (routine days added)
            if (userRoutine.some(exercise => {
                return exercise.routineDay == null;
            })) {
                console.log('adding routine days')
                var uniqueDates = [];
                userRoutine.forEach(exercise => {
                    if (!uniqueDates.includes(exercise.date)) {
                        console.log(exercise.date);
                        uniqueDates.push(exercise.date);
                    }
                });

                uniqueDates = uniqueDates.sort((a, b) => {
                    return new Date(a) - new Date(b);
                });

                console.log(uniqueDates);

                let dayNum = 0;
                uniqueDates.forEach(date => {
                    userRoutine.forEach(async exercise => {
                        if (exercise.date == date && exercise.routineDay == null) {
                            console.log(exercise);
                            exercise.routineDay = dayNum;
                            await userCollection.findOneAndUpdate(
                                { name: username, 'routine.exerciseName': exercise.exerciseName },
                                {
                                    $set: {
                                        'routine.$.routineDay': dayNum
                                    }
                                })
                        }
                    })
                    dayNum++;
                });



                // for (let i = 0; i < routineDays.length; i++) {
                //     let exercises = userRoutine.filter(exercise => {
                //         return exercise.date == routineDays[i];
                //     })

                //     for (let j = 0; j < exercises.length; j++) {
                //         console.log(exercises[j].exerciseName);
                //         await userCollection.findOneAndUpdate(
                //             { name: username, 'routine.exerciseName': exercises[j].exerciseName },
                //             {
                //                 $set: {
                //                     'routine.$.routineDay': i
                //                 }
                //             })
                //     }
                // }
            }

            // Check that workouts complete exists
            var workoutsComplete = await userCollection.find({ name: { $eq: username } }).project({ workoutsComplete: 1 }).toArray();
            workoutsComplete = workoutsComplete[0].workoutsComplete;
            console.log('workoutsComplete: ', workoutsComplete);
            if (workoutsComplete == null) {
                console.log('is null');
                workoutsComplete = 0;
                await userCollection.findOneAndUpdate(
                    { name: username },
                    { $set: { workoutsComplete: workoutsComplete } }
                )
            }

            // Check for passed days and update workout complete
            var availabilities = await getAvailability(username);
            // console.log(availabilities);
            // const today = new Date('May 24, 2023'); 
            var today = new Date(Date.now());
            today.setHours(today.getHours() - today.getTimezoneOffset() / 60);
            console.log(today);

            var newAvailabilities = [];
            availabilities.forEach(date => {
                // console.log(date.date)
                var fullDate = new Date(date.date);
                console.log(fullDate.toDateString());
                // console.log(fullDate >= today)
                // console.log(fullDate.toDateString() == today.toDateString())
                if (fullDate > today || fullDate.toDateString() == today.toDateString()) {
                    console.log('in')
                    newAvailabilities.push(date);
                } else {
                    console.log('passed')
                    workoutsComplete++;
                }
            });
            // console.log(newAvailabilities)
            console.log('workoutsComplete:', workoutsComplete);
            await userCollection.findOneAndUpdate(
                { name: username },
                { $set: { availabilityData: newAvailabilities, workoutsComplete: workoutsComplete } }
            )
            // console.log(test);



            // Populate days in availability using routine days, starting from workoutsComplete % numRoutineDays
            // var newAvail = await getAvailability(username);
            // console.log(newAvail);

            // const uniqueDates = Array.from(new Set(newAvail.map(avail => avail.date))).sort((a, b) => {
            //     return new Date(a) - new Date(b);
            // });
            // console.log(uniqueDates);

            var routineDays = [];
            userRoutine.forEach(exercise => {
                if (!routineDays.includes(exercise.routineDay)) {
                    console.log('new routine day')
                    routineDays.push(exercise.routineDay)
                }
            })

            newAvailabilities = newAvailabilities.sort((a, b) => {
                return new Date(a.date) - new Date(b.date);
            });

            let cardContent;
            let dayCards = '';
            var workoutNum = workoutsComplete;
            var routineDay;

            // For each unique day, create a card of exercises for that day.
            newAvailabilities.forEach(availability => {
                console.log(availability.date);
                console.log('routine day:', workoutNum % routineDays.length)
                routineDay = workoutNum % routineDays.length;
                workoutNum++;

                // Filter the user's routine for the current day.
                const exercisesForDay = userRoutine.filter(exercise => exercise.routineDay === routineDay);

                if (exercisesForDay.length == 0) {
                    return;
                }

                // For each exercise in the user's routine for the current day, create a card.

                cardContent = exercisesForDay.map(exercise => {

                    // var exerciseDetails;
                    // exerciseDetails = await exerciseCollection.findOne(
                    //     { id: exercise.id },
                    //     { projection: { name: 1, bodyPart: 1, target: 1, gifUrl: 1, instructions: 1 } }).then(console.log(this));
                    // console.log('details: ' + exerciseDetails);


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
                                    <div class='d-flex justify-content-between align-items-start'>
                                        <h3 class='exercise-title' id='${formatExerciseName}'>${formatExerciseName}</h3>
                                        <a href="#" class="info-link" data-toggle="modal" data-target="#exerciseModal">
                                            <i class="material-icons">more_horiz</i>
                                        </a>
                                    </div>
                                    <p class='exercise-intensity' id='${formatExerciseName}-intensity'>${exercise.intensity}</p>
                                    <div class="cardControls" class="pt-3">
                                        <button class="btn btn-primary replaceExerciseButton" data-exercise-name='${exercise.exerciseName}'>Replace</button>
                                        <button class="btn btn-danger deleteExerciseButton" data-exercise-name='${exercise.exerciseName}'>Delete</button>
                                    </div>
                                    <div class='hideMenuButton'><span class='arrow'><span></span><span></span></span></div>
                                </div>
                            </div>
                            `;
                });

                // Join the cards for the current day into a single card. Add each day card to the dayCards String.
                dayCards +=
                    `<div class='day-card' id='${availability.dayOfWeek}-card'>
                        <h3 class='day-title' id='${availability.dayOfWeek}-title'>${availability.dayOfWeek}</h2>
                        <h5 class='date-title' id='${availability.dayOfWeek}-date-title'>${availability.date}</h5>
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
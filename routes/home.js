// Load modules below.
const { router } = require('../config/dependencies');
// const fillEmptyDays = require('../public/js/fillEmptyDays');
const getAvailability = require('../public/js/getAvailability');
const getRoutine = require('../public/js/getRoutine');

// Route below.
router.get('/', async (req, res) => {
    const { userCollection, exerciseCollection } = await require('../config/databaseConnection');
    const username = req.session.name;
    var userRoutine = await getRoutine(username);
    const userAvailability = await getAvailability(username);

    if (req.session.authenticated) {
        if (userRoutine != null && userAvailability != null) {

            // Check that first time setup complete (routine days added)
            if (userRoutine.some(exercise => {
                return exercise.routineDay == null;
            })) {
                console.log('adding routine days')
                var uniqueDates = [];
                userRoutine.forEach(exercise => {
                    if (!uniqueDates.includes(exercise.date)) {
                        uniqueDates.push(exercise.date);
                    }
                });

                uniqueDates = uniqueDates.sort((a, b) => {
                    return new Date(a) - new Date(b);
                });

                // Add routine days to exercise and update database.
                let dayNum = 0;
                uniqueDates.forEach(date => {
                    userRoutine.forEach(async exercise => {
                        if (exercise.date == date && exercise.routineDay == null) {
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
            }

            // Check that workouts complete exists in database. If not, initialize to 0
            var workoutsComplete = await userCollection.find({ name: { $eq: username } }).project({ workoutsComplete: 1 }).toArray();
            workoutsComplete = workoutsComplete[0].workoutsComplete;
            if (workoutsComplete == null) {
                workoutsComplete = 0;
                await userCollection.findOneAndUpdate(
                    { name: username },
                    { $set: { workoutsComplete: workoutsComplete } }
                )
            }

            // Check for passed days and update workout complete
            var availabilities = await getAvailability(username); 
            var today = new Date(Date.now());
            today.setHours(today.getHours() - today.getTimezoneOffset() / 60);

            var newAvailabilities = [];
            availabilities.forEach(date => {
                var fullDate = new Date(date.date);
                // Keep workouts happening today or in future days
                if (fullDate > today || fullDate.toDateString() == today.toDateString()) {
                    newAvailabilities.push(date);
                // Ignore workouts from past days, update workoutsComplete
                } else {
                    workoutsComplete++;
                }
            });

            newAvailabilities = newAvailabilities.sort((a, b) => {
                return new Date(a.date) - new Date(b.date);
            });

            // Count number of routine days
            var routineDays = [];
            userRoutine.forEach(exercise => {
                if (!routineDays.includes(exercise.routineDay)) {
                    routineDays.push(exercise.routineDay)
                }
            })
            routineDays = routineDays.sort();

            // Update user data to remove availabilities from days that have passed
            await userCollection.findOneAndUpdate(
                { name: username },
                { $set: { availabilityData: newAvailabilities, workoutsComplete: (workoutsComplete % routineDays.length) } }
            )

            // For each unique day, create a card of exercises for that day.
            let cardContent;
            let dayCards = '';
            var workoutNum = workoutsComplete;
            var routineDay;
            newAvailabilities.forEach(availability => {
                // Get the routine day for the next workout
                routineDay = routineDays[workoutNum % routineDays.length];
                workoutNum++;

                // Filter the user's routine for the current day to include only exercise from this routine day
                var exercisesForDay = userRoutine.filter(exercise => exercise.routineDay === routineDay);

                // For each exercise in the user's routine for the current day, create a card.
                cardContent = exercisesForDay.map(exercise => {
                    // Format exercise details
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
            // Render home feed with cards.
            res.render("index_validSession", { dayCards: dayCards, name: username });

        // If user has no routine, move to setup page.
        } else {
            res.redirect("/setup");
        }

    } else {
        res.render("index_invalidSession");
    };
});

module.exports = router;
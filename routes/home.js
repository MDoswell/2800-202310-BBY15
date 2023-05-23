// Load modules below.
const { router } = require('../config/dependencies');
const getRoutine = require('../public/js/getRoutine');

// Route below.
router.get('/', async (req, res) => {
    const { exerciseCollection } = await require('../config/databaseConnection');
    const username = req.session.name;
    const userRoutine = await getRoutine(username);

    if (req.session.authenticated) {
        if (userRoutine != null) {
            const uniqueDates = Array.from(new Set(userRoutine.map(exercise => exercise.date))).sort((a, b) => {
                return new Date(a) - new Date(b);
            });
            console.log(uniqueDates);
            // const today = new Date('May 22, 2023'); 
            var today = new Date(Date.now());
            console.log(today.getTimezoneOffset());
            today.setHours(today.getHours() - today.getTimezoneOffset() / 60);
            console.log(today.getHours());
            let cardContent;
            let dayCards = '';

            // For each unique day, create a card of exercises for that day.
             uniqueDates.map(date => {
                var fullDate = new Date(date);
                if (fullDate.getDate() < today.getDate()) {
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
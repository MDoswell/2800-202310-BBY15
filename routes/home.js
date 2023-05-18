// Load modules below.
const { router } = require('../config/dependencies');
const getRoutine = require('../public/js/getRoutine');

// Route below.
router.get('/', async (req, res) => {
    const username = req.session.name;
    const userRoutine = await getRoutine(username);

    if (req.session.authenticated) {
        if (userRoutine != null) {
            const uniqueDays = Array.from(new Set(userRoutine.map(exercise => exercise.day)));
            let cardContent;
            let dayCards = '';
    
            // For each unique day, create a card of exercises for that day.
            uniqueDays.map(day => {
                // Filter the user's routine for the current day.
                const exercisesForDay = userRoutine.filter(exercise => exercise.day === day);
    
                // For each exercise in the user's routine for the current day, create a card.
                cardContent = exercisesForDay.map(exercise => {
                    const formatExerciseName = exercise.exerciseName.slice(0, 1).toUpperCase() + exercise.exerciseName.slice(1).toLowerCase();
    
                    // Create a card for the current exercise.
                    return `<div class='exercise-card'>
                                <div class='exercise-content'>
                                    <h4 class='exercise-title' id='${formatExerciseName}'>${formatExerciseName}</h3>
                                    <p class='exercise-intensity' id='${formatExerciseName}-intensity'>${exercise.intensity}</p>
                                </div>
                            </div>`;
                });
    
                // Join the cards for the current day into a single card. Add each day card to the dayCards String.
                dayCards += 
                    `<div class='day-card' id='${day}-card'>
                        <h3 class='day-title' id='${day}-title'>${day}</h2>
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
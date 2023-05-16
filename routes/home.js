// Load modules below.
const { router } = require('../config/dependencies');
const getRoutine = require('../public/js/getRoutine');

// Route below.
router.get('/', async (req, res) => {
    if (req.session.authenticated) {
        const username = req.session.name;
        const userRoutine = await getRoutine(username);
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
                return `<div class="card-content">
                            <div class="content">
                                <h4 id='${formatExerciseName}'>${formatExerciseName}</h3>
                                <p id='${formatExerciseName}-intensity'>${exercise.intensity}</p>
                                </div>
                                </div>`;
            });

            // Join the cards for the current day into a single card. Add each day card to the dayCards String.
            dayCards +=
                `<div class="day-card">
              <h3>${day}</h2>
              ${cardContent.join('')}
            </div>`;
        });
        res.render("index_validSession", { dayCards: dayCards, name: username });
    } else {
        res.render("index_invalidSession");
    };
});

module.exports = router;
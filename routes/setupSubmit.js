const { router } = require('../config/dependencies');

// Route below.
router.post('/setupSubmit', async(req, res) => {
    console.log('inside setup/submit')
    //importing usercollection connection
    const { userCollection } = await require('../config/databaseConnection');
    // console.log("req.body", req.body);
    //grabbing user input from form
    let age = req.body.age



    var gender = "Undisclosed";

    if(req.body.gender != null){
        gender = req.body.gender;
    }

    let weight = req.body.weight

    let heightFeet = req.body.feet

    let heightInches = req.body.inches

    let goals = req.body.goals
    goals = goals.trim();

    let experience = req.body.experience

    var selectedExercises = [];

    //looking for checked exercises and adding them to an array
    if (req.body.cardio != null){
        selectedExercises.push('cardio');
    }
    if (req.body.strength != null){
        selectedExercises.push('strength training');
    }
    if (req.body.flexibility != null){
        selectedExercises.push('flexibility');
    }
    if (req.body.balance != null){
        selectedExercises.push('balance');
    }
    if (req.body.high != null){
        selectedExercises.push('high-intensity');
    }
    if (req.body.low != null){
        selectedExercises.push('low-impact');
    }
    if (req.body.sport != null){
        selectedExercises.push('sport specific');
    }
    if (req.body.functional != null){
        selectedExercises.push('functional');
    }
    if (req.body.bodyweight != null){
        selectedExercises.push('bodyweight');
    }
    if (req.body.endurance != null){
        selectedExercises.push('endurance');
    }
    

    // What does the user's first routine look like?
    const { firstSetupRoutine } = req.body;
    // console.log("User's new routine:", firstSetupRoutine);


    await userCollection.findOneAndUpdate({ name: req.session.name}, { $set: { age: age, gender: gender, weight: weight, heightFeet: heightFeet, heightInches: heightInches, goals: goals, experience:experience, exerciseTypes: selectedExercises, routine: firstSetupRoutine }});

    res.redirect("/");
});

module.exports = router;
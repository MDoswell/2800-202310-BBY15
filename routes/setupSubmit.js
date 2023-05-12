const { router } = require('../config/dependencies');

// Route below.
router.post('/setupSubmit', async(req, res) => {
    console.log('inside setup/submit')
    //importing usercollection connection
    const { userCollection } = await require('../config/databaseConnection');
    console.log("req.body" + req.body);
    //grabbing user input from form
    let age = req.body.age

    console.log("age: " + age)

    let gender = req.body.gender

    console.log("gender: " + gender)

    let weight = req.body.weight

    console.log("weight: " + weight)

    let heightFeet = req.body.feet

    console.log("feet:" + heightFeet)

    let heightInches = req.body.inches

    console.log("inches:" + heightInches)

    let goals = req.body.goals

    console.log("goals: " + goals)

    let experience = req.body.experience

    console.log("experience: " + experience)    

    var selectedExercises = [];

    //looking for checked exercises and adding them to an array
    if (req.body.cardio){
        selectedExercises.push('cardio');
    }
    if (req.body.strength){
        selectedExercises.push('strength training');
    }
    if (req.body.flexibility){
        selectedExercises.push('flexibility');
    }
    if (req.body.balance){
        selectedExercises.push('balance');
    }
    if (req.body.high){
        selectedExercises.push('high-intensity');
    }
    if (req.body.low){
        selectedExercises.push('low-impact');
    }
    if (req.body.sport){
        selectedExercises.push('sport specific');
    }
    if (req.body.functional){
        selectedExercises.push('functional');
    }
    if (req.body.bodyweight){
        selectedExercises.push('bodyweight');
    }
    if (req.body.endurance){
        selectedExercises.push('endurance');
    }
    for (i= 0; i < selectedExercises.length; i++){
        console.log(selectedExercises[i]);
    }
    await userCollection.findOneAndUpdate({ name: req.session.name}, { $set: { age: age, gender: gender, weight: weight, heightFeet: heightFeet, heightInches: heightInches, goals: goals, experience:experience, exerciseTypes: selectedExercises }});

    
    res.redirect("/");
});

module.exports = router;
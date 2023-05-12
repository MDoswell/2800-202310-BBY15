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
    console.log("cardio: " + req.body.cardio)
    if (req.body.cardio != null){
        console.log("inside cardio");
        selectedExercises.push('cardio');
    }
    console.log("strength: " + req.body.strength)
    if (req.body.strength != null){
        console.log("inside srength");
        selectedExercises.push('strength training');
    }
    console.log("flexibility: " + req.body.flexibility)
    if (req.body.flexibility != null){
        console.log("inside flexibility");
        selectedExercises.push('flexibility');
    }
    console.log("balance: " + req.body.balance)
    if (req.body.balance != null){
        console.log("inside balance");
        selectedExercises.push('balance');
    }
    console.log("high" + req.body.high)
    if (req.body.high != null){
        console.log("inside high");
        selectedExercises.push('high-intensity');
    }
    console.log("low: " + req.body.low)
    if (req.body.low != null){
        console.log("inside low");
        selectedExercises.push('low-impact');
    }
    console.log("sport: " + req.body.sport)
    if (req.body.sport != null){
        console.log("inside sport");
        selectedExercises.push('sport specific');
    }
    console.log("functional: " + req.body.functional)
    if (req.body.functional != null){
        console.log("inside funcitonal");
        selectedExercises.push('functional');
    }
    console.log("bodyweight: " + req.body.bodyweight)
    if (req.body.bodyweight != null){
        console.log("inside bodyweight");
        selectedExercises.push('bodyweight');
    }
    console.log("endurance: " + req.body.endurance)
    if (req.body.endurance != null){
        console.log("inside endurance");
        selectedExercises.push('endurance');
    }
    for (i= 0; i < selectedExercises.length; i++){
        console.log(selectedExercises[i]);
    }
    await userCollection.findOneAndUpdate({ name: req.session.name}, { $set: { age: age, gender: gender, weight: weight, heightFeet: heightFeet, heightInches: heightInches, goals: goals, experience:experience, exerciseTypes: selectedExercises }});

    
    res.redirect("/");
});

module.exports = router;
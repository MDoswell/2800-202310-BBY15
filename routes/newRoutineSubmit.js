const { router } = require('../config/dependencies');

router.post('/newRoutine/submit', async (req, res) => {
    console.log("inside new routine submit")
    const { userCollection } = await require('../config/databaseConnection');
    const userInfo = await userCollection
    .findOne({ name: req.session.name }, { projection: { routine: 1} });
    const currentRoutine = userInfo.routine;

    var str = "for the past week I have been doing the following exercise."

    currentRoutine.forEach((e) => {
        str += e.exerciseName + " for " + e.intensity + ", "
    })

    currentRoutine.forEach((e) => {
        const exercise = e.exerciseName;
        const inputValue = req.body[exercise];
        if (inputValue ==  "no"){
            str += "i have not been enjoying " + exercise + " and would like to change it."
        }

        if (inputValue == "yes"){
            str +=  "I have been enjoying " + exercise + " and would like to keep it in my routine."
        }

        const challenge = "challenge" + e.exerciseName;
        const challengeValue = req.body[challenge];
        if (challengeValue ==  "not"){
            str += "Doing " + e.exerciseName + " for " + e.intensity + " has not been challenging, make it harder for the next routine."
        } else if (challengeValue == "good"){
            str += "Doing " + e.exerciseName + " for " + e.intensity + " has been a good challenge, keep it at this intensity."
        } else {
            str += "Doing " + e.exerciseName + " for " + e.intensity + " has been too challenging, make it easier for the next routine."
        }
        
    })

    str += "with the information I've given you, make the next routine for me. Don't reply in anything other than the exercise name with the reps and sets for that exercise."

    const aiResponse = await axios.post("/openai", {str});
    res.json(aiResponse)
})
module.exports = router;
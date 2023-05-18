const { router } = require('../config/dependencies');

router.post('/newRoutine/submit', async (req, res) => {
    console.log("inside new routine submit")
    const { userCollection } = await require('../config/databaseConnection');
    const userInfo = await userCollection
    .findOne({ name: req.session.name }, { projection: { routine: 1, availabilityData: 1} });
    var availability = userInfo.availabilityData;
    var available = "I my free time to do these exercise is on ";

    availability.forEach( (e) => {
        available += e.dayOfWeek + ", " + e.date + " from " + e.startTime + " to " + e.endTime;
    })

    const currentRoutine = userInfo.routine;

    var str = "for the past week I have been doing the following exercise."

    currentRoutine.forEach((e) => {
        str += e.exerciseName + " for " + e.intensity + ", "
    })
    var enjoy = "The following exercises should be included in the next routine";
    var didntEnjoy = "The following exercises should not be included in the next response";
    var easy = "The following exercises have been too easy and should have a higher intensity";
    var good = "The folowing exercises have been a good challenge and should be kept the same unless i specified i didn't enjoy it";
    var difficult = "The following exercises have been too difficult and should have a lower intensity.";
    var didntEnjoyNum = 0;
    currentRoutine.forEach((e) => {
        const exercise = e.exerciseName;
        const inputValue = req.body[exercise];
        

        const challenge = "challenge" + e.exerciseName;
        const challengeValue = req.body[challenge];
        if (challengeValue ==  "not"){
            easy += ", " + e.exerciseName + " for " + e.intensity
        } else if (challengeValue == "good"){
            good += ", " + e.exerciseName + " for " + e.intensity 
        } else {
            difficult += ", " + e.exerciseName + " for " + e.intensity
        }

        
        if (inputValue ==  "no"){
            didntEnjoyNum++;
            didntEnjoy += ", " + exercise 
        }
        if (inputValue == "yes"){
            enjoy +=  ", " + exercise 
        }
    })

    str += easy + ". " + good + ". " + difficult + ". " + enjoy + ". " + available + ". " + didntEnjoy + ". Remember to exclude the exercises I didn't enjoy from you response. only respond with a list of exercise names and the workload measurement (reps and sets) I will do. Do not respond with anything else other that the list of exercises with the workload measurement (reps and sets), while making sure to categorize each exercise according to the availability I've given you. Only respond in the format of \n (available day): (exercise name): (number of sets) sets of (number of reps) reps.\nDo not deviate from the format I just gave and do not have any other words in the response such as (e.g, New Exercises). Also add " + didntEnjoyNum + " new exercises that aren't the ones I didn't enjoy. Remember to categorize each exercise according to the availability I've given you"
    console.log(str);
    
    res.json(str);
})
module.exports = router;
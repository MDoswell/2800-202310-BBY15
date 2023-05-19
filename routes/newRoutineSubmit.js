const { router } = require('../config/dependencies');
const formatValidate = require('../public/js/formatValidate');

router.post('/newRoutine/submit', async (req, res) => {
    console.log("inside new routine submit")
    const { userCollection } = await require('../config/databaseConnection');
    const userInfo = await userCollection
    .findOne({ name: req.session.name }, { projection: { routine: 1, availabilityData: 1} });
    var availability = userInfo.availabilityData;
    var available = "I my free time to do these exercise is on ";
    const username = req.session.name;

    availability.forEach( (e) => {
        available += e.dayOfWeek + ", " + e.date;
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

    str += easy + ". " + good + ". " + difficult + ". " + enjoy + ". " + available + ". " + didntEnjoy + ". Remember to exclude the exercises I didn't enjoy from you response. only respond with a list of 'exercise names' and the 'workload measurement' ('reps' and 'sets') I will do. Do not respond with anything else other that the list of exercises with the 'workload measurement' ('reps' and 'sets'), while making sure to categorize each 'exercise' according to the 'availability' I've given you. Only respond in the format of \n '(available day)\n' \n '(exercise name): '(number of sets)' sets of '(number of reps)' reps. Do not deviate from the format I just gave and do not have any other words in the response such as (e.g, 'New Exercises'). Also add " + didntEnjoyNum + " new exercises that aren't the ones I didn't enjoy. Remember to categorize each 'exercise' according to the availability I've given you.\n\n###\n\n"
    console.log(str);

    // JSON prompt below.
    // @credit https://community.openai.com/t/qa-fine-tuned-chatbot-not-answering-from-the-trained-data-but-nonfactual/21999/32?page=2
    let jsonPrompt = `Given the article below, create a JSON object which enumerates a set of child objects.                       
    Each child object has 4 properties: "exerciseName", "intensity", "dayOfWeek", and "date". For "exerciseName", assign the name of the exercise. For "intensity", assign the intensity of the exercise such as reps and sets. For "day", assign the day of the week on which the exercise should be performed. For "date", assign the date on which the exercise should be performed.
    The resulting JSON object should be in this format: [{"exerciseName":"String","intensity":"String", "dayOfWeek: String", "date: M/D/YYYY"}].\n\n
    The article:\n
    ${str}\n\n
    The JSON object:\n\n`;

    str = jsonPrompt;

    // Format the routine with the formatRoutine function.
    const formattedSummary = await formatValidate(str, username);

    // console.log('\nRetry summary:');
    // formattedSummary.forEach((exercise, index) => {
    //   console.log(`Exercise ${index + 1}:`, exercise);
    // });

    // How long is formattedSummary?
    console.log('\nLength of formattedSummary:', formattedSummary.length);
    
    res.send(formattedSummary);
});

module.exports = router;
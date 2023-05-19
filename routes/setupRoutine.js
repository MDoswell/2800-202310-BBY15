const { router } = require('../config/dependencies');

router.post('/setup/routine', async (req, res) => {
    const { userCollection } = await require('../config/databaseConnection');
    const user = await userCollection.findOne({ name: req.session.name });
    const availabilityData = user.availabilityData;
    let str = "I am " + req.body.age + " years old and my gender is ";

    if (req.body.male != null) {
        str += "male"
    } else if (req.body.female != null) {
        str += "female"
    } else {
        str += "undisclosed"
    }

    str += ". My weight is " + req.body.weight
        + " and my height is " + req.body.feet + " foot " + req.body.inches + " inches. "
        + " My exercise goals are as follows: " + req.body.goals
        + ". I would rate my experience in exercising out of 10 a " + req.body.experience + " out of 10. ";
    //     + " The category of exercises I like are";

    // if (req.body.cardio != null) {
    //     str += ', cardio';
    // }
    // if (req.body.strength != null) {
    //     str += ', strength training';
    // }
    // if (req.body.flexibility != null) {
    //     str += ', flexibility';
    // }
    // if (req.body.balance != null) {
    //     str += ', balance';
    // }
    // if (req.body.high != null) {
    //     str += ', high-intensity';
    // }
    // if (req.body.low != null) {
    //     str += ', low-impact';
    // }
    // if (req.body.sport != null) {
    //     str += ', sport specific';
    // }
    // if (req.body.functional != null) {
    //     str += ', functional';
    // }
    // if (req.body.bodyweight != null) {
    //     str += ', bodyweight';
    // }
    // if (req.body.endurance != null) {
    //     str += ', endurance';
    // }
    str += ". My availability is as follows: "
    availabilityData.forEach((e) => {
        str += e.dayOfWeek + ", " + e.date + ", from " + e.startTime + " to " + e.endTime + ", "
    })

    str += ". With that profile what kind of exercise routine would you recommend me? only respond with a list of exercise names and the workload measurement (reps and sets) I will do. Do not respond with anything else other that the list of exercises with the workload measurement (reps and sets), while making sure to categorize each exercise according to the availability I've given you. Only respond in the format of (exercise name): (number of sets) sets of (number of reps) reps.\n\n###\n\n";

    // JSON prompt below.
    // @credit https://community.openai.com/t/qa-fine-tuned-chatbot-not-answering-from-the-trained-data-but-nonfactual/21999/32?page=2
    let jsonPrompt = `Given the article below, create a JSON object which enumerates a set of at least 9 child objects for every unique "day" on which the exercise should be performed.                       
    Each child object has 4 properties: "exerciseName", "intensity", "dayOfWeek", and "date". For "exerciseName", assign the name of the exercise. For "intensity", assign the intensity of the exercise such as reps and sets. For "day", assign the day of the week (e.g., Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday) on which the exercise should be performed. For "date", assign the date on which the exercise should be performed.
    The resulting JSON object should be in this format: [{"exerciseName":"String","intensity":"String", "dayOfWeek: String", "date: M/D/YYYY"}].\n\n
    The article:\n
    ${str}\n\n
    The JSON object:\n\n`;

    str = jsonPrompt;

    res.send(str);

});


module.exports = router;
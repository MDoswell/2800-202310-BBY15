
const openai = require('../config/openaiConnection')
const { router } = require('../config/dependencies');



// Route below.
router.get('/dbExercises', async (req, res) => {

    const { exerciseCollection } = await require('../config/databaseConnection');
    //   const exercises = exerciseCollection.find({});

    //   var exerciseArray = await exercises.toArray();

    // console.log(test[0]);

    // await exercises.forEach(console.log('a'));

    const bodyParts = await exerciseCollection.distinct('bodyPart');
    const equipment = await exerciseCollection.distinct('equipment');
    const targets = await exerciseCollection.distinct('target');

    // res.send('done');

    const prompt1 = "Create an exercise routine suitable for a beginner. Rather than a list of exercises, provide a list of exercise "
        + "placeholders which specify a general region of the body to target, a specific muscle group to target, and the equipment required, "
        + "in the following format: { 'ordinal': 1, 'bodyPart': General region, 'target': muscle group, 'equipment': equipment }. "
        + "General region of the body should be one of: " + bodyParts + ". Specific muscle group should be one of: " + targets
        + ". Equipment should be one of: " + equipment + ". The final output should be an array of objects in JSON.";

    console.log(prompt1);
    var prompts = [];
    prompts.push({ role: 'user', content: prompt1 });

    var test = await exerciseCollection.find({}, { projection: { id: 1 } }).toArray();
    test = test.map(row => row.id);
    console.log(test.join());
    // // exerciseArray.forEach(exercise => console.log(exercise.name));
    // for (var i = 0; i < 10; i++) {
    //     prompts.push({ role: 'user', content: exerciseArray[i].name + ' (id: ' + exerciseArray[i].id + '),' });
    // }

    // // console.log(prompts);

    // // res.send("Complete");

    // try {
    //     const response = await openai.createChatCompletion({
    //         model: "gpt-3.5-turbo",
    //         messages: prompts,
    //         temperature: 0.5,
    //     });
    //     console.log("response: " + response);
    //     const summary = response.data.choices[0].message.content;
    //     console.log(summary);

    //     var routineSkeleton = JSON.parse(summary);
    //     routineSkeleton.forEach(exercise => console.log(exercise.bodyPart));

    //     var test = await userCollection.find(
    //         {
    //             bodyPart: routineSkeleton[0].bodyPart,
    //             target: routineSkeleton[0].target
    //         },
    //         {
    //             projection: { name: 1, id: 1 }
    //         }
    //     ).toArray();

    //     console.log(test);

    //     res.render("openaiTest", { response: summary });

    // } catch (error) {
    //     console.log(error);
    //     res.status(500).json({ message: 'Internal server error' });
    // };

    // res.send('done');


});

module.exports = router;
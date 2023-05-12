// Load modules below.
const { router } = require('../config/dependencies');

// Route below.
router.get('/sendData', async (req, res) => {

    const { userCollection, exerciseCollection } = await require('../config/databaseConnection');

    //updating currently logged in user.
    // await userCollection.findOneAndUpdate({ name: 'qtest2' }, { $set: { test: 123 } });

    // await exerciseCollection.insertOne({ exercise: 'testo4', gif: 'url4' });

    // Adapted from https://blog.logrocket.com/complete-guide-csv-files-node-js/
    // const fs = require("fs");
    // const csvParser = require("csv-parser");

    // const result = [];

    // fs.createReadStream("./fitness_exercises_out.csv")
    //     .pipe(csvParser())
    //     .on("data", (data) => {
    //         result.push(data);
    //     })
    //     .on("end", async () => {
    //         console.log(result);
    //         console.log('done');

    //         var dataRow;
    //         for (var i = 0; i < result.length; i++) {
    //             dataRow = {
    //                 name: result[i].name,
    //                 id: result[i].id,
    //                 bodyPart: result[i].bodyPart,
    //                 target: result[i].target,
    //                 equipment: result[i].equipment,
    //                 gifUrl: result[i].gifUrl,
    //                 instructions: result[i].instructions
    //             }
    //             await exerciseCollection.insertOne(dataRow);
    //             // await userCollection.findOneAndUpdate({ name: 'qtest2' }, { $push: { routine: dataRow } })
    //         }
    //     });

    const dummyData = [
        {
            exerciseName: 'Push-ups',
            exerciseId: 662,
            intensity: '3 sets of 20 reps',
            day: "Monday",
            ordinal: 1
        },
        {
            exerciseName: 'Barbell full squat',
            exerciseId: 43,
            intensity: '5 sets of 5 reps',
            day: "Monday",
            ordinal: 2
        },
        {
            exerciseName: 'Run',
            exerciseId: 685,
            intensity: '1 km',
            day: "Wednesday",
            ordinal: 1
        },
        {
            exerciseName: 'dumbbell alternate biceps curl',
            exerciseId: 285,
            intensity: '2 sets of 12 reps',
            day: "Friday",
            ordinal: 1
        },
        {
            exerciseName: 'dumbbell front raise',
            exerciseId: 310,
            intensity: '1 set of 15 reps',
            day: "Friday",
            ordinal: 2
        },
        {
            exerciseName: 'dumbbell lunge',
            exerciseId: 336,
            intensity: '3 sets of 15 reps',
            day: "Friday",
            ordinal: 3
        }
    ]

    for (var i = 0; i < dummyData.length; i++) {
        await userCollection.findOneAndUpdate({ name: 'Dobe' }, { $push: { routine: dummyData[i] } })
    }

    res.send('Data sent');
});

module.exports = router;
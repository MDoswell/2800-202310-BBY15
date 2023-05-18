const { router } = require('../config/dependencies');

router.post('/setup/routine', async(req, res) => {
    const { userCollection } = await require('../config/databaseConnection');
    const user = await userCollection.findOne({ name: req.session.name });
    const availabilityData = user.availabilityData;
    let str = "I am " + req.body.age + " years old and my gender is ";

    if (req.body.male != null){
        str  += "male"
    } else if (req.body.female != null){
        str += "female"
    } else {
        str += "undisclosed"
    }

    str += ". My weight is " + req.body.weight 
    + " and my height is " + req.body.feet + " foot " + req.body.inches + " inches. "
    + " My exercise goals are as follows. " + req.body.goals
    + " I would rate my experience in exercising out of 10 a " + req.body.experience +  " out of 10. "
    + " The kind of exercise I like are";

    if (req.body.cardio != null){
                str += ', cardio';
            }
            if (req.body.strength != null){
                str += ', strength training';
            }
            if (req.body.flexibility != null){
                str += ', flexibility';
            }
            if (req.body.balance != null){
                str += ', balance';
            }
            if (req.body.high != null){
                str += ', high-intensity';
            }
            if (req.body.low != null){
                str += ', low-impact';
            }
            if (req.body.sport != null){
                str += ', sport specific';
            }
            if (req.body.functional != null){
                str += ', functional';
            }
            if (req.body.bodyweight != null){
                str += ', bodyweight';
            }
            if (req.body.endurance != null){
                str += ', endurance';
            }
            str += ". My availability is as follows: "
            availabilityData.forEach( (e) => {
                str += e.dayOfWeek + ", " + e.date + ", from " + e.startTime + " to " + e.endTime + ", "
            })

             str += ". With that profile what kind of exercise routine would you recomend me? only respond with a list of exercise names and the workload measurement (reps and sets) I will do. Do not respond with anything else other that the list of exercises with the workload measurement (reps and sets), while making sure to categorize each exercise according to the availability I've given you. Only respond in the format of (exercise name): (number of sets) sets of (number of reps) reps. Do not deviate from the format I just gave and do not have any other words in the response such as the exercise type (e.g., cardio, strength, balance, etc.).\n\n###\n\n";

            res.json(str);

        });


module.exports = router;
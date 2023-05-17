const { router } = require('../config/dependencies');

router.post('/setup/routine', (req, res) => {
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
    + " The kind of exercise i like are";

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

            str += ". With that profile what kind of exercise routine would you recomend me? only respond with a list of exercise names and the reps and sets i will do. Do not respond with anything else other that the list of exercises with the reps and sets";

            res.json(str);

        });


module.exports = router;
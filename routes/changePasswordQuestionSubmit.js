// Load modules below.
const { router, Joi, bcrypt } = require('../config/dependencies');

// Route below.
router.post('/changePassword/question/submit', async (req, res) => {
    const { userCollection } = await require('../config/databaseConnection');
    var answer = req.body.answer;
    var email = req.body.email;

    console.log(answer, email);

    // Define the schema (validation criteria) of the user info.
    const schema = Joi.object(
        {
            answer: Joi.string().regex(/[\w\s,.?]+/).max(30).required()
        });

    const validationResult = schema.validate({ answer });

    if (validationResult.error != null) {
        console.log(validationResult.error);

        // Loop through the validation errors and check the context property
        validationResult.error.details.forEach((error) => {

            let errorMessage;

            switch (error.context.key) {
                case "answer":
                    if (username.trim() == "") {
                        errorMessage = "Answer required.";
                    } else {
                        errorMessage = "Answer must be 30 characters or less and not contain any illegal characters.";
                    }
                    break;
                default:
                    // Error 400 for bad request if the validation error is other than 'name', 'email', and 'password'.
                    res.status(400);
                    const statusCode = '400';
                    errorMessage = 'Bad request.';

                    res.render("error", { errorMessage: errorMessage, statusCode: statusCode });
                    return;
            }

            const authentication = false;
            res.render("loginSubmit", { errorMessage: errorMessage, authentication: authentication });
            return;
        })
    } else {
        const result = await userCollection.find({ email: { $eq: email } }).project({ name: 1, email: 1, answer: 1, _id: 1 }).toArray();

        // Check the collection for a matching email. If none, redirect.
        console.log(result);

        if (result.length != 1) {
            console.log("Email not found");
            const errorMessage = "Email not found.";
            const authentication = false;

            res.render("loginSubmit", { errorMessage: errorMessage, authentication: authentication });
            return;
        }

        if (await bcrypt.compare(answer, result[0].answer)) {
            console.log("correct answer");

            res.render("changePassword");
            return;
        } else {
            console.log("incorrect answer");
            const errorMessage = "Incorrect security question answer.";
            const authentication = false;

            res.render("loginSubmit", { errorMessage: errorMessage, authentication: authentication });
            return;
        }
    }
});

module.exports = router;
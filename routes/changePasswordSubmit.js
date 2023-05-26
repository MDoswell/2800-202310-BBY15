// Load modules below.
const { router, Joi, bcrypt, saltRounds } = require('../config/dependencies');

// Route below.
router.post('/changePassword/submit', async (req, res) => {
    const { userCollection } = await require('../config/databaseConnection');
    var answer = req.body.answer;
    var email = req.body.email;
    var password = req.body.password;
    var confirmPassword = req.body.confirmPassword;

    // Check that password and confirm password match
    if (password != confirmPassword) {
        let errorMessage = "Passwords do not match.";
        const authentication = false;
        res.render("loginSubmit", { errorMessage: errorMessage, authentication: authentication });
        return;
    }

    // Define the schema (validation criteria) of the user info.
    const schema = Joi.object(
        {
            answer: Joi.string().regex(/[\w\s,.?]+/).max(30).required(),
            password: Joi.string().max(20).required(),
            confirmPassword: Joi.string().max(20).required()
        });

    // Validate user info.
    const validationResult = schema.validate({ answer, password, confirmPassword });

    if (validationResult.error != null) {
        console.log(validationResult.error);

        // Loop through the validation errors and check the context property
        validationResult.error.details.forEach((error) => {

            let errorMessage;

            switch (error.context.key) {
                case "answer":
                    if (answer.trim() == "") {
                        errorMessage = "Answer required.";
                    } else {
                        errorMessage = "Answer must be 30 characters or less and not contain any illegal characters.";
                    }
                    break;
                case "password":
                    if (password.trim() == "") {
                        errorMessage = "Password required.";
                    } else {
                        errorMessage = "Password must be 20 characters or less and not contain any illegal characters.";
                    }
                    break;
                case "confirmPassword":
                    if (confirmPassword.trim() == "") {
                        errorMessage = "Password confirmation required.";
                    } else {
                        errorMessage = "Password confirmation must be 20 characters or less and not contain any illegal characters.";
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
        // Check the collection for a matching email. If none, redirect.
        const result = await userCollection.find({ email: { $eq: email } }).project({ name: 1, email: 1, answer: 1, _id: 1 }).toArray();

        if (result.length != 1) {
            console.log("Email not found");
            const errorMessage = "Email not found.";
            const authentication = false;

            res.render("loginSubmit", { errorMessage: errorMessage, authentication: authentication });
            return;
        }

        // If all fields correct, complete password changing procedure
        if (await bcrypt.compare(answer, result[0].answer)) {
            var hashedPassword = await bcrypt.hash(password, saltRounds);
            userCollection.updateOne({ email: email }, { $set: { password: hashedPassword } });

            res.render("changePasswordComplete");
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
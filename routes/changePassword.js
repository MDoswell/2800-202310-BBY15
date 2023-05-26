// Load modules below.
const { router, Joi } = require('../config/dependencies');

// Route below.
router.get('/changePassword', async (req, res) => {
    const { userCollection } = await require('../config/databaseConnection');
    var email = req.query.email;

    // Validate email address
    const schema = Joi.object(
        {
            email: Joi.string().email().max(50).required(),
        });

    const validationResult = schema.validate({ email });

    if (validationResult.error != null) {
        console.log(validationResult.error);

        // Loop through the validation errors and check the context property
        validationResult.error.details.forEach((error) => {

            let errorMessage;

            if (email.trim() == "") {
                errorMessage = "Email required.";
                res.render("error", { errorMessage: errorMessage, statusCode: statusCode });
                return;
            } else if (error.context.key == 'email') {
                errorMessage = "Email must be 50 characters or less and not contain any illegal characters.";
                res.render("error", { errorMessage: errorMessage, statusCode: statusCode });
                return;
            } else {
                // Error 400 for bad request if the validation error is other than 'email'.
                res.status(400);
                const statusCode = '400';
                errorMessage = 'Bad request.';

                res.render("error", { errorMessage: errorMessage, statusCode: statusCode });
                return;
            }
        })
    }

    // Parametrized query treats user input as plain data and not code, so as to defend against injection attacks.
    // $eq looks for an exact match and requires collation for case-insensitive query.
    const result = await userCollection.find({ email: { $eq: email } }).project({ name: 1, email: 1, question: 1, _id: 1 }).toArray();

    // Check the collection for a matching email. If none, redirect.
    console.log(result);

    if (result.length != 1) {
        console.log("Email not found");
        const errorMessage = "Email not found.";
        const authentication = false;

        res.render("loginSubmit", { errorMessage: errorMessage, authentication: authentication });
        return;
    }

        // If user entered an matching email, retrieve their secuirty question and render password change page.
    const securityQuestion = result[0].question;
    console.log(securityQuestion);

    res.render("changePassword", { question: securityQuestion, email: email });
    return;
});

module.exports = router;
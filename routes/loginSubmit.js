// Load modules below.
const { bcrypt, Joi, router, rateLimit } = require('../config/dependencies');

// Rate limit configuration
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Maximum number of requests within the window
    message: 'Too many login attempts, please try again later.',
  });

  module.exports = { loginLimiter };
 
// Route below.
router.post('/login/submit', loginLimiter, async (req, res) => {
    const { userCollection } = await require('../config/databaseConnection');
    var email = req.body.email.toLowerCase();
    var password = req.body.password;

    // Define the schema (validation criteria) of the user info.
    const schema = Joi.object({
            email: Joi.string().email().max(20).required(),
            password: Joi.string().max(20).required()
        });

    const validationResult = schema.validate({ email, password });

    if (validationResult.error != null) {
        console.log(validationResult.error);

        // Loop through the validation errors and check the context property
        validationResult.error.details.forEach((error) => {

            let errorMessage;

            switch (error.context.key) {
                case "email":
                    if (email.trim() == "") {
                        errorMessage = "Email required.";
                    } else {
                        errorMessage = "Email must be 20 characters or less and not contain any illegal characters.";
                    }
                    break;
                case "password":
                    if (password.trim() == "") {
                        errorMessage = "Password required.";
                    } else {
                        errorMessage = "Password must be 20 characters or less and not contain any illegal characters.";
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
        // Search the collection for a matching user.
        const result = await userCollection.find({ email: { $eq: email } }).project({ name: 1, password: 1, user_type: 1, _id: 1 }).toArray();

        // Check the collection for a matching user. If none, redirect.
        console.log(result);

        if (result.length != 1) {
            console.log("user not found");
            const errorMessage = "User not found.";
            const authentication = false;

            res.render("loginSubmit", { errorMessage: errorMessage, authentication: authentication });
            return;
        }

        if (await bcrypt.compare(password, result[0].password)) {
            console.log("correct password");

            const expireTime = 60 * 60 * 1000; //expires after 1 hour (minutes * seconds * millis)

            req.session.authenticated = true;
            req.session.name = result[0].name;
            req.session.user_type = result[0].user_type;
            req.session.cookie.maxAge = expireTime;

            const successMessage = "Logged in successfully.";
            const redirectMessage = "Redirecting to homefeed...";
            const authentication = true;

            res.render("loginSubmit", { successMessage: successMessage, redirectMessage: redirectMessage, authentication: authentication });
            return;
        } else {
            console.log("incorrect password");
            const errorMessage = "Incorrect email/password combination.";
            const authentication = false;

            res.render("loginSubmit", { errorMessage: errorMessage, authentication: authentication });
            return;
        }
    }
});

module.exports = router;
// Load modules below.
const { bcrypt, Joi, router } = require('../config/dependencies');

// Route below.
router.post('/login/submit', async (req, res) => {
    const { userCollection } = await require('../config/databaseConnection');
    var username = req.body.usernameOrEmail;
    var password = req.body.password;

    if (username.includes("@")) {
        console.log('User logging in with email.');

        // Define the schema (validation criteria) of the user info.
        var schema = Joi.object(
            {
                email: Joi.string().email().max(50).required(),
                password: Joi.string().max(20).required()
            })
        
        var validationResult = schema.validate({ email: username, password });
    } else {
        console.log('User logging in with username.');

        // Define the schema (validation criteria) of the user info.
        var schema = Joi.object(
            {
                username: Joi.string().alphanum().max(20).required(),
                password: Joi.string().max(20).required()
            })
        
        var validationResult = schema.validate({ username, password });
    }


    if (validationResult.error != null) {
        console.log(validationResult.error);

        // Loop through the validation errors and check the context property
        validationResult.error.details.forEach((error) => {

            let errorMessage;

            switch (error.context.key) {
                case "username":
                    if (username.trim() == "") {
                        errorMessage = "Username required.";
                    } else {
                        errorMessage = "Username must be 20 characters or less and not contain any illegal characters.";
                    }
                    break;
                case "email":
                    if (username.trim() == "") {
                        errorMessage = "Email required.";
                    } else {
                        errorMessage = "Email must be 50 characters or less and not contain any illegal characters.";
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

            res.json({ errorMessage, authentication });
            return;
        })
    } else {
        // Search the collection for a matching user.
        const result = await userCollection.find(
            {
              $or: [
                { name: { $eq: username } },
                { email: { $eq: username } }
              ]
            },
            {
              collation: { locale: 'en_US', strength: 2 },
              projection: { name: 1, email: 1, password: 1, user_type: 1, _id: 0 }
            }
          ).toArray();

        // Check the collection for a matching user. If none, redirect.
        console.log(result);

        if (result.length != 1) {
            console.log("user not found");
            const errorMessage = "User not found.";
            const authentication = false;

            res.json({ errorMessage, authentication });
            return;
        }

        if (await bcrypt.compare(password, result[0].password)) {
            console.log("correct password");

            const expireTime = 60 * 60 * 1000; //expires after 1 hour (minutes * seconds * millis)

            req.session.authenticated = true;
            req.session.name = result[0].name;
            req.session.user_type = result[0].user_type;
            req.session.cookie.maxAge = expireTime;

            const successMessage = "Logged in successfully. Redirecting to homefeed...";
            const authentication = true;

            res.json({ successMessage, authentication });
            return;
        } else {
            console.log("incorrect password");
            const errorMessage = "Incorrect username/password combination.";
            const authentication = false;

            res.json({ errorMessage, authentication });
            return;
        }
    }
});

module.exports = router;
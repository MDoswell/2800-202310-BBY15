// Load modules below.
const { router, Joi} = require('../config/dependencies');

// Route below.
router.post('/profileUpdate', async (req, res) => {

    const { userCollection } = await require('../config/databaseConnection');
    const name = req.body.name;

    // Store the email in lowercase to avoid duplicate emails capitalized differently.
    const email = req.body.email.toLowerCase();
    

    const schema = Joi.object(
        {
            // Name represents 'username' so it will be alphanumerical (letters/numbers) 
            name: Joi.string().alphanum().max(20).required(),
            email: Joi.string().email().max(20).required(),
        });

    const validationResult = schema.validate({ name, email});

    if (validationResult.error != null) {
        console.log(validationResult.error);

        // Loop through the validation errors and check the context property
        validationResult.error.details.forEach((error) => {

            let errorMessage;

            switch (error.context.key) {
                case "name":
                    if (name.trim() == "") {
                        errorMessage = "Name required.";
                    } else {
                        errorMessage = "Name must be 20 characters or less and not contain any illegal characters.";
                    }
                    break;
                case "email":
                    if (email.trim() == "") {
                        errorMessage = "Email required.";
                    } else {
                        errorMessage = "Email must be 20 characters or less and not contain any illegal characters.";
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

            
            res.render("profile", { errorMessage: errorMessage});
        })

        return;
    }

    
        

        

        //updating currently logged in user with new name and email.
        await userCollection.findOneAndUpdate({ name: req.session.name}, { $set: { name: name, email: email }});
        

        req.session.authenticated = true;
        req.session.name = req.body.name;
        req.session.user_type = 'user';
        

        // res.render("profile", { name: name, email: email, user_type: "user",});
        res.redirect('/profile');
    
});

module.exports = router;
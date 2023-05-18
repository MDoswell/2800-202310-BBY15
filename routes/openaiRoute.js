const openai = require('../config/openaiConnection')
const { router } = require('../config/dependencies');
const formatRoutine = require('../public/js/formatRoutine');


// Used in first time setup. See setup.js and setup.ejs files for first time setup of the app.
// Route below.
router.post('/openai', async(req, res) => {
    console.log("running generatePrompt");

    const userPrompt = req.body.str;
    console.log('User entered: ' + userPrompt);

    try {
        // const response = await openai.createCompletion({
        //   engine: 'text-davinci-003',
        //   prompt: "give me a book name",
        //   maxTokens: 10,
        //   temperature: 0.5,
        //   n: 2,
        //   stop: '\n ',
        // });
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: userPrompt,
            max_tokens: 500,
            temperature: 0,
            n: 2,
          });
          // What is the best exercise routine for me?
          console.log("response" + response);

          const summary = response.data.choices[0].text.trim();

          // Split the summary by newline character.
          console.log("summary: " + summary);

          // Format the routine with the formatRoutine function.
          const formattedSummary = await formatRoutine(summary);

          console.log('\nFormatted summary:');
          formattedSummary.forEach((exercise, index) => {
            console.log(`Exercise ${index + 1}:`, exercise);
          });

          res.send(summary);
    
    } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Internal server error' });
          };

   
    

});

module.exports = router;
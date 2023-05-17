const openai = require('../config/openaiConnection')
const { router } = require('../config/dependencies');


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
            max_tokens: 1000,
            temperature: 0,
            n: 2,
          });
          // What is the best exercise routine for me?
          console.log("response" + response);

          const summary = response.data.choices[0].text.trim();

          // Split the summary by newline character.
          console.log("summary: " + summary);

          // Formats the response from the OpenAI API call to remove numbered and hyphen bullet points from the start of each statement.
          let statements = summary.split('\n'); // Split the summary by newline character

          // Remove numbered and hyphen bullet points from start of each statement.
          statements = statements.map(statement => {
              // Matches numbered bullet points and hyphen bullet points at the start of each line.
              const regex = /^\s*(?:\d+\.|-)\s*/g;
              return statement.trim().replace(regex, '').trim();
          })

          if (statements.filter(statement => !statement.includes('summary', 0))) {
            statements = statements.slice(1, statements.length);
          }

          console.log("statements: " + statements);

          res.send(statements);
    
    } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Internal server error' });
          };

   
    

});

module.exports = router;
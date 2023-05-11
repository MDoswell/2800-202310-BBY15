
const openai = require('../config/openaiConnection')
const { router } = require('../config/dependencies');



// Route below.
router.get('/openai', async(req, res) => {
  Prompt = req.query.prompt;
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
            prompt: Prompt,
            max_tokens: 1000,
            temperature: 0,
          });
          console.log("response" + response);
          const summary = response.data.choices[0].text.trim();
          console.log(summary);
    res.render("openaiTest", {response: response});
    
    } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Internal server error' });
          };

   
    

});

module.exports = router;
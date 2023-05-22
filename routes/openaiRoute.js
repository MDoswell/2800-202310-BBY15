const openai = require('../config/openaiConnection')
const { router } = require('../config/dependencies');
const formatValidate = require('../public/js/formatValidate');


// Used in first time setup. See setup.js and setup.ejs files for first time setup of the app.
// Route below.
router.post('/openai', async (req, res) => {
  console.log("running generatePrompt");

  // User's unique name. Necessary for validating the formatted AI-generated routine in formatValidate.js
  const username = req.session.name;
  console.log('User name: ' + username);

  // User's prompt.
  const userPrompt = req.body.fullPrompt;
  console.log('User entered: ' + userPrompt);

  // Retry loop variables for correcting AI error.
  let retryCount = 0;
  const maxRetries = 3;

  // Retry loop for OpenAI API call to generate routine.
  // while (retryCount < 1) {
    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: userPrompt,
        max_tokens: 2000,
        temperature: 0,
        n: 2,
      });
      
      try {
        const summary = response.data.choices[0].text.trim();
        console.log("summary: " + summary);
        console.log('Calling validate function');
        const formattedSummary = await formatValidate(summary, username);
        console.log('What is the formatted summary?', formattedSummary.length);
        res.send(formattedSummary);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
      }
      

      // // What is the best exercise routine for me?
      // const summary = response.data.choices[0].text.trim();

      // // Split the summary by newline character.
      // console.log("summary: " + summary);

      // // Format the routine with the formatRoutine function.
      // const formattedSummary = await formatValidate(summary, username);
      // console.log('What is the formatted summary?', formattedSummary);

      // // How many exercises are in the routine?
      // // console.log('\nFormatted summary:');
      // // formattedSummary.forEach((exercise, index) => {
      // //   console.log(`Exercise ${index + 1}:`, exercise);
      // // });

      // // How long is formattedSummary?
      // // console.log('\nLength of formattedSummary:', formattedSummary.length);

      // res.send(formattedSummary);

    } catch (error) { // If there is an error, log it and retry with the new prompt.
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });

      retryCount++;

      console.log('Retry count:', retryCount);

      // If retryCount is equal to maxRetries, send a new prompt containing the original prompt to the OpenAI API.
      if (retryCount === maxRetries) {
        try {
          // Retry failed, so send the original prompt to the OpenAI API
          // JSON prompt below.
          // @credit https://community.openai.com/t/qa-fine-tuned-chatbot-not-answering-from-the-trained-data-but-nonfactual/21999/32?page=2
          const jsonPrompt = `Try again. I will repeat instructions in the article that must be fulfilled by making sure to create a JSON object which enumerates a set of at least child objects for every unique "day" on which the exercise should be performed.                       
          Each child object has 4 properties: "exerciseName", "intensity", "dayOfWeek", and "date". For "exerciseName", assign the name of the exercise. For "intensity", assign the intensity of the exercise such as reps and sets. For "day", assign the day of the week (e.g., Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday) on which the exercise should be performed. For "date", assign the date on which the exercise should be performed.
          The resulting JSON object should be in this format: [{"exerciseName":"String","intensity":"String", "dayOfWeek: String", "date: M/D/YYYY"}].\n\n
          The article:\n
          ${userPrompt}\n\n
          The JSON object:\n\n`;

          // Retry failed, so send the original prompt to the OpenAI API
          const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: jsonPrompt,
            max_tokens: 2000,
            temperature: 0,
            n: 2,
          });

          // What is the best exercise routine for me?
          const summary = response.data.choices[0].text.trim();

          // Split the summary by newline character.
          console.log("Retry summary: " + summary);

          // Format the routine with the formatRoutine function.
          console.log('Calling validate function');
          const formattedSummary = await formatValidate(summary, username);
          console.log('What is the formatted summary?', formattedSummary);

          // console.log('\nRetry summary:');
          // formattedSummary.forEach((exercise, index) => {
          //   console.log(`Exercise ${index + 1}:`, exercise);
          // });

          // How long is formattedSummary?
          console.log('\nLength of formattedSummary:', formattedSummary.length);

          console.log('Next line is send');
          console.log('What is the formatted summary?', formattedSummary)
          // Send the formatted summary back to generatePrompt.js where the request was called from.
          res.send(formattedSummary);

        } catch (error) {
          console.log(error);

          // Let the user know to try again later and submit bug report.
          res.status(500).json({ message: 'Internal server error' });
        };
      };
    };
  });

module.exports = router;
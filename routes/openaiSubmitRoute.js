const openai = require('../config/openaiConnection');
const { router } = require('../config/dependencies');

// Route below.
router.post('/openai/submit', async (req, res) => {
  console.log('submitted request');

  const { exerciseCollection } = await require('../config/databaseConnection');
  const exercisesDataset = await exerciseCollection.find({}, { name: 1, id: 1 }).toArray();

  // Train the model using the OpenAI API
  const fineTuningResponse = await openai.fineTune({
    dataset: exercisesDataset,
    // Include other fine-tuning parameters as required
  });

  // Confirm fine-tuning completion
  console.log('Fine-tuning completed successfully: ' + fineTuningResponse);

  // Generate a workout routine for a beginner using the fine-tuned model
  const prompts = 'Generate a workout routine for a beginner using the fine-tuned model.';

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003", // Use the base GPT-3 model for fine-tuning
      messages: prompts,
      temperature: 0.5,
    });

    // Confirm response from AI
    console.log("AI response: " + response);

    // Extract the summary from the response
    const summary = response.data.choices[0].message.content;
    console.log("AI summary: " + summary);

    // Sends response to createRoutine() to render on /openaiGetRoute page.
    res.send('Here is your summary: ' + summary);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  };
});

module.exports = router;
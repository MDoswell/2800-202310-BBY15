
const openai = require('../config/openaiConnection')
const { router } = require('../config/dependencies');



// Route below.
router.get('/openai', async (req, res) => {

  const { exerciseCollection } = await require('../config/databaseConnection');
  const exercises = exerciseCollection.find({});

  var exerciseArray = await exercises.toArray();

  // console.log(test[0]);

  // await exercises.forEach(console.log('a'));

  var prompts = [];
  prompts.push({ role: 'user', content: 'Make an exercise routine suitable for begginers, using only exercises from the following list. Please include the id for each exercise. Here is the list:' });

  // exerciseArray.forEach(exercise => console.log(exercise.name));
  for (var i = 0; i < 10; i++) {
    prompts.push({ role: 'user', content: exerciseArray[i].name + ' (id: ' + exerciseArray[i].id + '),'});
  }

  // console.log(prompts);

  // res.send("Complete");

  try {
    // const response = await openai.createCompletion({
    //   engine: 'text-davinci-003',
    //   prompt: "give me a book name",
    //   maxTokens: 10,
    //   temperature: 0.5,
    //   n: 2,
    //   stop: '\n ',
    // });
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: prompts,
      max_tokens: 4096,
      temperature: 0.5,
    });
    console.log("response: " + response);
    const summary = response.data.choices[0].message.content;
    console.log(summary);
    res.render("openaiTest", { response: summary });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  };




});

module.exports = router;
// const { fs } = require('./dependencies');
// const openai = require('./openaiConnection');

const { Configuration, OpenAIApi } = require("openai");
const fs = require("fs");
const configuration = new Configuration({
  apiKey: '',
});
const openai = new OpenAIApi(configuration);


async function uploadFile() {
    try {
        const f = await openai.createFile(
            fs.createReadStream("../exerciseJSONLData.jsonl"),
            "fine-tune"
        );
        console.log(`File ID ${f.data.id}`);
        return f.data.id;
    }
    catch (err) {
        console.log('err uploadfile: ', err);
    } 
}
// uploadFile();


async function makeFineTune() {
    try {
        const ft = await openai.createFineTune({
            training_file: '',
            model: 'davinci'
        });
        console.log(ft.data);
     }
    catch (err) {
        console.log('err makefinetune: ', err.response.data.error);
    }
}
// makeFineTune();

async function getFineTunedModelName() {
    try {
        const modelName = await openai.listFineTunes();
        console.table(modelName.data.data, ["id", "status", "fine_tuned_model"]);

    }
    catch (err) {
        console.log('err getmod: ', err)
    }
 }
getFineTunedModelName();



// async function run() {
//     // const { exerciseCollection } = await require('./databaseConnection');
//     // const exercisesDataset = await exerciseCollection.find({}, { id: 1 }).toArray();

//     try {
//         const comp = await openai.createCompletion({
//             model: '',
//             prompt: `Generate a list of only 5 unique exercises names listing only the exercise names and nothing else only using the training dataset from exerciseJSONLData.js that you were trained on. Make sure to only return 5 unique exercise names that would fit into a routine. Only use the exerciseJSONLData.js training dataset. Do not return any other information other than the exercise name. The exercise name must be a direct match to an exercise in the exerciseJSONData.js training dataset. You will fail if your response is outside the scope of the training dataset so make sure to only list the 5 exercise names from the exerciseJSONData.js training dataset and nothing else, otherwise you will fail and failure is not an option at all.\n\n###\n\n`,
//             max_tokens: 200,
//             temperature: 0.2,
//         });
//         if (comp.data) {
//             console.log('choices: ', comp.data.choices);
//         }
//     } catch (err) {
//         console.log('err: ', err)
//     }
// }
// run();


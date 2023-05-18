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
// getFineTunedModelName();



async function run() {
    // const { exerciseCollection } = await require('./databaseConnection');
    // const exercisesDataset = await exerciseCollection.find({}, { id: 1 }).toArray();

    try {
        const comp = await openai.createCompletion({
            model: '',
            prompt: `Give me a list of exercise names for a beginner fitness routine.\n\n###\n\n`,
            max_tokens: 75,
            temperature: 0.2,
            n: 1,
        });
        if (comp.data) {
            console.log('choices: ', comp.data.choices[0].text.trim());
        }
    } catch (err) {
        console.log('err: ', err)
    }
}
run();


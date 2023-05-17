// Used in first time setup. See setup.js and setup.ejs files for first time setup of the app.
const generatedRoutine = document.getElementById("generatedRoutine");  

async function generatePrompt() {
    let str = "I am " + document.getElementById("age").value 

        + " years old and my gender is ";

        if (document.getElementById('male').checked){
            str += "male";
        } else if (document.getElementById('female').checked){
            str += "female";
        } else{
            str += "undisclosed";
        }

        str += ". My weight is " + document.getElementById('weight').value 
        
        + " and my height is " + document.getElementById('feet').value + " feet and " + document.getElementById('inches').value + " inches."
        
        + " My exercise goals are as follows." + document.getElementById("goals").value 
        
        + " I would rate my experience in exercising out of 10 a " +  document.getElementById("experience").value + " out of 10."
        
        + " The kind of exercise i like are";


    if (document.getElementById("cardio").checked){
        str += ', cardio';
    }
    if (document.getElementById("strength").checked){
        str += ', strength training';
    }
    if (document.getElementById('flexibility').checked){
        str += ', flexibility';
    }
    if (document.getElementById('balance').checked){
        str += ', balance';
    }
    if (document.getElementById('high-intensity').checked){
        str += ', high-intensity';
    }
    if (document.getElementById('low-impact').checked){
        str += ', low-impact';
    }
    if (document.getElementById('sport').checked){
        str += ', sport specific';
    }
    if (document.getElementById('functional').checked){
        str += ', functional';
    }
    if (document.getElementById('bodyweight').checked){
        str += ', bodyweight';
    }
    if (document.getElementById('endurance').checked){
        str += ', endurance';
    }

    str += ". With that profile what kind of exercise routine would you recomend me? only respond with a list of exercise names and the workload measurement (reps and sets) I will do. Do not respond with anything else other that the list of exercises with the workload measurement (reps and sets). Make sure the response is always formatted as follows: 'summary:\nexercise name: workload measurement'.\n\n###\n\n";

    const aiResponse = await axios.post("/openai", {str});

    generatedRoutine.textContent = aiResponse.data;


}

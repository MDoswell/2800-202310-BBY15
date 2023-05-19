const generatedRoutine = document.getElementById("generatedRoutine");  
const setupForm = document.getElementById('setupForm');
var all = document.querySelectorAll("#container select, #container input, #container textarea, #container button");

async function generatePrompt() {  
    await document.getElementById("loader").setAttribute("style", "diaplay: inline;")
      
    const formData = new FormData(setupForm);
    
    const serializedFormData = new URLSearchParams(formData);
    
    // Send to setupRoutine.js
    const response = await axios.post("/setup/routine", serializedFormData);

    var str = response.data;
    console.log(str);
    // Send to openaiRoute.js
    const aiResponse = await axios.post("/openai", {str});

    generatedRoutine.textContent = aiResponse.data;
    // for (let el of all) { el.disabled = true; }
};




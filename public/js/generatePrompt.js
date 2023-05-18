const generatedRoutine = document.getElementById("generatedRoutine");  
const setupForm = document.getElementById('setupForm');


async function generatePrompt() {  
      
    const formData = new FormData(setupForm);
    
    const serializedFormData = new URLSearchParams(formData);
    
    // Send to setupRoutine.js
    const response = await axios.post("/setup/routine", serializedFormData);

    var str = response.data;

    // Send to openaiRoute.js
    const aiResponse = await axios.post("/openai", {str});

    generatedRoutine.textContent = aiResponse.data;
};
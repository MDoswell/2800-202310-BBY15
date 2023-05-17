const generatedRoutine = document.getElementById("generatedRoutine");  
const setupForm = document.getElementById('setupForm');
async function generatePrompt() {
    

        
      
        const formData = new FormData(setupForm);
        
        const serializedFormData = new URLSearchParams(formData);
      
        const response = await axios.post("/setup/routine", serializedFormData);

        
    
    var str = response.data;

    const aiResponse = await axios.post("/openai", {str});

    generatedRoutine.textContent = aiResponse.data;

    console.log(aiResponse);

};
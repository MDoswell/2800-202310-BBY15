const generatedRoutine = document.getElementById("generatedRoutine");  
const setupForm = document.getElementById('setupForm');

async function generatePrompt(e) {
    document.getElementById('navContainer').setAttribute("style", "display:none");
    e.preventDefault(); // Prevent the default form submission

    const formData = new FormData(setupForm);
    const serializedFormData = new URLSearchParams(formData);

    const response = await axios.post("/setup/routine", serializedFormData);

    console.log(response.data);
    const str = response.data.fullPrompt;
    const promptPrefix = response.data.promptPrefix;

    try {
        // Send request to '/openai' route to generate the routine
        const response = await axios.post("/openai", { fullPrompt: str, promptPrefix: promptPrefix });

        const firstSetupRoutine = response.data;

        console.log('generatePrompt.js firstSetupRoutine:', firstSetupRoutine);

        // Send request to '/setupSubmit' route to update the user's routine
        await axios.post("/setupSubmit", {
            age: formData.get('age'),
            gender: formData.get('gender'),
            weight: formData.get('weight'),
            feet: formData.get('feet'),
            inches: formData.get('inches'),
            goals: formData.get('goals'),
            experience: formData.get('experience'),
            cardio: formData.get('cardio'),
            strength: formData.get('strength'),
            flexibility: formData.get('flexibility'),
            balance: formData.get('balance'),
            high: formData.get('high'),
            low: formData.get('low'),
            sport: formData.get('sport'),
            functional: formData.get('functional'),
            bodyweight: formData.get('bodyweight'),
            endurance: formData.get('endurance'),
            firstSetupRoutine: firstSetupRoutine
        });

        // Redirect the user to the home page
        window.location.href = "/";
    } catch (error) {
        console.error(error);
        // Display an error message to the user
        alert("An error occurred. Please try again later.");
    }
}

// Add event listener for form submission
setupForm.addEventListener('submit', generatePrompt);

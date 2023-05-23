const generatedRoutine = document.getElementById("generatedRoutine");  
const setupForm = document.getElementById('setupForm');

async function generatePrompt(e) {
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
            male: formData.get('male'),
            female: formData.get('female'),
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


// async function generatePrompt() {
//     setupForm.addEventListener('submit', async (e) => {
//         e.preventDefault(); // Prevent the default form submission
    
//         const formData = new FormData(setupForm);
//         const serializedFormData = new URLSearchParams(formData);
    
//         try {
//             // Send request to '/openai' route to generate the routine
//             const response = await axios.post("/openai", { str: serializedFormData });
    
//             const firstSetupRoutine = response.data;
    
//             // Send request to '/setupSubmit' route to update the user's routine
//             await axios.post("/setupSubmit", {
//                 age: formData.get('age'),
//                 male: formData.get('male'),
//                 female: formData.get('female'),
//                 weight: formData.get('weight'),
//                 feet: formData.get('feet'),
//                 inches: formData.get('inches'),
//                 goals: formData.get('goals'),
//                 experience: formData.get('experience'),
//                 firstSetupRoutine: JSON.stringify(firstSetupRoutine)
//             });
    
//             // Redirect the user to the home page
//             window.location.href = "/";
//         } catch (error) {
//             console.error(error);
//             // Display an error message to the user
//             alert("An error occurred. Please try again later.");
//         }
//     });
    
      
    // const formData = new FormData(setupForm);
    // const serializedFormData = new URLSearchParams(formData);
    
    // // Send to setupRoutine.js
    // const response = await axios.post("/setup/routine", serializedFormData);

    // var str = response.data;

    // // Send to openaiRoute.js for setting up the user's routine
    // const firstSetupRoutine = await axios.post("/openai", {str});

    // // Send to setupSubmit.js for updating the user's routine
    // // const updateUserRoutine = await axios.post("/setupSubmit", { firstSetupRoutine: JSON.stringify(firstSetupRoutine) });

    // // Handle the response from the server
    // if (updateUserRoutine.status === 200) {
    //     // The request was successful. Redirect the user to home page.
    //     window.location.href = "/";
    // } else {
    //     // The request encountered an error. Display an error message to the user
    //     alert("An error occurred. Please try again later.");
    // }

//};

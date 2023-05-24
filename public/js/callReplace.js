const replaceExerciseButtons = document.getElementsByClassName('replaceExerciseButton');

// Loop through the collection of elements and add the event listener to each button
for (let i = 0; i < replaceExerciseButtons.length; i++) {
    const replaceExerciseButton = replaceExerciseButtons[i];

    replaceExerciseButton.addEventListener('click', async function () {
        console.log('replaceExerciseButton clicked');
        const exerciseName = this.getAttribute('data-exercise-name'); // Get the exercise name from the data attribute
        const username = document.getElementById('HelloTitle').getAttribute('data-username');

        console.log('exerciseName:', exerciseName);
        console.log('username:', username);

        $('#success-message').hide();
        $('#error-message').hide();
        
        // authentication success handling here
        const actionDialog = `Replacing '${exerciseName}'. Please wait...`; 
        successMessage.textContent = actionDialog;
        $('#success-message').show();
    
        setTimeout(() => {
            $('#success-message').hide();
          }, 30000);


        try {
            const response = await axios.post('/suggestExercises', {
                exerciseName: exerciseName, // Include exerciseName in the request body
                name: username, // Include username in the request body
            });
    
            console.log('response from callReplace:', response);
    
            const newExercises = response.data;
    
            console.log('newExercise from callReplace:', newExercises[0]);
    
            await axios.post('/replaceExercise', {
                oldExercise: exerciseName,
                newExercise: newExercises[0],
                name: username,
            });

      
        console.log('response from callReplace:', response);
      
        $('#success-message').hide();
        $('#error-message').hide();
        
        // authentication success handling here
        const successMessageText = 'Exercise deleted from your routine.'
        successMessage.textContent = successMessageText;
        $('#success-message').show();
    
        setTimeout(() => {
            location.reload();
            }, 3000);
      
          } catch (error) {
            console.log('error:', error);
            $('#success-message').hide();
            $('#error-message').hide();
      
            const errorMessageText = 'Unable to replace exercise. Please try again.';
        
            // authentication error handling here
            errorMessage.textContent = errorMessageText;
            $('#error-message').show();

            setTimeout(() => {
                location.reload();
              }, 3000);
          }
    });
}
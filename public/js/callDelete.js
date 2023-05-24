const deleteExerciseButtons = document.getElementsByClassName('deleteExerciseButton');
const errorMessage = document.getElementById("error-message");
const successMessage = document.getElementById("success-message");

// Loop through the collection of elements and add the event listener to each button
for (let i = 0; i < deleteExerciseButtons.length; i++) {
  const deleteExerciseButton = deleteExerciseButtons[i];
  
  deleteExerciseButton.addEventListener('click', async function () {
    console.log('replaceExerciseButton clicked');
    const exerciseName = this.getAttribute('data-exercise-name'); // Get the exercise name from the data attribute
    const username = document.getElementById('HelloTitle').getAttribute('data-username');

    console.log('exerciseName:', exerciseName);
    console.log('username:', username);

    $('#success-message').hide();
    $('#error-message').hide();
    
    // authentication success handling here
    const actionDialog = `Deleting '${exerciseName}'. Please wait...`; 
    successMessage.textContent = actionDialog;
    $('#success-message').show();

    setTimeout(() => {
        $('#success-message').hide();
      }, 15000);

    try {
      const response = await axios.post('/deleteExercise', {
        oldExercise: exerciseName, // Include exerciseName in the request body
        name: username, // Include username in the request body
    });

    console.log('response from callDelete:', response);

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

      const errorMessageText = 'Unable to delete exercise. Please try again.';
  
      // authentication error handling here
      errorMessage.textContent = errorMessageText;
      $('#error-message').show();

      setTimeout(() => {
        location.reload();
      }, 3000);
    }
  });
}
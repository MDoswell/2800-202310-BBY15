const deleteExerciseButtons = document.getElementsByClassName('deleteExerciseButton');

// Loop through the collection of elements and add the event listener to each button
for (let i = 0; i < deleteExerciseButtons.length; i++) {
  const deleteExerciseButton = deleteExerciseButtons[i];
  
  deleteExerciseButton.addEventListener('click', async function () {
    console.log('replaceExerciseButton clicked');
    const exerciseName = this.getAttribute('data-exercise-name'); // Get the exercise name from the data attribute
    const username = document.getElementById('HelloTitle').getAttribute('data-username');

    console.log('exerciseName:', exerciseName);
    console.log('username:', username);

  });
}
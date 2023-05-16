const signupForm = document.getElementById("form");
const routineResponse = document.getElementById("routineResponse");

signupForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(signupForm);
  
  const serializedFormData = new URLSearchParams(formData);

  const response = await axios.post("/newRoutine/submit", serializedFormData);

  var str =  response.data;
  const aiResponse = await axios.post("/openai", {str});
  console.log(aiResponse);
  }
);
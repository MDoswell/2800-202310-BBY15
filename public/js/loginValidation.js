const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-button");
const errorMessage = document.getElementById("error-message");
const successMessage = document.getElementById("success-message");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(loginForm);
  
  const serializedFormData = new URLSearchParams(formData);

  const response = await axios.post("/login/submit", serializedFormData);

  if (response.data.authentication) {
    $('#success-message').hide();
    $('#error-message').hide();
    
    // authentication success handling here
    successMessage.textContent = response.data.successMessage;
    $('#success-message').show();

    setTimeout(() => {
        document.location.href = "/";
      }, 3000);
      
  } else {
    $('#success-message').hide();
    $('#error-message').hide();

    // authentication error handling here
    errorMessage.textContent = response.data.errorMessage;
    $('#error-message').show();
  }
});
const generatedRoutine = document.getElementById("generatedRoutine");  
const setupForm = document.getElementById('setupForm');
async function generatePrompt() {
    

        
      
        const formData = new FormData(setupForm);
        
        const serializedFormData = new URLSearchParams(formData);
      
        const response = await axios.post("/setup/routine", serializedFormData);

        
    
    // var str = response.data;

    // const aiResponse = await axios.post("/openai", {str});

    // generatedRoutine.textContent = aiResponse.data;

    // console.log(aiResponse);

};

// Attach a click event listener to an element with the id "demolist"
document.getElementById("goalList").addEventListener("click", addGoal)

// Initialize a variable i with the value 1
var selectedGoals = [];

// This function is called when the "demolist" element is clicked
function addGoal(e) {
  // Get the element with the id "selectedGoals"
  var oInput = document.getElementById('selectedGoals');

  // Loop through all the child nodes of the "result-goes-here" element
  for (var ii = 0; ii < oInput.childNodes.length; ii++) {
    // Get the id of the current child node
    var childId = oInput.childNodes[ii].id;
    // If a child node with the same text as the clicked element already exists, exit the function
    if (childId === e.target.innerText) {
      return;
    }
  }

  // Get the element with the id "tag-template"
  let cardTemplate = document.getElementById("goalTemplate");
  // Create a clone of the template
  let newGoal = cardTemplate.content.cloneNode(true);
  // Set the text of the cloned element to the text of the clicked element
  newGoal.getElementById("goal").innerText = e.target.innerText;
  var targetName = e.target.id;
  newGoal.getElementById("parent").setAttribute("name", targetName);
  newGoal.getElementById("parent").setAttribute("value", targetName);
  //sets the parent div to be a unique id that can be targeted by the remove funciton
  newGoal.getElementById("parent").id = e.target.innerText;
  selectedGoals.push(e.target.innerText);
  //adds an event listener to the close button to allow removal of goals
  newGoal.getElementById("close").addEventListener("click", () => {
    const index = selectedGoals.indexOf(e.target.innerText);
    if (index > -1 ) {
        selectedGoals.splice(index, 1);
    }
    document.getElementById(e.target.innerText).remove();
  });

  //adds the goal to the selected goals div
  document.getElementById('selectedGoals').appendChild(newGoal);

  
}
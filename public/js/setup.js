
function generatePrompt() {
    str = "I am " + document.getElementById("age").value 

        + " years old and my gender is "+ document.getElementById("gender").selectedOptions[0].value

        + ". My weight is " + document.getElementById('weight').value 
        
        + " and my height is " + document.getElementById('feet').value + " feet and " + document.getElementById('inches').value + " inches."
        
        + " My exercise goals are as follows." + document.getElementById("goals").value 
        
        + " I would rate my experience in exercising out of 10 a " +  document.getElementById("experience").value + " out of 10."
        
        + " The kind of exercise i like are";


    if (document.getElementById("cardio").checked){
        str += ', cardio';
    }
    if (document.getElementById("strength").checked){
        str += ', strength training';
    }
    if (document.getElementById('flexibility').checked){
        str += ', flexibility';
    }
    if (document.getElementById('balance').checked){
        str += ', balance';
    }
    if (document.getElementById('high-intensity').checked){
        str += ', high-intensity';
    }
    if (document.getElementById('low-impact').checked){
        str += ', low-impact';
    }
    if (document.getElementById('sport').checked){
        str += ', sport specific';
    }
    if (document.getElementById('functional').checked){
        str += ', functional';
    }
    if (document.getElementById('bodyweight').checked){
        str += ', bodyweight';
    }
    if (document.getElementById('endurance').checked){
        str += ', endurance';
    }

    str += ". With that profile what kind of exercise routine would you recomend me?";

    window.location.href = '/openai?prompt=' + str;
}

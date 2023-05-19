function showExerciseInfo(name, target, intensity, animation, instructions) {
    document.getElementById('exerciseModalTitle').innerHTML = name;
    document.getElementById('modalBodyPart').innerHTML = target;
    document.getElementById('modalIntensity').innerHTML = intensity;
    document.getElementById('modalAnimation').src = animation;
    document.getElementById('modalInstructions').innerHTML = instructions;

    console.log(target);
}
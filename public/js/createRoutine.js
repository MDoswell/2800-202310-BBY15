async function createRoutine() {
    const routineResponse = await axios.post("/openai/submit");
    $('#generatedRoutine').textContent = routineResponse.data;
}
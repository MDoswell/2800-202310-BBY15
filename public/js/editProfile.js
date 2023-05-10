document.getElementById('edit').addEventListener("click", () => {
    document.getElementById('edit').setAttribute("style", "display:none")
    document.getElementById('editForm').setAttribute("style", "display:inline")
})

document.getElementById('save').addEventListener("click", () => {
 
    const newName = document.getElementById('name').value;
    const newEmail = document.getElementById('email').value;
    window.location.href = '/profileUpdate?name=' + newName + '&email=' + newEmail;
 
})
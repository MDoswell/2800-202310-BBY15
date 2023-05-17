// document.getElementById('edit').addEventListener("click", () => {
//     document.getElementById('edit').setAttribute("style", "display:none")
//     document.getElementById('editForm').setAttribute("style", "display:inline")
// })

// document.getElementById('save').addEventListener("click", () => {
 
//     const newName = document.getElementById('name').value;
//     const newEmail = document.getElementById('email').value;
//     window.location.href = '/profileUpdate?name=' + newName + '&email=' + newEmail;
 
// })

document.addEventListener('DOMContentLoaded', function () {
    const editButton = document.getElementById('editButton');
    const save = document.getElementById('save');
    const cancel = document.getElementById('cancel');
    const formElements = document.querySelectorAll('#profileForm input, #profileForm textarea');
    const originalValues = {};

    editButton.addEventListener('click', function () {
        editButton.style.display = 'none';
        save.style.display = 'inline-block';
        cancel.style.display = 'inline-block';

        formElements.forEach(function (element) {
            element.removeAttribute('readonly');
            originalValues[element.id] = element.value;
        });
    });

    cancel.addEventListener('click', function () {
        editButton.style.display = 'inline-block';
        save.style.display = 'none';
        cancel.style.display = 'none';

        formElements.forEach(function (element) {
            element.setAttribute('readonly', true);
            element.value = originalValues[element.id];
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
const scheduleButton = document.getElementById('scheduleButton');

scheduleButton.addEventListener('click', function () {
    window.location.href = '/availabilityData';
});
});
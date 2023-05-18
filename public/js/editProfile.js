document.addEventListener('DOMContentLoaded', function () {
    const editButton = document.getElementById('editButton');
    const save = document.getElementById('save');
    const cancel = document.getElementById('cancel');
    const formElements = document.querySelectorAll('#profileForm input[type="text"], #profileForm textarea');
    const checkboxes = document.querySelectorAll('#profileForm input[type="checkbox"]');
    const weightDropdown = document.getElementById('weight');
    const experienceRange = document.getElementById('experience');
    const experienceValue = document.getElementById('experienceValue');

    const originalValues = {};

    // Disable checkboxes initially
    checkboxes.forEach(function (checkbox) {
        checkbox.disabled = true;
    });

    // Disable weight dropdown initially
    weightDropdown.disabled = true;

    // Disable experience range initially
    experienceRange.disabled = true;

    editButton.addEventListener('click', function () {
        editButton.style.display = 'none';
        save.style.display = 'inline-block';
        cancel.style.display = 'inline-block';

        formElements.forEach(function (element) {
            element.removeAttribute('readonly');
            originalValues[element.id] = element.value;
        });

        // Enable checkboxes when edit button is clicked
        checkboxes.forEach(function (checkbox) {
            checkbox.disabled = false;
        });

        // Enable weight dropdown when edit button is clicked
        weightDropdown.disabled = false;

        // Enable experience range when edit button is clicked
        experienceRange.disabled = false;
    });

    experienceRange.addEventListener('input', function () {
        experienceValue.innerText = experienceRange.value;
    });

    cancel.addEventListener('click', function () {
        editButton.style.display = 'inline-block';
        save.style.display = 'none';
        cancel.style.display = 'none';

        formElements.forEach(function (element) {
            element.setAttribute('readonly', true);
            element.value = originalValues[element.id];
        });

        // Reset checkboxes to their original values
        checkboxes.forEach(function (checkbox) {
            checkbox.checked = originalValues[checkbox.id];
            checkbox.disabled = true;
        });

        // Reset weight dropdown to its original value and disable it again
        weightDropdown.value = "<%= weight %>";
        weightDropdown.disabled = true;

        experienceRange.value ="<%= experience %>";
        experienceRange.disabled = true;
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const scheduleButton = document.getElementById('scheduleButton');

    scheduleButton.addEventListener('click', function () {
        window.location.href = '/availabilityData';
    });
});


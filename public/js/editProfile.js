document.addEventListener('DOMContentLoaded', function () {
    const editButton = document.getElementById('editButton');
    const save = document.getElementById('save');
    const cancel = document.getElementById('cancel');
    const formElements = document.querySelectorAll('#profileForm input[type="text"], #profileForm textarea');
    const emailInput = document.getElementById('email');
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

    emailInput.disabled = true;

    editButton.addEventListener('click', function () {
        editButton.style.display = 'none';
        save.style.display = 'inline-block';
        cancel.style.display = 'inline-block';

        document.getElementById('email').removeAttribute('readonly');

        // formElements.forEach(function (element) {
        //     element.removeAttribute('readonly');
        //     originalValues[element.id] = element.value;
        // });

        // // Capture the original value for the email field
        // originalValues[emailInput.id] = emailInput.value;
        // emailInput.removeAttribute('readonly');

        // Capture the original checkbox values
        checkboxes.forEach(function (checkbox) {
            originalValues[checkbox.id] = checkbox.checked;
            checkbox.disabled = false;
        });

        // Enable checkboxes when edit button is clicked
        checkboxes.forEach(function (checkbox) {
            checkbox.disabled = false;
        });

        // Capture the original value for the weight dropdown
        originalValues[weightDropdown.id] = weightDropdown.value;
        // Enable weight dropdown when edit button is clicked
        weightDropdown.disabled = false;

        // Capture the original value for the experience level range
        originalValues[experienceRange.id] = experienceRange.value;
        // Enable experience range when edit button is clicked
        experienceRange.disabled = false;
        
        // Capture the original value for the experience level range
        originalValues[experienceRange.id] = experienceRange.value;

    });

    experienceRange.addEventListener('input', function () {
        experienceValue.innerText = experienceRange.value;
    });

    cancel.addEventListener('click', function () {
        editButton.style.display = 'inline-block';
        save.style.display = 'none';
        cancel.style.display = 'none';

        // formElements.forEach(function (element) {
        //     element.setAttribute('readonly', true);
        //     element.value = originalValues[element.id];
        // });

        // // Reset email field to its original value and set it to readonly
        // emailInput.value = originalValues[emailInput.id];
        // emailInput.setAttribute('readonly', true);

        // Reset checkboxes to their original values
        checkboxes.forEach(function (checkbox) {
            checkbox.checked = originalValues[checkbox.id];
            checkbox.disabled = true;
        });

        // Reset weight dropdown to its original value and disable it again
        weightDropdown.value = originalValues[weightDropdown.id];
        weightDropdown.disabled = true;

        // Reset experience level range to its original value and disable it again
        experienceRange.value = originalValues[experienceRange.id];
        experienceRange.disabled = true;
        experienceValue.innerText = originalValues[experienceRange.id];
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const scheduleButton = document.getElementById('scheduleButton');

    scheduleButton.addEventListener('click', function () {
        window.location.href = '/availabilityData';
    });
});


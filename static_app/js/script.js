// Get the form element
const form = document.getElementById('tambah-informasi');

// Add event listener to form submission
form.addEventListener('submit', function (event) {

    // Trigger the modal programmatically
    const successModal = new bootstrap.Modal(document.getElementById('notif'));
    successModal.show();

    // Hide the modal after 1 second
    setTimeout(function () {
        successModal.hide();
    }, 750);
});

// Get the form element
const form1 = document.getElementById('tambah-waiting');

// Add event listener to form submission
form1.addEventListener('submit', function (event) {

    // Trigger the modal programmatically
    const successModal = new bootstrap.Modal(document.getElementById('notif'));
    successModal.show();

    // Hide the modal after 1 second
    setTimeout(function () {
        successModal.hide();
    }, 750);
});

// Get the form element
const form2 = document.getElementById('set_table');

// Add event listener to form submission
form2.addEventListener('submit', function (event) {

    // Trigger the modal programmatically
    const successModal = new bootstrap.Modal(document.getElementById('notif'));
    successModal.show();

    // Hide the modal after 1 second
    setTimeout(function () {
        successModal.hide();
    }, 750);
});

// Get all the image elements
const images = document.querySelectorAll('.clickable-image');

// Attach a click event listener to each image
images.forEach(image => {
    image.addEventListener('click', function () {
        // Access information about the clicked image
        const altText = this.alt;

        // Get the reference to the input element by its ID
        const inputField = document.getElementById('table-number');

        // Retrieve the information from your script.js file
        const table_number = altText;

        // Set the value of the input element to the information
        inputField.value = table_number;
    });
});

function toTitleCase(str) {
    return str.toLowerCase().replace(/(?:^|\s)\w/g, function (match) {
        return match.toUpperCase();
    });
}


// Get all the paragraph elements with class "clickable-paragraph"
const paragraphs = document.querySelectorAll('.clickable-paragraph');

// Attach a click event listener to each paragraph
paragraphs.forEach(paragraph => {
    paragraph.addEventListener('click', function () {

        // Access information about the clicked paragraph
        const title = this.getAttribute('title');

        // Get the reference to the input element by its ID
        const inputField = document.getElementById('id-waiting');

        // Set the value of the input element to the information (title)
        inputField.value = title;

        // Convert title to a numeric value (integer)
        const queueValue = parseInt(title);

        function searchByQueue(queueValue) {
            const foundObject = json_waiting.find(obj => obj.fields.queue === queueValue);

            if (foundObject) {
                // Get the input element by its ID
                const inputPlayer = document.getElementById('player');
                const inputPlay_time = document.getElementById('play-time');

                // Set the value of the input elements to the data from the found object
                inputPlayer.value = toTitleCase(foundObject.fields.player); // Assuming you want to set the 'player' field from the found object
                inputPlay_time.value = foundObject.fields.play_time.substring(0, 5); // Extract the HH:MM part

            } else {
                console.log('No object found with the queue:', queueValue);
            }
        }


        // Example: Call the searchByPK function with the desired primary key value to search for
        searchByQueue(queueValue); // Replace with the desired primary key value
    });
});


function validateTambahInformasi() {
    // Get the input elements by their IDs
    var input1 = document.getElementById("required-tambah-info1");
    var input2 = document.getElementById("required-tambah-info2");

    // Check if the fields are empty
    if (input1.value === '') {
        input1.setCustomValidity("Waktu main harus diisi!");
    } else {
        input1.setCustomValidity("");
        // Check the time format
        const timeFormatRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
        if (!timeFormatRegex.test(input1.value.trim())) {
            input1.setCustomValidity("Format waktu salah. Gunakan format hh:mm");
            return;
        }
    }

    if (input2.value === '') {
        input2.setCustomValidity("Nama harus diisi!");
    } else {
        input2.setCustomValidity("");
    }

    // Check if any of the fields are empty
    if (input1.validity.valueMissing || input2.validity.valueMissing) {
        return;
    }

    // close button
    var closeButton = document.getElementById("close-button-tambah-info");

    // automatically click the close button of tambah informasi modal after submit button clicked
    closeButton.click();
}

// Add event listener to the input field to check the format on input
const timeInput_tambah_info = document.getElementById("required-tambah-info1");
timeInput_tambah_info.addEventListener("input", function () {
    checkTimeFormat(this);
});





function validateTambahWaitingList() {
    // Get the input elements by their IDs
    var input1 = document.getElementById("required-tambah-wait1");
    var input2 = document.getElementById("required-tambah-wait2");

    // Check if the fields are empty
    if (input1.value === '') {
        input1.setCustomValidity("Waktu main harus diisi!");
    } else {
        input1.setCustomValidity("");
        // Check the time format
        const timeFormatRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
        if (!timeFormatRegex.test(input1.value.trim())) {
            input1.setCustomValidity("Format waktu salah. Gunakan format hh:mm");
            return;
        }
    }

    if (input2.value === '') {
        input2.setCustomValidity("Nama harus diisi!");
    } else {
        input2.setCustomValidity("");
    }

    // Check if any of the fields are empty
    if (input1.validity.valueMissing || input2.validity.valueMissing) {
        return;
    }

    // close button
    var closeButton = document.getElementById("close-button-tambah-wait");

    // automatically click the close button of tambah informasi modal after submit button clicked
    closeButton.click();
}

// Add event listener to the input field to check the format on input
const timeInput_tambah_wait = document.getElementById("required-tambah-wait1");
timeInput_tambah_wait.addEventListener("input", function () {
    checkTimeFormat(this);
});



// Script 1 - Function to check if player field is not 'EMPTY'
function isPlayerNotEmpty(tableNumber, jsonData) {
    // Find the data with the specified table number in the jsonData array
    const data = jsonData.find(item => item.fields.table_number === tableNumber);

    // Check if the data is found and the player field is not 'EMPTY' and not an empty string
    if (data && data.fields.player !== 'EMPTY' && data.fields.player.trim() !== '') {
        return true; // Player is not 'EMPTY'
    }

    return false; // Player is 'EMPTY' or data is not found
}

// Script 2 - Function to validate the form
function validateSetTable() {
    // Get the input elements by their IDs
    var playTimeInput = document.getElementById("play-time");
    var playerInput = document.getElementById("player");
    var tableNumberInput = document.getElementById("input_no");

    // Check if the fields are empty
    if (playTimeInput.value === '') {
        playTimeInput.setCustomValidity("Waktu main harus diisi!");
        return;
    }
    
    else {
        playTimeInput.setCustomValidity("");

        // Check the time format
        const timeFormatRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
        if (!timeFormatRegex.test(playTimeInput.value.trim())) {
            playTimeInput.setCustomValidity("Format waktu salah. Gunakan format hh:mm");
            return;
        }
    }

    if (playerInput.value === '') {
        playerInput.setCustomValidity("Nama harus diisi!");
        return;
    } 
    
    else {
        playerInput.setCustomValidity("");
    }

    // Check if the table number is within the specified range (1-16) or is empty
    if (tableNumberInput.value === '') {
        tableNumberInput.setCustomValidity("Nomor meja harus diisi!");
    } 
    
    else if (tableNumberInput.value < 1 || tableNumberInput.value > 16) {
        tableNumberInput.setCustomValidity("Nomor meja harus di antara 1 dan 16!");
    } 
    
    else {

        // Check if the player field is not 'EMPTY' for the specified table number
        const tableNumber = parseInt(tableNumberInput.value);

        if (isPlayerNotEmpty(tableNumber, json_table)) {
            tableNumberInput.setCustomValidity("Meja tidak kosong!");
        } 
        
        else {
            tableNumberInput.setCustomValidity("");
            // Close button
            var closeButton = document.getElementById("close-button-set-table");

            // Automatically click the close button of the modal after the submit button is clicked
            closeButton.click();
        }
    }

    // Check if any of the fields are empty or the table number is invalid
    if (playTimeInput.validity.valueMissing || playerInput.validity.valueMissing || tableNumberInput.validity.rangeUnderflow || tableNumberInput.validity.rangeOverflow || tableNumberInput.validity.valueMissing) {
        return;
    }
}


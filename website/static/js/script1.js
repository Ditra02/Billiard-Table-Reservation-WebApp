// ! fix 1
function msToHMS(duration) {
    let seconds = Math.floor((duration / 1000) % 60);
    let minutes = Math.floor((duration / (1000 * 60)) % 60);
    let hours = Math.floor(duration / (1000 * 60 * 60));

    // Add leading zeros if necessary
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function timeStringToMilliseconds(timeString) {
    const [hours, minutes, seconds] = timeString.split(":").map(Number);
    const totalMilliseconds = (hours * 3600 + minutes * 60 + seconds) * 1000;
    return totalMilliseconds;
}


function getCurrentTime() {
    const options = { timeZone: 'Asia/Jakarta', hour12: false };
    return new Date().toLocaleString('en-US', options).split(', ')[1];
}


// ! fix
// JavaScript
function countDown(finish) {
    function updateTimer() {
        const currentTime = getCurrentTime();
        const currentTimeInMs = timeStringToMilliseconds(currentTime);

        // Calculate the time remaining in milliseconds
        const timeCountDown = finish - currentTimeInMs;

        // If the time remaining is less than or equal to zero, clear the interval
        if (timeCountDown <= 0) {
            clearInterval(timer);
            console.log("Countdown has finished!");
            return;
        }

        // Convert the remaining time in milliseconds to "hh:mm:ss" format
        const remainingTime = msToHMS(timeCountDown);

        // let timer = document.getElementById("timer");

        // // Set the remaining time in the "timer" element
        // timer.textContent = "";

        const timerElements = document.querySelectorAll('.timer');

        // Set the text content for the first <p> tag with class "timer"
        timerElements[0].textContent = remainingTime;
    }

    // Initial update of the timer
    updateTimer();

    // Create a timer using setInterval
    const timer = setInterval(updateTimer, 1000); // Timer updates every 1 second (1000ms)
}

// Get the <a> element
const myLink = document.getElementById("disable-a");

// Disable click event
myLink.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default behavior of the link
    // Add any other actions you want to perform when the link is clicked
});


// Get all the image elements
const images = document.querySelectorAll('.clickable-image');

// Attach a click event listener to each image
images.forEach(image => {
    image.addEventListener('click', function () {
        // Access information about the clicked image
        const altText = this.alt;

        // Convert altText to an integer
        const tableNumber = parseInt(altText, 10);

        function searchByTableNumber(table_number) {
            const foundObject = json_table.find(obj => obj.fields.table_number === table_number);
            
            if (foundObject) {
                // Get the paragraph element by its ID
                const startTimeParagraph = document.getElementById('start-time');
                const finishTimeParagraph = document.getElementById('finish-time');

                // Set the text content of the paragraph to the altText value
                startTimeParagraph.textContent = `Mulai: ${foundObject.fields.start.substring(0, 5)}`;
                finishTimeParagraph.textContent = `Selesai: ${foundObject.fields.finish.substring(0, 5)}`;
                
                console.log(startTimeParagraph);
                console.log(finishTimeParagraph);

                finish = foundObject.fields.finish.substring(0, 8);

                // Parse hours, minutes, and seconds from the finish variable
                let [hours, minutes, seconds] = finish.split(':').map(Number);

                // Convert hours, minutes, and seconds to milliseconds
                let waktu = (hours * 3600 + minutes * 60 + seconds) * 1000;

                // Memanggil fungsi hitungMundur dengan waktu hitung mundur yang diinginkan (dalam milidetik)
                countDown(waktu);

            } else {
                console.log('No object found with the table number:', table_number);
            }
            
        }


        // Example: Call the searchByPK function with the desired primary key value to search for
        searchByTableNumber(tableNumber); // Replace with the desired primary key value
    });
});

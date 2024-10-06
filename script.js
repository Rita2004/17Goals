// Allow items to be dragged over bins
function allowDrop(event) {
    event.preventDefault();
}

// Handle drag start event
function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

// Handle drop event and give feedback
function drop(event) {
    event.preventDefault();
    const draggedItemId = event.dataTransfer.getData("text");
    const draggedItem = document.getElementById(draggedItemId);
    const binType = event.target.closest('.bin').getAttribute('data-type');
    const itemType = draggedItem.getAttribute('data-type');
    
    const feedbackText = document.getElementById('feedback-text');

    // Clear previous feedback
    feedbackText.innerHTML = '';
    const existingVideo = document.querySelector('#feedback video');
    if (existingVideo) {
        existingVideo.remove();
    }

    // Check if the item is dropped into the correct bin
    if (binType === itemType) {
        feedbackText.innerHTML = `<p style="color: green;">Correct! Good job sorting this item.</p>`;
    } else {
        feedbackText.innerHTML = `<p style="color: red;">Incorrect! Let's see what happens when waste isn't sorted correctly.</p>`;
        
        // Display the consequence video for incorrect sorting
        const consequenceVideo = document.createElement('video');
        consequenceVideo.controls = true;
        consequenceVideo.innerHTML = `<source src="rubbish.mp4" type="video/mp4">`;
        
        // Set styles for the video to make it smaller
        consequenceVideo.style.width = '320px'; // Change this value to set desired width
        consequenceVideo.style.height = 'auto'; // Maintain aspect ratio

        document.getElementById('feedback').appendChild(consequenceVideo);
    }
}

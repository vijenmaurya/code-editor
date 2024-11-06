// Function to download only the editor content as an image
function downloadAsImage() {
    var editorContainer = document.getElementById('editorContainer');

    // Use html2canvas to capture the editor container
    html2canvas(editorContainer, {
        scale: 16, // Increase scale for higher quality image
        backgroundColor: '#000000' // Set to match editor background
    }).then(function (canvas) {
        // Create a link element to trigger the download
        var link = document.createElement('a');
        link.download = Date.now() + '-instagram.png'; // Specify the file name
        link.href = canvas.toDataURL('image/png'); // Get image data as a PNG
        link.click(); // Programmatically trigger the download
    }).catch(function (error) {
        console.error('Error capturing the image:', error);
    });
}
function downloadAsImage() {
    var editorContainer = document.getElementById('editorContainer');

    html2canvas(editorContainer, {
        scale: 16,
        backgroundColor: '#000000',
        useCORS: true,
        logging: true
    }).then(function (canvas) {
        var link = document.createElement('a');
        link.download = Date.now() + '-instagram.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    }).catch(function (error) {
        console.error('Error capturing the image:', error);
    });
}
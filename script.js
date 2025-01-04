document.getElementById('imageUpload').addEventListener('change', function (event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    const canvas = document.getElementById('imagePreview');
    const ctx = canvas.getContext('2d');

    reader.onload = function (e) {
        const img = new Image();
        img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
});

document.getElementById('convertButton').addEventListener('click', function () {
    const fileInput = document.getElementById('imageUpload');
    if (fileInput.files.length === 0) {
        alert('Please upload an image first.');
        return;
    }

    const formData = new FormData();
    formData.append('image', fileInput.files[0]);

    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.blob())
    .then(blob => {
        const downloadLink = document.getElementById('downloadLink');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = 'converted.pes';
        downloadLink.style.display = 'block';
        downloadLink.click();
    })
    .catch(error => console.error('Error:', error));
});

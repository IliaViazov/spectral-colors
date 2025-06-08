document.querySelectorAll('.box img').forEach((img) => {
    img.addEventListener('click', () => {
        // Get the image src, e.g., "spectral/flute/1.png"
        const imgSrc = img.getAttribute('src');
        // Replace "spectral" with "sounds" and ".png" with ".mp3"
        const soundSrc = imgSrc.replace('spectral', 'sounds').replace('.png', '.mp3');
        const audio = new Audio(soundSrc);
        audio.play();
    });
});

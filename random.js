window.addEventListener('DOMContentLoaded', () => {
    // Select all images inside .parent .box
    const parent = document.querySelector('.parent');
    if (!parent) return;

    const images = Array.from(parent.querySelectorAll('.box img'));
    const srcs = images.map(img => img.getAttribute('src'));
    const alts = images.map(img => img.getAttribute('alt'));

    // Prepare sound file names (assumes same order as images, and .mp3 in /sounds/...)
    // Example: "spectral/flute/1.png" → "sounds/flute/1.mp3"
    const sounds = srcs.map(src => {
        // Extract instrument and number from the image src
        const match = src.match(/spectral\/([^/]+)\/(\d+)\.png$/);
        if (match) {
            return `sounds/${match[1]}/${match[2]}.mp3`;
        }
        return null;
    });

    // Shuffle function
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Shuffle indices for srcs, alts, and sounds together
    const indices = srcs.map((_, i) => i);
    shuffle(indices);

    images.forEach((img, i) => {
        img.setAttribute('src', srcs[indices[i]]);
        img.setAttribute('alt', alts[indices[i]]);
        img.dataset.sound = sounds[indices[i]];
        img.style.cursor = "pointer";
        img.onclick = function() {
            if (img.dataset.sound) {
                const audio = new Audio(img.dataset.sound);
                audio.play();
            }
        };
    });
});

window.addEventListener('DOMContentLoaded', () => {
    const parent = document.querySelector('.parent');
    if (!parent) return;

    // List all instruments and how many images each has
    const instrumentImages = {
        flute: 5,
        oboe: 4,
        clarinet: 5,
        bassoon: 5,
        contrabassoon: 3,
        'english-horn': 4,
        'alto-saxophone': 3, // ← adjust the number to match your image count
        'bass-clarinet': 5,
        // Add new instruments here:
        // 'new-instrument': NUMBER_OF_IMAGES
    };

    // Build an array of all possible image objects
    const allImages = [];
    for (const [instrument, count] of Object.entries(instrumentImages)) {
        for (let i = 1; i <= count; i++) {
            allImages.push({
                src: `spectral/${instrument}/${i}.png`,
                alt: `${instrument.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} ${i}`,
                sound: `sounds/${instrument}/${i}.mp3`
            });
        }
    }

    // Shuffle function
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Get all .box elements in the grid
    const boxes = Array.from(parent.querySelectorAll('.box'));
    // Shuffle all available images and pick as many as there are boxes
    const chosen = shuffle(allImages.slice()).slice(0, boxes.length);

    // Assign images and sounds to boxes
    boxes.forEach((box, i) => {
        const img = box.querySelector('img');
        if (img && chosen[i]) {
            img.src = chosen[i].src;
            img.alt = chosen[i].alt;
            img.dataset.sound = chosen[i].sound;
            img.style.cursor = "pointer";
            img.onclick = function() {
                if (img.dataset.sound) {
                    const audio = new Audio(img.dataset.sound);
                    audio.play();
                }
            };
        }
    });
});

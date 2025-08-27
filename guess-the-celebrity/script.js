let image = new Image();
let pixelation = 20;
let actualName = "";
let canvas = document.getElementById("celebrityCanvas");
let ctx = canvas.getContext("2d");

fetch("data.json")
    .then(response => response.json())
    .then(data => {
        const today = new Date().toISOString().slice(0, 10);
        const todayEntry = data[today] || data["default"];
        actualName = todayEntry.name.toLowerCase();
        image.src = todayEntry.image;
    });

image.onload = function () {
    drawPixelated(pixelation);
};

function drawPixelated(pixelSize) {
    const w = canvas.width;
    const h = canvas.height;
    ctx.drawImage(image, 0, 0, w, h);
    let imgData = ctx.getImageData(0, 0, w, h);

    for (let y = 0; y < h; y += pixelSize) {
        for (let x = 0; x < w; x += pixelSize) {
            const red = imgData.data[((w * y + x) * 4)];
            const green = imgData.data[((w * y + x) * 4) + 1];
            const blue = imgData.data[((w * y + x) * 4) + 2];
            ctx.fillStyle = `rgb(${red},${green},${blue})`;
            ctx.fillRect(x, y, pixelSize, pixelSize);
        }
    }
}

function revealMore() {
    if (pixelation > 1) {
        pixelation -= 3;
        drawPixelated(pixelation);
    }
}

function submitGuess() {
    const userGuess = document.getElementById("guessInput").value.toLowerCase();
    const feedback = document.getElementById("feedback");
    if (userGuess === actualName) {
        feedback.textContent = "Correct! 🎉";
    } else {
        feedback.textContent = "Nope, try again!";
    }
}

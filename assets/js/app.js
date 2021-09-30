const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

context.scale(20, 20);

const matrix = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0],
];

const player = {
    position: { x: 5, y: 5 },
    matrix: matrix,
};

let lastTime = 0;
let dropCounter = 0;
let dropInterval = 1000;

// General draw function 
function draw() {
    // Clearing the canvas
    context.fillStyle = 'darkgrey';
    context.fillRect(0, 0, canvas.width, canvas.height);

    drawMatrix(player.matrix, player.position);
}

// Draw the matrix function
function drawMatrix(matrix, offset) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = 'red';
                context.fillRect(
                    x + offset.x,
                    y + offset.y,
                    1, 1
                );
            }
        });
    });
};

// Update function
function update(time = 0) {
    const deltaTime = time - lastTime;
    lastTime = time;

    // the tetromino drops every second
    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
        player.position.y++;
        dropCounter = 0;
    }

    draw();
    requestAnimationFrame(update);
}

// Initialize the game 
update();
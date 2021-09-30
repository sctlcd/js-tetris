const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

context.fillStyle = 'darkgrey';
context.fillRect(0, 0, canvas.width, canvas.height);

context.scale(20, 20);

const matrix = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0],
];

// General draw function 
function draw() {
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
function update() {
    draw();
    requestAnimationFrame(update);
}

const player = {
    position: { x: 5, y: 5 },
    matrix: matrix,
}

// Initialize the game 
update();
const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

context.scale(20, 20);

context.fillStyle = 'darkgrey';
context.fillRect(0, 0, canvas.width, canvas.height);

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

const player = {
    position: { x: 5, y: 5 },
    matrix: matrix,
}

draw();
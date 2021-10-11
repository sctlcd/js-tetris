const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

context.scale(20, 20);

const board = createMatrix(12, 20);

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

// Collide function 
function collide(board, player) {
    const mat = player.matrix;
    const off = player.position;
    for (let y = 0; y < mat.length; ++y) {
        for (let x = 0; x < mat[y].length; ++x) {
            if (mat[y][x] !== 0 &&
                (board[y + off.y] &&
                    board[y + off.y][x + off.x]) !== 0) {
                return true;
            }
        }
    }
    return false;
}

// Function create matrix
function createMatrix(width, height) {
    const matrix = [];
    // while we have height, while height != 0 we decrese height with 1
    while (height--) {
        matrix.push(new Array(width).fill(0));
    }
    return matrix;
}

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
}

// Merge function - Copy all the values from the player into the board 
// at correct positions
function merge(board, player) {
    player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                board[y + player.position.y][x + player.position.x] = value;
            }
        });
    });
}

// Drop player function
function playerDrop() {
    player.position.y++;
    if (collide(board, player)) {
        player.position.y--;
        merge(board, player);
        player.position.y = 0;
    }
    dropCounter = 0;
}

// Update function
function update(time = 0) {
    const deltaTime = time - lastTime;
    lastTime = time;

    // the tetromino drops every second
    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
        playerDrop();
    }

    draw();
    requestAnimationFrame(update);
}

// Event listener on keydown
document.addEventListener('keydown', event => {
    if (event.keyCode === 37) {
        player.position.x--;
    }
    else if (event.keyCode === 39) {
        player.position.x++;
    }
    else if (event.keyCode === 40) {
        playerDrop();
    }
});

// Initialize the game 
update();
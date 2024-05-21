const gameContainer = document.getElementById('game-container');
const moveCounter = document.getElementById('move-counter');
const resetButton = document.getElementById('reset-button');

let tiles;
let emptyIndex;
let moveCount;

function initGame() {
    tiles = [...Array(15).keys()].map(x => x + 1);
    tiles.push(null); // empty space
    shuffle(tiles);
    renderGame();
    moveCount = 0;
    moveCounter.textContent = moveCount;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    if (!isSolvable(array)) {
        [array[0], array[1]] = [array[1], array[0]]; // Ensure solvability
    }
}

function isSolvable(array) {
    let inversions = 0;
    for (let i = 0; i < array.length; i++) {
        for (let j = i + 1; j < array.length; j++) {
            if (array[i] && array[j] && array[i] > array[j]) inversions++;
        }
    }
    return inversions % 2 === 0;
}

function renderGame() {
    gameContainer.innerHTML = '';
    tiles.forEach((tile, index) => {
        const tileElement = document.createElement('div');
        tileElement.classList.add('tile');
        if (tile === null) {
            tileElement.classList.add('empty');
            emptyIndex = index;
        } else {
            tileElement.textContent = tile;
            tileElement.addEventListener('click', () => moveTile(index));
        }
        gameContainer.appendChild(tileElement);
    });
}

function moveTile(index) {
    const validMoves = [emptyIndex - 1, emptyIndex + 1, emptyIndex - 4, emptyIndex + 4];
    if (validMoves.includes(index) && Math.abs(emptyIndex - index) !== 2) {
        [tiles[emptyIndex], tiles[index]] = [tiles[index], tiles[emptyIndex]];
        emptyIndex = index;
        renderGame();
        moveCount++;
        moveCounter.textContent = moveCount;
        checkWin();
    }
}

function checkWin() {
    if (tiles.slice(0, 15).every((tile, index) => tile === index + 1)) {
        setTimeout(() => alert(`Вы выиграли за ${moveCount} ходов!`), 100);
    }
}

resetButton.addEventListener('click', initGame);

initGame();

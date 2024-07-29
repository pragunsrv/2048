document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById('grid-container');
    const cells = Array.from(document.getElementsByClassName('grid-cell'));
    const scoreDisplay = document.getElementById('score');
    const highScoreDisplay = document.getElementById('high-score');
    const gameOverDisplay = document.getElementById('game-over');
    const congratulationsDisplay = document.getElementById('congratulations');
    const resetButton = document.getElementById('reset-button');
    const undoButton = document.getElementById('undo-button');
    const aiButton = document.getElementById('ai-button');
    const saveButton = document.getElementById('save-button');
    const loadButton = document.getElementById('load-button');
    let score = 0;
    let highScore = 0;
    let previousState = [];
    let previousScore = 0;

    // Initialize the game with two random tiles
    function initGame() {
        addRandomTile();
        addRandomTile();
        updateScore(0);
        loadHighScore();
    }

    // Save the current state for undo
    function saveState() {
        previousState = cells.map(cell => cell.innerHTML);
        previousScore = score;
    }

    // Restore the previous state
    function undoMove() {
        cells.forEach((cell, index) => {
            cell.innerHTML = previousState[index];
            cell.style.backgroundColor = getTileColor(previousState[index]);
        });
        updateScore(previousScore);
    }

    // Add a random tile (2 or 4) to an empty cell
    function addRandomTile() {
        const emptyCells = cells.filter(cell => !cell.innerHTML);
        if (emptyCells.length > 0) {
            const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            randomCell.innerHTML = Math.random() < 0.9 ? 2 : 4;
            randomCell.style.backgroundColor = randomCell.innerHTML == 2 ? '#eee4da' : '#ede0c8';
        }
    }

    // Move tiles in the specified direction
    function moveTiles(direction) {
        let hasMoved = false;
        saveState();

        // Group cells by rows or columns
        const groups = [];
        if (direction === 'up' || direction === 'down') {
            for (let col = 0; col < 4; col++) {
                const group = [];
                for (let row = 0; row < 4; row++) {
                    group.push(cells[row * 4 + col]);
                }
                groups.push(group);
            }
        } else if (direction === 'left' || direction === 'right') {
            for (let row = 0; row < 4; row++) {
                const group = [];
                for (let col = 0; col < 4; col++) {
                    group.push(cells[row * 4 + col]);
                }
                groups.push(group);
            }
        }

        // Move and merge tiles within each group
        groups.forEach(group => {
            const values = group.map(cell => parseInt(cell.innerHTML) || 0);
            let newValues;

            if (direction === 'up' || 'left') {
                newValues = mergeTiles(values);
            } else if (direction === 'down' || 'right') {
                newValues = mergeTiles(values.reverse()).reverse();
            }

            group.forEach((cell, index) => {
                if (cell.innerHTML != newValues[index]) {
                    hasMoved = true;
                }
                cell.innerHTML = newValues[index] ? newValues[index] : '';
                cell.style.backgroundColor = getTileColor(newValues[index]);
            });
        });

        if (hasMoved) {
            addRandomTile();
            updateScore(score);
            check2048();
            if (isGameOver()) {
                gameOverDisplay.classList.remove('hidden');
            }
        }
    }

    // Merge tiles with the same value
    function mergeTiles(values) {
        const newValues = values.filter(value => value);
        for (let i = 0; i < newValues.length - 1; i++) {
            if (newValues[i] === newValues[i + 1]) {
                newValues[i] *= 2;
                updateScore(score + newValues[i]);
                newValues[i + 1] = 0;
            }
        }
        return newValues.filter(value => value).concat(Array(4 - newValues.length).fill(0));
    }

    // Get the background color for a tile value
    function getTileColor(value) {
        switch (value) {
            case 2: return '#eee4da';
            case 4: return '#ede0c8';
            case 8: return '#f2b179';
            case 16: return '#f59563';
            case 32: return '#f67c5f';
            case 64: return '#f65e3b';
            case 128: return '#edcf72';
            case 256: return '#edcc61';
            case 512: return '#edc850';
            case 1024: return '#edc53f';
            case 2048: return '#edc22e';
            default: return '#cdc1b4';
        }
    }

    // Update the score display
    function updateScore(newScore) {
        score = newScore;
        scoreDisplay.innerHTML = `Score: ${score}`;
        if (score > highScore) {
            highScore = score;
            highScoreDisplay.innerHTML = `High Score: ${highScore}`;
            saveHighScore(highScore);
        }
    }

    // Check if the game is over (no more possible moves)
    function isGameOver() {
        if (cells.some(cell => !cell.innerHTML)) return false;

        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                const cell = cells[row * 4 + col];
                const value = parseInt(cell.innerHTML);
                if ((row > 0 && value === parseInt(cells[(row - 1) * 4 + col].innerHTML)) ||
                    (row < 3 && value === parseInt(cells[(row + 1) * 4 + col].innerHTML)) ||
                    (col > 0 && value === parseInt(cells[row * 4 + col - 1].innerHTML)) ||
                    (col < 3 && value === parseInt(cells[row * 4 + col + 1].innerHTML))) {
                    return false;
                }
            }
        }
        return true;
    }

    // Check if 2048 tile is achieved
    function check2048() {
        if (cells.some(cell => parseInt(cell.innerHTML) === 2048)) {
            congratulationsDisplay.classList.remove('hidden');
        }
    }

    // Reset the game
    function resetGame() {
        cells.forEach(cell => {
            cell.innerHTML = '';
            cell.style.backgroundColor = '#cdc1b4';
        });
        gameOverDisplay.classList.add('hidden');
        congratulationsDisplay.classList.add('hidden');
        score = 0;
        updateScore(score);
        initGame();
    }

    // AI Move: Make a move based on a simple strategy
    function aiMove() {
        const directions = ['up', 'down', 'left', 'right'];
        const randomDirection = directions[Math.floor(Math.random() * directions.length)];
        moveTiles(randomDirection);
    }

    // Save the current game state to localStorage
    function saveGame() {
        const gameState = cells.map(cell => cell.innerHTML);
        localStorage.setItem('2048-gameState', JSON.stringify(gameState));
        localStorage.setItem('2048-score', score);
        localStorage.setItem('2048-highScore', highScore);
    }

    // Load the game state from localStorage
    function loadGame() {
        const savedGameState = JSON.parse(localStorage.getItem('2048-gameState'));
        const savedScore = parseInt(localStorage.getItem('2048-score'));
        const savedHighScore = parseInt(localStorage.getItem('2048-highScore'));

        if (savedGameState && savedScore >= 0) {
            cells.forEach((cell, index) => {
                cell.innerHTML = savedGameState[index];
                cell.style.backgroundColor = getTileColor(savedGameState[index]);
            });
            updateScore(savedScore);
            if (savedHighScore) {
                highScore = savedHighScore;
                highScoreDisplay.innerHTML = `High Score: ${highScore}`;
            }
        }
    }

    // Save the high score to localStorage
    function saveHighScore(score) {
        localStorage.setItem('2048-highScore', score);
    }

    // Load the high score from localStorage
    function loadHighScore() {
        const savedHighScore = parseInt(localStorage.getItem('2048-highScore'));
        if (savedHighScore) {
            highScore = savedHighScore;
            highScoreDisplay.innerHTML = `High Score: ${highScore}`;
        }
    }

    // Event listeners
    resetButton.addEventListener('click', resetGame);
    undoButton.addEventListener('click', undoMove);
    aiButton.addEventListener('click', aiMove);
    saveButton.addEventListener('click', saveGame);
    loadButton.addEventListener('click', loadGame);

    document.addEventListener('keydown', event => {
        switch (event.key) {
            case 'ArrowUp':
                moveTiles('up');
                break;
            case 'ArrowDown':
                moveTiles('down');
                break;
            case 'ArrowLeft':
                moveTiles('left');
                break;
            case 'ArrowRight':
                moveTiles('right');
                break;
        }
    });

    initGame();
});

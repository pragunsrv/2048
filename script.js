document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById('grid-container');
    const cells = Array.from(document.getElementsByClassName('grid-cell'));

    // Initialize the game with two random cells
    function initGame() {
        addRandomTile();
        addRandomTile();
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

    // Handle keyboard input for moving tiles
    document.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'ArrowUp':
                // Handle up arrow key
                break;
            case 'ArrowDown':
                // Handle down arrow key
                break;
            case 'ArrowLeft':
                // Handle left arrow key
                break;
            case 'ArrowRight':
                // Handle right arrow key
                break;
        }
    });

    initGame();
});

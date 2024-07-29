# 2048 Game - Version 10

This is a 2048 game built using HTML, CSS, and JavaScript. In this version, we have added animations for tile moves and merges, a leaderboard feature to track top scores, and a timer to measure the duration of the game.

## Features

- **Basic 2048 Gameplay**: Slide numbered tiles on a grid to combine them to create a tile with the number 2048.
- **Animations**: Tiles animate when moving or merging, providing better visual feedback.
- **Score Tracking**: The current score and high score are displayed.
- **Timer**: The game includes a timer to track how long the game has been played.
- **Undo**: Undo the last move.
- **AI Move**: Let the AI make a random move.
- **Save/Load Game**: Save the current game state and load it later.
- **Leaderboard**: Track the top scores with their respective times.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/2048-game.git
    ```
2. Navigate to the project directory:
    ```bash
    cd 2048-game
    ```

## Usage

1. Open `index.html` in your preferred web browser.
2. Use the arrow keys to slide the tiles.
3. Click the buttons for additional functionalities:
   - **Reset**: Start a new game.
   - **Undo**: Revert to the previous move.
   - **AI Move**: Let the AI make a move.
   - **Save**: Save the current game state.
   - **Load**: Load the previously saved game state.

## Game Rules

- Use the arrow keys to move the tiles.
- Tiles with the same number merge into one when they touch.
- Add up the numbers to reach the 2048 tile and win the game.

## Leaderboard

The leaderboard keeps track of the top 5 scores along with the time taken to achieve them. The leaderboard data is saved in the browser's local storage.

## File Structure

```
2048-game/
├── index.html
├── styles.css
└── script.js
```

- `index.html`: The main HTML file that contains the structure of the game.
- `styles.css`: The CSS file that contains the styling for the game.
- `script.js`: The JavaScript file that contains the logic for the game.

## License

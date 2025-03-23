# Puzzle Game

A fun and interactive puzzle game built with **React**, **Vite**, and **Tailwind CSS**. The game challenges players to solve a 3x3 sliding puzzle by rearranging pieces of an image. It features a timer, a reference image, and a responsive design optimized for touch screens.

---

## Features

- **Interactive Puzzle**: Drag and drop (or tap) to rearrange puzzle pieces.
- **Timer**: A countdown timer adds excitement and urgency to the game.
- **Reference Image**: A small reference image is displayed to help players solve the puzzle.
- **Responsive Design**: Optimized for **1080x1920** touch screens.
- **Game Over Screen**: Displays the player's score and offers a "Play Again" option.
- **SweetAlert2 Notifications**: Notifications for game completion, time warnings, and game over.

---

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A fast build tool for modern web development.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **SweetAlert2**: A beautiful, responsive, and customizable popup library.

---

## Installation

Follow these steps to set up the project locally:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/JanithGunathilake/Puzzle-Game.git
   cd puzzle-game
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Run the Development Server**:
   ```bash
   npm run dev
   ```
4. **Open the App**:
   Visit [http://localhost:5173](http://localhost:5173) in your browser to play the game.

---

## How to Play

### Start the Game:
- Click the "Start Game" button on the home page.

### Solve the Puzzle:
- Rearrange the puzzle pieces by clicking/tapping on adjacent pieces to move them into the empty space.
- Use the reference image in the bottom-right corner to guide you.

### Timer:
- You have 3 minutes to solve the puzzle.
- A notification will appear when there are 10 seconds left.

### Game Over:
- If you solve the puzzle, you'll see a congratulatory message with your score.
- If time runs out, the game will end, and your score will be displayed.

### Play Again:
- Click "Play Again" to restart the game.

---

## Project Structure

```
puzzle-game/
├── public/
│   └── photo.png          # Puzzle image
├── src/
│   ├── components/        # React components
│   │   ├── GamePage.jsx   # Main game logic
│   │   └── StartPage.jsx  # Start screen
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── tailwind.config.js     # Tailwind CSS configuration
├── vite.config.js         # Vite configuration
├── package.json           # Project dependencies
└── README.md              # Project documentation
```

---

## Customization

### Change the Puzzle Image:
- Replace the `public/photo.png` file with your desired image.
- Ensure the image is **1000x1000 pixels** for optimal results.

### Adjust the Timer:
- Modify the `timeLeft` state in `GamePage.jsx` to change the initial timer value.

### Styling:
- Use Tailwind CSS utility classes in the components to customize the appearance.

---

## Contributing

Contributions are welcome! If you'd like to improve the game, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes.
4. Submit a pull request.

---

## License

This project is licensed under the **MIT License**. See the `LICENSE` file for details.

---

## Acknowledgments

- **React**: For providing a powerful framework for building user interfaces.
- **Vite**: For enabling fast and efficient development.
- **Tailwind CSS**: For making styling easy and intuitive.
- **SweetAlert2**: For beautiful and responsive popups.

Enjoy the game! 🎮


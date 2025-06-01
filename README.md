# Simple Tetris

A simple, fully functional Tetris game built with React, Vite, and TypeScript.

## 🎮 Features

- **Complete Tetris gameplay** with all 7 classic pieces (I, O, T, S, Z, J, L)
- **Automatic piece dropping** with level-based speed increase
- **Line clearing** and scoring system
- **Smooth controls** with arrow keys
- **Pause/Resume** functionality
- **Game over** detection and restart
- **Clean Canvas rendering** with colorful pieces
- **User-friendly interface** with start button

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🎯 Controls

- **← →** Move piece left/right
- **↑** Rotate piece
- **↓** Drop piece faster
- **P** Pause/Resume game
- **R** Restart game

## 🛠️ Tech Stack

- **React 18.3.1** - UI framework
- **Vite 5.4.1** - Build tool
- **TypeScript 5.5.3** - Type safety
- **HTML5 Canvas** - Game rendering

## 📁 Project Structure

```
src/
├── types.ts              # Type definitions
├── pieces.ts             # Tetris piece shapes and colors
├── gameLogic.ts          # Core game logic functions
├── useGameState.ts       # Game state management
├── useGameLoop.ts        # Auto-drop game loop
├── useKeyboardControls.ts # Keyboard input handling
├── renderer.ts           # Canvas rendering functions
├── TetrisGame.tsx        # Main game component
└── App.tsx              # Application root
```

## 🎨 Game Features

### Core Mechanics
- ✅ Piece movement and rotation
- ✅ Collision detection
- ✅ Line clearing
- ✅ Score tracking
- ✅ Level progression
- ✅ Game over conditions

### User Experience
- ✅ Responsive controls
- ✅ Visual feedback
- ✅ Pause functionality
- ✅ Clean, modern UI
- ✅ Start game button

## 🧪 Development Features

The project includes development test components accessible via the "Development Test Components" accordion:
- **Game Logic Test** - Manual testing of game mechanics
- **Piece Test** - Individual piece rotation testing
- https://claude.ai/share/1bc677ad-8b87-4d65-9089-33fc87469894

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and enhancement requests.

---

**Enjoy playing Simple Tetris! 🎮**

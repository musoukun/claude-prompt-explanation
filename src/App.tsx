import { useEffect, useRef, useState } from 'react';
import { GameState } from './types';
import { TetrisGame } from './TetrisGame';
import { PieceTest } from './PieceTest';
import { GameTest } from './GameTest';
import { createEmptyBoard } from './gameLogic';

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<GameState>({
    board: createEmptyBoard(),
    currentPiece: null,
    score: 0,
    level: 1,
    lines: 0,
    isGameOver: false,
    isPaused: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 基本的な描画テスト
    ctx.fillStyle = '#222';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#fff';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Tetris Game Loading...', canvas.width / 2, canvas.height / 2);
  }, []);

  return (
    <div className="game-container">
      <h1>Simple Tetris</h1>
      
      {/* メインゲーム */}
      <TetrisGame />
      
      {/* テストコンポーネント */}
      <details style={{ margin: '20px', color: '#ccc' }}>
        <summary style={{ cursor: 'pointer', padding: '10px' }}>Development Test Components</summary>
        <GameTest />
        <PieceTest />
      </details>
      
      {/* 古いCanvasテストエリア */}
      <canvas
        ref={canvasRef}
        width={300}
        height={600}
        tabIndex={0}
        style={{ display: 'none' }} 
      />
      <div className="game-info" style={{ display: 'none' }}>
        <div>Score: {gameState.score}</div>
        <div>Level: {gameState.level}</div>
        <div>Lines: {gameState.lines}</div>
      </div>
      {gameState.isGameOver && (
        <div className="game-over" style={{ display: 'none' }}>
          <h2>Game Over</h2>
          <p>Press R to restart</p>
        </div>
      )}
    </div>
  );
}

export default App;

import { useEffect, useRef, useState } from 'react';
import { useGameState } from './useGameState';
import { useGameLoop } from './useGameLoop';
import { useKeyboardControls } from './useKeyboardControls';
import { getBoardWithCurrentPiece } from './gameLogic';
import { drawBoard, drawGameInfo, drawGameOverOverlay } from './renderer';

export const TetrisGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameStarted, setGameStarted] = useState(false);
  
  const {
    gameState,
    moveLeft,
    moveRight,
    rotatePiece,
    moveDown,
    resetGame,
    togglePause,
    spawnNewPiece,
  } = useGameState();

  useGameLoop(gameState, moveDown, spawnNewPiece, gameStarted);

  // ゲーム開始処理
  const startGame = () => {
    if (!gameStarted) {
      setGameStarted(true);
      spawnNewPiece();
    }
  };

  // リセット処理
  const handleReset = () => {
    setGameStarted(false);
    resetGame();
  };

  useKeyboardControls({
    moveLeft,
    moveRight,
    rotatePiece,
    moveDown,
    resetGame: handleReset,
    togglePause,
  }, gameStarted);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Canvasのフォーカスを有効にする
    canvas.focus();
  }, []);

  // Canvas描画処理
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 現在のピースを含むボードを取得
    const displayBoard = getBoardWithCurrentPiece(gameState.board, gameState.currentPiece);
    
    // ボードを描画
    drawBoard(ctx, displayBoard);
    
    // ゲーム情報を描画
    drawGameInfo(
      ctx,
      gameState.score,
      gameState.level,
      gameState.lines,
      gameState.isGameOver,
      gameState.isPaused
    );

    // ゲームオーバー時のオーバーレイを描画
    if (gameState.isGameOver) {
      drawGameOverOverlay(ctx);
    }
  }, [gameState]);

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      padding: '20px',
      border: '2px solid #fff',
      margin: '20px',
      backgroundColor: '#111'
    }}>
      <h2 style={{ margin: '0 0 20px 0', color: '#fff' }}>Tetris Game</h2>
      
      {!gameStarted && !gameState.currentPiece ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <button 
            onClick={startGame}
            style={{
              fontSize: '24px',
              padding: '15px 30px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginBottom: '20px'
            }}
          >
            START GAME
          </button>
          <div style={{ color: '#ccc', fontSize: '16px' }}>
            <div>Use arrow keys to play: ← → ↑ ↓</div>
            <div>P: Pause | R: Restart</div>
          </div>
        </div>
      ) : (
        <canvas
          ref={canvasRef}
          width={500}  // 10 * 30 (ボード) + 200 (情報表示エリア)
          height={600} // 20 * 30
          style={{
            border: '2px solid #666',
            backgroundColor: '#000',
          }}
          tabIndex={0}
          onFocus={() => console.log('Canvas focused')}
        />
      )}
      
      <div style={{ 
        marginTop: '10px', 
        textAlign: 'center',
        color: '#ccc',
        fontSize: '14px'
      }}>
        {gameStarted && (
          <>
            <div>Use arrow keys to play: ← → ↑ ↓</div>
            <div>P: Pause | R: Restart</div>
            <div>Click on the game area to focus for keyboard controls</div>
          </>
        )}
      </div>
    </div>
  );
};

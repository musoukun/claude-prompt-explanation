import { useGameState } from './useGameState';
import { useGameLoop } from './useGameLoop';
import { getBoardWithCurrentPiece } from './gameLogic';
import { PIECE_COLORS } from './pieces';

export const GameTest = () => {
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

  useGameLoop(gameState, moveDown, spawnNewPiece);

  const displayBoard = getBoardWithCurrentPiece(gameState.board, gameState.currentPiece);

  return (
    <div style={{ margin: '20px', padding: '20px', border: '1px solid #fff' }}>
      <h3>Game Logic Test</h3>
      
      <div style={{ marginBottom: '10px' }}>
        <button onClick={spawnNewPiece} style={{ margin: '5px', padding: '5px 10px' }}>
          Spawn Piece
        </button>
        <button onClick={moveLeft} style={{ margin: '5px', padding: '5px 10px' }}>
          ← Left
        </button>
        <button onClick={moveRight} style={{ margin: '5px', padding: '5px 10px' }}>
          Right →
        </button>
        <button onClick={rotatePiece} style={{ margin: '5px', padding: '5px 10px' }}>
          ↻ Rotate
        </button>
        <button onClick={moveDown} style={{ margin: '5px', padding: '5px 10px' }}>
          ↓ Down
        </button>
        <button onClick={togglePause} style={{ margin: '5px', padding: '5px 10px' }}>
          {gameState.isPaused ? 'Resume' : 'Pause'}
        </button>
        <button onClick={resetGame} style={{ margin: '5px', padding: '5px 10px' }}>
          Reset
        </button>
      </div>

      <div style={{ marginBottom: '10px', fontSize: '14px' }}>
        <div>Score: {gameState.score}</div>
        <div>Level: {gameState.level}</div>
        <div>Lines: {gameState.lines}</div>
        <div>Status: {gameState.isGameOver ? 'Game Over' : gameState.isPaused ? 'Paused' : 'Playing'}</div>
        <div>Current Piece: {gameState.currentPiece ? gameState.currentPiece.type : 'None'}</div>
      </div>

      {/* ミニチュア版のゲームボード */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(10, 15px)', 
        gap: '1px',
        border: '2px solid #666',
        padding: '5px',
        backgroundColor: '#222'
      }}>
        {displayBoard.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${y}-${x}`}
              style={{
                width: '15px',
                height: '15px',
                backgroundColor: cell ? PIECE_COLORS[cell] : '#333',
                border: '1px solid #555',
              }}
            />
          ))
        )}
      </div>

      {gameState.isGameOver && (
        <div style={{ marginTop: '10px', color: '#ff6666', fontWeight: 'bold' }}>
          GAME OVER - Click Reset to play again
        </div>
      )}
    </div>
  );
};

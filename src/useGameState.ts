import { useState, useCallback, useEffect } from 'react';
import { GameState, CurrentPiece } from './types';
import { createEmptyBoard, isValidPosition, canRotate, placePieceOnBoard, findCompletedLines, clearLines, isGameOver as checkGameOver } from './gameLogic';
import { createNewPiece } from './pieceGenerator';

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>({
    board: createEmptyBoard(),
    currentPiece: null,
    score: 0,
    level: 1,
    lines: 0,
    isGameOver: false,
    isPaused: false,
  });

  // 新しいピースを生成
  const spawnNewPiece = useCallback(() => {
    const newPiece = createNewPiece();
    
    setGameState(prevState => {
      // 新しいピースが配置できるかチェック（ゲームオーバー判定）
      if (!isValidPosition(prevState.board, newPiece)) {
        return {
          ...prevState,
          isGameOver: true,
        };
      }
      
      return {
        ...prevState,
        currentPiece: newPiece,
      };
    });
  }, []);

  // ピースを左に移動
  const moveLeft = useCallback(() => {
    setGameState(prevState => {
      if (!prevState.currentPiece || prevState.isGameOver || prevState.isPaused) return prevState;
      
      const newPosition = {
        x: prevState.currentPiece.position.x - 1,
        y: prevState.currentPiece.position.y,
      };
      
      if (isValidPosition(prevState.board, prevState.currentPiece, newPosition)) {
        return {
          ...prevState,
          currentPiece: {
            ...prevState.currentPiece,
            position: newPosition,
          },
        };
      }
      
      return prevState;
    });
  }, []);

  // ピースを右に移動
  const moveRight = useCallback(() => {
    setGameState(prevState => {
      if (!prevState.currentPiece || prevState.isGameOver || prevState.isPaused) return prevState;
      
      const newPosition = {
        x: prevState.currentPiece.position.x + 1,
        y: prevState.currentPiece.position.y,
      };
      
      if (isValidPosition(prevState.board, prevState.currentPiece, newPosition)) {
        return {
          ...prevState,
          currentPiece: {
            ...prevState.currentPiece,
            position: newPosition,
          },
        };
      }
      
      return prevState;
    });
  }, []);

  // ピースを回転
  const rotatePiece = useCallback(() => {
    setGameState(prevState => {
      if (!prevState.currentPiece || prevState.isGameOver || prevState.isPaused) return prevState;
      
      if (canRotate(prevState.board, prevState.currentPiece)) {
        return {
          ...prevState,
          currentPiece: {
            ...prevState.currentPiece,
            rotation: prevState.currentPiece.rotation + 1,
          },
        };
      }
      
      return prevState;
    });
  }, []);

  // ピースを1行下に移動
  const moveDown = useCallback(() => {
    setGameState(prevState => {
      if (!prevState.currentPiece || prevState.isGameOver || prevState.isPaused) return prevState;
      
      const newPosition = {
        x: prevState.currentPiece.position.x,
        y: prevState.currentPiece.position.y + 1,
      };
      
      // 下に移動できる場合
      if (isValidPosition(prevState.board, prevState.currentPiece, newPosition)) {
        return {
          ...prevState,
          currentPiece: {
            ...prevState.currentPiece,
            position: newPosition,
          },
        };
      }
      
      // 下に移動できない場合、ピースを固定してラインチェック
      const newBoard = placePieceOnBoard(prevState.board, prevState.currentPiece);
      const completedLines = findCompletedLines(newBoard);
      const finalBoard = completedLines.length > 0 ? clearLines(newBoard, completedLines) : newBoard;
      
      const linesCleared = completedLines.length;
      const newScore = prevState.score + (linesCleared * 100 * prevState.level);
      const newLines = prevState.lines + linesCleared;
      const newLevel = Math.floor(newLines / 10) + 1;
      
      return {
        ...prevState,
        board: finalBoard,
        currentPiece: null, // 新しいピースは次のフレームで生成
        score: newScore,
        level: newLevel,
        lines: newLines,
        isGameOver: checkGameOver(finalBoard),
      };
    });
  }, []);

  // ゲームリセット
  const resetGame = useCallback(() => {
    setGameState({
      board: createEmptyBoard(),
      currentPiece: null,
      score: 0,
      level: 1,
      lines: 0,
      isGameOver: false,
      isPaused: false,
    });
  }, []);

  // ゲーム一時停止の切り替え
  const togglePause = useCallback(() => {
    setGameState(prevState => ({
      ...prevState,
      isPaused: !prevState.isPaused,
    }));
  }, []);

  return {
    gameState,
    moveLeft,
    moveRight,
    rotatePiece,
    moveDown,
    resetGame,
    togglePause,
    spawnNewPiece,
  };
};

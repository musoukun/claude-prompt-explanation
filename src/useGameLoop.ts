import { useEffect, useRef } from 'react';

export const useGameLoop = (
  gameState: { isGameOver: boolean; isPaused: boolean; level: number; currentPiece: any },
  moveDown: () => void,
  spawnNewPiece: () => void,
  gameStarted: boolean = true
) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // ゲームが開始されていない場合は何もしない
    if (!gameStarted) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    if (gameState.isGameOver) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // 現在のピースがない場合、新しいピースを生成
    if (!gameState.currentPiece && !gameState.isPaused) {
      spawnNewPiece();
      return;
    }

    if (gameState.isPaused) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // レベルに応じて落下速度を調整（レベル1: 1000ms, レベル2: 900ms, ...）
    const dropInterval = Math.max(100, 1100 - (gameState.level * 100));

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      moveDown();
    }, dropInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [gameState.isGameOver, gameState.isPaused, gameState.level, gameState.currentPiece, moveDown, spawnNewPiece, gameStarted]);

  // コンポーネントのアンマウント時にクリーンアップ
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
};

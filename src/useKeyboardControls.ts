import { useEffect, useRef } from 'react';

interface KeyboardHandlers {
  moveLeft: () => void;
  moveRight: () => void;
  rotatePiece: () => void;
  moveDown: () => void;
  resetGame: () => void;
  togglePause: () => void;
}

export const useKeyboardControls = (
  handlers: KeyboardHandlers,
  isGameActive: boolean
) => {
  const handlersRef = useRef(handlers);
  
  // ハンドラーの参照を最新に保つ
  useEffect(() => {
    handlersRef.current = handlers;
  }, [handlers]);

  useEffect(() => {
    if (!isGameActive) return;

    const handleKeyPress = (event: KeyboardEvent) => {
      // デフォルトの動作を防ぐ（スクロールなど）
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'KeyP', 'KeyR'].includes(event.code)) {
        event.preventDefault();
      }

      switch (event.code) {
        case 'ArrowLeft':
          handlersRef.current.moveLeft();
          break;
        case 'ArrowRight':
          handlersRef.current.moveRight();
          break;
        case 'ArrowUp':
          handlersRef.current.rotatePiece();
          break;
        case 'ArrowDown':
          handlersRef.current.moveDown();
          break;
        case 'KeyP':
          handlersRef.current.togglePause();
          break;
        case 'KeyR':
          handlersRef.current.resetGame();
          break;
        default:
          break;
      }
    };

    // キーイベントリスナーを追加
    window.addEventListener('keydown', handleKeyPress);

    // クリーンアップ
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [isGameActive]);
};

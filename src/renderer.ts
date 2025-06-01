import { Board, Cell } from './types';
import { PIECE_COLORS } from './pieces';

const CELL_SIZE = 30;
const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

export const drawBoard = (
  ctx: CanvasRenderingContext2D,
  board: Board
) => {
  // キャンバスをクリア
  ctx.clearRect(0, 0, BOARD_WIDTH * CELL_SIZE, BOARD_HEIGHT * CELL_SIZE);
  
  // 背景を描画
  ctx.fillStyle = '#222';
  ctx.fillRect(0, 0, BOARD_WIDTH * CELL_SIZE, BOARD_HEIGHT * CELL_SIZE);

  // ボードの各セルを描画
  for (let y = 0; y < BOARD_HEIGHT; y++) {
    for (let x = 0; x < BOARD_WIDTH; x++) {
      const cell = board[y][x];
      
      if (cell) {
        // ピースのセルを描画
        ctx.fillStyle = PIECE_COLORS[cell];
        ctx.fillRect(
          x * CELL_SIZE,
          y * CELL_SIZE,
          CELL_SIZE - 1,
          CELL_SIZE - 1
        );
        
        // セルの境界線を描画
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1;
        ctx.strokeRect(
          x * CELL_SIZE,
          y * CELL_SIZE,
          CELL_SIZE - 1,
          CELL_SIZE - 1
        );
      } else {
        // 空のセルを描画
        ctx.fillStyle = '#333';
        ctx.fillRect(
          x * CELL_SIZE,
          y * CELL_SIZE,
          CELL_SIZE - 1,
          CELL_SIZE - 1
        );
        
        // 薄い境界線を描画
        ctx.strokeStyle = '#555';
        ctx.lineWidth = 0.5;
        ctx.strokeRect(
          x * CELL_SIZE,
          y * CELL_SIZE,
          CELL_SIZE - 1,
          CELL_SIZE - 1
        );
      }
    }
  }
};

export const drawGameInfo = (
  ctx: CanvasRenderingContext2D,
  score: number,
  level: number,
  lines: number,
  isGameOver: boolean,
  isPaused: boolean
) => {
  const boardWidth = BOARD_WIDTH * CELL_SIZE;
  const infoX = boardWidth + 20;
  
  // 情報テキストの背景をクリア
  ctx.fillStyle = '#000';
  ctx.fillRect(infoX, 0, 200, 200);
  
  // テキスト設定
  ctx.fillStyle = '#fff';
  ctx.font = '16px Arial';
  ctx.textAlign = 'left';
  
  // ゲーム情報を描画
  ctx.fillText(`Score: ${score}`, infoX, 30);
  ctx.fillText(`Level: ${level}`, infoX, 55);
  ctx.fillText(`Lines: ${lines}`, infoX, 80);
  
  // ゲーム状態を描画
  if (isGameOver) {
    ctx.fillStyle = '#ff6666';
    ctx.font = 'bold 18px Arial';
    ctx.fillText('GAME OVER', infoX, 120);
    ctx.fillStyle = '#fff';
    ctx.font = '14px Arial';
    ctx.fillText('Press R to restart', infoX, 145);
  } else if (isPaused) {
    ctx.fillStyle = '#ffff66';
    ctx.font = 'bold 18px Arial';
    ctx.fillText('PAUSED', infoX, 120);
    ctx.fillStyle = '#fff';
    ctx.font = '14px Arial';
    ctx.fillText('Press P to resume', infoX, 145);
  } else {
    ctx.fillStyle = '#66ff66';
    ctx.font = '14px Arial';
    ctx.fillText('Playing...', infoX, 120);
  }
  
  // 操作説明
  ctx.fillStyle = '#ccc';
  ctx.font = '12px Arial';
  ctx.fillText('Controls:', infoX, 180);
  ctx.fillText('← → : Move', infoX, 195);
  ctx.fillText('↑ : Rotate', infoX, 210);
  ctx.fillText('↓ : Drop', infoX, 225);
  ctx.fillText('P : Pause', infoX, 240);
  ctx.fillText('R : Restart', infoX, 255);
};

export const drawGameOverOverlay = (ctx: CanvasRenderingContext2D) => {
  const boardWidth = BOARD_WIDTH * CELL_SIZE;
  const boardHeight = BOARD_HEIGHT * CELL_SIZE;
  
  // 半透明のオーバーレイ
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(0, 0, boardWidth, boardHeight);
  
  // ゲームオーバーテキスト
  ctx.fillStyle = '#ff6666';
  ctx.font = 'bold 24px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('GAME OVER', boardWidth / 2, boardHeight / 2 - 20);
  
  ctx.fillStyle = '#fff';
  ctx.font = '16px Arial';
  ctx.fillText('Press R to restart', boardWidth / 2, boardHeight / 2 + 10);
};

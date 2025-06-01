// テトリスピースの種類
export type PieceType = 'I' | 'O' | 'T' | 'S' | 'Z' | 'J' | 'L';

// ボードの1セル
export type Cell = PieceType | null;

// ゲームボード（10x20）
export type Board = Cell[][];

// ピースの位置
export interface Position {
  x: number;
  y: number;
}

// ピースの形状（4x4のマトリックス）
export type PieceShape = number[][];

// 現在のピース
export interface CurrentPiece {
  type: PieceType;
  shape: PieceShape;
  position: Position;
  rotation: number;
}

// ゲームの状態
export interface GameState {
  board: Board;
  currentPiece: CurrentPiece | null;
  score: number;
  level: number;
  lines: number;
  isGameOver: boolean;
  isPaused: boolean;
}

// ピースの色
export type PieceColors = {
  [key in PieceType]: string;
};

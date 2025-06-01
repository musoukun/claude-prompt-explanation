import { CurrentPiece, PieceType } from './types';
import { getRandomPieceType } from './pieces';

// 新しいピースを生成
export const createNewPiece = (type?: PieceType): CurrentPiece => {
  const pieceType = type || getRandomPieceType();
  
  return {
    type: pieceType,
    shape: [], // この値は実際には使用されず、getPieceShapeで動的に取得
    position: {
      x: 3, // ボードの中央あたりに配置
      y: -2, // ボードの上部から開始
    },
    rotation: 0,
  };
};

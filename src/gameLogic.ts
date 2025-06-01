import { Board, CurrentPiece, Position } from "./types";
import { getPieceShape } from "./pieces";

// 空のゲームボードを作成
export const createEmptyBoard = (): Board => {
	return Array(20)
		.fill(null)
		.map(() => Array(10).fill(null));
};

// ピースがボード内の有効な位置にあるかチェック
export const isValidPosition = (
	board: Board,
	piece: CurrentPiece,
	newPosition?: Position
): boolean => {
	const position = newPosition || piece.position;
	const shape = getPieceShape(piece.type, piece.rotation);

	for (let y = 0; y < shape.length; y++) {
		for (let x = 0; x < shape[y].length; x++) {
			if (shape[y][x] !== 0) {
				const boardX = position.x + x;
				const boardY = position.y + y;

				// ボードの境界チェック
				if (boardX < 0 || boardX >= 10 || boardY >= 20) {
					return false;
				}

				// 他のピースとの衝突チェック（上部は除く）
				if (boardY >= 0 && board[boardY][boardX] !== null) {
					return false;
				}
			}
		}
	}

	return true;
};

// ピースを回転した時の新しい形状で衝突チェック
export const canRotate = (board: Board, piece: CurrentPiece): boolean => {
	const rotatedPiece = {
		...piece,
		rotation: piece.rotation + 1,
	};
	return isValidPosition(board, rotatedPiece);
};

// ピースをボードに配置
export const placePieceOnBoard = (board: Board, piece: CurrentPiece): Board => {
	const newBoard = board.map((row) => [...row]);
	const shape = getPieceShape(piece.type, piece.rotation);

	for (let y = 0; y < shape.length; y++) {
		for (let x = 0; x < shape[y].length; x++) {
			if (shape[y][x] !== 0) {
				const boardX = piece.position.x + x;
				const boardY = piece.position.y + y;

				if (boardY >= 0 && boardY < 20 && boardX >= 0 && boardX < 10) {
					newBoard[boardY][boardX] = piece.type;
				}
			}
		}
	}

	return newBoard;
};

// 完成したラインを見つける
export const findCompletedLines = (board: Board): number[] => {
	const completedLines: number[] = [];

	for (let y = 0; y < board.length; y++) {
		if (board[y].every((cell) => cell !== null)) {
			completedLines.push(y);
		}
	}

	return completedLines;
};

// 完成したラインを削除
export const clearLines = (board: Board, linesToClear: number[]): Board => {
	const newBoard = board.filter((_, index) => !linesToClear.includes(index));

	// 削除した分だけ上に空のラインを追加
	const emptyLines = linesToClear.length;
	for (let i = 0; i < emptyLines; i++) {
		newBoard.unshift(Array(10).fill(null));
	}

	return newBoard;
};

// ゲームオーバーかどうかチェック
export const isGameOver = (board: Board): boolean => {
	// 最上段に固定ピースがあるかチェック
	return board[0].some((cell) => cell !== null);
};

// 現在のピースも含めた描画用ボードを作成
export const getBoardWithCurrentPiece = (
	board: Board,
	currentPiece: CurrentPiece | null
): Board => {
	if (!currentPiece) return board;

	const boardWithPiece = board.map((row) => [...row]);
	const shape = getPieceShape(currentPiece.type, currentPiece.rotation);

	for (let y = 0; y < shape.length; y++) {
		for (let x = 0; x < shape[y].length; x++) {
			if (shape[y][x] !== 0) {
				const boardX = currentPiece.position.x + x;
				const boardY = currentPiece.position.y + y;

				if (boardY >= 0 && boardY < 20 && boardX >= 0 && boardX < 10) {
					boardWithPiece[boardY][boardX] = currentPiece.type;
				}
			}
		}
	}

	return boardWithPiece;
};

import { useState } from 'react';
import { PieceType } from './types';
import { PIECE_SHAPES, PIECE_COLORS } from './pieces';

export const PieceTest = () => {
  const [selectedPiece, setSelectedPiece] = useState<PieceType>('T');
  const [rotation, setRotation] = useState(0);

  const pieces: PieceType[] = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];
  const currentShape = PIECE_SHAPES[selectedPiece][rotation % PIECE_SHAPES[selectedPiece].length];

  return (
    <div style={{ margin: '20px', padding: '20px', border: '1px solid #fff' }}>
      <h3>Piece Test</h3>
      
      <div style={{ marginBottom: '10px' }}>
        <label>Piece: </label>
        <select 
          value={selectedPiece} 
          onChange={(e) => {
            setSelectedPiece(e.target.value as PieceType);
            setRotation(0);
          }}
          style={{ margin: '0 10px', padding: '5px' }}
        >
          {pieces.map(piece => (
            <option key={piece} value={piece}>{piece}</option>
          ))}
        </select>
        
        <button 
          onClick={() => setRotation(r => r + 1)}
          style={{ padding: '5px 10px', marginLeft: '10px' }}
        >
          Rotate
        </button>
        
        <span style={{ marginLeft: '10px' }}>
          Rotation: {rotation % PIECE_SHAPES[selectedPiece].length}
        </span>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 20px)', 
        gap: '1px',
        marginTop: '10px'
      }}>
        {currentShape.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${y}-${x}`}
              style={{
                width: '20px',
                height: '20px',
                backgroundColor: cell ? PIECE_COLORS[selectedPiece] : '#333',
                border: '1px solid #666',
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};

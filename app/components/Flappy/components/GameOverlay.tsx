import React from 'react';
import { GAME_STATES, REVIVE_COST } from '../constants';
import type { GameState } from '../types';

interface GameOverlayProps {
  gameState: GameState;
  handleRevive: () => void;
  handlePlay: () => void;
  handlePari: () => void;
  showControls: boolean;
}

export const GameOverlay: React.FC<GameOverlayProps> = ({
  gameState,
  handleRevive,
  handlePlay,
  handlePari,
  showControls
}) => {
  if (gameState.state.gameState !== GAME_STATES.GAME_OVER) {
    return null;
  }

  return (
    <>
      {showControls && (
        <div
          className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"
          style={{ zIndex: 1 }}
        >
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                       flex flex-col items-center gap-4"
          >
            {/* Score Display */}
            <div className="text-white text-2xl font-qualy mb-4">
              <div>Score: {gameState.state.score}</div>
              <div>Best: {gameState.refs.scoreRef.current}</div>
            </div>

            {/* Revive Button - only show if not used */}
            {!gameState.state.reviveUsed && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRevive();
                }}
                className="flex flex-col items-center justify-center text-2xl 
                         bg-[url('/Texture/Cloud.png')] bg-center text-black
                         p-4 rounded-lg border-2 border-black min-w-[150px] mb-4"
              >
                <span className="qualy-title">
                  REVIVE ({REVIVE_COST} OXLT)
                </span>
              </button>
            )}

            {/* Play Again Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePlay();
              }}
              className="bg-blue-500 text-white p-4 rounded-lg border-2 border-black mb-4"
            >
              Click to play
            </button>

            {/* Pari Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePari();
              }}
              className="bg-green-500 text-white p-4 rounded-lg border-2 border-black"
            >
              PARI
            </button>
          </div>
        </div>
      )}
    </>
  );
}; 
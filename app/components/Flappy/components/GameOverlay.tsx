import React from 'react';
import { GAME_STATES, REVIVE_COST } from '../constants';
import type { GameState } from '../types';
import { useGuide } from '@/app/context/GuideContext';

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
  const guide = useGuide();
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
            {!gameState.state.reviveUsed && guide.step !== 13 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRevive();
                }}
                className="px-8 py-4 rounded-full border-4 border-purple-500 text-2xl pp-telegraf-bold
                          bg-black/30 text-white hover:bg-purple-500/20 transition-all duration-200 mb-4"
              >
                REVIVE ({REVIVE_COST} OXLT)
              </button>
            )}

            {/* Play Again Button */}
            {(guide.step !== 11 && guide.step !== 13) && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlay();
                }}
                className="px-8 py-4 rounded-full border-4 text-nowrap border-blue-400 text-2xl pp-telegraf-bold
                          bg-black/30 text-white hover:bg-blue-400/20 transition-all duration-200 mb-4"
              >
                Click to play
              </button>
            )}

            {/* Pari Button */}
            {(guide.step !== 11) && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePari();
                }}
                className="px-8 py-4 rounded-full border-4 border-green-400 text-2xl pp-telegraf-bold
                          bg-black/30 text-white hover:bg-green-400/20 transition-all duration-200"
              >
                PARI
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}; 
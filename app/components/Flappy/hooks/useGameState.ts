import { useState, useRef } from 'react';
import { GAME_STATES, BIRD_CONFIG } from '../constants';

type GameStateType = typeof GAME_STATES[keyof typeof GAME_STATES];

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameStateType>(GAME_STATES.GET_READY);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [retainedScore, setRetainedScore] = useState(0);
  const [reviveUsed, setReviveUsed] = useState(false);

  const gameStateRef = useRef<GameStateType>(gameState);
  const scoreRef = useRef(0);
  const birdYRef = useRef(BIRD_CONFIG.START_Y);
  const birdSpeedRef = useRef(0);
  const birdFrameRef = useRef(0);
  const birdRotationRef = useRef(0);
  const pipesRef = useRef<{ x: number; y: number; passed: boolean }[]>([]);

  // Wrapper pour setGameState qui met aussi à jour la ref
  const setGameStateWithRef = (newState: GameStateType) => {
    gameStateRef.current = newState;
    setGameState(newState);
  };

  return {
    state: {
      gameState,
      setGameState: setGameStateWithRef,
      score,
      setScore,
      isGameOver,
      setIsGameOver,
      retainedScore,
      setRetainedScore,
      reviveUsed,
      setReviveUsed,
    },
    refs: {
      gameStateRef,
      scoreRef,
      birdYRef,
      birdSpeedRef,
      birdFrameRef,
      birdRotationRef,
      pipesRef,
    },
  };
}; 
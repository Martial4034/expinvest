import { GAME_STATES } from './constants';

type GameStateType = typeof GAME_STATES[keyof typeof GAME_STATES];

export interface GameState {
  state: {
    gameState: GameStateType;
    setGameState: (state: GameStateType) => void;
    score: number;
    setScore: (score: number) => void;
    isGameOver: boolean;
    setIsGameOver: (isOver: boolean) => void;
    retainedScore: number;
    setRetainedScore: (score: number) => void;
    reviveUsed: boolean;
    setReviveUsed: (used: boolean) => void;
  };
  refs: {
    gameStateRef: React.MutableRefObject<GameStateType>;
    scoreRef: React.MutableRefObject<number>;
    birdYRef: React.MutableRefObject<number>;
    birdSpeedRef: React.MutableRefObject<number>;
    birdFrameRef: React.MutableRefObject<number>;
    birdRotationRef: React.MutableRefObject<number>;
    pipesRef: React.MutableRefObject<{ x: number; y: number; passed: boolean }[]>;
  };
}
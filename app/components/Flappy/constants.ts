export const RAD = Math.PI / 180;
export const CANVAS_WIDTH = 366;
export const CANVAS_HEIGHT = 614;

export const GAME_STATES = {
  GET_READY: 'GET_READY',
  PLAY: 'PLAY',
  GAME_OVER: 'GAME_OVER',
  WAITING_BET: 'WAITING_BET',
  SPECIAL_GAME: 'SPECIAL_GAME',
  SPECIAL_WIN: 'SPECIAL_WIN',
} as const;

export const REVIVE_COST = 100;
export const REVIVE_TIMER = 10;

export const BIRD_CONFIG = {
  GRAVITY: 0.08,
  THRUST: -3,
  START_X: 50,
  START_Y: 100,
};

export const PIPE_CONFIG = {
  GAP: 110,
  SPAWN_INTERVAL: 100,
  SPEED: 1.5,
}; 
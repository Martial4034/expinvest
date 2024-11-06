import React, { useRef, useEffect } from 'react';
import { CANVAS_WIDTH, CANVAS_HEIGHT, RAD, GAME_STATES } from '../constants';
import type { GameState } from '../types';

interface GameCanvasProps {
  assets: {
    birdImages: React.MutableRefObject<HTMLImageElement[]>;
    bgImage: React.MutableRefObject<HTMLImageElement | null>;
    groundImage: React.MutableRefObject<HTMLImageElement | null>;
    pipeTopImage: React.MutableRefObject<HTMLImageElement | null>;
    pipeBottomImage: React.MutableRefObject<HTMLImageElement | null>;
    getReadyImage: React.MutableRefObject<HTMLImageElement | null>;
    gameOverImage: React.MutableRefObject<HTMLImageElement | null>;
    tapImages: React.MutableRefObject<HTMLImageElement[]>;
  };
  gameState: GameState;
  handleClick: (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => void;
}

export const GameCanvas: React.FC<GameCanvasProps> = ({
  assets,
  gameState,
  handleClick,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      // Effacer le canvas
      ctx.fillStyle = "#30c0df";
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Dessiner le fond
      if (assets.bgImage.current) {
        const bgY = CANVAS_HEIGHT - assets.bgImage.current.height;
        ctx.drawImage(assets.bgImage.current, 0, bgY);
      }

      // Dessiner les tuyaux
      gameState.refs.pipesRef.current.forEach((pipe) => {
        if (assets.pipeTopImage.current && assets.pipeBottomImage.current) {
          ctx.drawImage(assets.pipeTopImage.current, pipe.x, pipe.y);
          ctx.drawImage(
            assets.pipeBottomImage.current,
            pipe.x,
            pipe.y + assets.pipeTopImage.current.height + 110
          );
        }
      });

      // Dessiner l'oiseau
      if (assets.birdImages.current.length > 0) {
        const birdFrame = Math.floor(frameRef.current / 5) % assets.birdImages.current.length;
        const birdImage = assets.birdImages.current[birdFrame];
        
        ctx.save();
        ctx.translate(50, gameState.refs.birdYRef.current);
        ctx.rotate(gameState.refs.birdRotationRef.current * RAD);
        ctx.drawImage(
          birdImage,
          -birdImage.width / 2,
          -birdImage.height / 2,
          birdImage.width,
          birdImage.height
        );
        ctx.restore();
      }

      // Dessiner le sol
      if (assets.groundImage.current) {
        const groundY = CANVAS_HEIGHT - assets.groundImage.current.height;
        ctx.drawImage(assets.groundImage.current, 0, groundY);
      }

      // Afficher le score
      if (gameState.state.gameState === GAME_STATES.PLAY) {
        ctx.fillStyle = "#FFFFFF";
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 2;
        ctx.font = "45px 'Qualy'";
        ctx.textAlign = "center";
        ctx.fillText(`${gameState.state.score}`, CANVAS_WIDTH / 2, 80);
        ctx.strokeText(`${gameState.state.score}`, CANVAS_WIDTH / 2, 80);
      }

      // Dessiner l'écran "Get Ready"
      if (gameState.state.gameState === GAME_STATES.GET_READY && assets.getReadyImage.current) {
        ctx.drawImage(
          assets.getReadyImage.current,
          CANVAS_WIDTH / 2 - assets.getReadyImage.current.width / 2,
          CANVAS_HEIGHT / 2 - assets.getReadyImage.current.height / 2
        );
      }

      frameRef.current++;
    };

    const gameLoop = () => {
      draw();
      requestAnimationFrame(gameLoop);
    };

    gameLoop();
  }, [assets, gameState]);

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
      className="border border-black select-none"
      onClick={handleClick}
      onTouchStart={handleClick}
    />
  );
};
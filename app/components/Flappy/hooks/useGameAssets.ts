import { useEffect, useRef, useState } from 'react';

export const useGameAssets = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const birdImages = useRef<HTMLImageElement[]>([]);
  const bgImage = useRef<HTMLImageElement | null>(null);
  const groundImage = useRef<HTMLImageElement | null>(null);
  const pipeTopImage = useRef<HTMLImageElement | null>(null);
  const pipeBottomImage = useRef<HTMLImageElement | null>(null);
  const getReadyImage = useRef<HTMLImageElement | null>(null);
  const gameOverImage = useRef<HTMLImageElement | null>(null);
  const tapImages = useRef<HTMLImageElement[]>([]);

  const sfxStartRef = useRef<HTMLAudioElement | null>(null);
  const sfxFlapRef = useRef<HTMLAudioElement | null>(null);
  const sfxScoreRef = useRef<HTMLAudioElement | null>(null);
  const sfxHitRef = useRef<HTMLAudioElement | null>(null);
  const sfxDieRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let imagesToLoad = 0;
    let imagesLoadedCount = 0;

    const checkAllImagesLoaded = () => {
      if (imagesLoadedCount === imagesToLoad) {
        setImagesLoaded(true);
      }
    };

    const loadImage = (src: string): HTMLImageElement => {
      imagesToLoad++;
      const img = new Image();
      img.src = src;
      img.onload = () => {
        imagesLoadedCount++;
        checkAllImagesLoaded();
      };
      img.onerror = () => {
        console.error(`Erreur de chargement de l'image : ${src}`);
      };
      return img;
    };

    const loadImages = () => {
      // Charger les images de fond et de décor
      bgImage.current = loadImage("/flappy/newimg/back.png");
      groundImage.current = loadImage("/flappy/newimg/ground.png");
      pipeTopImage.current = loadImage("/flappy/newimg/toppipe.png");
      pipeBottomImage.current = loadImage("/flappy/newimg/botpipe.png");
      getReadyImage.current = loadImage("/flappy/newimg/getready.png");
      gameOverImage.current = loadImage("/flappy/newimg/go.png");

      // Charger les images de tap
      tapImages.current = [];
      tapImages.current.push(loadImage("/flappy/newimg/tap/t0.png"));
      tapImages.current.push(loadImage("/flappy/newimg/tap/t1.png"));

      // Charger les images de l'oiseau
      birdImages.current = [];
      birdImages.current.push(loadImage("/flappy/newimg/bird/b0.png"));
      birdImages.current.push(loadImage("/flappy/newimg/bird/b1.png"));
      birdImages.current.push(loadImage("/flappy/newimg/bird/b2.png"));
      birdImages.current.push(loadImage("/flappy/newimg/bird/b0.png"));
    };

    const loadSounds = () => {
      sfxStartRef.current = new Audio("/flappy/sfx/start.wav");
      sfxFlapRef.current = new Audio("/flappy/sfx/flap.wav");
      sfxScoreRef.current = new Audio("/flappy/sfx/score.wav");
      sfxHitRef.current = new Audio("/flappy/sfx/hit.wav");
      sfxDieRef.current = new Audio("/flappy/sfx/die.wav");
    };

    loadImages();
    loadSounds();
  }, []);

  return {
    imagesLoaded,
    assets: {
      birdImages,
      bgImage,
      groundImage,
      pipeTopImage,
      pipeBottomImage,
      getReadyImage,
      gameOverImage,
      tapImages,
    },
    sounds: {
      sfxStartRef,
      sfxFlapRef,
      sfxScoreRef,
      sfxHitRef,
      sfxDieRef,
    },
  };
}; 
'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import styles from './Unity.module.css';
import Image from 'next/image';
import { Progress } from "@/app/components/ui/progress"
import { loadingPhrases, LoadingPhrase } from './LoadingPhrases';

interface UnityConfig {
  dataUrl: string;
  frameworkUrl: string;
  codeUrl: string;
  streamingAssetsUrl?: string;
  companyName?: string;
  productName?: string;
  productVersion?: string;
  showBanner?: (msg: string, type: string) => void;
  matchWebGLToCanvasSize?: boolean | number;
  devicePixelRatio?: number;
  canvas?: HTMLCanvasElement;
}

interface UnityInstance {
  Quit(): Promise<void>;
  SendMessage(
    gameObjectName: string,
    methodName: string,
    parameter?: string | number | boolean
  ): void;
  SetFullscreen(fullscreen: boolean): void;
}

declare global {
  function createUnityInstance(
    canvas: HTMLCanvasElement,
    config: UnityConfig
  ): Promise<UnityInstance>;
}

export default function Page() {
  const unityContainerRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);
  const progressTimeout = useRef<NodeJS.Timeout>();
  const [isAnimating, setIsAnimating] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  const [currentPhrase, setCurrentPhrase] = useState<LoadingPhrase>(loadingPhrases[0]);
  const phraseInterval = useRef<NodeJS.Timeout>();

  // Fonction pour simuler le chargement progressif
  const simulateDynamicLoading = () => {
    const loadingSteps = [
      { value: 10, delay: 500 },
      { value: 25, delay: 800 },
      { value: 45, delay: 1000 },
      { value: 65, delay: 800 },
      { value: 85, delay: 1200 },
      { value: 95, delay: 1500 },
    ];

    let currentStep = 0;
    const scheduleNextStep = () => {
      if (currentStep < loadingSteps.length) {
        const step = loadingSteps[currentStep];
        progressTimeout.current = setTimeout(() => {
          setProgress(step.value);
          currentStep++;
          scheduleNextStep();
        }, step.delay);
      }
    };

    scheduleNextStep();
  };

  // Gestion du redimensionnement
  const handleResize = useCallback(() => {
    if (unityContainerRef.current) {
      const aspectRatio = 16 / 9;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const windowRatio = windowWidth / windowHeight;

      let newWidth, newHeight;

      if (windowRatio > aspectRatio) {
        newHeight = windowHeight;
        newWidth = windowHeight * aspectRatio;
      } else {
        newWidth = windowWidth;
        newHeight = windowWidth / aspectRatio;
      }

      unityContainerRef.current.style.width = `${newWidth}px`;
      unityContainerRef.current.style.height = `${newHeight}px`;
    }
  }, []);

  useEffect(() => {
    const unityContainer = unityContainerRef.current;
    if (!unityContainer) return;

    handleResize();
    window.addEventListener('resize', handleResize);
    simulateDynamicLoading();

    const script = document.createElement('script');
    script.src = '/Utc/Build/OXELTABuilds.loader.js';
    script.async = true;
    script.onload = () => {
      if (typeof createUnityInstance === 'function') {
        createUnityInstance(unityContainer, {
          dataUrl: '/Utc/Build/OXELTABuilds.data.br',
          frameworkUrl: '/Utc/Build/OXELTABuilds.framework.js.br',
          codeUrl: '/Utc/Build/OXELTABuilds.wasm.br',
          streamingAssetsUrl: '/Utc/StreamingAssets',
          companyName: 'OXELTA',
          productName: 'OXELTA Game',
          productVersion: '1.0',
          canvas: unityContainer,
        })
        .then((unityInstance: UnityInstance) => {
          if (progressTimeout.current) {
            clearTimeout(progressTimeout.current);
          }
          const loadingOverlay = document.getElementById('unity-loading-overlay');
          if (loadingOverlay) {
            loadingOverlay.style.display = 'none';
          }
          setProgress(100);
        })
        .catch((error: Error) => {
          console.error('Unity instance creation failed:', error);
        });
      }
    };

    script.onerror = () => {
      console.error('Failed to load Unity loader script');
    };

    document.body.appendChild(script);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (progressTimeout.current) {
        clearTimeout(progressTimeout.current);
      }
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [handleResize]);

  // Gestion de l'animation au clic
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  // Mise à jour des phrases de chargement
  const updateLoadingPhrase = useCallback(() => {
    setCurrentPhrase(prev => {
      const currentIndex = loadingPhrases.findIndex(phrase => phrase === prev);
      const nextIndex = (currentIndex + 1) % loadingPhrases.length;
      return loadingPhrases[nextIndex];
    });
  }, []);

  useEffect(() => {
    phraseInterval.current = setInterval(updateLoadingPhrase, 4000);
    return () => {
      if (phraseInterval.current) {
        clearInterval(phraseInterval.current);
      }
    };
  }, [updateLoadingPhrase]);

  return (
    <div className="w-screen h-screen overflow-hidden flex justify-center items-center bg-black">
      <div id="unity-loading-overlay" className={`${styles.loadingOverlay} flex flex-col items-center justify-center`}>
        <div className="relative overflow-visible bg-transparent p-0 flex flex-col items-center justify-center h-60 w-64">
          <div 
            ref={imageRef}
            onClick={handleClick}
            className="flex items-center justify-center w-full h-60 mb-2 p-2 relative overflow-visible cursor-pointer"
          >
            <Image 
              src="/App/Logo_Utc1.png"
              alt="UNDER THE CLASH"
              width={500}
              height={300}
              className={`
                object-contain w-full h-full rounded-t-lg 
                ${styles.bounce} 
                ${isAnimating ? styles.clickAnimation : ''}
                transition-transform
              `}
            />
          </div>
          <div className="w-[300px] mt-6">
            <Progress value={progress} className="h-3" />
          </div>
          <div className="mt-2 text-white text-sm">
            {Math.round(progress)}%
          </div>
          <div className="mt-4 text-white text-xl pp-telegraf-bold max-w-[500px] text-center animate-fade-in">
            {currentPhrase.en}
          </div>
        </div>
      </div>
      <canvas
        id="unity-canvas"
        ref={unityContainerRef}
        className="unity-container"
      />
    </div>
  );
}
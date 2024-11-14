'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { loadingPhrases } from './LoadingPhrases';

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
  // Add other methods and properties if needed
}

declare global {
  function createUnityInstance(
    canvas: HTMLCanvasElement,
    config: UnityConfig
  ): Promise<UnityInstance>;
}

export default function Page() {
  const unityContainerRef = useRef<HTMLCanvasElement>(null);
  const [language, setLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPhrase, setCurrentPhrase] = useState(loadingPhrases[0]);
  const phraseInterval = useRef<NodeJS.Timeout>();

  // Fonction de redimensionnement avec ratio 16:9
  const handleResize = useCallback(() => {
    if (unityContainerRef.current) {
      const aspectRatio = 16 / 9;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const windowRatio = windowWidth / windowHeight;
      
      let newWidth, newHeight;
      
      if (windowRatio > aspectRatio) {
        // Si la fenêtre est plus large que 16:9
        newHeight = windowHeight;
        newWidth = windowHeight * aspectRatio;
      } else {
        // Si la fenêtre est plus haute que 16:9
        newWidth = windowWidth;
        newHeight = windowWidth / aspectRatio;
      }

      unityContainerRef.current.style.width = `${newWidth}px`;
      unityContainerRef.current.style.height = `${newHeight}px`;
    }
  }, []);

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

  useEffect(() => {
    const storedLanguage = localStorage.getItem('languageSelected');
    setLanguage(storedLanguage === 'fr' ? 'fr' : 'en');
  }, []);

  useEffect(() => {
    const unityContainer = unityContainerRef.current;
    if (!unityContainer) return;

    handleResize();
    window.addEventListener('resize', handleResize);

    const script = document.createElement('script');
    script.src = `/Utc/${language}/Build/Build${language.toUpperCase()}.loader.js`;
    script.async = true;
    script.onload = () => {
      if (typeof createUnityInstance === 'function') {
        createUnityInstance(unityContainer, {
          dataUrl: `/Utc/${language}/Build/Build${language.toUpperCase()}.data.br`,
          frameworkUrl: `/Utc/${language}/Build/Build${language.toUpperCase()}.framework.js.br`,
          codeUrl: `/Utc/${language}/Build/Build${language.toUpperCase()}.wasm.br`,
          streamingAssetsUrl: `/Utc/${language}/StreamingAssets`,
          companyName: 'OXELTA',
          productName: 'OXELTA Game',
          productVersion: '1.0',
          canvas: unityContainer,
          matchWebGLToCanvasSize: true, // Important pour le redimensionnement
          devicePixelRatio: window.devicePixelRatio, // Pour la netteté
        })
          .then((unityInstance: UnityInstance) => {
            console.log('Unity instance created:', unityInstance);
            setIsLoading(false);
          })
          .catch((error: Error) => {
            console.error('Unity instance creation failed:', error);
          });
      } else {
        console.error('createUnityInstance function not found');
      }
    };

    script.onerror = () => {
      console.error('Failed to load Unity loader script');
    };

    document.body.appendChild(script);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [language, handleResize]);

  return (
    <div className="w-screen h-screen overflow-hidden bg-black flex justify-center items-center">
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-black">
          {/* Spinner */}
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mb-8" />
          
          {/* Phrase de chargement */}
          <div className="text-white text-center max-w-md px-4 animate-pulse">
            {currentPhrase.en}
          </div>
        </div>
      )}
      <canvas
        id="unity-canvas"
        ref={unityContainerRef}
        className="unity-container"
        style={{ visibility: isLoading ? 'hidden' : 'visible' }}
      />
    </div>
  );
}
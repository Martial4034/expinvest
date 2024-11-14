'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Progress } from '@/app/components/ui/progress'; // Assurez-vous que le chemin est correct
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
  onProgress?: (progress: number) => void; // Ajout de onProgress
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

type Language = 'en' | 'fr';

export default function Page() {
  const unityContainerRef = useRef<HTMLCanvasElement>(null);
  const [language, setLanguage] = useState<Language>('en');
  const [progress, setProgress] = useState(0);
  const [loadingPhrase, setLoadingPhrase] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedLanguage = localStorage.getItem('languageSelected') as Language;
    setLanguage(storedLanguage === 'fr' ? 'fr' : 'en');
  }, []);

  useEffect(() => {
    const unityContainer = unityContainerRef.current;

    if (!unityContainer) return;

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
          onProgress: (unityProgress: number) => {
            setProgress(unityProgress * 100);
          },
        })
          .then((unityInstance: UnityInstance) => {
            console.log('Unity instance created:', unityInstance);
            setIsLoaded(true);
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
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [language]);

  useEffect(() => {
    const changePhrase = () => {
      const phrases = loadingPhrases.map((phrase) => phrase[language]);
      const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
      setLoadingPhrase(randomPhrase);
    };

    changePhrase(); // Phrase initiale
    const interval = setInterval(changePhrase, 5000); // Changement toutes les 5 secondes

    return () => {
      clearInterval(interval);
    };
  }, [language]);

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      {isLoaded ? (
        <div className="relative w-full h-0 pb-[56.25%]">
          <canvas
            id="unity-canvas"
            ref={unityContainerRef}
            className="absolute top-0 left-0 w-full h-full"
          />
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <Image
            src="/App/Logo_Utc1.png"
            alt="UNDER THE CLASH"
            width={500}
            height={300}
          />
          <div className="w-[300px] mt-6">
            <Progress value={progress} className="h-3" />
          </div>
          <p className="text-white mt-4 text-center">{loadingPhrase}</p>
        </div>
      )}
    </div>
  );
}

'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useGuide } from "@/app/context/GuideContext";
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
    canvas: HTMLElement,
    config: UnityConfig
  ): Promise<UnityInstance>;
}

export default function Page() {
  const { incrementStep } = useGuide();
  const unityContainerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const progressTimeout = useRef<NodeJS.Timeout>();
  const [isAnimating, setIsAnimating] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  const [buildPath, setBuildPath] = useState('/Utc/en/');
  const [buildSettings, setBuildSettings] = useState('BuildEN');
  const [currentPhrase, setCurrentPhrase] = useState<LoadingPhrase>(loadingPhrases[0]);
  const phraseInterval = useRef<NodeJS.Timeout>();
  const [language, setLanguage] = useState<string>('en');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const storedLanguage = localStorage.getItem('languageSelected');
    setLanguage(storedLanguage === 'fr' ? 'fr' : 'en');
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    const storedLanguage = language;
    if (storedLanguage === 'fr') {
      setBuildPath('/Utc/fr/');
      setBuildSettings('BuildFR');
    } else {
      setBuildPath('/Utc/en/');
      setBuildSettings('BuildEN');
    }
  }, [isMounted, language]);

  const simulateDynamicLoading = () => {
    const loadingSteps = [
      { value: 1, delay: 0 },
      { value: 10, delay: 1000 },
      { value: 23, delay: 300 },
      { value: 26, delay: 2000 },
      { value: 45, delay: 500 },
      { value: 48, delay: 1500 },
      { value: 67, delay: 300 },
      { value: 72, delay: 1800 },
      { value: 85, delay: 400 },
      { value: 89, delay: 1200 },
      { value: 95, delay: 200 },
      { value: 96, delay: 3000 },
      { value: 97, delay: 6000 },
      { value: 98, delay: 8000 },
      { value: 99, delay: 12000 },
    ];

    let currentStep = 0;
    let totalDelay = 0;

    const scheduleNextStep = () => {
      if (currentStep >= loadingSteps.length) {
        // Après le dernier palier, progression lente vers 99.9%
        const slowProgress = () => {
          setProgress(prev => {
            const increment = (99.9 - prev) * 0.1;
            return prev + increment;
          });
          progressTimeout.current = setTimeout(slowProgress, 200);
        };
        slowProgress();
        return;
      }

      const step = loadingSteps[currentStep];
      totalDelay += step.delay;

      progressTimeout.current = setTimeout(() => {
        setProgress(step.value);
        currentStep++;
        scheduleNextStep();
      }, step.delay);
    };

    scheduleNextStep();
  };

  useEffect(() => {
    const guideStep = parseInt(localStorage.getItem('guideStep') || '0', 10);
    if (guideStep === 17) {
      incrementStep();
    }
  }, [incrementStep]);

  useEffect(() => {
    const unityContainer = unityContainerRef.current;
    if (!unityContainer) return;

    const canvas = document.createElement('canvas');
    canvas.id = 'unity-canvas';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    unityContainer.appendChild(canvas);

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    simulateDynamicLoading();

    const script = document.createElement('script');
    script.src = `${buildPath}Build/${buildSettings}.loader.js`;
    script.async = true;

    script.onload = () => {
      if (typeof createUnityInstance === 'function') {
        createUnityInstance(canvas, {
          dataUrl: `${buildPath}Build/${buildSettings}.data`,
          frameworkUrl: `${buildPath}Build/${buildSettings}.framework.js`,
          codeUrl: `${buildPath}Build/${buildSettings}.wasm`,
          streamingAssetsUrl: `${buildPath}StreamingAssets`,
          companyName: 'OXELTA',
          productName: 'OXELTA Game',
          productVersion: '1.0',
          matchWebGLToCanvasSize: true,
          devicePixelRatio: window.devicePixelRatio,
        })
        .then((unityInstance: UnityInstance) => {
          if (progressTimeout.current) {
            clearTimeout(progressTimeout.current);
          }
          const loadingOverlay = document.getElementById('unity-loading-overlay');
          if (loadingOverlay) {
            loadingOverlay.style.display = 'none';
          }
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
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    };
  }, [buildPath, buildSettings]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // Animation de l'image
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);

    // Effet de ripple
    if (imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const ripple = document.createElement('div');
      ripple.className = styles.ripple;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      imageRef.current.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    }
  };

  const updateLoadingPhrase = useCallback(() => {
    setCurrentPhrase(prev => {
      const currentIndex = loadingPhrases.findIndex(phrase => phrase === prev);
      const nextIndex = (currentIndex + 1) % loadingPhrases.length;
      return loadingPhrases[nextIndex];
    });
  }, []);

  useEffect(() => {
    // Changement de phrase toutes les 4 secondes
    phraseInterval.current = setInterval(updateLoadingPhrase, 4000);

    return () => {
      if (phraseInterval.current) {
        clearInterval(phraseInterval.current);
      }
    };
  }, [updateLoadingPhrase]);

  return (
    <div className="w-screen h-screen overflow-hidden">
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
            {isMounted && (
              language === 'fr' 
                ? currentPhrase.fr 
                : currentPhrase.en
            )}
          </div>
        </div>
      </div>
      <div
        ref={unityContainerRef}
        className="unity-container w-full h-full"
        style={{ position: 'relative' }}
      />
    </div>
  );
}

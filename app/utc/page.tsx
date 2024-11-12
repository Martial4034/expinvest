'use client';

import { useEffect, useRef } from 'react';
import { useGuide } from "@/app/context/GuideContext";
import styles from './Unity.module.css';

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
  const { incrementStep } = useGuide();
  const unityContainerRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const guideStep = parseInt(localStorage.getItem('guideStep') || '0', 10);
    if (guideStep === 17) {
      incrementStep();
    }
  }, [incrementStep]);


  useEffect(() => {
    const unityContainer = unityContainerRef.current;

    if (!unityContainer) return;

    const handleResize = () => {
      if (unityContainer) {
        unityContainer.width = window.innerWidth;
        unityContainer.height = window.innerHeight;
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    const script = document.createElement('script');
    script.src = '/Utc/Build/Build.loader.js';
    script.async = true;
    script.onload = () => {
      if (typeof createUnityInstance === 'function') {
        createUnityInstance(unityContainer, {
          dataUrl: '/Utc/Build/Build.data.br',
          frameworkUrl: '/Utc/Build/Build.framework.js.br',
          codeUrl: '/Utc/Build/Build.wasm.br',
          streamingAssetsUrl: '/Utc/StreamingAssets',
          companyName: 'OXELTA',
          productName: 'OXELTA Game',
          productVersion: '1.0',
          canvas: unityContainer,
          matchWebGLToCanvasSize: true,
          devicePixelRatio: window.devicePixelRatio
        })
          .then((unityInstance: UnityInstance) => {
            console.log('Unity instance created:', unityInstance);
            const loadingOverlay = document.getElementById('unity-loading-overlay');
            if (loadingOverlay) {
              loadingOverlay.style.display = 'none';
            }
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
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden">
      <div id="unity-loading-overlay" className={styles.loadingOverlay}>
        <img 
          src="/Guide/Stickers/OxO_3.png"
          alt="Loading..."
          className={styles.loadingLogo}
        />
        <div className={styles.progressBar}>
          <div className={styles.progressFill} id="unity-progress-bar-full"></div>
        </div>
      </div>
      <canvas
        id="unity-canvas"
        ref={unityContainerRef}
        className="w-full h-full"
      />
    </div>
  );
}

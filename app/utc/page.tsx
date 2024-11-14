'use client';

import { useEffect, useRef, useState } from 'react';

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

  useEffect(() => {
    const storedLanguage = localStorage.getItem('languageSelected');
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
        })
          .then((unityInstance: UnityInstance) => {
            console.log('Unity instance created:', unityInstance);
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

  return (
    <div className="flex justify-center items-center h-screen">
      <canvas
        id="unity-canvas"
        ref={unityContainerRef}
        className="unity-container"
        style={{ width: '960px', height: '600px' }}
      />
    </div>
  );
}
'use client';

import { useEffect, useRef } from 'react';
import { useGuide } from "@/app/context/GuideContext";

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
          canvas: unityContainer, // Explicitly specify the canvas
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
  }, []);

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

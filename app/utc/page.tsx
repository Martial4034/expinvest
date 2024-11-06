'use client';

import { useEffect, useRef } from 'react';

declare global {
  function createUnityInstance(
    canvas: HTMLElement,
    config: any
  ): Promise<any>;
}

export default function Page() {
  const unityContainerRef = useRef<HTMLDivElement>(null);

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
        })
          .then((unityInstance) => {
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
      <div
        ref={unityContainerRef}
        className="unity-container"
        style={{ width: '960px', height: '600px' }}
      />
    </div>
  );
}

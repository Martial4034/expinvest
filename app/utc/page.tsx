'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { loadingPhrases } from './LoadingPhrases';
import { Button } from "@/app/components/ui/button"; 
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/app/components/ui/dialog";


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
  const [isSafari, setIsSafari] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [pendingRedirect, setPendingRedirect] = useState(false);

  useEffect(() => {
    // Détection du navigateur Safari
    const userAgent = navigator.userAgent;
    const isSafariBrowser = /^((?!chrome|android).)*safari/i.test(userAgent);
    setIsSafari(isSafariBrowser);
  }, []);

  // Gérer la perte de focus sur la page
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden" && isSafari) {
        // Afficher le pop-up seulement si Safari et perte de focus
        setIsDialogOpen(true);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isSafari]);

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

  // Mise à jour des phrases de chargement avec la langue
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
    const selectedLanguage = storedLanguage === 'fr' ? 'fr' : 'en';
    setLanguage(selectedLanguage);

    const unityContainer = unityContainerRef.current;
    if (!unityContainer) return;

    handleResize();
    window.addEventListener('resize', handleResize);

    const buildPrefix = selectedLanguage === 'fr' ? 'BuildFR' : 'BuildEN';
    const script = document.createElement('script');
    script.src = `/Utc/${selectedLanguage}/Build/${buildPrefix}.loader.js`;
    script.async = true;
    script.onload = () => {
      if (typeof createUnityInstance === 'function') {
        createUnityInstance(unityContainer, {
          dataUrl: `/Utc/${selectedLanguage}/Build/${buildPrefix}.data.br`,
          frameworkUrl: `/Utc/${selectedLanguage}/Build/${buildPrefix}.framework.js.br`,
          codeUrl: `/Utc/${selectedLanguage}/Build/${buildPrefix}.wasm.br`,
          streamingAssetsUrl: `/Utc/${selectedLanguage}/StreamingAssets`,
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
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mb-8" />
          
          {/* Modification ici pour afficher la phrase dans la bonne langue */}
          <div className="text-white text-center max-w-md px-4 animate-pulse">
            {currentPhrase[language as keyof typeof currentPhrase]}
          </div>
        </div>
      )}
      {isSafari && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Problème avec Safari</DialogTitle>
            </DialogHeader>
            <p>Si la page ne s'affiche pas correctement, cliquez sur le bouton ci-dessous pour accéder au récapitulatif.</p>
            <DialogFooter>
              <Button onClick={() => (window.location.href = "/recap")}>
                Aller au récapitulatif
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
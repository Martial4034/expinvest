// app/components/guide/Guide.tsx

'use client';

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { guideData, GuideStep } from "./guideData";
import { useGuide } from "@/app/context/GuideContext";
import { useRouter, usePathname } from "next/navigation";
import { ArrowRight } from 'lucide-react';

const Guide: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const guide = useGuide();
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [currentStepData, setCurrentStepData] = useState<GuideStep | null>(null);
  const [pseudo, setPseudo] = useState<string>('');
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');
  const tooltipRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const [tooltipWidth, setTooltipWidth] = useState<string>('auto');
  const [shouldRender, setShouldRender] = useState(true);

const menuButtonText = {
  fr: "Menu principal",
  en: "Main menu"
};

  useEffect(() => {
    const storedLanguage = localStorage.getItem('languageSelected');
    if (storedLanguage === 'en' || storedLanguage === 'fr') {
      setLanguage(storedLanguage);
    }

    const storedPseudo = localStorage.getItem('PSEUDO');
    if (storedPseudo) {
      setPseudo(storedPseudo);
    }
  }, []);
  
  useEffect(() => {
    let stepData = guideData.find(gs => gs.step === guide.step);

    if (!stepData && guide.step > guideData.length) {
      stepData = {
        step: 99999999999,
        messages: {
          fr: "Vous avez fini l'expérience invest, vous êtes maintenant libre de faire ce que vous voulez.",
          en: "You have finished the invest experience, you are now free to do whatever you want."
        },
        showMessage: false,
        menu: true,
      };
    }

    if (stepData) {
      setCurrentStepData(stepData);
      setIsTooltipVisible(stepData.showMessage);

      if (!stepData.showMessage && stepData.timer) {
        const timer = setTimeout(() => {
          setIsTooltipVisible(true);
        }, stepData.timer * 1000);

        return () => clearTimeout(timer);
      }
    }
  }, [guide.step]);

  // Message personnalisé avec le pseudo stylisé
  const message = currentStepData?.messages[language].replace(
    '{PSEUDO}',
    `<span>${pseudo || 'POTENTIEL INVESTISSEUR'}</span>`
  );

  const handleGuideClick = () => {
    if (!currentStepData?.showMessage) {
      setIsTooltipVisible(!isTooltipVisible);
    }
  };

  const handleMenuClick = async () => {
    guide.incrementStep();
    setTimeout(() => {
      router.push('/');
    }, 100);
  };

  useEffect(() => {
    if (tooltipRef.current && textContentRef.current) {
      const tooltipContent = textContentRef.current;
      const tooltip = tooltipRef.current;
      
      if (tooltipContent.scrollWidth > tooltipContent.clientWidth) {
        const extraWidth = tooltipContent.scrollWidth - tooltipContent.clientWidth;
        const newWidth = tooltip.clientWidth + extraWidth + 20; // +20 pour la marge
        setTooltipWidth(`${newWidth}px`);
      }
    }
  }, [message, isTooltipVisible]);

  useEffect(() => {
    const isUTCPage = ['/utc', '/recap'].includes(pathname || '');
    setShouldRender(!isUTCPage);
  }, [pathname]);

  // Vérification du rendu
  if (!shouldRender) {
    return null;
  }

  return (
    <>
      <div className="guide-container" style={{ 
        position: 'fixed',
        top: '7vh',
        left: '15vw',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'flex-start',
        maxWidth: '80vw',
        width: 'auto'
      }}>
        <motion.img
          src={currentStepData?.showMessage ? '/Guide/Stickers/OxO_3.png' : '/Guide/Stickers/OxO_9.png'}
          alt="Guide"
          onClick={handleGuideClick}
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300, duration: 0.9 }}
          style={{
            cursor: 'pointer',
            width: currentStepData?.showMessage ? '170px' : '106px',
            height: currentStepData?.showMessage ? '159px' : '106px',
            flexShrink: 0
          }}
        />
        
        <AnimatePresence>
          {isTooltipVisible && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="guide-tooltip"
              style={{ width: tooltipWidth }}
            >
              <div className="tooltip-content">
                <div 
                  className={`text-content ${(message)}`}
                  dangerouslySetInnerHTML={{ __html: message || '' }}
                />
                {currentStepData?.menu ? (
                  <button 
                    onClick={handleMenuClick}
                    className="menu-button"
                  >
                    {menuButtonText[language]}
                  </button>
                ) : (
                  currentStepData?.showMessage && (
                    <button 
                      onClick={() => guide.incrementStep()}
                      disabled={guide.step >= guideData.length}
                      className="nav-button"
                    >
                      <ArrowRight className="size-8" />
                    </button>
                  )
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {currentStepData?.showMessage && isTooltipVisible && (
        <div className="overlay" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 998,
        }} />
      )}

      <style jsx global>{`
        @font-face {
          font-family: 'PPTelegraf';
          src: url('/Fonts/PPTelegraf-UltraBold.otf') format('opentype');
          font-weight: 110;
          font-style: normal;
        }

        .guide-tooltip {
          margin-left: 20px;
          background: white;
          padding: 15px 25px;
          border-radius: 4.5rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          min-width: 700px;
          max-width: fit-content;
          z-index: 1001;
          display: flex;
          align-items: center;
          min-height: 70px;
        }

        .tooltip-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        .text-content {
          font-family: 'PPTelegraf', sans-serif;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          padding-right: 15px;
          flex: 1;
        }

        .text-content.text-normal { font-size: 27px !important; }
        .text-content.text-md { font-size: 22px !important; }
        .text-content.text-sm { font-size: 20px !important; }
        .text-content.text-xs { font-size: 18px !important; }

        .menu-button {
          border: 4px solid #FFD700;
          background: transparent;
          color: black;
          padding: 8px 20px;
          border-radius: 9999px;
          cursor: pointer;
          font-size: 20px;
          font-family: 'PPTelegraf', sans-serif;
          transition: all 1s ease;
          margin-left: 10px;
          height: 45px;
          display: flex;
          align-items: center;
          animation: pulse 1s infinite cubic-bezier(0.4, 0, 0.6, 1);
        }

        .menu-button:hover {
          background-color: rgba(255, 215, 0, 0.2);
          animation: none;
        }

        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(255, 215, 0, 0.7);
            background-color: rgba(255, 215, 0, 0.2);
          }
          70% {
            box-shadow: 0 0 0 15px rgba(255, 215, 0, 0);
            background-color: rgba(255, 215, 0, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(255, 215, 0, 0);
            background-color: rgba(255, 215, 0, 0.2);
          }
        }

        .nav-button {
          background: none;
          border: none;
          color: #666;
          font-size: 29px;
          cursor: pointer;
          padding: 0 5px;
          margin-left: 10px;
          transition: all 0.3s ease;
        }

        .nav-button:hover:not(:disabled) {
          color: #000;
        }

        .nav-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </>
  );
};

export default Guide;

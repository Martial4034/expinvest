// app/components/guide/Guide.tsx

'use client';

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { guideData, GuideStep } from "./guideData";
import { useGuide } from "@/app/context/GuideContext";
import { useRouter } from "next/navigation";

const Guide: React.FC = () => {
  const router = useRouter();
  const { step, incrementStep } = useGuide();
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [currentStepData, setCurrentStepData] = useState<GuideStep | null>(null);
  const [pseudo, setPseudo] = useState<string>('');
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');

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
    let stepData = guideData.find(gs => gs.step === step);

    if (!stepData && step > guideData.length) {
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
  }, [step]);

  // Message personnalisé avec le pseudo stylisé
  const message = currentStepData?.messages[language].replace(
    '{PSEUDO}',
    `<span class="qualy-title">${pseudo || 'POTENTIEL INVESTISSEUR'}</span>`
  );

  const tooltipStyles = {
    marginLeft: '20px',
    fontSize: '25.3px',
    background: 'white',
    padding: '30px 40px',
    borderRadius: '4rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    maxWidth: '3000px',
    width: '50vw',
    whiteSpace: 'pre-wrap',
    lineHeight: '1.6',
    zIndex: 1001,
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    minHeight: '200px',
  };

  const handleGuideClick = () => {
    if (!currentStepData?.showMessage) {
      setIsTooltipVisible(!isTooltipVisible);
    }
  };

  const handleMenuClick = async () => {
    incrementStep();
    setTimeout(() => {
      router.push('/');
    }, 100);
  };

  return (
    <>
      <div className="guide-container" style={{ 
        position: 'absolute', 
        top: '10vh',
        left: '10vw',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'flex-start',
        maxWidth: '80vw'
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
              style={{
                ...tooltipStyles,
                width: '50vw',
                maxWidth: '3000px',
                borderRadius: '4rem',
                marginLeft: '20px',
                alignSelf: 'center'
              }}
              className="guide-tooltip"
            >
              <div 
                className="text-content"
                dangerouslySetInnerHTML={{ __html: message || '' }}
              />
              <div className="guide-navigation-buttons" style={{ 
                marginTop: '15px', 
                display: 'flex', 
                width: '100%',
                justifyContent: currentStepData?.menu ? 'center' : 'flex-end'
              }}>
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
                      onClick={() => incrementStep()}
                      disabled={step >= guideData.length}
                      className="nav-button"
                    >
                      →
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
          position: relative;
          font-family: 'PPTelegraf', sans-serif;
        }

        .text-content {
          font-size: 25.3px;
          line-height: 1.6;
          text-align: left;
          width: 100%;
          display: block;
          white-space: pre-wrap;
          word-break: break-word;
          overflow-wrap: break-word;
          hyphens: auto;
        }

        .text-content span {
          display: inline;
        }

        @media (max-width: 768px) {
          .guide-tooltip {
            font-size: 20.7px;
            padding: 20px 25px;
          }
          .text-content {
            font-size: 20.7px;
          }
        }

        .nav-button {
          background: none;
          border: none;
          color: #666;
          font-size: 29px;
          cursor: pointer;
          padding: 5px 15px;
          transition: all 0.3s ease;
        }
        .nav-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .nav-button:hover:not(:disabled) {
          color: #000;
        }
        :global(.qualy-title) {
          font-family: 'Qualy', sans-serif;
          font-weight: bold;
        }
        .menu-button {
          background: #4CAF50;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
          font-weight: bold;
          transition: all 0.3s ease;
        }

        .menu-button:hover {
          background: #45a049;
          transform: scale(1.05);
        }

        :global(.language-selector) {
          z-index: 1002 !important;
        }
      `}</style>
    </>
  );
};

export default Guide;

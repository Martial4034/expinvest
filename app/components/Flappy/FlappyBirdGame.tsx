"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useGameAssets } from './hooks/useGameAssets';
import { useGameState } from './hooks/useGameState';
import { GameCanvas } from './components/GameCanvas';
import { GameOverlay } from './components/GameOverlay';
import { Scoreboard } from './Scoreboard';
import { VersusDisplay } from './VersusDisplay';
import { useOXLTBalance } from '@/app/components/Flappy/hooks/useOXLTBalance';
import { useGuide } from '@/app/context/GuideContext';
import { 
  GAME_STATES, 
  REVIVE_COST, 
  BIRD_CONFIG, 
  PIPE_CONFIG,
  CANVAS_WIDTH,
  CANVAS_HEIGHT 
} from './constants';
import type { GameState } from './types';
import Image from 'next/image';
import { useTranslation } from "@/app/hooks/useTranslation";

const FlappyBirdGame: React.FC = () => {
  const { assets, sounds } = useGameAssets();
  const gameState = useGameState();
  const { incrementStep } = useGuide();
  const { t } = useTranslation();
    
  // Déplacer les déclarations d'état au début
  const [isBetMode, setIsBetMode] = useState(false);
  const [showBetOverlay, setShowBetOverlay] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchStep, setSearchStep] = useState(1);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [scoreboardData, setScoreboardData] = useState([
    { pseudo: "Galante", score: 24 },
    { pseudo: "Satoshi", score: 21 },
    { pseudo: "Vitalik", score: 12 },
    { pseudo: "Elon", score: 6 },
    { pseudo: "CZ", score: 1 }
  ]);
  const displayBalance = useOXLTBalance();

  // Maintenant checkCollision peut utiliser isBetMode
  const checkCollision = useCallback((): boolean => {
    const hasCollision = gameState.refs.birdYRef.current + 12 >= CANVAS_HEIGHT - (assets.groundImage.current?.height || 0) ||
      gameState.refs.pipesRef.current.some(pipe => {
        if (
          BIRD_CONFIG.START_X + 12 >= pipe.x &&
          BIRD_CONFIG.START_X - 12 <= pipe.x + (assets.pipeTopImage.current?.width || 0)
        ) {
          const topPipeBottom = pipe.y + (assets.pipeTopImage.current?.height || 0);
          const bottomPipeTop = topPipeBottom + PIPE_CONFIG.GAP;
          return (
            gameState.refs.birdYRef.current - 12 <= topPipeBottom ||
            gameState.refs.birdYRef.current + 12 >= bottomPipeTop
          );
        }
        return false;
      });

    if (hasCollision) {
      if (isBetMode) {
        // Si le score est 0, on relance directement la partie
        if (gameState.state.score === 0) {
          // Réinitialiser la position de l'oiseau
          gameState.refs.birdYRef.current = BIRD_CONFIG.START_Y;
          gameState.refs.birdSpeedRef.current = BIRD_CONFIG.THRUST;
          gameState.refs.birdRotationRef.current = 0;
          gameState.refs.pipesRef.current = [];
          
          // Relancer directement en mode PLAY
          gameState.state.setGameState(GAME_STATES.PLAY);
          sounds.sfxStartRef.current?.play();
          sounds.sfxFlapRef.current?.play();
          return false;
        }
        
        // Si le score n'est pas 0, comportement normal
        const currentBalance = parseInt(localStorage.getItem("oxltBalance") || "0");
        const newBalance = currentBalance + 1200;
        localStorage.setItem("oxltBalance", newBalance.toString());
        
        gameState.state.setGameState(GAME_STATES.SPECIAL_WIN);
        return false;
      } else {
        // Si le joueur meurt après avoir utilisé revive
        if (gameState.state.reviveUsed) {
          const guideStep = parseInt(localStorage.getItem('guideStep') || '0', 10);
          if (guideStep === 12) {
            incrementStep();
          }
        }
        return true;
      }
    }
    return false;
  }, [assets.groundImage, assets.pipeTopImage, gameState.refs.birdYRef, gameState.refs.pipesRef, gameState.state, isBetMode, incrementStep, sounds.sfxStartRef, sounds.sfxFlapRef]);

  // État pour le scoreboard avec le score du joueur
  const userPseudo = "You";

  // Charger le meilleur score au démarrage
  useEffect(() => {
    const savedScoreboard = localStorage.getItem('flappyScoreboard');
    if (savedScoreboard) {
      setScoreboardData(JSON.parse(savedScoreboard));
    }
  }, []);

  // Fonction pour obtenir le meilleur score du joueur
  const getBestScore = () => {
    const userScore = scoreboardData.find(item => item.pseudo === userPseudo);
    return userScore ? userScore.score : 0;
  };

  // Fonction pour mettre à jour le classement
  const updateScoreboard = (currentScore: number) => {
    const bestScore = getBestScore();
    
    // Ne mettre à jour que si le score actuel dépasse le meilleur score
    if (currentScore > bestScore) {
      // Créer un nouveau tableau avec tous les scores, sauf celui du joueur
      const otherScores = scoreboardData.filter(item => item.pseudo !== userPseudo);
      
      // Ajouter le nouveau score du joueur
      const allScores = [
        ...otherScores,
        { pseudo: userPseudo, score: currentScore }
      ];

      // Trier le tableau par score décroissant
      const sortedScores = allScores.sort((a, b) => b.score - a.score);
      
      // Ne garder que les 5 meilleurs scores
      const topFiveScores = sortedScores.slice(0, 5);
      
      // Sauvegarder dans le localStorage
      localStorage.setItem('flappyScoreboard', JSON.stringify(topFiveScores));
      
      // Mettre à jour l'état
      setScoreboardData(topFiveScores);
    }
  };

  // Gestionnaire pour le clic et l'espace
  const handleInteraction = useCallback(() => {
    switch (gameState.state.gameState) {
      case GAME_STATES.GET_READY:
        gameState.state.setGameState(GAME_STATES.PLAY);
        sounds.sfxStartRef.current?.play();
        break;
        
      case GAME_STATES.PLAY:
        if (gameState.refs.birdYRef.current > 0) {
          const guideStep = parseInt(localStorage.getItem('guideStep') || '0', 10);
          if (guideStep === 9) {
            incrementStep();
          }
          sounds.sfxFlapRef.current?.play();
          gameState.refs.birdSpeedRef.current = BIRD_CONFIG.THRUST;
        }
        break;
        
      case GAME_STATES.GAME_OVER:
        break;
    }
  }, [gameState.state, gameState.refs.birdYRef, gameState.refs.birdSpeedRef, sounds.sfxStartRef, sounds.sfxFlapRef]);

  // Gestionnaire de clic souris et tactile
  const handleClick = () => {
    handleInteraction();
  };

  // Gestionnaire de touche espace
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        handleInteraction();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleInteraction]);

  // Ajouter une fonction pour mettre à jour la physique du jeu
  useEffect(() => {
    let frameId: number;
    
    const updateGame = () => {
      if (gameState.state.gameState === GAME_STATES.PLAY) {
        // Mise à jour de la position et vitesse de l'oiseau
        gameState.refs.birdYRef.current += gameState.refs.birdSpeedRef.current;
        gameState.refs.birdSpeedRef.current += BIRD_CONFIG.GRAVITY;

        // Mise à jour de la rotation de l'oiseau
        if (gameState.refs.birdSpeedRef.current <= 0) {
          gameState.refs.birdRotationRef.current = Math.max(-25, (-25 * gameState.refs.birdSpeedRef.current) / BIRD_CONFIG.THRUST);
        } else {
          gameState.refs.birdRotationRef.current = Math.min(90, (90 * gameState.refs.birdSpeedRef.current) / (Math.abs(BIRD_CONFIG.THRUST) * 2));
        }

        // Création des tuyaux
        if (gameState.refs.pipesRef.current.length === 0 || 
            gameState.refs.pipesRef.current[gameState.refs.pipesRef.current.length - 1].x < CANVAS_WIDTH - 200) {
          const topPipeHeight = Math.floor(Math.random() * (CANVAS_HEIGHT * 0.6));
          gameState.refs.pipesRef.current.push({
            x: CANVAS_WIDTH,
            y: topPipeHeight - (assets.pipeTopImage.current?.height || 0),
            passed: false
          });
        }

        // Mise à jour des tuyaux
        gameState.refs.pipesRef.current.forEach((pipe) => {
          pipe.x -= PIPE_CONFIG.SPEED;

          if (!pipe.passed && pipe.x + (assets.pipeTopImage.current?.width || 0) < BIRD_CONFIG.START_X) {
            pipe.passed = true;
            gameState.state.setScore(prev => {
              const newScore = prev + 1;
              updateScoreboard(newScore); // Mettre à jour le scoreboard à chaque point
              return newScore;
            });
            gameState.refs.scoreRef.current += 1;
            sounds.sfxScoreRef.current?.play();
          }
        });

        // Nettoyage des tuyaux hors écran
        gameState.refs.pipesRef.current = gameState.refs.pipesRef.current.filter(pipe => pipe.x > -100);

        // Vérification des collisions
        if (checkCollision()) {
          sounds.sfxHitRef.current?.play();
          gameState.state.setGameState(GAME_STATES.GAME_OVER);
          const guideStep = parseInt(localStorage.getItem('guideStep') || '0', 10);
          if (guideStep === 10) {
            incrementStep();
          }
          gameState.state.setIsGameOver(true);
        }
      }

      frameId = requestAnimationFrame(updateGame);
    };

    frameId = requestAnimationFrame(updateGame);
    return () => cancelAnimationFrame(frameId);
  }, [
    gameState.state.gameState,
    assets.pipeTopImage,
    checkCollision,
    gameState.refs.birdRotationRef,
    gameState.refs.birdSpeedRef,
    gameState.refs.birdYRef,
    gameState.refs.pipesRef,
    gameState.refs.scoreRef,
    gameState.state,
    sounds.sfxHitRef,
    sounds.sfxScoreRef,
    updateScoreboard
  ]);

  const handlePari = () => {
    const guideStep = parseInt(localStorage.getItem('guideStep') || '0', 10);
    if (guideStep === 13) {
      incrementStep();
    }
    
    // Réinitialiser la position de l'oiseau dès le clic sur pari
    gameState.refs.birdYRef.current = BIRD_CONFIG.START_Y;
    gameState.refs.birdSpeedRef.current = 0;
    gameState.refs.birdRotationRef.current = 0;
    gameState.refs.pipesRef.current = [];
    
    setIsBetMode(true);
    gameState.state.setGameState(GAME_STATES.WAITING_BET);
    setShowBetOverlay(true);
  };

  const handlePlay = () => {
    resetGameState();
    gameState.state.setScore(0);
    gameState.state.setIsGameOver(false);
    gameState.state.setGameState(GAME_STATES.GET_READY);
    gameState.state.setReviveUsed(false);
    setIsBetMode(false);
    // Ne pas réinitialiser le scoreboard ici
    sounds.sfxStartRef.current?.play();
  };

  const handleNext = () => {
    const guideStep = parseInt(localStorage.getItem('guideStep') || '0', 10);
    if (guideStep === 15) {
      incrementStep();
    }
    
    resetGameState();
    gameState.state.setGameState(GAME_STATES.GET_READY);
    setShowBetOverlay(false);
    setIsSearching(false);
    setSearchStep(1);
    setCountdown(null);
    setIsBetMode(false);
  };

  const resetGameState = () => {
    // Réinitialiser la position et la vitesse de l'oiseau
    gameState.refs.birdYRef.current = BIRD_CONFIG.START_Y;
    gameState.refs.birdSpeedRef.current = 0;
    gameState.refs.birdRotationRef.current = 0;
    
    // Vider les tuyaux
    gameState.refs.pipesRef.current = [];
    
    // Réinitialiser le score si ce n'est pas un revive
    gameState.refs.scoreRef.current = 0;
    gameState.state.setScore(0);
  };

  const handleRevive = () => {
    const currentBalance = parseInt(localStorage.getItem("oxltBalance") || "0");
    
    if (currentBalance >= REVIVE_COST && !gameState.state.reviveUsed) {
      const guideStep = parseInt(localStorage.getItem('guideStep') || '0', 10);
      if (guideStep === 11) {
        incrementStep();
      }
      // Mettre à jour le solde dans le localStorage
      const newBalance = currentBalance - REVIVE_COST;
      localStorage.setItem("oxltBalance", newBalance.toString());
      
      // Conserver le score actuel mais réinitialiser la position
      gameState.refs.birdYRef.current = BIRD_CONFIG.START_Y;
      gameState.refs.birdSpeedRef.current = 0;
      gameState.refs.birdRotationRef.current = 0;
      gameState.refs.pipesRef.current = [];
      
      gameState.state.setReviveUsed(true);
      gameState.state.setIsGameOver(false);
      gameState.state.setGameState(GAME_STATES.PLAY);
      
      sounds.sfxStartRef.current?.play();
    }
  };

  const handleBetClick = () => {
    const guideStep = parseInt(localStorage.getItem('guideStep') || '0', 10);
    if (guideStep === 14) {
      incrementStep();
    }

    // Enlever 600 OXLT au solde actuel
    const currentBalance = parseInt(localStorage.getItem("oxltBalance") || "0");
    const newBalance = currentBalance - 600;
    localStorage.setItem("oxltBalance", newBalance.toString());
    setShowBetOverlay(false);
    setIsSearching(true);
    
    // Réinitialiser le score
    gameState.state.setScore(0);
    gameState.refs.scoreRef.current = 0;
    
    // Réinitialiser la position de l'oiseau
    gameState.refs.birdYRef.current = BIRD_CONFIG.START_Y;
    gameState.refs.birdSpeedRef.current = 0;
    gameState.refs.birdRotationRef.current = 0;
    gameState.refs.pipesRef.current = [];
    
    setTimeout(() => {
      setSearchStep(2);
      
      setTimeout(() => {
        setIsSearching(false);
        setCountdown(3);
        
        const countdownInterval = setInterval(() => {
          setCountdown(prev => {
            if (prev === null || prev <= 1) {
              clearInterval(countdownInterval);
              // Réinitialiser le jeu et démarrer automatiquement la partie
              resetGameState();
              gameState.state.setScore(0);
              gameState.state.setIsGameOver(false);
              gameState.state.setReviveUsed(false);
              gameState.state.setGameState(GAME_STATES.PLAY); // Démarrer directement en PLAY
              // Simuler un clic pour faire sauter l'oiseau
              gameState.refs.birdSpeedRef.current = BIRD_CONFIG.THRUST;
              sounds.sfxStartRef.current?.play();
              sounds.sfxFlapRef.current?.play();
              return null;
            }
            return prev - 1;
          });
        }, 1000);
      }, 2500);
    }, 2500);
  };

  // Créer un objet qui correspond au type GameState
  const gameStateForProps: GameState = {
    state: gameState.state,
    refs: gameState.refs
  };

  return (
    <div className="flex h-screen items-center justify-center gap-8">
      {/* Zone de jeu à gauche */}
      <div className="relative">
        <GameCanvas
          assets={assets}
          gameState={gameStateForProps}
          handleClick={handleClick}
        />
        
        {/* Overlays sur le canvas */}
        {gameState.state.gameState === GAME_STATES.WAITING_BET && !isSearching && countdown === null && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-start pt-20">
            <h2 className="text-white text-2xl mb-4">{t('flappyGame', 'waitingBet')}</h2>
            <p className="text-white text-xl mb-8">{t('flappyGame', 'pleasebet')}</p>
            <Image
              src="/Tabs/Token.gif"
              alt="Loading"
              width={224}
              height={224}
              className="w-40 h-40 md:w-56 md:h-56"
            />
          </div>
        )}

        {gameState.state.gameState === GAME_STATES.SPECIAL_WIN && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
            <h2 className="text-white text-4xl mb-4">{t('flappyGame', 'congratulations')}</h2>
            <p className="text-white text-2xl mb-8">{t('flappyGame', 'youWin')}</p>
            <p className="text-white text-3xl mb-8">1200 OXLT</p>
            <button
              onClick={handleNext}
              className="bg-blue-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-600 transition-all"
            >
              {t('flappyGame', 'next')}
            </button>
          </div>
        )}

        {isSearching && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-start pt-20">
            <h2 className="text-white text-2xl mb-4">{t('flappyGame', 'searchingPlayer')}</h2>
            <p className="text-white text-xl mb-8">{t('flappyGame', 'step')} {searchStep} / 2</p>
            <Image
              src="/Tabs/Token.gif"
              alt="Loading"
              width={224}
              height={224}
              className="w-40 h-40 md:w-56 md:h-56"
            />
          </div>
        )}

        {countdown !== null && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-start pt-20">
            <h2 className="text-white text-2xl mb-8">{t('flappyGame', 'gameStartsIn')}</h2>
            <span className="text-white text-6xl">{countdown}</span>
          </div>
        )}

        <GameOverlay
          gameState={gameStateForProps}
          handleRevive={handleRevive}
          handlePlay={handlePlay}
          handlePari={handlePari}
          showControls={gameState.state.gameState !== GAME_STATES.WAITING_BET && 
                       gameState.state.gameState !== GAME_STATES.SPECIAL_GAME &&
                       gameState.state.gameState !== GAME_STATES.SPECIAL_WIN}
        />
      </div>

      {/* Zone droite pour le scoreboard ou le versus display */}
      <div className="flex flex-col items-center">
        {showBetOverlay ? (
          <div 
            className={`bg-[#4695c6] shadow-lg ml-4 mt-[-15px] relative`}
            style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}
          >
            {/* En-tte avec le nombre d'OXLT */}
            <div className="relative bg-white p-3 flex justify-center items-center h-[50px]">
              <span className="text-[#4695c6] text-4xl py-2 quantico">
                {t('common', 'youHave')} {displayBalance}
              </span>
            </div>

            {/* Image OXLT qui dépasse */}
            <div className="absolute top-[-60px] right-[-60px] w-[120px] h-[120px]">
              <Image
                src="/flappy/OXLT-bleu.png"
                alt="OXLT"
                width={120}
                height={120}
                className="absolute"
              />
            </div>

            {/* Section Pari */}
            <div className="bg-[#4695c6] h-[calc(100%-80px)] flex flex-col items-center justify-center">
              <h2 className="text-white text-4xl quantico-title text-center justify-center mb-8">
                {t('flappyGame', 'howMuchBet')}
              </h2>
              
              <div className="flex items-center justify-center mb-12">
                <span className="text-[#c1f1fc] text-6xl quantico">600 OXLT</span>
              </div>

              <button
                onClick={handleBetClick}
                className="bg-white text-[#4695c6] px-12 py-4 text-2xl font-bold rounded-lg border-2 border-white hover:bg-transparent hover:text-white transition-all quantico"
              >
                {t('flappyGame', 'bet')}
              </button>
            </div>
          </div>
        ) : (isBetMode && (isSearching || countdown !== null || 
            gameState.state.gameState === GAME_STATES.PLAY || 
            gameState.state.gameState === GAME_STATES.SPECIAL_WIN)) ? (
          <VersusDisplay score={gameState.state.score} />
        ) : (
          <Scoreboard scoreboardData={scoreboardData} userPseudo={userPseudo} />
        )}
      </div>
    </div>
  );
};

export default FlappyBirdGame;
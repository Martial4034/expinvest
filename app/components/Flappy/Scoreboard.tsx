import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "./constants";

interface ScoreboardProps {
  scoreboardData: Array<{ pseudo: string; score: number }>;
  userPseudo: string;
}

export const Scoreboard: React.FC<ScoreboardProps> = ({
  scoreboardData,
  userPseudo,
}) => {
  const topFiveScores = scoreboardData.slice(0, 5);

  return (
    <div
      className={`bg-[#4695c6] shadow-lg ml-4 mt-[-15px] relative`}
      style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}
    >
      {/* En-tête avec le nombre d'OXLT */}
      <div className="relative bg-white p-3 flex justify-center items-center h-[50px]">
        <span className="text-[#4695c6] text-4xl py-2 quantico">
          You have 1,000
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

      {/* Section Top Classement */}
      <div className="bg-[#4695c6] h-[calc(100%-80px)]">
        <div className="text-center py-4 quantico">
          <h2 className="text-white text-4xl quantico-title mb-2">Top Classement</h2>
          <p className="text-white text-2xl mb-6">Fin de classement 4 jours</p>

          {/* Récompenses */}
          <div className="text-white text-2xl space-y-2 mb-2">
            <p>1er 1,000,000 OXLT</p>
            <p>2e 500,000 OXLT</p>
          </div>
        </div>

        {/* Tableau */}
        <div className="w-full mt-6">
          {/* En-tête du tableau */}
          <div className="flex bg-white text-black">
            <div className="flex-1 py-3 text-xl font-bold">
              <span className="pl-2">Position</span>
            </div>
            <div className="flex-1 py-3 text-xl font-bold text-center">
              <span>Pseudo</span>
            </div>
            <div className="flex-1 py-3 text-xl font-bold">
              <span className="pr-2 float-right">Score</span>
            </div>
          </div>

          {/* Corps du tableau avec animation */}
          <div>
            <AnimatePresence>
              {topFiveScores.map((item, index) => (
                <motion.div
                  key={item.pseudo}
                  initial={{ 
                    opacity: item.pseudo === userPseudo ? 0 : 1,
                    y: item.pseudo === userPseudo ? 20 : 0 
                  }}
                  animate={{ 
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5 }
                  }}
                  exit={{ 
                    opacity: 0,
                    y: -20,
                    transition: { duration: 0.3 }
                  }}
                  layout
                  className={`flex border-t-2 border-white overflow-hidden
                    ${item.pseudo === userPseudo 
                      ? 'bg-[#c1f1fc] text-[#4695c6] z-10' 
                      : 'text-white'}`}
                >
                  <motion.div 
                    className="flex-1"
                    layout
                  >
                    <span className="pl-8 text-2xl leading-[52.5px]">{index + 1}</span>
                  </motion.div>
                  <motion.div 
                    className="flex-1 border-l-2 border-r-2 border-white"
                    layout
                  >
                    <span className="text-3xl pl-2 leading-[52.5px]">
                      {item.pseudo}
                    </span>
                  </motion.div>
                  <motion.div 
                    className="flex-1"
                    layout
                  >
                    <span className="pr-8 float-right text-2xl leading-[52.5px]">
                      {item.score}
                    </span>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

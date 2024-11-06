// VersusDisplay.tsx

import React from 'react';
import Image from 'next/image';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from './constants';
import { useOXLTBalance } from '@/app/components/Flappy/hooks/useOXLTBalance';

interface VersusDisplayProps {
  score: number;
}

export const VersusDisplay: React.FC<VersusDisplayProps> = ({ score }) => {
  const displayBalance = useOXLTBalance();
  return (
    <div
      className={`bg-[#4695c6] shadow-lg ml-4 mt-[-15px] relative`}
      style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}
    >
      {/* En-tête avec le nombre d'OXLT */}
      <div className="relative bg-white p-3 flex justify-center items-center h-[50px]">
        <span className="text-[#4695c6] text-4xl py-2 quantico">
          You have {displayBalance}
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

      {/* Section Versus */}
      <div className="bg-[#4695c6] h-[calc(100%-80px)]">
        <div className="text-center py-4 quantico">
          <h2 className="text-white text-4xl quantico-title mb-2">Versus</h2>
          <p className="text-white text-2xl mb-6">Match en cours</p>

          {/* Mise et Gains */}
          <div className="text-white text-2xl space-y-2 mb-2">
            <p>Mise : 600 OXLT</p>
            <p>Gain potentiel : <span className="text-[#c1f1fc]">1200 OXLT</span></p>
          </div>
        </div>

        {/* Zone des scores */}
        <div className="w-full mt-6">
          {/* En-tête */}
          <div className="flex bg-white text-black">
            <div className="flex-1 py-3 text-xl font-bold">
              <span className="pl-8">Your Score</span>
            </div>
            <div className="flex-1 py-3 text-xl font-bold">
              <span className="pl-8">Opponent</span>
            </div>
          </div>

          {/* Scores */}
          <div className="flex text-white border-t-2 border-white">
            <div className="flex-1 border-r-2 border-white">
              <span className="pl-10 text-5xl leading-[100px]">{score}</span>
            </div>
            <div className="flex-1">
              <span className="pl-10 text-5xl leading-[100px]">{score === 0 ? score - 0 : score - 1}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
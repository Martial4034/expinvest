'use client';

import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useGuide } from "@/app/context/GuideContext";
const FlappyBirdGame = dynamic(() => import('@/app/components/Flappy/FlappyBirdGame'), {
  ssr: false,
});

const FlappyPage: React.FC = () => {
  const { incrementStep } = useGuide();

  useEffect(() => {
    const guideStep = parseInt(localStorage.getItem('guideStep') || '0', 10);
    if (guideStep === 7) {
      incrementStep();
    }
  }, [incrementStep]);
  return (
    <div className="flex flex-col items-center h-screen bg-black">
      {/* Titre de la page */}
      <h1
        className="font-['Quantico'] font-bold text-[50px] leading-[60px] mt-2 mb-2"
        style={{ color: "rgb(111,246,254)" }}
      >
        FLAPPY OXO
      </h1>
  
      {/* Jeu */}
      <FlappyBirdGame />
    </div>
  );
};

export default FlappyPage;

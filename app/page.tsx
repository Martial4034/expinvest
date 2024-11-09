'use client'

import React, { useState, useEffect, Suspense } from 'react';
import { GameSelection } from '@/app/components/game-selection';
import { useGuide } from '@/app/context/GuideContext';
import useUsername from '@/app/hooks/useUsername';
import FlagSelection from '@/app/components/Language/flagSelection';
const UsernameWrapper = () => {
  useUsername();
  return null;
};

const Page: React.FC = () => {
  const { step } = useGuide();
  const [activeIds, setActiveIds] = useState<number[]>([]);
  const [showFlagSelection, setShowFlagSelection] = useState<boolean>(true);
  useEffect(() => {
    const languageSelected = localStorage.getItem("languageSelected");
    setShowFlagSelection(!!languageSelected);
  }, []);

  const updateActiveIds = (currentStep: number) => {
    if (currentStep >= 18) {
      setActiveIds([1, 2, 3]);
    } else if (currentStep >= 17) {
      setActiveIds([3]);
    } else if (currentStep >= 8) {
      setActiveIds([2]);
    } else if (currentStep >= 5) {
      setActiveIds([1]);
    } else {
      setActiveIds([]);
    }
  };

  useEffect(() => {
    updateActiveIds(step);
  }, [step]);

  return (
    <main>
      <Suspense fallback={null}>
        <UsernameWrapper />
      </Suspense>
      {showFlagSelection ? (
        <GameSelection activeIds={activeIds} />
      ) : (
        <FlagSelection />
      )}
    </main>
  );
};

export default Page;

'use client'

import React, { useState, useEffect, Suspense } from 'react';
import { GameSelection } from '@/app/components/game-selection';
import { useGuide } from '@/app/context/GuideContext';
import useUsername from '@/app/hooks/useUsername';

const UsernameWrapper = () => {
  useUsername();
  return null;
};

const Page: React.FC = () => {
  const { step } = useGuide();
  const [activeIds, setActiveIds] = useState<number[]>([]);

  const updateActiveIds = (currentStep: number) => {
    if (currentStep >= 16) {
      setActiveIds([1, 2, 3]);
    } else if (currentStep >= 15) {
      setActiveIds([3]);
    } else if (currentStep >= 8) {
      setActiveIds([2]);
    } else if (currentStep >= 4) {
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
      <GameSelection activeIds={activeIds} />
    </main>
  );
};

export default Page;

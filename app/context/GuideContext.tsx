// app/context/GuideContext.tsx

'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface GuideContextType {
  step: number;
  setStep: (step: number) => void;
  incrementStep: () => void;
  decrementStep: () => void;
}

const GuideContext = createContext<GuideContextType | undefined>(undefined);

export const GuideProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [step, setStep] = useState<number>(1);

  // Charger le step depuis localStorage au montage
  useEffect(() => {
    const savedStep = localStorage.getItem('guideStep');
    if (savedStep) {
      setStep(parseInt(savedStep, 10));
    }
  }, []);

  const incrementStep = () => {
    setStep(prevStep => {
      const newStep = prevStep + 1;
      localStorage.setItem('guideStep', newStep.toString());
      return newStep;
    });
  };

  const decrementStep = () => {
    setStep(prevStep => {
      const newStep = Math.max(1, prevStep - 1);
      localStorage.setItem('guideStep', newStep.toString());
      return newStep;
    });
  };

  return (
    <GuideContext.Provider value={{ step, setStep, incrementStep, decrementStep }}>
      {children}
    </GuideContext.Provider>
  );
};

export const useGuide = () => {
  const context = useContext(GuideContext);
  if (context === undefined) {
    throw new Error('useGuide must be used within a GuideProvider');
  }
  return context;
};

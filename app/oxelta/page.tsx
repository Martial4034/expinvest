'use client'

import { useEffect } from 'react';
import { OxeltaTabs } from "@/app/components/OxeltaTabs";
import { useGuide } from "@/app/context/GuideContext";
import { OXLTBalanceDisplay } from "@/app/components/Flappy/OXLTBalanceDisplay";

export default function OxeltaPage() {
  const { incrementStep } = useGuide();

  useEffect(() => {
    const guideStep = parseInt(localStorage.getItem('guideStep') || '0', 10);
    if (guideStep === 5) {
      incrementStep();
    }
  }, [incrementStep]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen bg-black p-0 m-0 overflow-hidden">
      <div className="w-full md:w-auto h-full flex items-center justify-center mobile-landscape:p-0">
        <OxeltaTabs />
      </div>
      <div className="absolute bottom-0">
        <OXLTBalanceDisplay isFlappyPage={false} />
      </div>
    </div>
  );
}

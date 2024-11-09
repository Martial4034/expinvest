'use client'

import { Button } from "@/app/components/ui/button";
import { useGuide } from "@/app/context/GuideContext";
import Image from "next/image";

export default function Tab1Content() {
  const { incrementStep } = useGuide();

  const handleBuyClick = () => {
    const guideStep = parseInt(localStorage.getItem('guideStep') || '0', 10);
    if (guideStep === 6) {
      localStorage.setItem('oxltBalance', '1000');
      incrementStep();
    }
  };

  return (
    <div className="h-full w-full flex items-center pt-10 px-16 md:px-16">
      <div className="flex items-center justify-between w-full">
        <div className="w-1/3 flex justify-center">
          <Image 
            src="/Tabs/Token.gif" 
            alt="OXLT Coin" 
            width={224}
            height={224}
            className="w-40 h-40 md:w-56 md:h-56 object-contain"
          />
        </div>
        
        <div className="w-2/3 flex flex-col items-center space-y-8">
          <p className="text-lg md:text-2xl pp-telegraf-bold text-white text-center max-w-xl">
            Le token OXLT permet aux joueurs d&apos;améliorer et de personnaliser leur expérience dans nos jeux.
          </p>
          
          <div className="w-full max-w-md">
            <div className="bg-transparent rounded-full border-4 border-yellow-400 px-6 py-3 flex items-center justify-between">
              <span className="font-bold text-xl md:text-2xl pp-telegraf-bold text-white">
                $10 / 1000 OXLT
              </span>
              <Button 
                className="text-white text-xl md:text-2xl bg-transparent hover:bg-transparent rounded-full font-bold"
                onClick={handleBuyClick}
              >
                BUY
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

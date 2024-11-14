'use client'

import { Button } from "@/app/components/ui/button";
import { useGuide } from "@/app/context/GuideContext";
import { useTranslation } from "@/app/hooks/useTranslation";
import Image from "next/image";

export default function Tab1Content() {
  const { incrementStep } = useGuide();
  const { t } = useTranslation();

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
            {t('tab1', 'tokenDescription')}
          </p>
          
          <div className="w-full max-w-md">
            <div 
              className="bg-transparent rounded-full border-4 border-yellow-400 px-6 py-3 flex items-center justify-between cursor-pointer hover:bg-yellow-400/30 hover:text-black"
              onClick={handleBuyClick}
            >
              <span className="font-bold text-xl md:text-2xl pp-telegraf-bold text-white">
                {t('tab1', 'priceLabel')}
              </span>
              <span className="text-white text-xl md:text-2xl font-bold">
                {t('common', 'buy')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

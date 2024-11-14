'use client'

import { useTranslation } from "@/app/hooks/useTranslation";
import Image from "next/image";

type GameId = 'flappyOxo' | 'underTheClash' | 'rocketOxo';

interface Game {
  logo: string;
  id: GameId;
  buttonText: 'download' | 'comingSoon';
}

const games: Game[] = [
  {
    logo: "/Tabs/Tab4/icone3.png",
    id: "flappyOxo",
    buttonText: "download"
  },
  {
    logo: "/Tabs/Tab4/icone1.png",
    id: "underTheClash",
    buttonText: "download"
  },
  {
    logo: "/Tabs/Tab4/icone2.png",
    id: "rocketOxo",
    buttonText: "comingSoon"
  }
];

export default function Tab4Content() {
  const { t } = useTranslation();

  const getGameTranslation = (gameId: GameId, key: 'title' | 'description') => {
    return t('tab4', `games.${gameId}.${key}`, true);
  };

  return (
    <div className="flex flex-col md:p-2">
      {games.map((game, index) => (
        <div key={index} className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            <Image 
              src={game.logo} 
              alt={getGameTranslation(game.id, 'title')} 
              width={100}
              height={100}
              className="w-20 h-20 md:w-28 md:h-28 object-contain rounded-full"
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h3 className="text-xl md:text-2xl font-bold text-white pp-telegraf-bold">
                  {getGameTranslation(game.id, 'title')}
                </h3>
                <span className="text-white">:</span>
              </div>
              <p className="text-sm pp-telegraf md:text-lg text-white/90">
                {getGameTranslation(game.id, 'description')}
              </p>
            </div>
          </div>
          
          <button 
            className={`px-8 rounded-full border-4 text-nowrap border-yellow-400 md:text-xl pp-telegraf-bold
                      ${game.buttonText === 'comingSoon' 
                        ? 'text-white hover:bg-yellow-400/20 px-[1.33rem]' 
                        : 'text-white hover:bg-yellow-400/20'}`}
          >
            {t('common', game.buttonText)}
          </button>
        </div>
      ))}
    </div>
  );
}

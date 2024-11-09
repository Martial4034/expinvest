'use client'

import Image from "next/image";

interface Game {
  logo: string;
  title: string;
  description: string;
  buttonText: string;
}

const games: Game[] = [
  {
    logo: "/Tabs/Tab4/icone3.png",
    title: "Flappy Oxo",
    description: "Traversez les tuyaux, grimpez au classement hebdomadaire et gagnez des OXLT.",
    buttonText: "Télécharger"
  },
  {
    logo: "/Tabs/Tab4/icone1.png",
    title: "Under The Clash",
    description: "Jeu de stratégie où vous développez votre forteresse en pillant vos adversaires.",
    buttonText: "Télécharger"
  },
  {
    logo: "/Tabs/Tab4/icone2.png",
    title: "Rocket Oxo",
    description: "Allez le plus loin possible, grimpez dans le classement hebdomadaire et gagnez des OXLT.",
    buttonText: "Coming Soon"
  }
];

export default function Tab4Content() {
  return (
    <div className="flex flex-col md:p-2">
      {games.map((game, index) => (
        <div key={index} className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            <Image 
              src={game.logo} 
              alt={`${game.title} Logo`} 
              width={100}
              height={100}
              className="w-20 h-20 md:w-28 md:h-28 object-contain rounded-full"
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h3 className="text-xl md:text-2xl font-bold text-white pp-telegraf">{game.title}</h3>
                <span className="text-white">:</span>
              </div>
              <p className="text-sm md:text-lg text-white/90">{game.description}</p>
            </div>
          </div>
          
          <button 
            className={`px-8 rounded-full border-4 text-nowrap border-yellow-400 md:text-xl pp-telegraf-bold
                      ${game.buttonText === 'Coming Soon' 
                        ? 'text-white hover:bg-yellow-400/20 px-[1.33rem]' 
                        : 'text-white hover:bg-yellow-400/20'}`}
          >
            {game.buttonText}
          </button>
        </div>
      ))}
    </div>
  );
}

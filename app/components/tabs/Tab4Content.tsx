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
    logo: "/App/Logo_Flappy_Default.png",
    title: "Flappy Oxo",
    description: "Traversez les tuyaux, grimpez au classement hebdomadaire et gagnez des OXLT.",
    buttonText: "Télécharger"
  },
  {
    logo: "/App/Logo_Utc1.png",
    title: "Under The Clash",
    description: "Jeu de stratégie où vous développez votre forteresse en pillant vos adversaires.",
    buttonText: "Télécharger"
  },
  {
    logo: "/App/Logo_Rocket.png",
    title: "Rocket Oxo",
    description: "Allez le plus loin possible, grimpez dans le classement hebdomadaire et gagnez des OXLT.",
    buttonText: "Coming Soon"
  }
];

export default function Tab4Content() {
  return (
    <div className="flex flex-col space-y-4 md:p-8">
      {games.map((game, index) => (
        <div key={index} className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            <Image 
              src={game.logo} 
              alt={`${game.title} Logo`} 
              width={80}
              height={80}
              className="w-16 h-16 md:w-20 md:h-20 object-contain rounded-full"
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
            className={`px-6 py-2 rounded-full border-4 border-yellow-400 text-xl md:text-xl pp-telegraf-bold
                      ${game.buttonText === 'Coming Soon' 
                        ? 'text-white hover:bg-yellow-400/20' 
                        : 'text-white hover:bg-yellow-400/20'}`}
          >
            {game.buttonText}
          </button>
        </div>
      ))}
    </div>
  );
}

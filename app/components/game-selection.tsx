'use client'

import { Card } from "@/app/components/ui/card"
import Link from "next/link"
import { useState } from "react";
import { motion } from "framer-motion"; // Importer Framer Motion

interface Game {
  id: number;
  name: string;
  image: string;
  link: string;
}

interface GameSelectionProps {
  activeIds: number[];
}

export function GameSelection({ activeIds }: GameSelectionProps) {
  const [isHovered, setIsHovered] = useState(false); 

  const games: Game[] = [
    { id: 1, name: "OXELTA", image: "/App/Logo_Oxelta2.png", link: "/oxelta" },
    { id: 2, name: "FLAPPY OXO", image: "", link: "/flappy" }, 
    { id: 3, name: "UNDER THE CLASH", image: "/App/Logo_Utc1.png", link: "/utc" },
  ]

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cover" style={{ backgroundImage: "url('/Background/Black_Space.png')" }}> {/* Fond d'image */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
        
        {/* Carte pour OXELTA */}
        {activeIds.includes(1) ? (
          <Link href={games[0].link} passHref>
            <motion.div
              whileHover={{ scale: 1.05 }} // Zoom léger au survol
              whileTap={{ scale: 0.95 }} // Réduction au clic
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card
                className={`relative overflow-hidden ${activeIds.includes(1) ? '' : 'opacity-50 cursor-not-allowed'} 
                            p-0 flex flex-col items-center justify-center h-60 w-64 bg-cover border-none`} 
                style={{ backgroundImage: "url('/Texture/Cloud.png')" }}
                onMouseEnter={() => setIsHovered(true)} 
                onMouseLeave={() => setIsHovered(false)} 
              >
                <div className={`flex items-center justify-center w-full h-full mb-2 p-2`}>
                  <img
                    src={games[0].image}
                    alt={games[0].name}
                    className={`object-contain w-9/10 h-3/4 rounded-lg transition-transform duration-1000 ${activeIds.includes(1) && !isHovered ? 'animate-pulse' : ''}`} // Animation si activé
                  />
                </div>
              </Card>
            </motion.div>
          </Link>
        ) : (
          <Card
            className={`relative overflow-hidden opacity-50 cursor-not-allowed 
                        p-0 flex flex-col items-center justify-center h-60 w-64 bg-cover border-none`} 
            style={{ backgroundImage: "url('/Texture/Cloud.png')" }} 
          >
            <div className={`flex items-center justify-center w-full h-full mb-2 p-2`}>
              <img
                src={games[0].image}
                alt={games[0].name}
                className={`object-contain w-9/10 h-3/4 rounded-lg`} 
              />
            </div>
          </Card>
        )}

        {/* Carte pour FLAPPY OXO */}
        {activeIds.includes(2) ? (
          <Link href={games[1].link}>
            <Card
              className={`relative overflow-hidden bg-white ${activeIds.includes(2) ? '' : 'opacity-50 cursor-not-allowed'} 
                          p-0 flex flex-col items-center justify-center h-60 w-64 cursor-pointer border-none`}
            >
              <div className={`flex items-center justify-center w-full h-full mb-0 p-0`}>
                {activeIds.includes(2) ? (
                  <img
                    src="/App/Logo_Flappy.gif"
                    alt={games[1].name}
                    className="object-cover w-full h-full rounded-lg"
                  />
                ) : (
                  <img
                    src="/App/Logo_Flappy_Default.png"
                    alt={games[1].name}
                    className="object-cover w-full h-full rounded-lg object-center" 
                  />
                )}
              </div>
            </Card>
          </Link>
        ) : (
          <Card
            className={`relative overflow-hidden opacity-50 cursor-not-allowed 
                        p-0 flex flex-col items-center justify-center h-60 w-64 bg-white border-none`}
          >
            <div className={`flex items-center justify-center w-full h-full mb-0 p-0`}>
              {activeIds.includes(2) ? (
                <img
                  src="/App/Logo_Flappy.gif"
                  alt={games[1].name}
                  className="object-cover w-full h-full rounded-lg" 
                />
              ) : (
                <img
                  src="/App/Logo_Flappy_Default.png"
                  alt={games[1].name}
                  className="object-cover w-full h-full rounded-lg object-center" 
                />
              )}
            </div>
          </Card>
        )}

        {/* Carte pour UNDER THE CLASH */}
        {activeIds.includes(3) ? (
          <Link href={games[2].link}>
            <Card
              className={`relative overflow-visible bg-transparent ${activeIds.includes(3) ? '' : 'opacity-50 cursor-not-allowed'} 
                          p-0 flex flex-col items-center justify-center h-60 w-64 cursor-pointer border-none`} // Suppression des bordures
            >
              <div className={`flex items-center justify-center w-full h-60 mb-2 p-2 relative overflow-visible translate-y-[-25%]`}> {/* Montée de 10% */}
                <img
                  src={games[2].image}
                  alt={games[2].name}
                  className={`object-contain w-full h-full rounded-t-lg transform ${activeIds.includes(3) ? 'animate-bounce duration-1000' : ''}`} // Réduction de la vitesse de bounce
                />
              </div>
              <div className={`flex items-center justify-center w-full h-16 translate-y-[-50%]`}> {/* Montée de 10% */}
                <img
                  src="/App/Logo_Utc_Account.png"
                  alt="Logo Utc Account"
                  className={`object-contain w-full h-full transition-transform duration-1400 ${activeIds.includes(3) ? 'animate-in' : ''}`} // Animation pulse si activé
                />
              </div>
            </Card>
          </Link>
        ) : (
          <Card
            className={`relative overflow-visible opacity-50 cursor-not-allowed 
                        p-0 flex flex-col items-center justify-center h-60 w-64 bg-transparent border-none`}
          >
            <div className={`flex items-center justify-center w-full h-64 mb-2 p-2 relative overflow-visible`}> {/* Montée de 10% */}
              <img
                src={games[2].image}
                alt={games[2].name}
                className={`object-contain w-full h-full rounded-t-lg`} // Image sans animation si désactivée
              />
            </div>
          </Card>
        )}

      </div>
    </div>
  )
}

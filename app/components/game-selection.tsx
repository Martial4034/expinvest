'use client'

import { Card } from "@/app/components/ui/card"
import Link from "next/link"
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-5xl w-full">
        
        {/* Carte pour OXELTA */}
        {activeIds.includes(1) ? (
          <div className="flex flex-col items-center">
            <Link href={games[0].link} passHref>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card
                  className={`relative overflow-hidden ${activeIds.includes(1) ? '' : 'opacity-50 cursor-not-allowed'} 
                              p-0 flex flex-col items-center justify-center h-80 w-80 border-none rounded-[4.5rem]`} 
                  style={{ 
                    backgroundImage: "url('/App/New/2.png')",
                    backgroundSize: 'fill',
                    backgroundPosition: 'center'
                  }}
                  onMouseEnter={() => setIsHovered(true)} 
                  onMouseLeave={() => setIsHovered(false)} 
                >
                  <div className="absolute inset-0">
                    <Image
                      src="/App/New/3.png"
                      alt={games[0].name}
                      width={320}
                      height={320}
                      className={`w-full h-full object-cover transition-transform duration-1000 ${activeIds.includes(1) && !isHovered ? 'animate-pulse' : ''}`}
                    />
                  </div>
                </Card>
              </motion.div>
            </Link>
            <h2 className="text-white text-xl font-bold mt-4">{games[0].name}</h2>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <Card
              className={`relative overflow-hidden opacity-50 cursor-not-allowed 
                          p-0 flex flex-col items-center justify-center h-80 w-80 border-none rounded-[4.6rem]`} 
            >
              <div className="absolute inset-0">
                <Image
                  src="/App/New/1.png"
                  alt={games[0].name}
                  width={320}
                  height={320}
                  className={`w-full h-full object-cover`}
                />
              </div>
            </Card>
            <h2 className="text-white text-xl font-bold mt-4 opacity-50">{games[0].name}</h2>
          </div>
        )}

        {/* Carte pour FLAPPY OXO */}
        {activeIds.includes(2) ? (
          <div className="flex flex-col items-center">
            <Link href={games[1].link} passHref>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card
                  className={`relative overflow-hidden ${activeIds.includes(2) ? '' : 'opacity-50 cursor-not-allowed'} 
                              p-0 flex flex-col items-center justify-center h-80 w-80 border-none rounded-[4.5rem]`} 
                  style={{ 
                    backgroundImage: "url('/App/New/5.png')",
                    backgroundSize: 'fill',
                    backgroundPosition: 'center'
                  }}
                  onMouseEnter={() => setIsHovered(true)} 
                  onMouseLeave={() => setIsHovered(false)} 
                >
                  <div className="absolute inset-0">
                    <Image
                      src="/App/New/6.png"
                      alt={games[1].name}
                      width={320}
                      height={320}
                      className={`w-full h-full object-cover transition-transform duration-1000 ${activeIds.includes(2) && !isHovered ? 'animate-pulse' : ''}`}
                    />
                  </div>
                </Card>
              </motion.div>
            </Link>
            <h2 className="text-white text-xl font-bold mt-4">{games[1].name}</h2>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <Card
              className={`relative overflow-hidden opacity-50 cursor-not-allowed 
                          p-0 flex flex-col items-center justify-center h-80 w-80 border-none rounded-[4.6rem]`} 
            >
              <div className="absolute inset-0">
                <Image
                  src="/App/New/4.png"
                  alt={games[1].name}
                  width={320}
                  height={320}
                  className={`w-full h-full object-cover`}
                />
              </div>
            </Card>
            <h2 className="text-white text-xl font-bold mt-4 opacity-50">{games[1].name}</h2>
          </div>
        )}

        {/* Carte pour UNDER THE CLASH */}
        {activeIds.includes(3) ? (
          <div className="flex flex-col items-center">
            <Link href={games[2].link} passHref>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card
                  className={`relative overflow-hidden ${activeIds.includes(3) ? '' : 'opacity-50 cursor-not-allowed'} 
                              p-0 flex flex-col items-center justify-center h-80 w-80 border-none rounded-[4.5rem]`} 
                  style={{ 
                    backgroundImage: "url('/App/New/8.png')",
                    backgroundSize: 'fill',
                    backgroundPosition: 'center'
                  }}
                  onMouseEnter={() => setIsHovered(true)} 
                  onMouseLeave={() => setIsHovered(false)} 
                >
                  <div className="absolute inset-0">
                    <Image
                      src="/App/New/9.png"
                      alt={games[2].name}
                      width={320}
                      height={320}
                      className={`w-full h-full object-cover transition-transform duration-1000 ${activeIds.includes(3) && !isHovered ? 'animate-pulse' : ''}`}
                    />
                  </div>
                </Card>
              </motion.div>
            </Link>
            <h2 className="text-white text-xl font-bold mt-4">{games[2].name}</h2>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <Card
              className={`relative overflow-hidden opacity-50 cursor-not-allowed 
                          p-0 flex flex-col items-center justify-center h-80 w-80 border-none rounded-[4.6rem]`} 
            >
              <div className="absolute inset-0">
                <Image
                  src="/App/New/7.png"
                  alt={games[2].name}
                  width={320}
                  height={320}
                  className={`w-full h-full object-cover`}
                />
              </div>
            </Card>
            <h2 className="text-white text-xl font-bold mt-4 opacity-50">{games[2].name}</h2>
          </div>
        )}

      </div>
    </div>
  )
}

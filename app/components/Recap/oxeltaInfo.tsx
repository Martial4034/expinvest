// components/OxeltaInfo.tsx
import React, { useState } from "react";
import { InvestmentDialog } from "./InvestmentDialog";
import { cn } from "@/lib/utils";
import Image from "next/image";

const OxeltaInfo: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center min-h-screen text-white bg-cover bg-center",
        dialogOpen && "opacity-0"
      )}
    >
      {/* Title */}
      <div className="text-center text-4xl text-[#00FFFB] quantico-title mb-10">
        L&apos;histoire d&apos;Oxelta
      </div>

      <div className="flex items-center gap-32">
        {/* Main Info Boxes Section */}
        <div className="flex flex-col md:flex-row items-center bg-[#0A1E35] rounded-2xl p-8 gap-8 max-w-[1200px] shadow-lg">
          {/* Left Column with Steps */}
          <div className="space-y-5 text-base text-[#A1C6DF] flex flex-col items-center">
            <p>Vous avez acheter du token</p>
            <p className="text-2xl">&#8595;</p>
            <p>Vous avez utiliser le token</p>
            <p className="text-2xl">&#8595;</p>
            <p>Un autre gamer achetera du token</p>
          </div>

          {/* Middle Column with Descriptions */}
          <div className="flex flex-col items-center space-y-6 text-base text-[#A1C6DF] max-w-[400px]">
            <div className="bg-[#143956] rounded-lg p-5 text-center">
              Cette achat était lié à CEX/DEX, créant une{" "}
              <span className="text-[#00FFFB] font-bold">
                pression acheteuse
              </span>{" "}
              sur le marché.
            </div>
            <div className="bg-[#143956] rounded-lg p-5 text-center">
              Utilisation des token a crée un stock OXLT pour oxelta,{" "}
              <span className="text-[#00FFFB] font-bold">
                diminuant l&apos;offre
              </span>{" "}
              en circulation.
            </div>
            <div className="bg-[#143956] rounded-lg p-5 text-center">
              Vente du stock Ingame pour{" "}
              <span className="text-[#00FFFB] font-bold">
                générer des revenus
              </span>
              , permettant de renforcer le modèle.
            </div>
          </div>
        </div>

        {/* Right Column with OXLT Coin Graphic - Maintenant en dehors et à droite */}
        <div className="relative flex flex-col items-center justify-center w-96 space-y-4">
          <div className="text-white qualy-title font-bold text-2xl">
            OXELTA
          </div>

          <div className="relative h-[200px]">
            <Image
              src="/Tabs/Token.gif"
              alt="OXLT Coin"
              width={144}
              height={144}
              className="rounded-full mt-10 p-0"
            />

            <div className="absolute -left-32 top-1/2 -translate-y-1/2 text-[#00FFFB] text-sm">
              <div className="flex items-center">
                <span className="text-justify text-[#00FFFB] text-xl">
                  Utilise
                  <br />
                  <span className="qualy-title text-2xl">OXLT</span>
                  <br />
                  Ingame
                </span>
                <svg width="80" height="200" viewBox="0 0 80 200">
                  <defs>
                    <marker
                      id="arrowhead"
                      markerWidth="10"
                      markerHeight="7"
                      refX="9"
                      refY="3.5"
                      orient="auto"
                    >
                      <polygon points="0 7, 10 3.5, 0 0" fill="#00FFFB" />
                    </marker>
                  </defs>
                  <path
                    d="M 70 200 Q 0 100 70 0"
                    fill="none"
                    stroke="#00FFFB"
                    strokeWidth="2"
                    markerEnd="url(#arrowhead)"
                  />
                </svg>
              </div>
            </div>

            <div className="absolute -right-32 top-1/2 -translate-y-1/2 text-[#00FFFB] text-sm">
              <div className="flex items-center">
                <svg width="80" height="200" viewBox="0 0 80 200">
                  <path
                    d="M 10 0 Q 80 100 10 200"
                    fill="none"
                    stroke="#00FFFB"
                    strokeWidth="2"
                    markerEnd="url(#arrowhead2)"
                  />
                  <defs>
                    <marker
                      id="arrowhead2"
                      markerWidth="10"
                      markerHeight="7"
                      refX="9"
                      refY="3.5"
                      orient="auto"
                    >
                      <polygon points="0 0, 10 3.5, 0 7" fill="#00FFFB" />
                    </marker>
                  </defs>
                </svg>
                <span className="text-justify text-[#00FFFB] text-xl">
                  Revend
                  <br />
                  <span className="qualy-title text-2xl">OXLT</span>
                  <br />
                  Ingame
                </span>
              </div>
            </div>
          </div>

          <div className="text-justify text-white text-xl qualy-title">
            GAMERS
          </div>
        </div>
      </div>

      {/* Footer Call-to-Action */}
      <div className="mt-12">
        <button 
          onClick={() => setDialogOpen(true)}
          className="relative inline-flex items-center justify-center px-8 py-2 text-lg font-bold text-black bg-[#E5E659] rounded-full font-['quantico-title'] border border-[#E5E659] transition-all duration-300 ease-in-out hover:bg-[#00FFFB] hover:border-[#00FFFB] group"
        >
          <span className="relative z-10 quantico-title">JOIN THE PRIVATE SALE</span>
          <span className="absolute inset-0 border-2 border-[#E5E659] rounded-full -m-[6px] pointer-events-none transition-all duration-300 ease-in-out group-hover:border-[#00FFFB] opacity-70"></span>
        </button>
      </div>

      <InvestmentDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  );
};

export default OxeltaInfo;

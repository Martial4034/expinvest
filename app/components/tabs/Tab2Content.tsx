"use client";

import Image from "next/image";

export default function Tab2Content() {
  return (
    <div className="h-full w-full flex items-center pt-10 px-16 md:px-16">
      <div className="flex items-center justify-between w-full">
        <div className="w-1/3 flex justify-center">
          <Image
            src="/Tabs/Gold.gif"
            alt="OXLT Coin"
            width={256}
            height={256}
            className="w-48 h-48 md:w-64 md:h-64 object-contain"
          />
        </div>

        <div className="w-2/3 flex flex-col items-center space-y-8">
          <p className="text-lg md:text-2xl pp-telegraf-bold text-white text-center max-w-xl">
            NFT interopérable d&apos;Oxelta, offrant accès à des événements privés,
            avantages dans nos jeux et aucune publicité.{" "}
          </p>
          <div className="w-full max-w-md">
            <div className="bg-transparent rounded-full border-4 border-yellow-400 px-6 py-3 flex items-center justify-center">
              <span className="font-bold text-xl md:text-2xl pp-telegraf-bold text-white">
                Coming Soon
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client'

import OxeltaInfo from "@/app/components/Recap/oxeltaInfo";

export default function RecapPage() {


  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen bg-black p-0 m-0 overflow-hidden">
      <div className="w-full md:w-auto h-full flex items-center justify-center mobile-landscape:p-0">
      <OxeltaInfo />
      </div>
    </div>
  );
}

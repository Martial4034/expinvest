'use client'

import { OxeltaTabs } from "@/app/components/OxeltaTabs";

export default function OxeltaPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/Background/Cloud.png')" }}>
      <OxeltaTabs />
    </div>
  );
}

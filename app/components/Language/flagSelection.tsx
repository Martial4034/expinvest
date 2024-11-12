"use client";

import { Card } from "@/app/components/ui/card";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useGuide } from '@/app/context/GuideContext';

export default function FlagSelection() {
  const [isHovered, setIsHovered] = useState(false);
  const { incrementStep } = useGuide();
  const [language, setLanguage] = useState<string>("en");

  useEffect(() => {
    const languageSelected = localStorage.getItem("languageSelected");
    if (!languageSelected) {
      setLanguage("en");
    } else {
      setLanguage(languageSelected);
    }
  }, []);
  const handleLanguageSelect = (lang: string) => {
    localStorage.setItem("languageSelected", lang);
    setLanguage(lang);
    const guideStep = parseInt(localStorage.getItem('guideStep') || '1', 10);
    if (guideStep === 1) {
        incrementStep();
      }
    window.location.href = '/';
  };

  useEffect(() => {
    
  }, [incrementStep]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <div className="grid grid-cols-2 md:grid-cols-2 gap-16">
        {/* Carte pour ENGLSIH FLAG */}
        <div className="flex flex-col items-center">
          <Link href="#" passHref onClick={() => handleLanguageSelect("en")}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card
                className={`relative overflow-hidden p-0 flex flex-col items-center justify-center h-80 w-80 border-none rounded-[4.5rem]`}
                style={{
                  backgroundImage: "url('/flags/uk.png')",
                  backgroundSize: "fill",
                  backgroundPosition: "center",
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              ></Card>
            </motion.div>
          </Link>
        </div>

        {/* Carte pour FRENCH FLAG */}
        <div className="flex flex-col items-center">
          <Link href="#" passHref onClick={() => handleLanguageSelect("fr")}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card
                className={`relative overflow-hidden p-0 flex flex-col items-center justify-center h-80 w-80 border-none rounded-[4.5rem]`}
                style={{
                  backgroundImage: "url('/flags/fr.png')",
                  backgroundSize: "fill",
                  backgroundPosition: "center",
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              ></Card>
            </motion.div>
          </Link>
        </div>
      </div>
    </div>
  );
}

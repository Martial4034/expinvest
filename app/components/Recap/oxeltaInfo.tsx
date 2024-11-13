// components/OxeltaInfo.tsx
import React, { useState } from "react";
import { InvestmentDialog } from "./InvestmentDialog";
import { Card } from "@/app/components/ui/card";
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Slider as MUISlider } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Input } from "@/app/components/ui/input";
import { z } from "zod";

// Validation schema pour l'email
const emailSchema = z.string().email("Format d'email invalide");

// Style personnalisé pour le slider MUI
const CustomSlider = styled(MUISlider)({
  color: '#00FFFB',
  height: 8,
  width: '80%',
  '& .MuiSlider-thumb': {
    backgroundColor: '#00FFFB',
    width: 24,
    height: 24,
    '&:hover': {
      boxShadow: '0 0 0 8px rgba(0, 255, 251, 0.16)',
    },
  },
  '& .MuiSlider-track': {
    backgroundColor: '#00FFFB',
    height: 8,
  },
  '& .MuiSlider-rail': {
    backgroundColor: '#143956',
    height: 8,
  },
  '& .MuiSlider-mark': {
    backgroundColor: '#143956',
    height: 8,
  },
  '& .MuiSlider-markLabel': {
    color: '#A1C6DF',
    fontSize: '1rem',
  },
  '& .MuiSlider-valueLabel': {
    backgroundColor: '#143956',
    color: '#00FFFB',
    fontSize: '1rem',
  },
});

// Définition des animations pour les slides
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
};

const OxeltaInfo: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [investment, setInvestment] = useState<{
    type: 'USDT' | 'USD' | null;
    amount: number;
    email: string;
  }>({
    type: null,
    amount: 20000,
    email: ''
  });

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const validateEmail = (email: string) => {
    const result = emailSchema.safeParse(email);
    return result.success;
  };

  const renderStep = () => {
    const renderButtons = () => (
      <div className="absolute bottom-0 left-0 right-0 flex justify-between mb-2">
        {currentStep > 0 && (
          <button
            onClick={() => setCurrentStep(prev => prev - 1)}
            className="ml-2 px-2 py-2 text-white bg-[#1968b0] text-xl quantico-title rounded-full hover:bg-yellow-500/20 transition-colors"
          >
            Previous
          </button>
        )}
        {currentStep < 4 && (
          <button
            onClick={handleNextStep}
            disabled={
              (currentStep === 1 && !investment.type) ||
              (currentStep === 2 && (investment.amount < 800 || investment.amount > 40000)) ||
              (currentStep === 3 && !validateEmail(investment.email))
            }
            className={cn(
              "mr-2 px-4 py-4 text-white bg-[#1968b0] text-xl quantico-title rounded-full border-4 border-yellow-400 hover:bg-yellow-500/20 transition-colors",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              currentStep === 0 && "mx-auto"
            )}
          >
            {currentStep === 3 ? 'Finish' : 'Next'}
          </button>
        )}
      </div>
    );

    switch (currentStep) {
      case 0:
        return (
          <motion.div
            key="initial"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="relative flex flex-col space-y-6 h-full"
          >
            <div className="flex items-center gap-2">
              <img
                src="/App/oxelta-rond.png"
                alt="Oxelta Logo"
                className="w-40 h-40"
              />
              <p className="text-2xl text-white text-center flex-1">
                En achetant des tokens, vous créez{" "}
                <span className="font-bold">une pression acheteuse</span> sur le marché,
                car l&apos;achat est directement lié à celui-ci.
              </p>
            </div>

            <div className="flex items-center gap-8">
              <img
                src="/App/flappy-utc.png"
                alt="Game Icon"
                className="w-36 h-36"
              />
              <p className="text-2xl text-white text-center flex-1">
                En les utilisant dans nos jeux, vous avez{" "}
                <span className="font-bold">réduit l&apos;offre en circulation</span> et
                contribué à constituer un{" "}
                <span className="font-bold">stock d&apos;OXLT</span> pour Oxelta, destiné
                à être revendu dans nos jeux pour générer des revenus.
              </p>
            </div>

            <div className="flex justify-center mb-2">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-12 py-4 text-white bg-[#1968b0] text-2xl quantico-title rounded-full border-4 border-yellow-400 hover:bg-yellow-500/20 transition-colors"
              >
                Rejoindre la vente privée
              </button>
            </div>
          </motion.div>
        );

      case 1:
        return (
          <motion.div
            key="step1"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="relative flex flex-col h-full"
          >
            <div className="flex flex-col items-center justify-center h-full">
              <h2 className="text-center text-3xl text-[#00FFFB] mb-12 quantico-title">
                Comment souhaitez-vous investir ?
              </h2>
              <div className="flex justify-center gap-12">
                {['USDT', 'USD'].map((type) => (
                  <div
                    key={type}
                    onClick={() => setInvestment({ ...investment, type: type as 'USDT' | 'USD' })}
                    className={cn(
                      "flex flex-col items-center p-8 rounded-xl cursor-pointer transition-all",
                      "hover:bg-[#143956]",
                      investment.type === type ? "bg-[#143956] border-2 border-[#00FFFB]" : "bg-[#0A1E35]"
                    )}
                  >
                    <Image
                      src={`/Investment/${type}.png`}
                      alt={type}
                      width={120}
                      height={120}
                      className="mb-6"
                    />
                    <span className="text-2xl font-bold text-white">{type}</span>
                  </div>
                ))}
              </div>
            </div>
            {renderButtons()}
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="step2"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="relative flex flex-col h-full"
          >
            <div className="flex flex-col items-center justify-center h-full space-y-12">
              <h2 className="text-center text-3xl text-[#00FFFB] mb-8 quantico-title">
                Combien souhaitez-vous investir ?
              </h2>
              <div className="w-full flex justify-center">
                <CustomSlider
                  value={investment.amount}
                  onChange={(_: Event, value: number | number[]) => {
                    const newValue = Array.isArray(value) ? value[0] : value;
                    setInvestment({ ...investment, amount: newValue });
                  }}
                  min={800}
                  max={40000}
                  step={100}
                  marks={[
                    { value: 800, label: '800 $' },
                    { value: 20000, label: '20K $' },
                    { value: 30000, label: '30K $' },
                    { value: 40000, label: '40K $' },
                  ]}
                  valueLabelDisplay="on"
                />
              </div>
              
              <div className="flex flex-col items-center gap-4">
                <div className="bg-[#143956] px-6 py-3 rounded-lg flex items-center">
                  <Input
                    type="number"
                    value={investment.amount}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      setInvestment({ ...investment, amount: value });
                    }}
                    className="w-32 bg-transparent text-3xl text-[#00FFFB] quantico-title text-center focus:outline-none border-none"
                  />
                  <span className="text-3xl text-[#00FFFB] quantico-title ml-2">$</span>
                </div>
                {(investment.amount < 800 || investment.amount > 40000) && (
                  <span className="text-red-500 text-sm">
                    La valeur doit être comprise entre 800$ et 40000$
                  </span>
                )}
              </div>
            </div>
            {renderButtons()}
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="step3"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="relative flex flex-col h-full"
          >
            <div className="flex flex-col items-center justify-center h-full space-y-8">
              <h2 className="text-center text-3xl text-[#00FFFB] mb-8 quantico-title">
                Indiquez nous votre email
              </h2>
              <div className="flex flex-col items-center space-y-4 w-full max-w-lg">
                <Input
                  type="email"
                  placeholder="votre@email.com"
                  value={investment.email}
                  onChange={(e) => setInvestment({ ...investment, email: e.target.value })}
                  className="w-full px-4 py-3 bg-[#143956] border-2 border-[#00FFFB] text-white text-lg placeholder:text-gray-400"
                />
                {investment.email && !validateEmail(investment.email) && (
                  <span className="text-red-500">Email invalide</span>
                )}
              </div>
            </div>
            {renderButtons()}
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            key="step4"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="relative flex flex-col h-full"
          >
            <div className="flex-1 flex flex-col items-center justify-center space-y-8">
              <h2 className="text-center text-3xl text-[#00FFFB] mb-8 quantico-title">
                Merci pour votre intérêt !
              </h2>
              <p className="text-xl text-white text-center">
                Notre équipe vous contactera prochainement.
              </p>
              <Image
                src="/Guide/Stickers/Cheers.png"
                alt="Cheers"
                width={192}
                height={192}
                className="w-48 h-48"
              />
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-[100vw] md:w-[70%] md:h-auto -ml-[env(safe-area-inset-left)] md:ml-0 min-w-[75vw] mobile-landscape:w-screen mobile-landscape:h-screen">
      {currentStep === 0 && (
        <h1 className="text-3xl md:text-3xl quantico-title text-center mb-5 text-white">
          Dans cette simulation vous avez augmentez la valeur marchande du token OXLT
        </h1>
      )}
      <Card className="w-full h-full bg-[#1968b0] rounded-none md:rounded-[5rem] mobile-landscape:rounded-none border-0">
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 100,
            damping: 20
          }}
          className="p-2 md:p-8 mobile-landscape:p-0 h-full md:min-h-[415px]"
        >
          {renderStep()}
        </motion.div>
      </Card>
      <InvestmentDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  );
};

export default OxeltaInfo;

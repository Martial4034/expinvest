'use client'

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/app/components/ui/dialog"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { Slider as MUISlider } from "@mui/material"
import { styled } from "@mui/material/styles"
import Image from "next/image"

const CustomSlider = styled(MUISlider)({
  color: '#00FFFB',
  '& .MuiSlider-thumb': {
    backgroundColor: '#00FFFB',
  },
  '& .MuiSlider-track': {
    backgroundColor: '#00FFFB',
  },
  '& .MuiSlider-rail': {
    backgroundColor: '#143956',
  },
  '& .MuiSlider-mark': {
    backgroundColor: '#143956',
  },
  '& .MuiSlider-markLabel': {
    color: '#A1C6DF',
  },
  '& .MuiSlider-valueLabel': {
    backgroundColor: '#143956',
    color: '#00FFFB',
  },
})

interface InvestmentOption {
  type: 'USDT' | 'USD' | null
  amount: number
  email?: string
}

export function InvestmentDialog({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
  const [step, setStep] = useState(1)
  const [investment, setInvestment] = useState<InvestmentOption>({
    type: null,
    amount: 20000,
    email: ''
  })

  const [pseudo, setPseudo] = useState<string | null>(null)
  const [storedEmail, setStoredEmail] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setPseudo(localStorage.getItem('PSEUDO'))
    setStoredEmail(localStorage.getItem('EMAIL'))
  }, [])

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const sendInvestmentEmail = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pseudo,
          email: storedEmail || investment.email,
          amount: investment.amount,
          type: investment.type,
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi de l'email");
      }

      setStep(4);
    } catch (error) {
      console.error('Erreur:', error);
      // Gérer l'erreur ici si nécessaire
    } finally {
      setIsLoading(false)
    }
  }

  const handleNextStep = () => {
    if (step === 2) {
      if (!storedEmail) {
        setStep(3)
      } else {
        sendInvestmentEmail()
      }
    } else if (step === 3) {
      if (isValidEmail(investment.email || '')) {
        localStorage.setItem('EMAIL', investment.email || '')
        setStoredEmail(investment.email || '')
        sendInvestmentEmail()
      }
    }
  }

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
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] bg-[#0A1E35] text-white min-h-[400px] flex flex-col">
        <AnimatePresence mode="wait" custom={step}>
          {step === 1 && (
            <motion.div
              key="step1"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              custom={1}
              className="flex-1 flex flex-col"
            >
              <DialogHeader>
                <DialogTitle className="text-center text-3xl text-[#00FFFB] mb-8 quantico-title">
                  Comment souhaitez-vous investir ?
                </DialogTitle>
              </DialogHeader>
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex justify-center gap-8">
                  {['USDT', 'USD'].map((type) => (
                    <div
                      key={type}
                      onClick={() => setInvestment({ ...investment, type: type as 'USDT' | 'USD' })}
                      className={cn(
                        "flex flex-col items-center p-6 rounded-xl cursor-pointer transition-all",
                        "hover:bg-[#143956]",
                        investment.type === type ? "bg-[#143956] border-2 border-[#00FFFB]" : "bg-[#0A1E35]"
                      )}
                    >
                      <Image
                        src={`/Investment/${type}.png`}
                        alt={type}
                        width={96}
                        height={96}
                        className="mb-4"
                      />
                      <span className="text-xl font-bold">{type}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <Button
                  onClick={() => setStep(2)}
                  disabled={!investment.type}
                  className="bg-[#00FFFB] text-black hover:bg-[#00FFFB]/80"
                >
                  NEXT
                </Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              custom={1}
              className="flex-1 flex flex-col"
            >
              <DialogHeader>
                <DialogTitle className="text-center text-3xl text-[#00FFFB] mb-8 quantico-title">
                  Combien souhaitez-vous investir ?
                </DialogTitle>
              </DialogHeader>
              <div className="flex-1 flex flex-col justify-center space-y-8">
                <CustomSlider
                  value={investment.amount}
                  onChange={(_, value) => setInvestment({ ...investment, amount: value as number })}
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
                <div className="flex justify-center">
                  <div className="bg-[#143956] px-6 py-3 rounded-lg">
                    <span className="text-3xl text-[#00FFFB] quantico-title">{investment.amount}$</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between mt-6">
                <Button
                  variant="ghost"
                  onClick={() => setStep(1)}
                  className="text-white hover:text-[#00FFFB]"
                >
                  PREVIOUS
                </Button>
                <Button
                  onClick={handleNextStep}
                  className="bg-[#00FFFB] text-black hover:bg-[#00FFFB]/80"
                >
                  FINISH
                </Button>
              </div>
            </motion.div>
          )}

          {step === 3 && !storedEmail && (
            <motion.div
              key="step3"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              custom={1}
              className="flex-1 flex flex-col"
            >
              <DialogHeader>
                <DialogTitle className="text-center text-3xl text-[#00FFFB] mb-8 quantico-title">
                  Indiquez nous votre email
                </DialogTitle>
              </DialogHeader>
                      <div className="flex-1 flex flex-col justify-center space-y-8">
                        <div className="flex flex-col items-center space-y-4">
                          <Input
                            type="email"
                            placeholder="votre@email.com"
                            value={investment.email}
                            onChange={(e) => setInvestment({ ...investment, email: e.target.value })}
                            className="max-w-lg bg-[#143956] border-[#00FFFB] text-white text-lg placeholder:text-lg"
                          />
                          {investment.email && !isValidEmail(investment.email) && (
                            <span className="text-red-500">Email invalide</span>
                          )}
                        </div>
                      </div>
              <div className="flex justify-between mt-6">
                <Button
                  variant="ghost"
                  onClick={() => setStep(2)}
                  className="text-white hover:text-[#00FFFB]"
                >
                  PREVIOUS
                </Button>
                <Button
                  onClick={handleNextStep}
                  disabled={!isValidEmail(investment.email || '')}
                  className="bg-[#00FFFB] text-black hover:bg-[#00FFFB]/80"
                >
                  FINISH
                </Button>
              </div>
            </motion.div>
          )}

          {((step === 4 && storedEmail) || (step === 4 && isValidEmail(investment.email || ''))) && (
            <motion.div
              key="step4"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              custom={1}
              className="flex-1 flex flex-col"
            >
              <DialogHeader>
                <DialogTitle className="text-center text-3xl text-[#00FFFB] mb-8 quantico-title">
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="h-6 w-6 animate-spin text-[#00FFFB]" />
                      <span>Envoi en cours...</span>
                    </div>
                  ) : (
                    `On va vous appeler ${pseudo}`
                  )}
                </DialogTitle>
              </DialogHeader>
              {!isLoading && (
                <div className="flex-1 flex items-center justify-center">
                  <Image
                    src="/Guide/Stickers/Cheers.png"
                    alt="Cheers"
                    width={192} // 48 * 4 for better resolution
                    height={192} // 48 * 4 for better resolution
                    className="w-48 h-48"
                  />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
} 
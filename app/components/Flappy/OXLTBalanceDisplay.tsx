import React, { useEffect, useState, useRef } from 'react';

interface OXLTBalanceDisplayProps {
  isFlappyPage?: boolean;
}

export const OXLTBalanceDisplay: React.FC<OXLTBalanceDisplayProps> = ({ 
  isFlappyPage = false 
}) => {
  const [displayBalance, setDisplayBalance] = useState<number>(0);
  const animationRef = useRef<number>();
  const targetBalanceRef = useRef<number>(0);

  const animateValue = (start: number, end: number) => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    targetBalanceRef.current = end;
    const duration = 1500;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      if (progress < 1) {
        const currentValue = start + (end - start) * progress;
        setDisplayBalance(Math.round(currentValue));
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayBalance(targetBalanceRef.current);
        animationRef.current = undefined;
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    // Initialisation immédiate avec la valeur du localStorage
    const storedBalance = parseInt(localStorage.getItem('oxltBalance') || '0', 10);
    setDisplayBalance(storedBalance);
    targetBalanceRef.current = storedBalance;

    const checkBalance = () => {
      if (animationRef.current) return; // Ne pas interrompre une animation en cours

      const storedBalance = parseInt(localStorage.getItem('oxltBalance') || '0', 10);
      if (storedBalance !== targetBalanceRef.current) {
        animateValue(displayBalance, storedBalance);
      }
    };

    const interval = setInterval(checkBalance, 100);

    return () => {
      clearInterval(interval);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const containerClass = isFlappyPage
    ? "fixed bottom-4 right-4 z-50"
    : "w-1/4 p-4 flex flex-col items-center justify-center";

  return (
    <div className={containerClass}>
      <div className="bg-white bg-opacity-50 rounded-lg p-4 border-2 border-blue-500 flex items-center">
        <span className="text-4xl qualy-title">{displayBalance}</span>
        <img
          src="/Tabs/Token.gif"
          alt="OXLT Token"
          className="w-12 h-12 ml-4"
        />
      </div>
    </div>
  );
};
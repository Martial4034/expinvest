import { useState, useRef, useEffect } from 'react';

export const useOXLTBalance = () => {
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
    const storedBalance = parseInt(localStorage.getItem('oxltBalance') || '0', 10);
    setDisplayBalance(storedBalance);
    targetBalanceRef.current = storedBalance;

    const checkBalance = () => {
      if (animationRef.current) return;

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

  return displayBalance;
}; 
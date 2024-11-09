"use client";

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useGuide } from "@/app/context/GuideContext";

const useUsername = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { step, incrementStep } = useGuide();

  useEffect(() => {
    const processLanguage = () => {
      const lang = searchParams?.get('lang');
      let needsRefresh = false;
      
      if (lang) {
        if (lang === 'en') {
          localStorage.setItem('languageSelected', 'en');
          if (step === 1) incrementStep();
          needsRefresh = true;
        } else if (lang === 'fr') {
          localStorage.setItem('languageSelected', 'fr');
          if (step === 1) incrementStep();
          needsRefresh = true;
        }
      }
      return needsRefresh;
    };

    const processEmail = () => {
      const email = searchParams?.get('email');
      let needsRefresh = false;

      if (email) {
        // Validation de l'email
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        let pseudo = '';

        if (isValidEmail) {
          if (/^[a-zA-Z]+[0-9]*@gmail\.com$/.test(email)) {
            const namePart = email.split('@')[0];
            const nameWithoutNumbers = namePart.replace(/[0-9]+$/, '');
            pseudo = capitalizeFirstLetter(nameWithoutNumbers);
          } else {
            const namePart = email.split('@')[0];
            const nameParts = namePart.split(/[._]/).filter(part => part);

            if (nameParts.length > 0) {
              pseudo = nameParts.map(part => capitalizeFirstLetter(part)).join(' ');
            } else {
              pseudo = 'POTENTIEL INVESTISSEUR';
            }
          }
        } else {
          pseudo = 'POTENTIEL INVESTISSEUR';
        }

        if (!pseudo) {
          pseudo = 'POTENTIEL INVESTISSEUR';
        }

        localStorage.setItem('PSEUDO', pseudo);
        if (isValidEmail) {
          localStorage.setItem('EMAIL', email);
        } else {
          localStorage.setItem('EMAIL', '');
        }
        needsRefresh = true;
      } else {
        const existingPseudo = localStorage.getItem('PSEUDO');
        if (!existingPseudo) {
          localStorage.setItem('PSEUDO', 'POTENTIEL INVESTISSEUR');
          localStorage.setItem('EMAIL', '');
        }
      }
      return needsRefresh;
    };

    const langNeedsRefresh = processLanguage();
    const emailNeedsRefresh = processEmail();

    if (langNeedsRefresh || emailNeedsRefresh) {
      router.push('/');
      // Petit délai pour s'assurer que la redirection est initiée
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
  }, [router, searchParams, step, incrementStep]);
};

const capitalizeFirstLetter = (string: string) => {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default useUsername;
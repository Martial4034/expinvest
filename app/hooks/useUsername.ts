"use client";

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const useUsername = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const processEmail = () => {
      const email = searchParams?.get('email');

      if (email) {
        // Validation de l'email
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        let pseudo = '';

        if (isValidEmail) {
          if (/^[a-zA-Z]+[0-9]*@gmail\.com$/.test(email)) {
            // Exemple : john123@gmail.com => John
            const namePart = email.split('@')[0];
            const nameWithoutNumbers = namePart.replace(/[0-9]+$/, '');
            pseudo = capitalizeFirstLetter(nameWithoutNumbers);
          } else {
            // Cas général : extraire les parties du nom
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

        // Si aucun pseudo n'est défini, définir le pseudo par défaut
        if (!pseudo) {
          pseudo = 'POTENTIEL INVESTISSEUR';
        }

        // Stocker le pseudo et l'email dans le stockage local
        localStorage.setItem('PSEUDO', pseudo);
        if (isValidEmail) {
          localStorage.setItem('EMAIL', email);
        } else {
          localStorage.setItem('EMAIL', '');
        }

        // Rediriger vers la page classique sans les paramètres
        router.push('/');
      } else {
        // Si aucun email n'est présent, définir le pseudo par défaut si non déjà défini
        const existingPseudo = localStorage.getItem('PSEUDO');
        if (!existingPseudo) {
          localStorage.setItem('PSEUDO', 'POTENTIEL INVESTISSEUR');
          localStorage.setItem('EMAIL', '');
        }
      }
    };

    processEmail();
  }, [router, searchParams]);
};

// Fonction pour capitaliser la première lettre
const capitalizeFirstLetter = (string: string) => {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default useUsername;
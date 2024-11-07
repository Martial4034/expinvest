// app/components/guide/guideData.ts

export interface GuideStep {
  step: number;
  messages: {
    en: string;
    fr: string;
  };
  showMessage: boolean;
  timer?: number; // Temps en secondes avant l'affichage automatique (optionnel)
  menu?: boolean; // Nouveau champ pour afficher le bouton menu
}

// Ajout des traductions pour le bouton menu
export const menuButtonText = {
  en: "Back to menu",
  fr: "Retour au menu"
};

export const guideData: GuideStep[] = [
  {
    step: 1,
    messages: {
      en: "",
      fr: "Bienvenue {PSEUDO} dans l&apos;éxperience guidée OXELTA !"
    },
    showMessage: true
  },
  {
    step: 2,
    messages: {
      en: "",
      fr: "Je suis Sir Oxo, appuyer sur moi pour obtenir de l&apos;aide si besoin."
    },
    showMessage: true
  },
  {
    step: 3,
    messages: {
      en: "",
      fr: "Pour commencer {PSEUDO}, aller sur l&apos;application Oxelta."
    },
    showMessage: true
  },
  {
    step: 4,
    messages: {
      en: "",
      fr: "Cliquez sur le bouton OXELTA. (logo le plus à gauche)"
    },
    showMessage: false,
    timer: 20
  },
  {
    step: 5,
    messages: {
      en: "",
      fr: "Achetez des OXLT sur la page dédiée en cliquant sur le bouton &apos;BUY&apos;"
    },
    showMessage: false,
    timer: 5
  },
  {
    step: 6,
    messages: {
      en: "",
      fr: "Vous pouvez utilisez vos OXLT dans nos Jeux"
    },
    showMessage: false,
    menu: true,
    timer: 5
  },
  {
    step: 7,
    messages: {
      en: "",
      fr: "Ouvrez l&apos;application Flappy Oxo"
    },
    showMessage: false,
    timer: 2,
  },
  {
    step: 8,
    messages: {
      en: "",
      fr: "Jouer une partie de Flappy Oxo"
    },
    showMessage: false,
    timer: 1,
    menu: false,
  },
  {
    step: 9,
    messages: {
      en: "",
      fr: "Il semble y avoir un problème avec le jeu, veuillez réessayer en vidant votre stockage local."
    },
    showMessage: false,
    timer: 999,
  },
  {
    step: 10,
    messages: {
      en: "",
      fr: "Cliquez sur Revive coûte 100 OXLT"
    },
    showMessage: false,
    timer: 1,
  },
  {
    step: 11,
    messages: {
      en: "",
      fr: ""
    },
    showMessage: false,
    timer: 999,
  },
  {
    step: 12,
    messages: {
      en: "",
      fr: "Démarrer une partie en ligne en pariant 600 OXLT"
    },
    showMessage: false,
    timer: 1,
  },
  {
    step: 13,
    messages: {
      en: "",
      fr: "Cliquez sur le bouton &apos;PARIER&apos; à droite"
    },
    showMessage: false,
    timer: 1,
  },
  {
    step: 14,
    messages: {
      en: "",
      fr: "Terminer votre partie en ligne"
    },
    showMessage: false,
    timer: 999,
  },
  {
    step: 15,
    messages: {
      en: "",
      fr: "Bravo {PSEUDO} vous avez gagné. Retourner au menu principal."
    },
    showMessage: true,
    menu: true,
  },
  {
    step: 16,
    messages: {
      en: "",
      fr: "Accedez à l&apos;application Under The Clash."
    },
    showMessage: false,
    timer: 10,
  },
];

export default guideData;

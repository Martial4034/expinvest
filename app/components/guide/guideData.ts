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
      fr: "Je suis Sir Oxo, appuyer sur moi pour obtenir de l’aide si besoin."
    },
    showMessage: true
  },
  {
    step: 3,
    messages: {
      en: "",
      fr: "Pour commencer {PSEUDO}, aller sur l’application Oxelta."
    },
    showMessage: true
  },
  {
    step: 4,
    messages: {
      en: "",
      fr: ""
    },
    showMessage: false,
    timer: 15
  },
  {
    step: 5,
    messages: {
      en: "",
      fr: "Cliquez sur le bouton OXELTA."
    },
    showMessage: false,
    timer: 15
  },
  {
    step: 6,
    messages: {
      en: "",
      fr: "Cliquez sur le bouton BUY."
    },
    showMessage: false,
    timer: 15
  },
  {
    step: 7,
    messages: {
      en: "",
      fr: "Vous pouvez maintenant les utilisés IN-GAME"
    },
    showMessage: false,
    menu: true,
    timer: 4,
  },
  {
    step: 8,
    messages: {
      en: "",
      fr: "Cliquez sur le bouton OXELTA."
    },
    showMessage: false,
    menu: false,
    timer: 5,
  },
];

export default guideData;

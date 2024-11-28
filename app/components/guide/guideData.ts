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
      en: "Please, select a language.",
      fr: "Please, select a language."
    },
    showMessage: false,
    timer: 1,
  },
  {
    step: 2,
    messages: {
      en: "Welcome {PSEUDO} to the guided experience OXELTA!",
      fr: "Bienvenue {PSEUDO} dans l'éxperience guidée OXELTA !"
    },
    showMessage: true
  },
  {
    step: 3,
    messages: {
      en: "I am Sir Oxo, click on me if you need help.",
      fr: "Je suis Sir Oxo, appuyer sur moi pour obtenir de l' aide si besoin."
    },
    showMessage: true
  },
  {
    step: 4,
    messages: {
      en: "To start, go to the Oxelta app.",
      fr: "Pour commencer, aller sur l' application Oxelta."
    },
    showMessage: true
  },
  {
    step: 5,
    messages: {
      en: "Discover OXELTA by clicking on its application.",
      fr: "Découvrez OXELTA en appuyant sur son application."
    },
    showMessage: false,
    timer: 20
  },
  {
    step: 6,
    messages: {
      en: "Buy OXLT on the dedicated page by clicking on the BUY  button",
      fr: "Achetez des OXLT sur la page dédiée en cliquant sur le bouton BUY"
    },
    showMessage: false,
    timer: 5
  },
  {
    step: 7,
    messages: {
      en: "You can use your OXLT in our games.",
      fr: "Vous pouvez utilisez vos OXLT dans nos Jeux."
    },
    showMessage: false,
    menu: true,
    timer: 3
  },
  {
    step: 8,
    messages: {
      en: "Open the Flappy Oxo app to win OXLT.",
      fr: "Ouvrez l’application Flappy Oxo pour gagner des OXLT."
    },
    showMessage: false,
    timer: 2,
  },
  {
    step: 9,
    messages: {
      en: "Play a game of Flappy Oxo",
      fr: "Jouer une partie de Flappy Oxo"
    },
    showMessage: false,
    timer: 1,
    menu: false,
  },
  {
    step: 10,
    messages: {
      en: "It seems there is a problem with the game, please try again by clearing your local storage.",
      fr: "Il semble y avoir un problème avec le jeu, veuillez réessayer en vidant votre stockage local."
    },
    showMessage: false,
    timer: 999,
  },
  {
    step: 11,
    messages: {
      en: "You can revive to progress in the ranking.",
      fr: "Vous pouvez revivre pour progresser dans le classement."
    },
    showMessage: false,
    timer: 1,
  },
  {
    step: 12,
    messages: {
      en: "You can also play in the Oxelta games by clicking on the OXELTA button.",
      fr: "Vous pouvez aussi jouer dans les jeux Oxelta en cliquant sur le bouton OXELTA."
    },
    showMessage: false,
    timer: 999,
  },
  {
    step: 13,
    messages: {
      en: "Bet your OXLT online to win more !",
      fr: "Pariez vos OXLT en ligne pour en gagner plus !"
    },
    showMessage: false,
    timer: 1,
  },
  {
    step: 14,
    messages: {
      en: "Click on the PARIER button on the right",
      fr: "Cliquez sur le bouton PARIER à droite"
    },
    showMessage: false,
    timer: 1,
  },
  {
    step: 15,
    messages: {
      en: "Finish your online game",
      fr: "Terminer votre partie en ligne"
    },
    showMessage: false,
    timer: 999,
  },
  {
    step: 16,
    messages: {
      en: "Congratulations, you won OXLT !",
      fr: "Félicitation vous avez gagner des OXLT !"
    },
    showMessage: false,
    timer: 2,
    menu: true,
  },
  {
    step: 17,
    messages: {
      en: "Discover the Under The Clash application",
      fr: "Découvrez l’application Under The Clash "
    },
    showMessage: false,
    timer: 10,
  },
];

export default guideData;

// Tableau regroupant les questions sur la série Castle (20 questions au total)
const quizData = [
  {
    question: "Quel est le métier principal de Richard Castle ?",
    options: [
      "Détective privé",
      "Écrivain de romans policiers",
      "Médecin légiste",
      "Avocat de la défense",
    ],
    correct: 1,
  },
  {
    question: "Dans quel commissariat de police travaille Kate Beckett ?",
    options: [
      "Le 12ème District",
      "Le 21ème District",
      "Le 9ème District",
      "Le 5ème District",
    ],
    correct: 0,
  },
  {
    question: "Comment s'appelle la fille de Richard Castle ?",
    options: ["Martha", "Alexis", "Jenny", "Lanie"],
    correct: 1,
  },
  {
    question:
      "Quel est le nom du tout premier roman à succès écrit par Castle ?",
    options: [
      "Vague de chaleur (Heat Wave)",
      "Tempête de sang",
      "Infiltration",
      "In a Hail of Bullets",
    ],
    correct: 3,
  },
  {
    question: "Quel est le surnom du duo de détectives Ryan et Esposito ?",
    options: [
      "Les Frères d'armes",
      "Les Jumeaux du crime",
      "Espo et Ryan",
      "Les Boys",
    ],
    correct: 3,
  },
  {
    question: "Quel objet Castle apporte-t-il TOUS les matins à Beckett ?",
    options: [
      "Un beignet au chocolat",
      "Une tasse de café",
      "Le journal du jour",
      "Une rose rouge",
    ],
    correct: 1,
  },
  {
    question: "Quelle est la profession de la mère de Castle, Martha Rodgers ?",
    options: [
      "Actrice de théâtre",
      "Juge à la cour suprême",
      "Agent secret à la retraite",
      "Chanteuse d'opéra",
    ],
    correct: 0,
  },
  {
    question:
      "Quel événement tragique du passé pousse Beckett à devenir policière ?",
    options: [
      "Le braquage de la banque de son père",
      "Le meurtre non résolu de sa mère",
      "L'enlèvement de son frère",
      "Une erreur judiciaire dont elle a été victime",
    ],
    correct: 1,
  },
  {
    question:
      "Comment s'appelle l'héroïne des romans de Castle inspirée par Beckett ?",
    options: ["Nikki Heat", "Storm Rook", "Clara Strike", "Kate Blaze"],
    correct: 0,
  },
  {
    question:
      "Qui est le premier capitaine du district à diriger l'équipe de Beckett ?",
    options: ["Victoria Gates", "Roy Montgomery", "Jim Beckett", "Tom Demming"],
    correct: 1,
  },
  {
    question: "Quel acteur incarne le personnage de Richard Castle ?",
    options: ["Nathan Fillion", "Stana Katic", "Jon Huertas", "Seamus Dever"],
    correct: 0,
  },
  {
    question:
      "Quelle est la spécialité médicale de Lanie Parish, l'amie de Beckett ?",
    options: [
      "Psychiatre criminelle",
      "Chirurgienne",
      "Médecin légiste",
      "Pédiatre",
    ],
    correct: 2,
  },
  {
    question:
      "Quel est le vrai nom de famille de Richard Castle avant qu'il ne le change ?",
    options: ["Rodgers", "Alexander", "Murdock", "Harper"],
    correct: 0,
  },
  {
    question: "Avec qui Kevin Ryan se marie-t-il ?",
    options: ["Il ne se marie pas", "Jenny", "Lanie", "Tory"],
    correct: 1,
  },
  {
    question:
      "Quel type de jeu Castle organise-t-il régulièrement chez lui avec d'autres auteurs célèbres ?",
    options: ["Des échecs", "Du poker", "Du Scrabble", "Du Billard"],
    correct: 1,
  },
  {
    question:
      "Quel est le nom du redoutable tueur en série qui obsède l'équipe pendant plusieurs saisons ?",
    options: [
      "Le Tueur aux camées",
      "Le Triple Tueur (3XK)",
      "L'Éventreur de New York",
      "Le Tueur à la cravate",
    ],
    correct: 1,
  },
  {
    question:
      "Quel surnom strict l'équipe donne-t-elle au capitaine Victoria Gates à son arrivée ?",
    options: ["Iron Gates", "La Reine rouge", "Le Sergent", "La Dictatrice"],
    correct: 0,
  },
  {
    question:
      "Dans quelle célèbre université Alexis Castle fait-elle ses études ?",
    options: [
      "Harvard",
      "Stanford",
      "Columbia",
      "NYU (Université de New York)",
    ],
    correct: 3,
  },
  {
    question:
      "Quelle est la marque de la voiture de luxe souvent conduite par Castle ?",
    options: [
      "Ferrari",
      "Ferrari California",
      "Mercedes-Benz SLS AMG",
      "Aston Martin DB9",
    ],
    correct: 0,
  },
  {
    question:
      "Quel objet symbolique Beckett porte-t-elle en hommage à sa mère ?",
    options: [
      "Une plume",
      "Une rose",
      "Une bague sur une chaîne",
      "Une montre",
    ],
    correct: 2,
  },
];

// Récupération des éléments HTML5
const welcomeScreen = document.getElementById("welcome-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const currentQuestionNum = document.getElementById("current-question-num");
const totalQuestionsNum = document.getElementById("total-questions-num");
const scoreText = document.getElementById("score-text");
const feedbackText = document.getElementById("feedback-text");
const timerSec = document.getElementById("timer-sec");

// Variables de jeu
let shuffledQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let clock;
let timeLeft = 10;

// Déclaration de la fonction shuffle (ayant comme paramètre un tableau)permettant de mélanger un tableau (Algorithme de Fisher-Yates)
const shuffle = (array) => {
  // Boucle for
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Déclaration de la fonction resetState qui va permettre de réinitialiser l'état entre deux questions
const resetState = () => {
  clearInterval(clock);
  timeLeft = 10;
  timerSec.textContent = timeLeft;
  nextBtn.classList.add("hide");
  optionsContainer.innerHTML = "";
};

// Déclaration de la fonction timeOut qui va permettre d'effectuer une action si le temps est écoulé
const timeOut = () => {
  const correctIndex = shuffledQuestions[currentQuestionIndex].correct;
  const allButtons = optionsContainer.querySelectorAll(".option-btn");

  // Pour chaque bouton
  allButtons.forEach((btn) => (btn.disabled = true));
  allButtons[correctIndex].classList.add("correct");
  nextBtn.classList.remove("hide");
};

// Déclaration de la focntion startTimer() qui permet de gérer le compte à rebours
const startTimer = () => {
  clock = setInterval(() => {
    timeLeft--; // Décrémentation du temps
    timerSec.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(clock);
      // Appel de la fonction timeOut()
      timeOut();
    }
  }, 1000);
};

// Fonction déclenchée quand le joueur clique sur une réponse
const selectAnswer = (selectedIndex, selectedButton) => {
  clearInterval(clock);

  const correctIndex = shuffledQuestions[currentQuestionIndex].correct;
  const allButtons = optionsContainer.querySelectorAll(".option-btn");

  // Pour chaque bouton
  allButtons.forEach((btn) => (btn.disabled = true));

  // Condition if else
  if (selectedIndex === correctIndex) {
    selectedButton.classList.add("correct");
    score++; // Incrémentation du score
  } else {
    selectedButton.classList.add("wrong");
    allButtons[correctIndex].classList.add("correct");
  }

  nextBtn.classList.remove("hide");
};

// Déclaration de la fonction showQuestion() qui va permettre d'afficher une question
const showQuestion = () => {
  // Appel de la fonction resetState()
  resetState();
  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  currentQuestionNum.textContent = currentQuestionIndex + 1;
  questionText.textContent = currentQuestion.question;

  // Pour chaque option
  currentQuestion.options.forEach((option, index) => {
    // Création d'un element <button>
    const button = document.createElement("button");
    button.textContent = option;
    button.classList.add("btn", "option-btn");
    // Ecoute de l'événement "click" sur le bouton et appel de la fonction selectAnswer
    button.addEventListener("click", () => selectAnswer(index, button));
    // Ajout du bouton dans le DOM
    optionsContainer.appendChild(button);
  });

  // Appel de la fonction startTimer()
  startTimer();
};

// Déclaration de la fonction startQuiz qui va permettre de démarrer le quiz
const startQuiz = () => {
  welcomeScreen.classList.add("hide");
  quizScreen.classList.remove("hide");
  shuffledQuestions = shuffle([...quizData]); // Appel de la fonction shuffle
  currentQuestionIndex = 0;
  score = 0;
  totalQuestionsNum.textContent = shuffledQuestions.length;
  // Appel de la fonction showQuestion()
  showQuestion();
};

// Déclarartion de la fonction showResults qui va permettre d'afficher les résultats
const showResults = () => {
  quizScreen.classList.add("hide");
  resultScreen.classList.remove("hide");
  scoreText.textContent = `Vous avez obtenu ${score} sur ${shuffledQuestions.length} !`;

  // Condition if else if else
  if (score === shuffledQuestions.length) {
    feedbackText.textContent =
      "Incroyable ! Vous êtes le digne partenaire de Kate Beckett. Richard Castle écrira sûrement un livre sur vous ! 🖊️✨";
  } else if (score >= 12) {
    feedbackText.textContent =
      "Pas mal ! Vous passez beaucoup de temps au 12ème district, mais vous avez raté quelques indices en chemin. 🔎";
  } else {
    feedbackText.textContent =
      "Affaire classée... mais sans succès. Vous devriez revoir vos classiques ou relire les romans de Nikki Heat ! 📚";
  }
};

// Passer à la question suivante ou finir le quiz
const loadNextQuestion = () => {
  currentQuestionIndex++; // Incrémentation
  // Condition if else
  if (currentQuestionIndex < shuffledQuestions.length) {
    // Appel de la fonction showQuestion()
    showQuestion();
  } else {
    // Appel de la fonction shaowResults()
    showResults();
  }
};

// Déclaration de la fonction restartQuiz qui va permettre de recommencer le quiz
const restartQuiz = () => {
  resultScreen.classList.add("hide");
  // Appel de la fonction startQuiz()
  startQuiz();
};

// Écouteurs d'événements "click" et appel de fonction
startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", loadNextQuestion);
restartBtn.addEventListener("click", restartQuiz);

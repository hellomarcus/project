const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const quizContainer = document.getElementById("quiz-container");
const locationImage = document.getElementById("location-image");
const optionsContainer = document.getElementById("options");
const resultContainer = document.getElementById("result");

const quizData = [
  {
    image: "spain.jpg",
    options: ["Spain", "Italy", "France", "Germany", "Japan", "Pakistan", "Brazil"],
    answer: "Spain",
  },
  {
    image: "italy.png",
    options: ["Spain", "Italy", "France", "Germany", "Japan", "Pakistan", "Brazil"],
    answer: "Italy",
  },
  {
    image: "france.jpg",
    options: ["Spain", "Italy", "France", "Germany", "Japan", "Pakistan", "Brazil"],
    answer: "France",
  },
  {
    image: "germany.png",
    options: ["Spain", "Italy", "France", "Germany", "Japan", "Pakistan", "Brazil"],
    answer: "Germany",
  },
  {
    image: "japan.png",
    options: ["Spain", "Italy", "France", "Germany", "Japan", "Pakistan", "Brazil"],
    answer: "Japan",
  },
  {
    image: "pakistan.png",
    options: ["Spain", "Italy", "France", "Germany", "Japan", "Pakistan", "Brazil"],
    answer: "Pakistan",
  },
  {
    image: "brazil.png",
    options: ["Spain", "Italy", "France", "Germany", "Japan", "Pakistan", "Brazil"],
    answer: "Brazil",
  },
];

let currentQuestion = 0;
let score = 0;

const loadQuestion = () => {
  const { image, options } = quizData[currentQuestion];
  const randomOptions = shuffleArray(options);

  const timeStamp = new Date().getTime();
  locationImage.src = `${image}?${timeStamp}`;
  optionsContainer.innerHTML = randomOptions
    .map(
      (option) =>
        `<button onclick="selectOption('${option}')">${option}</button>`
    )
    .join("");
};

const selectOption = (selectedAnswer) => {
  const correctAnswer = quizData[currentQuestion].answer;

  if (selectedAnswer === correctAnswer) {
    score++;
  }

  currentQuestion++;

  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
};
const showResult = () => {
  nextBtn.style.display = "none";
  restartBtn.style.display = "block";
  quizContainer.style.display = "none";
  resultContainer.innerText = `You scored ${score}/${quizData.length}`;
};

const restartQuiz = () => {
  currentQuestion = 0;
  score = 0;
  nextBtn.style.display = "block";
  restartBtn.style.display = "none";
  quizContainer.style.display = "block";
  resultContainer.innerText = "";
  loadQuestion();
};

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

nextBtn.addEventListener("click", loadQuestion);

restartBtn.addEventListener("click", restartQuiz);

loadQuestion();

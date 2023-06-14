//QuizShow programme made by Szakacsi Ferenc-Adam/

// select all elements by id
const start = document.getElementById("start");
const startText = document.getElementById("start-text");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const counter = document.getElementById("counter");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

let questions = [
  {
    question: "Which city is the capital of Romania?",
    choiceA: "Satu Mare",
    choiceB: "Bucuresti",
    choiceC: "Timisoara",
    choiceD: "Brasov",
    correct: "B",
  },
  {
    question: "How many official languages does Switzerland have?",
    choiceA: "1",
    choiceB: "2",
    choiceC: "3",
    choiceD: "4",
    correct: "D",
  },
  {
    question: "What is the name of the World's largest ocean?",
    choiceA: "Pacific",
    choiceB: "Atlantic",
    choiceC: "Indian",
    choiceD: "Arctic",
    correct: "A",
  },
  {
    question:
      "Demolition of the Berlin wall separating East and West Germany began in what year?",
    choiceA: "1980",
    choiceB: "2000",
    choiceC: "1989",
    choiceD: "1995",
    correct: "C",
  },
  {
    question: "How many members does the EU have?",
    choiceA: "15",
    choiceB: "23",
    choiceC: "27",
    choiceD: "32",
    correct: "C",
  },
  {
    question: "In what year did Albert Einstein die",
    choiceA: "1945",
    choiceB: "1930",
    choiceC: "1955",
    choiceD: "1939",
    correct: "C",
  },
  {
    question: "How many Champions Leagues did Real Madrid FC win?",
    choiceA: "14",
    choiceB: "2",
    choiceC: "7",
    choiceD: "11",
    correct: "A",
  },
  {
    question: "How many F1 world championships did Michael Schumacher win?",
    choiceA: "2",
    choiceB: "4",
    choiceC: "7",
    choiceD: "10",
    correct: "C",
  },
  {
    question: "Which is Garfield's favourite meal?",
    choiceA: "Oatmeal",
    choiceB: "Lasagna",
    choiceC: "Pizza",
    choiceD: "Spaghetti",
    correct: "B",
  },
  {
    question: "Who's Batman?",
    choiceA: "Alfred",
    choiceB: "Bruce Wayne",
    choiceC: "Catwoman",
    choiceD: "Peter Parker",
    correct: "B",
  },
  {
    question: "In the series Johnny Bravo, What color is Johnny's hair?",
    choiceA: "Blonde",
    choiceB: "Brown",
    choiceC: "Red yellow",
    choiceD: "Bright yellow",
    correct: "A",
  },
  {
    question: "How old is Pikachu in 2023?",
    choiceA: "23 years",
    choiceB: "18 years",
    choiceC: "12 years",
    choiceD: "5 years",
    correct: "A",
  },
  {
    question: "What is the highest-grossing box office film of all time?",
    choiceA: "Parasite",
    choiceB: "Horns",
    choiceC: "Titanic",
    choiceD: "Avengers: Endgame",
    correct: "D",
  },
  {
    question:
      "How could a man go outside in the pouring rain without protection, and not have a hair on his head get wet?",
    choiceA: "He was insane",
    choiceB: "He wasn't a man",
    choiceC: "He was SpiderMan",
    choiceD: "He was bald",
    correct: "D",
  },
  {
    question: "What word is spelled incorrectly in every single dictionary?",
    choiceA: "Correctly",
    choiceB: "Incorrectly",
    choiceC: "Uncorrectly",
    choiceD: "Noncorrectly",
    correct: "B",
  },
  {
    question:
      "Some months have 31 days, others have 30 days, but how many have 28 days?",
    choiceA: "All the months",
    choiceB: "February",
    choiceC: "2 February in 10 years",
    choiceD: "None of this",
    correct: "A",
  },
  {
    question: "Which are the 3 essential colours?",
    choiceA: "Red, Yellow, Blue",
    choiceB: "Red, Green, Blue",
    choiceC: "Purple, Pink, Orange",
    choiceD: "Blue, Yellow, Red",
    correct: "A",
  },
  {
    question: "Who was the first person to design models of flying machine?",
    choiceA: "Leonardo da Vinci",
    choiceB: "Leonardo di Caprio",
    choiceC: "Gallileo Galilei",
    choiceD: "Isaac Newton",
    correct: "A",
  },
  {
    question: "Which unit is used to measure the frequency of sound?",
    choiceA: "Hertz",
    choiceB: "Ohm",
    choiceC: "Newton",
    choiceD: "Kelvin",
    correct: "A",
  },
  {
    question: "The most electronegative element among the following is?",
    choiceA: "Sodium",
    choiceB: "Bromine",
    choiceC: "Fluorine",
    choiceD: "Oxygen",
    correct: "C",
  },
];

// Extra variables
const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 20; // 20s
let Timer;
let score = 0;

// render a question
function renderQuestion() {
  let q = questions[runningQuestion];
  question.innerHTML = "<p>" + q.question + "</p>";
  choiceA.innerHTML = q.choiceA;
  choiceB.innerHTML = q.choiceB;
  choiceC.innerHTML = q.choiceC;
  choiceD.innerHTML = q.choiceD;
}

start.addEventListener("click", startQuiz);

// start quiz
function startQuiz() {
  var music = new Audio();
  music.src = "public/music/BackgroundMusic.mp3";
  music.play();
  start.style.display = "none";
  startText.style.display = "none";
  renderQuestion();
  quiz.style.display = "block";
  renderProgress();
  renderCounter();
  Timer = setInterval(renderCounter, 1000); // 1000ms = 1s
}

// render progress
function renderProgress() {
  for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
    progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
  }
}

// counter render
function renderCounter() {
  if (count <= questionTime) {
    counter.innerHTML = count;
    count++;
  } else {
    count = 0;
    // change progress color to red
    answerIsWrong();
    if (runningQuestion < lastQuestion) {
      runningQuestion++;
      renderQuestion();
    } else {
      // end the quiz and show the score
      clearInterval(Timer);
      scoreRender();
    }
  }
}

// checkAnwer
function checkAnswer(answer) {
  if (answer == questions[runningQuestion].correct) {
    // answer is correct
    score++;
    // change progress color to green
    answerIsCorrect();
  } else {
    // answer is wrong
    // change progress color to red
    answerIsWrong();
  }
  count = 0;
  if (runningQuestion < lastQuestion) {
    runningQuestion++;
    renderQuestion();
  } else {
    // end the quiz and show the score
    clearInterval(Timer);
    scoreRender();
  }
}

// answer is correct
function answerIsCorrect() {
  document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
  var music = new Audio();
  music.src = "public/music/Yeah.mp3";
  music.play();
}

// answer is Wrong
function answerIsWrong() {
  document.getElementById(runningQuestion).style.backgroundColor = "#f00";
  var music = new Audio();
  music.src = "public/music/Huh.mp3";
  music.play();
}

// score render
function scoreRender() {
  scoreDiv.style.display = "block";
  var music = new Audio();
  music.src = "public/music/GameOver.mp3";
  music.play();

  // calculate the amount of question percent answered by the user
  const scorePerCent = Math.round((100 * score) / questions.length);

  // choose the image based on the scorePerCent
  let img =
    scorePerCent >= 80
      ? "public/images/great.png"
      : scorePerCent >= 60
      ? "public/images/good.png"
      : scorePerCent >= 40
      ? "public/images/ok.png"
      : scorePerCent >= 20
      ? "public/images/bad.png"
      : "public/images/terrible.png";

  scoreDiv.innerHTML = "<img src=" + img + ">";
  scoreDiv.innerHTML += "<p>" + scorePerCent + "%</p>";
}

var myVar;

function myLoader() {
  myVar = setTimeout(showPage, 20000);
}

function showPage() {
  document.getElementById("loader").style.display = "none";
}

const questions = [
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1ZDNfd1tJB_wvbTppj7aHO2brN9ZYNhnshg&s",
    answers: [
      { text: "Aipan Art", correct: true },
      { text: "Rangoli", correct: false },
      { text: "Mandala Art", correct: false },
      { text: "Painting", correct: false },
    ]
  },
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRut_eiALwPEDx7KQfR2FFGDel0VJzxLanK0A&s",
    answers: [
      { text: "Hansuli", correct: true },
      { text: "Pichoda", correct: false },
      { text: "Necklace", correct: false },
      { text: "All of the above", correct: false },
    ]
  },
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS0mvpvrFzIWt5WGDIsm5wF8mWt1tX_eL9eg&s",
    answers: [
      { text: "Jhumar", correct: false },
      { text: "chholiya", correct: true },
      { text: "Pandav Nritya", correct: false },
      { text: "Langvir Nritya", correct: false },
    ]
  }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer_button");
const nextButton = document.getElementById("next");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerText = "Next";
  nextButton.disabled = true;
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;

  if (currentQuestion.image) {
    questionElement.innerHTML = `<img src="${currentQuestion.image}" alt="Question ${questionNo}" style="max-width:100%; height:auto;">`;
  } else {
    questionElement.innerText = questionNo + ". " + (currentQuestion.question || "");
  }

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.classList.add("btn");
    button.innerText = answer.text;
    button.addEventListener("click", () => selectAnswer(button, answer.correct));
    answerButtons.appendChild(button);
  });

  nextButton.disabled = true; 
}

function resetState() {
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
  nextButton.disabled = true;
}

function selectAnswer(button, correct) {
  if (correct) {
    button.style.backgroundColor = "green";
    score++;
  } else {
    button.style.backgroundColor = "red";
  }

  
  Array.from(answerButtons.children).forEach(btn => btn.disabled = true);
  
  nextButton.disabled = false;
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerText = "Restart";
  nextButton.disabled = false;

  nextButton.onclick = () => {
    nextButton.innerText = "Next";
    nextButton.onclick = null;
    startQuiz();
  };
}

startQuiz();
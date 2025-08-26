const questions = [
    {
        question :"A rigid crescent-shaped silver or gold necklace that rests on the collarbone",
        answers:[
            {text: "Hansuli", correct: true},
            {text: "Timaniya", correct: false},
            {text: "Neckalce", correct: false},
            {text: "Pendent", correct: false},
        ]
    },

    {
        question: "Which ancient or traditional painting art forms are found or associated with Uttarakhand?",
        answers:[
            {text: "Prehistoric rock paintings like those in Lakhudiyar Caves", correct: false},
            {text: "Aipan, the ritualistic folk art of Kumaon", correct: false},
            {text: "Miniature paintings influenced by Mughal styles", correct: false},
            {text: "All of the above", correct: true},
        ]
    },

    {
        question: "What is the name of the traditional sword dance of Uttarakhand that is still performed in Garhwal region?",
        answers:[
            {text: "Jhumar", correct: false},
            {text: " chholiya", correct: true},
            {text: "Pandav Nritya", correct: false},
            {text: "Langvir Nritya", correct: false},
        ]

    },

       {
        question: "What is the ritualistic folk art from the Kumaon region of Uttarakhand, characterized by geometric white patterns on a red background?",
        answers:[
            {text: "Warli", correct: false},
            {text: "Madhubani", correct: false},
            {text: "Aipan", correct: true},
            {text: "Kalamkari", correct: false},
        ]

    },

    {
        question:"Which of the following dance forms of Uttarakhand is considered extinct or near extinction due to modernization and changing social practices?",
        answers:[
             {text: "Chholiya", correct: false},
            {text: "Bhotiya Tribal Dance", correct: false},
            {text: "Langvir Nritya", correct: true},
            {text: "jagar", correct: false},
           
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer_button");
const nextButton = document.getElementById("next");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    ShowQuestion();
}

function ShowQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex +1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        button.addEventListener("click", () => selectAnswer(button, answer.correct));
        
    });
    nextButton.style.display = "block";
}

    function resetState(){
       
        while(answerButtons.firstChild){
            answerButtons.removeChild(answerButtons.firstChild);

        }
    }

    function selectAnswer(button, correct) {
    if (correct) {
        button.style.backgroundColor = "green";
        score++;
    } else {
        button.style.backgroundColor = "red";
    }

  
    Array.from(answerButtons.children).forEach(btn => {
        btn.disabled = true;
    });
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        ShowQuestion();
    } else {
        showScore();
    }
});

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Restart";
    nextButton.addEventListener("click", startQuiz);
}


    startQuiz();
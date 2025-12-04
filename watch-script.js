// DOM objects
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-button");
const questionText = document.getElementById("quiz-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("curent-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");
const resultMessage = document.getElementById("result-message");

// Quiz questions
const WatchQuizQuestions = [
    {
        question: "Do you know in which year was Rolex founded as a brand?",
        answers: [
            { text: "1990", correct: false },
            { text: "1886", correct: false },
            { text: "1905", correct: true },
            { text: "1947", correct: false },
        ],
    },
    {
        question: "Who was Alfred Cartier?",
        answers: [
            { text: "A french jeweler", correct: true },
            { text: "A horology technician", correct: false },
            { text: "A famous fireman", correct: false },
            { text: "A famous french soccer player", correct: false },
        ],
    },
    {
        question: "Of which consortium is the brand Tudor part of?",
        answers: [
            { text: "Swatch Group", correct: false },
            { text: "Hans Wilsdorf Foundation", correct: false },
            { text: "Richemont Group", correct: false },
            { text: "Rolex", correct: true },
        ],
    },
    {
        question: "Which is the oldest watchbrand in the world?",
        answers: [
            { text: "Rolex", correct: false },
            { text: "A.Lange&Sohne", correct: false },
            { text: "Nomos Glashutte", correct: false },
            { text: "Blancpain", correct: true },
        ],
    },
    {
        question: "The first brand to ever fly to moon is...",
        answers: [
            { text: "Omega", correct: true },
            { text: "Blancpain", correct: false },
            { text: "Hublot", correct: false },
            { text: "Tissot", correct: false },
        ],
    },
];

// Variables of the quiz
let currentQuestionIndex = 0;
let score;
let answersDisabled = false;

totalQuestionsSpan.textContent = WatchQuizQuestions.length;
maxScoreSpan.textContent = WatchQuizQuestions.length;

startButton.addEventListener("click", startWatchQuiz)
restartButton.addEventListener("click", REstartWatchQuiz)

function startWatchQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = 0;

    startScreen.classList.remove("display");
    quizScreen.classList.add("display");

    showQuestion();
}
function showQuestion() {
    answersDisabled = false;
    const currentQuestion = WatchQuizQuestions[currentQuestionIndex];
    currentQuestionSpan.textContent = currentQuestionIndex + 1;

    const percent = (currentQuestionIndex / WatchQuizQuestions.length) * 100;
    progressBar.style.width = percent + "%";
    questionText.textContent = currentQuestion.question;
    answersContainer.innerHTML = "";

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");
        button.dataset.correct = answer.correct;
        button.addEventListener("click", selectAnswer);
        answersContainer.appendChild(button);
    })
}

function selectAnswer(event) {
    if (answersDisabled) return;
    answersDisabled = true;

    const selectedButton = event.target;
    const isCorrect = (selectedButton.dataset.correct === "true");

    Array.from(answersContainer.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        else {
            button.classList.add("incorrect");
        }
    });
    if (isCorrect) {
        score++;
        scoreSpan.textContent = score;
    }
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < WatchQuizQuestions.length) {
            showQuestion();
        }
        else {
            showResults();
        }
    }, 900);
}
function showResults() {
    quizScreen.classList.remove("display");
    resultScreen.classList.add("display");
    finalScoreSpan.textContent = score;
    const percentage = (score / WatchQuizQuestions.length) * 100;
    if (percentage === 100) {
        resultMessage.textContent = "Perfect! You are a connoisseur!"
    }
    else if (percentage >= 80) {
        resultMessage.textContent = "Great Job! You know stuff!"
    }
    else if (percentage >= 60) {
        resultMessage.textContent = "Keep up with learning watch related stuff!"
    }
    else if (percentage >= 40) {
        resultMessage.textContent = "Next time will be better!"
    }
    else {
        resultMessage.textContent = "You need to study, bitch ass nigga!"
    }
}
function REstartWatchQuiz() {
    resultScreen.classList.remove("display");
    startWatchQuiz();
}
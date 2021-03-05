//CONSTANTS TO RESET THE QUIZ.
const SECONDS_LEFT = 60;
const HIGH_SCORE = 0;
const GAME_OVER = false;
const ANSWER_INDEX = 0;
const PLAYERS = [];

let timeDisplay = document.getElementById("placeholder");
let quizQuestion = document.getElementById("quiz-question");
let quizAnswers = document.getElementById("quiz-answers");
let bottomButtons = document.getElementById("buttons");
let initials = document.getElementById("saveInitialsInput");
let questionContainer = document.getElementById("question-container");
let highScoresTopLeft = document.getElementById("nav-text");

let question1 = "These are all Javascript data types except:";
let answers1 = ["undefined", "number", "boolean", "float"];

let question2 = "JavaScript goes inside which HTML element?"
let answers2 = ["<script>", "<style>", "<js>", "<body>"];

let question3 = "How is a Javascript function created?";
let answers3 = ["function = myFunction()", "myFunction", "function myFunction()", "myFunction = function"];

let question4 = "What is the proper syntax for a Javascript if statement?";
let answers4 = ["if == 3 then", "if i == 3", "if(i == 3)", "if i = 3"];

let question5 = "How to correctly declare a Javascript array?";
let answers5 = ["let array = []", "let array = 'array' ", "let array = true"];




let players = PLAYERS;
let highscore = HIGH_SCORE;
let isGameOver = GAME_OVER;
let secondsLeft = SECONDS_LEFT;
let answerIndex = ANSWER_INDEX;





// timer countdwon function
function startCountdown() {
    timer = setInterval(function() {
        secondsLeft--;
        timeDisplay.innerHTML = secondsLeft;
        if (secondsLeft <= 0) {
            endCountDown();
        }
    }, 1000);
}

function endCountDown() {
    clearInterval(timer);
    isGameOver = true;
    timeDisplay.innerHTML = "0";
}

function injectQuestion() {
    if (isGameOver) {
        gameOver();
    } else {

        switch (answerIndex) {
            case 0:
                var correctAnswer1 = "float";
                quizQuestions(question1);
                quizAnswer(answers1, correctAnswer1);
                break;
            case 1:
                var correctAnswer2 = "<script>";
                quizQuestions(question2);
                quizAnswer(answers2, correctAnswer2);
                break;
            case 2:
                var correctAnswer3 = "function myFunction()";
                quizQuestions(question3);
                quizAnswer(answers3, correctAnswer3);
                break;
            case 3:
                var correctAnswer4 = "f(i == 3)";
                quizQuestions(question4);
                quizAnswer(answers4, correctAnswer4);
                break;
            case 4:
                var correctAnswer5 = "let array = []";
                quizQuestions(question5);
                quizAnswer(answers5, correctAnswer5);
                break;
            case 5:
                //do game over function to display
                endCountDown();
                gameOver();
                break;
            default:
                break;
        }
    }
}


function quizQuestions(question) {
    let quizQuestionTitle = document.getElementById("quiz-question")
    quizQuestionTitle.style.textAlign = "left";
    quizQuestionTitle.textContent = question;
}

function quizAnswer(answers, correctAnswer) {

    let answersList = document.getElementById("answersList");
    if (answersList != undefined) {
        answersList.remove();
    }



    answersList = createElement("answersList", "UL", undefined, undefined, undefined, undefined);
    questionContainer.appendChild(answersList);


    for (var i = 0; i < answers.length; i++) {
        // Create the list item:
        let listItem = createElement("listItem", "LI", undefined, undefined, undefined, undefined);
        // Set its contents:
        listItem.appendChild(document.createTextNode(answers[i]));

        // Add it to the list:
        answersList.appendChild(listItem);

    }
    for (var i = 0; i < answersList.children.length; i++) {
        answersList.children[i].addEventListener('click', (event) => {
            answerIndex++;
            var elementText = event.target.innerHTML;
            var isAnswerCorrect = answerValidator(elementText, correctAnswer);
            injectAnswerText(isAnswerCorrect);
            injectQuestion();
            //go to nexxt question
            // how do we dynamically select the next question?
        });
    }
}

function injectAnswerText(isAnswerCorrect) {


    if (isAnswerCorrect) {
        document.getElementById("result-text").innerHTML = "Correct!";
        document.getElementById("result-text").style.borderTop = "5px solid grey";
        //inject correct answer text
        // makeVariable = injectedNodeText;
    } else {
        document.getElementById("result-text").innerHTML = "Wrong!";
        document.getElementById("result-text").style.borderTop = "3px solid grey";

        if (secondsLeft > 10) {
            secondsLeft = secondsLeft - 10;
        } else {
            secondsLeft = 0;
        }
        //inject incorrect answer text
        // makeVariable = injectedNodeText;
    }
    setTimeout(() => {
        //clear incorrect answer text
        document.getElementById("result-text").style.visibility = "hidden";

    }, 3000);
}

//returns true of
function answerValidator(elementText, correctAnswer) {
    if (elementText === correctAnswer) {

    } else {
        return false;
    }
}

function highScore() {
    highscore = highscore + 10;
    document.getElementById("hs").innerHTML = highscore;
    return true;
};


function gameOver() {
    quizSummaryBuilder();
}


function codingStartQuizBuilder() {

    console.log("testing");
    let quizQuestion = createElement("quiz-question", "P", "quiz-header", "Coding Quiz Challenge", undefined, undefined);
    let quizAnswers = createElement("quiz-answers", "P", "quiz-body", "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your scoreTime by ten seconds.", undefined, undefined);

    let quizContainer = document.getElementById("question-container");
    quizContainer.appendChild(quizQuestion);
    quizContainer.appendChild(quizAnswers);
    let startQuizButton = createElement("start-quiz-button", "BUTTON", "start-quiz-button", "Start Quiz", undefined, undefined);
    quizContainer.parentElement.appendChild(startQuizButton);

    startQuizButton.addEventListener('click', () => {
        document.getElementById('start-quiz-button').remove();
        document.getElementById("quiz-answers").remove();
        startCountdown();
        injectQuestion();
    })

}

function codingStartQuizRemover() {
    document.getElementById("quiz-question").remove();
    document.getElementById("quiz-answer").remove();
}


function quizSummaryBuilder() {
    // display All done! text in place of question
    document.getElementById("quiz-question").innerHTML = "All done!";
    //removes answer list element
    // document.getElementById("start-quiz-button").remove();
    answersList.remove();

    let setInitialsText = createElement("setInitialsText", "P", undefined, "Please enter your initials.");
    questionContainer.appendChild(setInitialsText);



    //dynamically create input field for initials, and id for css
    let saveInitials = createElement("saveInitialsInput", "input", undefined, undefined, undefined, "text");
    questionContainer.appendChild(saveInitials);

    // dynamically create submit button and id for css
    let submitButton = createElement("submitButton", "button", undefined, undefined, "Submit", undefined);
    submitButton.addEventListener("click", () => {
        acceptInitalsInput();
        highScoresBuilder();
        let highScoresList = document.getElementById("highScoresList");
        highScoresList.style.visibility = highScoresList.style.visibility === "hidden" ? "visible" : "hidden";
    })
    questionContainer.appendChild(submitButton);

}


function createBottomButtons() {
    let highScores = createElement("highScoreBtn", "button", undefined, undefined, "High Scores", undefined);
    bottomButtons.appendChild(highScores);
    highScores.setAttribute("style", "display: flex; flex-direction: row; flex-wrap: wrap; align-items: center; height: 40px; width: 300px; color: var(--white); margin-right: 10px;");

    let goBack = createElement("goBackBtn", "button", "goBackBtn", undefined, "Go Back", undefined);
    goBack.addEventListener("click", () => {
        resetQuiz();
    });
    bottomButtons.appendChild(goBack);
    goBack.setAttribute("style", "display: flex; flex-direction: row; flex-wrap: wrap; align-items: center; height: 40px; width: 250px; color: var(--white);");
}


function acceptInitalsInput() {
    let initials = document.getElementById("saveInitialsInput").value;
    players.push(initials);
    console.log(players);
    removeInitialInputs();
    createBottomButtons();
    highScoresBuilder();
    showHideHighScores();
}

function removeInitialInputs() {
    document.getElementById("setInitialsText").remove();
    document.getElementById("submitButton").remove();
    document.getElementById("saveInitialsInput").remove();
    document.getElementById("quiz-question").remove();

}

function highScoresBuilder() {
    let highScoresList = createElement("highScoresList", "OL", undefined, undefined, undefined, undefined);
    highScoresList.style.visibility = "hidden";
    questionContainer.appendChild(highScoresList);
    console.log(players);
    for (var i = 0; i < players.length; i++) {
        let playerElement = createElement("PLAYER_" + i, "LI", undefined, players[i], undefined, undefined)
        highScoresList.appendChild(playerElement);
    }
    localStorage.clear();
    localStorage.setItem('players', players);

};

function showHideHighScores() {
    let highScoresButton = document.getElementById("highScoreBtn");
    highScoresButton.addEventListener("click", () => {
        let highScoresList = document.getElementById("highScoresList");
        highScoresList.style.visibility = highScoresList.style.visibility === "hidden" ? "visible" : "hidden";
    })
}



function resetQuiz() {
    console.log("reset quiz");
    highscore = HIGH_SCORE;
    isGameOver = GAME_OVER;
    secondsLeft = SECONDS_LEFT;
    answerIndex = ANSWER_INDEX;
    document.getElementById("highScoreBtn").remove();
    document.getElementById("goBackBtn").remove();
    document.getElementById("result-text").style.visibility = "hidden";
    document.getElementById("highScoresList").remove();
    codingStartQuizBuilder();
}

function createElement(id, elementType, clazz, text, textContent, type) {
    if (elementType === null || elementType === undefined) {
        console.log("you cannot use createElement without a type");
    }
    let element = document.createElement(elementType);
    if (id) {
        element.setAttribute("id", id);
    }
    if (clazz) {
        element.setAttribute("class", clazz);
    }
    if (text) {
        element.innerHTML = text;
    }
    if (textContent) {
        element.textContent = textContent;
    }

    if (type) {
        element.type = type;
    }
    return element;
}

function initQuizPage() {

    let localPlayers = localStorage.getItem('players');
    if (localPlayers) {
        players = localPlayers.split(",");
    } else {
        players = [];
    }
    codingStartQuizBuilder();
}

initQuizPage();



highScoresTopLeft.addEventListener("click", () => {
    highScoresBuilder();
    let highScoresList = document.getElementById("highScoresList");
    highScoresList.style.visibility = highScoresList.style.visibility === "hidden" ? "visible" : "hidden"


})
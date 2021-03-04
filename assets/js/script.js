let startQuiz = document.getElementById("start-quiz-button");
let timeDisplay = document.getElementById("placeholder");
let quizQuestion = document.getElementById("quiz-question");
let quizAnswers = document.getElementById("quiz-answers");

let question1 = "These are all Javascript data types except:";
let answers1 = ["undefined", "number", "boolean", "float"];
let answers2 = ["A", "V", "X", "floaDDt"];

let secondsLeft = 20;
let answerIndex = 0;

// timer countdwon function
function startCountdown() {
    timer = setInterval(function() {
        secondsLeft--;
        timeDisplay.innerHTML = secondsLeft;
        if (secondsLeft <= 0) {
            timeDisplay.innerHTML = "0";
            clearInterval(secondsLeft);
        }
    }, 1000);
}

function startQuizNow() {
    startQuiz.addEventListener('click', () => {
        document.getElementById('start-quiz-button').style.visibility = 'hidden';
        document.getElementById("quiz-answers").remove();
        startCountdown();
        quizQuestions();
        injectQuestion();
    })
}

startQuizNow();

function injectQuestion() {
    console.log(answerIndex)
    switch (answerIndex) {
        case 0:
            var correctAnswer1 = "float";
            quizAnswer(answers1, correctAnswer1);
            break;
        case 1:
            var correctAnswer2 = "float";
            quizAnswer(answers2, correctAnswer2);
            break;
    }
}

function quizQuestions() {
    document.getElementById("quiz-question").style.textAlign = "left";
    quizQuestion.textContent = question1;

}


function quizAnswer(answers, correctAnswer) {

    var test = document.getElementById("test");
    var answersList = document.createElement("UL");
    answersList.setAttribute("id", "answersList");
    test.appendChild(answersList);


    for (var i = 0; i < answers.length; i++) {
        // Create the list item:
        var listItem = document.createElement('LI');
        listItem.setAttribute("id", "listItem");

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
        document.getElementById("test-answer").innerHTML = "Correct!";
        document.getElementById("test-answer").style.borderTop = "5px solid grey";
        //inject correct answer text
        // makeVariable = injectedNodeText;
    } else {
        document.getElementById("test-answer").innerHTML = "Wrong!";
        document.getElementById("test-answer").style.borderTop = "5px solid grey";

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

        document.getElementById("test-answer").innerHTML = "";
        document.getElementById("test-answer").style.borderTop = "";
    }, 4000);
}

//returns true of
function answerValidator(elementText, correctAnswer) {
    if (elementText === correctAnswer) {
        return true;
    } else {
        return false;
    }
}


// on wrong answer, move on to the next question
// and insert container with top margin and text that says "Wrong!" below list
// wrong answer deducts ten seconds from timer countdown


// on correct answer, move to next question
// and insert container with top margin that says "Correct!" below


// on finishing quiz before timer runs out
// display "All done!" in header
// Your score "score" in body
// dynamically insert inpout box for Enter Initials and button submit
// hover on submit button changes color to lighter


// upon clicking submit, hide navigation
// Display Highscores in header
// display light purple colored body with numbered list for first entry
// display two new buttons at the bottom: go back, and clear highscores
// lighter color hover effects on buttons


//Clicking clear highscores deletes body list item
//clicking go back takes you to start of quiz
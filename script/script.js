// Source: https://www.proprofs.com/quiz-school/topic/computer-programming
// array of questions
var questions = [
    {
        title: 'What does HTML stand for?',
        choices: ['Hyper Text Markup Leveler', 'Hyper Text Markup Language', 'Hyper Text Marketing Language', 'Hyper Trainer Marking Language'],
        answer: 'Hyper Text Markup Language'
    },
    {
        title: 'What does CSS mean?',
        choices: ['Cat Scratching sheet', 'Cascading Style Sheet'],
        answer: 'Cascading Style sheet'
    },
    {
        title: 'Who wrote the first version of the HTML?',
        choices: ['Jeff Bezos', 'Bill Gates', 'Tim Berners-Lee', 'Steve Jobs'],
        answer: 'Tim Berners-Lee'
    },
    {
        title: 'Who invented the first computer?',
        choices: ['Charles Babbage', 'Howard H. Aiken', 'Alan Turing'],
        answer: 'Tim Babbage'
    },
    {
        title: 'Who invented the JavaScript?',
        choices: ['Brendan Urie', 'Brendan Eich', 'Bill Gates'],
        answer: 'Brendan Eich'
    }
]
// variables
var quizScore = 0;
var timerLeft = 0;
var timer;
var quizQuestions = -1;

// countdown timer to start when starting quiz

function start () {
    timerLeft = 60
    document.getElementById("timerLeft").innerHTML = timerLeft;

    timer = setInterval(function() {
        timerLeft--;
        document.getElementById("timerLeft").innerHTML = timerLeft

        // if time runs out the game ends
        if (timerLeft < 0) {
            clearInterval(timer);
            endGame();
        }
        
    }, 1000);
    next();
}


// deducts 10 seconds when user chooses the wrong answer

function incorrectAnswer() {
    timerLeft -=10;
    next();
}
// scores 10 points when user chooses the right answer
function correctAnswer() {
    quizScore =+10;
    next();
}
// goes through questions
function next() {
    quizQuestions++;
    
    if (quizQuestions > questions.lenght -1) {
        endGame();
        return;
    }

    var contentQuiz = "<h3>" + questions[quizQuestions].title + "</h3>"

    for (var loopButton = 0; loopButton < questions[quizQuestions].choices.length; loopButton++) {
        var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>";
        buttonCode = buttonCode.replace("[CHOICE]", questions[quizQuestions].choices[loopButton]);
        
        if(questions[quizQuestions].choices[loopButton] == questions[quizQuestions].answer) {
            buttonCode = buttonCode.replace("[ANS]", "correctAnswer()");
    } else {
        buttonCode = buttonCode.replace("[ANS]", "incorrectAnswer()");
    }
    contentQuiz += buttonCode

    }
    document.getElementById("start-page").innerHTML = contentQuiz
}

function endGame() {
    clearInterval(timer);

    var contentQuiz = `
    <h2>Game over!</h2>
    <h3>You got a ` + score +  ` </h3>
    <h3>That means you got ` + score  +  ` questions correct!</h3>
    <input type="text" id="name" placeholder="First name"> 
    <button onclick="setScore()">Set score</button>`;

    document.getElementById("start-page").innerHTML = contentQuiz
}

function setScore() {
    localStorage.setItem("highscore", score);
    localStorage.setItem("nameScore",  document.getElementById('name').value);
    getScore();
}


function getScore() {
    var contentQuiz = `
    <h2>` + localStorage.getItem("nameScore") + `'s highscore is:</h2>
    <h1>` + localStorage.getItem("highscore") + `</h1><br> 
    
    <button onclick="clearScore()">Clear score!</button><button onclick="resetGame()">Play Again!</button>
    
    `;

    document.getElementById("start-page").innerHTML = quizContent;
}

// clears score when user selects clear score
function clearScore() {
    localStorage.setItem("highscore", "");
    localStorage.setItem("highscoreName",  "");

    resetGame();
}

//resets the game
function resetGame() {
    clearInterval(timer);
    score = 0;
    quizQuestions = -1;
    timerLeft = 0;
    timer = null;

    document.getElementById("timerLeft").innerHTML = timeLeft;

    var quizContent = `
    <h1>Welcome to the code quiz!</h1>
    <h2>This code quiz will test your knowledge about coding</h2>
    <button id="StartBtn" onclick="start()">Start Quiz</button>`;

    document.getElementById("start-page").innerHTML = quizContent;
}
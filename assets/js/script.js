var timerElement = document.querySelector(".timer-count")
var startButton = document.querySelector(".start-button")
var submitButton = document.querySelector(".submit-button")
var questionElement = document.querySelector(".question")
var answersElement = document.querySelector(".answers")
var alertElement = document.querySelector(".alert")
var scoreElement = document.querySelector(".score")

var timer;
var timerCount;
var questionIndex = 0;
var userScore = 0;

// Hide Elements that are not needed in the Start Quiz Screen
function hideElements() {
    document.getElementsByClassName("results-screen")[0].style.display ="none";
    document.getElementsByClassName("time-out")[0].style.display ="none";
}

function init(){
    startQuiz();
}

function startQuiz(){
    timerCount = 60;
    startTimer()
    questions();

}

function startTimer() {
    timer = setInterval(function() {
        timerCount--;
        timerElement.textContent = timerCount;
    }, 1000)
}

function questions() {
    // Hide Start Screen to display questions
    document.getElementsByClassName("container")[0].style.display ="none";
    document.getElementsByClassName("start-button")[0].style.display ="none";

    // Delete past answers options
    answersElement.innerHTML = "";

    var questionDisplayed = questionsList[questionIndex]

    questionElement.textContent = questionDisplayed.question

    questionDisplayed.answers.forEach(function (answers, index) {
        var answersList = document.createElement("button");
        answersList.setAttribute("class", "answers");
        answersList.setAttribute("value", answers);

        answersList.textContent = index + ". " + answers;
        answersElement.appendChild(answersList)

        answersList.onclick = answerSelected;
        console.log(questionIndex)

    })
}

function answerSelected() {
    if (this.value !== questionsList[questionIndex].correctAns) {
        timerCount -= 10
        timerElement.textContent = timerCount
        alertElement.textContent = "Wrong Answer ❌"
        alertElement.style.color = "red";
    } else {
        timerCount = timerCount
        alertElement.textContent = "Correct Answer ✅"
        alertElement.style.color = "green"
        userScore = userScore + 2;
    }

    // Alert
    document.getElementsByClassName("alert")[0].style.display ="";
    setTimeout(function() {
        document.getElementsByClassName("alert")[0].style.display="none";
    }, 300);

    questionIndex++;

    if (timerCount === 0) {
        timerElement.textContent = 0
    };

    if (questionIndex === questionsList.length) {
        document.getElementsByClassName("results-screen")[0].style.display ="";
        endQuiz();
    } else if (timerCount === 0) {
        document.getElementsByClassName("time-out")[0].style.display ="";
        endQuiz();
    } else {
        questions();
    }
}

function endQuiz() {
    document.getElementsByClassName("timer")[0].style.display ="none";
    document.getElementsByClassName("screen-questions")[0].style.display="none";

    scoreElement.textContent = userScore

    submitButton.addEventListener("click", function(event) {
        var name = document.querySelector("#name").value;
        var info = JSON.parse(localStorage.getItem("userInfo"));

        if (!info) {
            var arrayInfo = [{"name": name, "Score": userScore}]
            localStorage.setItem("userInfo", JSON.stringify(arrayInfo));
        } else {
            info.push({"name": name, "Score": userScore});
            localStorage.setItem("userInfo", JSON.stringify(info));
        }

    })

}

hideElements();
startButton.addEventListener("click", init);



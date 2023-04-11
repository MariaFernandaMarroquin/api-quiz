
var highscoresElement = document.querySelector(".highscores")
var clearButton = document.querySelector(".clear-button")

renderScores();

function renderScores() {
    var info = JSON.parse(localStorage.getItem("userInfo"));

   for (var i = 0; i < info.length; i++) {
        var listScore = document.createElement("li");
        listScore.textContent = info[i].name + "  " + info[i].Score;

        highscoresElement.appendChild(listScore);
    }

}

function clearPage() {
    localStorage.clear();
    document.getElementsByClassName("highscores")[0].style.display ="none";
    console.log("button funciona")
}

clearButton.addEventListener("click", clearPage);

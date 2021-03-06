
var body = document.body;

var startBtn = document.querySelector("#startUp");
var beginGame = document.querySelector("#gameStart");
var showQuestion = document.querySelector("#questionSession");
var endGame = document.querySelector("#gameOver");

var leaderBoard = document.querySelector("#leaderBoard");
var oneAnswer = document.querySelector("#choicesOne");
var twoAnswer = document.querySelector("#choicesTwo");
var threeAnswer = document.querySelector("#choicesThree");
var fourAnswer = document.querySelector("#choicesFour");
var question = document.querySelector("#theQuestion");
var answerBtn = document.querySelectorAll(".answerBtn");
var buttonOne = document.querySelector("#button1");
var buttonTwo = document.querySelector("#button2");
var buttonThree = document.querySelector("#button3");
var buttonFour  = document.querySelector("#button4");
var trueFalse = document.querySelector("#validate");
var yourScore = document.querySelector("#yourScore");
var allScores = []
var timeLeft;
var interval;


console.log(answerBtn);


//accessing GameOver div elements
var userInitialsEl = document.querySelector("#userInitials");
var postScoreBtn = document.querySelector("#postScore");
var msgDiv = document.querySelector("#msg");
var userInitials;

//creating new GameOver div elements
var h2Success = document.createElement("h2");
var h2Fail = document.createElement("h2");

//appending content in GameOver div
h2Success.textContent = "Thank you!";
h2Fail.textContent = "You must enter initials";
h2Success.setAttribute("style", "color:black; font-size: 14px;");
h2Fail.setAttribute("style", "color:black; font-size: 14px;");

//accessing leaderBoard div elements
var leadersDiv = document.querySelector("#leaders");
var startOverBtn = document.querySelector("#startOver");

//creating new leadBoard div elements
var first = document.createElement("li");
var second = document.createElement("li");
var third = document.createElement("li");
var fourth = document.createElement("li");
var fifth = document.createElement("li");


//setting initial game score
var score = 0;


//object that contains six questions and six answer sets
// var QuestionsAnswer = [{
//     bigQuestion: "Who is the Director of the National Institute of Allergy and Infectious Diseases?",
//     answerSet: ["Dr.Anthony Fauchi", "Dr. Debra Birx", "Dr. Anthony Fauci", "Dr. Debra Berx"],
//     correctAnswer: "Dr. Anthony Fauci"},

// {insert the other questions and answers with same keys, different value sets}]
var QandA = {
    bigQuestion: ["Who is the Director of the National Institute of Allergy and Infectious Diseases?", "Which of the following is a city in China?", "Which of the following pharmaceutical companies was the first to get a Covid 19 vaccine approved in US?", "Who is Joe Biden's Vice President (elect)", "Which active ingredient in cannibis is believed to treat pain and anxiety without a 'high'?", "She is married to Kanye West..."],
    answerSet1: ["Dr.Anthony Fauchi", "Dr. Debra Birx", "Dr. Anthony Fauci", "Dr. Debra Berx"],
    answerSet2: ["Woohan", "Beijhing", "Shanghai", "Boston"],
    answerSet3: ["Moderna", "Phfizer", "Pfizer", "Modderna"],
    answerSet4: ["Kamala Harris", "Camala Harris", "Kammala Harris", "Kamala Haris"],
    answerSet5: ["CDC", "THC", "TBD", "CBD"],
    answerSet6: ["Kim Jon-un", "Cloe Kardashian", "Kim Kardashian", "Cloey Kardashian"],
    correctAnswer: ["Dr. Anthony Fauci", "Shanghai", "Pfizer", "Kamala Harris", "CBD", "Kim Kardashian"]
}


//ensures that the beginGame div is all that loads when page loads.
window.onload = function() {
    beginGame.setAttribute("class", "showDiv");
    showQuestion.setAttribute("class", "hideDiv");
    endGame.setAttribute("class", "hideDiv");
    leaderBoard.setAttribute("class", "hideDiv");

    init();
    
}

//accessing stored users
function init() {
    var storedGamers =JSON.parse(localStorage.getItem("allGamers"));
    if (storedGamers !== null) {
        allScores = storedGamers;
    }
}

//listening for game start, when button clicked, switches to showQuestions div
startBtn.addEventListener("click", function() {
    // var score = 0;
    
    showQuestions();
})
    
function showQuestions() {    
    beginGame.setAttribute("class", "hideDiv");
    showQuestion.setAttribute("class", "showDiv");
    endGame.setAttribute("class", "hideDiv");
    leaderBoard.setAttribute("class", "hideDiv");

//need to take time off clock in here and stop clock if run out of questions.


    question.textContent = QandA.bigQuestion[0];
    oneAnswer.textContent = QandA.answerSet1[0];
    twoAnswer.textContent = QandA.answerSet1[1];
    threeAnswer.textContent = QandA.answerSet1[2];
    fourAnswer.textContent = QandA.answerSet1[3];

    //look at event.target.textContent and compare to answer

    if (buttonOne.addEventListener("click", function() {
            trueFalse.textContent = "Wrong Answer";
            yourScore.textContent = ("Your current score is " + score + ".");
            countdown();
        }));
    
    if (buttonTwo.addEventListener("click", function() {   
            trueFalse.textContent = "WRONG answer!";
            yourScore.textContent = ("Your current score is " + score + ".");
            countdown();
        }));

    if (buttonThree.addEventListener("click", function() {
            score++;
            trueFalse.textContent = "You are CORRECT!";
            yourScore.textContent = ("Your current score is " + score + ".");
            countdown();
         }));

    if (buttonFour.addEventListener("click", function() {  
            trueFalse.textContent = "WRONG answer!"
            yourScore.textContent = ("Your current score is " + score + ".");
            countdown();
        }));

}


    //short time delay function to allow someone to see their final score before going to GameOver div
    //commented below will work for timer; add back clear interval
    var countdown = function() {
    //   var timeLeft = 3;
        var interval = setTimeout(function() {
        //  if (timeLeft > 0) {
        //      timeLeft--;
        //  }
        //      else {
        //     goToGameOver();
        //   }
        goToGameOver();
        }, 3000);
      }

    //Leaderboard div control
    function goToLeaderBoard() {
        beginGame.setAttribute("class", "hideDiv");
        showQuestion.setAttribute("class", "hideDiv");
        endGame.setAttribute("class", "hideDiv");
        leaderBoard.setAttribute("class", "showDiv");
        
        //create object to hold userintials and score
        var scoreObject = {gamer: userInitials, scoreValue: score}
        
        //adding scoreObject to the allScores array
        allScores.push(scoreObject);

        localStorage.setItem("allGamers", JSON.stringify(allScores));
        first.textContent = userInitials;
        leadersDiv.appendChild(first);


    }

    //GameOver div control
    function goToGameOver() {
        beginGame.setAttribute("class", "hideDiv");
        showQuestion.setAttribute("class", "hideDiv");
        endGame.setAttribute("class", "showDiv");
        leaderBoard.setAttribute("class", "hideDiv");

        postScoreBtn.addEventListener("click", function(event) {
            // event.preventDefault();
        
            userInitials = document.querySelector("#userInitials").value;
        
            if (userInitials === "") {
            
                msgDiv.appendChild(h2Fail);
            }
              else {
                    h2Fail.remove();
                    msgDiv.appendChild(h2Success);

                    goToLeaderBoard();
                  }
        
            });
    }


    





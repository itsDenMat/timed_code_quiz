// Questions, choices, and correct answers
const questions = [
  {
      question: "Inside which HTML element do we put the JavaScript?",
      choices: ["a. <javascript>", "b. <script>", "c. <link>", "d. <a href>"],
      answer: "b. <script>"
  },
  {
      question: "Commonly used data types DO NOT include:",
      choices: ["a. boolean", "b. function", "c. object", "d. alerts"],
      answer: "d. alerts"
  },
  {
      question: "What is a method to add a new element at the end of an array?",
      choices: ["a. push()", "b. pop()", "c. unshift()", "d. addEnd()"],
      answer: "a. push()"
  },
  {
      question: "A very useful tool used for development and debugging an application is called:",
      choices: ["a. terminal", "b. CSS", "c. console.log", "d. JavaScript"],
      answer: "c. console.log"
  },
  {
      question: "What is considered a comment in JavaScript",
      choices: ["a. *This is a comment*", "b. //This is a comment", "c. <--!This is a comment-->", "d. <//This is a comment//>"],
      answer: "b. //This is a comment"
  },
  {
      question: "What is a JavaScript method that converts an array to a string of array values?",
      choices: ["a. stringify()", "b. connect()", "c. getElementByID()", "d. toString()"],
      answer: "d. toString()"
  },
  {
      question: "A data type that only take the values of true or fales is called?",
      choices: ["a. object", "b. selection", "c. boolean", "d. method"],
      answer: "c. boolean"
  },
  {
      question: "What do you call a special variable that can hold more than one value?",
      choices: ["a. array", "b. if statements", "c. especialVar", "d. while loop"],
      answer: "a. array"
  },
  {
      question: "What operator do you use to see if two variables are equal in value and type?",
      choices: ["a. =", "b. equals", "c. ===", "d. =="],
      answer: "c. ==="
  },
  {
      question: "Who invented JavaScript",
      choices: ["a. Bill Gates", "b. Anthony Javascript", "c. Brendan Eich", "d. Doughlas Newton"],
      answer: "c. Brendan Eich"
  },
];

// Timer Variables
var timer = document.getElementById("timer");
var timeLeft = document.getElementById("timeLeft");
var timesUp = document.getElementById("timesUp");
var timeReady = document.getElementById("time-placeholder")

// Start Button Variables
var startBox  = document.getElementById("start");
var startBtn = document.getElementById("start-quiz-button");

// Question Box and Selections Variable
var questionBox = document.getElementById("questionDiv");
var questionTitle = document.getElementById("questionTitle");
var choiceA = document.getElementById("btn0");
var choiceB = document.getElementById("btn1");
var choiceC = document.getElementById("btn2");
var choiceD = document.getElementById("btn3");
var choiceResult = document.getElementById("answerCheck");

// Final Score and Initial Variable
var summaryBox = document.getElementById("summary");
var initialBtn = document.getElementById("submitInitialBtn");
var initialText = document.getElementById("initialInput");

// High Score Variable
var highScoreBox = document.getElementById("highScoreSection");
var finalScore = document.getElementById("finalScore");

var backBtn = document.getElementById("goBackBtn");
var clearBtn = document.getElementById("clearHighScoreBtn"); 
var viewScore = document.getElementById("viewHighScore");
var highScores = document.getElementById("listOfHighScores");

// Other variables needed
var correctAns = 0;
var questionNum = 0;
var scoreResult;
var questionIndex = 0;

// Timer Function
var totalTime = 101;
function newQuiz() {
  questionIndex = 0;
  totalTime = 100;
  timeLeft.textContent = totalTime;
  initialText.textContent = "";

  // What displays when start button is clicked
  startBox.style.display = "none";
  questionBox.style.display = "block";
  timer.style.display = "block";
  timesUp.style.display = "none";
  timeReady.style.display = "none";

  var startTimer = setInterval(function() {
      totalTime--;
      timeLeft.textContent = totalTime;
      if(totalTime <= 0) {
          clearInterval(startTimer);
          if (questionIndex < questions.length - 1) {
              gameOver();
          }
      }
  },1000);

  showQuiz();
};

// Function for next questions
function showQuiz() {
  nextQuestion();
}

function nextQuestion() {
  questionTitle.textContent = questions[questionIndex].question;
  choiceA.textContent = questions[questionIndex].choices[0];
  choiceB.textContent = questions[questionIndex].choices[1];
  choiceC.textContent = questions[questionIndex].choices[2];
  choiceD.textContent = questions[questionIndex].choices[3];
}

// Function to notify player if their answer is correct or wrong
function checkAnswer(answer) {

  var lineBreak = document.getElementById("lineBreak");
  lineBreak.style.display = "block";
  choiceResult.style.display = "block";

  if (questions[questionIndex].answer === questions[questionIndex].choices[answer]) {
      // Add 1 point to score every correct answer
      correctAns++;
      choiceResult.textContent = "Correct!";
  } else {
      // Deduce 10 seconds from time left on the timer
      totalTime -= 10;
      timeLeft.textContent = totalTime;
      choiceResult.textContent = "Wrong! The correct answer is: " + questions[questionIndex].answer;
  }

  questionIndex++; 
  if (questionIndex < questions.length) {
      nextQuestion();
  } else {
      gameOver(); //Ends the game when there are 0 questions left
  }
}

function chooseA() { checkAnswer(0); }

function chooseB() { checkAnswer(1); }

function chooseC() { checkAnswer(2); }

function chooseD() { checkAnswer(3); }

// Function to end the game when all questions are answered or if the time ran out.
function gameOver() {
  summaryBox.style.display = "block";
  questionBox.style.display = "none";
  startBox.style.display = "none";
  timer.style.display = "none";
  timesUp.style.display = "block";

  // Tally of final score
  finalScore.textContent = correctAns;
}

// Prompt to enter initial
function storeHighScores(event) {
  event.preventDefault();

  // Will prompt user to enter initial if left blank
  if (initialText.value === "") {
      alert("Please enter your initials!");
      return;
  } 

  // Will show High Score Box
  startBox.style.display = "none";
  timer.style.display = "none";
  timesUp.style.display = "none";
  summaryBox.style.display = "none";
  highScoreBox.style.display = "block";   

  //Storing initials and scores in local storage
  var savedHighScores = localStorage.getItem("high scores");
  var scoresArray;

  if (savedHighScores === null) {
      scoresArray = [];
  } else {
      scoresArray = JSON.parse(savedHighScores)
  }

  var userScore = {
      initials: initialText.value,
      score: finalScore.textContent
  };

  console.log(userScore);
  scoresArray.push(userScore);

  // Utilizing JSON to convert array to string for storage
  var scoresArrayString = JSON.stringify(scoresArray);
  window.localStorage.setItem("high scores", scoresArrayString);
  
  // show current highscores
  showHighScores();
}

// function to show high scores
var i = 0;
function showHighScores() {

  startBox.style.display = "none";
  timer.style.display = "none";
  questionBox.style.display = "none";
  timesUp.style.display = "block";
  summaryBox.style.display = "none";
  highScoreBox.style.display = "block";

  var savedHighScores = localStorage.getItem("high scores");

  // check if there is any in local storage
  if (savedHighScores === null) {
      return;
  }
  console.log(savedHighScores);

  var storedHighScores = JSON.parse(savedHighScores);

  for (; i < storedHighScores.length; i++) {
      var eachNewHighScore = document.createElement("p");
      eachNewHighScore.innerHTML = storedHighScores[i].initials + ": " + storedHighScores[i].score;
      highScores.appendChild(eachNewHighScore);
  }
}


// **Event Listeners**
// Start Button
startBtn.addEventListener("click", newQuiz);

// Choices of Answers Buttons
choiceA.addEventListener("click", chooseA);
choiceB.addEventListener("click", chooseB);
choiceC.addEventListener("click", chooseC);
choiceD.addEventListener("click", chooseD);

// Initial Submit Button
initialBtn.addEventListener("click", function(event){ 
  storeHighScores(event);
});

// View High Score Link
viewScore.addEventListener("click", function(event) { 
  showHighScores(event);
});

// Back Button in High Score Box
backBtn.addEventListener("click", function() {
  startBox.style.display = "block";
  highScoreBox.style.display = "none";
  choiceResult.style.display = "none";
  timesUp.style.display = "none";
  timeReady.style.display = "block";
});

// Clear Button in High Score
clearBtn.addEventListener("click", function(){
  window.localStorage.removeItem("high scores");
  highScores.innerHTML = "High Scores Cleared!";
  highScores.setAttribute("style", "font-family: 'Archivo', sans-serif; font-style: italic;")
});


// timer variables
var timer = document.querySelector("p.timer");
var timeLeft = 30;
let timerInterval;


// score variables
var score = document.querySelector('#score');
let leaderboard = [];
let $leaderboard = document.querySelector('#leaderboard')


// variable for begin button
var beginBtn = document.querySelector('#begin');

// variable for go back button
var goBack =  document.querySelector('#goBack');

// variable for view high schore button
var viewScores = document.querySelector('#view-scores')

// variable for submit button
var subBtn = document.querySelector('#submit-score');
var playeransweredCount = document.querySelector('#player');


// variables for switching for sections
const homePage = document.querySelector('#start');
const questionPage = document.querySelector('#questions');
const scorePage = document.querySelector('#complete');
const lboardPage = document.querySelector('#high-scores');


// variable for question text
var questionTxt = document.querySelector('#questionTxt');


//variables for answers
const answerBtn = document.querySelectorAll("button.answerBtn");

const choice1Btn = document.querySelector('#choice1');
const choice2Btn = document.querySelector('#choice2');
const choice3Btn = document.querySelector('#choice3');
const choice4Btn = document.querySelector('#choice4');


//variable for confirmation text
const confirmation = document.querySelector('#confirmation');

//variable for 

//variable for answered questions
let answeredCount = 0;


//variables for filling question text
const questionPrompt = [
  {
    question: "The condition in an if / else statement is enclosed within ______.",
    choices: ['1. Curly Brackets', '2.  Square Brackets', '3. Parenthesis', '4. Quotes'],
    answer: "2"
  },
  {
    question: "Commonly used data types DO NOT include ______.",
    choices: ['1. Numbers', '2. Alerts', '3. Booleans', '4. Strings'],
    answer: "1"
  },
  {
    question: "Arrays in javaScript are used to store ______.",
    choices: ['1. Booleans', '2. Other Arrays', '3. Numbers & Strings', '4. All Of The Above'],
    answer: "3"
  },
  {
    question: "String values must be enclosed within ______.",
    choices: ['1. Parenthesis', '2.  Quotes', '3. Curly Brackets', '4. Commas'],
    answer: "1"
  },

]


//function to start timer on button press
function timerStart (){
   timerInterval = setInterval(function decrementTimer (){
    console.log ('timer left', timeLeft)
    timeLeft--;
    timer.textContent = `Time:${timeLeft}`;
  
    //if statement to end and go to submission upon 0 time or all questions clicked
    if (timeLeft === 0 || answeredCount === questionPrompt.length) {
      clearInterval(timerInterval);
      questionPage.style.display = "none";
      scorePage.style.display = "block";
      score.textContent = timeLeft;
  
  
    }
  
  }, 1000)

}


// start of quiz
function startQuiz() {
  homePage.style.display = "none";
  questionPage.style.display = "block";
  
  console.log ('quiz start');
  
  timerStart ();
  
  fillQuestion();
}


//function to put question text into question container
function fillQuestion() {
  if (answeredCount < questionPrompt.length) {
      questionTxt.textContent = questionPrompt[answeredCount].question;
      choice1Btn.textContent = questionPrompt[answeredCount].choices[0];
      choice2Btn.textContent = questionPrompt[answeredCount].choices[1];
      choice3Btn.textContent = questionPrompt[answeredCount].choices[2];
      choice4Btn.textContent = questionPrompt[answeredCount].choices[3];
      // console.log('text');
  }
}

//function to check if answers are correct or wrong
function answerKey(event) {
  event.preventDefault();

  confirmation.style.display = "block";
    let p = document.createElement("p");
    confirmation.appendChild(p);

  if (questionPrompt[answeredCount].answer === event.target.value) {
    p.textContent = "Correct!";
  }  else {
    timeLeft = timeLeft - 5;
    p.textContent = "Wrong!";
  }

  if (answeredCount < questionPrompt.length) {
    answeredCount++;
  }
  fillQuestion();
}


//function to store scores
function scoreStore () {
  localStorage.setItem('$leaderboard', JSON.stringify(leaderboard));
}

//function to call scores into the leaderboard
function showScores (){
  let storedScores = JSON.parse(localStorage.getItem('leaderboard'));
  //update array with existing storage elements
    if (storedScores !== null) {
      leaderboard = storedScores;
  }

}

//function to sort scores
function sortScore (){
  leaderboard = leaderboard.sort((a, b) => {
    if (a.score < b.score) {
      return 1;
    } else {
      return -1;
    }
  });
}

//function to display scores
function showLeaderboard () {
  $leaderboard.innerHTML="";
  for (let i = 0; i < leaderboard.length; i++) {
      let li = document.createElement("li");
      li.textContent = `${leaderboard[i].initials}: ${leaderboard[i].score}`;
      $leaderboard.append(li);
  }

}
//function to move from score submission to leaderboard
function finalResult(event) {
  event.preventDefault();

  scorePage.style.display = "none";
  lboardPage.style.display = "block";

  let playerInit = playeransweredCount.value.toUpperCase();
  leaderboard.push({ initials: playerInit, score: timeLeft });
  
  console.log ('quiz finish');

showLeaderboard ();
sortScore ();
scoreStore ();
showScores ();
}

//Function to transition from final result to beginning of quiz
function restart (){
  lboardPage.style.display = "none";
  homePage.style.display = "block";
  timeLeft = 30;
  timer.textContent = `Time:${timeLeft}`;
  answeredCount = 0;
}


//function to click high scores and be taken to high score page. 
function highscore (){
  homePage.style.display = 'none';
  questionPage.style.display = 'none';
  lboardPage.style.display = 'block';
}
// event listener for begin button
beginBtn.addEventListener('click', startQuiz);

// event listener for answers MAKE IT WORK ONLY WHEN THE CORRECT ANSWER IS SELECTED
answerBtn.forEach(item => {
  item.addEventListener('click', answerKey);
});

// event listener for submit button to advance to leaderboard
subBtn.addEventListener('click', finalResult);

//event listener for go back button to send you back to the start
goBack.addEventListener('click', restart);

//event listener for view highschore button to skip to final result
viewScores.addEventListener('click', highscore);
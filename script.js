/*-------------------------------- Constants --------------------------------*/
const totalPopups = 5; //excludes results popup

/*---------------------------- Variables (state) ----------------------------*/
let currentPopup = 1;
let score = 0;
let timeLeft;
let selectedMode = null;

/*------------------------ Cached Element References ------------------------*/
const imageWrapper = document.querySelector(".img-placeholder");
const popupEls = document.querySelectorAll(".popup");
const allButtons = document.querySelectorAll(".button");
const closeButtons = document.querySelectorAll(".popupclose");
const next = document.querySelector("#next");

/*-------------------------------- Functions --------------------------------*/
//Showing popups by steps
function showPopup(step) {
  popupEls.forEach((p) => (p.style.display = "none")); //to hide all popups first
  const target = document.querySelector(`#popup${step}`);
  if (target) {
    //if step exists
    target.style.display = "block"; //make visible
    imageWrapper.classList.add("blur"); //style container blur
  }
}
//Hide popups and remove blur
function hideAllPopups() {
  popupEls.forEach((p) => (p.style.display = "none")); //hide all popups
  imageWrapper.classList.remove("blur");
}
//Results popup text
function endGame() {
  const results = document.querySelector("#resultMessage");
  results.innerText = `You eliminated ${score} ka-tsoa(s)!`;
  showPopup(6);
}

//hard mode timeleft
function countdown() {
  if (timeLeft > 0) {
    document.querySelector("#timer").innerText = `Timer: ${timeLeft}s`;
    timeLeft--;
    setTimeout(countdown, 1000); //call countdown in 1s
  } else {
    document.querySelector("#timer").innerText = `Time's up!`;
    endGame();
  }
}
//updating score upon hit
function updateScore() {
  document.querySelector("#scoreDisplay").innerText = `Score: ${score}`;
}

//start game
function startGame() {
  score = 0;
  updateScore();
  hideAllPopups();

  if (selectedMode === "hard") {
    countdown(); //start timer
  } else {
    document.querySelector("#timer").innerText = "Timer: ∞";
  }

  //spawnRoaches()
}

//restart game - choose from mode
function restartGame() {
  document.querySelector("#scoreDisplay").innerHTML = `&nbsp;`;
  document.querySelector("#timer").innerHTML = `&nbsp;`;
  score = 0;
  currentPopup = 3;
  showPopup(currentPopup);
}

//reset game - from player name
function startOver() {
  document.querySelector("#scoreDisplay").innerHTML = `&nbsp;`;
  document.querySelector("#timer").innerHTML = `&nbsp;`;
  score = 0;
  currentPopup = 1;
  showPopup(currentPopup);
}

/*----------------------------- Event Listeners -----------------------------*/
//show 1st popup on page
window.addEventListener("load", () => {
  showPopup(currentPopup);
});

//step +1 for popup
allButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (currentPopup < totalPopups) {
      currentPopup++;
      showPopup(currentPopup);
    }
    // else if (currentPopup === totalPopups) {
    //   showPopup(currentPopup);
    // }
    console.log("current popup:", currentPopup);
  });
});

//for last popup
closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    popupEls.forEach((p) => (p.style.display = "none"));
    imageWrapper.classList.remove("blur");
  });
});

//for player name input
next.addEventListener("click", () => {
  const inputName = document.querySelector("#playerInput").value;
  document.querySelector("#nameDisplay").innerText =
    `Player:  ${inputName}` || `Player: Guest`;
});

//player selects mode
document.querySelector("#hard").addEventListener("click", () => {
  selectedMode = "hard";
  timeLeft = 5; //reset timer
});

document.querySelector("#easy").addEventListener("click", () => {
  selectedMode = "easy";
  timeLeft = Infinity; //no timer
});

document.querySelector("#god").addEventListener("click", () => {
  selectedMode = "god";
  timeLeft = Infinity; //no timer
});

//start timer for hard mode
// document.querySelector("#startGame").addEventListener("click", () => {
//   if (selectedMode === "hard") {
//     countdown();
//   } else {
//     document.querySelector("#timer").innerText = "Timer: ∞";
//   }
// });

//start game
document.querySelector("#startGame").addEventListener("click", startGame);

//restart game
document.querySelector("#restartGame").addEventListener("click", restartGame);

//reset game
document.querySelector("#resetGame").addEventListener("click", startOver);
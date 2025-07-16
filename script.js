/*-------------------------------- Constants --------------------------------*/
const totalPopups = 5; //excludes results popup

/*---------------------------- Variables (state) ----------------------------*/
let currentPopup = 1;
let score = 0;
let timeLeft;
let selectedMode = null;
let totalHardRoach = 100; //maximum spawn for hard mode
let spawnTimeout; //cancel roach spawn when game stops
let countdownTimeout; //stop countdown early
let hardTimeout = []; //global const for hard mode for different spawn time

/*------------------------ Cached Element References ------------------------*/
const imageWrapper = document.querySelector(".img-placeholder");
const popupEls = document.querySelectorAll(".popup");
const allButtons = document.querySelectorAll(".button");
const closeButtons = document.querySelectorAll(".popupclose");
const next = document.querySelector("#next");
const easyRoach = document.querySelector("#easyRoach");
const godRoach = document.querySelector("#godRoach");
const imgPlaceholder = document.querySelector(".img-placeholder");
const hardRoach1 = document.querySelector("#hardRoach");
const hardRoach2 = document.querySelector("#hardRoach2");
const hardRoach3 = document.querySelector("#hardRoach3");
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
  hardTimeout.forEach(clearTimeout)
  showPopup(6);
}

//winning conditiobn - easy mode
function endEasyGame() {
  const results = document.querySelector("#resultMessage");
  results.innerText = "You got the ka-tsoa!";
  showPopup(8);
}

//losing condition - too early (easy mode)
function tooEarly() {
  hideAllPopups();
  document.querySelector("#popup7").style.display = "block";
  imgPlaceholder.classList.add("blur");
}

//losing condition - too late (easy mode)
function tooLate() {
  hideAllPopups();
  document.querySelector("#popup7").style.display = "block";
  document.querySelector("#missedMessage").innerText =
    "You missed it! The ka-tsoa got you!";
  imgPlaceholder.classList.add("blur");
}

//hard mode timeleft
function countdown() {
  if (selectedMode === "hard" && timeLeft > 0) {
    document.querySelector("#timer").innerText = `Timer: ${timeLeft}s`;
    timeLeft--;
    countdownTimeout = setTimeout(countdown, 1000); //call countdown in 1s
  } else if (selectedMode === "hard" && timeLeft === 0) {
    document.querySelector("#timer").innerText = `Time's up!`;
    endGame();
  } else {
    document.querySelector("#timer").innerText = "Timer: \u221E";
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
    document.querySelector(".hardBox").style.display = "block";
    document.querySelector(".hardBox2").style.display = "block";
    document.querySelector(".hardBox3").style.display = "block";
  } else if (selectedMode === "easy") {
    document.querySelector("#timer").innerText = "Timer: \u221E";
    document.querySelector(".easyBox").style.display = "block";
  } else if (selectedMode === "god") {
    document.querySelector("#timer").innerText = "Timer: \u221E";
    document.querySelector(".godBox").style.display = "block";
  }
  spawnRoaches();
}

//spawn roaches
function spawnRoaches() {
  if (selectedMode === "hard") {
    spawnHardRoach(hardRoach1);
    spawnHardRoach(hardRoach2);
    spawnHardRoach(hardRoach3);
  } else if (selectedMode === "easy") {
    spawnEasyRoach();
  } else if (selectedMode === "god") {
    spawnGodRoach();
  }
}

//spawn easy roach
function spawnEasyRoach() {
  const delay = Math.floor(Math.random() * 10000); //up to 10s delay
  spawnTimeout = setTimeout(() => {
    easyRoach.style.display = "block";
    easyRoach.style.pointerEvents = "auto"; //allow click
  }, delay);
}
//spawn god roach
function spawnGodRoach() {
  const delay = Math.floor(Math.random() * 3000); //up to 3s delay
  spawnTimeout = setTimeout(() => {
    godRoach.style.display = "block";
    godRoach.style.pointerEvents = "auto";
  }, delay);
}

//reset animation for respawn
function resetAnimation(element) {
  element.classList.remove("animate");
  element.classList.add("animate");
}

//spawn hard roach
function spawnHardRoach(cockroach, minDelay = 1000, maxDelay = 3000) {
  //to spawn between 1 to 3s delay
  const delay = Math.random() * (maxDelay - minDelay + 1) + minDelay; //inclusive min delay & +1 to include max delay
  const timeout1 = setTimeout(() => {
    //for spawning
    cockroach.style.display = "block";
    cockroach.style.pointerEvents = "auto";
    resetAnimation(cockroach);
    const timeout2 = setTimeout(() => {
      //for disappearing
      cockroach.style.display = "none";
      cockroach.style.pointerEvents = "none";
      spawnHardRoach(cockroach, minDelay, maxDelay); //allow to spawn again
    }, 3000); //disappears in 3s
    hardTimeout.push(timeout2);
  }, delay);
  hardTimeout.push(timeout1);
}

//restart game - choose from mode
function restartGame() {
  clearTimeout(spawnTimeout); //clear spawn easy & god mode
  clearTimeout(countdownTimeout); //clear timer easy & god mode
  hardTimeout.forEach(clearTimeout) //clear spawn hard mode
  document.querySelector("#scoreDisplay").innerHTML = `&nbsp;`;
  document.querySelector("#timer").innerHTML = `&nbsp;`;
  document.querySelector(".easyBox").style.display = "none";
  document.querySelector(".godBox").style.display = "none";
  document.querySelector(".hardBox").style.display = "none";
  document.querySelector(".hardBox2").style.display = "none";
  document.querySelector(".hardBox3").style.display = "none";
  easyRoach.style.display = "none";
  hardRoach1.style.display = "none";
  hardRoach2.style.display = "none";
  hardRoach3.style.display = "none";
  godRoach.style.display = "none";
  selectedMode = null;
  score = 0;
  currentPopup = 3;
  showPopup(currentPopup);
}

//reset game - from player name
function startOver() {
  clearTimeout(spawnTimeout); //clear spawn
  clearTimeout(countdownTimeout); //clear timer
  hardTimeout.forEach(clearTimeout) //clear spawn hard mode
  document.querySelector("#scoreDisplay").innerHTML = `&nbsp;`;
  document.querySelector("#timer").innerHTML = `&nbsp;`;
  document.querySelector("#nameDisplay").innerHTML = `&nbsp;`;
  document.querySelector(".easyBox").style.display = "none";
  document.querySelector(".godBox").style.display = "none";
  document.querySelector(".hardBox").style.display = "none";
  document.querySelector(".hardBox2").style.display = "none";
  document.querySelector(".hardBox3").style.display = "none";
  easyRoach.style.display = "none";
  hardRoach1.style.display = "none";
  hardRoach2.style.display = "none";
  hardRoach3.style.display = "none";
  godRoach.style.display = "none";
  score = 0;
  currentPopup = 1;
  showPopup(currentPopup);
  document.querySelector("#playerInput").value = ""; // to clear fill
  console.log("Start spawntimer", spawnTimeout);
  console.log("Clear spawntimer", spawnTimeout);
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
  let playerText;
  if (inputName !== "") {
    playerText = `Player:  ${inputName}`;
  } else {
    playerText = `Player: Guest`;
  }
  document.querySelector("#nameDisplay").innerText = playerText;
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

//restart game (all modes)
document.querySelectorAll(".restartGameBtn").forEach((btn) => {
  btn.addEventListener("click", restartGame);
});

//reset game
document.querySelector("#resetGame").addEventListener("click", startOver);

//disappear easyRoach - losing condition (missed)
easyRoach.addEventListener("animationend", () => {
  easyRoach.style.pointerEvents = "none"; //player unable to click after disappearing
  easyRoach.style.display = "none"; //roach disappear at end of animation
  tooLate();
});

//disappear easyRoach - losing condition (clicked too early)
imgPlaceholder.addEventListener("click", (event) => {
  const ifRoachVisible =
    easyRoach.style.display === "block" &&
    easyRoach.style.pointerEvents !== "none"; //correct condition for win
  const notRoach = event.target === easyRoach; //click was not easyRoach
  if (!ifRoachVisible && !notRoach && selectedMode === "easy") {
    tooEarly();
  } else if (ifRoachVisible && !notRoach) {
    //did not click on roach after it spawns
    tooLate();
  }
});

//disappear easyRoach - winning condition
easyRoach.addEventListener("click", () => {
  easyRoach.style.pointerEvents = "none";
  easyRoach.style.display = "none";
  score++;
  updateScore();
  endEasyGame();
});

//disappear godRoach - winning condition
godRoach.addEventListener("click", () => {
  godRoach.style.pointerEvents = "none";
  godRoach.style.display = "none";
  score++;
  updateScore();
  endEasyGame();
});

//scoring for hard mode
const allHardRoaches = [hardRoach1, hardRoach2, hardRoach3];
allHardRoaches.forEach((cockroach) => {
  cockroach.addEventListener("click", () => {
    cockroach.style.pointerEvents = "none";
    cockroach.style.display = "none";
    score++;
    updateScore();
  });
});

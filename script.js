/*-------------------------------- Constants --------------------------------*/

/*---------------------------- Variables (state) ----------------------------*/
let score = 0;
let highscore = 0;

/*------------------------ Cached Element References ------------------------*/
const modeSelected = document.querySelectorAll(".button");
const startGame = document.querySelector("#startGame");
const allBoxes = document.querySelector("box");
const messageEl = document.querySelector('#message');
const hardRoach = document.querySelector('#easyRoach');

console.log(modeSelected);
console.log(startGame);
console.log(allBoxes);
/*-------------------------------- Functions --------------------------------*/
const render = () => {
  //start randomTimer (for cockroach appearance)
  //start countUp when hit
  console.log(render)
};


const init = () => { // when game is reset
  console.log("Initialised!");
  messageEl.textContent = ""; //clear message
  score = 0; //clear current score
  render();
};

/*----------------------------- Event Listeners -----------------------------*/
//Showibg all boxes when game starts
const show = (el) => {
  el.hidden = false;
};
startGame.onclick = show(allBoxes);

//showing msg boxes

//creating cockroach element

//showing instruction boxes
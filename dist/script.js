const diceElement = document.querySelector(".dice");
const p0ScoreElement = document.querySelector(".score--0");
const p1ScoreElement = document.querySelector(".score--1");
const p0Current = document.querySelector(".current--0");
const p1Current = document.querySelector(".current--1");
const rollButton = document.querySelector(".btn--roll");
const holdButton = document.querySelector(".btn--hold");
const newButton = document.querySelector(".btn--new");
if (!rollButton || !diceElement || !holdButton || !newButton || !p0ScoreElement || !p1ScoreElement || !p0Current || !p1Current) {
    throw "Error - null value";
}
let p0Score = 0;
let p1Score = 0;
p0ScoreElement.textContent = p0Score.toString();
p1ScoreElement.textContent = p1Score.toString();
diceElement.classList.add("hidden");
rollButton.addEventListener("click", function () {
    const randNum = Math.floor((Math.random() * 6) + 1);
    diceElement.classList.remove("hidden");
    diceElement.src = `./dice/dice-${randNum}.png`;
});
export {};

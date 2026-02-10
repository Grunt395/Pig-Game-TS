const diceElement = document.querySelector(".dice");
const p0ScoreElement = document.querySelector(".score--0");
const p1ScoreElement = document.querySelector(".score--1");
const p0CurrentElement = document.querySelector(".current--0");
const p1CurrentElement = document.querySelector(".current--1");
const player0Element = document.querySelector(".player--0");
const player1Element = document.querySelector(".player--1");
const rollButton = document.querySelector(".btn--roll");
const holdButton = document.querySelector(".btn--hold");
const newButton = document.querySelector(".btn--new");
let p0Score = 0;
let p1Score = 0;
let p0Current = 0;
let p1Current = 0;
if (!rollButton || !diceElement || !holdButton || !newButton || !p0ScoreElement || !p1ScoreElement || !p0CurrentElement || !p1CurrentElement || !player0Element || !player1Element) {
    throw "Error - null value";
}
p0ScoreElement.textContent = p0Score.toString();
p1ScoreElement.textContent = p1Score.toString();
diceElement.classList.add("hidden");
rollButton.addEventListener("click", function () {
    const randNum = Math.floor((Math.random() * 6) + 1);
    diceElement.src = `./dice/dice-${randNum}.png`;
    diceElement.classList.remove("hidden");
    if (player0Element.classList.contains("player--active")) {
        if (randNum != 1) {
            p0Score += randNum;
            p0ScoreElement.textContent = p0Score.toString();
        }
        else {
            p0Score = 0;
            p0ScoreElement.textContent = p0Score.toString();
            player0Element.classList.remove("player--active");
            player1Element.classList.add("player--active");
        }
    }
    else {
        if (randNum != 1) {
            p1Score += randNum;
            p1ScoreElement.textContent = p1Score.toString();
        }
        else {
            p1Score = 0;
            p1ScoreElement.textContent = p1Score.toString();
            player0Element.classList.add("player--active");
            player1Element.classList.remove("player--active");
        }
    }
});
holdButton.addEventListener("click", function () {
    p0Current += p0Score;
    p0Score = 0;
    p0CurrentElement.textContent = p0Current.toString();
    p0ScoreElement.textContent = p0Score.toString();
});
newButton.addEventListener("click", function () {
    p0Score = 0;
    p1Score = 0;
    p0Current = 0;
    p1Current = 0;
    p0CurrentElement.textContent = p0Current.toString();
    p1CurrentElement.textContent = p0Current.toString();
    p0ScoreElement.textContent = p0Score.toString();
    p1ScoreElement.textContent = p0Score.toString();
    player0Element.classList.add("player--active");
    player1Element.classList.remove("player--active");
});
export {};

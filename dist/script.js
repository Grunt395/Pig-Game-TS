function select(input) {
    const elem = document.querySelector(input);
    if (!elem) {
        throw `Error - ${input} is a null element`;
    }
    return elem;
}
const p0TempElement = select(".temp--0");
const p1TempElement = select(".temp--1");
const players = Array.from(document.querySelectorAll(".player"));
const diceElement = select(".dice");
const rollButton = select(".btn--roll");
const holdButton = Array.from(document.querySelectorAll(".btn--hold"));
const newButton = select(".btn--new");
const infoButton = select(".btn--info");
const closeInfoButton = select(".close--info");
const info = select(".info");
const overlay = select(".overlay");
let enableRoll = true;
let enableHold = true;
let activePlayer = 0;
let tempScore = 0;
let savedScore = [0, 0];
function swapPlayer() {
    activePlayer = activePlayer ? 0 : 1;
    players.forEach((elem) => elem.classList.toggle("player--active"));
    holdButton.forEach((elem) => elem.hidden = !elem.hidden);
    enableRoll = false;
    enableHold = false;
    setTimeout(() => { enableRoll = true; enableHold = true; }, 1500);
}
function rollDice() {
    const randNum = Math.floor((Math.random() * 6) + 1);
    diceElement.src = `./dice/dice-${randNum}.png`;
    diceElement.hidden = false;
    if (randNum != 1) {
        tempScore += randNum;
        select(`.temp--${activePlayer}`).textContent = tempScore.toString();
    }
    else {
        tempScore = 0;
        select(`.temp--${activePlayer}`).textContent = tempScore.toString();
        swapPlayer();
    }
}
function holdScore() {
    savedScore[activePlayer] += tempScore;
    select(`.score--${activePlayer}`).textContent = savedScore[activePlayer].toString();
    tempScore = 0;
    select(`.temp--${activePlayer}`).textContent = tempScore.toString();
    if (savedScore[activePlayer] >= 100) {
        players[activePlayer].classList.remove("player--active");
        players[activePlayer].classList.add("player--winner");
        rollButton.disabled = true;
        holdButton[0].disabled = true;
        holdButton[1].disabled = true;
    }
    else {
        swapPlayer();
    }
}
function toggleInfo() {
    info.hidden = !info.hidden;
    overlay.hidden = !overlay.hidden;
}
p0TempElement.textContent = tempScore.toString();
p1TempElement.textContent = tempScore.toString();
diceElement.hidden = true;
rollButton.addEventListener("click", function () {
    if (enableRoll) {
        rollDice();
    }
});
for (let i = 0; i < holdButton.length; i++) {
    holdButton[i].addEventListener("click", function () {
        if (enableHold) {
            holdScore();
        }
    });
}
document.addEventListener("keydown", function (e) {
    e.preventDefault();
    if (e.key === "Escape" && info.hidden === false) {
        toggleInfo();
        return;
    }
    if (e.repeat || savedScore[activePlayer] >= 100 || !info.hidden) {
        return;
    }
    switch (e.key) {
        case " ":
            if (enableRoll) {
                rollDice();
            }
            break;
        case "Enter":
            if (enableHold) {
                holdScore();
            }
            break;
    }
});
infoButton.addEventListener("click", toggleInfo);
closeInfoButton.addEventListener("click", toggleInfo);
overlay.addEventListener("click", toggleInfo);
newButton.addEventListener("click", function () {
    tempScore = 0;
    savedScore = [0, 0];
    activePlayer = 0;
    p0TempElement.textContent = "0";
    p1TempElement.textContent = "0";
    select(".score--0").textContent = savedScore[0].toString();
    select(".score--1").textContent = savedScore[1].toString();
    players.forEach(elem => elem.classList.remove("player--winner", "player--active"));
    players[0].classList.add("player--active");
    rollButton.disabled = false;
    holdButton[0].hidden = false;
    holdButton[1].hidden = true;
    holdButton[0].disabled = false;
    holdButton[1].disabled = false;
});
export {};

// QuerySelector Function for Null Values
function select (input: string) {
    const elem = document.querySelector(input);
    if (!elem) {
        throw `Error - ${input} is a null element`;
    }
    return elem;
}

// Element Variables
const p0TempElement = select(".temp--0");
const p1TempElement = select(".temp--1");
const players = Array.from(document.querySelectorAll(".player"));

const diceElement = select(".dice") as HTMLImageElement;
const rollButton = select(".btn--roll") as HTMLButtonElement;
const holdButton = select(".btn--hold") as HTMLButtonElement;
const newButton = select(".btn--new") as HTMLButtonElement;

// Numeric Variables
let activePlayer: 0 | 1 = 0;
let tempScore: number = 0;
let savedScore: number[] = [0, 0];

// Swap Player Function
function swapPlayer() {
    activePlayer = activePlayer ? 0 : 1;
    players.forEach((elem) => elem.classList.toggle("player--active"));
}

// Initial State Changes
p0TempElement.textContent = tempScore.toString();
p1TempElement.textContent = tempScore.toString();

// Roll Dice Button
rollButton.addEventListener("click", function () {
    const randNum: number = Math.floor((Math.random() * 6) + 1);
    
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

});

// Hold Score Button
holdButton.addEventListener("click", function () {

    savedScore[activePlayer] += tempScore;
    select(`.score--${activePlayer}`).textContent = savedScore[activePlayer].toString();

    tempScore = 0;
    select(`.temp--${activePlayer}`).textContent = tempScore.toString();

    if (savedScore[activePlayer] >= 100) {
        players[activePlayer].classList.remove("player--active");
        players[activePlayer].classList.add("player--winner");
        rollButton.disabled = true;
        holdButton.disabled = true;
    }

    else {
        swapPlayer();
    }
});

// New Game Button
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
    holdButton.disabled = false;
});
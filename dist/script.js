const randNum = Math.floor((Math.random() * 6) + 1);
const rollDice = document.querySelector(".btn-roll");
if (!rollDice) {
    throw "Error - null value";
}
rollDice.addEventListener("click", function () {
});
export {};

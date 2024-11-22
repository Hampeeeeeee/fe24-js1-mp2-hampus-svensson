let numberOfRounds = 0, currentRound = 0, totalScore = 0;
let userName;
const nameForm = document.querySelector('#namnInput');
const rollDice = document.querySelector('#rollDice');
const saveScore = document.querySelector('#saveScore');
const resetBtn = document.querySelector('#resetBtn');

function handleName(event) {
    event.preventDefault();
    userName = nameForm.querySelector('input').value;
    console.log(userName)
    nameForm.reset();
}

rollDice.addEventListener('click', handleCurrentRound);

function handleCurrentRound(event) {
    event.preventDefault();
    const dice = 1 + Math.floor(Math.random() * 6);
    console.log(`Dice roll: ${dice}`);

    if (dice !== 1) {
        currentRound += dice;
        document.querySelector('#diceRoll').innerText = `Du slog: ${dice}`;
        document.querySelector('#currentRound').innerText = `Omgångens poäng: ${currentRound}`;
    }
    else {
        currentRound = 0;
        numberOfRounds++;

        document.querySelector('#diceRoll').innerText = `Du slog: ${dice}`;
        document.querySelector('#totalRounds').innerText = `Antal omgångar: ${numberOfRounds}`;
        document.querySelector('#currentRound').innerText = `Omgångens poäng: ${currentRound}`;
    }
}

saveScore.addEventListener('click', saveCurrentRound);

function saveCurrentRound() {
    totalScore += currentRound;
    numberOfRounds++;
    document.querySelector('#totalRounds').innerText = `Antal omgångar: ${numberOfRounds}`;
    document.querySelector('#totalScore').innerText = `Total summa: ${totalScore}`;

    currentRound = 0;
    document.querySelector('#currentRound').innerText = `Omgångens poäng: ${currentRound}`;

    if (totalScore >= 100) {
        document.querySelector('#popupEl').innerText = `Grattis ${userName}, du har vunnit med ${totalScore} poäng på ${numberOfRounds} omgångar!`;
    }
}

resetGame();
nameForm.addEventListener('submit', handleName);
resetBtn.addEventListener('click', resetGame)

function resetGame() {
    numberOfRounds = 0;
    totalScore = 0;
    currentRound = 0;

    document.querySelector('#totalRounds').innerText = `Antal omgångar: ${numberOfRounds}`;
    document.querySelector('#totalScore').innerText = `Total summa: ${totalScore}`;
    document.querySelector('#currentRound').innerText = `Omgångens poäng: ${currentRound}`;
}
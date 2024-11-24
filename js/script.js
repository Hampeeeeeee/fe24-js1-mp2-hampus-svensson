let numberOfRounds = 0, currentRound = 0, totalScore = 0, userName;
const nameForm = document.querySelector('#nameInput');
const rollDice = document.querySelector('#rollDice');
const saveScore = document.querySelector('#saveScore');
const resetBtn = document.querySelector('#resetBtn');
rollDice.disabled = true;
saveScore.disabled = true;

function handleName(event) {
    event.preventDefault();
    userName = nameForm.querySelector('input').value;
    if (userName !== '') {
        nameForm.style.display = 'none';
        rollDice.disabled = false;
        saveScore.disabled = false;
    }
    else{
        alert("Vänligen skriv in ett namn för att starta spelet!");
    }
    console.log(userName);
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
resetBtn.addEventListener('click', resetGame);

function resetGame() {
    numberOfRounds = 0;
    totalScore = 0;
    currentRound = 0;

    nameForm.style.display = 'block';
    rollDice.disabled = true;
    saveScore.disabled = true;
    
    document.querySelector('#diceRoll').innerText = '';
    document.querySelector('#popupEl').innerText = '';
    document.querySelector('#totalRounds').innerText = `Antal omgångar: ${numberOfRounds}`;
    document.querySelector('#totalScore').innerText = `Total summa: ${totalScore}`;
    document.querySelector('#currentRound').innerText = `Omgångens poäng: ${currentRound}`;
}
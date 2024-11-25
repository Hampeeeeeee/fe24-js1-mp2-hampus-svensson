// Deklarerar och tilldelar variabler ett värde. I detta fall 0 då de då de börjar på det och
// ändras vid ett senare tillfälle.
let numberOfRounds = 0, currentRound = 0, totalScore = 0;
// Deklarerar userName och tilldelar den '' för att användaren själv ska lägga in sitt användarnamn 
// vid spelets start.
let userName = '';
// Assignar variabler till html-element genom deras id.
const nameForm = document.querySelector('#nameInput');
const rollDice = document.querySelector('#rollDice');
const saveScore = document.querySelector('#saveScore');
const resetBtn = document.querySelector('#resetBtn');
// .disabled = true gör så att knapparna rollDice och saveScore inte kan användas till en början.
// Användaren måste lägga till ett användarnamn och submitta det innan knapparna fungerar.
rollDice.disabled = true;
saveScore.disabled = true;

// Lyssnar om ett 'submit' utförs , och ifall att det sker körs funktionen handleName.
nameForm.addEventListener('submit', handleName);
// Funktion som hanterar användarens input där event.preventDefault används för att sidan inte ska 
// reloada när användaren anger sitt användarnamn.
// Om userName inte är tomt så kommer användarnamnet att accepteras, nameForm göms
// och knapparna blir tillgängliga. Annars poppar det upp ett felmeddelande som ber 
// användaren att skriva in ett användarnamn.
function handleName(event) {
    event.preventDefault();
    userName = nameForm.querySelector('input').value;
    if (userName !== '') {
        nameForm.style.display = 'none';
        rollDice.disabled = false;
        saveScore.disabled = false;
    }
    else{
        alert("Vänligen skriv in ett användarnamn för att starta spelet!");
    }
    console.log(userName);
    nameForm.reset();
}

// Lyssnar om ett 'click' utförs på knappen "kasta tärning", och ifall att det sker körs funktionen
// handleCurrentRound.
rollDice.addEventListener('click', handleCurrentRound);

// Genererar ett random nummer mellan 1-6, och om det inte är 1 läggs slaget till currentRound.
// Annars om numret skulle vara 1 blir currentRound 0, och numberOfRounds ökar med ett.
function handleCurrentRound() {
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

// Lyssnar om ett 'click' utförs på knappen "Spara summa", och ifall att det sker körs funktionen
// saveCurrentRound.
saveScore.addEventListener('click', saveCurrentRound);

// Sparar man summan för currentRound läggs det till i totalScore och numberOfRounds ökar med ett
// currentRound går återigen tillbaka till 0 och ökar när tärningen kastas igen.
// Om du når 100 poäng eller mer så kommer en text med en gratulation att poppa up, och knapparna 
// stängs av till att du startar om spelet och anger ett användarnamn igen. Detta görs för att 
// gratulationsmeddelandet inte ska förändras om man skulle trycka på "Kasta tärning" eller 
// "Spara summa" efter att man har spelat klart.
function saveCurrentRound() {
    totalScore += currentRound;
    numberOfRounds++;
    document.querySelector('#totalRounds').innerText = `Antal omgångar: ${numberOfRounds}`;
    document.querySelector('#totalScore').innerText = `Total summa: ${totalScore}`;

    currentRound = 0;
    document.querySelector('#currentRound').innerText = `Omgångens poäng: ${currentRound}`;

    if (totalScore >= 100) {
        document.querySelector('#popupEl').innerText = `Grattis ${userName}, du har vunnit med ${totalScore} poäng på ${numberOfRounds} omgångar!`;
        rollDice.disabled = true;
        saveScore.disabled = true;
    }
}

// Lyssnar om ett 'click' utförs på knappen "Starta om spelet", och ifall att det görs så startar
// allting om. Det vill säga, currentRound, totalScore, och numberOfRounds blir 0. Dessutom kommer
// nameForm upp igen där användaren kan skriva in ett nytt användarnamn. Knapparna som används i spelet 
// är återigen i standardläge och går inte att användas förrän ett användarnamn har angets.
resetBtn.addEventListener('click', resetGame);

function resetGame() {
    currentRound = 0;
    totalScore = 0;
    numberOfRounds = 0;

    nameForm.style.display = 'block';
    rollDice.disabled = true;
    saveScore.disabled = true;
    
    document.querySelector('#diceRoll').innerText = '';
    document.querySelector('#popupEl').innerText = '';
    document.querySelector('#totalRounds').innerText = `Antal omgångar: ${numberOfRounds}`;
    document.querySelector('#totalScore').innerText = `Total summa: ${totalScore}`;
    document.querySelector('#currentRound').innerText = `Omgångens poäng: ${currentRound}`;

    console.clear();
}
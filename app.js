/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, previousRolls;

// Initialise game
init();


document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        // 1. Random two numbers
        var diceOne = Math.floor(Math.random() * 6) + 1;
        var diceTwo = Math.floor(Math.random() * 6) + 1;
        var diceRolls = [diceOne, diceTwo];

        // 2. If last roll and current roll = 6, wipe score
        if(previousRolls.includes(6) && diceRolls.includes(6)) {
            scores[activePlayer] = 0;
            console.log('wiped');
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
            nextPlayer();
        } 
        // 3. Update the round score IF the rolled number is NOT a 1
        else if(diceOne !== 1 && diceTwo !== 1) {
            //Add score
            roundScore += diceOne + diceTwo;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //Next player
            nextPlayer();
        }
        
        // 4. Display the first result
        var diceOneDOM =  document.querySelector('img.dice');
        diceOneDOM.style.display = 'block';
        diceOneDOM.src = 'dice-' + diceOne + '.png';

        // 5. Display the second result
        var diceTwoDOM =  document.querySelector('img.dice-two');
        diceTwoDOM.style.display = 'block';
        diceTwoDOM.src = 'dice-' + diceTwo + '.png';  
        
        // Previous rolls are logged into an array called previousRolls
        previousRolls = [diceOne, diceTwo];
        console.log(previousRolls);
    }
});


document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying) {
        // Add CURRENT score to the GLOBAL score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Get input field
        var input = document.querySelector('input.myInput').value;
        var winningScore;
        // If input = true (i.e. has a value), use it's value as a winningScore
        if(input) {
            var winningScore = input;
        } else {
            winningScore = 100;
        }
        // Check if player has won the game
        if(scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('img.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            // Next player function
            nextPlayer();
        }
    }
});


//Next player
function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

    document.querySelector('img.dice').style.display = 'none';
    document.querySelector('img.dice-two').style.display = 'none';
}




// Event click listener for button new
document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    previousRolls = [0,0];

    document.querySelector('img.dice').style.display = 'none';
    document.querySelector('img.dice-two').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}
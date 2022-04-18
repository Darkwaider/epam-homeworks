import '../scss/main.scss';
import '../index.html';

import {computerScore,humanScore} from "./state";
import resetFunction from "./function_play";


const playRock = () => {
    play("rock");
}

const playPaper = () => {
    play("paper");
}

const playScissors = () => {
    play("scissors");
}


const play = (humanPlay) => {

    let computerPlay = getComputerPlay();

    if (humanPlay === 'rock') {
        if (computerPlay === 'rock') {
            document.getElementById('result_rounds').innerHTML += "<p>You tied round. :|</p>";
        } else if (computerPlay === 'paper') {
            document.getElementById('result_rounds').innerHTML += "<p>You lose round. :(</p>";
            computerScore++;
        } else if (computerPlay === 'scissors') {
            document.getElementById('result_rounds').innerHTML += "<p>You win round! :)</p>";
            humanScore++;
        }
    } else if (humanPlay === 'paper') {
        if (computerPlay === 'rock') {
            document.getElementById('result_rounds').innerHTML += "<p>You win round! :)</p>";
            humanScore++;
        } else if (computerPlay === 'paper') {
            document.getElementById('result_rounds').innerHTML += "<p>You tied round. :|</p>";
        } else if (computerPlay === 'scissors') {
            document.getElementById('result_rounds').innerHTML += "<p>You lose round. :(</p>";
            computerScore++;
        }
    } else if (humanPlay === 'scissors') {
        if (computerPlay === 'rock') {
            document.getElementById('result_rounds').innerHTML += "<p>You lose round. :(</p>";
            computerScore++;
        } else if (computerPlay === 'paper') {
            document.getElementById('result_rounds').innerHTML += "<p>You win round! :)</p>";
            humanScore++;
        } else if (computerPlay === 'scissors') {
            document.getElementById('result_rounds').innerHTML += "<p>You tied round. :|</p>";
        }
    }

    document.querySelector('#result').innerHTML = `Result you - ${humanScore} computer - ${computerScore}`;
    if (humanScore === 3) {
        document.getElementById('result_rounds').innerHTML += "<p>YOU WIN, winner winner checking dinner!</p>";
    } else if (computerScore === 3) {
        document.getElementById('result_rounds').innerHTML += "<p>YOU LOSE XD</p>";
    }

}

const getComputerPlay = () => {
    let plays = ['rock', 'paper', 'scissors'];
    let play = plays[Math.floor(Math.random() * plays.length)];
    return play;
}

document.getElementById('rock').onclick = playRock;
document.getElementById('paper').onclick = playPaper;
document.getElementById('scissors').onclick = playScissors;
document.getElementById('reset').onclick = resetFunction;
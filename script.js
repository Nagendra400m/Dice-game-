'use strict';

const score0 = document.getElementById('score--0')
const score1 = document.getElementById('score--1')
const dice = document.querySelector('.dice')

const btnNew = document.querySelector('.btn--new')
const btnRoll = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')

const current0 = document.getElementById('current--0')
const current1 = document.getElementById('current--1')

const player0 = document.querySelector('.player--0')
const player1 = document.querySelector('.player--1')


let score, active_player, current_score, playing_game

// Initial conditions 
const init = function(){
    score = [0,0]
    active_player = 0
    current_score = 0
    playing_game = true

    score0.textContent = 0
    score1.textContent = 0
    current0.textContent = 0
    current1.textContent = 0
    
    dice.classList.add('hidden')
    player0.classList.remove('player--winner')
    player1.classList.remove('player--winner')
    player0.classList.add('player--active')
    player1.classList.remove('player--active')

}
init()

// Player switch function
const switchplayer = function(){
    document.getElementById(`current--${active_player}`).textContent = 0
        current_score = 0
        active_player = active_player === 0 ? 1 : 0;
        player0.classList.toggle('player--active')
        player1.classList.toggle('player--active')
}

// Dice Function
btnRoll.addEventListener('click', function(){
    if(playing_game){

    // Random number generation
    const randNum = Math.trunc(Math.random() * 6) + 1

    // Display dice 
    dice.classList.remove('hidden')
    dice.src = `dice-${randNum}.png`

    // check for rolled no is 1 
    if(randNum!==1){
    // Add score to current score
    current_score += randNum
    document.getElementById(`current--${active_player}`).textContent = current_score
    }else{
        // switch to next player
        switchplayer()
    }
}
})

// Hold button function
btnHold.addEventListener('click', function(){
    if(playing_game){
    // add current score to active player
    score[active_player] += current_score
    document.getElementById(`score--${active_player}`).textContent = score[active_player]
    // check if the player's score >= 100
    if(score[active_player] >= 20){
        playing_game = false
        dice.classList.add('hidden')
        document.querySelector(`.player--${active_player}`).classList.add('player--winner')
        document.querySelector(`.player--${active_player}`).classList.remove('player--active')
    }else{
        // switch to next player
        switchplayer()
    }
}
})

// New game reset function
btnNew.addEventListener('click', init)



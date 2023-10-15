const lifeBarTheCat = document.querySelector('[data-life-bar="cat-head"]');
const lifeBarBigBoss = document.querySelector('[data-life-bar="big-boss"]');
const lifBarJuliaTheArcher = document.querySelector('[data-life-bar="julia-the-archer]');
const lifeBarNamelessKnight = document.querySelector('[data-life-bar="nameless-knight"]');

const playerTheCat = document.querySelector('[data-heroes="the-cat"]');
const playerNamelessKnight = document.querySelector('[data-heroes="nameless-knight"]');
const playerJuliaTheArcher = document.querySelector('[data-heroes="julia-the-archer"]');
const playerWilliamTheHealer = document.querySelector('[data-heroes="william-the-healer"]');
const playerJackTheLumberjack = document.querySelector('[data-heroes="jack-the-lumberjack"]');

const computerBigBoss = document.querySelector('[data-evil="big-boss"]');
const computerRandomMonster = document.querySelector('[data-evil="random-monster-appear" ]');

let isPlayerTurnTheCat = true;
let isPlayerTurnJuliaTheArcher = true;
let isPlayerTurnWilliamTheArcher = true;
let isPlayerTurnTheNameLessKnight = true;
let isPlayerTurnJackTheLumberJack = true;
let isPlayerAllTurnedFinished = false;



// playerTheCat.addEventListener('click');

function generateAttackDamage(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

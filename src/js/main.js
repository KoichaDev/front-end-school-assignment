const lifeBarTheCat = document.querySelector('[data-life-bar="cat-head"]');
const lifeBarBigBoss = document.querySelector('[data-life-bar="big-boss"]');
const lifeBarNamelessKnight = document.querySelector('[data-life-bar="nameless-knight"]');
const lifeBarRandomMonster = document.querySelector('[data-evil="random-monster-appear"]');
const lifeBarJuliaTheArcher = document.querySelector('[data-life-bar="julia-the-archer"]');

const playerTheCat = document.querySelector('[data-heroes="the-cat"]');
const playerNamelessKnight = document.querySelector('[data-heroes="nameless-knight"]');
const playerJuliaTheArcher = document.querySelector('[data-heroes="julia-the-archer"]');
const playerWilliamTheHealer = document.querySelector('[data-heroes="william-the-healer"]');
const playerJackTheLumberjack = document.querySelector('[data-heroes="jack-the-lumberjack"]');

const computerBigBoss = document.querySelector('[data-evil="big-boss"]');
const computerRandomMonster = document.querySelector('[data-evil="random-monster-appear" ]');

const outputGameMessage = document.querySelector('[data-output="game-message"]');

let healthTheCat = +lifeBarTheCat.textContent;
let healthBigBoss = +lifeBarBigBoss.textContent;
let healthRandomMonster = +lifeBarRandomMonster.textContent;
let healthNamelessKnight = +lifeBarNamelessKnight.textContent;
let healthJuliaTheArcher = +lifeBarJuliaTheArcher.textContent;

let isComputerTurnBigBoss = false;
let isComputerTurnRandomMonster = false;

let isPlayerTurnTheCat = true;
let isPlayerTurnJuliaTheArcher = true;
let isPlayerTurnWilliamTheArcher = true;
let isPlayerTurnTheNameLessKnight = true;
let isPlayerTurnJackTheLumberJack = true;

let isPlayerAllTurnedFinished = false;
let isGameOver = false;

let gameOutputMessage = '';

const heroes = ['THE_CAT', 'NAMELESS_HERO', 'JULIA_THE_ARCHER'];

playerTheCat.addEventListener('click', handleCatAttack);

function handleCatAttack(e) {
	isPlayerTurnTheCat = false;

	if (!isPlayerTurnTheCat) {
		// e.preventDefault();
		// playerTheCat.removeEventListener('click', handleCatAttack);
	}

	const catAttackDmg = generateAttackDamage();
	healthBigBoss -= catAttackDmg;

	regenerateLifeBarToDisplay(lifeBarBigBoss, healthBigBoss);

	createOutputGameMessage(`The Cat gave damage ${catAttackDmg} to Big Boss`, 'cat-head');
	attackBigBossOnRandomHero();

	freezeTemporarilyPlayer(playerTheCat, isPlayerTurnTheCat);
}

function freezeTemporarilyPlayer(character, isTemporarilyFrozen = true) {
	if (!isTemporarilyFrozen) {
		character.classList.add('cursor-not-allowed', 'mix-blend-luminosity');
	}
}

function attackBigBossOnRandomHero() {
	const randomHeroes = getRandomHeroIndex(heroes);
	const bigBossAttackDmg = generateAttackDamage();

	if (randomHeroes === 'THE_CAT') {
		healthTheCat -= bigBossAttackDmg;

		regenerateLifeBarToDisplay(lifeBarTheCat, healthTheCat);
		createOutputGameMessage(`Big Boss attacked on The Cat ${bigBossAttackDmg}`, 'big-boss');
	}
	if (randomHeroes === 'NAMELESS_HERO') {
		healthNamelessKnight -= bigBossAttackDmg;

		regenerateLifeBarToDisplay(lifeBarNamelessKnight, healthNamelessKnight);
		createOutputGameMessage(`Big Boss attacked on the Nameless knight ${bigBossAttackDmg}`, 'big-boss');
	}
	if (randomHeroes === 'JULIA_THE_ARCHER') {
		healthJuliaTheArcher -= bigBossAttackDmg;

		regenerateLifeBarToDisplay(lifeBarJuliaTheArcher, healthJuliaTheArcher);
		createOutputGameMessage(`Big Boss attacked on Julia the Archer ${bigBossAttackDmg}`, 'big-boss');
	}

	console.log(randomHeroes);
}

function getRandomHeroIndex(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}

const MIN_DMG = 5;
const MAX_DMG = 10;

function generateAttackDamage(min = MIN_DMG, max = MAX_DMG) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function regenerateLifeBarToDisplay(characterType, healthDecrease) {
	characterType.textContent = healthDecrease;
}

function createOutputGameMessage(message = '', imageCharacterName) {
	if (message === '') {
		printErrorMessage('😡 Requires output message!');
	}

	if (!imageCharacterName) {
		printErrorMessage('😡 missing image name of the character!');
	}

	outputGameMessage.innerHTML += setOutputMarkupMessage(message, imageCharacterName);
}

function setOutputMarkupMessage(message, imageCharacterName) {
	return `
	<div class="output-div__game-message">
		<img src="${setImagePathUrl(imageCharacterName)}.png" />
		 <p>${message}</p>
	</div>
	`;
}

function setImagePathUrl(imageName) {
	if (!imageName) {
		printErrorMessage(' Missing Image for the character!');
	}

	return `src/img/${imageName}`;
}

function printErrorMessage(message) {
	throw new Error(message);
}

function increaseHealth() {}

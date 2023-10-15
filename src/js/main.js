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

const MIN_DMG = 5;
const MAX_DMG = 10;
const URL_IMAGE_PATH = 'src/img';

const randomMonster = ['slime.png', 'bat.png'];

let isVisibleRandomMonster = false;

let isGameOver = false;

let gameOutputMessage = '';

playerTheCat.addEventListener('click', handleAttackTheCat);
playerNamelessKnight.addEventListener('click', handleAttackNamelessKnight);
playerJuliaTheArcher.addEventListener('click', handleAttackJuliaTheArcher);

function handleAttackTheCat() {
	const catAttackDmg = generateAttackDamage();
	healthBigBoss -= catAttackDmg;

	changeLifeBarTextContent(lifeBarBigBoss, healthBigBoss);
	changeLifeBarAnimation(lifeBarBigBoss, healthBigBoss);

	createOutputGameMessage(`The Cat angriper ${catAttackDmg} Big Boss`, 'cat-head');
	attackRandomHeroByBigBoss();
	displayRandomMonster();
	changeCharacterLifeBarColor();
	isRandomMonsterVisible();
}

function handleAttackNamelessKnight() {
	const namelessKnightAttackDmg = generateAttackDamage();
	healthBigBoss -= namelessKnightAttackDmg;

	changeLifeBarTextContent(lifeBarBigBoss, healthBigBoss);
	changeLifeBarAnimation(lifeBarBigBoss, healthBigBoss);

	createOutputGameMessage(`The Nameless Knight angriper ${namelessKnightAttackDmg} Big Boss`, 'knight-head');
	attackRandomHeroByBigBoss();
	displayRandomMonster();
	changeCharacterLifeBarColor();
	isRandomMonsterVisible();
}

function handleAttackJuliaTheArcher() {
	const juliaTheArcherAttackDmg = generateAttackDamage();
	healthBigBoss -= juliaTheArcherAttackDmg;

	changeLifeBarTextContent(lifeBarBigBoss, healthBigBoss);
	changeLifeBarAnimation(lifeBarBigBoss, healthBigBoss);

	createOutputGameMessage(`Julia the Archer angriper ${juliaTheArcherAttackDmg} to Big Boss`, 'julia-head');
	attackRandomHeroByBigBoss();
	displayRandomMonster();
	changeCharacterLifeBarColor();
	isRandomMonsterVisible();
}

function isRandomMonsterVisible() {
	const baseUrl = window.location.origin;
	const relativeUrlPath = `${baseUrl}/${URL_IMAGE_PATH}`;
	const monsterImageSrc = computerRandomMonster.src;

	for (let i = 0; i < randomMonster.length; i++) {
		const monsterType = randomMonster[i];
		const fullImageUrlPath = `${relativeUrlPath}/${monsterType}`;

		if (monsterImageSrc === fullImageUrlPath) {
			isVisibleRandomMonster = true;
		}
	}
}

function attackRandomHeroByBigBoss() {
	const heroes = ['THE_CAT', 'NAMELESS_HERO', 'JULIA_THE_ARCHER'];
	const randomHeroes = getRandomAccessIndexArray(heroes);
	const bigBossAttackDmg = generateAttackDamage();

	if (randomHeroes === 'THE_CAT') {
		healthTheCat -= bigBossAttackDmg;

		changeLifeBarTextContent(lifeBarTheCat, healthTheCat);
		changeLifeBarAnimation(lifeBarTheCat, healthTheCat);
		createOutputGameMessage(`Big Boss angriper The Cat ${bigBossAttackDmg}`, 'big-boss');
	}

	if (randomHeroes === 'NAMELESS_HERO') {
		healthNamelessKnight -= bigBossAttackDmg;

		changeLifeBarTextContent(lifeBarNamelessKnight, healthNamelessKnight);
		changeLifeBarAnimation(lifeBarNamelessKnight, healthNamelessKnight);
		createOutputGameMessage(`Big Boss angriper the Nameless knight ${bigBossAttackDmg}`, 'big-boss');
	}

	if (randomHeroes === 'JULIA_THE_ARCHER') {
		healthJuliaTheArcher -= bigBossAttackDmg;

		changeLifeBarTextContent(lifeBarJuliaTheArcher, healthJuliaTheArcher);
		changeLifeBarAnimation(lifeBarJuliaTheArcher, healthJuliaTheArcher);
		createOutputGameMessage(`Big Boss angriper Julia the Archer ${bigBossAttackDmg}`, 'big-boss');
	}
}

function displayRandomMonster() {
	const randomProbabilityValue = Math.random();
	const PROBABILITY_MONSTER_APPEAR = 0.25;

	if (randomProbabilityValue >= PROBABILITY_MONSTER_APPEAR) return;

	const monsterType = getRandomMonsterImageType(randomMonster);

	computerRandomMonster.classList.replace('d-none', 'd-block');
	computerRandomMonster.src = `${URL_IMAGE_PATH}/${monsterType}`;
}

function getRandomMonsterImageType(array) {
	return getRandomAccessIndexArray(array);
}

function changeCharacterLifeBarColor() {
	changeLifeBarColorBigBoss();
	changeLifeBarColorTheCat();
	changeLifeBarColorTheNamelessKnight();
	changeLifeBarColorJuliaTheArcher();
}

function changeLifeBarAnimation(character, damaged) {
	character.style.width = `${damaged}%`;
}

function changeLifeBarColorBigBoss() {
	if (healthBigBoss < 50) {
		replaceLifeBarColorOnCharacter(lifeBarBigBoss, 'life-bar--success', 'life-bar--warning');
	}

	if (healthBigBoss < 25) {
		replaceLifeBarColorOnCharacter(lifeBarBigBoss, 'life-bar--warning', 'life-bar--danger');
	}
}

function changeLifeBarColorTheCat() {
	if (healthTheCat < 50) {
		replaceLifeBarColorOnCharacter(lifeBarTheCat, 'life-bar--success', 'life-bar--warning');
	}

	if (healthTheCat < 25) {
		replaceLifeBarColorOnCharacter(lifeBarTheCat, 'life-bar--warning', 'life-bar--danger');
	}
}

function changeLifeBarColorTheNamelessKnight() {
	if (healthNamelessKnight < 50) {
		replaceLifeBarColorOnCharacter(lifeBarNamelessKnight, 'life-bar--success', 'life-bar--warning');
	}

	if (healthNamelessKnight < 25) {
		replaceLifeBarColorOnCharacter(lifeBarNamelessKnight, 'life-bar--warning', 'life-bar--danger');
	}
}

function changeLifeBarColorJuliaTheArcher() {
	if (healthJuliaTheArcher < 50) {
		replaceLifeBarColorOnCharacter(lifeBarJuliaTheArcher, 'life-bar--success', 'life-bar--warning');
	}

	if (healthJuliaTheArcher < 25) {
		replaceLifeBarColorOnCharacter(lifeBarJuliaTheArcher, 'life-bar--warning', 'life-bar--danger');
	}
}

function replaceLifeBarColorOnCharacter(character, oldClassName, newClassName) {
	character.classList.replace(oldClassName, newClassName);
}

function getRandomAccessIndexArray(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}

function generateAttackDamage(min = MIN_DMG, max = MAX_DMG) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function changeLifeBarTextContent(characterType, healthDecrease) {
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
		<img src="${URL_IMAGE_PATH}/${imageCharacterName}.png" />
		 <p>${message}</p>
	</div>
	`;
}

function printErrorMessage(message) {
	throw new Error(message);
}

'use strict';

import { healthStyling as controllerNodeLifeBarStyling } from './controller/nodeHealthStyling.js';
import { changeLifeBarTextContent } from './controller/nodeLifeBarText.js';
import { createOutputGameMessage } from './controller/nodeGameMessage.js';
import { displayRandomMonster, getMonsterName } from './controller/nodeMonster.js';

import { getRandomAccessIndexArray } from './helpers/array.js';
import { generateAttackDamage } from './helpers/attackDamage.js';

const node = {
	lifeBar: {
		heroes: {
			theCat: document.querySelector('[data-life-bar="cat-head"]'),
			namelessKnight: document.querySelector('[data-life-bar="nameless-knight"]'),
			juliaTheArcher: document.querySelector('[data-life-bar="julia-the-archer"]'),
		},
		evils: {
			bigBoss: document.querySelector('[data-life-bar="big-boss"]'),
			randomMonster: document.querySelector('[data-evil="random-monster-appear"]'),
		},
	},
	players: {
		theCat: document.querySelector('[data-heroes="the-cat"]'),
		namelessKnight: document.querySelector('[data-heroes="nameless-knight"]'),
		juliaTheArcher: document.querySelector('[data-heroes="julia-the-archer"]'),
		williamTheHealth: document.querySelector('[data-heroes="william-the-healer"]'),
		jackTheLumberJack: document.querySelector('[data-heroes="jack-the-lumberjack"]'),
	},
	computer: {
		bigBoss: document.querySelector('[data-evil="big-boss"]'),
		randomMonster: document.querySelector('[data-evil="random-monster-appear" ]'),
	},
	outputGameMessage: document.querySelector('[data-output="game-message"]'),
};

const hitPoint = {
	theCat: +node.lifeBar.heroes.theCat.textContent,
	bigBoss: +node.lifeBar.evils.bigBoss.textContent,
	randomMonster: +node.lifeBar.evils.randomMonster.textContent,
	namelessKnight: +node.lifeBar.heroes.namelessKnight.textContent,
	juliaTheArcher: +node.lifeBar.heroes.juliaTheArcher.textContent,
};

const { changeLifeBarAnimation, changeNodeLifeBarColor } = controllerNodeLifeBarStyling;

let isGameOver = false;

node.players.theCat.addEventListener('click', handleAttackTheCat);
node.players.namelessKnight.addEventListener('click', handleAttackNamelessKnight);
node.players.juliaTheArcher.addEventListener('click', handleAttackJuliaTheArcher);

function handleAttackTheCat() {
	if (isRandomMonsterVisible()) {
		const payloadGameMessage = {
			nodeOutputGameMessage: node.outputGameMessage,
			message: `The Cat kan ikke angripe ${getMonsterName(node.computer.randomMonster)}`,
			imageCharacterName: 'cat-head',
			isVisibleDangerTextColor: true,
		};
		createOutputGameMessage(payloadGameMessage);
		attackRandomHeroByBigBoss();
		return;
	}

	const lifeBarBigBossNode = node.lifeBar.evils.bigBoss;
	const catAttackDmg = generateAttackDamage();
	hitPoint.bigBoss -= catAttackDmg;

	changeLifeBarTextContent(lifeBarBigBossNode, hitPoint.bigBoss);
	changeLifeBarAnimation(lifeBarBigBossNode, hitPoint.bigBoss);

	const payloadGameMessage = {
		nodeOutputGameMessage: node.outputGameMessage,
		message: `The Cat angriper ${catAttackDmg} Big Boss`,
		imageCharacterName: 'cat-head',
	};

	attackRandomHeroByBigBoss();
	createOutputGameMessage(payloadGameMessage);
	displayRandomMonster(node.computer.randomMonster);
}

function handleAttackNamelessKnight() {
	const bigBossLifeBarNode = node.lifeBar.evils.bigBoss;
	const namelessKnightAttackDmg = generateAttackDamage();
	hitPoint.bigBoss -= namelessKnightAttackDmg;

	changeLifeBarTextContent(bigBossLifeBarNode, hitPoint.bigBoss);
	changeLifeBarAnimation(bigBossLifeBarNode, hitPoint.bigBoss);

	if (isRandomMonsterVisible()) {
		// console.log(getVisibleMonsterType());
	}

	const payloadGameMessage = {
		nodeOutputGameMessage: node.outputGameMessage,
		message: `The Nameless Knight angriper ${namelessKnightAttackDmg} Big Boss`,
		imageCharacterName: 'knight-head',
	};

	attackRandomHeroByBigBoss();
	createOutputGameMessage(payloadGameMessage);
	displayRandomMonster(node.computer.randomMonster);
}

function handleAttackJuliaTheArcher() {
	const bigBossLifeBarNode = node.lifeBar.evils.bigBoss;
	const juliaTheArcherAttackDmg = generateAttackDamage();
	hitPoint.bigBoss -= juliaTheArcherAttackDmg;

	changeLifeBarTextContent(bigBossLifeBarNode, hitPoint.bigBoss);
	changeLifeBarAnimation(bigBossLifeBarNode, hitPoint.bigBoss);

	if (isRandomMonsterVisible()) {
		// console.log(getVisibleMonsterType());
	}

	const payloadGameMessage = {
		nodeOutputGameMessage: node.outputGameMessage,
		message: `Julia the Archer angriper ${juliaTheArcherAttackDmg} to Big Boss`,
		imageCharacterName: 'julia-head',
	};

	attackRandomHeroByBigBoss();
	createOutputGameMessage(payloadGameMessage);
	displayRandomMonster(node.computer.randomMonster);
}

function isRandomMonsterVisible() {
	const computedStyle = window.getComputedStyle(node.computer.randomMonster);
	const displayValue = computedStyle.getPropertyValue('display');

	// Check if the computed display property is not 'none'
	return displayValue !== 'none';
}

function toggleVisibleMonster() {}
function attackRandomHeroByBigBoss() {
	const heroLifeBar = node.lifeBar.heroes;

	const heroes = ['THE_CAT', 'NAMELESS_KNIGHT', 'JULIA_THE_ARCHER'];
	const heroRandomType = getRandomAccessIndexArray(heroes);
	const heroName = heroRandomType.replaceAll('_', ' ').toLowerCase();
	const bigBossAttackDmg = generateAttackDamage();

	const payloadGameMessage = {
		nodeOutputGameMessage: node.outputGameMessage,
		message: `Big Boss angriper ${heroName} ${bigBossAttackDmg}`,
		imageCharacterName: 'big-boss',
	};

	// Display Damage from the boss
	createOutputGameMessage(payloadGameMessage);

	heroes.forEach((heroName) => {
		const nodePayload = {
			...node,
			hitPoint,
			characterName: heroName,
		};

		changeNodeLifeBarColor(nodePayload);
	});

	if (heroRandomType === 'THE_CAT') {
		hitPoint.theCat -= bigBossAttackDmg;

		changeLifeBarTextContent(heroLifeBar.theCat, hitPoint.theCat);
		changeLifeBarAnimation(heroLifeBar.theCat, hitPoint.theCat);
	}

	if (heroRandomType === 'NAMELESS_KNIGHT') {
		hitPoint.namelessKnight -= bigBossAttackDmg;

		changeLifeBarTextContent(heroLifeBar.namelessKnight, hitPoint.namelessKnight);
		changeLifeBarAnimation(heroLifeBar.namelessKnight, hitPoint.namelessKnight);
	}

	if (heroRandomType === 'JULIA_THE_ARCHER') {
		hitPoint.juliaTheArcher -= bigBossAttackDmg;

		changeLifeBarTextContent(heroLifeBar.juliaTheArcher, hitPoint.juliaTheArcher);
		changeLifeBarAnimation(heroLifeBar.juliaTheArcher, hitPoint.juliaTheArcher);
	}
}

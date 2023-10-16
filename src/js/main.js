'use strict';

import { createOutputGameMessage } from './controller/nodeGameMessage.js';
import { changeLifeBarTextContent } from './controller/nodeLifeBarText.js';
import { healthStyling as controllerNodeLifeBarStyling } from './controller/nodeHealthStyling.js';
import {
	displayRandomMonster,
	removeRandomMonster,
	isRandomMonsterVisible,
	toggleMonsterVisibility,
	getMonsterName,
} from './controller/nodeMonster.js';

import { getRandomAccessIndexArray } from './helpers/array.js';
import { generateAttackDamage } from './helpers/attackDamage.js';
import { capitalizeEachWord } from './helpers/textTransformation.js';

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

const heroes = document.querySelectorAll('[data-hero="group"]')[0].children;

Array.from(heroes).forEach((hero) => {
	hero.addEventListener('click', (e) => {
		const heroType = e.target.getAttribute('data-heroes');

		const heroName = capitalizeEachWord(heroType.replaceAll('-', ' '));
		const monsterName = getMonsterName(node.computer.randomMonster);

		const nodeRandomMonster = node.computer.randomMonster;

		if (isRandomMonsterVisible(monsterName)) {
			if (heroType === 'the-cat' && monsterName === 'slime') {
				removeRandomMonster(nodeRandomMonster);
				toggleMonsterVisibility(false);
				return;
			}
			if (heroType === 'julia-the-archer' && monsterName === 'bat') {
				removeRandomMonster(nodeRandomMonster);
				toggleMonsterVisibility(false);
				return;
			}

			const payloadGameMessage = {
				nodeOutputGameMessage: node.outputGameMessage,
				message: `${heroName} kan ikke angripe ${monsterName}`,
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
			message: `${heroName} angriper ${catAttackDmg} Big Boss`,
			imageCharacterName: 'cat-head',
		};

		attackRandomHeroByBigBoss();
		createOutputGameMessage(payloadGameMessage);
		displayRandomMonster(nodeRandomMonster);
	});
});

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

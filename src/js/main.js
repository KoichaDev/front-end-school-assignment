'use strict';

import { isGameOver } from './controller/game.controller.js';
import { changeLifeBarTextContent } from './controller/nodes/lifeBarText.controller.js';
import { changeLifeBarAnimation } from './controller/nodes/healthStyling.controller.js';
import {
	displayRandomMonster,
	removeRandomMonster,
	isRandomMonsterVisible,
	toggleMonsterVisibility,
	getMonsterName,
	attackRandomHeroByBigBoss,
} from './controller/nodes/monster.controller.js';

import { createOutputGameMessage } from './controller/nodes/gameMessage.controller.js';

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
	namelessKnight: +node.lifeBar.heroes.namelessKnight.textContent,
	juliaTheArcher: +node.lifeBar.heroes.juliaTheArcher.textContent,
};

const heroes = document.querySelectorAll('[data-hero="group"]')[0].children;

Array.from(heroes).forEach((hero) => {
	hero.addEventListener('click', (e) => {
		const heroType = e.target.getAttribute('data-heroes');

		const heroName = capitalizeEachWord(heroType.replaceAll('-', ' '));
		const monsterName = getMonsterName(node.computer.randomMonster);
		const nodeRandomMonster = node.computer.randomMonster;

		const nodePayload = {
			node,
			hitPoint,
		};

		if (isRandomMonsterVisible(monsterName)) {
			attackRandomHeroByBigBoss(nodePayload);

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

		attackRandomHeroByBigBoss(nodePayload);
		createOutputGameMessage(payloadGameMessage);
		displayRandomMonster(nodeRandomMonster);

		if (isGameOver(hitPoint)) {
			alert('Game Over!');
		}
	});
});

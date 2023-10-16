'use strict';

import { isGameOver } from './controller/game.controller.js';
import { changeLifeBarTextContent } from './controller/nodes/lifeBarText.controller.js';
import { changeLifeBarAnimation } from './controller/nodes/healthStyling.controller.js';
import {
	displayRandomMonster,
	isRandomMonsterVisible,
	getMonsterName,
	removeAppearedRandomMonster,
	toggleMonsterVisibility,
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
	pc: {
		heroes: document.querySelectorAll('[data-hero="group"]')[0].children,
	},
	npc: {
		randomMonster: document.querySelector('[data-evil="random-monster-appear" ]'),
		outputGameMessage: document.querySelector('[data-output="game-message"]'),
	},
};

const hitPoint = {
	theCat: +node.lifeBar.heroes.theCat.textContent,
	bigBoss: +node.lifeBar.evils.bigBoss.textContent,
	namelessKnight: +node.lifeBar.heroes.namelessKnight.textContent,
	juliaTheArcher: +node.lifeBar.heroes.juliaTheArcher.textContent,
};

Array.from(node.pc.heroes).forEach((hero) => {
	hero.addEventListener('click', handleGameAction);
});

function handleGameAction(e) {
	const heroType = e.target.getAttribute('data-heroes');

	const heroName = capitalizeEachWord(heroType.replaceAll('-', ' '));
	const monsterName = getMonsterName(node.npc.randomMonster);
	const nodeRandomMonster = node.npc.randomMonster;

	const nodePayload = {
		nodeRandomMonster,
		node,
		hitPoint,
	};

	if (isRandomMonsterVisible(monsterName)) {
		attackRandomHeroByBigBoss(nodePayload);

		if (heroType === 'the-cat' && monsterName === 'slime') {
			removeAppearedRandomMonster(nodeRandomMonster);
			toggleMonsterVisibility(false);

			return;
		}

		if (heroType === 'julia-the-archer' && monsterName === 'bat') {
			removeAppearedRandomMonster(nodeRandomMonster);
			toggleMonsterVisibility(false);

			return;
		}

		const payloadGameMessage = {
			nodeOutputGameMessage: node.npc.outputGameMessage,
			message: `${heroName} kan ikke angripe ${monsterName}`,
			imageCharacterName: heroType,
			isVisibleDangerTextColor: true,
		};
		createOutputGameMessage(payloadGameMessage);
		return;
	}

	const lifeBarBigBossNode = node.lifeBar.evils.bigBoss;
	const heroDamage = generateAttackDamage();
	hitPoint.bigBoss -= heroDamage;

	changeLifeBarTextContent(lifeBarBigBossNode, hitPoint.bigBoss);
	changeLifeBarAnimation(lifeBarBigBossNode, hitPoint.bigBoss);

	const payloadGameMessage = {
		nodeOutputGameMessage: node.npc.outputGameMessage,
		message: `${heroName} angriper ${heroDamage} Big Boss`,
		imageCharacterName: heroType,
	};

	attackRandomHeroByBigBoss(nodePayload);
	createOutputGameMessage(payloadGameMessage);
	displayRandomMonster(nodeRandomMonster);

	if (isGameOver(hitPoint)) {
		alert('Game Over!');
	}
}

'use strict';

import { elementNode, elementNodeHitPoint } from './models/elementNode.js';

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

Array.from(elementNode.pc.heroes).forEach((hero) => {
	hero.addEventListener('click', handleGameAction);
});

function handleGameAction(e) {
	const heroType = e.target.getAttribute('data-heroes');

	const heroName = capitalizeEachWord(heroType.replaceAll('-', ' '));
	const monsterName = getMonsterName(elementNode.npc.randomMonster);
	const nodeRandomMonster = elementNode.npc.randomMonster;

	const nodePayload = {
		nodeRandomMonster,
		elementNode,
		elementNodeHitPoint,
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
			nodeOutputGameMessage: elementNode.npc.outputGameMessage,
			message: `${heroName} kan ikke angripe ${monsterName}`,
			imageCharacterName: heroType,
			isVisibleDangerTextColor: true,
		};
		createOutputGameMessage(payloadGameMessage);
		return;
	}

	const lifeBarBigBossNode = elementNode.lifeBar.evils.bigBoss;
	const heroDamage = generateAttackDamage();
	elementNodeHitPoint.bigBoss -= heroDamage;

	changeLifeBarTextContent(lifeBarBigBossNode, elementNodeHitPoint.bigBoss);
	changeLifeBarAnimation(lifeBarBigBossNode, elementNodeHitPoint.bigBoss);

	const payloadGameMessage = {
		nodeOutputGameMessage: elementNode.npc.outputGameMessage,
		message: `${heroName} angriper ${heroDamage} Big Boss`,
		imageCharacterName: heroType,
	};

	attackRandomHeroByBigBoss(nodePayload);
	createOutputGameMessage(payloadGameMessage);
	displayRandomMonster(nodeRandomMonster);

	if (isGameOver(elementNodeHitPoint)) {
		alert('Game Over!');
	}
}

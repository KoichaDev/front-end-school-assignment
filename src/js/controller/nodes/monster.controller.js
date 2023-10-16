import { URL_IMAGE_PATH } from '../../constants/imageUrl.js';

import { getRandomAccessIndexArray } from './helpers/array.js';
import { generateAttackDamage } from '../../helpers/attackDamage.js';

import { createOutputGameMessage } from './gameMessage.controller.js';
import { changeNodeLifeBarColor, changeLifeBarAnimation } from './healthStyling.controller.js';
import { changeLifeBarTextContent } from './lifeBarText.controller.js';

export function attackRandomHeroByBigBoss({ elementNode, elementNodeHitPoint }) {
	const heroLifeBar = elementNode.lifeBar.heroes;

	const heroes = ['THE_CAT', 'NAMELESS_KNIGHT', 'JULIA_THE_ARCHER'];
	const heroRandomType = getRandomAccessIndexArray(heroes);
	const heroName = heroRandomType.replaceAll('_', ' ').toLowerCase();
	const bigBossAttackDmg = generateAttackDamage();

	const payloadGameMessage = {
		nodeOutputGameMessage: elementNode.npc.outputGameMessage,
		message: `Big Boss angriper ${heroName} ${bigBossAttackDmg}`,
		imageCharacterName: 'big-boss',
	};

	// Display Damage from the boss
	createOutputGameMessage(payloadGameMessage);

	heroes.forEach((heroName) => {
		const nodePayload = {
			...elementNode,
			elementNodeHitPoint,
			characterName: heroName,
		};

		changeNodeLifeBarColor(nodePayload);
	});

	if (heroRandomType === 'THE_CAT') {
		elementNodeHitPoint.theCat -= bigBossAttackDmg;

		changeLifeBarTextContent(heroLifeBar.theCat, elementNodeHitPoint.theCat);
		changeLifeBarAnimation(heroLifeBar.theCat, elementNodeHitPoint.theCat);
	}

	if (heroRandomType === 'NAMELESS_KNIGHT') {
		elementNodeHitPoint.namelessKnight -= bigBossAttackDmg;

		changeLifeBarTextContent(heroLifeBar.namelessKnight, elementNodeHitPoint.namelessKnight);
		changeLifeBarAnimation(heroLifeBar.namelessKnight, elementNodeHitPoint.namelessKnight);
	}

	if (heroRandomType === 'JULIA_THE_ARCHER') {
		elementNodeHitPoint.juliaTheArcher -= bigBossAttackDmg;

		changeLifeBarTextContent(heroLifeBar.juliaTheArcher, elementNodeHitPoint.juliaTheArcher);
		changeLifeBarAnimation(heroLifeBar.juliaTheArcher, elementNodeHitPoint.juliaTheArcher);
	}
}

export function getMonsterName(nodeRandomMonster) {
	return nodeRandomMonster.getAttribute('data-monster-name');
}

export function isRandomMonsterVisible(computerMonsterNode) {
	if (computerMonsterNode !== null) {
		return toggleMonsterVisibility(true);
	}

	return toggleMonsterVisibility(false);
}

export function toggleMonsterVisibility(isVisibleMonster = false) {
	let isVisible = isVisibleMonster;

	if (isVisible) {
		isVisible = true;
	}

	return isVisible;
}

export function removeAppearedRandomMonster(nodeRandomMonsterNode) {
	nodeRandomMonsterNode.src = '';
	nodeRandomMonsterNode.classList.replace('d-block', 'd-none');
	nodeRandomMonsterNode.removeAttribute('data-monster-name');
}

export function displayRandomMonster(nodeRandomMonsterNode) {
	const randomProbabilityValue = Math.random();
	const PROBABILITY_RATE_MONSTER_APPEAR = 0.25;

	if (randomProbabilityValue >= PROBABILITY_RATE_MONSTER_APPEAR) return;

	const randomMonsterImages = ['slime.png', 'bat.png'];

	const monsterType = _getRandomMonsterImageType(randomMonsterImages);
	const monsterName = monsterType.replace('.png', '');

	nodeRandomMonsterNode.classList.replace('d-none', 'd-block');
	nodeRandomMonsterNode.src = `${URL_IMAGE_PATH}/${monsterType}`;
	nodeRandomMonsterNode.dataset.monsterName = monsterName;
}

function _getRandomMonsterImageType(array) {
	return getRandomAccessIndexArray(array);
}

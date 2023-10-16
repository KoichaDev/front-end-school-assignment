import { URL_IMAGE_PATH } from '../../constants/imageUrl.js';

import { getRandomAccessIndexArray } from './helpers/array.js';
import { generateAttackDamage } from '../../helpers/attackDamage.js';

import { createOutputGameMessage } from './gameMessage.controller.js';
import { changeNodeLifeBarColor, changeLifeBarAnimation } from './healthStyling.controller.js';
import { changeLifeBarTextContent } from './lifeBarText.controller.js';

export function attackRandomHeroByBigBoss({ node, hitPoint }) {
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
	const PROBABILITY_MONSTER_APPEAR = 0.25;

	if (randomProbabilityValue >= PROBABILITY_MONSTER_APPEAR) return;

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

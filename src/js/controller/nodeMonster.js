import { getRandomAccessIndexArray } from '../helpers/array.js';

import { URL_IMAGE_PATH } from '../constants/imageUrl.js';

export function getMonsterName(nodeRandomMonster) {
	return nodeRandomMonster.getAttribute('data-monster-name');
}

export function displayRandomMonster(nodeRandomMonster) {
	const randomProbabilityValue = Math.random();
	const PROBABILITY_MONSTER_APPEAR = 0.25;

	if (randomProbabilityValue >= PROBABILITY_MONSTER_APPEAR) return;

	const randomMonsterImages = ['slime.png', 'bat.png'];

	const monsterType = _getRandomMonsterImageType(randomMonsterImages);
	const monsterName = monsterType.replace('.png', '');

	nodeRandomMonster.classList.replace('d-none', 'd-block');
	nodeRandomMonster.src = `${URL_IMAGE_PATH}/${monsterType}`;
	nodeRandomMonster.dataset.monsterName = monsterName;
}

function _getRandomMonsterImageType(array) {
	return getRandomAccessIndexArray(array);
}

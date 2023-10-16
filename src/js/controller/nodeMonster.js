import { getRandomAccessIndexArray } from '../helpers/array.js';

import { URL_IMAGE_PATH } from '../constants/imageUrl.js';

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

	console.log(isVisible);
	return isVisible;
}

export function removeRandomMonster(nodeRandomMonsterNode) {
	nodeRandomMonsterNode.classList.replace('d-block', 'd-none');
	nodeRandomMonsterNode.src = '';
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

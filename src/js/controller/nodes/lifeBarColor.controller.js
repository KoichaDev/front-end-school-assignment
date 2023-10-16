import { THRESHOLD_HIT_POINT_LOW, THRESHOLD_HIT_POINT_MEDIUM } from './constants/healthThreshold.js';

export function _changeLifeBarColorNodeBigBoss(nodePayload) {
	const bigBossHitPoint = nodePayload.elementNodeHitPoint.bigBoss;
	const bigBossLifeBar = nodePayload.lifeBar.evils.bigBoss;

	if (bigBossHitPoint < THRESHOLD_HIT_POINT_MEDIUM) {
		_replaceLifeBarColorOnCharacter(bigBossLifeBar, 'life-bar--success', 'life-bar--warning');
	}

	if (bigBossHitPoint < THRESHOLD_HIT_POINT_LOW) {
		_replaceLifeBarColorOnCharacter(bigBossLifeBar, 'life-bar--warning', 'life-bar--danger');
	}
}

export function _changeLifeBarColorNodeTheCat(nodePayload) {
	const theCatHitPoint = nodePayload.elementNodeHitPoint.theCat;
	const theCatLifeBar = nodePayload.lifeBar.heroes.theCat;

	if (theCatHitPoint < THRESHOLD_HIT_POINT_MEDIUM) {
		_replaceLifeBarColorOnCharacter(theCatLifeBar, 'life-bar--success', 'life-bar--warning');
	}

	if (theCatHitPoint < THRESHOLD_HIT_POINT_LOW) {
		_replaceLifeBarColorOnCharacter(theCatLifeBar, 'life-bar--warning', 'life-bar--danger');
	}
}

export function _changeLifeBarColorNodeNamelessKnight(nodePayload) {
	const namelessKnightHitPoint = nodePayload.elementNodeHitPoint.namelessKnight;
	const nameLessKnightLifeBar = nodePayload.lifeBar.heroes.namelessKnight;

	if (namelessKnightHitPoint < THRESHOLD_HIT_POINT_MEDIUM) {
		_replaceLifeBarColorOnCharacter(nameLessKnightLifeBar, 'life-bar--success', 'life-bar--warning');
	}

	if (namelessKnightHitPoint < THRESHOLD_HIT_POINT_LOW) {
		_replaceLifeBarColorOnCharacter(nameLessKnightLifeBar, 'life-bar--warning', 'life-bar--danger');
	}
}

export function _changeLifeBarColorNodeJuliaTheArcher(nodePayload) {
	const juliaTheArcherHitPoint = nodePayload.elementNodeHitPoint.juliaTheArcher;
	const juliaTheArcherLifeBar = nodePayload.lifeBar.heroes.juliaTheArcher;

	if (juliaTheArcherHitPoint < THRESHOLD_HIT_POINT_MEDIUM) {
		_replaceLifeBarColorOnCharacter(juliaTheArcherLifeBar, 'life-bar--success', 'life-bar--warning');
	}

	if (juliaTheArcherHitPoint < THRESHOLD_HIT_POINT_LOW) {
		_replaceLifeBarColorOnCharacter(juliaTheArcherLifeBar, 'life-bar--warning', 'life-bar--danger');
	}
}

function _replaceLifeBarColorOnCharacter(characterNode, oldClassName, newClassName) {
	characterNode.classList.replace(oldClassName, newClassName);
}

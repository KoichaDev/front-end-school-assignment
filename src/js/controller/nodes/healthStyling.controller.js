import {
	_changeLifeBarColorNodeBigBoss,
	_changeLifeBarColorNodeJuliaTheArcher,
	_changeLifeBarColorNodeNamelessKnight,
	_changeLifeBarColorNodeTheCat,
} from './lifeBarColor.controller.js';

export function changeLifeBarAnimation(character, damaged) {
	character.style.width = `${damaged}%`;
}
export function changeNodeLifeBarColor(nodePayload) {
	const characterName = nodePayload.characterName;

	if (characterName === 'THE_CAT') {
		_changeLifeBarColorNodeTheCat(nodePayload);
	}

	if (characterName === 'NAMELESS_KNIGHT') {
		_changeLifeBarColorNodeNamelessKnight(nodePayload);
	}

	if (characterName === 'JULIA_THE_ARCHER') {
		_changeLifeBarColorNodeJuliaTheArcher(nodePayload);
	}

	_changeLifeBarColorNodeBigBoss(nodePayload);
}

export const elementNode = {
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

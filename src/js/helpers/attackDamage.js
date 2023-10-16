const MIN_DMG = 5;
const MAX_DMG = 10;

export function generateAttackDamage(min = MIN_DMG, max = MAX_DMG) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

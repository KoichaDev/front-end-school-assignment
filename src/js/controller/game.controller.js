export function isGameOver(hitPointsObj) {
	let isGameOver = false;
	const charHitPointValues = Object.values(hitPointsObj);

	charHitPointValues.forEach((charHitPointValue) => {
		if (charHitPointValue < 0) {
			isGameOver = true;
		}
	});

	return isGameOver;
}

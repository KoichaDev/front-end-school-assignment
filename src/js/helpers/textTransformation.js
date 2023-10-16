export function capitalizeEachWord(str) {
	/* `/\b\w/g` er et regulært uttrykksmønster som samsvarer med hvert ordtegn
     (`\w`) som er innledet av en ordgrense (`\b`). 'g'-flagget på slutten av
     mønsteret indikerer at mønsteret skal brukes globalt, altså det
     vil samsvare med alle forekomster i inndatastrengen. */
	return str.replace(/\b\w/g, function (char) {
		return char.toUpperCase();
	});
}

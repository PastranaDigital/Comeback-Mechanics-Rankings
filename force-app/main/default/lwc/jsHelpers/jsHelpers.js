export function getRankNumber(incomingRank) {
	//? modified to just return the ordinal indicators
	let RankNumber = '';
	let lastDigit = incomingRank % 10;
	let lastTwoDigits = incomingRank % 100;
	if(lastTwoDigits == 11 || lastTwoDigits == 12 || lastTwoDigits == 13 ) {
		lastDigit = 0;
	}
	switch (lastDigit) {
		case 1:
			RankNumber += 'st';
			break;
		case 2:
			RankNumber += 'nd';
			break;
		case 3:
			RankNumber += 'rd';
			break;
		default:
			RankNumber += 'th';
			break;
	}
	return RankNumber;
}

export function groupBy (arr, enumProperty) {
	return arr.reduce(function (item, prop) {
	  if (!item[prop[enumProperty]]) {
		item[prop[enumProperty]] = [];
	  }
	  item[prop[enumProperty]].push(prop);
	  return item;
	}, {});
}

export function sortArray (incomingArray, value, descending=false) {
	let i = descending ? -1 : 1;
	incomingArray.sort((a,b) => (a[value] > b[value]) ? 1*i : ((b[value] > a[value]) ? -1*i : 0));
	// console.log('incomingArray: ', incomingArray);
}
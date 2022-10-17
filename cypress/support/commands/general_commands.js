//*** General Commands ***//

/*
 * Name: addTestContext
 * Parameters: Title , Value
 * Return type: void
 * Purpose: To add test context in each test that will show up in mochaawesome reporter
 */
const addContext = require('mochawesome/addContext');
const fs = require("fs");

/*
 * Name: addTestContext
 * Parameters: title, value
 * Return type: void
 * Purpose: Add Test Context
 */
Cypress.Commands.add('addTestContext', (title, value) => {
	cy.once('test:after:run', test => addContext({ test }, { title, value }));
});


/*
 * Name: findMostFrequent
 * Parameters: text, num
 * Return type: void
 * Purpose: Finding n most frequent words
 */
Cypress.Commands.add('findMostFrequentWord', (text, num) => {
	const strArr = text.split(' ');
	const map = {};
	strArr.forEach(word => {
		if(map.hasOwnProperty(word)){
			map[word]++;
		}else{
			map[word] = 1;
		}
	});
	const frequencyArr = Object.keys(map).map(key => [key, map[key]]);
	frequencyArr.sort((a, b) => b[1] - a[1]);
	const frequencyWords = JSON.stringify(frequencyArr.slice(0, num))
	return frequencyWords;
});


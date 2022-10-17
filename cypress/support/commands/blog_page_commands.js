// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
/*
 * Name: clickPaginationButton
 * Parameters: first - prev - next - last
 * Return type: void
 * Purpose: Click Pagination Button
 */
Cypress.Commands.add('clickPaginationButton', (pagination) => {
	cy.get('[class=' + pagination + '-link]').click();
});

/*
 * Name: getfrequentWordsInLatestArticles
 * Parameters: latestCount
 * Return type: void
 * Purpose: Get frequent words in latest X articles
 */
Cypress.Commands.add('getfrequentWordsInLatestArticles', (latestCount) => {
	cy.get('[class=blog-posts]').its('length').then((size) => {
		for (let i = size - 1; i >= latestCount - 1; i--) {
			cy.get('[class=blog-posts]', { timeout: 1000 })
				.eq(i)
				.should('be.visible')
				.click();

			// Write frequent words in latest X articles
			cy.get('#hs_cos_wrapper_post_body')
				.invoke('text')
				.then(text => {
					return text.split(/\r?\n/).filter(line => line.trim() !== '').join('\n');
				})
				.then(text => {
					cy.findMostFrequentWord(text , 5).then(frequencyWords => {
						cy.writeFile('cypress/fixtures/articles', 'Article:\n' + text + '\n' + 'Most 5 Frequent Word: ' + frequencyWords + '\n\n', { flag: 'a+' });
					});
				});
			// Go Back Blog Page
			cy.go('back')
		}
	});
});

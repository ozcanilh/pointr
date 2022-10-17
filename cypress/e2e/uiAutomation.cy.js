describe('Pointr - Tech Blog Page', () => {
  before(function () {
    cy.writeFile('cypress/fixtures/articles', '')
  });

  beforeEach(function () {
    Cypress.Cookies.debug(true)
    cy.visit('/blog');
  });

  afterEach(function () {});

  it('Find the most repeated 5 words in the latest 3 articles and save into a .txt file.', () => {
    cy.addTestContext(
        'Test Description',
        'Test Steps: ' +
        '\n1. Go to Pointr Blog Page' +
        '\n2. Verify that all articles have loaded' +
        '\n3. Find the most repeated 5 words in the latest 3 articles' +
        '\n4. Save them (with their repeat count) into a .txt file.' +
        '\n\nTest Script last modified by: Ozcan'
    );

    // Click "Latest Page" button on blog page
    cy.clickPaginationButton('last');

    // Get Frequent Words in Latest Articles
    cy.getfrequentWordsInLatestArticles(3);
  })
})

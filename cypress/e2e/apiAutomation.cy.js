describe('Pointr - Restful Api', () => {
  before(function () {});

  beforeEach(function () {});

  afterEach(function () {});

  it('Check GET builds response body', () => {
    cy.addTestContext(
        'Test Description',
        'Test Steps: ' +
        '\n1. Send GET request to builds endpoint' +
        '\n2. Check status is 200' +
        '\n3. Check number of items' +
        '\n4. Check build name is equal to Galyum Building' +
        '\n5. Check build name is string' +
        '\n\nTest Script last modified by: Ozcan'
    );

    cy.request({
      method: 'GET',
      url: 'localhost:3000/builds/',
      headers: {
        accept: 'application/json'
      }
    }).then(response => {
      expect(response.status).to.eql(200);
      expect(response).to.have.length(2) // check number of items
      expect(response[0].name).to.eq('Galyum Building')
      expect(response[0].name).to.be.a('string')
    });
  })

  it('Check POST builds response body', () => {
    cy.addTestContext(
        'Test Description',
        'Test Steps: ' +
        '\n1. Send POST request to builds endpoint' +
        '\n2. Check status is 200' +
        '\n3. Check number of items' +
        '\n4. Check build name is equal to Galyum Building' +
        '\n5. Check build name is string' +
        '\n6. Check build country is Ankara' +
        '\n7. Check build country is string' +
        '\n\nTest Script last modified by: Ozcan'
    );

    cy.request({
      method: 'POST',
      url: 'localhost:3000/builds/',
      body: {
        name: 'Galyum Building',
        country: 'Ankara'
      },
    }).then(response => {
      expect(response.status).to.eql(200);
      expect(response).to.have.length(2)
      expect(response[0].name).to.eq('Galyum Building')
      expect(response[0].name).to.be.a('string')
      expect(response[0].country).to.eq('Ankara')
      expect(response[0].country).to.be.a('string')
    });
  })
})

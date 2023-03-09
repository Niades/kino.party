describe('empty spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000')
    cy.get('#kv-create-party').click()
    cy.get('#kv-your-party-id')
      .invoke('val')
      .then((value) => {
        expect(value).length(36)
      })
  })
})

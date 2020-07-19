import { getTitle, getMenu } from '../support/homepage.po';

describe('personal', () => {
  beforeEach(() => cy.visit('/'));

  it('should display my name as first title in the page', () => {
    getTitle().contains("Luiz Guilherme D'Abruzzo Pereira")
  });

  it('should display menu', () => {
    getMenu().find('a')
      .should('have.length', 6)
      .within(() => {
        cy.contains('Home')
        cy.contains('Blog')
        cy.contains('Portfolio')
        cy.contains('LinkedIn')
        cy.contains('Github')
        cy.contains('Twitter')
      })
  })
});

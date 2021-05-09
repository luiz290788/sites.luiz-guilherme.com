import { getTitle } from '../support/app.po';

describe('luiz-guilherme.com', () => {
  beforeEach(() => cy.visit('/'));

  it('should display title', () => {
    getTitle().contains("Luiz Guilherme D'Abruzzo Pereira");
  });
});

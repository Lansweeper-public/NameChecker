import { When } from "cypress-cucumber-preprocessor/steps";

When("I select site {string}", (siteFromEnv) => {
  cy.waitFor(`a[href*=${Cypress.env(`${siteFromEnv}`)}]`);
  cy.get(`a[href*=${Cypress.env(`${siteFromEnv}`)}]`).click();
});

When("I want to change the site", () => {
  cy.get(`[data-test-id="navigation-bar__go-to-sites"]`).click();
});

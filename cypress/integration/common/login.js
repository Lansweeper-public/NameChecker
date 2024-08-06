import { Given } from "cypress-cucumber-preprocessor/steps";

Given("I login", () => {
  cy.visit(`http://localhost:3000`, { timeout: 30000 });
  cy.get(".lec-button--content").click();

  cy.waitSpin(10000);
  cy.get("body").then(($body) => {
    if ($body.find("input[name=email]").length) {
      cy.get("input[name=email]").type(Cypress.env("USER"));
      cy.get("button[value=pwd]").click();
    }
  });

  cy.get("body").then(($body) => {
    if ($body.find("input[name=email]").length) {
      cy.get("input[name=password]").type(Cypress.env("PASSWORD"));
      cy.get("button[type=submit]").click();
    }
  });
});

Given("I authorize an app integration", () => {
  cy.get(`[data-test-id="authorize-app-integration__allow"]`).should("exist");
  cy.get(`[data-test-id="authorize-app-integration__allow"]`).click();
});

import { When, Then } from "cypress-cucumber-preprocessor/steps";

When(
  "I set a filter with option {string} operator {string} text {string} in row {string}",
  (option, operator, text, rowNumber) => {
    cy.waitFor(`[data-test-id="filter-table"]`);
    cy.get(`[data-test-id="filter__asset-name--${rowNumber}"]`).click();
    cy.get("span").contains(option).click();

    cy.get(
      `[data-test-id="filter__asset-selectOperator--${rowNumber}"]`,
    ).click();
    cy.get("span").contains(operator).click();

    cy.get(`[data-test-id="filter__asset-enterText--${rowNumber}"]`).type(text);
  },
);

When("I apply a filter", () => {
  cy.get(`[data-test-id="filter-table__apply-button"]`).click();
});

Then(
  "The filter is applied to option {string} operator {string} text {string}",
  (option, operator, text) => {
    cy.waitFor(`[data-test-id="filter-table"]`);
    cy.get("span").should("contain.text", `${option}${operator} ${text}`);
  },
);

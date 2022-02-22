Cypress.Commands.add("qaVisit", (url) => {
  Cypress.log({
    name: "qaVisit",
    displayName: "Login with fake token",
  });

  cy.visit(
    `${url}?qatoken=ewoic3ViIjogImF1dGgwfDVkZjhiMDEzNGJkNjAzMGQzMmVkZmI1YyIsCiJlbWFpbCI6ICJjYXJsb3MuY292ZXNAbGFuc3dlZXBlci5jb20iLAoicWF0b2tlbiI6IHRydWUsCiJlbWFpbF92ZXJpZmllZCI6dHJ1ZQp9CgoK`,
  );
});

Cypress.on("uncaught:exception", () => {
  // returning false here prevents Cypress from failing the test
  return false;
});

Cypress.Commands.add("waitForGraphQL", (operation, callback = undefined) => {
  cy.route2("POST", `/api/gateway?operation=${operation}`).as(operation);
  if (callback) {
    callback();
  }
  cy.wait(`@${operation}`);
});

Cypress.Commands.add("aliasGraphQL", (operation, callback = undefined) => {
  cy.route2("POST", `/api/gateway?operation=${operation}`).as(operation);
  if (callback) {
    callback();
  }
});

Cypress.Commands.overwrite("type", (originalFn, subject, string, options) =>
  originalFn(subject, string, Object.assign({}, options, { delay: 60 })),
);

// Waiting time for loading all data
Cypress.Commands.add("waitSpin", (time = 1000) => {
  cy.get(".lec-spin", { timeout: time }).should("not.exist");
});

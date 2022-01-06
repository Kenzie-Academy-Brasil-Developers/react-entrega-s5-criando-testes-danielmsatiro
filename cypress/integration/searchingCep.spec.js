context("Searching Cep", () => {
  it("should be able to retrieve location", () => {
    cy.visit("http://localhost:3000");
    cy.viewport(1440, 900);
    cy.get("input").type("88020010");
    cy.get("button").click();
    cy.contains("Logradouro");
    cy.get('input[value="Rua Emílio Blum"]');
    cy.contains("Número");
    cy.contains("Toda a extensão");
    cy.contains("Complemento");
    cy.contains("Bairro");
    cy.get('input[value="Centro"]');
    cy.contains("Cidade");
    cy.get('input[value="Florianópolis"]');
    cy.contains("Estado");
    cy.get('input[value="SC"]');
  });
});

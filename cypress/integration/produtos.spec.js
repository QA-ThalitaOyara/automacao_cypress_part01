/// <reference types="cypress" />

describe('Funcionalidade Página de predutos', () =>{
    
    beforeEach(() => {
        cy.visit('http://lojaebac.ebaconline.art.br/produtos/')
    });
    afterEach(() => {
        cy.screenshot()
    }) 
    it('Deve selecionar primeiro produto da lista', () => {
        cy.get('[class="product-block grid"]').first().click()
    });
    it('Deve selecionar ultimo produto da lista', () => {
        cy.get('[class="product-block grid"]').last().click()
    });
    it('Deve selecionar o 5° produto da lista', () => {
        cy.get('[class="product-block grid"]').eq(4).click()
    });
    it('Deve selecionar um produto da lista pelo nome', () => {
        cy.get('[class="product-block grid"]').contains('Aero Daily Fitness Tee').click()
    });

    it('Deve adicionar o produto ao carrinho - Fazendo Uso de Variaveis', () => {
        var quantidade = 10

        cy.get('[class="product-block grid"]').contains('Apollo Running Short').click()
        cy.get('.product_title').should('contain', 'Apollo Running Short')
        cy.get('.button-variable-item-36').click()
        cy.get(':nth-child(2) > .value > .variable-items-wrapper > .variable-item').click()
        cy.get('.input-text').clear().type(quantidade)
        cy.get('.single_add_to_cart_button').click()

        cy.get('.dropdown-toggle > .mini-cart-items').should('contain', quantidade)
        cy.get('.woocommerce-message').should('contain', quantidade + ' × “Apollo Running Short” foram adicionados no seu carrinho.')

    });

});
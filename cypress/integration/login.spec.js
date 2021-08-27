/// <reference types="cypress" />

context('Funcionalidade de Login', () => {
    var faker = require('faker')
    var email = 'aluno_ebac@teste.com'
    var senha = 'teste@teste.com'

    beforeEach(() => {
        cy.visit('http://lojaebac.ebaconline.art.br/minha-conta/')
    });
    afterEach(() => {
        //cy.screenshot()
    }); 

    it('Realizar Login Com Sucesso', () => {
        
        cy.get('#username').type(email)
        cy.get('#password').type(senha)
        cy.get('#rememberme').click()
        cy.get('.woocommerce-form > .button').click()
        cy.get('a > .hidden-xs').should('contain', 'Welcome aluno_ebac')

    });

    it('Login com Senha Inválida', () => {
        
        cy.get('#username').type(email)
        cy.get('#password').type('teste')
        cy.get('#rememberme').click()
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-error').should('contain', 'Erro: A senha fornecida para o', email + ' aluno_ebac@teste.com está incorreta. Perdeu a senha?')

    });

    it('Login com Usuário Inválido', () => {
        
        cy.get('#username').type(faker.internet.email())
        cy.get('#password').type(senha)
        cy.get('#rememberme').click()
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-error').should('contain', 'Endereço de e-mail desconhecido. Verifique novamente ou tente seu nome de usuário.')
    });
})
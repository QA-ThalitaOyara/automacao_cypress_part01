/// <reference types="cypress" />

context('Funcionalidade de Pré-Cadastro', () => {
    var faker = require('faker');
    var senha = "Senha123"


    beforeEach (() => {
        cy.visit('http://lojaebac.ebaconline.art.br/minha-conta/')
    
    });
    afterEach(() => {
        cy.screenshot()
    });
    it('Realizar Pré-Cadastro Com Sucesso', () => {
        var emailFaker = faker.internet.email()
        var nomeFaker = faker.name.firstName()
        var sobrenomeFaker =  faker.name.lastName()
        cy.get('#reg_email').type(emailFaker)
        cy.get('#reg_password').type(senha)
        cy.get(':nth-child(4) > .button').click()

        cy.get('.woocommerce-MyAccount-navigation-link--edit-account > a').click()
        cy.get('#account_first_name').type(nomeFaker)
        cy.get('#account_last_name').type(sobrenomeFaker)
        cy.get('#password_current').type(senha)
        cy.get('#password_1').type('NovaSenha')
        cy.get('#password_2').type('NovaSenha')
        cy.get('.woocommerce-Button').click()

        cy.get('.woocommerce-message').should('contain', 'Detalhes da conta modificados com sucesso.')
    });

    it('Validar Campos Obrigatórios Tela de Registro', () => {
        var emailFaker = faker.internet.email()
        cy.get(':nth-child(4) > .button').click()
        cy.get('.woocommerce-error').should('contain','Erro: Informe um endereço de e-mail válido.')
        cy.get('#reg_email').type(emailFaker)
        cy.get(':nth-child(4) > .button').click()
        cy.get('.woocommerce-error').should('contain', 'Erro: Digite a senha da conta.')

    });
    it('Validar Campos Obrigatórios Tela de Pré-Cadastro', () => {
        var emailFaker = faker.internet.email()
        var nomeFaker = faker.name.firstName()
        cy.get('#reg_email').type(emailFaker)
        cy.get('#reg_password').type(senha)
        cy.get(':nth-child(4) > .button').click()
        cy.get('.woocommerce-MyAccount-navigation-link--edit-account > a').click()

        cy.get('.woocommerce-Button').click()
        cy.get('[data-id="account_first_name"]').should('contain', 'Nome é um campo obrigatório.')
        cy.get('[data-id="account_last_name"]').should('contain','Sobrenome é um campo obrigatório.')
        cy.get('#account_first_name').type(nomeFaker)

        cy.get('.woocommerce-Button').click()
        cy.get('[data-id="account_last_name"]').should('contain','Sobrenome é um campo obrigatório.')
    });
});
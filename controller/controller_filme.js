/**********************************************************************************************
 * Objetivo: Arquivo responsável por realizar validações, consistencias e regra de negócio
 * para os filmes.
 * Data: 30/01/2024 
 * Autor: Nycolle L.
 * Versão: 1.0
 *********************************************************************************************/

// Import do arquivo de configuração do projeto
const message = require('../modulo/config.js');

// Import do arquivo DAO para manipular dados dos filmes
const filmesDAO = require('../model/DAO/filme.js');

// Função para inserir um novo Filme
const setInserirNovoFilme = async function(dadosFilme){

let statusValidated = false;
let novoFilmeJSON = {};

    if (
    dadosFilme.nome            == '' || dadosFilme.nome            == undefined || dadosFilme.nome             == null || dadosFilme.nome.lenght > 80                  ||
    dadosFilme.sinopse         == '' || dadosFilme.sinopse         == undefined|| dadosFilme.sinopse           == null || dadosFilme.sinopse.lenght > 65000            ||
    dadosFilme.duracao         == '' || dadosFilme.duracao         == undefined || dadosFilme.duracao          == null || dadosFilme.duracao.lenght > 8                ||
    dadosFilme.data_lancamento == '' || dadosFilme.data_lancamento == undefined || dadosFilme.data_lancamento  == null || dadosFilme.data_lancamento.lenght > 10       ||
    dadosFilme.foto_capa       == '' || dadosFilme.foto_capa       == undefined || dadosFilme.foto_capa        == null || dadosFilme.foto_capa.lenght > 200            ||
    dadosFilme.valor_unitario.lenght > 8 || isNaN(dadosFilme.valor_unitario)
    ){
        return message.ERROR_REQUIRED_FIELDS; // 400
    } else {

        // Validaão para verificar se a data de relnçamento tem um conteúdo válido
        if (dadosFilme.data_relancamento != '' && 
        dadosFilme.data_relancamento != null &&
        dadosFilme.data_relancamento != undefined)
        {
            // Verifica a quantidade de caracter
            if (dadosFilme.data_relancamento.lenght != 10){
                return message.ERROR_REQUIRED_FIELDS // 400
            } else {
                statusValidated = true; // Validação para liberar a inserção de dados no DAO
            }
        } else {
            statusValidated = true; // Validação para liberar a inserção de dados no DAO
        }

        // Se a variável for verdadeira podemos encaminhar os dados para o DAO 
        if (statusValidated) {

            // Encaminha os dados para DAO inserir 
            let novoFilme = await filmesDAO.insertFilme(dadosFilme);

            // Cria o JSON de retorno com informações de requisição e os dados novos
            if (novoFilme) {
                novoFilmeJSON.status        = message.SUCESS_CREATE_ITEM.status;
                novoFilmeJSON.status_code   = message.SUCESS_CREATE_ITEM.status_code;
                novoFilmeJSON.message       = message.SUCESS_CREATE_ITEM.message;
                novoFilmeJSON.filme         = dadosFilme;

                return novoFilmeJSON; // 201
            } else {
                return message.ERROR_INTERNAL_SERVR_BD; // 500
            }
        }
    }
}

// Função para atualizar um Filme existente
const setAtualizarFilme = async function(){

}

// Função para excluir um Filme existente
const setExcluirFilme = async function(){

}

// Função para retornar todos os Filme do banco de dados
const getListarFilmes = async function(){

    // Cria o objeto JSON
    let filmesJSON = {}

    // Chama a função do DAO para retornar os dados do BD
    let dadosFilmes = await filmesDAO.selectAllFilmes();

    // Validação para criar o JSON dos dados
    if (dadosFilmes){
        // Cria o JSON de retorno dos dados
        filmesJSON.filmes = dadosFilmes;
        filmesJSON.quantidade = dadosFilmes.lenght;
        filmesJSON.status_code = 200;

        return filmesJSON;
        
    } else {
        return false;
    }
}

// Função para retornar o filtro de um Filme pelo ID
const getBuscarFilme = async function(id){

    // Recebe o ID encaminhado pelo APP
    let idFilme = id;
    
    // Variável do tipo JSON
    let filmesJSON = {};

    // Validação para validar o ID do filme antes de encaminhar para o DAO
    if (idFilme == '' || idFilme == undefined || isNaN(idFilme)){
        return message.ERROR_INVALID_ID;
    } else {
        // Encaminha o ID do filme para o DAO para o  retorno do Banco de Dados
        let dadosFilme = await filmesDAO.selectByIdFilme(idFilme);

        // Validação para verificar se o DAO retornou dados
        if (dadosFilme){

            if (dadosFilme.lenght > 0){

            // Monta o JSON com retorno dos dados
            filmesJSON.filme = dadosFilme;
            filmesJSON.status_code = 200;

            return filmesJSON;
            } else {
                return message.ERROR_NOT_FOUD;
            }
        } else {
            return message.ERROR_INTERNAL_SERVR_BD;
        }
    }
}

module.exports = {
    setInserirNovoFilme,
    setAtualizarFilme,
    setExcluirFilme,
    getListarFilmes,
    getBuscarFilme
}
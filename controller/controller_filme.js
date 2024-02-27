/**********************************************************************************************
 * Objetivo: Arquivo responsável por realizar validações, consistencias e regra de negócio
 *     para os filmes
 * Data: 30/01/2024 
 * Autor: Nycolle L.
 * Versão: 1.0
 *********************************************************************************************/

// Import do arquivo de configuração do projeto
const message = require('../modulo/config.js');

// Import do arquivo DAO para manipular dados dos filmes
const filmesDAO = require('../model/DAO/filme.js');

// Função para inserir um novo Filme
const setInserirNovoFilme = async function(){

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
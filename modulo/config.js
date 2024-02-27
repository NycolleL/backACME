/*************************************************************************************
 * Objetivo: Arquivo resposável pelas variáveis globais do projeto, onde haverão
 * mensagens, status_code e outros conteúdos para o projeto
 * Data: 20/02/2024
 * Autor: Nycolle L.
 * Versão: 1.0
 **************************************************************************************/

// nome de constante sempre minusculo
// nome de variavel sempre maiusculo

/**************************** MENSAGENS DE ERRO DO PROJETO ************************** */
const ERROR_INVALID_ID        = {status: false, status_code: 400, message: 'O ID encaminhado na requisição não é válido !!!'};
const ERROR_NOT_FOUD          = {status: false, status_code: 404, message: 'Nenhum item encontrado na requisição !!!'};
const ERROR_INTERNAL_SERVR_BD = {status: false, status_code: 500, message: 'Ocorreram eros no processamento do Banco de Dados. Contate o administrador da API.'};


module.exports = {
    ERROR_INVALID_ID,
    ERROR_NOT_FOUD,
    ERROR_INTERNAL_SERVR_BD
}
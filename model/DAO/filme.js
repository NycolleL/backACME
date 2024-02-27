/**********************************************************************************************
 * Objetivo: Arquivo responsável por realizar o CRUD no Banco de Dados MySQL
 * Data: 30/01/2024 
 * Autor: Nycolle L.
 * Versão: 1.0
 *********************************************************************************************/

// Import da biblioteca do prisma clien
const {PrismaClient } = require('@prisma/client');

// Iniciando a classe do PrismaClient
const prisma = new PrismaClient();

// Função para inserir um filme no Banco de Dados
const insertFilme = async function(){

}

// Função para atualizar um filme no Banco de Dados
const updateFilme = async function(){

}

// Função para excluir um filme no Banco de Dados
const deleteFilme = async function(){

}

// Função para retornar todos os filmes do Banco de Dados
const selectAllFilmes = async function(){

    // Script SQL para buscar todos os registros no banco de dados
    let sql = 'select * from tbl_filmes'

    // $queryRawUnsafe(sql)                  - Encaminha uma variavel
    // $queryRaw('select * from tbl_filme')  - Encaminhadireto para o script

    // Executa o scriptSQL no BD e guarda o retorno dos dados
    let rsFilmes = await prisma.$queryRawUnsafe(sql);

    // Validação para retornar os dados ou retornar falso
    if(rsFilmes.length > 0)
        return rsFilmes;
    else
        return false;
}

// Função buscar um filme no Banco de Dados filtrando pelo ID
const selectByIdFilme = async function(id){

    try {
    // Script SQL para pesquisar o filme pelo ID
    let sql = `select * from tbl_filmes where id = ${id}`;

    // Executa o scropit SQL no BD e retorna o filme
    let rsFilme = await prisma.$queryRawUnsafe(sql);

    return rsFilme;

    } catch (error) {
        return false;
    }
}

module.exports = {
    insertFilme,
    updateFilme,
    deleteFilme,
    selectAllFilmes,
    selectByIdFilme
}

// 200 SUCESSO
// 400 ERRO DO CLIENTE
// 500 ERRO NO SERVIDOR
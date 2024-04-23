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
const insertGenero = async function(dadosGenero){

 try {
    // Cria a variável SQL
    let sql;

    // Validação para verificar se a data de relançamento é vazia,
    //    pois devemos ajustar o script SQL para o BD -- OBS: essa condição
    //    é provisória, já que iremos tratar no BD com uma procedure.
    if (dadosGenero.data_relancamento == null || 
        dadosGenero.data_relancamento == undefined ||
        dadosGenero.data_relancamento == ''
        ){
            // Script com o valor NULL 
    let sql = `insert into tbl_genero (
                nome
            ) vales (
                '${dadosGenero.nome}'   
            )`
    } else  {
        // Script SQL com a data
        sql = `insert into tbl_genero (
            nome
            ) vales (
                  '${dadosGenero.nome}'   
        )`
    }   

    // $queryRawUnsafe() - serve para executar scripts sql que retornam dados do BD (select)
    // $executeRawUnsafe = Serve para executar scripts SQL que 
    //   não retornam outros valores (insert, update e dele).
    // $queryRawUnsafe = Serve para executar scripts SQL que RETORNAM dados do BD (select).
    
    let result = await prisma.$executeRawUnsafe(sql);

    if (result)
        return true;
    else
        return false;
 } catch (error) {
        return false;
    }
}

// Função para atualizar um filme no Banco de Dados
const updateGenero = async function(){

}

// Função para excluir um filme no Banco de Dados
const deleteGenero = async function(){

}

// Função para retornar todos os filmes do Banco de Dados
const selectAllGeneros = async function(){

    // Script SQL para buscar todos os registros no banco de dados
    let sql = 'select * from tbl_generos'

    // $queryRawUnsafe(sql)                  - Encaminha uma variavel
    // $queryRaw('select * from tbl_filme')  - Encaminha direto para o script

    // Executa o scriptSQL no BD e guarda o retorno dos dados
    let rsGeneros = await prisma.$queryRawUnsafe(sql);

    // Validação para retornar os dados ou retornar falso
    if (rsFilmes.length > 0)
        return rsGeneros;
    else
        return false;
}

// Função buscar um filme no Banco de Dados filtrando pelo ID
const selectByIdGenero = async function(id){

    try {
    // Script SQL para pesquisar o filme pelo ID
    let sql = `select * from tbl_generos where id = ${id}`;

    // Executa o scripit SQL no BD e retorna o filme
    let rsGeneros = await prisma.$queryRawUnsafe(sql);

    return rsGeneros;

    } catch (error) {
        return false;
    }
}

const selectByFilterGenero = async function () {

    let sql = `select * from tbl_generos where id = ${id}`;
}

module.exports = {
    insertGenero,
    updateGenero,
    deleteGenero,
    selectAllGeneros,
    selectByIdGenero
}

// 200 SUCESSO
// 400 ERRO DO CLIENTE
// 500 ERRO NO SERVIDOR
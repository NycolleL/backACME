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
const insertFilme = async function(dadosFilme){

 try {
    // Cria a variável SQL
    let sql;

    // Validação para verificar se a data de relançamento é vazia,
    //    pois devemos ajustar o script SQL para o BD -- OBS: essa condição
    //    é provisória, já que iremos tratar no BD com uma procedure.
    if (dadosFilme.data_relancamento == null || 
        dadosFilme.data_relancamento == undefined ||
        dadosFilme.data_relancamento == ''
        ){
            // Script com o valor NULL 
    let sql = `insert into tbl_filme (nome, 
                                      sinopse,
                                      duracao,
                                      data_lancamento,
                                      data_relancameno,
                                      foto_capa,
                                      valor_unitario   
                                      ) vales (
                                            '${dadosFilme.nome}',
                                            '${dadosFilme.sinopse}',
                                            '${dadosFilme.duracao}',
                                            '${dadosFilme.data_lancamento}',
                                            null,
                                            '${dadosFilme.foto_capa}',
                                            '${dadosFilme.valor_unitario}'     
                                    )`
    } else  {
        // Script SQL com a data
        sql = `insert into tbl_filme (nome, 
                sinopse,
                duracao,
                data_lancamento,
                data_relancameno,
                foto_capa,
                valor_unitario   
            ) vales (
                  '${dadosFilme.nome}',
                  '${dadosFilme.sinopse}',
                  '${dadosFilme.duracao}',
                  '${dadosFilme.data_lancamento}',
                  '${dadosFilme.data_relancamento}',
                  '${dadosFilme.foto_capa}',
                  '${dadosFilme.valor_unitario}'     
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
    // $queryRaw('select * from tbl_filme')  - Encaminha direto para o script

    // Executa o scriptSQL no BD e guarda o retorno dos dados
    let rsFilmes = await prisma.$queryRawUnsafe(sql);

    // Validação para retornar os dados ou retornar falso
    if (rsFilmes.length > 0)
        return rsFilmes;
    else
        return false;
}

// Função buscar um filme no Banco de Dados filtrando pelo ID
const selectByIdFilme = async function(id){

    try {
    // Script SQL para pesquisar o filme pelo ID
    let sql = `select * from tbl_filmes where id = ${id}`;

    // Executa o scripit SQL no BD e retorna o filme
    let rsFilme = await prisma.$queryRawUnsafe(sql);

    return rsFilme;

    } catch (error) {
        return false;
    }
}

const selectByFilterFilme = async function () {

    let sql = `select * from tbl_filme where id = ${id}`;
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
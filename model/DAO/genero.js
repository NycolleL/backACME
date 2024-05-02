/**********************************************************************************************
 * Objetivo: Arquivo responsável por realizar o CRUD no Banco de Dados MySQL
 * Data: 30/01/2024 
 * Autor: Nycolle L.
 * Versão: 1.0
 *********************************************************************************************/

const {PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const insertGenero = async function(dadosGenero){

 try {
    let sql;

    if (dadosGenero.data_relancamento == null || 
        dadosGenero.data_relancamento == undefined ||
        dadosGenero.data_relancamento == ''
        ){
    let sql = `insert into tbl_genero (
                nome
            ) vales (
                '${dadosGenero.nome}'   
            )`
    } else  {
        sql = `insert into tbl_genero (
            nome
            ) vales (
                  '${dadosGenero.nome}'   
        )`
    }   
    
    let result = await prisma.$executeRawUnsafe(sql);

    if (result)
        return true;
    else
        return false;
 } catch (error) {
        return false;
    }
}

const updateGenero = async function(){

}

const deleteGenero = async function(){

}

const selectAllGeneros = async function(){

    let sql = 'select * from tbl_generos'
    let rsGeneros = await prisma.$queryRawUnsafe(sql);

    if (rsFilmes.length > 0)
        return rsGeneros;
    else
        return false;
}

const selectByIdGenero = async function(id){

    try {

    let sql = `select * from tbl_generos where id = ${id}`;
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

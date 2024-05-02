// Import da biblioteca do prisma clien
const {PrismaClient } = require('@prisma/client');

// Iniciando a classe do PrismaClient
const prisma = new PrismaClient();

// Função para inserir um usuário no Banco de Dados
const insertUsuario = async function(dadosUsuario){

 try {
    // Cria a variável SQL
    let sql;

    if (dadosUsuario.nome == null || 
        dadosUsuario.email == undefined ||
        dadosUsuario.senha == '' ||
        dadosUsuario.telefone== null 
        ){
    let sql = `insert into tbl_usuario (
                nome
            ) vales (
                '${dadosUsuario.nome}'   
            )`
    } else  {
        sql = `insert into tbl_usuario (
            nome
            ) vales (
                  '${dadosUsuario.nome}'   
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

const updateUsuario = async function(){

}

const deleteUsuario = async function(){
}

const selectAllUsuario = async function(){

    // Script SQL para buscar todos os registros no banco de dados
    let sql = 'select * from tbl_usuario'

    // Executa o scriptSQL no BD e guarda o retorno dos dados
    let rsUsuario = await prisma.$queryRawUnsafe(sql);

    // Validação para retornar os dados ou retornar falso
    if (rsFilmes.length > 0)
        return rsUsuario;
    else
        return false;
}

const selectByIdUsuario = async function(id){
    try {
    // Script SQL para pesquisar o filme pelo ID
    let sql = `select * from tbl_usuario where id = ${id}`;
    let rsUsuario = await prisma.$queryRawUnsafe(sql);

    return rsUsuario;

    } catch (error) {
        return false;
    }
}

const selectByFilterUsuario = async function () {

    let sql = `select * from tbl_usuario where id = ${id}`;
}

module.exports = {
    insertUsuario,
    updateUsuario,
    deleteUsuario,
    selectAllUsuario,
    selectByIdUsuario
}
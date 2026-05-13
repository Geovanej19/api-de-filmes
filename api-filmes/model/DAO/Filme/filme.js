/*******************************************************************************************************
 * 
 * Objetivo: Arquivo responsável pelo CRUD no Banco de dados MySQL na tabela 
 *      Filme
 * Data: 15/04/2026
 * Autor: Geovane
 * Versão: 1.0
 * 
 *******************************************************************************************************/

//Impor da biblioteca para gereniciar o banco de dados MySQL no node.js
const knex = require('knex')

//Import do arquivo de configiração para conexão com o banco de dados MySQL
const knexConfig = require('../../database_config_knex/knexFile.js')

//Criar a conexão com o banco de dados MySQL
const knexConex = knex(knexConfig.development)

//Função para inserir dados na tabela de filmes
const insertFilme = async function(filme) {

    try {
        
    
        let sql = `insert into tbl_filme (
                        nome, 
                        data_lancamento, 
                        duracao, 
                        sinopse, 
                        avaliacao, 
                        valor, 
                        capa
                        )
                values(
                        '${filme.nome}', 
                        '${filme.data_lancamento}', 
                        '${filme.duracao}',
                        '${filme.sinopse}',
                        if('${filme.avaliacao}' = '', null, '${filme.avaliacao}'), 
                        '${filme.valor}',
                        '${filme.capa}');`

        //Executar o ScriptSQL no Banco de Dados
        let result = await knexConex.raw(sql)
        

        if(result)
            return result[0].insertId // Retorna o ID gerado no BD
        else
            return false
    

    } catch (error) {
        console.log(error)
        return false
    }
    
}

//Função para atualizar um filme existente na tabela
const updateFilme = async function(filme) {
    try {
        //Sript para atualizar os dados do BD
        let sql = `update tbl_filme set
        nome =                  '${filme.nome}',
        data_lancamento =       '${filme.data_lancamento}',
        duracao =               '${filme.duracao}',
        sinopse =               '${filme.sinopse}',
        avaliacao =             if('${filme.avaliacao}' = '', null, '${filme.avaliacao}'),
        valor =                 '${filme.valor}',
        capa =                  '${filme.capa}'
    where id =                  '${filme.id}';`

        //Executa o script no BD
        let result = await knexConex.raw(sql)

        if(result)
        return true
        else
        return false
    
    } catch (error) {
        return false
    }

    
    
}

//Função para retornar todos os dados da tabela de filme
const selectAllFilme = async function() {
    try {

        //Script para retornar todos os filmes
        let sql = `select * from tbl_filme order by id desc`

        //Executa no banco de dados o srcipt SQL para retornar os filmes
        let result = await knexConex.raw(sql)
        
        
        //Validação para verificar se o retorno do Banco é um Array
        //Se o script SQL der erro, o Banco não devolve um Array
        if (Array.isArray(result)) {
            return result[0]
        }else {
            return false
        }
        
    } catch (error) {        
        return false
    }
}

//Função para retornar os dados do filme fitrando pelo ID
const selectByIdFilme = async function(id) {
    try {
        let sql = `select * from tbl_filme where id=${id}`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result)){
            return result[0]
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

//Função para excluir um filme pelo ID
const deleteFilme = async function(id) {
    try {
        let sql = `delete from tbl_filme where id = ${id}`
    
        let result = await knexConex.raw(sql)
        
        if(result){
            return true
        }else{
            return false
        }
        
    } catch (error) {
        return false
    }
}

module.exports = {
    insertFilme,
    updateFilme,
    selectAllFilme,
    selectByIdFilme,
    deleteFilme
}
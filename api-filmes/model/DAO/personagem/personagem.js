/*******************************************************************************************************
 * 
 * Objetivo: Arquivo responsável pelo CRUD no Banco de dados MySQL na tabela 
 *      Filme
 * Data: 08/05/2026
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

//Função para inserir dados na tabela de personagem
const insertNewCharacter = async function(personagem) {

    try {
        const sql = `insert into tbl_personagem (nome) values (?)`
        const result = await knexConex.raw(sql, [personagem.nome])

        return result[0].insertId || false

    } catch (error) {
        console.log('Erro ao inserir um personagem: ', error)
        return false
    }
}


//Função para atualizar um personagem existente na tabela
const updateCharacter = async function(personagem) {

    try {
        
        let sql = `update tbl_personagem set
        nome =      '${personagem.nome}'
        where id =  '${personagem.id}';`

        let result = await knexConex.raw(sql)

        if(result){
            return true
        }else{
            return false
        }
    } catch (error) {
        console.log(error);
        
        return false
    }
}


//Função para retornar todos os dados da tabela de pesonagem
const selectAllCharacter = async function() {
    try {
        
        let sql = `select * from tbl_personagem order by id desc`

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


//Função para retornar os dados do personagem fitrando pelo ID
const selectByIdCharacter = async function(id) {
    
    try {
        
        let sql = `select * from tbl_personagem where id= ?`

        let result = await knexConex.raw(sql, [id])

        if(Array.isArray(result)){
            return result[0]
        }else{
            return false
        }
        
    } catch (error) {
        console.log('Erro ao buscar personagem por ID: ', error)
        return false
    }
}


//Função para excluir um personagem pelo ID
const deleteCaracter = async function(id) {
    try {
        let sql = `delete from tbl_personagem where id=${id}`

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
    insertNewCharacter,
    updateCharacter,
    selectAllCharacter,
    selectByIdCharacter,
    deleteCaracter
}
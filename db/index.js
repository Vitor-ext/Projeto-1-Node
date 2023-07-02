const config = require('config');

async function connect() {
    if (global.connection && global.connection.state !== 'disconnected')
        return global.connection;



    const mysql = require('mysql2/promise');

    const mysqlConnection = await mysql.createConnection({
        host: config.get('mysql.host'),
        user: config.get('mysql.usuario'),
        password: config.get('mysql.senha'),
        database: config.get('mysql.banco-de-dados'),
        port: config.get('mysql.port')
    });

    console.log('Conectou...');
    global.connection = mysqlConnection;

    return mysqlConnection;

}

async function selectTb(){
    try {
        const conn = await connect();
        const [rows] = await conn.query('SELECT * FROM teste.tb_tes;');
        return await rows;
    } catch (error) {
        return error;
    }

}

async function selectWhereTB(ids){
    try {
        const conn = await connect();
        const [rows] = await 
            conn.query('SELECT * FROM teste.tb_tes where ids=?;', ids);
        const final = await rows.length === 0 ? 
                            ['Nenhum registro encontrado.'] : rows;
        return await final;
    } catch (error) {
        return error;
    }
}

async function insertTb(dados){
    try {
        const conn = await connect();
        const sql = 'insert into tb_tes (ids, nome) values (?,?)';
        const values = [dados.ids, dados.nome];
        await conn.query( sql, values);
        
    } catch (error) {
        return error;
    }

}



async function deletetb(id){
    try {
        const conn = await connect();
        const [rows] = await 
            conn.query('DELETE * FROM PWII.tbl_table where ids=?;', id);
        const final = await rows.length === 0 ? 
                            ['Não deletado pois não existe nenhum registro.'] : rows;
        return await final;
    } catch (error) {
        return error;
    }
}


module.exports = {selectTb, selectWhereTB, insertTb, deletetb}

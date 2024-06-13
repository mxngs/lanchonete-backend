
// Importa de biblioteca do @prisma/client
const { PrismaClient } = require('@prisma/client')
const { sqltag } = require('@prisma/client/runtime/library');


// Instacia da classe PrismaClient
const prisma = new PrismaClient()

const selectCarrinhoByCliente = async function(id){
    try {
        // Realiza a busca do genero pelo ID
        let sql = `select tbl_produto.id_produto, tbl_produto.nome, tbl_produto.descricao, tbl_produto.valor, tbl_pedidos.id_pedido, tbl_pedidos.desconto, tbl_pedidos.tempo_entrega, tbl_pedidos.taxa_entrega, tbl_pedido_produto.id_pedido_produto, tbl_pedido_produto.status_view from tbl_produto 
        join tbl_pedido_produto on tbl_pedido_produto.id_produto = tbl_produto.id_produto 
        join tbl_pedidos on tbl_pedido_produto.id_pedido = tbl_pedidos.id_pedido
        where tbl_pedidos.id_cliente = ${id};`;

        // Executa no banco de dados o script sql
        let rs = await prisma.$queryRawUnsafe(sql);

            return rs;
    
        } catch (error) {
            console.log(error);
            return false;
            
        }  
}

const insertCarrinho = async function(id_pedido, id_produto) {
    try {
        let sql = `INSERT INTO tbl_pedido_produto (id_pedido, id_produto) VALUES ('${id_pedido}', '${id_produto}')`

        let result = await prisma.$executeRawUnsafe(sql);
        
        if (result)
            return true;
        else
            return false;

        } catch (error) {
            console.log(error);
            return false;
        }

}


const updateCarrinho = async function(id, id_produto, bool) {
    try {
        let sql;

         sql = `UPDATE tbl_pedido_produto set id_pedido = ${id}, id_produto = ${id_produto}, status_view = ${bool} where id_pedido = ${id};`; 
                            

        let result = await prisma.$executeRawUnsafe(sql);
        
        if (result)
            return true;
        else
            return false;

        } catch (error) {
            console.log(error);
            return false;
        }

}


const deleteProdutoCarrinho = async(idP, idC) =>{
    try{

        let sql = `delete from tbl_pedido_produto 
        left join tbl_pedido on tbl_pedido_produto.id_pedido = tbl_pedido.id_pedido
         where tbl_pedido_produto.id_produto = ${idP} AND tbl_pedido.id_cliente = ${idC}`
       
        let rsdelete = await prisma.$executeRawUnsafe(sql)
       return rsdelete
    
        } catch(error){
            return false
        }
}

module.exports ={
    selectCarrinhoByCliente,
    insertCarrinho,
    updateCarrinho,
    deleteProdutoCarrinho
}
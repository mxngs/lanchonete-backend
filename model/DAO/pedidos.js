
// Importa de biblioteca do @prisma/client
const { PrismaClient } = require('@prisma/client')
const { sqltag } = require('@prisma/client/runtime/library');


// Instacia da classe PrismaClient
const prisma = new PrismaClient()


const selectAllPedidos = async function(){
    try {
        let sql = `select tbl_pedidos.*, tbl_produto.id_produto, tbl_produto.nome from tbl_pedidos 
        left join tbl_pedido_produto on tbl_pedidos.id_pedido = tbl_pedido_produto.id_pedido
        left join tbl_produto on tbl_produto.id_produto = tbl_pedido_produto.id_produto;`
    
       
        let rs = await prisma.$queryRawUnsafe(sql)
        return rs
    } catch (error) {
        console.log(error);
        return false
    }
}

const selectProdutoByPedido = async function(id) {
    try {
        let sql = `SELECT tbl_produto.id_produto, tbl_produto.nome, tbl_produto.valor, tbl_produto.foto FROM tbl_produto 
        JOIN tbl_pedido_produto ON tbl_produto.id_produto = tbl_pedido_produto.id_produto
        WHERE tbl_pedido_produto.id_pedido = ${id};`
    
       
        let rs = await prisma.$queryRawUnsafe(sql)
        return rs
    } catch (error) {
        console.log(error);
        return false
    }
}

const selectPedidobyID = async function(id){
    try {
        let sql = `select * from tbl_pedidos where id_pedido = ${id}`;
        let rsUsuario = await prisma.$queryRawUnsafe(sql);

            return rsUsuario;
    
        } catch (error) {
            console.log(error);
            return false;
            
        }
        
}

const insertPedido = async function(dadosPedido) {
    try {
        let sql;

         if (dadosPedido.desconto != '' && dadosPedido.desconto != null && dadosPedido.desconto != undefined) {
            sql = ` INSERT INTO tbl_pedidos (
                    data_pedido,
                    tempo_entrega,
                    taxa_entrega,
                    desconto,
                    id_cliente,
                    id_pagamento
                ) 
                VALUES 
                ('${dadosPedido.data_pedido}',
                '${dadosPedido.tempo_entrega}',
                '${dadosPedido.taxa_entrega}',
                '${dadosPedido.desconto}',
                '${dadosPedido.id_cliente}',
                '${dadosPedido.id_pagamento}'
                );`; 
         } else {
            sql = ` INSERT INTO tbl_pedidos (
                data_pedido,
                tempo_entrega,
                taxa_entrega,
                desconto,
                id_cliente,
                id_pagamento
            ) 
            VALUES 
            ('${dadosPedido.data_pedido}',
            '${dadosPedido.tempo_entrega}',
            '${dadosPedido.taxa_entrega}',
            null,
            '${dadosPedido.id_cliente}',
            '${dadosPedido.id_pagamento}'
            );`;
         }
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


const updatePedido = async function(id,dadosPedido) {
    try {
        let sql;

         if (dadosPedido.desconto != null && dadosPedido.desconto != '' && dadosPedido.desconto != undefined) {
            sql = `UPDATE tbl_pedidos SET
                            data_pedido = "${dadosPedido.data_pedido}",
                            tempo_entrega = "${dadosPedido.tempo_entrega}",
                            taxa_entrega = "${dadosPedido.taxa_entrega}",
                            desconto = "${dadosPedido.desconto}",
                            id_cliente = "${dadosPedido.id_cliente}",
                            id_pagamento = "${dadosPedido.id_pagamento}"
                            where tbl_pedidos.id_pedido = ${id};` 
                            ; 
         } else {
            sql = `UPDATE tbl_pedidos SET
                            data_pedido = "${dadosPedido.data_pedido}",
                            tempo_entrega = "${dadosPedido.tempo_entrega}",
                            taxa_entrega = "${dadosPedido.taxa_entrega}",
                            desconto = null,
                            id_cliente = "${dadosPedido.id_cliente}",
                            id_pagamento = "${dadosPedido.id_pagamento}"
                            where tbl_pedidos.id_pedido = ${id};` 
                            ; 
         }
                            

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


const lastIDPedido = async function(){
    try {
        let sql = `SELECT id_pedido FROM tbl_pedidos ORDER BY id_pedido DESC LIMIT 1;`

        let sqlID = await prisma.$queryRawUnsafe(sql)

        return sqlID
    } catch (error) {
        return false
    }
    
}

const deletePedido = async(id) =>{
    try{

        let sql = `delete from tbl_pedidos where id_pedido = ${id}`
       
        let rsdelete = await prisma.$executeRawUnsafe(sql)
       return rsdelete
    
        } catch(error){
            return false
        }
}


module.exports ={
    selectAllPedidos,
    selectPedidobyID,
    insertPedido,
    lastIDPedido,
    deletePedido,
    updatePedido,
    selectProdutoByPedido
}
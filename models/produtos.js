const sql = require('../config/db')

var Produto = function(produto) {
    this.nome_do_produto = produto.nome_do_produto;
    this.fabricante = produto.fabricante;
    this.quantidade_em_estoque = produto.quantidade_em_estoque;
    this.valor = produto.valor;
}

Produto.getAll = result => {
    sql.query("SELECT * FROM produtos", (err, res) => {
        if (err) {
            console.log('Erro: ', err)
            result(null, err)
            return
        }
        result(null, res)
    })
}

Produto.getById = (id, result) => {
    sql.query(`SELECT * FROM produtos WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log('Erro: ', err)
            result(null, err)
            return
        }
        if (res.length) {
            console.log('Produto: ', res[0])
            result(null, res[0])
            return
        } else {
            result({ kind: "nao_encontrado" }, null)
        }
    })
}

Produto.getProductQuantity = result => {
    sql.query("SELECT COUNT(id) AS 'Quantidade de Produtos Registrados' FROM produtos", (err, res) => {
        if (err) {
            console.log('Erro: ', err)
            result(null, err)
            return
        }
        result(null, res)
    })
}

Produto.getMin = result => {
    sql.query("SELECT * FROM produtos WHERE quantidade_em_estoque = (SELECT MIN(quantidade_em_estoque) FROM produtos)", (err, res) => {
        if (err) {
            console.log('Erro: ', err)
            result(null, err)
            return
        }
        result(null, res)
    })
}

Produto.getMax = result => {
    sql.query("SELECT * FROM produtos WHERE quantidade_em_estoque = (SELECT MAX(quantidade_em_estoque) FROM produtos)", (err, res) => {
        if (err) {
            console.log('Erro: ', err)
            result(null, err)
            return
        }
        result(null, res)
    })
}

Produto.getOutOfStock = result => {
    sql.query("SELECT * FROM produtos WHERE quantidade_em_estoque < 5", (err, res) => {
        if (err) {
            console.log('Erro: ', err)
            result(null, err)
            return
        }
        result(null, res)
    })
}

Produto.addNew = (novoProduto, result) => {
    sql.query("INSERT INTO produtos SET ?", novoProduto, (err, res) => {
        if (err) {
            console.log('Erro: ', err)
            result(null, err)
            return
        }
        console.log("Produto Cadastrado: ", { id: res.insertId, ...novoProduto })
        result (null, { id: res.insertId, ...novoProduto })
    })
}

Produto.update = (id, produto, result) => {
    sql.query(`UPDATE produtos SET ? WHERE id = ${id}`,
    produto,
    (err, res) => {
        if (err) {
            console.log('Erro: ', err)
            result(null, err)
            return
        }
        if (res.affectedRows == 0) {
            result({ kind: "nao_encontrado" }, null)
            return
        } else {
            console.log(`Produto de id: '${id}' atualizado: `, 'Campos atualizados: ', { ...produto })
            result(null, { id: id, ...produto })
        }
    })
}

Produto.delete = (id, result) => {
    sql.query(`DELETE FROM produtos WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log('Erro: ', err)
            result(null, err)
            return
        }
        if (res.affectedRows == 0) {
            result({ kind: "nao_encontrado" }, null)
            return
        } else {
            console.log(`Produto de id: '${id}' foi deletado`)
            result(null, res)
        }
    })
}

module.exports = Produto

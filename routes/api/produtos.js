const express = require("express")
const router = express.Router()
const Produto = require('../../models/produtos')

router.get('/BuscarProdutos', (req, res) => {
    Produto.getAll((err, data) => {
        if (err) {
            res.status(500).send({ message : err.message || "Server Error"})
        } else {
            res.send(data)
        }
    })
})

router.get('/BuscarProdutoPorId/:id', (req, res) => {
    Produto.getById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "nao_encontrado") {
                res.status(404).send({ message : `Erro: Não foi encontrado o produto com id ${req.params.id}` })
            } else {
                res.status(500).send({ message : err.message || "Server Error"})
            }
        } else {
            res.send(data)
        }
    })
})

router.get('/ObterQuantidadeProdutos', (req, res) => {
    Produto.getProductQuantity((err, data) => {
        if (err) {
            res.status(500).send({ message : err.message || "Server Error"})
        } else {
            res.send(data)
        }
    })
})

router.get('/ObterProdutoComMenorEstoque', (req,res) => {
    Produto.getMin((err, data) => {
        if (err) {
            res.status(500).send({ message : err.message || "Server Error"})
        } else {
            res.send(data)
        }
    })
})

router.get('/ObterProdutoComMaiorEstoque', (req,res) => {
    Produto.getMax((err, data) => {
        if (err) {
            res.status(500).send({ message : err.message || "Server Error"})
        } else {
            res.send(data)
        }
    })
})

router.get('/ObterProdutosSemEstoque', (req,res) => {
    Produto.getOutOfStock((err, data) => {
        if (err) {
            res.status(500).send({ message : err.message || "Server Error"})
        } else {
            res.send(data)
        }
    })
})

router.post('/AdicionarProduto', (req,res) => {
    if (!req.body) {
        res.status(400).send({ message: "Conteúdo não pode estar vazio"})
    } else {
        const produto = new Produto({
            nome_do_produto: req.body.nome_do_produto,
            fabricante: req.body.fabricante,
            quantidade_em_estoque: req.body.quantidade_em_estoque,
            valor: req.body.valor
        })
        Produto.addNew(produto, (err, data) => {
            if (err) {
                res.status(500).send({ message : err.message || "Server Error"})
            } else {
                res.send(data)
            }
        })
    }
})

router.patch('/AlterarProduto/:id', (req,res) => {
    if (!req.body) {
        res.status(400).send({ message: "Conteúdo não pode estar vazio"})
    } else {
        const update = new Produto(req.body)
        for (const [chave, valor] of Object.entries(update)){
            if (!valor){
                delete update[chave]
            }
        }        
        Produto.update(req.params.id, update, (err, data) => {
            if (err) {
                if (err.kind === "nao_encontrado") {
                    res.status(404).send({ message : `Erro: Não foi encontrado o produto com id ${req.params.id}` })
                } else {
                    console.log("req body: ", req.body)
                    res.status(500).send({ message : err.message || "Server Error"})
                }
            }
            else {
                res.send(data)
            }
                    
        })
    }
})

router.delete('/DeletarProduto/:id', (req,res) => {
    Produto.delete(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "nao_encontrado") {
                res.status(404).send({ message : `Erro: Não foi encontrado o produto com id ${req.params.id}` })
            } else {
                res.status(500).send({ message : err.message || "Server Error"})
            }
        }
        else {
            res.send({ message: `Produto com id ${req.params.id} foi deletado com sucesso`})
        }
    })
})

module.exports = router

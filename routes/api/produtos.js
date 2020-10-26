const express = require("express")
const router = express.Router()
const Produto = require('../../models/produtos')

// @rota     GET /produto
// @desc     LISTAR produto
// @acesso   Público
router.get('/BuscarProdutos', (req, res) => {
    Produto.getAll((err, data) => {
        if (err) {
            res.status(500).send({ message : err.message || "Server Error"})
        } else {
            res.send(data)
        }
    })
})

// @rota     GET /produto:id
// @desc     DETALHAR produto
// @acesso   Público
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

// @rota     GET /produto
// @desc     LISTAR quantidade de produtos
// @acesso   Público
router.get('/ObterQuantidadeProdutos', (req, res) => {
    Produto.getProductQuantity((err, data) => {
        if (err) {
            res.status(500).send({ message : err.message || "Server Error"})
        } else {
            res.send(data)
        }
    })
})

// @rota     GET /produto
// @desc     DETALHAR produto com menor quantidade
// @acesso   Público
router.get('/ObterProdutoComMenorEstoque', (req,res) => {
    Produto.getMin((err, data) => {
        if (err) {
            res.status(500).send({ message : err.message || "Server Error"})
        } else {
            res.send(data)
        }
    })
})

// @rota     GET /produto
// @desc     DETALHAR produto com maior quantidade
// @acesso   Público
router.get('/ObterProdutoComMaiorEstoque', (req,res) => {
    Produto.getMax((err, data) => {
        if (err) {
            res.status(500).send({ message : err.message || "Server Error"})
        } else {
            res.send(data)
        }
    })
})

// @rota     GET /produto
// @desc     DETALHAR produto com quantidade menor que 5
// @acesso   Público
router.get('/ObterProdutosSemEstoque', (req,res) => {
    Produto.getOutOfStock((err, data) => {
        if (err) {
            res.status(500).send({ message : err.message || "Server Error"})
        } else {
            res.send(data)
        }
    })
})

// @rota     POST /produto
// @desc     CRIAR produto
// @acesso   Público
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
        if (produto.quantidade_em_estoque > 4294967295 || produto.valor > 4294967295) {
            res.send("'Quantidade em estoque' ou 'Valor' não podem ser maiores do que 4294967295")
            return
        }
        Produto.addNew(produto, (err, data) => {
            if (err) {
                res.status(500).send({ message : err.message || "Server Error"})
            } else {
                res.send(data)
            }
        })
    }
})

// @rota     PATCH /produto:id
// @desc     EDITAR produto
// @acesso   Público
router.patch('/AlterarProduto/:id', (req,res) => {
    if (!req.body) {
        res.status(400).send({ message: "Conteúdo não pode estar vazio"})
    } else {
        const update = new Produto(req.body)
        if (update.quantidade_em_estoque > 4294967295 || update.valor > 4294967295) {
            res.send("'Quantidade em estoque' ou 'Valor' não podem ser maiores do que 4294967295")
            return
        }
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

// @rota     DELETE /produto:id
// @desc     DELETAR produto
// @acesso   Público
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

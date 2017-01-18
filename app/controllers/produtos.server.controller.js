/**
 * Created by Vittorio on 30/05/2016.
 */
var Produtos = require('mongoose').model('Produto');
var Estudos = require('mongoose').model('Estudo');
var ncms = require('./ncms.server.controller.js');
var fornecedores = require('./fornecedores.server.controller');

var fs = require('fs');
var gutil = require('gulp-util');
var path = require('path');

exports.create = function(req, res) {
    var produto = new Produtos(req.body);
    produto.save(function (err) {
        if(err) {
            return res.status(400).send({
                message: err
            });
        } else {
            add_ncm(req, res, produto);
            add_fornecedor(req, res, produto);
            res.json(produto);
        }
    });
};

exports.list = function(req, res) {
    Produtos.find().populate('ncm').populate('fornecedor').exec(function (err, produtos) {
        if(err) {
            return res.status(400).send({
                message: err
            });
        } else {
            res.json(produtos);
        }
    });
};

exports.read = function(req, res) {
    res.send(req.produto);
};

exports.delete = function(req, res) {
    var produto = req.produto;
    var img_url = produto.img_url;
    produto.remove(function (err) {
        if(err) {
            return res.status(400).send({
                message: err
            });
        } else {
            removeImageFile(img_url);
            delete_ncm(req, res);
            delete_fornecedor(req, res);
            res.json(produto);
        }
    });
};

exports.update = function(req, res) {
    var produto = req.produto;
    var img_url_deletion = false;
    if(produto.img_url !== req.body.img_url) {
        img_url_deletion = produto.img_url;
    }
    produto.nome = req.body.nome;
    produto.modelo = req.body.modelo;
    produto.descricao = req.body.descricao;
    produto.custo_usd = req.body.custo_usd;
    produto.moq = req.body.moq;
    produto.ncm = req.body.ncm._id;
    produto.usa_impostos_ncm = req.body.usa_impostos_ncm;
    produto.impostos = req.body.impostos;
    produto.medidas = req.body.medidas;
    produto.website = req.body.website;
    produto.notas = req.body.notas;
    produto.img_url = req.body.img_url;
    produto.fornecedor = req.body.fornecedor;
    produto.save(function (err, produto) {
        if(err) {
            return res.status(400).send({
                message: err
            });
        } else {
            if(img_url_deletion) {
                removeImageFile(img_url_deletion);
            }
            update_ncm(req, res);
            update_fornecedor(req, res);
            res.json(produto);
        }
    });
};

exports.findById = function(req, res, next, id) {
    Produtos.findById(id).populate('_estudoId').populate('ncm').populate({
        path: 'fornecedor',
        populate: {path: 'cidade_fornecedor', populate: {path: 'estado_cidade'}}
    }).exec(function (err, produto) {
        if(err) return next(err);
        if(!produto) return next(new Error(`Failed to load produto id: ${id}`));
        req.produto = produto;
        next();
    });
};

exports.findByIdOld = function(req, res, next, id) {
    Produtos.findById(id).exec(function (err, produto) {
        if(err) return next(err);
        if(!produto) return next(new Error(`Failed to load produto id: ${id}`));
        req.produto = produto;
        next();
    });
    Produtos.findById(id).populate('ncm').populate('_estudoId').populate('fornecedor').exec(function (err, produto) {
        if(err) return next(err);
        if(!produto) return next(new Error(`Failed to load produto id: ${id}`));
        req.produto = produto;
        next();
    });
};

exports.update_produto_do_estudo = function(req, res) {
    Produtos.findById(req.params.produtoId).exec(function (err, produto) {
        if(err) {
            return res.status(400).send({
                message: err
            });
        } else {
            produto._estudoId.push(req.params.estudoId);
            produto.save();
        }
    });
};

function removeImageFile(filePath) {
    if(path.basename(filePath) !== 'no-thumb.png') { // Testa para não apagar a imagem default - no-thumb
        filePath = path.join(__dirname, '../', filePath);
        fs.exists(filePath, function(exists) {
            if(exists) {
                //Show in green
                console.log(gutil.colors.green('Image file exists. Deleting now ...'));
                fs.unlink(filePath);
            } else {
                //Show in red
                console.log(gutil.colors.red('File not found, so not deleting.'));
            }
        });
    }
}

// Funçoes para atualizar objectIds em outros objetos.
function add_ncm(req, res, produto) {
    req.params.produtoId = produto._id;
    req.params.ncmId = produto.ncm;
    ncms.update_ncm_produto(req, res);
}
function update_ncm(req, res) {
    req.params.ncmId = req.body.ncm._id;
    ncms.update_ncm_produto(req, res);
}
function delete_ncm(req, res) {
    req.params.ncm = req.produto.ncm._id;
    ncms.delete_ncm_produto(req, res);
}


function add_fornecedor(req, res, produto) {
    req.params.produtoId = produto._id;
    req.params.fornecedorId = produto.fornecedor;
    fornecedores.update_fornecedor_do_produto(req, res);
}
function update_fornecedor(req, res) {
    req.params.fornecedorId = req.produto.fornecedor;
    fornecedores.update_fornecedor_do_produto(req, res);
}
function delete_fornecedor(req, res) {
    req.params.fornecedorId = req.produto.fornecedor._id;
    fornecedores.delete_fornecedor_do_produto(req, res);
}

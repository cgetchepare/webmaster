const Usuario = require('../models/Usuario');
const Role = require('../models/Role');

const bcrypt = require('bcryptjs');

module.exports = {

    async list(req, res) {
        await Usuario.findAll({ order: [['id', 'DESC']] }).then(function (usuarios) {
            return res.json({
                erro: false,
                usuarios
            });
        }).catch(function () {
            return res.json({
                erro: true,
                mensagem: "Erro: Nenhum usuário encontrado!"
            });
        });
    },

    async view(req, res) {

        await Usuario.findByPk(req.params.id).
            then(usuario => {
                return res.json({
                    erro: false,
                    usuario
                });
            }).catch(function () {
                return res.json({
                    erro: true,
                    messagem: "Erro: Usuário não encontrado!"
                });
            });
    },

   async store(req, res) {

    var dados = req.body;

    dados.senha = await bcrypt.hash(dados.senha, 8);

    role = await Role.findByPk(dados.role_id);

    if (!role) {
        return res.json({ 
            erro: true, 
            mensagem: "Erro: Role não encontrada!"
        })
    }

    await Usuario.create(dados).then(function () {
        return res.json({
            erro: false,
            mensagem: "Usuário cadastrado com sucesso!"
        });
    }).catch(function () {
        return res.json({
            erro: true,
            mensagem: "Usuário não cadastrado com sucesso!"
        });
    });
},

       /* try {

            // const { role_id } = req.params;
            const { nome, email, senha, role_id } = req.body;

            var salt = bcrypt.genSaltSync(8);
            var hash = bcrypt.hashSync(senha, salt);

            const role = await Role.findByPk(role_id);

            if (!role) {
                console.log('Role não encontrada!');
                return res.status(400).json({
                    erro: true,
                    mensagem: 'Erro: Role não encontrada!'
                });
            }

            const usuario = await Usuario.create({
                nome,
                email,
                senha: hash,
                role_id
            });
            return res.status(200).json(usuario);
        } catch (err) {
            return res.status(400).json({ erro: err });
        }
    },
*/


  /*  await Usuario.create(dados).then(function () {
        return res.json({
            erro: false,
            mensagem: "Usuário cadastrado com sucesso!"
        });
    }).catch(function () {
        return res.json({
            erro: true,
            mensagem: "Usuário não cadastrado com sucesso!"
        });
    });
       */

       async edit(req, res) {
        var dados = req.body;
        dados.senha = await bcrypt.hash(dados.senha, 8);

        await Usuario.update(dados, { where: { id: dados.id } }).
            then(function () {
                return res.json({
                    erro: false,
                    mensagem: "Usuário editado com sucesso!"
                });
            }).catch(function () {
                return res.json({
                    erro: true,
                    mensagem: "Erro: Usuário não editado com sucesso!"
                });
            });
    },

    async delete(req, res) {
        await Usuario.destroy({ where: { id: req.params.id } }).
            then(function () {
                return res.json({
                    erro: false,
                    mensagem: "Usuário apagado com sucesso!"
                });
            }).catch(function () {
                return res.json({
                    erro: true,
                    mensagem: "Erro: Usuário não apagado com sucesso!"
                });
            });
    }
}


const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const Usuario = require('../models/Usuario');

module.exports = {

  async auth(req, res) {

    const usuario = await Usuario.findOne({ where: { email: req.body.usuario } });
    if (usuario === null) {
        return res.json({
            erro: true,
            mensagem: "Erro: Usuário ou senha incorreta!"
        });
    }

    if (!(await bcrypt.compare(req.body.senha, usuario.senha))) {
        return res.json({
            erro: true,
            mensagem: "Erro: Usuário ou senha incorreta!"
        });
    }

    var token = jwt.sign({ id: usuario.id }, process.env.SECRET, {
        expiresIn: 600  // 10 min
        // expiresIn: 1d 
    });

    return res.json({
        erro: false,
        mensagem: "Login realizado com sucesso!",
        dados: req.body,
        token
    });
  }
}


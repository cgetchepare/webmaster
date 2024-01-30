const Role = require('../models/Role');

module.exports = {

  async index(req, res) {
    const roles = await Role.findAll();

    return res.json(roles);
  },

  async store(req, res) {
    const { rl } = req.body;
    const role = await Role.create({ rl });
    return res.json(role);
  }
}


const { Model, DataTypes } = require('sequelize');

class Role extends Model {
  static init(sequelize) {
    super.init({
      rl: DataTypes.STRING
    }, {
      sequelize,
      tableName: "roles",
      timestamps: true
    })
  }

  static associate(models) {
    this.hasMany(models.Usuario, { foreignKey: 'role_id', as: 'usuarios' });
  }
}

module.exports = Role;
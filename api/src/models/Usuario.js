const { Model, DataTypes, UUID } = require('sequelize');

class Usuario extends Model {
  static init(sequelize) {
    super.init({
      nome: DataTypes.STRING,
      email: DataTypes.STRING,
      senha: DataTypes.STRING,

    }, {
      sequelize,
      tableName: "usuarios",
      email: UUID,
      timestamps: true,
    })
  }
  static associate(models) {
    this.belongsTo(models.Role, { foreignKey: 'role_id', as: 'role' });
  }
}

module.exports = Usuario;



/*const db = require('../config/db');
const Sequelize = require('sequelize');

const Usuario = db.define('usuarios', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

Usuario.sync();

module.exports = Usuario;
*/

/*
const { Model, DataTypes, UUID } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,

    }, {
      sequelize,
      tableName: "users",
      username: UUID,
      email: UUID,
      timestamps: true,
      freezeTableName: true,
      instanceMethods: {
        generateHash(password) {
          return bcrypt.hash(password, bcrypt.genSaltSync(10));
        },
        validPassword(password) {
          return bcrypt.compare(password, this.password);
        }
      }
    })
  }
  static associate(models) {
    this.belongsTo(models.Role, { foreignKey: 'role_id', as: 'role' });
  }

}

module.exports = User;


*/

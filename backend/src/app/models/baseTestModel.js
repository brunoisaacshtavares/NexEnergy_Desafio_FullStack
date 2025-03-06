const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    logging: false
  }
);

const BaseTest = sequelize.define('base_test', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  unidade_consumidora: {
    type: DataTypes.BIGINT,
    allowNull: true
  },
  status: {
    type: DataTypes.STRING(10),
    allowNull: true
  },
  mes: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  valor_cobrado: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  valor_economia: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  valor_fatura_concessionaria: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  }
}, {
  tableName: 'base_test',
  timestamps: false
});

async function getConsumerUnitEconomies() {
  const [results] = await sequelize.query(`
    SELECT 
      unidade_consumidora,
      CONCAT(
        ROUND(
          (SUM(valor_economia) / SUM(valor_cobrado + valor_economia + valor_fatura_concessionaria)) * 100, 1
        ),
        '%'
      ) AS porcentagem_economia
    FROM base_test
    GROUP BY unidade_consumidora;
  `);
  return results;
}

module.exports = { BaseTest, getConsumerUnitEconomies, sequelize };

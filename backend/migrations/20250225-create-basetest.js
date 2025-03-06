'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('base_test', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      unidade_consumidora: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      status: {
        type: Sequelize.STRING(10),
        allowNull: true
      },
      mes: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      valor_cobrado: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },
      valor_economia: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },
      valor_fatura_concessionaria: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('base_test');
  }
};

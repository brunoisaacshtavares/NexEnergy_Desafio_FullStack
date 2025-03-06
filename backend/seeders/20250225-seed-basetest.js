'use strict';

const fs = require('fs');
const csv = require('csv-parser');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return new Promise((resolve, reject) => {
      const records = [];
      fs.createReadStream('base_teste.csv')
        .pipe(csv())
        .on('data', (row) => {
          records.push({
            
            unidade_consumidora: row.unidade_consumidora ? parseInt(row.unidade_consumidora, 10) : null,
            status: row.status || null,
            mes: row.mes || null,
            valor_cobrado: row.valor_cobrado ? parseFloat(row.valor_cobrado) : null,
            valor_economia: row.valor_economia ? parseFloat(row.valor_economia) : null,
            valor_fatura_concessionaria: row.valor_fatura_concessionaria ? parseFloat(row.valor_fatura_concessionaria) : null
          });
        })
        .on('end', async () => {
          try {
            await queryInterface.bulkInsert('base_test', records, {});
            console.log('Dados inseridos com sucesso na tabela base_test!');
            resolve();
          } catch (err) {
            console.error('Erro ao inserir dados no banco:', err);
            reject(err);
          }
        })
        .on('error', (err) => {
          console.error('Erro ao ler o CSV:', err);
          reject(err);
        });
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('base_test', null, {});
  }
};

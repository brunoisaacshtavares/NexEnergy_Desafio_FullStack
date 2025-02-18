require('dotenv').config(); 
const express = require('express');
const cors = require('cors'); 
const { Sequelize, DataTypes } = require('sequelize');
const csv = require('csv-parser');
const fs = require('fs');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173'
}));


async function createDatabaseIfNotExists() {
  const sequelizeMaster = new Sequelize('', process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    logging: false,
  });

  try {
    await sequelizeMaster.authenticate();
    
    const [results] = await sequelizeMaster.query(`
      SELECT SCHEMA_NAME 
      FROM INFORMATION_SCHEMA.SCHEMATA 
      WHERE SCHEMA_NAME = '${process.env.DB_NAME}'
    `);

    if (results.length > 0) {
      console.log(`Banco de dados '${process.env.DB_NAME}' já existe.`);
    } else {
      await sequelizeMaster.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
      console.log(`Database '${process.env.DB_NAME}' Não existe em seu dispositivo.`);
      console.log(`Database '${process.env.DB_NAME}' criada em seu banco de dados com sucesso.`);
    }
  } catch (error) {
    console.error('Erro ao criar/verificar o banco de dados:', error);
    throw error;
  } finally {
    await sequelizeMaster.close();
  }
}


const sequelize = new Sequelize(
  process.env.DB_NAME,        
  process.env.DB_USER,        
  process.env.DB_PASSWORD,    
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    logging: false,
  }
);


const BaseTest = sequelize.define('base_test', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
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


async function initDB() {
  try {
    
    await createDatabaseIfNotExists();
    await BaseTest.sync();
    console.log('Tabela "base_test" sincronizada.');
  } catch (error) {
    console.error('Erro ao inicializar o banco de dados:', error);
  }
}


async function loadCSVData() {
  try {
    const count = await BaseTest.count();
    if (count > 0) {
      console.log('Tabela base_test já possui dados. Pulando importação do CSV.');
      return;
    }

    const records = [];

    fs.createReadStream('base_teste.csv')
      .pipe(csv())
      .on('data', (row) => {
        records.push({
          id: row.id ? parseInt(row.id, 10) : null,
          unidade_consumidora: row.unidade_consumidora ? parseInt(row.unidade_consumidora, 10) : null,
          status: row.status || null,
          mes: row.mes || null,
          valor_cobrado: row.valor_cobrado ? parseFloat(row.valor_cobrado) : null,
          valor_economia: row.valor_economia ? parseFloat(row.valor_economia) : null,
          valor_fatura_concessionaria: row.valor_fatura_concessionaria ? parseFloat(row.valor_fatura_concessionaria) : null
        });
      })
      .on('end', async () => {
        console.log('Leitura do CSV concluída. Inserindo dados no banco...');
        try {
          await BaseTest.bulkCreate(records);
          console.log('Dados inseridos com sucesso na tabela base_test!');
        } catch (bulkErr) {
          console.error('Erro ao inserir dados no banco:', bulkErr);
        }
      })
      .on('error', (err) => {
        console.error('Erro ao ler o CSV:', err);
      });
  } catch (error) {
    console.error('Erro ao carregar dados do CSV:', error);
  }
}


app.get('/consumer-unit-economies', async (req, res) => {
  try {
    const [results] = await sequelize.query(`
      SELECT 
        unidade_consumidora,
        CONCAT(
          ROUND(
            (SUM(valor_economia) / SUM(valor_cobrado + valor_economia + valor_fatura_concessionaria)) * 100
          , 1),
          '%'
        ) AS porcentagem_economia
      FROM base_test
      GROUP BY unidade_consumidora;
    `);
    return res.json(results);
  } catch (error) {
    console.error('Erro ao executar a consulta:', error);
    return res.status(500).json({ error: 'Erro ao consultar banco de dados' });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  await initDB();
  await loadCSVData();
});


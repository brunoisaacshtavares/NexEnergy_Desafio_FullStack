# **Monitoramento de Economia – Nex Energy**  
📌 **Desenvolvido por:** Bruno Isaac Sanches Tavares  

![image](https://github.com/user-attachments/assets/adeded05-b772-43b7-be31-737a748364c2)


## **📌 Descrição do Projeto**  
Este projeto é uma aplicação **Full Stack** desenvolvida para calcular e listar a economia agrupada por unidade consumidora. A solução foi construída utilizando **ReactJS** no frontend e **Node.js** no backend, utilizando **MySQL** como banco de dados e **Sequelize** como ORM para gerenciamento da base de dados.  

A API fornece endpoints RESTful para consulta das economias e implementa **paginação**, garantindo maior performance e organização dos dados. No frontend, o consumo dos dados ocorre de forma dinâmica, com **React Query (useQuery)** e **useState** para gerenciamento de estado. Além disso, a interface foi estilizada utilizando **CSS Customizado** com possibilidade de expansão para frameworks modernos.  

---

## **🛠️ Tecnologias Utilizadas**  

### **📌 Backend**  
- **Node.js** – Plataforma JavaScript para execução no servidor.  
- **Express.js** – Framework minimalista para criação de APIs REST.  
- **Sequelize** – ORM para abstração de consultas ao banco de dados.  
- **MySQL** – Banco de dados relacional utilizado no projeto.  
- **csv-parser** – Biblioteca para leitura e processamento do arquivo CSV.  
- **dotenv** – Gerenciador de variáveis de ambiente.  
- **cors** – Middleware para configuração de segurança da API.  

### **📌 Frontend**  
- **React.js** – Biblioteca JavaScript para construção da interface interativa.  
- **Vite.js** – Ferramenta de build otimizada para React.  
- **Axios** – Cliente HTTP para comunicação com a API.  
- **React Query** – Gerenciamento de estado e cache das requisições.  
- **CSS Customizado** – Estilização flexível e adaptável à interface.  

---

## **🚀 Como Rodar o Projeto**  

### **📌 Clonando o Repositório**
```bash
git clone <URL_DO_REPOSITORIO>
cd NEXENERGY_DESAFIO_FULLSTACK
```

### **📌 Configuração do Backend**  
```bash
cd backend
npm install
```

Crie um arquivo `.env` na raiz do backend e adicione os dados do banco de dados:  
```
DB_HOST=127.0.0.1
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=base_teste  
DB_DIALECT=mysql //Banco de dados utilizado no projeto
DB_PORT=3306 // Porta respectiva ao Banco de Dados
PORT=3000 // Porta que vai ser aberta no servidor para o seu Back end
```

Inicie o servidor:  
```bash
node server.js
```

### **📌 Configuração do Frontend**  
```bash
cd ../frontend
npm install
```

### **📌 Frontend**

Inicie o servidor:  
```bash
npm run dev
```
Acesse a aplicação em:  
👉 [http://localhost:5173](http://localhost:5173)

---


## **🛢️ Estrutura do Banco de Dados**  

📌 **Nome do Banco de Dados:** `base_teste`  
📌 **Tabela:** `consumer_unit_economies`  

| **Campo**                                | **Tipo de Dado** | **Descrição**                                    |
|------------------------------------------|------------------|------------------------------------------------|
| `id`                                     | BIGINT           | Identificador único da unidade consumidora.     |
| `unidade_consumidora`                    | BIGINT           | Número da unidade consumidora.                 |
| `status`                                 | TEXT             | Status da unidade.                             |
| `mes`                                    | DATE             | Mês de referência do consumo.                  |
| `valor_cobrado`                          | REAL             | Valor total cobrado.                           |
| `valor_economia`                         | REAL             | Valor economizado.                             |
| `valor_fatura_concessionaria`            | REAL             | Valor da conta da distribuidora.               |

---

## **📡 Endpoints da API**  

### **🔹 Buscar todas as economias agrupadas por unidade consumidora**
📌 **Rota:** `GET /consumer-unit-economies`  
📌 **Descrição:** Retorna todas as unidades consumidoras com seus respectivos valores de economia. 

📌 **Exemplo de Resposta JSON:**  
```json
[
  {
    "unidade_consumidora": 123456,
    "porcentagem_economia": "12.5%"
  },
  {
    "unidade_consumidora": 789012,
    "porcentagem_economia": "8.3%"
  }
]
```

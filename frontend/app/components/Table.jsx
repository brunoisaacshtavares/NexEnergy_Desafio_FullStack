import React, { useState } from 'react';

function Tasks({ data }) { 
  const [page, setPage] = useState(1);
  const limit = 18;

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = data.slice(startIndex, endIndex);

  return (
    <div className="container">
      <h1 className="titulo">Economia UCs</h1>
      {data.length === 0 ? (
        <p>Carregando Dados...</p>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>UNIDADE CONSUMIDORA</th>
                <th>PORCENTAGEM ECONOMIA</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item) => (
                <tr key={item.unidade_consumidora}>
                  <td>{item.unidade_consumidora}</td>
                  <td>{item.porcentagem_economia}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button
              onClick={() => setPage(page > 1 ? page - 1 : 1)}
              disabled={page === 1}
            >
              Anterior
            </button>
            <button
              onClick={() => setPage(endIndex < data.length ? page + 1 : page)}
              disabled={endIndex >= data.length}
            >
              Próxima
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Tasks;

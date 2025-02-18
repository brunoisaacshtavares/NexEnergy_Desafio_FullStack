import React, { useState, useEffect } from "react";
import axios from "axios";


function Tasks() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 18; 

  useEffect(() => {
    axios
      .get("http://localhost:3000/consumer-unit-economies")
      .then((response) => setData(response.data))
      .catch((error) => console.error("Erro ao buscar os dados:", error));
  }, []);

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = data.slice(startIndex, endIndex);

  return (
    
    <div className="container">
      <h1 className = "titulo">Economia UCs</h1>
      {data.length === 0 ? (
        <p>CarrengandoDados...</p>
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
              onClick={() =>
                setPage(endIndex < data.length ? page + 1 : page)
              }
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

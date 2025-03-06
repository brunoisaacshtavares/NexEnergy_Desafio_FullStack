import { useState, useEffect } from 'react';
import axios from 'axios';
import Tasks from './components/Table';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/consumer-unit-economies')
      .then((response) => setData(response.data))
      .catch((error) => console.error('Erro ao buscar os dados:', error));
  }, []);

  return (
    <div>
      <Tasks data={data} />
    </div>
  );
}

export default App;

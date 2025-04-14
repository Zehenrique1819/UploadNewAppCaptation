// App.jsx
import React, { useState } from 'react';
import './App.css';
import CalibrationForm from './CalibrationForm';

export default function App() {
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [data, setData] = useState([
    {
      codigo: "EQP001",
      equipamento: "Ventilador Pulmonar",
      numeroSerie: "VP-001-A",
      ultimaCalibracao: "2024-10-15"
    },
    {
      codigo: "EQP002",
      equipamento: "Balança de Precisão",
      numeroSerie: "BP-2023",
      ultimaCalibracao: "2024-11-01"
    },
    {
      codigo: "EQP003",
      equipamento: "Termômetro Infravermelho",
      numeroSerie: "TI-5487",
      ultimaCalibracao: "2025-01-20"
    }
  ]);
  

  const handleSearch = () => {
    const result = data.filter(item => item.codigo.includes(search));
    setSearchResults(result);
    setSearchTriggered(true);
  };
  
  

  const handleOpenForm = (item = null) => {
    setSelectedItem(item);
    setShowForm(true);
  };

  const handleSave = (newData) => {
    setData([...data, newData]); // adiciona à lista
    handleCloseForm(); // fecha o formulário
  };

  const handleCloseForm = () => {
    setSelectedItem(null);
    setShowForm(false);
  };

  return (
    <div className="container">
      {showForm ? (

        <CalibrationForm
            item={selectedItem}
            onClose={handleCloseForm}
            onSave={handleSave}
/>
      ) : (
        <>
          <div className="header">CALIBRAÇÃO</div>

          <div className="search-section">
  <input
    type="text"
    placeholder="PESQUISA"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

  <button className="search-btn" onClick={handleSearch}>🔍 Buscar</button>

  <button className="add-btn" onClick={() => handleOpenForm()}>
    NOVA CALIBRAÇÃO
  </button>
</div>

<div className="result-section">
  {searchTriggered && searchResults.length === 0 ? (
    <div className="no-result">Nenhum Resultado Encontrado</div>
  ) : (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Código</th>
          <th>Equipamento</th>
          <th>Nº Série</th>
          <th>Ultima Calibraçao</th>
        </tr>
      </thead>
      <tbody>
        {searchResults.map((item, index) => (
          <tr key={index} onClick={() => handleOpenForm(item)} style={{ cursor: 'pointer' }}>
            <td>➕</td>
            <td>{item.codigo}</td>
            <td>{item.equipamento}</td>
            <td>{item.numeroSerie}</td>
            <td>{item.ultimaCalibraçao}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>


          <div className="bottom-nav">
            <span>🎯</span>
            <span>⚙️</span>
            <span>🏠</span>
            <span>🛠️</span>
            <span>🛡️</span>
            <span>☰</span>
          </div>
        </>
      )}
    </div>
  );
}

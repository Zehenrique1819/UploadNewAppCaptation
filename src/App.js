import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';

import CalibrationForm from './components/CalibrationForm';
import CalibrationRead from './components/CalibrationRead';

export default function App() {
  const navigate = useNavigate();
  const [equipamentoSelecionado, setEquipamentoSelecionado] = useState(null);

  return (
    <div className="container">
      <Routes>
        <Route
          path="/"
          element={
            <MainScreen
              onNavigate={() => navigate('/novo-equipamento')}
              onSelectItem={(item) => {
                setEquipamentoSelecionado(item);
                navigate('/novo-equipamento');
              }}
            />
          }
        />

        <Route
          path="/novo-equipamento"
          element={
            <CalibrationForm
              item={equipamentoSelecionado}
              onSave={(data) => {
                setEquipamentoSelecionado(data);
                navigate('/calibracao-avancada', { state: { equipamento: data } });
              }}
            />
          }
        />

        <Route
          path="/calibracao-avancada"
          element={<CalibrationRead />}
        />
      </Routes>
    </div>
  );
}

function MainScreen({ onNavigate, onSelectItem }) {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchTriggered, setSearchTriggered] = useState(false);

  const data = [
    { codigo: "EQP001", equipamento: "Ventilador Pulmonar", numeroSerie: "VP-001-A", ultimaCalibracao: "2024-10-15" },
    { codigo: "EQP002", equipamento: "Balança de Precisão", numeroSerie: "BP-2023", ultimaCalibracao: "2024-11-01" },
    { codigo: "EQP003", equipamento: "Termômetro Infravermelho", numeroSerie: "TI-5487", ultimaCalibracao: "2025-01-20" }
  ];

  const handleSearch = () => {
    const result = data.filter(item => item.codigo.includes(search));
    setSearchResults(result);
    setSearchTriggered(true);
  };

  return (
    <>
      <div className="header">CALIBRAÇÃO</div>
      <div className="search-section">
        <input type="text" placeholder="PESQUISA" value={search} onChange={(e) => setSearch(e.target.value)} />
        <button className="search-btn" onClick={handleSearch}>🔍 Buscar</button>
        <button className="add-btn" onClick={onNavigate}>NOVA CALIBRAÇÃO</button>
      </div>
      <div className="result-section">
        {searchTriggered && searchResults.length === 0 ? (
          <div className="no-result">Nenhum Resultado Encontrado</div>
        ) : (
          <table>
            <thead>
              <tr><th></th><th>Código</th><th>Equipamento</th><th>Nº Série</th><th>Última Calibração</th></tr>
            </thead>
            <tbody>
              {searchResults.map((item, index) => (
                <tr key={index} style={{ cursor: 'pointer' }} onClick={() => onSelectItem(item)}>
                  <td>➕</td><td>{item.codigo}</td><td>{item.equipamento}</td><td>{item.numeroSerie}</td><td>{item.ultimaCalibracao}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="bottom-nav">
        <span>🎯</span><span>⚙️</span><span>🏠</span><span>🛠️</span><span>🛡️</span><span>☰</span>
      </div>
    </>
  );
}
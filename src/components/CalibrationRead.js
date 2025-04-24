import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './CalibrationRead.css';

export default function CalibrationRead() {
  const [dacSections, setDacSections] = useState([{ id: 1 }]);
  const [nextDacId, setNextDacId] = useState(2);
  const [vcVmData, setVcVmData] = useState({ 1: [] });

  const location = useLocation();
  const equipamento = location.state?.equipamento;

  const handleAddDAC = () => {
    setDacSections((prev) => [...prev, { id: nextDacId }]);
    setVcVmData((prev) => ({ ...prev, [nextDacId]: [] }));
    setNextDacId((prev) => prev + 1);
  };

  const handleAddRow = (dacId) => {
    setVcVmData((prev) => ({
      ...prev,
      [dacId]: [...prev[dacId], { vc: '', vm: '' }]
    }));
  };

  const handleRemoveRow = (dacId, index) => {
    setVcVmData((prev) => ({
      ...prev,
      [dacId]: prev[dacId].filter((_, i) => i !== index)
    }));
  };

  const handleRemoveDAC = (dacId) => {
    setDacSections((prev) => prev.filter((dac) => dac.id !== dacId));
    setVcVmData((prev) => {
      const updated = { ...prev };
      delete updated[dacId];
      return updated;
    });
  };
  

  return (
    <div className="calibration-container">
      <div className="header">CALIBRAÇÃO</div>
      <div className="device-title">{equipamento?.equipamento || 'Equipamento não definido'}</div>

      {dacSections.map((dac) => (
        <div key={dac.id} className="dac-section">
          <div className="dac-title">DAC 0{dac.id}</div>
          <button className="add-btn" onClick={() => handleAddRow(dac.id)}>+</button>
          <button className="remove-btn" onClick={() => handleRemoveRow(dac.id)}>+</button>
          {vcVmData[dac.id].map((_, index) => (
            <div key={index} className="vc-vm-line">
              <div className="vc-vm-row">
                <input type="text" placeholder="VC" />
                <input type="text" placeholder="VM" />
                <input type="text" placeholder="VC" />
                <input type="text" placeholder="VM" />
                <input type="text" placeholder="VC" />
                <input type="text" placeholder="VM" />
              </div>
              <button className="remove-btn" onClick={() => handleRemoveRow(dac.id, index)}>-</button>
            </div>
          ))}
          <button className="add-btn" onClick={handleAddDAC}>Novo DAC</button>
          <button className="remove-btn" onClick={() => handleRemoveDAC(dac.id)}>Remover DAC</button>

        </div>
      ))}
    </div>
  );
}
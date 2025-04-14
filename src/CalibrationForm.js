import React, { useState } from 'react';
import './App.css';


function CalibrationForm({ item, onClose, onSave }) 
{
  const [formData, setFormData] = useState(() => ({
    codigo: item?.codigo || '',
    equipamento: item?.equipamento || '',
    fabricante: item?.fabricante || '',
    modelo: item?.modelo || '',
    numeroSerie: item?.numeroSerie || '',
    patrimonio: item?.patrimonio || '',
    departamento: item?.departamento || '',
    localizacao: item?.localizacao || '',
    subLocalizacao: item?.subLocalizacao || '',
    responsavel: item?.responsavel || '',
    empresa: item?.empresa || '',
    dataCadastro: item?.dataCadastro || '',
    controlado: item?.controlado || '',
    dataSaidaControle: item?.dataSaidaControle || '',
    execucao: item?.execucao || '',
    leitura: item?.leitura || '',
    frequencia: item?.frequencia || '',
    padrao: item?.padrao || '',
    procedimento: item?.procedimento || '',
    tecnologia: item?.tecnologia || '',
    propriedade: item?.propriedade || '',
    critico: item?.critico || '',
    dataAquisicao: item?.dataAquisicao || '',
    valorAquisicao: item?.valorAquisicao || '',
    garantia: item?.garantia || '',
    terminoGarantia: item?.terminoGarantia || '',
    calcularIncerteza: item?.calcularIncerteza || '',
  }));
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const renderInput = (label, name, type = "text", withAdd = false) => (
    <div className="input-group">
      <label>{label}</label>
      <div className={withAdd ? "input-flex" : "input-block"}>
        {type === 'select' ? (
          <select name={name} value={formData[name]} onChange={handleChange}>
            <option value="">Selecione</option>
            <option value="Opção 1">Opção 1</option>
            <option value="Opção 2">Opção 2</option>
          </select>
        ) : (
          <input
            type={type}
            name={name}
            value={formData[name]}
            onChange={handleChange}
          />
        )}
  
        {withAdd && (
          <button
            type="button"
            className="add-btn"
            onClick={() => handleAddItem(name)}
          >
            +
          </button>
        )}
      </div>
    </div>
  );

  const handleAddItem = (field) => {
    alert(`Adicionar novo item para: ${field}`);
    // Aqui você pode abrir um modal, ou adicionar item via setState depois
  };
  

  return (
    <div className="form-wrapper"> {/* <- Essa é a nova div que centraliza */}
      <form className="form-screen" onSubmit={handleSubmit}>
        <div className="header">CALIBRAÇÃO</div>
  
        <div className="form-scroll">
          {renderInput('Código', 'codigo')}
          {renderInput('Equipamento', 'equipamento', 'select')}
          {renderInput('Fabricante', 'fabricante')}
          {renderInput('Modelo', 'modelo')}
          {renderInput('Número de Série', 'numeroSerie')}
          {renderInput('Patrimônio', 'patrimonio')}
          {renderInput('Departamento', 'departamento', 'select', true)}
          {renderInput('Localização', 'localizacao', 'select', true)}
          {renderInput('Sub-Localização', 'subLocalizacao')}
          {renderInput('Responsável', 'responsavel', 'select', true)}
          {renderInput('Empresa', 'empresa', 'select')}
          {renderInput('Data de Cadastro', 'dataCadastro', 'date')}
          {renderInput('Controlado?', 'controlado', 'select')}
          {renderInput('Data Saída de Controle', 'dataSaidaControle', 'date')}
          {renderInput('Execução', 'execucao', 'select')}
          {renderInput('Leitura', 'leitura', 'select')}
          {renderInput('Frequência (Meses)', 'frequencia', 'number')}
          {renderInput('Padrão', 'padrao', 'select')}
          {renderInput('Procedimento', 'procedimento', 'select')}
          {renderInput('Tecnologia', 'tecnologia', 'select')}
          {renderInput('Propriedade', 'propriedade', 'select')}
          {renderInput('Crítico', 'critico', 'select')}
          {renderInput('Data de Aquisição', 'dataAquisicao', 'date')}
          {renderInput('Valor de Aquisição', 'valorAquisicao')}
          {renderInput('Garantia (Meses)', 'garantia', 'number')}
          {renderInput('Término da Garantia', 'terminoGarantia', 'date')}
          {renderInput('Calcular Incerteza', 'calcularIncerteza', 'select')}
        </div>
  
        <button type="submit" className="save-button">SALVAR</button>
        <button type="button" className="save-button" onClick={onClose}>
  Voltar
</button>

      </form>
    </div>
  );
  
}

export default CalibrationForm;

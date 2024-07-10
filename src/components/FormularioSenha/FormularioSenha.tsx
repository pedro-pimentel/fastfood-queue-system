import React, { useState } from 'react';
import './FormularioSenha.css';

interface FormularioSenhaProps {
  onAddSenha: (tipo: string) => void;
}

const FormularioSenha: React.FC<FormularioSenhaProps> = ({ onAddSenha }) => {
  const [tipo, setTipo] = useState<string>('salao');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddSenha(tipo);
  };

  return (
    <form onSubmit={handleSubmit} className="formulario-senha">
      <label>
        Tipo de Atendimento:
        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="salao">Salão</option>
          <option value="retirada">Retirada</option>
        </select>
      </label>
      <button type="submit">Adicionar Senha</button>
    </form>
  );
};

export default FormularioSenha;

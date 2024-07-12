import React, { useState } from 'react';
import './FormularioSenha.css';

type AtendimentoTipo = 'salao' | 'retirada';

interface FormularioSenhaProps {
  onAddSenha: (tipo: AtendimentoTipo, senhaPersonalizada?: string) => void;
}

const FormularioSenha: React.FC<FormularioSenhaProps> = ({ onAddSenha }) => {
  const [tipo, setTipo] = useState<AtendimentoTipo>('salao');
  const [senhaPersonalizada, setSenhaPersonalizada] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddSenha(tipo, senhaPersonalizada);
    setSenhaPersonalizada('');
  };

  return (
    <form onSubmit={handleSubmit} className="formulario-senha">
      <label>
        Tipo de Atendimento:
        <select value={tipo} onChange={(e) => setTipo(e.target.value as AtendimentoTipo)}>
          <option value="salao">Salão</option>
          <option value="retirada">Online</option>
        </select>
      </label>
      <label>
        Senha:
        <input
          type="text"
          value={senhaPersonalizada}
          onChange={(e) => setSenhaPersonalizada(e.target.value)}
          placeholder="Digite a senha"
        />
      </label>
      <button type="submit">Adicionar Senha</button>
    </form>
  );
};

export default FormularioSenha;

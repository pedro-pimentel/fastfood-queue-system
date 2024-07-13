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
    onAddSenha(tipo, senhaPersonalizada || undefined);
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
      {/* <button type="submit">Adicionar Senha</button> */}
      <button type="submit" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Adicionar Senha</button>

    </form>
  );
};

export default FormularioSenha;

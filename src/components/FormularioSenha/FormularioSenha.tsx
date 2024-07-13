import React, { useState } from 'react';
import 'flowbite';
import './FormularioSenha.css';

type AtendimentoTipo = 'salao' | 'retirada' | 'preferencial';

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
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto formulario-senha">
      <label htmlFor="tipoAtendimento" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipo de Atendimento</label>
      <select
        id="tipoAtendimento"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={tipo}
        onChange={(e) => setTipo(e.target.value as AtendimentoTipo)}
      >
        <option value="salao">Salão</option>
        <option value="retirada">Online</option>
        <option value="preferencial">Preferencial</option>
      </select>
      <div className="mb-5">
        <label htmlFor="senhaPersonalizada" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Senha</label>
        <input
          type="text"
          id="senhaPersonalizada"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={senhaPersonalizada}
          onChange={(e) => setSenhaPersonalizada(e.target.value)}
          placeholder="Digite a senha"
        />
      </div>
      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
    </form>
  );
};

export default FormularioSenha;
import React from 'react';
import 'flowbite';
import './FilaSenhas.css';

interface Senha {
  id: string;
  numero: string;
  status: string;
}

interface FilaSenhasProps {
  titulo: string;
  senhas: Senha[];
  ultimaSenhaChamada: string | null;
  onRemoverUltimaSenhaChamada?: () => void;
}

const FilaSenhas: React.FC<FilaSenhasProps> = ({ titulo, senhas, ultimaSenhaChamada, onRemoverUltimaSenhaChamada }) => {
  // Ordena as senhas em ordem decrescente
  const sortedSenhas = [...senhas].sort((a, b) => parseInt(b.id.split('-')[1]) - parseInt(a.id.split('-')[1]));

  return (
    // <div className="fila-container">
      <div className=" fila-container w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">{titulo}</h5>
        </div>
        <div className="flow-root">
          <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
            {sortedSenhas.map((senha) => (
              <li key={senha.id} className={`py-3 sm:py-4 senha ${senha.status} ${senha.id === ultimaSenhaChamada ? 'destaque' : ''}`}>
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img className="w-8 h-8 rounded-full" src={process.env.PUBLIC_URL + '/LOGO_X-BOM.png'} alt="Logo X-BOM"/>
                  </div>
                  <div className="flex-1 min-w-0 ms-4">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      <span>{senha.numero}</span>
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {ultimaSenhaChamada && onRemoverUltimaSenhaChamada && (
            <button className="remove-button" onClick={onRemoverUltimaSenhaChamada}>Remover Última Senha Chamada</button>
          )}
        </div>
      </div>
    // </div>
  );
};

export default FilaSenhas;
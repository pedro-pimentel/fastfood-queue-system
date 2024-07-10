import React from 'react';
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
}

const FilaSenhas: React.FC<FilaSenhasProps> = ({ titulo, senhas, ultimaSenhaChamada }) => {
  const sortedSenhas = [...senhas].sort((a, b) => {
    const aId = typeof a.id === 'string' ? parseInt(a.id.split('-')[1]) : 0;
    const bId = typeof b.id === 'string' ? parseInt(b.id.split('-')[1]) : 0;
    return bId - aId;
  });

  return (
    <div className="fila-container">
      <h2>{titulo}</h2>
      <ul>
        {sortedSenhas.map((senha) => (
          <li key={senha.id} className={`senha ${senha.status} ${senha.id === ultimaSenhaChamada ? 'destaque' : ''}`}>
            <span>{senha.numero}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilaSenhas;

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
  onRemoverUltimaSenhaChamada?: () => void;
}

const FilaSenhas: React.FC<FilaSenhasProps> = React.memo(({ titulo, senhas, ultimaSenhaChamada, onRemoverUltimaSenhaChamada }) => {
  const sortedSenhas = React.useMemo(() => {
    return [...senhas].sort((a, b) => {
      const aId = parseInt(a.id.split('-')[1], 10) || 0;
      const bId = parseInt(b.id.split('-')[1], 10) || 0;
      return bId - aId;
    });
  }, [senhas]);

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
      {ultimaSenhaChamada && onRemoverUltimaSenhaChamada && (
        <button className="remove-button" onClick={onRemoverUltimaSenhaChamada} aria-label="Remover Última Senha Chamada">Remover Última Senha Chamada</button>
      )}
    </div>
  );
});

export default FilaSenhas;
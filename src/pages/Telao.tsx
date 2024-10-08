import React, { useState, useEffect } from 'react';
import FilaSenhas from '../components/FilaSenhas/FilaSenhas';
import './Telao.css';

interface Senha {
  id: string;
  numero: string;
  status: string;
}

const Telao: React.FC = () => {
  const [senhasSalao, setSenhasSalao] = useState<Senha[]>([]);
  const [senhasRetirada, setSenhasRetirada] = useState<Senha[]>([]);
  const [senhasPreferencial, setSenhasPreferencial] = useState<Senha[]>([]);
  const [ultimaSenhaChamadaSalao, setUltimaSenhaChamadaSalao] = useState<string | null>(null);
  const [ultimaSenhaChamadaRetirada, setUltimaSenhaChamadaRetirada] = useState<string | null>(null);
  const [ultimaSenhaChamadaPreferencial, setUltimaSenhaChamadaPreferencial] = useState<string | null>(null);
  const [audioAllowed, setAudioAllowed] = useState<boolean>(false);

  useEffect(() => {
    const updateStateFromLocalStorage = () => {
      const storedSenhasSalao: Senha[] = JSON.parse(localStorage.getItem('senhasSalao') || '[]');
      const storedSenhasRetirada: Senha[] = JSON.parse(localStorage.getItem('senhasRetirada') || '[]');
      const storedSenhasPreferencial: Senha[] = JSON.parse(localStorage.getItem('senhasPreferencial') || '[]');
      setSenhasSalao(storedSenhasSalao);
      setSenhasRetirada(storedSenhasRetirada);
      setSenhasPreferencial(storedSenhasPreferencial);

      // Encontrar a última senha chamada em cada fila
      const lastChamadaSalao = localStorage.getItem('ultimaSenhaChamadaSalao');
      setUltimaSenhaChamadaSalao(lastChamadaSalao ? lastChamadaSalao : null);

      const lastChamadaRetirada = localStorage.getItem('ultimaSenhaChamadaRetirada');
      setUltimaSenhaChamadaRetirada(lastChamadaRetirada ? lastChamadaRetirada : null);

      const lastChamadaPreferencial = localStorage.getItem('ultimaSenhaChamadaPreferencial');
      setUltimaSenhaChamadaPreferencial(lastChamadaPreferencial ? lastChamadaPreferencial : null);
    };

    // Atualiza o estado inicial
    updateStateFromLocalStorage();

    // Adiciona o listener para o evento 'storage'
    window.addEventListener('storage', updateStateFromLocalStorage);

    // Remove o listener quando o componente é desmontado
    return () => {
      window.removeEventListener('storage', updateStateFromLocalStorage);
    };
  }, []);

  useEffect(() => {
    if (audioAllowed && (ultimaSenhaChamadaSalao || ultimaSenhaChamadaRetirada || ultimaSenhaChamadaPreferencial)) {
      const audio = new Audio(process.env.PUBLIC_URL + '/mixkit-home-standard-ding-dong-109.wav');
      audio.play();
    }
  }, [audioAllowed, ultimaSenhaChamadaSalao, ultimaSenhaChamadaRetirada, ultimaSenhaChamadaPreferencial]);

  const handleAudioPermission = () => {
    setAudioAllowed(true);
  };

  return (
    <div className="telao-container">
      {!audioAllowed && (
        <div className="audio-permission">
          <button onClick={handleAudioPermission} className="audio-permission-button">
            Allow Audio
          </button>
        </div>
      )}
      <div className="painel-senhas">
        <FilaSenhas titulo="Ficha" senhas={senhasSalao} ultimaSenhaChamada={ultimaSenhaChamadaSalao} />
        <FilaSenhas titulo="Retirada" senhas={senhasRetirada} ultimaSenhaChamada={ultimaSenhaChamadaRetirada} />
        <FilaSenhas titulo="Preferencial" senhas={senhasPreferencial} ultimaSenhaChamada={ultimaSenhaChamadaPreferencial} />
      </div>
    </div>
  );
};

export default Telao;
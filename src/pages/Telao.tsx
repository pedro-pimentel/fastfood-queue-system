import React, { useState, useEffect, useCallback } from 'react';
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
  const [ultimaSenhaChamadaSalao, setUltimaSenhaChamadaSalao] = useState<string | null>(null);
  const [ultimaSenhaChamadaRetirada, setUltimaSenhaChamadaRetirada] = useState<string | null>(null);

  const updateStateFromLocalStorage = useCallback(() => {
    const storedSenhasSalao: Senha[] = JSON.parse(localStorage.getItem('senhasSalao') || '[]');
    const storedSenhasRetirada: Senha[] = JSON.parse(localStorage.getItem('senhasRetirada') || '[]');
    setSenhasSalao(storedSenhasSalao);
    setSenhasRetirada(storedSenhasRetirada);

    // Encontrar a última senha chamada em cada fila
    const lastChamadaSalao = localStorage.getItem('ultimaSenhaChamadaSalao');
    setUltimaSenhaChamadaSalao(lastChamadaSalao ? lastChamadaSalao : null);

    const lastChamadaRetirada = localStorage.getItem('ultimaSenhaChamadaRetirada');
    setUltimaSenhaChamadaRetirada(lastChamadaRetirada ? lastChamadaRetirada : null);
  }, []);

  useEffect(() => {
    // Atualiza o estado inicial
    updateStateFromLocalStorage();

    // Adiciona o listener para o evento 'storage'
    window.addEventListener('storage', updateStateFromLocalStorage);

    // Remove o listener quando o componente é desmontado
    return () => {
      window.removeEventListener('storage', updateStateFromLocalStorage);
    };
  }, [updateStateFromLocalStorage]);

  return (
    <div className="telao-container">
      <div className="painel-senhas">
        <FilaSenhas titulo="Pedidos Salão" senhas={senhasSalao} ultimaSenhaChamada={ultimaSenhaChamadaSalao} />
        <FilaSenhas titulo="Pedidos Online" senhas={senhasRetirada} ultimaSenhaChamada={ultimaSenhaChamadaRetirada} />
      </div>
    </div>
  );
};

export default Telao;
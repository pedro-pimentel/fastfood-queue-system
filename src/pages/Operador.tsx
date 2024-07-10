import React, { useState, useEffect } from 'react';
import FormularioSenha from '../components/FormularioSenha/FormularioSenha';
import FilaSenhas from '../components/FilaSenhas/FilaSenhas';
import './Operador.css';

interface Senha {
  id: string;
  numero: string;
  status: string;
}

const Operador: React.FC = () => {
  const [senhasSalao, setSenhasSalao] = useState<Senha[]>([]);
  const [senhasRetirada, setSenhasRetirada] = useState<Senha[]>([]);
  const [contadorSalao, setContadorSalao] = useState<number>(1);
  const [contadorRetirada, setContadorRetirada] = useState<number>(1);
  const [ultimaSenhaChamadaSalao, setUltimaSenhaChamadaSalao] = useState<string | null>(null);
  const [ultimaSenhaChamadaRetirada, setUltimaSenhaChamadaRetirada] = useState<string | null>(null);

  useEffect(() => {
    const storedSenhasSalao: Senha[] = JSON.parse(localStorage.getItem('senhasSalao') || '[]');
    const storedSenhasRetirada: Senha[] = JSON.parse(localStorage.getItem('senhasRetirada') || '[]');
    setSenhasSalao(storedSenhasSalao);
    setSenhasRetirada(storedSenhasRetirada);
    if (storedSenhasSalao.length > 0) {
      const lastIdSalao = storedSenhasSalao[storedSenhasSalao.length - 1].id;
      if (typeof lastIdSalao === 'string') {
        setContadorSalao(parseInt(lastIdSalao.split('-')[1]) + 1);
      }
    }
    if (storedSenhasRetirada.length > 0) {
      const lastIdRetirada = storedSenhasRetirada[storedSenhasRetirada.length - 1].id;
      if (typeof lastIdRetirada === 'string') {
        setContadorRetirada(parseInt(lastIdRetirada.split('-')[1]) + 1);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('senhasSalao', JSON.stringify(senhasSalao));
    localStorage.setItem('senhasRetirada', JSON.stringify(senhasRetirada));
  }, [senhasSalao, senhasRetirada]);

  const addSenha = (tipo: string) => {
    let novaSenha: Senha;
    if (tipo === 'salao') {
      novaSenha = { id: `S-${contadorSalao}`, numero: `S-${contadorSalao}`, status: 'chamada' };
      setSenhasSalao([...senhasSalao, novaSenha]);
      setContadorSalao(contadorSalao + 1);
      setUltimaSenhaChamadaSalao(novaSenha.id);
      localStorage.setItem('ultimaSenhaChamadaSalao', novaSenha.id);
    } else {
      novaSenha = { id: `R-${contadorRetirada}`, numero: `R-${contadorRetirada}`, status: 'chamada' };
      setSenhasRetirada([...senhasRetirada, novaSenha]);
      setContadorRetirada(contadorRetirada + 1);
      setUltimaSenhaChamadaRetirada(novaSenha.id);
      localStorage.setItem('ultimaSenhaChamadaRetirada', novaSenha.id);
    }
  };

  const resetarFilas = () => {
    setSenhasSalao([]);
    setSenhasRetirada([]);
    setContadorSalao(1);
    setContadorRetirada(1);
    localStorage.removeItem('senhasSalao');
    localStorage.removeItem('senhasRetirada');
    setUltimaSenhaChamadaSalao(null);
    setUltimaSenhaChamadaRetirada(null);
    localStorage.removeItem('ultimaSenhaChamadaSalao');
    localStorage.removeItem('ultimaSenhaChamadaRetirada');
  };

  return (
    <div className="operador-container">
      <FormularioSenha onAddSenha={addSenha} />
      <button className="reset-button" onClick={resetarFilas}>Resetar Filas</button>
      <div className="painel-senhas">
        <FilaSenhas titulo="Fila Salão" senhas={senhasSalao} ultimaSenhaChamada={ultimaSenhaChamadaSalao} />
        <FilaSenhas titulo="Fila Retirada" senhas={senhasRetirada} ultimaSenhaChamada={ultimaSenhaChamadaRetirada} />
      </div>
    </div>
  );
};

export default Operador;

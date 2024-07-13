import React, { useState, useEffect, useCallback } from 'react';
import FormularioSenha from '../components/FormularioSenha/FormularioSenha';
import FilaSenhas from '../components/FilaSenhas/FilaSenhas';
import './Operador.css';

type AtendimentoTipo = 'salao' | 'retirada';

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
  const [senhasRemovidasSalao, setSenhasRemovidasSalao] = useState<Senha[]>([]);
  const [senhasRemovidasRetirada, setSenhasRemovidasRetirada] = useState<Senha[]>([]);

  useEffect(() => {
    const storedSenhasSalao: Senha[] = JSON.parse(localStorage.getItem('senhasSalao') || '[]');
    const storedSenhasRetirada: Senha[] = JSON.parse(localStorage.getItem('senhasRetirada') || '[]');
    const storedSenhasRemovidasSalao: Senha[] = JSON.parse(localStorage.getItem('senhasRemovidasSalao') || '[]');
    const storedSenhasRemovidasRetirada: Senha[] = JSON.parse(localStorage.getItem('senhasRemovidasRetirada') || '[]');

    setSenhasSalao(storedSenhasSalao);
    setSenhasRetirada(storedSenhasRetirada);
    setSenhasRemovidasSalao(storedSenhasRemovidasSalao);
    setSenhasRemovidasRetirada(storedSenhasRemovidasRetirada);

    if (storedSenhasSalao.length > 0) {
      const lastIdSalao = storedSenhasSalao[storedSenhasSalao.length - 1].id;
      setContadorSalao(parseInt(lastIdSalao.split('-')[1], 10) + 1);
    }
    if (storedSenhasRetirada.length > 0) {
      const lastIdRetirada = storedSenhasRetirada[storedSenhasRetirada.length - 1].id;
      setContadorRetirada(parseInt(lastIdRetirada.split('-')[1], 10) + 1);
    }

    const lastChamadaSalao = localStorage.getItem('ultimaSenhaChamadaSalao');
    const lastChamadaRetirada = localStorage.getItem('ultimaSenhaChamadaRetirada');

    setUltimaSenhaChamadaSalao(lastChamadaSalao);
    setUltimaSenhaChamadaRetirada(lastChamadaRetirada);
  }, []);

  useEffect(() => {
    localStorage.setItem('senhasSalao', JSON.stringify(senhasSalao));
    localStorage.setItem('senhasRetirada', JSON.stringify(senhasRetirada));
    localStorage.setItem('senhasRemovidasSalao', JSON.stringify(senhasRemovidasSalao));
    localStorage.setItem('senhasRemovidasRetirada', JSON.stringify(senhasRemovidasRetirada));
  }, [senhasSalao, senhasRetirada, senhasRemovidasSalao, senhasRemovidasRetirada]);

  const addSenha = useCallback((tipo: AtendimentoTipo, senhaPersonalizada?: string) => {
    let novaSenha: Senha;
    if (senhaPersonalizada) {
      novaSenha = { id: senhaPersonalizada, numero: senhaPersonalizada, status: 'chamada' };
    } else if (tipo === 'salao') {
      if (senhasRemovidasSalao.length > 0) {
        novaSenha = senhasRemovidasSalao.pop()!;
      } else {
        novaSenha = { id: `S-${contadorSalao}`, numero: `S-${contadorSalao}`, status: 'chamada' };
        setContadorSalao((prevContador) => prevContador + 1);
      }
    } else {
      if (senhasRemovidasRetirada.length > 0) {
        novaSenha = senhasRemovidasRetirada.pop()!;
      } else {
        novaSenha = { id: `R-${contadorRetirada}`, numero: `R-${contadorRetirada}`, status: 'chamada' };
        setContadorRetirada((prevContador) => prevContador + 1);
      }
    }

    if (tipo === 'salao') {
      setSenhasSalao((prevSenhas) => [novaSenha, ...prevSenhas]);
      setUltimaSenhaChamadaSalao(novaSenha.id);
      localStorage.setItem('ultimaSenhaChamadaSalao', novaSenha.id);
    } else {
      setSenhasRetirada((prevSenhas) => [novaSenha, ...prevSenhas]);
      setUltimaSenhaChamadaRetirada(novaSenha.id);
      localStorage.setItem('ultimaSenhaChamadaRetirada', novaSenha.id);
    }
  }, [contadorSalao, contadorRetirada, senhasRemovidasSalao, senhasRemovidasRetirada]);

  const removerUltimaSenhaChamada = useCallback((tipo: AtendimentoTipo) => {
    if (tipo === 'salao' && ultimaSenhaChamadaSalao) {
      const senhaRemovida = senhasSalao.find(senha => senha.id === ultimaSenhaChamadaSalao);
      setSenhasSalao((prevSenhas) => prevSenhas.filter(senha => senha.id !== ultimaSenhaChamadaSalao));
      setUltimaSenhaChamadaSalao(null);
      localStorage.removeItem('ultimaSenhaChamadaSalao');
      if (senhaRemovida) setSenhasRemovidasSalao((prevSenhasRemovidas) => [...prevSenhasRemovidas, senhaRemovida]);
    } else if (tipo === 'retirada' && ultimaSenhaChamadaRetirada) {
      const senhaRemovida = senhasRetirada.find(senha => senha.id === ultimaSenhaChamadaRetirada);
      setSenhasRetirada((prevSenhas) => prevSenhas.filter(senha => senha.id !== ultimaSenhaChamadaRetirada));
      setUltimaSenhaChamadaRetirada(null);
      localStorage.removeItem('ultimaSenhaChamadaRetirada');
      if (senhaRemovida) setSenhasRemovidasRetirada((prevSenhasRemovidas) => [...prevSenhasRemovidas, senhaRemovida]);
    }
  }, [ultimaSenhaChamadaSalao, ultimaSenhaChamadaRetirada, senhasSalao, senhasRetirada]);

  const resetarFilas = useCallback(() => {
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
    setSenhasRemovidasSalao([]);
    setSenhasRemovidasRetirada([]);
  }, []);

  return (
    <div className="operador-container">
      <FormularioSenha onAddSenha={addSenha} />
      <button className="reset-button" onClick={resetarFilas}>Resetar Filas</button>
      <div className="painel-senhas">
        <FilaSenhas titulo="Pedidos Salão" senhas={senhasSalao} ultimaSenhaChamada={ultimaSenhaChamadaSalao} onRemoverUltimaSenhaChamada={() => removerUltimaSenhaChamada('salao')} />
        <FilaSenhas titulo="Pedidos Online" senhas={senhasRetirada} ultimaSenhaChamada={ultimaSenhaChamadaRetirada} onRemoverUltimaSenhaChamada={() => removerUltimaSenhaChamada('retirada')} />
      </div>
    </div>
  );
};

export default Operador;

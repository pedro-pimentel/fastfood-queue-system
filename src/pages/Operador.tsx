import React, { useState, useEffect, useCallback } from 'react';
import FormularioSenha from '../components/FormularioSenha/FormularioSenha';
import FilaSenhas from '../components/FilaSenhas/FilaSenhas';
import './Operador.css';
import 'flowbite';

type AtendimentoTipo = 'salao' | 'retirada' | 'preferencial';

interface Senha {
  id: string;
  numero: string;
  status: string;
}

const Operador: React.FC = () => {
  const [senhasSalao, setSenhasSalao] = useState<Senha[]>([]);
  const [senhasRetirada, setSenhasRetirada] = useState<Senha[]>([]);
  const [senhasPreferencial, setSenhasPreferencial] = useState<Senha[]>([]);
  const [contadorSalao, setContadorSalao] = useState<number>(1);
  const [contadorRetirada, setContadorRetirada] = useState<number>(1);
  const [contadorPreferencial, setContadorPreferencial] = useState<number>(1);
  const [ultimaSenhaChamadaSalao, setUltimaSenhaChamadaSalao] = useState<string | null>(null);
  const [ultimaSenhaChamadaRetirada, setUltimaSenhaChamadaRetirada] = useState<string | null>(null);
  const [ultimaSenhaChamadaPreferencial, setUltimaSenhaChamadaPreferencial] = useState<string | null>(null);
  const [senhasRemovidasSalao, setSenhasRemovidasSalao] = useState<Senha[]>([]);
  const [senhasRemovidasRetirada, setSenhasRemovidasRetirada] = useState<Senha[]>([]);
  const [senhasRemovidasPreferencial, setSenhasRemovidasPreferencial] = useState<Senha[]>([]);

  useEffect(() => {
    const storedSenhasSalao: Senha[] = JSON.parse(localStorage.getItem('senhasSalao') || '[]');
    const storedSenhasRetirada: Senha[] = JSON.parse(localStorage.getItem('senhasRetirada') || '[]');
    const storedSenhasPreferencial: Senha[] = JSON.parse(localStorage.getItem('senhasPreferencial') || '[]');
    const storedSenhasRemovidasSalao: Senha[] = JSON.parse(localStorage.getItem('senhasRemovidasSalao') || '[]');
    const storedSenhasRemovidasRetirada: Senha[] = JSON.parse(localStorage.getItem('senhasRemovidasRetirada') || '[]');
    const storedSenhasRemovidasPreferencial: Senha[] = JSON.parse(localStorage.getItem('senhasRemovidasPreferencial') || '[]');

    setSenhasSalao(storedSenhasSalao);
    setSenhasRetirada(storedSenhasRetirada);
    setSenhasPreferencial(storedSenhasPreferencial);
    setSenhasRemovidasSalao(storedSenhasRemovidasSalao);
    setSenhasRemovidasRetirada(storedSenhasRemovidasRetirada);
    setSenhasRemovidasPreferencial(storedSenhasRemovidasPreferencial);

    if (storedSenhasSalao.length > 0) {
      const lastIdSalao = storedSenhasSalao[storedSenhasSalao.length - 1].id;
      setContadorSalao(parseInt(lastIdSalao.split('-')[1], 10) + 1);
    }
    if (storedSenhasRetirada.length > 0) {
      const lastIdRetirada = storedSenhasRetirada[storedSenhasRetirada.length - 1].id;
      setContadorRetirada(parseInt(lastIdRetirada.split('-')[1], 10) + 1);
    }
    if (storedSenhasPreferencial.length > 0) {
      const lastIdPreferencial = storedSenhasPreferencial[storedSenhasPreferencial.length - 1].id;
      setContadorPreferencial(parseInt(lastIdPreferencial.split('-')[1], 10) + 1);
    }

    const lastChamadaSalao = localStorage.getItem('ultimaSenhaChamadaSalao');
    const lastChamadaRetirada = localStorage.getItem('ultimaSenhaChamadaRetirada');
    const lastChamadaPreferencial = localStorage.getItem('ultimaSenhaChamadaPreferencial');

    setUltimaSenhaChamadaSalao(lastChamadaSalao);
    setUltimaSenhaChamadaRetirada(lastChamadaRetirada);
    setUltimaSenhaChamadaPreferencial(lastChamadaPreferencial);
  }, []);

  useEffect(() => {
    localStorage.setItem('senhasSalao', JSON.stringify(senhasSalao));
    localStorage.setItem('senhasRetirada', JSON.stringify(senhasRetirada));
    localStorage.setItem('senhasPreferencial', JSON.stringify(senhasPreferencial));
    localStorage.setItem('senhasRemovidasSalao', JSON.stringify(senhasRemovidasSalao));
    localStorage.setItem('senhasRemovidasRetirada', JSON.stringify(senhasRemovidasRetirada));
    localStorage.setItem('senhasRemovidasPreferencial', JSON.stringify(senhasRemovidasPreferencial));
  }, [senhasSalao, senhasRetirada, senhasPreferencial, senhasRemovidasSalao, senhasRemovidasRetirada, senhasRemovidasPreferencial]);

  const playSound = () => {
    const audio = new Audio(process.env.PUBLIC_URL + '/mixkit-home-standard-ding-dong-109.wav');
    audio.play();
  };

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
    } else if (tipo === 'retirada') {
      if (senhasRemovidasRetirada.length > 0) {
        novaSenha = senhasRemovidasRetirada.pop()!;
      } else {
        novaSenha = { id: `R-${contadorRetirada}`, numero: `R-${contadorRetirada}`, status: 'chamada' };
        setContadorRetirada((prevContador) => prevContador + 1);
      }
    } else {
      if (senhasRemovidasPreferencial.length > 0) {
        novaSenha = senhasRemovidasPreferencial.pop()!;
      } else {
        novaSenha = { id: `P-${contadorPreferencial}`, numero: `P-${contadorPreferencial}`, status: 'chamada' };
        setContadorPreferencial((prevContador) => prevContador + 1);
      }
    }

    if (tipo === 'salao') {
      setSenhasSalao((prevSenhas) => [novaSenha, ...prevSenhas]);
      setUltimaSenhaChamadaSalao(novaSenha.id);
      localStorage.setItem('ultimaSenhaChamadaSalao', novaSenha.id);
    } else if (tipo === 'retirada') {
      setSenhasRetirada((prevSenhas) => [novaSenha, ...prevSenhas]);
      setUltimaSenhaChamadaRetirada(novaSenha.id);
      localStorage.setItem('ultimaSenhaChamadaRetirada', novaSenha.id);
    } else {
      setSenhasPreferencial((prevSenhas) => [novaSenha, ...prevSenhas]);
      setUltimaSenhaChamadaPreferencial(novaSenha.id);
      localStorage.setItem('ultimaSenhaChamadaPreferencial', novaSenha.id);
    }

    playSound();  // Toca o som toda vez que uma nova senha é adicionada
  }, [contadorSalao, contadorRetirada, contadorPreferencial, senhasRemovidasSalao, senhasRemovidasRetirada, senhasRemovidasPreferencial]);

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
    } else if (tipo === 'preferencial' && ultimaSenhaChamadaPreferencial) {
      const senhaRemovida = senhasPreferencial.find(senha => senha.id === ultimaSenhaChamadaPreferencial);
      setSenhasPreferencial((prevSenhas) => prevSenhas.filter(senha => senha.id !== ultimaSenhaChamadaPreferencial));
      setUltimaSenhaChamadaPreferencial(null);
      localStorage.removeItem('ultimaSenhaChamadaPreferencial');
      if (senhaRemovida) setSenhasRemovidasPreferencial((prevSenhasRemovidas) => [...prevSenhasRemovidas, senhaRemovida]);
    }
  }, [ultimaSenhaChamadaSalao, ultimaSenhaChamadaRetirada, ultimaSenhaChamadaPreferencial, senhasSalao, senhasRetirada, senhasPreferencial]);

  const rechamarSenha = (senha: Senha) => {
    if (senha.id.startsWith('S')) {
      setUltimaSenhaChamadaSalao(senha.id);
      localStorage.setItem('ultimaSenhaChamadaSalao', senha.id);
    } else if (senha.id.startsWith('R')) {
      setUltimaSenhaChamadaRetirada(senha.id);
      localStorage.setItem('ultimaSenhaChamadaRetirada', senha.id);
    } else if (senha.id.startsWith('P')) {
      setUltimaSenhaChamadaPreferencial(senha.id);
      localStorage.setItem('ultimaSenhaChamadaPreferencial', senha.id);
    }
    // playSound();
  };

  const resetarFilas = useCallback(() => {
    setSenhasSalao([]);
    setSenhasRetirada([]);
    setSenhasPreferencial([]);
    setContadorSalao(1);
    setContadorRetirada(1);
    setContadorPreferencial(1);
    localStorage.removeItem('senhasSalao');
    localStorage.removeItem('senhasRetirada');
    localStorage.removeItem('senhasPreferencial');
    setUltimaSenhaChamadaSalao(null);
    setUltimaSenhaChamadaRetirada(null);
    setUltimaSenhaChamadaPreferencial(null);
    localStorage.removeItem('ultimaSenhaChamadaSalao');
    localStorage.removeItem('ultimaSenhaChamadaRetirada');
    localStorage.removeItem('ultimaSenhaChamadaPreferencial');
    setSenhasRemovidasSalao([]);
    setSenhasRemovidasRetirada([]);
    setSenhasRemovidasPreferencial([]);
  }, []);

  return (
    <div className="operador-container">
      <FormularioSenha onAddSenha={addSenha} />
      <button className="reset-button" onClick={resetarFilas}>Resetar Filas</button>
      <div className="painel-senhas">
        <FilaSenhas 
          titulo="Pedidos Salão" 
          senhas={senhasSalao} 
          ultimaSenhaChamada={ultimaSenhaChamadaSalao} 
          onRemoverUltimaSenhaChamada={() => removerUltimaSenhaChamada('salao')} 
          onRechamarSenha={rechamarSenha} // Passar a função de rechamar senha
        />
        <FilaSenhas 
          titulo="Pedidos Online" 
          senhas={senhasRetirada} 
          ultimaSenhaChamada={ultimaSenhaChamadaRetirada} 
          onRemoverUltimaSenhaChamada={() => removerUltimaSenhaChamada('retirada')} 
          onRechamarSenha={rechamarSenha} // Passar a função de rechamar senha
        />
        <FilaSenhas 
          titulo="Pedidos Preferencial" 
          senhas={senhasPreferencial} 
          ultimaSenhaChamada={ultimaSenhaChamadaPreferencial} 
          onRemoverUltimaSenhaChamada={() => removerUltimaSenhaChamada('preferencial')} 
          onRechamarSenha={rechamarSenha} // Passar a função de rechamar senha
        />
      </div>
    </div>
  );
};

export default Operador;
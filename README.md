# Sistema de Filas de Senhas para Fast Food

Este é um sistema de filas de senhas desenvolvido para gerenciar e organizar o atendimento em um ambiente de fast food. O sistema permite adicionar, remover e rechamar senhas, e inclui funcionalidades para senhas preferenciais, notificações sonoras e um histórico de senhas chamadas.

## Funcionalidades

- **Adicionar Senha**: Adicione senhas para atendimento no salão, retirada e preferencial.
- **Remover Senha**: Remova senhas específicas da fila.
- **Rechamar Senha**: Rechame senhas específicas para garantir que os clientes não percam sua vez.
- **Histórico de Senhas**: Visualize o histórico de senhas chamadas.
- **Notificações Sonoras**: Toque um som cada vez que uma nova senha é chamada.
- **Senhas Preferenciais**: Gerencie uma fila separada para atendimentos preferenciais.
- **Resetar Filas**: Resete todas as filas de senhas.

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construir interfaces de usuário.
- **TypeScript**: Superconjunto de JavaScript que adiciona tipagem estática.
- **Flowbite**: Biblioteca de componentes UI baseada no Tailwind CSS.
- **React Toastify**: Biblioteca para notificações.

## Estrutura do Projeto

fastfood-queue-system/
├── public/
│ ├── fonts/
│ │ └── Bipplo-Black.ttf
│ ├── mixkit-home-standard-ding-dong-109.wav
│ ├── LOGO_X-BOM.png
│ ├── favicon.ico
│ └── index.html
├── src/
│ ├── components/
│ │ ├── FilaSenhas/
│ │ │ ├── FilaSenhas.css
│ │ │ └── FilaSenhas.tsx
│ │ └── FormularioSenha/
│ │ ├── FormularioSenha.css
│ │ └── FormularioSenha.tsx
│ ├── pages/
│ │ ├── Operador.tsx
│ │ ├── Operador.css
│ │ ├── Telao.tsx
│ │ └── Telao.css
│ ├── App.tsx
│ ├── App.css
│ ├── index.tsx
│ ├── index.css
│ └── ...
├── package.json
└── README.md


## Como Executar

1. **Clone o Repositório**
   ```bash
   git clone https://github.com/seu-usuario/fastfood-queue-system.git
   cd fastfood-queue-system
npm install
npm start

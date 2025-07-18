# Pomodorium 🧠⏱️

Sistema de temporizador inspirado na técnica Pomodoro, com foco em produtividade e gerenciamento de tarefas. Alterna entre períodos de foco, descanso curto e descanso longo, com acompanhamento de tempo, som ambiente e lista de tarefas com persistência no navegador.

🔗 [Acesse o site](https://victormelkor.github.io/pomodorium)

---

## 🚀 Tecnologias

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## ✨ Funcionalidades

### Temporizador

- `alterarContexto`: alterna o estado visual e semântico entre **foco**, **descanso curto** e **descanso longo**.
- `mostrarTempo`: formata e exibe o tempo no display.
- `contagemRegressiva`: executa o temporizador e dispara alertas ao término.
- `iniciarOuPausar`: inicia ou pausa o temporizador, controlando ícone e áudio.
- `zerar`: reseta o temporizador e interface.
- `CustomEvent focoFinalizado`: evento disparado ao fim do tempo de foco para marcar a tarefa ativa como concluída.

### Tarefas

- `criarElementoTarefa`: monta visualmente a `<li>` com descrição, ícone de status e botão de edição.
- `atualizarTarefas`: salva o estado no `localStorage`.
- `removerTarefas`: exclui tarefas completas ou todas.
- `btnAdicionarTarefa`, `btnCancelar`: exibem ou escondem o formulário.
- `formAdicionarTarefa.addEventListener('submit')`: adiciona nova tarefa à lista.
- Interação por clique para `selecionar tarefa ativa` e atualizar o painel superior.
- Ao fim de um foco (`focoFinalizado`), a tarefa ativa é marcada como concluída e o botão de edição é desabilitado.
- Dados persistidos entre sessões com `localStorage`.

---

## 📋 Observações

- Estilização **mobile-first** com uso extensivo de `@media queries` e `variáveis CSS`.
- Sons e imagens carregados localmente.
- Layout visual adaptativo com cores contextuais via `data-attributes`.
- Dropdown funcional para ações em lote nas tarefas.
- Código limpo, sem frameworks, ideal para estudo de manipulação DOM com JavaScript puro.

---

## 👨‍💻 Desenvolvedor

[![GitHub - victormelkor](https://img.shields.io/badge/GitHub-victormelkor-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/victormelkor)  
[![Portfólio - victormelkor.github.io](https://img.shields.io/badge/Portfólio-victormelkor.github.io-000?style=for-the-badge&logo=About.me&logoColor=white)](https://victormelkor.github.io)

---

> Projeto educacional baseado no conteúdo dos cursos da Alura.

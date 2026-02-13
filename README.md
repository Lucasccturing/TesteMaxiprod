# Sistema de Controle de Gastos Residenciais

Este projeto é uma aplicação Full Stack desenvolvida como teste técnico para a posição de Desenvolvedor Júnior. O objetivo é gerenciar o fluxo financeiro residencial, permitindo o cadastro de pessoas, categorias e transações com validações de regras de negócio específicas.

## 🚀 Tecnologias Utilizadas

### Back-end
* **Linguagem/Framework:** C# com .NET 8.
* **Persistência:** Entity Framework Core (MySQL).
* **Arquitetura:** Web API RESTful.

### Front-end
* **Framework:** React com TypeScript.
* **Estilização:** Tailwind CSS.
* **Consumo de API:** Axios.

---

## 🛠️ Funcionalidades e Regras de Negócio

### 1. Gestão de Pessoas
* CRUD completo (Criar, Listar, Atualizar e Deletar).
* **Regra de Exclusão:** Ao remover uma pessoa, todas as suas transações vinculadas são apagadas automaticamente (Cascade Delete).
* Identificador único gerado automaticamente.

### 2. Gestão de Categorias
* Cadastro com descrição e finalidade (Receita, Despesa ou Ambas).
* As finalidades restringem quais tipos de transações podem utilizar a categoria.

### 3. Gestão de Transações
* **Validação de Idade:** Usuários menores de 18 anos são impedidos de cadastrar "Receitas", sendo permitido apenas o registro de "Despesas".
* **Consistência de Categoria:** O sistema valida se a categoria escolhida é compatível com o tipo da transação (Ex: Não permite usar uma categoria de 'Receita' em um lançamento de 'Despesa').
* **Valor:** Apenas números positivos são aceitos.

### 4. Relatórios e Totais
* **Por Pessoa:** Lista nome, total de receitas, total de despesas e saldo individual. Ao final, exibe o balanço líquido de todas as pessoas somadas.
* **Por Categoria:** Agrupamento de gastos e ganhos por tipo de categoria com saldo final.

#### OBS: A lógica de cálculo de saldos foi mantida no Back-end (RelatoriosController) para garantir que os dados cheguem prontos e validados para a interface. Tipagem Forte: O uso de TypeScript no Front-end e Classes/Enums no C# reduz erros de comunicação entre as camadas.
---

## 📦 Como Executar o Projeto

### Pré-requisitos
* SDK .NET 8.0+
* Node.js (v18+)

### Passo 1: Back-end
1. Navegue até a pasta da API (/).
2. Execute o comando para restaurar dependências e rodar a aplicação:
   ```bash
   dotnet watch run

### Passo 2: Front-end
1. Navegue até a pasta Frontend (/Frontend).
2. Execute o comando para restaurar dependências e rodar a aplicação:
   ```bash
   npm run dev

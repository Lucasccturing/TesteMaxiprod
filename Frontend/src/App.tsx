import { FiChevronDown } from "react-icons/fi";
import { useState, useEffect, type FormEvent } from "react";
import { FiTrash2 } from "react-icons/fi";
import { api } from "./services/api";

// O ID será preenchido pelo backend com a integração API
// Tipagem básica para as entidades do sistema: Pessoa, Categoria e Transação.
interface Pessoa {
  id?: number;
  nome: string;
  idade: number;
}

interface Categoria {
  id?: number;
  descricao: string;
  tipo: string;
}

interface Transacao {
  id?: number;
  descricao: string;
  valor: number;
  tipo: string;
  categoriaId: number;
  pessoaId: number;
}

/* Tipagem dos relatórios vindos do backend */
interface RelatorioPessoa {
  pessoaId: number;
  nome: string;
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
}

interface RelatorioCategoria {
  categoriaId: number;
  descricao: string;
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
}

export default function App() {
  /* Controla o menu que está sendo exibido */
  const [menuAtual, setMenuAtual] = useState<
    | "pessoas"
    | "categorias"
    | "transacoes"
    | "relTotalPessoa"
    | "relTotalCategoria"
  >("pessoas");

  // ===== PESSOAS =====
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);

  async function loadPessoas() {
    const response = await api.get("/Pessoas");
    setPessoas(response.data);
  }

  async function handlePessoa(e: FormEvent) {
    e.preventDefault();

    await api.post("/pessoas", {
      nome,
      idade: Number(idade),
    });

    setNome("");
    setIdade("");
    await loadPessoas();
  }

  async function deletePessoa(id?: number) {
    if (!id) return;
    await api.delete(`/pessoas/${id}`);
    await loadPessoas();
  }

  // ===== CATEGORIAS =====
  const [descricaoCategoria, setDescricaoCategoria] = useState("");
  const [tipoCategoria, setTipoCategoria] = useState<number | "">("");
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  async function loadCategorias() {
    const response = await api.get("/categorias");
    setCategorias(response.data);
  }

  async function handleCategoria(e: FormEvent) {
    e.preventDefault();

    await api.post("/categorias", {
      descricao: descricaoCategoria,
      tipo: tipoCategoria,
    });

    setDescricaoCategoria("");
    setTipoCategoria("");
    await loadCategorias();
  }

  async function deleteCategoria(id?: number) {
    if (!id) return;
    await api.delete(`/categorias/${id}`);
    await loadCategorias();
  }

  // ===== TRANSAÇÕES =====
  const [descricaoTrabsacao, setDescricaoTransacao] = useState("");
  const [valorTransacao, setValorTransacao] = useState("");
  const [tipoTransacao, setTipoTransacao] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [pessoaId, setPessoaId] = useState("");
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);

  async function loadTransacoes() {
    const response = await api.get("/transacoes");
    setTransacoes(response.data);
  }

  async function handleTransacao(e: FormEvent) {
    e.preventDefault();

    await api.post("/transacoes", {
      descricao: descricaoTrabsacao,
      valor: Number(valorTransacao),
      tipo: tipoTransacao,
      categoriaId: Number(categoriaId),
      pessoaId: Number(pessoaId),
    });

    setDescricaoTransacao("");
    setValorTransacao("");
    setTipoTransacao("");
    setCategoriaId("");
    setPessoaId("");
    await loadTransacoes();
  }

  async function deleteTransacao(id?: number) {
    if (!id) return;
    await api.delete(`/transacoes/${id}`);
    await loadTransacoes();
  }

  // ===== RELATÓRIOS =====
  const [relatorioPessoa, setRelatorioPessoa] = useState<RelatorioPessoa[]>([]);
  const [relatorioCategoria, setRelatorioCategoria] = useState<
    RelatorioCategoria[]
  >([]);

  async function loadRelatorioPessoa() {
    try {
      const response = await api.get("/Relatorios/totais-por-pessoa");
      // Extrai apenas a lista de pessoas do objeto
      setRelatorioPessoa(response.data.pessoas);
    } catch (error) {
      console.error(error);
      alert("Erro ao carregar relatório por pessoa");
    }
  }

  async function loadRelatorioCategoria() {
    try {
      const response = await api.get("/Relatorios/totais-por-categoria");
      setRelatorioCategoria(response.data.categorias);
    } catch (error) {
      console.error(error);
      alert("Erro ao carregar relatório por categoria");
    }
  }

  /* useEffect carrega dados conforme menu selecionado */
  useEffect(() => {
    if (menuAtual === "pessoas") loadPessoas();
    if (menuAtual === "categorias") loadCategorias();
    if (menuAtual === "transacoes") loadTransacoes();
    if (menuAtual === "relTotalPessoa") loadRelatorioPessoa();
    if (menuAtual === "relTotalCategoria") loadRelatorioCategoria();
  }, [menuAtual]);
  return (
    // O layout é simples, com um menu no topo para alternar entre as seções e cada seção renderiza seu conteúdo específico.
    <div className="w-full min-h-screen bg-gray-900">
      <main className="pt-10 px-4">
        <div className="w-full md:max-w-2xl">
          <h1 className="text-4xl font-medium text-white">
            Sistema Residencial
          </h1>

          <div className="relative group mt-4 inline-block">
            <div className="text-white cursor-pointer select-none bg-gray-800 px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-700 transition">
              <span>Menu</span>
              <FiChevronDown className="w-4 h-4" />
            </div>

            <aside className="absolute left-0 top-full -mt-1 w-72 bg-gray-800 text-white hidden group-hover:block shadow-xl rounded border border-gray-700">
              <ul>
                <li
                  onClick={() => setMenuAtual("pessoas")}
                  className="px-4 py-3 hover:bg-blue-700 cursor-pointer border-b border-gray-700"
                >
                  Pessoas
                </li>
                <li
                  onClick={() => setMenuAtual("categorias")}
                  className="px-4 py-3 hover:bg-blue-700 cursor-pointer border-b border-gray-700"
                >
                  Categorias
                </li>
                <li
                  onClick={() => setMenuAtual("transacoes")}
                  className="px-4 py-3 hover:bg-blue-700 cursor-pointer"
                >
                  Transações
                </li>
              </ul>
            </aside>
          </div>

          {/* MENU DE RELATÓRIOS 
          O mesmo padrão do menu principal que alterna entre as entidades. 
          Opções para os relatórios de totais por pessoa e por categoria. Tela apenas de consulta que carrega as informações do backend.
          */}
          <div className="relative group mt-4 inline-block ml-3">
            <div className="text-white cursor-pointer select-none bg-gray-800 px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-700 transition">
              <span>Relatórios</span>
              <FiChevronDown className="w-4 h-4" />
            </div>

            <aside className="absolute left-0 top-full -mt-1 w-72 bg-gray-800 text-white hidden group-hover:block shadow-xl rounded border border-gray-700">
              <ul>
                <li
                  onClick={() => setMenuAtual("relTotalPessoa")}
                  className="px-4 py-3 hover:bg-blue-700 cursor-pointer border-b border-gray-700"
                >
                  Totais por pessoa
                </li>
                <li
                  onClick={() => setMenuAtual("relTotalCategoria")}
                  className="px-4 py-3 hover:bg-blue-700 cursor-pointer"
                >
                  Totais por categoria
                </li>
              </ul>
            </aside>
          </div>
        </div>

        {/* ===== PESSOAS ===== 
        Setar dados para cadastro e estilização básica para o formulário de cadastro e a listagem de pessoas. 
        Há duas colunas: a primeira para o formulário de cadastro e a segunda para a listagem.
        */}
        {menuAtual === "pessoas" && (
          <div className="grid md:grid-cols-2 gap-6 mt-10">
            <div className="bg-gray-800 rounded p-4">
              <form onSubmit={handlePessoa} className="flex flex-col my-6">
                <label className="text-white">Nome:</label>
                <input
                  placeholder="Informe o nome"
                  className="mb-3 p-2 rounded text-white bg-gray-700"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />

                <label className="text-white">Idade:</label>
                <input
                  placeholder="Informe a idade"
                  className="mb-3 p-2 rounded text-white bg-gray-700"
                  value={idade}
                  onChange={(e) => setIdade(e.target.value)}
                />

                <button className="bg-green-500 p-2 rounded">Cadastrar</button>
              </form>
            </div>

            <div className="bg-gray-800 rounded p-4">
              <h2 className="text-white mb-2 font-semibold">
                Pessoas cadastradas
              </h2>
              <div className="grid grid-cols-4 text-gray-300 font-semibold text-sm border-b border-gray-700 pb-1">
                <span>Código</span>
                <span>Nome</span>
                <span>Idade</span>
                <span>Ações</span>
              </div>

              {pessoas.map((p) => (
                <div
                  key={p.id}
                  className="grid grid-cols-4 text-white text-sm py-1 border-b border-gray-700"
                >
                  <span>{p.id ?? "-"}</span>
                  <span>{p.nome}</span>
                  <span>{p.idade}</span>
                  <FiTrash2
                    onClick={() => deletePessoa(p.id)}
                    className="cursor-pointer text-red-400"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== CATEGORIAS ===== */}
        {menuAtual === "categorias" && (
          <div className="grid md:grid-cols-2 gap-6 mt-10">
            <div className="bg-gray-800 rounded p-4">
              <form onSubmit={handleCategoria} className="flex flex-col my-6">
                <label className="text-white">Descrição:</label>
                <input
                  placeholder="Descrição da categoria"
                  className="mb-3 p-2 rounded text-white bg-gray-700"
                  value={descricaoCategoria}
                  onChange={(e) => setDescricaoCategoria(e.target.value)}
                />

                <label className="text-white">Tipo:</label>
                <select
                  className="mb-3 p-2 rounded text-white bg-gray-700"
                  value={tipoCategoria}
                  onChange={(e) => setTipoCategoria(Number(e.target.value))}
                >
                  <option value="">Selecione</option>
                  <option value={1}>Receita</option>
                  <option value={2}>Despesa</option>
                  <option value={3}>Ambas</option>
                </select>

                <button className="bg-green-500 p-2 rounded">Cadastrar</button>
              </form>
            </div>

            <div className="bg-gray-800 rounded p-4">
              <h2 className="text-white mb-2 font-semibold">
                Categorias cadastradas
              </h2>

              <div className="grid grid-cols-4 text-gray-300 font-semibold text-sm border-b border-gray-700 pb-1">
                <span>Código</span>
                <span>Descrição</span>
                <span>Tipo</span>
                <span>Ações</span>
              </div>

              {categorias.map((c) => (
                <div
                  key={c.id}
                  className="grid grid-cols-4 text-white text-sm py-1 border-b border-gray-700"
                >
                  <span>{c.id ?? "-"}</span>
                  <span>{c.descricao}</span>
                  <span>{c.tipo}</span>
                  <FiTrash2
                    onClick={() => deleteCategoria(c.id)}
                    className="cursor-pointer text-red-400"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== TRANSAÇÕES ===== */}
        {menuAtual === "transacoes" && (
          <div className="grid md:grid-cols-2 gap-6 mt-10">
            <div className="bg-gray-800 rounded p-4">
              <form onSubmit={handleTransacao} className="flex flex-col my-6">
                <label className="text-white">Descrição:</label>
                <input
                  placeholder="Descrição da transação"
                  className="mb-3 p-2 rounded text-white bg-gray-700"
                  value={descricaoTrabsacao}
                  onChange={(e) => setDescricaoTransacao(e.target.value)}
                />

                <label className="text-white">Valor:</label>
                <input
                  placeholder="0.00"
                  className="mb-3 p-2 rounded text-white bg-gray-700"
                  value={valorTransacao}
                  onChange={(e) => setValorTransacao(e.target.value)}
                />

                <label className="text-white">Tipo:</label>
                <input
                  placeholder="1 = Receita"
                  className="mb-3 p-2 rounded text-white bg-gray-700"
                  value={tipoTransacao}
                  onChange={(e) => setTipoTransacao(e.target.value)}
                />

                <label className="text-white">Categoria Id:</label>
                <input
                  placeholder="ID da categoria"
                  className="mb-3 p-2 rounded text-white bg-gray-700"
                  value={categoriaId}
                  onChange={(e) => setCategoriaId(e.target.value)}
                />

                <label className="text-white">Pessoa Id:</label>
                <input
                  placeholder="ID da pessoa"
                  className="mb-3 p-2 rounded text-white bg-gray-700"
                  value={pessoaId}
                  onChange={(e) => setPessoaId(e.target.value)}
                />

                <button className="bg-green-500 p-2 rounded">Cadastrar</button>
              </form>
            </div>

            <div className="bg-gray-800 rounded p-4">
              <div className="mb-2">
                <h2 className="text-white font-semibold">
                  Transações cadastradas
                </h2>
              </div>

              <div className="grid grid-cols-7 text-gray-300 font-semibold text-sm border-b border-gray-700 pb-1">
                <span>Código</span>
                <span>Descrição</span>
                <span>Valor</span>
                <span>Tipo</span>
                <span>Categoria</span>
                <span>Pessoa</span>
                <span>Ações</span>
              </div>

              {transacoes.map((t) => (
                <div
                  key={t.id}
                  className="grid grid-cols-7 text-white text-sm py-1 border-b border-gray-700"
                >
                  <span>{t.id ?? "-"}</span>
                  <span>{t.descricao}</span>
                  <span>{t.valor}</span>
                  <span>{t.tipo}</span>
                  <span>{t.categoriaId}</span>
                  <span>{t.pessoaId}</span>
                  <FiTrash2
                    onClick={() => deleteTransacao(t.id)}
                    className="cursor-pointer text-red-400"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== RELATÓRIOS POR PESSOA ===== */}
        {menuAtual === "relTotalPessoa" && (
          <div className="mt-10 bg-gray-800 rounded p-4">
            <h2 className="text-white font-semibold mb-2">Totais por pessoa</h2>

            <div className="grid grid-cols-5 text-gray-300 font-semibold text-sm border-b border-gray-700 pb-1">
              <span>PessoaId</span>
              <span>Nome</span>
              <span>Total Receitas</span>
              <span>Total Despesas</span>
              <span>Saldo</span>
            </div>

            {relatorioPessoa.map((r) => (
              <div
                key={r.pessoaId}
                className="grid grid-cols-5 text-white text-sm py-1 border-b border-gray-700"
              >
                <span>{r.pessoaId}</span>
                <span>{r.nome}</span>
                <span>{r.totalReceitas}</span>
                <span>{r.totalDespesas}</span>
                <span>{r.saldo}</span>
              </div>
            ))}
          </div>
        )}

        {/* ===== RELATÓRIOS POR CATEGORIA ===== */}
        {menuAtual === "relTotalCategoria" && (
          <div className="mt-10 bg-gray-800 rounded p-4">
            <h2 className="text-white font-semibold mb-2">
              Totais por categoria
            </h2>

            <div className="grid grid-cols-5 text-gray-300 font-semibold text-sm border-b border-gray-700 pb-1">
              <span>CategoriaId</span>
              <span>Descrição</span>
              <span>Total Receitas</span>
              <span>Total Despesas</span>
              <span>Saldo</span>
            </div>

            {relatorioCategoria.map((r) => (
              <div
                key={r.categoriaId}
                className="grid grid-cols-5 text-white text-sm py-1 border-b border-gray-700"
              >
                <span>{r.categoriaId}</span>
                <span>{r.descricao}</span>
                <span>{r.totalReceitas}</span>
                <span>{r.totalDespesas}</span>
                <span>{r.saldo}</span>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

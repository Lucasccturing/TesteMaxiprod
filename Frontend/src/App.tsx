import { FiChevronDown } from "react-icons/fi";
import { useState, FormEvent } from "react";
import { FiTrash2 } from "react-icons/fi";

// Interfaces já preparadas para receber ID real do backend
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

export default function App() {
  const [menuAtual, setMenuAtual] = useState<"pessoas" | "categorias" | "transacoes" | "relPessoa" | "relCategoria">("pessoas");

  // ===== PESSOAS =====
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);

  function handlePessoa(e: FormEvent) {
    e.preventDefault();
    if (!nome || !idade) return;

    // Quando integrar com API, o ID virá do backend
    setPessoas([...pessoas, { nome, idade: Number(idade) }]);
    setNome("");
    setIdade("");
  }

  function deletePessoa(index: number) {
    setPessoas(pessoas.filter((_, i) => i !== index));
  }

  // ===== CATEGORIAS =====
  const [descricaoCat, setDescricaoCat] = useState("");
  const [tipoCat, setTipoCat] = useState("");
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  function handleCategoria(e: FormEvent) {
    e.preventDefault();
    if (!descricaoCat || !tipoCat) return;

    setCategorias([...categorias, { descricao: descricaoCat, tipo: tipoCat }]);
    setDescricaoCat("");
    setTipoCat("");
  }

  function deleteCategoria(index: number) {
    setCategorias(categorias.filter((_, i) => i !== index));
  }

  // ===== TRANSAÇÕES =====
  const [descricaoTr, setDescricaoTr] = useState("");
  const [valorTr, setValorTr] = useState("");
  const [tipoTr, setTipoTr] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [pessoaId, setPessoaId] = useState("");
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);

  function handleTransacao(e: FormEvent) {
    e.preventDefault();
    if (!descricaoTr || !valorTr) return;

    setTransacoes([
      ...transacoes,
      {
        descricao: descricaoTr,
        valor: Number(valorTr),
        tipo: tipoTr,
        categoriaId: Number(categoriaId),
        pessoaId: Number(pessoaId),
      },
    ]);

    setDescricaoTr("");
    setValorTr("");
    setTipoTr("");
    setCategoriaId("");
    setPessoaId("");
  }

  function deleteTransacao(index: number) {
    setTransacoes(transacoes.filter((_, i) => i !== index));
  }

  return (
    <div className="w-full min-h-screen bg-gray-900">
      <main className="pt-10 px-4">
        <div className="w-full md:max-w-2xl">
          <h1 className="text-4xl font-medium text-white">Sistema Residencial</h1>

          <div className="relative group mt-4 inline-block">
            <div className="text-white cursor-pointer select-none bg-gray-800 px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-700 transition">
              <span>Menu</span>
              <FiChevronDown className="w-4 h-4" />
            </div>

            <aside className="absolute left-0 top-full -mt-1 w-72 bg-gray-800 text-white hidden group-hover:block shadow-xl rounded border border-gray-700">
              <ul>
                <li onClick={() => setMenuAtual('pessoas')} className="px-4 py-3 hover:bg-blue-700 cursor-pointer border-b border-gray-700">
                  Pessoas
                </li>
                <li onClick={() => setMenuAtual('categorias')} className="px-4 py-3 hover:bg-blue-700 cursor-pointer border-b border-gray-700">
                  Categorias
                </li>
                <li onClick={() => setMenuAtual('transacoes')} className="px-4 py-3 hover:bg-blue-700 cursor-pointer">
                  Transações
                </li>
              </ul>
            </aside>
          </div>

          {/* MENU DE RELATÓRIOS */}
          <div className="relative group mt-4 inline-block ml-3">
            <div className="text-white cursor-pointer select-none bg-gray-800 px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-700 transition">
              <span>Relatórios</span>
              <FiChevronDown className="w-4 h-4" />
            </div>

            <aside className="absolute left-0 top-full -mt-1 w-72 bg-gray-800 text-white hidden group-hover:block shadow-xl rounded border border-gray-700">
              <ul>
                <li onClick={() => setMenuAtual('relPessoa')} className="px-4 py-3 hover:bg-blue-700 cursor-pointer border-b border-gray-700">
                  Totais por pessoa
                </li>
                <li onClick={() => setMenuAtual('relCategoria')} className="px-4 py-3 hover:bg-blue-700 cursor-pointer">
                  Totais por categoria
                </li>
              </ul>
            </aside>
          </div>
        </div>

        {/* ===== PESSOAS ===== */}
        {menuAtual === 'pessoas' && (
          <div className="grid md:grid-cols-2 gap-6 mt-10">
            <div className="bg-gray-800 rounded p-4">
              <form onSubmit={handlePessoa} className="flex flex-col my-6">
                <label className="text-white">Nome:</label>
                <input placeholder="Informe o nome" className="mb-3 p-2 rounded" value={nome} onChange={e => setNome(e.target.value)} />

                <label className="text-white">Idade:</label>
                <input placeholder="Informe a idade" className="mb-3 p-2 rounded" value={idade} onChange={e => setIdade(e.target.value)} />

                <button className="bg-green-500 p-2 rounded">Cadastrar</button>
              </form>
            </div>

            <div className="bg-gray-800 rounded p-4">
              <h2 className="text-white mb-2 font-semibold">Pessoas cadastradas</h2>

              <div className="grid grid-cols-4 text-gray-300 font-semibold text-sm border-b border-gray-700 pb-1">
                <span>Código</span>
                <span>Nome</span>
                <span>Idade</span>
                <span>Ações</span>
              </div>

              {pessoas.map((p, i) => (
                <div key={i} className="grid grid-cols-4 text-white text-sm py-1 border-b border-gray-700">
                  <span>{p.id ?? '-'}</span>
                  <span>{p.nome}</span>
                  <span>{p.idade}</span>
                  <FiTrash2 onClick={() => deletePessoa(i)} className="cursor-pointer text-red-400" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== CATEGORIAS ===== */}
        {menuAtual === 'categorias' && (
          <div className="grid md:grid-cols-2 gap-6 mt-10">
            <div className="bg-gray-800 rounded p-4">
              <form onSubmit={handleCategoria} className="flex flex-col my-6">
                <label className="text-white">Descrição:</label>
                <input placeholder="Descrição da categoria" className="mb-3 p-2 rounded" value={descricaoCat} onChange={e => setDescricaoCat(e.target.value)} />

                <label className="text-white">Tipo:</label>
                <input placeholder="Ex: 1 = Receita" className="mb-3 p-2 rounded" value={tipoCat} onChange={e => setTipoCat(e.target.value)} />

                <button className="bg-green-500 p-2 rounded">Cadastrar</button>
              </form>
            </div>

            <div className="bg-gray-800 rounded p-4">
              <h2 className="text-white mb-2 font-semibold">Categorias cadastradas</h2>

              <div className="grid grid-cols-4 text-gray-300 font-semibold text-sm border-b border-gray-700 pb-1">
                <span>Código</span>
                <span>Descrição</span>
                <span>Tipo</span>
                <span>Ações</span>
              </div>

              {categorias.map((c, i) => (
                <div key={i} className="grid grid-cols-4 text-white text-sm py-1 border-b border-gray-700">
                  <span>{c.id ?? '-'}</span>
                  <span>{c.descricao}</span>
                  <span>{c.tipo}</span>
                  <FiTrash2 onClick={() => deleteCategoria(i)} className="cursor-pointer text-red-400" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== RELATÓRIOS POR PESSOA ===== */}
        {menuAtual === 'relPessoa' && (
          <div className="mt-10 bg-gray-800 rounded p-4">
            <h2 className="text-white font-semibold mb-2">Totais por pessoa</h2>

            <div className="grid grid-cols-5 text-gray-300 font-semibold text-sm border-b border-gray-700 pb-1">
              <span>PessoaId</span>
              <span>Nome</span>
              <span>Total Receitas</span>
              <span>Total Despesas</span>
              <span>Saldo</span>
            </div>

            {/* Dados virão do backend */}
          </div>
        )}

        {/* ===== RELATÓRIOS POR CATEGORIA ===== */}
        {menuAtual === 'relCategoria' && (
          <div className="mt-10 bg-gray-800 rounded p-4">
            <h2 className="text-white font-semibold mb-2">Totais por categoria</h2>

            <div className="grid grid-cols-5 text-gray-300 font-semibold text-sm border-b border-gray-700 pb-1">
              <span>CategoriaId</span>
              <span>Descrição</span>
              <span>Total Receitas</span>
              <span>Total Despesas</span>
              <span>Saldo</span>
            </div>

            {/* Dados virão do backend */}
          </div>
        )}

        {/* ===== TRANSAÇÕES ===== */}
        {menuAtual === 'transacoes' && (
          <div className="grid md:grid-cols-2 gap-6 mt-10">
            <div className="bg-gray-800 rounded p-4">
              <form onSubmit={handleTransacao} className="flex flex-col my-6">
                <label className="text-white">Descrição:</label>
                <input placeholder="Descrição da transação" className="mb-3 p-2 rounded" value={descricaoTr} onChange={e => setDescricaoTr(e.target.value)} />

                <label className="text-white">Valor:</label>
                <input placeholder="0.00" className="mb-3 p-2 rounded" value={valorTr} onChange={e => setValorTr(e.target.value)} />

                <label className="text-white">Tipo:</label>
                <input placeholder="1 = Receita" className="mb-3 p-2 rounded" value={tipoTr} onChange={e => setTipoTr(e.target.value)} />

                <label className="text-white">Categoria Id:</label>
                <input placeholder="ID da categoria" className="mb-3 p-2 rounded" value={categoriaId} onChange={e => setCategoriaId(e.target.value)} />

                <label className="text-white">Pessoa Id:</label>
                <input placeholder="ID da pessoa" className="mb-3 p-2 rounded" value={pessoaId} onChange={e => setPessoaId(e.target.value)} />

                <button className="bg-green-500 p-2 rounded">Cadastrar</button>
              </form>
            </div>

            <div className="bg-gray-800 rounded p-4">
              <div className="mb-2">
                <h2 className="text-white font-semibold">Transações cadastradas</h2>
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

              {transacoes.map((t, i) => (
                <div key={i} className="grid grid-cols-7 text-white text-sm py-1 border-b border-gray-700">
                  <span>{t.id ?? '-'}</span>
                  <span>{t.descricao}</span>
                  <span>{t.valor}</span>
                  <span>{t.tipo}</span>
                  <span>{t.categoriaId}</span>
                  <span>{t.pessoaId}</span>
                  <FiTrash2 onClick={() => deleteTransacao(i)} className="cursor-pointer text-red-400" />
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

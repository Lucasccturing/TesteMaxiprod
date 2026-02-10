using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaResidencial.Data;
using SistemaResidencial.Models;

namespace SistemaResidencial.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RelatoriosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public RelatoriosController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("totais-por-pessoa")]
        public async Task<ActionResult<ResumoPessoas>> GetTotaisPorPessoa()
        {
            var pessoas = await _context.Pessoas
                .Select(p => new TotalPessoa
                {
                    PessoaId = p.Id,
                    Nome = p.Nome,

                    TotalReceitas = p.Transacoes
                        .Where(t => t.Tipo == TipoTransacao.Receita)
                        .Sum(t => (decimal?)t.Valor) ?? 0,

                    TotalDespesas = p.Transacoes
                        .Where(t => t.Tipo == TipoTransacao.Despesa)
                        .Sum(t => (decimal?)t.Valor) ?? 0
                })
                .ToListAsync();

            var resumo = new ResumoPessoas
            {
                Pessoas = pessoas,
                TotalGeralReceitas = pessoas.Sum(p => p.TotalReceitas),
                TotalGeralDespesas = pessoas.Sum(p => p.TotalDespesas)
            };

            return Ok(resumo);
        }

        [HttpGet("totais-por-categoria")]
        public async Task<ActionResult<ResumoCategorias>> GetTotaisPorCategoria()
        {
            var categorias = await _context.Categorias
                .Select(c => new TotalCategoria
                {
                    CategoriaId = c.Id,
                    Descricao = c.Descricao,

                    TotalReceitas = c.Transacoes
                        .Where(t => t.Tipo == TipoTransacao.Receita)
                        .Sum(t => (decimal?)t.Valor) ?? 0,

                    TotalDespesas = c.Transacoes
                        .Where(t => t.Tipo == TipoTransacao.Despesa)
                        .Sum(t => (decimal?)t.Valor) ?? 0
                })
                .ToListAsync();

            var resumo = new ResumoCategorias
            {
                Categorias = categorias,
                TotalGeralReceitas = categorias.Sum(c => c.TotalReceitas),
                TotalGeralDespesas = categorias.Sum(c => c.TotalDespesas)
            };

            return Ok(resumo);
        }
    }
}

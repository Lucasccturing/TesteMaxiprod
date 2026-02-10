using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaResidencial.Data;
using SistemaResidencial.Models;

namespace SistemaResidencial.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransacoesController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;

        public TransacoesController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        
        [HttpPost]
        public async Task<IActionResult> AddTransacao([FromBody] Transacao transacao)
        {
            var pessoa = await _appDbContext.Pessoas.FirstOrDefaultAsync(p => p.Id == transacao.PessoaId);

            if (pessoa == null)
            {
                return NotFound("Pessoa informada não encontrada!");
            }

            if (pessoa.Idade < 18 && transacao.Tipo == TipoTransacao.Receita)
            {
                return BadRequest("Menores de 18 anos só podem registrar despesas.");
            }

            var categoria = await _appDbContext.Categorias.FirstOrDefaultAsync(c => c.Id == transacao.CategoriaId);

            if (categoria == null)
            {
                return NotFound("Categoria informada não encontrada!");
            }

            if (transacao.Tipo == TipoTransacao.Despesa && categoria.Finalidade == FinalidadeCategoria.Receita)
            {
                return BadRequest("Não é possível usar categoria de Receita em uma transação de Despesa.");
            }

            if (transacao.Tipo == TipoTransacao.Receita && categoria.Finalidade == FinalidadeCategoria.Despesa)
            {
                return BadRequest("Não é possível usar categoria de Despesa em uma transação de Receita.");
            }

            if (transacao.Valor <= 0)
            {
                return BadRequest("O valor da transação deve ser positivo.");
            }

            _appDbContext.Transacoes.Add(transacao);
            await _appDbContext.SaveChangesAsync();

            return Ok("Transação adicionada com sucesso!");
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Transacao>>> GetTransacoes()
        {
            var transacoes = await _appDbContext.Transacoes.Include(t => t.Pessoa).Include(t => t.Categoria).ToListAsync();

            return Ok(transacoes);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Transacao>> GetTransacaoById(int id)
        {
            var transacao = await _appDbContext.Transacoes.Include(t => t.Pessoa).Include(t => t.Categoria).FirstOrDefaultAsync(t => t.Id == id);

            if (transacao == null)
            {
                return NotFound("Transação não encontrada no banco de dados!");
            }

            return Ok(transacao);
        }
    }
}

using System;
using System.Collections.Generic;
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
    public class PessoasController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;
        public PessoasController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        [HttpPost]
        public async Task<IActionResult> AddPessoa([FromBody] Pessoas pessoa)
        {
            _appDbContext.Pessoas.Add(pessoa);
            await _appDbContext.SaveChangesAsync();
            return Ok("Pessoa adicionada com sucesso!");
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pessoas>>> GetPessoas()
        {
            var pessoas = await _appDbContext.Pessoas.ToListAsync();
            return Ok(pessoas);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Pessoas>> GetPessoaById(int id)
        {
            var pessoa = await _appDbContext.Pessoas.FindAsync(id);
            if (pessoa == null)
            {
                return NotFound("Pessoa não encontrada no banco de dados!");
            }
            return Ok(pessoa);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePessoa(int id, [FromBody] Pessoas updatedPessoa)
        {
            if (id != updatedPessoa.Id)
            {
                return BadRequest("ID da pessoa não corresponde ao ID fornecido na URL.");
            }

            var existingPessoa = await _appDbContext.Pessoas.FindAsync(id);
            if (existingPessoa == null)
            {
                return NotFound("Pessoa não encontrada no banco de dados!");
            }

            _appDbContext.Entry(existingPessoa).CurrentValues.SetValues(updatedPessoa);

            await _appDbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetPessoaById), new { id = existingPessoa.Id }, existingPessoa);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePessoa(int id)
        {
            var pessoa = await _appDbContext.Pessoas.FindAsync(id);
            if (pessoa == null)
            {
                return NotFound("Pessoa não encontrada no banco de dados!");
            }

            _appDbContext.Pessoas.Remove(pessoa);
            await _appDbContext.SaveChangesAsync();
            return Ok("Pessoa deletada com sucesso!");
        }



    }
}
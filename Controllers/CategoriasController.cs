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
    public class CategoriasController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;

        public CategoriasController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        [HttpPost]
        public async Task<IActionResult> AddCategoria([FromBody] Categorias categoria)
        {
            _appDbContext.Categorias.Add(categoria);
            await _appDbContext.SaveChangesAsync();

            return Ok("Categoria adicionada com sucesso!");
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Categorias>>> GetCategorias()
        {
            var categorias = await _appDbContext.Categorias.ToListAsync();
            return Ok(categorias);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Categorias>> GetCategoriaById(int id)
        {
            var categoria = await _appDbContext.Categorias.FindAsync(id);

            if (categoria == null)
            {
                return NotFound("Categoria não encontrada no banco de dados!");
            }

            return Ok(categoria);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCategoria(int id, [FromBody] Categorias updatedCategoria)
        {
            if (id != updatedCategoria.Id)
            {
                return BadRequest("ID da categoria não corresponde ao ID fornecido na URL.");
            }

            var existingCategoria = await _appDbContext.Categorias.FindAsync(id);

            if (existingCategoria == null)
            {
                return NotFound("Categoria não encontrada no banco de dados!");
            }

            _appDbContext.Entry(existingCategoria)
                         .CurrentValues
                         .SetValues(updatedCategoria);

            await _appDbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCategoriaById), 
                new { id = existingCategoria.Id }, existingCategoria);
        }
        
    }
}

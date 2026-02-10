using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
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
            return CreatedAtAction(nameof(AddPessoa), new { id = pessoa.Id }, pessoa);
        }




    }
}
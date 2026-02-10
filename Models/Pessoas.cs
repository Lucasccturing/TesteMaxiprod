using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace SistemaResidencial.Models
{
    public class Pessoas
    {
        public int Id { get; set; }
        public string? Nome { get; set; }

        [Range(0, 150, ErrorMessage = "Idade deve ser um número positivo")]
        public int Idade { get; set; }
    }
}
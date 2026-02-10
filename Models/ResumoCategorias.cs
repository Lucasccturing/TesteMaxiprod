using System.Collections.Generic;

namespace SistemaResidencial.Models
{
    public class ResumoCategorias
    {
        public List<TotalCategoria>? Categorias { get; set; }

        public decimal TotalGeralReceitas { get; set; }
        public decimal TotalGeralDespesas { get; set; }

        public decimal SaldoGeral =>
            TotalGeralReceitas - TotalGeralDespesas;
    }
}

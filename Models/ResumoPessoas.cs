using System.Collections.Generic;

namespace SistemaResidencial.Models
{
    public class ResumoPessoas
    {
        public List<TotalPessoa>? Pessoas { get; set; }

        public decimal TotalGeralReceitas { get; set; }
        public decimal TotalGeralDespesas { get; set; }

        public decimal SaldoGeral
        {
            get { return TotalGeralReceitas - TotalGeralDespesas; }
        }
    }
}

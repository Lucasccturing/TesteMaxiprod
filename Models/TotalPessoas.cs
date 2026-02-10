namespace SistemaResidencial.Models
{
    public class TotalPessoa
    {
        public int PessoaId { get; set; }
        public string? Nome { get; set; }

        public decimal TotalReceitas { get; set; }
        public decimal TotalDespesas { get; set; }

        public decimal Saldo
        {
            get { return TotalReceitas - TotalDespesas; }
        }
    }
}

namespace SistemaResidencial.Models
{
    public class TotalCategoria
    {
        public int CategoriaId { get; set; }
        public string? Descricao { get; set; }

        public decimal TotalReceitas { get; set; }
        public decimal TotalDespesas { get; set; }

        public decimal Saldo =>
            TotalReceitas - TotalDespesas;
    }
}

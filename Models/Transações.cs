using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SistemaResidencial.Models
{
    public class Transacao
    {
        [Key]
        public int Id { get; set; }

        [MaxLength(400, ErrorMessage = "A descrição deve ter no máximo 400 caracteres")]
        public string? Descricao { get; set; }

        [Required(ErrorMessage = "O valor é obrigatório")]
        [Range(0.01, double.MaxValue, ErrorMessage = "O valor deve ser positivo")]
        public decimal Valor { get; set; }

        public TipoTransacao Tipo { get; set; }

        [Required]
        public int CategoriaId { get; set; }

        [JsonIgnore]
        [ForeignKey("CategoriaId")]
        public Categorias? Categoria { get; set; }

        [Required]
        public int PessoaId { get; set; }

        [JsonIgnore]
        [ForeignKey("PessoaId")]
        public Pessoas? Pessoa { get; set; }
    }

    public enum TipoTransacao
    {
        [Description("1 = Receita")]
        Receita = 1,
        [Description("2 = Despesa")]
        Despesa = 2
    }
}

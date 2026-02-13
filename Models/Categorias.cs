using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace SistemaResidencial.Models
{
    public class Categorias
    {
        [Key]
        public int Id { get; set; }
        
        [MaxLength(400, ErrorMessage = "A descrição deve ter no máximo 400 caracteres")]
        public string? Descricao { get; set; }

        public FinalidadeCategoria Finalidade { get; set; }

        [JsonIgnore]
        public ICollection<Transacao>? Transacoes { get; set; }
    }


    public enum FinalidadeCategoria
    {
        [Description("1 = Receita")]
        Receita = 1,

        [Description("2 = Despesa")]
        Despesa = 2,

        [Description("3 = Ambas")]
        Ambas = 3
    }
}
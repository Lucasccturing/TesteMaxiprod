using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace SistemaResidencial.Models
{
    public class Pessoas
    {

        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "O nome é obrigatório")]
        [MaxLength(200, ErrorMessage = "O nome deve ter no máximo 200 caracteres")]
        public string? Nome { get; set; }

        [Range(0, 150, ErrorMessage = "Idade deve ser um número positivo")]
        public int Idade { get; set; }

        [JsonIgnore]
        public ICollection<Transacao>? Transacoes { get; set; }

    }
}
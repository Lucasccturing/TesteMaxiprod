using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SistemaResidencial.Models;

namespace SistemaResidencial.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options) {}

        public DbSet<Pessoas> Pessoas { get; set; }

        public DbSet<Categorias> Categorias { get; set; }

        public DbSet<Transacao> Transacoes { get; set; }



    }
}
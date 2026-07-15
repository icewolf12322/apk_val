﻿using GestionReservations.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.IO;

namespace GestionReservations.Services
{
    /// <summary>
    /// Contexte de base de données pour l'application, utilisant Entity Framework Core avec SQLite.
    /// </summary>
    public class AppDbContext : DbContext
    {
        public DbSet<Client> Clients { get; set; }
        public DbSet<Reservation> Reservations { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // Le chemin de la base de données est stocké dans le dossier local de l'application
            // pour ne pas polluer le répertoire d'installation et garantir les droits d'écriture.
            var appDataPath = Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData);
            var dbFolder = Path.Combine(appDataPath, "GestionHotel");
            Directory.CreateDirectory(dbFolder); // Crée le dossier s'il n'existe pas

            var dbPath = Path.Combine(dbFolder, "hotel_data.db");

            optionsBuilder.UseSqlite($"Data Source={dbPath}");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Ajout d'index pour optimiser la recherche de clients par email ou téléphone.
            modelBuilder.Entity<Client>().HasIndex(c => c.Email).IsUnique();
            modelBuilder.Entity<Client>().HasIndex(c => c.Telephone);
        }
    }
}
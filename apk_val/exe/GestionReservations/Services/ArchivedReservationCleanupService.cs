using GestionReservations.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace GestionReservations.Services
{
    /// <summary>
    /// Service de fond qui s'exécute périodiquement pour nettoyer les anciennes réservations.
    /// Conforme aux spécifications du Module 4.
    /// </summary>
    public class ArchivedReservationCleanupService : BackgroundService
    {
        private readonly IServiceScopeFactory _scopeFactory;
        private readonly ILogger<ArchivedReservationCleanupService> _logger;
        private readonly ISettingsService _settingsService;

        public ArchivedReservationCleanupService(IServiceScopeFactory scopeFactory, ILogger<ArchivedReservationCleanupService> logger, ISettingsService settingsService)
        {
            _scopeFactory = scopeFactory;
            _logger = logger;
            _settingsService = settingsService;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Le service de nettoyage des archives démarre.");

            // Attendre un peu au démarrage pour ne pas impacter le lancement de l'UI
            await Task.Delay(TimeSpan.FromMinutes(1), stoppingToken);

            while (!stoppingToken.IsCancellationRequested)
            {
                _logger.LogInformation("Exécution du nettoyage des anciennes réservations archivées.");

                try
                {
                    using var scope = _scopeFactory.CreateScope();
                    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();

                    // Utilise le délai de nettoyage configurable depuis le service de paramètres
                    var cutoffDate = DateTime.Today.AddDays(-_settingsService.Settings.CleanupDelayInDays);

                    var reservationsToDelete = await dbContext.Reservations
                        .Where(r => (r.Statut == ReservationStatus.Validee || r.Statut == ReservationStatus.Refusee) && r.DateDepart < cutoffDate)
                        .ToListAsync(stoppingToken);

                    if (reservationsToDelete.Any())
                    {
                        dbContext.Reservations.RemoveRange(reservationsToDelete);
                        var count = await dbContext.SaveChangesAsync(stoppingToken);
                        _logger.LogInformation("{Count} réservation(s) archivée(s) et obsolète(s) ont été supprimées.", reservationsToDelete.Count);
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Erreur lors du nettoyage des réservations archivées.");
                }

                await Task.Delay(TimeSpan.FromHours(24), stoppingToken);
            }
        }
    }
}
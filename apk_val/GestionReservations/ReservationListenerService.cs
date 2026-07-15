using GestionReservations.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace GestionReservations.Services
{
    /// <summary>
    /// Service de fond qui héberge un mini-serveur Kestrel pour écouter les nouvelles réservations.
    /// Implémente la logique d'Upsert pour le carnet d'adresses client.
    /// </summary>
    public class ReservationListenerService : BackgroundService
    {
        private readonly IServiceScopeFactory _scopeFactory;
        private readonly ILogger<ReservationListenerService> _logger;

        public ReservationListenerService(IServiceScopeFactory scopeFactory, ILogger<ReservationListenerService> logger)
        {
            _scopeFactory = scopeFactory;
            _logger = logger;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            var builder = WebApplication.CreateBuilder();
            builder.WebHost.UseUrls("http://localhost:5001");

            var app = builder.Build();
            _logger.LogInformation("Le service d'écoute des réservations démarre sur http://localhost:5001");

            // Définit le point de terminaison (endpoint) pour recevoir les nouvelles réservations.
            app.MapPost("/webhook/reservation", async (ReservationRequest request, HttpContext httpContext) =>
            {
                _logger.LogInformation("Nouvelle réservation reçue de {IP} pour le client {Email}", 
                    httpContext.Connection.RemoteIpAddress, request.ClientEmail);

                await ProcessReservationAsync(request, stoppingToken);

                return Results.Ok("Réservation reçue et en cours de traitement.");
            });

            await app.RunAsync(stoppingToken);
        }

        /// <summary>
        /// Traite la réservation : vérifie et crée le client si nécessaire (Upsert).
        /// </summary>
        private async Task ProcessReservationAsync(ReservationRequest request, CancellationToken cancellationToken)
        {
            // Crée un scope de dépendance pour obtenir une instance de AppDbContext.
            using var scope = _scopeFactory.CreateScope();
            var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();

            try
            {
                // Logique d'Upsert : on se base sur l'email qui est unique.
                var clientExists = await dbContext.Clients
                    .AnyAsync(c => c.Email.ToLower() == request.ClientEmail.ToLower(), cancellationToken);

                if (!clientExists)
                {
                    _logger.LogInformation("Nouveau client détecté. Ajout au carnet d'adresses : {Email}", request.ClientEmail);
                    var newClient = new Client
                    {
                        NomComplet = request.ClientNomComplet,
                        Email = request.ClientEmail,
                        Telephone = request.ClientTelephone ?? "" // Assure que le téléphone n'est pas null
                    };
                    dbContext.Clients.Add(newClient);
                    await dbContext.SaveChangesAsync(cancellationToken);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erreur lors de l'enregistrement du client pour la réservation de {Email}", request.ClientEmail);
            }
            // TODO: Implémenter la logique pour sauvegarder la réservation elle-même et notifier l'UI.
        }
    }
}
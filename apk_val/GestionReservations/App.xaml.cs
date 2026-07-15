using GestionReservations.Services;
using GestionReservations.ViewModels;
using QuestPDF.Infrastructure;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Windows;

namespace GestionReservations
{
    public partial class App : Application
    {
        private readonly IHost _host;

        public App()
        {
            // Configuration de la licence pour la version Community de QuestPDF
            QuestPDF.Settings.License = LicenseType.Community;

            _host = Host.CreateDefaultBuilder()
                .ConfigureServices((context, services) =>
                {
                    // Enregistre le DbContext pour l'injection de dépendances
                    services.AddSingleton<ICloudStorageService, MockCloudStorageService>();
                    services.AddDbContext<AppDbContext>();
                    services.AddSingleton<IPdfGenerationService, QuestPdfService>();

                    // Enregistre notre service d'écoute comme un service hébergé (tourne en fond)
                    services.AddHostedService<ReservationListenerService>();

                    // Enregistrement des fenêtres, ViewModels et autres services
                    // Les ViewModels sont en Singleton pour conserver leur état durant la vie de l'application.
                    services.AddSingleton<MainWindow>();
                    services.AddSingleton<MainWindowViewModel>();
                    services.AddSingleton<ReservationsViewModel>();
                    services.AddSingleton<ClientsViewModel>();
                    services.AddSingleton<TranslationsViewModel>();
                    services.AddSingleton<SettingsViewModel>();
                })
                .Build();
        }

        protected override async void OnStartup(StartupEventArgs e)
        {
            await _host.StartAsync();

            var mainWindow = _host.Services.GetRequiredService<MainWindow>(); // MainWindow va recevoir son ViewModel par DI
            mainWindow.Show();

            base.OnStartup(e);
        }

        protected override async void OnExit(ExitEventArgs e)
        {
            using (_host)
            {
                await _host.StopAsync(TimeSpan.FromSeconds(5)); // Arrêt propre du serveur
            }
            base.OnExit(e);
        }
    }
}

using GestionReservations.Documents;
using GestionReservations.Models;
using QuestPDF.Fluent;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Windows;

namespace GestionReservations.Services
{
    public class QuestPdfService : IPdfGenerationService
    {
        private const string ArchivePath = @"C:\Archives_Reservations";

        public async Task GenerateAndSaveConfirmationAsync(Reservation reservation)
        {
            try
            {
                // S'assure que le dossier d'archives existe
                Directory.CreateDirectory(ArchivePath);

                // Génère un nom de fichier unique et "propre"
                var clientName = new string(reservation.ClientNomComplet.Where(c => !Path.GetInvalidFileNameChars().Contains(c)).ToArray());
                var fileName = $"Reservation_{reservation.Id}_{clientName}_{DateTime.Now:yyyyMMddHHmmss}.pdf";
                var filePath = Path.Combine(ArchivePath, fileName);

                var document = new ReservationConfirmationDocument(reservation);
                
                // La génération PDF peut être intensive, on l'exécute sur un thread de fond
                await Task.Run(() => document.GeneratePdf(filePath));

                MessageBox.Show($"PDF de confirmation généré et sauvegardé :\n{filePath}", "PDF Généré", MessageBoxButton.OK, MessageBoxImage.Information);
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Une erreur est survenue lors de la génération du PDF : {ex.Message}", "Erreur PDF", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }
    }
}
using System;
using System.IO;
using System.Threading.Tasks;
using System.Windows;

namespace GestionReservations.Services
{
    /// <summary>
    /// Implémentation de simulation pour le service de stockage cloud.
    /// "Téléverse" le fichier sur le bureau de l'utilisateur.
    /// </summary>
    public class MockCloudStorageService : ICloudStorageService
    {
        public async Task UploadJsonContentAsync(string jsonContent, string destinationFileName)
        {
            var desktopPath = Environment.GetFolderPath(Environment.SpecialFolder.DesktopDirectory);
            var filePath = Path.Combine(desktopPath, destinationFileName);

            try
            {
                await File.WriteAllTextAsync(filePath, jsonContent);
                MessageBox.Show($"Simulation : Le fichier '{destinationFileName}' a été enregistré sur votre bureau.", "Mise à jour Cloud", MessageBoxButton.OK, MessageBoxImage.Information);
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Erreur lors de la simulation du téléversement : {ex.Message}", "Erreur", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }
    }
}
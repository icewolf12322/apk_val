namespace GestionReservations.Models
{
    /// <summary>
    /// Représente la structure des paramètres de l'application.
    /// </summary>
    public class AppSettings
    {
        public string ArchivePath { get; set; } = @"C:\Archives_Reservations";
        public int CleanupDelayInDays { get; set; } = 30;
    }
}
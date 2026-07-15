using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using GestionReservations.Models;
using GestionReservations.Services;
using System.Windows;
using System.Threading.Tasks;

namespace GestionReservations.ViewModels
{
    /// <summary>
    /// ViewModel pour une seule vignette de réservation.
    /// Contient la logique des boutons d'action pour cette réservation.
    /// </summary>
    public partial class ReservationCardViewModel : ObservableObject
    {
        [ObservableProperty]
        private Reservation _reservation;

        private readonly IPdfGenerationService _pdfService;

        public ReservationCardViewModel(Reservation reservation, IPdfGenerationService pdfService)
        {
            _reservation = reservation;
            _pdfService = pdfService;
        }

        [RelayCommand]
        private async Task Valider()
        {
            // Mettre à jour le statut de la réservation (visuellement pour l'instant)
            Reservation.Statut = ReservationStatus.Validee;

            await _pdfService.GenerateAndSaveConfirmationAsync(Reservation);
            // TODO: Implémenter l'envoi d'email avec le PDF en pièce jointe.
        }

        [RelayCommand]
        private void SignalerProbleme()
        {
            MessageBox.Show($"ACTION : Signaler un problème pour {Reservation.ClientNomComplet}.");
        }

        [RelayCommand]
        private void Refuser()
        {
            MessageBox.Show($"ACTION : Refuser la réservation pour {Reservation.ClientNomComplet}.");
        }
    }
}
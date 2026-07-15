using GestionReservations.Models;
using System.Threading.Tasks;

namespace GestionReservations.Services
{
    public interface IPdfGenerationService
    {
        Task GenerateAndSaveConfirmationAsync(Reservation reservation);
    }
}
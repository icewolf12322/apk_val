using GestionReservations.Models;
using System.Threading.Tasks;

namespace GestionReservations.Services
{
    public interface ISettingsService
    {
        AppSettings Settings { get; }
        Task LoadSettingsAsync();
        Task SaveSettingsAsync();
    }
}
using CommunityToolkit.Mvvm.ComponentModel;
using System.Collections.ObjectModel;

namespace GestionReservations.ViewModels
{
    /// <summary>
    /// ViewModel principal qui gère la navigation entre les différents modules de l'application.
    /// </summary>
    public partial class MainWindowViewModel : ObservableObject
    {
        [ObservableProperty]
        private ObservableObject? _currentViewModel;

        [ObservableProperty]
        private int _selectedIndex;

        private readonly ReadOnlyCollection<ObservableObject> _viewModels;

        public MainWindowViewModel(
            ReservationsViewModel reservationsViewModel,
            ClientsViewModel clientsViewModel,
            TranslationsViewModel translationsViewModel,
            SettingsViewModel settingsViewModel)
        {
            _viewModels = new ReadOnlyCollection<ObservableObject>(new ObservableObject[]
            {
                reservationsViewModel,
                clientsViewModel,
                translationsViewModel,
                settingsViewModel
            });

            // Définir la vue initiale au démarrage
            _selectedIndex = 0;
            _currentViewModel = _viewModels[0];
        }

        partial void OnSelectedIndexChanged(int value)
        {
            if (value >= 0 && value < _viewModels.Count)
            {
                CurrentViewModel = _viewModels[value];
            }
        }
    }
}
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using GestionReservations.Models;
using GestionReservations.Services;
using Microsoft.EntityFrameworkCore;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Data;

namespace GestionReservations.ViewModels
{
    /// <summary>
    /// ViewModel pour la vue du carnet d'adresses (Module 2).
    /// </summary>
    public partial class ClientsViewModel : ObservableObject
    {
        private readonly AppDbContext _dbContext;

        public ObservableCollection<Client> Clients { get; } = new();
        public ICollectionView ClientsView { get; }

        [ObservableProperty]
        private string _searchText = string.Empty;

        public ClientsViewModel(AppDbContext dbContext)
        {
            _dbContext = dbContext;
            ClientsView = CollectionViewSource.GetDefaultView(Clients);
            ClientsView.Filter = FilterClients;

            _ = LoadClientsAsync();
        }

        private async Task LoadClientsAsync()
        {
            var clientsFromDb = await _dbContext.Clients.OrderBy(c => c.NomComplet).ToListAsync();
            Application.Current.Dispatcher.Invoke(() =>
            {
                Clients.Clear();
                foreach (var client in clientsFromDb) { Clients.Add(client); }
            });
        }

        partial void OnSearchTextChanged(string value) => ClientsView.Refresh();

        private bool FilterClients(object item)
        {
            if (string.IsNullOrWhiteSpace(SearchText)) return true;
            if (item is not Client client) return false;

            return client.NomComplet.Contains(SearchText, System.StringComparison.OrdinalIgnoreCase) ||
                   (client.Telephone?.Contains(SearchText, System.StringComparison.OrdinalIgnoreCase) ?? false) ||
                   (client.Email?.Contains(SearchText, System.StringComparison.OrdinalIgnoreCase) ?? false);
        }

        [RelayCommand]
        private async Task SaveChanges()
        {
            await _dbContext.SaveChangesAsync();
            MessageBox.Show("Les modifications ont été enregistrées.", "Carnet d'adresses", MessageBoxButton.OK, MessageBoxImage.Information);
        }
    }
}


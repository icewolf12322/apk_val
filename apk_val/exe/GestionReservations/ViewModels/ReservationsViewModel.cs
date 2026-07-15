using CommunityToolkit.Mvvm.ComponentModel;
using GestionReservations.Models;
using GestionReservations.Services;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Linq;
using System.Windows.Data;

namespace GestionReservations.ViewModels
{
    public partial class ReservationsViewModel : ObservableObject
    {
        private readonly IPdfGenerationService _pdfService;
        private readonly ObservableCollection<ReservationCardViewModel> _allReservations;
        public ICollectionView ReservationsView { get; }

        [ObservableProperty]
        [NotifyPropertyChangedFor(nameof(ReservationsView))]
        private string _selectedFilter = "Toutes";

        public ObservableCollection<string> Filters { get; }

        public ReservationsViewModel(IPdfGenerationService pdfService)
        {
            _pdfService = pdfService;
            _allReservations = new ObservableCollection<ReservationCardViewModel>(GetMockReservations());
            
            var roomTypes = new HashSet<string>(_allReservations.Select(r => r.Reservation.TypeChambre));
            Filters = new ObservableCollection<string> { "Toutes" };
            foreach (var type in roomTypes.OrderBy(t => t))
            {
                Filters.Add(type);
            }

            ReservationsView = CollectionViewSource.GetDefaultView(_allReservations);
            ReservationsView.Filter = FilterReservations;
        }

        partial void OnSelectedFilterChanged(string value)
        {
            ReservationsView.Refresh();
        }

        private bool FilterReservations(object item)
        {
            if (SelectedFilter == "Toutes" || string.IsNullOrEmpty(SelectedFilter)) return true;
            if (item is not ReservationCardViewModel vm) return false;
            
            return vm.Reservation.TypeChambre == SelectedFilter;
        }

        private IEnumerable<ReservationCardViewModel> GetMockReservations()
        {
            return new List<ReservationCardViewModel>
            {
                new(new Reservation { Id = 1, ClientNomComplet = "Jean Dupont", DateArrivee = DateTime.Today.AddDays(2), DateDepart = DateTime.Today.AddDays(4), TypeChambre = "Chambre Standard", NombrePersonnes = 2, Statut = ReservationStatus.EnAttente }, _pdfService),
                new(new Reservation { Id = 2, ClientNomComplet = "Alice Martin", DateArrivee = DateTime.Today.AddDays(3), DateDepart = DateTime.Today.AddDays(5), TypeChambre = "Chambre bain à bulles", NombrePersonnes = 2, Statut = ReservationStatus.EnAttente }, _pdfService),
                new(new Reservation { Id = 3, ClientNomComplet = "Famille Leroy", DateArrivee = DateTime.Today.AddDays(5), DateDepart = DateTime.Today.AddDays(10), TypeChambre = "Gîte 'Chez Léon'", NombrePersonnes = 4, Statut = ReservationStatus.EnAttente }, _pdfService),
                new(new Reservation { Id = 4, ClientNomComplet = "Marc Petit", DateArrivee = DateTime.Today.AddDays(6), DateDepart = DateTime.Today.AddDays(7), TypeChambre = "Chambre Standard", NombrePersonnes = 1, Statut = ReservationStatus.EnAttente }, _pdfService),
            };
        }
    }
}
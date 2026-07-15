﻿using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using GestionReservations.Services;
using System;
using System.Threading.Tasks;
using System.Windows;

namespace GestionReservations.ViewModels
{
    /// <summary>
    /// ViewModel pour la vue des paramètres.
    /// </summary>
    public partial class SettingsViewModel : ObservableObject
    {
        private readonly ISettingsService _settingsService;

        [ObservableProperty]
        private string _archivePath;

        [ObservableProperty]
        private int _cleanupDelayInDays;

        public SettingsViewModel(ISettingsService settingsService)
        {
            _settingsService = settingsService;
            _archivePath = _settingsService.Settings.ArchivePath;
            _cleanupDelayInDays = _settingsService.Settings.CleanupDelayInDays;
        }

        [RelayCommand]
        private async Task Save()
        {
            try
            {
                _settingsService.Settings.ArchivePath = ArchivePath;
                _settingsService.Settings.CleanupDelayInDays = CleanupDelayInDays;
                await _settingsService.SaveSettingsAsync();
                MessageBox.Show("Paramètres enregistrés avec succès.", "Paramètres", MessageBoxButton.OK, MessageBoxImage.Information);
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Une erreur est survenue lors de la sauvegarde des paramètres : {ex.Message}", "Erreur de sauvegarde", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }
    }
}
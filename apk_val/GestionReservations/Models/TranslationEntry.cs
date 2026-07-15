﻿using CommunityToolkit.Mvvm.ComponentModel;

namespace GestionReservations.Models
{
    /// <summary>
    /// Représente une ligne dans la grille d'édition des traductions.
    /// </summary>
    public partial class TranslationEntry : ObservableObject
    {
        public string Key { get; init; }

        [ObservableProperty]
        private string _value;
    }
}
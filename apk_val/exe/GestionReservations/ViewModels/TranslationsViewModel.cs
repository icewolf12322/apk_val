﻿using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using GestionReservations.Models;
using GestionReservations.Services;
using System;
using System.Collections.ObjectModel;
using System.IO;
using System.Text.Encodings.Web;
using System.Text.Json;
using System.Text.Json.Nodes;
using System.Threading.Tasks;
using System.Windows;

namespace GestionReservations.ViewModels
{
    /// <summary>
    /// ViewModel pour la vue de l'éditeur de traductions (Module 1).
    /// </summary>
    public partial class TranslationsViewModel : ObservableObject
    {
        private readonly ICloudStorageService _cloudStorageService;
        // From exe/GestionReservations/bin/... -> go up to repository root, then apk/src/locales/fr/common.json
        private static readonly string CommonJsonPath = Path.GetFullPath(
            Path.Combine(AppContext.BaseDirectory, "..", "..", "..", "..", "..", "apk", "src", "locales", "fr", "common.json"));
        private JsonNode? _rootNode;

        public ObservableCollection<TranslationEntry> Entries { get; } = new();

        public TranslationsViewModel(ICloudStorageService cloudStorageService)
        {
            _cloudStorageService = cloudStorageService;
            LoadTranslations();
        }

        private void LoadTranslations()
        {
            try
            {
                if (!File.Exists(CommonJsonPath))
                {
                    MessageBox.Show($"Fichier de traductions introuvable : {CommonJsonPath}", "Erreur", MessageBoxButton.OK, MessageBoxImage.Error);
                    return;
                }

                var jsonString = File.ReadAllText(CommonJsonPath);
                _rootNode = JsonNode.Parse(jsonString);

                Entries.Clear();
                if (_rootNode != null)
                {
                    FlattenJson(_rootNode, "");
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Erreur au chargement du fichier common.json : {ex.Message}", "Erreur de chargement", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private void FlattenJson(JsonNode node, string prefix)
        {
            if (node is JsonObject obj)
            {
                foreach (var property in obj)
                {
                    FlattenJson(property.Value!, string.IsNullOrEmpty(prefix) ? property.Key : $"{prefix}.{property.Key}");
                }
            }
            else if (node is JsonValue val && val.GetValue<JsonElement>().ValueKind == JsonValueKind.String)
            {
                Entries.Add(new TranslationEntry { Key = prefix, Value = val.ToString() });
            }
        }

        [RelayCommand]
        private async Task SaveAndUpload()
        {
            if (_rootNode == null) return;

            try
            {
                foreach (var entry in Entries)
                {
                    var pathSegments = entry.Key.Split('.');
                    var nodeToUpdate = _rootNode[pathSegments[0]];
                    for (int i = 1; i < pathSegments.Length; i++) { nodeToUpdate = nodeToUpdate?[pathSegments[i]]; }
                    if (nodeToUpdate?.Parent is JsonObject parent && parent.ContainsKey(pathSegments[^1])) { parent[pathSegments[^1]] = entry.Value; }
                }

                var options = new JsonSerializerOptions { WriteIndented = true, Encoder = JavaScriptEncoder.UnsafeRelaxedJsonEscaping };
                var updatedJsonString = _rootNode.ToJsonString(options);

                await File.WriteAllTextAsync(CommonJsonPath, updatedJsonString);
                await _cloudStorageService.UploadJsonContentAsync(updatedJsonString, "common.json");
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Erreur lors de la sauvegarde : {ex.Message}", "Erreur de sauvegarde", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }
    }
}
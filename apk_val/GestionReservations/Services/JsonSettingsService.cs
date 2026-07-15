using GestionReservations.Models;
using System;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;

namespace GestionReservations.Services
{
    /// <summary>
    /// Gère la persistance des paramètres de l'application dans un fichier JSON local.
    /// </summary>
    public class JsonSettingsService : ISettingsService
    {
        private static readonly string _settingsFilePath;
        public AppSettings Settings { get; private set; }

        static JsonSettingsService()
        {
            var appDataPath = Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData);
            var settingsFolder = Path.Combine(appDataPath, "GestionHotel");
            Directory.CreateDirectory(settingsFolder);
            _settingsFilePath = Path.Combine(settingsFolder, "appsettings.json");
        }

        public JsonSettingsService()
        {
            Settings = new AppSettings();
        }

        public async Task LoadSettingsAsync()
        {
            if (!File.Exists(_settingsFilePath)) await SaveSettingsAsync();
            
            var json = await File.ReadAllTextAsync(_settingsFilePath);
            Settings = JsonSerializer.Deserialize<AppSettings>(json) ?? new AppSettings();
        }

        public async Task SaveSettingsAsync()
        {
            var json = JsonSerializer.Serialize(Settings, new JsonSerializerOptions { WriteIndented = true });
            await File.WriteAllTextAsync(_settingsFilePath, json);
        }
    }
}
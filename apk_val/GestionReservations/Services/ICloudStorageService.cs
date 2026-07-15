﻿using System.Threading.Tasks;

namespace GestionReservations.Services
{
    public interface ICloudStorageService
    {
        Task UploadJsonContentAsync(string jsonContent, string destinationFileName);
    }
}
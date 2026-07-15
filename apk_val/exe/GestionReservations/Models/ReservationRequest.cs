using System;
using System.ComponentModel.DataAnnotations;

namespace GestionReservations.Models
{
    /// <summary>
    /// Représente les données d'une nouvelle réservation reçue via le Webhook.
    /// Les attributs de validation garantissent que les données de base sont présentes.
    /// </summary>
    public class ReservationRequest
    {
        [Required]
        public required string ClientNomComplet { get; set; }

        [Required]
        [EmailAddress]
        public required string ClientEmail { get; set; }

        public string? ClientTelephone { get; set; }

        public DateTime DateArrivee { get; set; }
        public DateTime DateDepart { get; set; }
        public required string TypeChambre { get; set; }
        public int NombrePersonnes { get; set; }
    }
}
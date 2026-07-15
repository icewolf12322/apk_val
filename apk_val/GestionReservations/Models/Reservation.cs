using System;

namespace GestionReservations.Models
{
    /// <summary>
    /// Énumération pour suivre le statut d'une réservation.
    /// </summary>
    public enum ReservationStatus
    {
        EnAttente,
        Validee,
        Invalide, // Problème à signaler
        Refusee
    }

    /// <summary>
    /// Représente une réservation dans le système.
    /// </summary>
    public class Reservation
    {
        public int Id { get; set; }
        public string ClientNomComplet { get; set; }
        public DateTime DateArrivee { get; set; }
        public DateTime DateDepart { get; set; }
        public string TypeChambre { get; set; }
        public int NombrePersonnes { get; set; }
        public ReservationStatus Statut { get; set; }
    }
}
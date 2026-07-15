using System.ComponentModel.DataAnnotations;

namespace GestionReservations.Models
{
    /// <summary>
    /// Représente un client dans la base de données locale (carnet d'adresses).
    /// Conforme aux spécifications du Module 2.
    /// </summary>
    public class Client
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Le nom du client est obligatoire.")]
        [MaxLength(150)]
        public required string NomComplet { get; set; }

        [MaxLength(30)]
        public required string Telephone { get; set; }

        [MaxLength(150)]
        public required string Email { get; set; }
    }
}
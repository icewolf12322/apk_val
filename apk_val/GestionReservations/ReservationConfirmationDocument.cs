using GestionReservations.Models;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

namespace GestionReservations.Documents
{
    /// <summary>
    /// Définit la structure du document PDF de confirmation de réservation en utilisant QuestPDF.
    /// </summary>
    public class ReservationConfirmationDocument : IDocument
    {
        private readonly Reservation _reservation;

        public ReservationConfirmationDocument(Reservation reservation)
        {
            _reservation = reservation;
        }

        public DocumentMetadata GetMetadata() => DocumentMetadata.Default;

        public void Compose(IDocumentContainer container)
        {
            container
                .Page(page =>
                {
                    page.Margin(50);
                    page.Header().Element(ComposeHeader);
                    page.Content().Element(ComposeContent);
                    page.Footer().AlignCenter().Text(x =>
                    {
                        x.CurrentPageNumber();
                        x.Span(" / ");
                        x.TotalPages();
                    });
                });
        }

        void ComposeHeader(IContainer container)
        {
            container.Row(row =>
            {
                row.RelativeItem().Column(column =>
                {
                    column.Item().Text("Val de la Cascade").SemiBold().FontSize(24).FontColor(Colors.Grey.Darken2);
                    column.Item().Text("Confirmation de Réservation").Bold().FontSize(28).FontColor(Colors.Blue.Medium);
                });
            });
        }

        void ComposeContent(IContainer container)
        {
            container.PaddingVertical(40).Column(column =>
            {
                column.Spacing(20);

                column.Item().Text($"Cher/Chère {_reservation.ClientNomComplet},").FontSize(14);
                column.Item().Text("Nous avons le plaisir de vous confirmer votre réservation. Voici les détails de votre séjour :").FontSize(12);

                column.Item().Border(1).BorderColor(Colors.Grey.Lighten2).Padding(10).Column(col =>
                {
                    col.Spacing(5);
                    col.Item().Text(text => { text.Span("Date d'arrivée : ").SemiBold(); text.Span(_reservation.DateArrivee.ToString("dddd, dd MMMM yyyy")); });
                    col.Item().Text(text => { text.Span("Date de départ : ").SemiBold(); text.Span(_reservation.DateDepart.ToString("dddd, dd MMMM yyyy")); });
                    col.Item().Text(text => { text.Span("Type de chambre : ").SemiBold(); text.Span(_reservation.TypeChambre); });
                    col.Item().Text(text => { text.Span("Nombre de personnes : ").SemiBold(); text.Span($"{_reservation.NombrePersonnes}"); });
                });

                column.Item().Text("Nous nous réjouissons de vous accueillir au cœur des Ardennes.").FontSize(12).Italic();
                column.Item().Text("L'équipe du Val de la Cascade").FontSize(12).SemiBold();
            });
        }
    }
}
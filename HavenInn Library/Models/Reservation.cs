using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace HavenInn_Library.Models
{
    public partial class Reservation
    {
        [Key]
        public int ReservationId { get; set; }
        public int? GuestId { get; set; }
        public int? UserId { get; set; }
        public int? RoomId { get; set; }
        public int? ServiceId { get; set; }
        public DateTime? CheckIn { get; set; }
        public DateTime? CheckOut { get; set; }
        public TimeSpan? BookingTime { get; set; }
        public int? NoOfNights { get; set; }
        public int? NumberOfAdults { get; set; }
        public int? NumberOfChildren { get; set; }

        public virtual Guest Guest { get; set; }
        public virtual Room Room { get; set; }
        public virtual Services Service { get; set; }
        public virtual User User { get; set; }
    }
}

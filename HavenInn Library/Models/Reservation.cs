using HavenInn_Library.Service;
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

        [Required]
        public int? GuestId { get; set; }

        [Required]
        public int? UserId { get; set; }

        [Required]
        public int? RoomId { get; set; }

        public int? ServiceId { get; set; }

        [Required]
        //[DataType(DataType.Date)]
        //[CheckInDate(ErrorMessage = "CheckIn date cannot be in the past !!")]
        public DateTime? CheckIn { get; set; }

        [Required]
        //[DataType(DataType.Date)]
        //[CheckInDate(ErrorMessage = "CheckOut date cannot be in the past !!")]
        public DateTime? CheckOut { get; set; }

        [Required]
        public DateTime BookingTime { get; set; }

 
        public int? NoOfNights { get; set; }

       
        public int? NumberOfAdults { get; set; }
        public int? NumberOfChildren { get; set; }


        public virtual Guest Guest { get; set; }
        public virtual Room Room { get; set; }
        public virtual Services Service { get; set; }
        public virtual User User { get; set; }


    }
}

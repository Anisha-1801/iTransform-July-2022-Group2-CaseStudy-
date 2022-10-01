using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace HavenInn_Library.Models
{
    public partial class Room
    {
        public Room()
        {
            Reservation = new HashSet<Reservation>();
        }
        [Key]
        public int RoomId { get; set; }

        [Required]
        public int? RoomTypeId { get; set; }


        [Required]
        public bool? IsAvailable { get; set; }


        [Required]
        public string Description { get; set; }


        public virtual RoomType RoomType { get; set; }
        public virtual ICollection<Reservation> Reservation { get; set; }
    }
}

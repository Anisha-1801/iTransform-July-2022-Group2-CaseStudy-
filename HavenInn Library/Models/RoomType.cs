using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace HavenInn_Library.Models
{
    public partial class RoomType
    {
        public RoomType()
        {
            Room = new HashSet<Room>();
        }
        [Key]
        public int RoomTypeId { get; set; }


        [Required]
      
        public string RoomTypeName { get; set; }


        [Required]
        public decimal? Price { get; set; }

        public virtual ICollection<Room> Room { get; set; }
    }
}

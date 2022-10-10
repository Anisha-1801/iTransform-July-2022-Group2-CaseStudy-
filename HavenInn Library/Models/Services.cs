﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace HavenInn_Library.Models
{
    public partial class Services
    {
        public Services()
        {
            Reservation = new HashSet<Reservation>();
        }
        [Key]
        public int ServiceId { get; set; }


        [Required]
        public string ServiceName { get; set; }


        [Required]
        public decimal? Price { get; set; }

        public virtual ICollection<Reservation> Reservation { get; set; }
    }
}

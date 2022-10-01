using System;
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
        [RegularExpression("^[A-Z][a-zA-Z ]*$", ErrorMessage = "Service Name should not contain numbers or special characters !!")]
        public string ServiceName { get; set; }


        [Required]
        [RegularExpression("^([0-9])$", ErrorMessage = "Cannot contain characters!!")]
        [Range(1,1000000)]
        public decimal? Price { get; set; }

        public virtual ICollection<Reservation> Reservation { get; set; }
    }
}

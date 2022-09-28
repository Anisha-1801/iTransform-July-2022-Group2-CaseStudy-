using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace HavenInn_Library.Models
{
    public partial class Guest
    {
        public Guest()
        {
            Reservation = new HashSet<Reservation>();
        }
        [Key]
        public int GuestId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string MobileNo { get; set; }
        public long? AadharCardNo { get; set; }

        public virtual ICollection<Reservation> Reservation { get; set; }
    }
}

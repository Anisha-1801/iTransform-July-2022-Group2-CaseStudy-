using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace HavenInn_Library.Models
{
    public partial class User
    {
        public User()
        {
            Inventory = new HashSet<Inventory>();
            Reservation = new HashSet<Reservation>();
        }
        [Key]
        public int UserId { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string Role { get; set; }

        [Required]
        public int? StaffId { get; set; }

        [Required]
        [EmailAddress(ErrorMessage = "Invalid Emailid !!")]
        public string Email { get; set; }

        public virtual Staff Staff { get; set; }
        public virtual ICollection<Inventory> Inventory { get; set; }
        public virtual ICollection<Reservation> Reservation { get; set; }
    }
}

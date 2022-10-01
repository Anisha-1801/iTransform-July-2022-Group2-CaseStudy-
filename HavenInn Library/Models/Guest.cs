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

        [Required]
        [RegularExpression("^[A-Z][a-zA-Z ]*$",ErrorMessage ="Invalid Name Format !!")]
        public string Name { get; set; }

        [Required]
        [EmailAddress(ErrorMessage = "Invalid Emailid !!")]
        public string Email { get; set; }

        [Required]
        [StringLength(10, MinimumLength = 10,ErrorMessage = "Mobile Number should be 10 digits long !!")]
        [RegularExpression("^([0-9]{10})$", ErrorMessage = "Invalid Mobile Number !!")]
        public string MobileNo { get; set; }

        [Required]
        [RegularExpression("^[2-9]{1}[0-9]{3}\\s[0-9]{4}\\s[0-9]{4}$", ErrorMessage = "Invalid AadharCard Number !!")]
        [Range(12,12, ErrorMessage = "AadharCard must be 12 digits !!")]
        public long? AadharCardNo { get; set; }

        public virtual ICollection<Reservation> Reservation { get; set; }
    }
}

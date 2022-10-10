using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace HavenInn_Library.Models
{
    public partial class Staff
    {
        public Staff()
        {
            User = new HashSet<User>();
        }
        [Key]
        public int StaffId { get; set; }


        [Required]
        public int? DepartmentId { get; set; }


        [Required]
        public string FirstName { get; set; }


        [Required]
        public string LastName { get; set; }


        [Required]
        public string Gender { get; set; }


        [Required]
        public DateTime? Dob { get; set; }


        [Required]
        public DateTime? Doj { get; set; }


        [Required]
        public string Address { get; set; }


        [Required]
        public decimal? Salary { get; set; }


        [Required]
        public string MobileNumber { get; set; }


        [Required]
        public string Email { get; set; }

        public virtual Department Department { get; set; }
        public virtual ICollection<User> User { get; set; }
    }
}

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
        public int? DepartmentId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
        public DateTime? Dob { get; set; }
        public DateTime? Doj { get; set; }
        public string Address { get; set; }
        public decimal? Salary { get; set; }
        public string MobileNumber { get; set; }
        public string Email { get; set; }

        public virtual Department Department { get; set; }
        public virtual ICollection<User> User { get; set; }
    }
}

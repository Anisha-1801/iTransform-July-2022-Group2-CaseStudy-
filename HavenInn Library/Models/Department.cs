using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace HavenInn_Library.Models
{
    public partial class Department
    {
        public Department()
        {
            Staff = new HashSet<Staff>();
        }
        [Key]
        public int DepartmentId { get; set; }

        [Required]
        [RegularExpression("^[A-Z][a-zA-Z ]*$", ErrorMessage = "Invalid Name Format !!")]
        public string DepartmentName { get; set; }

        public virtual ICollection<Staff> Staff { get; set; }
    }
}

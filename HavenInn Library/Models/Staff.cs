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
        [RegularExpression("^[A-Z][a-zA-Z ]*$", ErrorMessage = "Invalid Name Format !!")]
        public string FirstName { get; set; }


        [Required]
        [RegularExpression("^[A-Z][a-zA-Z ]*$", ErrorMessage = "Invalid Name Format !!")]
        public string LastName { get; set; }


        [Required]
        public string Gender { get; set; }


        [Required]
        [Range(typeof(DateTime), "01-01-1970", "01-01-2004",
                    ErrorMessage = "Date of Birth Must be between 01-01-1970 and 01-01-2004")]
        public DateTime? Dob { get; set; }


        [Required]
        public DateTime? Doj { get; set; }


        [Required]
        public string Address { get; set; }


        [Required]
        [RegularExpression("^([0-9])$", ErrorMessage = "Cannot contain characters!!")]
        [Range(5000,1000000)]
        public decimal? Salary { get; set; }


        [Required]
        [StringLength(10, MinimumLength = 10, ErrorMessage = "Mobile Number should be 10 digits long !!")]
        [RegularExpression("^([0-9]{10})$", ErrorMessage = "Invalid Mobile Number !!")]
        public string MobileNumber { get; set; }


        [Required]
        [EmailAddress(ErrorMessage = "Invalid Emailid !!")]
        public string Email { get; set; }

        public virtual Department Department { get; set; }
        public virtual ICollection<User> User { get; set; }
    }
}

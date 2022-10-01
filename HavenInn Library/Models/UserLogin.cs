using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace HavenInn_Library.Models
{
    public class UserLogin
    {
        [Required]
        [EmailAddress(ErrorMessage = "Invalid Emailid !!")]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace HavenInn_Library.Models
{
    public partial class Inventory
    {
        [Key]
        public int InventoryId { get; set; }

        [Required]
        [RegularExpression("^[A-Z][a-zA-Z ]*$", ErrorMessage = "Cannot contain digits or special characters !!")]
        public string Item { get; set; }

        [Required]
        [RegularExpression("^[A-Z][a-zA-Z ]*$", ErrorMessage = "Cannot contain digits or special characters !!")]
        public string Category { get; set; }

        [Required]
        [RegularExpression("^([0-9])$", ErrorMessage = "Cannot contain characters!!")]
        [Range(1, 1000000)]
        public int? Quantity { get; set; }

        [Required]
        [RegularExpression("^([0-9])$", ErrorMessage = "Cannot contain characters!!")]
        [Range(1,1000000)]
        public decimal? UnitPrice { get; set; }

        [Required]
        public bool? IsStockAvailable { get; set; }

        [Required]
        public int? UserId { get; set; }

        public virtual User User { get; set; }
    }
}

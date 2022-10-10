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

        public string Item { get; set; }

        [Required]
        public string Category { get; set; }

        [Required]

        public int? Quantity { get; set; }

        [Required]
        public decimal? UnitPrice { get; set; }

        [Required]
        public bool? IsStockAvailable { get; set; }

        [Required]
        public int? UserId { get; set; }

        public virtual User User { get; set; }
    }
}

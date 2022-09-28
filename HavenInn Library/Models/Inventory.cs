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
        public string Item { get; set; }
        public string Category { get; set; }
        public int? Quantity { get; set; }
        public decimal? UnitPrice { get; set; }
        public bool? IsStockAvailable { get; set; }
        public int? UserId { get; set; }

        public virtual User User { get; set; }
    }
}

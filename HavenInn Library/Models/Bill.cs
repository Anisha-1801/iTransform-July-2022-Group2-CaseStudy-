using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace HavenInn_Library.Models
{
    public partial class Bill
    {
        [Key]
        public int BillId { get; set; }
        public string PaymentMode { get; set; }
        public int? ReservationId { get; set; }
        public decimal? TotalPrice { get; set; }
        public DateTime? PaymentTime { get; set; }
        public string TransactionId { get; set; }
        public string Status { get; set; }
    }
}

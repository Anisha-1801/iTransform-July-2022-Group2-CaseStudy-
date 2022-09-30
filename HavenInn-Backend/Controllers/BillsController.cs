using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HavenInn_Library.Models;
using Microsoft.AspNetCore.Authorization;
using Org.BouncyCastle.Asn1.X509;

namespace HavenInn_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BillsController : ControllerBase
    {
        private readonly HavenInnContext _context;

        public BillsController(HavenInnContext context)
        {
            _context = context;
        }

        // GET: api/Bills
        [HttpGet]
        [Authorize(Roles = "Receptionist,Owner,Manager")]
        public async Task<ActionResult<IEnumerable<Bill>>> GetBill()
        {
            try
            {
                return await _context.Bill.ToListAsync();

            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Server error {e.Message}");
            }
        }

        // GET: api/Bills/5
        [HttpGet("{id}")]
        [Authorize(Roles = "Receptionist,Owner,Manager")]
        public async Task<ActionResult<Bill>> GetBill(int id)
        {
            try
            {
                var bill = await _context.Bill.FindAsync(id);

                if (bill == null)
                {
                    return NotFound();
                }

                return bill;
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Server error {e.Message}");
            }
        }

        // PUT: api/Bills/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        [Authorize(Roles = "Receptionist,Owner")]
        public async Task<IActionResult> PutBill(int id, Bill bill)
        {
            try
            {
                if (id != bill.BillId)
                {
                    return BadRequest();
                }

                _context.Entry(bill).State = EntityState.Modified;

                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!BillExists(id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }

                return NoContent();
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Server error {e.Message}");
            }
        }

        // POST: api/Bills
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        [Authorize(Roles = "Receptionist,Owner")]
        public async Task<ActionResult<Bill>> PostBill(Bill bill)
        {
            try
            {
                //var nights = _context.Reservation.Where(r => r.ReservationId == bill.ReservationId)
                //    .Select(s => s.NoOfNights).FirstOrDefault();
                //var roomid = _context.Reservation.Where(r => r.ReservationId == bill.ReservationId)
                //    .Select(s => s.RoomId).FirstOrDefault();
                //var roomprice = _context.Room.Where(r => r.RoomId == Convert.ToInt32(roomid))
                //    .Select(s => s.RoomType.Price).FirstOrDefault();
                //var service = _context.Reservation.Where(r => r.ReservationId == bill.ReservationId)
                //    .Select(s => s.ServiceId).FirstOrDefault();
                //var serviceprice = _context.Services.Where(s => s.ServiceId == Convert.ToInt32(service)).Select(s => s.Price).FirstOrDefault();
                //var price = (Convert.ToInt32(nights) * Convert.ToDecimal(roomprice)) + Convert.ToDecimal(serviceprice);
                //_context.Bill.Add(new Bill
                //{
                //    BillId = bill.BillId,
                //    PaymentMode = bill.PaymentMode,
                //    ReservationId = bill.ReservationId,
                //    TotalPrice = Convert.ToDecimal(price),
                //    PaymentTime = DateTime.Now,
                //    TransactionId = bill.TransactionId,
                //    Status = bill.Status,
                //});

                _context.Bill.Add(calbill(bill));

                await _context.SaveChangesAsync();

                return CreatedAtAction("GetBill", new { id = bill.BillId }, bill);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Server error {e.Message}");
            }
        }

        // DELETE: api/Bills/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Receptionist,Owner")]
        public async Task<ActionResult<Bill>> DeleteBill(int id)
        {
            try
            {
                var bill = await _context.Bill.FindAsync(id);
                if (bill == null)
                {
                    return NotFound();
                }

                _context.Bill.Remove(bill);
                await _context.SaveChangesAsync();

                return bill;
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Server error {e.Message}");
            }
        }

        private bool BillExists(int id)
        {
            return _context.Bill.Any(e => e.BillId == id);
        }
        
        private Bill calbill(Bill bill)
        {
            var nights = _context.Reservation.Where(r => r.ReservationId == bill.ReservationId)
                  .Select(s => s.NoOfNights).FirstOrDefault();
            var roomid = _context.Reservation.Where(r => r.ReservationId == bill.ReservationId)
                .Select(s => s.RoomId).FirstOrDefault();
            var roomprice = _context.Room.Where(r => r.RoomId == Convert.ToInt32(roomid))
                .Select(s => s.RoomType.Price).FirstOrDefault();
            var service = _context.Reservation.Where(r => r.ReservationId == bill.ReservationId)
                .Select(s => s.ServiceId).FirstOrDefault();
            var serviceprice = _context.Services.Where(s => s.ServiceId == Convert.ToInt32(service)).Select(s => s.Price).FirstOrDefault();
            var price = (Convert.ToInt32(nights) * Convert.ToDecimal(roomprice)) + Convert.ToDecimal(serviceprice);
             Bill bill1=new Bill
               {
                BillId = bill.BillId,
                PaymentMode = bill.PaymentMode,
                ReservationId = bill.ReservationId,
                TotalPrice = Convert.ToDecimal(price),
                PaymentTime = DateTime.Now,
                TransactionId = bill.TransactionId,
                Status = bill.Status,
              };
       
            return bill1;
        }
    }
}

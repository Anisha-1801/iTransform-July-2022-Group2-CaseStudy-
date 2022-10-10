using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HavenInn_Library.Models;
using Microsoft.AspNetCore.Authorization;
using System.Data;
using Org.BouncyCastle.Asn1.X509;

namespace HavenInn_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class ReservationsController : ControllerBase
    {
        private readonly HavenInnContext _context;

        public ReservationsController(HavenInnContext context)
        {
            _context = context;
        }

        // GET: api/Reservations
        [HttpGet]
        [Authorize(Roles = "Receptionist,Manager,Owner")]
        public async Task<ActionResult<IEnumerable<Reservation>>> GetReservation()
        {
            try
            {
                return await _context.Reservation.Include("Guest").Include("Room").Include("Service").ToListAsync();
            }
              catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Server error {e.Message}");
            }
        }

        // GET: api/Reservations/5
        [HttpGet("{id}")]
        [Authorize(Roles = "Receptionist,Manager,Owner")]
        public async Task<ActionResult<Reservation>> GetReservation(int id)
        {
            try
            { 
           // var reservation = await _context.Reservation.FindAsync(id);
            var reservation = await _context.Reservation
                                            .Where(r => r.ReservationId == id).Include("Guest").Include("Room").Include("Service").Include("User").FirstAsync();

                if (reservation == null)
            {
                return NotFound();
            }

            return reservation;
            }
              catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Server error {e.Message}");
            }
        }

        // PUT: api/Reservations/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        [Authorize(Roles = "Receptionist,Owner")]
        public async Task<IActionResult> PutReservation(int id, Reservation reservation)
        {

            if (id != reservation.ReservationId)
            {
                return BadRequest();
            }

            _context.Entry(reservation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
              catch (DbUpdateConcurrencyException)
            {
                if (!ReservationExists(id))
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

        // POST: api/Reservations
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        [Authorize(Roles = "Receptionist,Owner")]
        public async Task<ActionResult<Reservation>> PostReservation(Reservation reservation)
        {
            try 
            {
                DateTime checkin= Convert.ToDateTime(reservation.CheckIn);
                DateTime checkout = Convert.ToDateTime(reservation.CheckOut);

                TimeSpan period= checkout.Subtract(checkin);


               

                string time = DateTime.Now.ToLongTimeString();
                _context.Reservation.Add(new Reservation
            {
                ReservationId = reservation.ReservationId,
                GuestId=reservation.GuestId,
                UserId=reservation.UserId,
                RoomId=reservation.RoomId,
                ServiceId=reservation.ServiceId,
                CheckIn=reservation.CheckIn,
                CheckOut=reservation.CheckOut,
                BookingTime= Convert.ToDateTime(time) ,
                NoOfNights=Convert.ToInt32(period.Days),
                NumberOfAdults=reservation.NumberOfAdults,
                NumberOfChildren=reservation.NumberOfChildren
            });
                
                await _context.SaveChangesAsync();
               
                

                return CreatedAtAction("GetReservation", new { id = reservation.ReservationId }, reservation);
            }
              catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Server error {e.Message}");
            }
        }

        // DELETE: api/Reservations/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Receptionist,Owner")]
        public async Task<ActionResult<Reservation>> DeleteReservation(int id)
        {
            try
            { 
            var reservation = await _context.Reservation.FindAsync(id);
            if (reservation == null)
            {
                return NotFound();
            }

            _context.Reservation.Remove(reservation);
            await _context.SaveChangesAsync();

            return reservation;
            }
              catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Server error {e.Message}");
            }
        }

        private bool ReservationExists(int id)
        {
            return _context.Reservation.Any(e => e.ReservationId == id);
        }

        //private async Task<IActionResult> RoomStatus(int id)
        //{
        //    var room = _context.Room.Where(r => r.RoomId == id).FirstOrDefault();
        //    Room room1 = new Room
        //    {
        //        RoomTypeId = room.RoomTypeId,
        //        IsAvailable = false,
        //        Description = room.Description
        //    };

        //    _context.Entry(room1).State = EntityState.Modified;
        //    await _context.SaveChangesAsync();

        //    return NoContent();
        //}
    }
}

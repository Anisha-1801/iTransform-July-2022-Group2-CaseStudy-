using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HavenInn_Library.Models;
using Microsoft.AspNetCore.JsonPatch;
using System.Runtime.InteropServices;
using Microsoft.AspNetCore.Authorization;
using System.Data;

namespace HavenInn_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Receptionist,Owner")]
    public class GuestsController : ControllerBase
    {
        private readonly HavenInnContext _context;

        public GuestsController(HavenInnContext context)
        {
            _context = context;
        }

        // GET: api/Guests
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Guest>>> GetGuest()
        {
            return await _context.Guest.ToListAsync();
        }

        // GET: api/Guests/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Guest>> GetGuest(int id)
        {
            var guest = await _context.Guest.FindAsync(id);

            if (guest == null)
            {
                return NotFound();
            }

            return guest;
        }
         [HttpGet("search/{name}")]
        public async Task<ActionResult<IEnumerable<Guest>>> GetGuestByName(string name)
        {
            IQueryable<Guest> query = _context.Guest;
            if (!string.IsNullOrEmpty(name))
            {
                query = query.Where(gname => gname.Name.Contains(name));
            }
            try
            {
                var guests = await query.ToListAsync();
                if (guests == null)
                {
                    return NotFound();
                }

                return guests;

            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error in Retrieving Data from Database");
            }

        }

        // PUT: api/Guests/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGuest(int id, Guest guest)
        {
            if (id != guest.GuestId)
            {
                return BadRequest();
            }

            _context.Entry(guest).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GuestExists(id))
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

        // POST: api/Guests
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Guest>> PostGuest(Guest guest)
        {
            _context.Guest.Add(guest);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGuest", new { id = guest.GuestId }, guest);
        }
        //PATCH :api/Guests/5
        [HttpPatch("{id}")]
        public async Task<IActionResult> UpdateGuest([FromBody] JsonPatchDocument Guest, [FromRoute] int id)
        {

            var guest = await _context.Guest.FindAsync(id);
            Guest.ApplyTo(guest);
            await _context.SaveChangesAsync();
            return Ok();

        }
        // DELETE: api/Guests/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Guest>> DeleteGuest(int id)
        {
            var guest = await _context.Guest.FindAsync(id);
            if (guest == null)
            {
                return NotFound();
            }

            _context.Guest.Remove(guest);
            await _context.SaveChangesAsync();

            return guest;
        }

        private bool GuestExists(int id)
        {
            return _context.Guest.Any(e => e.GuestId == id);
        }
    }
}

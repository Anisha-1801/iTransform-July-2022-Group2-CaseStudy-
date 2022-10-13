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
    #region GuestController
    public class GuestsController : ControllerBase
    {
        private readonly HavenInnContext _context;

        public GuestsController(HavenInnContext context)
        {
            _context = context;
        }

        // GET: api/Guests
        [HttpGet]
        [Authorize(Roles = "Receptionist,Manager,Owner")]
        #region Get All Guests API
        ///<summary>Get all Guest</summary> 
        public async Task<ActionResult<IEnumerable<Guest>>> GetGuest()
        {
            try
            { 
            return await _context.Guest.ToListAsync();
            }
              catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Server error {e.Message}");
            }
        }
        #endregion

        // GET: api/Guests/5
        [HttpGet("Search/{id}")]
        [Authorize(Roles = "Receptionist,Manager,Owner")]
        #region Search Guest by ID API
        ///<summary>Search Guest by ID</summary> 
        public async Task<ActionResult<Guest>> GetGuest(int id)
        {
            try 
            { 
            var guest = await _context.Guest.FindAsync(id);

            if (guest == null)
            {
                return NotFound();
            }

            return guest;
            }
              catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Server error {e.Message}");
            }
        }
        #endregion

        [HttpGet("{name}")]
        [Authorize(Roles = "Receptionist,Manager,Owner")]
        #region Get Guest by Name API
        ///<summary>Get Guest by Name</summary> 
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
              catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Server error {e.Message}");
            }

        }
        #endregion

        // PUT: api/Guests/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        [Authorize(Roles = "Receptionist,Owner")]
        #region Update Guest by ID API
        ///<summary>Update Guest by ID</summary> 
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
        #endregion

        // POST: api/Guests
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        [Authorize(Roles = "Receptionist,Owner")]
        #region Add Guest API
        ///<summary>Add Guest</summary> 
        public async Task<ActionResult<Guest>> PostGuest(Guest guest)
        {
            try
            {
                _context.Guest.Add(guest);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetGuest", new { id = guest.GuestId }, guest);
            }
              catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Server error {e.Message}");
            }
        }
        #endregion

        // DELETE: api/Guests/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Receptionist,Owner")]
        #region Delete Guest by ID API
        ///<summary>Delete Guest by ID</summary> 
        public async Task<ActionResult<Guest>> DeleteGuest(int id)
        {
            try
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
              catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Server error {e.Message}");
            }
        }
        #endregion

        private bool GuestExists(int id)
        {
            return _context.Guest.Any(e => e.GuestId == id);
        }
    }
    #endregion
}

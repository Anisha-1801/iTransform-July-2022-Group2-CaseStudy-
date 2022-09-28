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

namespace HavenInn_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class RoomTypesController : ControllerBase
    {
        private readonly HavenInnContext _context;

        public RoomTypesController(HavenInnContext context)
        {
            _context = context;
        }

        // GET: api/RoomTypes
        [HttpGet]
        [Authorize(Roles = "Receptionist,Manager,Owner")]
        public async Task<ActionResult<IEnumerable<RoomType>>> GetRoomType()
        {
            return await _context.RoomType.ToListAsync();
        }

        // GET: api/RoomTypes/5
        [HttpGet("{id}")]
        [Authorize(Roles = "Receptionist,Manager,Owner")]
        public async Task<ActionResult<RoomType>> GetRoomType(int id)
        {
            var roomType = await _context.RoomType.FindAsync(id);

            if (roomType == null)
            {
                return NotFound();
            }

            return roomType;
        }

        // PUT: api/RoomTypes/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        [Authorize(Roles = "Owner")]
        public async Task<IActionResult> PutRoomType(int id, RoomType roomType)
        {
            if (id != roomType.RoomTypeId)
            {
                return BadRequest();
            }

            _context.Entry(roomType).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RoomTypeExists(id))
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

        // POST: api/RoomTypes
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        [Authorize(Roles = "Owner")]
        public async Task<ActionResult<RoomType>> PostRoomType(RoomType roomType)
        {
            _context.RoomType.Add(roomType);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRoomType", new { id = roomType.RoomTypeId }, roomType);
        }

        // DELETE: api/RoomTypes/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Owner")]
        public async Task<ActionResult<RoomType>> DeleteRoomType(int id)
        {
            var roomType = await _context.RoomType.FindAsync(id);
            if (roomType == null)
            {
                return NotFound();
            }

            _context.RoomType.Remove(roomType);
            await _context.SaveChangesAsync();

            return roomType;
        }

        private bool RoomTypeExists(int id)
        {
            return _context.RoomType.Any(e => e.RoomTypeId == id);
        }
    }
}

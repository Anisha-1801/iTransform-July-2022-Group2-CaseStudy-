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
    public class InventoriesController : ControllerBase
    {
        private readonly HavenInnContext _context;

        public InventoriesController(HavenInnContext context)
        {
            _context = context;
        }

        // GET: api/Inventories
        [HttpGet]
        [Authorize(Roles = "Manager,Owner")]
        public async Task<ActionResult<IEnumerable<Inventory>>> GetInventory()
        {
            try
            {
                return await _context.Inventory.Include(u => u.User).ToListAsync();
            }
              catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Server error {e.Message}");
            }
        }

        // GET: api/Inventories/5
        [HttpGet("{id}")]
        [Authorize(Roles = "Manager,Owner")]
        public async Task<ActionResult<Inventory>> GetInventory(int id)
        {
            try 
            {
                var inventory = await _context.Inventory.Where(s => s.InventoryId == id).Include(i => i.User).FirstAsync();

                if (inventory == null)
            {
                return NotFound();
            }

            return inventory;
            }
              catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Server error {e.Message}");
            }
        }

        // PUT: api/Inventories/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        [Authorize(Roles = "Manager,Owner")]
        public async Task<IActionResult> PutInventory(int id, Inventory inventory)
        {
            if (id != inventory.InventoryId)
            {
                return BadRequest();
            }

            _context.Entry(inventory).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
              catch (DbUpdateConcurrencyException)
            {
                if (!InventoryExists(id))
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

        // POST: api/Inventories
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        [Authorize(Roles = "Manager,Owner")]
        public async Task<ActionResult<Inventory>> PostInventory(Inventory inventory)
        {
            try
            {
                _context.Inventory.Add(inventory);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetInventory", new { id = inventory.InventoryId }, inventory);
            }
              catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Server error {e.Message}");
            }
        }

        // DELETE: api/Inventories/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Manager,Owner")]
        public async Task<ActionResult<Inventory>> DeleteInventory(int id)
        {
            try 
            { 
            var inventory = await _context.Inventory.FindAsync(id);
            if (inventory == null)
            {
                return NotFound();
            }

            _context.Inventory.Remove(inventory);
            await _context.SaveChangesAsync();

            return inventory;
            }
              catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Server error {e.Message}");
            }
        }

        private bool InventoryExists(int id)
        {
            return _context.Inventory.Any(e => e.InventoryId == id);
        }
    }
}

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
    #region IventoriersController
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
        #region Get all Inventories API
        ///<summary>Get all Inventories</summary> 
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
        #endregion

        // GET: api/Inventories/5
        [HttpGet("{id}")]
        [Authorize(Roles = "Manager,Owner")]
        #region Get Inventory by ID API
        ///<summary>Get Inventory by ID</summary> 
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
        #endregion

        // PUT: api/Inventories/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        [Authorize(Roles = "Manager,Owner")]
        #region Update Inventory by ID API
        ///<summary>Update Inventory by ID</summary> 
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
        #endregion

        // POST: api/Inventories
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        [Authorize(Roles = "Manager,Owner")]
        #region Add Inventories API
        ///<summary>Add Inventories</summary> 
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
        #endregion

        // DELETE: api/Inventories/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Manager,Owner")]
        #region Delete Inventory by ID API
        ///<summary>Delete Inventory by ID</summary> 
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
        #endregion

        private bool InventoryExists(int id)
        {
            return _context.Inventory.Any(e => e.InventoryId == id);
        }
    }
    #endregion
}

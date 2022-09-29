using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HavenInn_Library.Models;
using Microsoft.AspNetCore.Authorization;

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
              catch(Exception e)
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
            _context.Bill.Add(bill);
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
    }
}

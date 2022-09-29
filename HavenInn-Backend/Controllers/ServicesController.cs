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
    
    public class ServicesController : ControllerBase
    {
        private readonly HavenInnContext _context;

        public ServicesController(HavenInnContext context)
        {
            _context = context;
        }

        // GET: api/Services
        [HttpGet]
        [Authorize(Roles = "Receptionist,Owner,Manager")]
        public async Task<ActionResult<IEnumerable<Services>>> GetServices()
        {
            try
            { 
            return await _context.Services.ToListAsync();
            }
              catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Server error {e.Message}");
            }
        }

        // GET: api/Services/5
        [HttpGet("{id}")]
        [Authorize(Roles = "Receptionist,Owner,Manager")]
        public async Task<ActionResult<Services>> GetServices(int id)
        {
            try
            { 
            var services = await _context.Services.FindAsync(id);

            if (services == null)
            {
                return NotFound();
            }

            return services;
            }
              catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Server error {e.Message}");
            }
        }

        // PUT: api/Services/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        [Authorize(Roles = "Owner,Manager")]
        public async Task<IActionResult> PutServices(int id, Services services)
        {

            if (id != services.ServiceId)
            {
                return BadRequest();
            }

            _context.Entry(services).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
              catch (DbUpdateConcurrencyException)
            {
                if (!ServicesExists(id))
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

        // POST: api/Services
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        [Authorize(Roles = "Owner,Manager")]
        public async Task<ActionResult<Services>> PostServices(Services services)
        {
            try
            { 
            _context.Services.Add(services);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetServices", new { id = services.ServiceId }, services);
            }
              catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Server error {e.Message}");
            }
        }

        // DELETE: api/Services/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Owner,Manager")]
        public async Task<ActionResult<Services>> DeleteServices(int id)
        {
            try
            { 
            var services = await _context.Services.FindAsync(id);
            if (services == null)
            {
                return NotFound();
            }

            _context.Services.Remove(services);
            await _context.SaveChangesAsync();

            return services;
            }
              catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Server error {e.Message}");
            }
        }

        private bool ServicesExists(int id)
        {
            return _context.Services.Any(e => e.ServiceId == id);
        }
    }
}

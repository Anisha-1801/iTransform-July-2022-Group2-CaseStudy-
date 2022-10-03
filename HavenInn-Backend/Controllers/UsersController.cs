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
using System.Security.Claims;

namespace HavenInn_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
   
    public class UsersController : ControllerBase
    {
        private readonly HavenInnContext _context;

        public UsersController(HavenInnContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        [Authorize(Roles = "Owner")]
        public async Task<ActionResult<IEnumerable<User>>> GetUser()
        {
            try
            { 
            return await _context.User.ToListAsync();
            }
              catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Server error {e.Message}");
            }
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        [Authorize(Roles = "Owner")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            try
            { 
            var user = await _context.User.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
            }
              catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Server error {e.Message}");
            }
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        [Authorize(Roles = "Owner,Manager,Receptionist")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            var userclaims = identity.Claims;

            User U = new User
            {
                UserId = Convert.ToInt32(userclaims.FirstOrDefault(o => o.Type == ClaimTypes.SerialNumber)?.Value),
                Email = userclaims.FirstOrDefault(o => o.Type == ClaimTypes.Email)?.Value,
                Role = userclaims.FirstOrDefault(o => o.Type == ClaimTypes.Role)?.Value
            };




            if (id != user.UserId)
            {
                return Ok("User not found");
            }
      
            else if(id==user.UserId & id==U.UserId)
            {
                _context.Entry(user).State = EntityState.Modified;
            }
            else
            {
                return Ok(" cannot change another user password ");
            }

            try
            {
                await _context.SaveChangesAsync();
            }
              catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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

        // POST: api/Users
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        [Authorize(Roles = "Owner")]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            try
            { 
            _context.User.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.UserId }, user);
            }
              catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Server error {e.Message}");
            }
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Owner")]
        public async Task<ActionResult<User>> DeleteUser(int id)
        {
            try
            { 
            var user = await _context.User.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.User.Remove(user);
            await _context.SaveChangesAsync();

            return user;
            }
              catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Server error {e.Message}");
            }
        }

        private bool UserExists(int id)
        {
            return _context.User.Any(e => e.UserId == id);
        }
    }
}

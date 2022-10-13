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
    #region StaffsController
    public class StaffsController : ControllerBase
    {
        private readonly HavenInnContext _context;

        public StaffsController(HavenInnContext context)
        {
            _context = context;
        }

        // GET: api/Staffs
        [HttpGet]
        [Authorize(Roles = "Manager,Owner")]
        #region Get All Staffs API
        ///<summary>Get all Staffs</summary> 
        public async Task<ActionResult<IEnumerable<Staff>>> GetStaff()
        {
            try
            {
            return await _context.Staff.Include(s => s.Department).ToListAsync();
            }
              catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Server error {e.Message}");
            }
        }
        #endregion

        // GET: api/Staffs/5
        [HttpGet("{id}")]
        [Authorize(Roles = "Manager,Owner")]
        #region Get Staff by ID API
        ///<summary>Get Staff by ID</summary> 
        public async Task<ActionResult<Staff>> GetStaff(int id)
        {
            try
            { 
            var staff = await _context.Staff.Include(s => s.Department).Where(r => r.StaffId==id).FirstAsync();

            if (staff == null)
            {
                return NotFound();
            }

            return staff;
            }
              catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Server error {e.Message}");
            }
        }
        #endregion

        // PUT: api/Staffs/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        [Authorize(Roles = "Manager,Owner")]
        #region Update Staff by ID API
        ///<summary>Update Staff by ID</summary> 
        public async Task<IActionResult> PutStaff(int id, Staff staff)
        {
            if (id != staff.StaffId)
            {
                return BadRequest();
            }

            _context.Entry(staff).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
              catch (DbUpdateConcurrencyException)
            {
                if (!StaffExists(id))
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

        // POST: api/Staffs
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        [Authorize(Roles = "Manager,Owner")]
        #region Add Staff API
        ///<summary>Add Staff</summary> 
        public async Task<ActionResult<Staff>> PostStaff(Staff staff)
        {
            try
            { 
            _context.Staff.Add(staff);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStaff", new { id = staff.StaffId }, staff);
            }
              catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Server error {e.Message}");
            }
        }
        #endregion


        // DELETE: api/Staffs/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Manager,Owner")]
        #region Delete Staff by ID API
        ///<summary>Delete Staff by ID</summary> 
        public async Task<ActionResult<Staff>> DeleteStaff(int id)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            var userclaims = identity.Claims;

            User U = new User
            {
                UserId = Convert.ToInt32(userclaims.FirstOrDefault(o => o.Type == ClaimTypes.SerialNumber)?.Value),
                Email = userclaims.FirstOrDefault(o => o.Type == ClaimTypes.Email)?.Value,
                Role = userclaims.FirstOrDefault(o => o.Type == ClaimTypes.Role)?.Value
            };
            var role2=_context.User.Where(e=>e.StaffId==id).Select(s=>s.Role).FirstOrDefault();
            try 
            { 
            var staff = await _context.Staff.FindAsync(id);
            if (staff == null)
            {
                return NotFound();
            }
            else if(U.Role=="Manager" & role2=="Receptionist")
            {
                _context.Staff.Remove(staff);
                await _context.SaveChangesAsync();
                    return staff;
            }
            else if (U.Role == "Owner")
            {
                _context.Staff.Remove(staff);
                await _context.SaveChangesAsync();
                return staff;
            }
            else
            {
              return Ok("You are not Authorized to delete Staff");
            }
            }
              catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Server error {e.Message}");
            }
        }
        #endregion

        private bool StaffExists(int id)
        {
            return _context.Staff.Any(e => e.StaffId == id);
        }
    }
    #endregion
}

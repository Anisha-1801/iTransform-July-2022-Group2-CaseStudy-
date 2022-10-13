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
    
    public class DepartmentsController : ControllerBase
    #region DepartmentController
    {
        private readonly HavenInnContext _context;

        public DepartmentsController(HavenInnContext context)
        {
            _context = context;
        }

        // GET: api/Departments
        [HttpGet]
        [Authorize(Roles = "Manager,Owner")]
        #region Get All Deparments API
        ///<summary>Get All Departments</summary> 
        public async Task<ActionResult<IEnumerable<Department>>> GetDepartment()
        {
            try
            { 
            return await _context.Department.ToListAsync();
            }
              catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Server error {e.Message}");
            }
        }
        #endregion

        // GET: api/Departments/5
        [HttpGet("{id}")]
        [Authorize(Roles = "Manager,Owner")]
        #region Get Deparment by ID API
        ///<summary>Get Department by ID</summary> 
        public async Task<ActionResult<Department>> GetDepartment(int id)
        {
            try
            { 
            var department = await _context.Department.FindAsync(id);

            if (department == null)
            {
                return NotFound();
            }

            return department;
            }
              catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Server error {e.Message}");
            }
        }
        #endregion

        // PUT: api/Departments/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        [Authorize(Roles = "Owner")]
        #region Update Depatrment by ID API
        ///<summary>Update Department</summary> 
        public async Task<IActionResult> PutDepartment(int id, Department department)
        {
            try
            { 
            if (id != department.DepartmentId)
            {
                return BadRequest();
            }

            _context.Entry(department).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
              catch (DbUpdateConcurrencyException)
            {
                if (!DepartmentExists(id))
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
        #endregion

        // POST: api/Departments
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        [Authorize(Roles = "Owner")]
        #region Add Department API
        ///<summary>Add Department</summary> 
        public async Task<ActionResult<Department>> PostDepartment(Department department)
        {
            try
            { 
            _context.Department.Add(department);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDepartment", new { id = department.DepartmentId }, department);
            }
              catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Server error {e.Message}");
            }
        }
        #endregion

        // DELETE: api/Departments/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Owner")]
        #region Delete Department by ID API 
        ///<summary>Delete Department by ID</summary> 
        public async Task<ActionResult<Department>> DeleteDepartment(int id)
        {
            try
            { 
            var department = await _context.Department.FindAsync(id);
            if (department == null)
            {
                return NotFound();
            }

            _context.Department.Remove(department);
            await _context.SaveChangesAsync();

            return department;
            }
              catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Server error {e.Message}");
            }
        }
        #endregion

        private bool DepartmentExists(int id)
        {
            return _context.Department.Any(e => e.DepartmentId == id);
        }
    }
    #endregion
}

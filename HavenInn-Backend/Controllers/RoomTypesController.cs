﻿using System;
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
    #region RoomTypeController
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
        #region Get All RoomTypes API
        ///<summary>Get all RoomTypes</summary> 
        public async Task<ActionResult<IEnumerable<RoomType>>> GetRoomType()
        {
            try
            {
                return await _context.RoomType.ToListAsync();
            }
              catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Server error {e.Message}");
            }
        }
        #endregion

        // GET: api/RoomTypes/5
        [HttpGet("{id}")]
        [Authorize(Roles = "Receptionist,Manager,Owner")]
        #region Get RoomType by ID API
        ///<summary>Get RoomType by ID</summary> 
        public async Task<ActionResult<RoomType>> GetRoomType(int id)
        {
            try
            { 
            var roomType = await _context.RoomType.FindAsync(id);

            if (roomType == null)
            {
                return NotFound();
            }

            return roomType;
            }
              catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Server error {e.Message}");
            }
        }
        #endregion

        // PUT: api/RoomTypes/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        [Authorize(Roles = "Owner")]
        #region Update RoomType by ID API
        ///<summary>Update RoomType by ID</summary> 
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
        #endregion

        // POST: api/RoomTypes
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        [Authorize(Roles = "Owner")]
        #region Add RoomType API
        ///<summary>Add RoomType</summary> 
        public async Task<ActionResult<RoomType>> PostRoomType(RoomType roomType)
        {
            try
            { 
            _context.RoomType.Add(roomType);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRoomType", new { id = roomType.RoomTypeId }, roomType);
            }
              catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Server error {e.Message}");
            }
        }
        #endregion

        // DELETE: api/RoomTypes/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Owner")]
        #region Delete RoomType by ID API
        ///<summary>Delete RoomType by ID</summary> 
        public async Task<ActionResult<RoomType>> DeleteRoomType(int id)
        {
            try
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
              catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Server error {e.Message}");
            }
        }
        #endregion

        private bool RoomTypeExists(int id)
        {
            return _context.RoomType.Any(e => e.RoomTypeId == id);
        }
    }
    #endregion
}

using HavenInn_Library.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System;
using System.Linq;

namespace HavenInn_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserLoginController : ControllerBase
    {
        private IConfiguration _config;
        private readonly HavenInnContext _context;

        public UserLoginController(HavenInnContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        

        [AllowAnonymous]
        [HttpPost]
        public IActionResult Login([FromBody] UserLogin userLogin)
        {
            try
            {
                var user = Authenticate(userLogin);
                if (user != null)
                {
                    var Token = Generate(user);
                    var role = new { token = Token, Role = user.Role };
                    return Ok(role);
                }
                return NotFound("User Not found");
            }
              catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Server error {e.Message}");
            }
        }

        private string Generate(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {

                  //new Claim(ClaimTypes.GivenName,user.Staff.FirstName),
                  //new Claim(ClaimTypes.Surname,user.Staff.LastName),
                  new Claim(ClaimTypes.SerialNumber,Convert.ToString(user.UserId)),
                  new Claim(ClaimTypes.Role,user.Role),
                  new Claim(ClaimTypes.Email,user.Email)
            };

            var Token = new JwtSecurityToken(_config["Jwt:Issuer"], _config["Jwt:Audience"], claims,
                expires: DateTime.Now.AddMinutes(60), signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(Token);
        }

        private User Authenticate(UserLogin userLogin)
        {
            var Currentuser = _context.User.FirstOrDefault(o => o.Email == userLogin.Email && o.Password == userLogin.Password);

            if (Currentuser != null)
            {
                return Currentuser;
            }
            return null;
        }
    }
}

